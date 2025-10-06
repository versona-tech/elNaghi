import Head from 'next/head';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaCalendar, FaMapMarkerAlt, FaClock, FaUsers } from 'react-icons/fa';
import { eventsAPI } from '@/lib/api';

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showUpcoming, setShowUpcoming] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, [showUpcoming]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await eventsAPI.getAll({ 
        upcoming: showUpcoming,
        limit: 20 
      });
      setEvents(response.data.data || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>الفعاليات - محمد إبراهيم علي الناغي</title>
        <meta name="description" content="جدول الفعاليات واللقاءات الخاصة بالمرشح محمد إبراهيم علي الناغي" />
      </Head>

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">الفعاليات</h1>
          <p className="text-xl text-primary-100">شارك في اللقاءات والأنشطة القادمة</p>
        </div>
      </section>

      {/* Filter */}
      <section className="bg-white py-6">
        <div className="container-custom">
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setShowUpcoming(true)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                showUpcoming
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              الفعاليات القادمة
            </button>
            <button
              onClick={() => setShowUpcoming(false)}
              className={`px-6 py-2 rounded-full font-semibold transition-all ${
                !showUpcoming
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              الفعاليات السابقة
            </button>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="spinner"></div>
            </div>
          ) : events.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <div key={event._id} className="card overflow-hidden hover:shadow-2xl transition-shadow">
                  <div className="bg-primary-600 text-white p-6 text-center">
                    <div className="text-4xl font-bold">
                      {new Date(event.date).getDate()}
                    </div>
                    <div className="text-sm mt-1">
                      {new Date(event.date).toLocaleDateString('ar-EG', { 
                        month: 'long', 
                        year: 'numeric' 
                      })}
                    </div>
                  </div>

                  <div className="p-6">
                    <span className="inline-block bg-primary-100 text-primary-700 text-sm px-3 py-1 rounded-full mb-3">
                      {event.category}
                    </span>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {event.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {event.description}
                    </p>

                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <FaClock className="text-primary-600" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <FaMapMarkerAlt className="text-primary-600 mt-1 flex-shrink-0" />
                        <span>{event.location}</span>
                      </div>
                      {event.capacity && (
                        <div className="flex items-center gap-2">
                          <FaUsers className="text-primary-600" />
                          <span>السعة: {event.capacity} شخص</span>
                        </div>
                      )}
                    </div>

                    {event.registrationLink && showUpcoming && (
                      <a
                        href={event.registrationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 block btn-primary text-center"
                      >
                        سجل حضورك
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                {showUpcoming ? 'لا توجد فعاليات قادمة حالياً' : 'لا توجد فعاليات سابقة'}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default EventsPage;
