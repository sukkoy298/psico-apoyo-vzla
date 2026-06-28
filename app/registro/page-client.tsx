"use client";

import { useState } from "react";
import {
  RegistroPacienteForm,
  RegistroPsicologoForm,
} from "./_components/forms";

type Tab = "psicologo" | "paciente";

export default function RegistroClient() {
  const [tab, setTab] = useState<Tab>("psicologo");
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight">Crear cuenta</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-300">
        Regístrate como psicólogo voluntario o como paciente que necesita
        atención.
      </p>

      <div
        role="tablist"
        aria-label="Tipo de cuenta"
        className="mt-8 inline-flex rounded-lg border border-zinc-200 p-1 dark:border-zinc-800"
      >
        <button
          role="tab"
          aria-selected={tab === "psicologo"}
          onClick={() => setTab("psicologo")}
          className={`rounded-md px-4 py-2 text-sm font-medium ${
            tab === "psicologo"
              ? "bg-emerald-600 text-white"
              : "text-zinc-700 dark:text-zinc-200"
          }`}
        >
          Soy psicólogo
        </button>
        <button
          role="tab"
          aria-selected={tab === "paciente"}
          onClick={() => setTab("paciente")}
          className={`rounded-md px-4 py-2 text-sm font-medium ${
            tab === "paciente"
              ? "bg-emerald-600 text-white"
              : "text-zinc-700 dark:text-zinc-200"
          }`}
        >
          Soy paciente
        </button>
      </div>

      <div className="mt-8">
        {tab === "psicologo" ? <RegistroPsicologoForm /> : <RegistroPacienteForm />}
      </div>
    </section>
  );
}
