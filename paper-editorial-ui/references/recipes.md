# 组件配方 / Recipes

每个配方都是「JSX 结构 + class 字符串 + 依赖的 CSS」。抄结构，别抄整段业务逻辑。
假设入口 CSS 已 `@import` 令牌层并定义了 `.paper-workspace` / `.paper-grid` / `.btn*`（见 `base.css`）。
写文案先查重：同一卖点只留一处；Hero、区块、卡片、FAQ 用不同措辞说同一件事，同样算重复。

## 1. 页面壳

```jsx
<div className="paper-workspace paper-grid flex min-h-screen flex-col">
  <header className="mx-auto w-full max-w-7xl px-5 sm:px-10">{/* nav */}</header>
  <main className="mx-auto w-full max-w-7xl flex-1 px-5 sm:px-10">{/* sections */}</main>
  <footer className="mx-auto w-full max-w-7xl px-5 sm:px-10">{/* footer */}</footer>
</div>
```

- 内容宽度统一 `max-w-7xl`；文字型子页（文档/设置）用 `max-w-4xl`。
- 左右内边距 `px-5 sm:px-10`，不要再叠 `container`。

## 2. 顶部导航

```jsx
<nav className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-900 py-5 dark:border-dark-500">
  <Link to="/" className="flex min-w-0 items-center gap-3">
    <img src="/logo.svg" alt="Brand" className="h-11 w-11 shrink-0 object-contain" />
    <span className="brand-wordmark text-2xl">Brand</span>
  </Link>
  <div className="flex max-w-full shrink-0 flex-wrap items-center justify-end gap-2 sm:gap-4">
    <Link className="home-nav-link whitespace-nowrap text-sm font-medium">产品</Link>
    <Link className="home-nav-link whitespace-nowrap text-sm font-medium">文档</Link>
    <LocaleSwitcher />
    <button className="btn btn-ghost p-2" aria-label="切换主题"><Icon name="moon" /></button>
    <Link className="btn btn-primary whitespace-nowrap">登录 <span aria-hidden="true">↗</span></Link>
  </div>
</nav>
```

```css
.home-nav-link:hover { text-decoration: underline; text-underline-offset: 5px; }
.home-nav-link:focus-visible { outline: 2px solid var(--paper-ink); outline-offset: 5px; }
```

- 导航下边框用 **ink**（`border-gray-900 dark:border-dark-500`），与正文区 hairline（`--paper-line`）区分。
- 动作区必须 `flex-wrap` + `shrink-0` + `max-w-full`，否则窄屏把登录按钮挤出视口。
- 吸顶版本：`glass sticky top-0 z-30 border-b border-gray-200/50 dark:border-dark-700/50`。

## 3. Hero（左文案 / 右代码窗）

```jsx
<section className="grid items-center gap-12 py-14 lg:grid-cols-[1.1fr_1fr] lg:gap-14 lg:py-20">
  <div className="min-w-0">
    <p className="home-kicker mb-7 flex items-center gap-3 font-mono text-[10px] font-semibold tracking-[0.12em]">
      <span className="h-2 w-2 shrink-0 bg-gray-500" aria-hidden="true" />
      CATEGORY / KEYWORDS
    </p>
    <h1 className="home-heading whitespace-pre-line">{'第一行\n第二行。'}</h1>
    <p className="mt-6 text-lg font-semibold tracking-tight">{slogan}</p>
    <p className="mt-4 max-w-lg text-sm leading-8 text-gray-600 sm:text-base dark:text-dark-300">{desc}</p>
    <div className="mt-8 flex flex-wrap items-center gap-3">
      <a className="btn btn-primary px-5 py-3.5">主行动 <span aria-hidden="true">↗</span></a>
      <a className="home-secondary px-5 py-3.5 text-sm font-medium">次行动</a>
      <a className="home-nav-link py-3 text-sm font-medium">文档 <span aria-hidden="true">→</span></a>
    </div>
    <p className="mt-7 text-[11px] leading-6 tracking-wide text-gray-500 dark:text-dark-400">{note}</p>
  </div>
  <div className="terminal-container min-w-0">{/* 代码窗 */}</div>
</section>
```

