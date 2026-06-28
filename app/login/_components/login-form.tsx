"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "../../_actions/auth";

const initialState: LoginState = { ok: false };

export function LoginForm() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState
  );

  return (
    <form action={formAction} className="grid gap-5">
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Correo electrónico</span>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          className="rounded-md border border-zinc-300 bg-white px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Contraseña</span>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="rounded-md border border-zinc-300 bg-white px-3 py-2"
        />
      </label>

      {state.error && (
        <p
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center rounded-md bg-orange-600 px-5 py-3 font-medium text-white hover:bg-orange-700 disabled:opacity-60"
      >
        {pending ? "Ingresando…" : "Iniciar sesión"}
      </button>

      <p className="text-center text-xs text-zinc-500">
        Acceso exclusivo para el equipo de coordinación.
      </p>
    </form>
  );
}
