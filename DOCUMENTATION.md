# 📘 دليل موقع المرشح محمد إبراهيم علي الناغي - التوثيق الكامل

## 📋 جدول المحتويات
1. [نظرة عامة](#نظرة-عامة)
2. [التقنيات المستخدمة](#التقنيات-المستخدمة)
3. [التثبيت والتشغيل](#التثبيت-والتشغيل)
4. [هيكل المشروع](#هيكل-المشروع)
5. [API Documentation](#api-documentation)
6. [قاعدة البيانات](#قاعدة-البيانات)
7. [لوحة الإدارة](#لوحة-الإدارة)
8. [الأمان](#الأمان)
9. [النشر](#النشر)
10. [استكشاف الأخطاء](#استكشاف-الأخطاء)

---

## 🎯 نظرة عامة

موقع ويب احترافي متكامل للمرشح **محمد إبراهيم علي الناغي** عن دائرة منية النصر والجمالية - محافظة الدقهلية.

### المميزات الرئيسية:
- ✅ تصميم عصري ومتجاوب (Responsive)
- ✅ لوحة إدارة كاملة
- ✅ نظام إدارة محتوى شامل
- ✅ خريطة تفاعلية للدائرة
- ✅ نموذج "اسأل النائب"
- ✅ روابط الخدمات الحكومية
- ✅ مكتبة وعي سياسي
- ✅ إدارة الفعاليات واللقاءات
- ✅ تأمين شامل للبيانات

---

## 🛠 التقنيات المستخدمة

### Frontend
- **Next.js 14** - React Framework مع SSR
- **Tailwind CSS** - تصميم حديث
- **React Hook Form** - إدارة النماذج
- **Leaflet** - الخرائط التفاعلية
- **Axios** - HTTP Client
- **React Icons** - الأيقونات

### Backend
- **Node.js** - بيئة التشغيل
- **Express.js** - Web Framework
- **MongoDB Atlas** - قاعدة البيانات السحابية
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - تشفير كلمات المرور
- **Multer** - رفع الملفات

### الأمان
- Helmet - HTTP Headers Security
- CORS - Cross-Origin Resource Sharing
- Rate Limiting - حماية من الهجمات
- Express Validator - التحقق من البيانات

---

## 🚀 التثبيت والتشغيل

### المتطلبات الأساسية
```bash
Node.js >= 18.0.0
npm >= 9.0.0
MongoDB Atlas Account (مجاني)
```

### طريقة 1: التشغيل الأوتوماتيكي

#### على Linux/Mac:
```bash
cd /home/tarek/Desktop/elnagy
./start.sh
```

#### على Windows:
```cmd
cd C:\path\to\elnagy
start.bat
```

### طريقة 2: التشغيل اليدوي

#### 1. Backend
```bash
cd backend
npm install
npm run seed    # مرة واحدة فقط
npm run dev
```

#### 2. Frontend (في نافذة terminal جديدة)
```bash
cd frontend
npm install
npm run dev
```

### الوصول للموقع
- **الموقع العام:** http://localhost:3000
- **API Backend:** http://localhost:5000
- **لوحة الإدارة:** http://localhost:3000/admin/login

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
├── backend/                    # Node.js Backend
│   ├── config/
│   │   └── database.js        # إعدادات MongoDB
│   │
│   ├── models/                # MongoDB Models
│   │   ├── User.js            # نموذج المستخدمين
│   │   ├── Message.js         # نموذج الرسائل
│   │   ├── News.js            # نموذج الأخبار
│   │   ├── Event.js           # نموذج الفعاليات
│   │   ├── Program.js         # نموذج البرنامج الانتخابي
│   │   └── Media.js           # نموذج الملفات
│   │
│   ├── routes/                # API Routes
│   │   ├── auth.js            # المصادقة
│   │   ├── messages.js        # الرسائل
│   │   ├── news.js            # الأخبار
│   │   ├── events.js          # الفعاليات
│   │   ├── program.js         # البرنامج
│   │   └── media.js           # الملفات
│   │
│   ├── middleware/            # Middleware
│   │   ├── auth.js            # JWT Authentication
│   │   ├── error.js           # Error Handler
│   │   └── upload.js          # File Upload
│   │
│   ├── scripts/
│   │   └── seed.js            # تعبئة البيانات
│   │
│   ├── uploads/               # الملفات المرفوعة
│   ├── .env                   # متغيرات البيئة
│   ├── package.json
│   └── server.js              # نقطة الدخول
│
├── frontend/                  # Next.js Frontend
│   ├── src/
│   │   ├── components/        # React Components
│   │   │   ├── Layout.js
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   ├── AdminLayout.js
│   │   │   ├── InteractiveMap.js
│   │   │   └── withAuth.js
│   │   │
│   │   ├── pages/             # صفحات الموقع
│   │   │   ├── index.js       # الصفحة الرئيسية
│   │   │   ├── biography.js   # السيرة الذاتية
│   │   │   ├── program.js     # البرنامج الانتخابي
│   │   │   ├── news/
│   │   │   │   └── index.js   # الأخبار
│   │   │   ├── events.js      # الفعاليات
│   │   │   ├── contact.js     # اسأل النائب
│   │   │   ├── map.js         # الخريطة التفاعلية
│   │   │   ├── services.js    # الخدمات
│   │   │   └── admin/         # لوحة الإدارة
│   │   │       ├── login.js
│   │   │       └── dashboard.js
│   │   │
│   │   ├── styles/
│   │   │   └── globals.css    # Tailwind + Custom CSS
│   │   │
│   │   └── lib/
│   │       └── api.js         # API Client
│   │
│   ├── public/                # Static Files
│   ├── .env.local             # Environment Variables
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   └── jsconfig.json
│
├── README.md                  # نظرة عامة
├── INSTALLATION.md            # دليل التثبيت
├── DOCUMENTATION.md           # هذا الملف
├── start.sh                   # تشغيل أوتوماتيكي (Linux/Mac)
└── start.bat                  # تشغيل أوتوماتيكي (Windows)
```

---

## 🔌 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
جميع الـ endpoints المحمية تتطلب JWT Token في الـ Header:
```
Authorization: Bearer <token>
```

### Endpoints

#### 🔐 Authentication

**POST** `/api/auth/login`
```json
Request:
{
  "username": "admin",
  "password": "admin123"
}

Response:
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": "...",
    "username": "admin",
    "fullName": "مدير النظام",
    "role": "admin"
  }
}
```

**GET** `/api/auth/me` 🔒
- يتطلب Authentication
- يعيد بيانات المستخدم الحالي

**PUT** `/api/auth/update-password` 🔒
```json
{
  "currentPassword": "old_password",
  "newPassword": "new_password"
}
```

#### 📰 News

**GET** `/api/news`
- Query Parameters: `category`, `isFeatured`, `page`, `limit`
- Response: قائمة الأخبار مع Pagination

**GET** `/api/news/:id`
- Response: تفاصيل خبر محدد

**POST** `/api/news` 🔒
```json
{
  "title": "عنوان الخبر",
  "body": "محتوى الخبر",
  "summary": "ملخص",
  "category": "أخبار",
  "mediaUrl": [
    {
      "type": "image",
      "url": "/uploads/image.jpg",
      "caption": "وصف الصورة"
    }
  ],
  "tags": ["تعليم", "صحة"],
  "location": "منية النصر",
  "isPublished": true,
  "isFeatured": false
}
```

**PUT** `/api/news/:id` 🔒
**DELETE** `/api/news/:id` 🔒 (Admin/Moderator فقط)

#### 📧 Messages

**GET** `/api/messages` 🔒
- Query Parameters: `status`, `category`, `priority`, `page`, `limit`

**GET** `/api/messages/:id` 🔒

**POST** `/api/messages` (عام - لا يتطلب Authentication)
```json
{
  "name": "أحمد محمد",
  "contact": "01234567890",
  "contactType": "phone",
  "message": "الرسالة هنا...",
  "category": "استفسار",
  "location": "قرية الرياض"
}
```

**PUT** `/api/messages/:id` 🔒
```json
{
  "status": "تم الرد",
  "response": "الرد على الرسالة",
  "priority": "مهمة"
}
```

**DELETE** `/api/messages/:id` 🔒 (Admin فقط)

**GET** `/api/messages/stats/summary` 🔒
- إحصائيات الرسائل

#### 📅 Events

**GET** `/api/events`
- Query Parameters: `category`, `upcoming`, `page`, `limit`

**GET** `/api/events/:id`

**POST** `/api/events` 🔒
```json
{
  "title": "لقاء شعبي",
  "description": "لقاء مع أهالي القرية",
  "date": "2024-12-15",
  "time": "6:00 مساءً",
  "location": "قاعة المؤتمرات",
  "locationCoordinates": {
    "lat": 31.1656,
    "lng": 31.7178
  },
  "category": "لقاء شعبي",
  "capacity": 200,
  "registrationLink": "https://...",
  "isPublished": true
}
```

**PUT** `/api/events/:id` 🔒
**DELETE** `/api/events/:id` 🔒

#### 📋 Program

**GET** `/api/program`
- Query: `category`

**POST** `/api/program` 🔒
```json
{
  "category": "تعليم",
  "title": "تطوير المدارس",
  "description": "رفع كفاءة المدارس",
  "points": [
    "صيانة المباني",
    "توفير وسائل تعليمية"
  ],
  "order": 1
}
```

**PUT** `/api/program/:id` 🔒
**DELETE** `/api/program/:id` 🔒

#### 🖼 Media

**GET** `/api/media`
- Query: `type`, `category`, `page`, `limit`

**POST** `/api/media/upload` 🔒
- Content-Type: multipart/form-data
- Fields: `file`, `title`, `description`, `category`, `tags`

**PUT** `/api/media/:id` 🔒
**DELETE** `/api/media/:id` 🔒

---

## 💾 قاعدة البيانات

### MongoDB Collections

#### users
```javascript
{
  username: String (unique),
  password: String (hashed),
  role: String (admin/moderator/editor),
  fullName: String,
  email: String (unique),
  isActive: Boolean,
  lastLogin: Date,
  createdAt: Date,
  updatedAt: Date
}
```

#### messages
```javascript
{
  name: String,
  contact: String,
  contactType: String (phone/email/whatsapp),
  message: String,
  category: String (استفسار/شكوى/مقترح/...),
  status: String (جديدة/قيد المراجعة/تم الرد/مغلقة),
  priority: String (عادية/مهمة/عاجلة),
  response: String,
  respondedBy: ObjectId (ref: User),
  respondedAt: Date,
  location: String,
  createdAt: Date
}
```

#### news
```javascript
{
  title: String,
  body: String,
  summary: String,
  category: String (أخبار/أنشطة/...),
  mediaUrl: [{
    type: String,
    url: String,
    caption: String
  }],
  tags: [String],
  location: String,
  isPublished: Boolean,
  isFeatured: Boolean,
  views: Number,
  author: ObjectId (ref: User),
  publishedAt: Date,
  createdAt: Date
}
```

#### events
```javascript
{
  title: String,
  description: String,
  date: Date,
  time: String,
  location: String,
  locationCoordinates: {
    lat: Number,
    lng: Number
  },
  category: String,
  capacity: Number,
  registrationLink: String,
  isPublished: Boolean,
  isFeatured: Boolean,
  registeredCount: Number
}
```

#### program
```javascript
{
  category: String,
  title: String,
  description: String,
  points: [String],
  order: Number,
  isActive: Boolean
}
```

#### media
```javascript
{
  title: String,
  description: String,
  url: String,
  type: String (image/video/document),
  category: String,
  tags: [String],
  fileSize: Number,
  mimeType: String,
  isPublic: Boolean,
  uploadedBy: ObjectId (ref: User),
  uploadedAt: Date,
  views: Number
}
```

---

## 🎛 لوحة الإدارة

### الوصول
```
URL: http://localhost:3000/admin/login
Username: admin
Password: admin123
```

### الصلاحيات

#### Admin (المدير)
- جميع الصلاحيات
- إضافة مستخدمين جدد
- حذف المحتوى
- إدارة النظام

#### Moderator (مشرف)
- إدارة المحتوى
- حذف الأخبار والفعاليات
- الرد على الرسائل

#### Editor (محرر)
- إضافة وتعديل المحتوى
- عرض الرسائل

### الأقسام

#### Dashboard (لوحة التحكم)
- إحصائيات شاملة
- روابط سريعة
- آخر النشاطات

#### الأخبار
- عرض جميع الأخبار
- إضافة خبر جديد
- تعديل/حذف
- فلترة حسب الفئة

#### الفعاليات
- جدولة الفعاليات
- إدارة التسجيلات
- تحديد الموقع على الخريطة

#### الرسائل
- عرض جميع الرسائل
- تصنيف حسب الحالة
- الرد على الرسائل
- تحديد الأولوية

#### البرنامج الانتخابي
- إدارة المحاور
- ترتيب العرض
- تحديد الأيقونات

#### المكتبة الإعلامية
- رفع الصور والفيديو
- تصنيف الملفات
- إدارة الأذونات

---

## 🔒 الأمان

### التشفير
- كلمات المرور: bcrypt (10 salt rounds)
- JWT Token: HS256
- HTTPS (في الإنتاج)

### الحماية
```javascript
// Rate Limiting
{
  windowMs: 10 * 60 * 1000,  // 10 دقائق
  max: 100                    // 100 طلب
}

// Helmet Security Headers
- XSS Protection
- Content Security Policy
- HSTS
- Frame Guard

// CORS
{
  origin: process.env.FRONTEND_URL,
  credentials: true
}
```

### التحقق من البيانات
- Express Validator على جميع المدخلات
- Mongoose Schema Validation
- File Type Validation
- File Size Limits (5MB)

### أفضل الممارسات
1. تغيير JWT_SECRET في الإنتاج
2. استخدام HTTPS
3. تحديث كلمات المرور بانتظام
4. مراقبة Logs
5. Backup منتظم لقاعدة البيانات

---

## 🚢 النشر (Deployment)

### Backend

#### Option 1: Railway
```bash
railway login
railway init
railway add
railway up
```

#### Option 2: Heroku
```bash
heroku create elnagy-api
git push heroku main
```

#### Option 3: DigitalOcean/AWS
1. إنشاء Droplet/EC2
2. تثبيت Node.js
3. Clone المشروع
4. PM2 للتشغيل المستمر

```bash
npm install -g pm2
pm2 start server.js --name elnagy-backend
pm2 startup
pm2 save
```

### Frontend

#### Option 1: Vercel (موصى به)
```bash
npm install -g vercel
vercel
```

#### Option 2: Netlify
```bash
npm run build
netlify deploy --prod
```

### Environment Variables
تأكد من تحديث:
- `MONGODB_URI`
- `JWT_SECRET`
- `FRONTEND_URL`
- `NODE_ENV=production`

---

## 🐛 استكشاف الأخطاء

### Backend لا يعمل

```bash
# تحقق من MongoDB
ping cluster4u.ohkte6t.mongodb.net

# تحقق من المنفذ
lsof -i :5000

# تحقق من Logs
npm run dev
```

### Frontend لا يعمل

```bash
# امسح cache
rm -rf .next
npm run build
npm run dev

# تحقق من الاتصال بـ API
curl http://localhost:5000/api/health
```

### مشاكل MongoDB

```bash
# اختبر الاتصال
node -e "require('./backend/config/database')()"

# تحقق من IP Whitelist في MongoDB Atlas
```

### مشاكل Authentication

```bash
# امسح localStorage
localStorage.clear()

# تحقق من Token
console.log(localStorage.getItem('token'))
```

---

## 📞 الدعم

للمساعدة والاستفسارات:
1. راجع هذا الملف
2. تحقق من Console للأخطاء
3. راجع Network Tab في Developer Tools
4. تحقق من MongoDB Atlas Dashboard

---

## 📝 ملاحظات إضافية

### التخصيص
- ألوان Tailwind: `frontend/tailwind.config.js`
- محتوى السيرة الذاتية: `frontend/src/pages/biography.js`
- معلومات التواصل: `frontend/src/components/Footer.js`
- إحداثيات الخريطة: `frontend/src/pages/map.js`

### التوسع المستقبلي
- [ ] تطبيق موبايل (React Native)
- [ ] نظام الإشعارات (Push Notifications)
- [ ] Chat Bot
- [ ] تكامل مع WhatsApp API
- [ ] نظام التصويت الإلكتروني
- [ ] تحليلات متقدمة (Advanced Analytics)

---

**تم التطوير بكل احترافية لخدمة المرشح محمد إبراهيم علي الناغي** 🇪🇬

**© 2024 - جميع الحقوق محفوظة**
