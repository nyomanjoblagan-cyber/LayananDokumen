'use client';

import React, { useState } from 'react';
import { useFormSync } from '@/lib/useFormSync';
import PrintWrapper from '@/components/PrintWrapper';
import Link from 'next/link';
import { Printer, ArrowLeftCircle, Edit3, FileText, RotateCcw, User, ShieldCheck, Store, PackageCheck } from 'lucide-react';

const INITIAL_DATA = {
  hari: 'Senin',
  tanggal: '01',
  bulan: 'Desember',
  tahun: '2026',
  kota: 'Bandung',
  
  // Pihak Pertama (Konsinyor / Pemilik Barang)
  pihak1Nama: 'SITI NURHALIZA',
  pihak1Brand: 'Dapur Snack Barokah',
  pihak1Alamat: 'Jl. Riau No. 88, Cibeunying, Bandung',
  pihak1NoHp: '081321098765',
  
  // Pihak Kedua (Konsinyi / Pemilik Toko / Outlet)
  pihak2Nama: 'HENDRA WIJAYA',
  pihak2Toko: 'Toko Oleh-Oleh Priangan Jaya',
  pihak2Alamat: 'Jl. Dago No. 120, Coblong, Bandung',
  pihak2NoHp: '081234567890',
  
  // Rincian Produk & Penjualan
  jenisProduk: 'Makanan Ringan / Keripik & Kue Kering',
  daftarProduk: '1. Keripik Singkong Pedas Manis 200gr (Harga Jual Rp 15.000)\n2. Basreng Renyah Daun Jeruk 150gr (Harga Jual Rp 12.000)\n3. Makaroni Gurih Keju 200gr (Harga Jual Rp 15.000)',
  
  // Ketentuan Komisi & Pembayaran
  persenKomisi: '20% (dua puluh persen) dari harga jual',
  periodeSetoran: 'setiap tanggal 5 (lima) awal bulan berikutnya',
  metodePembayaran: 'Transfer Bank Mandiri Rek: 13000-xxxx-xxxx a.n. Siti Nurhaliza',
  
  // Ketentuan Retur & Kerusakan
  ketentuanRetur: 'Barang yang mendekati masa kedaluwarsa 14 hari sebelumnya wajib ditarik/diretur oleh Pihak Pertama tanpa membebani biaya apa pun kepada Pihak Kedua.',
  tanggungJawabHilang: 'Kehilangan barang di rak display outlet menjadi tanggung jawab Pihak Kedua dan wajib dibayar penuh.',
  
  // Durasi
  durasiKerjasama: '1 (satu) tahun terhitung sejak tanggal penandatanganan',
};

