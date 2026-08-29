/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface SystemSettingResponseDto {
  /**
   * Режим технических работ активен
   * @example false
   */
  maintenanceMode: boolean;
  /**
   * Информационный баннер активен
   * @example false
   */
  bannerEnabled: boolean;
  /**
   * Текст баннера
   * @example "Уважаемые пользователи, 25 июля сайт будет временно недоступен."
   */
  bannerText: string;
  /**
   * Ссылка на баннере
   * @example "https://example.com/maintenance"
   */
  bannerLink: string;
}

export interface UpdateSystemSettingDto {
  /**
   * Режим технических работ активен
   * @example false
   */
  maintenanceMode?: boolean;
  /**
   * Информационный баннер активен
   * @example false
   */
  bannerEnabled?: boolean;
  /**
   * Текст баннера
   * @example "Уважаемые пользователи, 25 июля сайт будет временно недоступен."
   */
  bannerText?: string;
  /**
   * Ссылка на баннере
   * @example "https://example.com/maintenance"
   */
  bannerLink?: string;
}

export interface CategoryResponseDto {
  /** @example "550e8400-e29b-41d4-a716-446655440000" */
  id: string;
  /** @example "Платья" */
  name: string;
  /** @example "platya" */
  slug: string;
  /** @example "https://example.com/images/platya.jpg" */
  image?: string | null;
  /** @example true */
  isActive: boolean;
  /** @example 0 */
  sortOrder: number;
  children?: CategoryResponseDto[];
}

export interface CreateCategoryDto {
  /**
   * Название категории
   * @example "Платья"
   */
  name: string;
  /**
   * Уникальный слаг (slug) для URL
   * @example "platya"
   */
  slug: string;
  /**
   * Ссылка на изображение категории
   * @example "https://example.com/images/platya.jpg"
   */
  image?: string;
  /**
   * Статус активности категории
   * @default true
   * @example true
   */
  isActive?: boolean;
  /**
   * Порядок сортировки
   * @default 0
   * @example 0
   */
  sortOrder?: number;
  /**
   * ID родительской категории
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  parentId?: string;
}

export interface UpdateCategoryDto {
  /**
   * Название категории
   * @example "Платья"
   */
  name?: string;
  /**
   * Уникальный слаг (slug) для URL
   * @example "platya"
   */
  slug?: string;
  /**
   * Ссылка на изображение категории
   * @example "https://example.com/images/platya.jpg"
   */
  image?: string;
  /**
   * Статус активности категории
   * @default true
   * @example true
   */
  isActive?: boolean;
  /**
   * Порядок сортировки
   * @default 0
   * @example 0
   */
  sortOrder?: number;
  /**
   * ID родительской категории
   * @example "550e8400-e29b-41d4-a716-446655440000"
   */
  parentId?: string;
}

export interface RegisterDto {
  /**
   * Электронная почта пользователя
   * @example "user@example.com"
   */
  email: string;
  /**
   * Пароль пользователя (минимум 8 символов)
   * @minLength 8
   * @example "password123"
   */
  password: string;
  /**
   * Имя пользователя
   * @example "Иван Иванов"
   */
  name?: string;
  /**
   * Номер телефона
   * @example "+79991234567"
   */
  phone?: string;
}

export interface UserResponseDto {
  /** @example "550e8400-e29b-41d4-a716-446655440000" */
  id: string;
  /** @example "user@example.com" */
  email: string;
  /** @example "Иван Иванов" */
  name?: string;
  /** @example "+79991234567" */
  phone?: string;
  /** @example "USER" */
  role: "ADMIN" | "USER";
  /** @example false */
  isBanned: boolean;
  /**
   * @format date-time
   * @example "2026-06-25T05:50:17.000Z"
   */
  createdAt: string;
  /**
   * @format date-time
   * @example "2026-06-25T05:50:17.000Z"
   */
  updatedAt: string;
}

export interface LoginDto {
  /**
   * Электронная почта пользователя
   * @example "user@example.com"
   */
  email: string;
  /**
   * Пароль пользователя (минимум 8 символов)
   * @minLength 8
   * @example "password123"
   */
  password: string;
}

export interface LoginResponseDto {
  user: UserResponseDto;
}

export interface LogoutResponseDto {
  /** @example "Успешный выход" */
  message: string;
}

export interface RefreshResponseDto {
  /** @example true */
  success: boolean;
}

export interface UpdateProfileDto {
  /**
   * Имя пользователя
   * @example "Александр"
   */
  name?: string;
  /**
   * Телефон пользователя
   * @example "+79991234567"
   */
  phone?: string;
  /**
   * Новый пароль
   * @minLength 8
   * @example "newStrongPassword123"
   */
  password?: string;
}

export interface ForgotPasswordDto {
  /**
   * Электронная почта пользователя для отправки ссылки сброса пароля
   * @example "user@example.com"
   */
  email: string;
}

export interface ForgotPasswordResponseDto {
  /** @example "Инструкция по восстановлению пароля отправлена на указанный email" */
  message: string;
}

export interface ValidateResetTokenResponseDto {
  /** @example true */
  success: boolean;
}

export interface ResetPasswordDto {
  /**
   * Токен сброса пароля, полученный из письма
   * @example "a6b8c9d0..."
   */
  token: string;
  /**
   * Новый пароль пользователя (минимум 8 символов)
   * @minLength 8
   * @example "newpassword123"
   */
  password: string;
}

export interface ResetPasswordResponseDto {
  /** @example "Пароль успешно изменен" */
  message: string;
}

export interface UserAdminResponseDto {
  /** @example "550e8400-e29b-41d4-a716-446655440000" */
  id: string;
  /** @example "user@example.com" */
  email: string;
  /** @example "Иван Иванов" */
  name?: string | null;
  /** @example "+79991234567" */
  phone?: string | null;
  /** @example "USER" */
  role: "ADMIN" | "USER";
  /** @example false */
  isBanned: boolean;
  /**
   * @format date-time
   * @example "2026-06-25T05:50:17.000Z"
   */
  createdAt: string;
  /**
   * @format date-time
   * @example "2026-06-25T05:50:17.000Z"
   */
  updatedAt: string;
}

export interface UsersPaginationResponseDto {
  users: UserAdminResponseDto[];
  /** @example 42 */
  total: number;
  /** @example 1 */
  page: number;
  /** @example 20 */
  limit: number;
  /** @example 3 */
  totalPages: number;
}

export interface UpdateUserAdminDto {
  /**
   * Имя пользователя
   * @example "Иван Иванов"
   */
  name?: string;
  /**
   * Телефон пользователя
   * @example "+79991234567"
   */
  phone?: string;
  /**
   * Роль пользователя
   * @example "USER"
   */
  role?: "ADMIN" | "USER";
  /**
   * Статус блокировки пользователя
   * @example false
   */
  isBanned?: boolean;
}
