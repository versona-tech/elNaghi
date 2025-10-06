# Open Graph Image Guidelines

## Required Image: og-image.jpg

Create an image with these specifications:
- **Size**: 1200 x 630 pixels (Facebook/Twitter recommended)
- **Format**: JPG or PNG
- **File name**: og-image.jpg
- **Location**: /public/images/og-image.jpg

## Content Suggestions:
1. **Background**: Egyptian flag colors (Red #CE1126, White, Black) or elegant gradient
2. **Main Element**: Profile photo of Mohamed El-Nagh y (already at /public/images/profile.jpg)
3. **Text**: 
   - Main: "محمد الناغي"
   - Subtitle: "مرشح مجلس النواب"
   - District: "دائرة منية النصر والكردي وميت سلسيل والجمالية"
4. **Logo**: If available, include campaign logo
5. **Style**: Professional, clean, readable even when small

## Design Tools You Can Use:
- Canva: https://canva.com (easy templates)
- Figma: Professional design tool
- Photoshop: For detailed editing
- Online OG Image Generators

## Quick Canva Template:
1. Go to Canva
2. Select "Custom Size" → 1200 x 630 px
3. Use Egyptian flag colors
4. Add profile photo
5. Add text in Cairo font (Arabic-friendly)
6. Export as JPG

## Temporary Solution:
Until you create the custom image, the profile.jpg will be used automatically.
You can copy profile.jpg as og-image.jpg:
```bash
cp /home/tarek/Desktop/elnagy/frontend/public/images/profile.jpg /home/tarek/Desktop/elnagy/frontend/public/images/og-image.jpg
```

## Testing:
After creating, test your image at:
- Facebook Debugger: https://developers.facebook.com/tools/debug/
- Twitter Card Validator: https://cards-dev.twitter.com/validator
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
