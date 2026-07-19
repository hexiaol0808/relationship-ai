# 开发路线图

目标：7-14 天内上线一个真实用户可用的"亲密关系 AI 问卷网站 MVP"。
详细范围见 [MVP_SCOPE.md](./MVP_SCOPE.md)。

## Phase 1 — 内容设计（预计 1-2 天）【架构已完成，2026-07-08 冻结】

- [x] 定稿 15 道问卷题目与 ABCDE(+F) 选项 → QUESTIONNAIRE_OPTIONS.md
- [x] 确定每题背后对应的分析维度 → REPORT_ANALYSIS_ENGINE.md（7核心变量+10模块结构）
- [x] 定稿 AI 报告的 10 个模块结构与语气要求 → REPORT_ANALYSIS_ENGINE.md + REPORT_TONE_GUIDELINES.md
- [x] 写出第一版 Prompt 模板 → REPORT_SYSTEM_PROMPT_V1.md + REPORT_INPUT_TEMPLATE_V1.md

**Phase 1.1 — 安全与语言约束【已完成】**：单侧数据硬规则、六大语义族禁止表达规则（含同义词族）、4组样本压测（含高风险误判型）验证通过，压测中发现的分析引擎缺口（候选池动态模式识别）与文字生成问题（比喻重复）已修复。

**Phase 1.2 — 鲁棒性验证【已完成，2026-07-16】**：32组自动化压测（达到30-50目标区间），13维度failure taxonomy统计。结论：12/13维度全程0问题；唯一真实发现（Module 10的G1对照约50%概率被漏写）已定位根因并修复——从"融入自由文本"改成Output Contract里必须存在的结构化字段`g1_alignment`，修复后连续24组验证0漏写。输出截断等操作层问题留待Phase 2用真实API验证。**Phase 1 全部完成，可以进入 Phase 2。**

**相关文档**：QUESTIONNAIRE_V3_STRUCTURE.md（测量架构冻结+证据语言）、EXPERIMENTAL_QUESTION_BANK.md（退役/实验构念存档）、PROMPT_STRESS_TEST_V1.md / PROMPT_STRESS_TEST_BATCH2.md / PROMPT_STRESS_TEST_BOUNDARY.md / PHASE_1_2_BULK_TEST_LOG.md（四轮压测完整记录）。

## Phase 2 — 技术栈搭建（预计 1 天）【已完成，2026-07-19】
- [x] 初始化 Next.js 项目 → 仓库根目录，原有内容文档移至 docs/
- [x] 在 Supabase 建 `reports` 表（按 MVP_SCOPE.md 中的数据结构）→ supabase/schema.sql
- [x] 配置 Claude / OpenAI 的 API Key（仅服务器端环境变量）→ .env.local（gitignored），两个 provider 均已实测调通
- [x] 搭建"可切换 Provider"的 AI 生成层 → lib/ai/（registry 模式，AI_PROVIDER 环境变量切换，当前默认 openai）
- [x] 打通 Vercel 部署管道 → GitHub (hexiaol0808/relationship-ai) 接 Vercel 自动部署，线上地址 https://relationship-ai-snowy.vercel.app，首页与 /api/test-ai 均已验证 200

**踩坑记录**：中国大陆不在 Anthropic / OpenAI 官方支持地区列表内，两边账号最初都遇到充值/付款失败，非 VPN 能稳定绕过的问题（Stripe 会同时核对账单地址与发卡国）；后续用户自行解决了充值，两个 provider 现在都能正常调用。若未来又遇到同样的支付问题，可考虑接入境内可用模型（DeepSeek / 智谱 GLM / Kimi / 通义千问），现有 provider 抽象层加一个新文件即可，无需改调用方代码。

**Phase 2 全部完成，可以进入 Phase 3。**

## Phase 3 — 核心功能开发（预计 2-3 天）【已完成，2026-07-19】
- [x] 问卷交互页面（15 题，移动端优先，支持 ABCDE + F 自由输入）→ app/questionnaire/，题目数据源 lib/questions.ts
- [x] 提交逻辑：写入 Supabase，生成 `report_id` → app/api/generate-report/route.ts，report_id 冲突自动重试
- [x] 调用 AI 生成层生成报告，存入 `full_report` / `summary` / `model_used` → lib/report-prompt.ts（内嵌完整 system prompt）+ jsonMode
- [x] 报告展示页（专属链接访问）→ app/report/[id]/page.tsx，10 模块完整渲染
- [x] 一键生成分享图功能 → app/report/[id]/opengraph-image.tsx（next/og 原生方案）
- [x] 可选邮箱留资入口 + "邀请 TA 也来测"入口 → 问卷最后一屏 + 报告页底部

**验证方式**：本地用 Playwright（系统 Chrome，headless）实际点击走完全部 15 题（含选二排序、CP3 两步交互、F 自由文本路径），确认"提交"按钮正确解锁、全程 0 个 console error；另用 curl 直接调 `/api/generate-report` 提交一组完整答案触发**真实 OpenAI 调用**，产出合法 10 模块 JSON，Module 10 的 `g1_alignment` 字段存在且取值合法（"互补"）——这是 Phase 1.2 压测中唯一发现过会被漏写的字段，此次验证通过。分享图路由确认返回合法 1200×630 PNG。代码已推送并在 Vercel 生产环境验证 `/`、`/questionnaire`、`/report/[id]`、分享图路由均可访问。

**踩坑记录**：本机 `npx playwright install chromium` 因网络问题（同样疑似跟 VPN 环境有关）反复卡死在下载阶段，改为让 Playwright 直接复用系统已安装的 Google Chrome（`channel: "chrome"`）绕过下载，才跑通浏览器端自动化验证。

**未覆盖**：没有在真实移动设备上走查（浏览器自动化用的是桌面视口），移动端体验细节留给 Phase 4。

**Phase 3 全部完成，可以进入 Phase 4。**

## Phase 4 — 测试与打磨（预计 2-3 天）
- 找 5-10 个真实用户/朋友完整走一遍流程
- 收集反馈：报告是否准确、是否有洞察、是否"感觉被理解"
- 修正报告质量、移动端体验问题、文案细节

## Phase 5 — 上线准备（预计 1 天）
- 绑定正式域名
- 最终检查 API Key 安全性（确认前端代码不含任何密钥）
- 移动端最终走查

## Phase 6 — 上线与获客（持续）
- 正式发布，生成可公开访问的网址
- 配合小红书内容做冷启动
- 观察数据（完成率、分享率、留邮箱率），收集反馈迭代下一版

## 今天（Day 1）要完成的事
今天只做 **Phase 1 的第一步**：定稿 15 道问卷题目。
不涉及任何代码，目标是产出一份双方都认可的题目文案。
