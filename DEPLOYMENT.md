# Deployment Guide / 部署指南

## GitHub Actions CI/CD Setup / GitHub Actions 持續部署設置

### Option 1: Cloudflare Pages (Recommended) / 方案一：Cloudflare Pages（推薦）

#### Prerequisites / 前置條件
1. A GitHub repository for this project
2. A Cloudflare account

#### Steps / 步驟

**1. Create Cloudflare API Token / 創建 Cloudflare API Token**
```
1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Click "Create Token"
3. Select "Edit Cloudflare Workers" template
4. Set Account Resources to "Include" your account
5. Click "Create Token"
6. Copy the generated token
```

**2. Get Cloudflare Account ID / 獲取 Cloudflare Account ID**
```
1. Go to https://dash.cloudflare.com
2. Select your account
3. Copy the Account ID from the URL or overview page
```

**3. Add GitHub Secrets / 添加 GitHub Secrets**
```
1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Add the following secrets:
   - CLOUDFLARE_API_TOKEN: your API token
   - CLOUDFLARE_ACCOUNT_ID: your account ID
```

**4. Push to GitHub / 推送到 GitHub**
```bash
git init
git add .
git commit -m "feat: initial commit with CI/CD"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/courtside-hk.git
git push -u origin main
```

**5. Enable GitHub Actions / 啟用 GitHub Actions**
- Go to your repository's Actions tab
- The workflow will run automatically on push

---

### Option 2: Vercel / 方案二：Vercel

#### Prerequisites / 前置條件
1. A GitHub repository
2. A Vercel account

#### Steps / 步驟

**1. Get Vercel Tokens / 獲取 Vercel Token**
```
1. Go to https://vercel.com/account/tokens
2. Create a new token with full account access
3. Copy the token
```

**2. Get Vercel Organization & Project ID / 獲取 Vercel 組織和項目 ID**
```
1. Install Vercel CLI: npm install -g vercel
2. Run: vercel login
3. Run: vercel link
4. The IDs will be in .vercel/project.json
```

**3. Add GitHub Secrets / 添加 GitHub Secrets**
```
1. Go to your GitHub repository
2. Navigate to Settings → Secrets and variables → Actions
3. Add:
   - VERCEL_TOKEN: your Vercel token
   - VERCEL_ORG_ID: your organization ID
   - VERCEL_PROJECT_ID: your project ID
```

---

## Manual Deployment / 手動部署

### Build the Project / 構建項目
```bash
npm install
npm run build
```

The build output will be in the `dist/` folder.

### Deploy dist/ folder / 部署 dist 資料夾
Upload the contents of `dist/` to your hosting provider.

---

## Workflow Files / 工作流檔案

| File | Description |
|------|-------------|
| `.github/workflows/deploy-cloudflare.yml` | Cloudflare Pages deployment |
| `.github/workflows/deploy-vercel.yml` | Vercel deployment |

---

## Troubleshooting / 疑難排解

### Cloudflare Pages
- **Error: Invalid API token**: Check if the token has correct permissions
- **Error: Account not found**: Verify the Account ID is correct

### Vercel
- **Error: Unauthorized**: Check if VERCEL_TOKEN has correct scope
- **Error: Project not found**: Run `vercel link` again

### Common Issues / 常見問題
1. **Build fails**: Check package.json scripts
2. **Assets not loading**: Ensure correct base URL configuration
3. **404 on refresh**: Configure redirect rules for SPA
