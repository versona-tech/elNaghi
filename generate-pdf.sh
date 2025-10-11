#!/bin/bash

# سكريبت لإنشاء PDF من ملف HTML باستخدام المتصفح المثبت على النظام

echo "🚀 بدء عملية إنشاء ملف PDF..."

# المسارات
HTML_FILE="$PWD/frontend/public/documents/electoral-program.html"
OUTPUT_FILE="$PWD/frontend/public/documents/electoral-program.pdf"

# التحقق من وجود ملف HTML
if [ ! -f "$HTML_FILE" ]; then
    echo "❌ خطأ: ملف HTML غير موجود: $HTML_FILE"
    exit 1
fi

echo "✅ تم العثور على ملف HTML"

# البحث عن المتصفح المتاح
BROWSER=""

if command -v google-chrome &> /dev/null; then
    BROWSER="google-chrome"
    echo "📱 سيتم استخدام Google Chrome"
elif command -v chromium &> /dev/null; then
    BROWSER="chromium"
    echo "📱 سيتم استخدام Chromium"
elif command -v chromium-browser &> /dev/null; then
    BROWSER="chromium-browser"
    echo "📱 سيتم استخدام Chromium Browser"
else
    echo "❌ خطأ: لم يتم العثور على متصفح Chrome أو Chromium"
    echo "💡 يمكنك تثبيته باستخدام:"
    echo "   sudo apt-get install chromium-browser"
    echo ""
    echo "📝 أو يمكنك استخدام المتصفح يدوياً:"
    echo "   1. افتح الملف: file://$HTML_FILE"
    echo "   2. اضغط Ctrl+P"
    echo "   3. اختر 'Save as PDF'"
    echo "   4. احفظ الملف في: $OUTPUT_FILE"
    exit 1
fi

echo "🖨️  إنشاء ملف PDF..."

# إنشاء PDF باستخدام المتصفح
$BROWSER --headless --disable-gpu --print-to-pdf="$OUTPUT_FILE" --no-margins "file://$HTML_FILE" 2>/dev/null

# التحقق من نجاح العملية
if [ -f "$OUTPUT_FILE" ]; then
    FILE_SIZE=$(du -h "$OUTPUT_FILE" | cut -f1)
    echo "✅ تم إنشاء ملف PDF بنجاح!"
    echo "📍 الموقع: $OUTPUT_FILE"
    echo "📊 حجم الملف: $FILE_SIZE"
    echo "🎉 انتهت العملية بنجاح!"
else
    echo "❌ فشل إنشاء ملف PDF"
    echo ""
    echo "📝 يمكنك إنشاء PDF يدوياً:"
    echo "   1. افتح الرابط في المتصفح: file://$HTML_FILE"
    echo "   2. اضغط Ctrl+P للطباعة"
    echo "   3. اختر 'حفظ بصيغة PDF'"
    echo "   4. احفظ الملف باسم: electoral-program.pdf"
    exit 1
fi
