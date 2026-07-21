'use client';

import React, { useState } from 'react';
import { useFormSync } from '@/lib/useFormSync';
import { PrintWrapper } from '@/components/shared/PrintWrapper';

const INITIAL_DATA = {
  hari: 'Jumat',
  tanggal: '28',
  bulan: 'Agustus',
  tahun: '2026',
  kotaPembuatan: 'Surabaya',
  
  // Pihak Pertama (Mantan Suami)
  pihak1Nama: '',
  pihak1Nik: '',
  pihak1Umur: '35',
  pihak1Alamat: '',
  
  // Pihak Kedua (Mantan Istri)
  pihak2Nama: '',
  pihak2Nik: '',
  pihak2Umur: '32',
  pihak2Alamat: '',
  
  // Informasi Cerai
  tglPutusanCerai: '15 Juli 2026',
  pengadilanCerai: 'Pengadilan Agama Surabaya',
  noPutusanCerai: '456/Pdt.G/2026/PA.Sby',
  
  // Aset & Proporsi
  daftarHarta: '1. Sebidang tanah dan bangunan rumah di Jl. Mawar No. 10 (Sertifikat Hak Milik No. 12345)\n2. Mobil Honda HRV Tahun 2023 Nopol L 1234 AB\n3. Saldo Rekening Bank Mandiri sebesar Rp 50.000.000,-',
  daftarUtang: '1. Sisa KPR Bank BTN atas rumah di Jl. Mawar No. 10 sebesar Rp 150.000.000,-\n2. Utang Kartu Kredit Bank BCA sebesar Rp 10.000.000,-',
  
  proporsiPembagian: 'Dibagi sama rata masing-masing 50% (Lima Puluh Persen)',
  detailPembagian: '1. Rumah di Jl. Mawar No. 10 diserahkan sepenuhnya kepada PIHAK KEDUA.\n2. Mobil Honda HRV diserahkan sepenuhnya kepada PIHAK PERTAMA.\n3. Saldo Rekening dibagi dua sama rata.\n4. Sisa KPR dilunasi oleh PIHAK KEDUA, sedangkan utang Kartu Kredit dilunasi oleh PIHAK PERTAMA.',
};

