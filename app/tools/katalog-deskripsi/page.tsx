'use client';

import { 
  ArrowLeft, Search, ExternalLink, Store, Users, Gavel, 
  Landmark, Truck, GraduationCap, Stethoscope, PartyPopper, 
  Calculator, X
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// --- KOMPONEN PENJARA IKLAN (SAFE MODE + RESPONSIVE WRAPPER) ---
const AdCage = ({ adKey, w, h }: { adKey: string, w: number, h: number }) => {
  const content = `<html><body style='margin:0;display:flex;justify-content:center;align-items:center;background:transparent;'><script type='text/javascript'>atOptions={'key':'${adKey}','format':'iframe','height':${h},'width':${w},'params':{}};</script><script type='text/javascript' src='https://www.highperformanceformat.com/${adKey}/invoke.js'></script></body></html>`;
  
  return (
    // REVISI: Tambahkan overflow-x-auto agar iklan besar tidak merusak layout HP
    <div className="flex justify-center w-full my-6 overflow-x-auto bg-slate-50/50 border border-dashed border-slate-200 rounded-xl py-4 no-print scrollbar-hide">
      <div style={{ width: w, height: h, flexShrink: 0 }}>
        <iframe
            srcDoc={content}
            width={w}
            height={h}
            frameBorder="0"
            scrolling="no"
            title="Sponsor"
            style={{ pointerEvents: 'auto' }} // Pastikan bisa diklik
        />
      </div>
    </div>
  );
};

export default function KatalogLengkapPage() {
  const [search, setSearch] = useState('');

  const FULL_CATALOG = [
    {
      group: "Bisnis & UMKM",
      icon: Store, color: "text-emerald-700", bg: "bg-emerald-50",
      items: [
        { name: "Invoice Profesional", desc: "Tagihan resmi dengan rincian transaksi barang/jasa.", href: "/tools/finance?mode=invoice" },
        { name: "Kwitansi Pembayaran", desc: "Bukti sah penerimaan uang tunai dengan tanda tangan.", href: "/tools/finance?mode=kwitansi" },
        { name: "Nota Penjualan", desc: "Catatan transaksi retail harian ringkas.", href: "/tools/finance?mode=nota" },
        { name: "Purchase Order (PO)", desc: "Pesanan resmi untuk mengunci stok & harga.", href: "/tools/po" },
        { name: "Surat Penawaran Harga", desc: "Proposal rincian biaya produk/jasa untuk klien.", href: "/tools/penawaran" },
        { name: "Keterangan Penghasilan", desc: "Pernyataan gaji untuk syarat kredit/administrasi.", href: "/tools/keterangan-penghasilan" },
        { name: "Surat Penagihan (Debt)", desc: "Teguran formal pelanggan lewat jatuh tempo.", href: "/tools/penagihan" },
        { name: "Perintah Kerja (SPK)", desc: "Instruksi formal pengerjaan proyek.", href: "/tools/spk" },
        { name: "Laporan Kas Harian", desc: "Catatan arus uang masuk/keluar harian.", href: "/tools/kas" },
        { name: "Faktur Pajak UMKM", desc: "Bukti pungutan PPN oleh PKP.", href: "/tools/faktur-pajak" },
        { name: "Jaminan (Garansi)", desc: "Pernyataan tanggung jawab kualitas produk.", href: "/tools/garansi" },
        { name: "Komplain Konsumen", desc: "Formulir resmi keluhan ketidakpuasan layanan.", href: "/tools/pengaduan" },
        { name: "Perjanjian Distributor", desc: "Kontrak eksklusif produsen & penyalur.", href: "/tools/distributor" },
        { name: "Surat Perintah Bayar", desc: "Instruksi internal pencairan dana operasional.", href: "/tools/spb" },
        { name: "Konfirmasi Pesanan", desc: "Pernyataan penjual bahwa order diproses.", href: "/tools/konfirmasi-order" },
        { name: "Laporan Laba Rugi", desc: "Ringkasan performa finansial usaha.", href: "/tools/laba-rugi" }
      ]
    },
    {
      group: "HRD & Personalia",
      icon: Users, color: "text-blue-700", bg: "bg-blue-50",
      items: [
        { name: "Surat Lamaran Kerja", desc: "Pengantar profesional memperkenalkan kualifikasi.", href: "/tools/lamaran" },
        { name: "CV Maker (ATS)", desc: "Resume standar sistem sortir otomatis HRD.", href: "/tools/cv" },
        { name: "Kontrak Kerja (PKWT)", desc: "Perjanjian legal upah, tugas, & masa kerja.", href: "/tools/kontrak-kerja" },
        { name: "Surat Tugas Dinas", desc: "Perintah resmi perjalanan/tugas luar kantor.", href: "/tools/surat-tugas" },
        { name: "Surat Peringatan (SP)", desc: "Teguran formal pelanggaran disiplin.", href: "/tools/sp-karyawan" },
        { name: "Paklaring Kerja", desc: "Keterangan pengalaman kerja karyawan resign.", href: "/tools/paklaring" },
        { name: "Surat Resign", desc: "Pernyataan mundur diri resmi.", href: "/tools/resign" },
        { name: "NDA (Kerahasiaan)", desc: "Kontrak menjaga data sensitif bisnis.", href: "/tools/nda" },
        { name: "Rekomendasi Kerja", desc: "Dukungan atasan lama mengenai keahlian.", href: "/tools/rekomendasi" },
        { name: "Ket. Bebas Narkoba", desc: "Pernyataan pribadi bersih dari zat adiktif.", href: "/tools/bebas-narkoba" },
        { name: "Pernyataan Tidak Terikat", desc: "Syarat melamar tidak ada kontrak lain.", href: "/tools/pernyataan-kerja" },
        { name: "Izin Cuti/Sakit", desc: "Formulir istirahat resmi karyawan.", href: "/tools/cuti-karyawan" },
        { name: "Pernyataan Single", desc: "Syarat administrasi jabatan belum berkeluarga.", href: "/tools/belum-nikah-hrd" },
        { name: "Pemberitahuan PHK", desc: "Dokumen resmi pemutusan hubungan kerja.", href: "/tools/phk" },
        { name: "Rekomendasi Promosi", desc: "Usulan kenaikan jabatan karyawan.", href: "/tools/promosi" }
      ]
    },
    {
      group: "Legal & Aset",
      icon: Gavel, color: "text-indigo-700", bg: "bg-indigo-50",
      items: [
        { name: "Jual Beli Tanah", desc: "Kontrak pemindahan hak milik lahan.", href: "/tools/jual-beli-tanah" },
        { name: "Jual Beli Kendaraan", desc: "Bukti transaksi motor/mobil untuk BPKB.", href: "/tools/jual-beli-kendaraan" },
        { name: "Sewa Rumah / Ruko", desc: "Kontrak penggunaan bangunan & biaya sewa.", href: "/tools/sewa-rumah" },
        { name: "Perjanjian Hutang", desc: "Surat pengakuan hutang & rincian tenor.", href: "/tools/hutang" },
        { name: "Surat Kuasa", desc: "Pemberian wewenang sah urus administrasi.", href: "/tools/surat-kuasa" },
        { name: "MoU Kerjasama", desc: "Nota kesepahaman awal kolaborasi.", href: "/tools/mou" },
        { name: "Kesepakatan Waris", desc: "Mufakat pembagian harta keluarga.", href: "/tools/ahli-waris" },
        { name: "Perjanjian Damai", desc: "Penyelesaian sengketa luar jalur hukum.", href: "/tools/perjanjian-damai" },
        { name: "Gadai Aset", desc: "Kontrak pinjaman dengan jaminan barang.", href: "/tools/gadai" },
        { name: "Pernyataan Waris", desc: "Legalitas kedudukan penerima warisan.", href: "/tools/pernyataan-waris" },
        { name: "Surat Hibah", desc: "Pemberian aset sukarela tanpa transaksi.", href: "/tools/hibah" },
        { name: "Sewa Kendaraan", desc: "Kontrak rental mobil/motor & denda.", href: "/tools/sewa-kendaraan" },
        { name: "Surat Wasiat", desc: "Pesan pembagian aset setelah wafat.", href: "/tools/wasiat" },
        { name: "Joint Venture", desc: "Kerjasama membentuk entitas bisnis baru.", href: "/tools/joint-venture" },
        { name: "Kuasa Urus Pajak", desc: "Wewenang pihak ketiga kelola pajak.", href: "/tools/kuasa-pajak" },
        { name: "Perjanjian Franchise", desc: "Kontrak hak merek & sistem bisnis.", href: "/tools/franchise" }
      ]
    },
    {
      group: "Administrasi Desa",
      icon: Landmark, color: "text-orange-700", bg: "bg-orange-50",
      items: [
        { name: "Pengantar RT/RW", desc: "Rujukan awal administrasi kelurahan.", href: "/tools/pengantar-rt" },
        { name: "Ket. Usaha (SKU)", desc: "Legalitas usaha mikro syarat bank.", href: "/tools/sku" },
        { name: "Ket. Domisili", desc: "Bukti tinggal sementara.", href: "/tools/domisili" },
        { name: "Ket. Tidak Mampu", desc: "Syarat bansos atau keringanan biaya.", href: "/tools/sktm" },
        { name: "Ket. Belum Menikah", desc: "Keterangan lajang syarat nikah.", href: "/tools/belum-menikah" },
        { name: "Izin Keramaian", desc: "Permohonan acara di lingkungan warga.", href: "/tools/izin-keramaian" },
        { name: "Surat Kehilangan", desc: "Dasar laporan polisi barang hilang.", href: "/tools/pernyataan-kehilangan" },
        { name: "Pernyataan Beda Nama", desc: "Klarifikasi beda nama di dokumen.", href: "/tools/beda-nama" },
        { name: "Belum Punya Rumah", desc: "Syarat subsidi KPR.", href: "/tools/belum-punya-rumah" },
        { name: "Keterangan Kematian", desc: "Laporan wafat untuk administrasi.", href: "/tools/kematian" },
        { name: "Penghasilan Ortu", desc: "Syarat daftar sekolah jalur afirmasi.", href: "/tools/penghasilan-ortu" },
        { name: "Ahli Waris Desa", desc: "Keterangan keluarga tingkat desa.", href: "/tools/ahli-waris-desa" },
        { name: "Pengantar Nikah", desc: "Syarat pendaftaran KUA/Sipil.", href: "/tools/nikah" },
        { name: "Ket. Non-Bantuan", desc: "Pernyataan tidak terima bansos ganda.", href: "/tools/sk-non-bantuan" },
        { name: "IMB Sederhana", desc: "Izin bangun rumah tinggal.", href: "/tools/imb" },
        { name: "Pernyataan Tanah", desc: "Jaminan tanah tidak sengketa.", href: "/tools/tanah-aman" }
      ]
    },
    {
      group: "Logistik & Transport",
      icon: Truck, color: "text-slate-700", bg: "bg-slate-100",
      items: [
        { name: "Surat Jalan", desc: "Bukti izin angkut muatan sopir.", href: "/tools/surat-jalan" },
        { name: "Berita Acara (BAST)", desc: "Bukti formal serah terima barang.", href: "/tools/bast" },
        { name: "Surat Dinas Resmi", desc: "Komunikasi formal antar instansi.", href: "/tools/surat-dinas" },
        { name: "Label Pengiriman", desc: "Identitas paket data pengirim.", href: "/tools/label-pengiriman" },
        { name: "Izin Renovasi", desc: "Permohonan perbaikan bangunan.", href: "/tools/izin-renovasi" },
        { name: "Keluar Masuk Barang", desc: "Kontrol inventaris gudang/kantor.", href: "/tools/izin-barang" },
        { name: "Tanda Terima", desc: "Bukti paket sampai jumlah pas.", href: "/tools/tanda-terima" },
        { name: "Klaim Asuransi", desc: "Ganti rugi kerusakan kiriman.", href: "/tools/klaim-asuransi" },
        { name: "Redelivery", desc: "Permohonan kirim ulang paket.", href: "/tools/redelivery" },
        { name: "Hilang Kirim", desc: "Pernyataan barang hilang di kurir.", href: "/tools/hilang-kirim" }
      ]
    },
    {
      group: "Akademik & Izin",
      icon: GraduationCap, color: "text-rose-700", bg: "bg-rose-50",
      items: [
        { name: "Izin Sakit Sekolah", desc: "Surat wali murid untuk absen.", href: "/tools/izin-sekolah" },
        { name: "Permohonan Beasiswa", desc: "Surat motivasi bantuan biaya studi.", href: "/tools/beasiswa" },
        { name: "Permohonan Magang", desc: "Lamaran PKL mahasiswa.", href: "/tools/magang" },
        { name: "Pernyataan Ortu", desc: "Persetujuan kegiatan sekolah.", href: "/tools/pernyataan-ortu" },
        { name: "Izin Pasangan", desc: "Persetujuan suami/istri dinas luar.", href: "/tools/izin-pasangan" },
        { name: "Sponsor Visa", desc: "Jaminan kunjungan luar negeri.", href: "/tools/sponsor-visa" },
        { name: "Ijazah Sementara", desc: "SKL sebelum ijazah asli terbit.", href: "/tools/skl" },
        { name: "Undur Diri Kuliah", desc: "Berhenti status mahasiswa.", href: "/tools/resign-akademik" },
        { name: "Cuti Kuliah", desc: "Izin berhenti studi sementara.", href: "/tools/cuti-kuliah" },
        { name: "Rekomendasi Dosen", desc: "Testimoni akademik lanjut studi.", href: "/tools/rekomendasi-akademik" },
        { name: "Stop Studi", desc: "Pernyataan tidak aktif pendidikan.", href: "/tools/stop-studi" },
        { name: "Penelitian", desc: "Izin ambil data skripsi.", href: "/tools/penelitian" }
      ]
    },
    {
      group: "Kesehatan & Event",
      icon: Stethoscope, color: "text-cyan-700", bg: "bg-cyan-50",
      items: [
        { name: "Rujukan Medis", desc: "Pengantar faskes spesialis.", href: "/tools/rujukan" },
        { name: "Rawat Inap", desc: "Bukti opname untuk izin/klaim.", href: "/tools/rawat-inap" },
        { name: "Ket. Dokter", desc: "Izin istirahat sakit ringan.", href: "/tools/ket-dokter" },
        { name: "Donor Darah/Organ", desc: "Pernyataan medis sukarela.", href: "/tools/donor" },
        { name: "Sponsorship", desc: "Proposal kerjasama dana event.", href: "/tools/sponsorship" },
        { name: "Donasi", desc: "Permohonan dana sosial.", href: "/tools/donasi" },
        { name: "Pernyataan Panitia", desc: "Jaminan keamanan acara.", href: "/tools/panitia" },
        { name: "Business Plan", desc: "Rencana strategis bisnis baru.", href: "/tools/business-plan" }
      ]
    },
    {
      group: "Kalkulator Finansial",
      icon: Calculator, color: "text-violet-700", bg: "bg-violet-50",
      items: [
        { name: "Terbilang Rupiah", desc: "Angka ke kalimat kwitansi.", href: "/tools/terbilang" },
        { name: "Kalkulator KPR", desc: "Simulasi cicilan & bunga rumah.", href: "/tools/kpr" },
        { name: "Hitung Diskon", desc: "Harga akhir setelah potongan.", href: "/tools/diskon" },
        { name: "Hitung Usia", desc: "Detail umur tahun/bulan/hari.", href: "/tools/usia" },
        { name: "Pajak PPh 21", desc: "Estimasi pajak gaji karyawan.", href: "/tools/pph" },
        { name: "Pajak Tanah", desc: "Simulasi BPHTB jual beli.", href: "/tools/pajak-tanah" },
        { name: "Pesangon", desc: "Estimasi dana pensiun/PHK.", href: "/tools/pesangon" }
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
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 hidden sm:inline">Database v2.1</span>
            <span className="text-[9px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200">BETA</span>
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-16">
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
              {search && (
                <button onClick={() => setSearch('')} className="p-2 mr-1 hover:bg-slate-100 rounded-full text-slate-400 transition-colors">
                    <X size={16} />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-12">
          {filteredCatalog.map((group, idx) => (
            <section key={idx} className="relative">
              <div className="sticky top-[64px] z-20 flex items-center gap-3 py-3 mb-6 bg-[#f8fafc]/95 backdrop-blur-sm border-b border-slate-200">
                <div className={`p-1.5 rounded-lg bg-white shadow-sm border border-slate-100 ${group.color}`}>
                  <group.icon size={18} strokeWidth={2.5} />
                </div>
                <h2 className={`text-sm font-bold uppercase tracking-widest ${group.color}`}>
                  {group.group}
                </h2>
                <div className="h-px flex-grow bg-slate-200 ml-2"></div>
              </div>

              {/* REVISI: MENGGUNAKAN GRID 2 KOLOM DI LAYAR MEDIUM KE ATAS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {group.items.map((item, iIdx) => (
                  <Link 
                    key={iIdx} 
                    href={item.href}
                    className="group bg-white rounded-xl p-4 border border-slate-200 hover:border-emerald-500 hover:shadow-md hover:shadow-emerald-500/5 transition-all duration-300 flex items-start gap-4 h-full"
                  >
                    <div className="mt-1 bg-slate-50 p-1.5 rounded-lg text-slate-300 group-hover:text-emerald-500 group-hover:bg-emerald-50 transition-all shrink-0">
                      <ExternalLink size={14} />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-[11px] text-slate-500 leading-relaxed font-medium line-clamp-2">
                        {item.desc}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>

              {/* IKLAN SISIPAN - DENGAN SCROLLBAR PENGAMAN */}
              <div className="mt-6">
                 <AdCage adKey="8fd377728513d5d23b9caf7a2bba1a73" w={728} h={90} />
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