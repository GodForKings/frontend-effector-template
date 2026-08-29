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

import {
  CategoryResponseDto,
  CreateCategoryDto,
  ForgotPasswordDto,
  ForgotPasswordResponseDto,
  LoginDto,
  LoginResponseDto,
  LogoutResponseDto,
  RefreshResponseDto,
  RegisterDto,
  ResetPasswordDto,
  ResetPasswordResponseDto,
  SystemSettingResponseDto,
  UpdateCategoryDto,
  UpdateProfileDto,
  UpdateSystemSettingDto,
  UpdateUserAdminDto,
  UserAdminResponseDto,
  UserResponseDto,
  UsersPaginationResponseDto,
  ValidateResetTokenResponseDto,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Api<
  SecurityDataType = unknown,
> extends HttpClient<SecurityDataType> {
  /**
   * No description
   *
   * @tags Upload
   * @name UploadControllerUploadImage
   * @summary Загрузить изображение в публичное хранилище (Доступ: ADMIN)
   * @request POST:/api/upload/image
   * @secure
   */
  uploadControllerUploadImage = (
    data: {
      /** @format binary */
      file?: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @example "photo.jpg" */
        fileName?: string;
        /** @example "/uploads/public/uuid.jpg" */
        filePath?: string;
      },
      void
    >({
      path: `/api/upload/image`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.FormData,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Upload
   * @name UploadControllerUploadFile
   * @summary Загрузить приватный файл PDF/ZIP/DOC (Доступ: ADMIN)
   * @request POST:/api/upload/file
   * @secure
   */
  uploadControllerUploadFile = (
    data: {
      /** @format binary */
      file?: File;
    },
    params: RequestParams = {},
  ) =>
    this.request<
      {
        /** @example "document.pdf" */
        fileName?: string;
        /** @example "/uploads/private/uuid.pdf" */
        filePath?: string;
      },
      void
    >({
      path: `/api/upload/file`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.FormData,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Upload
   * @name UploadControllerDeleteFile
   * @summary Удалить загруженный файл с диска (Доступ: ADMIN)
   * @request DELETE:/api/upload/file
   * @secure
   */
  uploadControllerDeleteFile = (
    query: {
      /**
       * Относительный путь или абсолютный URL файла для удаления
       * @example "/uploads/public/file.jpg"
       */
      filePath: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<void, any>({
      path: `/api/upload/file`,
      method: "DELETE",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags System Settings
   * @name SystemSettingControllerGetMaintenanceStatus
   * @summary Получить настройки режима тех. работ и информационного баннера
   * @request GET:/api/system-settings/maintenance
   */
  systemSettingControllerGetMaintenanceStatus = (params: RequestParams = {}) =>
    this.request<SystemSettingResponseDto, any>({
      path: `/api/system-settings/maintenance`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags System Settings
   * @name SystemSettingControllerUpdateMaintenanceStatus
   * @summary Изменить настройки тех. работ и баннера (Доступ: ADMIN)
   * @request PATCH:/api/system-settings/maintenance
   * @secure
   */
  systemSettingControllerUpdateMaintenanceStatus = (
    data: UpdateSystemSettingDto,
    params: RequestParams = {},
  ) =>
    this.request<SystemSettingResponseDto, any>({
      path: `/api/system-settings/maintenance`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Categories
   * @name CategoryControllerFindAll
   * @summary Получить список всех корневых активных категорий
   * @request GET:/api/categories
   */
  categoryControllerFindAll = (params: RequestParams = {}) =>
    this.request<CategoryResponseDto[], any>({
      path: `/api/categories`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Categories
   * @name CategoryControllerCreate
   * @summary Создать новую категорию (Доступ: ADMIN)
   * @request POST:/api/categories
   * @secure
   */
  categoryControllerCreate = (
    data: CreateCategoryDto,
    params: RequestParams = {},
  ) =>
    this.request<CategoryResponseDto, void>({
      path: `/api/categories`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Categories
   * @name CategoryControllerFindAllAdmin
   * @summary Получить все категории без фильтрации по активности (Доступ: ADMIN)
   * @request GET:/api/categories/admin/all
   * @secure
   */
  categoryControllerFindAllAdmin = (params: RequestParams = {}) =>
    this.request<CategoryResponseDto[], void>({
      path: `/api/categories/admin/all`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Categories
   * @name CategoryControllerFindBySlug
   * @summary Получить категорию по ЧПУ-ссылке (slug)
   * @request GET:/api/categories/by-slug/{slug}
   */
  categoryControllerFindBySlug = (slug: string, params: RequestParams = {}) =>
    this.request<CategoryResponseDto, void>({
      path: `/api/categories/by-slug/${slug}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Categories
   * @name CategoryControllerFindOne
   * @summary Получить категорию по её ID
   * @request GET:/api/categories/{id}
   */
  categoryControllerFindOne = (id: string, params: RequestParams = {}) =>
    this.request<CategoryResponseDto, void>({
      path: `/api/categories/${id}`,
      method: "GET",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Categories
   * @name CategoryControllerUpdate
   * @summary Обновить категорию по ID (Доступ: ADMIN)
   * @request PATCH:/api/categories/{id}
   * @secure
   */
  categoryControllerUpdate = (
    id: string,
    data: UpdateCategoryDto,
    params: RequestParams = {},
  ) =>
    this.request<CategoryResponseDto, void>({
      path: `/api/categories/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Categories
   * @name CategoryControllerRemove
   * @summary Удалить категорию по ID (Доступ: ADMIN)
   * @request DELETE:/api/categories/{id}
   * @secure
   */
  categoryControllerRemove = (id: string, params: RequestParams = {}) =>
    this.request<void, void>({
      path: `/api/categories/${id}`,
      method: "DELETE",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerRegister
   * @summary Регистрация нового пользователя
   * @request POST:/api/auth/register
   */
  authControllerRegister = (data: RegisterDto, params: RequestParams = {}) =>
    this.request<UserResponseDto, void>({
      path: `/api/auth/register`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerRegisterAdmin
   * @summary Регистрация первого администратора
   * @request POST:/api/auth/admin/register
   */
  authControllerRegisterAdmin = (
    data: RegisterDto,
    params: RequestParams = {},
  ) =>
    this.request<UserResponseDto, void>({
      path: `/api/auth/admin/register`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerLogin
   * @summary Авторизация пользователя
   * @request POST:/api/auth/login
   */
  authControllerLogin = (data: LoginDto, params: RequestParams = {}) =>
    this.request<LoginResponseDto, void>({
      path: `/api/auth/login`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerLogout
   * @summary Выход из системы (очистка cookie)
   * @request POST:/api/auth/logout
   */
  authControllerLogout = (params: RequestParams = {}) =>
    this.request<LogoutResponseDto, any>({
      path: `/api/auth/logout`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerRefresh
   * @summary Обновление пары токенов доступа
   * @request POST:/api/auth/refresh
   */
  authControllerRefresh = (params: RequestParams = {}) =>
    this.request<RefreshResponseDto, void>({
      path: `/api/auth/refresh`,
      method: "POST",
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerGetMe
   * @summary Получение профиля текущего пользователя
   * @request GET:/api/auth/me
   * @secure
   */
  authControllerGetMe = (params: RequestParams = {}) =>
    this.request<UserResponseDto, void>({
      path: `/api/auth/me`,
      method: "GET",
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerUpdateMe
   * @summary Обновление профиля текущего пользователя
   * @request PATCH:/api/auth/me
   * @secure
   */
  authControllerUpdateMe = (
    data: UpdateProfileDto,
    params: RequestParams = {},
  ) =>
    this.request<UserResponseDto, void>({
      path: `/api/auth/me`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerForgotPassword
   * @summary Запрос ссылки для восстановления пароля
   * @request POST:/api/auth/forgot-password
   */
  authControllerForgotPassword = (
    data: ForgotPasswordDto,
    params: RequestParams = {},
  ) =>
    this.request<ForgotPasswordResponseDto, any>({
      path: `/api/auth/forgot-password`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerValidateResetToken
   * @summary Проверка валидности токена сброса пароля
   * @request GET:/api/auth/reset-password/validate
   */
  authControllerValidateResetToken = (
    query: {
      /** Токен из ссылки сброса пароля */
      token: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<ValidateResetTokenResponseDto, any>({
      path: `/api/auth/reset-password/validate`,
      method: "GET",
      query: query,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Auth
   * @name AuthControllerResetPassword
   * @summary Установка нового пароля по токену сброса
   * @request POST:/api/auth/reset-password
   */
  authControllerResetPassword = (
    data: ResetPasswordDto,
    params: RequestParams = {},
  ) =>
    this.request<ResetPasswordResponseDto, void>({
      path: `/api/auth/reset-password`,
      method: "POST",
      body: data,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Users Admin
   * @name UserControllerFindAll
   * @summary Получить список всех пользователей с пагинацией и поиском (Доступ: ADMIN)
   * @request GET:/api/users
   * @secure
   */
  userControllerFindAll = (
    query?: {
      /**
       * Номер страницы (начиная с 1)
       * @min 1
       * @default 1
       * @example 1
       */
      page?: number;
      /**
       * Количество записей на странице (максимум 100)
       * @min 1
       * @max 100
       * @default 20
       * @example 20
       */
      limit?: number;
      /**
       * Поисковый запрос (по email, имени или телефону)
       * @example "иван"
       */
      search?: string;
    },
    params: RequestParams = {},
  ) =>
    this.request<UsersPaginationResponseDto, any>({
      path: `/api/users`,
      method: "GET",
      query: query,
      secure: true,
      format: "json",
      ...params,
    });
  /**
   * No description
   *
   * @tags Users Admin
   * @name UserControllerExport
   * @summary Экспорт списка всех пользователей в CSV-файл (Доступ: ADMIN)
   * @request GET:/api/users/export
   * @secure
   */
  userControllerExport = (params: RequestParams = {}) =>
    this.request<void, any>({
      path: `/api/users/export`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * No description
   *
   * @tags Users Admin
   * @name UserControllerUpdate
   * @summary Редактировать данные пользователя (Доступ: ADMIN)
   * @request PATCH:/api/users/{id}
   * @secure
   */
  userControllerUpdate = (
    id: string,
    data: UpdateUserAdminDto,
    params: RequestParams = {},
  ) =>
    this.request<UserAdminResponseDto, void>({
      path: `/api/users/${id}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      format: "json",
      ...params,
    });
}
