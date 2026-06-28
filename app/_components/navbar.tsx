import Link from "next/link";
import { auth } from "@/lib/auth";
import { logoutAction } from "../_actions/auth";

export async function Navbar() {
  const session = await auth();
  const rol = session?.user?.rol;
  const nombre = session?.user?.name;

  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span
            aria-hidden
            className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white"
          >
            ♥
          </span>
          <span>Psicólogos por Venezuela</span>
        </Link>
        <ul className="flex items-center gap-2 text-sm sm:gap-4">
          {!session && (
            <>
              <li>
                <Link
                  href="/login"
                  className="rounded-md px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Iniciar sesión
                </Link>
              </li>
              <li>
                <Link
                  href="/registro"
                  className="rounded-md bg-emerald-600 px-3 py-2 font-medium text-white hover:bg-emerald-700"
                >
                  Crear cuenta
                </Link>
              </li>
            </>
          )}
          {session && (
            <>
              <li>
                <Link
                  href="/dashboard"
                  className="rounded-md px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  {nombre ?? "Mi cuenta"}
                </Link>
              </li>
              {rol === "admin" && (
                <li>
                  <Link
                    href="/panel"
                    className="rounded-md px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  >
                    Panel
                  </Link>
                </li>
              )}
              <li>
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="rounded-md border border-zinc-300 px-3 py-2 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
                  >
                    Salir
                  </button>
                </form>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
}
