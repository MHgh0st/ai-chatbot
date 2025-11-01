# AI Chatbot Platform (WIP) 🤖

**پلتفرم چت‌بات هوشمند برای مدیریت گفتگوها با معماری ماژولار — وضعیت: در حال توسعه و هنوز وارد فاز پروداکشن نشده است.**

این پروژه یک وب‌اپلیکیشن پایه برای ساخت و مدیریت چت‌بات‌های هوشمند است که با Next.js و TypeScript توسعه داده شده است. هدف، ایجاد زیرساخت ماژولار برای مدیریت کاربران، گفتگوها، لاگ‌ها و اتصال به LLMها است. «این مخزن هنوز کامل نیست و آماده استفاده در محیط تولیدی نمی‌باشد.»

<!-- نیاز به اسکرین‌شات از UI اصلی (لیست گفتگو + پنل چت) -->
<img width="2472" height="1206" alt="image" src="https://github.com/user-attachments/assets/eab1d275-0b7c-4ebd-8628-c6af14e58eee" />

## ✨ ویژگی‌ها (در حال توسعه)
- معماری Next.js App Router با TypeScript
- پایگاه داده با Prisma (PostgreSQL/SQLite) و مدل‌سازی اولیه
- رابط کاربری با Tailwind CSS و HeroUI
- لایه سرویس برای اتصال به LLMها (طراحی شده، پیاده‌سازی نهایی نشده)
- احراز هویت (در برنامه: NextAuth — هنوز فعال/تکمیل نشده)
- مدیریت گفتگو، پیام‌ها، و وضعیت‌ها (اسکلت اولیه)

> نکته مهم: بسیاری از قابلیت‌ها هنوز در مرحله پیاده‌سازی هستند و APIها ناپایدارند. از این پروژه برای پروداکشن استفاده نکنید.

## 🏗️ ساختار پوشه‌ها
```
.
├── prisma/                # شِما و مهاجرت‌های پایگاه داده (WIP)
├── public/                # فایل‌های استاتیک
├── src/
│   ├── app/               # Next.js App Router (routes, API)
│   ├── components/        # اجزای UI قابل استفاده مجدد
│   ├── utils/             # توابع کمکی و سرویس‌ها
│   ├── data/              # داده‌های نمونه/ثابت
│   └── types/             # تایپ‌ها و اینترفیس‌ها
├── next.config.ts
├── tailwind.config.ts
├── package.json
└── README.md
```

## 🚧 وضعیت پروژه
- این پروژه **در حال توسعه** است و هنوز به مرحله انتشار پایدار نرسیده است.
- APIها و اسکیمای دیتابیس ممکن است تغییر کند.
- بخش‌های احراز هویت، مدیریت نقش‌ها، و اتصال به LLMها نیاز به تکمیل دارند.

<!-- نیاز به اسکرین‌شات از ارور/بنر "WIP" در UI اگر موجود است -->
<img width="2464" height="1202" alt="image" src="https://github.com/user-attachments/assets/d1d55a9e-7a56-4c1a-bd49-17f2a7e2dc7b" />

<img width="2459" height="1194" alt="image" src="https://github.com/user-attachments/assets/bf7b7321-ff1e-4217-8f3b-79cee488cfc1" />


## 🧩 نقشه راه (Roadmap)
- [ ] تکمیل احراز هویت با NextAuth (OAuth/Email/Phone)
- [ ] طراحی نهایی اسکیمای Prisma (Users, Conversations, Messages, Providers)
- [ ] اتصال به ارائه‌دهندگان LLM (OpenAI/Anthropic/Azure OpenAI) با لایه abstraction
- [ ] افزودن استریم پاسخ‌ها (Server-Sent Events)
- [ ] سیستم فایل برای آپلود/ضمائم مکالمه
- [ ] logging و ردیابی توکن‌ها
- [ ] تست‌های E2E و واحد
- [ ] Dockerfile و Compose برای استقرار آسان

## ⚙️ نصب و راه‌اندازی (Dev)

### پیش‌نیازها
- Node.js 18+
- pnpm
- (اختیاری) پایگاه داده PostgreSQL؛ در توسعه می‌توانید از SQLite استفاده کنید

### نصب
```bash
pnpm install
```

### تنظیم محیط
یک فایل `.env` بسازید و مقادیر لازم را اضافه کنید (نمونه):
```env
DATABASE_URL="file:./dev.db"         # برای SQLite در محیط توسعه
# DATABASE_URL=postgresql://user:pass@localhost:5432/aichatbot

# NEXTAUTH_SECRET=your_secret          # در صورت فعال‌سازی احراز هویت
# PROVIDER_API_KEY=...                 # کلیدهای LLM در آینده
```

### راه‌اندازی پایگاه داده
```bash
pnpm dlx prisma migrate dev --name init
pnpm dlx prisma generate
```

### اجرای توسعه
```bash
pnpm dev
```

## 🧠 معماری منطقی (High-level)
- لایه Presentation: صفحات و API Routes در Next.js
- لایه Domain/Service: مدیریت گفتگوها، قالب پیام‌ها، و سیاست‌ها
- لایه Provider: انتزاع اتصال به مدل‌های مختلف زبانی (WIP)
- لایه Data: Prisma ORM برای دیتابیس

<!-- نیاز به دیاگرام Sequence یا Flow در صورت تمایل -->

## 🧪 داده نمونه
- داده‌های نمونه برای تست UI و لاجیک در پوشه `src/data` قرار می‌گیرد (در صورت اضافه شدن).

## 🔒 ملاحظات امنیتی
- این پروژه **Production-ready نیست**؛ هیچ تضمین امنیتی برای محیط واقعی ندارد.
- احراز هویت، مدیریت نقش، rate limiting و محافظت API باید قبل از استقرار پیاده‌سازی و تست شوند.

## 🤝 مشارکت
Pull Request‌ها پذیرفته می‌شوند؛ لطفاً ابتدا Issue ایجاد کنید و پیشنهاد خود را مطرح کنید.

> وضعیت: این پروژه هنوز کامل نشده و **آماده استفاده در محیط تولیدی نیست**؛ تغییرات شکستن‌دار محتمل است. 
