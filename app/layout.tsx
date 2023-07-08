import './globals.css'
import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import Sidebar from '@/components/sidebar'
import SupabaseProvider from '@/providers/SupabaseProvider'
import UserProvider from '@/providers/userProvider'
import ModalProvider from '@/providers/ModalProvider'

const font = Figtree({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Spotify Clone',
  description: 'Listen soothing music',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <SupabaseProvider>
          <UserProvider>
            <ModalProvider/>
          <Sidebar>
            {children}
          </Sidebar>
          </UserProvider>
        </SupabaseProvider>
        
        </body>
    </html>
  )
}
