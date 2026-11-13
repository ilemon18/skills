import { useI18n } from '../i18n'

export function BrandWordmark({ className = '' }: { className?: string }) {
  const { dict } = useI18n()
  return <span className={`brand-wordmark ${className}`}>{dict.brand.name}</span>
}