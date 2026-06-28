import Link from "next/link";
import Image from "next/image";
import { auth } from "@/lib/auth";
import { logoutAction } from "../_actions/auth";

export async function Navbar() {
  const session = await auth();
  const rol = session?.user?.rol;
  const nombre = session?.user?.name;

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white shadow-sm">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-black">
        <Link href="/" className="flex items-center gap-3 font-heading font-bold text-xl tracking-tight text-zinc-900">
          <Image
            src="/logo.png"
            alt="Logo Psicólogos por Venezuela"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <span>Psicólogos por Venezuela</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className="text-zinc-600 hover:text-orange-700 transition-colors">
            Inicio
          </Link>
          <Link href="/#mision" className="text-zinc-600 hover:text-orange-700 transition-colors">
            Nuestra Misión
          </Link>
          {rol === "admin" && (
            <Link href="/panel" className="text-zinc-500 hover:text-zinc-800 transition-colors">
              Coordinación
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4 text-sm font-medium">
          {!session ? (
            <>
              <Link
                href="/login"
                className="hidden sm:inline-block px-4 py-2 text-zinc-600 hover:text-orange-700 transition-colors"
              >
                Iniciar sesión
              </Link>
              <Link
                href="/registro"
                className="hidden sm:inline-flex items-center justify-center rounded-lg bg-orange-600 px-5 py-2.5 text-white font-semibold shadow-sm shadow-orange-200/50 transition-all hover:bg-orange-700"
              >
                Crear cuenta
              </Link>
              <Link
                href="/registro"
                className="inline-flex sm:hidden items-center justify-center rounded-lg bg-orange-600 px-4 py-2 text-white font-semibold shadow-sm shadow-orange-200/50 transition-all hover:bg-orange-700"
              >
                Crear cuenta
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="rounded-md px-3 py-2 hover:bg-zinc-100 transition-colors"
              >
                {nombre ?? "Mi cuenta"}
              </Link>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="rounded-md border border-zinc-300 px-3 py-2 hover:bg-zinc-100 transition-colors"
                >
                  Salir
                </button>
              </form>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