export default function KonsinyasiTemplate() {
  const [data, setData] = useFormSync<any>(INITIAL_DATA);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  const handleChange = (field: string, value: string) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    if (confirm('Reset semua isian data?')) {
      setData(INITIAL_DATA);
    }
  };

  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-black font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto ${className}`}>
      {children}
    </div>
  );

  const DocumentContent = () => (
    <Kertas>
      {/* JUDUL */}
      <div className="text-center mb-6">
        <h1 className="font-bold text-base md:text-lg uppercase underline tracking-wide">SURAT PERJANJIAN KERJASAMA KONSINYASI (TITIP JUAL)</h1>
        <p className="text-xs text-slate-600 mt-1 uppercase tracking-widest">(PERJANJIAN PENITIPAN BARANG DAGANGAN UMKM)</p>
      </div>

      <div className="text-justify space-y-3.5 text-xs md:text-sm">
        <p>Pada hari ini <strong>{data.hari || '.....'}</strong>, tanggal <strong>{data.tanggal || '.....'}</strong> bulan <strong>{data.bulan || '.....'}</strong> tahun <strong>{data.tahun || '.....'}</strong>, bertempat di <strong>{data.kota || '.....'}</strong>, telah dibuat dan disepakati perjanjian kerjasama konsinyasi oleh dan antara:</p>

        <table className="w-full ml-2">
          <tbody>
            <tr><td className="w-36 align-top">Nama Pemilik</td><td className="w-3 align-top">:</td><td><strong>{data.pihak1Nama || '..............................'}</strong></td></tr>
            <tr><td className="w-36 align-top">Nama Brand/Usaha</td><td className="w-3 align-top">:</td><td>{data.pihak1Brand || '..............................'}</td></tr>
            <tr><td className="w-36 align-top">Alamat Usaha</td><td className="w-3 align-top">:</td><td>{data.pihak1Alamat || '..............................'}</td></tr>
            <tr><td className="w-36 align-top">Nomor HP/WA</td><td className="w-3 align-top">:</td><td>{data.pihak1NoHp || '..............................'}</td></tr>
          </tbody>
        </table>
        <p>Selanjutnya disebut sebagai <strong>PIHAK PERTAMA (Konsinyor / Pemilik Produk)</strong>.</p>

        <table className="w-full ml-2">
          <tbody>
            <tr><td className="w-36 align-top">Nama Pengelola</td><td className="w-3 align-top">:</td><td><strong>{data.pihak2Nama || '..............................'}</strong></td></tr>
            <tr><td className="w-36 align-top">Nama Toko/Outlet</td><td className="w-3 align-top">:</td><td>{data.pihak2Toko || '..............................'}</td></tr>
            <tr><td className="w-36 align-top">Alamat Outlet</td><td className="w-3 align-top">:</td><td>{data.pihak2Alamat || '..............................'}</td></tr>
            <tr><td className="w-36 align-top">Nomor HP/WA</td><td className="w-3 align-top">:</td><td>{data.pihak2NoHp || '..............................'}</td></tr>
          </tbody>
        </table>
        <p>Selanjutnya disebut sebagai <strong>PIHAK KEDUA (Konsinyi / Penyalur / Toko)</strong>.</p>

        <p>Kedua belah pihak sepakat mengikatkan diri dalam Perjanjian Kerjasama Konsinyasi (Titip Jual) dengan syarat dan ketentuan sebagai berikut:</p>

        <div className="font-bold text-center mt-4 mb-1">PASAL 1<br/>OBJEK KONSINYASI & DISPLAY BARANG</div>
        <ol className="list-decimal ml-6 space-y-1">
          <li>PIHAK PERTAMA menitipkan produk kategori <strong>{data.jenisProduk}</strong> kepada PIHAK KEDUA untuk dipajang dan dijualkan di gerai/outlet milik PIHAK KEDUA.</li>
          <li>Rincian daftar produk dan harga jual rekomendasi konsumen:<br/>
            <pre className="font-sans text-xs bg-slate-50 p-2 rounded border border-slate-200 mt-1 whitespace-pre-wrap leading-relaxed">{data.daftarProduk}</pre>
          </li>
          <li>Setiap penyerahan produk dari PIHAK PERTAMA ke PIHAK KEDUA wajib disertai <strong>Surat Jalan / Nota Tanda Terima Konsinyasi</strong> bermeterai atau berstempel resmi yang ditandatangani kedua belah pihak.</li>
        </ol>

        <div className="font-bold text-center mt-4 mb-1">PASAL 2<br/>KOMISI TOKO DAN SISTEM PEMBAYARAN</div>
        <ol className="list-decimal ml-6 space-y-1">
          <li>Atas jasa penjualan dan penyediaan tempat display, PIHAK KEDUA berhak atas komisi/bagi hasil sebesar <strong>{data.persenKomisi}</strong> dari total harga jual produk yang berhasil terjual.</li>
          <li>PIHAK KEDUA wajib menyetorkan hasil penjualan bersih kepada PIHAK PERTAMA <strong>{data.periodeSetoran}</strong>.</li>
          <li>Pembayaran dilakukan secara <strong>{data.metodePembayaran}</strong> dengan melampirkan laporan rekapitulasi penjualan produk yang laku terjual.</li>
        </ol>

        <div className="font-bold text-center mt-4 mb-1">PASAL 3<br/>BARANG RETUR, RUSAK, DAN KEDALUWARSA</div>
        <ol className="list-decimal ml-6 space-y-1">
          <li>{data.ketentuanRetur}</li>
          <li>{data.tanggungJawabHilang}</li>
          <li>PIHAK KEDUA berkewajiban merawat dan menjaga kebersihan kemasan produk selama berada di rak display toko.</li>
        </ol>

        <div className="font-bold text-center mt-4 mb-1">PASAL 4<br/>JANGKA WAKTU DAN PEMUTUSAN KERJASAMA</div>
        <ol className="list-decimal ml-6 space-y-1">
          <li>Perjanjian ini berlaku selama <strong>{data.durasiKerjasama}</strong> dan dapat diperpanjang atas kesepakatan kedua pihak.</li>
          <li>Masing-masing pihak berhak mengakhiri kerjasama ini dengan pemberitahuan tertulis minimal 14 (empat belas) hari kalender sebelumnya, dengan ketentuan seluruh sisa stok dikembalikan dan seluruh tagihan penjualan diselesaikan lunas.</li>
        </ol>

        <div className="font-bold text-center mt-4 mb-1">PASAL 5<br/>PENYELESAIAN SENGKETA</div>
        <p>Segala perselisihan yang timbul akan diselesaikan secara musyawarah untuk mufakat. Apabila tidak tercapai mufakat, para pihak sepakat menyelesaikannya di Pengadilan Negeri wilayah <strong>{data.kota}</strong>.</p>

        {/* TANDA TANGAN */}
        <div className="flex justify-between items-start mt-8 pt-4">
          <div className="text-center w-1/2">
            <p className="font-bold">PIHAK PERTAMA</p>
            <p className="text-xs text-slate-500">(Konsinyor / Pemilik Produk)</p>
            <div className="h-20 flex items-center justify-center">
              <span className="text-[9px] border border-slate-300 text-slate-400 p-1">Meterai 10.000</span>
            </div>
            <p className="font-bold underline uppercase">{data.pihak1Nama || '..............................'}</p>
            <p className="text-xs text-slate-600">{data.pihak1Brand}</p>
          </div>
          <div className="text-center w-1/2">
            <p className="font-bold">PIHAK KEDUA</p>
            <p className="text-xs text-slate-500">(Konsinyi / Pemilik Outlet)</p>
            <div className="h-20 flex items-center justify-center">
              <span className="text-[9px] border border-slate-300 text-slate-400 p-1">Tanda Tangan & Cap</span>
            </div>
            <p className="font-bold underline uppercase">{data.pihak2Nama || '..............................'}</p>
            <p className="text-xs text-slate-600">{data.pihak2Toko}</p>
          </div>
        </div>
      </div>
    </Kertas>
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* BULLETPROOF PRINT CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          html, body { height: auto !important; overflow: visible !important; background: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: static !important; width: 100%; background: white; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-[999] border-b border-slate-800 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-purple-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Perjanjian Konsinyasi (Titip Jual)</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-300 hidden md:inline-block">
                LEGAL FORMAL FORMAT
            </span>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-purple-600 hover:bg-purple-500 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-900/50 active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-[998] no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'editor' ? 'text-purple-700 border-b-2 border-purple-700 bg-purple-50' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'preview' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50' : 'text-slate-500'}`}>
          <Printer size={16} /> Preview
        </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* EDITOR SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[540px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
            <div className="p-5 bg-white border-b border-slate-200 flex justify-between items-center shrink-0">
                <h2 className="font-black text-slate-800 uppercase tracking-tight text-sm flex items-center gap-2">
                  <FileText size={18} className="text-purple-600" /> Editor Konsinyasi UMKM
                </h2>
                <button onClick={resetForm} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar pb-32">
              
              {/* CARD 1: TANGGAL & TEMPAT */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                  <ShieldCheck size={14} className="text-purple-600"/> Tanggal & Tempat Perjanjian
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Hari</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.hari} onChange={(e) => handleChange('hari', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Kota</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.kota} onChange={(e) => handleChange('kota', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tanggal</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.tanggal} onChange={(e) => handleChange('tanggal', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Bulan</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.bulan} onChange={(e) => handleChange('bulan', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tahun</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.tahun} onChange={(e) => handleChange('tahun', e.target.value)} />
                  </div>
                </div>
              </div>

              {/* CARD 2: PIHAK 1 (KONSINYOR / PEMILIK PRODUK) */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                  <User size={14} className="text-purple-600"/> Pihak I (Pemilik Produk UMKM)
                </h3>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Pemilik</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm uppercase" value={data.pihak1Nama} onChange={(e) => handleChange('pihak1Nama', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Brand / Merk Usaha</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm font-semibold text-purple-700" value={data.pihak1Brand} onChange={(e) => handleChange('pihak1Brand', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Alamat Usaha / Rumah Produksi</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak1Alamat} onChange={(e) => handleChange('pihak1Alamat', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nomor HP/WA</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak1NoHp} onChange={(e) => handleChange('pihak1NoHp', e.target.value)} />
                </div>
              </div>

              {/* CARD 3: PIHAK 2 (KONSINYI / PEMILIK TOKO) */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Store size={14} className="text-purple-600"/> Pihak II (Outlet / Toko Penjual)
                </h3>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Pemilik / Pengelola Toko</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm uppercase" value={data.pihak2Nama} onChange={(e) => handleChange('pihak2Nama', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Toko / Outlet / Kafe</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm font-semibold text-emerald-700" value={data.pihak2Toko} onChange={(e) => handleChange('pihak2Toko', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Alamat Lengkap Outlet</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak2Alamat} onChange={(e) => handleChange('pihak2Alamat', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nomor HP/WA</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak2NoHp} onChange={(e) => handleChange('pihak2NoHp', e.target.value)} />
                </div>
              </div>

              {/* CARD 4: PRODUK & DISPLAY */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                  <PackageCheck size={14} className="text-purple-600"/> Rincian Produk Titipan
                </h3>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Kategori / Jenis Produk</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.jenisProduk} onChange={(e) => handleChange('jenisProduk', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Daftar Produk & Harga Jual Konsumen</label>
                  <textarea className="w-full p-2.5 border border-slate-300 rounded-lg text-xs leading-relaxed" rows={4} value={data.daftarProduk} onChange={(e) => handleChange('daftarProduk', e.target.value)}></textarea>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Durasi Kerjasama</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.durasiKerjasama} onChange={(e) => handleChange('durasiKerjasama', e.target.value)} />
                </div>
              </div>

              {/* CARD 5: KOMISI & PEMBAYARAN */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                  <ShieldCheck size={14} className="text-purple-600"/> Komisi Toko, Setoran, & Retur
                </h3>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Persentase Komisi Toko (%)</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm font-semibold text-emerald-600" value={data.persenKomisi} onChange={(e) => handleChange('persenKomisi', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Periode Setoran Hasil Penjualan</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.periodeSetoran} onChange={(e) => handleChange('periodeSetoran', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Metode & Rekening Pembayaran</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.metodePembayaran} onChange={(e) => handleChange('metodePembayaran', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Aturan Retur / Kedaluwarsa</label>
                  <textarea className="w-full p-2.5 border border-slate-300 rounded-lg text-xs leading-relaxed" rows={2} value={data.ketentuanRetur} onChange={(e) => handleChange('ketentuanRetur', e.target.value)}></textarea>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tanggung Jawab Barang Hilang</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.tanggungJawabHilang} onChange={(e) => handleChange('tanggungJawabHilang', e.target.value)} />
                </div>
              </div>

            </div>
        </aside>

        {/* PREVIEW AREA (BULLETPROOF PRINT TARGET) */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName={`Konsinyasi_${data.pihak1Brand.replace(/\s+/g, '_')}`} price={10000} />
           </div>
        </div>
      </main>
    </div>
  );
}
