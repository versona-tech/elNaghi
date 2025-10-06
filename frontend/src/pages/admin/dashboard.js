import Head from 'next/head';
import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import withAuth from '@/components/withAuth';
import { 
  FaNewspaper, FaEnvelope, FaCalendar, FaEye, 
  FaCheckCircle, FaClock, FaExclamationCircle 
} from 'react-icons/fa';
import { newsAPI, messagesAPI, eventsAPI } from '@/lib/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    news: { total: 0, published: 0 },
    messages: { total: 0, new: 0, pending: 0 },
    events: { total: 0, upcoming: 0 }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [newsRes, messagesRes, eventsRes] = await Promise.all([
        newsAPI.getAll({ limit: 1 }),
        messagesAPI.getStats(),
        eventsAPI.getAll({ limit: 1 })
      ]);

      setStats({
        news: {
          total: newsRes.data.count || 0,
          published: newsRes.data.count || 0
        },
        messages: {
          total: messagesRes.data.data?.total || 0,
          new: messagesRes.data.data?.byStatus?.find(s => s._id === 'جديدة')?.count || 0,
          pending: messagesRes.data.data?.byStatus?.find(s => s._id === 'قيد المراجعة')?.count || 0
        },
        events: {
          total: eventsRes.data.count || 0,
          upcoming: eventsRes.data.count || 0
        }
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: 'إجمالي الأخبار',
      value: stats.news.total,
      icon: <FaNewspaper />,
      color: 'bg-blue-500',
      details: `${stats.news.published} منشور`
    },
    {
      title: 'الرسائل الجديدة',
      value: stats.messages.new,
      icon: <FaEnvelope />,
      color: 'bg-green-500',
      details: `${stats.messages.total} إجمالي`
    },
    {
      title: 'الرسائل قيد المراجعة',
      value: stats.messages.pending,
      icon: <FaClock />,
      color: 'bg-yellow-500',
      details: 'تحتاج متابعة'
    },
    {
      title: 'الفعاليات القادمة',
      value: stats.events.upcoming,
      icon: <FaCalendar />,
      color: 'bg-purple-500',
      details: `${stats.events.total} إجمالي`
    }
  ];

  return (
    <>
      <Head>
        <title>لوحة التحكم - الإدارة</title>
      </Head>

      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">لوحة التحكم</h1>
          <p className="text-gray-600">مرحباً بك في لوحة إدارة الموقع</p>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {statCards.map((card, index) => (
                <div key={index} className="card p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${card.color} text-white p-4 rounded-lg text-3xl`}>
                      {card.icon}
                    </div>
                    <div className="text-left">
                      <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                    </div>
                  </div>
                  <h3 className="text-gray-600 font-semibold mb-1">{card.title}</h3>
                  <p className="text-sm text-gray-500">{card.details}</p>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6">
              <a href="/admin/news" className="card p-6 hover:shadow-xl transition-shadow group">
                <FaNewspaper className="text-4xl text-primary-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">إدارة الأخبار</h3>
                <p className="text-gray-600">إضافة وتحرير الأخبار والأنشطة</p>
              </a>

              <a href="/admin/messages" className="card p-6 hover:shadow-xl transition-shadow group">
                <FaEnvelope className="text-4xl text-primary-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">الرسائل</h3>
                <p className="text-gray-600">عرض والرد على رسائل المواطنين</p>
              </a>

              <a href="/admin/events" className="card p-6 hover:shadow-xl transition-shadow group">
                <FaCalendar className="text-4xl text-primary-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">الفعاليات</h3>
                <p className="text-gray-600">جدولة وإدارة الفعاليات واللقاءات</p>
              </a>
            </div>
          </>
        )}
      </div>
    </>
  );
};

AdminDashboard.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;

export default withAuth(AdminDashboard);
