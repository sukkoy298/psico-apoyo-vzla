"use client";

import { useState } from "react";
import { SolicitudesVoluntariosTab } from "./tabs/solicitudes-voluntarios";
import { PsicologosTab } from "./tabs/psicologos";
import { DerivacionesTab } from "./tabs/derivaciones";

type Tab = "pendientes" | "psicologos" | "derivaciones";

export function Panel() {
  const [tab, setTab] = useState<Tab>("pendientes");
  return (
    <div>
      <div
        role="tablist"
        aria-label="Sección del panel"
        className="inline-flex flex-wrap rounded-lg border border-zinc-200 p-1"
      >
        <button
          role="tab"
          aria-selected={tab === "pendientes"}
          onClick={() => setTab("pendientes")}
          className={`rounded-md px-4 py-2 text-sm font-medium ${
            tab === "pendientes"
              ? "bg-orange-600 text-white"
              : "text-zinc-700 hover:bg-zinc-100"
          }`}
        >
          Voluntarios pendientes
        </button>
        <button
          role="tab"
          aria-selected={tab === "psicologos"}
          onClick={() => setTab("psicologos")}
          className={`rounded-md px-4 py-2 text-sm font-medium ${
            tab === "psicologos"
              ? "bg-orange-600 text-white"
              : "text-zinc-700 hover:bg-zinc-100"
          }`}
        >
          Psicólogos
        </button>
        <button
          role="tab"
          aria-selected={tab === "derivaciones"}
          onClick={() => setTab("derivaciones")}
          className={`rounded-md px-4 py-2 text-sm font-medium ${
            tab === "derivaciones"
              ? "bg-orange-600 text-white"
              : "text-zinc-700 hover:bg-zinc-100"
          }`}
        >
          Derivaciones
        </button>
      </div>
      <div className="mt-6">
        {tab === "pendientes" && <SolicitudesVoluntariosTab />}
        {tab === "psicologos" && <PsicologosTab />}
        {tab === "derivaciones" && <DerivacionesTab />}
      </div>
    </div>
  );
}
