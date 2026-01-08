import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://layanandokumen.com' // SESUAIKAN DENGAN DOMAIN MAS

  // Daftar semua alat berdasarkan database kita
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

  const routes = ['', ...tools].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const, // Diubah ke daily karena Mas lagi aktif update
    priority: route === '' ? 1 : 0.7,
  }))

  return routes
}