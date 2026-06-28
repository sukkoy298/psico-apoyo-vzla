"use client";

import { useState, type FormEvent } from "react";

type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "ok"; id: string }
  | { kind: "error"; message: string };

type Field = {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  options?: string[];
  textarea?: boolean;
  rows?: number;
  min?: number;
  max?: number;
  span?: 1 | 2;
  defaultValue?: string;
};

type Props = {
  endpoint: string;
  fields: Field[];
  submitLabel: string;
  okMessage?: string;
};

export function Form({ endpoint, fields, submitLabel, okMessage }: Props) {
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: "loading" });

    const formData = new FormData(e.currentTarget);
    const payload: Record<string, string | number> = {};
    for (const [key, value] of formData.entries()) {
      if (typeof value === "string" && value !== "") payload[key] = value;
    }

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as
        | { ok: true; id: string }
        | { ok: false; error: string };
      if (!data.ok) {
        setStatus({ kind: "error", message: data.error });
        return;
      }
      setStatus({ kind: "ok", id: data.id });
      e.currentTarget.reset();
    } catch (err) {
      setStatus({
        kind: "error",
        message:
          err instanceof Error
            ? err.message
            : "No se pudo enviar la solicitud. Intenta de nuevo.",
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5 sm:grid-cols-2">
      {fields.map((f) => (
        <label
          key={f.name}
          className={`flex flex-col gap-1 text-sm ${
            f.span === 2 ? "sm:col-span-2" : ""
          }`}
        >
          <span className="font-medium">{f.label}</span>
          {f.options ? (
            <select
              name={f.name}
              required={f.required}
              defaultValue={f.defaultValue ?? f.options[0]}
              className="rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
            >
              {f.options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          ) : f.textarea ? (
            <textarea
              name={f.name}
              rows={f.rows ?? 4}
              placeholder={f.placeholder}
              className="rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
            />
          ) : (
            <input
              type={f.type ?? "text"}
              name={f.name}
              required={f.required}
              placeholder={f.placeholder}
              min={f.min}
              max={f.max}
              className="rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
            />
          )}
        </label>
      ))}

      <div className="sm:col-span-2 flex flex-col gap-3">
        <button
          type="submit"
          disabled={status.kind === "loading"}
          className="inline-flex w-fit items-center justify-center rounded-md bg-emerald-600 px-5 py-3 font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {status.kind === "loading" ? "Enviando…" : submitLabel}
        </button>

        {status.kind === "ok" && (
          <p
            role="status"
            className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-900/30 dark:text-emerald-100"
          >
            {okMessage ?? "¡Gracias! Tu información fue registrada correctamente."}
          </p>
        )}
        {status.kind === "error" && (
          <p
            role="alert"
            className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-900/30 dark:text-red-100"
          >
            {status.message}
          </p>
        )}
      </div>
    </form>
  );
}