export default function GonoGiniTemplate() {
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
    <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-black font-serif leading-relaxed text-[12pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto ${className}`}>
      {children}
    </div>
  );

  const DocumentContent = () => (
    <Kertas>
      {/* KOP atau JUDUL */}
      <div className="text-center mb-8">
        <h1 className="font-bold text-lg uppercase underline">KESEPAKATAN BERSAMA PEMBAGIAN HARTA GONO-GINI</h1>
      </div>

      <div className="text-justify space-y-4">
        <p>Pada hari ini <strong>{data.hari || '.....'}</strong> tanggal <strong>{data.tanggal || '.....'}</strong> bulan <strong>{data.bulan || '.....'}</strong> tahun <strong>{data.tahun || '.....'}</strong> bertempat di <strong>{data.kotaPembuatan || '.....'}</strong>, yang bertanda tangan di bawah ini:</p>

        <table className="w-full ml-4">
          <tbody>
            <tr><td className="w-32 align-top">Nama</td><td className="w-4 align-top">:</td><td><strong>{data.pihak1Nama || '..............................'}</strong></td></tr>
            <tr><td className="w-32 align-top">NIK</td><td className="w-4 align-top">:</td><td>{data.pihak1Nik || '..............................'}</td></tr>
            <tr><td className="w-32 align-top">Umur</td><td className="w-4 align-top">:</td><td>{data.pihak1Umur || '...'} Tahun</td></tr>
            <tr><td className="w-32 align-top">Alamat</td><td className="w-4 align-top">:</td><td>{data.pihak1Alamat || '..............................'}</td></tr>
          </tbody>
        </table>
        <p>Selanjutnya disebut sebagai <strong>PIHAK PERTAMA</strong>.</p>

        <table className="w-full ml-4">
          <tbody>
            <tr><td className="w-32 align-top">Nama</td><td className="w-4 align-top">:</td><td><strong>{data.pihak2Nama || '..............................'}</strong></td></tr>
            <tr><td className="w-32 align-top">NIK</td><td className="w-4 align-top">:</td><td>{data.pihak2Nik || '..............................'}</td></tr>
            <tr><td className="w-32 align-top">Umur</td><td className="w-4 align-top">:</td><td>{data.pihak2Umur || '...'} Tahun</td></tr>
            <tr><td className="w-32 align-top">Alamat</td><td className="w-4 align-top">:</td><td>{data.pihak2Alamat || '..............................'}</td></tr>
          </tbody>
        </table>
        <p>Selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>.</p>

        <p>PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama disebut <strong>PARA PIHAK</strong>. PARA PIHAK dengan ini menerangkan terlebih dahulu hal-hal sebagai berikut:</p>

        <ol className="list-decimal ml-8 space-y-2">
          <li>Bahwa PARA PIHAK sebelumnya adalah suami istri yang sah, namun saat ini telah resmi bercerai berdasarkan Putusan {data.pengadilanCerai || 'Pengadilan'} Nomor <strong>{data.noPutusanCerai || '.....'}</strong> tanggal <strong>{data.tglPutusanCerai || '.....'}</strong>.</li>
          <li>Bahwa selama masa perkawinan, PARA PIHAK telah memperoleh harta kekayaan bersama (Harta Gono-Gini) berupa aset bergerak maupun tidak bergerak, serta memiliki kewajiban hutang bersama yang harus diselesaikan.</li>
          <li>Bahwa untuk menghindari perselisihan hukum di kemudian hari, PARA PIHAK sepakat untuk membagi Harta Gono-Gini tersebut secara damai, musyawarah, dan mufakat di luar pengadilan.</li>
        </ol>

        <div className="font-bold text-center mt-6 mb-2">PASAL 1<br/>OBJEK HARTA BERSAMA DAN HUTANG</div>
        <p>Adapun yang menjadi objek Harta Bersama (Gono-Gini) yang akan dibagi adalah sebagai berikut:</p>
        <div className="ml-8 my-2 whitespace-pre-wrap">{data.daftarHarta || '1. ....................'}</div>
        <p>Selain harta, terdapat pula kewajiban (hutang bersama) yang timbul selama masa perkawinan, yaitu:</p>
        <div className="ml-8 my-2 whitespace-pre-wrap">{data.daftarUtang || '1. .................... (Jika tidak ada, tulis: Nihil)'}</div>

        <div className="font-bold text-center mt-6 mb-2">PASAL 2<br/>PROPORSI DAN CARA PEMBAGIAN</div>
        <p>PARA PIHAK sepakat bahwa Harta Bersama dan Kewajiban (Hutang) tersebut dibagi dengan proporsi: <strong>{data.proporsiPembagian || 'Dibagi sama rata 50:50'}</strong>.</p>
        <p>Adapun rincian detail pelaksanaannya adalah sebagai berikut:</p>
        <div className="ml-8 my-2 whitespace-pre-wrap">{data.detailPembagian || '1. ....................'}</div>

        <div className="font-bold text-center mt-6 mb-2">PASAL 3<br/>PENGALIHAN HAK & PELEPASAN TUNTUTAN</div>
        <ol className="list-decimal ml-8 space-y-2">
          <li>Sejak ditandatanganinya perjanjian ini, masing-masing pihak melepaskan seluruh haknya atas aset yang telah disepakati untuk diserahkan kepada pihak lainnya.</li>
          <li>Apabila diperlukan proses balik nama sertifikat, BPKB, atau dokumen legal lainnya, maka masing-masing pihak berjanji dan mengikatkan diri untuk saling membantu dan menandatangani dokumen yang diperlukan tanpa meminta imbalan apa pun.</li>
          <li>PARA PIHAK saling membebaskan satu sama lain dari segala tuntutan perdata maupun pidana di kemudian hari yang berkaitan dengan Harta Gono-Gini masa perkawinan ini.</li>
        </ol>

        <div className="font-bold text-center mt-6 mb-2">PASAL 4<br/>PENUTUP</div>
        <p>Perjanjian Kesepakatan Bersama ini dibuat dan ditandatangani oleh PARA PIHAK dalam keadaan sadar, sehat jasmani dan rohani, tanpa adanya paksaan, tekanan, atau pengaruh dari pihak mana pun. Dibuat dalam rangkap 2 (dua), bermeterai cukup dan memiliki kekuatan hukum yang sama.</p>

        <div className="flex justify-between items-start mt-12 pt-8">
          <div className="text-center w-1/2">
            <p><strong>PIHAK PERTAMA</strong></p>
            <div className="h-24 flex items-center justify-center">
              <span className="text-[10px] border border-black p-1">Meterai 10000</span>
            </div>
            <p className="font-bold underline uppercase">{data.pihak1Nama || '..............................'}</p>
          </div>
          
          <div className="text-center w-1/2">
            <p><strong>PIHAK KEDUA</strong></p>
            <div className="h-24 flex items-center justify-center">
              <span className="text-[10px] border border-black p-1">Meterai 10000</span>
            </div>
            <p className="font-bold underline uppercase">{data.pihak2Nama || '..............................'}</p>
          </div>
        </div>
      </div>
    </Kertas>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 font-sans">
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden h-screen print:h-auto print:overflow-visible">
        
        {/* PANEL KIRI - FORM */}
        <div className={`no-print ${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex w-full md:w-[450px] lg:w-[500px] flex-col bg-white border-r border-slate-200 shadow-xl z-10 h-full`}>
          <div className="p-5 border-b border-slate-200 bg-white sticky top-0 z-20">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h2 className="text-lg font-bold text-slate-800">Kesepakatan Gono-Gini</h2>
                <p className="text-xs text-slate-500">Pembagian Harta Pasca Cerai</p>
              </div>
              <button onClick={resetForm} className="text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg hover:bg-rose-100 transition-colors">
                Reset
              </button>
            </div>
            
            {/* DISCLAIMER EKSTRA KERAS */}
            <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-lg">
               <p className="text-[10px] font-bold text-amber-700 leading-tight">PERHATIAN:</p>
               <p className="text-[10px] text-amber-700 leading-tight mt-1">Gunakan ini hanya jika kedua belah pihak <b>SEPENGAKAT/DAMAI</b>. Jika masih ada sengketa dan perebutan paksa, gunakan jasa pengacara untuk mengajukan gugatan harta bersama ke Pengadilan.</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-24 md:pb-5">
            <div className="space-y-6">
              
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-2">Tempat & Tanggal Kesepakatan</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Kota</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.kotaPembuatan} onChange={(e) => handleChange('kotaPembuatan', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Hari</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.hari} onChange={(e) => handleChange('hari', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Tanggal</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.tanggal} onChange={(e) => handleChange('tanggal', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Bulan & Tahun</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={`${data.bulan} ${data.tahun}`} onChange={(e) => {
                    const parts = e.target.value.split(' ');
                    handleChange('bulan', parts[0] || '');
                    handleChange('tahun', parts.slice(1).join(' '));
                  }} /></div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-2">Pihak Pertama (Mantan Suami/Istri 1)</h3>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Nama Lengkap</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak1Nama} onChange={(e) => handleChange('pihak1Nama', e.target.value)} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">NIK</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak1Nik} onChange={(e) => handleChange('pihak1Nik', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Umur (Tahun)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak1Umur} onChange={(e) => handleChange('pihak1Umur', e.target.value)} /></div>
                </div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Alamat Saat Ini</label><textarea className="w-full p-2 border border-slate-300 rounded-lg text-sm" rows={2} value={data.pihak1Alamat} onChange={(e) => handleChange('pihak1Alamat', e.target.value)}></textarea></div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-2">Pihak Kedua (Mantan Suami/Istri 2)</h3>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Nama Lengkap</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak2Nama} onChange={(e) => handleChange('pihak2Nama', e.target.value)} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">NIK</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak2Nik} onChange={(e) => handleChange('pihak2Nik', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Umur (Tahun)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak2Umur} onChange={(e) => handleChange('pihak2Umur', e.target.value)} /></div>
                </div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Alamat Saat Ini</label><textarea className="w-full p-2 border border-slate-300 rounded-lg text-sm" rows={2} value={data.pihak2Alamat} onChange={(e) => handleChange('pihak2Alamat', e.target.value)}></textarea></div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-2">Informasi Putusan Cerai</h3>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Tgl Putusan Cerai</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.tglPutusanCerai} onChange={(e) => handleChange('tglPutusanCerai', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Nama Pengadilan</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pengadilanCerai} onChange={(e) => handleChange('pengadilanCerai', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">No. Putusan / Akta Cerai</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.noPutusanCerai} onChange={(e) => handleChange('noPutusanCerai', e.target.value)} /></div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-2">Daftar Objek Harta & Utang Bersama</h3>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Daftar Aset (Rumah, Mobil, Saldo Bank)</label>
                  <textarea className="w-full p-3 border border-slate-300 rounded-lg text-sm leading-relaxed" rows={4} value={data.daftarHarta} onChange={(e) => handleChange('daftarHarta', e.target.value)}></textarea>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Daftar Kewajiban/Utang Bersama (Sisa KPR, dll)</label>
                  <textarea className="w-full p-3 border border-slate-300 rounded-lg text-sm leading-relaxed" rows={3} value={data.daftarUtang} onChange={(e) => handleChange('daftarUtang', e.target.value)}></textarea>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-2">Detail Pembagian</h3>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Proporsi Pembagian Umum (Misal: 50:50)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.proporsiPembagian} onChange={(e) => handleChange('proporsiPembagian', e.target.value)} /></div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Rincian Siapa Mendapat Apa</label>
                  <textarea className="w-full p-3 border border-slate-300 rounded-lg text-sm leading-relaxed" rows={5} value={data.detailPembagian} onChange={(e) => handleChange('detailPembagian', e.target.value)}></textarea>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* PANEL KANAN - PREVIEW */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName={`Gono_Gini_${data.pihak1Nama.replace(/\s+/g, '_')}`} price={20000} />
           </div>
        </div>
      </main>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-neutral-900/90 backdrop-blur-xl rounded-2xl flex p-1.5 shadow-2xl border border-neutral-800 font-sans">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold transition-all duration-300 ${mobileView === 'editor' ? 'bg-neutral-800 text-white shadow-lg' : 'text-neutral-500 hover:text-neutral-300'}`}><span className="block text-[10px] mb-0.5 opacity-60">Kembali ke</span>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold transition-all duration-300 ${mobileView === 'preview' ? 'bg-emerald-600 text-white shadow-lg' : 'text-neutral-500 hover:text-neutral-300'}`}><span className="block text-[10px] mb-0.5 opacity-60">Lihat Hasil</span>PREVIEW</button>
      </div>

      {/* GLOBAL CSS PRINT */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          html, body { height: auto !important; overflow: visible !important; background: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: static !important; width: 100%; background: white; }
          * { box-sizing: border-box !important; }
        }
      ` }} />
    </div>
  );
}
