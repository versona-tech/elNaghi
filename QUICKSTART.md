# 🚀 البدء السريع

## ⚡ التشغيل المحلي

### 1️⃣ Backend (منفذ 5000)

```bash
cd backend
npm install
npm run seed    # إضافة البيانات الأولية
npm run dev     # تشغيل الخادم
```

✅ Backend يعمل على: http://localhost:5000

---

### 2️⃣ Frontend (منفذ 3000)

```bash
cd frontend
npm install
npm run dev     # تشغيل التطبيق
```

✅ Frontend يعمل على: http://localhost:3000

---

## 📸 إضافة الصورة الشخصية

### الطريقة 1: يدوياً (مستحسن)

```bash
# انسخ صورتك
cp /path/to/your/photo.jpg frontend/public/images/profile.jpg
```

### الطريقة 2: Avatar افتراضي مؤقت

```bash
# تشغيل السكريبت
./create_avatar.sh
```

### الطريقة 3: استخدام صورة من الإنترنت

```bash
# تحميل صورة مؤقتة
wget https://via.placeholder.com/500 -O frontend/public/images/profile.jpg
```

---

## 🎨 تفعيل الصورة في اللوجو

عدّل `frontend/src/components/Navbar.js`:

### ابحث عن السطر 196:
```javascript
{/* Uncomment when profile.jpg is added:
```

### احذف التعليق من:
```javascript
<Image 
  src="/images/profile.jpg" 
  alt="محمد الناغي"
  fill
  className="object-cover"
  priority
/>
```

### علّق على الـ Placeholder:
```javascript
{/* Temporary placeholder - يمكن حذفه
<div className="w-full h-full bg-gradient-to-br ...">
  <span>م</span>
</div>
*/}
```

---

## 🔐 تسجيل الدخول

### لوحة التحكم:
```
URL: http://localhost:3000/admin/login

Username: admin
Password: admin123
```

⚠️ **غيّر كلمة المرور فوراً!**

---

## 🌐 النشر

### اقرأ التعليمات التفصيلية:
- 📖 **README.md** - نظرة عامة
- 🚀 **DEPLOYMENT_GUIDE.md** - خطوات النشر
- ✅ **CHECKLIST.md** - قائمة التحقق

### الخطوات السريعة:

```bash
# 1. Push to GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_GITHUB_URL
git push -u origin main

# 2. Deploy on Netlify
# - Go to netlify.com
# - Connect GitHub
# - Select repository
# - Deploy!
```

---

## 🎯 الصفحات المتاحة

| URL | الوصف |
|-----|-------|
| `/` | الصفحة الرئيسية |
| `/biography` | السيرة الذاتية |
| `/program` | البرنامج الانتخابي |
| `/news` | الأخبار |
| `/events` | الفعاليات |
| `/contact` | اتصل بنا |
| `/map` | الخريطة التفاعلية |
| `/services` | الخدمات الحكومية |
| `/admin` | لوحة التحكم |

---

## 🆘 مشاكل شائعة

### الموقع لا يعمل؟

```bash
# امسح الذاكرة المؤقتة
cd frontend
rm -rf .next
npm run dev
```

### قاعدة البيانات فارغة؟

```bash
cd backend
npm run seed
```

### المنفذ مشغول؟

```bash
# أوقف العملية القديمة
pkill -f "next dev"
pkill -f "node"
```

---

## 📞 الدعم

- 📖 اقرأ **README.md** للتفاصيل
- 🚀 اقرأ **DEPLOYMENT_GUIDE.md** للنشر
- ✅ راجع **CHECKLIST.md** قبل النشر

---

✅ **جاهز!** افتح http://localhost:3000 🎉
