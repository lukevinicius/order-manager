export interface IProduct {
  id: string
  photoUrl: string
  name: string
  description: string | null
  price: number
  status: boolean
  updatedAt: Date
}
