'use client'

import type { FC } from 'react'

import { cn } from '@/shared'
import { Textarea } from '@/shared/ui/shadcn'

interface BroadcastEditorProps {
  id?: string
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export const BroadcastEditor: FC<BroadcastEditorProps> = (props) => {
  const { id, value, onChange, disabled = false } = props

  const textareaStyles = cn(
    'min-h-100 font-mono text-sm leading-relaxed resize-y',
    'bg-card text-foreground',
  )

  return (
    <Textarea
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      placeholder='Вставьте или напишите HTML-код письма рассылки...'
      className={textareaStyles}
    />
  )
}
