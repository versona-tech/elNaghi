# 🎨 دليل الألوان - موقع محمد الناغي 2026

## 📐 نظام الألوان الرئيسي

### 🔵 Primary (Indigo) - اللون الأساسي
```css
#6366f1  /* 500 - اللون الأساسي */
#4f46e5  /* 600 - أغمق قليلاً */
#4338ca  /* 700 - للنصوص */
#3730a3  /* 800 - للخلفيات الداكنة */
#312e81  /* 900 - أغمق */
#1e1b4b  /* 950 - شبه أسود */
```

**الاستخدام:**
- اللوجو الرئيسي
- الأزرار الأساسية
- العناوين المهمة
- تدرجات الخلفية

---

### 🎆 Neon (Magenta) - النيون
```css
#d946ef  /* 500 - نيون ساطع */
#c026d3  /* 600 - أغمق */
#a21caf  /* 700 - أغمق أكثر */
#86198f  /* 800 */
#701a75  /* 900 */
#4a044e  /* 950 - أغمق */
```

**الاستخدام:**
- تأثيرات Glow
- التدرجات المتوهجة
- Hover effects
- تفاصيل بارزة

---

### 💧 Cyan - السماوي الساطع
```css
#22d3ee  /* 500 - سماوي ساطع */
#06b6d4  /* 500 alt */
#0891b2  /* 600 */
#0e7490  /* 700 */
#155e75  /* 800 */
#083344  /* 950 - أغمق */
```

**الاستخدام:**
- أيقونات التواصل
- الروابط
- تأثيرات Neon الزرقاء
- حدود متوهجة

---

### 🌿 Lime - الأخضر الليموني
```css
#84cc16  /* 500 - أخضر ليموني */
#65a30d  /* 600 */
#4d7c0f  /* 700 */
#3f6212  /* 800 */
#365314  /* 900 */
#1a2e05  /* 950 - أغمق */
```

**الاستخدام:**
- أزرار النجاح
- الإشعارات الإيجابية
- عناصر ثانوية
- تفاصيل طبيعية

---

### 💜 Purple - البنفسجي
```css
#a855f7  /* 500 - بنفسجي ساطع */
#9333ea  /* 600 */
#7e22ce  /* 700 */
#6b21a8  /* 800 */
#581c87  /* 900 */
#3b0764  /* 950 - أغمق */
```

**الاستخدام:**
- التدرجات
- العناوين الفرعية
- Hover states
- خلفيات ديناميكية

---

### ✨ Gold (Amber) - الذهبي
```css
#f59e0b  /* 500 - ذهبي */
#d97706  /* 600 */
#b45309  /* 700 */
#92400e  /* 800 */
#78350f  /* 900 */
#451a03  /* 950 - أغمق */
```

**الاستخدام:**
- تفاصيل فاخرة
- شارات
- أيقونات مميزة
- نصوص بارزة

---

## 🎨 التدرجات الجاهزة

### تدرج 1: Cyber (الرئيسي)
```css
background: linear-gradient(135deg, #6366f1, #22d3ee, #d946ef);
```

### تدرج 2: Neon Glow
```css
background: linear-gradient(90deg, #22d3ee, #d946ef, #a855f7);
```

### تدرج 3: Sunset
```css
background: linear-gradient(to right, #f59e0b, #d946ef);
```

### تدرج 4: Ocean
```css
background: linear-gradient(135deg, #6366f1, #22d3ee);
```

### تدرج 5: Forest
```css
background: linear-gradient(to bottom, #84cc16, #22d3ee);
```

---

## 💫 التأثيرات (Shadows)

### Neon Glow - توهج نيون
```css
box-shadow: 
  0 0 20px rgba(99, 102, 241, 0.6),
  0 0 40px rgba(99, 102, 241, 0.3);
```

### Cyan Glow - توهج أزرق
```css
box-shadow: 0 0 20px rgba(34, 211, 238, 0.6);
```

### Pink Glow - توهج وردي
```css
box-shadow: 0 0 20px rgba(217, 70, 239, 0.6);
```

### Glass Shadow - ظل زجاجي
```css
box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
```

---

## 🔳 Glassmorphism

### خلفية زجاجية
```css
background: rgba(255, 255, 255, 0.1);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.2);
```

### زجاج داكن
```css
background: rgba(0, 0, 0, 0.2);
backdrop-filter: blur(10px);
border: 1px solid rgba(255, 255, 255, 0.1);
```

---

## 🎯 أمثلة الاستخدام

### زر أساسي
```jsx
<button className="
  bg-gradient-to-r from-primary-600 to-cyan-500
  text-white font-bold
  px-6 py-3 rounded-xl
  shadow-neon hover:shadow-neon-lg
  transition-all duration-300
  hover:scale-105
">
  اضغط هنا
</button>
```

### كارت زجاجي
```jsx
<div className="
  bg-white/10 backdrop-blur-xl
  border border-white/20
  rounded-2xl p-6
  shadow-glass
  hover:shadow-neon
  transition-all duration-300
">
  محتوى الكارت
</div>
```

### نص متدرج
```jsx
<h1 className="
  text-5xl font-black
  bg-gradient-to-r from-primary-600 via-cyan-500 to-neon-600
  bg-clip-text text-transparent
">
  محمد الناغي
</h1>
```

---

## 🌈 Cyber Grid (الشبكة السيبرانية)

```css
background-image: 
  linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px),
  linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px);
background-size: 50px 50px;
```

---

## 📱 الألوان حسب الوضع

### الوضع الفاتح (Light Mode)
- **النصوص**: gray-900, gray-800
- **الخلفيات**: white, gray-50
- **الحدود**: gray-200, gray-300

### الوضع الداكن (Dark Mode) - اختياري
- **النصوص**: white, gray-100
- **الخلفيات**: gray-900, black
- **الحدود**: gray-700, gray-600

---

## 🎨 نصائح التصميم

### ✅ افعل:
- استخدم التدرجات للعناوين الرئيسية
- أضف Glow للعناصر التفاعلية
- استخدم Glassmorphism للكروت
- احتفظ بالتباين الجيد للنصوص

### ❌ لا تفعل:
- لا تستخدم أكثر من 3 ألوان في عنصر واحد
- لا تجعل التأثيرات ثقيلة جداً
- لا تهمل الوضوح من أجل المظهر
- لا تنسى إمكانية الوصول

---

## 🔧 التخصيص

### في tailwind.config.js:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#6366f1',
          // ... باقي الدرجات
        },
        // يمكنك تغيير أي لون هنا
      }
    }
  }
}
```

---

## 📊 إمكانية الوصول

### التباين الموصى به:
- **AAA**: نسبة 7:1 أو أكثر (مثالي)
- **AA**: نسبة 4.5:1 أو أكثر (جيد)

### أمثلة:
✅ `text-white` على `bg-primary-700` - AAA  
✅ `text-gray-900` على `bg-white` - AAA  
⚠️ `text-cyan-300` على `bg-white` - قد لا يكون كافياً

---

<div align="center">

**🎨 استمتع بالتصميم!**

</div>
