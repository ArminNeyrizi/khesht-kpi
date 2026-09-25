Khesht ERP

Enterprise Resource Planning System for Khesht Construction Holding

Khesht ERP یک پلتفرم سازمانی یکپارچه برای مدیریت داده‌ها، فرآیندها، منابع و عملیات هلدینگ ساختمانی خشت است.

این سیستم با هدف ایجاد یک Single Source of Truth برای اطلاعات سازمان طراحی می‌شود؛ به‌طوری که شرکت‌ها، واحدها، کارکنان، پروژه‌ها، خدمات، مشتریان، مالی، فروش، منابع انسانی و سایر فرآیندهای سازمانی در یک ساختار یکپارچه مدیریت شوند.

⸻

هدف پروژه

هدف Khesht ERP جایگزین کردن فایل‌های پراکنده، Excel، فرآیندهای دستی و ابزارهای جدا از هم با یک سیستم سازمانی یکپارچه است.

اصول اصلی سیستم:

* یک منبع مرکزی برای داده‌های سازمان
* حذف ورود چندباره اطلاعات
* استانداردسازی فرآیندها
* دسترسی کنترل‌شده به اطلاعات
* ثبت تاریخچه تغییرات
* اتوماسیون فرآیندهای تکراری
* گزارش‌گیری لحظه‌ای
* قابلیت توسعه برای شرکت‌ها و واحدهای مختلف هلدینگ

⸻

Scope

Khesht ERP در چند لایه توسعه پیدا می‌کند:

1. Organization

مدیریت ساختار سازمانی:

* Holding
* Companies
* Departments
* Units
* Positions
* Employees
* Employee Positions
* Organizational Chart

⸻

2. CRM

مدیریت ارتباط با مشتری:

* Contacts
* Leads
* Customers
* Companies
* Opportunities
* Activities
* Follow-ups
* Sales Pipeline
* Communication History

⸻

3. Sales

مدیریت فرآیند فروش:

Lead
  ↓
Contact
  ↓
Qualification
  ↓
Opportunity
  ↓
Proposal
  ↓
Negotiation
  ↓
Contract
  ↓
Won / Lost

⸻

4. Services

مدیریت کاتالوگ خدمات:

هر Service شامل اطلاعاتی مانند:

* Service Name
* Category
* Description
* Customer Type
* Customer Problem
* Service Scope
* Requirements
* Required Documents
* Pricing
* Delivery Process
* Responsible Unit
* SLA
* Status

⸻

5. Projects

مدیریت پروژه‌ها:

* Projects
* Project Members
* Tasks
* Milestones
* Documents
* Project Status
* Project Costs
* Project Revenue
* Project Activities

⸻

6. Finance

مدیریت اطلاعات مالی و عملیاتی:

* Accounts
* Transactions
* Cash
* Petty Cash
* Expenses
* Income
* Receivables
* Payables
* Budgets
* Financial Reports

Khesht ERP می‌تواند با سیستم حسابداری موجود یکپارچه شود و لزوماً جایگزین نرم‌افزار حسابداری تخصصی نیست.

⸻

7. Human Resources

مدیریت منابع انسانی:

* Employees
* Contracts
* Positions
* Departments
* Attendance
* Leave
* Performance
* Skills
* Training
* Employee Documents

⸻

8. Documents

مدیریت اسناد سازمان:

* Company Documents
* Employee Documents
* Contracts
* Project Documents
* Financial Documents
* Service Documents

هر سند باید دارای:

* Owner
* Related Entity
* Version
* Created At
* Updated At
* Access Level

باشد.

⸻

9. Workflow & Automation

اتوماسیون فرآیندهای سازمانی:

Event
  ↓
Condition
  ↓
Action
  ↓
Notification / Task / Update

نمونه:

New Lead
    ↓
Create CRM Record
    ↓
Assign Sales Expert
    ↓
Create Follow-up
    ↓
Notify Responsible Person

⸻

10. Dashboard & Reporting

داشبوردهای مدیریتی برای مشاهده:

* Sales
* Revenue
* Costs
* Projects
* Employees
* Leads
* Customers
* Tasks
* KPIs
* Company Performance

⸻

Architecture

معماری سیستم به‌صورت ماژولار طراحی می‌شود.

                    Khesht ERP
                         │
        ┌────────────────┼────────────────┐
        │                │                │
      Frontend          API            Database
        │                │                │
     Next.js          Backend          PostgreSQL
        │                │                │
        └────────────────┼────────────────┘
                         │
                    Automation
                         │
                       n8n
                         │
              ┌──────────┼──────────┐
              │          │          │
            Email      CRM       Reports

⸻

Technology Stack

Frontend

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui

Backend / Database

* Supabase
* PostgreSQL
* Row Level Security (RLS)

Automation

* n8n

Authentication

* Supabase Auth

Deployment

* Vercel / Cloud infrastructure

⸻

Database

