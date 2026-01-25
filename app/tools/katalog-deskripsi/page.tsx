'use client';

import { 
  ArrowLeft, Search, ExternalLink, Store, Users, Gavel, 
  Landmark, Truck, GraduationCap, Stethoscope, PartyPopper, 
  Calculator, X, FileText
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

// --- KOMPONEN PENJARA IKLAN (SAFE MODE + RESPONSIVE WRAPPER) ---
// Fitur: Mencegah layout pecah di HP jika iklan terlalu lebar
const AdCage = ({ adKey, w, h }: { adKey: string, w: number, h: number }) => {
  const content = `
    <html>
      <body style='margin:0;display:flex;justify-content:center;align-items:center;background:transparent;'>
        <script type='text/javascript'>
          atOptions = {
            'key': '${adKey}',
            'format': 'iframe',
            'height': ${h},
            'width': ${w},
            'params': {}
          };
        </script>
        <script type='text/javascript' src='https://www.highperformanceformat.com/${adKey}/invoke.js'></script>
      </body>
    </html>
  `;
  
  return (
    <div className="flex justify-center w-full my-8 overflow-x-auto bg-slate-50/50 border border-dashed border-slate-200 rounded-xl py-4 no-print scrollbar-hide">
      <div style={{ width: w, height: h, flexShrink: 0 }}>
        <iframe
            srcDoc={content}
            width={w}
            height={h}
            frameBorder="0"
            scrolling="no"
            title="Sponsor"
            style={{ pointerEvents: 'auto' }} 
        />
      </div>
    </div>
  );
};

export default function KatalogLengkapPage() {
  const [search, setSearch] = useState('');

  // --- DATABASE ALAT ---
  const FULL_CATALOG = [
    {
      group: "Keuangan & Bisnis",
      icon: Store, color: "text-emerald-700", bg: "bg-emerald-50",
      items: [
        { name: "Invoice Profesional", desc: "Buat tagihan resmi dengan rincian barang & jasa.", href: "/tools/finance?mode=invoice" },
        { name: "Kuitansi Pembayaran", desc: "Bukti penerimaan uang dengan fitur terbilang otomatis.", href: "/tools/finance?mode=kuitansi" },
        { name: "Nota Penjualan", desc: "Nota kontan ringkas untuk toko retail/warung.", href: "/tools/finance?mode=nota" },
        { name: "Laporan Kas Kecil", desc: "Catat pemasukan & pengeluaran (Petty Cash).", href: "/tools/kas" },
        { name: "Faktur Pajak UMKM", desc: "Invoice dengan perhitungan PPN & PPh otomatis.", href: "/tools/faktur-pajak" },
        { name: "Perjanjian Joint Venture", desc: "Kontrak kerjasama bagi hasil / modal usaha.", href: "/tools/joint-venture" },
        { name: "Perjanjian Franchise", desc: "Kontrak waralaba / kemitraan bisnis.", href: "/tools/franchise" },
      ]
    },
    {
      group: "Legalitas & Aset",
      icon: Gavel, color: "text-indigo-700", bg: "bg-indigo-50",
      items: [
        { name: "Jual Beli Tanah", desc: "Surat perjanjian jual beli tanah/lahan (Legal/Compact).", href: "/tools/jual-beli-tanah" },
        { name: "Jual Beli Kendaraan", desc: "Bukti transaksi sah motor atau mobil.", href: "/tools/jual-beli-kendaraan" },
        { name: "Perjanjian Hutang", desc: "Surat pernyataan hutang piutang dengan pasal sanksi.", href: "/tools/hutang" },
        { name: "Gadai Aset", desc: "Perjanjian gadai barang sebagai jaminan pinjaman.", href: "/tools/gadai" },
        { name: "Surat Kuasa", desc: "Limpahkan wewenang ke orang lain secara resmi.", href: "/tools/surat-kuasa" },
        { name: "Surat Hibah", desc: "Pernyataan pemberian aset/tanah tanpa transaksi.", href: "/tools/hibah" },
        { name: "Ahli Waris", desc: "Keterangan silsilah keluarga untuk urusan bank/tanah.", href: "/tools/ahli-waris" },
      ]
    },
    {
      group: "Perizinan & Lingkungan",
      icon: Landmark, color: "text-orange-700", bg: "bg-orange-50",
      items: [
        { name: "Izin Keramaian", desc: "Surat izin ke Polisi atau Warga untuk hajatan.", href: "/tools/izin-keramaian" },
        { name: "Izin Renovasi", desc: "Permohonan izin bangun/renovasi ke RT/RW/Tetangga.", href: "/tools/izin-renovasi" },
        { name: "Keterangan Domisili", desc: "Surat pengantar RT/RW atau Kelurahan.", href: "/tools/domisili" },
        { name: "IMB Sederhana", desc: "Draft permohonan Izin Mendirikan Bangunan.", href: "/tools/imb" },
        { name: "Kehilangan Barang", desc: "Berita acara / pernyataan hilang untuk logistik.", href: "/tools/hilang-kirim" },
      ]
    },
    {
      group: "Pribadi & Keluarga",
      icon: Users, color: "text-rose-700", bg: "bg-rose-50",
      items: [
        { name: "Izin Pasangan", desc: "Surat persetujuan suami/istri untuk kerja/kredit.", href: "/tools/izin-pasangan" },
        { name: "Izin Sekolah", desc: "Surat sakit atau izin acara keluarga untuk siswa.", href: "/tools/izin-sekolah" },
        { name: "Keterangan Belum Menikah", desc: "Pernyataan status lajang untuk KUA/Lamaran.", href: "/tools/belum-menikah" },
        { name: "Surat Kematian", desc: "Laporan meninggal dunia untuk administrasi.", href: "/tools/kematian" },
      ]
    },
    {
      group: "Logistik & Gudang",
      icon: Truck, color: "text-slate-700", bg: "bg-slate-100",
      items: [
        { name: "Surat Jalan", desc: "Dokumen pengantar barang dalam perjalanan.", href: "/tools/izin-barang?mode=surat-jalan" },
        { name: "Gate Pass (Izin Barang)", desc: "Izin keluar/masuk barang dari area perusahaan.", href: "/tools/izin-barang" },
        { name: "Berita Acara (BAST)", desc: "Bukti serah terima pekerjaan atau barang.", href: "/tools/bast" },
        { name: "Label Pengiriman", desc: "Cetak label alamat paket siap tempel.", href: "/tools/label-pengiriman" },
      ]
    },
    {
      group: "Lainnya",
      icon: FileText, color: "text-blue-700", bg: "bg-blue-50",
      items: [
        { name: "Surat Jaminan Garansi", desc: "Sertifikat garansi produk atau jasa purnajual.", href: "/tools/garansi" },
        { name: "Donor Darah/Organ", desc: "Pernyataan persetujuan tindakan medis/donor.", href: "/tools/donor" },
        { name: "Donasi & Sponsorship", desc: "Proposal permohonan dana kegiatan.", href: "/tools/donasi" },
      ]
    }
  ];

  // Logic Search
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

      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-emerald-600 transition-colors">
            <ArrowLeft size={16} strokeWidth={2.5} /> Kembali ke Beranda
          </Link>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 hidden sm:inline">Database v2.1</span>
            <span className="text-[9px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200">PRO</span>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-16">
        
        {/* HERO SECTION */}
        <div className="mb-12 space-y-6">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-[10px] font-bold text-emerald-700 tracking-wide uppercase">Katalog Lengkap</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">
              Semua Alat Bantu <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Administrasi Anda.</span>
            </h1>
            <p className="text-slate-500 text-sm md:text-base max-w-xl">
               Temukan 50+ template surat otomatis. Mulai dari invoice bisnis, perjanjian legal, hingga surat izin sekolah. Gratis & instan.
            </p>
          </div>
          
          {/* SEARCH BAR */}
          <div className="max-w-md relative group mx-auto md:mx-0">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-200"></div>
            <div className="relative bg-white rounded-xl shadow-sm flex items-center p-1 border border-slate-200 focus-within:border-emerald-500 transition-colors">
              <Search className="text-slate-400 ml-3 shrink-0" size={20} />
              <input 
                type="text" 
                placeholder="Cari surat (misal: jual beli, invoice)..." 
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

        {/* CATALOG GRID */}
        <div className="space-y-12">
          {filteredCatalog.length === 0 ? (
             <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-slate-300">
                <p className="text-slate-400 font-bold">Tidak ada alat yang ditemukan untuk "{search}".</p>
                <button onClick={() => setSearch('')} className="mt-2 text-emerald-600 text-sm font-bold hover:underline">Reset Pencarian</button>
             </div>
          ) : (
             filteredCatalog.map((group, idx) => (
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

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                    {group.items.map((item, iIdx) => (
                      <Link 
                        key={iIdx} 
                        href={item.href}
                        className="group bg-white rounded-xl p-4 border border-slate-200 hover:border-emerald-500 hover:shadow-md hover:shadow-emerald-500/5 transition-all duration-300 flex items-start gap-4 h-full relative overflow-hidden"
                      >
                        <div className="mt-1 bg-slate-50 p-1.5 rounded-lg text-slate-300 group-hover:text-emerald-500 group-hover:bg-emerald-50 transition-all shrink-0">
                          <ExternalLink size={14} />
                        </div>
                        <div className="space-y-1 relative z-10">
                          <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-[11px] text-slate-500 leading-relaxed font-medium line-clamp-2 group-hover:text-slate-600">
                            {item.desc}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* IKLAN SISIPAN SETIAP SELESAI SATU KATEGORI */}
                  <div className="mt-8">
                     <AdCage adKey="8fd377728513d5d23b9caf7a2bba1a73" w={728} h={90} />
                  </div>
                </section>
             ))
          )}
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
