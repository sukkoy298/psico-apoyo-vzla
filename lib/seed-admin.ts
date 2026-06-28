import bcrypt from "bcryptjs";
import { connectDB } from "./mongodb";
import { UsuarioModel } from "./models/usuario";

async function main() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  const nombre = process.env.ADMIN_NOMBRE ?? "Coordinación";

  if (!email || !password) {
    console.error(
      "Faltan variables ADMIN_EMAIL y ADMIN_PASSWORD en el entorno."
    );
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("ADMIN_PASSWORD debe tener al menos 8 caracteres.");
    process.exit(1);
  }

  await connectDB();

  const existe = await UsuarioModel.findOne({ email: email.toLowerCase() });
  if (existe) {
    console.log(`Ya existe un usuario con email ${email}.`);
    process.exit(0);
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await UsuarioModel.create({
    email: email.toLowerCase(),
    passwordHash,
    nombre,
    rol: "admin",
  });

  console.log(`Admin creado: ${email}`);
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
