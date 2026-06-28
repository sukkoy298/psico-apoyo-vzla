import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { Navbar } from "../_components/navbar";
import { Footer } from "../_components/footer";
import { connectDB } from "@/lib/mongodb";
import { PacienteModel } from "@/lib/models/paciente";
import { PsicologoModel } from "@/lib/models/psicologo";
import { UsuarioModel } from "@/lib/models/usuario";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  await connectDB();
  const usuario = await UsuarioModel.findById(session.user.id).lean();

  return (
    <>
      <Navbar />
      <main className="flex-1">
        <section className="mx-auto max-w-4xl px-6 py-12 sm:py-16">
          <p className="text-sm font-medium uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
            Hola, {session.user.name}
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            Tu panel
          </h1>

          {session.user.rol === "psicologo" && (
            <PsicologoDashboard
              psicologoId={usuario?.psicologoId?.toString() ?? null}
            />
          )}
          {session.user.rol === "paciente" && (
            <PacienteDashboard
              pacienteId={usuario?.pacienteId?.toString() ?? null}
            />
          )}
          {session.user.rol === "admin" && (
            <AdminDashboard />
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}

async function PsicologoDashboard({
  psicologoId,
}: {
  psicologoId: string | null;
}) {
  if (!psicologoId) {
    return (
      <p className="mt-6 text-zinc-600 dark:text-zinc-300">
        No se encontró tu perfil de psicólogo. Contacta a coordinación.
      </p>
    );
  }
  const perfil = await PsicologoModel.findById(psicologoId).lean();
  if (!perfil) return null;

  return (
    <div className="mt-8 grid gap-6">
      <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
        <h2 className="text-lg font-semibold">Tu perfil</h2>
        <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-zinc-500 dark:text-zinc-400">Colegiatura</dt>
            <dd className="font-medium">{perfil.colegiatura}</dd>
          </div>
          <div>
            <dt className="text-zinc-500 dark:text-zinc-400">Especialidad</dt>
            <dd className="font-medium">{perfil.especialidad || "—"}</dd>
          </div>
          <div>
            <dt className="text-zinc-500 dark:text-zinc-400">Modalidad</dt>
            <dd className="font-medium">{perfil.modalidad}</dd>
          </div>
          <div>
            <dt className="text-zinc-500 dark:text-zinc-400">Estado de validación</dt>
            <dd>
              <EstadoBadge estado={perfil.estado} />
            </dd>
          </div>
        </dl>
        {perfil.estado === "pendiente" && (
          <p className="mt-4 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-100">
            Tu perfil está en revisión. Un administrador validará tu
            colegiatura antes de asignarte pacientes.
          </p>
        )}
      </div>
    </div>
  );
}

async function PacienteDashboard({ pacienteId }: { pacienteId: string | null }) {
  if (!pacienteId) {
    return (
      <p className="mt-6 text-zinc-600 dark:text-zinc-300">
        No se encontró tu solicitud. Contacta a coordinación.
      </p>
    );
  }
  const paciente = await PacienteModel.findById(pacienteId).lean();
  if (!paciente) return null;

  return (
    <div className="mt-8 grid gap-6">
      <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
        <h2 className="text-lg font-semibold">Tu solicitud</h2>
        <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-zinc-500 dark:text-zinc-400">Estado</dt>
            <dd>
              <EstadoBadge estado={paciente.estadoSolicitud} />
            </dd>
          </div>
          <div>
            <dt className="text-zinc-500 dark:text-zinc-400">Modalidad</dt>
            <dd className="font-medium">{paciente.modalidad}</dd>
          </div>
          <div>
            <dt className="text-zinc-500 dark:text-zinc-400">Región</dt>
            <dd className="font-medium">{paciente.estado}</dd>
          </div>
          <div>
            <dt className="text-zinc-500 dark:text-zinc-400">Fecha</dt>
            <dd className="font-medium">
              {new Date(paciente.createdAt).toLocaleString("es-VE")}
            </dd>
          </div>
        </dl>
        {paciente.estadoSolicitud === "pendiente" && (
          <p className="mt-4 rounded-md bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:bg-amber-900/30 dark:text-amber-100">
            Estamos buscando un psicólogo disponible. Te contactaremos en menos
            de 48 horas.
          </p>
        )}
        {paciente.estadoSolicitud === "atendido" && (
          <p className="mt-4 rounded-md bg-emerald-50 px-3 py-2 text-sm text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-100">
            ¡Listo! Tu proceso fue atendido. Si necesitas más ayuda, crea una
            nueva solicitud.
          </p>
        )}
      </div>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="mt-8 grid gap-4">
      <a
        href="/panel"
        className="rounded-2xl border border-zinc-200 p-6 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
      >
        <h2 className="text-lg font-semibold">Panel de coordinación →</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-300">
          Revisa solicitudes, valida psicólogos y gestiona la red de atención.
        </p>
      </a>
    </div>
  );
}

function EstadoBadge({ estado }: { estado: string }) {
  const colors: Record<string, string> = {
    pendiente: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-100",
    en_proceso: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-100",
    atendido: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-100",
    validado: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-100",
    asignado: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-100",
    descartado: "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200",
    inactivo: "bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200",
  };
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${
        colors[estado] ?? "bg-zinc-100 text-zinc-700"
      }`}
    >
      {estado}
    </span>
  );
}
