import {
  Schema,
  model,
  models,
  type InferSchemaType,
  type Model,
} from "mongoose";

const normalizarTelefono = (v: string) => v.replace(/\D/g, "");

const solicitudVoluntarioSchema = new Schema(
  {
    nombre: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Email inválido"],
    },
    cedula: { type: String, required: true, trim: true },
    colegiatura: { type: String, required: true, trim: true },
    especialidad: { type: String, trim: true, default: "" },
    telefonoWhatsapp: {
      type: String,
      trim: true,
      default: "",
      set: normalizarTelefono,
    },
    linkMeet: { type: String, trim: true, default: "" },
    rangoAtencion: {
      type: String,
      enum: ["infantil", "adultos", "ambos"],
      default: "adultos",
    },
    modalidad: {
      type: String,
      enum: ["online", "presencial", "ambas"],
      default: "online",
    },
    mensaje: { type: String, trim: true, default: "" },
    estado: {
      type: String,
      enum: ["pendiente", "aprobado", "rechazado"],
      default: "pendiente",
    },
    motivoRechazo: { type: String, trim: true, default: "" },
    psicologoId: {
      type: Schema.Types.ObjectId,
      ref: "Psicologo",
      default: null,
    },
  },
  { timestamps: true }
);

solicitudVoluntarioSchema.index({ estado: 1, createdAt: -1 });
solicitudVoluntarioSchema.index({ email: 1 });

export type SolicitudVoluntarioDoc = InferSchemaType<
  typeof solicitudVoluntarioSchema
> & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

type SolicitudVoluntarioModelType = Model<SolicitudVoluntarioDoc>;

export const SolicitudVoluntarioModel: SolicitudVoluntarioModelType =
  (models.SolicitudVoluntario as SolicitudVoluntarioModelType) ||
  model<SolicitudVoluntarioDoc>(
    "SolicitudVoluntario",
    solicitudVoluntarioSchema
  );
