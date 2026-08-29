'use client'

import { type FC, useMemo } from 'react'

import { cn } from '@/shared'
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Label,
  Separator,
} from '@/shared/ui/shadcn'

interface BroadcastPreviewProps {
  subject: string
  content: string
  onBackToEdit: () => void
}

export const BroadcastPreview: FC<BroadcastPreviewProps> = ({ subject, content, onBackToEdit }) => {
  const previewHtml = useMemo(() => {
    if (!content || content.trim() === '') {
      return '<html><body><p style="color: #94a3b8; font-style: italic; text-align: center; margin-top: 50px; font-family: sans-serif;">Вставьте или напишите HTML-код для предпросмотра</p></body></html>'
    }
    return content
  }, [content])

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg'>Предпросмотр письма</CardTitle>

        <CardDescription>Так будет выглядеть письмо в почтовом клиенте получателя.</CardDescription>
      </CardHeader>

      <CardContent className={cn('bg-muted p-6 rounded-b-lg', 'flex flex-col gap-4')}>
        <div
          className={cn(
            'bg-card max-w-4xl w-full mx-auto shadow p-4',
            'flex flex-col gap-3',
            'border border-border rounded-xl',
          )}
        >
          <div className='flex flex-col gap-1.5'>
            <Label>Тема письма</Label>

            <span className='text-sm font-medium text-foreground'>
              {subject ? subject : <span className='italic text-destructive'>Заполните тему</span>}
            </span>
          </div>

          <Separator />

          <div className='flex flex-col gap-1.5'>
            <Label>Кому</Label>

            <Badge variant='active'>USER-а не заблокированные</Badge>
          </div>
        </div>

        <iframe
          srcDoc={previewHtml}
          title='Предпросмотр email-письма'
          className='w-full rounded-lg shadow-sm border max-w-4xl mx-auto block bg-white'
          style={{ height: '600px', colorScheme: 'light' }}
          sandbox='allow-same-origin allow-scripts'
        />
      </CardContent>

      <CardFooter>
        <Button variant='outline' onClick={onBackToEdit}>
          Вернуться к редактированию
        </Button>
      </CardFooter>
    </Card>
  )
}
