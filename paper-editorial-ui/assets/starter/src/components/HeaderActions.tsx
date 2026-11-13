import { Link } from 'react-router-dom'
import { DOCS_URL } from '../config'
import { useAuth } from '../auth/AuthProvider'
import { useI18n } from '../i18n'
import { LocaleSwitcher } from './LocaleSwitcher'
import { ThemeToggle } from './ThemeToggle'

type Props = {
  showModels?: boolean
  showDocs?: boolean
  compact?: boolean
}

/**
 * Shared navigation actions. Mirrors the original header cluster:
 * models & pricing · docs · locale · theme · auth CTA
 */
export function HeaderActions({ showModels = true, showDocs = true, compact = false }: Props) {
  const { t, dict } = useI18n()
  const { isAuthenticated } = useAuth()
  const authHref = isAuthenticated ? '/dashboard' : '/login?redirect=/dashboard'

  return (
    <div
      className={`flex max-w-full shrink-0 flex-wrap items-center justify-end ${
        compact ? 'gap-2' : 'gap-2 sm:gap-4'
      }`}
    >
      {showModels ? (
        <Link
          to="/model-plaza"
          className="home-nav-link whitespace-nowrap text-sm font-medium"
        >
          <span className="sm:hidden">{dict.home.brand.pricingNavShort}</span>
          <span className="hidden sm:inline">{dict.home.brand.modelsNav}</span>
        </Link>
      ) : null}
      {showDocs ? (
        <Link to={DOCS_URL} className="home-nav-link whitespace-nowrap text-sm font-medium">
          {t('nav.docs')}
        </Link>
      ) : null}
      <LocaleSwitcher />
      <ThemeToggle />
      <Link to={authHref} className="btn btn-primary whitespace-nowrap">
        {isAuthenticated ? t('nav.dashboard') : t('nav.login')}
        <span aria-hidden="true">↗</span>
      </Link>
    </div>
  )
}