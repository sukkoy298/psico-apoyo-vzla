import { connectDB } from "./mongodb";
import { PsicologoModel } from "./models/psicologo";
import {
  SolicitudVoluntarioModel,
  type SolicitudVoluntarioDoc,
} from "./models/solicitud-voluntario";

export type AprobarResult =
  | { status: "ok"; psicologoId: string }
  | { status: "no_encontrada" }
  | { status: "ya_procesada" };

export type RechazarResult =
  | { status: "ok" }
  | { status: "no_encontrada" }
  | { status: "ya_procesada" };

const normalizarTelefono = (v: string) => v.replace(/\D/g, "");

function asegurarRango(
  v: string
): "infantil" | "adultos" | "ambos" {
  if (v === "infantil" || v === "adultos" || v === "ambos") return v;
  return "adultos";
}

function asegurarModalidad(
  v: string
): "online" | "presencial" | "ambas" {
  if (v === "online" || v === "presencial" || v === "ambas") return v;
  return "online";
}

export async function aprobarVoluntario(
  solicitudId: string
): Promise<AprobarResult> {
  await connectDB();

  const solicitud = (await SolicitudVoluntarioModel.findById(
    solicitudId
  ).lean()) as SolicitudVoluntarioDoc | null;

  if (!solicitud) return { status: "no_encontrada" };
  if (solicitud.estado !== "pendiente") return { status: "ya_procesada" };

  const emailNorm = solicitud.email.toLowerCase().trim();
  const datos = {
    nombre: solicitud.nombre,
    email: emailNorm,
    colegiatura: solicitud.colegiatura,
    especialidad: solicitud.especialidad ?? "",
    telefonoWhatsapp: normalizarTelefono(solicitud.telefonoWhatsapp ?? ""),
    rangoAtencion: asegurarRango(solicitud.rangoAtencion ?? "adultos"),
    modalidad: asegurarModalidad(solicitud.modalidad ?? "online"),
    mensaje: solicitud.mensaje ?? "",
    estado: "validado" as const,
    disponible: true,
    ultimaAsignacion: null,
  };

  let psicologoId: string;
  const existente = await PsicologoModel.findOne({ email: emailNorm });
  if (existente) {
    existente.set(datos);
    await existente.save();
    psicologoId = existente._id.toString();
  } else {
    const creado = await PsicologoModel.create(datos);
    psicologoId = creado._id.toString();
  }

  await SolicitudVoluntarioModel.findByIdAndUpdate(solicitudId, {
    $set: { estado: "aprobado", psicologoId },
  });

  return { status: "ok", psicologoId };
}

export async function rechazarVoluntario(
  solicitudId: string,
  motivo: string
): Promise<RechazarResult> {
  await connectDB();

  const solicitud = await SolicitudVoluntarioModel.findById(solicitudId);
  if (!solicitud) return { status: "no_encontrada" };
  if (solicitud.estado !== "pendiente") return { status: "ya_procesada" };

  solicitud.set({ estado: "rechazado", motivoRechazo: motivo });
  await solicitud.save();

  return { status: "ok" };
}
