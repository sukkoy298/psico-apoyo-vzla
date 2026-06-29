import { connectDB } from "./mongodb";
import { PsicologoModel } from "./models/psicologo";
import { DerivacionModel } from "./models/derivacion";

export type DerivarResult =
  | { status: "ok"; whatsapp: string; meet?: string; link?: string; nombre: string }
  | { status: "sin_disponibilidad" };

export type Rango = "infantil" | "adultos";

export function rangoSegunEdad(edad: number): Rango {
  return edad < 18 ? "infantil" : "adultos";
}

const MAX_INTENTOS = 5;

export async function derivarPsicologo(
  edad: number,
  nombre: string
): Promise<DerivarResult> {
  await connectDB();

  const rango = rangoSegunEdad(edad);

  for (let intento = 0; intento < MAX_INTENTOS; intento++) {
    const candidato = await PsicologoModel.findOneAndUpdate(
      {
        disponible: true,
        estado: "validado",
        rangoAtencion: { $in: [rango, "ambos"] },
        telefonoWhatsapp: { $exists: true, $ne: "" },
      },
      {
        $set: {
          ultimaAsignacion: new Date(),
        },
      },
      {
        sort: { ultimaAsignacion: 1, createdAt: 1 },
        new: true,
        projection: { nombre: 1, telefonoWhatsapp: 1, linkMeet: 1 },
      }
    ).lean();

    if (!candidato || !candidato.telefonoWhatsapp) {
      return { status: "sin_disponibilidad" };
    }

    const telefono = String(candidato.telefonoWhatsapp);
    if (!telefono) {
      continue;
    }

    const whatsapp = `https://wa.me/${telefono}?text=${encodeURIComponent(
      `Hola, soy ${nombre}. Solicito atención psicológica.`
    )}`;

    const meet = candidato.linkMeet?.trim() || undefined;

    try {
      await DerivacionModel.create({
        nombrePaciente: nombre,
        edad,
        rango,
        nombrePsicologo: candidato.nombre,
        telefonoPsicologo: telefono,
        linkMeet: meet ?? "",
        modalidadContacto: meet ? "whatsapp" : "whatsapp",
        psicologoId: candidato._id,
      });
    } catch {
      // Si falla el log, no bloqueamos la derivación.
    }

    return { status: "ok", whatsapp, meet, link: whatsapp, nombre: candidato.nombre };
  }

  return { status: "sin_disponibilidad" };
}

export async function liberarPsicologo(psicologoId: string) {
  await connectDB();
  await PsicologoModel.findByIdAndUpdate(psicologoId, {
    $set: { estado: "validado", ultimaAsignacion: null },
  });
}
