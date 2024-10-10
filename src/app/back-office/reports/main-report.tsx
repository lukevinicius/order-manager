interface MainReportProps {
  sales: number
  openSales: number
}

export async function MainReport({ sales, openSales }: MainReportProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <div className="rounded-xl bg-zinc-800 p-4 text-center">
        <p className="text-xl">Em Aberto</p>
        <p className="text-xl">
          {openSales.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          })}
        </p>
      </div>
      <div className="rounded-xl bg-zinc-800 p-4 text-center">
        <p className="text-xl">Fechadas</p>
        <p className="text-xl">
          {sales.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          })}
        </p>
      </div>
    </div>
  )
}
