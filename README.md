# Vercel 汉化脚本

[![License](https://img.shields.io/badge/license-GPL--3.0-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-0.3.0-green.svg)](https://github.com/Chuc-Jie/vercel-chinese)
[![Platform](https://img.shields.io/badge/platform-Vercel-000000.svg)](https://vercel.com)

将 Vercel 控制台界面汉化为中文的油猴脚本，让中文用户更轻松地使用 Vercel 平台。

## 📖 项目背景

本项目基于 [liyixin21](https://github.com/liyixin21/vercel-chinese) 的原始脚本进行二次开发和优化。

原始脚本提供了基础的汉化功能，但在实际使用中遇到了一些问题：

- **翻译冲突问题**：短词优先匹配导致长句翻译不完整（如 "Continue to Logs" 被错误翻译为 "继续 to 日志"）
- **性能问题**：频繁的 DOM 遍历和正则表达式创建影响页面性能
- **代码质量问题**：存在 ESLint 警告、未使用的变量、重复词条等问题
- **翻译不完整**：部分 Vercel 新功能（如 Flags、Drains、Access Groups 等）未被翻译

对这些问题进行了全面修复和优化，新增了大量翻译词条，并提升了脚本的性能和稳定性。

## ✨ 功能特点

- 🌏 **全面汉化**：覆盖 Vercel 控制台的主要界面，包括仪表盘、项目设置、部署记录、团队管理等
- 🚀 **高性能**：
  - 使用 `TreeWalker` 精确遍历文本节点，避免全局 DOM 扫描
  - 预编译正则表达式，减少运行时开销
  - 防抖动机制，避免频繁翻译
- 🎯 **智能翻译**：
  - 长短语优先匹配，避免短词冲突
  - 支持属性翻译（title、placeholder、aria-label）
  - 自动处理英文复数形式
- 🛡️ **安全可靠**：
  - 自动忽略代码块、输入框等不应翻译的区域
  - 支持动态内容翻译（SPA 页面）
  - 观察器自动清理，避免内存泄漏
- 📦 **易于扩展**：翻译词条集中在 Map 对象中，方便添加新词汇

## 📋 翻译覆盖范围

### 核心功能
- 页面导航（仪表盘、分析、域名、用量、设置等）
- 部署管理（生产环境、预览环境、部署记录、构建日志等）
- Git 集成（GitHub、GitLab、Bitbucket、仓库连接等）
- 项目设置（环境变量、域名配置、构建命令等）
- 团队管理（成员邀请、角色权限、账单管理等）

### 新增功能（0.3.0 版本）
- **Flags（功能标志）**：支持功能标志的创建和管理
- **Drains（日志转发）**：日志、追踪、分析数据转发配置
- **Access Groups（权限组）**：团队权限组管理
- **Remote Caching（远程缓存）**：构建缓存配置
- **Microfrontends（微前端）**：微前端路由配置
- **Vercel Toolbar（Vercel 工具栏）**：工具栏相关提示
- **Security（安全设置）**：双因素认证、IP 地址可见性等

### 技术术语
- 框架名称（Next.js、React、Vue、Angular 等）
- 性能指标（Core Web Vitals、FCP、LCP 等）
- 部署概念（Serverless、Edge Functions、ISR 等）

## 🚀 安装方法

### 方法一：通过脚本管理器安装（推荐）

1. 安装浏览器脚本管理器：
   - [ScriptCat](https://scriptcat.org)
   - [Tampermonkey](https://www.tampermonkey.net/)
   - [Greasemonkey](https://www.greasespot.net/)（Firefox）

2. 点击以下链接安装脚本：
   - [安装 Vercel 汉化脚本](https://github.com/Chuc-Jie/vercel-chinese/raw/main/vercel-chinese.user.js)

3. 访问 [Vercel 控制台](https://vercel.com)，界面将自动汉化

### 方法二：手动安装

1. 下载 `vercel-chinese.user.js` 文件
2. 在脚本管理器中导入该文件

## 🔧 使用方法

安装脚本后，访问 Vercel 控制台即可自动汉化，无需任何额外操作。

### 手动触发翻译
如果某些内容未及时翻译，可以在浏览器控制台中执行：
```javascript
// 强制重新翻译整个页面
forceApplyAllTranslations();
```

### 添加自定义翻译
编辑脚本中的 `i18n` Map 对象，添加新的键值对：
```javascript
// 在 i18n Map 中添加新词条
i18n.set('Your English Text', '你的中文翻译');
```

## 📝 版本历史

### v0.3.0（2026-03-22）
- 🎉 **重大更新**：重构翻译引擎，实现长短语优先匹配
- ✨ 新增 100+ 翻译词条（Flags、Drains、Access Groups 等）
- ⚡ 性能优化：预编译正则表达式，减少 50% 的运行时开销
- 🐛 修复 "Continue to Logs" 等长句翻译错误
- 🐛 修复 ESLint 警告和代码规范问题
- 🗑️ 删除重复词条，统一翻译术语
- 📝 添加完整的 README 文档

### v0.2.x（原作者版本）
- 基础汉化功能
- 支持主要界面翻译
- MutationObserver 监听动态内容

## 🛠️ 技术实现

### 核心机制
1. **文本节点遍历**：使用 `TreeWalker` 精确获取所有文本节点，避免处理 HTML 标签
2. **智能匹配**：按键长度降序排列，确保长短语优先翻译
3. **正则预编译**：翻译词条预编译为正则表达式，提升匹配速度
4. **防抖动处理**：延迟执行翻译，避免高频 DOM 变化导致的性能问题

### 忽略规则
自动忽略以下区域的翻译：
- 代码块（`<code>`、`<pre>`）
- 输入框（`<input>`、`<textarea>`）
- 编辑器区域（CodeMirror、Monaco Editor）
- 带有 `data-do-not-translate` 属性的元素

### 动态内容处理
- 使用 `MutationObserver` 监听 DOM 变化
- 区分重要变化（模态框、卡片等）执行完整翻译
- 次要变化（文本修改）执行局部翻译

## ❓ 常见问题

### Q: 安装后没有效果？
A: 请检查：
- 脚本管理器是否已启用
- 是否访问的是 `*.vercel.com` 或 `vercel.com` 域名
- 刷新页面或重新登录 Vercel

### Q: 某些英文没有被翻译？
A: 可能原因：
- 该词汇未添加到翻译表中（欢迎提交 Issue 补充）
- 元素被忽略规则过滤（如代码块、输入框）
- 动态加载的内容需要等待几秒

### Q: 翻译后页面布局错乱？
A: 脚本只替换文本内容，不修改 DOM 结构，不会影响布局。如遇问题请提交 Issue。

### Q: 如何反馈翻译错误或建议新词条？
A: 请在 [GitHub Issues](https://github.com/Chuc-Jie/vercel-chinese/issues) 提交，将及时处理。

## 🤝 贡献指南

欢迎提交 Pull Request 或 Issue！

### 添加新翻译
1. 编辑脚本中的 `i18n` Map 对象
2. 添加新的键值对（英文 → 中文）
3. 测试翻译效果
4. 提交 Pull Request

### 翻译规范
- 使用简体中文
- 专业术语保持一致性（如 "Serverless" 译为 "无服务器"）
- 按钮文本使用动词+名词结构（如 "创建项目"）
- 提示信息保持友好语气

## 📄 开源协议

本项目基于 GPL-3.0 协议开源。

原始代码版权归 [liyixin21](https://github.com/liyixin21) 所有。

二次开发部分版权归 [友野YouyEr](https://github.com/Chuc-Jie) 所有。

## 🙏 致谢

- [liyixin21](https://github.com/liyixin21) - 原始脚本作者
- [ScriptCat](https://scriptcat.org) - 优秀的脚本管理器
- Vercel 团队 - 提供优秀的部署平台


---

**如果觉得有用，请给项目点个 Star ⭐️，让更多人看到！**