```css
.home-heading { font-size: clamp(2.7rem, 4.8vw, 4.25rem); font-weight: 850; line-height: 1.22; letter-spacing: -.055em; }
.home-kicker { color: var(--paper-muted); }
.home-secondary { display: inline-flex; align-items: center; border: 1px solid var(--paper-ink); }
.home-secondary:hover { background: var(--paper-hover); }
.home-secondary:focus-visible { outline: 2px solid var(--paper-ink); outline-offset: 4px; }
```

- 标题用 `whitespace-pre-line` + 文案里放 `\n`，**不要**两个 `<span>` 或 `<br>`。
- 右列容器必须 `min-w-0`，否则代码块把栅格撑破、整页横向滚动。

## 4. 终端窗 / 代码块

```jsx
<div className="code-label mb-3 flex justify-between font-mono text-[10px] tracking-[0.12em] text-gray-500 dark:text-dark-400">
  <span>ONE KEY. ONE REQUEST.</span><span>PYTHON SDK</span>
</div>
<div className="terminal-window">
  <div className="terminal-header flex items-center justify-between px-5 py-3.5">
    <span className="font-mono text-xs">init.py</span>
    <button className="code-copy px-2 py-1 font-mono text-xs" onClick={copy}>
      {copied ? '已复制' : '复制代码'}
    </button>
  </div>
  <div className="overflow-x-auto px-5 py-6 sm:px-6" tabIndex={0} role="region" aria-label="代码示例">
    <pre className="font-mono text-[11px] leading-7 sm:text-[12px]"><code>
      <span className="code-keyword">from</span> openai <span className="code-keyword">import</span> OpenAI
      {'\n\n'}base_url=<span className="code-string">"https://api.example.com/v1"</span>
    </code></pre>
  </div>
  <div className="border-t px-5 py-4 font-mono text-[11px] text-gray-500 sm:px-7 dark:text-dark-400">// 注释行</div>
</div>
```

```css
.terminal-window { border: 1px solid var(--paper-ink); background: var(--paper-surface); box-shadow: 2px 2px 0 var(--paper-line); }
.terminal-header { background: #0b1020; color: #fffdf8; }   /* 深色头不随主题翻转 */
.code-copy { border: 1px solid #647086; }
.code-copy:hover { background: #273047; }
.code-copy:focus-visible { outline: 2px solid #fffdf8; outline-offset: 3px; }
.code-keyword { color: var(--paper-ink); font-weight: 600; }
.code-string { color: var(--paper-muted); }
```

- 手写两色高亮即可（关键字 / 字符串），不要引 highlight.js。
- 复制按钮要有 2s 回显，失败时回退 `document.execCommand('copy')`。

## 5. 区块头 + 编号行

```jsx
<section className="home-section py-14" aria-labelledby="x-title">
  <div className="mb-8">
    <p className="home-section-label">03 / YOUR WORKFLOW</p>
    <h2 id="x-title" className="home-section-title">标题。</h2>
    {/* 描述可选：只有标题没覆盖的限制 / 条件才加，且只写一句 */}
    <p className="home-section-description">一句话说明，最多两行。</p>
  </div>
  {/* 内容 */}
</section>

{/* 带左右两端标签的编号行（用于栅格区上方） */}
<div className="mb-7 flex flex-wrap justify-between gap-3 font-mono text-[10px] tracking-[0.1em] text-gray-500 dark:text-dark-400">
  <span>01 / 能力概述</span><span>RIGHT SIDE NOTE.</span>
</div>
```

```css
.home-section { border-top: 1px solid var(--paper-line); }
.home-section-label { color: var(--paper-muted); font: 10px/1.5 ui-monospace, monospace; letter-spacing: .12em; margin-bottom: 20px; }
.home-section-title { font-size: clamp(1.6rem, 2.5vw, 2rem); line-height: 1.5; font-weight: 750; letter-spacing: -.035em; }
.home-section-description { color: var(--paper-muted); font-size: 14px; line-height: 1.9; margin-top: 14px; max-width: 580px; }
```

- 先删掉描述试一遍：标题与布局已能说明，就不要加回来。
- eyebrow、标题、描述三句不要指向同一个意思；eyebrow 只给编号或分类，不写第二句标题。
- 写描述前先读一遍 Hero 与相邻区块：意思能对上就删，不要改写一遍。

## 6. 四宫格（nth-child 管边框）

