import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { PsicologoModel } from "@/lib/models/psicologo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  nombre?: string;
  email?: string;
  colegiatura?: string;
  especialidad?: string;
  modalidad?: "online" | "presencial" | "ambas";
  mensaje?: string;
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

  const { nombre, email, colegiatura, modalidad } = body;
  if (!nombre || !email || !colegiatura) {
    return NextResponse.json(
      {
        ok: false,
        error: "Los campos nombre, email y colegiatura son obligatorios",
      },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    const creado = await PsicologoModel.create({
      nombre,
      email,
      colegiatura,
      especialidad: body.especialidad ?? "",
      modalidad: modalidad ?? "online",
      mensaje: body.mensaje ?? "",
    });
    return NextResponse.json(
      { ok: true, id: creado._id.toString() },
      { status: 201 }
    );
  } catch (err) {
    const mensaje =
      err instanceof Error ? err.message : "Error al guardar en la base de datos";
    return NextResponse.json({ ok: false, error: mensaje }, { status: 500 });
  }
}
