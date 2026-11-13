import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthProvider'
import { BrandWordmark } from '../components/BrandWordmark'
import { HeaderActions } from '../components/HeaderActions'
import { useI18n } from '../i18n'
import { useCopy } from '../hooks/useCopy'
import { BASE_URL } from '../config'
import '../styles/home.css'

const FEATURE_KEYS = ['refusal', 'weights', 'integration', 'usage'] as const
const FEATURE_TAGS = ['FEWER REFUSALS', 'ABLITERATED', 'OPENAI COMPATIBLE', 'PAY AS YOU GO']
const STEP_KEYS = ['key', 'model', 'connect'] as const
const FAQ_KEYS = ['models', 'refusals', 'billing', 'setup'] as const
const CLI_TOOLS = ['Claude Code', 'Codex CLI', 'OpenCode']

function codeSample() {
  return `from openai import OpenAI

client = OpenAI(
    api_key="YOUR_API_KEY",
    base_url="${BASE_URL}",
)

response = client.chat.completions.create(
    model="YOUR_MODEL_ID",
    messages=[{
        "role": "user",
        "content": "Hello, InitAPI.",
    }],
)
print(response.choices[0].message.content)`
}

export function HomePage() {
  const { t, dict } = useI18n()
  const { isAuthenticated } = useAuth()
  const { copied, copy } = useCopy()
  const brand = dict.home.brand

  const keyHref = isAuthenticated ? '/dashboard' : '/login?redirect=/dashboard'
  const sample = codeSample()

  return (
    <div className="paper-workspace paper-grid init-home flex min-h-screen flex-col">
      <header className="home-header mx-auto w-full max-w-7xl px-5 sm:px-10">
        <nav className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-900 py-5 dark:border-dark-500">
          <Link to="/home" className="flex min-w-0 items-center gap-3">
            <img src="/logo.svg" alt={dict.brand.name} className="h-11 w-11 shrink-0 object-contain" />
            <BrandWordmark className="text-2xl" />
          </Link>
          <HeaderActions />
        </nav>
      </header>

      <main className="mx-auto w-full max-w-7xl flex-1 px-5 sm:px-10">
        {/* Hero */}
        <section className="home-hero grid items-center gap-12 py-14 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:py-20">
          <div className="min-w-0">
            <p className="home-kicker mb-7 flex items-center gap-3 font-mono text-[10px] font-semibold tracking-[0.12em]">
              <span className="h-2 w-2 shrink-0 bg-gray-500" aria-hidden="true" />
              UNCENSORED / ABLITERATED MODELS
            </p>
            <h1 className="home-heading whitespace-pre-line">{brand.headline}</h1>
            <p className="mt-6 text-lg font-semibold tracking-tight">{brand.slogan}</p>
            <p className="mt-4 max-w-lg text-sm leading-8 text-gray-600 sm:text-base dark:text-dark-300">
              {brand.subtitle}
            </p>
            <div className="home-actions mt-8 flex flex-wrap items-center gap-3">
              <Link to={keyHref} className="btn btn-primary px-5 py-3.5" data-testid="home-get-key">
                {brand.startBuilding} <span aria-hidden="true">↗</span>
              </Link>
              <Link
                to="/model-plaza"
                className="home-secondary px-5 py-3.5 text-sm font-medium"
                data-testid="home-pricing"
              >
                {brand.modelPricing}
              </Link>
              <Link to="/docs" className="home-nav-link py-3 text-sm font-medium">
                {brand.integrationDocs} <span aria-hidden="true">→</span>
              </Link>
            </div>
            <p className="mt-7 text-[11px] leading-6 tracking-wide text-gray-500 dark:text-dark-400">
              {brand.heroNote}
            </p>
          </div>

          <div className="terminal-container min-w-0">
            <div className="code-label mb-3 flex justify-between font-mono text-[10px] tracking-[0.12em] text-gray-500 dark:text-dark-400">
              <span>ONE KEY. ONE REQUEST.</span>
              <span>PYTHON SDK</span>
            </div>
            <div className="terminal-window">
              <div className="terminal-header flex items-center justify-between px-5 py-3.5">
                <span className="font-mono text-xs">init.py</span>
                <button
                  type="button"
                  className="code-copy px-2 py-1 font-mono text-xs"
                  onClick={() => void copy(sample)}
                >
                  {copied ? t('common.copied') : t('common.copyCode')}
                </button>
              </div>
              <div
                className="overflow-x-auto px-5 py-6 sm:px-6"
                tabIndex={0}
                role="region"
                aria-label={brand.codeExample}
              >
                <pre className="font-mono text-[11px] leading-7 sm:text-[12px]">
                  <code>
                    <span className="code-keyword">from</span> openai{' '}
                    <span className="code-keyword">import</span> OpenAI
                    {'\n\n'}
                    {'client = OpenAI(\n    api_key='}
                    <span className="code-string">&quot;YOUR_API_KEY&quot;</span>
                    {',\n    base_url='}
                    <span className="code-string">&quot;{BASE_URL}&quot;</span>
                    {'\n)\n\n'}
                    {'response = client.chat.completions.create(\n    model='}
                    <span className="code-string">&quot;YOUR_MODEL_ID&quot;</span>
                    {',\n    messages=[{\n        '}
                    <span className="code-string">&quot;role&quot;</span>
                    {': '}
                    <span className="code-string">&quot;user&quot;</span>
                    {',\n        '}
                    <span className="code-string">&quot;content&quot;</span>
                    {': '}
                    <span className="code-string">&quot;Hello, InitAPI.&quot;</span>
                    {',\n    }],\n)\n'}
                    <span className="code-keyword">print</span>
                    {'(response.choices[0].message.content)'}
                  </code>
                </pre>
              </div>
              <div className="border-t px-5 py-4 font-mono text-[11px] text-gray-500 sm:px-7 dark:text-dark-400">
                {brand.codeNote}
              </div>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] tracking-wide text-gray-500 dark:text-dark-400">
              <span>YOUR APP → {dict.brand.name} → AI</span>
              <span aria-hidden="true">[ READY TO INIT ]</span>
            </div>
          </div>
        </section>

        {/* 01 Features */}
        <section
          className="border-t border-gray-900 pb-16 pt-7 dark:border-dark-500"
          aria-label={brand.featuresLabel}
        >
          <div className="mb-7 flex flex-wrap justify-between gap-3 font-mono text-[10px] tracking-[0.1em] text-gray-500 dark:text-dark-400">
            <span>01 / {brand.infrastructure}</span>
            <span>BUILT FOR YOUR NEXT IDEA.</span>
          </div>
          <div className="home-features grid border border-gray-200 bg-white sm:grid-cols-2 lg:grid-cols-4 dark:border-dark-700 dark:bg-dark-800">
            {FEATURE_KEYS.map((key, index) => (
              <article key={key} className="home-feature p-7">
                <span className="font-mono text-[10px] tracking-wide text-gray-500 dark:text-dark-400">
                  {`0${index + 1} / ${FEATURE_TAGS[index]}`}
                </span>
                <h2 className="mb-3 mt-6 text-lg font-bold tracking-tight">
                  {t(`home.brand.${key}Title`)}
                </h2>
                <p className="text-sm leading-7 text-gray-500 dark:text-dark-400">
                  {t(`home.brand.${key}Description`)}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* 02 Workflow */}
        <section
          className="home-section grid gap-9 py-14 lg:grid-cols-[1fr_1.25fr] lg:gap-20"
          aria-labelledby="home-workflow-title"
        >
          <div>
            <p className="home-section-label">{brand.workflow.eyebrow}</p>
            <h2 id="home-workflow-title" className="home-section-title">
              {brand.workflow.title}
            </h2>
            <p className="home-section-description">{brand.workflow.description}</p>
            <div className="home-endpoint mt-7 border border-gray-200 px-4 py-3 dark:border-dark-700">
              <span className="block font-mono text-[10px] tracking-widest text-gray-500 dark:text-dark-400">
                BASE URL
              </span>
              <code className="mt-2 block break-all text-sm">{BASE_URL}</code>
            </div>
          </div>
          <ol className="home-steps">
            {STEP_KEYS.map((key, index) => (
              <li key={key} className="flex gap-5 py-6 first:pt-0">
                <span className="pt-1 font-mono text-xs text-gray-500 dark:text-dark-400">
                  {`0${index + 1}`}
                </span>
                <div>
                  <h3 className="text-base font-semibold">{t(`home.brand.workflow.${key}Title`)}</h3>
                  <p className="mt-2 text-sm leading-7 text-gray-500 dark:text-dark-400">
                    {t(`home.brand.workflow.${key}Description`)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* 03 Tools */}
        <section className="home-section py-14" aria-labelledby="home-tools-title">
          <div className="mb-8">
            <p className="home-section-label">{brand.tools.eyebrow}</p>
            <h2 id="home-tools-title" className="home-section-title">
              {brand.tools.title}
            </h2>
            <p className="home-section-description">{brand.tools.description}</p>
          </div>
          <div className="home-tool-panels grid border border-gray-200 md:grid-cols-2 dark:border-dark-700">
            <article className="home-tool-panel p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-xl font-bold">CLI</h3>
                <span aria-hidden="true" className="font-mono text-xl text-gray-500">
                  &gt;_
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-gray-500 dark:text-dark-400">
                {brand.tools.cliDescription}
              </p>
              <div className="my-6 flex flex-wrap gap-2">
                {CLI_TOOLS.map((tool) => (
                  <span key={tool} className="home-tool-tag">
                    {tool}
                  </span>
                ))}
              </div>
              <Link to="/docs" className="home-nav-link text-sm font-semibold">
                {brand.tools.cliLink} <span aria-hidden="true">↗</span>
              </Link>
            </article>
            <article className="home-tool-panel p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <h3 className="font-mono text-xl font-bold">Harness</h3>
                <span aria-hidden="true" className="font-mono text-xl text-gray-500">
                  ◇
                </span>
              </div>
              <p className="mt-3 text-sm leading-7 text-gray-500 dark:text-dark-400">
                {brand.tools.harnessDescription}
              </p>
              <div className="my-6 flex flex-wrap gap-2">
                <span className="home-tool-tag">
                  WorkBuddy {brand.tools.international}
                </span>
                <span className="home-tool-tag">WorkBuddy {brand.tools.china}</span>
                <span className="home-tool-tag">DeepSeek Harness</span>
              </div>
              <Link to="/docs" className="home-nav-link text-sm font-semibold">
                {brand.tools.harnessLink} <span aria-hidden="true">↗</span>
              </Link>
            </article>
          </div>
        </section>

        {/* 04 FAQ */}
        <section
          className="home-section grid gap-8 py-14 lg:grid-cols-[1fr_1.4fr] lg:gap-16"
          aria-labelledby="home-faq-title"
        >
          <div>
            <p className="home-section-label">{brand.faq.eyebrow}</p>
            <h2 id="home-faq-title" className="home-section-title">
              {brand.faq.title}
            </h2>
          </div>
          <div className="home-faq">
            {FAQ_KEYS.map((key) => (
              <details key={key} className="py-5 first:pt-0">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 text-sm font-semibold leading-7">
                  {t(`home.brand.faq.${key}Question`)}
                  <span
                    className="home-faq-indicator shrink-0 font-mono text-lg"
                    aria-hidden="true"
                  >
                    +
                  </span>
                </summary>
                <p className="mt-3 pr-7 text-sm leading-7 text-gray-500 dark:text-dark-400">
                  {t(`home.brand.faq.${key}Answer`)}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Closing */}
        <section className="home-closing my-6 flex flex-wrap items-center justify-between gap-8 border px-7 py-9 sm:px-10">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">{brand.closingTitle}</h2>
            <p className="mt-3 text-sm leading-7 text-gray-500 dark:text-dark-400">
              {brand.closingDescription}
            </p>
          </div>
          <Link to={keyHref} className="btn btn-primary px-6 py-3.5">
            {brand.startBuilding} <span aria-hidden="true">↗</span>
          </Link>
        </section>
      </main>

      <footer className="mx-auto w-full max-w-7xl px-5 sm:px-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 py-6 text-xs text-gray-500 dark:border-dark-700 dark:text-dark-400">
          <span className="font-mono">
            {dict.brand.name} <span className="ml-3">© 2026</span>
          </span>
          <span>initapi.ai</span>
          <span>{brand.footer}</span>
        </div>
      </footer>
    </div>
  )
}