import Link from "next/link";
import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 py-20 sm:py-28">
          <div className="max-w-3xl">
            <p className="mb-4 inline-block rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
              Red de apoyo psicológico — emergencia por terremoto
            </p>
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
              Acompañamos a las personas afectadas por el terremoto en Venezuela
            </h1>
            <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-300">
              Somos una organización benéfica que conecta a psicólogos
              voluntarios con personas y familias que necesitan contención
              emocional tras el desastre. La atención es gratuita y confidencial.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/psicologos"
                className="inline-flex items-center justify-center rounded-md border border-zinc-300 px-5 py-3 font-medium hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800"
              >
                Quiero ser voluntario
              </Link>
              <Link
                href="/pacientes"
                className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-5 py-3 font-medium text-white hover:bg-emerald-700"
              >
                Necesito atención psicológica
              </Link>
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 sm:grid-cols-2">
            <article className="rounded-2xl border border-zinc-200 p-8 dark:border-zinc-800">
              <h2 className="text-2xl font-semibold">Para psicólogos</h2>
              <p className="mt-3 text-zinc-600 dark:text-zinc-300">
                Si eres psicólogo colegiado y deseas ofrecer tu tiempo y
                experiencia, te explicamos cómo sumarte a la red de atención
                remota o presencial.
              </p>
              <Link
                href="/psicologos"
                className="mt-6 inline-block font-medium text-emerald-700 hover:underline dark:text-emerald-400"
              >
                Ver cómo participar →
              </Link>
            </article>
            <article className="rounded-2xl border border-zinc-200 p-8 dark:border-zinc-800">
              <h2 className="text-2xl font-semibold">Para pacientes</h2>
              <p className="mt-3 text-zinc-600 dark:text-zinc-300">
                Si tú o tu familia fueron afectados por el terremoto, puedes
                solicitar orientación emocional gratuita con un profesional
                voluntario.
              </p>
              <Link
                href="/pacientes"
                className="mt-6 inline-block font-medium text-emerald-700 hover:underline dark:text-emerald-400"
              >
                Solicitar ayuda →
              </Link>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
