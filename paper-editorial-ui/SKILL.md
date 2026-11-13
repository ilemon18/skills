---
name: paper-editorial-ui
description: Build or re-skin React + Tailwind marketing/docs sites with the hard-edge "paper editorial" visual system (paper palette, 1px ink hairlines, 32px grid, offset hard shadows, mono micro-labels, oversized tight headings). Use when the user wants this initapi.ai-style look, asks to restyle an existing site into it, or needs the matching Vite + React + Tailwind project architecture. Do not use for rounded/soft design systems, component-library-heavy dashboards, or apps that must follow a corporate design system.
---

# Paper Editorial UI

一套「纸面 + 墨线」的编辑式视觉系统，以及承载它的 React 工程骨架。做新站点时**先定令牌，再拼页面**：所有视觉都由 8 个纸感变量驱动，组件里不写色值。

可复制的实现快照：

- `assets/starter/` — 完整可跑的 Vite + React 19 + TS + Tailwind 骨架（含首页、价格页、登录、控制台、文档、404）
- `references/tokens.css` — 令牌层，原样 `@import` 到入口 CSS 最前面
- `references/base.css` — 入口 CSS（`@layer base` 排版 + `@layer components` 按钮等）
- `references/recipes.md` — 各区块的 JSX + class 配方，直接抄结构
- `references/architecture.md` — 目录职责、Provider 组合、主题/i18n/假数据模式
- `scripts/probe.mjs` — 截图 + 横向溢出检测（视觉回归）

复制去向：`base.css → src/index.css`、`tokens.css → src/styles/tokens.css`、`home.css / plaza.css → src/styles/`。

## 视觉语法（六条不可妥协）

1. **直角 + 1px 墨线**。卡片、按钮、输入、标签一律 `border-radius: 0`；只有浮层例外（浮层面板 18px，浮动圆钮 50%）。分隔靠 1px `var(--paper-line)`，不靠间距色块。
2. **硬偏移阴影，永不模糊**。容器 `box-shadow: 2px 2px 0 var(--paper-line)`，强调块 `3px 3px 0`。禁止 `shadow-lg`、`blur()` 光晕。
3. **只有四个颜色角色**：`--paper`（底）、`--paper-surface`（面）、`--paper-ink`（字与线）、`--paper-muted`（次要字），外加 `--paper-danger`。装饰性彩色禁止；彩色仅用于外部品牌图标（如社群蓝/青）。
4. **字号两极化**。主标题 `clamp(2.7rem, 4.8vw, 4.25rem)` / 字重 850 / 行高 1.22 / 字距 `-.055em`；微标签 `10px` mono + `letter-spacing .12em` + 全大写。中间档只保留 14/16/18/24px，不要 13/15/17 的零碎过渡。
5. **32px 网格底纹 + 大留白**。页面根节点 `.paper-workspace.paper-grid`；每个 section `py-14`（Hero `py-20`），区块之间用 `border-top: 1px solid var(--paper-line)` 切分，不用卡片堆叠区分层次。
6. **克制的文案，让布局解释**。Avoid unnecessary secondary labels and descriptions. Let the layout do the explaining. 只保留帮用户理解、判断或完成操作的文案；同一个意思全页只说一遍，标题能说清就不加描述，描述只补标题没覆盖的事实。删掉后布局仍成立的字，就保持删除。

## 令牌层

`references/tokens.css` 是唯一颜色来源，命名沿用 `--paper-*`：

| 变量 | 作用 | 亮色 | 暗色 |
| --- | --- | --- | --- |
| `--paper` | 页面底 | `#f4f2ec` | `#141923` |
| `--paper-surface` | 卡片/输入面 | `#fffdf8` | `#1c2330` |
| `--paper-tint` | 代码块/凹陷面 | `#eeece6` | `#080c17` |
| `--paper-ink` | 文字/主线 | `#0b1020` | `#edf0f7` |
| `--paper-muted` | 次要文字 | `rgb(92 100 116)` | `#aab4c5` |
| `--paper-line` | 1px 分隔与阴影 | `#cdd1da` | `#3c4658` |
| `--paper-grid` | 32px 网格线 | `rgba(11,16,32,.025)` | `rgba(230,235,250,.035)` |
| `--paper-chart-1..12` | 图表/徽标序列 | 低饱和灰蓝绿 | 提亮一档 |

`--paper-gray-400/500` 存的是归一无符号三元组（`98 109 128`），供 Tailwind 的 `rgb(var(--paper-gray-500) / <alpha-value>)` 使用——保留这个写法，否则 `text-gray-500/70` 之类的透明度修饰会失效。

