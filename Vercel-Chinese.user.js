// ==UserScript==
// @name         Vercel 汉化
// @namespace    https://github.com/Chuc-Jie/vercel-chinese
// @version      0.3.0
// @description  汉化 Vercel 界面
// @author       友野YouyEr（原作者：liyixin21）
// @icon         https://assets.vercel.com/image/upload/v1607554385/repositories/vercel/logo.png
// @match        *://*.vercel.app/*
// @match        *://vercel.com/*
// @match        *://*.vercel.com/*
// @grant        none
// @noframes
// @license      GPL-3.0
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // 需要忽略的元素选择器
    const ignoredSelectors = [
        'code', 'pre', 'script', 'style', 'textarea', 'kbd',
        '.CodeMirror', '.monaco-editor', '.cm-editor', '.codemirror-textarea',
        'input[type="text"]', 'input[type="password"]', 'input[type="email"]',
        '[data-do-not-translate]', '[data-translation-ignore]'
    ];
    
    // 需要忽略的特定元素的类名或ID
    const ignoredClasses = [
        'CodeBlock', 'gitSha', 'deployment-url', 'geist-code', 'monospace',
        'build-log', 'runtime-log', 'function-log', 'terminal-output', 'edge-log'
    ];

    // Vercel界面中常见的英文词汇及其中文翻译
    const i18n = new Map([
        // 页面顶部导航
        ['Dashboard', '仪表盘'],
        ['Analytics', '分析'],
        ['Domains', '域名'],
        ['Usage', '用量'],
        ['Settings', '设置'],
        ['Feedback', '反馈'],
        ['Help', '帮助'],
        ['Log Out', '退出登录'],

        // 部署相关
        ['Production', '生产环境'],
        ['Preview', '预览环境'],
        ['Development', '开发环境'],
        ['Preview Deployment', '预览部署'],
        ['Development Deployment', '开发部署'],
        ['Deploy', '部署'],
        ['Deployments', '部署记录'],
        ['Redeploy', '重新部署'],
        ['Delete', '删除'],
        ['Visit', '访问'],
        ['Created', '创建于'],
        ['Deployed', '已部署'],
        ['Deploying', '部署中'],
        ['Building', '构建中'],
        ['Deployment', '部署'],
        ['Deployment Status', '部署状态'],
        ['Latest Deployments', '最新部署'],
        ['View Build Logs', '查看构建日志'],
        ['Deployment failed', '部署失败'],
        ['Deployment canceled', '部署已取消'],
        ['Deployment succeeded', '部署成功'],
        
        // Git集成
        ['Commit', '提交'],
        ['Branch', '分支'],
        ['Pull Request', '拉取请求'],
        ['Repository', '代码仓库'],
        ['Connect Git Repository', '连接Git仓库'],
        ['GitHub', 'GitHub'],
        ['GitLab', 'GitLab'],
        ['Bitbucket', 'Bitbucket'],
        ['Connected', '已连接'],
        ['Disconnect', '断开连接'],
        ['Clone', '克隆'],
        ['Main Branch', '主分支'],
        ['Deploy Hook', '部署钩子'],
        ['Create Hook', '创建钩子'],
        
        // 项目设置
        ['Project Settings', '项目设置'],
        ['General', '常规'],
        ['Environment Variables', '环境变量'],
        ['Integration', '集成'],
        ['Integrations', '集成服务'],
        ['Project ID', '项目ID'],
        ['Framework', '框架'],
        ['Root Directory', '根目录'],
        ['Build Command', '构建命令'],
        ['Output Directory', '输出目录'],
        ['Install Command', '安装命令'],
        ['Development Command', '开发命令'],
        
        // 团队和成员
        ['Team', '团队'],
        ['Teams', '团队'],
        ['Members', '成员'],
        ['Invite Member', '邀请成员'],
        ['Roles', '角色'],
        ['Owner', '所有者'],
        ['Member', '成员'],
        ['Billing', '账单'],
        ['Pending Invitations', '待处理邀请'],
        ['Remove Member', '移除成员'],
        ['Transfer Ownership', '转让所有权'],
        ['Leave Team', '离开团队'],
        
        // 状态和通知
        ['Success', '成功'],
        ['Error', '错误'],
        ['Warning', '警告'],
        ['Ready', '就绪'],
        ['Canceled', '已取消'],
        ['Queued', '排队中'],
        ['Notification', '通知'],
        ['Notifications', '通知'],
        ['Email Notifications', '邮件通知'],
        ['Enable', '启用'],
        ['Disable', '禁用'],
        
        // 按钮和操作
        ['Save', '保存'],
        ['Cancel', '取消'],
        ['Confirm', '确认'],
        ['Add', '添加'],
        ['Remove', '移除'],
        ['Create', '创建'],
        ['Edit', '编辑'],
        ['Update', '更新'],
        ['Continue', '继续'],
        ['Back', '返回'],
        ['Next', '下一步'],
        ['Previous', '上一步'],
        ['Submit', '提交'],
        ['Apply', '应用'],
        ['Copy', '复制'],
        ['Copied!', '已复制!'],
        ['Download', '下载'],
        ['Upload', '上传'],
        
        // 项目创建和导入
        ['New Project', '新项目'],
        ['Import Git Repository', '导入 Git 仓库'],
        ['Import', '导入'],
        ['Template', '模板'],
        ['Templates', '模板'],
        ['Project Name', '项目名称'],
        ['Create New Project', '创建新项目'],
        ['Import Project', '导入项目'],
        ['Deploy Template', '部署模板'],
        ['Select Template', '选择模板'],
        
        // 通用词汇
        ['Loading', '加载中'],
        ['Documentation', '文档'],
        ['Learn More', '了解更多'],
        ['Configure', '配置'],
        ['Status', '状态'],
        ['Overview', '概览'],
        ['More Info', '更多信息'],
        ['Details', '详情'],
        ['Close', '关闭'],
        ['Open', '打开'],
        ['Show', '显示'],
        ['Hide', '隐藏'],
        ['Search', '搜索'],
        ['Filter', '筛选'],
        ['Sort', '排序'],
        ['Refresh', '刷新'],
        ['View', '查看'],
        ['Manage', '管理'],
        
        // 2026-03-22 新增词汇
        ['All projects', '所有项目'],
        ['Alerts', '警报'],
        ['AI Gateway', '人工智能门户'],
        ['Sandboxes', '沙盒'],
        ['Agent', '代理'],
        ['Tasks', '任务'],
        ['Product', '产品'],
        ['Networking', '网络'],
        ['Fast Data Transfer', '快速数据传输'],
        ['Regions', '区域'],
        ['Direction', '地区'],
        ['Microfrontends Routing', '微前端路由'],
        ['Continue to Logs', '继续查看日志'],
        ['Choose a project to continue', '选择一个项目以继续'],
        ['Find Project…', '查找项目…'],
        ['Team Name', '团队名称'],
        ['Team URL', '团队链接'],
        ['Team Avatar', '团队头像'],
        ['Vercel Toolbar', 'Vercel 工具栏'],
        ['Data Preferences', '数据偏好'],
        ['Build and Deployment', '构建与部署'],
        ['On-Demand Concurrent Builds', '按需并发构建'],
        ['Search Projects', '搜索项目'],
        ['Build Machines', '构建机器'],
        ['Remote Caching', '远程缓存'],
        ['Remote caching is enabled.', '远程缓存已开启。'],
        ['Remote caching allows you to share a single cache across multiple machines.', '远程缓存允许您在多台机器之间共享单个缓存。'],
        ['build queue', '构建队列'],
        ['build deployments', '构建部署'],
        ['Run all builds immediately', '立即运行所有构建'],
        ['or learn more about', ' 或 详细了解'],
        ['Learn more about', '详细理解'],
        ['Skip', '跳过'],
        ['Immediate', '立即'],
        ['Per branch', '每个分支'],
        ['Access Groups', '权限组'],
        ['Create and manage Access Groups.', '创建和管理权限组。'],
        ['Learn more', '了解更多'],
        ['Upgrade to Enterprise', '升级至企业版'],
        ['Create access groups to more easily manage project roles.', '创建访问组以更轻松地管理项目角色。'],
        ['Contact Sales', '联系销售'],
        ['Drains', '日志转发'],
        ['Forward Logs, Traces, Speed Insights, and Analytics to third-party providers or your own custom endpoints.', '将日志、追踪、速度洞察和分析数据转发至第三方提供商或您自己的自定义端点。'],
        ['Get started with Drains', '开始使用日志转发'],
        ['Upgrade to Pro to create your first Drain.', '升级至专业版以创建您的第一个日志转发。'],
        ['Webhooks', 'Webhook'],
        ['Add Webhooks', '添加 Webhook'],
        ['This feature is available on the Pro plan.', '此功能在专业版计划中可用。'],
        ['Privacy', '隐私'],
        ['Two-Factor Authentication Enforcement', '双因素认证强制要求'],
        ['Require two-factor authentication (2FA) for members of your team. Team members who do not have 2FA will not be able access your team, but will remain a member. Visit the team members page to view the 2FA status of each member.', '要求团队成员启用双因素认证（2FA）。未启用2FA的团队成员将无法访问您的团队，但仍会保留成员身份。请访问团队成员页面查看每位成员的2FA状态。'],
        ['To prevent workflow disruptions, configure two-factor authentication on all user-managed accounts prior to enforcement. Any CI/CD pipeline tokens associated with users who do not have two-factor authentication enabled will cease to work.', '为避免工作流中断，请在强制执行前为所有用户管理的账户配置双因素认证。任何与未启用双因素认证的用户关联的 CI/CD 流水线令牌将停止工作。'],
        ['Learn more about', '了解更多关于'],
        ['Two-Factor Authentication enforcement', '双因素认证强制要求'],
        ['IP Address Visibility', 'IP 地址可见性'],
        ['IP addresses are currently visible in the Vercel Dashboard.', 'IP 地址目前在 Vercel 控制台中可见。'],
        ['IP addresses are currently visible in your Log Drains.', 'IP 地址目前在您的日志转发中可见。'],
        ['Microfrontends', '微前端'],
        ['Connectivity', '连接性'],
        ['My Notifications', '我的通知'],
        ['All types', '所有类型'],
        ['Boolean', '布尔值'],
        ['String', '字符串'],
        ['Number', '数字'],
        ['Search flags...', '搜索功能标志...'],
        ['Flags', '功能标志'],
        ['No flags found', '未找到功能标志'],
        ['Create flags at the project level to manage feature releases. Learn more', '在项目级别创建功能标志以管理功能发布。了解更多'],
        ['Marketplace Providers', '市场提供商'],
        ['Create feature flags and experiments', '创建功能标志和实验'],
        ['Set up a provider to start creating feature flags and experiments.', '设置提供商以开始创建功能标志和实验。'],
        ['Projects', '项目'],
        ['Project', '项目'],
        ['Activity', '活动'],
        ['Recent Activity', '最近活动'],
        ['All Projects', '所有项目'],
        ['No projects found', '未找到项目'],
        ['Search projects...', '搜索项目...'],
        ['Create a New Project', '创建新项目'],
        ['Your Projects', '您的项目'],
        ['Last updated', '最后更新'],
        ['Last deployed', '最后部署'],
        
        // 部署详情
        ['Deployment Details', '部署详情'],
        ['Source', '源码'],
        ['Runtime', '运行时'],
        ['Build Logs', '构建日志'],
        ['Function Logs', '函数日志'],
        ['Edge Function Logs', '边缘函数日志'],
        ['View Function Logs', '查看函数日志'],
        ['View Edge Function Logs', '查看边缘函数日志'],
        ['Runtime Logs', '运行时日志'],
        ['View Runtime Logs', '查看运行时日志'],
        ['API Endpoints', 'API端点'],
        ['Serverless Functions', '无服务器函数'],
        ['Edge Functions', '边缘函数'],
        ['Edge Middleware', '边缘中间件'],
        ['Cache', '缓存'],
        
        // 环境变量
        ['Add Environment Variable', '添加环境变量'],
        ['Name', '名称'],
        ['Value', '值'],
        ['Environments', '环境'],
        ['Production Only', '仅生产环境'],
        ['All Environments', '所有环境'],
        ['Preview Only', '仅预览环境'],
        ['Development Only', '仅开发环境'],
        ['Environment Variable', '环境变量'],
        ['Plain Text', '纯文本'],
        ['Secret', '密钥'],
        ['System Environment Variables', '系统环境变量'],
        ['User Environment Variables', '用户环境变量'],
        
        // 域名设置
        ['Add Domain', '添加域名'],
        ['Domain Name', '域名名称'],
        ['Primary Domain', '主域名'],
        ['Set as Primary Domain', '设为主域名'],
        ['Verify Domain', '验证域名'],
        ['DNS Settings', 'DNS设置'],
        ['Invalid Domain', '无效域名'],
        ['Pending Verification', '等待验证'],
        ['SSL Certificate', 'SSL证书'],
        ['Auto-renewed', '自动续期'],
        ['Custom Domains', '自定义域名'],
        ['Generated Domains', '生成的域名'],
        ['Domain Configuration', '域名配置'],
        ['Redirect', '重定向'],
        ['Redirects', '重定向'],
        ['Rewrites', '重写'],
        ['Headers', '标头'],
        ['Add Redirect', '添加重定向'],
        ['Add Rewrite', '添加重写'],
        ['Add Header', '添加标头'],
        ['Source Path', '源路径'],
        ['Destination Path', '目标路径'],
        ['Status Code', '状态码'],
        
        // 计划和付费
        ['Hobby', '业余'],
        ['Pro', '专业版'],
        ['Enterprise', '企业版'],
        ['Free', '免费'],
        ['Usage Metrics', '使用指标'],
        ['Bandwidth', '带宽'],
        ['Build Minutes', '构建分钟'],
        ['Upgrade Plan', '升级计划'],
        ['Billing Period', '账单周期'],
        ['Payment Method', '支付方式'],
        ['Billing Email', '账单邮箱'],
        ['Invoice', '发票'],
        ['Invoices', '发票'],
        ['Current Plan', '当前计划'],
        ['Team Member', '团队成员'],
        ['Concurrency', '并发'],
        ['Execution Timeout', '执行超时'],
        ['Included', '已包含'],
        ['Analytics Retention', '分析数据保留'],
        ['SFTP Access', 'SFTP访问'],
        
        // 账户和安全
        ['Account', '账户'],
        ['Account Settings', '账户设置'],
        ['Profile', '个人资料'],
        ['Username', '用户名'],
        ['Email', '电子邮件'],
        ['Password', '密码'],
        ['Change Password', '修改密码'],
        ['Current Password', '当前密码'],
        ['New Password', '新密码'],
        ['Confirm Password', '确认密码'],
        ['Two-Factor Authentication', '双因素认证'],
        ['Security', '安全'],
        ['API Tokens', 'API令牌'],
        ['Personal Account', '个人账户'],
        ['Team Account', '团队账户'],
        ['Create Token', '创建令牌'],
        ['Token Name', '令牌名称'],
        ['Token Permissions', '令牌权限'],
        ['Read-only', '只读'],
        ['Full Access', '完全访问'],
        
        // 框架和技术术语
        ['Next.js', 'Next.js'],
        ['React', 'React'],
        ['Vue', 'Vue'],
        ['Angular', 'Angular'],
        ['Nuxt', 'Nuxt'],
        ['Static Site', '静态站点'],
        ['Node.js', 'Node.js'],
        ['Gatsby', 'Gatsby'],
        ['Svelte', 'Svelte'],
        ['Astro', 'Astro'],
        ['WordPress', 'WordPress'],
        ['Hugo', 'Hugo'],
        ['Ruby on Rails', 'Ruby on Rails'],
        ['Python', 'Python'],
        ['Docker', 'Docker'],
        ['Static Site Generator', '静态站点生成器'],
        ['Server-Side Rendering', '服务器端渲染'],
        ['Static Generation', '静态生成'],
        ['Incremental Static Regeneration', '增量静态再生'],
        ['API Routes', 'API路由'],
        ['Serverless', '无服务器'],
        ['Monorepo', '单体仓库'],
        
        // 其他常用
        ['Dark Mode', '暗色模式'],
        ['Light Mode', '亮色模式'],
        ['System', '跟随系统'],
        ['Create Team', '创建团队'],
        ['Switch Team', '切换团队'],
        ['Connected Services', '关联服务'],
        ['Get Started', '开始使用'],
        ['Support', '支持'],
        ['Changelog', '更新日志'],
        
        // Vercel特有的功能和概念
        ['Speed Insights', '速度洞察'],
        ['Web Vitals', 'Web指标'],
        ['Core Web Vitals', '核心Web指标'],
        ['First Contentful Paint', '首次内容绘制'],
        ['Largest Contentful Paint', '最大内容绘制'],
        ['First Input Delay', '首次输入延迟'],
        ['Cumulative Layout Shift', '累积布局偏移'],
        ['Time to First Byte', '首字节时间'],
        ['Interaction to Next Paint', '交互到下一次绘制'],
        ['Real User Monitoring', '真实用户监控'],
        ['Device', '设备'],
        ['Mobile', '移动设备'],
        ['Desktop', '桌面设备'],
        ['Browser', '浏览器'],
        ['Country', '国家'],
        ['Region', '地区'],
        ['Edge Network', '边缘网络'],
        ['CDN', 'CDN'],
        ['Caching', '缓存'],
        ['Hosting', '托管'],
        ['Logs', '日志'],
        
        // 更多专业术语
        ['Continuous Integration', '持续集成'],
        ['Continuous Deployment', '持续部署'],
        ['CI/CD', 'CI/CD'],
        ['Infrastructure', '基础设施'],
        ['Configuration', '配置'],
        ['Monitoring', '监控'],
        ['Logging', '日志记录'],
        ['Performance', '性能'],
        ['Scaling', '扩展'],
        ['Autoscaling', '自动扩展'],
        ['Load Balancing', '负载均衡'],
        ['High Availability', '高可用性'],
        ['Disaster Recovery', '灾难恢复'],
        ['Backup', '备份'],
        ['Restore', '恢复'],
        ['Migration', '迁移'],
        ['Rollback', '回滚'],
        ['Versioning', '版本控制'],
        
        // 词条
        ['Deployment Configuration', '部署配置'],
        ['Fluid Compute', '流畅计算'],
        ['Deployment Protection', '部署保护'],
        ['Slow Protection', '慢保护'],
        ['To update your Production Deployment, push to the', '要更新您的生产部署，请推送到'],
        ['branch.', '分支。'],
        ['Track visitors and page views', '跟踪访问者和页面浏览量'],
        ['Edge Requests', '边缘请求'],
        ['Function Invocations', '函数调用'],
        ['错误 Rate', '错误率'],
        ['Error Rate', '错误率'],
        ['requests','请求'],
        ['denied', '被拒绝'],
        ['challenged', '被质询'],
        ['Firewall', '防火墙'],
        ['Active Branches', '活跃分支'],
        ['No Preview Deployments', '没有预览部署'],
        ['No 预览部署', '没有预览部署'],
        ['Commit using our Git connections.', '使用我们的Git连接提交。'],
        ['All systems normal', '所有系统正常'],
        ['Instant Rollback', '即时回滚'],
        ['Observability', '可观测性'],
        ['Storage', '存储'],
        ['hours', '小时'],
        ['minutes', '分钟'],
        ['seconds', '秒'],
        ['days', '天'],
        ['weeks', '周'],
        ['months', '月'],
        ['years', '年'],
        ['排序 由 activity', '按活动排序'],
        ['排序 由 name', '按名称排序'],
        ['搜索 Repositories and 项目...', '搜索存储库和项目...'],
        ['Find Team...', '搜索团队...'],
        ['Find Project...', '搜索项目...'],
        ['Recent Previews', '近期预览'],
        ['What do you need?', '您需要什么？'],
        ['Upgrade to 专业版', '升级到专业版'],
        ['Theme', '主题'],
        ['Command Menu', '命令菜单'],
        ['首页 Page', '主页'],
        ['创建 new 团队', '创建新团队'],
        ['Change Theme...', '更改主题...'],
        ['复制 Current URL', '复制当前URL'],
        ['Navigation', '导航'],
        ['Go to', '前往'],
        ['Quick 复制', '快速复制'],
        ['Scope 设置...', '范围设置...'],
        ['Switch Scope...', '切换范围...'],
        ['搜索 文档...', '搜索文档...'],
        ['联系我们 支持', '联系支持'],
        ['Send 反馈...', '发送反馈...'],
        ['Developer Tools', '开发者工具'],
        ['搜索 开发者工具', '搜索开发者工具'],
        
        // 精确匹配长句
        ['Firewall is active', '防火墙已激活'],
        ['应用', '应用'],
        ['ago', '前'],
        ['by', '由'],
        ['Home', '首页'],
        ['Contact', '联系我们'],
        ['Legal', '法律条款'],
        ['Guides', '指南'],
        ['hidden files', '隐藏文件'],
        
        // 工具栏相关
        ['Visit with Toolbar', '使用工具栏访问'],
        ['Scan this QR code to open with the toolbar on a different device:', '扫描此二维码在其他设备上使用工具栏打开：'],
        ['Get easy access to the toolbar on your production deployments:', '在您的生产部署中轻松访问工具栏：'],
        ['Install Extension', '安装扩展'],
        ['Get detailed performance metrics', '获取详细性能指标'],
        ['enabling Speed Insights', '启用速度洞察'],
        ['Function CPU', '函数CPU'],
        ['Basic', '基础版'],
        ['vCPU', '虚拟CPU'],
        ['GB Memory', 'GB内存'],
        ['Standard Protection', '标准保护'],
        ['Skew Protection', '偏差保护'],
        ['Disabled', '已禁用'],
        ['Store', '存储'],
        ['Domain', '域名'],
    ]);

    // ---------- 排序键列表和正则表达式预编译 ----------
    let sortedKeys = [];
    let compiledRegexes = new Map();

    function updateSortedKeys() {
        sortedKeys = Array.from(i18n.keys()).sort((a, b) => b.length - a.length);
        // 预编译正则表达式，提升性能
        compiledRegexes.clear();
        for (const key of sortedKeys) {
            compiledRegexes.set(key, new RegExp(escapeRegExp(key), 'g'));
        }
    }
    
    // 初始化排序
    updateSortedKeys();

    // 定时器变量
    let fullTranslationTimer = null;
    let translationTimer = null;
    let specialTranslationTimer = null;

    // 初始页面文本替换
    setTimeout(() => {
        forceApplyAllTranslations();
    }, 800);
    
    // 监听 DOM 变更
    const bodyObserver = new MutationObserver(mutations => {
        clearTimeout(translationTimer);
        translationTimer = setTimeout(() => {
            processMutations(mutations);
        }, 100);
    });

    bodyObserver.observe(document.body, { 
        childList: true, 
        subtree: true,
        characterData: true,
        attributes: true,
        attributeFilter: ['title', 'placeholder', 'aria-label']
    });

    // 页面卸载时断开观察器
    window.addEventListener('beforeunload', () => {
        bodyObserver.disconnect();
        if (specialObservers && specialObservers.length) {
            specialObservers.forEach(observer => observer.disconnect());
        }
    });

    let specialObservers = [];

    // 是否应该忽略节点
    function shouldIgnoreNode(node) {
        if (!node || node.nodeType !== 1) return false;
        
        if (ignoredSelectors.some(selector => node.matches && node.matches(selector))) {
            return true;
        }
        
        if (node.className && typeof node.className === 'string') {
            if (ignoredClasses.some(cls => node.className.includes(cls))) {
                return true;
            }
        }
        
        let parent = node.parentNode;
        while (parent && parent !== document.body) {
            if (parent.nodeType === 1) {
                if (ignoredSelectors.some(selector => parent.matches && parent.matches(selector))) {
                    return true;
                }
                if (parent.className && typeof parent.className === 'string') {
                    if (ignoredClasses.some(cls => parent.className.includes(cls))) {
                        return true;
                    }
                }
            }
            parent = parent.parentNode;
        }
        
        return false;
    }

    // 增强的转义函数
    function escapeRegExp(string) {
        return string.replace(/[.*+?^${}()|[\]\\\-/]/g, '\\$&');
    }

    // 翻译单个文本节点（使用预编译的正则表达式）
    function translateTextNode(node) {
        if (!node || !node.nodeValue || !node.nodeValue.trim()) return;
        
        if (node.parentNode && shouldIgnoreNode(node.parentNode)) {
            return;
        }
        
        let text = node.nodeValue;
        let translated = false;

        for (const key of sortedKeys) {
            const regex = compiledRegexes.get(key);
            if (regex && regex.test(text)) {
                const value = i18n.get(key);
                text = text.replace(regex, value);
                translated = true;
            }
        }
        
        if (translated) {
            node.nodeValue = text;
        }
    }

    // 翻译元素属性（使用预编译的正则表达式）
    function translateAttribute(element, attrName) {
        if (!element || !element.hasAttribute(attrName)) return;
        
        const attrValue = element.getAttribute(attrName);
        if (!attrValue || !attrValue.trim()) return;
        
        let newValue = attrValue;
        let translated = false;

        for (const key of sortedKeys) {
            const regex = compiledRegexes.get(key);
            if (regex && regex.test(newValue)) {
                const value = i18n.get(key);
                newValue = newValue.replace(regex, value);
                translated = true;
            }
        }
        
        if (translated) {
            element.setAttribute(attrName, newValue);
        }
    }

    // 替换文本函数
    function replaceText(rootNode) {
        if (!rootNode || shouldIgnoreNode(rootNode)) return;
        
        const textWalker = document.createTreeWalker(
            rootNode,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
                    if (node.parentNode && shouldIgnoreNode(node.parentNode)) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    return NodeFilter.FILTER_ACCEPT;
                }
            },
            false
        );
        
        let textNode;
        while ((textNode = textWalker.nextNode()) !== null) {
            translateTextNode(textNode);
        }
        
        const elementWalker = document.createTreeWalker(
            rootNode,
            NodeFilter.SHOW_ELEMENT,
            {
                acceptNode: function(node) {
                    if (shouldIgnoreNode(node)) return NodeFilter.FILTER_REJECT;
                    return NodeFilter.FILTER_ACCEPT;
                }
            },
            false
        );
        
        let element;
        while ((element = elementWalker.nextNode()) !== null) {
            if (element.hasAttribute('title')) {
                translateAttribute(element, 'title');
            }
            
            if (element.hasAttribute('placeholder')) {
                translateAttribute(element, 'placeholder');
            }
            
            if (element.hasAttribute('aria-label')) {
                translateAttribute(element, 'aria-label');
            }
            
            if ((element.tagName === 'INPUT' || element.tagName === 'BUTTON') && 
                element.hasAttribute('value') && 
                !element.getAttribute('type') === 'password') {
                translateAttribute(element, 'value');
            }
        }
    }

    // 全面翻译方法
    function forceApplyAllTranslations() {
        replaceText(document.body);
        handleSpecialElements();
        
        document.querySelectorAll('button, a.button, [role="button"]').forEach(btn => {
            if (!shouldIgnoreNode(btn)) {
                Array.from(btn.childNodes).forEach(node => {
                    if (node.nodeType === 3) {
                        translateTextNode(node);
                    }
                });
            }
        });
        
        document.querySelectorAll('nav, header, h1, h2, h3, .title, .header, .navigation').forEach(el => {
            if (!shouldIgnoreNode(el)) {
                Array.from(el.childNodes).forEach(node => {
                    if (node.nodeType === 3) {
                        translateTextNode(node);
                    }
                });
            }
        });
        
        const problemElements = [
            'Visit with Toolbar',
            'Scan this QR code',
            'Get easy access',
            'Install Extension',
            'Get detailed performance metrics',
            'Function CPU',
            'vCPU',
            'Memory',
            'Standard Protection',
            'Skew Protection',
            'Disabled',
            'Enable',
            'Active Branches',
            'No Preview Deployments',
            'using our Git connections'
        ];
        
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            {
                acceptNode: function(node) {
                    if (node.nodeValue && node.nodeValue.trim()) {
                        if (problemElements.some(text => node.nodeValue.includes(text))) {
                            return NodeFilter.FILTER_ACCEPT;
                        }
                    }
                    return NodeFilter.FILTER_REJECT;
                }
            },
            false
        );
        
        let problemNode;
        while ((problemNode = walker.nextNode()) !== null) {
            let text = problemNode.nodeValue;
            let modified = false;
            
            problemElements.forEach(phrase => {
                if (text.includes(phrase) && i18n.has(phrase)) {
                    text = text.replace(new RegExp(escapeRegExp(phrase), 'g'), i18n.get(phrase));
                    modified = true;
                }
            });
            
            if (modified) {
                problemNode.nodeValue = text;
            }
        }
        
        document.querySelectorAll('*').forEach(el => {
            if (el.childNodes && el.childNodes.length && !shouldIgnoreNode(el)) {
                Array.from(el.childNodes).forEach(node => {
                    if (node.nodeType === 3 && node.nodeValue && node.nodeValue.trim()) {
                        let text = node.nodeValue;
                        
                        const pluralWords = ['Domains', 'Deployments', 'Branches', 'Requests', 'Logs'];
                        pluralWords.forEach(word => {
                            const singular = word.substring(0, word.length - 1);
                            if (text.includes(word) && i18n.has(singular)) {
                                text = text.replace(new RegExp(`\\b${escapeRegExp(word)}\\b`, 'g'), i18n.get(singular));
                            }
                        });
                        
                        if (text.match(/[\u4e00-\u9fa5]+s\b/)) {
                            text = text.replace(/(\p{Script=Han}+)s\b/gu, '$1');
                        }
                        
                        if (text !== node.nodeValue) {
                            node.nodeValue = text;
                        }
                    }
                });
            }
        });
    }
    
    // 处理变异
    function processMutations(mutations) {
        clearTimeout(fullTranslationTimer);
        fullTranslationTimer = setTimeout(() => {
            let shouldFullTranslate = false;
            
            mutations.forEach(mutation => {
                if (mutation.addedNodes.length > 0) {
                    for (let i = 0; i < mutation.addedNodes.length; i++) {
                        const node = mutation.addedNodes[i];
                        if (node.nodeType === 1 && 
                            (node.tagName === 'DIV' || node.tagName === 'SECTION' || 
                             node.classList && (node.classList.contains('panel') || 
                                              node.classList.contains('card') || 
                                              node.classList.contains('modal')))) {
                            shouldFullTranslate = true;
                            break;
                        }
                    }
                }
                
                if (mutation.type === 'characterData') {
                    if (mutation.target && mutation.target.nodeValue && mutation.target.nodeValue.trim() && 
                        !shouldIgnoreNode(mutation.target.parentNode)) {
                        translateTextNode(mutation.target);
                    }
                }
            });
            
            if (shouldFullTranslate) {
                forceApplyAllTranslations();
            } else {
                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(addedNode => {
                        if (addedNode.nodeType === 1) {
                            replaceText(addedNode);
                        } else if (addedNode.nodeType === 3) {
                            if (addedNode.nodeValue && addedNode.nodeValue.trim()) {
                                translateTextNode(addedNode);
                            }
                        }
                    });
                    
                    if (mutation.type === 'attributes') {
                        const target = mutation.target;
                        if (target && !shouldIgnoreNode(target)) {
                            if (['title', 'placeholder', 'aria-label'].includes(mutation.attributeName)) {
                                translateAttribute(target, mutation.attributeName);
                            }
                        }
                    }
                });
            }
        }, 100);
    }

    // 处理特殊元素
    function handleSpecialElements() {
        document.querySelectorAll('header button, header a, nav button, nav a').forEach(el => {
            if (el.textContent && el.textContent.trim() && !shouldIgnoreNode(el)) {
                translateTextNode(el.firstChild);
            }
        });
        
        document.querySelectorAll('button, .geist-button').forEach(btn => {
            if (!shouldIgnoreNode(btn) && btn.textContent && btn.textContent.trim()) {
                if (btn.childNodes.length > 1) {
                    btn.childNodes.forEach(node => {
                        if (node.nodeType === 3 && node.nodeValue && node.nodeValue.trim()) {
                            translateTextNode(node);
                        }
                    });
                } else if (btn.firstChild && btn.firstChild.nodeType === 3) {
                    translateTextNode(btn.firstChild);
                }
            }
        });
        
        document.querySelectorAll('h1, h2, h3, h4, h5, h6, .card-title, .panel-title, .section-title').forEach(el => {
            if (!shouldIgnoreNode(el) && el.textContent && el.textContent.trim()) {
                el.childNodes.forEach(node => {
                    if (node.nodeType === 3 && node.nodeValue && node.nodeValue.trim()) {
                        translateTextNode(node);
                    }
                });
            }
        });
        
        document.querySelectorAll('span, div, p').forEach(el => {
            if (!shouldIgnoreNode(el) && el.textContent && /\d+K\s+\w+/.test(el.textContent)) {
                el.childNodes.forEach(node => {
                    if (node.nodeType === 3 && node.nodeValue && /\d+K\s+\w+/.test(node.nodeValue)) {
                        let text = node.nodeValue;
                        text = text.replace(/(\d+)K\s+(requests\s+\w+)/gi, function(match, num, type) {
                            const translatedType = i18n.has(type) ? i18n.get(type) : type;
                            return num + '千' + translatedType;
                        });
                        node.nodeValue = text;
                    }
                });
            }
        });
    }
    
    // 设置特殊元素的观察器
    function setupSpecialObservers() {
        const mainContainers = document.querySelectorAll('main, [role="main"], .main-content, .dashboard, .project-view');
        
        mainContainers.forEach(container => {
            const containerObserver = new MutationObserver(() => {
                clearTimeout(specialTranslationTimer);
                specialTranslationTimer = setTimeout(() => {
                    handleSpecialElements();
                }, 200);
            });
            
            containerObserver.observe(container, { 
                childList: true, 
                subtree: true
            });
            specialObservers.push(containerObserver);
        });
        
        document.addEventListener('click', function() {
            setTimeout(() => {
                document.querySelectorAll('dialog, [role="dialog"], .modal, .dropdown-menu, .popover, .tooltip').forEach(dialog => {
                    if (dialog.style.display !== 'none' && dialog.textContent.trim()) {
                        replaceText(dialog);
                    }
                });
            }, 300);
        }, false);
    }
    
    // 页面加载完成后执行
    window.addEventListener('load', function() {
        setTimeout(() => {
            forceApplyAllTranslations();
            setupSpecialObservers();
        }, 1000);
    });
    
    // 点击事件额外翻译
    document.addEventListener('click', function(e) {
        setTimeout(() => {
            if (e.target && (
                e.target.tagName === 'BUTTON' || 
                e.target.tagName === 'A' || 
                e.target.closest('button') || 
                e.target.closest('a') ||
                e.target.getAttribute('role') === 'tab' ||
                e.target.getAttribute('role') === 'button')
            ) {
                setTimeout(forceApplyAllTranslations, 300);
            }
        }, 200);
    }, true);
})();