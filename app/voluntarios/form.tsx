"use client";

import { useState, type FormEvent } from "react";

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "ok" }
  | { kind: "error"; message: string };

export function VoluntarioForm() {
  const [state, setState] = useState<State>({ kind: "idle" });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.kind === "loading") return;

    const fd = new FormData(e.currentTarget);
    const payload = {
      nombre: String(fd.get("nombre") ?? "").trim(),
      email: String(fd.get("email") ?? "").trim(),
      colegiatura: String(fd.get("colegiatura") ?? "").trim(),
      especialidad: String(fd.get("especialidad") ?? "").trim(),
      telefonoWhatsapp: String(fd.get("telefonoWhatsapp") ?? "").trim(),
      rangoAtencion: String(fd.get("rangoAtencion") ?? "adultos"),
      modalidad: String(fd.get("modalidad") ?? "online"),
      mensaje: String(fd.get("mensaje") ?? "").trim(),
    };

    setState({ kind: "loading" });
    try {
      const res = await fetch("/api/voluntarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json()) as
        | { ok: true; id: string }
        | { ok: false; error: string };
      if (!json.ok) {
        setState({ kind: "error", message: json.error });
        return;
      }
      setState({ kind: "ok" });
    } catch {
      setState({
        kind: "error",
        message: "Error de conexión. Verificá tu internet e intentá de nuevo.",
      });
    }
  }

  if (state.kind === "ok") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
        <h3 className="text-lg font-semibold">¡Recibimos tu solicitud!</h3>
        <p className="mt-2 text-sm">
          Nuestro equipo de coordinación la revisará y te contactará al
          WhatsApp que nos indicaste para confirmar la colegiatura y sumarte a
          la red de atención. Gracias por sumarte.
        </p>
        <button
          type="button"
          onClick={() => setState({ kind: "idle" })}
          className="mt-4 inline-flex items-center justify-center rounded-md border border-emerald-300 bg-white px-4 py-2 text-sm font-medium text-emerald-900 hover:bg-emerald-100"
        >
          Enviar otra
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-5 rounded-2xl border border-zinc-200 bg-white p-6 sm:grid-cols-2"
    >
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">
          Nombre completo <span className="text-red-600">*</span>
        </span>
        <input
          name="nombre"
          type="text"
          required
          className="rounded-md border border-zinc-300 bg-white px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">
          Email de contacto <span className="text-red-600">*</span>
        </span>
        <input
          name="email"
          type="email"
          required
          className="rounded-md border border-zinc-300 bg-white px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">
          Número de colegiatura <span className="text-red-600">*</span>
        </span>
        <input
          name="colegiatura"
          type="text"
          required
          className="rounded-md border border-zinc-300 bg-white px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Especialidad</span>
        <input
          name="especialidad"
          type="text"
          placeholder="Clínica, infantil, de emergencia…"
          className="rounded-md border border-zinc-300 bg-white px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm sm:col-span-2">
        <span className="font-medium">
          WhatsApp de contacto <span className="text-red-600">*</span>
        </span>
        <input
          name="telefonoWhatsapp"
          type="tel"
          required
          placeholder="+58 414 1234567"
          className="rounded-md border border-zinc-300 bg-white px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Rango etario que atendés</span>
        <select
          name="rangoAtencion"
          defaultValue="adultos"
          className="rounded-md border border-zinc-300 bg-white px-3 py-2"
        >
          <option value="infantil">Infantil</option>
          <option value="adultos">Adultos</option>
          <option value="ambos">Ambos</option>
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Modalidad</span>
        <select
          name="modalidad"
          defaultValue="online"
          className="rounded-md border border-zinc-300 bg-white px-3 py-2"
        >
          <option value="online">Atención en línea</option>
          <option value="presencial">Atención presencial</option>
          <option value="ambas">Ambas</option>
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm sm:col-span-2">
        <span className="font-medium">Mensaje (opcional)</span>
        <textarea
          name="mensaje"
          rows={3}
          className="rounded-md border border-zinc-300 bg-white px-3 py-2"
        />
      </label>

      {state.kind === "error" && (
        <p
          role="alert"
          className="sm:col-span-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {state.message}
        </p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={state.kind === "loading"}
          className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-5 py-3 font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {state.kind === "loading"
            ? "Enviando…"
            : "Enviar solicitud de voluntario"}
        </button>
      </div>
    </form>
  );
}
