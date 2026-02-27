# 🚀 部署指南

本文档说明如何将你的学习计划网站部署到 GitHub Pages。

## 前置条件

1. GitHub 账号
2. 已将此项目推送到 GitHub 仓库

## 步骤 1：创建 GitHub 仓库

1. 登录 GitHub，点击右上角 **+** → **New repository**
2. 仓库名称填写：`100-Day-Cognitive-Improvement-Plan`
3. 选择 **Public**（公开）或 **Private**（私有）
4. 点击 **Create repository**

## 步骤 2：推送代码到 GitHub

如果你还没有推送代码，执行以下命令：

```bash
# 初始化 Git 仓库（如果还没有）
git init

# 添加所有文件
git add .

# 提交
git commit -m "Initial commit: VitePress documentation site"

# 添加远程仓库（替换 Michaelooo 为你的 GitHub 用户名）
git remote add origin https://github.com/Michaelooo/100-Day-Cognitive-Improvement-Plan.git

# 推送
git push -u origin main
```

## 步骤 3：配置 GitHub Pages

1. 打开你的 GitHub 仓库页面
2. 点击 **Settings**（设置）
3. 在左侧菜单中找到 **Pages**
4. 在 **Source** 部分选择 **GitHub Actions**

## 步骤 4：更新配置文件中的用户名

在以下文件中，将 `Michaelooo` 替换为你的 GitHub 用户名：

1. `docs/.vitepress/config.ts` - 第 14 行 `base` 和第 87 行 `editLink`
2. `docs/index.md` - 所有 GitHub 链接

## 步骤 5：触发部署

每次你推送代码到 `main` 分支时，GitHub Actions 会自动构建并部署网站。

你也可以手动触发部署：
1. 打开仓库页面的 **Actions** 标签
2. 选择 **Deploy VitePress site to Pages** 工作流
3. 点击 **Run workflow**

## 步骤 6：访问网站

部署完成后，你的网站将可以通过以下地址访问：

```
https://Michaelooo.github.io/100-Day-Cognitive-Improvement-Plan/
```

## 本地开发

在本地开发和预览：

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev

# 构建（检查是否有错误）
npm run docs:build

# 预览构建结果
npm run docs:preview
```

开发服务器启动后，访问 `http://localhost:5173` 查看网站。

## 自定义域名（可选）

如果你想使用自定义域名：

1. 在 `docs/public/` 目录下创建名为 `CNAME` 的文件
2. 在文件中写入你的域名，例如：`learning.yourdomain.com`
3. 在你的域名 DNS 设置中添加 CNAME 记录，指向 `Michaelooo.github.io`
4. 在 `docs/.vitepress/config.ts` 中更新 `base` 为 `/`

## 添加新的学习计划

要添加 Plan 2、Plan 3 等新的学习计划：

1. 在 `docs/` 目录下创建新目录，例如 `docs/plan-2/`
2. 在该目录下创建 `index.md` 作为计划首页
3. 添加你的学习笔记（格式：`YYYY-MM-DD-主题.md`）
4. 在 `docs/.vitepress/config.ts` 的 `nav` 中添加导航链接
5. 在 `docs/.vitepress/config.ts` 的 `sidebar` 中添加侧边栏配置

示例：

```typescript
// docs/.vitepress/config.ts
nav: [
  { 
    text: '学习计划',
    items: [
      { text: 'Plan 1: 硬核开发者进阶', link: '/plan-1/' },
      { text: 'Plan 2: 我的新计划', link: '/plan-2/' },  // 添加新计划
    ]
  },
]

sidebar: {
  '/plan-1/': getSidebar('plan-1'),
  '/plan-2/': getSidebar('plan-2'),  // 添加新计划的侧边栏
}
```

## 故障排除

### 构建失败

1. 检查 Node.js 版本是否 >= 18
2. 删除 `node_modules` 和 `docs/.vitepress/cache` 后重新安装：
   ```bash
   rm -rf node_modules docs/.vitepress/cache
   npm install
   ```

### 页面 404

1. 确认 `docs/.vitepress/config.ts` 中的 `base` 配置正确
2. 检查 GitHub Pages 设置是否正确

### 样式不生效

1. 清除浏览器缓存
2. 检查是否有 CSS 语法错误

## 更多资源

- [VitePress 文档](https://vitepress.dev/)
- [GitHub Pages 文档](https://docs.github.com/en/pages)
- [GitHub Actions 文档](https://docs.github.com/en/actions)
