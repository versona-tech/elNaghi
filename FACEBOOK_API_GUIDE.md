# دليل إعداد Facebook Graph API

## 📘 نظرة عامة

تم إضافة نظام متكامل لعرض محتوى صفحة الفيسبوك الرسمية في صفحة الفعاليات:
- ✅ المنشورات (Posts)
- ✅ الصور (Photos)
- ✅ الفيديوهات (Videos)

**رابط الصفحة:** https://www.facebook.com/profile.php?id=100064061133842

---

## 🚀 الميزات المضافة

### صفحة الفعاليات (`/events`)
- **عرض تبويبي:** منشورات | صور | فيديوهات
- **تحديث تلقائي** من الفيسبوك
- **بيانات تجريبية (Mock Data)** عند عدم توفر Access Token
- **تصميم احترافي** بألوان الحملة (أزرق/ذهبي)
- **روابط مباشرة** للفيسبوك

### API Endpoints الجديدة

1. **`GET /api/facebook/posts`** - جلب المنشورات
2. **`GET /api/facebook/feed`** - جلب Feed كامل
3. **`GET /api/facebook/photos`** - جلب الصور
4. **`GET /api/facebook/videos`** - جلب الفيديوهات

---

## ⚙️ الإعداد (خطوات اختيارية)

حالياً، الموقع يعمل بـ **بيانات تجريبية**. لتفعيل البيانات الحقيقية من الفيسبوك:

### الخطوة 1: إنشاء Facebook App

1. اذهب إلى: https://developers.facebook.com/
2. سجل دخول بحساب الفيسبوك
3. اضغط **My Apps** → **Create App**
4. اختر **Business** ثم **Continue**
5. املأ البيانات:
   - **App Name:** ElNagy Campaign
   - **Contact Email:** بريدك الإلكتروني
   - **Business Account:** اختر أو أنشئ حساب

### الخطوة 2: إضافة Facebook Graph API

1. من لوحة التحكم، اذهب إلى **Add Products**
2. ابحث عن **Facebook Login** واضغط **Set Up**
3. في الإعدادات:
   - **Valid OAuth Redirect URIs:** أضف `http://localhost:5000`

### الخطوة 3: الحصول على Access Token

#### طريقة سريعة (مؤقتة - للتطوير):

1. اذهب إلى: https://developers.facebook.com/tools/explorer/
2. اختر App الخاص بك
3. في **Permissions**، أضف:
   - `pages_read_engagement`
   - `pages_show_list`
   - `pages_read_user_content`
4. اضغط **Generate Access Token**
5. انسخ الـ Token

⚠️ **ملاحظة:** هذا Token مؤقت (ساعة - ساعتين)

#### طريقة دائمة (للإنتاج):

1. احصل على **User Access Token** (من الخطوة السابقة)
2. اذهب إلى: https://developers.facebook.com/tools/debug/accesstoken/
3. الصق Token الخاص بك
4. اضغط **Debug**
5. اضغط **Extend Access Token** (يصبح صالحاً لـ 60 يوم)
6. للحصول على Page Access Token:
   ```bash
   https://graph.facebook.com/v18.0/me/accounts?access_token=YOUR_EXTENDED_TOKEN
   ```
7. انسخ `access_token` الخاص بصفحتك

### الخطوة 4: إضافة Token للمشروع

#### في الباك إند:

أضف السطر التالي في ملف `.env`:

```env
FACEBOOK_ACCESS_TOKEN=YOUR_PAGE_ACCESS_TOKEN_HERE
```

#### مثال:
```env
PORT=5000
MONGODB_URI=mongodb+srv://...
FACEBOOK_ACCESS_TOKEN=EAABsbCS1iHgBO...
```

### الخطوة 5: إعادة تشغيل الخادم

```bash
cd backend
npm run dev
```

---

## 📊 كيف يعمل النظام؟

### الوضع الحالي (بدون Token):
```
المستخدم → صفحة /events → facebookAPI.getPosts()
                              ↓
                         Backend: /api/facebook/posts
                              ↓
                    لا يوجد FACEBOOK_ACCESS_TOKEN
                              ↓
                         إرجاع Mock Data (بيانات تجريبية)
```

### بعد إضافة Token:
```
المستخدم → صفحة /events → facebookAPI.getPosts()
                              ↓
                         Backend: /api/facebook/posts
                              ↓
                    يوجد FACEBOOK_ACCESS_TOKEN
                              ↓
                    Facebook Graph API
                              ↓
                    بيانات حقيقية من صفحة الفيسبوك
```

---

## 🔍 اختبار API

### اختبار محلي:

```bash
# جلب المنشورات
curl http://localhost:5000/api/facebook/posts

# جلب الصور
curl http://localhost:5000/api/facebook/photos

# جلب الفيديوهات
curl http://localhost:5000/api/facebook/videos
```

