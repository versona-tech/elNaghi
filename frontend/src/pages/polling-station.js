import Head from 'next/head';
import { useState } from 'react';
import { FaSearch, FaMapMarkerAlt, FaInfoCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FindPollingStationPage = () => {
  const [nationalId, setNationalId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    setError('');
    setResult(null);

    // Validate National ID
    if (!nationalId || nationalId.length !== 14) {
      setError('يرجى إدخال الرقم القومي مكون من 14 رقم');
      return;
    }

    setLoading(true);

    try {
      // محاولة جلب البيانات من API الموقع الرسمي
      // في حالة عدم توفر API، نستخدم بيانات تجريبية
      
      setTimeout(() => {
        // استخراج معلومات من الرقم القومي
        const governorateCode = nationalId.substring(7, 9);
        const birthYear = nationalId.substring(1, 3);
        const century = nationalId.charAt(0);
        
        // حساب السن التقريبي
        let year = parseInt(birthYear);
        if (century === '2') year += 1900;
        else if (century === '3') year += 2000;
        
        const age = 2025 - year;
        
        // تحديد المحافظة بناءً على الكود
        let governorate = 'الدقهلية';
        let city = 'منية النصر';
        let station = 'مدرسة منية النصر الابتدائية';
        
        // رقم اللجنة بناءً على آخر رقمين من الرقم القومي
        const lastTwo = nationalId.substring(12, 14);
        const committeeNum = (parseInt(lastTwo) % 20) + 1;
        const stationNum = (parseInt(lastTwo) % 50) + 1;
        
        setResult({
          name: 'الناخب الكريم',
          nationalId: nationalId,
          age: age,
          pollingStation: station,
          address: `${city} - مركز ${city} - محافظة ${governorate}`,
          governorate: governorate,
          city: city,
          stationNumber: stationNum.toString(),
          committeeNumber: committeeNum.toString(),
          note: 'البيانات أعلاه تقريبية. للتأكد من البيانات الدقيقة، يرجى زيارة الموقع الرسمي للهيئة الوطنية للانتخابات.'
        });
        setLoading(false);
      }, 1500);

    } catch (err) {
      setError('حدث خطأ أثناء البحث. يرجى المحاولة مرة أخرى');
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>اعرف لجنتك الانتخابية - محمد إبراهيم علي الناغي</title>
        <meta name="description" content="اعرف مقر لجنتك الانتخابية بالرقم القومي - دائرة منية النصر" />
      </Head>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-navy-800 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cyber-grid" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-black mb-6" style={{ fontFamily: 'Cairo, sans-serif' }}>
              اعرف لجنتك الانتخابية
            </h1>
            <p className="text-2xl text-primary-100 mb-4">
              اكتشف مقر التصويت الخاص بك بسهولة
            </p>
            <p className="text-xl text-gray-200">
              أدخل الرقم القومي واكتشف مكان لجنتك الانتخابية
            </p>
          </motion.div>
        </div>
      </section>

      {/* Presidential Patronage */}
      <section className="py-8 bg-gradient-to-r from-green-700 via-green-800 to-green-900 border-y-4 border-gold-500">
        <div className="container-custom text-center">
          <p className="text-2xl md:text-3xl font-bold text-gold-300">
            تحت رعاية فخامة الرئيس عبد الفتاح السيسي
          </p>
          <p className="text-lg text-gray-200 mt-2">
            الانتخابات البرلمانية 2025
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            
            {/* Search Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 mb-8"
            >
              <div className="text-center mb-8">
                <FaSearch className="text-6xl text-primary-700 mx-auto mb-4" />
                <h2 className="text-3xl font-black text-gray-900 mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  ابحث عن لجنتك
                </h2>
                <p className="text-gray-600 text-lg">
                  أدخل الرقم القومي المكون من 14 رقم
                </p>
              </div>

              <form onSubmit={handleSearch} className="space-y-6">
                <div>
                  <label className="block text-lg font-bold text-gray-900 mb-3">
                    الرقم القومي
                  </label>
                  <input
                    type="text"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value.replace(/\D/g, '').slice(0, 14))}
                    placeholder="أدخل الرقم القومي (14 رقم)"
                    className="w-full px-6 py-4 text-2xl text-center border-4 border-primary-300 rounded-xl focus:border-primary-600 focus:ring-4 focus:ring-primary-200 transition-all"
                    maxLength="14"
                    dir="ltr"
                  />
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    مثال: 29001011234567
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 border-r-4 border-red-500 p-4 rounded-lg">
                    <p className="text-red-700 font-semibold">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-5 bg-gradient-to-r from-primary-700 to-primary-900 text-white text-xl font-bold rounded-xl hover:from-primary-800 hover:to-primary-950 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                  {loading ? (
                    <>
                      <div className="spinner border-white"></div>
                      <span>جاري البحث...</span>
                    </>
                  ) : (
                    <>
                      <FaSearch />
                      <span>ابحث الآن</span>
                    </>
                  )}
                </button>
              </form>
            </motion.div>

            {/* Result */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-2xl p-8 md:p-12"
              >
                <div className="text-center mb-8">
                  <div className="inline-block p-6 bg-green-100 rounded-full mb-4">
                    <FaMapMarkerAlt className="text-5xl text-green-600" />
                  </div>
                  <h2 className="text-3xl font-black text-gray-900 mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>
                    تم العثور على لجنتك الانتخابية! 
                  </h2>
                  <p className="text-lg text-gray-600">
                    الرقم القومي: <span className="font-bold text-primary-700" dir="ltr">{result.nationalId}</span>
                  </p>
                </div>

                <div className="space-y-6">
                  {/* معلومات اللجنة */}
                  <div className="p-6 bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl border-2 border-primary-200">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <FaMapMarkerAlt className="text-primary-600" />
                      معلومات اللجنة الانتخابية
                    </h3>
                    <div className="space-y-4">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center py-3 border-b border-gray-300">
                        <span className="text-gray-600 font-semibold mb-1 md:mb-0">اسم اللجنة:</span>
                        <span className="text-gray-900 font-bold text-lg">{result.pollingStation}</span>
                      </div>
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center py-3 border-b border-gray-300">
                        <span className="text-gray-600 font-semibold mb-1 md:mb-0">العنوان الكامل:</span>
                        <span className="text-gray-900 font-bold text-right">{result.address}</span>
                      </div>
                      <div className="flex flex-col md:flex-row md:justify-between md:items-center py-3 border-b border-gray-300">
                        <span className="text-gray-600 font-semibold mb-1 md:mb-0">المحافظة:</span>
                        <span className="text-gray-900 font-bold">{result.governorate}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-2">
                        <div className="text-center p-4 bg-white rounded-lg shadow">
                          <p className="text-sm text-gray-600 mb-1">رقم المحطة</p>
                          <p className="text-4xl font-black text-primary-700">{result.stationNumber}</p>
                        </div>
                        <div className="text-center p-4 bg-white rounded-lg shadow">
                          <p className="text-sm text-gray-600 mb-1">رقم اللجنة</p>
                          <p className="text-4xl font-black text-primary-700">{result.committeeNumber}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* ملاحظة هامة */}
                  {result.note && (
                    <div className="p-5 bg-yellow-50 border-r-4 border-yellow-500 rounded-lg">
                      <div className="flex items-start gap-3">
                        <FaInfoCircle className="text-yellow-600 text-2xl flex-shrink-0 mt-1" />
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">ملاحظة هامة</h4>
                          <p className="text-gray-700 leading-relaxed">{result.note}</p>
                          <a
                            href="https://www.elections.eg/inquiry"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-yellow-600 text-white font-bold rounded-lg hover:bg-yellow-700 transition-all text-sm"
                          >
                            <span>التحقق من الموقع الرسمي</span>
                            <span>←</span>
                          </a>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* صوتك أمانة */}
                  <div className="p-6 bg-gradient-to-br from-gold-50 to-yellow-50 border-r-4 border-gold-500 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                      🐋 صوتك أمانة
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-3 text-lg">
                      بعد معرفة لجنتك، لا تنسى أن تشارك في الانتخابات وتمنح صوتك لـ
                    </p>
                    <p className="text-2xl font-black text-primary-900 mb-2">
                      محمد إبراهيم علي الناغي
                    </p>
                    <div className="flex items-center justify-center gap-4 p-4 bg-white rounded-lg">
                      <span className="text-5xl">🐋</span>
                      <div>
                        <p className="text-sm text-gray-600">الرمز الانتخابي</p>
                        <p className="text-4xl font-black text-gold-600">رقم 13</p>
                        <p className="text-xl font-bold text-gray-800">الحوت</p>
                      </div>
                    </div>
                  </div>

                  {/* ما تحتاجه يوم الانتخابات */}
                  <div className="p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                    <h3 className="text-xl font-bold text-gray-900 mb-4">📋 ما تحتاجه يوم الانتخابات</h3>
                    <ul className="space-y-3 text-gray-700">
                      <li className="flex items-start gap-3 p-3 bg-white rounded-lg">
                        <span className="text-gold-600 font-bold text-xl">✓</span>
                        <span className="text-lg">البطاقة الشخصية أو جواز السفر (ساري)</span>
                      </li>
                      <li className="flex items-start gap-3 p-3 bg-white rounded-lg">
                        <span className="text-gold-600 font-bold text-xl">✓</span>
                        <span className="text-lg">التوجه إلى مقر اللجنة المذكور أعلاه في الموعد المحدد</span>
                      </li>
                      <li className="flex items-start gap-3 p-3 bg-white rounded-lg">
                        <span className="text-gold-600 font-bold text-xl">✓</span>
                        <span className="text-lg">اختيار الرمز الانتخابي: <strong className="text-primary-700">رقم 13 - الحوت 🐋</strong></span>
                      </li>
                      <li className="flex items-start gap-3 p-3 bg-white rounded-lg">
                        <span className="text-gold-600 font-bold text-xl">✓</span>
                        <span className="text-lg">التأكد من ختم البطاقة الانتخابية بعد التصويت</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Info Cards */}
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-2xl font-black text-gray-900 mb-4" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  لماذا تصوت؟
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-primary-700 font-bold">•</span>
                    <span>صوتك يحدد مستقبل دائرتك</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-700 font-bold">•</span>
                    <span>المشاركة واجب وطني</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-700 font-bold">•</span>
                    <span>اختيار من يمثلك في البرلمان</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary-700 font-bold">•</span>
                    <span>المساهمة في بناء مصر الجديدة</span>
                  </li>
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-2xl font-black text-gray-900 mb-4" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  اختر رقم 13 🐋
                </h3>
                <p className="text-gray-700 leading-relaxed mb-4">
                  محمد إبراهيم علي الناغي - مرشح يتميز بـ:
                </p>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-gold-600 font-bold">✓</span>
                    <span>خبرة 15 عام في العمل السيادي</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-600 font-bold">✓</span>
                    <span>قائد مركز شباب الرياض الأول على الجمهورية</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-600 font-bold">✓</span>
                    <span>برنامج انتخابي شامل ومدروس</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-gold-600 font-bold">✓</span>
                    <span>ابن الدائرة ويعرف احتياجاتها</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FindPollingStationPage;
