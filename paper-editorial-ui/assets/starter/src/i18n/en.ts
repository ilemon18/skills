// Shape source for all locale dictionaries. Values here are the English copy
// pulled from the original site.
export const en = {
  brand: {
    name: 'InitAPI',
  },
  nav: {
    models: 'Models & pricing',
    pricingShort: 'Pricing',
    docs: 'Docs',
    dashboard: 'Dashboard',
    login: 'Login',
    home: 'Home',
  },
  common: {
    docs: 'Docs',
    viewDocs: 'View docs',
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',
    language: 'Language',
    copyCode: 'Copy code',
    copied: 'Copied',
  },
  home: {
    pageTitle: 'Uncensored AI API & Abliterated Models',
    brand: {
      headline: 'Fewer refusals.\nMore possibilities.',
      slogan: 'Unfiltered AI Models. One API Key.',
      subtitle:
        'Uncensored AI Models. One API Key.',
      startBuilding: 'Get an API Key',
      modelPricing: 'View model pricing',
      modelsNav: 'Models & pricing',
      pricingNavShort: 'Pricing',
      integrationDocs: 'Read the docs',
      heroNote: 'Weight-level abliteration · OpenAI compatible · Pay as you go',
      codeExample: 'Python integration example',
      codeNote: '// Replace YOUR_API_KEY and YOUR_MODEL_ID to send your first request.',
      featuresLabel: 'Platform capabilities',
      infrastructure: 'MODEL CAPABILITIES, CONNECTED TO YOUR WORKFLOW',
      refusalTitle: 'More room to explore',
      refusalDescription:
        'Choose refusal-reduced models for creative work, research and evaluation. Behavior varies by model and request.',
      weightsTitle: 'It starts with the weights',
      weightsDescription:
        'Abliterated models use weight-level refusal removal. Check the source, version and capability notes when choosing a model.',
      integrationTitle: 'A familiar API',
      integrationDescription:
        'Connect existing SDKs and tools through an OpenAI-compatible API. Set your base URL, key and model ID to get started.',
      usageTitle: 'Know what you use',
      usageDescription:
        'Pay according to model pricing and usage. Manage keys, set quotas and review token usage and costs in your console.',
      footer: 'One key. Your next possibility.',
      workflow: {
        eyebrow: '02 / START BUILDING',
        title: 'From choosing a model to your first response.',
        description:
          'Keep your workflow. Bring one key and connect the tools you already use.',
        keyTitle: 'Get your API key',
        keyDescription:
          'Sign in and create a key. Choose the available group and quota for your app or tool.',
        modelTitle: 'Choose a model and price',
        modelDescription:
          'Check the model ID, available groups and billing rules to find a version that fits your task.',
        connectTitle: 'Configure and call',
        connectDescription:
          'Set the API URL, key and model ID in your SDK or tool, then send your first request.',
      },
      tools: {
        eyebrow: '03 / YOUR WORKFLOW',
        title: 'Bring the tools you already use.',
        description:
          'From terminal assistants to agent workspaces, follow the guides to install, configure and get started.',
        cliDescription:
          'Configure a coding assistant in your terminal and connect the API to daily development.',
        harnessDescription:
          'Add a custom model to your workspace and connect your projects and tasks.',
        cliLink: 'CLI installation guides',
        harnessLink: 'Harness setup guides',
        international: 'International',
        china: 'China',
      },
      faq: {
        eyebrow: '04 / GOOD TO KNOW',
        title: 'A few things before you connect.',
        modelsQuestion: 'What do Uncensored and Abliterated mean?',
        modelsAnswer:
          'Uncensored commonly describes models with reduced content refusals. Abliterated is more specific: refusal behavior is modified at the weight level. Methods and capabilities vary by version, so check the source and actual behavior.',
        refusalsQuestion: 'Will these models answer every request?',
        refusalsAnswer:
          'There is no such guarantee. Refusal reduction is a model property; responses still depend on capabilities, context and service rules. Not every model on the platform is a refusal-reduced version.',
        billingQuestion: 'Where can I see prices and usage costs?',
        billingAnswer:
          'Check the Models & pricing page for group-specific billing rules. After making requests, review token usage and cost details in your console. Charges depend on the model, group and pricing applicable to your account.',
        setupQuestion: 'Can I connect my existing apps, CLI tools and Harness?',
        setupAnswer:
          'Tools that support a custom API URL, key and a compatible protocol can be configured using the docs. Protocol and capability support varies by tool; the guides cover installation, configuration and verification.',
      },
      closingTitle: 'Connect your next possibility.',
      closingDescription: 'Start with one API key and the model you choose.',
    },
  },
  community: {
    title: 'Stay connected',
    channel: 'Announcements',
    channelDescription: 'Product updates and release notes',
    chat: 'Community',
    chatDescription: 'Ask questions, share ideas',
    open: 'Open community links',
    close: 'Close community links',
    newTab: '(opens in a new tab)',
  },
  plaza: {
    title: 'Models & pricing',
    subtitle:
      'One key for every available model. Prices are shown per 1M tokens and billing is metered by actual usage.',
    platform: 'Platform',
    group: 'Group',
    all: 'All',
    searchPlaceholder: 'Search model ID or name',
    input: 'Input',
    output: 'Output',
    context: 'Context',
    perMillion: 'per 1M tokens',
    available: 'Available',
    loading: 'Loading models…',
    empty: 'No model matches these filters.',
    clearFilters: 'Reset filters',
    modelsCount: 'models',
    priceNote:
      'Mock data for this demo. Real pricing is defined per group on the console side.',
    peakNote: 'Peak multiplier applies during peak hours.',
    loginHint: 'Sign in to create a key and start calling these models.',
  },
  login: {
    title: 'Sign in',
    subtitle: 'One initialization. Your AI workspace.',
    email: 'Email',
    password: 'Password',
    submit: 'Sign in',
    hint: 'Demo only — any email and password works. Nothing is sent anywhere.',
    backHome: 'Back to home',
  },
  dashboard: {
    title: 'Console',
    subtitle: 'Demo console. Keys and usage below are mock data.',
    createKey: 'Create key',
    keysTitle: 'API keys',
    usageTitle: 'Usage',
    logout: 'Sign out',
    mockKeyNote: 'Demo key, not functional.',
  },
  docs: {
    title: 'Docs',
    subtitle: 'Guides for CLI tools, Harness and OpenAI-compatible clients.',
    cliTitle: 'CLI',
    cliDesc:
      'Point Claude Code, Codex CLI or OpenCode at the base URL and use your key.',
    harnessTitle: 'Harness',
    harnessDesc: 'Add a custom model entry with the base URL and model ID.',
    note: 'This demo page only documents the mock endpoint.',
    backHome: 'Back to home',
  },
  notFound: {
    title: 'Page not found',
    description: 'The page you were looking for does not exist in this demo.',
    back: 'Back to home',
  },
}

export type Messages = typeof en