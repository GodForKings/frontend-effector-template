import { combine, createEffect, createEvent, createStore, sample } from 'effector'
import { createGate } from 'effector-react'

import { apiClient, getErrorMessage, type LoginDto, type RegisterDto, toastModels } from '@/shared'

export const loginChanged = createEvent<string>()
export const passwordChanged = createEvent<string>()
export const loginSubmitted = createEvent()
export const registrationSubmitted = createEvent()

export const authCheckStarted = createEvent()
export const logoutClicked = createEvent()

export const AuthGate = createGate()

export const clearAuthError = createEvent()
export const resetAuthForm = createEvent()

export const loginFx = createEffect(async (dto: LoginDto) => {
  const response = await apiClient.authControllerLogin(dto)

  if (response.data.user.role !== 'ADMIN') {
    await apiClient.authControllerLogout()
    throw new Error('Доступ разрешен только для администраторов')
  }

  return response.data
})

export const refreshSessionFx = createEffect(async () => {
  const response = await apiClient.authControllerGetMe()

  if (response.data.role !== 'ADMIN') {
    throw new Error('Доступ разрешен только для администраторов')
  }

  return response.data
})

export const logoutFx = createEffect(async () => {
  const response = await apiClient.authControllerLogout()
  return response.data
})

export const adminRegistrationFx = createEffect(async (dto: RegisterDto) => {
  const { data } = await apiClient.authControllerRegisterAdmin(dto)
  return data
})

export const $login = createStore('')
  .on(loginChanged, (_, value) => value)
  .reset(resetAuthForm)

export const $password = createStore('')
  .on(passwordChanged, (_, value) => value)
  .reset(resetAuthForm)

export const $authError = createStore<string | null>(null)
  .on(loginFx.failData, (_, error) => getErrorMessage(error, 'Ошибка при входе в приложение'))
  .on(adminRegistrationFx.failData, (_, error) => getErrorMessage(error, 'Ошибка при регистрации'))
  .reset(
    loginChanged,
    passwordChanged,
    clearAuthError,
    loginFx.doneData,
    adminRegistrationFx.doneData,
  )

export const $isAuthenticated = createStore<boolean | null>(null)
  .on(loginFx.doneData, (_, data) => data.user.role === 'ADMIN')
  .on(refreshSessionFx.doneData, (_, user) => user.role === 'ADMIN')
  .on(refreshSessionFx.failData, () => false)
  .on(logoutFx.doneData, () => false)

export const $formValid = combine($login, $password, (login, password) => {
  return Boolean(login.trim() && password.trim() && password.length >= 8)
})

export const $loginLoading = loginFx.pending
export const $refreshLoading = refreshSessionFx.pending
export const $logoutLoading = logoutFx.pending
export const $adminRegistrationLoading = adminRegistrationFx.pending

export const $authLoading = combine(
  $loginLoading,
  $refreshLoading,
  $logoutLoading,
  $adminRegistrationLoading,
  (loginLoading, refreshLoading, logoutLoading, adminRegistrationLoading) => {
    return loginLoading || refreshLoading || logoutLoading || adminRegistrationLoading
  },
)

sample({
  clock: authCheckStarted,
  target: refreshSessionFx,
})

/* Запускаем проверку только если состояние ещё неизвестно */
sample({
  clock: AuthGate.open,
  source: $isAuthenticated,
  filter: (isAuthenticated) => isAuthenticated === null,
  target: refreshSessionFx,
})

sample({
  clock: loginSubmitted,
  source: {
    login: $login,
    password: $password,
  },
  filter: ({ login, password }) => Boolean(login.trim() && password.trim()),
  fn: ({ login, password }) => ({
    email: login.trim(),
    password: password.trim(),
  }),
  target: loginFx,
})

sample({
  clock: loginSubmitted,
  source: {
    login: $login,
    password: $password,
  },
  filter: ({ login, password }) => !login.trim() || !password.trim(),
  fn: () => 'Заполните все поля',
  target: toastModels.events.showError,
})

sample({
  clock: registrationSubmitted,
  source: {
    login: $login,
    password: $password,
  },
  filter: ({ login, password }) => Boolean(login.trim() && password.trim()),
  fn: ({ login, password }) => ({
    email: login.trim(),
    password: password.trim(),
  }),
  target: adminRegistrationFx,
})

sample({
  clock: registrationSubmitted,
  source: {
    login: $login,
    password: $password,
  },
  filter: ({ login, password }) => !login.trim() || !password.trim(),
  fn: () => 'Заполните все поля',
  target: toastModels.events.showError,
})

sample({
  clock: adminRegistrationFx.done,
  fn: ({ params }) => ({
    email: params.email,
    password: params.password,
  }),
  target: loginFx,
})

sample({
  clock: loginFx.doneData,
  target: resetAuthForm,
})

sample({
  clock: logoutClicked,
  target: logoutFx,
})

/* UI Уведомления */
sample({
  clock: loginFx.doneData,
  fn: () => 'Успешная авторизация',
  target: toastModels.events.showSuccess,
})
sample({
  clock: loginFx.failData,
  fn: (error) => getErrorMessage(error, 'Ошибка при входе в приложение'),
  target: toastModels.events.showError,
})

sample({
  clock: adminRegistrationFx.doneData,
  fn: () => 'Администратор успешно зарегистрирован. Выполняется вход...',
  target: toastModels.events.showSuccess,
})

sample({
  clock: adminRegistrationFx.failData,
  fn: (error) => getErrorMessage(error, 'Не удалось зарегистрировать администратора'),
  target: toastModels.events.showError,
})

/* На выход из app */
sample({
  clock: logoutFx.doneData,
  fn: () => 'Вы успешно вышли из приложения',
  target: toastModels.events.showSuccess,
})
sample({
  clock: logoutFx.failData,
  fn: (error) => getErrorMessage(error, 'Не удалось завершить сессию'),
  target: toastModels.events.showError,
})

export const userAuthModels = {
  events: {
    loginChanged,
    passwordChanged,
    loginSubmitted,
    registrationSubmitted,
    authCheckStarted,
    logoutClicked,
    clearAuthError,
    resetAuthForm,
  },
  stores: {
    $login,
    $password,
    $authError,
    $isAuthenticated,
    $formValid,
    $loginLoading,
    $refreshLoading,
    $logoutLoading,
    $adminRegistrationLoading,
    $authLoading,
  },
  effects: {
    loginFx,
    refreshSessionFx,
    logoutFx,
    adminRegistrationFx,
  },
  gates: {
    AuthGate,
  },
}
