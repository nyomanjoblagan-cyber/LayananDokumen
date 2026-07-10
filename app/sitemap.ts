import { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/blogData'
import { TEMPLATES } from '@/data/templates'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://layanandokumen.com'

  // 1. Ambil semua artikel dari blogData
  const articles = getAllArticles()

  // 2. Routes dasar (halaman utama dan halaman penting)
  const baseRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/panduan`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/legalitas`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  // 3. Generate routes untuk ke-99+ tools secara dinamis dari TEMPLATES
  const toolSlugs = Object.keys(TEMPLATES)
  const toolRoutes: MetadataRoute.Sitemap = toolSlugs.map((slug) => ({
    url: `${baseUrl}/tools/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9, // Priority tinggi karena ini inti bisnis pencetak uang
  }))

  // Khusus untuk tools finance yang menggunakan query parameter
  // Kita tambahkan variasi URL agar terindeks sempurna
  const financeVariations = ['invoice', 'kwitansi', 'nota']
  financeVariations.forEach(mode => {
    toolRoutes.push({
      url: `${baseUrl}/tools/finance?mode=${mode}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    })
  })

  // 4. Routes untuk artikel/panduan detail
  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => {
    let lastModified = new Date()
    
    try {
      if (article.date) {
        const indonesianMonths: Record<string, string> = {
          'januari': 'January', 'februari': 'February', 'maret': 'March',
          'april': 'April', 'mei': 'May', 'juni': 'June',
          'juli': 'July', 'agustus': 'August', 'september': 'September',
          'oktober': 'October', 'november': 'November', 'desember': 'December'
        }
        
        let dateStr = article.date.toLowerCase()
        for (const [id, en] of Object.entries(indonesianMonths)) {
          dateStr = dateStr.replace(id, en)
        }
        
        const parsedDate = new Date(dateStr)
        if (!isNaN(parsedDate.getTime())) {
          lastModified = parsedDate
        }
      }
    } catch (error) {
      console.error(`Error parsing date for article ${article.slug}:`, error)
    }

    return {
      url: `${baseUrl}/panduan/${article.slug}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.6,
    }
  })

  // 5. Routes untuk kategori artikel
  const categories = Array.from(new Set(articles.map(article => article.category)))
  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${baseUrl}/panduan/kategori/${encodeURIComponent(category.toLowerCase())}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.5,
  }))

  // Gabungkan semua routes menjadi satu array sitemap
  return [...baseRoutes, ...toolRoutes, ...articleRoutes, ...categoryRoutes]
}