# 🌟 موقع المرشح محمد الناغي

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind-3-38bdf8?style=for-the-badge&logo=tailwind-css)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)

**موقع إلكتروني احترافي بتصميم 2026 مع Glassmorphism & Neon Effects**

[🚀 Demo](#) | [📖 Documentation](#) | [🐛 Report Bug](#)

</div>

---

## ✨ المميزات الرئيسية

### 🎨 تصميم عصري 2026
- ✅ **Glassmorphism** - تأثيرات زجاجية شفافة
- ✅ **Neon Gradients** - تدرجات نيون متوهجة
- ✅ **Animated Logo** - لوجو متحرك مع صورة المرشح
- ✅ **Cyber Grid** - خلفيات شبكية مستقبلية
- ✅ **Particles Animation** - جزيئات متحركة
- ✅ **Responsive Design** - متجاوب 100%

### 🔥 تقنيات حديثة
- **Frontend**: Next.js 14, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express, MongoDB Atlas
- **Security**: JWT, bcrypt, Helmet, Rate Limiting
- **Deployment**: Netlify + MongoDB Atlas

---

## 📦 البنية

```
elnagy/
├── frontend/                    # تطبيق Next.js
│   ├── public/images/          # 📸 ضع profile.jpg هنا
│   ├── src/
│   │   ├── pages/              # صفحات الموقع
│   │   ├── components/         # Navbar, Footer, etc.
│   │   ├── lib/                # API client
│   │   └── styles/             # Global CSS
│   └── tailwind.config.js      # 🎨 نظام الألوان
│
├── backend/                     # خادم Express
│   ├── models/                 # MongoDB Models
│   ├── routes/                 # API Routes
│   ├── middleware/             # Auth, Error handling
│   └── config/                 # Database config
│
└── docs/                       # التوثيق
```

---

## 🚀 التثبيت السريع

### ⚡ 1. Clone المشروع

```bash
git clone https://github.com/YOUR_USERNAME/elnagy.git
cd elnagy
```

### ⚡ 2. إعداد Backend

```bash
cd backend
npm install

# إنشاء ملف .env
cat > .env << EOL
PORT=5000
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/elnagy_db
JWT_SECRET=your_super_secret_jwt_key_change_this
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
EOL

# تشغيل السكريبت الأولي
npm run seed

# تشغيل الخادم
npm run dev
```

### ⚡ 3. إعداد Frontend

```bash
cd ../frontend
npm install

# إنشاء ملف .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:5000/api" > .env.local

# تشغيل التطبيق
npm run dev
```

### 📸 4. إضافة الصورة الشخصية

```bash
# ضع صورة المرشح في:
cp your-photo.jpg frontend/public/images/profile.jpg
```

**المواصفات المطلوبة:**
- الحجم: 500x500 بكسل (مربعة)
- الصيغة: JPG أو PNG
- الحجم الأقصى: 500KB

---

## 🌐 النشر على Netlify

### 📋 الخطوات

#### 1️⃣ تجهيز المشروع

```bash
cd frontend
npm run build
```

#### 2️⃣ الرفع على GitHub

```bash
git init
git add .
git commit -m "🎨 Initial commit: Modern 2026 design"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/elnagy.git
git push -u origin main
```

#### 3️⃣ ربط Netlify

1. افتح [Netlify](https://app.netlify.com)
2. اضغط **"New site from Git"**
3. اختر **GitHub** repository
4. إعدادات Build:

```yaml
Base directory: frontend
Build command: npm run build
Publish directory: .next
```

#### 4️⃣ متغيرات البيئة

في **Netlify Dashboard** → **Site settings** → **Environment variables**:

```
NEXT_PUBLIC_API_URL=https://your-backend-url.herokuapp.com/api
```

### 🔗 نشر Backend

يمكنك نشر Backend على:
- **Render.com** (مجاني)
- **Railway.app** (مجاني)
- **Heroku** (مدفوع)

---

## 🎨 تخصيص الألوان

في `frontend/tailwind.config.js`:

```javascript
colors: {
  primary: '#6366f1',    // Indigo
  neon: '#d946ef',       // Magenta
  cyan: '#22d3ee',       // Cyan
  lime: '#84cc16',       // Lime
  purple: '#a855f7',     // Purple
  gold: '#f59e0b',       // Amber
}
```

### 🌈 نظام الألوان 2026

| اللون | الاستخدام | Hex |
|------|----------|-----|
| **Primary** | العناصر الرئيسية | `#6366f1` |
| **Neon** | التأثيرات المتوهجة | `#d946ef` |
| **Cyan** | الروابط والأيقونات | `#22d3ee` |
| **Lime** | الأزرار الثانوية | `#84cc16` |
| **Purple** | التدرجات | `#a855f7` |
| **Gold** | التفاصيل | `#f59e0b` |

---

## 📱 الصفحات

| الصفحة | المسار | الوصف |
|-------|--------|-------|
| 🏠 الرئيسية | `/` | Hero + أحدث الأخبار |
| 👤 السيرة الذاتية | `/biography` | معلومات المرشح |
| 📋 البرنامج الانتخابي | `/program` | الأهداف والخطط |
| 📰 الأخبار | `/news` | آخر الأنشطة |
| 📅 الفعاليات | `/events` | الفعاليات القادمة |
| 📞 اتصل بنا | `/contact` | نموذج تواصل |
| 🗺️ الخريطة | `/map` | خريطة تفاعلية |
| 🏛️ الخدمات | `/services` | روابط حكومية |
| 🔐 لوحة التحكم | `/admin` | إدارة المحتوى |

---

## 🔐 بيانات الدخول الافتراضية

```
Username: admin
Password: admin123
```

⚠️ **مهم جداً**: غيّر كلمة المرور فوراً!

```bash
# في المتصفح:
http://localhost:3000/admin/login
```

---

## 🛠️ API Endpoints

### Authentication
- `POST /api/auth/login` - تسجيل دخول
- `POST /api/auth/register` - تسجيل مستخدم جديد
- `GET /api/auth/me` - معلومات المستخدم الحالي

### Content Management
- `GET /api/news` - جلب الأخبار
- `POST /api/news` - إضافة خبر (Admin)
- `GET /api/events` - جلب الفعاليات
- `POST /api/events` - إضافة فعالية (Admin)
- `GET /api/program` - جلب البرنامج الانتخابي
- `POST /api/messages` - إرسال رسالة

---

## 🔒 الأمان

- ✅ **JWT Authentication** - مصادقة آمنة
- ✅ **Password Hashing** - bcrypt encryption
- ✅ **Rate Limiting** - 100 requests/10min
- ✅ **CORS Protection** - سياسات CORS صارمة
- ✅ **Helmet Security** - HTTP headers protection
- ✅ **Input Validation** - التحقق من المدخلات
- ✅ **MongoDB Injection Prevention** - حماية من الحقن

---

## 📊 الأداء

- ⚡ **Lighthouse Score**: 95+
- ⚡ **First Contentful Paint**: < 1.5s
- ⚡ **Time to Interactive**: < 3s
- ⚡ **SEO Score**: 100

---

## 🤝 المساهمة

نرحب بالمساهمات! للمساهمة:

1. Fork المشروع
2. إنشاء branch جديد (`git checkout -b feature/AmazingFeature`)
3. Commit التغييرات (`git commit -m 'Add some AmazingFeature'`)
4. Push للـ branch (`git push origin feature/AmazingFeature`)
5. فتح Pull Request

---

## 📝 الترخيص

جميع الحقوق محفوظة © 2025-2026 **محمد الناغي**

---

## 📞 التواصل

- 📧 Email: info@elnagy.com
- 📱 Phone: +20 XXX XXX XXXX
- 🌐 Website: [www.elnagy.com](#)

---

<div align="center">

**صُنع بـ ❤️ في مصر** 🇪🇬

[![GitHub](https://img.shields.io/badge/GitHub-Follow-black?style=for-the-badge&logo=github)](https://github.com/YOUR_USERNAME)
[![Twitter](https://img.shields.io/badge/Twitter-Follow-1DA1F2?style=for-the-badge&logo=twitter)](https://twitter.com/YOUR_USERNAME)

</div>
