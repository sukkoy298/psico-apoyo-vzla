import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { SolicitudVoluntarioModel } from "@/lib/models/solicitud-voluntario";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^\S+@\S+\.\S+$/;

type Body = {
  nombre?: string;
  email?: string;
  colegiatura?: string;
  especialidad?: string;
  telefonoWhatsapp?: string;
  rangoAtencion?: "infantil" | "adultos" | "ambos";
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

  const { nombre, email, colegiatura, rangoAtencion, modalidad } = body;
  if (!nombre || !email || !colegiatura) {
    return NextResponse.json(
      {
        ok: false,
        error: "Los campos nombre, email y colegiatura son obligatorios",
      },
      { status: 400 }
    );
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Email inválido" },
      { status: 400 }
    );
  }

  const rangoOk = ["infantil", "adultos", "ambos"].includes(
    rangoAtencion ?? "adultos"
  )
    ? (rangoAtencion ?? "adultos")
    : "adultos";
  const modalidadOk = ["online", "presencial", "ambas"].includes(
    modalidad ?? "online"
  )
    ? (modalidad ?? "online")
    : "online";

  try {
    await connectDB();
    const creada = await SolicitudVoluntarioModel.create({
      nombre: nombre.trim(),
      email: email.toLowerCase().trim(),
      colegiatura: colegiatura.trim(),
      especialidad: (body.especialidad ?? "").trim(),
      telefonoWhatsapp: (body.telefonoWhatsapp ?? "").trim(),
      rangoAtencion: rangoOk,
      modalidad: modalidadOk,
      mensaje: (body.mensaje ?? "").trim(),
    });
    return NextResponse.json(
      { ok: true, id: creada._id.toString() },
      { status: 201 }
    );
  } catch (err) {
    const mensaje =
      err instanceof Error
        ? err.message
        : "Error al guardar la solicitud";
    return NextResponse.json({ ok: false, error: mensaje }, { status: 500 });
  }
}
