import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { connectDB } from "@/lib/mongodb";
import { DerivacionModel } from "@/lib/models/derivacion";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const session = await auth();
  if (!session?.user || session.user.rol !== "admin") {
    return NextResponse.json(
      { ok: false, error: "No autorizado" },
      { status: 401 }
    );
  }

  try {
    await connectDB();
    const items = await DerivacionModel.find()
      .sort({ createdAt: -1 })
      .limit(200)
      .lean();
    return NextResponse.json({ ok: true, data: items });
  } catch (err) {
    const mensaje =
      err instanceof Error ? err.message : "Error al consultar la base de datos";
    return NextResponse.json({ ok: false, error: mensaje }, { status: 500 });
  }
}
