import CustomerForm from '../_components/CustomerForm'

export default function Page() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-6">Add Customer</h1>
      <CustomerForm />
    </div>
  )
}