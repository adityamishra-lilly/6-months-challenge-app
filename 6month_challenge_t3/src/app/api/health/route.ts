import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const db = client.db();
  const serverStatus = await db.command({ ping: 1 });

  return NextResponse.json({ ok: true, serverStatus });
}
