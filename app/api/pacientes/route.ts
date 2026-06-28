import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { PacienteModel } from "@/lib/models/paciente";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type EstadoSolicitud = "pendiente" | "en_proceso" | "atendido" | "descartado";
type Modalidad = "videollamada" | "llamada" | "presencial" | "cualquiera";

type Body = {
  nombre?: string;
  edad?: number;
  telefono?: string;
  email?: string;
  estado?: string;
  modalidad?: Modalidad;
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

  const { nombre, edad, telefono, estado } = body;
  if (!nombre || typeof edad !== "number" || !telefono || !estado) {
    return NextResponse.json(
      {
        ok: false,
        error: "Los campos nombre, edad, teléfono y estado son obligatorios",
      },
      { status: 400 }
    );
  }

  try {
    await connectDB();
    const creado = await PacienteModel.create({
      nombre,
      edad,
      telefono,
      email: body.email ?? "",
      estado,
      modalidad: body.modalidad ?? "cualquiera",
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

const ESTADOS_VALIDOS: EstadoSolicitud[] = [
  "pendiente",
  "en_proceso",
  "atendido",
  "descartado",
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const estado = searchParams.get("estado");
  const adminKey = request.headers.get("x-admin-key");
  const expected = process.env.ADMIN_KEY;

  if (!expected) {
    return NextResponse.json(
      { ok: false, error: "ADMIN_KEY no está configurada en el servidor" },
      { status: 500 }
    );
  }
  if (adminKey !== expected) {
    return NextResponse.json(
      { ok: false, error: "No autorizado" },
      { status: 401 }
    );
  }

  const filtro: Record<string, unknown> =
    estado && (ESTADOS_VALIDOS as string[]).includes(estado)
      ? { estadoSolicitud: estado as EstadoSolicitud }
      : {};

  try {
    await connectDB();
    const solicitudes = await PacienteModel.find(filtro)
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();
    return NextResponse.json({ ok: true, data: solicitudes });
  } catch (err) {
    const mensaje =
      err instanceof Error ? err.message : "Error al consultar la base de datos";
    return NextResponse.json({ ok: false, error: mensaje }, { status: 500 });
  }
}
