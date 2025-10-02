import CustomerForm from '../../_components/CustomerForm'

async function getCustomer(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || ''}/api/customers/${id}`, { cache: 'no-store' })
  if (!res.ok) return null
  return res.json()
}

export default async function Page({ params }) {
  const data = await getCustomer(params.id)
  if (!data) return <div className="p-6">Not found</div>
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Edit Customer</h1>
      {/* pass id so the form switches to PUT */}
      <CustomerForm id={params.id} initialData={data} />
    </div>
  )
}