'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'

import { makeQueryClient } from '@/lib/queryClient'

interface TanStackProviderProps {
  children: React.ReactNode
}

export default function TanStackProvider({ children }: TanStackProviderProps) {
  const [queryClient] = useState(() => makeQueryClient())

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
