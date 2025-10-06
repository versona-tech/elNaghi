@echo off
chcp 65001 >nul
echo ==================================
echo تشغيل موقع المرشح محمد إبراهيم علي الناغي
echo ==================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js غير مثبت. يرجى تثبيت Node.js أولاً
    pause
    exit /b 1
)

echo ✅ Node.js مثبت
echo.

REM Start Backend
echo 🚀 تشغيل Backend...
cd backend

if not exist "node_modules" (
    echo 📦 تثبيت حزم Backend...
    call npm install
)

echo 🌱 تعبئة قاعدة البيانات...
call npm run seed

echo ▶️ تشغيل خادم Backend...
start cmd /k "npm run dev"

cd ..

REM Wait a bit
timeout /t 5 /nobreak >nul

REM Start Frontend
echo.
echo 🚀 تشغيل Frontend...
cd frontend

if not exist "node_modules" (
    echo 📦 تثبيت حزم Frontend...
    call npm install
)

echo ▶️ تشغيل تطبيق Frontend...
start cmd /k "npm run dev"

cd ..

echo.
echo ==================================
echo ✅ تم تشغيل الموقع بنجاح!
echo ==================================
echo.
echo 📡 Backend API: http://localhost:5000
echo 🌐 الموقع العام: http://localhost:3000
echo 🔐 لوحة الإدارة: http://localhost:3000/admin/login
echo.
echo بيانات الدخول للوحة الإدارة:
echo   اسم المستخدم: admin
echo   كلمة المرور: admin123
echo.
echo ==================================
pause
