import Head from 'next/head';
import { useRouter } from 'next/router';

const SEO = ({ 
  title = 'محمد الناغي - مرشح مجلس النواب',
  description = 'الموقع الرسمي للمرشح محمد إبراهيم علي الناغي - مرشح مجلس النواب عن دائرة منية النصر والكردي وميت سلسيل والجمالية - محافظة الدقهلية. معاً نبني مستقبل أفضل.',
  image = '/images/og-image.jpg',
  type = 'website',
  keywords = 'محمد الناغي, مرشح مجلس النواب, منية النصر, الكردي, ميت سلسيل, الجمالية, الدقهلية, انتخابات مصر, البرلمان المصري'
}) => {
  const router = useRouter();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mohamedelnagy.netlify.app';
  const currentUrl = `${siteUrl}${router.asPath}`;
  const fullTitle = title.includes('محمد الناغي') ? title : `${title} | محمد الناغي`;

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="محمد إبراهيم علي الناغي" />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="ar_EG" />
      <meta property="og:site_name" content="محمد الناغي - مرشح مجلس النواب" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={currentUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />
      <meta name="twitter:creator" content="@mohamedelnagy" />

      {/* Additional Meta Tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta httpEquiv="x-ua-compatible" content="ie=edge" />
      
      {/* Theme Color */}
      <meta name="theme-color" content="#991b1b" />
      <meta name="msapplication-TileColor" content="#991b1b" />
      
      {/* Geographic Tags */}
      <meta name="geo.region" content="EG-DK" />
      <meta name="geo.placename" content="منية النصر, الدقهلية, مصر" />
      
      {/* Structured Data - Person */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'محمد إبراهيم علي الناغي',
            alternateName: 'محمد الناغي',
            description: 'مرشح مجلس النواب عن دائرة منية النصر والكردي وميت سلسيل والجمالية - محافظة الدقهلية',
            image: `${siteUrl}/images/profile.jpg`,
            url: siteUrl,
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'منية النصر',
              addressRegion: 'الدقهلية',
              addressCountry: 'EG',
            },
            jobTitle: 'مرشح مجلس النواب',
            sameAs: [
              'https://facebook.com/mohamedelnagy',
              'https://twitter.com/mohamedelnagy',
            ],
          }),
        }}
      />
      
      {/* Structured Data - Political Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'PoliticalOrganization',
            name: 'حملة محمد الناغي الانتخابية',
            description: 'الحملة الانتخابية الرسمية للمرشح محمد الناغي لمجلس النواب',
            url: siteUrl,
            logo: `${siteUrl}/images/logo.png`,
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'منية النصر',
              addressRegion: 'الدقهلية',
              addressCountry: 'EG',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              contactType: 'Campaign Headquarters',
              areaServed: 'EG',
              availableLanguage: ['ar'],
            },
          }),
        }}
      />
      
      {/* Structured Data - Website */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'محمد الناغي - مرشح مجلس النواب',
            url: siteUrl,
            description: description,
            inLanguage: 'ar',
            potentialAction: {
              '@type': 'SearchAction',
              target: `${siteUrl}/search?q={search_term_string}`,
              'query-input': 'required name=search_term_string',
            },
          }),
        }}
      />
    </Head>
  );
};

export default SEO;