```jsx
<div className="home-features grid border border-gray-200 bg-white sm:grid-cols-2 lg:grid-cols-4 dark:border-dark-700 dark:bg-dark-800">
  {items.map((item, i) => (
    <article key={item.key} className="home-feature p-7">
      <span className="font-mono text-[10px] tracking-wide text-gray-500 dark:text-dark-400">0{i + 1} / {item.tag}</span>
      <h2 className="mb-3 mt-6 text-lg font-bold tracking-tight">{item.title}</h2>
      <p className="text-sm leading-7 text-gray-500 dark:text-dark-400">{item.description}</p>
    </article>
  ))}
</div>
```

```css
.home-feature + .home-feature { border-top: 1px solid var(--paper-line); }
@media (min-width: 640px)  { .home-feature:nth-child(2) { border-top: 0 } .home-feature:nth-child(2n) { border-left: 1px solid var(--paper-line) } }
@media (min-width: 1024px) { .home-feature + .home-feature { border-top: 0; border-left: 1px solid var(--paper-line) } }
```

外框由父容器 `border` 提供，子项只画内线——否则会出现双线。

- 卡片描述只写这张卡独有的事实（能力、限制、场景）；四张卡文案可以互换，说明是模板填充，重写或删掉。

## 7. 左说明 + 右步骤（ol）

```jsx
<section className="home-section grid gap-9 py-14 lg:grid-cols-[1fr_1.25fr] lg:gap-20">
  <div>
    <p className="home-section-label">02 / START BUILDING</p>
    <h2 className="home-section-title">从选择到第一次响应。</h2>
    <p className="home-section-description">说明文字。</p>
    <div className="home-endpoint mt-7 border border-gray-200 px-4 py-3 dark:border-dark-700">
      <span className="block font-mono text-[10px] tracking-widest text-gray-500 dark:text-dark-400">BASE URL</span>
      <code className="mt-2 block break-all text-sm">https://api.example.com/v1</code>
    </div>
  </div>
  <ol className="home-steps">
    {steps.map((step, i) => (
      <li key={step.key} className="flex gap-5 py-6 first:pt-0">
        <span className="pt-1 font-mono text-xs text-gray-500 dark:text-dark-400">0{i + 1}</span>
        <div>
          <h3 className="text-base font-semibold">{step.title}</h3>
          {/* 步骤描述只写该步独有动作，不复述标题 */}
          <p className="mt-2 text-sm leading-7 text-gray-500 dark:text-dark-400">{step.description}</p>
        </div>
      </li>
    ))}
  </ol>
</section>
```

```css
.home-steps li + li { border-top: 1px solid var(--paper-line); }
.home-endpoint { background: var(--paper-surface); }
```

## 8. 双面板（CLI / Harness 之类）

```jsx
<div className="home-tool-panels grid border border-gray-200 md:grid-cols-2 dark:border-dark-700">
  <article className="home-tool-panel p-6 sm:p-8">
    <div className="flex items-center justify-between">
      <h3 className="font-mono text-xl font-bold">CLI</h3>
      <span aria-hidden="true" className="font-mono text-xl text-gray-500">&gt;_</span>
    </div>
    <p className="mt-3 text-sm leading-7 text-gray-500 dark:text-dark-400">说明。</p>
    <div className="my-6 flex flex-wrap gap-2">
      <span className="home-tool-tag">Claude Code</span><span className="home-tool-tag">Codex CLI</span>
    </div>
    <a className="home-nav-link text-sm font-semibold">查看教程 <span aria-hidden="true">↗</span></a>
  </article>
  <article className="home-tool-panel p-6 sm:p-8">…</article>
</div>
```

```css
.home-tool-panel { background: var(--paper-surface); }
.home-tool-panel + .home-tool-panel { border-top: 1px solid var(--paper-line); }
.home-tool-tag { border: 1px solid var(--paper-line); padding: 5px 9px; font: 11px/1.6 ui-monospace, monospace; }
@media (min-width: 768px) { .home-tool-panel + .home-tool-panel { border-top: 0; border-left: 1px solid var(--paper-line); } }
```

面板角标用纯文本符号（`>_`、`◇`、`*`），比图标更符合这套语法。

## 9. FAQ（原生 details）

```jsx
<div className="home-faq">
  {faqs.map((faq) => (
    <details key={faq.key} className="py-5 first:pt-0">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-5 text-sm font-semibold leading-7">
        {faq.question}
        <span className="home-faq-indicator shrink-0 font-mono text-lg" aria-hidden="true">+</span>
      </summary>
      <p className="mt-3 pr-7 text-sm leading-7 text-gray-500 dark:text-dark-400">{faq.answer}</p>
    </details>
  ))}
</div>
```

