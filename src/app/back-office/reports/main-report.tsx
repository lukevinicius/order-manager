import { Loader2 } from 'lucide-react'

interface MainReportProps {
  sales: number
  openSales: number
  loading: boolean
}

export async function MainReport({
  sales,
  openSales,
  loading,
}: MainReportProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="rounded-xl bg-zinc-800 p-4 text-center">
        {loading ? (
          <Loader2 className="h-12 w-12 animate-spin text-white" />
        ) : (
          <>
            <p className="text-xl">Em Aberto</p>
            <p className="text-xl">
              {openSales.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
          </>
        )}
      </div>
      <div className="rounded-xl bg-zinc-800 p-4 text-center">
        {loading ? (
          <Loader2 className="h-12 w-12 animate-spin text-white" />
        ) : (
          <>
            <p className="text-xl">Fechadas</p>
            <p className="text-xl">
              {sales.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </p>
          </>
        )}
      </div>
    </div>
  )
}
