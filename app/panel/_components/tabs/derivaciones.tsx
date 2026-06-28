"use client";

import { useState } from "react";

type Derivacion = {
  _id: string;
  nombrePaciente: string;
  edad: number;
  rango: "infantil" | "adultos";
  nombrePsicologo: string;
  telefonoPsicologo: string;
  createdAt: string;
};

export function DerivacionesTab() {
  const [data, setData] = useState<Derivacion[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function cargar() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/derivaciones", { cache: "no-store" });
      const json = (await res.json()) as
        | { ok: true; data: Derivacion[] }
        | { ok: false; error: string };
      if (!json.ok) {
        setError(json.error);
        setData(null);
        return;
      }
      setData(json.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-4">
      <button
        type="button"
        onClick={cargar}
        disabled={loading}
        className="inline-flex w-fit items-center justify-center rounded-md bg-emerald-600 px-5 py-2.5 font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
      >
        {loading ? "Cargando…" : "Cargar derivaciones"}
      </button>

      {error && (
        <p
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {error}
        </p>
      )}

      {data && data.length === 0 && (
        <p className="text-sm text-zinc-600">
          Aún no se registraron derivaciones.
        </p>
      )}

      {data && data.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-zinc-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-100 text-zinc-700">
              <tr>
                <th className="px-3 py-2">Fecha</th>
                <th className="px-3 py-2">Paciente</th>
                <th className="px-3 py-2">Edad</th>
                <th className="px-3 py-2">Rango</th>
                <th className="px-3 py-2">Psicólogo asignado</th>
                <th className="px-3 py-2">WhatsApp</th>
              </tr>
            </thead>
            <tbody>
              {data.map((d) => (
                <tr key={d._id} className="border-t border-zinc-200">
                  <td className="px-3 py-2 whitespace-nowrap">
                    {new Date(d.createdAt).toLocaleString("es-VE")}
                  </td>
                  <td className="px-3 py-2 font-medium">{d.nombrePaciente}</td>
                  <td className="px-3 py-2">{d.edad}</td>
                  <td className="px-3 py-2">{d.rango}</td>
                  <td className="px-3 py-2">{d.nombrePsicologo}</td>
                  <td className="px-3 py-2 font-mono text-xs">
                    {d.telefonoPsicologo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
