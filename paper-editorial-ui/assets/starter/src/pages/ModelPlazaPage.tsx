import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PlazaHeader } from '../components/PlazaHeader'
import { Icon } from '../components/Icon'
import {
  GROUPS,
  MODELS,
  PLATFORMS,
  PLATFORM_LABELS,
  formatContext,
  type ModelEntry,
  type Platform,
} from '../data/models'
import { useI18n } from '../i18n'
import '../styles/plaza.css'

function ModelCard({ model }: { model: ModelEntry }) {
  const { t } = useI18n()
  return (
    <article className="plaza-card flex h-full flex-col border border-gray-200 bg-white p-5 shadow-paper dark:border-dark-700 dark:bg-dark-800">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-base font-semibold">{model.name}</h3>
            {model.abliterated ? <span className="plaza-tag">ABLITERATED</span> : null}
            {model.available ? null : (
              <span className="plaza-tag" style={{ color: 'var(--paper-muted)' }}>
                SOON
              </span>
            )}
          </div>
          <code className="mt-1 block truncate font-mono text-[11px] text-gray-500 dark:text-dark-400">
            {model.id}
          </code>
        </div>
        <span className="plaza-platform">{PLATFORM_LABELS[model.platform]}</span>
      </div>

      <div className="plaza-price-row mt-5 pt-4">
        <div>
          <span className="block font-mono text-[10px] tracking-[0.12em] text-gray-500 dark:text-dark-400">
            {t('plaza.input')}
          </span>
          <span className="mt-1 block font-mono text-lg font-semibold tracking-tight">
            ${model.inputPrice.toFixed(2)}
          </span>
          <span className="block text-[10px] text-gray-500 dark:text-dark-400">
            {t('plaza.perMillion')}
          </span>
        </div>
        <div>
          <span className="block font-mono text-[10px] tracking-[0.12em] text-gray-500 dark:text-dark-400">
            {t('plaza.output')}
          </span>
          <span className="mt-1 block font-mono text-lg font-semibold tracking-tight">
            ${model.outputPrice.toFixed(2)}
          </span>
          <span className="block text-[10px] text-gray-500 dark:text-dark-400">
            {t('plaza.perMillion')}
          </span>
        </div>
      </div>

      <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
        {model.groups.map((group) => (
          <span key={group} className="plaza-tag">
            {group}
          </span>
        ))}
        <span className="ml-auto font-mono text-[10px] tracking-wide text-gray-500 dark:text-dark-400">
          {t('plaza.context')} {formatContext(model.context)}
        </span>
      </div>

      {model.peakMultiplier ? (
        <p className="mt-3 font-mono text-[10px] leading-5 text-gray-500 dark:text-dark-400">
          ×{model.peakMultiplier.toFixed(1)} {t('plaza.peakNote')}
        </p>
      ) : null}
    </article>
  )
}

function SkeletonCard() {
  return (
    <div className="flex h-full flex-col border border-gray-200 bg-white p-5 dark:border-dark-700 dark:bg-dark-800">
      <div className="flex items-start justify-between gap-3">
        <div className="w-full">
          <div className="h-4 w-2/3 animate-pulse bg-gray-200 dark:bg-dark-700" />
          <div className="mt-2 h-3 w-1/2 animate-pulse bg-gray-200 dark:bg-dark-700" />
        </div>
        <div className="h-4 w-16 animate-pulse bg-gray-200 dark:bg-dark-700" />
      </div>
      <div className="mt-6 h-14 animate-pulse bg-gray-200 dark:bg-dark-700" />
      <div className="mt-4 h-4 w-1/3 animate-pulse bg-gray-200 dark:bg-dark-700" />
    </div>
  )
}

