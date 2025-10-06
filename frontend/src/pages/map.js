import Head from 'next/head';
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { FaMapMarkerAlt, FaNewspaper, FaUsers } from 'react-icons/fa';

// Dynamically import map to avoid SSR issues
const MapWithNoSSR = dynamic(() => import('@/components/InteractiveMap'), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] bg-gray-200 flex items-center justify-center">
      <div className="spinner"></div>
    </div>
  ),
});

const MapPage = () => {
  const locations = [
    {
      name: 'قرية الرياض',
      coordinates: [31.1656, 31.7178],
      description: 'المقر الرئيسي - قرية المرشح',
      type: 'main',
      activities: 3,
      population: '15,000'
    },
    {
      name: 'مدينة منية النصر',
      coordinates: [31.1500, 31.7300],
      description: 'عاصمة المركز',
      type: 'city',
      activities: 5,
      population: '25,000'
    },
    {
      name: 'قرية الجمالية',
      coordinates: [31.1800, 31.7400],
      description: 'قرية تابعة للدائرة',
      type: 'village',
      activities: 2,
      population: '8,000'
    },
    // Add more locations as needed
  ];

  return (
    <>
      <Head>
        <title>الخريطة التفاعلية - محمد إبراهيم علي الناغي</title>
        <meta name="description" content="خريطة تفاعلية لدائرة منية النصر والكردي وميت سلسيل والجمالية" />
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </Head>

      {/* Hero */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">الخريطة التفاعلية</h1>
          <p className="text-xl text-primary-100">
            صورة واضحة لمراكز وقرى الدائرة مع لمحات سريعة عن السكان والأنشطة.
          </p>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Map */}
            <div className="lg:col-span-2">
              <div className="card overflow-hidden">
                <MapWithNoSSR locations={locations} />
              </div>
            </div>

            {/* Locations List */}
            <div>
              <div className="card p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <FaMapMarkerAlt className="text-primary-600" />
                  مناطق الدائرة
                </h2>
                <div className="space-y-4">
                  {locations.map((location, index) => (
                    <div key={index} className="border-r-4 border-primary-600 pr-4 hover:bg-gray-50 p-3 rounded transition-colors cursor-pointer">
                      <h3 className="font-bold text-gray-900 mb-1">{location.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{location.description}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <FaUsers />
                          {location.population}
                        </span>
                        <span className="flex items-center gap-1">
                          <FaNewspaper />
                          {location.activities} أنشطة
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="card p-6 mt-6">
                <h3 className="font-bold text-gray-900 mb-4">دليل الخريطة</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-red-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">المقر الرئيسي للحملة</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">مدينة</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-700">قرية</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MapPage;
