import { Link } from 'react-router-dom'
import { BrandWordmark } from '../components/BrandWordmark'
import { HeaderActions } from '../components/HeaderActions'
import { BASE_URL } from '../config'
import { useI18n } from '../i18n'

export function DocsPage() {
  const { dict } = useI18n()
  return (
    <div className="paper-workspace paper-grid flex min-h-screen flex-col">
      <header className="mx-auto w-full max-w-4xl px-5 sm:px-8">
        <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-900 py-5 dark:border-dark-500">
          <Link to="/home" className="flex min-w-0 items-center gap-3">
            <img src="/logo.svg" alt={dict.brand.name} className="h-10 w-10 object-contain" />
            <BrandWordmark className="text-xl" />
          </Link>
          <HeaderActions showDocs={false} />
        </nav>
      </header>

      <main className="mx-auto w-full max-w-4xl flex-1 px-5 py-12 sm:px-8">
        <p className="font-mono text-[10px] tracking-[0.12em] text-gray-500 dark:text-dark-400">
          01 / DOCS
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight">{dict.docs.title}</h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500 dark:text-dark-400">
          {dict.docs.subtitle}
        </p>

        <div className="home-endpoint mt-8 border border-gray-200 px-4 py-3 dark:border-dark-700">
          <span className="block font-mono text-[10px] tracking-widest text-gray-500 dark:text-dark-400">
            BASE URL
          </span>
          <code className="mt-2 block break-all text-sm">{BASE_URL}</code>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <section className="home-tool-panel border border-gray-200 p-6 dark:border-dark-700">
            <h2 className="font-mono text-lg font-bold">{dict.docs.cliTitle}</h2>
            <p className="mt-2 text-sm leading-7 text-gray-500 dark:text-dark-400">
              {dict.docs.cliDesc}
            </p>
            <pre className="mt-4 overflow-x-auto border border-gray-200 bg-[color:var(--paper-tint)] p-3 font-mono text-[11px] leading-6 dark:border-dark-700">
{`export OPENAI_BASE_URL=${BASE_URL}
export OPENAI_API_KEY=<your-key>`}
            </pre>
          </section>
          <section className="home-tool-panel border border-gray-200 p-6 dark:border-dark-700">
            <h2 className="font-mono text-lg font-bold">{dict.docs.harnessTitle}</h2>
            <p className="mt-2 text-sm leading-7 text-gray-500 dark:text-dark-400">
              {dict.docs.harnessDesc}
            </p>
            <pre className="mt-4 overflow-x-auto border border-gray-200 bg-[color:var(--paper-tint)] p-3 font-mono text-[11px] leading-6 dark:border-dark-700">
{`base_url = ${BASE_URL}
model    = deepseek-r1-abliterated`}
            </pre>
          </section>
        </div>

        <p className="mt-8 font-mono text-[11px] text-gray-500 dark:text-dark-400">{dict.docs.note}</p>
        <Link to="/home" className="home-nav-link mt-6 inline-block text-sm font-medium">
          {dict.docs.backHome}
        </Link>
      </main>
    </div>
  )
}