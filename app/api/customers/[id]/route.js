import dbConnect from '@/lib/db'
import Customer from '@/models/Customer'

export async function GET(_request, { params }) {
  try {
    await dbConnect()
    const item = await Customer.findById(params.id)
    if (!item) return new Response('Not found', { status: 404 })
    return Response.json(item)
  } catch (err) {
    console.error('GET /api/customers/[id] error', err)
    return new Response('Server error', { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect()
    const data = await request.json()
    const updated = await Customer.findByIdAndUpdate(params.id, data, { new: true })
    if (!updated) return new Response('Not found', { status: 404 })
    return Response.json(updated)
  } catch (err) {
    console.error('PUT /api/customers/[id] error', err)
    return new Response('Server error', { status: 500 })
  }
}

export async function DELETE(_request, { params }) {
  try {
    await dbConnect()
    const res = await Customer.findByIdAndDelete(params.id)
    if (!res) return new Response('Not found', { status: 404 })
    return new Response(null, { status: 204 })
  } catch (err) {
    console.error('DELETE /api/customers/[id] error', err)
    return new Response('Server error', { status: 500 })
  }
}