export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-6 text-sm text-zinc-600 dark:text-zinc-400 sm:flex-row">
        <p>© {new Date().getFullYear()} Psicólogos por Venezuela. Todos los derechos reservados.</p>
        <p>
          Si estás en crisis, llama a la línea de emergencia local. Este servicio
          no reemplaza la atención de urgencias.
        </p>
      </div>
    </footer>
  );
}
