import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const normalizarTelefono = (v: string) => v.replace(/\D/g, "");

const psicologoSchema = new Schema(
  {
    nombre: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Email inválido"],
    },
    cedula: { type: String, trim: true, default: "" },
    colegiatura: { type: String, required: true, trim: true },
    especialidad: { type: String, trim: true, default: "" },
    rangoAtencion: {
      type: String,
      enum: ["infantil", "adultos", "ambos"],
      default: "adultos",
    },
    telefonoWhatsapp: {
      type: String,
      trim: true,
      default: "",
      set: normalizarTelefono,
    },
    linkMeet: { type: String, trim: true, default: "" },
    disponible: { type: Boolean, default: false },
    modalidad: {
      type: String,
      enum: ["online", "presencial", "ambas"],
      default: "online",
    },
    mensaje: { type: String, trim: true, default: "" },
    estado: {
      type: String,
      enum: ["pendiente", "validado", "asignado", "inactivo"],
      default: "pendiente",
    },
    ultimaAsignacion: { type: Date, default: null },
  },
  { timestamps: true }
);

psicologoSchema.index({ disponible: 1, estado: 1, rangoAtencion: 1 });
psicologoSchema.index({ ultimaAsignacion: 1 });

export type PsicologoDoc = InferSchemaType<typeof psicologoSchema> & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

type PsicologoModelType = Model<PsicologoDoc>;

export const PsicologoModel: PsicologoModelType =
  (models.Psicologo as PsicologoModelType) ||
  model<PsicologoDoc>("Psicologo", psicologoSchema);
