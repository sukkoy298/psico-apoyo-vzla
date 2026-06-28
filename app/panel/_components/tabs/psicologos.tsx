"use client";

import { useState } from "react";

type Psicologo = {
  _id: string;
  nombre: string;
  email: string;
  colegiatura: string;
  especialidad?: string;
  telefonoWhatsapp?: string;
  rangoAtencion: string;
  modalidad: string;
  estado: "pendiente" | "validado" | "asignado" | "inactivo";
  disponible: boolean;
  ultimaAsignacion?: string | null;
  createdAt: string;
};

export function PsicologosTab() {
  const [data, setData] = useState<Psicologo[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function cargar() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/psicologos", { cache: "no-store" });
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
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {error}
        </p>
      )}

      {data && data.length === 0 && (
        <p className="text-sm text-zinc-600">
          Aún no hay psicólogos aprobados.
        </p>
      )}

      {data && data.length > 0 && (
        <div className="overflow-x-auto rounded-lg border border-zinc-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-100 text-zinc-700">
              <tr>
                <th className="px-3 py-2">Nombre</th>
                <th className="px-3 py-2">Email / WhatsApp</th>
                <th className="px-3 py-2">Rango</th>
                <th className="px-3 py-2">Modalidad</th>
                <th className="px-3 py-2">Disponible</th>
                <th className="px-3 py-2">Estado</th>
                <th className="px-3 py-2">Última asignación</th>
                <th className="px-3 py-2">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {data.map((p) => (
                <PsicologoRow key={p._id} p={p} recargar={cargar} />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function PsicologoRow({
  p,
  recargar,
}: {
  p: Psicologo;
  recargar: () => void;
}) {
  const [disponible, setDisponible] = useState(p.disponible);
  const [rango, setRango] = useState(p.rangoAtencion);
  const [estado, setEstado] = useState(p.estado);
  const [telefono, setTelefono] = useState(p.telefonoWhatsapp ?? "");
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [releasing, setReleasing] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function guardar() {
    setSaving(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/psicologos/${p._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          disponible,
          rangoAtencion: rango,
          estado,
          telefonoWhatsapp: telefono,
        }),
      });
      const json = (await res.json()) as
        | { ok: true }
        | { ok: false; error: string };
      if (!json.ok) {
        setMsg(json.error);
      } else {
        setMsg("Guardado");
        recargar();
      }
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Error al guardar");
    } finally {
      setSaving(false);
    }
  }

  async function liberar() {
    setReleasing(true);
    setMsg(null);
    try {
      const res = await fetch(`/api/admin/psicologos/${p._id}/liberar`, {
        method: "POST",
      });
      const json = (await res.json()) as
        | { ok: true }
        | { ok: false; error: string };
      if (!json.ok) {
        setMsg(json.error);
      } else {
        setMsg("Liberado");
        recargar();
      }
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Error al liberar");
    } finally {
      setReleasing(false);
    }
  }

  async function desactivar() {
    if (
      !window.confirm(
        `¿Desactivar a ${p.nombre}? Quedará fuera de la red de derivaciones. Podés volver a activarlo cambiando el estado a "validado".`
      )
    ) {
      return;
    }
    setDeleting(true);
    setMsg(null);
    try {
      const res = await fetch(
        `/api/admin/psicologos/${p._id}/desactivar`,
        { method: "POST" }
      );
      const json = (await res.json()) as
        | { ok: true }
        | { ok: false; error: string };
      if (!json.ok) {
        setMsg(json.error);
      } else {
        setMsg("Desactivado");
        recargar();
      }
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "Error al desactivar");
    } finally {
      setDeleting(false);
    }
  }

  const dirty =
    disponible !== p.disponible ||
    rango !== p.rangoAtencion ||
    estado !== p.estado ||
    telefono !== (p.telefonoWhatsapp ?? "");

  return (
    <tr className="border-t border-zinc-200 align-top">
      <td className="px-3 py-2 font-medium">
        <div>{p.nombre}</div>
        <div className="text-xs text-zinc-500 font-mono">{p.colegiatura}</div>
      </td>
      <td className="px-3 py-2">
        <div className="break-all">{p.email}</div>
        <input
          type="text"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
          placeholder="WhatsApp"
          className="mt-1 w-40 rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs"
        />
      </td>
      <td className="px-3 py-2">
        <select
          value={rango}
          onChange={(e) => setRango(e.target.value)}
          className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs"
        >
          <option value="infantil">infantil</option>
          <option value="adultos">adultos</option>
          <option value="ambos">ambos</option>
        </select>
      </td>
      <td className="px-3 py-2 text-xs">{p.modalidad}</td>
      <td className="px-3 py-2">
        <input
          type="checkbox"
          checked={disponible}
          onChange={(e) => setDisponible(e.target.checked)}
        />
      </td>
      <td className="px-3 py-2">
        <select
          value={estado}
          onChange={(e) => setEstado(e.target.value as Psicologo["estado"])}
          className="rounded-md border border-zinc-300 bg-white px-2 py-1 text-xs"
        >
          <option value="pendiente">pendiente</option>
          <option value="validado">validado</option>
          <option value="asignado">asignado</option>
          <option value="inactivo">inactivo</option>
        </select>
      </td>
      <td className="px-3 py-2 text-xs">
        {p.ultimaAsignacion
          ? new Date(p.ultimaAsignacion).toLocaleString("es-VE")
          : "—"}
      </td>
      <td className="px-3 py-2">
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={guardar}
            disabled={saving || !dirty}
            className="rounded-md bg-zinc-900 px-2 py-1 text-xs font-medium text-white hover:bg-zinc-700 disabled:opacity-50"
          >
            {saving ? "…" : "Guardar"}
          </button>
          {p.ultimaAsignacion && (
            <button
              type="button"
              onClick={liberar}
              disabled={releasing}
              className="rounded-md border border-emerald-300 bg-white px-2 py-1 text-xs font-medium text-emerald-800 hover:bg-emerald-50 disabled:opacity-50"
            >
              {releasing ? "…" : "Priorizar en cola"}
            </button>
          )}
          <button
            type="button"
            onClick={desactivar}
            disabled={deleting || saving || releasing || p.estado === "inactivo"}
            className="rounded-md border border-red-200 bg-white px-2 py-1 text-xs font-medium text-red-700 hover:bg-red-50 disabled:opacity-50"
          >
            {deleting ? "…" : "Desactivar"}
          </button>
          {msg && <span className="text-xs text-zinc-500">{msg}</span>}
        </div>
      </td>
    </tr>
  );
}
