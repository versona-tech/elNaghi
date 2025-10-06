import Head from 'next/head';
import Image from 'next/image';
import { FaGraduationCap, FaHospital, FaBriefcase, FaRoad, FaFutbol, FaChartLine } from 'react-icons/fa';

const BiographyPage = () => {
  const qualifications = [
    { icon: <FaGraduationCap />, title: 'التعليم', value: 'بكالوريوس في...' },
    { icon: <FaBriefcase />, title: 'الخبرة', value: '15+ سنة من العمل' },
    { icon: <FaChartLine />, title: 'الإنجازات', value: 'عشرات المشروعات' },
  ];

  const achievements = [
    'المساهمة في تطوير البنية التحتية لقرية الرياض',
    'دعم مئات الأسر المحتاجة من خلال مشروعات خيرية',
    'تنظيم قوافل طبية مجانية للمواطنين',
    'دعم الطلاب المتفوقين والموهوبين',
    'المشاركة في مبادرات التنمية المحلية',
  ];

  return (
    <>
      <Head>
        <title>السيرة الذاتية - محمد إبراهيم علي الناغي</title>
        <meta name="description" content="السيرة الذاتية للمرشح محمد إبراهيم علي الناغي" />
      </Head>

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">السيرة الذاتية</h1>
          <p className="text-xl text-primary-100">تعرف على خبراتي وإنجازاتي</p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-custom">
          {/* Profile Section */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="card p-8 text-center">
              <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-8 border-primary-200 shadow-2xl">
                <Image 
                  src="/images/profile.jpg" 
                  alt="محمد الناغي"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">محمد إبراهيم علي الناغي</h2>
              <p className="text-xl text-primary-600 font-semibold">مرشح دائرة منية النصر والجمالية</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {qualifications.map((qual, index) => (
              <div key={index} className="card p-6 text-center">
                <div className="text-5xl text-primary-600 mx-auto mb-4">{qual.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{qual.title}</h3>
                <p className="text-gray-600">{qual.value}</p>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="card p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">نبذة عني</h2>
              <div className="prose prose-lg text-gray-700 leading-relaxed space-y-4">
                <p>
                  محمد إبراهيم علي الناغي، ابن قرية الرياض بمركز منية النصر، محافظة الدقهلية. 
                  نشأت وترعرعت بين أبناء هذه الأرض الطيبة، وعايشت همومهم وطموحاتهم.
                </p>
                <p>
                  على مدار السنوات الماضية، كرست حياتي لخدمة المجتمع والمساهمة في تطوير 
                  المنطقة من خلال العمل الأهلي والمشاركة في المشروعات التنموية.
                </p>
                <p>
                  أؤمن بأن التغيير الحقيقي يبدأ من الاستماع لصوت المواطن البسيط، والعمل 
                  الجاد لتحويل الوعود إلى واقع ملموس يلمسه كل مواطن في حياته اليومية.
                </p>
              </div>
            </div>

            <div className="card p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">الإنجازات والمساهمات</h2>
              <ul className="space-y-4">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-primary-600 text-2xl">✓</span>
                    <span className="text-gray-700 text-lg">{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BiographyPage;
