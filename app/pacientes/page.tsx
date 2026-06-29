import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "../_components/navbar";
import { Footer } from "../_components/footer";

export const metadata: Metadata = {
  title: "Necesito ayuda — Psicólogos por Venezuela",
  description:
    "Solicita apoyo psicológico gratuito si tú o tu familia fueron afectados por el terremoto en Venezuela. No necesitás registrarte.",
};

export default function PacientesPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-orange-700">
            Para personas afectadas
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            No tienes que enfrentar esto solo/a
          </h1>
          <p className="mt-4 text-lg text-zinc-600">
            Es normal sentir miedo, tristeza, confusión o agotamiento después
            de un terremoto. Un equipo de psicólogos voluntarios está disponible
            para escucharte y acompañarte, de forma gratuita y confidencial.
          </p>

          <div className="mt-10 rounded-2xl border border-orange-200 bg-orange-50 p-6 text-orange-900">
            <h2 className="text-lg font-semibold">¿Cómo funciona?</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5">
              <li>Hacé clic en «Atención inmediata».</li>
              <li>Indicá tu nombre y tu edad.</li>
              <li>
                Te conectamos automáticamente por WhatsApp con un psicólogo
                voluntario disponible para tu rango etario.
              </li>
            </ol>
            <p className="mt-4 text-sm">
              No necesitás registrarte ni crear una cuenta.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-zinc-200 bg-white p-5">
              <h3 className="text-base font-semibold text-zinc-900">Niños y niñas</h3>
              <p className="mt-1 text-sm text-zinc-600">De 0 a 10 años.</p>
            </div>
            <div className="rounded-xl border border-orange-300 bg-orange-50 p-5 ring-1 ring-orange-200">
              <h3 className="text-base font-semibold text-orange-900">Adolescentes</h3>
              <p className="mt-1 text-sm text-orange-800">De 11 a 18 años.</p>
            </div>
            <div className="rounded-xl border border-zinc-200 bg-white p-5">
              <h3 className="text-base font-semibold text-zinc-900">Adultos</h3>
              <p className="mt-1 text-sm text-zinc-600">De 19 años en adelante.</p>
            </div>
          </div>

          <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6">
            <h2 className="text-lg font-semibold">Solicitar atención</h2>
            <p className="mt-2 text-sm text-zinc-600">
              Si necesitás apoyo inmediato, ingresá a la pantalla de atención.
              La conexión con un profesional demora solo unos segundos.
            </p>
            <div className="mt-4">
              <Link
                href="/atencion"
                className="inline-flex items-center justify-center rounded-md bg-orange-600 px-5 py-2.5 font-medium text-white hover:bg-orange-700"
              >
                Atención inmediata
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
