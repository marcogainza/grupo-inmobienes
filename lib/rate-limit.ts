import "server-only";

type Attempt = { count: number; firstAttemptAt: number; blockedUntil: number | null };

const attempts = new Map<string, Attempt>();

const WINDOW_MS = 15 * 60 * 1000; // 15 minutos
const MAX_ATTEMPTS = 5;
const BLOCK_MS = 15 * 60 * 1000; // bloqueo de 15 minutos tras superar el límite

// Limpieza periódica para no acumular memoria indefinidamente en la lambda.
function cleanup(now: number) {
  for (const [key, a] of attempts) {
    const expired = now - a.firstAttemptAt > WINDOW_MS && (!a.blockedUntil || now > a.blockedUntil);
    if (expired) attempts.delete(key);
  }
}

/**
 * Rate limiting simple en memoria contra fuerza bruta en el login de admin.
 * Nota: al ser serverless, el estado no persiste entre invocaciones frías de
 * distintas instancias — es una mitigación básica, no una garantía absoluta.
 * Combina IP + usuario intentado para no poder bloquear a otros con un solo
 * usuario incorrecto masivo, y para no depender solo de un valor fácil de rotar.
 */
export function checkRateLimit(key: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  cleanup(now);

  const existing = attempts.get(key);
  if (existing?.blockedUntil && now < existing.blockedUntil) {
    return {
      allowed: false,
      retryAfterSeconds: Math.ceil((existing.blockedUntil - now) / 1000),
    };
  }

  return { allowed: true };
}

export function registerFailedAttempt(key: string) {
  const now = Date.now();
  const existing = attempts.get(key);

  if (!existing || now - existing.firstAttemptAt > WINDOW_MS) {
    attempts.set(key, { count: 1, firstAttemptAt: now, blockedUntil: null });
    return;
  }

  const count = existing.count + 1;
  const blockedUntil = count >= MAX_ATTEMPTS ? now + BLOCK_MS : null;
  attempts.set(key, { count, firstAttemptAt: existing.firstAttemptAt, blockedUntil });
}

export function registerSuccessfulAttempt(key: string) {
  attempts.delete(key);
}
