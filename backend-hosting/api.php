<?php
// تفعيل عرض الأخطاء للتطوير (احذفها في الإنتاج)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// السماح بـ CORS من أي دومين
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// معالجة OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// التأكد من أن الطلب POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

try {
    // قراءة البيانات
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);
    
    if (!$data) {
        throw new Exception('Invalid JSON data');
    }
    
    // التحقق من الحقول المطلوبة
    $required = ['fullName', 'phone', 'age', 'area', 'education', 'mainCommittee', 'subCommittee', 'availability'];
    foreach ($required as $field) {
        if (empty($data[$field])) {
            throw new Exception("Missing required field: $field");
        }
    }
    
    // اسم ملف CSV
    $csvFile = 'volunteers.csv';
    
    // إنشاء الهيدر إذا كان الملف غير موجود
    $isNewFile = !file_exists($csvFile);
    
    // فتح الملف للإضافة
    $file = fopen($csvFile, 'a');
    
    if (!$file) {
        throw new Exception('Cannot open CSV file');
    }
    
    // إضافة الهيدر إذا كان ملف جديد
    if ($isNewFile) {
        fputcsv($file, [
            'رقم',
            'التاريخ',
            'الوقت',
            'الاسم الكامل',
            'رقم الهاتف',
            'البريد الإلكتروني',
            'العمر',
            'المنطقة',
            'المؤهل الدراسي',
            'اللجنة الرئيسية',
            'اللجنة الفرعية',
            'خبرة سابقة',
            'المهارات',
            'الوقت المتاح',
            'دوافع الانضمام'
        ]);
    }
    
    // حساب رقم المتطوع
    $lines = $isNewFile ? 0 : count(file($csvFile)) - 1; // -1 للهيدر
    $volunteerNumber = $lines + 1;
    
    // التاريخ والوقت
    date_default_timezone_set('Africa/Cairo');
    $date = date('Y-m-d');
    $time = date('h:i A');
    
    // ترجمة القيم
    $committees = [
        'technical' => 'اللجنة الفنية',
        'administrative' => 'اللجنة الإدارية',
        'advisory' => 'لجنة الحكماء والمستشارين'
    ];
    
    $availability = [
        'fullTime' => 'متفرغ بالكامل',
        'partTime' => 'جزء من الوقت',
        'weekends' => 'نهاية الأسبوع فقط',
        'flexible' => 'حسب الظروف'
    ];
    
    // إضافة الصف
    fputcsv($file, [
        $volunteerNumber,
        $date,
        $time,
        $data['fullName'],
        $data['phone'],
        $data['email'] ?? '',
        $data['age'],
        $data['area'],
        $data['education'],
        $committees[$data['mainCommittee']] ?? $data['mainCommittee'],
        $data['subCommittee'],
        $data['previousExperience'] ?? 'لا',
        $data['skills'] ?? '',
        $availability[$data['availability']] ?? $data['availability'],
        $data['motivation'] ?? ''
    ]);
    
    fclose($file);
    
    // الرد بالنجاح
    echo json_encode([
        'success' => true,
        'data' => [
            'volunteerNumber' => $volunteerNumber,
            'name' => $data['fullName']
        ]
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
