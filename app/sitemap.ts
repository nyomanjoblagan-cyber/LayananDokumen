import { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/blogData' // Import fungsi untuk ambil artikel

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://layanandokumen.com'

  // Ambil semua artikel dari blogData
  const articles = getAllArticles()

  // Daftar semua alat (tools) - sesuai dengan yang ada
  const tools = [
    // Bisnis & UMKM
    '/tools/finance?mode=invoice',
    '/tools/finance?mode=kwitansi',
    '/tools/finance?mode=nota',
    '/tools/po',
    '/tools/penawaran',
    '/tools/keterangan-penghasilan',
    '/tools/penagihan',
    '/tools/spk',
    '/tools/kas',
    '/tools/faktur-pajak',
    '/tools/garansi',
    '/tools/pengaduan',
    '/tools/distributor',
    '/tools/spb',
    '/tools/konfirmasi-order',
    '/tools/laba-rugi',

    // HRD
    '/tools/lamaran',
    '/tools/cv',
    '/tools/kontrak-kerja',
    '/tools/surat-tugas',
    '/tools/sp-karyawan',
    '/tools/paklaring',
    '/tools/resign',
    '/tools/nda',
    '/tools/rekomendasi',
    '/tools/bebas-narkoba',
    '/tools/pernyataan-kerja',
    '/tools/cuti-karyawan',
    '/tools/belum-nikah-hrd',
    '/tools/phk',
    '/tools/promosi',

    // Legal & Aset
    '/tools/jual-beli-tanah',
    '/tools/jual-beli-kendaraan',
    '/tools/sewa-rumah',
    '/tools/hutang',
    '/tools/surat-kuasa',
    '/tools/mou',
    '/tools/ahli-waris',
    '/tools/perjanjian-damai',
    '/tools/gadai',
    '/tools/pernyataan-waris',
    '/tools/hibah',
    '/tools/sewa-kendaraan',
    '/tools/wasiat',
    '/tools/joint-venture',
    '/tools/kuasa-pajak',
    '/tools/franchise',

    // Desa
    '/tools/pengantar-rt',
    '/tools/sku',
    '/tools/domisili',
    '/tools/sktm',
    '/tools/belum-menikah',
    '/tools/izin-keramaian',
    '/tools/pernyataan-kehilangan',
    '/tools/beda-nama',
    '/tools/belum-punya-rumah',
    '/tools/kematian',
    '/tools/penghasilan-ortu',
    '/tools/ahli-waris-desa',
    '/tools/nikah',
    '/tools/sk-non-bantuan',
    '/tools/imb',
    '/tools/tanah-aman',

    // Logistik
    '/tools/surat-jalan',
    '/tools/bast',
    '/tools/surat-dinas',
    '/tools/label-pengiriman',
    '/tools/izin-renovasi',
    '/tools/izin-barang',
    '/tools/tanda-terima',
    '/tools/klaim-asuransi',
    '/tools/redelivery',
    '/tools/hilang-kirim',

    // Akademik & Medis
    '/tools/izin-sekolah',
    '/tools/beasiswa',
    '/tools/magang',
    '/tools/pernyataan-ortu',
    '/tools/izin-pasangan',
    '/tools/sponsor-visa',
    '/tools/skl',
    '/tools/resign-akademik',
    '/tools/cuti-kuliah',
    '/tools/rekomendasi-akademik',
    '/tools/stop-studi',
    '/tools/penelitian',
    '/tools/rujukan',
    '/tools/rawat-inap',
    '/tools/ket-dokter',
    '/tools/donor',

    // Event & Kalkulator
    '/tools/sponsorship',
    '/tools/donasi',
    '/tools/panitia',
    '/tools/business-plan',
    '/tools/terbilang',
    '/tools/kpr',
    '/tools/diskon',
    '/tools/usia',
    '/tools/pph',
    '/tools/pajak-tanah',
    '/tools/pesangon',

    // Pages Lainnya
    '/tools/katalog-deskripsi',
    '/legalitas',
  ]

  // Routes dasar (halaman utama dan halaman penting)
  const baseRoutes: MetadataRoute.Sitemap = [
    // Halaman utama
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    // Halaman listing panduan/artikel
    {
      url: `${baseUrl}/panduan`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    // Halaman legalitas
    {
      url: `${baseUrl}/legalitas`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
  ]

  // Routes untuk tools
  const toolRoutes = tools.map((tool) => ({
    url: `${baseUrl}${tool}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Routes untuk artikel/panduan detail
  const articleRoutes = articles.map((article) => {
    // Parse tanggal dari string ke Date object
    // Format: "12 Januari 2026" -> perlu diubah ke format Date
    let lastModified = new Date()
    
    try {
      // Coba parse tanggal dari artikel
      if (article.date) {
        // Ubah format "12 Januari 2026" ke "12 January 2026" untuk parsing
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
      // Default to current date if parsing fails
    }

    return {
      url: `${baseUrl}/panduan/${article.slug}`,
      lastModified,
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }
  })

  // Optional: Tambahkan halaman kategori jika ada
  // Ambil semua kategori unik dari artikel
  const categories = Array.from(new Set(articles.map(article => article.category)))
  const categoryRoutes = categories.map((category) => ({
    url: `${baseUrl}/panduan/kategori/${encodeURIComponent(category.toLowerCase())}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  // Gabungkan semua routes
  return [...baseRoutes, ...toolRoutes, ...articleRoutes, ...categoryRoutes]
}