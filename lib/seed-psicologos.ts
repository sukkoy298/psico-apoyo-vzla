import { connectDB } from "./mongodb";
import { PsicologoModel } from "./models/psicologo";

type Seed = {
  nombre: string;
  email: string;
  colegiatura: string;
  telefonoWhatsapp: string;
  rangoAtencion: "infantil" | "adultos" | "ambos";
  modalidad: "online" | "presencial" | "ambas";
  disponible: boolean;
  estado: "pendiente" | "validado" | "asignado" | "inactivo";
  especialidad?: string;
};

const SEED: Seed[] = [
  {
    nombre: "Lic. Angela Sarabia",
    email: "angela.sarabia@psicoapoyo.local",
    colegiatura: "PSIC-VE-0001",
    especialidad: "Clínica adultos",
    telefonoWhatsapp: "584145571719",
    rangoAtencion: "adultos",
    modalidad: "online",
    disponible: true,
    estado: "validado",
  },
  {
    nombre: "Lic. María González",
    email: "maria.gonzalez@psicoapoyo.local",
    colegiatura: "PSIC-VE-0002",
    especialidad: "Infantil y adolescentes",
    telefonoWhatsapp: "584124112233",
    rangoAtencion: "ambos",
    modalidad: "ambas",
    disponible: true,
    estado: "validado",
  },
  {
    nombre: "Lic. Carlos Medina",
    email: "carlos.medina@psicoapoyo.local",
    colegiatura: "PSIC-VE-0003",
    especialidad: "Emergencias y trauma",
    telefonoWhatsapp: "584169988776",
    rangoAtencion: "adultos",
    modalidad: "online",
    disponible: true,
    estado: "validado",
  },
  {
    nombre: "Lic. Rosa Pérez",
    email: "rosa.perez@psicoapoyo.local",
    colegiatura: "PSIC-VE-0004",
    especialidad: "Pareja y familia",
    telefonoWhatsapp: "584266554433",
    rangoAtencion: "adultos",
    modalidad: "ambas",
    disponible: true,
    estado: "validado",
  },
];

async function main() {
  await connectDB();

  for (const data of SEED) {
    const existente = await PsicologoModel.findOne({ email: data.email });
    if (existente) {
      existente.set({
        nombre: data.nombre,
        colegiatura: data.colegiatura,
        especialidad: data.especialidad ?? "",
        telefonoWhatsapp: data.telefonoWhatsapp,
        rangoAtencion: data.rangoAtencion,
        modalidad: data.modalidad,
        disponible: data.disponible,
        estado: data.estado,
        ultimaAsignacion: null,
      });
      await existente.save();
      console.log(`Actualizado: ${data.nombre}`);
      continue;
    }

    await PsicologoModel.create({
      ...data,
      ultimaAsignacion: null,
    });
    console.log(`Creado: ${data.nombre}`);
  }

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
