const express = require('express');
const router = express.Router();
const axios = require('axios');

// Facebook Page ID from URL: 100064061133842
const FACEBOOK_PAGE_ID = '100064061133842';

/**
 * GET /api/facebook/posts
 * Fetch posts from Facebook page
 */
router.get('/posts', async (req, res) => {
  try {
    const { limit = 10, type = 'all' } = req.query;
    
    // Check if Facebook Access Token is configured
    if (!process.env.FACEBOOK_ACCESS_TOKEN) {
      // Return mock data for development
      return res.json({
        success: true,
        data: getMockFacebookPosts(parseInt(limit)),
        source: 'mock',
        message: 'Using mock data. Configure FACEBOOK_ACCESS_TOKEN in .env for live data'
      });
    }

    // Facebook Graph API endpoint
    const fields = 'id,message,created_time,full_picture,permalink_url,type,attachments{media,type,url,subattachments}';
    const url = `https://graph.facebook.com/v18.0/${FACEBOOK_PAGE_ID}/posts`;
    
    const response = await axios.get(url, {
      params: {
        access_token: process.env.FACEBOOK_ACCESS_TOKEN,
        fields: fields,
        limit: limit
      }
    });

    // Filter by type if specified
    let posts = response.data.data || [];
    if (type !== 'all') {
      posts = posts.filter(post => post.type === type);
    }

    res.json({
      success: true,
      data: posts,
      source: 'facebook',
      paging: response.data.paging
    });

  } catch (error) {
    console.error('Facebook API Error:', error.response?.data || error.message);
    
    // Fallback to mock data on error
    res.json({
      success: true,
      data: getMockFacebookPosts(parseInt(req.query.limit || 10)),
      source: 'mock',
      message: 'Facebook API error. Using mock data.',
      error: error.message
    });
  }
});

/**
 * GET /api/facebook/feed
 * Fetch complete feed (posts, photos, videos)
 */
router.get('/feed', async (req, res) => {
  try {
    const { limit = 20 } = req.query;
    
    if (!process.env.FACEBOOK_ACCESS_TOKEN) {
      return res.json({
        success: true,
        data: getMockFacebookPosts(parseInt(limit)),
        source: 'mock'
      });
    }

    const fields = 'id,message,story,created_time,full_picture,permalink_url,type,attachments{media,media_type,type,url,subattachments,title,description}';
    const url = `https://graph.facebook.com/v18.0/${FACEBOOK_PAGE_ID}/feed`;
    
    const response = await axios.get(url, {
      params: {
        access_token: process.env.FACEBOOK_ACCESS_TOKEN,
        fields: fields,
        limit: limit
      }
    });

    res.json({
      success: true,
      data: response.data.data || [],
      source: 'facebook',
      paging: response.data.paging
    });

  } catch (error) {
    console.error('Facebook API Error:', error.response?.data || error.message);
    res.json({
      success: true,
      data: getMockFacebookPosts(parseInt(req.query.limit || 20)),
      source: 'mock',
      error: error.message
    });
  }
});

/**
 * GET /api/facebook/photos
 * Fetch photos from Facebook page
 */
router.get('/photos', async (req, res) => {
  try {
    const { limit = 12 } = req.query;
    
    if (!process.env.FACEBOOK_ACCESS_TOKEN) {
      return res.json({
        success: true,
        data: getMockPhotos(parseInt(limit)),
        source: 'mock'
      });
    }

    const fields = 'id,created_time,images,name,link,likes.summary(true)';
    const url = `https://graph.facebook.com/v18.0/${FACEBOOK_PAGE_ID}/photos`;
    
    const response = await axios.get(url, {
      params: {
        access_token: process.env.FACEBOOK_ACCESS_TOKEN,
        fields: fields,
        limit: limit,
        type: 'uploaded'
      }
    });

    res.json({
      success: true,
      data: response.data.data || [],
      source: 'facebook',
      paging: response.data.paging
    });

  } catch (error) {
    console.error('Facebook API Error:', error.response?.data || error.message);
    res.json({
      success: true,
      data: getMockPhotos(parseInt(req.query.limit || 12)),
      source: 'mock',
      error: error.message
    });
  }
});

/**
 * GET /api/facebook/videos
 * Fetch videos from Facebook page
 */
router.get('/videos', async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    
    if (!process.env.FACEBOOK_ACCESS_TOKEN) {
      return res.json({
        success: true,
        data: getMockVideos(parseInt(limit)),
        source: 'mock'
      });
    }

    const fields = 'id,created_time,description,title,permalink_url,picture,source,length';
    const url = `https://graph.facebook.com/v18.0/${FACEBOOK_PAGE_ID}/videos`;
    
    const response = await axios.get(url, {
      params: {
        access_token: process.env.FACEBOOK_ACCESS_TOKEN,
        fields: fields,
        limit: limit
      }
    });

    res.json({
      success: true,
      data: response.data.data || [],
      source: 'facebook',
      paging: response.data.paging
    });

  } catch (error) {
    console.error('Facebook API Error:', error.response?.data || error.message);
    res.json({
      success: true,
      data: getMockVideos(parseInt(req.query.limit || 10)),
      source: 'mock',
      error: error.message
    });
  }
});

