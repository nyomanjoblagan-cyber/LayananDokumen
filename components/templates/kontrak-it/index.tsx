'use client';

import React, { useState } from 'react';
import { useFormSync } from '@/lib/useFormSync';
import PrintWrapper from '@/components/PrintWrapper';

const INITIAL_DATA = {
  hari: 'Rabu',
  tanggal: '15',
  bulan: 'September',
  tahun: '2026',
  
  // Pihak Pertama (Klien)
  pihak1Nama: '',
  pihak1Nik: '',
  pihak1Perusahaan: '',
  pihak1Alamat: '',
  
  // Pihak Kedua (Developer/Freelancer)
  pihak2Nama: '',
  pihak2Nik: '',
  pihak2Portofolio: 'https://github.com/developer',
  pihak2Alamat: '',
  
  // Detail Proyek
  namaProyek: 'Pembuatan Website E-Commerce',
  platformTeknologi: 'Next.js, React, Node.js, PostgreSQL',
  batasRevisi: '3 (tiga) kali pada fase UI/UX',
  
  // Nilai Kontrak & Termin
  nilaiProyekTotal: '35.000.000',
  nilaiTerbilang: 'Tiga Puluh Lima Juta Rupiah',
  dpPersen: '40',
  termin1Persen: '40',
  termin2Persen: '20',
  
  // Waktu Pengerjaan
  durasiPengerjaan: '60 (enam puluh)',
  mulaiKerja: '20 September 2026',
  selesaiKerja: '20 November 2026',
  
  // Maintenance
  masaMaintenance: '30 (tiga puluh) hari kalender',
};

