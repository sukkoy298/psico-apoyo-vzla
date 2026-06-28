import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { Navbar } from "../_components/navbar";
import { Footer } from "../_components/footer";
import { Panel } from "./_components/panel";

export const metadata: Metadata = {
  title: "Panel de coordinación — Psicólogos por Venezuela",
  description: "Panel interno para revisar las solicitudes de atención psicológica.",
};

export default async function PanelPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");
  if (session.user.rol !== "admin") redirect("/dashboard");

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-6 py-12 sm:py-16">
          <p className="mb-3 text-sm font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
            Solo coordinación
          </p>
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Panel de coordinación
          </h1>
          <p className="mt-3 text-zinc-600 dark:text-zinc-300">
            Revisa solicitudes de pacientes y valida a los psicólogos
            voluntarios.
          </p>
          <div className="mt-8">
            <Panel />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
