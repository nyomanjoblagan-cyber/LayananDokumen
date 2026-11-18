'use client';

import React, { useState } from 'react';
import { useFormSync } from '@/lib/useFormSync';
import PrintWrapper from '@/components/PrintWrapper';
import Link from 'next/link';
import { Printer, ArrowLeftCircle, Edit3, FileText, RotateCcw, User, ShieldCheck, Car, CreditCard } from 'lucide-react';

const INITIAL_DATA = {
  hari: 'Rabu',
  tanggal: '18',
  bulan: 'November',
  tahun: '2026',
  kota: 'Jakarta',
  
  // Pihak Pertama (Debitur Lama / Yang Mengalihkan)
  pihak1Nama: 'ANDI PRASETYA',
  pihak1Nik: '3171012345670001',
  pihak1Alamat: 'Jl. Merdeka No. 45, RT 02/RW 05, Jakarta Selatan',
  pihak1NoHp: '081234567890',
  
  // Pihak Kedua (Debitur Baru / Penerima Over Kredit)
  pihak2Nama: 'BAMBANG HERMANTO',
  pihak2Nik: '3275019876540002',
  pihak2Alamat: 'Jl. Melati No. 12, RT 01/RW 03, Bekasi Barat',
  pihak2NoHp: '081987654321',
  
  // Data Objek
  jenisObjek: 'Kendaraan Roda Empat (Mobil)',
  merkType: 'Toyota Avanza 1.3 G M/T',
  tahunPembuatan: '2023',
  nomorPolisi: 'B 2345 SQR',
  nomorRangka: 'MHFM1234567890123',
  nomorMesin: '1NR-FE-9876543',
  warna: 'Hitam Metalik',
  
  // Pembiayaan & Leasing
  namaLeasing: 'PT BCA Finance',
  nomorKontrak: 'KTR-99882211',
  angsuranPerBulan: '4.850.000',
  sisaTenor: '24 (dua puluh empat) bulan',
  jatuhTempoTgl: '15 setiap bulannya',
  uangKompensasi: '45.000.000',
  terbilangKompensasi: 'Empat Puluh Lima Juta Rupiah',
};

