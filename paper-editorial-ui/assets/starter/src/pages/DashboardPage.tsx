import { Link, Navigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import { BrandWordmark } from '../components/BrandWordmark'
import { HeaderActions } from '../components/HeaderActions'
import { Icon } from '../components/Icon'
import { BASE_URL } from '../config'
import { useCopy } from '../hooks/useCopy'
import { useI18n } from '../i18n'

const MOCK_KEY = 'sk-init-demo-7f4c2a91d8e35b60'
const MOCK_ROWS = [
  { model: 'deepseek-r1-abliterated', tokens: 128400, cost: 0.28 },
  { model: 'gpt-4.1-mini', tokens: 46200, cost: 0.09 },
  { model: 'qwen3-32b-abliterated', tokens: 91300, cost: 0.07 },
]

export function DashboardPage() {
  const { t, dict } = useI18n()
  const { isAuthenticated, signOut, user } = useAuth()
  const { copied, copy } = useCopy()

  if (!isAuthenticated) {
    return <Navigate to="/login?redirect=/dashboard" replace />
  }

  const totalTokens = MOCK_ROWS.reduce((sum, row) => sum + row.tokens, 0)
  const totalCost = MOCK_ROWS.reduce((sum, row) => sum + row.cost, 0)

  return (
    <div className="paper-workspace paper-grid flex min-h-screen flex-col">
      <header className="mx-auto w-full max-w-7xl px-5 sm:px-10">
        <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-900 py-5 dark:border-dark-500">
          <Link to="/home" className="flex min-w-0 items-center gap-3">
            <img src="/logo.svg" alt={dict.brand.name} className="h-10 w-10 object-contain" />
            <BrandWordmark className="text-xl" />
          </Link>
          <HeaderActions showModels showDocs={false} />
        </nav>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-5 py-10 sm:px-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[10px] tracking-[0.12em] text-gray-500 dark:text-dark-400">
              01 / CONSOLE
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight">{dict.dashboard.title}</h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-dark-400">
              {user?.email} · {dict.dashboard.subtitle}
            </p>
          </div>
          <button type="button" className="btn btn-secondary" onClick={signOut}>
            {dict.dashboard.logout}
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <div className="border border-gray-200 bg-white p-5 shadow-paper dark:border-dark-700 dark:bg-dark-800">
            <span className="font-mono text-[10px] tracking-[0.12em] text-gray-500 dark:text-dark-400">
              TOKENS
            </span>
            <p className="mt-3 font-mono text-2xl font-semibold">{totalTokens.toLocaleString()}</p>
          </div>
          <div className="border border-gray-200 bg-white p-5 shadow-paper dark:border-dark-700 dark:bg-dark-800">
            <span className="font-mono text-[10px] tracking-[0.12em] text-gray-500 dark:text-dark-400">
              SPEND
            </span>
            <p className="mt-3 font-mono text-2xl font-semibold">${totalCost.toFixed(2)}</p>
          </div>
          <div className="border border-gray-200 bg-white p-5 shadow-paper dark:border-dark-700 dark:bg-dark-800">
            <span className="font-mono text-[10px] tracking-[0.12em] text-gray-500 dark:text-dark-400">
              BASE URL
            </span>
            <p className="mt-3 truncate font-mono text-sm">{BASE_URL}</p>
          </div>
        </div>

        <section className="mt-8 border border-gray-200 bg-white dark:border-dark-700 dark:bg-dark-800">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 px-5 py-4 dark:border-dark-700">
            <h2 className="text-sm font-semibold">{dict.dashboard.keysTitle}</h2>
            <button type="button" className="btn btn-primary">{dict.dashboard.createKey}</button>
          </div>
          <div className="flex flex-wrap items-center gap-3 px-5 py-5">
            <Icon name="key" size="sm" className="text-gray-500 dark:text-dark-400" />
            <code className="min-w-0 flex-1 break-all font-mono text-xs">{MOCK_KEY}</code>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => void copy(MOCK_KEY)}
            >
              {copied ? t('common.copied') : t('common.copyCode')}
            </button>
          </div>
          <p className="border-t border-gray-200 px-5 py-3 font-mono text-[10px] text-gray-500 dark:border-dark-700 dark:text-dark-400">
            {dict.dashboard.mockKeyNote}
          </p>
        </section>

        <section className="mt-8 border border-gray-200 bg-white dark:border-dark-700 dark:bg-dark-800">
          <div className="border-b border-gray-200 px-5 py-4 dark:border-dark-700">
            <h2 className="text-sm font-semibold">{dict.dashboard.usageTitle}</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[420px] text-left text-sm">
              <thead className="bg-[color:var(--paper-table-head)] font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--paper-table-text)]">
                <tr>
                  <th className="px-5 py-3 font-medium">MODEL</th>
                  <th className="px-5 py-3 font-medium">TOKENS</th>
                  <th className="px-5 py-3 font-medium">COST</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_ROWS.map((row) => (
                  <tr key={row.model} className="border-t border-gray-200 dark:border-dark-700">
                    <td className="px-5 py-3 font-mono text-xs">{row.model}</td>
                    <td className="px-5 py-3 font-mono text-xs">{row.tokens.toLocaleString()}</td>
                    <td className="px-5 py-3 font-mono text-xs">${row.cost.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  )
}