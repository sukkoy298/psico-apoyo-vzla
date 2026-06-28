import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import {
  aprobarVoluntario,
  rechazarVoluntario,
} from "@/lib/aprobar-voluntario";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Body = {
  accion?: "aprobar" | "rechazar";
  motivo?: string;
};

export async function PATCH(
  request: Request,
  ctx: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user || session.user.rol !== "admin") {
    return NextResponse.json(
      { ok: false, error: "No autorizado" },
      { status: 401 }
    );
  }

  const { id } = await ctx.params;

  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Cuerpo JSON inválido" },
      { status: 400 }
    );
  }

  if (body.accion === "aprobar") {
    const r = await aprobarVoluntario(id);
    if (r.status === "ok") {
      return NextResponse.json({ ok: true, psicologoId: r.psicologoId });
    }
    if (r.status === "no_encontrada") {
      return NextResponse.json(
        { ok: false, error: "Solicitud no encontrada" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { ok: false, error: "La solicitud ya fue procesada" },
      { status: 409 }
    );
  }

  if (body.accion === "rechazar") {
    const r = await rechazarVoluntario(id, (body.motivo ?? "").trim());
    if (r.status === "ok") {
      return NextResponse.json({ ok: true });
    }
    if (r.status === "no_encontrada") {
      return NextResponse.json(
        { ok: false, error: "Solicitud no encontrada" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { ok: false, error: "La solicitud ya fue procesada" },
      { status: 409 }
    );
  }

  return NextResponse.json(
    { ok: false, error: "Acción inválida" },
    { status: 400 }
  );
}
