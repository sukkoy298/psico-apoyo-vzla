"use client";

import { useActionState } from "react";
import {
  registrarPacienteAction,
  registrarPsicologoAction,
  type RegisterState,
} from "../_actions";

const initialState: RegisterState = { ok: false };

export function RegistroPsicologoForm() {
  const [state, action, pending] = useActionState(
    registrarPsicologoAction,
    initialState
  );
  return (
    <form action={action} className="grid gap-5 sm:grid-cols-2">
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Nombre completo</span>
        <input
          type="text"
          name="nombre"
          required
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Correo electrónico</span>
        <input
          type="email"
          name="email"
          required
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Contraseña (mín. 8 caracteres)</span>
        <input
          type="password"
          name="password"
          required
          minLength={8}
          autoComplete="new-password"
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Número de colegiatura</span>
        <input
          type="text"
          name="colegiatura"
          required
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm sm:col-span-2">
        <span className="font-medium">Especialidad</span>
        <input
          type="text"
          name="especialidad"
          placeholder="Ej. psicología clínica, infantil, de emergencia…"
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm sm:col-span-2">
        <span className="font-medium">Modalidad</span>
        <select
          name="modalidad"
          defaultValue="online"
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
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
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
        />
      </label>

      {state.error && (
        <p
          role="alert"
          className="sm:col-span-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-900/30 dark:text-red-100"
        >
          {state.error}
        </p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-5 py-3 font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {pending ? "Creando cuenta…" : "Crear cuenta de psicólogo"}
        </button>
      </div>
    </form>
  );
}

export function RegistroPacienteForm() {
  const [state, action, pending] = useActionState(
    registrarPacienteAction,
    initialState
  );
  return (
    <form action={action} className="grid gap-5 sm:grid-cols-2">
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Nombre</span>
        <input
          type="text"
          name="nombre"
          required
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Edad</span>
        <input
          type="number"
          name="edad"
          min={5}
          max={120}
          required
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Teléfono o WhatsApp</span>
        <input
          type="tel"
          name="telefono"
          required
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Estado o región</span>
        <input
          type="text"
          name="estado"
          required
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Correo electrónico</span>
        <input
          type="email"
          name="email"
          required
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Contraseña (mín. 8 caracteres)</span>
        <input
          type="password"
          name="password"
          required
          minLength={8}
          autoComplete="new-password"
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm sm:col-span-2">
        <span className="font-medium">Modalidad preferida</span>
        <select
          name="modalidad"
          defaultValue="videollamada"
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
        >
          <option value="videollamada">Videollamada</option>
          <option value="llamada">Llamada telefónica</option>
          <option value="presencial">Presencial</option>
          <option value="cualquiera">Cualquiera disponible</option>
        </select>
      </label>
      <label className="flex flex-col gap-1 text-sm sm:col-span-2">
        <span className="font-medium">Cuéntanos brevemente cómo te sientes</span>
        <textarea
          name="mensaje"
          rows={3}
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
        />
      </label>

      {state.error && (
        <p
          role="alert"
          className="sm:col-span-2 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-900/30 dark:text-red-100"
        >
          {state.error}
        </p>
      )}

      <div className="sm:col-span-2">
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-5 py-3 font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
        >
          {pending ? "Creando cuenta…" : "Crear cuenta de paciente"}
        </button>
      </div>
    </form>
  );
}
