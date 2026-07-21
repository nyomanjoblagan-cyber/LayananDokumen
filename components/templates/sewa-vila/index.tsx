'use client';

import React, { useState } from 'react';
import { useFormSync } from '@/lib/useFormSync';
import PrintWrapper from '@/components/PrintWrapper';
import Link from 'next/link';
import { Printer, ArrowLeftCircle, Edit3, FileText, RotateCcw, User } from 'lucide-react';

const INITIAL_DATA = {
  hari: 'Senin',
  tanggal: '01',
  bulan: 'September',
  tahun: '2026',
  
  // Pihak Pertama (Pemilik)
  pihak1Nama: '',
  pihak1Nik: '',
  pihak1Alamat: '',
  pihak1NoHp: '',
  
  // Pihak Kedua (Penyewa)
  pihak2Nama: '',
  pihak2NikKitas: '',
  pihak2Kewarganegaraan: '',
  pihak2Alamat: '',
  
  // Objek Sewa
  namaProperti: 'Villa Seminyak Asri',
  alamatProperti: 'Jl. Kayu Aya No. 100, Seminyak, Kuta, Bali',
  fasilitasProperti: 'Full Furnished, Private Pool, 3 Bedrooms, Listrik 7700W',
  
  // Waktu Sewa
  durasiSewa: '5 (lima)',
  mulaiSewa: '01 September 2026',
  akhirSewa: '31 Agustus 2031',
  
  // Harga & Pembayaran
  hargaSewaTotal: '750.000.000',
  hargaTerbilang: 'Tujuh Ratus Lima Puluh Juta Rupiah',
  metodePembayaran: 'Lunas 100% via Transfer Bank BCA',
  
  // Security Deposit
  securityDeposit: '25.000.000',
};

