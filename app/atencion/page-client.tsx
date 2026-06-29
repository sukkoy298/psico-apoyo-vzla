"use client";

import { useState, type FormEvent } from "react";

type DerivarResponse =
  | { status: "ok"; whatsapp: string; meet?: string; link?: string; nombre: string }
  | { status: "sin_disponibilidad" };

type State =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "espera" }
  | { kind: "ok"; whatsapp: string; meet?: string; nombre: string }
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
        setState({ kind: "ok", whatsapp: data.whatsapp, meet: data.meet, nombre: data.nombre });
        if (!data.meet) {
          window.location.href = data.whatsapp;
        }
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
          <h2 className="text-lg font-semibold">Te comunicamos con {state.nombre}</h2>
          <p className="mt-2 text-sm text-zinc-600">
            Elegí cómo querés contactar al profesional:
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={state.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-5 py-3 font-medium text-white hover:bg-emerald-700"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
            {state.meet && (
              <a
                href={state.meet}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>
                Google Meet
              </a>
            )}
          </div>
          <p className="mt-4 text-xs text-zinc-500">
            {state.meet
              ? "Elegí la opción que prefieras. Se abrirá una nueva pestaña."
              : "Se abrirá WhatsApp en una nueva pestaña con un mensaje predirigido."}
          </p>
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
              placeholder="Ej. 15"
            />
            <span className="text-xs text-zinc-500">
              Derivamos según el rango: 0-10, 11-18 o 19+.
            </span>
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
            Al continuar, te mostraremos las opciones disponibles para contactar
            al profesional.
          </p>
        </form>
      )}
    </section>
  );
}
