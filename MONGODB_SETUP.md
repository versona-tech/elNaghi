# 🔧 تعليمات إعداد MongoDB Atlas

## ⚠️ مشكلة الاتصال بقاعدة البيانات

واجهنا مشكلة في الاتصال بـ MongoDB Atlas. هذا طبيعي لأن:
- بيانات الاتصال المستخدمة قد تكون قديمة
- أو الحساب لم يعد نشطاً
- أو عنوان IP الخاص بك غير مسموح

## ✅ الحل: إنشاء قاعدة بيانات خاصة بك (مجاناً)

### الطريقة 1: MongoDB Atlas (موصى بها - مجانية)

#### الخطوة 1: إنشاء حساب
1. اذهب إلى: https://www.mongodb.com/cloud/atlas/register
2. سجل حساب جديد (مجاني تماماً)
3. اختر "Free Tier" (M0 Sandbox)

#### الخطوة 2: إنشاء Cluster
1. اختر Cloud Provider: AWS
2. اختر Region: قريب من موقعك
3. اضغط "Create Cluster"

#### الخطوة 3: إعداد Database Access
1. اذهب إلى "Database Access"
2. اضغط "Add New Database User"
3. اختر username وpassword قويين
4. احفظهم في مكان آمن!

#### الخطوة 4: إعداد Network Access
1. اذهب إلى "Network Access"
2. اضغط "Add IP Address"
3. اضغط "Allow Access from Anywhere" (للتطوير فقط)
4. أو أضف IP الخاص بك

#### الخطوة 5: الحصول على Connection String
1. اذهب إلى "Databases"
2. اضغط "Connect" على الـ Cluster
3. اختر "Connect your application"
4. انسخ الـ Connection String
5. سيكون بهذا الشكل:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```

#### الخطوة 6: تحديث ملف .env
1. افتح: `backend/.env`
2. غيّر السطر:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/elnagy_db?retryWrites=true&w=majority
   ```
3. استبدل `<username>` و `<password>` ببياناتك
4. احفظ الملف

---

### الطريقة 2: MongoDB محلي (للمطورين)

#### على Ubuntu/Debian:
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### على Arch Linux:
```bash
sudo pacman -S mongodb-bin
sudo systemctl start mongodb
sudo systemctl enable mongodb
```

#### تحديث .env:
```
MONGODB_URI=mongodb://localhost:27017/elnagy_db
```

---

### الطريقة 3: استخدام Docker (سريع)

```bash
# تشغيل MongoDB في Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# تحديث .env
MONGODB_URI=mongodb://localhost:27017/elnagy_db
```

---

## 🚀 بعد الإعداد

بعد إعداد MongoDB، شغّل:

```bash
cd /home/tarek/Desktop/elnagy/backend
npm run seed
npm run dev
```

---

## 🆘 حل سريع مؤقت

إذا كنت تريد فقط تجربة الـ Frontend بدون Backend:

1. **شغّل Frontend فقط:**
   ```bash
   cd /home/tarek/Desktop/elnagy/frontend
   npm install
   npm run dev
   ```

2. **افتح:** http://localhost:3000

3. **ستعمل الصفحات التالية بدون Backend:**
   - الصفحة الرئيسية (بدون بيانات ديناميكية)
   - السيرة الذاتية
   - الخدمات
   - الخريطة

---

## 📧 محتاج مساعدة؟

1. تأكد من Connection String صحيح
2. تأكد من Username/Password صحيحين
3. تأكد من IP Address مسموح في Network Access
4. راجع console للأخطاء

---

## ✅ التحقق من نجاح الاتصال

بعد تحديث .env، شغّل:

```bash
cd backend
npm run seed
```

إذا رأيت:
```
✅ تم إنشاء المستخدم الأساسي
✅ تم إضافة البرنامج الانتخابي
✅ تمت عملية التعبئة بنجاح!
```

معناها MongoDB يعمل بنجاح! 🎉
