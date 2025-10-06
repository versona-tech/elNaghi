#!/bin/bash

# سكريبت لإنشاء Avatar افتراضي
# يمكن استبداله بالصورة الحقيقية لاحقاً

echo "🖼️  إنشاء Avatar افتراضي..."

# تحقق من وجود ImageMagick
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick غير مثبت"
    echo "للتثبيت: sudo apt-get install imagemagick"
    exit 1
fi

# المسار
OUTPUT_DIR="frontend/public/images"
OUTPUT_FILE="$OUTPUT_DIR/profile.jpg"

# إنشاء المجلد إذا لم يكن موجوداً
mkdir -p "$OUTPUT_DIR"

# إنشاء صورة بسيطة بحرف "م"
convert -size 500x500 \
    -gravity center \
    -background "linear-gradient(135deg, #6366f1, #d946ef)" \
    -fill white \
    -pointsize 200 \
    -font "DejaVu-Sans-Bold" \
    label:"م" \
    "$OUTPUT_FILE"

if [ $? -eq 0 ]; then
    echo "✅ تم إنشاء: $OUTPUT_FILE"
    echo "📏 الحجم: 500x500 بكسل"
    echo ""
    echo "ℹ️  هذه صورة مؤقتة"
    echo "📸 استبدلها بالصورة الحقيقية في:"
    echo "   $OUTPUT_FILE"
else
    echo "❌ فشل إنشاء الصورة"
    echo ""
    echo "💡 بدلاً من ذلك:"
    echo "1. ضع صورة المرشح يدوياً في: $OUTPUT_FILE"
    echo "2. تأكد من المواصفات:"
    echo "   - الحجم: 500x500 بكسل"
    echo "   - الصيغة: JPG أو PNG"
    echo "   - الحجم: < 500KB"
fi
