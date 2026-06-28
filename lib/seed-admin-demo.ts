import { config } from "dotenv";
config({ path: ".env.local" });
config({ path: ".env" });
import bcrypt from "bcryptjs";
import { connectDB } from "./mongodb";
import { UsuarioModel } from "./models/usuario";

const DEMO_EMAIL = "admin@psicoapoyo.local";
const DEMO_PASSWORD = "PsicoAdmin123!";
const DEMO_NOMBRE = "Admin";

async function main() {
  const envEmail = process.env.ADMIN_EMAIL?.trim();
  const envPassword = process.env.ADMIN_PASSWORD?.trim();
  const envNombre = process.env.ADMIN_NOMBRE?.trim();

  const email = (envEmail && envEmail.length > 0 ? envEmail : DEMO_EMAIL).toLowerCase();
  const password =
    envPassword && envPassword.length > 0 ? envPassword : DEMO_PASSWORD;
  const nombre =
    envNombre && envNombre.length > 0 ? envNombre : DEMO_NOMBRE;

  if (password.length < 8) {
    console.error("La contraseña debe tener al menos 8 caracteres.");
    process.exit(1);
  }

  await connectDB();

  const existe = await UsuarioModel.findOne({ email });
  if (existe) {
    console.log(`Ya existe un usuario con email ${email}.`);
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await UsuarioModel.create({
    email,
    passwordHash,
    nombre,
    rol: "admin",
  });

  console.log(`Admin demo creado: ${email} / ${password}`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
