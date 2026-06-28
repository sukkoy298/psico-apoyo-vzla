"use client";

import { useState, type FormEvent } from "react";

type Solicitud = {
  _id: string;
  nombre: string;
  edad: number;
  telefono: string;
  email?: string;
  estado: string;
  modalidad: string;
  mensaje?: string;
  estadoSolicitud: string;
  createdAt: string;
};

export function Panel() {
  const [key, setKey] = useState("");
  const [solicitudes, setSolicitudes] = useState<Solicitud[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<string>("");

  async function cargar(e?: FormEvent) {
    e?.preventDefault();
    setLoading(true);
    setError(null);

    const url = filtro
      ? `/api/pacientes?estado=${encodeURIComponent(filtro)}`
      : "/api/pacientes";

    try {
      const res = await fetch(url, {
        headers: { "x-admin-key": key },
        cache: "no-store",
      });
      const data = (await res.json()) as
        | { ok: true; data: Solicitud[] }
        | { ok: false; error: string };
      if (!data.ok) {
        setError(data.error);
        setSolicitudes(null);
        return;
      }
      setSolicitudes(data.data);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al cargar las solicitudes"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={cargar} className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Clave de coordinación</span>
          <input
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            required
            className="rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium">Estado</span>
          <select
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            className="rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
          >
            <option value="">Todas</option>
            <option value="pendiente">Pendientes</option>
            <option value="en_proceso">En proceso</option>
            <option value="atendido">Atendidas</option>
            <option value="descartado">Descartadas</option>
          </select>
        </label>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-5 py-2.5 font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {loading ? "Cargando…" : "Cargar solicitudes"}
        </button>
      </form>

      {error && (
        <p
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-900/30 dark:text-red-100"
        >
          {error}
        </p>
      )}

      {solicitudes && solicitudes.length === 0 && (
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          No hay solicitudes para mostrar.
        </p>
      )}

      {solicitudes && solicitudes.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
              <tr>
                <th className="px-3 py-2">Fecha</th>
                <th className="px-3 py-2">Nombre</th>
                <th className="px-3 py-2">Edad</th>
                <th className="px-3 py-2">Estado</th>
                <th className="px-3 py-2">Contacto</th>
                <th className="px-3 py-2">Modalidad</th>
                <th className="px-3 py-2">Mensaje</th>
                <th className="px-3 py-2">Estatus</th>
              </tr>
            </thead>
            <tbody>
              {solicitudes.map((s) => (
                <tr
                  key={s._id}
                  className="border-t border-zinc-200 dark:border-zinc-800"
                >
                  <td className="px-3 py-2 whitespace-nowrap">
                    {new Date(s.createdAt).toLocaleString("es-VE")}
                  </td>
                  <td className="px-3 py-2 font-medium">{s.nombre}</td>
                  <td className="px-3 py-2">{s.edad}</td>
                  <td className="px-3 py-2">{s.estado}</td>
                  <td className="px-3 py-2">
                    <div>{s.telefono}</div>
                    {s.email && (
                      <div className="text-zinc-500 dark:text-zinc-400">
                        {s.email}
                      </div>
                    )}
                  </td>
                  <td className="px-3 py-2">{s.modalidad}</td>
                  <td className="px-3 py-2 max-w-xs">
                    <span className="line-clamp-2">{s.mensaje}</span>
                  </td>
                  <td className="px-3 py-2">
                    <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-medium dark:bg-zinc-800">
                      {s.estadoSolicitud}
                    </span>
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
