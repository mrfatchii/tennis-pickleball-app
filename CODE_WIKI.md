# Courtside HK 项目文档

## 项目概述

**项目名称**: Courtside HK  
**版本**: 0.1.0  
**技术栈**: React 18.3.1 + Vite 5.4.11 + React Router 6.28.0  
**项目类型**: 社区平台应用（香港网球/匹克球爱好者社区）  
**语言支持**: 中英双语（粤语/英语）

---

## 项目架构

### 技术架构图

```
┌─────────────────────────────────────────────────────────────┐
│                        视图层 (View)                         │
│  Pages: Discover | Members | Matching | Messages | Groups   │
│         Marketplace | CourtMgmt | Login | Profile           │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    组件层 (Components)                       │
│  Header | Footer | ProtectedRoute | Page Components         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                   状态管理层 (Context)                       │
│              src/context/AppContext.jsx                      │
│   管理: 用户 | 场地 | 会员 | 群组 | 二手市场 | 消息          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                      数据层 (Data)                           │
│     src/data.js (模拟数据) | src/i18n.js (国际化)            │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    样式层 (Styles)                           │
│        src/app.css | src/styles/tokens.css                  │
│              CSS 变量定义设计系统                            │
└─────────────────────────────────────────────────────────────┘
```

### 目录结构

```
courtside-hk/
├── package.json              # 项目配置与依赖
├── vite.config.js            # Vite 构建配置
├── index.html                # HTML 入口
├── src/
│   ├── main.jsx              # 应用入口
│   ├── App.jsx               # 主路由配置
│   ├── app.css               # 全局样式
│   ├── data.js               # 模拟数据（1839 行）
│   ├── i18n.js               # 国际化配置（852 行）
│   ├── context/
│   │   └── AppContext.jsx    # 全局状态管理（313 行）
│   ├── components/           # 共享组件
│   │   ├── Header.jsx        # 页头导航
│   │   ├── Footer.jsx        # 页脚
│   │   ├── ProtectedRoute.jsx # 路由保护
│   │   ├── CourtCard.jsx     # 场地卡片
│   │   ├── MemberCard.jsx    # 会员卡片
│   │   ├── ListingCard.jsx   # 二手商品卡片
│   │   ├── GroupCard.jsx     # 群组卡片
│   │   ├── MessageBubble.jsx # 消息气泡
│   │   ├── ReviewSection.jsx # 评论区域
│   │   ├── SearchBar.jsx     # 搜索栏
│   │   ├── Tabs.jsx          # 标签页
│   │   ├── EmptyState.jsx    # 空状态提示
│   │   ├── Toast.jsx         # 轻提示
│   │   └── PageLoader.jsx    # 页面加载器
│   ├── pages/                # 页面组件
│   │   ├── DiscoverPage.jsx  # 发现页面（首页）
│   │   ├── CourtDetailPage.jsx # 场地详情
│   │   ├── MembersPage.jsx   # 会员列表
│   │   ├── MemberProfilePage.jsx # 会员主页
│   │   ├── MatchingPage.jsx  # 匹配页面
│   │   ├── MessagesPage.jsx  # 消息页面
│   │   ├── GroupsPage.jsx    # 群组页面
│   │   ├── MarketplacePage.jsx # 二手市场
│   │   ├── CourtManagementPage.jsx # 场地管理
│   │   └── LoginPage.jsx     # 登录页面
│   └── styles/
│       └── tokens.css        # 设计令牌
└── public/                   # 静态资源
```

---

## 核心模块说明

### 1. 入口文件

#### src/main.jsx
**职责**: 应用启动入口，挂载根组件

```jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { AppProvider } from './context/AppContext.jsx'
import './app.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
)
```

**关键点**:
- 使用 `AppProvider` 包裹整个应用，提供全局状态
- 引入全局样式文件

#### src/App.jsx
**职责**: 主路由配置，管理页面导航

**路由列表**:

| 路径 | 组件 | 权限 |
|------|------|------|
| `/` | DiscoverPage | 公开 |
| `/login` | LoginPage | 公开 |
| `/members` | MembersPage | 需登录 |
| `/member/:id` | MemberProfilePage | 需登录 |
| `/matching` | MatchingPage | 需登录 |
| `/messages` | MessagesPage | 需登录 |
| `/groups` | GroupsPage | 需登录 |
| `/groups/:id` | GroupsPage | 需登录 |
| `/marketplace` | MarketplacePage | 需登录 |
| `/marketplace/:id` | MarketplacePage | 需登录 |
| `/marketplace/mine` | MarketplacePage | 需登录 |
| `/courts/manage` | CourtManagementPage | 需登录 |
| `/court/:id` | CourtDetailPage | 需登录 |

