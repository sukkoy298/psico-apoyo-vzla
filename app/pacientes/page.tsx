import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "../_components/navbar";
import { Footer } from "../_components/footer";

export const metadata: Metadata = {
  title: "Necesito ayuda — Psicólogos por Venezuela",
  description:
    "Solicita apoyo psicológico gratuito si tú o tu familia fueron afectados por el terremoto en Venezuela.",
};

export default function PacientesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
            Para personas afectadas
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            No tienes que enfrentar esto solo/a
          </h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-300">
            Es normal sentir miedo, tristeza, confusión o agotamiento después
            de un terremoto. Un equipo de psicólogos voluntarios está disponible
            para escucharte y acompañarte, de forma gratuita y confidencial.
          </p>

          <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-900/20 dark:text-emerald-100">
            <h2 className="text-lg font-semibold">¿Cómo funciona?</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5">
              <li>Crea tu cuenta como paciente.</li>
              <li>
                Un coordinador te contactará en menos de 48 horas para validar
                la información.
              </li>
              <li>
                Se te asignará un psicólogo voluntario según tu disponibilidad y
                necesidades.
              </li>
              <li>
                Las sesiones se realizan por videollamada, llamada o, según el
                caso, presencialmente.
              </li>
            </ol>
          </div>

          <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-lg font-semibold">Solicitar atención</h2>
            <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
              Para crear tu solicitud de atención, regístrate con tu correo
              electrónico. La información que compartas es confidencial.
            </p>
            <Link
              href="/registro"
              className="mt-4 inline-flex items-center justify-center rounded-md bg-emerald-600 px-5 py-2.5 font-medium text-white hover:bg-emerald-700"
            >
              Crear cuenta de paciente
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
