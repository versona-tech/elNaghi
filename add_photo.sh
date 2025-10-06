#!/bin/bash

# 🎯 سكريبت لإضافة الصورة الشخصية للموقع

echo "🖼️  إضافة الصورة الشخصية لمحمد الناغي"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# المسار المطلوب
TARGET_DIR="/home/tarek/Desktop/elnagy/frontend/public/images"
TARGET_FILE="$TARGET_DIR/profile.jpg"

# إنشاء المجلد إذا لم يكن موجود
mkdir -p "$TARGET_DIR"

echo "📂 المجلد الهدف: $TARGET_DIR"
echo ""

# البحث عن الصورة
echo "🔍 ابحث عن الصورة في:"
echo "   1. ~/Desktop/"
echo "   2. ~/Downloads/"
echo "   3. أو اسحب الملف هنا"
echo ""

# إذا كانت هناك صورة في Desktop
if [ -f ~/Desktop/*.jpg ] || [ -f ~/Desktop/*.jpeg ] || [ -f ~/Desktop/*.png ]; then
    echo "✅ وجدت صور في Desktop:"
    ls -lh ~/Desktop/*.{jpg,jpeg,png} 2>/dev/null | head -5
    echo ""
    echo "لنسخ أول صورة: cp ~/Desktop/الصورة_الأولى.jpg $TARGET_FILE"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📋 طرق إضافة الصورة:"
echo ""
echo "الطريقة 1️⃣: نسخ من Desktop"
echo "   cp ~/Desktop/صورتك.jpg $TARGET_FILE"
echo ""
echo "الطريقة 2️⃣: نسخ من Downloads"
echo "   cp ~/Downloads/صورتك.jpg $TARGET_FILE"
echo ""
echo "الطريقة 3️⃣: استخدام المتصفح"
echo "   1. افتح: file://$TARGET_DIR"
echo "   2. اسحب الصورة للمجلد"
echo "   3. غير اسمها لـ: profile.jpg"
echo ""
echo "الطريقة 4️⃣: تحميل من الإنترنت"
echo "   wget -O $TARGET_FILE رابط_الصورة"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# فتح المجلد
if command -v nautilus &> /dev/null; then
    echo "🗂️  فتح المجلد..."
    nautilus "$TARGET_DIR" 2>/dev/null &
elif command -v thunar &> /dev/null; then
    thunar "$TARGET_DIR" 2>/dev/null &
fi

echo "✅ بعد نسخ الصورة، شغّل:"
echo "   cd /home/tarek/Desktop/elnagy"
echo "   git add frontend/public/images/profile.jpg"
echo "   git commit -m '📸 Add profile photo'"
echo "   git push"
echo ""
