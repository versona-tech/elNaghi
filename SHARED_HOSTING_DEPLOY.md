# 🏠 نشر Backend على الاستضافة المشتركة

> **⚠️ هذا الدليل للاستضافات المشتركة التي تدعم Node.js فقط**

---

## 📋 المتطلبات

- ✅ استضافة مشتركة تدعم **Node.js 18+**
- ✅ **cPanel** مع "Setup Node.js App" أو **SSH Access**
- ✅ **MongoDB Atlas** (جاهز لديك)
- ✅ **Git** (اختياري)

---

## 🚀 الطريقة 1: باستخدام cPanel (الأسهل)

### الخطوة 1: رفع الملفات

#### A. عبر File Manager
1. سجل دخول **cPanel**
2. افتح **File Manager**
3. اذهب إلى `public_html` أو `domains/yourdomain.com`
4. أنشئ مجلد جديد: `backend`
5. ارفع محتويات مجلد `backend` من مشروعك:
   ```
   backend/
   ├── config/
   ├── middleware/
   ├── models/
   ├── routes/
   ├── scripts/
   ├── server.js
   ├── package.json
   └── .env.example
   ```

#### B. عبر FTP/SFTP
```bash
# استخدم FileZilla أو WinSCP
# اتصل بالسيرفر ثم ارفع مجلد backend كاملاً
```

---

### الخطوة 2: إنشاء ملف .env

1. في cPanel File Manager، داخل مجلد `backend`
2. أنشئ ملف `.env` (انسخ من `.env.example`)
3. املأ البيانات:

```env
# MongoDB
MONGODB_URI=mongodb+srv://seotarek_db_user:tLlIBNo3LwVBVtaw@nagy.dg6gvmv.mongodb.net/elnagy_db

# JWT Secret (غيّر هذا!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-2026

# Server
PORT=3000
NODE_ENV=production

# CORS (ضع رابط موقعك)
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com
```

---

### الخطوة 3: Setup Node.js App في cPanel

1. في cPanel، ابحث عن **"Setup Node.js App"**
2. اضغط **"Create Application"**
3. املأ البيانات:

```
Node.js version: 18.x أو 20.x (الأحدث)
Application mode: Production
Application root: backend
Application URL: yourdomain.com/api (أو subdomain: api.yourdomain.com)
Application startup file: server.js
```

4. اضغط **"Create"**

---

### الخطوة 4: تثبيت Dependencies

بعد إنشاء التطبيق:

1. اضغط على **"Run NPM Install"** في cPanel
   
   أو عبر SSH:
   ```bash
   cd ~/backend  # أو المسار لمجلد backend
   npm install --production
   ```

---

### الخطوة 5: تشغيل التطبيق

في cPanel:
1. اضغط **"Start App"** أو **"Restart App"**

أو عبر SSH:
```bash
cd ~/backend
npm start
```

---

### الخطوة 6: اختبار Backend

افتح المتصفح:
```
https://yourdomain.com/api
أو
https://api.yourdomain.com
```

يجب أن ترى:
```json
{
  "message": "El-Nagy Campaign API",
  "version": "1.0.0",
  "status": "running"
}
```

---

## 🚀 الطريقة 2: باستخدام SSH (متقدم)

### الخطوة 1: اتصل بالسيرفر
```bash
ssh username@yourdomain.com
```

### الخطوة 2: Clone من GitHub
```bash
cd ~
git clone https://github.com/versona-tech/elNaghi.git
cd elNaghi/backend
```

### الخطوة 3: أنشئ .env
```bash
cp .env.example .env
nano .env  # أو vi .env
# املأ البيانات ثم احفظ (Ctrl+X → Y → Enter)
```

### الخطوة 4: تثبيت Dependencies
```bash
npm install --production
```

### الخطوة 5: تشغيل التطبيق
```bash
# استخدم PM2 لإبقاء التطبيق يعمل
npm install -g pm2
pm2 start server.js --name elnagy-backend
pm2 save
pm2 startup  # لتشغيل تلقائي عند إعادة تشغيل السيرفر
```