---

### 2. 状态管理 (Context)

#### src/context/AppContext.jsx

**职责**: 管理应用全局状态，包括用户、场地、会员、群组、消息等数据

**状态结构**:

```javascript
{
  lang: 'en' | 'zh',           // 当前语言
  currentUserId: string | null, // 当前登录用户ID
  courts: [],                   // 场地列表
  reviews: [],                  // 场地评论
  members: [],                  // 会员列表
  groups: [],                   // 群组列表
  listings: [],                 // 二手市场列表
  connections: [],              // 社交连接
  connectRequests: [],          // 连接请求
  messages: [],                 // 消息记录
  toast: null                   // 轻提示状态
}
```

**核心方法**:

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| `login` | `userId` | void | 用户登录 |
| `logout` | - | void | 用户登出 |
| `addReview` | `courtId, review` | void | 添加评论 |
| `deleteReview` | `reviewId` | void | 删除评论 |
| `claimCourt` | `courtId` | void | 认领场地 |
| `unclaimCourt` | `courtId` | void | 取消认领 |
| `updateCourt` | `courtId, updates` | void | 更新场地信息 |
| `updateProfile` | `memberId, updates` | void | 更新会员资料 |
| `sendConnectRequest` | `fromId, toId` | void | 发送连接请求 |
| `acceptRequest` | `requestId` | void | 接受请求 |
| `declineRequest` | `requestId` | void | 拒绝请求 |
| `sendMessage` | `conversationId, text, senderId` | void | 发送消息 |
| `createGroup` | `group` | void | 创建群组 |
| `joinGroup` | `groupId, memberId` | void | 加入群组 |
| `leaveGroup` | `groupId, memberId` | void | 退出群组 |
| `addActivity` | `groupId, activity` | void | 添加活动 |
| `joinActivity` | `activityId, memberId` | void | 参加活动 |
| `createListing` | `listing` | void | 创建商品 |
| `updateListing` | `listingId, updates` | void | 更新商品 |
| `deleteListing` | `listingId` | void | 删除商品 |

**查询方法**:

| 方法名 | 参数 | 返回值 | 说明 |
|--------|------|--------|------|
| `courtById` | `id` | Court | 根据ID获取场地 |
| `reviewsForCourt` | `courtId` | Review[] | 获取场地评论 |
| `courtRating` | `courtId` | number | 获取场地评分 |
| `memberById` | `id` | Member | 根据ID获取会员 |
| `isConnected` | `id1, id2` | boolean | 检查是否连接 |
| `connectionCount` | `memberId` | number | 连接数量 |
| `requestState` | `fromId, toId` | 'none'/'sent'/'received'/'connected' | 请求状态 |
| `groupById` | `id` | Group | 根据ID获取群组 |
| `listingById` | `id` | Listing | 根据ID获取商品 |
| `memberListings` | `memberId` | Listing[] | 会员商品列表 |
| `conversationsFor` | `userId` | Conversation[] | 用户会话列表 |
| `connectedMembers` | `userId` | Member[] | 已连接会员列表 |

---

### 3. 数据层

#### src/data.js

**职责**: 提供应用模拟数据，包括会员、场地、群组、市场商品等

**数据常量**:

```javascript
sports = ['tennis', 'pickleball']
districts = ['Central & Western', 'Eastern', 'Southern', 'Wan Chai', ...]
surfaces = ['hard', 'clay', 'grass', 'carpet', 'acrylic']
environments = ['outdoor', 'indoor']
levels = ['beginner', 'intermediate', 'advanced', 'professional']
playStyles = ['singles', 'doubles', 'both']
groupTypes = ['tournament', 'social', 'training', 'league', 'casual']
gearCategories = ['rackets', 'shoes', 'balls', 'bags', 'apparel', 'accessories']
conditions = ['new', 'like_new', 'good', 'fair']
```

**实体数据结构**:

**Member (会员)**
```javascript
{
  id: string,
  name: string,
  avatar: string,
  sport: string,
  level: string,
  playStyle: string,
  bio: string,
  location: string,
  yearsPlaying: number,
  availability: string[],
  preferredCourts: string[],
  isCoach: boolean,
  coachingCert: string | null,
  coachingBio: string | null,
  joinedAt: string,
  social: { instagram, whatsapp }
}
```

