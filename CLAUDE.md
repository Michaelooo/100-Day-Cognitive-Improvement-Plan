# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a 100-day cognitive improvement plan focused on learning hardcore development technologies. The repository contains structured daily learning notes, with AI assistance for summarization and organization.

## Directory Structure

```
/
├── README.md                      # Overview of the 100-day plan
└── docs/                          # VitePress documentation site
    ├── .vitepress/                # VitePress config
    ├── plan-1/                    # Daily learning notes
    │   ├── index.md               # Plan overview
    │   ├── 100-days-hardcore-dev-plan.md  # Full 100-day curriculum
    │   └── YYYY-MM-DD-主题.md     # Daily notes (date-stamped)
    ├── index.md                   # Site homepage
    └── public/                    # Static assets
```

## Daily Note Format

When adding or updating daily notes, follow this structured format:

```markdown
# [主题名称]

> 100 天认知提升计划 | Day X

---

## 目录
- [第一部分：...](#第一部分xxx)
  - [子主题](#子主题)
- [第二部分：...](#第二部分xxx)
- [第三部分：实践与思考](#第三部分实践与思考)

---

## 第一部分：[主主题]

### 子主题

**概念说明**

[内容]

---

## 第二部分：[相关主题]

...

---

## 第三部分：实践与思考

### 实践记录

- [ ] 待办事项

### 疑问与思考

**已解答**
1. ✅ 已解决的问题

**待探索**
2. ❓ 待深入的问题

---

*更新日期：YYYY-MM-DD*
```

## File Naming Convention

Daily notes should be named: `YYYY-MM-DD-主题.md`

Place them in the `docs/plan-1/` directory.

## Content Organization Principles

1. **结构化展示** - Organize content into clear sections (第一部分/第二部分/第三部分)
2. **三部分结构** - 典型结构为：理论概述 → 技术细节 → 实践与思考
3. **使用表格** - 对比、配置、示例等信息使用表格展示
4. **代码示例** - 提供可运行的代码示例
5. **疑问追踪** - 用 ✅ 标记已解答，用 ❓ 标记待探索

## Learning Stages

The 100-day plan is divided into 8 stages:

| Stage | Days | Topic |
|-------|------|-------|
| 第一阶段 | 1-10 | 开发工具链与效率 |
| 第二阶段 | 11-25 | 系统与底层 |
| 第三阶段 | 26-40 | 编程语言深度 |
| 第四阶段 | 41-55 | 架构与设计 |
| 第五阶段 | 56-65 | 安全与逆向 |
| 第六阶段 | 66-80 | AI 时代开发 |
| 第七阶段 | 81-90 | 前沿技术 |
| 第八阶段 | 91-100 | 综合实战 |

Reference the full curriculum in `docs/plan-1/100-days-hardcore-dev-plan.md` for detailed daily topics.

## Language

All content should be in **中文** (Chinese), as this is a Chinese-language learning journal.

---

## Troubleshooting

### VitePress 编译错误：Vue 模板解析冲突

**问题症状**

```
Error parsing JavaScript expression: Unexpected token
```

**根本原因**

VitePress 使用 Vue 编译 Markdown。Vue 会将 `{{ }}` 解析为 JavaScript 插值表达式。当文档中包含其他语法的花括号（如 Docker 模板 `{{.State.Pid}}`、bash 表达式等）时，会导致解析失败。

**解决方案**

| 场景 | 解决方案 | 示例 |
|------|----------|------|
| **代码块** | 使用 `::: v-pre` 容器包裹 | 见下方示例 |
| **表格中的行内代码** | 使用 HTML 实体转义 | `'&#123;&#123;.State.Pid&#125;&#125;'` |
| **普通行内代码** | 使用 `v-pre` 指令或 HTML 实体 | 同上 |

**代码块解决方案示例**

```markdown
::: v-pre

```bash
docker inspect -f '{{.State.Pid}}' <container>
tcpdump -i any 'tcp[tcpflags] & tcp-syn != 0'
```

:::
```

**HTML 实体参考**

| 字符 | HTML 实体 |
|------|-----------|
| `{` | `&#123;` |
| `}` | `&#125;` |
| `{{` | `&#123;&#123;` |
| `}}` | `&#125;&#125;` |

**相关案例**

- [2026-02-24-容器网络排查.md](docs/plan-1/2026-02-24-容器网络排查.md) - 多处代码块使用 `v-pre` 修复
