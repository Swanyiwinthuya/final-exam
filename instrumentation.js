// app/instrumentation.js
export async function register() {
  // helpful but safe logging
  console.log("API Endpoint:", process.env.NEXT_PUBLIC_API_URL ?? "(not set)")

  // Allow skipping DB connect during early boot / local dev
  if (process.env.SKIP_DB_CONNECT === '1') {
    console.log("Instrumentation: skipping DB connect (SKIP_DB_CONNECT=1)")
    return
  }

  try {
    // ⬇️ lazy import so it doesn't run at module load
    const { default: dbConnect } = await import('@/lib/db')

    // Only connect if you truly need traces that depend on DB
    await dbConnect()
    console.log("Instrumentation: DB connected")
  } catch (e) {
    console.warn("Instrumentation: DB not connected yet:", e?.message || e)
    // Do NOT rethrow — we don't want boot to crash here.
  }
}
