import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const client = await clientPromise;
    const db = client.db("my-db");
    const result = await db.collection("test").insertOne({ message: "Hello MongoDB" });

    return NextResponse.json({ insertedId: result.insertedId });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
