import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { PsicologoModel } from "@/lib/models/psicologo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  _request: Request,
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

  try {
    await connectDB();
    const actualizado = await PsicologoModel.findByIdAndUpdate(
      id,
      {
        $set: {
          estado: "inactivo",
          disponible: false,
          ultimaAsignacion: null,
        },
      },
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
      err instanceof Error ? err.message : "Error al desactivar";
    return NextResponse.json({ ok: false, error: mensaje }, { status: 500 });
  }
}
