'use client'

import { useUnit } from 'effector-react'
import { Loader } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ComponentProps, FC } from 'react'

import { userAuthModels } from '@/entities'
import { cn, PUBLIC_PAGES, ThemeSwitcher } from '@/shared'
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from '@/shared/ui/shadcn'

export const AuthForm: FC = () => {
  const location = usePathname()
  const isLogin = PUBLIC_PAGES.LOGIN === location

  const [
    login,
    password,
    error,
    formValid,
    loading,
    loginChanged,
    passwordChanged,
    loginSubmitted,
    registrationSubmitted,
  ] = useUnit([
    userAuthModels.stores.$login,
    userAuthModels.stores.$password,
    userAuthModels.stores.$authError,
    userAuthModels.stores.$formValid,
    userAuthModels.stores.$authLoading,
    userAuthModels.events.loginChanged,
    userAuthModels.events.passwordChanged,
    userAuthModels.events.loginSubmitted,
    userAuthModels.events.registrationSubmitted,
  ])

  const handleSubmit: NonNullable<ComponentProps<'form'>['onSubmit']> = (e) => {
    e.preventDefault()
    if (isLogin) {
      loginSubmitted()
    } else {
      registrationSubmitted()
    }
  }

  return (
    <div className={cn('relative min-h-dvh bg-background p-4', 'flex items-center justify-center')}>
      <div className='absolute top-4 right-4'>
        <ThemeSwitcher />
      </div>

      <Card className={cn('border-border shadow-none', 'w-full max-w-115')}>
        <CardHeader className='space-y-1.5 text-center pb-6'>
          <CardTitle className='text-2xl font-semibold tracking-tight'>
            {isLogin ? 'Войти в панель' : 'Регистрация'}
          </CardTitle>

          <CardDescription className='text-sm text-muted-foreground'>
            {isLogin
              ? 'Введите ваш email и пароль для входа'
              : 'Заполните поля ниже для создания аккаунта'}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form className='space-y-4' onSubmit={handleSubmit}>
            <div className='space-y-2'>
              <Label htmlFor='login'>Email</Label>

              <Input
                id='login'
                name='login'
                type='email'
                value={login}
                onChange={(e) => loginChanged(e.target.value)}
                placeholder='name@example.com'
                autoComplete='username'
                disabled={loading}
              />
            </div>

            <div className='space-y-2'>
              <Label htmlFor='password'>Пароль</Label>

              <Input
                id='password'
                name='password'
                type='password'
                value={password}
                onChange={(e) => passwordChanged(e.target.value)}
                placeholder='••••••••'
                autoComplete='current-password'
                disabled={loading}
              />
            </div>

            {error && (
              <div
                className={cn(
                  'text-sm text-destructive',
                  'border border-destructive/30 rounded-md',
                  'bg-destructive/10 px-3 py-2',
                )}
              >
                {error}
              </div>
            )}

            <Button className='w-full' type='submit' disabled={!formValid || loading}>
              {loading ? (
                <Loader className='animate-spin' />
              ) : isLogin ? (
                'Войти'
              ) : (
                'Зарегистрироваться'
              )}
            </Button>

            <div className='text-center text-sm text-muted-foreground pt-2'>
              {isLogin ? (
                <>
                  Еще нет аккаунта?{' '}
                  <Link
                    href={PUBLIC_PAGES.REG}
                    className='font-medium text-foreground hover:underline underline-offset-4'
                  >
                    Зарегистрироваться
                  </Link>
                </>
              ) : (
                <>
                  Уже есть аккаунт?{' '}
                  <Link
                    href={PUBLIC_PAGES.LOGIN}
                    className='font-medium text-foreground hover:underline underline-offset-4'
                  >
                    Войти
                  </Link>
                </>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
