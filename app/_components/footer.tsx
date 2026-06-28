import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-zinc-950 text-zinc-400 py-16 border-t border-zinc-900">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-sm">
            <div className="flex items-center gap-3 font-heading font-bold text-white text-lg mb-6">
              <span className="flex items-center justify-center rounded-lg bg-white p-1.5">
                <Image
                  src="/logo.png"
                  alt="Logo"
                  width={32}
                  height={32}
                  className="h-8 w-8 object-contain"
                />
              </span>
              <span>Psicólogos por Venezuela</span>
            </div>
            <p className="text-sm leading-relaxed">
              Organización sin fines de lucro dedicada a brindar primeros auxilios psicológicos y contención emocional tras desastres naturales.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-16">
            <div className="flex flex-col gap-4 text-sm">
              <span className="text-white font-bold mb-2">Legal</span>
              <a href="#" className="hover:text-white transition-colors">Privacidad</a>
              <a href="#" className="hover:text-white transition-colors">Ética Profesional</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
            <div className="flex flex-col gap-4 text-sm">
              <span className="text-white font-bold mb-2">Contacto</span>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">WhatsApp</a>
              <a href="#" className="hover:text-white transition-colors">Email</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-zinc-900 text-xs">
          <p>© {new Date().getFullYear()} Psicólogos por Venezuela. Todos los derechos reservados.</p>
          <p className="max-w-md text-center md:text-right">
            Atención: Si estás en una crisis aguda o emergencia vital, por favor comunícate con el 911 o la línea de emergencias local.
          </p>
        </div>
      </div>
    </footer>
  );
}
