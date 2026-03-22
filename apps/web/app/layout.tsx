import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'HappyTails - Shelter Communication Platform',
  description: 'Management dashboard for animal rescue coordination',
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