Database اصلی سیستم PostgreSQL است.

ساختار دیتابیس به‌صورت relational طراحی می‌شود و ارتباط بین موجودیت‌های سازمانی باید از طریق Foreign Keyها کنترل شود.

نمونه ساختار:

companies
departments
positions
employees
employee_positions
customers
contacts
leads
opportunities
activities
services
service_categories
projects
project_members
tasks
accounts
transactions
expenses
income
documents
document_versions
users
roles
permissions

⸻

Core Principle

داده باید فقط یک‌بار ایجاد شود و در تمام سیستم قابل استفاده باشد.

مثلاً اطلاعات یک شرکت نباید جداگانه در CRM، پروژه، مالی و فروش ذخیره شود.

Company
   │
   ├── CRM
   ├── Sales
   ├── Projects
   ├── Finance
   ├── Documents
   └── Reports

⸻

Security

دسترسی کاربران بر اساس Role و Permission کنترل می‌شود.

نمونه:

User
  ↓
Role
  ↓
Permissions
  ↓
Resources

دسترسی می‌تواند در سطح:

* Module
* Table
* Record
* Field
* Action

کنترل شود.

مثلاً یک کاربر ممکن است بتواند Customer را مشاهده کند ولی اجازه حذف آن را نداشته باشد.

⸻

Audit Log

تمام تغییرات حساس سیستم باید قابل ردیابی باشند.

نمونه:

User: 123
Action: UPDATE
Table: customers
Record: 982
Old Value: ...
New Value: ...
Timestamp: ...

⸻

Development Principles

1. Keep It Simple

هر قابلیت جدید باید تا حد ممکن ساده‌ترین implementation ممکن را داشته باشد.

2. Database First

ساختار داده قبل از ساخت UI مشخص می‌شود.

3. Single Source of Truth

یک داده نباید در چند جای مستقل نگهداری شود.

4. Automation Before Manual Work

هر فرآیند تکراری که قابل اتوماسیون است، نباید به‌صورت دستی انجام شود.

5. Modular Architecture

هر ماژول باید تا حد امکان مستقل و قابل توسعه باشد.

6. No Unnecessary Features

قابلیت جدید فقط زمانی اضافه می‌شود که یک نیاز واقعی سازمانی را حل کند.

⸻

Project Structure

khesht-erp/
│
├── app/
│   ├── dashboard/
│   ├── crm/
│   ├── sales/
│   ├── services/
│   ├── projects/
│   ├── finance/
│   ├── hr/
│   ├── documents/
│   └── settings/
│
├── components/
│   ├── ui/
│   ├── tables/
│   ├── forms/
│   ├── charts/
│   └── layout/
│
├── lib/
│   ├── supabase/
│   ├── auth/
│   ├── permissions/
│   └── utils/
│
├── types/
│
├── hooks/
│
├── services/
│
├── public/
│
└── README.md

⸻

Development Workflow

Requirement
    ↓
Data Model
    ↓
Database
    ↓
API / Server Logic
    ↓
UI
    ↓
Permissions
    ↓
Automation
    ↓
Testing
    ↓
Deployment

⸻

Environment Variables

NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
SUPABASE_SERVICE_ROLE_KEY=

Secrets نباید داخل repository قرار بگیرند.

⸻

Local Development

Install dependencies:

npm install

Run development server:

npm run dev

Application:

http://localhost:3000

⸻

Database Development

قبل از تغییر Schema:

1. تغییر موردنظر مشخص شود.
2. Migration ایجاد شود.
3. Migration روی Development اجرا شود.
4. داده‌های موجود بررسی شود.
5. سپس تغییر به Production منتقل شود.

هیچ تغییر مستقیم و بدون کنترل روی Production انجام نشود.

⸻

Current Modules

Module	Status
Organization	In Development
CRM	Planned
Sales	Planned
Services	In Development
Projects	Planned
Finance	Planned
HR	Planned
Documents	Planned
Workflow	Planned
Dashboard	In Development
Reporting	Planned

⸻

Long-Term Direction

Khesht ERP به‌عنوان لایه عملیاتی هلدینگ طراحی می‌شود.

ساختار کلی:

Khesht Holding
       │
       ├── Companies
       │
       ├── People
       │
       ├── Customers
       │
       ├── Services
       │
       ├── Projects
       │
       ├── Finance
       │
       ├── Documents
       │
       └── Operations
              │
              ├── ERP
              ├── CRM
              ├── Automation
              └── Reporting

هدف نهایی این است که اطلاعات عملیاتی هلدینگ از یک سیستم مرکزی مدیریت شود و هر شرکت، واحد و مدیر فقط به داده‌هایی دسترسی داشته باشد که برای نقش او لازم است.

⸻

Status

Project: Khesht ERP
Organization: Khesht Construction Holding
Type: Enterprise Management System
Database: PostgreSQL / Supabase
Frontend: Next.js
Automation: n8n
Status: Active Development