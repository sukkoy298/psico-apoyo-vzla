import { Schema, model, models, type Model } from "mongoose";

export type UserRole = "psicologo" | "paciente" | "admin";

const usuarioSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Email inválido"],
    },
    passwordHash: { type: String, required: true },
    nombre: { type: String, required: true, trim: true },
    rol: {
      type: String,
      enum: ["psicologo", "paciente", "admin"],
      required: true,
    },
    psicologoId: {
      type: Schema.Types.ObjectId,
      ref: "Psicologo",
      default: null,
    },
    pacienteId: {
      type: Schema.Types.ObjectId,
      ref: "Paciente",
      default: null,
    },
  },
  { timestamps: true }
);

export type UsuarioDoc = {
  _id: string;
  email: string;
  passwordHash: string;
  nombre: string;
  rol: UserRole;
  psicologoId: string | null;
  pacienteId: string | null;
  createdAt: Date;
  updatedAt: Date;
};

type UsuarioModelType = Model<UsuarioDoc>;

export const UsuarioModel: UsuarioModelType =
  (models.Usuario as UsuarioModelType) ||
  model<UsuarioDoc>("Usuario", usuarioSchema);
