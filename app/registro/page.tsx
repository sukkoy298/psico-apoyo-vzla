import type { Metadata } from "next";
import { Navbar } from "../_components/navbar";
import { Footer } from "../_components/footer";
import RegistroClient from "./page-client";

export const metadata: Metadata = {
  title: "Crear cuenta — Psicólogos por Venezuela",
};

export default function RegistroPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <RegistroClient />
      </main>
      <Footer />
    </>
  );
}
