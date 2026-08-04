# Guía de despliegue — Grupo Inmobienes

Esta guía asume que **no tienes ninguna cuenta creada todavía** (ni GitHub, ni
Vercel) y te lleva paso a paso hasta tener el sitio en línea con tu propio
dominio de Vercel y el panel de administración funcionando.

El proyecto ya está construido y probado en esta máquina, en:
`C:\Users\HP\Desktop\claude`

---

## 0. Requisitos previos

- **Node.js** — ya está instalado en esta máquina (se instaló durante el
  desarrollo).
- **Git** — ya está instalado en esta máquina.
- Una cuenta de correo para registrarte en GitHub y Vercel (puede ser la
  misma, marcogainza@gmail.com).

---

## 1. Crear una cuenta en GitHub y subir el proyecto

1. Ve a [github.com](https://github.com) y crea una cuenta gratuita si no
   tienes una.
2. Una vez dentro, haz clic en **New repository** (botón verde, o el ícono
   "+" arriba a la derecha → "New repository").
   - Nombre sugerido: `grupo-inmobienes`
   - Puedes dejarlo **Private** (privado) si prefieres que nadie más lo vea.
   - **No** marques "Add a README" ni ".gitignore" (el proyecto ya los
     tiene).
3. Haz clic en **Create repository**. GitHub te mostrará una URL como
   `https://github.com/tu-usuario/grupo-inmobienes.git` — cópiala.
4. En tu terminal, dentro de la carpeta del proyecto, ejecuta:

```bash
git init
git add .
git commit -m "Sitio inicial de Grupo Inmobienes"
git branch -M main
git remote add origin https://github.com/tu-usuario/grupo-inmobienes.git
git push -u origin main
```

(Sustituye la URL por la que copiaste de GitHub. Si te pide iniciar sesión,
sigue las instrucciones en pantalla de GitHub.)

---

## 2. Crear una cuenta en Vercel e importar el proyecto

1. Ve a [vercel.com](https://vercel.com) y crea una cuenta — el camino más
   simple es **"Continue with GitHub"**, así quedan conectadas
   automáticamente.
2. En el panel de Vercel, haz clic en **Add New… → Project**.
3. Busca y selecciona el repositorio `grupo-inmobienes` que acabas de subir,
   y haz clic en **Import**.
4. Vercel detectará automáticamente que es un proyecto Next.js. **Todavía no
   hagas clic en "Deploy"** — antes hay que crear la base de datos y
   configurar las variables de entorno (siguientes pasos). Si ya
   desplegaste, no pasa nada, simplemente el sitio fallará hasta completar
   los pasos 3 y 5; puedes volver a desplegar después.

---

## 3. Crear la base de datos (Vercel Postgres)

1. Dentro de tu proyecto en Vercel, ve a la pestaña **Storage**.
2. Haz clic en **Create Database** y elige **Postgres** (Vercel usa Neon
   como proveedor por debajo; el proceso es guiado).
3. Elige una región cercana a tus usuarios (por ejemplo, una región de
   EE.UU.) y confirma la creación.
4. Cuando termine, Vercel te preguntará a qué proyecto **conectar** esta
   base de datos — selecciona `grupo-inmobienes` y confirma. Esto agrega
   automáticamente variables de entorno a tu proyecto.
5. Ve a la base de datos creada → pestaña **.env.local** (o "Quickstart") y
   copia las cadenas de conexión que te muestre. Vercel puede nombrarlas
   distinto según el momento (`POSTGRES_URL`, `DATABASE_URL`,
   `POSTGRES_URL_NON_POOLING`, etc.). Vas a necesitar:
   - Una **cadena con pooling** (para uso normal de la app) → la usarás como
     `DATABASE_URL`.
   - Una **cadena directa/sin pooling** (para migraciones) → la usarás como
     `DIRECT_URL`. Si Vercel solo te muestra una cadena, puedes usar la
     misma para ambas.

Guarda estos dos valores, los necesitas en el paso 5.

---

## 4. Crear el almacenamiento de imágenes (Vercel Blob)

1. En la misma pestaña **Storage**, haz clic en **Create Database** de
   nuevo y elige **Blob**.
2. Ponle un nombre (por ejemplo `inmobienes-media`) y conéctalo al proyecto
   `grupo-inmobienes`.
3. Esto crea automáticamente la variable de entorno
   `BLOB_READ_WRITE_TOKEN` en tu proyecto — no necesitas copiarla a mano si
   Vercel la agrega sola (verifícalo en el paso 5).

---

## 5. Configurar las variables de entorno

1. En tu proyecto de Vercel, ve a **Settings → Environment Variables**.
2. Verifica/agrega estas variables (marca los tres entornos: Production,
   Preview y Development):

| Variable | Valor |
|---|---|
| `DATABASE_URL` | La cadena con pooling que copiaste en el paso 3 |
| `DIRECT_URL` | La cadena directa/sin pooling del paso 3 |
| `BLOB_READ_WRITE_TOKEN` | Debería existir ya (paso 4); si no, cópiala desde la base Blob |
| `AUTH_SECRET` | Un valor aleatorio único (ver abajo cómo generarlo) |
| `ADMIN_USERNAME` | El usuario con el que tu cliente iniciará sesión en `/admin` |
| `ADMIN_PASSWORD` | Una contraseña temporal (tu cliente la cambiará luego desde el panel) |

Para generar un valor aleatorio para `AUTH_SECRET`, ejecuta en tu terminal:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copia el resultado y pégalo como valor de `AUTH_SECRET`.

3. Guarda los cambios.

---

## 6. Preparar la base de datos (una sola vez)

Ahora necesitas crear las tablas y el usuario administrador en la base de
datos real de producción. Se hace una sola vez, desde tu computadora, usando
la CLI de Vercel:

```bash
npm install -g vercel
vercel login
```

Dentro de la carpeta del proyecto:

```bash
vercel link
```

Sigue las instrucciones para vincular la carpeta con el proyecto
`grupo-inmobienes` que creaste en Vercel.

```bash
vercel env pull .env.local
```

Esto descarga las variables de entorno reales (incluida la base de datos) a
un archivo `.env.local` local. Ahora crea las tablas y los datos iniciales:

```bash
npm install
npm run db:push
npm run db:seed
```

Deberías ver mensajes confirmando la creación del usuario admin y los datos
de ejemplo.

---

## 7. Desplegar

1. Vuelve al panel de Vercel, pestaña **Deployments**, y haz clic en
   **Redeploy** sobre el último deployment (o simplemente haz un nuevo
   `git push` — Vercel despliega automáticamente en cada push a `main`).
2. Cuando termine, Vercel te da una URL como
   `https://grupo-inmobienes-tu-usuario.vercel.app`. Ábrela y verifica que
   el sitio cargue.
3. Ve a `/dashboard` y `/admin` para confirmar que ambos funcionan.
4. Inicia sesión en `/admin` con el `ADMIN_USERNAME`/`ADMIN_PASSWORD` que
   configuraste, y **cambia la contraseña de inmediato** desde la sección
   "Cambiar contraseña" del resumen del panel.

### Dominio propio (opcional)

En **Settings → Domains** puedes agregar tu propio dominio (por ejemplo
`www.grupoinmobienes.com`) y Vercel te guía para apuntar los DNS.

---

## 8. Uso diario del panel de administración (`/admin`)

Tu cliente inicia sesión con el usuario y clave que configuraste (y que ya
debería haber cambiado). Desde ahí puede editar, sin tocar código:

- **Entregas recientes** — foto, nombre, ciudad y tipo de bien. Aparece en
  el inicio (con foto) y en `/dashboard` (solo texto).
- **Testimonios** — foto, nombre, comentario, ciudad y tipo de bien.
- **Blog** — título, resumen, contenido, imagen de portada y estado
  (publicado/borrador).
- **Cifras del dashboard** — último cliente afiliado y su plan, contadores
  principales (bienes entregados, asambleas ejecutadas, inmuebles
  entregados, monto promedio adjudicado), los contadores del inicio
  (familias adjudicadas, ciudades, años de experiencia), la serie de 12
  meses de clientes afiliados y entregas mensuales, y los valores del
  gráfico de clientes por ciudad (incluyendo añadir o quitar ciudades).

Todos los cambios se reflejan de inmediato en el sitio público, sin
necesidad de un nuevo despliegue.

---

## 9. Cómo hacer cambios de diseño o código más adelante

Cualquier cambio de código (por ejemplo, si me pides ajustar textos fijos,
colores o agregar una sección nueva) se sube igual que al principio:

```bash
git add .
git commit -m "Descripción del cambio"
git push
```

Vercel detecta el push y despliega automáticamente la nueva versión.

---

## 10. Problemas comunes

- **El sitio muestra un error de base de datos** → revisa que
  `DATABASE_URL` y `DIRECT_URL` estén bien configuradas en Vercel
  (Settings → Environment Variables) y que hayas corrido `npm run db:push`
  contra esa misma base.
- **Las fotos no se suben** → revisa que `BLOB_READ_WRITE_TOKEN` exista en
  las variables de entorno del proyecto.
- **No puedo iniciar sesión en `/admin`** → confirma el usuario/clave que
  usaste al correr `npm run db:seed`. Si lo olvidaste, puedes volver a
  correr `npm run db:seed` con nuevas variables `ADMIN_USERNAME`/
  `ADMIN_PASSWORD` en tu `.env.local` — el usuario se actualiza (no se
  duplica).
- **Cambié el esquema de datos (`prisma/schema.prisma`)** → después de
  editarlo, corre `npm run db:push` de nuevo (con `.env.local` apuntando a
  producción) para aplicar el cambio a la base real.
