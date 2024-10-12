import { fetchProducts } from '@/actions/products/fetch-products'
import { ProductsDataTable } from './data-table'
import { CreateProductDialog } from './create-product-dialog'

export default async function Products() {
  const { products } = await fetchProducts()

  return (
    <div className="space-y-4 bg-zinc-900 text-zinc-50">
      <div className="flex items-center justify-between rounded-xl bg-zinc-800 p-4">
        <p className="text-2xl font-bold">Produtos do sistema</p>
        <CreateProductDialog />
      </div>
      <div className="rounded-xl bg-zinc-800">
        <ProductsDataTable products={products} />
      </div>
    </div>
  )
}
