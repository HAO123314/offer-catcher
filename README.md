# Offer 捕手

Offer 捕手是一款面向大学生和研究生求职场景的 AI 岗位匹配智能体。用户可以上传 PDF / DOCX 简历，选择内置岗位或粘贴自定义 JD，系统将解析简历并通过 DeepSeek 生成结构化岗位匹配报告与简历优化建议。

## 技术栈

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Next.js Route Handler
- DeepSeek API
- `pdf-parse`：PDF 简历解析
- `mammoth`：DOCX 简历解析
- Vercel

## 本地运行

项目要求 Node.js `22.3.0` 或更高版本。

```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000) 使用应用。

可通过以下命令检查类型和生产构建：

```bash
npm run typecheck
npm run build
```

## 环境变量

复制 `.env.example` 为 `.env.local`，并填写有效的 DeepSeek API Key：

```bash
DEEPSEEK_API_KEY=your_api_key_here
DEEPSEEK_API_BASE_URL=https://api.deepseek.com
DEEPSEEK_MODEL=deepseek-chat
```

`DEEPSEEK_API_KEY` 仅在服务端 Route Handler 调用链中读取，不会暴露到浏览器。

## Vercel 部署

1. 将项目推送到 GitHub、GitLab 或 Bitbucket。
2. 在 Vercel 中导入项目，Framework Preset 选择 Next.js。
3. 在项目 Settings → Environment Variables 中配置上述三个 DeepSeek 环境变量。
4. 使用默认构建命令 `npm run build` 完成部署。
5. 部署后使用示例简历完成一次分析，确认 DeepSeek API 与 `/api/analyze` 正常工作。

项目使用 Node.js Route Handler 解析文件，并为分析接口配置了最长 60 秒执行时间。上传文件仅在单次请求中解析，不写入数据库或持久化存储。

## 功能说明

- 上传 PDF / DOCX 简历并解析文本
- 一键加载示例简历
- 选择 6 个内置岗位或手动编辑岗位 JD
- 展示岗位关键词
- 调用 DeepSeek 生成结构化匹配分析
- 展示综合评分、多维度评分、优势、短板与关键词覆盖
- 生成简历优化建议、经历改写、岗位定制摘要与面试建议
- 一键复制优化后的经历与个人摘要
- 提供 loading、输入校验和错误反馈
- 响应式适配桌面端与移动端

## 后续可迭代方向

- 简历在线编辑与版本管理
- 多岗位匹配结果对比
- 简历优化前后评分对比
- 导出 PDF 分析报告
- 接入真实岗位数据
- 多轮求职顾问对话
- 英文简历分析与优化
- 面试问题预测和回答建议

## 隐私与结果说明

上传的简历仅用于本次匹配分析，Demo 不会长期保存简历文件。AI 分析结果仅供求职准备参考，不代表真实企业筛选结果。
