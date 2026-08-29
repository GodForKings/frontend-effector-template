import type { FC } from 'react'

export const ThemeScript: FC = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          try {
            const stored = localStorage.getItem('theme')
            if (stored === 'dark' || (!stored && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
              document.documentElement.classList.add('dark')
            } else {
              document.documentElement.classList.remove('dark')
            }
          } catch (_) {}
        `,
      }}
    />
  )
}
