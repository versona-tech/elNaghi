# 🚀 دليل نشر Backend على Render.com

<div align="center">

**نشر خادم Express + MongoDB على Render مجاناً**

موقع Frontend: https://mohamedelnagy.netlify.app

</div>

---

## 📋 المتطلبات

- ✅ حساب على [Render.com](https://render.com) (مجاني)
- ✅ المشروع على GitHub: https://github.com/versona-tech/elNaghi
- ✅ MongoDB Atlas URI (موجود)

---

## 🎯 خطوات النشر

### الطريقة 1: النشر التلقائي (موصى به)

#### 1️⃣ تسجيل الدخول إلى Render
```
https://dashboard.render.com
```
- سجل دخول بـ GitHub Account

---

#### 2️⃣ إنشاء Web Service جديد

1. اضغط **"New +"** → **"Web Service"**
2. اختر **"Build and deploy from a Git repository"**
3. **Connect GitHub Account** (إذا لم يكن متصلاً)
4. ابحث عن: **`versona-tech/elNaghi`**
5. اضغط **"Connect"**

---

#### 3️⃣ إعدادات الخدمة

املأ البيانات التالية:

| الحقل | القيمة |
|------|--------|
| **Name** | `elnagy-backend` أو أي اسم تريده |
| **Region** | `Frankfurt (EU Central)` الأقرب للمصر |
| **Branch** | `main` |
| **Root Directory** | `backend` ⚠️ مهم جداً |
| **Runtime** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Plan** | `Free` 💰 مجاني |

---

#### 4️⃣ Environment Variables (متغيرات البيئة)

اضغط **"Advanced"** → **"Add Environment Variable"

أضف المتغيرات التالية:

```bash
# 1. MongoDB Connection
MONGODB_URI = mongodb+srv://seotarek_db_user:tLlIBNo3LwVBVtaw@nagy.dg6gvmv.mongodb.net/elnagy_db

# 2. JWT Secret (مفتاح سري - غيره لأمان أفضل)
JWT_SECRET = your-super-secret-key-change-this-2026

# 3. Node Environment
NODE_ENV = production

# 4. CORS Origin (موقع Frontend)
CORS_ORIGIN = https://mohamedelnagy.netlify.app

# 5. Port (اختياري - Render يحدده تلقائياً)
PORT = 5000
```

---

#### 5️⃣ نشر الخدمة

1. اضغط **"Create Web Service"**
2. انتظر 3-5 دقائق للبناء والنشر 🔨
3. ستحصل على رابط مثل:
   ```
   https://elnagy-backend.onrender.com
   ```

---

### الطريقة 2: استخدام Render Blueprint (render.yaml)

الملف `backend/render.yaml` موجود وجاهز!

1. في Render Dashboard → **"Blueprints"**
2. **"New Blueprint Instance"**
3. اختر الريبو: `versona-tech/elNaghi`
4. سيكتشف الملف `render.yaml` تلقائياً
5. أضف **MONGODB_URI** يدوياً فقط (باقي المتغيرات تلقائية)
6. **"Apply"**

---

## ✅ التحقق من النشر

### 1. اختبار الـ API

افتح المتصفح:
```
https://YOUR-APP-NAME.onrender.com
```

يجب أن تشاهد:
```json
{
  "message": "El-Nagy Campaign API",
  "version": "1.0.0",
  "status": "running"
}
```

### 2. اختبار MongoDB Connection

```
https://YOUR-APP-NAME.onrender.com/api/news
```

يجب أن تشاهد قائمة الأخبار (أو array فارغ)

### 3. اختبار Login

```bash
POST https://YOUR-APP-NAME.onrender.com/api/auth/login
Body: {
  "email": "admin",
  "password": "admin123"
}
```

---

## 🔗 ربط Backend بـ Frontend

### الخطوة 1: نسخ رابط Backend

بعد نشر Backend بنجاح، انسخ الرابط:
```
https://elnagy-backend.onrender.com
```

### الخطوة 2: تحديث Netlify Environment Variables

1. اذهب إلى: https://app.netlify.com
2. افتح موقع **mohamedelnagy**
3. **Site settings** → **Environment variables**
4. أضف/عدّل المتغير:
   ```
   NEXT_PUBLIC_API_URL = https://elnagy-backend.onrender.com
   ```
5. **"Save"**
6. **Deploys** → **"Trigger deploy"** → **"Deploy site"**

### الخطوة 3: انتظر إعادة بناء الموقع (2-3 دقائق)

---

## 🔧 تشغيل البيانات الأولية (Seed)

بعد نشر Backend، شغّل السكريبت لإضافة البيانات:

```bash
# من جهازك المحلي
curl -X POST https://YOUR-APP-NAME.onrender.com/api/seed
```

أو زر الموقع:
```
https://YOUR-APP-NAME.onrender.com/api/seed
```

سيضيف:
- ✅ مستخدم Admin
- ✅ 3 أخبار تجريبية
- ✅ 2 فعاليات تجريبية
- ✅ برنامج انتخابي

---

## ⚠️ ملاحظات مهمة

### 1. النطاق المجاني (Free Plan)
- ⏰ الخدمة تنام بعد 15 دقيقة من عدم الاستخدام
- 🐌 أول طلب بعد النوم قد يستغرق 30-50 ثانية
- 💾 750 ساعة شهرياً (كافية للمواقع الصغيرة)

### 2. تحسين الأداء
```javascript
// إضافة Health Check لمنع النوم
// في backend/server.js (موجود بالفعل)
app.get('/', (req, res) => {
  res.json({ status: 'running' });
});
```

### 3. الأمان
⚠️ **غيّر JWT_SECRET** بعد النشر:
```bash
# استخدم مفتاح عشوائي قوي
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 4. تحديث CORS
تأكد أن `CORS_ORIGIN` يطابق رابط Netlify:
```
https://mohamedelnagy.netlify.app
```

---

## 🧪 اختبار كامل

### 1. Frontend → Backend
افتح موقع Frontend:
```
https://mohamedelnagy.netlify.app
```

### 2. افتح صفحة الأخبار
```
https://mohamedelnagy.netlify.app/news
```

يجب أن تشاهد الأخبار من Backend!

### 3. تسجيل دخول Admin
```
https://mohamedelnagy.netlify.app/admin/login
Username: admin
Password: admin123
```

---

## 📊 Dashboard Render

### مراقبة الخدمة
- **Logs**: https://dashboard.render.com → Your Service → Logs
- **Metrics**: CPU, Memory, Bandwidth
- **Events**: Deploy History

### إعادة النشر
```
Deploys → Manual Deploy → "Deploy latest commit"
```

---

## 🆘 حل المشاكل

### المشكلة 1: "Application Failed to Respond"
**الحل:**
- تحقق من `package.json` أن `"start": "node server.js"` موجود
- تحقق أن `PORT` يأخذ قيمة من `process.env.PORT`

### المشكلة 2: "Cannot Connect to MongoDB"
**الحل:**
- تحقق من صحة `MONGODB_URI`
- تأكد أن MongoDB Atlas يسمح بـ IP: `0.0.0.0/0`

### المشكلة 3: CORS Error في Frontend
**الحل:**
- تحقق من `CORS_ORIGIN` في Render
- تأكد أنه يطابق رابط Netlify بالضبط

### المشكلة 4: الخدمة بطيئة
**الحل:**
- هذا طبيعي في Free Plan
- الخدمة تنام بعد 15 دقيقة
- استخدم خطة مدفوعة للمواقع الحية

---

## 🎯 الخطوات النهائية

### ✅ Checklist
- [ ] Backend منشور على Render
- [ ] Environment Variables مضافة بالكامل
- [ ] السكريبت seed تم تشغيله
- [ ] NEXT_PUBLIC_API_URL محدث في Netlify
- [ ] Frontend تم إعادة نشره
- [ ] Admin Login يعمل
- [ ] صفحة الأخبار تعرض البيانات

### 🔐 أمان
- [ ] غيّر `JWT_SECRET` لمفتاح قوي
- [ ] غيّر كلمة مرور Admin من Dashboard
- [ ] تحقق من CORS_ORIGIN

---

## 🎉 تهانينا!

موقعك الآن **Live** على الإنترنت:

- 🌐 **Frontend**: https://mohamedelnagy.netlify.app
- 🔧 **Backend**: https://YOUR-APP.onrender.com
- 💾 **Database**: MongoDB Atlas

---

## 📚 موارد إضافية

- [Render Docs](https://render.com/docs)
- [Render Free Plan Limits](https://render.com/docs/free)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com/)

---

<div align="center">

**صُنع بـ ❤️ للحملة الانتخابية**

[GitHub](https://github.com/versona-tech/elNaghi) • [Report Issue](#)

</div>
