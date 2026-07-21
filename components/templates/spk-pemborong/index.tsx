'use client';

import React, { useState } from 'react';
import { useFormSync } from '@/lib/hooks/useFormSync';
import { PrintWrapper } from '@/components/shared/PrintWrapper';

const INITIAL_DATA = {
  hari: 'Senin',
  tanggal: '01',
  bulan: 'Agustus',
  tahun: '2026',
  
  // Pihak Pertama (Pemilik)
  pihak1Nama: '',
  pihak1Nik: '',
  pihak1Alamat: '',
  pihak1NoHp: '',
  
  // Pihak Kedua (Pemborong)
  pihak2Nama: '',
  pihak2Nik: '',
  pihak2Alamat: '',
  pihak2Perusahaan: '',
  
  // Detail Pekerjaan
  jenisPekerjaan: 'Pembangunan Rumah Tinggal 1 Lantai',
  lokasiPekerjaan: '',
  waktuPelaksanaan: '90 (sembilan puluh)',
  mulaiKerja: '15 Agustus 2026',
  selesaiKerja: '15 November 2026',
  
  // Nilai Borongan & Pembayaran
  nilaiKontrak: '150.000.000',
  nilaiTerbilang: 'Seratus Lima Puluh Juta Rupiah',
  dpPersen: '30',
  termin1Persen: '30',
  termin2Persen: '35',
  retensiPersen: '5',
  
  // Denda & Garansi
  dendaKeterlambatan: '1 (satu) permil',
  masaGaransi: '3 (tiga) bulan',
};

