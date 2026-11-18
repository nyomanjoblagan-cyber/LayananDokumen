'use client';

import React, { useState } from 'react';
import { useFormSync } from '@/lib/useFormSync';
import PrintWrapper from '@/components/PrintWrapper';
import Link from 'next/link';
import { Printer, ArrowLeftCircle, Edit3, FileText, RotateCcw, User, ShieldCheck, Home, MapPin } from 'lucide-react';

const INITIAL_DATA = {
  hari: 'Kamis',
  tanggal: '10',
  bulan: 'Desember',
  tahun: '2026',
  kota: 'Semarang',
  
  // Pihak Pertama (Pemilik Sah / Yang Meminjamkan)
  pihak1Nama: 'H. AHMAD FAUZI',
  pihak1Nik: '3374012345670001',
  pihak1Job: 'Wiraswasta',
  pihak1Alamat: 'Jl. Pemuda No. 15, RT 03/RW 02, Pandansari, Semarang Tengah',
  pihak1NoHp: '081234567890',
  
  // Pihak Kedua (Peminjam / Yang Menerima Pinjam Pakai)
  pihak2Nama: 'RIDWAN SETIAWAN',
  pihak2Nik: '3374029876540003',
  pihak2Job: 'Karyawan Swasta',
  pihak2Alamat: 'Jl. Gajahmada No. 40, RT 01/RW 04, Kembangsari, Semarang Tengah',
  pihak2NoHp: '081987654321',
  
  // Data Objek
  jenisObjek: 'Sebidang Tanah dan Bangunan Rumah Tinggal',
  alamatObjek: 'Jl. Kenanga No. 8, Kel. Gayamsari, Kec. Gayamsari, Kota Semarang',
  luasObjek: 'Luas Tanah 180 m², Luas Bangunan 100 m²',
  buktiKepemilikan: 'Sertifikat Hak Milik (SHM) No. 04521 atas nama H. Ahmad Fauzi',
  batasUtara: 'Rumah Bapak Sukirno',
  batasSelatan: 'Jalan Kenanga',
  batasTimur: 'Tanah Kas Kelurahan',
  batasBarat: 'Rumah Ibu Hartini',
  
  // Peruntukan & Durasi
  tujuanPenggunaan: 'Tempat tinggal pribadi bersama keluarga',
  durasiTahun: '3 (tiga) tahun',
  mulaiTanggal: '01 Januari 2027',
  selesaiTanggal: '31 Desember 2029',
};