`tokens.css` **只放变量**（`:root` / `.dark`），不要在里面写 `html` / `body` 元素规则：它被 `@import` 到 `@tailwind` 之前，preflight 的 `line-height: inherit` 会盖掉你的字号节奏。排版规则写在 `index.css` 的 `@layer base` 里，组件规则写在 `@layer components` 里。

### 换主题只改这几个值

新皮肤 = 换掉 `--paper`、`--paper-surface`、`--paper-tint`、`--paper-ink`、`--paper-muted`、`--paper-line`，其余（间距、边框、字号、阴影偏移）保持不变。示例：

```css
/* 暖砂纸 */
:root { --paper:#f3efe6; --paper-surface:#fffcf4; --paper-ink:#1d1a16; --paper-line:#d8d0c2; --paper-muted:#7a7268; }
/* 冷灰蓝 */
:root { --paper:#f1f3f7; --paper-surface:#ffffff; --paper-ink:#0d1526; --paper-line:#ccd4e2; --paper-muted:#5b667a; }
/* 米黄 + 品牌绿（强调色只进 chart-1 与图标） */
:root { --paper:#f6f3ea; --paper-surface:#fffdf6; --paper-ink:#12201b; --paper-line:#d3d8cc; --paper-muted:#66756c; --paper-chart-1:#2f6b52; }
```

深色模式不要逐个组件写：在 `html.dark` 上换同一组变量，组件里的 `var(--paper-*)` 自动翻转。

## 排版与字体

- 正文：系统 UI 栈（`system-ui … PingFang SC, Microsoft YaHei`），`15px / 1.75`，色 `--paper-ink`。
- 等宽：`ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas`，用于**所有**编号（`01 / 02`）、区块 eyebrow、工具标签、模型 ID、代码、`[ READY TO INIT ]` 之类括注。
- 品牌字标：mono + `700` + `letter-spacing: -.07em`（`.brand-wordmark`）。
- 中文标题用 `font-weight: 850` 会回落到系统粗体，视觉上正好；不要为了「更粗」去引入 webfont。
- 图标一律内联 SVG `stroke-width: 1.5–1.75`，`currentColor`；禁止图标字体与 emoji 充当图标（国旗 emoji 例外）。

## 文案（少即是设计）

默认三层：**eyebrow（可选）→ 标题 → 行动或内容**。描述是例外层，不是默认层。

- **只写要判断、要做的**：限制、价格、条件、范围、状态、下一步。帮不上判断的一律删。
- **不重复**：描述不复述标题，副标题不把标题换个说法，按钮上方不再加一行提示。
- **全页只讲一遍**：同一卖点、数字、承诺只出现一次；Hero 讲过的，区块描述、卡片、FAQ、页脚不再换词重述。
- **改写不是新信息**：拿不到新事实、新条件或新动作的同义句直接删；两个区块的文案可以互换，就说明是模板填充。
- **不装饰**：删掉「强大」「一站式」「极致体验」这类形容词，换数字、范围或具体能力。
- **一层说明**：同一区块最多一个 eyebrow、一个标题、一段可选描述；出现第二段说明就合并或删除。
- **自解释**：布局、编号、图标、示例能表达的，不再配文字解释；删掉一行后页面仍成立，就保持删除。
- **查重方法**：把全页标题、描述、按钮、FAQ 文案抄成一列，逐条问「删掉它，用户会少知道什么」；答不出就删。

## 项目架构

Vite + React 19 + TypeScript + Tailwind 3（`darkMode: 'class'`）+ react-router 7，**不引 UI 库**。Tailwind 只负责布局，视觉靠令牌 + 少量页面级 CSS。完整骨架见 `assets/starter/`，职责划分见 `references/architecture.md`。

```
src/
├── index.css        @import tokens → @tailwind → @layer base → @layer components → @layer utilities
├── styles/          tokens.css（变量）+ home.css / plaza.css（页面级排版）
├── theme/           ThemeProvider：localStorage('theme') + prefers-color-scheme，html.dark
├── i18n/            en.ts（类型来源）/ zh.ts / index.tsx（Provider + useI18n + dot-path 取值）
├── auth/            AuthProvider：演示登录态，localStorage
├── data/            模拟数据模块（模型、价格、用量行）
├── components/      可复用小件：Icon、BrandWordmark、LocaleSwitcher、ThemeToggle、HeaderActions、浮层
└── pages/           每路由一个页面组件，不抽「万能 Section」组件
```

关键约定：

