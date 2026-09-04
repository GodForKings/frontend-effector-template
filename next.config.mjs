import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/app/_providers/i18n/i18n.ts')

const isProd = process.env.NODE_ENV === 'production'

// Функция для извлечения домена из URL (с безопасным фолбэком для этапа сборки)
const getDomainFromUrl = (url) => {
  if (!url) return 'localhost'
  try {
    return new URL(url).hostname
  } catch {
    return 'localhost'
  }
}

// Получаем домен из переменной окружения
const apiDomain = getDomainFromUrl(process.env.NEXT_PUBLIC_API_URL)

// Заголовки безопасности для всех маршрутов
const securityHeaders = [
  // Запрещаем встраивание страницы в iframe с других доменов
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  // Запрещаем браузеру угадывать MIME-тип контента
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  // Отправляем только origin в Referer-заголовке при переходе на другой домен
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  // Ограничиваем неиспользуемые браузерные API
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
  // Защита от XSS для устаревших браузеров
  { key: 'X-XSS-Protection', value: '1; mode=block' },
  // Запрет на индексацию если админка будет на уровне HTTP-заголовков
  { key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' },
]

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  reactCompiler: true,
  typescript: { ignoreBuildErrors: true },
  experimental: {
    cpus: 1,
    workerThreads: false,
  },

  // Скрываем заголовок X-Powered-By: Next.js (не раскрываем стек)
  poweredByHeader: false,

  // Убираем console.* вызовы в продакшн-сборке (кроме console.error)
  compiler: {
    removeConsole: isProd ? { exclude: ['error'] } : false,
  },

  images: {
    qualities: [75, 90],
    dangerouslyAllowLocalIP: !isProd,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: apiDomain,
      },
      {
        protocol: 'http',
        hostname: apiDomain,
      },
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'localhost',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  allowedDevOrigins: ['127.0.0.1', 'localhost'],

  // Заголовки безопасности
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: securityHeaders,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
