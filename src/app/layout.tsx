import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WhistleBack - Decentralized Bounty Marketplace',
  description: 'Back anonymous insiders as they collaboratively build ironclad evidence pools',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}