export default function OverKreditTemplate() {
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
        <h1 className="font-bold text-base md:text-lg uppercase underline tracking-wide">SURAT PERJANJIAN OVER KREDIT / ALIH DEBITUR</h1>
        <p className="text-xs text-slate-600 mt-1 uppercase tracking-widest">(PERJANJIAN PENGALIHAN BEBAN ANGSURAN PEMBIAYAAN KENDARAAN)</p>
      </div>

      <div className="text-justify space-y-3.5 text-xs md:text-sm">
        <p>Pada hari ini <strong>{data.hari || '.....'}</strong>, tanggal <strong>{data.tanggal || '.....'}</strong> bulan <strong>{data.bulan || '.....'}</strong> tahun <strong>{data.tahun || '.....'}</strong>, bertempat di <strong>{data.kota || '.....'}</strong>, telah dibuat dan disepakati perjanjian over kredit oleh dan antara:</p>

        <table className="w-full ml-2">
          <tbody>
            <tr><td className="w-36 align-top">Nama Lengkap</td><td className="w-3 align-top">:</td><td><strong>{data.pihak1Nama || '..............................'}</strong></td></tr>
            <tr><td className="w-36 align-top">NIK / KTP</td><td className="w-3 align-top">:</td><td>{data.pihak1Nik || '..............................'}</td></tr>
            <tr><td className="w-36 align-top">Alamat Domisili</td><td className="w-3 align-top">:</td><td>{data.pihak1Alamat || '..............................'}</td></tr>
            <tr><td className="w-36 align-top">Nomor HP/WA</td><td className="w-3 align-top">:</td><td>{data.pihak1NoHp || '..............................'}</td></tr>
          </tbody>
        </table>
        <p>Selanjutnya disebut sebagai <strong>PIHAK PERTAMA (Debitur Lama / Yang Mengalihkan)</strong>.</p>

        <table className="w-full ml-2">
          <tbody>
            <tr><td className="w-36 align-top">Nama Lengkap</td><td className="w-3 align-top">:</td><td><strong>{data.pihak2Nama || '..............................'}</strong></td></tr>
            <tr><td className="w-36 align-top">NIK / KTP</td><td className="w-3 align-top">:</td><td>{data.pihak2Nik || '..............................'}</td></tr>
            <tr><td className="w-36 align-top">Alamat Domisili</td><td className="w-3 align-top">:</td><td>{data.pihak2Alamat || '..............................'}</td></tr>
            <tr><td className="w-36 align-top">Nomor HP/WA</td><td className="w-3 align-top">:</td><td>{data.pihak2NoHp || '..............................'}</td></tr>
          </tbody>
        </table>
        <p>Selanjutnya disebut sebagai <strong>PIHAK KEDUA (Debitur Baru / Penerima Over Kredit)</strong>.</p>

        <p>Kedua belah pihak secara sadar dan sukarela bersepakat mengadakan perjanjian over kredit dengan klausul-klausul yang mengikat sebagai berikut:</p>

        <div className="font-bold text-center mt-4 mb-1">PASAL 1<br/>OBJEK OVER KREDIT DAN KOMPENSASI</div>
        <ol className="list-decimal ml-6 space-y-1">
          <li>PIHAK PERTAMA mengalihkan 1 (satu) unit <strong>{data.jenisObjek}</strong> merk/tipe <strong>{data.merkType}</strong>, No. Polisi <strong>{data.nomorPolisi}</strong>, No. Rangka: <strong>{data.nomorRangka}</strong>, No. Mesin: <strong>{data.nomorMesin}</strong>, Warna: <strong>{data.warna}</strong> kepada PIHAK KEDUA.</li>
          <li>Atas pengalihan tersebut, PIHAK KEDUA membayar uang kompensasi ganti rugi DP/angsuran kepada PIHAK PERTAMA sebesar <strong>Rp {data.uangKompensasi || '0'}</strong> (<em>{data.terbilangKompensasi}</em>) yang diserahkan tunai/transfer saat penandatanganan surat ini.</li>
        </ol>

        <div className="font-bold text-center mt-4 mb-1">PASAL 2<br/>KEWAJIBAN ANGSURAN DAN TENGGAT WAKTU</div>
        <ol className="list-decimal ml-6 space-y-1">
          <li>Objek tersebut masih dalam pembiayaan <strong>{data.namaLeasing}</strong> dengan Nomor Kontrak: <strong>{data.nomorKontrak}</strong>, sisa tenor <strong>{data.sisaTenor}</strong>, dengan nilai angsuran sebesar <strong>Rp {data.angsuranPerBulan}</strong> per bulan.</li>
          <li>PIHAK KEDUA berkewajiban mutlak membayar angsuran bulanan tersebut secara tepat waktu paling lambat sebelum tanggal <strong>{data.jatuhTempoTgl}</strong> hingga kredit dinyatakan lunas oleh pihak leasing.</li>
          <li>Segala bentuk denda keterlambatan, biaya penagihan, atau risiko penarikan unit oleh pihak leasing akibat kelalaian pembayaran sepenuhnya menjadi tanggung jawab mutlak PIHAK KEDUA.</li>
        </ol>

        <div className="font-bold text-center mt-4 mb-1">PASAL 3<br/>LARANGAN MEMINDAHTANGANKAN (PIDANA FIDUSIA)</div>
        <p>PIHAK KEDUA <strong>DILARANG KERAS</strong> untuk menggadaikan, menyewakan, memindahtangankan, atau menjual kembali unit objek tersebut kepada pihak ketiga mana pun selama kewajiban angsuran belum lunas 100%. Tindakan tersebut merupakan tindak pidana penggelapan dan pelanggaran <strong>Undang-Undang Republik Indonesia Nomor 42 Tahun 1999 tentang Jaminan Fidusia</strong> yang dapat dituntut secara pidana.</p>

        <div className="font-bold text-center mt-4 mb-1">PASAL 4<br/>PENGAMBILAN BPKB DAN BALIK NAMA</div>
        <ol className="list-decimal ml-6 space-y-1">
          <li>Setelah seluruh angsuran lunas, PIHAK PERTAMA wajib menyerahkan surat kuasa khusus dan mendampingi PIHAK KEDUA untuk mengambil BPKB asli dan surat pelepasan hak di kantor leasing.</li>
          <li>Seluruh biaya proses balik nama kepemilikan menjadi tanggungan PIHAK KEDUA.</li>
        </ol>

        <div className="font-bold text-center mt-4 mb-1">PASAL 5<br/>PENYELESAIAN SENGKETA</div>
        <p>Apabila di kemudian hari terjadi perselisihan, kedua belah pihak sepakat untuk menyelesaikannya secara musyawarah kekeluargaan. Apabila musyawarah tidak tercapai, para pihak sepakat memilih domisili hukum di Kantor Kepaniteraan Pengadilan Negeri wilayah <strong>{data.kota}</strong>.</p>

        {/* TANDA TANGAN */}
        <div className="flex justify-between items-start mt-8 pt-4">
          <div className="text-center w-1/2">
            <p className="font-bold">PIHAK PERTAMA</p>
            <p className="text-xs text-slate-500">(Debitur Lama)</p>
            <div className="h-20 flex items-center justify-center">
              <span className="text-[9px] border border-slate-300 text-slate-400 p-1">Meterai 10.000</span>
            </div>
            <p className="font-bold underline uppercase">{data.pihak1Nama || '..............................'}</p>
          </div>
          <div className="text-center w-1/2">
            <p className="font-bold">PIHAK KEDUA</p>
            <p className="text-xs text-slate-500">(Penerima Over Kredit)</p>
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
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Perjanjian Over Kredit</h1>
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
                  <FileText size={18} className="text-purple-600" /> Editor Over Kredit
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

              {/* CARD 2: PIHAK 1 (DEBITUR LAMA) */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                  <User size={14} className="text-purple-600"/> Pihak I (Debitur Lama)
                </h3>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Lengkap</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm uppercase" value={data.pihak1Nama} onChange={(e) => handleChange('pihak1Nama', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">NIK / No. KTP</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak1Nik} onChange={(e) => handleChange('pihak1Nik', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Alamat Lengkap</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak1Alamat} onChange={(e) => handleChange('pihak1Alamat', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nomor HP/WA</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak1NoHp} onChange={(e) => handleChange('pihak1NoHp', e.target.value)} />
                </div>
              </div>

              {/* CARD 3: PIHAK 2 (PENERIMA OVER KREDIT) */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                  <User size={14} className="text-purple-600"/> Pihak II (Debitur Baru)
                </h3>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Lengkap</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm uppercase" value={data.pihak2Nama} onChange={(e) => handleChange('pihak2Nama', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">NIK / No. KTP</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak2Nik} onChange={(e) => handleChange('pihak2Nik', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Alamat Lengkap</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak2Alamat} onChange={(e) => handleChange('pihak2Alamat', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nomor HP/WA</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak2NoHp} onChange={(e) => handleChange('pihak2NoHp', e.target.value)} />
                </div>
              </div>

              {/* CARD 4: RINCIAN OBJEK */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Car size={14} className="text-purple-600"/> Data Objek Kendaraan / Properti
                </h3>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Jenis Objek</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.jenisObjek} onChange={(e) => handleChange('jenisObjek', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Merk / Tipe</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.merkType} onChange={(e) => handleChange('merkType', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tahun</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.tahunPembuatan} onChange={(e) => handleChange('tahunPembuatan', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">No. Polisi / Plat</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm uppercase" value={data.nomorPolisi} onChange={(e) => handleChange('nomorPolisi', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Warna</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.warna} onChange={(e) => handleChange('warna', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">No. Rangka</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm uppercase font-mono" value={data.nomorRangka} onChange={(e) => handleChange('nomorRangka', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">No. Mesin</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm uppercase font-mono" value={data.nomorMesin} onChange={(e) => handleChange('nomorMesin', e.target.value)} />
                  </div>
                </div>
              </div>

              {/* CARD 5: LEASING & PEMBAYARAN */}
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                  <CreditCard size={14} className="text-purple-600"/> Leasing & Ketentuan Angsuran
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Leasing / Bank</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.namaLeasing} onChange={(e) => handleChange('namaLeasing', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nomor Kontrak</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.nomorKontrak} onChange={(e) => handleChange('nomorKontrak', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Angsuran / Bulan (Rp)</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm font-semibold" value={data.angsuranPerBulan} onChange={(e) => handleChange('angsuranPerBulan', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Sisa Tenor</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.sisaTenor} onChange={(e) => handleChange('sisaTenor', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Jatuh Tempo Pembayaran</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.jatuhTempoTgl} onChange={(e) => handleChange('jatuhTempoTgl', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Uang Kompensasi Over Kredit (Rp)</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm font-bold text-emerald-600" value={data.uangKompensasi} onChange={(e) => handleChange('uangKompensasi', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Terbilang Uang Kompensasi</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm italic" value={data.terbilangKompensasi} onChange={(e) => handleChange('terbilangKompensasi', e.target.value)} />
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
              <PrintWrapper documentName={`OverKredit_${data.pihak1Nama.replace(/\s+/g, '_')}`} price={15000} />
           </div>
        </div>
      </main>
    </div>
  );
}
