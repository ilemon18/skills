import { Link } from 'react-router-dom'
import { useI18n } from '../i18n'

export function NotFoundPage() {
  const { dict } = useI18n()
  return (
    <div className="paper-workspace paper-grid flex min-h-screen flex-col items-center justify-center px-5 text-center">
      <p className="font-mono text-[10px] tracking-[0.12em] text-gray-500 dark:text-dark-400">
        404 / NOT FOUND
      </p>
      <h1 className="mt-4 text-3xl font-bold tracking-tight">{dict.notFound.title}</h1>
      <p className="mt-3 max-w-md text-sm leading-7 text-gray-500 dark:text-dark-400">
        {dict.notFound.description}
      </p>
      <Link to="/home" className="btn btn-primary mt-8 px-5 py-3">
        {dict.notFound.back} <span aria-hidden="true">↗</span>
      </Link>
    </div>
  )
}