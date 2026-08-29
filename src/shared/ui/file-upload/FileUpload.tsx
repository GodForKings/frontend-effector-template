'use client'

import type { AxiosProgressEvent } from 'axios'
import { FileText, Image as ImageIcon, Loader2, UploadCloud, X } from 'lucide-react'
import { motion } from 'motion/react'
import { type ChangeEvent, type DragEvent, type FC, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

import { cn } from '@/shared'
import { apiClient } from '@/shared/api'
import { Button } from '@/shared/ui/shadcn'
import { getPhotoUrl } from '@/shared/utils/helpers'

interface FileUploadProps {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  type: 'image' | 'file'
  accept?: string
  maxSize?: number // в байтах
  className?: string
  disabled?: boolean
  onRemove?: (url: string) => void
  autoDeleteOnRemove?: boolean
}

export const FileUpload: FC<FileUploadProps> = (props) => {
  const {
    value,
    onChange,
    onBlur,
    type,
    accept = type === 'image' ? 'image/*' : '.pdf,.zip',
    maxSize = 15 * 1024 * 1024, // 15 МБ по умолчанию
    className,
    disabled = false,
    onRemove,
    autoDeleteOnRemove = false,
  } = props

  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragActive, setIsDragActive] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  // Получаем имя файла из URL для отображения в типе 'file'
  const getFileName = (url: string) => {
    if (!url) return ''
    try {
      const decoded = decodeURIComponent(url)
      return decoded.substring(decoded.lastIndexOf('/') + 1)
    } catch {
      return url
    }
  }

  const handleDrag = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (disabled || isUploading) return

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true)
    } else if (e.type === 'dragleave') {
      setIsDragActive(false)
    }
  }

  const uploadFile = async (file: File) => {
    if (type === 'image' && !file.type.startsWith('image/')) {
      toast.error('Допускаются только файлы изображений (PNG, JPG, WEBP и др.)')
      return
    }

    if (file.size > maxSize) {
      toast.error(`Размер файла превышает лимит в ${Math.round(maxSize / 1024 / 1024)}МБ`)
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      let filePath = ''

      if (type === 'image') {
        const response = await apiClient.uploadControllerUploadImage(
          { file },
          {
            onUploadProgress: (progressEvent: AxiosProgressEvent) => {
              if (progressEvent.total) {
                const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                setUploadProgress(percent)
              }
            },
          },
        )
        filePath = response.data.filePath ?? ''
      } else {
        const response = await apiClient.uploadControllerUploadFile(
          { file },
          {
            onUploadProgress: (progressEvent: AxiosProgressEvent) => {
              if (progressEvent.total) {
                const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                setUploadProgress(percent)
              }
            },
          },
        )
        filePath = response.data.filePath ?? ''
      }

      if (filePath) {
        onChange(filePath)
        toast.success('Файл успешно загружен')
      } else {
        throw new Error('Путь к файлу пустой')
      }
    } catch (error) {
      console.error('Ошибка загрузки файла:', error)
      toast.error('Не удалось загрузить файл. Попробуйте снова.')
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }

  const handleDrop = async (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)
    if (disabled || isUploading) return

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      await uploadFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (disabled || isUploading) return

    if (e.target.files && e.target.files[0]) {
      await uploadFile(e.target.files[0])
    }
  }

  const handleAreaClick = () => {
    if (disabled || isUploading) return
    fileInputRef.current?.click()
  }

  const handleRemove = async (e: React.MouseEvent) => {
    e.stopPropagation()
    const previousValue = value
    onChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    if (onRemove && previousValue) {
      onRemove(previousValue)
    }
    if (autoDeleteOnRemove && previousValue) {
      try {
        await apiClient.uploadControllerDeleteFile({ filePath: previousValue })
      } catch (error) {
        console.error('Ошибка при удалении файла с сервера:', error)
      }
    }
  }

  const areaActiveClasses = 'border-foreground bg-foreground/5 text-foreground'

  const areaInactiveClasses = cn(
    'border-border bg-neutral-50/50 dark:bg-neutral-900/10',
    'hover:border-foreground/30 hover:bg-neutral-50 dark:hover:bg-neutral-900/40',
  )

  return (
    <div
      className={cn(
        'w-full',
        type === 'image' && !className?.includes('aspect-') && 'aspect-video',
        className,
      )}
    >
      <input
        ref={fileInputRef}
        type='file'
        accept={accept}
        onChange={handleChange}
        onBlur={onBlur}
        disabled={disabled || isUploading}
        className='hidden'
      />

      {value ? (
        type === 'image' ? (
          <div
            className={cn(
              'relative size-full overflow-hidden',
              'rounded-xl border border-border bg-neutral-50/50 dark:bg-neutral-900/10',
              'group transition-all duration-200 hover:border-foreground/20',
            )}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={getPhotoUrl(value)}
              alt='Preview'
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              className={cn(
                'size-full object-cover select-none',
                'transition group-hover:scale-105',
              )}
            />

            {/* Аккуратный крестик в правом верхнем углу в стиле Vercel */}
            <div className='absolute top-2.5 right-2.5 z-10'>
              <Button
                type='button'
                variant='outline'
                size='icon'
                onClick={handleRemove}
                disabled={disabled}
                className={cn(
                  'size-8 rounded-full shadow-xs',
                  'border-border bg-background/80 backdrop-blur-xs',
                  'transition-colors duration-150',
                  'hover:bg-destructive hover:text-destructive-foreground hover:border-destructive',
                )}
                aria-label='Удалить изображение'
              >
                <X className='size-3.5' />
              </Button>
            </div>
          </div>
        ) : (
          // Режим отображения загруженного файла
          <div
            className={cn(
              'flex items-center justify-between',
              'p-4 rounded-xl shadow-xs border bg-card',
              'transition duration-200 hover:bg-accent/10',
            )}
          >
            <div className='flex items-center gap-3 min-w-0'>
              <div
                className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center',
                  'rounded-lg bg-primary/10 text-primary',
                )}
              >
                <FileText className='size-5' />
              </div>

              <div className='min-w-0 flex-col gap-0.5'>
                <p className='truncate text-sm font-medium text-foreground'>{getFileName(value)}</p>

                {!value.includes('/uploads/private/') && (
                  <a
                    href={value}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={cn(
                      'text-xs text-muted-foreground transition',
                      'hover:text-primary hover:underline',
                    )}
                  >
                    Открыть в новой вкладке
                  </a>
                )}
              </div>
            </div>

            <Button
              type='button'
              variant='ghost'
              size='icon'
              onClick={handleRemove}
              disabled={disabled}
              className='size-8 text-muted-foreground hover:text-destructive'
              aria-label='Удалить файл'
            >
              <X className='size-4' />
            </Button>
          </div>
        )
      ) : (
        // Драг-энд-дроп область для загрузки
        <motion.div
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          onClick={handleAreaClick}
          whileHover={{ scale: disabled ? 1 : 1.002 }}
          whileTap={{ scale: disabled ? 1 : 0.998 }}
          className={cn(
            'size-full flex flex-col items-center justify-center text-center',
            'rounded-xl border border-dashed cursor-pointer',
            'transition-all duration-200',
            isDragActive ? areaActiveClasses : areaInactiveClasses,
            disabled && 'pointer-events-none opacity-50',
          )}
        >
          {isUploading ? (
            <div className='flex flex-col items-center gap-3 p-4'>
              <Loader2 className='size-6 animate-spin text-muted-foreground' />

              <div className='space-y-1'>
                <p className='text-xs font-medium text-foreground'>Загрузка файла...</p>

                <p className='text-[10px] text-muted-foreground'>{uploadProgress}%</p>
              </div>

              <div className='h-1 w-24 overflow-hidden rounded-full bg-secondary'>
                <div
                  className='h-full bg-foreground transition-all duration-150 ease-out'
                  style={{ width: `${uploadProgress}%` }}
                />
              </div>
            </div>
          ) : (
            <div className='flex flex-col items-center gap-2.5 p-4'>
              <div
                className={cn(
                  'flex h-8 w-8 shrink-0 items-center justify-center',
                  'rounded-lg border border-border bg-background shadow-xs',
                  'text-muted-foreground transition duration-200 group-hover:text-foreground',
                )}
              >
                {type === 'image' ? (
                  <ImageIcon className='size-4 text-muted-foreground' />
                ) : (
                  <UploadCloud className='size-4 text-muted-foreground' />
                )}
              </div>

              <div className='space-y-0.5 px-2'>
                <p className='text-xs font-medium text-foreground'>
                  Нажмите для загрузки<span className='hidden md:inline'> или перетащите</span>
                </p>

                <p className='text-[10px] text-muted-foreground'>
                  {type === 'image' ? 'Изображения (PNG, JPG, WEBP до 15МБ)' : 'PDF, ZIP до 15МБ'}
                </p>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
