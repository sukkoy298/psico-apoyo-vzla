import type { Metadata } from "next";
import { Navbar } from "../_components/navbar";
import { Footer } from "../_components/footer";
import { LoginForm } from "./_components/login-form";

export const metadata: Metadata = {
  title: "Iniciar sesión — Psicólogos por Venezuela",
};

export default function LoginPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-md px-6 py-16">
          <h1 className="text-3xl font-semibold tracking-tight">
            Iniciar sesión
          </h1>
          <p className="mt-2 text-zinc-600">
            Accede para ver tu panel de coordinación o dar seguimiento a tu
            solicitud.
          </p>
          <div className="mt-8">
            <LoginForm />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
