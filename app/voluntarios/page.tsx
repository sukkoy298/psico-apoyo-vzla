import type { Metadata } from "next";
import { Navbar } from "../_components/navbar";
import { Footer } from "../_components/footer";
import { VoluntarioForm } from "./form";

export const metadata: Metadata = {
  title: "Quiero ser voluntario — Psicólogos por Venezuela",
  description:
    "Sumate como psicólogo voluntario a la red de apoyo psicológico para personas afectadas por el terremoto en Venezuela.",
};

export default function VoluntariosPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-emerald-700">
            Para profesionales
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Súmate como psicólogo voluntario
          </h1>
          <p className="mt-4 text-lg text-zinc-600">
            Tu tiempo y tu experiencia pueden marcar una diferencia enorme en
            la vida de personas y familias que atraviesan un momento crítico
            tras el terremoto.
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

          <div className="mt-12 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
            <h2 className="text-lg font-semibold">¿Cómo funciona?</h2>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm">
              <li>Completás el formulario con tus datos y tu WhatsApp.</li>
              <li>
                Nuestro equipo de coordinación valida tu colegiatura y datos de
                contacto.
              </li>
              <li>
                Si todo está en orden, te sumamos a la red y empezás a recibir
                contactos de personas que necesitan atención.
              </li>
            </ol>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold tracking-tight">
              Formulario de inscripción
            </h2>
            <p className="mt-2 text-sm text-zinc-600">
              Los campos marcados con <span className="text-red-600">*</span>{" "}
              son obligatorios.
            </p>
            <div className="mt-6">
              <VoluntarioForm />
            </div>
          </div>

          <p className="mt-10 text-sm text-zinc-600">
            ¿Tenés alguna duda? Escribinos a{" "}
            <a
              href="mailto:carlosaug47@gmail.com"
              className="font-medium text-emerald-700 underline hover:text-emerald-800"
            >
              carlosaug47@gmail.com
            </a>
            .
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
