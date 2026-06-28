"use client";

import { useState, type FormEvent } from "react";

type DerivarResponse =
  | { status: "ok"; link: string; nombre: string }
  | { status: "sin_disponibilidad" };

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "espera" }
  | { kind: "ok"; link: string; nombre: string }
  | { kind: "error"; message: string };

export default function AtencionClient() {
  const [state, setState] = useState<State>({ kind: "idle" });
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state.kind === "loading") return;

    const edadNum = Number(edad);
    if (!nombre.trim() || !Number.isFinite(edadNum)) {
      setState({ kind: "error", message: "Completa tu nombre y edad." });
      return;
    }

    setState({ kind: "loading" });

    try {
      const res = await fetch("/api/derivar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: nombre.trim(), edad: edadNum }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as {
          error?: string;
        };
        setState({
          kind: "error",
          message: data.error ?? "No pudimos procesar tu solicitud.",
        });
        return;
      }

      const data = (await res.json()) as DerivarResponse;

      if (data.status === "ok") {
        setState({ kind: "ok", link: data.link, nombre: data.nombre });
        window.location.href = data.link;
        return;
      }

      setState({ kind: "espera" });
    } catch {
      setState({
        kind: "error",
        message: "Error de conexión. Verificá tu internet e intentá de nuevo.",
      });
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
      <p className="mb-3 text-sm font-medium uppercase tracking-wide text-emerald-700">
        Atención inmediata
      </p>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        Te conectamos con un profesional
      </h1>
      <p className="mt-3 text-zinc-600">
        No necesitás registrarte. Indicános tu nombre y edad y te derivaremos
        al chat de WhatsApp del próximo psicólogo o psicóloga voluntaria
        disponible para tu rango etario.
      </p>

      {state.kind === "ok" ? (
        <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
          <h2 className="text-lg font-semibold">Conectando con {state.nombre}…</h2>
          <p className="mt-2 text-sm">
            Si la redirección no funciona, abrí este enlace:
          </p>
          <a
            href={state.link}
            className="mt-2 inline-block break-all text-sm font-medium underline"
          >
            {state.link}
          </a>
        </div>
      ) : state.kind === "espera" ? (
        <div
          role="alert"
          className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-900"
        >
          <h2 className="text-lg font-semibold">
            En este momento no hay profesionales disponibles
          </h2>
          <p className="mt-2 text-sm">
            Por favor, intentá más tarde. Estamos trabajando para ampliar la
            red de voluntarios.
          </p>
          <button
            type="button"
            onClick={() => setState({ kind: "idle" })}
            className="mt-4 inline-flex items-center justify-center rounded-md border border-amber-300 bg-white px-4 py-2 text-sm font-medium text-amber-900 hover:bg-amber-100"
          >
            Reintentar
          </button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="mt-10 grid gap-5 rounded-2xl border border-zinc-200 bg-white p-6 sm:grid-cols-2"
        >
          <label className="flex flex-col gap-1 text-sm sm:col-span-2">
            <span className="font-medium">Nombre</span>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              autoComplete="name"
              className="rounded-md border border-zinc-300 bg-white px-3 py-2"
              placeholder="Con el que te identifiques"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm sm:col-span-2">
            <span className="font-medium">Edad</span>
            <input
              type="number"
              value={edad}
              onChange={(e) => setEdad(e.target.value)}
              required
              min={0}
              max={120}
              className="rounded-md border border-zinc-300 bg-white px-3 py-2"
              placeholder="Ej. 25"
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
                ? "Conectando…"
                : "Solicitar atención ahora"}
            </button>
          </div>

          <p className="sm:col-span-2 text-xs text-zinc-500">
            Al continuar, se abrirá WhatsApp en una nueva pestaña con un
            mensaje predirigido al profesional disponible.
          </p>
        </form>
      )}
    </section>
  );
}
