import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "../_components/navbar";
import { Footer } from "../_components/footer";

export const metadata: Metadata = {
  title: "Soy psicólogo — Psicólogos por Venezuela",
  description:
    "Sumate como voluntario a la red de apoyo psicológico para personas afectadas por el terremoto en Venezuela.",
};

export default function PsicologosPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-orange-700">
            Para profesionales
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Súmate como psicólogo voluntario
          </h1>
          <p className="mt-4 text-lg text-zinc-600">
            Tu tiempo y tu experiencia pueden marcar una diferencia enorme en la
            vida de personas y familias que atraviesan un momento crítico tras
            el terremoto.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-zinc-200 p-6">
              <h2 className="text-lg font-semibold">¿Qué ofrecemos?</h2>
              <ul className="mt-3 space-y-2 text-zinc-600">
                <li>• Coordinación logística y de casos.</li>
                <li>• Plataforma para atender en línea o presencialmente.</li>
                <li>• Supervisión clínica y grupos de apoyo entre pares.</li>
                <li>• Constancia de voluntariado para tu hoja de vida.</li>
              </ul>
            </div>
            <div className="rounded-xl border border-zinc-200 p-6">
              <h2 className="text-lg font-semibold">¿Qué pedimos?</h2>
              <ul className="mt-3 space-y-2 text-zinc-600">
                <li>• Título y colegiatura vigente.</li>
                <li>• Al menos 2 horas semanales de disponibilidad.</li>
                <li>• Compromiso ético y confidencialidad.</li>
                <li>• Empatía y respeto por la diversidad.</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-orange-200 bg-orange-50 p-6">
            <h2 className="text-lg font-semibold text-orange-900">
              ¿Listo para sumarte?
            </h2>
            <p className="mt-2 text-sm text-orange-800">
              No necesitás crear una cuenta. Completá el formulario de
              voluntario con tus datos y tu WhatsApp; nuestro equipo validará tu
              colegiatura y te sumaremos a la red de atención.
            </p>
            <Link
              href="/voluntarios"
              className="mt-4 inline-flex items-center justify-center rounded-md bg-orange-600 px-5 py-2.5 font-medium text-white hover:bg-orange-700"
            >
              Completar formulario
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
