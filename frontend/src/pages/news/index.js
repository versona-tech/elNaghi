import Head from 'next/head';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaNewspaper, FaCalendar, FaEye } from 'react-icons/fa';
import { newsAPI } from '@/lib/api';

const NewsPage = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = ['أخبار', 'أنشطة', 'إنجازات', 'مشروعات', 'بيانات'];

  useEffect(() => {
    fetchNews();
  }, [page, selectedCategory]);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 9 };
      if (selectedCategory) params.category = selectedCategory;

      const response = await newsAPI.getAll(params);
      setNews(response.data.data || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>الأخبار والأنشطة - محمد إبراهيم علي الناغي</title>
        <meta name="description" content="آخر أخبار وأنشطة المرشح محمد إبراهيم علي الناغي" />
      </Head>

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">الأخبار والأنشطة</h1>
          <p className="text-xl text-primary-100">تغطيات موثّقة لأنشطة الحملة وإنجازاتها وآراء المواطنين</p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white py-6 sticky top-[72px] z-40 shadow-md">
        <div className="container-custom">
          <div className="flex flex-wrap gap-3 justify-center">
            <button
              onClick={() => { setSelectedCategory(''); setPage(1); }}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                selectedCategory === ''
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              الكل
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => { setSelectedCategory(category); setPage(1); }}
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

      {/* News Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="spinner"></div>
            </div>
          ) : news.length > 0 ? (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {news.map((item) => (
                  <Link key={item._id} href={`/news/${item._id}`} className="card group">
                    {item.mediaUrl && item.mediaUrl.length > 0 && item.mediaUrl[0].url && (
                      <div className="h-48 bg-gray-200 overflow-hidden">
                        <img
                          src={item.mediaUrl[0].url}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
                        <FaNewspaper />
                        <span>{item.category}</span>
                        <span>•</span>
                        <FaCalendar />
                        <span>{new Date(item.publishedAt).toLocaleDateString('ar-EG')}</span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-3 mb-4">
                        {item.summary || item.body}
                      </p>
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <FaEye />
                        <span>{item.views || 0} مشاهدة</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2">
                  <button
                    onClick={() => setPage(p => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    السابق
                  </button>
                  <span className="px-4 py-2 bg-white border border-gray-300 rounded-lg">
                    صفحة {page} من {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    التالي
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">لا توجد أخبار حالياً — ترقّبوا جديد الحملة قريباً.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default NewsPage;
