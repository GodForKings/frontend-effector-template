import { SettingsForm } from '@/features'
import { InfoBlock } from '@/shared'

export default function SettingsPage() {
  return (
    <div className='space-y-8'>
      <InfoBlock
        title='Настройки сайта'
        paragraph='Управление глобальным режимом обслуживания и информационными баннерами'
      />

      <SettingsForm />
    </div>
  )
}
