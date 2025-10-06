# 🚀 دليل النشر السريع - Netlify & GitHub

## 📋 المتطلبات

✅ حساب GitHub  
✅ حساب Netlify  
✅ MongoDB Atlas (للـ Backend)  
✅ الصورة الشخصية (`profile.jpg`)

---

## 🎯 خطوات النشر

### 1️⃣ إعداد الصورة الشخصية

```bash
# انسخ صورتك إلى المجلد الصحيح
cp /path/to/your/photo.jpg frontend/public/images/profile.jpg
```

**المواصفات:**
- الحجم: 500x500 بكسل
- الصيغة: JPG أو PNG
- الحجم: < 500KB

---

### 2️⃣ تعديل ملف اللوجو

في `frontend/src/components/Navbar.js`، ابحث عن السطر:

```javascript
{/* Uncomment when profile.jpg is added: */}
```

وقم بحذف التعليق من الكود التالي:

```javascript
<Image 
  src="/images/profile.jpg" 
  alt="محمد الناغي"
  fill
  className="object-cover"
  priority
/>
```

واحذف أو علّق على div الـ placeholder.

---

### 3️⃣ الرفع على GitHub

```bash
# تهيئة Git
cd /home/tarek/Desktop/elnagy
git init

# إضافة الملفات
git add .

# Commit
git commit -m "🎨 Initial commit: Modern 2026 design with Glassmorphism"

# إنشاء Branch
git branch -M main

# ربط Remote Repository (غيّر YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/elnagy.git

# Push
git push -u origin main
```

---

### 4️⃣ نشر Frontend على Netlify

#### أ) عبر الموقع:

1. اذهب إلى https://app.netlify.com
2. اضغط **"New site from Git"**
3. اختر **GitHub** وقم بالربط
4. اختر repository: `elnagy`
5. إعدادات Build:

```
Base directory: frontend
Build command: npm run build
Publish directory: .next
```

6. اضغط **"Deploy site"**

#### ب) Environment Variables:

في **Site settings** → **Environment variables**، أضف:

```
NEXT_PUBLIC_API_URL = https://your-backend-url.com/api
```

---

### 5️⃣ نشر Backend

#### الخيار 1: Render.com (مجاني) ✅

1. اذهب إلى https://render.com
2. اضغط **"New +"** → **"Web Service"**
3. ربط GitHub repository
4. اختر مجلد `backend`
5. الإعدادات:

```
Build Command: npm install
Start Command: npm start
Environment: Node
```

6. Environment Variables:

```
PORT = 5000
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/elnagy_db
JWT_SECRET = your_super_secret_key_12345
NODE_ENV = production
FRONTEND_URL = https://your-netlify-site.netlify.app
```

#### الخيار 2: Railway.app (مجاني) ✅

1. اذهب إلى https://railway.app
2. **"New Project"** → **"Deploy from GitHub"**
3. اختر repository
4. اختر `backend` folder
5. أضف Environment Variables كما في الأعلى

---

### 6️⃣ ربط Frontend بـ Backend

بعد نشر Backend، احصل على URL (مثلاً):

```
https://elnagy-backend.onrender.com
```

ثم في **Netlify**:
1. اذهب إلى **Site settings** → **Environment variables**
2. عدّل `NEXT_PUBLIC_API_URL`:

```
NEXT_PUBLIC_API_URL = https://elnagy-backend.onrender.com/api
```

3. اضغط **"Redeploy"** في Netlify

---

### 7️⃣ تشغيل السكريبت الأولي

بعد نشر Backend، شغّل السكريبت لإضافة البيانات:

#### عبر Render.com:

1. اذهب إلى **Shell** في لوحة التحكم
2. شغّل:

```bash
npm run seed
```

#### عبر Terminal محلي:

```bash
# ستحتاج لتحديث MONGODB_URI في ملف .env المحلي
cd backend
npm run seed
```

---

### 8️⃣ التحقق من النشر

#### Frontend (Netlify):
- افتح: `https://your-site.netlify.app`
- تحقق من:
  - ✅ اللوجو يعرض الصورة الشخصية
  - ✅ الألوان الجديدة ظاهرة
  - ✅ التأثيرات تعمل

#### Backend (Render/Railway):
- افتح: `https://your-backend.onrender.com/api/health`
- يجب أن ترى: `{"status": "ok"}`

---

### 9️⃣ تسجيل الدخول للوحة التحكم

```
URL: https://your-site.netlify.app/admin/login

Username: admin
Password: admin123
```

⚠️ **مهم**: غيّر كلمة المرور فوراً!

---

## 🎨 تخصيص إضافي

### تغيير الألوان:

عدّل `frontend/tailwind.config.js`:

```javascript
colors: {
  primary: { 500: '#6366f1' },
  neon: { 500: '#d946ef' },
  // ... إلخ
}
```

### تغيير روابط التواصل:

عدّل في `frontend/src/components/Navbar.js`:

```javascript
<motion.a href="https://facebook.com/YOUR_PAGE">
  <FaFacebook />
</motion.a>
```

---

## 🔧 استكشاف الأخطاء

### الموقع لا يعمل:

1. تحقق من Netlify Logs
2. تحقق من Environment Variables
3. تحقق من Backend URL

### الصورة لا تظهر:

1. تحقق من مسار الملف: `frontend/public/images/profile.jpg`
2. تحقق من حجم الملف (< 500KB)
3. امسح Cache في المتصفح

### Backend لا يعمل:

1. تحقق من MongoDB URI
2. تحقق من Environment Variables
3. شغّل `npm run seed` مرة أخرى

---

## 📞 الدعم

للمساعدة: افتح Issue في GitHub

---

✅ **تم! موقعك الآن على الإنترنت** 🎉

**رابط الموقع**: `https://your-site.netlify.app`
