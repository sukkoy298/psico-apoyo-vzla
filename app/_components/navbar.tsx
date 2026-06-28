import Link from "next/link";

export function Navbar() {
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
          <li>
            <Link
              href="/psicologos"
              className="rounded-md px-3 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Soy psicólogo
            </Link>
          </li>
          <li>
            <Link
              href="/pacientes"
              className="rounded-md bg-emerald-600 px-3 py-2 font-medium text-white hover:bg-emerald-700"
            >
              Necesito ayuda
            </Link>
          </li>
          <li>
            <Link
              href="/panel"
              className="hidden rounded-md px-3 py-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-700 dark:hover:bg-zinc-800 sm:inline-block"
            >
              Coordinación
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
