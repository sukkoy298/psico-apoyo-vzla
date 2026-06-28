"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { signIn } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { PacienteModel } from "@/lib/models/paciente";
import { PsicologoModel } from "@/lib/models/psicologo";
import { UsuarioModel } from "@/lib/models/usuario";

export type RegisterState = {
  ok: boolean;
  error?: string;
};

const EMAIL_RE = /^\S+@\S+\.\S+$/;

export async function registrarPsicologoAction(
  _prev: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const nombre = String(formData.get("nombre") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .toLowerCase()
    .trim();
  const password = String(formData.get("password") ?? "");
  const colegiatura = String(formData.get("colegiatura") ?? "").trim();
  const especialidad = String(formData.get("especialidad") ?? "").trim();
  const modalidad = String(formData.get("modalidad") ?? "online");
  const mensaje = String(formData.get("mensaje") ?? "").trim();

  if (!nombre || !email || !password || !colegiatura) {
    return {
      ok: false,
      error: "Completa todos los campos obligatorios",
    };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Email inválido" };
  }
  if (password.length < 8) {
    return {
      ok: false,
      error: "La contraseña debe tener al menos 8 caracteres",
    };
  }

  await connectDB();
  const existe = await UsuarioModel.findOne({ email });
  if (existe) {
    return { ok: false, error: "Ya existe una cuenta con ese email" };
  }

  const psicologo = await PsicologoModel.create({
    nombre,
    email,
    colegiatura,
    especialidad,
    modalidad: ["online", "presencial", "ambas"].includes(modalidad)
      ? (modalidad as "online" | "presencial" | "ambas")
      : "online",
    mensaje,
  });

  const passwordHash = await bcrypt.hash(password, 10);
  await UsuarioModel.create({
    email,
    passwordHash,
    nombre,
    rol: "psicologo",
    psicologoId: psicologo._id,
  });

  await signIn("credentials", { email, password, redirectTo: "/dashboard" });
  redirect("/dashboard");
}

export async function registrarPacienteAction(
  _prev: RegisterState,
  formData: FormData
): Promise<RegisterState> {
  const nombre = String(formData.get("nombre") ?? "").trim();
  const edadRaw = formData.get("edad");
  const edad = typeof edadRaw === "string" ? Number(edadRaw) : NaN;
  const telefono = String(formData.get("telefono") ?? "").trim();
  const email = String(formData.get("email") ?? "")
    .toLowerCase()
    .trim();
  const password = String(formData.get("password") ?? "");
  const estado = String(formData.get("estado") ?? "").trim();
  const modalidad = String(formData.get("modalidad") ?? "cualquiera");
  const mensaje = String(formData.get("mensaje") ?? "").trim();

  if (!nombre || !telefono || !email || !password || !estado) {
    return {
      ok: false,
      error: "Completa todos los campos obligatorios",
    };
  }
  if (!Number.isFinite(edad) || edad < 5 || edad > 120) {
    return { ok: false, error: "Edad inválida" };
  }
  if (!EMAIL_RE.test(email)) {
    return { ok: false, error: "Email inválido" };
  }
  if (password.length < 8) {
    return {
      ok: false,
      error: "La contraseña debe tener al menos 8 caracteres",
    };
  }

  await connectDB();
  const existe = await UsuarioModel.findOne({ email });
  if (existe) {
    return { ok: false, error: "Ya existe una cuenta con ese email" };
  }

  const paciente = await PacienteModel.create({
    nombre,
    edad,
    telefono,
    email,
    estado,
    modalidad: ["videollamada", "llamada", "presencial", "cualquiera"].includes(
      modalidad
    )
      ? (modalidad as
          | "videollamada"
          | "llamada"
          | "presencial"
          | "cualquiera")
      : "cualquiera",
    mensaje,
  });

  const passwordHash = await bcrypt.hash(password, 10);
  await UsuarioModel.create({
    email,
    passwordHash,
    nombre,
    rol: "paciente",
    pacienteId: paciente._id,
  });

  await signIn("credentials", { email, password, redirectTo: "/dashboard" });
  redirect("/dashboard");
}
