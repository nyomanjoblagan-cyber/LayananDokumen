'use client';

import React, { useState } from 'react';
import { useFormSync } from '@/lib/useFormSync';
import PrintWrapper from '@/components/PrintWrapper';
import Link from 'next/link';
import { Printer, ArrowLeftCircle, Edit3, FileText, RotateCcw, User, ShieldCheck, Car } from 'lucide-react';

const INITIAL_DATA = {
  kotaSurat: 'Surabaya',
  tanggalSurat: '18 November 2026',
  
  // Pemberi Kuasa (Sesuai KTP & STNK Asli)
  namaPemberi: 'AGUS SETIAWAN',
  nikPemberi: '3578012345670001',
  pekerjaanPemberi: 'Wiraswasta',
  alamatPemberi: 'Jl. Manyar Kertoarjo No. 25, RT 03/RW 05, Gubeng, Surabaya',
  noHpPemberi: '081234567890',
  
  // Penerima Kuasa (Yang Datang ke Samsat)
  namaPenerima: 'BAYU ADITYA',
  nikPenerima: '3578029876540003',
  pekerjaanPenerima: 'Karyawan Swasta',
  alamatPenerima: 'Jl. Dharmawangsa No. 80, Surabaya',
  noHpPenerima: '081987654321',
  
  // Data Kendaraan
  nomorPolisi: 'L 5678 XY',
  merkType: 'Toyota Kijang Innova 2.0 G',
  jenisKendaraan: 'Mobil Penumpang / Minibus',
  tahunPembuatan: '2021',
  warnaKendaraan: 'Putih Mutiara',
  nomorRangka: 'MHKW1234567890123',
  nomorMesin: '1TR-9876543',
  nomorBpkb: 'L-12345678',
  
  // Keperluan Pengurusan
  tujuanKuasa: 'Pembayaran Pajak Kendaraan Bermotor (PKB) Tahunan / 5 Tahunan, Pengesahan STNK, serta pengurusan administrasi terkait pada Kantor Bersama SAMSAT setempat.',
};

