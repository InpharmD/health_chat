import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Inpharmd Guidelines',
  description: 'Inpharmd Guidelines',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <title >Inpharmd Guidelines</title>
      <body className={inter.className}>{children}</body>
    </html>
  )
}