export default function PinjamPakaiTemplate() {
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
        <h1 className="font-bold text-base md:text-lg uppercase underline tracking-wide">SURAT PERJANJIAN PINJAM PAKAI (CUMA-CUMA)</h1>
        <p className="text-xs text-slate-600 mt-1 uppercase tracking-widest">(BERDASARKAN PASAL 1740 KITAB UNDANG-UNDANG HUKUM PERDATA)</p>
      </div>

      <div className="text-justify space-y-3.5 text-xs md:text-sm">
        <p>Pada hari ini <strong>{data.hari || '.....'}</strong>, tanggal <strong>{data.tanggal || '.....'}</strong> bulan <strong>{data.bulan || '.....'}</strong> tahun <strong>{data.tahun || '.....'}</strong>, bertempat di <strong>{data.kota || '.....'}</strong>, telah dibuat dan ditandatangani perjanjian pinjam pakai oleh dan antara:</p>

        <table className="w-full ml-2">
          <tbody>
            <tr><td className="w-36 align-top">Nama Lengkap</td><td className="w-3 align-top">:</td><td><strong>{data.pihak1Nama || '..............................'}</strong></td></tr>
            <tr><td className="w-36 align-top">NIK / KTP</td><td className="w-3 align-top">:</td><td>{data.pihak1Nik || '..............................'}</td></tr>
            <tr><td className="w-36 align-top">Pekerjaan</td><td className="w-3 align-top">:</td><td>{data.pihak1Job || '..............................'}</td></tr>
            <tr><td className="w-36 align-top">Alamat Domisili</td><td className="w-3 align-top">:</td><td>{data.pihak1Alamat || '..............................'}</td></tr>
            <tr><td className="w-36 align-top">Nomor HP/WA</td><td className="w-3 align-top">:</td><td>{data.pihak1NoHp || '..............................'}</td></tr>
          </tbody>
        </table>
        <p>Bertindak sebagai pemilik sah atas objek tanah/bangunan, selanjutnya disebut sebagai <strong>PIHAK PERTAMA (Yang Meminjamkan)</strong>.</p>

        <table className="w-full ml-2">
          <tbody>
            <tr><td className="w-36 align-top">Nama Lengkap</td><td className="w-3 align-top">:</td><td><strong>{data.pihak2Nama || '..............................'}</strong></td></tr>
            <tr><td className="w-36 align-top">NIK / KTP</td><td className="w-3 align-top">:</td><td>{data.pihak2Nik || '..............................'}</td></tr>
            <tr><td className="w-36 align-top">Pekerjaan</td><td className="w-3 align-top">:</td><td>{data.pihak2Job || '..............................'}</td></tr>
            <tr><td className="w-36 align-top">Alamat Domisili</td><td className="w-3 align-top">:</td><td>{data.pihak2Alamat || '..............................'}</td></tr>
            <tr><td className="w-36 align-top">Nomor HP/WA</td><td className="w-3 align-top">:</td><td>{data.pihak2NoHp || '..............................'}</td></tr>
          </tbody>
        </table>
        <p>Bertindak sebagai pihak yang menerima pinjaman pemakaian objek, selanjutnya disebut sebagai <strong>PIHAK KEDUA (Peminjam Pakai)</strong>.</p>

        <p>Kedua belah pihak sepakat mengikatkan diri dalam Perjanjian Pinjam Pakai Cuma-Cuma dengan ketentuan hukum sebagai berikut:</p>

        <div className="font-bold text-center mt-4 mb-1">PASAL 1<br/>OBJEK DAN SIFAT PINJAM PAKAI</div>
        <ol className="list-decimal ml-6 space-y-1">
          <li>PIHAK PERTAMA meminjamkan kepada PIHAK KEDUA berupa <strong>{data.jenisObjek}</strong> yang beralamat di <strong>{data.alamatObjek}</strong> dengan spesifikasi <strong>{data.luasObjek}</strong>, legalitas <strong>{data.buktiKepemilikan}</strong>.</li>
          <li>Batas-batas objek: Sebelah Utara: {data.batasUtara}; Sebelah Selatan: {data.batasSelatan}; Sebelah Timur: {data.batasTimur}; Sebelah Barat: {data.batasBarat}.</li>
          <li>Pinjam pakai ini bersifat <strong>CUMA-CUMA / BEBAS BIAYA SEWA</strong>, di mana PIHAK KEDUA tidak dikenakan uang sewa apa pun kepada PIHAK PERTAMA selama masa pinjam pakai berlangsung.</li>
        </ol>

        <div className="font-bold text-center mt-4 mb-1">PASAL 2<br/>JANGKA WAKTU & TUJUAN PENGGUNAAN</div>
        <ol className="list-decimal ml-6 space-y-1">
          <li>Perjanjian ini berlaku selama <strong>{data.durasiTahun}</strong>, terhitung sejak <strong>{data.mulaiTanggal}</strong> sampai dengan <strong>{data.selesaiTanggal}</strong>.</li>
          <li>Objek pinjam pakai semata-mata hanya diperuntukkan untuk <strong>{data.tujuanPenggunaan}</strong> dan dilarang digunakan untuk kegiatan yang melanggar hukum, norma asusila, atau merugikan ketertiban umum.</li>
        </ol>

        <div className="font-bold text-center mt-4 mb-1">PASAL 3<br/>BIAYA OPERASIONAL, PERAWATAN, DAN PAJAK</div>
        <ol className="list-decimal ml-6 space-y-1">
          <li>Selama masa pinjam pakai, seluruh biaya operasional harian (tagihan listrik PLN, air PDAM, kebersihan lingkungan, dan iuran RT/RW) menjadi kewajiban mutlak PIHAK KEDUA.</li>
          <li>PIHAK KEDUA wajib menjaga dan memelihara keutuhan bangunan/tanah tersebut sebaik-baiknya sebagaimana layaknya seorang bapak rumah tangga yang baik (sesuai Pasal 1744 KUHPerdata).</li>
        </ol>

        <div className="font-bold text-center mt-4 mb-1">PASAL 4<br/>PENEGASAN HAK MILIK DAN LARANGAN ALIH HAK</div>
        <ol className="list-decimal ml-6 space-y-1">
          <li>Perjanjian pinjam pakai ini <strong>SAMA SEKALI TIDAK MENGALIHKAN HAK KEPEMILIKAN</strong> atas tanah/bangunan tersebut kepada PIHAK KEDUA atau ahli warisnya. Objek tersebut tetap merupakan hak milik sah mutlak PIHAK PERTAMA.</li>
          <li>PIHAK KEDUA <strong>DILARANG KERAS</strong> menyewakan, meminjamkan kembali kepada pihak ketiga, menjaminkan/menggadaikan, atau mengubah struktur bentuk fisik bangunan secara permanen tanpa izin tertulis dari PIHAK PERTAMA.</li>
        </ol>

        <div className="font-bold text-center mt-4 mb-1">PASAL 5<br/>PENGEMBALIAN OBJEK PINJAM PAKAI</div>
        <p>Pada saat jangka waktu perjanjian ini berakhir, PIHAK KEDUA wajib menyerahkan kembali objek tanah dan bangunan tersebut dalam keadaan kosong, terpelihara dengan baik, dan bebas dari segala tunggakan tagihan kepada PIHAK PERTAMA tanpa menuntut ganti rugi apa pun.</p>

        {/* TANDA TANGAN */}
        <div className="flex justify-between items-start mt-8 pt-4">
          <div className="text-center w-1/2">
            <p className="font-bold">PIHAK PERTAMA</p>
            <p className="text-xs text-slate-500">(Pemilik Sah)</p>
            <div className="h-20 flex items-center justify-center">
              <span className="text-[9px] border border-slate-300 text-slate-400 p-1">Meterai 10.000</span>
            </div>
            <p className="font-bold underline uppercase">{data.pihak1Nama || '..............................'}</p>
          </div>
          <div className="text-center w-1/2">
            <p className="font-bold">PIHAK KEDUA</p>
            <p className="text-xs text-slate-500">(Peminjam Pakai)</p>
            <div className="h-20 flex items-center justify-center">
              <span className="text-[9px] border border-slate-300 text-slate-400 p-1">Tanda Tangan</span>
            </div>
            <p className="font-bold underline uppercase">{data.pihak2Nama || '..............................'}</p>
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
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Perjanjian Pinjam Pakai</h1>
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
                  <FileText size={18} className="text-purple-600" /> Editor Pinjam Pakai
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

              {/* CARD 2: PIHAK 1 (PEMILIK SAH) */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                  <User size={14} className="text-purple-600"/> Pihak I (Pemilik Tanah / Properti)
                </h3>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Lengkap</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm uppercase" value={data.pihak1Nama} onChange={(e) => handleChange('pihak1Nama', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">NIK / KTP</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak1Nik} onChange={(e) => handleChange('pihak1Nik', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Pekerjaan</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak1Job} onChange={(e) => handleChange('pihak1Job', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Alamat Domisili</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak1Alamat} onChange={(e) => handleChange('pihak1Alamat', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nomor HP/WA</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak1NoHp} onChange={(e) => handleChange('pihak1NoHp', e.target.value)} />
                </div>
              </div>

              {/* CARD 3: PIHAK 2 (PEMINJAM PAKAI) */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                  <User size={14} className="text-purple-600"/> Pihak II (Peminjam Pakai)
                </h3>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Lengkap</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm uppercase" value={data.pihak2Nama} onChange={(e) => handleChange('pihak2Nama', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">NIK / KTP</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak2Nik} onChange={(e) => handleChange('pihak2Nik', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Pekerjaan</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak2Job} onChange={(e) => handleChange('pihak2Job', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Alamat Domisili</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak2Alamat} onChange={(e) => handleChange('pihak2Alamat', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nomor HP/WA</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak2NoHp} onChange={(e) => handleChange('pihak2NoHp', e.target.value)} />
                </div>
              </div>

              {/* CARD 4: OBJEK TANAH / BANGUNAN */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Home size={14} className="text-purple-600"/> Data Objek & Bukti Hak Milik
                </h3>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Jenis Objek</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.jenisObjek} onChange={(e) => handleChange('jenisObjek', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Alamat / Lokasi Objek</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.alamatObjek} onChange={(e) => handleChange('alamatObjek', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Luas Tanah / Bangunan</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.luasObjek} onChange={(e) => handleChange('luasObjek', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Bukti Hak Milik (No. SHM / AJB)</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm font-semibold" value={data.buktiKepemilikan} onChange={(e) => handleChange('buktiKepemilikan', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Batas Utara</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.batasUtara} onChange={(e) => handleChange('batasUtara', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Batas Selatan</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.batasSelatan} onChange={(e) => handleChange('batasSelatan', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Batas Timur</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.batasTimur} onChange={(e) => handleChange('batasTimur', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Batas Barat</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.batasBarat} onChange={(e) => handleChange('batasBarat', e.target.value)} />
                  </div>
                </div>
              </div>

              {/* CARD 5: TUJUAN & JANGKA WAKTU */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                  <MapPin size={14} className="text-purple-600"/> Tujuan Penggunaan & Durasi
                </h3>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tujuan Penggunaan Objek</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm font-medium" value={data.tujuanPenggunaan} onChange={(e) => handleChange('tujuanPenggunaan', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Durasi Pinjam Pakai</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.durasiTahun} onChange={(e) => handleChange('durasiTahun', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tanggal Mulai</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.mulaiTanggal} onChange={(e) => handleChange('mulaiTanggal', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tanggal Berakhir</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.selesaiTanggal} onChange={(e) => handleChange('selesaiTanggal', e.target.value)} />
                  </div>
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
              <PrintWrapper documentName={`PinjamPakai_${data.pihak1Nama.replace(/\s+/g, '_')}`} price={10000} />
           </div>
        </div>
      </main>
    </div>
  );
}
