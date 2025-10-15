<?php
session_start();

// التحقق من تسجيل الدخول
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    header('Location: login.php');
    exit;
}

// تسجيل الخروج
if (isset($_GET['logout'])) {
    session_destroy();
    header('Location: login.php');
    exit;
}

// قراءة البيانات من CSV
$csvFile = 'volunteers.csv';
$volunteers = [];

if (file_exists($csvFile)) {
    $file = fopen($csvFile, 'r');
    $headers = fgetcsv($file); // قراءة الهيدر
    
    while (($row = fgetcsv($file)) !== false) {
        $volunteers[] = $row;
    }
    fclose($file);
}

// تصدير CSV
if (isset($_GET['export'])) {
    header('Content-Type: text/csv; charset=utf-8');
    header('Content-Disposition: attachment; filename="volunteers_' . date('Y-m-d') . '.csv"');
    
    $output = fopen('php://output', 'w');
    fprintf($output, chr(0xEF).chr(0xBB).chr(0xBF)); // UTF-8 BOM
    
    // إعادة كتابة الملف
    $file = fopen($csvFile, 'r');
    while (($row = fgetcsv($file)) !== false) {
        fputcsv($output, $row);
    }
    fclose($file);
    fclose($output);
    exit;
}
?>
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>لوحة التحكم - المتطوعين</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: #f5f7fa;
            padding: 20px;
        }
        .header {
            background: white;
            padding: 20px;
            border-radius: 10px;
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 {
            color: #333;
            font-size: 24px;
        }
        .actions {
            display: flex;
            gap: 10px;
        }
        .btn {
            padding: 10px 20px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            text-decoration: none;
            font-weight: 600;
            transition: transform 0.2s;
        }
        .btn:hover {
            transform: translateY(-2px);
        }
        .btn-primary {
            background: #667eea;
            color: white;
        }
        .btn-success {
            background: #48bb78;
            color: white;
        }
        .btn-danger {
            background: #f56565;
            color: white;
        }
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
        }
        .stat-card {
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        .stat-number {
            font-size: 32px;
            font-weight: bold;
            color: #667eea;
        }
        .stat-label {
            color: #666;
            margin-top: 5px;
        }
        .table-container {
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th {
            background: #667eea;
            color: white;
            padding: 15px;
            text-align: right;
            font-weight: 600;
        }
        td {
            padding: 12px 15px;
            border-bottom: 1px solid #eee;
        }
        tr:hover {
            background: #f9fafb;
        }
        .empty-state {
            text-align: center;
            padding: 60px 20px;
            color: #999;
        }
        .empty-state svg {
            width: 100px;
            height: 100px;
            margin-bottom: 20px;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎯 لوحة التحكم - المتطوعين</h1>
        <div class="actions">
            <a href="?export=1" class="btn btn-success">📥 تصدير Excel</a>
            <a href="?logout=1" class="btn btn-danger">🚪 خروج</a>
        </div>
    </div>

    <div class="stats">
        <div class="stat-card">
            <div class="stat-number"><?php echo count($volunteers); ?></div>
            <div class="stat-label">إجمالي المتطوعين</div>
        </div>
        <div class="stat-card">
            <div class="stat-number"><?php echo date('Y-m-d'); ?></div>
            <div class="stat-label">التاريخ</div>
        </div>
        <div class="stat-card">
            <div class="stat-number"><?php echo file_exists($csvFile) ? number_format(filesize($csvFile)/1024, 2) : 0; ?> KB</div>
            <div class="stat-label">حجم قاعدة البيانات</div>
        </div>
    </div>

    <div class="table-container">
        <?php if (count($volunteers) > 0): ?>
            <table>
                <thead>
                    <tr>
                        <th>رقم</th>
                        <th>التاريخ</th>
                        <th>الوقت</th>
                        <th>الاسم</th>
                        <th>الهاتف</th>
                        <th>البريد</th>
                        <th>العمر</th>
                        <th>المنطقة</th>
                        <th>المؤهل</th>
                        <th>اللجنة الرئيسية</th>
                        <th>اللجنة الفرعية</th>
                        <th>خبرة</th>
                        <th>الوقت المتاح</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($volunteers as $volunteer): ?>
                        <tr>
                            <?php foreach (array_slice($volunteer, 0, 13) as $cell): ?>
                                <td><?php echo htmlspecialchars($cell); ?></td>
                            <?php endforeach; ?>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        <?php else: ?>
            <div class="empty-state">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <h2>لا توجد بيانات بعد</h2>
                <p>ستظهر بيانات المتطوعين هنا عند تسجيل أول متطوع</p>
            </div>
        <?php endif; ?>
    </div>
</body>
</html>
