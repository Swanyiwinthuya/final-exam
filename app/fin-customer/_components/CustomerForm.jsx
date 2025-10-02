'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function CustomerForm({ initialData = null, id = null }) {
  const router = useRouter()
  const [form, setForm] = useState(() => {
    const d = initialData || {}
    const dob = d.dateOfBirth ? new Date(d.dateOfBirth) : null
    return {
      name: d.name || '',
      dateOfBirth: dob ? dob.toISOString().slice(0, 10) : '',
      memberNumber: d.memberNumber ?? '',
      interests: d.interests || '',
    }
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  async function onSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setError('')
    try {
      const method = id ? 'PUT' : 'POST'
      const url = id ? `/api/customers/${id}` : '/api/customers'
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          dateOfBirth: form.dateOfBirth || null,
          memberNumber: form.memberNumber ? Number(form.memberNumber) : null,
          interests: form.interests,
        }),
      })
      if (!res.ok) throw new Error(await res.text())
      router.push('/fin-customer')
      router.refresh()
    } catch (err) {
      setError(String(err))
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && <div className="p-2 rounded bg-red-100 text-red-700 text-sm">{error}</div>}
      <div>
        <label className="block text-sm font-medium">Name *</label>
        <input name="name" required value={form.name} onChange={onChange} className="mt-1 w-full rounded border px-3 py-2" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium">Date of Birth</label>
          <input name="dateOfBirth" type="date" value={form.dateOfBirth} onChange={onChange} className="mt-1 w-full rounded border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Member Number</label>
          <input name="memberNumber" type="number" value={form.memberNumber} onChange={onChange} className="mt-1 w-full rounded border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium">Interests</label>
          <input name="interests" value={form.interests} onChange={onChange} className="mt-1 w-full rounded border px-3 py-2" />
        </div>
      </div>
      <div className="flex gap-2">
        <button disabled={saving} className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
        <button type="button" onClick={() => window.history.back()} className="rounded border px-4 py-2">Cancel</button>
      </div>
    </form>
  )
}