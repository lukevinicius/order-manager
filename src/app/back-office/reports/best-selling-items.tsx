import { TableComponent } from '@/components/table'
import { TableCell, TableRow } from '@/components/ui/table'

interface BestSellingItemsProps {
  bestSellingItems: {
    name: string
    quantity: number
  }[]
}

export async function BestSellingItems({
  bestSellingItems,
}: BestSellingItemsProps) {
  return (
    <div className="space-y-2">
      <p className="text-lg">Itens mais vendidos</p>
      <TableComponent headers={['Item', 'quantidade']}>
        {bestSellingItems.map((item: any) => (
          <TableRow
            key={item.id}
            className="bg-zinc-700 text-center hover:bg-zinc-700"
          >
            <TableCell className="text-center">{item.name}</TableCell>
            <TableCell className="text-center">{item.quantity}</TableCell>
          </TableRow>
        ))}
      </TableComponent>
    </div>
  )
}