export default function KuasaSamsatTemplate() {
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
        <h1 className="font-bold text-base md:text-lg uppercase underline tracking-wide">SURAT KUASA KHUSUS</h1>
        <p className="text-xs text-slate-600 mt-1 uppercase tracking-widest">(PENGURUSAN PAJAK KENDARAAN BERMOTOR / STNK DI KANTOR SAMSAT)</p>
      </div>

      <div className="text-justify space-y-3.5 text-xs md:text-sm">
        <p>Saya yang bertanda tangan di bawah ini:</p>

        <table className="w-full ml-4">
          <tbody>
            <tr><td className="w-36 align-top">Nama Lengkap</td><td className="w-3 align-top">:</td><td><strong>{data.namaPemberi || '..............................'}</strong></td></tr>
            <tr><td className="w-36 align-top">NIK / No. KTP</td><td className="w-3 align-top">:</td><td>{data.nikPemberi || '..............................'}</td></tr>
            <tr><td className="w-36 align-top">Pekerjaan</td><td className="w-3 align-top">:</td><td>{data.pekerjaanPemberi || '..............................'}</td></tr>
            <tr><td className="w-36 align-top">Alamat Domisili</td><td className="w-3 align-top">:</td><td>{data.alamatPemberi || '..............................'}</td></tr>
            <tr><td className="w-36 align-top">Nomor HP/WA</td><td className="w-3 align-top">:</td><td>{data.noHpPemberi || '..............................'}</td></tr>
          </tbody>
        </table>
        <p>Sebagai pemilik sah kendaraan bermotor yang sah, selanjutnya disebut <strong>PEMBERI KUASA</strong>.</p>

        <p>Dengan ini memberikan <strong>KUASA KHUSUS</strong> kepada:</p>

        <table className="w-full ml-4">
          <tbody>
            <tr><td className="w-36 align-top">Nama Lengkap</td><td className="w-3 align-top">:</td><td><strong>{data.namaPenerima || '..............................'}</strong></td></tr>
            <tr><td className="w-36 align-top">NIK / No. KTP</td><td className="w-3 align-top">:</td><td>{data.nikPenerima || '..............................'}</td></tr>
            <tr><td className="w-36 align-top">Pekerjaan</td><td className="w-3 align-top">:</td><td>{data.pekerjaanPenerima || '..............................'}</td></tr>
            <tr><td className="w-36 align-top">Alamat Domisili</td><td className="w-3 align-top">:</td><td>{data.alamatPenerima || '..............................'}</td></tr>
            <tr><td className="w-36 align-top">Nomor HP/WA</td><td className="w-3 align-top">:</td><td>{data.noHpPenerima || '..............................'}</td></tr>
          </tbody>
        </table>
        <p>Selanjutnya disebut sebagai <strong>PENERIMA KUASA</strong>.</p>

        <div className="font-bold text-center mt-4 mb-1">KHUSUS</div>
        <p>Untuk dan atas nama Pemberi Kuasa mengurus, menandatangani formulir, serta melakukan proses <strong>{data.tujuanKuasa}</strong> atas kendaraan bermotor dengan identitas sebagai berikut:</p>

        <table className="w-full ml-4 bg-slate-50 p-2 border border-slate-200">
          <tbody>
            <tr><td className="w-36 align-top">Nomor Polisi (Plat)</td><td className="w-3 align-top">:</td><td><strong className="font-mono text-sm">{data.nomorPolisi || '..........'}</strong></td></tr>
            <tr><td className="w-36 align-top">Merk / Tipe</td><td className="w-3 align-top">:</td><td>{data.merkType || '..........'}</td></tr>
            <tr><td className="w-36 align-top">Jenis Kendaraan</td><td className="w-3 align-top">:</td><td>{data.jenisKendaraan || '..........'}</td></tr>
            <tr><td className="w-36 align-top">Tahun / Warna</td><td className="w-3 align-top">:</td><td>{data.tahunPembuatan} / {data.warnaKendaraan}</td></tr>
            <tr><td className="w-36 align-top">Nomor Rangka</td><td className="w-3 align-top">:</td><td className="font-mono">{data.nomorRangka || '..........'}</td></tr>
            <tr><td className="w-36 align-top">Nomor Mesin</td><td className="w-3 align-top">:</td><td className="font-mono">{data.nomorMesin || '..........'}</td></tr>
            <tr><td className="w-36 align-top">Nomor BPKB</td><td className="w-3 align-top">:</td><td className="font-mono">{data.nomorBpkb || '..........'}</td></tr>
          </tbody>
        </table>

        <p>Penerima Kuasa berhak menghadap petugas berwenang di Kantor Bersama SAMSAT, menyerahkan dokumen pendukung, membayar biaya retribusi pajak resmi, menandatangani kuitansi tanda terima, serta menerima kembali lembar STNK/SKPD asli yang telah disahkan.</p>

        <p>Segala akibat hukum dan beban keuangan resmi yang timbul sehubungan dengan pengurusan kendaraan ini menjadi tanggung jawab Pemberi Kuasa sepenuhnya. Surat kuasa ini berlaku khusus untuk keperluan tersebut dan tidak dapat dialihkan kepada pihak lain (tanpa hak substitusi).</p>

        <p>Demikian Surat Kuasa Khusus ini dibuat dengan sebenarnya dalam keadaan sadar dan tanpa paksaan dari pihak mana pun, serta dibubuhi meterai Rp 10.000 untuk dipergunakan sebagaimana mestinya.</p>

        <div className="flex justify-between items-start mt-8 pt-4">
          <div className="text-center w-1/2">
            <p>Penerima Kuasa,</p>
            <div className="h-20 flex items-center justify-center">
              <span className="text-[9px] border border-slate-300 text-slate-400 p-1">Tanda Tangan</span>
            </div>
            <p className="font-bold underline uppercase">{data.namaPenerima || '..............................'}</p>
          </div>
          <div className="text-center w-1/2">
            <p>{data.kotaSurat}, {data.tanggalSurat}</p>
            <p>Pemberi Kuasa,</p>
            <div className="h-20 flex items-center justify-center">
              <span className="text-[9px] border border-slate-300 text-slate-400 p-1">Meterai 10.000</span>
            </div>
            <p className="font-bold underline uppercase">{data.namaPemberi || '..............................'}</p>
          </div>
        </div>
      </div>
    </Kertas>
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          html, body { height: auto !important; overflow: visible !important; background: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: static !important; width: 100%; background: white; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-[999] border-b border-slate-800 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-purple-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Kuasa Pajak STNK Samsat</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-300 hidden md:inline-block">
                SAMSAT FORMAL
            </span>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-purple-600 hover:bg-purple-500 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-900/50 active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
            </button>
          </div>
      </div>

      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-[998] no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'editor' ? 'text-purple-700 border-b-2 border-purple-700 bg-purple-50' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'preview' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50' : 'text-slate-500'}`}>
          <Printer size={16} /> Preview
        </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[540px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
            <div className="p-5 bg-white border-b border-slate-200 flex justify-between items-center shrink-0">
                <h2 className="font-black text-slate-800 uppercase tracking-tight text-sm flex items-center gap-2">
                  <FileText size={18} className="text-purple-600" /> Editor Kuasa Samsat
                </h2>
                <button onClick={resetForm} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar pb-32">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                  <ShieldCheck size={14} className="text-purple-600"/> Tanggal & Tempat
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Kota Surat</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.kotaSurat} onChange={(e) => handleChange('kotaSurat', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tanggal Surat</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.tanggalSurat} onChange={(e) => handleChange('tanggalSurat', e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                  <User size={14} className="text-purple-600"/> Pemberi Kuasa (Pemilik Sesuai STNK)
                </h3>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Lengkap</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm uppercase" value={data.namaPemberi} onChange={(e) => handleChange('namaPemberi', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">NIK / No. KTP</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.nikPemberi} onChange={(e) => handleChange('nikPemberi', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Pekerjaan</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pekerjaanPemberi} onChange={(e) => handleChange('pekerjaanPemberi', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Alamat Domisili</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.alamatPemberi} onChange={(e) => handleChange('alamatPemberi', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nomor HP/WA</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.noHpPemberi} onChange={(e) => handleChange('noHpPemberi', e.target.value)} />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                  <User size={14} className="text-purple-600"/> Penerima Kuasa (Yang Mengurus)
                </h3>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama Lengkap</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm uppercase" value={data.namaPenerima} onChange={(e) => handleChange('namaPenerima', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">NIK / No. KTP</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.nikPenerima} onChange={(e) => handleChange('nikPenerima', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Pekerjaan</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pekerjaanPenerima} onChange={(e) => handleChange('pekerjaanPenerima', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Alamat Domisili</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.alamatPenerima} onChange={(e) => handleChange('alamatPenerima', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nomor HP/WA</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.noHpPenerima} onChange={(e) => handleChange('noHpPenerima', e.target.value)} />
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Car size={14} className="text-purple-600"/> Identitas Kendaraan Bermotor
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nomor Polisi (Plat)</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm uppercase font-mono font-bold" value={data.nomorPolisi} onChange={(e) => handleChange('nomorPolisi', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Jenis Kendaraan</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.jenisKendaraan} onChange={(e) => handleChange('jenisKendaraan', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Merk / Tipe</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.merkType} onChange={(e) => handleChange('merkType', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tahun / Warna</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={`${data.tahunPembuatan} / ${data.warnaKendaraan}`} onChange={(e) => {
                      const parts = e.target.value.split('/');
                      handleChange('tahunPembuatan', parts[0]?.trim() || '');
                      handleChange('warnaKendaraan', parts[1]?.trim() || '');
                    }} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nomor Rangka</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm uppercase font-mono" value={data.nomorRangka} onChange={(e) => handleChange('nomorRangka', e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nomor Mesin</label>
                    <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm uppercase font-mono" value={data.nomorMesin} onChange={(e) => handleChange('nomorMesin', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nomor BPKB</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm uppercase font-mono" value={data.nomorBpkb} onChange={(e) => handleChange('nomorBpkb', e.target.value)} />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Tujuan Pengurusan Kuasa</label>
                  <textarea className="w-full p-2 border border-slate-300 rounded-lg text-xs" rows={2} value={data.tujuanKuasa} onChange={(e) => handleChange('tujuanKuasa', e.target.value)}></textarea>
                </div>
              </div>
            </div>
        </aside>

        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName={`KuasaSamsat_${data.nomorPolisi.replace(/\s+/g, '_')}`} price={10000} />
           </div>
        </div>
      </main>
    </div>
  );
}
