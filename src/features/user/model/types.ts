import { z } from 'zod'

export interface UserFilters {
  search: string
  page: number
  limit: number
}

export const userFormSchema = z.object({
  name: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val?.trim() === '' ? null : val)),
  phone: z
    .string()
    .nullable()
    .optional()
    .transform((val) => (val?.trim() === '' ? null : val))
    .refine(
      (val) => {
        if (!val) return true
        const digits = val.replace(/\D/g, '')
        return digits.length === 11 && (digits.startsWith('7') || digits.startsWith('8'))
      },
      {
        message: 'Номер телефона должен содержать 11 цифр и начинаться с +7 или 8',
      },
    ),
  role: z.enum(['ADMIN', 'USER'], { error: 'Укажите РОЛЬ' }),
  isBanned: z.boolean(),
})

export type UserFormValues = z.infer<typeof userFormSchema>

export const DEFAULT_USER_FORM_VALUES: UserFormValues = {
  name: '',
  phone: '',
  role: 'USER',
  isBanned: false,
}
