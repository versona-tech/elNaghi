# ⚡ نشر Backend - خطوات سريعة

## 🎯 الخطوات (5 دقائق)

### 1. اذهب إلى Render
```
https://dashboard.render.com
```
سجل دخول بـ GitHub

---

### 2. إنشاء Web Service
- **New +** → **Web Service**
- **Connect repository**: `versona-tech/elNaghi`
- اضغط **Connect**

---

### 3. الإعدادات الأساسية

```
Name: elnagy-backend
Region: Frankfurt (EU Central)
Branch: main
Root Directory: backend          ⚠️ مهم!
Build Command: npm install
Start Command: npm start
Plan: Free
```

---

### 4. Environment Variables

اضغط **Advanced** → أضف:

```bash
MONGODB_URI=mongodb+srv://seotarek_db_user:tLlIBNo3LwVBVtaw@nagy.dg6gvmv.mongodb.net/elnagy_db

JWT_SECRET=elnagy-secret-2026-change-this

NODE_ENV=production

CORS_ORIGIN=https://mohamedelnagy.netlify.app
```

---

### 5. Create Web Service
اضغط **Create** وانتظر 3-5 دقائق

---

### 6. نسخ الرابط
بعد النشر انسخ:
```
https://YOUR-APP-NAME.onrender.com
```

---

### 7. تحديث Netlify

اذهب: https://app.netlify.com
- موقع **mohamedelnagy**
- **Site settings** → **Environment variables**
- عدّل: `NEXT_PUBLIC_API_URL`
- القيمة: `https://YOUR-APP-NAME.onrender.com`
- **Save** → **Trigger deploy**

---

### 8. تشغيل البيانات الأولية

افتح في المتصفح:
```
https://YOUR-APP-NAME.onrender.com/api/seed
```

---

## ✅ اختبار

1. Backend:
   ```
   https://YOUR-APP-NAME.onrender.com
   ```

2. Frontend + Backend:
   ```
   https://mohamedelnagy.netlify.app/news
   ```

3. Admin Login:
   ```
   https://mohamedelnagy.netlify.app/admin/login
   admin / admin123
   ```

---

## 📚 للتفاصيل الكاملة

اقرأ: [`RENDER_DEPLOYMENT.md`](./RENDER_DEPLOYMENT.md)

---

<div align="center">

**جاهز للنشر!** 🚀

</div>