export default function SewaVilaTemplate() {
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
        <h1 className="font-bold text-lg uppercase underline">PERJANJIAN SEWA MENYEWA PROPERTI JANGKA PANJANG (LEASEHOLD)</h1>
      </div>

      <div className="text-justify space-y-4">
        <p>Pada hari ini <strong>{data.hari || '.....'}</strong> tanggal <strong>{data.tanggal || '.....'}</strong> bulan <strong>{data.bulan || '.....'}</strong> tahun <strong>{data.tahun || '.....'}</strong>, yang bertanda tangan di bawah ini:</p>

        <table className="w-full ml-4">
          <tbody>
            <tr><td className="w-40 align-top">Nama Lengkap</td><td className="w-4 align-top">:</td><td><strong>{data.pihak1Nama || '..............................'}</strong></td></tr>
            <tr><td className="w-40 align-top">NIK / Paspor</td><td className="w-4 align-top">:</td><td>{data.pihak1Nik || '..............................'}</td></tr>
            <tr><td className="w-40 align-top">Alamat</td><td className="w-4 align-top">:</td><td>{data.pihak1Alamat || '..............................'}</td></tr>
            <tr><td className="w-40 align-top">No. HP/WA</td><td className="w-4 align-top">:</td><td>{data.pihak1NoHp || '..............................'}</td></tr>
          </tbody>
        </table>
        <p>Bertindak sebagai Pemilik Sah Properti, selanjutnya disebut <strong>PIHAK PERTAMA (Yang Menyewakan)</strong>.</p>

        <table className="w-full ml-4">
          <tbody>
            <tr><td className="w-40 align-top">Nama Lengkap</td><td className="w-4 align-top">:</td><td><strong>{data.pihak2Nama || '..............................'}</strong></td></tr>
            <tr><td className="w-40 align-top">NIK / Paspor / KITAS</td><td className="w-4 align-top">:</td><td>{data.pihak2NikKitas || '..............................'}</td></tr>
            <tr><td className="w-40 align-top">Kewarganegaraan</td><td className="w-4 align-top">:</td><td>{data.pihak2Kewarganegaraan || '..............................'}</td></tr>
            <tr><td className="w-40 align-top">Alamat Domisili</td><td className="w-4 align-top">:</td><td>{data.pihak2Alamat || '..............................'}</td></tr>
          </tbody>
        </table>
        <p>Bertindak sebagai Penyewa Properti, selanjutnya disebut <strong>PIHAK KEDUA (Penyewa)</strong>.</p>

        <p>Kedua belah pihak telah sepakat untuk mengikatkan diri dalam Perjanjian Sewa Menyewa Properti Jangka Panjang dengan ketentuan dan syarat-syarat mutlak sebagai berikut:</p>

        <div className="font-bold text-center mt-6 mb-2">PASAL 1<br/>OBJEK SEWA</div>
        <p>PIHAK PERTAMA menyewakan kepada PIHAK KEDUA berupa 1 (satu) unit properti dengan rincian:</p>
        <table className="w-full ml-4 mb-2">
          <tbody>
            <tr><td className="w-40 align-top">Nama Properti</td><td className="w-4 align-top">:</td><td><strong>{data.namaProperti || '..............................'}</strong></td></tr>
            <tr><td className="w-40 align-top">Alamat Lengkap</td><td className="w-4 align-top">:</td><td>{data.alamatProperti || '..............................'}</td></tr>
            <tr><td className="w-40 align-top">Kondisi/Fasilitas</td><td className="w-4 align-top">:</td><td>{data.fasilitasProperti || '..............................'}</td></tr>
          </tbody>
        </table>

        <div className="font-bold text-center mt-6 mb-2">PASAL 2<br/>JANGKA WAKTU DAN HARGA SEWA</div>
        <ol className="list-decimal ml-8 space-y-1">
          <li>Perjanjian sewa ini berlaku selama <strong>{data.durasiSewa || '...'} Tahun</strong>, terhitung mulai tanggal <strong>{data.mulaiSewa || '.....'}</strong> dan berakhir pada tanggal <strong>{data.akhirSewa || '.....'}</strong>.</li>
          <li>Harga sewa untuk jangka waktu tersebut adalah sebesar <strong>Rp {data.hargaSewaTotal || '................'}</strong> (<em>{data.hargaTerbilang || '................'}</em>).</li>
          <li>Pembayaran dilakukan secara <strong>{data.metodePembayaran || '...'}</strong> pada saat perjanjian ini ditandatangani, dan perjanjian ini sekaligus berlaku sebagai kuitansi pembayaran yang sah.</li>
          <li>PIHAK KEDUA wajib menyetorkan <em>Security Deposit</em> sebesar <strong>Rp {data.securityDeposit || '...'}</strong> yang akan dikembalikan di akhir masa sewa, dikurangi biaya perbaikan kerusakan (jika ada) dan tunggakan tagihan.</li>
        </ol>

        <div className="font-bold text-center mt-6 mb-2">PASAL 3<br/>LARANGAN SUB-LEASE (MENYEWAKAN KEMBALI)</div>
        <p>PIHAK KEDUA secara tegas <strong>DILARANG KERAS</strong> untuk menyewakan kembali (<em>sub-lease</em>), memindahtangankan, atau mengomersialkan properti tersebut secara harian/bulanan (termasuk mendaftarkannya di *platform* seperti Airbnb, Agoda, Booking.com, dsb) tanpa persetujuan tertulis dan adendum dari PIHAK PERTAMA. Pelanggaran atas pasal ini akan mengakibatkan pemutusan kontrak sepihak oleh PIHAK PERTAMA dan seluruh uang sewa yang telah dibayarkan akan <strong>HANGUS</strong> (tidak dikembalikan).</p>

        <div className="font-bold text-center mt-6 mb-2">PASAL 4<br/>HUKUM NEGARA DAN SENGKETA DEPORTASI</div>
        <p>PIHAK KEDUA wajib mematuhi seluruh hukum Negara Kesatuan Republik Indonesia. Apabila PIHAK KEDUA (jika WNA) terjerat kasus pidana, penyalahgunaan narkotika, atau <strong>dideportasi</strong> oleh Imigrasi selama masa sewa, maka perjanjian ini batal demi hukum. Hak guna properti otomatis kembali kepada PIHAK PERTAMA dan sisa uang sewa tidak dapat ditarik kembali/hangus.</p>

        <div className="font-bold text-center mt-6 mb-2">PASAL 5<br/>PEMELIHARAAN DAN ASURANSI (FORCE MAJEURE)</div>
        <ol className="list-decimal ml-8 space-y-1">
          <li>PIHAK KEDUA bertanggung jawab penuh atas biaya perawatan rutin (listrik, air, internet, *pool maintenance*, kebersihan) dan perbaikan kerusakan minor (di bawah Rp 2.000.000,-).</li>
          <li>PIHAK PERTAMA bertanggung jawab atas kerusakan struktural mayor (atap bocor parah, masalah struktur bangunan) yang bukan disebabkan oleh kelalaian PIHAK KEDUA.</li>
          <li>Kerusakan atau musnahnya bangunan akibat Bencana Alam (Gempa bumi, tsunami, kebakaran) yang berada di luar kendali (*Force Majeure*), maka akan diselesaikan secara musyawarah, dan kerugian bangunan fisik menjadi tanggungan asuransi/PIHAK PERTAMA, tanpa ada kewajiban mengembalikan uang sewa kepada PIHAK KEDUA.</li>
        </ol>

        <div className="font-bold text-center mt-6 mb-2">PASAL 6<br/>PENUTUP</div>
        <p>Perjanjian ini dibuat dalam rangkap 2 (dua), bermeterai cukup, ditandatangani dalam keadaan sadar tanpa paksaan, dan memiliki kekuatan hukum yang sama bagi masing-masing pihak.</p>

        <div className="flex justify-between items-start mt-12 pt-8">
          <div className="text-center w-1/2">
            <p><strong>PIHAK PERTAMA</strong></p>
            <p className="text-sm">(Pemilik Properti)</p>
            <div className="h-24 flex items-center justify-center">
              <span className="text-[10px] border border-black p-1">Meterai 10000</span>
            </div>
            <p className="font-bold underline uppercase">{data.pihak1Nama || '..............................'}</p>
          </div>
          
          <div className="text-center w-1/2">
            <p><strong>PIHAK KEDUA</strong></p>
            <p className="text-sm">(Penyewa)</p>
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
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Sewa Vila / Leasehold</h1>
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
                  <FileText size={18} className="text-purple-600" /> Editor Legal
                </h2>
                <button onClick={resetForm} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar pb-32">
              
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <User size={14} className="text-purple-600"/> Tanggal Perjanjian
                  </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Hari</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.hari} onChange={(e) => handleChange('hari', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Tanggal</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.tanggal} onChange={(e) => handleChange('tanggal', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Bulan</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.bulan} onChange={(e) => handleChange('bulan', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Tahun</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.tahun} onChange={(e) => handleChange('tahun', e.target.value)} /></div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <User size={14} className="text-purple-600"/> Data Pemilik (Pihak 1)
                  </h3>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Nama Lengkap</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak1Nama} onChange={(e) => handleChange('pihak1Nama', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">NIK / Paspor</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak1Nik} onChange={(e) => handleChange('pihak1Nik', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Alamat</label><textarea className="w-full p-2 border border-slate-300 rounded-lg text-sm" rows={2} value={data.pihak1Alamat} onChange={(e) => handleChange('pihak1Alamat', e.target.value)}></textarea></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">No HP/WA</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak1NoHp} onChange={(e) => handleChange('pihak1NoHp', e.target.value)} /></div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <User size={14} className="text-purple-600"/> Data Penyewa (Pihak 2)
                  </h3>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Nama Lengkap Penyewa</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak2Nama} onChange={(e) => handleChange('pihak2Nama', e.target.value)} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">NIK / Paspor / KITAS</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak2NikKitas} onChange={(e) => handleChange('pihak2NikKitas', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Kewarganegaraan</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak2Kewarganegaraan} onChange={(e) => handleChange('pihak2Kewarganegaraan', e.target.value)} /></div>
                </div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Alamat Domisili Asal</label><textarea className="w-full p-2 border border-slate-300 rounded-lg text-sm" rows={2} value={data.pihak2Alamat} onChange={(e) => handleChange('pihak2Alamat', e.target.value)}></textarea></div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <User size={14} className="text-purple-600"/> Detail Properti & Waktu Sewa
                  </h3>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Nama Properti / Vila</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.namaProperti} onChange={(e) => handleChange('namaProperti', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Alamat Properti</label><textarea className="w-full p-2 border border-slate-300 rounded-lg text-sm" rows={2} value={data.alamatProperti} onChange={(e) => handleChange('alamatProperti', e.target.value)}></textarea></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Kondisi & Fasilitas (Opsional)</label><textarea className="w-full p-2 border border-slate-300 rounded-lg text-sm" rows={2} value={data.fasilitasProperti} onChange={(e) => handleChange('fasilitasProperti', e.target.value)}></textarea></div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Durasi (Tahun)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.durasiSewa} onChange={(e) => handleChange('durasiSewa', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Tgl Mulai</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.mulaiSewa} onChange={(e) => handleChange('mulaiSewa', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Tgl Akhir</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.akhirSewa} onChange={(e) => handleChange('akhirSewa', e.target.value)} /></div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <User size={14} className="text-purple-600"/> Harga & Metode Pembayaran
                  </h3>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Harga Sewa Total (Angka)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.hargaSewaTotal} onChange={(e) => handleChange('hargaSewaTotal', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Harga Sewa (Terbilang)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.hargaTerbilang} onChange={(e) => handleChange('hargaTerbilang', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Security Deposit (Uang Jaminan/Rp)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.securityDeposit} onChange={(e) => handleChange('securityDeposit', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Metode & Termin Pembayaran</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.metodePembayaran} onChange={(e) => handleChange('metodePembayaran', e.target.value)} /></div>
              </div>

                        </div>
        </aside>

        {/* PREVIEW AREA (BULLETPROOF PRINT TARGET) */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName={`Leasehold_${data.namaProperti.replace(/\s+/g, '_')}`} price={35000} />
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
