'use client';

import { 
  Search, ChevronRight, Store, ShieldCheck,
  FileText, Landmark, Gavel, Truck, GraduationCap, Calculator,
  ArrowUpRight, Users, X, Menu, AlertCircle, LayoutGrid, HelpCircle,
  Stethoscope, PartyPopper, BookOpen, ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import Script from 'next/script';
import { useState, useMemo, Fragment } from 'react';

export default function HomePage() {
  const [search, setSearch] = useState('');
  
  const DIRECTORY = [
    {
      group: "Bisnis & UMKM",
      desc: "Transaksi & keuangan usaha.",
      icon: Store, color: "text-emerald-700", bgHeader: "bg-emerald-50", border: "border-emerald-100",
      items: [
        { name: "Invoice Profesional", href: "/tools/finance?mode=invoice" },
        { name: "Kwitansi Pembayaran", href: "/tools/finance?mode=kwitansi" },
        { name: "Nota Penjualan", href: "/tools/finance?mode=nota" },
        { name: "Purchase Order (PO)", href: "/tools/po" },
        { name: "Surat Penawaran Harga", href: "/tools/penawaran" },
        { name: "Keterangan Penghasilan", href: "/tools/keterangan-penghasilan" },
        { name: "Surat Penagihan (Debt)", href: "/tools/penagihan" },
        { name: "Perintah Kerja (SPK)", href: "/tools/spk" },
        { name: "Laporan Kas Harian", href: "/tools/kas" },
        { name: "Faktur Pajak UMKM", href: "/tools/faktur-pajak" },
        { name: "Jaminan (Garansi) Barang", href: "/tools/garansi" },
        { name: "Surat Pengaduan Konsumen", href: "/tools/pengaduan" },
        { name: "Perjanjian Distributor/Reseller", href: "/tools/distributor" },
        { name: "Surat Perintah Bayar", href: "/tools/spb" },
        { name: "Surat Konfirmasi Pesanan", href: "/tools/konfirmasi-order" },
        { name: "Laporan Laba Rugi Sederhana", href: "/tools/laba-rugi" },
      ]
    },
    {
      group: "HRD & Personalia",
      desc: "Karyawan & rekrutmen.",
      icon: Users, color: "text-blue-700", bgHeader: "bg-blue-50", border: "border-blue-100",
      items: [
        { name: "Surat Lamaran Kerja", href: "/tools/lamaran" },
        { name: "CV Maker (ATS)", href: "/tools/cv" },
        { name: "Kontrak Kerja (PKWT)", href: "/tools/kontrak-kerja" },
        { name: "Surat Tugas Dinas", href: "/tools/surat-tugas" },
        { name: "Surat Peringatan (SP)", href: "/tools/sp-karyawan" },
        { name: "Paklaring Kerja", href: "/tools/paklaring" },
        { name: "Surat Resign", href: "/tools/resign" },
        { name: "Pakta Integritas / NDA", href: "/tools/nda" },
        { name: "Rekomendasi Kerja", href: "/tools/rekomendasi" },
        { name: "Ket. Bebas Narkoba", href: "/tools/bebas-narkoba" },
        { name: "Pernyataan Tidak Terikat Kerja", href: "/tools/pernyataan-kerja" },
        { name: "Izin Cuti/Hamil/Sakit", href: "/tools/cuti-karyawan" },
        { name: "Pernyataan Tidak Menikah", href: "/tools/belum-nikah-hrd" },
        { name: "Surat Pemberitahuan PHK", href: "/tools/phk" },
        { name: "Rekomendasi Promosi Jabatan", href: "/tools/promosi" },
      ]
    },
    {
      group: "Legal & Aset",
      desc: "Jual beli & perjanjian.",
      icon: Gavel, color: "text-indigo-700", bgHeader: "bg-indigo-50", border: "border-indigo-100",
      items: [
        { name: "Jual Beli Tanah", href: "/tools/jual-beli-tanah" },
        { name: "Jual Beli Kendaraan", href: "/tools/jual-beli-kendaraan" },
        { name: "Sewa Rumah / Ruko", href: "/tools/sewa-rumah" },
        { name: "Perjanjian Hutang", href: "/tools/hutang" },
        { name: "Surat Kuasa", href: "/tools/surat-kuasa" },
        { name: "MoU Kerjasama", href: "/tools/mou" },
        { name: "Kesepakatan Ahli Waris", href: "/tools/ahli-waris" },
        { name: "Perjanjian Damai", href: "/tools/perjanjian-damai" },
        { name: "Gadai Aset", href: "/tools/gadai" },
        { name: "Surat Pernyataan Waris", href: "/tools/pernyataan-waris" },
        { name: "Surat Hibah", href: "/tools/hibah" },
        { name: "Perjanjian Sewa Kendaraan", href: "/tools/sewa-kendaraan" },
        { name: "Surat Wasiat Sederhana", href: "/tools/wasiat" },
        { name: "Perjanjian Joint Venture", href: "/tools/joint-venture" },
        { name: "Surat Kuasa Urus Pajak", href: "/tools/kuasa-pajak" },
        { name: "Perjanjian Franchise", href: "/tools/franchise" },
      ]
    },
    {
      group: "Administrasi Desa",
      desc: "Surat keterangan warga.",
      icon: Landmark, color: "text-orange-700", bgHeader: "bg-orange-50", border: "border-orange-100",
      items: [
        { name: "Pengantar RT/RW", href: "/tools/pengantar-rt" },
        { name: "Ket. Usaha (SKU)", href: "/tools/sku" },
        { name: "Ket. Domisili", href: "/tools/domisili" },
        { name: "Ket. Tidak Mampu", href: "/tools/sktm" },
        { name: "Ket. Belum Menikah", href: "/tools/belum-menikah" },
        { name: "Izin Keramaian", href: "/tools/izin-keramaian" },
        { name: "Surat Kehilangan", href: "/tools/pernyataan-kehilangan" },
        { name: "Pernyataan Beda Nama", href: "/tools/beda-nama" },
        { name: "Belum Punya Rumah", href: "/tools/belum-punya-rumah" },
        { name: "Surat Keterangan Kematian", href: "/tools/kematian" },
        { name: "Ket. Penghasilan Orang Tua", href: "/tools/penghasilan-ortu" },
        { name: "Surat Pernyataan Ahli Waris", href: "/tools/ahli-waris-desa" },
        { name: "Surat Pengantar Nikah", href: "/tools/nikah" },
        { name: "Ket. Tidak Terima Bantuan", href: "/tools/sk-non-bantuan" },
        { name: "IMB Sederhana", href: "/tools/imb" },
        { name: "Pernyataan Tanah Aman", href: "/tools/tanah-aman" },
      ]
    },
    {
      group: "Logistik & Transport",
      desc: "Jalan & pengiriman.",
      icon: Truck, color: "text-slate-700", bgHeader: "bg-slate-100", border: "border-slate-200",
      items: [
        { name: "Surat Jalan", href: "/tools/surat-jalan" },
        { name: "Berita Acara (BAST)", href: "/tools/bast" },
        { name: "Surat Dinas Resmi", href: "/tools/surat-dinas" },
        { name: "Label Pengiriman", href: "/tools/label-pengiriman" },
        { name: "Izin Renovasi", href: "/tools/izin-renovasi" },
        { name: "Keluar Masuk Barang", href: "/tools/izin-barang" },
        { name: "Surat Tanda Terima Barang", href: "/tools/tanda-terima" },
        { name: "Klaim Asuransi Pengiriman", href: "/tools/klaim-asuransi" },
        { name: "Permohonan Redelivery", href: "/tools/redelivery" },
        { name: "Pernyataan Hilang Kirim", href: "/tools/hilang-kirim" },
      ]
    },
    {
      group: "Akademik & Izin",
      desc: "Sekolah & kuliah.",
      icon: GraduationCap, color: "text-rose-700", bgHeader: "bg-rose-50", border: "border-rose-100",
      items: [
        { name: "Izin Sakit Sekolah", href: "/tools/izin-sekolah" },
        { name: "Permohonan Beasiswa", href: "/tools/beasiswa" },
        { name: "Permohonan Magang", href: "/tools/magang" },
        { name: "Pernyataan Ortu", href: "/tools/pernyataan-ortu" },
        { name: "Izin Pasangan", href: "/tools/izin-pasangan" },
        { name: "Sponsor Visa", href: "/tools/sponsor-visa" },
        { name: "Ijazah Sementara (SKL)", href: "/tools/skl" },
        { name: "Undur Diri Sekolah/Kuliah", href: "/tools/resign-akademik" },
        { name: "Permohonan Cuti Kuliah", href: "/tools/cuti-kuliah" },
        { name: "Rekomendasi Dosen/Kepsek", href: "/tools/rekomendasi-akademik" },
        { name: "Pernyataan Tidak Studi", href: "/tools/stop-studi" },
        { name: "Permohonan Penelitian", href: "/tools/penelitian" },
      ]
    },
    {
      group: "Kesehatan",
      desc: "Medis & rujukan.",
      icon: Stethoscope, color: "text-cyan-700", bgHeader: "bg-cyan-50", border: "border-cyan-100",
      items: [
        { name: "Surat Rujukan Medis", href: "/tools/rujukan" },
        { name: "Pernyataan Rawat Inap", href: "/tools/rawat-inap" },
        { name: "Ket. Dokter Sederhana", href: "/tools/ket-dokter" },
        { name: "Donor Darah/Organ", href: "/tools/donor" },
      ]
    },
    {
      group: "Event & Acara",
      desc: "Kegiatan & sponsor.",
      icon: PartyPopper, color: "text-amber-700", bgHeader: "bg-amber-50", border: "border-amber-100",
      items: [
        { name: "Proposal Sponsorship", href: "/tools/sponsorship" },
        { name: "Permohonan Donasi", href: "/tools/donasi" },
        { name: "Pernyataan Penyelenggara", href: "/tools/panitia" },
        { name: "Template Business Plan", href: "/tools/business-plan" },
      ]
    },
    {
      group: "Kalkulator",
      desc: "Hitungan finansial.",
      icon: Calculator, color: "text-violet-700", bgHeader: "bg-violet-50", border: "border-violet-100",
      items: [
        { name: "Terbilang Rupiah", href: "/tools/terbilang" },
        { name: "Kalkulator KPR", href: "/tools/kpr" },
        { name: "Hitung Diskon", href: "/tools/diskon" },
        { name: "Hitung Usia", href: "/tools/usia" },
        { name: "Pajak PPh 21", href: "/tools/pph" },
        { name: "Pajak Jual Beli Tanah", href: "/tools/pajak-tanah" },
        { name: "Kalkulator Pesangon", href: "/tools/pesangon" },
      ]
    }
  ];

  const allItems = useMemo(() => {
    return DIRECTORY.flatMap(cat => cat.items.map(item => ({ ...item, group: cat.group })));
  }, []);

  const searchResults = useMemo(() => {
    if (!search) return [];
    return allItems.filter(item => item.name.toLowerCase().includes(search.toLowerCase())).slice(0, 5);
  }, [search, allItems]);

  const filteredDirectory = DIRECTORY.map(group => ({
    ...group,
    items: group.items.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
  })).filter(group => group.items.length > 0);

  return (
    <main className="min-h-screen font-sans text-slate-900 bg-[#f8fafc]">
      <style jsx global>{`
        html { scroll-behavior: smooth !important; }
      `}</style>

      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
         <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-emerald-400 opacity-20 blur-[100px]"></div>
      </div>

      <header className="sticky top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="bg-emerald-600 p-1.5 rounded-lg text-white shadow-lg shadow-emerald-500/30">
              <ShieldCheck size={20} strokeWidth={2.5} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold tracking-tight text-slate-900 leading-none">LayananDokumen</h1>
                <span className="text-[9px] font-bold bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded border border-emerald-200">BETA</span>
              </div>
              <p className="text-[10px] text-slate-500 font-medium leading-none mt-0.5">Pusat Administrasi Instan</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
             <a href="#directory" className="text-xs font-semibold text-slate-600 hover:text-emerald-600 flex items-center gap-1.5 transition-colors cursor-pointer">
                <LayoutGrid size={14}/> Kategori
             </a>
             <Link href="/legalitas?tab=disclaimer" className="text-xs font-semibold text-slate-600 hover:text-emerald-600 flex items-center gap-1.5 transition-colors">
                <AlertCircle size={14}/> Disclaimer
             </Link>
             <Link href="/legalitas?tab=panduan" className="text-xs font-semibold text-slate-600 hover:text-emerald-600 flex items-center gap-1.5 transition-colors">
                <HelpCircle size={14}/> Cara Pakai
             </Link>
          </nav>

          <div className="flex items-center">
             <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{DIRECTORY.reduce((a,c)=>a+c.items.length,0)} Alat Ready</span>
             </div>
             <button className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                <Menu size={20} />
             </button>
          </div>
        </div>
      </header>

      <section className="relative z-10 pt-10 pb-6 md:pt-16 md:pb-10 px-6">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
             <div className="space-y-3">
                <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 rounded-full px-3 py-1">
                   <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                   </span>
                   <span className="text-[10px] font-bold text-emerald-700 tracking-wide uppercase">Gratis Seumur Hidup</span>
                </div>
                <h2 className="text-3xl lg:text-5xl font-black tracking-tight text-slate-900 leading-[1.15]">Buat Dokumen Resmi <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">Lengkap & Instan.</span></h2>
                <div className="text-sm md:text-base text-slate-600 max-w-xl leading-relaxed space-y-3">
                   <p>Generator otomatis untuk surat menyurat, kontrak bisnis, legalitas aset, hingga administrasi desa. Tinggal isi formulir, jadi PDF siap cetak.</p>
                   <p className="hidden md:block text-slate-500 text-sm">Didesain khusus untuk UMKM, karyawan, dan mahasiswa Indonesia. Data Anda aman dan diproses lokal di browser.</p>
                </div>
             </div>
             <div className="max-w-lg relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
                <div className="relative bg-white rounded-lg shadow-lg flex items-center p-1.5 border border-slate-100">
                   <Search className="text-slate-400 ml-3 shrink-0" size={20} />
                   <input 
                     type="text" 
                     placeholder="Cari alat (misal: Invoice, KPR)..." 
                     className="w-full p-3 outline-none text-slate-800 font-medium placeholder:text-slate-400 bg-transparent text-sm"
                     value={search}
                     onChange={(e) => setSearch(e.target.value)}
                   />
                   {search && (
                     <button onClick={() => setSearch('')} className="p-2 text-slate-400 hover:text-red-500"><X size={16}/></button>
                   )}
                </div>
             </div>
          </div>
          <div className="lg:col-span-5">
             <div className="bg-white/80 backdrop-blur-sm border border-slate-200 rounded-2xl p-5 shadow-xl shadow-slate-200/50 min-h-[300px]">
                <div className="flex items-center gap-3 mb-4 border-b border-slate-100 pb-3">
                   <div className={`p-2 rounded-lg ${search ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {search ? <Search size={20}/> : <FileText size={20}/>}
                   </div>
                   <div>
                     <h3 className="font-bold text-slate-900 text-sm">{search ? `Hasil Pencarian "${search}"` : "Paling Sering Dicari"}</h3>
                     <p className="text-[10px] text-slate-500">{search ? "Klik untuk menggunakan alat" : "Akses cepat ke alat populer"}</p>
                   </div>
                </div>
                <ul className="space-y-2">
                   {search ? (
                      searchResults.length > 0 ? (
                        searchResults.map((item, idx) => (
                          <li key={idx}>
                             <Link href={item.href} className="flex items-center justify-between p-3 bg-blue-50 border border-blue-100 rounded-xl hover:bg-white hover:shadow-md transition-all group">
                                <div>
                                  <span className="text-sm font-bold text-slate-700 group-hover:text-blue-700 block">{item.name}</span>
                                  <span className="text-[10px] text-slate-500">{item.group}</span>
                                </div>
                                <ArrowUpRight size={14} className="text-blue-300 group-hover:text-blue-600"/>
                             </Link>
                          </li>
                        ))
                      ) : (
                        <li className="text-center py-8 text-slate-400 text-sm">Tidak ditemukan alat "{search}"</li>
                      )
                   ) : (
                      [
                        { name: "Surat Jual Beli Tanah", tag: "Legal", href: "/tools/jual-beli-tanah" },
                        { name: "Surat Kuasa Pengambilan", tag: "Umum", href: "/tools/surat-kuasa" },
                        { name: "Perjanjian Hutang Piutang", tag: "Bisnis", href: "/tools/hutang" },
                        { name: "Kalkulator PPh 21", tag: "Pajak", href: "/tools/pph" },
                        { name: "Invoice UMKM", tag: "Keuangan", href: "/tools/finance?mode=invoice" }
                      ].map((item, idx) => (
                        <li key={idx}>
                           <Link href={item.href} className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl hover:border-emerald-500 hover:shadow-md hover:bg-white transition-all group">
                              <span className="text-xs md:text-sm font-semibold text-slate-700 group-hover:text-emerald-700">{item.name}</span>
                              <div className="flex items-center gap-2">
                                 <span className="text-[9px] font-bold bg-white border border-slate-200 text-slate-500 px-2 py-0.5 rounded-md group-hover:border-emerald-200 group-hover:text-emerald-600">{item.tag}</span>
                                 <ArrowUpRight size={14} className="text-slate-300 group-hover:text-emerald-500"/>
                              </div>
                           </Link>
                        </li>
                      ))
                   )}
                </ul>
             </div>
          </div>
        </div>
      </section>

      <div className="relative z-20 max-w-5xl mx-auto px-6 mb-10">
        <a 
          href="#directory" 
          className="group flex items-center justify-between w-full bg-white border border-slate-200 hover:border-emerald-500 p-4 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden relative cursor-pointer"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/0 via-emerald-50/50 to-emerald-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative flex items-center gap-4">
            <div className="bg-emerald-100 text-emerald-600 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
              <LayoutGrid size={20} />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-800">Eksplorasi Katalog Lengkap Surat</h3>
              <p className="text-[10px] text-slate-500 font-medium">Lihat rincian fungsi dan kegunaan 100+ template di bawah ini</p>
            </div>
          </div>
          <div className="relative flex items-center gap-2 text-emerald-600">
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Scroll Kebawah</span>
            <div className="animate-bounce bg-emerald-600 text-white p-1.5 rounded-full shadow-lg">
              <ChevronDown size={16} strokeWidth={3} />
            </div>
          </div>
        </a>
      </div>

      {/* ADSTERRA 728x90 BANNER (CENTERED) */}
      <div className="max-w-5xl mx-auto px-6 mt-4 mb-4">
         <div className="w-full min-h-[100px] bg-white/50 border border-slate-200 border-dashed rounded-xl flex items-center justify-center overflow-hidden py-4">
            <div className="flex justify-center w-full scale-90 md:scale-100 origin-center">
               <div id="container-adsterra-728">
                  <Script id="adsterra-728-config" strategy="afterInteractive">
                    {`
                      atOptions = {
                        'key' : '8fd377728513d5d23b9caf7a2bba1a73',
                        'format' : 'iframe',
                        'height' : 90,
                        'width' : 728,
                        'params' : {}
                      };
                    `}
                  </Script>
                  <Script 
                    src="https://www.highperformanceformat.com/8fd377728513d5d23b9caf7a2bba1a73/invoke.js" 
                    strategy="afterInteractive" 
                  />
               </div>
            </div>
         </div>
      </div>

      <section id="directory" className="px-6 max-w-5xl mx-auto py-12 relative z-10 scroll-mt-20">
        {filteredDirectory.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredDirectory.map((cat, idx) => (
              <Fragment key={idx}>
                {idx > 0 && idx % 3 === 0 && (
                   <div className="flex flex-col bg-white/50 border border-slate-200 border-dashed rounded-xl overflow-hidden h-full items-center justify-center p-4 min-h-[280px]">
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-[0.2em] mb-4">Sponsored Advertisement</span>
                      {/* ADSTERRA 300x250 NATIVE (CENTERED) */}
                      <div className="flex justify-center w-full">
                        <div id={`container-adsterra-300-${idx}`}>
                          <Script id={`adsterra-300-config-${idx}`} strategy="afterInteractive">
                            {`
                              atOptions = {
                                'key' : '9873c2eb956caac3e296de9c4fea56fc',
                                'format' : 'iframe',
                                'height' : 250,
                                'width' : 300,
                                'params' : {}
                              };
                            `}
                          </Script>
                          <Script 
                            src="https://www.highperformanceformat.com/9873c2eb956caac3e296de9c4fea56fc/invoke.js" 
                            strategy="afterInteractive" 
                          />
                        </div>
                      </div>
                   </div>
                )}
                <div className={`flex flex-col bg-white border ${cat.border} rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group h-full`}>
                  <div className={`px-4 py-3 border-b ${cat.border} ${cat.bgHeader} flex items-center gap-3`}>
                    <div className={`p-1.5 rounded-lg bg-white/60 shadow-sm ${cat.color}`}><cat.icon size={18} strokeWidth={2.5} /></div>
                    <div>
                      <h4 className={`font-bold text-xs uppercase tracking-wide ${cat.color}`}>{cat.group}</h4>
                      <p className="text-[10px] text-slate-600 leading-tight opacity-80">{cat.desc}</p>
                    </div>
                  </div>
                  <ul className="flex-grow divide-y divide-slate-50 p-1">
                     {cat.items.map((item, iIdx) => (
                        <li key={iIdx}>
                          <Link href={item.href} className="flex items-center justify-between px-3 py-2 rounded-md text-xs text-slate-600 hover:bg-slate-50 hover:text-emerald-700 hover:pl-4 transition-all duration-200 group/link">
                            <span className="font-medium truncate pr-2">{item.name}</span>
                            <ChevronRight size={12} className="text-slate-300 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                          </Link>
                        </li>
                     ))}
                  </ul>
                </div>
              </Fragment>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-slate-200">
             <Search size={32} className="mx-auto text-slate-300 mb-2"/><p className="text-sm text-slate-500 font-medium">Kategori tidak ditemukan.</p>
          </div>
        )}
      </section>

      <footer className="bg-slate-50 text-slate-600 py-8 border-t border-slate-200 mt-8 relative z-10">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5 space-y-2">
            <h5 className="text-slate-900 font-bold text-sm flex items-center gap-2"><ShieldCheck size={16} className="text-emerald-600" />LayananDokumen.com</h5>
            <p className="text-[11px] leading-relaxed text-slate-500 pr-4">Platform utilitas publik gratis. Praktis, Cepat, dan Aman.</p>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 text-[11px]">
            <div><h6 className="text-slate-900 font-semibold mb-2">Populer</h6>
              <ul className="space-y-1">
                <li><Link href="/tools/hutang" className="hover:text-emerald-600">Hutang Piutang</Link></li>
                <li><Link href="/tools/surat-kuasa" className="hover:text-emerald-600">Surat Kuasa</Link></li>
                <li>
                  <Link href="/tools/katalog-deskripsi" className="text-emerald-600 font-bold flex items-center gap-1 hover:underline">
                    <BookOpen size={12} /> Katalog Fungsi
                  </Link>
                </li>
              </ul>
            </div>
            <div><h6 className="text-slate-900 font-semibold mb-2">Legalitas</h6>
              <ul className="space-y-1">
                <li><Link href="/legalitas?tab=privasi" className="hover:text-emerald-600">Kebijakan Privasi</Link></li>
                <li><Link href="/legalitas?tab=disclaimer" className="hover:text-emerald-600">Disclaimer</Link></li>
                <li><Link href="/legalitas?tab=syarat" className="hover:text-emerald-600">Syarat Ketentuan</Link></li>
              </ul>
            </div>
            <div className="text-right flex flex-col justify-end">
              <p className="text-[10px] text-slate-400">&copy; 2026 LayananDokumen.com</p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}