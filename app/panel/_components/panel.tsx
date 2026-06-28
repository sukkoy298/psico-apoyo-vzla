"use client";

import { useState } from "react";

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

type Psicologo = {
  _id: string;
  nombre: string;
  email: string;
  colegiatura: string;
  especialidad?: string;
  modalidad: string;
  estado: string;
  createdAt: string;
};

type Tab = "solicitudes" | "psicologos";

export function Panel() {
  const [tab, setTab] = useState<Tab>("solicitudes");
  return (
    <div>
      <div
        role="tablist"
        aria-label="Sección del panel"
        className="inline-flex rounded-lg border border-zinc-200 p-1 dark:border-zinc-800"
      >
        <button
          role="tab"
          aria-selected={tab === "solicitudes"}
          onClick={() => setTab("solicitudes")}
          className={`rounded-md px-4 py-2 text-sm font-medium ${
            tab === "solicitudes"
              ? "bg-emerald-600 text-white"
              : "text-zinc-700 dark:text-zinc-200"
          }`}
        >
          Solicitudes
        </button>
        <button
          role="tab"
          aria-selected={tab === "psicologos"}
          onClick={() => setTab("psicologos")}
          className={`rounded-md px-4 py-2 text-sm font-medium ${
            tab === "psicologos"
              ? "bg-emerald-600 text-white"
              : "text-zinc-700 dark:text-zinc-200"
          }`}
        >
          Psicólogos
        </button>
      </div>
      <div className="mt-6">
        {tab === "solicitudes" ? <SolicitudesTab /> : <PsicologosTab />}
      </div>
    </div>
  );
}

