import { Link } from 'react-router-dom'
import { BrandWordmark } from '../components/BrandWordmark'
import { HeaderActions } from '../components/HeaderActions'
import { useI18n } from '../i18n'

export function PlazaHeader() {
  const { dict } = useI18n()
  return (
    <header className="glass sticky top-0 z-30 border-b border-gray-200/50 dark:border-dark-700/50">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <Link to="/home" className="flex min-w-0 items-center gap-3">
            <img
              src="/logo.svg"
              alt={dict.brand.name}
              className="h-9 w-9 shrink-0 object-contain"
            />
            <BrandWordmark className="truncate text-base" />
          </Link>
          <nav className="hidden items-center gap-3 sm:flex">
            <span className="text-gray-300 dark:text-dark-600">/</span>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {dict.plaza.title}
            </span>
          </nav>
        </div>
        <HeaderActions showModels={false} />
      </div>
    </header>
  )
}