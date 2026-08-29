import './_assets/globals.css'

import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { getLocale } from 'next-intl/server'
import type { PropsWithChildren } from 'react'

import { I18nProvider, PlatformContainer } from '@/app/_providers'
import { cn, ThemeProvider, ThemeScript } from '@/shared'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Maison Admin',
  description: 'Приложение для администрирования MaisonPattern',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  appleWebApp: {
    capable: true,
    title: 'Maison Admin',
    statusBarStyle: 'default',
  },
}

export const viewport: Viewport = {
  themeColor: '#09090b',
}

export default async function RootLayout({ children }: PropsWithChildren) {
  const locale = await getLocale()

  return (
    <html lang={locale} className={cn('font-sans', inter.variable)} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>

      <body className={cn('text-foreground', 'isolate')}>
        <I18nProvider>
          <ThemeProvider>
            <PlatformContainer>{children}</PlatformContainer>
          </ThemeProvider>
        </I18nProvider>
      </body>
    </html>
  )
}
