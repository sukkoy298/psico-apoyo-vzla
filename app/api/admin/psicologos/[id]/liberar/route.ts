import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { liberarPsicologo } from "@/lib/derivar";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(
  _request: Request,
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
  await liberarPsicologo(id);
  return NextResponse.json({ ok: true });
}
