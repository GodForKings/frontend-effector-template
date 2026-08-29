'use client'

import type { FC, PropsWithChildren } from 'react'
import { Toaster } from 'react-hot-toast'

import { ConfirmDialog, Dialog, Modal, ToastCard } from '@/shared'

export const PlatformContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <div className='relative mx-auto w-full'>{children}</div>
      {/* Глобальная modal */}
      <Modal />
      {/* Глобальный dialog */}
      <Dialog />
      {/* Глобальный confirm dialog */}
      <ConfirmDialog />
      {/* Глобальные тосты */}
      <Toaster position='top-center'>{(t) => <ToastCard t={t} />}</Toaster>
    </>
  )
}
