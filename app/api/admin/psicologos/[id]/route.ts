import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { PsicologoModel } from "@/lib/models/psicologo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const RANGOS_VALIDOS = ["infantil", "adultos", "ambos"] as const;
const ESTADOS_VALIDOS = ["pendiente", "validado", "asignado", "inactivo"] as const;
const MODALIDADES_VALIDAS = ["online", "presencial", "ambas"] as const;

type PatchBody = {
  estado?: string;
  disponible?: boolean;
  rangoAtencion?: string;
  modalidad?: string;
  telefonoWhatsapp?: string;
  linkMeet?: string;
  nombre?: string;
  especialidad?: string;
};

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

  let body: PatchBody;
  try {
    body = (await request.json()) as PatchBody;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Cuerpo JSON inválido" },
      { status: 400 }
    );
  }

  const update: Record<string, unknown> = {};
  if (body.estado !== undefined) {
    if (!(ESTADOS_VALIDOS as readonly string[]).includes(body.estado)) {
      return NextResponse.json(
        { ok: false, error: "Estado inválido" },
        { status: 400 }
      );
    }
    update.estado = body.estado;
    if (body.estado === "validado") {
      update.ultimaAsignacion = null;
    }
  }
  if (body.disponible !== undefined) {
    update.disponible = !!body.disponible;
  }
  if (body.rangoAtencion !== undefined) {
    if (!(RANGOS_VALIDOS as readonly string[]).includes(body.rangoAtencion)) {
      return NextResponse.json(
        { ok: false, error: "Rango inválido" },
        { status: 400 }
      );
    }
    update.rangoAtencion = body.rangoAtencion;
  }
  if (body.modalidad !== undefined) {
    if (!(MODALIDADES_VALIDAS as readonly string[]).includes(body.modalidad)) {
      return NextResponse.json(
        { ok: false, error: "Modalidad inválida" },
        { status: 400 }
      );
    }
    update.modalidad = body.modalidad;
  }
  if (body.telefonoWhatsapp !== undefined) {
    update.telefonoWhatsapp = String(body.telefonoWhatsapp).replace(/\D/g, "");
  }
  if (body.linkMeet !== undefined) {
    update.linkMeet = String(body.linkMeet).trim();
  }
  if (body.nombre !== undefined) {
    update.nombre = String(body.nombre).trim();
  }
  if (body.especialidad !== undefined) {
    update.especialidad = String(body.especialidad).trim();
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json(
      { ok: false, error: "Nada para actualizar" },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    const actualizado = await PsicologoModel.findByIdAndUpdate(id, update, {
      new: true,
    });
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
