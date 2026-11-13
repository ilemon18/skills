#!/usr/bin/env node
/**
 * 视觉回归探针：截图 + 横向溢出检测。
 *
 *   CHROME_PATH="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
 *   node probe.mjs <url> [宽=1440] [高=1000] [输出=/tmp/probe.png] [light|dark] [full]
 *
 * 依赖：在**目标项目**里 `npm i -D puppeteer-core`（不下载浏览器，复用本机 Chrome）。
 * 本脚本可以从任意目录运行，依赖按当前工作目录解析。
 * 输出：JSON 报告（innerWidth / docWidth / scrollHeight / offenders）+ PNG。
 * 退出码：2 表示存在横向溢出元素。
 */
import { createRequire } from 'node:module'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

const url = process.argv[2]
if (!url) {
  console.error('usage: node probe.mjs <url> [width] [height] [out] [light|dark] [full]')
  process.exit(1)
}

async function loadPuppeteer() {
  try {
    const requireFromCwd = createRequire(path.join(process.cwd(), 'package.json'))
    const entry = requireFromCwd.resolve('puppeteer-core')
    const mod = await import(pathToFileURL(entry).href)
    return mod.default ?? mod
  } catch {
    console.error('missing dependency: run `npm i -D puppeteer-core` in the target project')
    process.exit(1)
  }
}

const puppeteer = await loadPuppeteer()
const CHROME =
  process.env.CHROME_PATH ?? '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
const width = Number(process.argv[3] ?? 1440)
const height = Number(process.argv[4] ?? 1000)
const out = process.argv[5] ?? '/tmp/probe.png'
const theme = process.argv[6] ?? 'light'
const full = process.argv[7] === 'full'

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--hide-scrollbars', '--disable-gpu'],
})
const page = await browser.newPage()
await page.setViewport({
  width,
  height,
  deviceScaleFactor: 1,
  isMobile: width < 640,
  hasTouch: width < 640,
})
await page.goto(url, { waitUntil: 'networkidle0' })
// 主题由 localStorage 驱动；写入后重载，让页面按目标主题渲染
await page.evaluate((mode) => localStorage.setItem('theme', mode), theme)
await page.reload({ waitUntil: 'networkidle0' })
await new Promise((resolve) => setTimeout(resolve, 700))

const report = await page.evaluate(() => {
  const offenders = []
  document.querySelectorAll('*').forEach((el) => {
    const rect = el.getBoundingClientRect()
    if (rect.width === 0) return
    if (rect.right > window.innerWidth + 1 || rect.left < -1) {
      offenders.push({
        tag: el.tagName.toLowerCase(),
        cls: (el.getAttribute('class') ?? '').slice(0, 90),
        left: Math.round(rect.left),
        right: Math.round(rect.right),
        width: Math.round(rect.width),
      })
    }
  })
  return {
    innerWidth: window.innerWidth,
    docWidth: document.documentElement.scrollWidth,
    scrollHeight: document.documentElement.scrollHeight,
    offenders: offenders.slice(0, 14),
  }
})

console.log(JSON.stringify(report, null, 2))
await page.screenshot({ path: out, fullPage: full })
await browser.close()
if (report.offenders.length) process.exitCode = 2