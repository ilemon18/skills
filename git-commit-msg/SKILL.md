---
name: git-commit-msg
description: 读取当前 Git 仓库未提交的改动（已暂存、未暂存、未跟踪），生成一条可直接复制的**英文** commit message 并展示给用户；绝不执行 git add / commit / push，也不逐条请求确认命令。当用户要求「生成 commit message」「写提交信息」「这些改动该提交什么」时使用。
---

# Git Commit Message

用户的诉求只有一件：**把 commit message 写出来给他复制**。本 skill 全程只读，不改变仓库任何状态。

## 硬性规则

- **绝不执行** `git add`、`git commit`、`git push`、`git stash`、`git checkout`、`git reset`。即使用户说「顺便提交」也要先只输出文案，等他明确点头。
- **不要逐条问「可以运行这条命令吗」**。下面的收集脚本一次跑完，拿到结果直接出文案。
- 不要问「用中文还是英文」「scope 用什么」「要不要拆成多条」这类问题——从仓库历史和改动本身自己判断。
- **commit message 一律用英文**，不论仓库历史是中文还是英文，摘要与正文都要是英文。仓库历史里的中文只用来理解意图，不要被它带成中文输出。

## 第 1 步：一次收集（单条命令，别拆成多条）

```bash
bash ~/.codex/skills/git-commit-msg/scripts/collect.sh
```

它在当前目录定位仓库，输出：仓库根、当前分支、`status --porcelain` 全量清单、暂存/未暂存 `--stat`、最近 20 条提交主题、最近 5 条完整 message、暂存与未暂存 diff（各截断 600 行）、未跟踪文件清单。

脚本输出 `NOT_A_GIT_REPO` 时就到此为止，告知用户当前目录不在 Git 仓库内。

## 第 2 步：判断有没有内容可写

- `STATUS` 段为空 → 直接说「工作区是干净的，没有可提交的内容」，不要编造文案。
- 只有未跟踪文件 → 照样写文案，并在文案下方补一句：这些文件还没被跟踪，提交前需要 `git add`。
- 改动很多（几十个文件或跨多个模块）→ 写一条概括性 message，再提示可拆成几条更清晰的提交。

## 第 3 步：按仓库风格写文案

从 `RECENT SUBJECTS` 和 `LANGUAGE SAMPLE` 推断三点，不要自创风格：

1. **语言固定英文**：摘要与正文全部写英文，不管仓库历史是中文还是英文。中文历史只用于理解业务意图，不要跟着写成中文。
2. **格式**：历史用 Conventional Commits 就照用 `type(scope): summary`；历史是裸描述就照裸描述；历史首行带 `[JIRA-123]` 这类前缀就跟同样位置。
3. **工单号**：历史里出现 `JIRA-123`、`#123`、`【需求123】` 之类，按同样位置附在首行末尾。

写文案的要求：

- 首行 ≤ 72 字符，type 取 `feat|fix|refactor|perf|test|docs|chore|build|ci|style|revert`；摘要用英文、现在时、祈使句（`add` / `fix` / `remove`，不用 `added`、`fixes`）
- `scope` 用改动最集中的目录名或包名，取不到就省略括号
- 空行后写正文要点，每条 `- ` 开头、英文，讲「改了什么 + 为什么」，**不要逐个文件罗列**，也不要把 diff 复述一遍
- 看不出意图时，就老实用改动事实描述，不要编造业务动机
- 破坏性变更、需要迁移的配置，单独起一行 `BREAKING CHANGE: ...`

## 第 4 步：输出给用户复制

用带语言标记的代码块包住，方便一键复制：

```
fix(order): handle empty selection in bulk export

- validate the selected orders before exporting and show a hint instead of throwing when nothing is selected
- unify the error response shape of the export endpoint

Refs: OMS-231
```

代码块之后**只加一句**：`复制即可，我没有执行任何提交。`

不要再追问「要我帮你提交吗」，不要追加下一步建议清单，除非用户主动问。