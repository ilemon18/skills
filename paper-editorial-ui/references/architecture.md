# 工程骨架 / Architecture

`assets/starter/` 是可跑的快照（Vite 8 + React 19 + TS + Tailwind 3 + react-router 7，无 UI 库）。
新站点：复制 starter → 换 `tokens.css` 的 6 个值 → 删改 `pages/` 与 `data/` → 补文案。

## 依赖与脚本

```jsonc
// package.json
"dependencies":    { "react": "^19", "react-dom": "^19", "react-router-dom": "^7" },
"devDependencies": { "vite": "^8", "typescript": "~5.9 || ~7", "tailwindcss": "^3.4",
                     "postcss": "^8", "autoprefixer": "^10", "oxlint": "^1", "puppeteer-core": "*(可选，仅截图用)" }
"scripts": { "dev": "vite", "build": "tsc -b && vite build", "lint": "oxlint", "preview": "vite preview" }
```

Tailwind 用 v3（`darkMode: 'class'`、`@layer` 语义稳定）。**不要**升 v4 后照抄这套 `@layer` 写法，v4 的 `@layer` 与配置方式不同。

## 目录职责

```
index.html            预置主题脚本 + title/description/theme-color
tailwind.config.js    darkMode:'class' + 语义色映射（见下）+ fontFamily.mono + shadow.paper
postcss.config.js     tailwindcss + autoprefixer
public/logo.svg       品牌标（单文件 SVG，不用雪碧图）
src/
  main.tsx            createRoot + <App/>
  App.tsx             Theme → I18n → Auth → BrowserRouter → Routes，末尾挂全局浮层
  index.css           @import './styles/tokens.css' → @tailwind base/components/utilities
                      → @layer base(html/body) → @layer components(.paper-*/.btn*) → @layer utilities(.brand-wordmark)
  config.ts           BASE_URL 等对外常量（一处改全局）
  styles/
    tokens.css          :root / .dark 两套 --paper-* 变量（唯一颜色来源）
    home.css            首页专用排版类（.home-*、.terminal-*、.code-*）
    plaza.css           列表/价格页专用（.plaza-*）
  theme/ThemeProvider.tsx   dark 状态 + html.dark + localStorage('theme')
  i18n/{en.ts,zh.ts,index.tsx}   en.ts 兼作 Messages 类型来源；index.tsx 出 Provider + useI18n
  auth/AuthProvider.tsx     演示登录态（localStorage('…-auth')），可整体替换成真实鉴权
  data/models.ts            模拟数据 + 格式化函数（formatContext/formatPrice）
  hooks/useCopy.ts          复制 + 2s 回显（含 execCommand 回退）
  components/
    Icon.tsx                内联 SVG 图标集
    BrandWordmark.tsx       mono 700 / ls -.07em 字标
    ThemeToggle.tsx         太阳/月亮按钮
    LocaleSwitcher.tsx      语言下拉（含点击外部/Esc 关闭）
    HeaderActions.tsx       导航右侧动作簇（showModels/showDocs 开关复用）
    <Page>Header.tsx        吸顶 glass 头部（列表页）
    CommunityLinks.tsx      右下浮动联系入口
  pages/
    HomePage.tsx  ModelPlazaPage.tsx  LoginPage.tsx  DashboardPage.tsx  DocsPage.tsx  NotFoundPage.tsx
```

页面不抽「万能 Section」组件：每个区块的间距/边线都是视觉决策，抽象后反而要传 8 个 props。可复用的只有动作簇、图标、浮层这类**交互**件。

## Tailwind 语义色映射

```js
// tailwind.config.js
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: {
      gray: { 200:'#cdd1da', 400:'rgb(var(--paper-gray-400) / <alpha-value>)',
              500:'rgb(var(--paper-gray-500) / <alpha-value>)', 600:'#485266',
              700:'#343e50', 800:'#20283b', 900:'#0b1020' },
      dark: { 300:'#cdd1da', 400:'#aab4c5', 500:'#8d99ad', 600:'#52607a',
              700:'#3c4658', 800:'#1c2330', 900:'#171e2a', 950:'#0d111a' },
      primary: { 50:'#f1f2f5', 300:'#9ba3b2', 500:'#5c6474', 600:'#4a5261', 900:'#0b1020' },
    },
    fontFamily: { mono: ['ui-monospace','SFMono-Regular','Menlo','Monaco','Consolas','monospace'] },
    shadow: { paper: '2px 2px 0 var(--paper-line)', 'paper-lg': '3px 3px 0 var(--paper-line)' },
  } },
}
```

- `gray-400/500` 必须走 `rgb(var(--paper-gray-*) / <alpha-value>)`，这样 `text-gray-500/70` 才生效，且能随主题翻转。
- `dark-*` 只是 Tailwind 的 `dark:` 变体配色（边框/次要文字）；**主色永远走 `--paper-*`**，两者不要混用在同一属性上。

