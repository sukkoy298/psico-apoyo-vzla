import {
  Schema,
  model,
  models,
  type InferSchemaType,
  type Model,
} from "mongoose";

const derivacionSchema = new Schema(
  {
    nombrePaciente: { type: String, required: true, trim: true },
    edad: { type: Number, required: true, min: 0, max: 120 },
    rango: { type: String, enum: ["infantil", "adultos"], required: true },
    nombrePsicologo: { type: String, required: true, trim: true },
    telefonoPsicologo: { type: String, required: true, trim: true },
    psicologoId: {
      type: Schema.Types.ObjectId,
      ref: "Psicologo",
      required: true,
    },
  },
  { timestamps: true }
);

derivacionSchema.index({ createdAt: -1 });
derivacionSchema.index({ psicologoId: 1, createdAt: -1 });

export type DerivacionDoc = InferSchemaType<typeof derivacionSchema> & {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

type DerivacionModelType = Model<DerivacionDoc>;

export const DerivacionModel: DerivacionModelType =
  (models.Derivacion as DerivacionModelType) ||
  model<DerivacionDoc>("Derivacion", derivacionSchema);
