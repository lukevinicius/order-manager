import { PeriodForm } from './period-form'

export default async function Reports() {
  return (
    <div className="space-y-4 bg-zinc-900 text-zinc-50">
      <div className="flex items-center justify-between rounded-xl bg-zinc-800 p-4">
        <p className="text-2xl font-bold">Relatórios</p>
      </div>
      <PeriodForm />
    </div>
  )
}
