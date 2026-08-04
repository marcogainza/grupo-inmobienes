import { get } from "@vercel/blob";
import { type NextRequest, NextResponse } from "next/server";

// La tienda de Vercel Blob de este proyecto es de tipo "private": los blobs
// no son accesibles directamente por URL y deben servirse desde el servidor.
// El contenido en sí (fotos públicas del sitio) no es sensible.
export async function GET(request: NextRequest) {
  const pathname = request.nextUrl.searchParams.get("pathname");
  if (!pathname) {
    return NextResponse.json({ error: "Missing pathname" }, { status: 400 });
  }

  const result = await get(pathname, { access: "private" });
  if (!result || !result.stream) {
    return new NextResponse("Not found", { status: 404 });
  }

  return new NextResponse(result.stream, {
    headers: {
      "Cache-Control": "public, max-age=31536000, immutable",
      "Content-Type": result.blob.contentType,
      "X-Content-Type-Options": "nosniff",
    },
  });
}