// Mock data functions for development/fallback
function getMockFacebookPosts(limit = 10) {
  const posts = [
    {
      id: '1',
      message: 'بفضل الله، زيارة ميدانية لقرية منية النصر للاطلاع على احتياجات الأهالي ومناقشة مشاكل الطرق والصرف الصحي. وعدنا بحلول عملية وسريعة بإذن الله.',
      created_time: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      full_picture: 'https://placehold.co/800x600/1e40af/ffffff?text=زيارة+ميدانية',
      type: 'photo',
      permalink_url: 'https://facebook.com/100064061133842'
    },
    {
      id: '2',
      message: 'لقاء جماهيري حاشد مع أهالي الكردي لمناقشة البرنامج الانتخابي. شكراً لكم على ثقتكم وحضوركم المشرف 🐋 رقم 13',
      created_time: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      full_picture: 'https://placehold.co/800x600/1e40af/ffffff?text=لقاء+جماهيري',
      type: 'photo',
      permalink_url: 'https://facebook.com/100064061133842'
    },
    {
      id: '3',
      message: 'جولة تفقدية للوحدة الصحية بميت سلسيل. استمعنا لمطالب الأطباء والممرضين ووعدنا بتوفير الأجهزة والأدوية اللازمة.',
      created_time: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      full_picture: 'https://placehold.co/800x600/1e40af/ffffff?text=الوحدة+الصحية',
      type: 'photo',
      permalink_url: 'https://facebook.com/100064061133842'
    },
    {
      id: '4',
      message: 'ندوة توعوية حول حقوق المرأة والطفل بحضور نخبة من المتخصصين والمهتمين. المرأة شريك أساسي في التنمية 💪',
      created_time: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
      full_picture: 'https://placehold.co/800x600/1e40af/ffffff?text=ندوة+توعوية',
      type: 'photo',
      permalink_url: 'https://facebook.com/100064061133842'
    },
    {
      id: '5',
      message: 'افتتاح معرض توظيف للشباب بالتعاون مع عدة شركات. نعمل على توفير فرص عمل حقيقية لشبابنا 🎯',
      created_time: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
      full_picture: 'https://placehold.co/800x600/1e40af/ffffff?text=معرض+توظيف',
      type: 'photo',
      permalink_url: 'https://facebook.com/100064061133842'
    },
    {
      id: '6',
      message: 'زيارة مدرسة الجمالية الابتدائية. التعليم هو الاستثمار الحقيقي في المستقبل. وعدنا بتطوير البنية التحتية والوسائل التعليمية.',
      created_time: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      full_picture: 'https://placehold.co/800x600/1e40af/ffffff?text=زيارة+مدرسة',
      type: 'photo',
      permalink_url: 'https://facebook.com/100064061133842'
    },
    {
      id: '7',
      message: 'قافلة طبية مجانية لأهالي القرى. الصحة حق لكل مواطن 🏥',
      created_time: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000).toISOString(),
      full_picture: 'https://placehold.co/800x600/1e40af/ffffff?text=قافلة+طبية',
      type: 'photo',
      permalink_url: 'https://facebook.com/100064061133842'
    },
    {
      id: '8',
      message: 'دورة رياضية للشباب بمناسبة الحملة الانتخابية. الرياضة تبني أجساماً صحية وعقولاً سليمة ⚽',
      created_time: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
      full_picture: 'https://placehold.co/800x600/1e40af/ffffff?text=دورة+رياضية',
      type: 'photo',
      permalink_url: 'https://facebook.com/100064061133842'
    }
  ];

  return posts.slice(0, limit);
}

function getMockPhotos(limit = 12) {
  const photos = [];
  for (let i = 0; i < limit; i++) {
    photos.push({
      id: `photo_${i}`,
      created_time: new Date(Date.now() - i * 3 * 24 * 60 * 60 * 1000).toISOString(),
      images: [
        { source: `https://placehold.co/1200x800/1e40af/ffffff?text=صورة+${i+1}`, width: 1200, height: 800 }
      ],
      link: 'https://facebook.com/100064061133842',
      name: `صورة من الحملة الانتخابية ${i + 1}`
    });
  }
  return photos;
}

function getMockVideos(limit = 10) {
  const videos = [];
  for (let i = 0; i < limit; i++) {
    videos.push({
      id: `video_${i}`,
      created_time: new Date(Date.now() - i * 4 * 24 * 60 * 60 * 1000).toISOString(),
      title: `فيديو من الحملة الانتخابية ${i + 1}`,
      description: 'لقطات من جولاتنا الميدانية ولقاءاتنا مع الأهالي',
      picture: `https://placehold.co/640x360/1e40af/ffffff?text=فيديو+${i+1}`,
      permalink_url: 'https://facebook.com/100064061133842',
      length: 120 + i * 30
    });
  }
  return videos;
}

module.exports = router;