## 主题：预置 + 持久化

```jsx
// theme/ThemeProvider.tsx（要点）
const [dark, setDark] = useState(initialDark)          // localStorage('theme') → prefers-color-scheme
useEffect(() => {
  document.documentElement.classList.toggle('dark', dark)
  localStorage.setItem('theme', dark ? 'dark' : 'light')
}, [dark])
```

```html
<!-- index.html：首屏前执行，避免闪白 -->
<script>
  (function () {
    try {
      var saved = localStorage.getItem('theme')
      var dark = saved === 'dark' || (!saved && matchMedia('(prefers-color-scheme: dark)').matches)
      if (dark) document.documentElement.classList.add('dark')
    } catch (e) {}
  })()
</script>
```

`<meta name="theme-color" media="(prefers-color-scheme: light|dark)">` 写两条，移动端地址栏才跟色。

## i18n：不引库

```ts
// i18n/en.ts —— 同时是类型来源
export const en = { brand: { name: 'InitAPI' }, nav: { login: 'Login' }, home: { brand: { headline: '…' } } }
export type Messages = typeof en            // 不加 as const，否则 zh 无法赋值

// i18n/zh.ts
export const zh: Messages = { brand: { name: '初元API' }, nav: { login: '登录' }, home: { brand: { headline: '…' } } }

// i18n/index.tsx —— dot-path 取值 + 回落 en + 回落 key
const lookup = (src, path) => path.split('.').reduce((acc, k) => acc?.[k], src)
const t = (key) => lookup(dict, key) ?? lookup(en, key) ?? key
```

- 动态 key（`t(\`home.brand.${k}Title\`)`）用 `t(key: string)`，不要做模板字面量类型体操。
- 语言写 `localStorage`，并同步 `document.documentElement.lang`。
- `document.title` 由当前语言字典的首屏页文案驱动，切换语言时更新。

## 模拟数据层

```ts
// data/models.ts
export type ModelEntry = { id: string; name: string; platform: Platform; groups: string[];
                           context: number; inputPrice: number; outputPrice: number;
                           abliterated: boolean; peakMultiplier?: number; available: boolean }
export const MODELS: ModelEntry[] = [ /* 12–16 条，覆盖 4–6 个平台、2–3 个分组 */ ]
export const PLATFORM_LABELS: Record<Platform, string> = { …… }
export function formatContext(tokens: number) { … }   // 1M / 128K
```

页面侧：`useState(loading=true)` + `setTimeout(…, 420)` 展示骨架屏，筛选在 `useMemo` 里做。接真实接口时只替换 `MODELS` 的来源，页面不动。

## 路由与守卫

```jsx
<Route path="/" element={<Navigate to="/home" replace />} />
<Route path="/home" element={<HomePage />} />
<Route path="/model-plaza" element={<ModelPlazaPage />} />
<Route path="/login" element={<LoginPage />} />
<Route path="/dashboard" element={<DashboardPage />} />   {/* 内部：!isAuthenticated → <Navigate to="/login?redirect=/dashboard" replace/> */}
<Route path="/docs" element={<DocsPage />} />
<Route path="*" element={<NotFoundPage />} />
```

- 登录后用 `navigate(redirect, { replace: true })`；已登录访问 `/login` 直接 `<Navigate>`，**不要**在渲染期调 `navigate()`。
- 演示登录：邮箱含 `@` 且密码 ≥4 位即通过；真实项目替换 `AuthProvider` 实现即可。

## 交付前校验

```bash
npm run lint && npm run build          # oxlint + tsc -b + vite build
npm run preview                        # 4173
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  node scripts/probe.mjs http://localhost:4173/home 1440 1000 /tmp/a.png light full
CHROME_PATH="…" node scripts/probe.mjs http://localhost:4173/home 390 900 /tmp/b.png dark full
```

探针输出 `offenders`（越界元素）与 `scrollHeight`；越界必须为空，`scrollHeight` 与参考站相差 <20px。截图建议成对比较：1440 亮 / 1440 暗 / 768 / 390。

## 从零起一个新主题（30 分钟路径）

1. `cp -R assets/starter ~/projects/<new-site> && cd <new-site> && npm i`
2. 改 `src/styles/tokens.css` 的 `--paper*` 六件套（必要时改 `--paper-chart-*`）。
3. 改 `public/logo.svg`、`index.html` 的 title/description/theme-color、`src/i18n/*` 的 `brand.name`。
4. 首页：改 `HomePage.tsx` 的四个内容数组（`FEATURE_KEYS`/`STEP_KEYS`/`FAQ_KEYS`/`CLI_TOOLS`）与对应文案；版面结构不要动。
5. 列表页：改 `data/*.ts` 的条目与 `pages/*Page.tsx` 的筛选维度。
6. 删掉用不到的页面与 `App.tsx` 里对应 `<Route>`，再跑校验清单。