export function ModelPlazaPage() {
  const { t } = useI18n()
  const [platform, setPlatform] = useState<Platform | 'all'>('all')
  const [group, setGroup] = useState<string>('all')
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 420)
    return () => window.clearTimeout(timer)
  }, [])

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase()
    return MODELS.filter((model) => {
      if (platform !== 'all' && model.platform !== platform) return false
      if (group !== 'all' && !model.groups.includes(group)) return false
      if (!term) return true
      return (
        model.id.toLowerCase().includes(term) || model.name.toLowerCase().includes(term)
      )
    })
  }, [platform, group, query])

  return (
    <div className="paper-workspace paper-grid flex min-h-screen flex-col">
      <PlazaHeader />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 sm:py-10">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-gray-900 pb-6 dark:border-dark-500">
          <div>
            <p className="font-mono text-[10px] tracking-[0.12em] text-gray-500 dark:text-dark-400">
              01 / MODEL PLAZA
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {t('plaza.title')}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-gray-500 dark:text-dark-400">
              {t('plaza.subtitle')}
            </p>
          </div>
          <div className="font-mono text-[10px] tracking-wide text-gray-500 dark:text-dark-400">
            {filtered.length} {t('plaza.modelsCount')}
          </div>
        </div>

        <section className="mt-6 border border-gray-200 bg-white dark:border-dark-700 dark:bg-dark-800">
          <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 px-4 py-3 dark:border-dark-700">
            <span className="w-16 shrink-0 font-mono text-[10px] tracking-[0.12em] text-gray-500 dark:text-dark-400">
              {t('plaza.platform')}
            </span>
            <button
              type="button"
              data-active={platform === 'all'}
              className="plaza-filter-chip"
              onClick={() => setPlatform('all')}
            >
              {t('plaza.all')}
            </button>
            {PLATFORMS.map((item) => (
              <button
                key={item}
                type="button"
                data-active={platform === item}
                className="plaza-filter-chip"
                onClick={() => setPlatform(item)}
              >
                {PLATFORM_LABELS[item]}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-2 border-b border-gray-200 px-4 py-3 dark:border-dark-700">
            <span className="w-16 shrink-0 font-mono text-[10px] tracking-[0.12em] text-gray-500 dark:text-dark-400">
              {t('plaza.group')}
            </span>
            <button
              type="button"
              data-active={group === 'all'}
              className="plaza-filter-chip"
              onClick={() => setGroup('all')}
            >
              {t('plaza.all')}
            </button>
            {GROUPS.map((item) => (
              <button
                key={item}
                type="button"
                data-active={group === item}
                className="plaza-filter-chip"
                onClick={() => setGroup(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="px-4 py-3">
            <div className="relative w-full sm:max-w-md">
              <Icon
                name="search"
                size="sm"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-dark-500"
              />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t('plaza.searchPlaceholder')}
                className="w-full border border-gray-200 bg-transparent py-2 pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-gray-400 focus:border-gray-900 dark:border-dark-700 dark:placeholder:text-dark-500 dark:focus:border-dark-300"
              />
            </div>
          </div>
        </section>

        <section className="mt-6" aria-live="polite">
          {loading ? (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="border border-gray-200 bg-white px-6 py-16 text-center dark:border-dark-700 dark:bg-dark-800">
              <p className="text-sm text-gray-500 dark:text-dark-400">{t('plaza.empty')}</p>
              <button
                type="button"
                className="btn btn-secondary mt-5"
                onClick={() => {
                  setPlatform('all')
                  setGroup('all')
                  setQuery('')
                }}
              >
                {t('plaza.clearFilters')}
              </button>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((model) => (
                <ModelCard key={model.id} model={model} />
              ))}
            </div>
          )}
        </section>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-6 text-[11px] text-gray-500 dark:border-dark-700 dark:text-dark-400">
          <span className="font-mono">{t('plaza.priceNote')}</span>
          <Link to="/login?redirect=/dashboard" className="home-nav-link font-medium">
            {t('plaza.loginHint')}
          </Link>
        </div>
      </main>
    </div>
  )
}