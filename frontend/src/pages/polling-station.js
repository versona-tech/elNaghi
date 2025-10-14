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

    // فتح الموقع الرسمي مباشرة للحصول على البيانات الصحيحة
    window.open('https://www.elections.eg/inquiry', '_blank');
    
    // عرض رسالة تأكيد
    setResult({
      redirected: true,
      nationalId: nationalId
    });
  };

  return (
    <>
      <Head>
        <title>اعرف لجنتك الانتخابية - محمد إبراهيم علي الناغي</title>
        <meta name="description" content="اعرف مقر لجنتك الانتخابية بالرقم القومي - دائرة منية النصر" />
      </Head>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-800 via-primary-700 to-navy-800 text-white py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-cyber-grid" />
        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto px-4"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6" style={{ fontFamily: 'Cairo, sans-serif' }}>
              اعرف لجنتك الانتخابية
            </h1>
            <p className="text-lg md:text-2xl text-primary-100 mb-3 md:mb-4">
              اكتشف مقر التصويت الخاص بك بسهولة
            </p>
            <p className="text-base md:text-xl text-gray-200">
              أدخل الرقم القومي واكتشف مكان لجنتك الانتخابية
            </p>
          </motion.div>
        </div>
      </section>

      {/* Presidential Patronage */}
      <section className="py-6 md:py-8 bg-gradient-to-r from-green-700 via-green-800 to-green-900 border-y-4 border-gold-500">
        <div className="container-custom text-center px-4">
          <p className="text-xl md:text-2xl lg:text-3xl font-bold text-gold-300">
            تحت رعاية فخامة الرئيس عبد الفتاح السيسي
          </p>
          <p className="text-base md:text-lg text-gray-200 mt-2">
            الانتخابات البرلمانية 2025
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 md:py-16 bg-gray-50">
        <div className="container-custom px-4">
          <div className="max-w-3xl mx-auto">
            
            {/* Search Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 lg:p-12 mb-6 md:mb-8"
            >
              <div className="text-center mb-6 md:mb-8">
                <FaSearch className="text-4xl md:text-6xl text-primary-700 mx-auto mb-3 md:mb-4" />
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-2" style={{ fontFamily: 'Cairo, sans-serif' }}>
                  ابحث عن لجنتك
                </h2>
                <p className="text-gray-600 text-base md:text-lg">
                  أدخل الرقم القومي المكون من 14 رقم
                </p>
              </div>

              <form onSubmit={handleSearch} className="space-y-4 md:space-y-6">
                <div>
                  <label className="block text-base md:text-lg font-bold text-gray-900 mb-2 md:mb-3">
                    الرقم القومي
                  </label>
                  <input
                    type="text"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value.replace(/\D/g, '').slice(0, 14))}
                    placeholder="أدخل الرقم القومي (14 رقم)"
                    className="w-full px-4 md:px-6 py-3 md:py-4 text-xl md:text-2xl text-center border-4 border-primary-300 rounded-xl focus:border-primary-600 focus:ring-4 focus:ring-primary-200 transition-all"
                    maxLength="14"
                    dir="ltr"
                  />
                  <p className="text-xs md:text-sm text-gray-500 mt-2 text-center">
                    مثال: 29001011234567
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 border-r-4 border-red-500 p-3 md:p-4 rounded-lg">
                    <p className="text-red-700 font-semibold text-sm md:text-base">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 md:py-5 bg-gradient-to-r from-primary-700 to-primary-900 text-white text-lg md:text-xl font-bold rounded-xl hover:from-primary-800 hover:to-primary-950 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
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
            {result && result.redirected && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 lg:p-12"
              >
                <div className="text-center mb-6 md:mb-8">
                  <div className="inline-block p-4 md:p-6 bg-green-100 rounded-full mb-3 md:mb-4">
                    <FaInfoCircle className="text-3xl md:text-5xl text-green-600" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 md:mb-4" style={{ fontFamily: 'Cairo, sans-serif' }}>
                    تم فتح الموقع الرسمي
                  </h2>
                  <p className="text-base md:text-xl text-gray-700 leading-relaxed mb-3 md:mb-4 px-4">
                    تم توجيهك إلى <strong>الموقع الرسمي للهيئة الوطنية للانتخابات</strong> في نافذة جديدة
                  </p>
                  <p className="text-sm md:text-lg text-gray-600 px-4">
                    الرقم القومي: <span className="font-bold text-primary-700" dir="ltr">{result.nationalId}</span>
                  </p>
                </div>

                <div className="space-y-4 md:space-y-6">
                  {/* رابط الموقع الرسمي */}
                  <div className="p-4 md:p-6 bg-blue-50 border-2 border-blue-500 rounded-xl">
                    <div className="flex items-start gap-3">
                      <FaInfoCircle className="text-blue-600 text-xl md:text-2xl flex-shrink-0 mt-1" />
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-2 text-lg md:text-xl">استعلم من المصدر الرسمي</h3>
                        <p className="text-gray-700 mb-4 leading-relaxed text-sm md:text-base">
                          للحصول على البيانات الصحيحة والدقيقة للجنتك الانتخابية، يرجى الاستعلام من الموقع الرسمي للهيئة الوطنية للانتخابات:
                        </p>
                        <div className="space-y-3">
                          <a
                            href="https://www.elections.eg/inquiry"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl text-sm md:text-base"
                          >
                            <FaSearch />
                            <span>افتح الموقع الرسمي للاستعلام</span>
                            <span>←</span>
                          </a>
                          <p className="text-xs md:text-sm text-gray-600">
                            💡 سيتم فتح الموقع في نافذة جديدة
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* خطوات الاستعلام */}
                  <div className="p-4 md:p-6 bg-yellow-50 border-r-4 border-yellow-500 rounded-lg">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">📋 خطوات الاستعلام</h3>
                    <ul className="space-y-2 md:space-y-3 text-gray-700 text-sm md:text-base">
                      <li className="flex items-start gap-2 md:gap-3">
                        <span className="text-yellow-600 font-bold text-base md:text-lg">1.</span>
                        <span>افتح الموقع الرسمي للهيئة الوطنية للانتخابات</span>
                      </li>
                      <li className="flex items-start gap-2 md:gap-3">
                        <span className="text-yellow-600 font-bold text-base md:text-lg">2.</span>
                        <span>أدخل رقمك القومي في خانة الاستعلام</span>
                      </li>
                      <li className="flex items-start gap-2 md:gap-3">
                        <span className="text-yellow-600 font-bold text-base md:text-lg">3.</span>
                        <span>اضغط على زر &ldquo;بحث&rdquo; أو &ldquo;استعلام&rdquo;</span>
                      </li>
                      <li className="flex items-start gap-2 md:gap-3">
                        <span className="text-yellow-600 font-bold text-base md:text-lg">4.</span>
                        <span>ستظهر لك معلومات لجنتك الانتخابية الصحيحة</span>
                      </li>
                    </ul>
                  </div>

                  {/* صوتك أمانة */}
                  <div className="p-4 md:p-6 bg-gradient-to-br from-gold-50 to-yellow-50 border-r-4 border-gold-500 rounded-lg shadow-lg">
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                      🐋 صوتك أمانة
                    </h3>
                    <p className="text-gray-700 leading-relaxed mb-3 text-base md:text-lg">
                      بعد معرفة لجنتك من الموقع الرسمي، لا تنسى أن تشارك في الانتخابات وتمنح صوتك لـ
                    </p>
                    <p className="text-xl md:text-2xl font-black text-primary-900 mb-3">
                      محمد إبراهيم علي الناغي
                    </p>
                    <div className="flex items-center justify-center gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-lg">
                      <span className="text-4xl md:text-5xl">🐋</span>
                      <div>
                        <p className="text-xs md:text-sm text-gray-600">الرمز الانتخابي</p>
                        <p className="text-3xl md:text-4xl font-black text-gold-600">رقم 13</p>
                        <p className="text-lg md:text-xl font-bold text-gray-800">الحوت</p>
                      </div>
                    </div>
                  </div>

                  {/* ما تحتاجه يوم الانتخابات */}
                  <div className="p-4 md:p-6 bg-primary-50 rounded-lg border-2 border-primary-200">
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">📋 ما تحتاجه يوم الانتخابات</h3>
                    <ul className="space-y-2 md:space-y-3 text-gray-700">
                      <li className="flex items-start gap-2 md:gap-3 p-2 md:p-3 bg-white rounded-lg text-sm md:text-base">
                        <span className="text-gold-600 font-bold text-lg md:text-xl">✓</span>
                        <span>البطاقة الشخصية أو جواز السفر (ساري)</span>
                      </li>
                      <li className="flex items-start gap-2 md:gap-3 p-2 md:p-3 bg-white rounded-lg text-sm md:text-base">
                        <span className="text-gold-600 font-bold text-lg md:text-xl">✓</span>
                        <span>التوجه إلى مقر اللجنة المذكور في الموقع الرسمي</span>
                      </li>
                      <li className="flex items-start gap-2 md:gap-3 p-2 md:p-3 bg-white rounded-lg text-sm md:text-base">
                        <span className="text-gold-600 font-bold text-lg md:text-xl">✓</span>
                        <span>اختيار الرمز الانتخابي: <strong className="text-primary-700">رقم 13 - الحوت 🐋</strong></span>
                      </li>
                      <li className="flex items-start gap-2 md:gap-3 p-2 md:p-3 bg-white rounded-lg text-sm md:text-base">
                        <span className="text-gold-600 font-bold text-lg md:text-xl">✓</span>
                        <span>التأكد من ختم البطاقة الانتخابية بعد التصويت</span>
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
