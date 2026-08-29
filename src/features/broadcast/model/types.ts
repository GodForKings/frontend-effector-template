import { z } from 'zod'

export const broadcastSchema = z.object({
  subject: z
    .string()
    .min(1, 'Заполните тему письма')
    .max(200, 'Тема не должна превышать 200 символов'),
  content: z
    .string()
    .min(1, 'Напишите содержимое письма')
    .refine((val) => val.replace(/<[^>]*>/g, '').trim().length > 0, {
      message: 'Содержимое письма не может быть пустым',
    }),
})

export type BroadcastFormValues = z.infer<typeof broadcastSchema>

export type ActiveTab = 'edit' | 'preview' | 'history'
