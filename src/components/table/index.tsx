import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface TableComponentProps {
  headers: string[]
  children: React.ReactNode
}

export function TableComponent({ children, headers }: TableComponentProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-zinc-800 hover:bg-zinc-800">
          {headers.map((header) => (
            <TableHead key={header} className="text-center text-zinc-50">
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  )
}
