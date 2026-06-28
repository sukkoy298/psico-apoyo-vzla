"use client";

import { useState } from "react";

type Solicitud = {
  _id: string;
  nombre: string;
  email: string;
  colegiatura: string;
  especialidad?: string;
  telefonoWhatsapp?: string;
  linkMeet?: string;
  rangoAtencion: string;
  modalidad: string;
  mensaje?: string;
  estado: "pendiente" | "aprobado" | "rechazado";
  motivoRechazo?: string;
  createdAt: string;
};

export function SolicitudesVoluntariosTab() {
  const [data, setData] = useState<Solicitud[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filtro, setFiltro] = useState<"pendiente" | "aprobado" | "rechazado">(
    "pendiente"
  );

  async function cargar() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/admin/solicitudes-voluntarios?estado=${filtro}`,
        { cache: "no-store" }
      );
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
            onChange={(e) =>
              setFiltro(e.target.value as "pendiente" | "aprobado" | "rechazado")
            }
            className="rounded-md border border-zinc-300 bg-white px-3 py-2"
          >
            <option value="pendiente">Pendientes</option>
            <option value="aprobado">Aprobadas</option>
            <option value="rechazado">Rechazadas</option>
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
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {error}
        </p>
      )}

      {data && data.length === 0 && (
        <p className="text-sm text-zinc-600">
          No hay solicitudes para mostrar.
        </p>
      )}

      {data && data.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-zinc-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-100 text-zinc-700">
              <tr>
                <th className="px-3 py-2">Fecha</th>
                <th className="px-3 py-2">Nombre</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">WhatsApp</th>
                <th className="px-3 py-2">Meet</th>
                <th className="px-3 py-2">Colegiatura</th>
                <th className="px-3 py-2">Rango / Modalidad</th>
                <th className="px-3 py-2">Mensaje</th>
                {filtro === "pendiente" && (
                  <th className="px-3 py-2">Acciones</th>
                )}
              </tr>
            </thead>
            <tbody>
              {data.map((s) => (
                <SolicitudRow
                  key={s._id}
                  s={s}
                  recargar={cargar}
                  pendiente={filtro === "pendiente"}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function SolicitudRow({
  s,
  recargar,
  pendiente,
}: {
  s: Solicitud;
  recargar: () => void;
  pendiente: boolean;
}) {
  const [busy, setBusy] = useState<"aprobar" | "rechazar" | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [motivo, setMotivo] = useState("");

  async function aprobar() {
    setBusy("aprobar");
    setMsg(null);
    try {
      const res = await fetch(
        `/api/admin/solicitudes-voluntarios/${s._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accion: "aprobar" }),
        }
      );
      const json = (await res.json()) as
        | { ok: true; psicologoId: string }
        | { ok: false; error: string };
      if (!json.ok) {
        setMsg(json.error);
      } else {
        setMsg("Aprobado y agregado a la red");
        recargar();
      }
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Error al aprobar");
    } finally {
      setBusy(null);
    }
  }

  async function rechazar() {
    setBusy("rechazar");
    setMsg(null);
    try {
      const res = await fetch(
        `/api/admin/solicitudes-voluntarios/${s._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accion: "rechazar", motivo }),
        }
      );
      const json = (await res.json()) as
        | { ok: true }
        | { ok: false; error: string };
      if (!json.ok) {
        setMsg(json.error);
      } else {
        setMsg("Rechazado");
        recargar();
      }
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Error al rechazar");
    } finally {
      setBusy(null);
    }
  }

  return (
    <tr className="border-t border-zinc-200 align-top">
      <td className="px-3 py-2 whitespace-nowrap">
        {new Date(s.createdAt).toLocaleString("es-VE")}
      </td>
      <td className="px-3 py-2 font-medium">{s.nombre}</td>
      <td className="px-3 py-2 break-all">{s.email}</td>
      <td className="px-3 py-2 font-mono text-xs">
        {s.telefonoWhatsapp || "—"}
      </td>
      <td className="px-3 py-2 text-xs">
        {s.linkMeet ? (
          <a href={s.linkMeet} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
            Link
          </a>
        ) : "—"}
      </td>
      <td className="px-3 py-2 font-mono text-xs">{s.colegiatura}</td>
      <td className="px-3 py-2">
        <div>{s.rangoAtencion}</div>
        <div className="text-zinc-500">{s.modalidad}</div>
        {s.especialidad && (
          <div className="text-xs text-zinc-500">{s.especialidad}</div>
        )}
      </td>
      <td className="px-3 py-2 max-w-xs">
        <span className="line-clamp-3">{s.mensaje || "—"}</span>
        {s.estado === "rechazado" && s.motivoRechazo && (
          <div className="mt-1 text-xs text-red-700">
            Rechazado: {s.motivoRechazo}
          </div>
        )}
      </td>
      {pendiente && (
        <td className="px-3 py-2">
          <div className="flex flex-col gap-2">
            <button
              type="button"
              onClick={aprobar}
              disabled={busy !== null}
              className="rounded-md bg-emerald-600 px-2 py-1 text-xs font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              {busy === "aprobar" ? "…" : "Aprobar"}
            </button>
            <input
              type="text"
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              placeholder="Motivo (opcional)"
              className="w-40 rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs"
            />
            <button
              type="button"
              onClick={rechazar}
              disabled={busy !== null}
              className="rounded-md border border-red-200 bg-white px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
            >
              {busy === "rechazar" ? "…" : "Rechazar"}
            </button>
            {msg && <span className="text-xs text-zinc-500">{msg}</span>}
          </div>
        </td>
      )}
    </tr>
  );
}
