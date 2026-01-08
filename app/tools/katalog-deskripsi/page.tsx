'use client';

import { 
  ArrowLeft, Search, ExternalLink, Store, Users, Gavel, 
  Landmark, Truck, GraduationCap, Stethoscope, PartyPopper, 
  Calculator 
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function KatalogLengkapCompact() {
  const [search, setSearch] = useState('');

  const FULL_CATALOG = [
    {
      group: "Bisnis & UMKM",
      icon: Store, color: "text-emerald-700", bg: "bg-emerald-50",
      items: [
        { name: "Invoice Profesional", desc: "Tagihan resmi dengan rincian transaksi barang/jasa yang wajib dibayar.", href: "/tools/finance?mode=invoice" },
        { name: "Kwitansi Pembayaran", desc: "Bukti sah penerimaan uang tunai dengan tanda tangan penerima.", href: "/tools/finance?mode=kwitansi" },
        { name: "Nota Penjualan", desc: "Catatan transaksi retail harian ringkas untuk pembeli langsung.", href: "/tools/finance?mode=nota" },
        { name: "Purchase Order (PO)", desc: "Pesanan resmi pembeli untuk mengunci stok & harga sebelum pengiriman.", href: "/tools/po" },
        { name: "Surat Penawaran Harga", desc: "Proposal rincian biaya produk/jasa untuk calon klien.", href: "/tools/penawaran" },
        { name: "Keterangan Penghasilan", desc: "Pernyataan nominal gaji bulanan untuk syarat kredit/administrasi.", href: "/tools/keterangan-penghasilan" },
        { name: "Surat Penagihan (Debt)", desc: "Teguran formal kepada pelanggan yang lewat jatuh tempo pembayaran.", href: "/tools/penagihan" },
        { name: "Perintah Kerja (SPK)", desc: "Instruksi formal pengerjaan proyek setelah deal tercapai.", href: "/tools/spk" },
        { name: "Laporan Kas Harian", desc: "Catatan arus uang masuk/keluar harian untuk memantau likuiditas.", href: "/tools/kas" },
        { name: "Faktur Pajak UMKM", desc: "Bukti pungutan PPN oleh PKP sebagai laporan kepada negara.", href: "/tools/faktur-pajak" },
        { name: "Jaminan (Garansi) Barang", desc: "Pernyataan tanggung jawab purna jual terhadap kualitas produk.", href: "/tools/garansi" },
        { name: "Surat Pengaduan Konsumen", desc: "Formulir resmi keluhan ketidakpuasan terhadap layanan/produk.", href: "/tools/pengaduan" },
        { name: "Perjanjian Distributor", desc: "Kontrak eksklusif antara produsen & penyalur wilayah tertentu.", href: "/tools/distributor" },
        { name: "Surat Perintah Bayar", desc: "Instruksi internal untuk pencairan dana operasional perusahaan.", href: "/tools/spb" },
        { name: "Surat Konfirmasi Pesanan", desc: "Pernyataan penjual bahwa order telah diterima & diproses.", href: "/tools/konfirmasi-order" },
        { name: "Laporan Laba Rugi", desc: "Ringkasan performa finansial usaha dalam periode tertentu.", href: "/tools/laba-rugi" }
      ]
    },
    {
      group: "HRD & Personalia",
      icon: Users, color: "text-blue-700", bg: "bg-blue-50",
      items: [
        { name: "Surat Lamaran Kerja", desc: "Pengantar profesional memperkenalkan kualifikasi kepada rekruter.", href: "/tools/lamaran" },
        { name: "CV Maker (ATS)", desc: "Resume standar yang sesuai dengan sistem sortir otomatis HRD modern.", href: "/tools/cv" },
        { name: "Kontrak Kerja (PKWT)", desc: "Perjanjian legal mengenai upah, tugas, & masa kerja karyawan.", href: "/tools/kontrak-kerja" },
        { name: "Surat Tugas Dinas", desc: "Perintah resmi atasan untuk perjalanan/tugas di luar kantor.", href: "/tools/surat-tugas" },
        { name: "Surat Peringatan (SP)", desc: "Teguran formal atas pelanggaran disiplin/kinerja karyawan.", href: "/tools/sp-karyawan" },
        { name: "Paklaring Kerja", desc: "Keterangan masa jabatan & referensi kerja karyawan yang resign.", href: "/tools/paklaring" },
        { name: "Surat Resign", desc: "Pernyataan mundur diri resmi sesuai aturan notice period.", href: "/tools/resign" },
        { name: "NDA (Kerahasiaan)", desc: "Kontrak untuk menjaga data sensitif bisnis agar tidak bocor.", href: "/tools/nda" },
        { name: "Rekomendasi Kerja", desc: "Dukungan atasan lama mengenai karakter & keahlian.", href: "/tools/rekomendasi" },
        { name: "Ket. Bebas Narkoba", desc: "Pernyataan pribadi bersih dari zat adiktif & narkotika.", href: "/tools/bebas-narkoba" },
        { name: "Pernyataan Tidak Terikat Kerja", desc: "Syarat melamar bahwa tidak ada kontrak aktif lain.", href: "/tools/pernyataan-kerja" },
        { name: "Izin Cuti/Hamil/Sakit", desc: "Formulir istirahat resmi untuk kesehatan/keperluan pribadi.", href: "/tools/cuti-karyawan" },
        { name: "Pernyataan Tidak Menikah", desc: "Syarat administrasi jabatan tertentu belum berkeluarga.", href: "/tools/belum-nikah-hrd" },
        { name: "Surat Pemberitahuan PHK", desc: "Dokumen resmi pemutusan kerja karena efisiensi/kasus.", href: "/tools/phk" },
        { name: "Rekomendasi Promosi", desc: "Usulan kenaikan jabatan berdasarkan prestasi kerja.", href: "/tools/promosi" }
      ]
    },
    {
      group: "Legal & Aset",
      icon: Gavel, color: "text-indigo-700", bg: "bg-indigo-50",
      items: [
        { name: "Jual Beli Tanah", desc: "Kontrak pemindahan hak milik lahan sesuai rincian legal.", href: "/tools/jual-beli-tanah" },
        { name: "Jual Beli Kendaraan", desc: "Bukti transaksi motor/mobil untuk syarat balik nama BPKB.", href: "/tools/jual-beli-kendaraan" },
        { name: "Sewa Rumah / Ruko", desc: "Kontrak penggunaan bangunan, biaya sewa & masa pakai.", href: "/tools/sewa-rumah" },
        { name: "Perjanjian Hutang", desc: "Surat pengakuan hutang, rincian tenor & jaminan aset.", href: "/tools/hutang" },
        { name: "Surat Kuasa", desc: "Pemberian wewenang sah untuk mengurus hal legal/administratif.", href: "/tools/surat-kuasa" },
        { name: "MoU Kerjasama", desc: "Nota kesepahaman awal antar dua pihak untuk berkolaborasi.", href: "/tools/mou" },
        { name: "Kesepakatan Ahli Waris", desc: "Pernyataan mufakat pembagian harta peninggalan keluarga.", href: "/tools/ahli-waris" },
        { name: "Perjanjian Damai", desc: "Kesepakatan menyelesaikan sengketa di luar jalur hukum.", href: "/tools/perjanjian-damai" },
        { name: "Gadai Aset", desc: "Kontrak pinjaman dana dengan jaminan barang berharga.", href: "/tools/gadai" },
        { name: "Surat Pernyataan Waris", desc: "Legalitas kedudukan seseorang sebagai penerima warisan.", href: "/tools/pernyataan-waris" },
        { name: "Surat Hibah", desc: "Pemberian aset secara sukarela tanpa transaksi jual beli.", href: "/tools/hibah" },
        { name: "Sewa Kendaraan", desc: "Kontrak rental mobil/motor mencakup durasi & denda.", href: "/tools/sewa-kendaraan" },
        { name: "Surat Wasiat", desc: "Pesan terakhir pembagian aset setelah pemilik wafat.", href: "/tools/wasiat" },
        { name: "Joint Venture", desc: "Kerjasama dua perusahaan membentuk entitas baru.", href: "/tools/joint-venture" },
        { name: "Kuasa Urus Pajak", desc: "Wewenang pihak ketiga mengelola administrasi perpajakan.", href: "/tools/kuasa-pajak" },
        { name: "Perjanjian Franchise", desc: "Kontrak hak merek dagang & sistem operasional bisnis.", href: "/tools/franchise" }
      ]
    },
    {
      group: "Administrasi Desa",
      icon: Landmark, color: "text-orange-700", bg: "bg-orange-50",
      items: [
        { name: "Pengantar RT/RW", desc: "Rujukan awal untuk mengurus administrasi kependudukan kelurahan.", href: "/tools/pengantar-rt" },
        { name: "Ket. Usaha (SKU)", desc: "Legalitas usaha mikro untuk syarat pengajuan modal bank.", href: "/tools/sku" },
        { name: "Ket. Domisili", desc: "Bukti tinggal sementara untuk kerja/membuka rekening.", href: "/tools/domisili" },
        { name: "Ket. Tidak Mampu", desc: "Syarat bantuan sosial atau keringanan biaya pendidikan.", href: "/tools/sktm" },
        { name: "Ket. Belum Menikah", desc: "Keterangan status lajang untuk keperluan syarat nikah.", href: "/tools/belum-menikah" },
        { name: "Izin Keramaian", desc: "Permohonan izin acara sosial agar disetujui lingkungan.", href: "/tools/izin-keramaian" },
        { name: "Surat Kehilangan", desc: "Pernyataan kehilangan barang sebagai dasar laporan polisi.", href: "/tools/pernyataan-kehilangan" },
        { name: "Pernyataan Beda Nama", desc: "Klarifikasi perbedaan penulisan nama di dokumen resmi.", href: "/tools/beda-nama" },
        { name: "Belum Punya Rumah", desc: "Syarat pengajuan subsidi rumah atau bantuan perumahan.", href: "/tools/belum-punya-rumah" },
        { name: "Keterangan Kematian", desc: "Laporan wafatnya seseorang untuk tertib administrasi.", href: "/tools/kematian" },
        { name: "Penghasilan Orang Tua", desc: "Syarat pendaftaran sekolah/kuliah jalur kurang mampu.", href: "/tools/penghasilan-ortu" },
        { name: "Ahli Waris Desa", desc: "Keterangan hubungan keluarga penerima aset di tingkat desa.", href: "/tools/ahli-waris-desa" },
        { name: "Pengantar Nikah", desc: "Syarat utama pendaftaran pernikahan di KUA/Sipil.", href: "/tools/nikah" },
        { name: "Ket. Non-Bantuan", desc: "Pernyataan tidak sedang menerima bantuan pemerintah.", href: "/tools/sk-non-bantuan" },
        { name: "IMB Sederhana", desc: "Izin membangun bangunan skala kecil/rumah tinggal.", href: "/tools/imb" },
        { name: "Pernyataan Tanah Aman", desc: "Jaminan tanah tidak dalam sengketa atau sengketa hukum.", href: "/tools/tanah-aman" }
      ]
    },
    {
      group: "Logistik & Transport",
      icon: Truck, color: "text-slate-700", bg: "bg-slate-100",
      items: [
        { name: "Surat Jalan", desc: "Dokumen wajib sopir sebagai bukti izin angkut muatan.", href: "/tools/surat-jalan" },
        { name: "Berita Acara (BAST)", desc: "Bukti formal serah terima barang/pekerjaan selesai.", href: "/tools/bast" },
        { name: "Surat Dinas Resmi", desc: "Komunikasi formal antar instansi/lembaga pemerintahan.", href: "/tools/surat-dinas" },
        { name: "Label Pengiriman", desc: "Identitas luar paket data pengirim & penerima logistik.", href: "/tools/label-pengiriman" },
        { name: "Izin Renovasi", desc: "Permohonan pengerjaan perbaikan bangunan lingkungan.", href: "/tools/izin-renovasi" },
        { name: "Keluar Masuk Barang", desc: "Kontrol inventaris gudang atau area terbatas perusahaan.", href: "/tools/izin-barang" },
        { name: "Tanda Terima", desc: "Pernyataan penerima bahwa paket sampai dengan jumlah pas.", href: "/tools/tanda-terima" },
        { name: "Klaim Asuransi", desc: "Permohonan ganti rugi kerusakan barang saat kirim.", href: "/tools/klaim-asuransi" },
        { name: "Redelivery", desc: "Permohonan pengiriman ulang paket yang gagal kirim.", href: "/tools/redelivery" },
        { name: "Hilang Kirim", desc: "Pernyataan barang hilang dalam proses distribusi kurir.", href: "/tools/hilang-kirim" }
      ]
    },
    {
      group: "Akademik & Izin",
      icon: GraduationCap, color: "text-rose-700", bg: "bg-rose-50",
      items: [
        { name: "Izin Sakit Sekolah", desc: "Pemberitahuan wali murid agar absen siswa dianggap sah.", href: "/tools/izin-sekolah" },
        { name: "Permohonan Beasiswa", desc: "Surat motivasi pengajuan bantuan biaya studi akademik.", href: "/tools/beasiswa" },
        { name: "Permohonan Magang", desc: "Surat lamaran praktek kerja lapangan bagi mahasiswa.", href: "/tools/magang" },
        { name: "Pernyataan Ortu", desc: "Persetujuan wali untuk kegiatan/tugas sekolah tertentu.", href: "/tools/pernyataan-ortu" },
        { name: "Izin Pasangan", desc: "Persetujuan suami/istri untuk tugas dinas/kerja luar.", href: "/tools/izin-pasangan" },
        { name: "Sponsor Visa", desc: "Jaminan finansial & administratif kunjungan luar negeri.", href: "/tools/sponsor-visa" },
        { name: "Ijazah Sementara", desc: "Keterangan lulus (SKL) sebelum ijazah asli diterbitkan.", href: "/tools/skl" },
        { name: "Undur Diri Kuliah", desc: "Pernyataan resmi berhenti dari status pendidikan.", href: "/tools/resign-akademik" },
        { name: "Cuti Kuliah", desc: "Izin berhenti studi sementara tanpa kehilangan status.", href: "/tools/cuti-kuliah" },
        { name: "Rekomendasi Dosen", desc: "Testimoni kualitas akademik untuk lanjut studi/riset.", href: "/tools/rekomendasi-akademik" },
        { name: "Stop Studi", desc: "Pernyataan tidak sedang aktif di pendidikan manapun.", href: "/tools/stop-studi" },
        { name: "Penelitian", desc: "Izin ambil data lapangan tugas akhir di instansi luar.", href: "/tools/penelitian" }
      ]
    },
    {
      group: "Kesehatan & Event",
      icon: Stethoscope, color: "text-cyan-700", bg: "bg-cyan-50",
      items: [
        { name: "Rujukan Medis", desc: "Pengantar faskes untuk penanganan spesialis lanjutan.", href: "/tools/rujukan" },
        { name: "Rawat Inap", desc: "Bukti opname resmi klaim asuransi atau izin kantor.", href: "/tools/rawat-inap" },
        { name: "Ket. Dokter", desc: "Izin istirahat pendek karena gangguan kesehatan ringan.", href: "/tools/ket-dokter" },
        { name: "Donor Darah/Organ", desc: "Pernyataan sukarela kontribusi medis kemanusiaan.", href: "/tools/donor" },
        { name: "Sponsorship", desc: "Proposal penawaran kerjasama komersial acara/event.", href: "/tools/sponsorship" },
        { name: "Donasi", desc: "Permohonan bantuan dana misi sosial kemanusiaan.", href: "/tools/donasi" },
        { name: "Pernyataan Panitia", desc: "Jaminan tanggung jawab keamanan sebuah penyelenggara.", href: "/tools/panitia" },
        { name: "Business Plan", desc: "Struktur rencana strategis operasional bisnis baru.", href: "/tools/business-plan" }
      ]
    },
    {
      group: "Kalkulator Finansial",
      icon: Calculator, color: "text-violet-700", bg: "bg-violet-50",
      items: [
        { name: "Terbilang Rupiah", desc: "Konversi otomatis angka ke ejaan kalimat kwitansi.", href: "/tools/terbilang" },
        { name: "Kalkulator KPR", desc: "Simulasi cicilan rumah, bunga bank, & tenor pinjaman.", href: "/tools/kpr" },
        { name: "Hitung Diskon", desc: "Hitung harga akhir setelah potongan persentase/flat.", href: "/tools/diskon" },
        { name: "Hitung Usia", desc: "Detail umur dalam tahun, bulan, hari dari tanggal lahir.", href: "/tools/usia" },
        { name: "Pajak PPh 21", desc: "Estimasi pajak gaji berdasarkan aturan PTKP terbaru.", href: "/tools/pph" },
        { name: "Pajak Tanah", desc: "Simulasi BPHTB & PPh transaksi jual beli properti.", href: "/tools/pajak-tanah" },
        { name: "Pesangon", desc: "Estimasi hak dana pensiun/PHK sesuai masa kerja.", href: "/tools/pesangon" }
      ]
    }
  ];

  const filteredCatalog = FULL_CATALOG.map(group => ({
    ...group,
    items: group.items.filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase()) || 
      item.desc.toLowerCase().includes(search.toLowerCase())
    )
  })).filter(group => group.items.length > 0);

  return (
    <div className="min-h-screen font-sans text-slate-900 bg-[#f8fafc] relative">
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-400 opacity-20 blur-[100px]"></div>
      </div>

      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-600 transition-colors">
            <ArrowLeft size={16} strokeWidth={2.5} /> Kembali ke Beranda
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Database v2.1</span>
            <span className="text-[9px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200">BETA</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-16">
        <div className="mb-12 space-y-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-bold text-emerald-700 tracking-wide uppercase">Katalog Fungsi</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
              Daftar Deskripsi <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Dokumen Administrasi.</span>
            </h1>
          </div>
          
          <div className="max-w-md relative group mx-auto md:mx-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-200"></div>
            <div className="relative bg-white rounded-xl shadow-sm flex items-center p-1 border border-slate-200">
              <Search className="text-slate-400 ml-3 shrink-0" size={20} />
              <input 
                type="text" 
                placeholder="Cari deskripsi surat..." 
                className="w-full p-3 outline-none text-slate-800 font-medium placeholder:text-slate-400 bg-transparent text-sm"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-10">
          {filteredCatalog.map((group, idx) => (
            <section key={idx} className="relative">
              <div className="sticky top-[64px] z-20 flex items-center gap-3 py-3 mb-6 bg-[#f8fafc]/90 backdrop-blur-sm border-b border-slate-200">
                <div className={`p-1.5 rounded-lg bg-white shadow-sm border border-slate-100 ${group.color}`}>
                  <group.icon size={18} strokeWidth={2.5} />
                </div>
                <h2 className={`text-sm font-bold uppercase tracking-widest ${group.color}`}>
                  {group.group}
                </h2>
                <div className="h-px flex-grow bg-slate-200 ml-2"></div>
              </div>

              <div className="grid gap-3">
                {group.items.map((item, iIdx) => (
                  <Link 
                    key={iIdx} 
                    href={item.href}
                    className="group bg-white rounded-xl p-4 border border-slate-200 hover:border-emerald-500 hover:shadow-md hover:shadow-emerald-500/5 transition-all duration-300 flex items-start gap-4"
                  >
                    <div className="mt-1 bg-slate-50 p-1.5 rounded-lg text-slate-300 group-hover:text-emerald-500 group-hover:bg-emerald-50 transition-all">
                      <ExternalLink size={14} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-[11px] md:text-xs text-slate-500 leading-relaxed font-medium">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>

      <footer className="relative z-10 border-t border-slate-200 py-12 bg-white/50">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">&copy; 2026 LayananDokumen.com • Dokumen Aman & Instan</p>
        </div>
      </footer>
    </div>
  );
}