**Court (场地)**
```javascript
{
  id: string,
  name: string,
  district: string,
  courts: number,
  surface: string,
  environment: string,
  lighting: string,
  pricePerHour: number,
  bookingUrl: string,
  phone: string,
  lat: number,
  lng: number,
  images: string[],
  claimedBy: string | null,
  tags: string[]
}
```

**Group (群组)**
```javascript
{
  id: string,
  name: string,
  type: string,
  sport: string,
  description: string,
  image: string,
  createdBy: string,
  members: string[],
  activities: Activity[]
}
```

**Listing (商品)**
```javascript
{
  id: string,
  title: string,
  description: string,
  price: number,
  category: string,
  condition: string,
  sellerId: string,
  images: string[],
  createdAt: string
}
```

---

### 4. 国际化 (i18n)

#### src/i18n.js

**职责**: 提供中英双语文本支持

**核心函数**:
```javascript
L(key)  // 根据当前语言返回对应文本
```

**翻译覆盖范围**:
- 导航 (nav)
- 搜索 (search)
- 通用文本 (common)
- 运动类型 (sports)
- 区域 (districts)
- 场地类型 (surfaces)
- 环境 (environments)
- 水平等级 (levels)
- 打球风格 (playStyles)
- 群组类型 (groupTypes)
- 商品分类 (gearCategories)
- 商品成色 (conditions)
- 发现页面 (discover)
- 评论 (reviews)
- 场地管理 (courtMgmt)
- 会员 (members)
- 匹配 (matching)
- 消息 (messages)
- 群组 (groups)
- 二手市场 (marketplace)
- 登录 (login)
- 页脚 (footer)
- 地图 (map)
- 教练 (coach)

---

### 5. 样式系统

#### src/styles/tokens.css

**职责**: 定义设计令牌（Design Tokens）

**颜色系统**:

| 变量名 | 色值 | 用途 |
|--------|------|------|
| `--color-navy` | #1e3a5f | 主色调（导航、标题） |
| `--color-forest` | #2d5a27 | 成功状态 |
| `--color-lime` | #84cc16 | 辅助色 |
| `--color-purple` | #7c3aed | 次要强调 |
| `--color-teal` | #0d9488 | 信息提示 |
| `--color-coral` | #f97316 | 警告 |
| `--color-amber` | #f59e0b | 重要提示 |

**布局令牌**:
```css
--radius-sm: 6px
--radius-md: 12px
--radius-lg: 20px
--radius-xl: 28px
--shadow-sm: 0 1px 3px rgba(0,0,0,0.1)
--shadow-md: 0 4px 12px rgba(0,0,0,0.1)
--shadow-lg: 0 8px 24px rgba(0,0,0,0.12)
```

---

### 6. 共享组件

#### Header.jsx
**职责**: 应用顶部导航栏

**功能**:
- Logo 和应用名称
- 主导航链接（发现、会员、匹配、消息、群组、市场）
- 语言切换按钮
- 移动端汉堡菜单

#### Footer.jsx
**职责**: 应用底部

**内容**:
- 版权信息
- 社交链接
- 快速链接

#### ProtectedRoute.jsx
**职责**: 路由守卫组件

**逻辑**:
- 检查用户是否已登录（currentUserId）
- 未登录重定向到登录页
- 已登录渲染目标组件

#### CourtCard.jsx
**职责**: 场地卡片展示

**显示信息**:
- 场地图片
- 名称和区域
- 场地数量
- 地面类型
- 环境（室内/室外）
- 价格
- 评分

#### MemberCard.jsx
**职责**: 会员卡片展示

**显示信息**:
- 头像和名称
- 运动类型和水平
- 位置
- 连接状态按钮

#### ListingCard.jsx
**职责**: 商品卡片展示

**显示信息**:
- 商品图片
- 标题和价格
- 分类和成色

#### GroupCard.jsx
**职责**: 群组卡片展示

**显示信息**:
- 群组封面图
- 名称和类型
- 会员数量
- 运动类型

#### MessageBubble.jsx
**职责**: 消息气泡组件

**Props**:
```javascript
{
  text: string,       // 消息内容
  isOwn: boolean,     // 是否为自己发送
  timestamp: string   // 时间戳
}
```

#### ReviewSection.jsx
**职责**: 场地评论区域

**功能**:
- 显示评论列表
- 添加评论表单
- 评分显示
- 删除评论（仅作者可删除）

#### SearchBar.jsx
**职责**: 通用搜索栏

**Props**:
```javascript
{
  value: string,
  onChange: function,
  placeholder: string
}
```

#### Tabs.jsx
**职责**: 标签页切换组件

**Props**:
```javascript
{
  tabs: string[],
  activeTab: string,
  onTabChange: function
}
```

