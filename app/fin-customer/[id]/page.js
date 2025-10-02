import Link from 'next/link'

async function getCustomer(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/customers/${id}`, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}

export default async function Page({ params }) {
  const c = await getCustomer(params.id)
  if (!c) return <div className="p-6">Not found</div>
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Customer Detail</h1>
        <Link href={`/fin-customer/${c._id}/edit`} className="rounded border px-3 py-1">Edit</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><div className="text-gray-500 text-sm">Name</div><div className="font-medium">{c.name}</div></div>
        <div><div className="text-gray-500 text-sm">Date of Birth</div><div className="font-medium">{c.dateOfBirth ? new Date(c.dateOfBirth).toLocaleDateString() : '-'}</div></div>
        <div><div className="text-gray-500 text-sm">Member Number</div><div className="font-medium">{c.memberNumber ?? '-'}</div></div>
        <div><div className="text-gray-500 text-sm">Interests</div><div className="font-medium">{c.interests || '-'}</div></div>
        <div><div className="text-gray-500 text-sm">Created</div><div className="font-medium">{new Date(c.createdAt).toLocaleString()}</div></div>
        <div><div className="text-gray-500 text-sm">Updated</div><div className="font-medium">{new Date(c.updatedAt).toLocaleString()}</div></div>
      </div>
      <Link href="/fin-customer" className="inline-block rounded border px-4 py-2">Back</Link>
    </div>
  )
}