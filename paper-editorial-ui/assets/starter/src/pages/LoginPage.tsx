import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import { BrandWordmark } from '../components/BrandWordmark'
import { LocaleSwitcher } from '../components/LocaleSwitcher'
import { ThemeToggle } from '../components/ThemeToggle'
import { useI18n } from '../i18n'

export function LoginPage() {
  const { t, dict } = useI18n()
  const { signIn, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const redirect = params.get('redirect') ?? '/dashboard'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (isAuthenticated) {
    return <Navigate to={redirect} replace />
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!email.includes('@') || password.length < 4) {
      setError(dict.login.hint)
      return
    }
    signIn(email)
    navigate(redirect, { replace: true })
  }

  return (
    <div className="paper-workspace paper-grid flex min-h-screen flex-col">
      <header className="mx-auto w-full max-w-5xl px-5 sm:px-8">
        <nav className="flex flex-wrap items-center justify-between gap-3 py-5">
          <Link to="/home" className="flex min-w-0 items-center gap-3">
            <img src="/logo.svg" alt={dict.brand.name} className="h-9 w-9 object-contain" />
            <BrandWordmark className="text-xl" />
          </Link>
          <div className="flex items-center gap-2">
            <LocaleSwitcher />
            <ThemeToggle className="btn btn-ghost p-2" />
          </div>
        </nav>
      </header>

      <main className="flex min-w-0 flex-1 items-center justify-center px-5 py-12">
        <div className="w-full max-w-md">
          <div className="border border-gray-900 bg-white p-7 shadow-paper-lg sm:p-9 dark:border-dark-500 dark:bg-dark-800">
            <p className="font-mono text-[10px] tracking-[0.12em] text-gray-500 dark:text-dark-400">
              INIT / AUTH
            </p>
            <h1 className="mt-4 text-2xl font-bold tracking-tight">{dict.login.title}</h1>
            <p className="mt-2 text-sm leading-7 text-gray-500 dark:text-dark-400">
              {dict.login.subtitle}
            </p>

            <form className="mt-7 space-y-4" onSubmit={submit}>
              <label className="block">
                <span className="mb-1.5 block font-mono text-[10px] tracking-[0.12em] text-gray-500 dark:text-dark-400">
                  {dict.login.email}
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="you@initapi.ai"
                  className="w-full border border-gray-200 bg-transparent px-3 py-2.5 text-sm outline-none transition-colors focus:border-gray-900 dark:border-dark-700 dark:focus:border-dark-300"
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block font-mono text-[10px] tracking-[0.12em] text-gray-500 dark:text-dark-400">
                  {dict.login.password}
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 bg-transparent px-3 py-2.5 text-sm outline-none transition-colors focus:border-gray-900 dark:border-dark-700 dark:focus:border-dark-300"
                />
              </label>
              {error ? (
                <p className="border border-[color:var(--paper-danger)] px-3 py-2 font-mono text-[11px] leading-5 text-[color:var(--paper-danger)]">
                  {error}
                </p>
              ) : null}
              <button type="submit" className="btn btn-primary w-full py-3">
                {dict.login.submit} <span aria-hidden="true">↗</span>
              </button>
            </form>

            <p className="mt-5 font-mono text-[10px] leading-5 text-gray-500 dark:text-dark-400">
              {dict.login.hint}
            </p>
          </div>
          <div className="mt-4 text-center">
            <Link to="/home" className="home-nav-link text-sm font-medium">
              {t('login.backHome')}
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}