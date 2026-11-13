import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n'
import { Icon } from './Icon'

const CHANNEL_HREF = 'https://t.me/initapiai'
const CHAT_HREF = 'https://t.me/initapicom'

export function CommunityLinks() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!open) return
    function onPointer(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) setOpen(false)
    }
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('click', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('click', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const items = [
    {
      key: 'channel',
      href: CHANNEL_HREF,
      icon: 'telegram' as const,
      title: t('community.channel'),
      description: t('community.channelDescription'),
      color: '#1685be',
      background: 'rgba(34, 158, 217, 0.12)',
    },
    {
      key: 'chat',
      href: CHAT_HREF,
      icon: 'message' as const,
      title: t('community.chat'),
      description: t('community.chatDescription'),
      color: '#0d9488',
      background: 'rgba(20, 184, 166, 0.12)',
    },
  ]

  return (
    <div
      ref={ref}
      className="fixed right-[calc(1rem+env(safe-area-inset-right,0px))] bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] z-30 flex flex-col items-end gap-3 md:right-[calc(1.5rem+env(safe-area-inset-right,0px))] md:bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))]"
    >
      {open ? (
        <nav
          id="community-links-panel"
          aria-label={t('community.title')}
          className="w-[min(308px,calc(100vw-2rem))] max-h-[calc(100dvh-100px)] origin-bottom-right overflow-y-auto rounded-[18px] border border-gray-200 bg-white p-2 text-gray-900 shadow-[0_12px_36px_rgba(15,23,42,0.14),0_2px_8px_rgba(15,23,42,0.04)] dark:border-dark-600 dark:bg-dark-800 dark:text-gray-100"
        >
          <div className="flex items-center gap-2 px-3 pb-3 pt-2.5 text-xs font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-[#229ed9]" aria-hidden="true" />
            {t('community.title')}
          </div>
          {items.map((item) => (
            <a
              key={item.key}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-xl px-2.5 py-3.5 no-underline transition-colors hover:bg-gray-50 dark:hover:bg-dark-700"
            >
              <span
                className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl community-icon ${
                  item.key === 'chat' ? 'community-icon--chat' : ''
                }`}
              >
                <Icon name={item.icon} size="md" strokeWidth={1.5} />
              </span>
              <span className="grid min-w-0 flex-1 gap-1">
                <strong className="text-sm font-semibold">{item.title}</strong>
                <span className="text-[11px] leading-6 text-gray-500 dark:text-gray-400">
                  {item.description}
                </span>
              </span>
              <Icon
                name="external"
                size={12}
                className="shrink-0 text-gray-400"
                strokeWidth={1.5}
              />
              <span className="sr-only">{t('community.newTab')}</span>
            </a>
          ))}
        </nav>
      ) : null}

      <button
        type="button"
        aria-label={open ? t('community.close') : t('community.open')}
        aria-expanded={open}
        aria-controls="community-links-panel"
        onClick={() => setOpen((value) => !value)}
        className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full border border-white/25 text-white shadow-[0_5px_18px_rgba(22,138,194,0.28)] transition-[transform,background-color] duration-150 hover:-translate-y-0.5 hover:bg-[#1079ad] active:translate-y-0 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-[3px] focus-visible:outline-[#38bdf8]"
        style={{ backgroundColor: '#168ac2' }}
      >
        <Icon name={open ? 'close' : 'telegram'} size="md" strokeWidth={1.5} />
      </button>
    </div>
  )
}