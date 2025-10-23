# ZC Education Website

高端、小众、邀请制的学术咨询网站，采用 The Pudding 风格的 scrollytelling 设计。

## 功能特性

- 🎨 极简优雅的设计风格
- 📖 沉浸式滚动叙事体验
- 📱 完全响应式设计
- ♿ 无障碍支持
- 🔐 后台内容管理系统

## 技术栈

- **框架**: Next.js 14 + React 18
- **语言**: TypeScript
- **样式**: CSS Modules + JSX Styles
- **数据存储**: JSON文件（可升级为数据库）

## 开始使用

### 安装依赖

```bash
npm install
```

### 配置环境变量

创建 `.env.local` 文件：

```env
ADMIN_PASSWORD=your_secure_password_here
```

### 运行开发服务器

```bash
npm run dev
```

在浏览器中打开 [http://localhost:3000](http://localhost:3000)

## 后台管理

### 访问后台

访问 [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

使用在 `.env.local` 中设置的密码登录。

### 管理内容

后台支持：
- **案例管理** (Outcomes): 添加、编辑、删除学术案例
- **文章管理** (Journal): 添加、编辑、删除观察文章

### 数据结构

#### Outcome (案例)
```typescript
{
  id: number;
  field: string;           // 领域
  narrative: string;       // 叙述
  duration: string;        // 时长
  keyMilestone: string;    // 关键节点
  createdAt: string;
  updatedAt: string;
}
```

#### Article (文章)
```typescript
{
  id: number;
  title: string;           // 标题
  date: string;            // 日期
  excerpt: string;         // 摘要
  readTime: string;        // 阅读时长
  content: string;         // 正文内容
  createdAt: string;
  updatedAt: string;
}
```

## 项目结构

```
/
├── components/          # React组件
│   ├── CharHover.tsx   # 字符悬停效果组件
│   └── Layout.tsx      # 布局组件
├── data/               # 数据存储
│   ├── outcomes.json   # 案例数据
│   └── articles.json   # 文章数据
├── lib/                # 工具库
│   └── data.ts         # 数据操作函数
├── pages/              # 页面
│   ├── index.tsx       # 首页（能力弧线）
│   ├── approach.tsx    # 方法页
│   ├── outcomes.tsx    # 结果页
│   ├── journal.tsx     # 观察页
│   ├── contact.tsx     # 对话页
│   ├── admin/          # 后台管理
│   │   ├── index.tsx   # 管理面板
│   │   └── login.tsx   # 登录页
│   └── api/            # API路由
│       ├── auth/       # 认证接口
│       ├── outcomes/   # 案例接口
│       └── articles/   # 文章接口
└── styles/             # 样式文件
    ├── globals.css     # 全局样式
    ├── capability.css  # 能力弧线样式
    └── scrolly.css     # 滚动效果样式
```

## API 接口

### 认证
- `POST /api/auth/login` - 登录
- `POST /api/auth/logout` - 登出

### 案例管理
- `GET /api/outcomes` - 获取所有案例
- `POST /api/outcomes` - 创建案例（需认证）
- `PUT /api/outcomes/[id]` - 更新案例（需认证）
- `DELETE /api/outcomes/[id]` - 删除案例（需认证）

### 文章管理
- `GET /api/articles` - 获取所有文章
- `POST /api/articles` - 创建文章（需认证）
- `PUT /api/articles/[id]` - 更新文章（需认证）
- `DELETE /api/articles/[id]` - 删除文章（需认证）

## 部署

### Vercel（推荐）

```bash
npm install -g vercel
vercel
```

记得在 Vercel 项目设置中添加环境变量 `ADMIN_PASSWORD`。

### 其他平台

构建生产版本：

```bash
npm run build
npm start
```

## 安全建议

⚠️ **重要**：
1. 务必修改默认管理员密码
2. 生产环境使用强密码
3. 考虑使用更安全的认证方案（JWT、OAuth等）
4. 定期备份 `data/` 目录
5. 考虑迁移到数据库（PostgreSQL、MongoDB等）

## License

Private - All Rights Reserved
