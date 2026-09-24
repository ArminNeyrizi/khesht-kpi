# 📁 khesht-kpi - Project Structure

*Generated on: 9/24/2026, 1:26:35 PM*

## 📋 Quick Overview

| Metric | Value |
|--------|-------|
| 📄 Total Files | 89 |
| 📁 Total Folders | 26 |
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

- ⚛️ **.tsx** (React TypeScript files): 35 files (39.3%)
- 🖼️ **.webp** (WebP images): 19 files (21.3%)
- 🔷 **.ts** (TypeScript files): 9 files (10.1%)
- 🔤 **.ttf** (TrueType fonts): 6 files (6.7%)
- 📄 **.avif** (Other files): 6 files (6.7%)
- ⚙️ **.json** (JSON files): 4 files (4.5%)
- 📖 **.md** (Markdown files): 2 files (2.2%)
- 🖼️ **.png** (PNG images): 2 files (2.2%)
- 📄 **.mjs** (Other files): 2 files (2.2%)
- 📄 **.** (Other files): 1 files (1.1%)
- 🚫 **.gitignore** (Git ignore): 1 files (1.1%)
- 🖼️ **.ico** (Icon files): 1 files (1.1%)
- 🎨 **.css** (Stylesheets): 1 files (1.1%)

### By Category

- **React**: 35 files (39.3%)
- **Assets**: 28 files (31.5%)
- **Other**: 9 files (10.1%)
- **TypeScript**: 9 files (10.1%)
- **Config**: 4 files (4.5%)
- **Docs**: 2 files (2.2%)
- **DevOps**: 1 files (1.1%)
- **Styles**: 1 files (1.1%)

### 📁 Largest Directories

- **root**: 89 files
- **public**: 31 files
- **public/images**: 25 files
- **components**: 22 files
- **app**: 18 files

## 🌳 Directory Structure

```
khesht-kpi/
├── 📄 .gitattributes
├── 🟡 🚫 **.gitignore**
├── 🚀 app/
│   ├── 📂 admin/
│   │   ├── 📂 employees/
│   │   │   └── ⚛️ page.tsx
│   │   └── ⚛️ page.tsx
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
│   ├── 📂 organization/
│   │   ├── 📂 companies/
│   │   ├── 📂 departments/
│   │   ├── 📂 employees/
│   │   ├── 📂 org-chart/
│   │   ├── ⚛️ page.tsx
│   │   └── 📂 positions/
│   ├── ⚛️ page.tsx
│   ├── 📂 protected/
│   │   ├── ⚛️ layout.tsx
│   │   └── ⚛️ page.tsx
│   └── 🖼️ twitter-image.png
├── 🧩 components/
│   ├── 📂 admin/
│   │   └── ⚛️ sidebar.tsx
│   ├── ⚛️ auth-button.tsx
│   ├── ⚛️ forgot-password-form.tsx
│   ├── ⚛️ login-form.tsx
│   ├── ⚛️ logout-button.tsx
│   ├── ⚛️ sign-up-form.tsx
│   ├── ⚛️ theme-switcher.tsx
│   ├── 🎨 ui/
│   │   ├── ⚛️ avatar.tsx
│   │   ├── ⚛️ badge.tsx
│   │   ├── ⚛️ button.tsx
│   │   ├── ⚛️ card.tsx
│   │   ├── ⚛️ checkbox.tsx
│   │   ├── ⚛️ dialog.tsx
│   │   ├── ⚛️ dropdown-menu.tsx
│   │   ├── ⚛️ input.tsx
│   │   ├── ⚛️ label.tsx
│   │   ├── ⚛️ select.tsx
│   │   ├── ⚛️ separator.tsx
│   │   ├── ⚛️ sheet.tsx
│   │   ├── ⚛️ table.tsx
│   │   └── ⚛️ textarea.tsx
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
├── 📖 project_structure.md
├── 🔷 proxy.ts
├── 🌐 public/
│   ├── 📂 Font/
│   │   ├── 🔤 Kook-Bold.ttf
│   │   ├── 🔤 Kook-ExtraBold.ttf
│   │   ├── 🔤 Kook-ExtraLight.ttf
│   │   ├── 🔤 Kook-Light.ttf
│   │   ├── 🔤 Kook-Medium.ttf
│   │   └── 🔤 Kook-Regular.ttf
│   └── 🖼️ images/
│   │   ├── 🖼️ autocad.webp
│   │   ├── 📄 beautiful-cafe.avif
│   │   ├── 🖼️ bim.webp
│   │   ├── 📄 concrete.avif
│   │   ├── 🖼️ density-building.webp
│   │   ├── 🖼️ design.webp
│   │   ├── 📄 designer-girl.avif
│   │   ├── 🖼️ Dynamo.webp
│   │   ├── 🖼️ etabs.webp
│   │   ├── 🖼️ execution.webp
│   │   ├── 🖼️ hero-building.webp
│   │   ├── 🖼️ logo.webp
│   │   ├── 📄 man-design.avif
│   │   ├── 📄 modern-buildings.avif
│   │   ├── 🖼️ n8n.webp
│   │   ├── 🖼️ NavisWork.webp
│   │   ├── 🖼️ pre-start-checklist.webp
│   │   ├── 🖼️ RevitArchitecture.webp
│   │   ├── 🖼️ RevitGeneral.webp
│   │   ├── 🖼️ RevitMEP.webp
│   │   ├── 🖼️ RevitStructure.webp
│   │   ├── 🖼️ RobotStructure.webp
│   │   ├── 🖼️ supervision.webp
│   │   ├── 📄 supervisors.avif
│   │   └── 🖼️ tools-not-found.webp
├── 🔴 📖 **README.md**
├── 🔷 tailwind.config.ts
└── 🟡 🔷 **tsconfig.json**
```

## 📖 Legend

### File Types
- 📄 Other: Other files
- 🚫 DevOps: Git ignore
- 📖 Docs: Markdown files
- ⚛️ React: React TypeScript files
- 🔷 TypeScript: TypeScript files
- 🖼️ Assets: Icon files
- 🎨 Styles: Stylesheets
- 🖼️ Assets: PNG images
- ⚙️ Config: JSON files
- 🔤 Assets: TrueType fonts
- 🖼️ Assets: WebP images

### Importance Levels
- 🔴 Critical: Essential project files
- 🟡 High: Important configuration files
- 🔵 Medium: Helpful but not essential files