---

## ⚙️ إعدادات Nginx/Apache (إذا لزم)

### إذا كنت تستخدم Subdomain (api.yourdomain.com)

في cPanel → **Domains** → **Subdomains**:
1. أنشئ subdomain: `api`
2. وجّهه للمجلد: `backend`

ثم في **.htaccess** (داخل `backend`):
```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
</IfModule>
```

---

## 🔧 إعدادات Frontend للاتصال بالـ Backend

### في Netlify Environment Variables:
```
NEXT_PUBLIC_API_URL=https://yourdomain.com/api
# أو
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### إذا كان Frontend على نفس الاستضافة:
في `frontend/.env.production`:
```
NEXT_PUBLIC_API_URL=/api
```

---

## ✅ قائمة التحقق

بعد النشر، تأكد من:

- [ ] Backend يعمل: `curl https://yourdomain.com/api`
- [ ] MongoDB متصل: تحقق من Logs
- [ ] JWT Secret تم تغييره
- [ ] CORS يسمح بـ Frontend domain
- [ ] SSL/HTTPS يعمل
- [ ] Seed data تم تحميله:
  ```bash
  cd ~/backend
  npm run seed
  ```
- [ ] Admin login يعمل (admin/admin123)

---

## 🐛 حل المشاكل الشائعة

### المشكلة 1: "Cannot find module"
```bash
cd ~/backend
npm install
```

### المشكلة 2: "Port already in use"
غيّر PORT في `.env`:
```env
PORT=3001  # أو أي رقم آخر
```

### المشكلة 3: "MongoDB connection failed"
تحقق من:
- MONGODB_URI صحيح في `.env`
- MongoDB Atlas يسمح بـ IP الاستضافة (0.0.0.0/0 للتجربة)

### المشكلة 4: "CORS error"
في `.env`:
```env
ALLOWED_ORIGINS=https://yourdomain.com,https://www.yourdomain.com,https://netlify-domain.netlify.app
```

### المشكلة 5: التطبيق يتوقف بعد إغلاق SSH
استخدم PM2:
```bash
pm2 start server.js --name elnagy-backend
pm2 save
```

---

## 📊 مراقبة التطبيق

### باستخدام PM2:
```bash
pm2 status         # حالة التطبيقات
pm2 logs           # عرض السجلات
pm2 restart all    # إعادة تشغيل
pm2 stop all       # إيقاف
```

### عبر cPanel:
- افتح **"Setup Node.js App"**
- اضغط على اسم التطبيق
- راجع **Logs** و **Status**

---

## 🔄 تحديث الكود (بعد Push على GitHub)

### عبر SSH:
```bash
cd ~/elNaghi
git pull origin main
cd backend
npm install  # إذا كانت هناك dependencies جديدة
pm2 restart elnagy-backend
```

### عبر cPanel:
1. ارفع الملفات الجديدة عبر File Manager
2. في "Setup Node.js App" → Restart

---

## 💡 نصائح للأداء

1. **استخدم PM2**:
   ```bash
   npm install -g pm2
   pm2 start server.js -i max  # cluster mode
   ```

2. **فعّل Compression**:
   (موجود بالفعل في `server.js`)

3. **راقب استهلاك الموارد**:
   ```bash
   pm2 monit
   ```

4. **Logs rotation**:
   ```bash
   pm2 install pm2-logrotate
   ```

---

## 📞 الدعم

إذا واجهت مشاكل:
1. راجع logs: `pm2 logs` أو cPanel logs
2. تحقق من Node.js version
3. تأكد من .env يحتوي جميع المتغيرات
4. اطلب مساعدة من دعم الاستضافة

---

## 🎯 الخلاصة

✅ **إذا نجحت**: Backend جاهز على استضافتك!
❌ **إذا فشلت**: استخدم **Render.com** (مجاني + أسهل)

**الخطوة التالية**: اربط Frontend بـ Backend عبر `NEXT_PUBLIC_API_URL`
