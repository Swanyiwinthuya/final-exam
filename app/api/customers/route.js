import dbConnect from '@/lib/db'
import Customer from '@/models/Customer'

export async function GET(request) {
  try {
    await dbConnect()
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q')
    const filter = q ? { name: { $regex: q, $options: 'i' } } : {}
    const customers = await Customer.find(filter).sort({ createdAt: -1 })
    return Response.json(customers)
  } catch (err) {
    console.error('GET /api/customers error', err)
    return new Response('Server error', { status: 500 })
  }
}

export async function POST(request) {
  try {
    await dbConnect()
    const body = await request.json()
    const created = await Customer.create(body)
    return new Response(JSON.stringify(created), {
      status: 201,
      headers: { 'content-type': 'application/json' },
    })
  } catch (err) {
    console.error('POST /api/customers error', err)
    return new Response('Server error', { status: 500 })
  }
}