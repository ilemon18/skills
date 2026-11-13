export type Platform = 'openai' | 'anthropic' | 'google' | 'deepseek' | 'qwen' | 'meta'

export type ModelEntry = {
  id: string
  name: string
  platform: Platform
  groups: string[]
  context: number
  inputPrice: number
  outputPrice: number
  abliterated: boolean
  peakMultiplier?: number
  available: boolean
}

export const PLATFORM_LABELS: Record<Platform, string> = {
  openai: 'OpenAI',
  anthropic: 'Anthropic',
  google: 'Google',
  deepseek: 'DeepSeek',
  qwen: 'Qwen',
  meta: 'Meta',
}

export const GROUPS = ['default', 'vip', 'enterprise'] as const
export const PLATFORMS = Object.keys(PLATFORM_LABELS) as Platform[]

export const MODELS: ModelEntry[] = [
  {
    id: 'gpt-4.1-mini',
    name: 'GPT-4.1 mini',
    platform: 'openai',
    groups: ['default', 'vip'],
    context: 1047576,
    inputPrice: 0.4,
    outputPrice: 1.6,
    abliterated: false,
    available: true,
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    platform: 'openai',
    groups: ['default', 'vip', 'enterprise'],
    context: 128000,
    inputPrice: 2.5,
    outputPrice: 10,
    abliterated: false,
    peakMultiplier: 1.2,
    available: true,
  },
  {
    id: 'o4-mini',
    name: 'o4-mini',
    platform: 'openai',
    groups: ['vip', 'enterprise'],
    context: 200000,
    inputPrice: 1.1,
    outputPrice: 4.4,
    abliterated: false,
    available: true,
  },
  {
    id: 'claude-sonnet-4-5',
    name: 'Claude Sonnet 4.5',
    platform: 'anthropic',
    groups: ['vip', 'enterprise'],
    context: 200000,
    inputPrice: 3,
    outputPrice: 15,
    abliterated: false,
    peakMultiplier: 1.5,
    available: true,
  },
  {
    id: 'claude-opus-4-1',
    name: 'Claude Opus 4.1',
    platform: 'anthropic',
    groups: ['enterprise'],
    context: 200000,
    inputPrice: 15,
    outputPrice: 75,
    abliterated: false,
    available: true,
  },
  {
    id: 'claude-3-5-haiku',
    name: 'Claude 3.5 Haiku',
    platform: 'anthropic',
    groups: ['default', 'vip'],
    context: 200000,
    inputPrice: 0.8,
    outputPrice: 4,
    abliterated: false,
    available: true,
  },
  {
    id: 'gemini-2.5-pro',
    name: 'Gemini 2.5 Pro',
    platform: 'google',
    groups: ['default', 'vip', 'enterprise'],
    context: 1048576,
    inputPrice: 1.25,
    outputPrice: 10,
    abliterated: false,
    available: true,
  },
  {
    id: 'gemini-2.5-flash',
    name: 'Gemini 2.5 Flash',
    platform: 'google',
    groups: ['default', 'vip'],
    context: 1048576,
    inputPrice: 0.3,
    outputPrice: 2.5,
    abliterated: false,
    available: true,
  },
  {
    id: 'deepseek-v3.2',
    name: 'DeepSeek V3.2',
    platform: 'deepseek',
    groups: ['default', 'vip'],
    context: 131072,
    inputPrice: 0.28,
    outputPrice: 0.42,
    abliterated: false,
    available: true,
  },
  {
    id: 'deepseek-r1-abliterated',
    name: 'DeepSeek R1 Abliterated',
    platform: 'deepseek',
    groups: ['default', 'vip'],
    context: 131072,
    inputPrice: 0.55,
    outputPrice: 2.19,
    abliterated: true,
    available: true,
  },
  {
    id: 'qwen3-235b-a22b',
    name: 'Qwen3 235B A22B',
    platform: 'qwen',
    groups: ['default', 'vip', 'enterprise'],
    context: 262144,
    inputPrice: 0.22,
    outputPrice: 0.88,
    abliterated: false,
    available: true,
  },
  {
    id: 'qwen3-32b-abliterated',
    name: 'Qwen3 32B Abliterated',
    platform: 'qwen',
    groups: ['default'],
    context: 131072,
    inputPrice: 0.14,
    outputPrice: 0.56,
    abliterated: true,
    available: true,
  },
  {
    id: 'llama-3.3-70b-abliterated',
    name: 'Llama 3.3 70B Abliterated',
    platform: 'meta',
    groups: ['default', 'vip'],
    context: 131072,
    inputPrice: 0.35,
    outputPrice: 1.05,
    abliterated: true,
    available: true,
  },
  {
    id: 'mistral-nemo-abliterated',
    name: 'Mistral Nemo Abliterated',
    platform: 'meta',
    groups: ['default'],
    context: 131072,
    inputPrice: 0.12,
    outputPrice: 0.36,
    abliterated: true,
    available: false,
  },
]

export function formatContext(tokens: number): string {
  if (tokens >= 1000000) return `${(tokens / 1048576).toFixed(0)}M`
  return `${Math.round(tokens / 1000)}K`
}

export function formatPrice(price: number): string {
  return Number.isInteger(price) ? price.toFixed(2) : price.toFixed(2)
}