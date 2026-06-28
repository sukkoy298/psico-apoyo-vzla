import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "../_components/navbar";
import { Footer } from "../_components/footer";

export const metadata: Metadata = {
  title: "Soy psicólogo — Psicólogos por Venezuela",
  description:
    "Únete como voluntario a la red de apoyo psicológico para personas afectadas por el terremoto en Venezuela.",
};

export default function PsicologosPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
            Para profesionales
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Súmate como psicólogo voluntario
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300">
            Tu tiempo y tu experiencia pueden marcar una diferencia enorme en la
            vida de personas y familias que atraviesan un momento crítico tras
            el terremoto.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
              <h2 className="text-lg font-semibold">¿Qué ofrecemos?</h2>
              <ul className="mt-3 space-y-2 text-zinc-600 dark:text-zinc-300">
                <li>• Coordinación logística y de casos.</li>
                <li>• Plataforma para atender en línea o presencialmente.</li>
                <li>• Supervisión clínica y grupos de apoyo entre pares.</li>
                <li>• Constancia de voluntariado para tu hoja de vida.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800">
              <h2 className="text-lg font-semibold">¿Qué pedimos?</h2>
              <ul className="mt-3 space-y-2 text-zinc-600 dark:text-zinc-300">
                <li>• Título y colegiatura vigente.</li>
                <li>• Al menos 2 horas semanales de disponibilidad.</li>
                <li>• Compromiso ético y confidencialidad.</li>
                <li>• Empatía y respeto por la diversidad.</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 dark:border-emerald-900/60 dark:bg-emerald-900/20">
            <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100">
              ¿Listo para sumarte?
            </h2>
            <p className="mt-2 text-sm text-emerald-900/80 dark:text-emerald-100/80">
              Crea tu cuenta de psicólogo. Te pediremos tu número de
              colegiatura; un administrador la validará antes de asignarte
              pacientes.
            </p>
            <Link
              href="/registro"
              className="mt-4 inline-flex items-center justify-center rounded-md bg-emerald-600 px-5 py-2.5 font-medium text-white hover:bg-emerald-700"
            >
              Crear cuenta de psicólogo
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
