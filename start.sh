#!/bin/bash

# Script to start both backend and frontend servers

echo "=================================="
echo "تشغيل موقع المرشح محمد إبراهيم علي الناغي"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js غير مثبت. يرجى تثبيت Node.js أولاً"
    exit 1
fi

echo "✅ Node.js مثبت - الإصدار: $(node -v)"
echo ""

# Start Backend
echo "🚀 تشغيل Backend..."
cd backend

if [ ! -d "node_modules" ]; then
    echo "📦 تثبيت حزم Backend..."
    npm install
fi

echo "🌱 تعبئة قاعدة البيانات..."
npm run seed &
SEED_PID=$!
wait $SEED_PID

echo "▶️  تشغيل خادم Backend..."
npm run dev &
BACKEND_PID=$!

cd ..

# Wait a bit for backend to start
sleep 5

# Start Frontend
echo ""
echo "🚀 تشغيل Frontend..."
cd frontend

if [ ! -d "node_modules" ]; then
    echo "📦 تثبيت حزم Frontend..."
    npm install
fi

echo "▶️  تشغيل تطبيق Frontend..."
npm run dev &
FRONTEND_PID=$!

cd ..

echo ""
echo "=================================="
echo "✅ تم تشغيل الموقع بنجاح!"
echo "=================================="
echo ""
echo "📡 Backend API: http://localhost:5000"
echo "🌐 الموقع العام: http://localhost:3000"
echo "🔐 لوحة الإدارة: http://localhost:3000/admin/login"
echo ""
echo "بيانات الدخول للوحة الإدارة:"
echo "  اسم المستخدم: admin"
echo "  كلمة المرور: admin123"
echo ""
echo "لإيقاف الموقع، اضغط Ctrl+C"
echo "=================================="

# Wait for processes
wait $BACKEND_PID $FRONTEND_PID