export default function KontrakItTemplate() {
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
        <h1 className="font-bold text-lg uppercase underline">KONTRAK JASA PEMBUATAN SOFTWARE / WEBSITE</h1>
      </div>

      <div className="text-justify space-y-4">
        <p>Pada hari ini <strong>{data.hari || '.....'}</strong> tanggal <strong>{data.tanggal || '.....'}</strong> bulan <strong>{data.bulan || '.....'}</strong> tahun <strong>{data.tahun || '.....'}</strong>, yang bertanda tangan di bawah ini:</p>

        <table className="w-full ml-4">
          <tbody>
            <tr><td className="w-32 align-top">Nama Lengkap</td><td className="w-4 align-top">:</td><td><strong>{data.pihak1Nama || '..............................'}</strong></td></tr>
            <tr><td className="w-32 align-top">NIK / Paspor</td><td className="w-4 align-top">:</td><td>{data.pihak1Nik || '..............................'}</td></tr>
            <tr><td className="w-32 align-top">Instansi</td><td className="w-4 align-top">:</td><td>{data.pihak1Perusahaan || '..............................'}</td></tr>
            <tr><td className="w-32 align-top">Alamat</td><td className="w-4 align-top">:</td><td>{data.pihak1Alamat || '..............................'}</td></tr>
          </tbody>
        </table>
        <p>Bertindak atas nama pribadi / perusahaan, selanjutnya disebut <strong>PIHAK PERTAMA (Klien)</strong>.</p>

        <table className="w-full ml-4">
          <tbody>
            <tr><td className="w-32 align-top">Nama Lengkap</td><td className="w-4 align-top">:</td><td><strong>{data.pihak2Nama || '..............................'}</strong></td></tr>
            <tr><td className="w-32 align-top">NIK</td><td className="w-4 align-top">:</td><td>{data.pihak2Nik || '..............................'}</td></tr>
            <tr><td className="w-32 align-top">Portofolio</td><td className="w-4 align-top">:</td><td>{data.pihak2Portofolio || '..............................'}</td></tr>
            <tr><td className="w-32 align-top">Alamat</td><td className="w-4 align-top">:</td><td>{data.pihak2Alamat || '..............................'}</td></tr>
          </tbody>
        </table>
        <p>Bertindak selaku Konsultan IT / Web Developer independen, selanjutnya disebut <strong>PIHAK KEDUA (Developer)</strong>.</p>

        <p>Kedua belah pihak telah sepakat untuk mengikatkan diri dalam Kontrak Jasa Pembuatan Software / Website dengan ketentuan dan syarat mutlak sebagai berikut:</p>

        <div className="font-bold text-center mt-6 mb-2">PASAL 1<br/>RUANG LINGKUP PEKERJAAN</div>
        <p>PIHAK PERTAMA menugaskan PIHAK KEDUA untuk membangun dan mendevelop sistem/aplikasi/website dengan rincian:</p>
        <table className="w-full ml-4 mb-2">
          <tbody>
            <tr><td className="w-40 align-top">Nama Proyek</td><td className="w-4 align-top">:</td><td><strong>{data.namaProyek || '..............................'}</strong></td></tr>
            <tr><td className="w-40 align-top">Platform & Teknologi</td><td className="w-4 align-top">:</td><td>{data.platformTeknologi || '..............................'}</td></tr>
          </tbody>
        </table>

        <div className="font-bold text-center mt-6 mb-2">PASAL 2<br/>NILAI KONTRAK & TERMIN PEMBAYARAN</div>
        <p>Total nilai kontrak jasa untuk pembuatan proyek tersebut adalah sebesar <strong>Rp {data.nilaiProyekTotal || '................'}</strong> (<em>{data.nilaiTerbilang || '................'}</em>), dengan skema pembayaran bertahap (Termin) sebagai berikut:</p>
        <ol className="list-decimal ml-8 space-y-1">
          <li><strong>Termin I (Uang Muka / DP):</strong> Sebesar {data.dpPersen || '...'}% dibayarkan saat kontrak ini ditandatangani untuk memulai pekerjaan desain (Wireframe/UI).</li>
          <li><strong>Termin II:</strong> Sebesar {data.termin1Persen || '...'}% dibayarkan saat sistem/website sudah selesai dibangun dan diunggah ke server <em>Staging</em> (Uji Coba).</li>
          <li><strong>Termin III (Pelunasan):</strong> Sebesar {data.termin2Persen || '...'}% dibayarkan setelah seluruh revisi selesai dan sistem siap diunggah (*Deploy*) ke server Utama (Production/Live).</li>
        </ol>

        <div className="font-bold text-center mt-6 mb-2">PASAL 3<br/>BATASAN REVISI DAN PENAMBAHAN FITUR</div>
        <ol className="list-decimal ml-8 space-y-1">
          <li>Revisi desain atau fitur (minor) dibatasi maksimal sebanyak <strong>{data.batasRevisi || '...'}</strong> setelah presentasi hasil di server <em>Staging</em>.</li>
          <li>Segala permintaan penambahan fitur baru (Major Change/Scope Creep) yang berada di luar spesifikasi awal akan dikenakan <strong>BIAYA TAMBAHAN</strong> dan wajib dibuatkan <em>Adendum</em> secara terpisah.</li>
        </ol>

        <div className="font-bold text-center mt-6 mb-2">PASAL 4<br/>HAK KEPEMILIKAN SOURCE CODE (KLAUSUL PENAHANAN)</div>
        <p>PIHAK KEDUA selaku <em>Developer</em> <strong>HANYA</strong> akan menyerahkan Hak Cipta, akses CPanel/Hosting, Database, dan <strong><em>Source Code</em></strong> utama kepada PIHAK PERTAMA <strong>SETELAH</strong> pembayaran Termin III (Pelunasan 100%) diterima oleh PIHAK KEDUA. Apabila terjadi wanprestasi atau penundaan pembayaran dari PIHAK PERTAMA, maka PIHAK KEDUA berhak menahan (*take-down*) sistem yang ada di server uji coba (*Staging*).</p>

        <div className="font-bold text-center mt-6 mb-2">PASAL 5<br/>WAKTU PENGERJAAN & MAINTENANCE</div>
        <ol className="list-decimal ml-8 space-y-1">
          <li>Waktu pengerjaan proyek adalah <strong>{data.durasiPengerjaan || '...'} hari kerja</strong> sejak DP diterima, terhitung mulai tanggal <strong>{data.mulaiKerja || '.....'}</strong> s.d. <strong>{data.selesaiKerja || '.....'}</strong>.</li>
          <li>PIHAK KEDUA memberikan layanan <em>Maintenance</em> (Pemeliharaan & Bug Fixing gratis) selama <strong>{data.masaMaintenance || '...'}</strong> setelah proyek dinyatakan <em>Live</em>. Maintenance tidak termasuk penambahan fitur baru.</li>
        </ol>

        <div className="font-bold text-center mt-6 mb-2">PASAL 6<br/>PENUTUP</div>
        <p>Perjanjian ini dibuat dalam rangkap 2 (dua), bermeterai cukup dan memiliki kekuatan hukum yang mengikat bagi kedua belah pihak.</p>

        <div className="flex justify-between items-start mt-12 pt-8">
          <div className="text-center w-1/2">
            <p><strong>PIHAK PERTAMA</strong></p>
            <p className="text-sm">(Klien)</p>
            <div className="h-24"></div>
            <p className="font-bold underline uppercase">{data.pihak1Nama || '..............................'}</p>
          </div>
          
          <div className="text-center w-1/2">
            <p><strong>PIHAK KEDUA</strong></p>
            <p className="text-sm">(Developer)</p>
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
                <h2 className="text-lg font-bold text-slate-800">Kontrak IT & Web Dev</h2>
                <p className="text-xs text-slate-500">Perjanjian Freelance Developer</p>
              </div>
              <button onClick={resetForm} className="text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg hover:bg-rose-100 transition-colors">
                Reset
              </button>
            </div>
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-3 rounded-r-lg">
               <p className="text-[10px] font-bold text-emerald-700 leading-tight">SOURCE CODE SECURED:</p>
               <p className="text-[10px] text-emerald-700 leading-tight mt-1">Template kontrak ini mengunci hak Anda menahan serah terima <i>Source Code</i> dan akses Server/CPanel hingga klien membayar lunas 100% Termin 3.</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-24 md:pb-5">
            <div className="space-y-6">
              
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-2">Tanggal Penandatanganan</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Hari</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.hari} onChange={(e) => handleChange('hari', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Tanggal</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.tanggal} onChange={(e) => handleChange('tanggal', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Bulan</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.bulan} onChange={(e) => handleChange('bulan', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Tahun</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.tahun} onChange={(e) => handleChange('tahun', e.target.value)} /></div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-2">Pihak Pertama (Klien)</h3>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Nama Lengkap / PIC</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak1Nama} onChange={(e) => handleChange('pihak1Nama', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Nama Instansi / Perusahaan</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak1Perusahaan} onChange={(e) => handleChange('pihak1Perusahaan', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">NIK KTP</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak1Nik} onChange={(e) => handleChange('pihak1Nik', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Alamat Instansi / Klien</label><textarea className="w-full p-2 border border-slate-300 rounded-lg text-sm" rows={2} value={data.pihak1Alamat} onChange={(e) => handleChange('pihak1Alamat', e.target.value)}></textarea></div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-2">Pihak Kedua (Developer)</h3>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Nama Lengkap Freelancer</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak2Nama} onChange={(e) => handleChange('pihak2Nama', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Link Portofolio (Opsional)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak2Portofolio} onChange={(e) => handleChange('pihak2Portofolio', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">NIK KTP</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak2Nik} onChange={(e) => handleChange('pihak2Nik', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Alamat Domisili</label><textarea className="w-full p-2 border border-slate-300 rounded-lg text-sm" rows={2} value={data.pihak2Alamat} onChange={(e) => handleChange('pihak2Alamat', e.target.value)}></textarea></div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-2">Spesifikasi Proyek</h3>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Nama Proyek / Aplikasi</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.namaProyek} onChange={(e) => handleChange('namaProyek', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Platform Teknologi (Stack)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.platformTeknologi} onChange={(e) => handleChange('platformTeknologi', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Batasan Revisi Maksimal</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.batasRevisi} onChange={(e) => handleChange('batasRevisi', e.target.value)} /></div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-2">Harga, Termin, & Waktu</h3>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Total Nilai Proyek (Angka)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.nilaiProyekTotal} onChange={(e) => handleChange('nilaiProyekTotal', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Total Nilai (Terbilang)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.nilaiTerbilang} onChange={(e) => handleChange('nilaiTerbilang', e.target.value)} /></div>
                
                <div className="grid grid-cols-3 gap-2">
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">DP Trm 1 (%)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.dpPersen} onChange={(e) => handleChange('dpPersen', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Trm 2 (%)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.termin1Persen} onChange={(e) => handleChange('termin1Persen', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Pelunasan (%)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.termin2Persen} onChange={(e) => handleChange('termin2Persen', e.target.value)} /></div>
                </div>

                <div className="grid grid-cols-3 gap-2 pt-2">
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Durasi Kerja</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.durasiPengerjaan} onChange={(e) => handleChange('durasiPengerjaan', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Tgl Mulai</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.mulaiKerja} onChange={(e) => handleChange('mulaiKerja', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Tgl Selesai</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.selesaiKerja} onChange={(e) => handleChange('selesaiKerja', e.target.value)} /></div>
                </div>

                <div><label className="block text-xs font-medium text-slate-600 mb-1">Masa Garansi / Maintenance Bebas Bug</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.masaMaintenance} onChange={(e) => handleChange('masaMaintenance', e.target.value)} /></div>
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
              <PrintWrapper documentName={`Kontrak_IT_${data.namaProyek.replace(/\s+/g, '_')}`} price={25000} />
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
