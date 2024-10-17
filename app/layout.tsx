// app/layout.tsx
import { Providers } from './providers'
import HomeNavBar from './components/HomeNavBar'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html lang='en'>
      <body>
        <Providers>
          <HomeNavBar />
          {children}
        </Providers>
      </body>
    </html>
  )
}
