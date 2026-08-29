'use client'

import { LoaderCircle } from 'lucide-react'
import { type FC, useEffect, useRef, useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'

import { cn, Empty, InfoBlock } from '@/shared'

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

interface PDFViewerProps {
  currentSrc: string
}

export const PDFViewer: FC<PDFViewerProps> = (props) => {
  const { currentSrc } = props

  const wrapRef = useRef<HTMLDivElement | null>(null)
  const [numPages, setNumPages] = useState<number>(0)
  const [width, setWidth] = useState<number>(360)

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return

    const update = () => setWidth(el.clientWidth)
    update()

    const ro = new ResizeObserver(update)
    ro.observe(el)

    return () => ro.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className={cn('w-full max-h-[86dvh] overflow-y-auto')}>
      <Document
        file={currentSrc}
        loading={
          <div className={cn('py-10', 'flex justify-center items-center flex-col gap-5')}>
            <LoaderCircle
              size={120}
              strokeWidth={1.4}
              className='animate-spin text-foreground/60'
            />

            <InfoBlock
              className='gap-3 items-center'
              headerClass='font-bold text-foreground/90'
              title='Загрузка данных'
              paragraph='Пожалуйста подождите'
            />
          </div>
        }
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        noData={
          <div className={cn('py-20 flex justify-center')}>
            <Empty title='Error / Нет данных' />
          </div>
        }
        error={
          <div className={cn('py-20 flex justify-center')}>
            <Empty title='Ошибка при открытие документа' />
          </div>
        }
        onLoadError={(e) => console.warn(e.message)}
        onSourceError={(e) => console.warn(e.message)}
        onError={(e) => console.warn(e.message)}
      >
        {Array.from({ length: numPages }, (_, i) => (
          <div key={i + 1} className={cn('pb-8')}>
            <Page
              pageNumber={i + 1}
              width={Math.max(320, width - 32)}
              renderAnnotationLayer={false}
            />
          </div>
        ))}
      </Document>
    </div>
  )
}
