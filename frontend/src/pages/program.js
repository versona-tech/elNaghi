import Head from 'next/head';
import { useState, useEffect } from 'react';
import { 
  FaGraduationCap, FaHospital, FaBriefcase, FaRoad, 
  FaFutbol, FaChartLine, FaLeaf, FaBook 
} from 'react-icons/fa';
import { programAPI } from '@/lib/api';

const ProgramPage = () => {
  const [program, setProgram] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('الكل');

  const categoryIcons = {
    'تعليم': <FaGraduationCap />,
    'صحة': <FaHospital />,
    'تشغيل': <FaBriefcase />,
    'بنية تحتية': <FaRoad />,
    'شباب ورياضة': <FaFutbol />,
    'تنمية': <FaChartLine />,
    'بيئة': <FaLeaf />,
    'ثقافة': <FaBook />,
  };

  useEffect(() => {
    fetchProgram();
  }, []);

  const fetchProgram = async () => {
    try {
      const response = await programAPI.getAll();
      setProgram(response.data.data || []);
    } catch (error) {
      console.error('Error fetching program:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['الكل', ...new Set(program.map(item => item.category))];

  const filteredProgram = selectedCategory === 'الكل' 
    ? program 
    : program.filter(item => item.category === selectedCategory);

  return (
    <>
      <Head>
        <title>البرنامج الانتخابي - محمد إبراهيم علي الناغي</title>
        <meta name="description" content="البرنامج الانتخابي الشامل للمرشح محمد إبراهيم علي الناغي" />
      </Head>

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">البرنامج الانتخابي</h1>
          <p className="text-xl text-primary-100">خريطة طريق واقعية بأهداف زمنية ومؤشرات قياس للأثر في دائرة منية النصر والكردي وميت سلسيل والجمالية</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white py-8 sticky top-[72px] z-40 shadow-md">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Program Items */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="spinner"></div>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="card p-6">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">رؤية وأولويات</h2>
                <p className="text-gray-700 leading-relaxed">
                  نلتزم ببرنامج يُعلي من كرامة المواطن ويضع الخدمات الأساسية في المقدمة: مدارس آمنة ومعلمين مدرَّبين،
                  وحدات صحية تعمل بكفاءة، طرق ومرافق متاحة للجميع، وتمكين اقتصادي للشباب والمرأة. نعتمد على شراكات مع
                  الجهات التنفيذية والمجتمع المدني، وجدول زمني واضح، ومتابعة شهرية معلنة لضمان الشفافية والمحاسبة.
                </p>
              </div>
              {filteredProgram.map((item) => (
                <div key={item._id} className="card p-8 hover:shadow-2xl transition-shadow">
                  <div className="flex items-start gap-6">
                    <div className="text-6xl text-primary-600 flex-shrink-0">
                      {categoryIcons[item.category] || <FaChartLine />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="bg-primary-100 text-primary-700 px-4 py-1 rounded-full text-sm font-semibold">
                          {item.category}
                        </span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                        {item.title}
                      </h2>
                      <p className="text-gray-700 text-lg leading-relaxed mb-6">
                        {item.description}
                      </p>
                      {item.points && item.points.length > 0 && (
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3">النقاط الرئيسية:</h3>
                          <ul className="space-y-2">
                            {item.points.map((point, index) => (
                              <li key={index} className="flex items-start gap-3">
                                <span className="text-primary-600 text-xl mt-1">◄</span>
                                <span className="text-gray-700">{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {filteredProgram.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">لا توجد عناصر في هذا التصنيف</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProgramPage;
