"use client";

import Link from "next/link";
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
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium">Contraseña</span>
        <input
          type="password"
          name="password"
          required
          autoComplete="current-password"
          className="rounded-md border border-zinc-300 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-950"
        />
      </label>

      {state.error && (
        <p
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/60 dark:bg-red-900/30 dark:text-red-100"
        >
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center rounded-md bg-emerald-600 px-5 py-3 font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
      >
        {pending ? "Ingresando…" : "Iniciar sesión"}
      </button>

      <p className="text-center text-sm text-zinc-600 dark:text-zinc-300">
        ¿Aún no tienes cuenta?{" "}
        <Link
          href="/registro"
          className="font-medium text-emerald-700 hover:underline dark:text-emerald-400"
        >
          Regístrate
        </Link>
      </p>
    </form>
  );
}