### الرد المتوقع:

```json
{
  "success": true,
  "data": [
    {
      "id": "...",
      "message": "نص المنشور...",
      "created_time": "2025-10-10T12:00:00+0000",
      "full_picture": "https://...",
      "permalink_url": "https://facebook.com/..."
    }
  ],
  "source": "mock" // أو "facebook" إذا كان Token مفعل
}
```

---

## 📁 الملفات المُضافة/المُعدلة

### Backend:
1. **`/backend/routes/facebook.js`** (جديد)
   - معالج طلبات Facebook API
   - Mock data للتطوير
   - معالجة الأخطاء

2. **`/backend/server.js`** (معدل)
   - إضافة route: `/api/facebook`

### Frontend:
1. **`/frontend/src/pages/events.js`** (معدل بالكامل)
   - تصميم جديد بالكامل
   - 3 تبويبات (منشورات، صور، فيديوهات)
   - تكامل مع Facebook API
   - Animations بـ Framer Motion

2. **`/frontend/src/lib/api.js`** (معدل)
   - إضافة `facebookAPI` object
   - دوال: getPosts, getFeed, getPhotos, getVideos

---

## 🎨 التصميم

### الألوان المستخدمة:
- **Primary:** أزرق داكن (#1e40af, #1e3a8a)
- **Gold:** ذهبي (#ca8a04, #eab308)
- **Facebook Blue:** #1877f2
- **خلفية:** رمادي فاتح (#f9fafb)

### الخطوط:
- **Cairo:** للنصوص العربية
- **Font Weight:** Bold (700) - Black (900)

### المكونات:
- **Cards:** بيضاء مع ظل وتأثير hover
- **Tabs:** تبويبات تفاعلية مع عدادات
- **Images:** تأثير تكبير عند hover
- **Videos:** زر تشغيل مركزي + مدة الفيديو

---

## 🔐 الأمان

### ✅ تم تطبيق:
- Rate Limiting على API
- CORS محدد للـ Frontend
- Helmet لحماية Headers
- معالجة الأخطاء الآمنة

### ⚠️ ملاحظات أمنية:
- **لا تشارك** Access Token في الكود
- استخدم ملف `.env` دائماً
- أضف `.env` في `.gitignore`
- جدد Token كل 60 يوم (Page Tokens)

---

## 🐛 حل المشاكل

### مشكلة: "لا توجد منشورات"

**السبب:** لم يتم إعداد FACEBOOK_ACCESS_TOKEN

**الحل:**
1. تحقق من وجود Token في `.env`
2. تأكد من صلاحية Token
3. أعد تشغيل Backend

### مشكلة: "Facebook API Error"

**السبب:** Token منتهي أو صلاحيات ناقصة

**الحل:**
1. احصل على Token جديد
2. تأكد من الصلاحيات:
   - `pages_read_engagement`
   - `pages_show_list`
   - `pages_read_user_content`

### مشكلة: "CORS Error"

**السبب:** إعدادات CORS في Backend

**الحل:**
```javascript
// في backend/server.js
app.use(cors({
  origin: 'http://localhost:3000', // أو 3001
  credentials: true
}));
```

---

## 📊 إحصائيات

### البيانات التجريبية (Mock):
- **منشورات:** 8 منشورات تجريبية
- **صور:** 12 صورة
- **فيديوهات:** 10 فيديوهات

### مع Facebook API الحقيقي:
- **حد المنشورات:** 12 منشور
- **حد الصور:** 12 صورة
- **حد الفيديوهات:** 8 فيديوهات

يمكن تغيير الحدود عبر parameter `limit`:
```javascript
facebookAPI.getPosts({ limit: 20 })
```

---

## 🚀 التطوير المستقبلي

### ميزات مقترحة:
- [ ] Infinite Scroll للمنشورات
- [ ] Lightbox للصور
- [ ] مشغل فيديو داخلي
- [ ] تصفية حسب التاريخ
- [ ] البحث في المنشورات
- [ ] عدادات الإعجابات والتعليقات
- [ ] مشاركة المنشورات

---

## 📞 الدعم

### الموارد المفيدة:
- **Facebook Graph API Docs:** https://developers.facebook.com/docs/graph-api
- **Access Token Debugger:** https://developers.facebook.com/tools/debug/accesstoken/
- **Graph API Explorer:** https://developers.facebook.com/tools/explorer/

---

## ✅ الخلاصة

### الوضع الحالي:
✅ **يعمل بدون إعداد** (Mock Data)  
✅ **جاهز للاستخدام** فوراً  
✅ **تصميم احترافي** كامل

### للحصول على بيانات حقيقية:
1. أنشئ Facebook App
2. احصل على Page Access Token
3. أضف Token في `.env`
4. أعد تشغيل الخادم

**البيانات التجريبية كافية للتطوير والعرض!** 🎉
