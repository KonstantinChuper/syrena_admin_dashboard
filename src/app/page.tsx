'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="p-8 flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Syrena Admin Dashboard</h1>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/profiles">Manage Profiles</Link>
        </Button>
      </div>
    </div>
  )
}
