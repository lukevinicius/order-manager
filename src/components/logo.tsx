import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/">
      {/* <Image src="{logo}" alt="Logo" width={128} height={128} /> */}
      <p className="text-2xl font-semibold text-emerald-500">Order</p>
      <p className="text-2xl font-semibold text-zinc-200">Manager</p>
    </Link>
  )
}
