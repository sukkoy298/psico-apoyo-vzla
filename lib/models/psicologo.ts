import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

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
    colegiatura: { type: String, required: true, trim: true },
    especialidad: { type: String, trim: true, default: "" },
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
  },
  { timestamps: true }
);

export type PsicologoDoc = InferSchemaType<typeof psicologoSchema> & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

type PsicologoModelType = Model<PsicologoDoc>;

export const PsicologoModel: PsicologoModelType =
  (models.Psicologo as PsicologoModelType) ||
  model<PsicologoDoc>("Psicologo", psicologoSchema);