- **Provider 顺序**：`Theme → I18n → Auth → Router`。`index.html` 里放 5 行内联脚本，按 `localStorage.theme` 预置 `dark` 类，避免首屏闪白。
- **页面级 CSS 用原站类名**（`.home-hero`、`.home-feature`、`.terminal-window`），比一长串 arbitrary class 可读、可对照、可整体换肤。
- **`nth-child` 管边框**：多宫格卡片用 `.home-feature + .home-feature { border-left }` + 断点内的 `border-top: 0` 覆盖，避免每张卡自己写 `border-r` 又被最后一张破坏。
- **缺口/加载态**用 `animate-pulse` + 灰块，不用 spinner。
- **数据先写死**：路由页面从 `src/data/*.ts` 取值，模拟 300–500ms 延迟展示骨架屏；接后端时只替换该模块。

## 组件配方

抄结构、抄 class 字符串，不要重新发明：

- 顶部导航：`border-b border-gray-900 dark:border-dark-500`，左侧 44px logo + 字标，右侧链接 + 语言 + 主题 + `btn btn-primary` 带 `↗`
- Hero 双栏：`grid items-center gap-12 py-14 lg:grid-cols-[1.1fr_1fr] lg:py-20`
- 区块头：eyebrow（可选，`10px` mono）→ 标题（`clamp`）→ 描述（可选，`14px / 1.9`，`max-width: 580px`，只补标题未覆盖的事实）
- 终端窗 / 代码块：深色头 `#0b1020` + 复制键 + `code-keyword`（ink, 600）/ `code-string`（muted）
- 数据卡片：`border border-gray-200 bg-white shadow-paper`，hover `translate(-1px,-2px)` + 4px 阴影
- FAQ：原生 `<details>`，`summary` 去箭头，`+` 打开旋转 45°
- 筛选 chip：`data-active` 驱动反相（ink 底 / 纸色字），不用条件 class 拼接
- 表头：反相 `--paper-table-head` 底 + `--paper-table-text` 字 + mono 10px 大写

逐条代码见 `references/recipes.md`。

## 自检清单

交付前按顺序过一遍：

1. 全文搜索 `rounded-lg`/`rounded-xl`/`shadow-lg`/`blur(`/`gradient`：除浮层（下拉菜单、悬浮面板 18px、图标底板、圆形浮钮、吸顶 `backdrop-filter`）外应为 0 命中。
2. 全文搜索十六进制色值：只允许出现在 `tokens.css`、`base.css` 的 `.btn*` 组件层、以及页面 CSS 里担当「品牌色」的少量位置（终端深色头、社群图标）；页面 JSX 里出现即为漏改令牌。
3. 深色模式：只由 `--paper-*` 翻转 + Tailwind 的 `dark:` 边框/文字映射承担；组件里不出现新的 `dark:bg-[#...]`。
4. 三档宽度（1440 / 768 / 390）跑 `scripts/probe.mjs`：`offenders` 必须为空（320px 也不能横向滚动）。
5. 键盘：`focus-visible` 统一 2px `--paper-ink` + `offset 4px`；浮层支持 `Esc` 与点击外部关闭。
6. `prefers-reduced-motion: reduce` 下关闭位移与动画。
7. 文案：逐区块删一遍 eyebrow / 描述 / 小字注释，同一区块不留两段说明；再全页查重，同一卖点、数字、承诺只留一处，换词复述同样算重复。
8. 与参考站对照：fullPage 截图后比较 `document.documentElement.scrollHeight`，差异应 < 20px。

```bash
CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  node scripts/probe.mjs http://localhost:4173/home 1440 1000 /tmp/probe.png light full
```

## 反模式

- 给纸感卡片加 `rounded-xl` 或模糊投影 —— 立刻变成通用 SaaS 风，整套语法崩掉。
- 用品牌主色做按钮 —— 本系统按钮只有两档：ink 反相（primary）和 1px 描边（secondary），没有彩色 CTA。
- 每个区块自造间距（12/16/20/24 混用）—— section 只有 `py-14`，Hero 只有 `py-14 / lg:py-20`。
- 引入 Tailwind UI / shadcn 组件再改色 —— 圆角与阴影体系冲突，改不动；直接写结构。
- 用图表库默认配色 —— 用 `--paper-chart-*` 序列，深浅主题自动跟随。
- 为「更好看」加渐变、玻璃拟态、渐变边框、emoji 图标 —— 与纸墨语法互斥。
- 每个区块都配「eyebrow + 标题 + 副标题 + 描述 + 脚注」—— 五层字互相复述，用户读不到重点；最多留 eyebrow、标题和一段必要说明。
- 同一卖点用 Hero、区块描述、卡片、FAQ、页脚各写一遍 —— 换词复述产生的是噪音，不是强调；页面级同一信息只留最有力的那一处。