function SolicitudesTab() {
  const [data, setData] = useState<Solicitud[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filtro, setFiltro] = useState("");

  async function cargar() {
    setLoading(true);
    setError(null);
    const url = filtro
      ? `/api/pacientes?estado=${encodeURIComponent(filtro)}`
      : "/api/pacientes";
    try {
      const res = await fetch(url, { cache: "no-store" });
      const json = (await res.json()) as
        | { ok: true; data: Solicitud[] }
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
      <div className="flex flex-wrap items-end gap-3">
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
          type="button"
          onClick={cargar}
          disabled={loading}
          className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-5 py-2.5 font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {loading ? "Cargando…" : "Cargar solicitudes"}
        </button>
      </div>

      {error && (
        <p
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-900/30 dark:text-red-100"
        >
          {error}
        </p>
      )}

      {data && data.length === 0 && (
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          No hay solicitudes para mostrar.
        </p>
      )}

      {data && data.length > 0 && (
        <TablaSolicitudes data={data} onChanged={cargar} />
      )}
    </div>
  );
}

function TablaSolicitudes({
  data,
  onChanged,
}: {
  data: Solicitud[];
  onChanged: () => void;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
          <tr>
            <th className="px-3 py-2">Fecha</th>
            <th className="px-3 py-2">Nombre</th>
            <th className="px-3 py-2">Edad</th>
            <th className="px-3 py-2">Región</th>
            <th className="px-3 py-2">Contacto</th>
            <th className="px-3 py-2">Modalidad</th>
            <th className="px-3 py-2">Mensaje</th>
            <th className="px-3 py-2">Estatus</th>
          </tr>
        </thead>
        <tbody>
          {data.map((s) => (
            <SolicitudRow key={s._id} s={s} onChanged={onChanged} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SolicitudRow({
  s,
  onChanged,
}: {
  s: Solicitud;
  onChanged: () => void;
}) {
  const [estado, setEstado] = useState(s.estadoSolicitud);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function guardar() {
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/pacientes/${s._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado }),
      });
      const json = (await res.json()) as
        | { ok: true }
        | { ok: false; error: string };
      if (!json.ok) {
        setMsg(json.error);
      } else {
        setMsg("Guardado");
        onChanged();
      }
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <tr className="border-t border-zinc-200 dark:border-zinc-800">
      <td className="px-3 py-2 whitespace-nowrap">
        {new Date(s.createdAt).toLocaleString("es-VE")}
      </td>
      <td className="px-3 py-2 font-medium">{s.nombre}</td>
      <td className="px-3 py-2">{s.edad}</td>
      <td className="px-3 py-2">{s.estado}</td>
      <td className="px-3 py-2">
        <div>{s.telefono}</div>
        {s.email && (
          <div className="text-zinc-500 dark:text-zinc-400">{s.email}</div>
        )}
      </td>
      <td className="px-3 py-2">{s.modalidad}</td>
      <td className="px-3 py-2 max-w-xs">
        <span className="line-clamp-2">{s.mensaje}</span>
      </td>
      <td className="px-3 py-2">
        <div className="flex flex-col gap-1">
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs dark:border-zinc-700 dark:bg-zinc-950"
          >
            <option value="pendiente">pendiente</option>
            <option value="en_proceso">en_proceso</option>
            <option value="atendido">atendido</option>
            <option value="descartado">descartado</option>
          </select>
          <button
            type="button"
            onClick={guardar}
            disabled={saving || estado === s.estadoSolicitud}
            className="rounded-md bg-zinc-900 px-2 py-1 text-xs font-medium text-white hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-white"
          >
            {saving ? "…" : "Guardar"}
          </button>
          {msg && <span className="text-xs text-zinc-500">{msg}</span>}
        </div>
      </td>
    </tr>
  );
}

function PsicologosTab() {
  const [data, setData] = useState<Psicologo[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function cargar() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/psicologos", { cache: "no-store" });
      const json = (await res.json()) as
        | { ok: true; data: Psicologo[] }
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
        {loading ? "Cargando…" : "Cargar psicólogos"}
      </button>

      {error && (
        <p
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-900/30 dark:text-red-100"
        >
          {error}
        </p>
      )}

      {data && data.length === 0 && (
        <p className="text-sm text-zinc-600 dark:text-zinc-300">
          No hay psicólogos registrados.
        </p>
      )}

      {data && data.length > 0 && (
        <TablaPsicologos data={data} onChanged={cargar} />
      )}
    </div>
  );
}

function TablaPsicologos({
  data,
  onChanged,
}: {
  data: Psicologo[];
  onChanged: () => void;
}) {
  return (
    <div className="overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-100 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
          <tr>
            <th className="px-3 py-2">Fecha</th>
            <th className="px-3 py-2">Nombre</th>
            <th className="px-3 py-2">Email</th>
            <th className="px-3 py-2">Colegiatura</th>
            <th className="px-3 py-2">Especialidad</th>
            <th className="px-3 py-2">Modalidad</th>
            <th className="px-3 py-2">Validación</th>
          </tr>
        </thead>
        <tbody>
          {data.map((p) => (
            <PsicologoRow key={p._id} p={p} onChanged={onChanged} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PsicologoRow({
  p,
  onChanged,
}: {
  p: Psicologo;
  onChanged: () => void;
}) {
  const [estado, setEstado] = useState(p.estado);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function guardar() {
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/psicologos/${p._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado }),
      });
      const json = (await res.json()) as
        | { ok: true }
        | { ok: false; error: string };
      if (!json.ok) {
        setMsg(json.error);
      } else {
        setMsg("Guardado");
        onChanged();
      }
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setSaving(false);
    }
  }

  return (
    <tr className="border-t border-zinc-200 dark:border-zinc-800">
      <td className="px-3 py-2 whitespace-nowrap">
        {new Date(p.createdAt).toLocaleString("es-VE")}
      </td>
      <td className="px-3 py-2 font-medium">{p.nombre}</td>
      <td className="px-3 py-2">{p.email}</td>
      <td className="px-3 py-2 font-mono text-xs">{p.colegiatura}</td>
      <td className="px-3 py-2">{p.especialidad || "—"}</td>
      <td className="px-3 py-2">{p.modalidad}</td>
      <td className="px-3 py-2">
        <div className="flex flex-col gap-1">
          <select
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
            className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs dark:border-zinc-700 dark:bg-zinc-950"
          >
            <option value="pendiente">pendiente</option>
            <option value="validado">validado</option>
            <option value="asignado">asignado</option>
            <option value="inactivo">inactivo</option>
          </select>
          <button
            type="button"
            onClick={guardar}
            disabled={saving || estado === p.estado}
            className="rounded-md bg-zinc-900 px-2 py-1 text-xs font-medium text-white hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-200 dark:text-zinc-900 dark:hover:bg-white"
          >
            {saving ? "…" : "Guardar"}
          </button>
          {msg && <span className="text-xs text-zinc-500">{msg}</span>}
        </div>
      </td>
    </tr>
  );
}
