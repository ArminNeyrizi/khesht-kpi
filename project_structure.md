# 📁 khesht-kpi - Project Structure

*Generated on: 9/24/2026, 11:40:15 AM*

## 📋 Quick Overview

| Metric | Value |
|--------|-------|
| 📄 Total Files | 57 |
| 📁 Total Folders | 16 |
| 🌳 Max Depth | 3 levels |
| 🛠️ Tech Stack | React, Next.js, TypeScript, CSS, Node.js |

## ⭐ Important Files

- 🟡 🚫 **.gitignore** - Git ignore rules
- 🔴 📖 **README.md** - Project documentation
- 🔵 🔍 **eslint.config.mjs** - ESLint config
- 🟡 ▲ **next.config.ts** - Next.js config
- 🟡 🔒 **package-lock.json** - Dependency lock
- 🔴 📦 **package.json** - Package configuration
- 🟡 🔷 **tsconfig.json** - TypeScript config

## 📊 File Statistics

### By File Type

- ⚛️ **.tsx** (React TypeScript files): 35 files (61.4%)
- 🔷 **.ts** (TypeScript files): 9 files (15.8%)
- ⚙️ **.json** (JSON files): 4 files (7.0%)
- 🖼️ **.png** (PNG images): 2 files (3.5%)
- 📄 **.mjs** (Other files): 2 files (3.5%)
- 📄 **.** (Other files): 1 files (1.8%)
- 🚫 **.gitignore** (Git ignore): 1 files (1.8%)
- 📖 **.md** (Markdown files): 1 files (1.8%)
- 🖼️ **.ico** (Icon files): 1 files (1.8%)
- 🎨 **.css** (Stylesheets): 1 files (1.8%)

### By Category

- **React**: 35 files (61.4%)
- **TypeScript**: 9 files (15.8%)
- **Config**: 4 files (7.0%)
- **Other**: 3 files (5.3%)
- **Assets**: 3 files (5.3%)
- **DevOps**: 1 files (1.8%)
- **Docs**: 1 files (1.8%)
- **Styles**: 1 files (1.8%)

### 📁 Largest Directories

- **root**: 57 files
- **components**: 24 files
- **app**: 16 files
- **app/auth**: 7 files
- **components/ui**: 7 files

## 🌳 Directory Structure

```
khesht-kpi/
├── 📄 .gitattributes
├── 🟡 🚫 **.gitignore**
├── 🚀 app/
│   ├── 📂 auth/
│   │   ├── 📂 confirm/
│   │   │   └── 🔷 route.ts
│   │   ├── 📂 error/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 forgot-password/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 login/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 sign-up/
│   │   │   └── ⚛️ page.tsx
│   │   ├── 📂 sign-up-success/
│   │   │   └── ⚛️ page.tsx
│   │   └── 📂 update-password/
│   │   │   └── ⚛️ page.tsx
│   ├── 🖼️ favicon.ico
│   ├── 🎨 globals.css
│   ├── ⚛️ layout.tsx
│   ├── 🖼️ opengraph-image.png
│   ├── 📂 org-chart/
│   │   └── ⚛️ page.tsx
│   ├── ⚛️ page.tsx
│   ├── 📂 protected/
│   │   ├── ⚛️ layout.tsx
│   │   └── ⚛️ page.tsx
│   └── 🖼️ twitter-image.png
├── 🧩 components/
│   ├── ⚛️ auth-button.tsx
│   ├── ⚛️ deploy-button.tsx
│   ├── ⚛️ env-var-warning.tsx
│   ├── ⚛️ forgot-password-form.tsx
│   ├── ⚛️ hero.tsx
│   ├── ⚛️ login-form.tsx
│   ├── ⚛️ logout-button.tsx
│   ├── ⚛️ next-logo.tsx
│   ├── ⚛️ sign-up-form.tsx
│   ├── ⚛️ supabase-logo.tsx
│   ├── ⚛️ theme-switcher.tsx
│   ├── 📂 tutorial/
│   │   ├── ⚛️ code-block.tsx
│   │   ├── ⚛️ connect-supabase-steps.tsx
│   │   ├── ⚛️ fetch-data-steps.tsx
│   │   ├── ⚛️ sign-up-user-steps.tsx
│   │   └── ⚛️ tutorial-step.tsx
│   ├── 🎨 ui/
│   │   ├── ⚛️ badge.tsx
│   │   ├── ⚛️ button.tsx
│   │   ├── ⚛️ card.tsx
│   │   ├── ⚛️ checkbox.tsx
│   │   ├── ⚛️ dropdown-menu.tsx
│   │   ├── ⚛️ input.tsx
│   │   └── ⚛️ label.tsx
│   └── ⚛️ update-password-form.tsx
├── ⚙️ components.json
├── 🔵 🔍 **eslint.config.mjs**
├── 📚 lib/
│   ├── 📂 supabase/
│   │   ├── 🔷 client.ts
│   │   ├── 🔷 proxy.ts
│   │   └── 🔷 server.ts
│   └── 🔷 utils.ts
├── 🔷 next-env.d.ts
├── 🟡 ▲ **next.config.ts**
├── 🟡 🔒 **package-lock.json**
├── 🔴 📦 **package.json**
├── 📄 postcss.config.mjs
├── 🔷 proxy.ts
├── 🔴 📖 **README.md**
├── 🔷 tailwind.config.ts
└── 🟡 🔷 **tsconfig.json**
```

## 📖 Legend

### File Types
- 📄 Other: Other files
- 🚫 DevOps: Git ignore
- 📖 Docs: Markdown files
- 🔷 TypeScript: TypeScript files
- ⚛️ React: React TypeScript files
- 🖼️ Assets: Icon files
- 🎨 Styles: Stylesheets
- 🖼️ Assets: PNG images
- ⚙️ Config: JSON files

### Importance Levels
- 🔴 Critical: Essential project files
- 🟡 High: Important configuration files
- 🔵 Medium: Helpful but not essential files
