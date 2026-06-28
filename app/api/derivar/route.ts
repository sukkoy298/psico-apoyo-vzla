import { NextResponse } from "next/server";
import { derivarPsicologo } from "@/lib/derivar";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  nombre?: unknown;
  edad?: unknown;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Cuerpo JSON inválido" },
      { status: 400 }
    );
  }

  const { nombre, edad } = body;
  if (typeof nombre !== "string" || nombre.trim().length === 0) {
    return NextResponse.json(
      { ok: false, error: "Nombre requerido" },
      { status: 400 }
    );
  }
  if (typeof edad !== "number" || !Number.isFinite(edad) || edad < 0 || edad > 120) {
    return NextResponse.json(
      { ok: false, error: "Edad inválida" },
      { status: 400 }
    );
  }

  try {
    const result = await derivarPsicologo(edad, nombre.trim());
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    const mensaje =
      err instanceof Error
        ? err.message
        : "Error al derivar al profesional";
    return NextResponse.json({ ok: false, error: mensaje }, { status: 500 });
  }
}
