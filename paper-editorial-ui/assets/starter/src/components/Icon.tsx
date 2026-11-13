import type { ReactNode, SVGProps } from 'react'

export type IconName =
  | 'book'
  | 'grid'
  | 'sun'
  | 'moon'
  | 'chevronDown'
  | 'check'
  | 'search'
  | 'close'
  | 'copy'
  | 'key'
  | 'telegram'
  | 'message'
  | 'layers'
  | 'terminal'
  | 'external'

const SIZES: Record<string, number> = { xs: 14, sm: 16, md: 20, lg: 24, xl: 28 }

const PATHS: Record<IconName, ReactNode> = {
  book: (
    <>
      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15.5H6.5A2.5 2.5 0 0 0 4 21V5.5Z" />
      <path d="M4 18.5A2.5 2.5 0 0 1 6.5 16H19" />
      <path d="M8.5 7.5h6" />
    </>
  ),
  grid: (
    <>
      <rect x="3.5" y="3.5" width="7" height="7" />
      <rect x="13.5" y="3.5" width="7" height="7" />
      <rect x="3.5" y="13.5" width="7" height="7" />
      <rect x="13.5" y="13.5" width="7" height="7" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
    </>
  ),
  moon: <path d="M20 14.5A8 8 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />,
  chevronDown: <path d="m6 9.5 6 6 6-6" />,
  check: <path d="m4.5 12.5 5 5 10-11" />,
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  close: <path d="M6 6l12 12M18 6 6 18" />,
  copy: (
    <>
      <rect x="9" y="9" width="11" height="11" rx="1.5" />
      <path d="M15 5.5H5.5A1.5 1.5 0 0 0 4 7v9" />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="8" r="3.5" />
      <path d="m10.6 10.6 8.4 8.4M16 15l-2 2M13 12l-2 2" />
    </>
  ),
  telegram: <path d="M21 3 3 10l7 4 4 7 7-18ZM10 14l5-5" />,
  message: (
    <>
      <path d="M20.5 12a8 8 0 0 1-8 8H4.5l1.9-3.4A8 8 0 1 1 20.5 12Z" />
      <path d="M8.5 11h7M8.5 14.5h4.5" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 8.5 4.5L12 12 3.5 7.5 12 3Z" />
      <path d="m3.5 12.5 8.5 4.5 8.5-4.5" />
      <path d="m3.5 17 8.5 4.5 8.5-4.5" />
    </>
  ),
  terminal: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="1.5" />
      <path d="m7 10 2.5 2L7 14M12.5 14.5H17" />
    </>
  ),
  external: (
    <>
      <path d="M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" />
      <path d="M14 4h6v6M20 4 10 14" />
    </>
  ),
}

type IconProps = {
  name: IconName
  size?: keyof typeof SIZES | number
  className?: string
  strokeWidth?: number
} & Omit<SVGProps<SVGSVGElement>, 'name'>

export function Icon({ name, size = 'md', className, strokeWidth = 1.75, ...rest }: IconProps) {
  const px = typeof size === 'number' ? size : SIZES[size]
  return (
    <svg
      viewBox="0 0 24 24"
      width={px}
      height={px}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      {...rest}
    >
      {PATHS[name]}
    </svg>
  )
}