import type { Metadata } from "next";
import { Navbar } from "../_components/navbar";
import { Footer } from "../_components/footer";
import { Form } from "../_components/form";

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
        </section>

        <section className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mx-auto max-w-4xl px-6 py-16">
            <h2 className="text-2xl font-semibold">Formulario de inscripción</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300">
              Déjanos tus datos y nuestro equipo de coordinación se pondrá en
              contacto contigo para validar tu información y asignarte casos.
            </p>

            <Form
              endpoint="/api/psicologos"
              submitLabel="Enviar mi inscripción"
              okMessage="¡Gracias por sumarte! Un coordinador te contactará pronto para validar tu colegiatura."
              fields={[
                { name: "nombre", label: "Nombre completo", required: true },
                { name: "email", label: "Correo electrónico", type: "email", required: true },
                { name: "colegiatura", label: "Número de colegiatura", required: true },
                {
                  name: "especialidad",
                  label: "Especialidad",
                  placeholder: "Ej. psicología clínica, infantil, de emergencia…",
                },
                {
                  name: "modalidad",
                  label: "Modalidad",
                  defaultValue: "online",
                  options: ["online", "presencial", "ambas"],
                  span: 2,
                },
                {
                  name: "mensaje",
                  label: "Mensaje (opcional)",
                  textarea: true,
                  rows: 4,
                  span: 2,
                },
              ]}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
