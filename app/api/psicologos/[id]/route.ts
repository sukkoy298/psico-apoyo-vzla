import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { PsicologoModel } from "@/lib/models/psicologo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ESTADOS_VALIDOS = ["pendiente", "validado", "asignado", "inactivo"] as const;

export async function PATCH(
  request: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || session.user.rol !== "admin") {
    return NextResponse.json(
      { ok: false, error: "No autorizado" },
      { status: 401 }
    );
  }

  const { id } = await ctx.params;
  let body: { estado?: string };
  try {
    body = (await request.json()) as { estado?: string };
  } catch {
    return NextResponse.json(
      { ok: false, error: "Cuerpo JSON inválido" },
      { status: 400 }
    );
  }

  const estado = body.estado;
  if (!estado || !(ESTADOS_VALIDOS as readonly string[]).includes(estado)) {
    return NextResponse.json(
      { ok: false, error: "Estado inválido" },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    const actualizado = await PsicologoModel.findByIdAndUpdate(
      id,
      { estado },
      { new: true }
    );
    if (!actualizado) {
      return NextResponse.json(
        { ok: false, error: "Psicólogo no encontrado" },
        { status: 404 }
      );
    }
    return NextResponse.json({ ok: true, data: actualizado });
  } catch (err) {
    const mensaje =
      err instanceof Error ? err.message : "Error al actualizar";
    return NextResponse.json({ ok: false, error: mensaje }, { status: 500 });
  }
}
