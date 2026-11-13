import { useI18n } from '../i18n'
import { useTheme } from '../theme/ThemeProvider'
import { Icon } from './Icon'

export function ThemeToggle({ className = 'btn btn-ghost p-2' }: { className?: string }) {
  const { dark, toggle } = useTheme()
  const { t } = useI18n()
  const label = dark ? t('common.switchToLight') : t('common.switchToDark')
  return (
    <button type="button" className={className} aria-label={label} title={label} onClick={toggle}>
      <Icon name={dark ? 'sun' : 'moon'} size="md" />
    </button>
  )
}