```css
.home-faq details + details { border-top: 1px solid var(--paper-line); }
.home-faq summary::-webkit-details-marker { display: none; }
.home-faq-indicator { transition: transform .16s ease; }
.home-faq details[open] .home-faq-indicator { transform: rotate(45deg); }
.home-faq summary:focus-visible { outline: 2px solid var(--paper-ink); outline-offset: 4px; }
```

## 10. 收尾 CTA + 页脚

```jsx
<section className="home-closing my-6 flex flex-wrap items-center justify-between gap-8 border px-7 py-9 sm:px-10">
  <div>
    <h2 className="text-2xl font-bold tracking-tight">把下一种可能，接进你的项目。</h2>
    {/* 副文案可选：不补充条件 / 价格就不写 */}
    <p className="mt-3 text-sm leading-7 text-gray-500 dark:text-dark-400">一句副文案。</p>
  </div>
  <a className="btn btn-primary px-6 py-3.5">开始 <span aria-hidden="true">↗</span></a>
</section>

<footer className="mx-auto w-full max-w-7xl px-5 sm:px-10">
  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 py-6 text-xs text-gray-500 dark:border-dark-700 dark:text-dark-400">
    <span className="font-mono">Brand <span className="ml-3">© 2026</span></span>
    <span>example.com</span>
    <span>一句 slogan（可选）。</span>
  </div>
</footer>
```

```css
.home-closing { border-color: var(--paper-ink); background: var(--paper-surface); box-shadow: 3px 3px 0 var(--paper-line); }
```

## 11. 浮动联系入口

```jsx
<div className="fixed right-[calc(1rem+env(safe-area-inset-right,0px))] bottom-[calc(1rem+env(safe-area-inset-bottom,0px))] z-30 flex flex-col items-end gap-3 md:right-[calc(1.5rem+env(safe-area-inset-right,0px))] md:bottom-[calc(1.5rem+env(safe-area-inset-bottom,0px))]">
  {open && (
    <nav className="w-[min(308px,calc(100vw-2rem))] max-h-[calc(100dvh-100px)] origin-bottom-right overflow-y-auto rounded-[18px] border border-gray-200 bg-white p-2 shadow-[0_12px_36px_rgba(15,23,42,0.14),0_2px_8px_rgba(15,23,42,0.04)] dark:border-dark-600 dark:bg-dark-800">
      <div className="flex items-center gap-2 px-3 pb-3 pt-2.5 text-xs font-semibold">
        <span className="h-1.5 w-1.5 rounded-full bg-[#229ed9]" aria-hidden="true" />保持联系
      </div>
      <a className="flex items-center gap-3 rounded-xl px-2.5 py-3.5 no-underline transition-colors hover:bg-gray-50 dark:hover:bg-dark-700">
        <span className="community-icon grid h-10 w-10 shrink-0 place-items-center rounded-xl"><Icon name="telegram" /></span>
        <span className="grid min-w-0 flex-1 gap-1">
          <strong className="text-sm font-semibold">公告频道</strong>
          <span className="text-[11px] leading-6 text-gray-500 dark:text-gray-400">产品更新与发布说明</span>
        </span>
        <Icon name="external" size={12} className="shrink-0 text-gray-400" />
      </a>
    </nav>
  )}
  <button className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-full border border-white/25 text-white shadow-[0_5px_18px_rgba(22,138,194,0.28)] transition-transform hover:-translate-y-0.5 active:translate-y-0" style={{ backgroundColor: '#168ac2' }}>
    <Icon name={open ? 'close' : 'telegram'} />
  </button>
</div>
```

```css
.community-icon { color: #1685be; background: rgba(34,158,217,.12); }
.dark .community-icon { color: #7dd3fc; }
.community-icon--chat { color: #0d9488; background: rgba(20,184,166,.12); }
.dark .community-icon--chat { color: #5eead4; }
```

浮层是**唯一**允许圆角（18px）、模糊阴影、彩色图标的地方——它要「贴纸感」。仍须支持 `Esc`、点击外部关闭、`aria-expanded`。

## 12. 数据卡片（价格 / 模型）

