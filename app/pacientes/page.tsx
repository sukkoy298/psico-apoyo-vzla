import type { Metadata } from "next";
import { Navbar } from "../_components/navbar";
import { Footer } from "../_components/footer";
import { Form } from "../_components/form";

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
              <li>Completa el formulario de solicitud de abajo.</li>
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
        </section>

        <section className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mx-auto max-w-4xl px-6 py-16">
            <h2 className="text-2xl font-semibold">Solicitar atención</h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-300">
              Toda la información que compartas es confidencial y se usará
              únicamente para asignarte un profesional adecuado.
            </p>

            <Form
              endpoint="/api/pacientes"
              submitLabel="Enviar mi solicitud"
              okMessage="¡Gracias por confiar en nosotros! Un coordinador te contactará en menos de 48 horas."
              fields={[
                { name: "nombre", label: "Nombre", required: true },
                {
                  name: "edad",
                  label: "Edad",
                  type: "number",
                  required: true,
                  min: 5,
                  max: 120,
                },
                {
                  name: "telefono",
                  label: "Teléfono o WhatsApp",
                  type: "tel",
                  required: true,
                },
                { name: "email", label: "Correo electrónico", type: "email" },
                { name: "estado", label: "Estado o región", required: true },
                {
                  name: "modalidad",
                  label: "Modalidad preferida",
                  defaultValue: "videollamada",
                  options: ["videollamada", "llamada", "presencial", "cualquiera"],
                },
                {
                  name: "mensaje",
                  label: "Cuéntanos brevemente cómo te sientes",
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
