import type { Metadata } from 'next'

import Footer from '@/components/Footer/Footer'
import Header from '@/components/Header/Header'
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider'

import './globals.css'

export const metadata: Metadata = {
  title: 'NoteHub',
  description:
    'A simple and efficient application for managing personal notes.',
}

interface RootLayoutProps {
  children: React.ReactNode
  modal: React.ReactNode
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  )
}
