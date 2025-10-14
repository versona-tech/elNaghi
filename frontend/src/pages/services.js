import Head from 'next/head';
import Link from 'next/link';
import { FaIdCard, FaBolt, FaFileAlt, FaBuilding, FaWater, FaGraduationCap, FaHospital, FaMoneyBill } from 'react-icons/fa';

const ServicesPage = () => {
  const services = [
    {
      title: 'البطاقة الشخصية',
      icon: <FaIdCard />,
      description: 'استخراج وتجديد البطاقة الشخصية',
      links: [
        { name: 'استعلام عن البطاقة', url: 'https://www.moi.gov.eg/' },
        { name: 'حجز موعد', url: 'https://www.moi.gov.eg/' },
        { name: 'الأوراق المطلوبة', url: 'https://www.moi.gov.eg/' },
      ]
    },
    {
      title: 'الكهرباء',
      icon: <FaBolt />,
      description: 'استعلامات وشكاوى الكهرباء',
      links: [
        { name: 'استعلام عن الفاتورة', url: 'https://portal.eea.com.eg/' },
        { name: 'تقديم شكوى', url: 'https://portal.eea.com.eg/' },
        { name: 'طلب توصيل كهرباء', url: 'https://portal.eea.com.eg/' },
      ]
    },
    {
      title: 'التموين',
      icon: <FaFileAlt />,
      description: 'البطاقة التموينية والخدمات',
      links: [
        { name: 'استعلام عن البطاقة', url: 'https://www.moss.gov.eg/' },
        { name: 'إضافة مواليد', url: 'https://www.moss.gov.eg/' },
        { name: 'تحديث البيانات', url: 'https://www.moss.gov.eg/' },
      ]
    },
    {
      title: 'السجل العقاري',
      icon: <FaBuilding />,
      description: 'الاستعلامات العقارية',
      links: [
        { name: 'الاستعلام العقاري', url: 'https://www.rea.gov.eg/' },
        { name: 'تسجيل عقد', url: 'https://www.rea.gov.eg/' },
        { name: 'شهادة ملكية', url: 'https://www.rea.gov.eg/' },
      ]
    },
    {
      title: 'مياه الشرب',
      icon: <FaWater />,
      description: 'خدمات مياه الشرب والصرف',
      links: [
        { name: 'استعلام عن الفاتورة', url: 'https://www.hcww.com.eg/' },
        { name: 'تقديم شكوى', url: 'https://www.hcww.com.eg/' },
        { name: 'طلب توصيل مياه', url: 'https://www.hcww.com.eg/' },
      ]
    },
    {
      title: 'التعليم',
      icon: <FaGraduationCap />,
      description: 'الخدمات التعليمية',
      links: [
        { name: 'نتائج الامتحانات', url: 'https://moe.gov.eg/' },
        { name: 'التقديم للمدارس', url: 'https://moe.gov.eg/' },
        { name: 'المنح الدراسية', url: 'https://moe.gov.eg/' },
      ]
    },
    {
      title: 'الصحة',
      icon: <FaHospital />,
      description: 'التأمين الصحي والخدمات',
      links: [
        { name: 'التأمين الصحي الشامل', url: 'https://www.uhia.gov.eg/' },
        { name: 'حجز موعد بالمستشفى', url: 'https://www.mohp.gov.eg/' },
        { name: 'الوحدات الصحية', url: 'https://www.mohp.gov.eg/' },
      ]
    },
    {
      title: 'الضرائب',
      icon: <FaMoneyBill />,
      description: 'الخدمات الضريبية',
      links: [
        { name: 'التسجيل الضريبي', url: 'https://www.eta.gov.eg/' },
        { name: 'الإقرار الضريبي', url: 'https://www.eta.gov.eg/' },
        { name: 'استعلامات ضريبية', url: 'https://www.eta.gov.eg/' },
      ]
    },
  ];

  return (
    <>
      <Head>
        <title>الخدمات الحكومية - محمد إبراهيم علي الناغي</title>
        <meta name="description" content="روابط مباشرة للخدمات الحكومية المختلفة" />
      </Head>

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">الخدمات الحكومية</h1>
          <p className="text-xl text-primary-100">
            دليل سريع وروابط موثوقة لإنجاز معاملاتك بأقل وقت ومجهود — هدفنا تسهيل وصولك للخدمة.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div key={index} className="card p-6 hover:shadow-2xl transition-shadow">
                <div className="text-5xl text-primary-600 mb-4">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.links.map((link, idx) => (
                    <li key={idx}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 flex items-center gap-2 group"
                      >
                        <span className="text-primary-500 group-hover:translate-x-1 transition-transform">◄</span>
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Help Notice */}
          <div className="mt-12 card p-8 bg-gradient-to-br from-primary-600 to-primary-800 text-white text-center">
            <h2 className="text-3xl font-bold mb-4">تحتاج مساعدة؟</h2>
            <p className="text-xl text-primary-100 mb-6">
              فريق الدعم بحملة محمد الناغي جاهز لمساعدتك خطوة بخطوة حتى تُنجز طلبك بنجاح.
            </p>
            <Link href="/contact" className="btn-primary bg-white text-primary-700 hover:bg-gray-100">
              تواصل معنا الآن
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicesPage;
