import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { PsicologoModel } from "@/lib/models/psicologo";
import { UsuarioModel } from "@/lib/models/usuario";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^\S+@\S+\.\S+$/;

type Body = {
  nombre?: string;
  email?: string;
  password?: string;
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

  const { nombre, email, password, colegiatura, modalidad } = body;
  if (!nombre || !email || !colegiatura || !password) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Los campos nombre, email, contraseña y colegiatura son obligatorios",
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

    const psicologo = await PsicologoModel.create({
      nombre: nombre.trim(),
      email: emailNorm,
      colegiatura: colegiatura.trim(),
      especialidad: body.especialidad ?? "",
      modalidad: modalidad ?? "online",
      mensaje: body.mensaje ?? "",
    });

    const passwordHash = await bcrypt.hash(password, 10);
    await UsuarioModel.create({
      email: emailNorm,
      passwordHash,
      nombre: nombre.trim(),
      rol: "psicologo",
      psicologoId: psicologo._id,
    });

    return NextResponse.json(
      { ok: true, id: psicologo._id.toString() },
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

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.rol !== "admin") {
    return NextResponse.json(
      { ok: false, error: "No autorizado" },
      { status: 401 }
    );
  }

  await connectDB();
  const psicologos = await PsicologoModel.find()
    .sort({ createdAt: -1 })
    .limit(200)
    .lean();
  return NextResponse.json({ ok: true, data: psicologos });
}
