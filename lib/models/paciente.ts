import { Schema, model, models, type InferSchemaType, type Model } from "mongoose";

const pacienteSchema = new Schema(
  {
    nombre: { type: String, required: true, trim: true },
    edad: { type: Number, required: true, min: 5, max: 120 },
    telefono: { type: String, required: true, trim: true },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      default: "",
      match: [/^\S+@\S+\.\S+$/, "Email inválido"],
    },
    estado: { type: String, required: true, trim: true },
    modalidad: {
      type: String,
      enum: ["videollamada", "llamada", "presencial", "cualquiera"],
      default: "cualquiera",
    },
    mensaje: { type: String, trim: true, default: "" },
    estadoSolicitud: {
      type: String,
      enum: ["pendiente", "en_proceso", "atendido", "descartado"],
      default: "pendiente",
    },
    psicologoAsignado: {
      type: Schema.Types.ObjectId,
      ref: "Psicologo",
      default: null,
    },
  },
  { timestamps: true }
);

export type PacienteDoc = InferSchemaType<typeof pacienteSchema> & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

type PacienteModelType = Model<PacienteDoc>;

export const PacienteModel: PacienteModelType =
  (models.Paciente as PacienteModelType) ||
  model<PacienteDoc>("Paciente", pacienteSchema);