```jsx
<article className="plaza-card flex h-full flex-col border border-gray-200 bg-white p-5 shadow-paper dark:border-dark-700 dark:bg-dark-800">
  <div className="flex items-start justify-between gap-3">
    <div className="min-w-0">
      <div className="flex flex-wrap items-center gap-2">
        <h3 className="truncate text-base font-semibold">{model.name}</h3>
        <span className="plaza-tag">ABLITERATED</span>
      </div>
      <code className="mt-1 block truncate font-mono text-[11px] text-gray-500 dark:text-dark-400">{model.id}</code>
    </div>
    <span className="plaza-platform">OpenAI</span>
  </div>
  <div className="plaza-price-row mt-5 pt-4">
    <div>
      <span className="block font-mono text-[10px] tracking-[0.12em] text-gray-500 dark:text-dark-400">输入</span>
      <span className="mt-1 block font-mono text-lg font-semibold tracking-tight">$0.40</span>
      <span className="block text-[10px] text-gray-500 dark:text-dark-400">每 1M tokens</span>
    </div>
    <div>{/* 输出 */}</div>
  </div>
  <div className="mt-auto flex flex-wrap items-center gap-2 pt-4">
    {model.groups.map((g) => <span key={g} className="plaza-tag">{g}</span>)}
    <span className="ml-auto font-mono text-[10px] tracking-wide text-gray-500 dark:text-dark-400">上下文 128K</span>
  </div>
</article>
```

```css
.plaza-card { transition: transform .16s ease, box-shadow .16s ease; }
.plaza-card:hover { transform: translate(-1px,-2px); box-shadow: 4px 4px 0 var(--paper-line); }
.plaza-tag { border: 1px solid var(--paper-line); padding: 2px 6px; font: 10px/1.6 ui-monospace, monospace; letter-spacing: .06em; white-space: nowrap; }
.plaza-platform { border: 1px solid var(--paper-ink); padding: 2px 7px; font: 10px/1.7 ui-monospace, monospace; }
.plaza-price-row { display: grid; grid-template-columns: 1fr 1fr; border-top: 1px solid var(--paper-line); }
.plaza-price-row > div + div { border-left: 1px solid var(--paper-line); padding-left: 14px; }
```

右上的平台徽标 `shrink-0`，左侧标题容器 `min-w-0` ——否则长模型名会把徽标顶出卡片。

## 13. 筛选 chip（data 属性驱动）

```jsx
<button type="button" data-active={platform === 'all'} className="plaza-filter-chip" onClick={() => setPlatform('all')}>全部</button>
```

```css
.plaza-filter-chip { border: 1px solid var(--paper-line); padding: 4px 10px; font-size: 12px; line-height: 1.6; background: transparent; }
.plaza-filter-chip:hover { border-color: var(--paper-ink); }
.plaza-filter-chip[data-active='true'] { background: var(--paper-ink); color: var(--paper-surface); border-color: var(--paper-ink); }
.plaza-filter-chip:focus-visible { outline: 2px solid var(--paper-ink); outline-offset: 3px; }
```

## 14. 反相表头

```jsx
<table className="w-full min-w-[420px] text-left text-sm">
  <thead className="bg-[color:var(--paper-table-head)] font-mono text-[10px] uppercase tracking-[0.12em] text-[color:var(--paper-table-text)]">
    <tr><th className="px-5 py-3 font-medium">MODEL</th><th className="px-5 py-3 font-medium">TOKENS</th></tr>
  </thead>
  <tbody>
    <tr className="border-t border-gray-200 dark:border-dark-700">
      <td className="px-5 py-3 font-mono text-xs">model-id</td><td className="px-5 py-3 font-mono text-xs">1,204</td>
    </tr>
  </tbody>
</table>
```

外层套 `<div className="overflow-x-auto">`，并给 `table` 一个 `min-w-[420px]`，窄屏横向滚动而不挤压。

## 15. 图标

内联 SVG 组件，`stroke-width 1.5–1.75`、`fill=none`、`stroke=currentColor`、`aria-hidden`：

```jsx
export function Icon({ name, size = 20, className, strokeWidth = 1.75 }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
         strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"
         aria-hidden="true" className={className}>{PATHS[name]}</svg>
  )
}
```

图标集只需 10–15 个（book / grid / sun / moon / chevronDown / check / search / close / copy / key / external / telegram / message）；不要引图标库。