#### EmptyState.jsx
**职责**: 空状态展示

**Props**:
```javascript
{
  icon: string,
  title: string,
  description: string
}
```

#### Toast.jsx
**职责**: 轻提示组件

**显示位置**: 页面顶部居中

#### PageLoader.jsx
**职责**: 页面加载动画

---

### 7. 页面组件

#### DiscoverPage.jsx
**职责**: 发现页面（首页）

**功能**:
- 搜索栏（场地名称）
- 筛选器（运动类型、区域）
- 场地卡片列表
- 无障碍设施标签

#### CourtDetailPage.jsx
**职责**: 场地详情页

**功能**:
- 场地信息展示
- 图片画廊
- 评论区
- 认领/取消认领场地
- 场地管理入口

#### MembersPage.jsx
**职责**: 会员列表页

**功能**:
- 会员卡片列表
- 筛选（运动类型、水平、位置）
- 连接请求按钮

#### MemberProfilePage.jsx
**职责**: 会员个人主页

**功能**:
- 个人资料展示
- 社交连接状态
- 连接/断开连接
- 查看该会员的场地评价

#### MatchingPage.jsx
**职责**: 匹配页面

**功能**:
- 显示可匹配的会员列表
- 筛选（运动、水平、位置）
- 发起连接请求

#### MessagesPage.jsx
**职责**: 消息页面

**功能**:
- 会话列表
- 消息详情
- 发送消息

#### GroupsPage.jsx
**职责**: 群组页面

**功能**:
- 群组列表
- 群组详情
- 加入/退出群组
- 查看活动
- 创建群组

#### MarketplacePage.jsx
**职责**: 二手市场页面

**功能**:
- 商品列表
- 商品详情
- 我的商品
- 发布商品
- 编辑/删除商品

#### CourtManagementPage.jsx
**职责**: 场地管理页面

**功能**:
- 用户认领的场地列表
- 添加新场地
- 编辑场地信息
- 删除场地

#### LoginPage.jsx
**职责**: 登录页面

**功能**:
- 会员选择登录
- 头像展示
- 登录按钮

---

## 依赖关系

### 生产依赖

| 依赖包 | 版本 | 用途 |
|--------|------|------|
| react | ^18.3.1 | UI 框架 |
| react-dom | ^18.3.1 | DOM 渲染 |
| react-router-dom | ^6.28.0 | 路由管理 |

### 开发依赖

| 依赖包 | 版本 | 用途 |
|--------|------|------|
| @vitejs/plugin-react | ^4.3.4 | Vite React 插件 |
| vite | ^5.4.11 | 构建工具 |

---

## 项目运行

### 环境要求
- Node.js 18+
- npm 9+

### 安装步骤

```bash
# 克隆项目后进入目录
cd courtside-hk

# 安装依赖
npm install
```

### 开发模式

```bash
# 启动开发服务器
npm run dev

# 访问地址
http://localhost:5173
```

### 构建生产版本

```bash
# 构建优化版本
npm run build

# 预览生产构建
npm run preview
```

### Vite 配置

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true  // 允许外部访问
  }
})
```

---

## 设计模式与最佳实践

### 1. 状态管理模式
- 使用 React Context 进行全局状态管理
- 状态包含数据和业务逻辑方法
- 提供查询方法封装数据获取逻辑

### 2. 路由保护模式
- `ProtectedRoute` 组件检查登录状态
- 未登录用户重定向到登录页
- 登录后返回原请求页面

### 3. 组件复用模式
- 共享组件放在 `components/` 目录
- 页面特定组件放在 `pages/` 目录
- 通过 Props 传递数据和回调

### 4. 国际化模式
- 单一 `L()` 函数处理翻译
- 翻译对象按功能模块组织
- 支持运行时语言切换

### 5. 样式管理
- 使用 CSS 变量定义设计令牌
- 集中管理颜色、间距、阴影等
- 全局样式在 `app.css` 中定义

---

## 附录

### 模拟数据规模
- **会员**: 12 人（含 2 位教练）
- **场地**: 51 个（覆盖香港各区）
- **评论**: 22 条
- **群组**: 4 个（含活动）
- **商品**: 10 件
- **连接**: 8 对
- **连接请求**: 3 条
- **会话**: 3 个

### 预留字段说明
- `id`: 实体唯一标识（格式：类型缩写+序号，如 m1, c1）
- `createdAt`/`joinedAt`: ISO 日期字符串格式
- `lat`/`lng`: 地理坐标（用于地图展示）

---

*文档生成时间: 2024年*  
*最后更新: 项目结构分析完成*
