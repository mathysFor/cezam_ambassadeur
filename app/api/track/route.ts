import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { event, path, details, session_id } = body ?? {};

    if (!event || typeof event !== "string") {
      return NextResponse.json(
        { ok: false, error: "missing event" },
        { status: 400 },
      );
    }

    const referrer = req.headers.get("referer") || "direct";

    const { error } = await supabase.from("events").insert({
      event,
      path: typeof path === "string" ? path : null,
      referrer,
      details: details ?? null,
      session_id: typeof session_id === "string" ? session_id : null,
    });

    if (error) {
      console.error("[track] supabase insert error:", error);
      return NextResponse.json({ ok: false }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[track] unexpected error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