export default function SpkPemborongTemplate() {
  const { data, handleChange, resetForm } = useFormSync(INITIAL_DATA, 'spk_pemborong_data');
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-black font-serif leading-relaxed text-[12pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto ${className}`}>
      {children}
    </div>
  );

  const DocumentContent = () => (
    <Kertas>
      {/* KOP atau JUDUL */}
      <div className="text-center mb-8">
        <h1 className="font-bold text-lg uppercase underline">SURAT PERJANJIAN PEMBORONGAN PEKERJAAN BANGUNAN</h1>
      </div>

      <div className="text-justify space-y-4">
        <p>Pada hari ini <strong>{data.hari || '.....'}</strong> tanggal <strong>{data.tanggal || '.....'}</strong> bulan <strong>{data.bulan || '.....'}</strong> tahun <strong>{data.tahun || '.....'}</strong>, yang bertanda tangan di bawah ini:</p>

        <table className="w-full ml-4">
          <tbody>
            <tr><td className="w-40 align-top">Nama</td><td className="w-4 align-top">:</td><td><strong>{data.pihak1Nama || '..............................'}</strong></td></tr>
            <tr><td className="w-40 align-top">NIK</td><td className="w-4 align-top">:</td><td>{data.pihak1Nik || '..............................'}</td></tr>
            <tr><td className="w-40 align-top">Alamat</td><td className="w-4 align-top">:</td><td>{data.pihak1Alamat || '..............................'}</td></tr>
            <tr><td className="w-40 align-top">No. HP/WA</td><td className="w-4 align-top">:</td><td>{data.pihak1NoHp || '..............................'}</td></tr>
          </tbody>
        </table>
        <p>Dalam hal ini bertindak untuk dan atas nama diri sendiri, selanjutnya disebut <strong>PIHAK PERTAMA (Pemilik Bangunan)</strong>.</p>

        <table className="w-full ml-4">
          <tbody>
            <tr><td className="w-40 align-top">Nama</td><td className="w-4 align-top">:</td><td><strong>{data.pihak2Nama || '..............................'}</strong></td></tr>
            <tr><td className="w-40 align-top">NIK</td><td className="w-4 align-top">:</td><td>{data.pihak2Nik || '..............................'}</td></tr>
            <tr><td className="w-40 align-top">Perusahaan</td><td className="w-4 align-top">:</td><td>{data.pihak2Perusahaan || '..............................'}</td></tr>
            <tr><td className="w-40 align-top">Alamat</td><td className="w-4 align-top">:</td><td>{data.pihak2Alamat || '..............................'}</td></tr>
          </tbody>
        </table>
        <p>Dalam hal ini bertindak untuk dan atas nama diri sendiri/perusahaan, selanjutnya disebut <strong>PIHAK KEDUA (Pemborong/Kontraktor)</strong>.</p>

        <p>Kedua belah pihak telah sepakat untuk mengikatkan diri dalam Surat Perjanjian Pemborongan Pekerjaan Bangunan dengan ketentuan dan syarat-syarat sebagai berikut:</p>

        <div className="font-bold text-center mt-6 mb-2">PASAL 1<br/>RUANG LINGKUP PEKERJAAN</div>
        <p>PIHAK PERTAMA memberikan tugas kepada PIHAK KEDUA, dan PIHAK KEDUA menerima tugas tersebut untuk melaksanakan pekerjaan borongan berupa <strong>{data.jenisPekerjaan || '................'}</strong> yang berlokasi di <strong>{data.lokasiPekerjaan || '................'}</strong> sesuai dengan spesifikasi material dan gambar kerja yang telah disepakati.</p>

        <div className="font-bold text-center mt-6 mb-2">PASAL 2<br/>NILAI KONTRAK BORONGAN</div>
        <p>Nilai total pekerjaan borongan yang disepakati adalah sebesar <strong>Rp {data.nilaiKontrak || '................'}</strong> (<em>{data.nilaiTerbilang || '................'}</em>). Harga tersebut sudah mencakup biaya material, upah tenaga kerja, dan biaya lain yang timbul selama masa pelaksanaan pekerjaan.</p>

        <div className="font-bold text-center mt-6 mb-2">PASAL 3<br/>TATA CARA PEMBAYARAN (TERMIN)</div>
        <p>Pembayaran akan dilakukan secara bertahap (termin) berdasarkan kemajuan (progres) pekerjaan dengan rincian sebagai berikut:</p>
        <ol className="list-decimal ml-8 space-y-1">
          <li><strong>Uang Muka (Down Payment):</strong> Sebesar {data.dpPersen || '...'}% dibayarkan setelah perjanjian ini ditandatangani dan pekerjaan siap dimulai di lapangan.</li>
          <li><strong>Termin I:</strong> Sebesar {data.termin1Persen || '...'}% dibayarkan setelah progres fisik pekerjaan mencapai target persentase yang disepakati bersama.</li>
          <li><strong>Termin II:</strong> Sebesar {data.termin2Persen || '...'}% dibayarkan setelah pekerjaan selesai 100% dan dilakukan serah terima kunci (BAST).</li>
          <li><strong>Masa Retensi (Garansi):</strong> Sisa pembayaran sebesar {data.retensiPersen || '...'}% ditahan selama masa pemeliharaan (garansi) dan akan dibayarkan penuh setelah masa pemeliharaan berakhir tanpa ada komplain atau kerusakan (cacat kerja).</li>
        </ol>

        <div className="font-bold text-center mt-6 mb-2">PASAL 4<br/>WAKTU PELAKSANAAN PEKERJAAN</div>
        <p>Pekerjaan akan dilaksanakan dalam waktu <strong>{data.waktuPelaksanaan || '...'}</strong> hari kalender, terhitung mulai tanggal <strong>{data.mulaiKerja || '...'}</strong> dan ditargetkan selesai selambat-lambatnya pada tanggal <strong>{data.selesaiKerja || '...'}</strong>.</p>

        <div className="font-bold text-center mt-6 mb-2">PASAL 5<br/>SANKSI KETERLAMBATAN & GARANSI PEMELIHARAAN</div>
        <ol className="list-decimal ml-8 space-y-1">
          <li>Apabila PIHAK KEDUA terlambat menyelesaikan pekerjaan dari batas waktu yang ditentukan tanpa ada alasan keadaan memaksa (Force Majeure) atau persetujuan penambahan waktu dari PIHAK PERTAMA, maka PIHAK KEDUA dikenakan denda keterlambatan sebesar <strong>{data.dendaKeterlambatan || '...'}</strong> dari total nilai kontrak untuk setiap hari keterlambatan.</li>
          <li>PIHAK KEDUA wajib memberikan garansi (Masa Pemeliharaan) selama <strong>{data.masaGaransi || '...'}</strong> terhitung sejak tanggal Serah Terima Pekerjaan. Jika terjadi kerusakan akibat kelalaian pengerjaan dalam rentang waktu tersebut, PIHAK KEDUA wajib memperbaikinya tanpa tambahan biaya.</li>
        </ol>

        <div className="font-bold text-center mt-6 mb-2">PASAL 6<br/>PENUTUP</div>
        <p>Perjanjian ini dibuat dalam rangkap 2 (dua), bermeterai cukup dan mempunyai kekuatan hukum yang sama bagi masing-masing pihak. Segala perselisihan akan diselesaikan secara musyawarah kekeluargaan, dan jika tidak tercapai mufakat akan diselesaikan melalui jalur hukum yang berlaku.</p>

        <div className="flex justify-between items-start mt-12 pt-8">
          <div className="text-center w-1/2">
            <p><strong>PIHAK PERTAMA</strong></p>
            <p className="text-sm">(Pemilik Bangunan)</p>
            <div className="h-24"></div>
            <p className="font-bold underline uppercase">{data.pihak1Nama || '..............................'}</p>
          </div>
          
          <div className="text-center w-1/2">
            <p><strong>PIHAK KEDUA</strong></p>
            <p className="text-sm">(Pemborong/Kontraktor)</p>
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
        
        {/* PANEL KIRI - FORM (disembunyikan saat print) */}
        <div className={`no-print ${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex w-full md:w-[450px] lg:w-[500px] flex-col bg-white border-r border-slate-200 shadow-xl z-10 h-full`}>
          <div className="p-5 border-b border-slate-200 bg-white sticky top-0 z-20 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-800">SPK Pemborong</h2>
              <p className="text-xs text-slate-500">Kontrak Pekerjaan Bangunan</p>
            </div>
            <button onClick={resetForm} className="text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg hover:bg-rose-100 transition-colors">
              Reset
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-24 md:pb-5">
            <div className="space-y-6">
              
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-2">Tanggal Perjanjian</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Hari</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.hari} onChange={(e) => handleChange('hari', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Tanggal</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.tanggal} onChange={(e) => handleChange('tanggal', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Bulan</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.bulan} onChange={(e) => handleChange('bulan', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Tahun</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.tahun} onChange={(e) => handleChange('tahun', e.target.value)} /></div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-2">Pihak Pertama (Pemilik)</h3>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Nama Lengkap</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak1Nama} onChange={(e) => handleChange('pihak1Nama', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">NIK</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak1Nik} onChange={(e) => handleChange('pihak1Nik', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Alamat</label><textarea className="w-full p-2 border border-slate-300 rounded-lg text-sm" rows={2} value={data.pihak1Alamat} onChange={(e) => handleChange('pihak1Alamat', e.target.value)}></textarea></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">No HP/WA</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak1NoHp} onChange={(e) => handleChange('pihak1NoHp', e.target.value)} /></div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-2">Pihak Kedua (Pemborong)</h3>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Nama Kontraktor</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak2Nama} onChange={(e) => handleChange('pihak2Nama', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Nama Perusahaan (Bila ada)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak2Perusahaan} onChange={(e) => handleChange('pihak2Perusahaan', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">NIK</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak2Nik} onChange={(e) => handleChange('pihak2Nik', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Alamat</label><textarea className="w-full p-2 border border-slate-300 rounded-lg text-sm" rows={2} value={data.pihak2Alamat} onChange={(e) => handleChange('pihak2Alamat', e.target.value)}></textarea></div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-2">Detail Pekerjaan</h3>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Jenis Pekerjaan</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.jenisPekerjaan} onChange={(e) => handleChange('jenisPekerjaan', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Lokasi Pekerjaan</label><textarea className="w-full p-2 border border-slate-300 rounded-lg text-sm" rows={2} value={data.lokasiPekerjaan} onChange={(e) => handleChange('lokasiPekerjaan', e.target.value)}></textarea></div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2"><label className="block text-xs font-medium text-slate-600 mb-1">Durasi Kerja (Hari)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.waktuPelaksanaan} onChange={(e) => handleChange('waktuPelaksanaan', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Tgl Mulai</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.mulaiKerja} onChange={(e) => handleChange('mulaiKerja', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Tgl Selesai</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.selesaiKerja} onChange={(e) => handleChange('selesaiKerja', e.target.value)} /></div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-2">Nilai & Termin</h3>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Nilai Kontrak (Angka)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.nilaiKontrak} onChange={(e) => handleChange('nilaiKontrak', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Nilai Kontrak (Terbilang)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.nilaiTerbilang} onChange={(e) => handleChange('nilaiTerbilang', e.target.value)} /></div>
                
                <div className="grid grid-cols-4 gap-2">
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">DP (%)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.dpPersen} onChange={(e) => handleChange('dpPersen', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Trm 1 (%)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.termin1Persen} onChange={(e) => handleChange('termin1Persen', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Trm 2 (%)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.termin2Persen} onChange={(e) => handleChange('termin2Persen', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Retensi (%)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.retensiPersen} onChange={(e) => handleChange('retensiPersen', e.target.value)} /></div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-2">Denda & Garansi</h3>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Denda Keterlambatan</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.dendaKeterlambatan} onChange={(e) => handleChange('dendaKeterlambatan', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Masa Garansi (Retensi)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.masaGaransi} onChange={(e) => handleChange('masaGaransi', e.target.value)} /></div>
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
              <PrintWrapper documentName={`SPK_Pemborong_${data.pihak1Nama.replace(/\s+/g, '_')}`} price={15000} />
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
