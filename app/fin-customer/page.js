'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Page() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [q, setQ] = useState('')

  async function load(search = '') {
    setLoading(true)
    const url = search ? `/api/customers?q=${encodeURIComponent(search)}` : '/api/customers'
    const res = await fetch(url)
    const data = await res.json()
    setItems(data)
    setLoading(false)
  }

  useEffect(() => { load() }, [])

  async function remove(id) {
    if (!confirm('Delete this customer?')) return
    const res = await fetch(`/api/customers/${id}`, { method: 'DELETE' })
    if (res.ok) load(q)
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Customers</h1>
        <Link href="/fin-customer/new" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">Add Customer</Link>
      </div>

      <div className="flex gap-2 mb-4">
        <input placeholder="Search by name..." value={q} onChange={(e) => setQ(e.target.value)} className="w-full max-w-sm rounded border px-3 py-2" />
        <button onClick={() => load(q)} className="rounded border px-4 py-2">Search</button>
      </div>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="overflow-x-auto border rounded">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left">Name</th>
                <th className="px-3 py-2 text-left">DOB</th>
                <th className="px-3 py-2 text-left">Member #</th>
                <th className="px-3 py-2 text-left">Interests</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((c) => (
                <tr key={c._id} className="border-t">
                  <td className="px-3 py-2"><Link href={`/fin-customer/${c._id}`} className="text-blue-600 hover:underline">{c.name}</Link></td>
                  <td className="px-3 py-2">{c.dateOfBirth ? new Date(c.dateOfBirth).toLocaleDateString() : '-'}</td>
                  <td className="px-3 py-2">{c.memberNumber ?? '-'}</td>
                  <td className="px-3 py-2">{c.interests || '-'}</td>
                  <td className="px-3 py-2 text-right">
                    <div className="flex gap-2 justify-end">
                      <Link href={`/fin-customer/${c._id}/edit`} className="rounded border px-3 py-1">Edit</Link>
                      <button onClick={() => remove(c._id)} className="rounded bg-red-600 text-white px-3 py-1">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}