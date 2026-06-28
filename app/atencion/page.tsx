import type { Metadata } from "next";
import { Navbar } from "../_components/navbar";
import { Footer } from "../_components/footer";
import AtencionClient from "./page-client";

export const metadata: Metadata = {
  title: "Atención inmediata — Psicólogos por Venezuela",
  description:
    "Solicita atención psicológica gratuita ahora. Sin registro: indicá tu nombre y edad y te conectamos con un profesional por WhatsApp.",
};

export default function AtencionPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <AtencionClient />
      </main>
      <Footer />
    </>
  );
}
