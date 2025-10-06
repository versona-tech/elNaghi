#!/bin/bash

# Script to copy and optimize profile image

echo "🖼️  نسخ الصورة الشخصية..."

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "⚠️  ImageMagick غير مثبت. جاري التثبيت..."
    sudo apt-get update && sudo apt-get install -y imagemagick
fi

# Source and destination
SRC_IMAGE="$1"
DEST_DIR="frontend/public/images"
DEST_FILE="$DEST_DIR/profile.jpg"

# Create directory if not exists
mkdir -p "$DEST_DIR"

if [ -z "$SRC_IMAGE" ]; then
    echo "❌ الرجاء تحديد مسار الصورة"
    echo "الاستخدام: ./copy_profile_image.sh /path/to/your/image.jpg"
    exit 1
fi

if [ ! -f "$SRC_IMAGE" ]; then
    echo "❌ الصورة غير موجودة: $SRC_IMAGE"
    exit 1
fi

# Convert and resize image to 500x500
echo "✂️  تحويل الصورة إلى 500×500..."
convert "$SRC_IMAGE" \
    -resize 500x500^ \
    -gravity center \
    -extent 500x500 \
    -quality 85 \
    "$DEST_FILE"

if [ $? -eq 0 ]; then
    echo "✅ تم نسخ الصورة بنجاح إلى: $DEST_FILE"
    
    # Get file size
    SIZE=$(du -h "$DEST_FILE" | cut -f1)
    echo "📊 حجم الملف: $SIZE"
    
    echo ""
    echo "🚀 الخطوات التالية:"
    echo "1. git add frontend/public/images/profile.jpg"
    echo "2. git commit -m '📸 Add profile photo'"
    echo "3. git push"
else
    echo "❌ فشل تحويل الصورة"
    exit 1
fi
