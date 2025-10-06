<div align="center">

# 🇪🇬 موقع المرشح محمد إبراهيم علي الناغي

<img src="https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js" />
<img src="https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react" />
<img src="https://img.shields.io/badge/Node.js-18-green?style=for-the-badge&logo=node.js" />
<img src="https://img.shields.io/badge/MongoDB-Atlas-green?style=for-the-badge&logo=mongodb" />
<img src="https://img.shields.io/badge/Tailwind-CSS-blue?style=for-the-badge&logo=tailwindcss" />

**موقع ويب احترافي متكامل للمرشح محمد إبراهيم علي الناغي**

**دائرة منية النصر والجمالية - محافظة الدقهلية**

[التوثيق الكامل](DOCUMENTATION.md) • [دليل التثبيت](INSTALLATION.md) • [الإبلاغ عن مشكلة](#)

</div>

---

## 📋 نظرة عامة

موقع انتخابي شامل وحديث يجمع بين التصميم العصري والوظائف المتقدمة لخدمة المرشح والناخبين.

### ✨ المميزات الرئيسية

<table>
<tr>
<td width="50%">

#### للناخبين
- 🏠 **الصفحة الرئيسية**: عرض جذاب وشامل
- 👤 **السيرة الذاتية**: نبذة كاملة عن المرشح
- 📋 **البرنامج الانتخابي**: محاور واضحة ومفصلة
- 📰 **الأخبار والأنشطة**: تحديثات مستمرة
- 📅 **الفعاليات**: جدول اللقاءات القادمة
- 💬 **اسأل النائب**: نموذج تواصل مباشر
- 🗺️ **خريطة تفاعلية**: عرض مناطق الدائرة
- 🏛️ **الخدمات الحكومية**: روابط سريعة

</td>
<td width="50%">

#### للإدارة
- 🎛️ **لوحة تحكم شاملة**: إحصائيات وتحليلات
- 📝 **إدارة المحتوى**: أخبار، فعاليات، برنامج
- 📧 **إدارة الرسائل**: استقبال والرد على الاستفسارات
- 🖼️ **مكتبة إعلامية**: رفع وإدارة الصور والفيديو
- 👥 **إدارة المستخدمين**: صلاحيات متعددة
- 📊 **التقارير**: متابعة الأداء والتفاعل
- 🔒 **الأمان**: تشفير وحماية شاملة
- 🚀 **سرعة الأداء**: تحسين مستمر

</td>
</tr>
</table>

---

## 🛠️ التقنيات المستخدمة

### Frontend Stack
```
Next.js 14          →  React Framework مع SSR
Tailwind CSS        →  تصميم حديث ومتجاوب
React Hook Form     →  إدارة النماذج
Leaflet             →  الخرائط التفاعلية
Axios               →  HTTP Client
Framer Motion       →  الحركات والانتقالات
```

### Backend Stack
```
Node.js + Express   →  RESTful API
MongoDB Atlas       →  قاعدة بيانات سحابية
Mongoose            →  ODM
JWT                 →  Authentication & Authorization
bcryptjs            →  تشفير كلمات المرور
Multer              →  رفع الملفات
```

### Security & Performance
```
Helmet              →  HTTP Headers Security
CORS                →  Cross-Origin Protection
Rate Limiting       →  حماية من الهجمات
Compression         →  ضغط الاستجابات
Morgan              →  Logging
```

---

## 🚀 التثبيت والتشغيل السريع

### المتطلبات الأساسية
- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB Atlas Account

### التشغيل الأوتوماتيكي

#### على Linux/Mac:
```bash
cd /path/to/elnagy
chmod +x start.sh
./start.sh
```

#### على Windows:
```cmd
cd C:\path\to\elnagy
start.bat
```

### التشغيل اليدوي

```bash
# 1. Backend
cd backend
npm install
npm run seed      # مرة واحدة فقط
npm run dev

# 2. Frontend (في terminal جديد)
cd frontend
npm install
npm run dev
```

### الوصول للموقع
- 🌐 **الموقع العام:** http://localhost:3000
- 📡 **API Backend:** http://localhost:5000
- 🔐 **لوحة الإدارة:** http://localhost:3000/admin/login

### بيانات الدخول الافتراضية
```
اسم المستخدم: admin
كلمة المرور: admin123
```

---

## 📂 هيكل المشروع

```
elnagy/
│
├── 📄 README.md                    # هذا الملف
├── 📄 DOCUMENTATION.md             # توثيق شامل
├── 📄 INSTALLATION.md              # دليل التثبيت المفصل
│
├── 🖥️ backend/                     # Node.js + Express API
│   ├── config/                    # إعدادات قاعدة البيانات
│   ├── models/                    # MongoDB Models
│   ├── routes/                    # API Endpoints
│   ├── middleware/                # Authentication & Validation
│   ├── scripts/                   # Database Seeding
│   ├── uploads/                   # الملفات المرفوعة
│   └── server.js                  # نقطة الدخول
│
├── 🌐 frontend/                    # Next.js Application
│   ├── src/
│   │   ├── components/           # React Components
│   │   ├── pages/                # صفحات الموقع
│   │   ├── styles/               # Tailwind CSS
│   │   └── lib/                  # API Client & Utilities
│   ├── public/                   # Static Assets
│   └── next.config.js            # Next.js Config
│
├── 🚀 start.sh                     # تشغيل أوتوماتيكي (Linux/Mac)
└── 🚀 start.bat                    # تشغيل أوتوماتيكي (Windows)
```

---

## 🗂️ قاعدة البيانات (MongoDB Collections)

| Collection | الوصف | الحقول الرئيسية |
|-----------|-------|-----------------|
| **users** | مستخدمي لوحة الإدارة | username, password, role, email |
| **messages** | رسائل المواطنين | name, contact, message, status, response |
| **news** | الأخبار والأنشطة | title, body, category, mediaUrl, views |
| **events** | الفعاليات | title, date, time, location, category |
| **program** | البرنامج الانتخابي | category, title, description, points |
| **media** | المكتبة الإعلامية | title, url, type, category, views |

---

## 🔒 الأمان والحماية

✅ **تشفير كلمات المرور** - bcrypt مع 10 salt rounds  
✅ **JWT Authentication** - توكنات آمنة مع انتهاء صلاحية  
✅ **Rate Limiting** - حماية من هجمات DDoS  
✅ **Helmet Security** - حماية HTTP Headers  
✅ **CORS Protection** - تحكم في المصادر  
✅ **Input Validation** - التحقق من جميع المدخلات  
✅ **File Upload Security** - فلترة أنواع وأحجام الملفات  
✅ **SQL Injection Prevention** - استخدام Mongoose ODM  

---

## 📱 الصفحات المتاحة

### للزوار
- `/` - الصفحة الرئيسية
- `/biography` - السيرة الذاتية
- `/program` - البرنامج الانتخابي
- `/news` - الأخبار والأنشطة
- `/events` - الفعاليات
- `/contact` - اسأل النائب
- `/map` - الخريطة التفاعلية
- `/services` - الخدمات الحكومية

### للإدارة
- `/admin/login` - تسجيل الدخول
- `/admin/dashboard` - لوحة التحكم
- `/admin/news` - إدارة الأخبار
- `/admin/events` - إدارة الفعاليات
- `/admin/messages` - إدارة الرسائل
- `/admin/program` - إدارة البرنامج
- `/admin/media` - المكتبة الإعلامية

---

## 🚢 النشر (Deployment)

### Backend
- **Railway** / **Heroku** / **DigitalOcean** / **AWS**
- تحديث Environment Variables
- استخدام PM2 للتشغيل المستمر

### Frontend
- **Vercel** (موصى به) / **Netlify**
- ربط مع GitHub للنشر التلقائي
- تحديث API URL

---

## 📚 التوثيق الإضافي

- 📖 [دليل التثبيت الكامل](INSTALLATION.md)
- 📘 [التوثيق الشامل](DOCUMENTATION.md)
- 🔌 API Documentation - متوفر في DOCUMENTATION.md
- 🎨 دليل التخصيص - راجع التوثيق

---

## 🐛 استكشاف الأخطاء

### Backend لا يعمل؟
```bash
# تحقق من MongoDB Connection
ping cluster4u.ohkte6t.mongodb.net

# تحقق من المنفذ
lsof -i :5000
```

### Frontend لا يعمل؟
```bash
# امسح cache
rm -rf .next
npm run build
```

### مشاكل Authentication؟
```javascript
// في Console
localStorage.clear()
```

---

## 🤝 المساهمة

هذا المشروع تم تطويره خصيصاً للمرشح محمد إبراهيم علي الناغي.

---

## 📞 التواصل والدعم

- 📧 للدعم الفني: راجع [DOCUMENTATION.md](DOCUMENTATION.md)
- 🐛 للإبلاغ عن مشكلة: افتح Issue
- 💡 للاقتراحات: تواصل مع فريق التطوير

---

## 📄 الترخيص

© 2024 - جميع الحقوق محفوظة للمرشح محمد إبراهيم علي الناغي

---

<div align="center">

**صُنع بكل ❤️ واحترافية لخدمة الدائرة والمواطنين**

**نائب من أجل مستقبل أفضل** 🇪🇬

</div>
