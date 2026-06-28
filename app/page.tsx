import Link from "next/link";
import Image from "next/image";
import { Navbar } from "./_components/navbar";
import { Footer } from "./_components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
          <video
            src="https://videos.pexels.com/video-files/37218119/15766867_640_360_30fps.mp4"
            poster="https://images.pexels.com/videos/37218119/pexels-photo-37218119.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover grayscale-[0.2] opacity-40"
          ></video>

          <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
            <span className="inline-block mb-6 px-4 py-1.5 rounded-full bg-orange-100/80 text-orange-800 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              Red de Apoyo en Emergencias
            </span>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-zinc-900 leading-[1.1] mb-8">
              Acompañamos tu camino hacia la resiliencia.
            </h1>
            <p className="text-lg md:text-xl text-zinc-700 max-w-2xl mx-auto leading-relaxed mb-12">
              Conectamos a psicólogos voluntarios con familias afectadas por el sismo en Venezuela. 
              Un espacio seguro, profesional y totalmente gratuito.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link
                href="/pacientes"
                className="w-full sm:w-auto px-10 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-xl shadow-lg shadow-orange-200/50 transition-all transform hover:-translate-y-0.5"
              >
                Necesito atención psicológica
              </Link>
              <Link
                href="/psicologos"
                className="w-full sm:w-auto px-10 py-4 bg-white hover:bg-zinc-50 text-zinc-900 font-bold border border-zinc-200 rounded-xl shadow-sm transition-all transform hover:-translate-y-0.5"
              >
                Quiero ser voluntario
              </Link>
            </div>
          </div>
        </section>

        <section id="mision" className="py-24 bg-zinc-50/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid md:grid-cols-12 gap-8">
              <div className="md:col-span-7 group relative overflow-hidden rounded-3xl bg-white border border-zinc-100 shadow-sm transition-all hover:shadow-xl">
                <div className="aspect-[4/5] md:aspect-auto md:h-full flex flex-col">
                  <div className="relative flex-grow overflow-hidden h-64 md:h-96">
                    <Image
                      src="https://images.unsplash.com/photo-1545386673-7723f55e5490?auto=format&w=1200&q=80&fit=crop"
                      alt="Esperanza"
                      fill
                      sizes="(max-width: 768px) 100vw, 58vw"
                      className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-orange-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="p-10 md:p-14 relative bg-white">
                    <span className="text-orange-600 font-bold text-sm uppercase tracking-widest mb-4 block">Para ti o tu familia</span>
                    <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 text-zinc-900">No tienes que enfrentar esto solo.</h2>
                    <p className="text-zinc-600 text-lg mb-8 max-w-md leading-relaxed">
                      Si has sido afectado por los eventos recientes, nuestro equipo está aquí para escucharte y brindarte las herramientas emocionales necesarias.
                    </p>
                    <Link href="/pacientes" className="inline-flex items-center gap-2 font-bold text-orange-700 group/link">
                      Solicitar apoyo ahora
                      <span className="transition-transform group-hover/link:translate-x-1">→</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="md:col-span-5 flex flex-col gap-8">
                <div className="flex-grow group relative overflow-hidden rounded-3xl bg-orange-900 text-white shadow-lg transition-all hover:shadow-2xl min-h-[400px]">
                  <Image
                    src="https://images.unsplash.com/photo-1674767597051-37af3b73c2ca?auto=format&w=800&q=80&fit=crop"
                    alt="Voluntariado"
                    fill
                    sizes="(max-width: 768px) 100vw, 42vw"
                    className="object-cover opacity-30 grayscale transition-all duration-700 group-hover:opacity-50 group-hover:scale-105"
                  />
                  <div className="relative z-10 p-10 h-full flex flex-col justify-end">
                    <span className="text-orange-400 font-bold text-xs uppercase tracking-widest mb-4 block">Red Profesional</span>
                    <h3 className="font-heading text-3xl font-bold mb-4">Súmate como profesional</h3>
                    <p className="text-orange-50/80 mb-8 leading-relaxed">
                      Buscamos psicólogos colegiados con ganas de aportar su experiencia en momentos críticos. Ofrecemos supervisión y acompañamiento mutuo.
                    </p>
                    <Link
                      href="/psicologos"
                      className="px-6 py-3 bg-white text-orange-900 font-bold rounded-lg text-center transition-colors hover:bg-orange-50"
                    >
                      Ver requisitos de ingreso
                    </Link>
                  </div>
                </div>

                <div className="p-10 rounded-3xl bg-white border border-zinc-100 flex flex-col justify-center italic text-zinc-500 shadow-sm">
                  <p className="text-lg leading-relaxed">
                    &ldquo;La solidaridad es la base de la recuperación emocional comunitaria. Juntos reconstruimos el tejido social de Venezuela.&rdquo;
                  </p>
                  <span className="mt-4 font-heading font-bold text-zinc-900 not-italic">— Coordinación Clínica</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-heading text-4xl font-bold mb-8 text-zinc-900">Un compromiso con la ética y la calidad</h2>
              <div className="grid sm:grid-cols-3 gap-12 text-left mt-16">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center mb-6 border border-zinc-100">
                    <span className="text-orange-600 text-xl font-bold">01</span>
                  </div>
                  <h4 className="font-bold mb-3 text-zinc-900">Privacidad Total</h4>
                  <p className="text-sm text-zinc-500 leading-relaxed">Protocolos estrictos de confidencialidad para proteger la identidad de cada paciente.</p>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center mb-6 border border-zinc-100">
                    <span className="text-orange-600 text-xl font-bold">02</span>
                  </div>
                  <h4 className="font-bold mb-3 text-zinc-900">Supervisión Clínica</h4>
                  <p className="text-sm text-zinc-500 leading-relaxed">Todos los casos son monitoreados por coordinadores de amplia trayectoria profesional.</p>
                </div>
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-zinc-50 flex items-center justify-center mb-6 border border-zinc-100">
                    <span className="text-orange-600 text-xl font-bold">03</span>
                  </div>
                  <h4 className="font-bold mb-3 text-zinc-900">Atención Inmediata</h4>
                  <p className="text-sm text-zinc-500 leading-relaxed">Nuestro objetivo es realizar el primer contacto en un plazo no mayor a 48 horas.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
