import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
// import { DeleteProductButton } from './delete-product-buttom'
import { EditButton } from '@/components/buttons/edit-buttom'
import { IProduct } from '@/domain/interfaces/IProduct'

interface ProductDataTableProps {
  products: IProduct[]
}

export function ProductsDataTable({ products }: ProductDataTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-zinc-800 hover:bg-zinc-800">
          <TableHead className="text-center text-zinc-50">Nome</TableHead>
          <TableHead className="text-center text-zinc-50">Preço</TableHead>
          <TableHead className="text-center text-zinc-50">Status</TableHead>
          <TableHead className="text-center text-zinc-50">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="space-y-10">
        {products.map((product) => (
          <TableRow key={product.id} className="bg-zinc-800 hover:bg-zinc-800">
            <TableCell className="text-center">{product.name}</TableCell>
            <TableCell className="text-center">
              {product.price.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </TableCell>
            <TableCell className="text-center">{product.status}</TableCell>
            <TableCell className="flex space-x-2">
              <EditButton href={`/back-office/products/update/${product.id}`} />
              {/* <DeleteProductButton productId={product.id} /> */}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
