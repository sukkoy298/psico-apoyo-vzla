import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { SolicitudVoluntarioModel } from "@/lib/models/solicitud-voluntario";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ESTADOS_VALIDOS = ["pendiente", "aprobado", "rechazado"] as const;

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user || session.user.rol !== "admin") {
    return NextResponse.json(
      { ok: false, error: "No autorizado" },
      { status: 401 }
    );
  }

  const { searchParams } = new URL(request.url);
  const estado = searchParams.get("estado");

  const filtro: Record<string, unknown> =
    estado && (ESTADOS_VALIDOS as readonly string[]).includes(estado)
      ? { estado }
      : {};

  try {
    await connectDB();
    const solicitudes = await SolicitudVoluntarioModel.find(filtro)
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();
    return NextResponse.json({ ok: true, data: solicitudes });
  } catch (err) {
    const mensaje =
      err instanceof Error ? err.message : "Error al consultar la base de datos";
    return NextResponse.json({ ok: false, error: mensaje }, { status: 500 });
  }
}
