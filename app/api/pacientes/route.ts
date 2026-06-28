import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { PacienteModel } from "@/lib/models/paciente";
import { UsuarioModel } from "@/lib/models/usuario";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^\S+@\S+\.\S+$/;

type EstadoSolicitud = "pendiente" | "en_proceso" | "atendido" | "descartado";
type Modalidad = "videollamada" | "llamada" | "presencial" | "cualquiera";

type Body = {
  nombre?: string;
  edad?: number;
  telefono?: string;
  email?: string;
  password?: string;
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

  const { nombre, edad, telefono, estado, email, password } = body;
  if (
    !nombre ||
    typeof edad !== "number" ||
    !telefono ||
    !estado ||
    !email ||
    !password
  ) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Los campos nombre, edad, teléfono, estado, email y contraseña son obligatorios",
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
  if (password.length < 8) {
    return NextResponse.json(
      { ok: false, error: "La contraseña debe tener al menos 8 caracteres" },
      { status: 400 }
    );
  }

  try {
    await connectDB();

    const emailNorm = email.toLowerCase().trim();
    const existeUsuario = await UsuarioModel.findOne({ email: emailNorm });
    if (existeUsuario) {
      return NextResponse.json(
        { ok: false, error: "Ya existe una cuenta con ese email" },
        { status: 409 }
      );
    }

    const paciente = await PacienteModel.create({
      nombre: nombre.trim(),
      edad,
      telefono: telefono.trim(),
      email: emailNorm,
      estado: estado.trim(),
      modalidad: body.modalidad ?? "cualquiera",
      mensaje: body.mensaje ?? "",
    });

    const passwordHash = await bcrypt.hash(password, 10);
    await UsuarioModel.create({
      email: emailNorm,
      passwordHash,
      nombre: nombre.trim(),
      rol: "paciente",
      pacienteId: paciente._id,
    });

    return NextResponse.json(
      { ok: true, id: paciente._id.toString() },
      { status: 201 }
    );
  } catch (err) {
    const mensaje =
      err instanceof Error
        ? err.message
        : "Error al guardar en la base de datos";
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
  const session = await auth();
  if (!session?.user || session.user.rol !== "admin") {
    return NextResponse.json(
      { ok: false, error: "No autorizado" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const estado = searchParams.get("estado");

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
