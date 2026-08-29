# ⚡ Frontend Effector Template (Admin Panel)

Современный, производительный и строго типизированный шаблон административной панели на базе **Next.js 16 (App Router)**, **React 19**, **Effector** и методологии **Feature-Sliced Design (FSD)**.

---

## 🛠️ Стек технологий

- **Фреймворк**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack, React 19, Server & Client Components)
- **Управление состоянием**: [Effector 23](https://effector.dev/) + `effector-react` (декларативные потоки данных, гейты, эффекты, изолированные сторы)
- **Стилизация**: [Tailwind CSS v4](https://tailwindcss.com/) + `@tailwindcss/postcss`
- **Анимации**: [Motion](https://motion.dev/) (`motion/react`) с физикой spring
- **UI-компоненты**: [Radix UI](https://www.radix-ui.com/) + [Shadcn UI](https://ui.shadcn.com/)
- **Таблицы**: [@tanstack/react-table v8](https://tanstack.com/table/v8) + `@tanstack/react-virtual` (сортировка, пагинация, фильтрация)
- **Формы и валидация**: [React Hook Form](https://react-hook-form.com/) + [Zod v4](https://zod.dev/)
- **API Клиент**: [Axios](https://axios-http.com/) + Автогенерация типизированных контрактов через [swagger-typescript-api](https://github.com/acacode/swagger-typescript-api)
- **Уведомления**: [react-hot-toast](https://react-hot-toast.com/) с кастомной карточкой `ToastCard`
- **Drag and Drop**: [@dnd-kit/core](https://dndkit.com/)

---

## 📐 Архитектура проекта (Feature-Sliced Design)

Проект спроектирован по стандарту FSD с изоляцией ответственности:

```text
src/
├── app/                  # Инициализация роутинга, layout, провайдеры (ProtectedGatesApp, PlatformContainer)
│   ├── (protected)/      # Защищенные маршруты админки (dashboard, categories, users, broadcasts, settings)
│   ├── (public)/         # Публичные страницы (login, reg)
│   └── _providers/       # Глобальные провайдеры (тема, i18n, гейты авторизации)
├── widgets/              # Композиционные блоки (сайдбар, шапка, навигация)
│   └── navigation/
├── features/             # Пользовательские сценарии и бизнес-фичи
│   ├── auth/             # Авторизация и регистрация
│   ├── category/         # Управление категориями (CRUD, формы, модалки, таблицы)
│   ├── user/             # Управление пользователями (роли, блокировка, CSV экспорт)
│   ├── dashboard/        # Дашборд со сводкой и статусами
│   ├── broadcast/        # Email-рассылки и шаблоны писем
│   └── settings/         # Режим обслуживания и системные настройки
├── entities/             # Бизнес-сущности
│   ├── categories/       # Домен категорий и глобальный стор
│   ├── user-auth/        # Текущий профиль и сессия
│   └── mail/             # Сущность почтовых уведомлений
└── shared/               # Переиспользуемый инфраструктурный код
    ├── api/              # Экземпляр Axios и сгенерированный API-клиент
    ├── components/       # Комплексные UI-модули (ConfirmDialog, Toast, Modal, Dialog, ThemeSwitcher)
    ├── config/           # Конфигурация, роуты и переменные окружения
    ├── hooks/            # Кастомные хуки (useDebounce, useMounted и др.)
    ├── types/            # Общие TypeScript интерфейсы
    ├── ui/               # Базовые атомарные компоненты (Shadcn, TableSkeleton, FileUpload, Button)
    └── utils/            # Утилиты (cn, форматирование, хелперы картинок)
```

---

## 🔑 Ключевые правила и паттерны кодовой базы

1. **Effector Data Flow**:
   - Вся бизнес-логика изолируется в модулях `model/` (события `createEvent`, эффекты `createEffect`, сторы `createStore`).
   - Связи между событиями строятся строго через оператор `sample`.
   - Инициализация и очистка страниц выполняется через `createGate` и хук `useGate`.
   - Привязка юнитов внутри React-компонентов осуществляется строго через `useUnit`. Прямой вызов событий запрещен.

2. **Работа с медиа-файлами**:
   - В базе данных и DTO сохраняются относительные пути (`/uploads/public/uuid.jpg`).
   - Для вывода превью и аватаров на клиенте используется хелпер `getPhotoUrl(path)`.
   - Компонент `FileUpload` поддерживает `autoDeleteOnRemove`, отправляя запрос на удаление загруженного файла при отмене создания записи.

3. **Типобезопасность**:
   - Запрещено использование типа `any` (используется `unknown` с тайп-гардами или строгие DTO).
   - Схемы форм валидируются через `zod` и привязываются к `react-hook-form` через `zodResolver`.

---

## ✨ Фирменные компоненты

- **`ConfirmDialog`** (`shared/components/confirm-dialog`):  
  Глобальный декларативный диалог подтверждения опасных действий (удаление, бан), вызываемый из любого места через Effector:
  ```typescript
  openConfirmDialog({
    title: 'Удалить категорию?',
    description: 'Действие необратимо.',
    variant: 'destructive',
    onConfirm: deleteConfirmed,
  })
  ```
- **`Button`** (`shared/ui/shadcn/button.tsx`):  
  Поддерживает пропсы `isLoading` и `loadingText`, автоматически блокирует кнопку и центрирует спиннер.
- **`TableSkeleton`** (`shared/ui/loaders-skeletons/TableSkeleton.tsx`):  
  Универсальный прелоадер для таблиц с настраиваемым числом строк/колонок и реалистичной вариативностью скелетонов.
- **`ToastCard`** (`shared/components/toast`):  
  Премиальные тосты с упругой spring-анимацией (`opacity + scale`) без конфликтов между CSS Transitions и Framer Motion.

---

## 🚀 Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка переменных окружения

Создайте файл `.env` в корне проекта (на основе `.env.example`):

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

### 3. Запуск dev-сервера

```bash
npm run dev
```

Приложение будет доступно по адресу [http://localhost:3001](http://localhost:3001).

---

## 📜 Доступные скрипты

| Скрипт | Назначение |
| :--- | :--- |
| `npm run dev` | Запуск сервера разработки Next.js на порту `3001` |
| `npm run build` | Оптимизированная production-сборка проекта |
| `npm run start` | Запуск собранного production-сервера на порту `3001` |
| `npm run lint` | Проверка кода линтером ESLint |
| `npm run lint:fix` | Автоматическое исправление ошибок линтера и форматирования |
| `npm run api:generate` | Генерация типизированного API-клиента из `swagger-spec.json` бэкенда |

---

## 🔄 Генерация API Клиента

При изменении DTO или контроллеров на бэкенде выполните:

```bash
npm run api:generate
```

Команда автоматически обновит файлы в `src/shared/api/generated/` на основе спецификации Swagger.
