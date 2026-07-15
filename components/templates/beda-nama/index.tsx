'use client';

/**
 * FILE: BedaNamaPage.tsx
 * STATUS: PRODUCTION READY (WITH MONETIZATION)
 * DESC: Generator Surat Pernyataan Beda Nama/Identitas (Standar Notaris/Legal Enterprise)
 * FEATURES:
 * - Standar Notaris/Enterprise dengan 8 Pasal Lengkap
 * - ZERO CSS Grid/Table untuk teks paragraf/pasal (Full flex & margin untuk print-safe)
 * - State Management Komprehensif
 * - Dynamic Clauses (Alasan, Penyelesaian Sengketa)
 * - Print-Safe Formatting
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, Eye, UserCircle2, 
  FileWarning, FileText, Scale, RotateCcw, ShieldAlert
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface BedaNamaData {
  // Metadata Surat
  city: string;
  date: string;
  
  // Identitas KTP (Yang Benar)
  name: string;
  nik: string;
  placeBirth: string;
  dateBirth: string;
  job: string;
  address: string;
  
  // Dokumen Pembanding (Yang Salah/Beda)
  documentType: string;
  docNumber: string;
  wrongName: string;
  wrongPlaceBirth: string;
  wrongDateBirth: string;
  
  // Pilihan & Alasan Dinamis
  reason: string;
  purpose: string;
  disputeResolution: string;
  
  // Saksi-Saksi
  witness1Name: string;
  witness1Nik: string;
  witness2Name: string;
  witness2Nik: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: BedaNamaData = {
  city: 'SLEMAN',
  date: '', 
  
  name: 'MUHAMMAD RIZKY RAMADHAN',
  nik: '3404010101950003',
  placeBirth: 'YOGYAKARTA',
  dateBirth: '1995-02-15',
  job: 'Karyawan Swasta',
  address: 'Jl. Magelang KM 5, Mlati, Sleman, Daerah Istimewa Yogyakarta',
  
  documentType: 'Ijazah Strata-1 (S1)',
  docNumber: '1103.44.890/UGM/2018',
  wrongName: 'M. RIZKY RAMADHAN',
  wrongPlaceBirth: 'JOGJAKARTA',
  wrongDateBirth: '1995-02-15',
  
  reason: 'Kesalahan administrasi ketik oleh instansi penerbit',
  purpose: 'Persyaratan administratif pencairan dana asuransi kesehatan',
  disputeResolution: 'Musyawarah untuk mufakat',
  
  witness1Name: 'Sudarsono',
  witness1Nik: '3404010505700001',
  witness2Name: 'Dwi Astuti',
  witness2Nik: '3404014606720002'
};

// --- 3. KOMPONEN UTAMA ---
export default function BedaNamaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Pernyataan...</div>}>
      <BedaNamaBuilder />
    </Suspense>
  );
}

function BedaNamaBuilder() {
  // --- STATE SYSTEM ---
  const [activeTab, setActiveTab] = useState<'editor' | 'preview'>('editor');
  const [data, setData] = useState<BedaNamaData>(INITIAL_DATA);

  // Set Tanggal Hari Ini saat Mount
  useEffect(() => {
    setData(prev => ({ 
        ...prev, 
        date: new Date().toISOString().split('T')[0] 
    }));
  }, []);

  // --- HANDLERS ---
  const handleDataChange = (field: keyof BedaNamaData, val: string) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(window.confirm('Reset formulir ke awal?')) {
        setData({ ...INITIAL_DATA, date: new Date().toISOString().split('T')[0] });
    }
  };

  // --- FORMATTER TANGGAL ---
  const formatDate = (dateString: string) => {
    if(!dateString) return '...';
    try {
        const safeDate = new Date(dateString + 'T00:00:00');
        return safeDate.toLocaleDateString('id-ID', { day:'numeric', month:'long', year:'numeric'});
    } catch { return dateString; }
  };

  // --- KONTEN SURAT (AKTA PERNYATAAN BEDA IDENTITAS) ---
  const ContentInside = () => {
    return (
      <div className="font-serif text-[11pt] leading-[1.6] text-black">
         
         <div className="text-center mb-8 pb-2 border-b-2 border-black">
            <h1 className="font-black text-lg uppercase tracking-wider underline underline-offset-4">AKTA PERNYATAAN DAN KETERANGAN BEDA IDENTITAS</h1>
            <p className="mt-1 text-sm tracking-widest font-bold">NOMOR REGISTRASI: ___/SKBI/___/{new Date().getFullYear()}</p>
         </div>

         <div className="text-justify px-1">
            <p className="mb-4">Pada hari ini, tanggal <strong>{formatDate(data.date)}</strong>, bertempat di <strong>{data.city}</strong>, saya yang bertanda tangan di bawah ini:</p>
            
            {/* IDENTITAS PIHAK PERTAMA (TANPA TABEL) */}
            <div className="ml-4 mb-6 break-inside-avoid space-y-1">
               <div className="flex">
                  <div className="w-48 font-bold">Nama Lengkap</div>
                  <div className="w-4">:</div>
                  <div className="flex-1 font-bold uppercase">{data.name}</div>
               </div>
               <div className="flex">
                  <div className="w-48 font-bold">Nomor Induk Kependudukan</div>
                  <div className="w-4">:</div>
                  <div className="flex-1 font-mono">{data.nik}</div>
               </div>
               <div className="flex">
                  <div className="w-48 font-bold">Tempat, Tanggal Lahir</div>
                  <div className="w-4">:</div>
                  <div className="flex-1">{data.placeBirth}, {formatDate(data.dateBirth)}</div>
               </div>
               <div className="flex">
                  <div className="w-48 font-bold">Pekerjaan</div>
                  <div className="w-4">:</div>
                  <div className="flex-1">{data.job}</div>
               </div>
               <div className="flex">
                  <div className="w-48 font-bold">Alamat Lengkap</div>
                  <div className="w-4">:</div>
                  <div className="flex-1 leading-snug">{data.address}</div>
               </div>
            </div>

            <p className="mb-6 break-inside-avoid">
               Bertindak untuk dan atas nama diri sendiri (selanjutnya disebut sebagai <strong>"Pembuat Pernyataan"</strong>), dengan ini menyatakan dengan sadar dan sesungguhnya, serta mengikatkan diri ke dalam ketentuan-ketentuan yang dijabarkan dalam pasal-pasal berikut ini:
            </p>

            {/* PASAL 1 */}
            <div className="mb-4 text-justify break-inside-avoid">
               <p className="font-bold mb-1 text-center">PASAL 1<br/>KETERANGAN IDENTITAS UTAMA (DEFINISI)</p>
               <div className="flex gap-2">
                  <span>1.</span>
                  <p>Bahwa Pembuat Pernyataan adalah subjek hukum yang sah dan cakap untuk melakukan tindakan hukum menurut peraturan perundang-undangan Republik Indonesia.</p>
               </div>
               <div className="flex gap-2 mt-1">
                  <span>2.</span>
                  <p>Bahwa identitas utama dan rujukan kebenaran data administrasi kependudukan dari Pembuat Pernyataan adalah Kartu Tanda Penduduk (KTP) dengan Nomor Induk Kependudukan (NIK) {data.nik} atas nama <strong>{data.name}</strong>.</p>
               </div>
            </div>

            {/* PASAL 2 */}
            <div className="mb-4 text-justify break-inside-avoid">
               <p className="font-bold mb-1 text-center mt-6">PASAL 2<br/>DOKUMEN DAN OBJEK PERBEDAAN</p>
               <div className="flex gap-2">
                  <span>1.</span>
                  <p>Bahwa selain identitas utama sebagaimana dimaksud pada Pasal 1, Pembuat Pernyataan juga memiliki dan/atau memegang dokumen lain berupa <strong>{data.documentType}</strong> dengan nomor registrasi/identifikasi dokumen <strong>{data.docNumber}</strong>.</p>
               </div>
               <div className="flex gap-2 mt-1">
                  <span>2.</span>
                  <div>
                    <p>Bahwa di dalam dokumen {data.documentType} tersebut, terdapat pencatatan data identitas yang memiliki perbedaan leksikal maupun substantif dengan identitas KTP, yakni tercatat dengan rincian sebagai berikut:</p>
                    <div className="ml-4 mt-2 space-y-1">
                       <div className="flex">
                          <div className="w-48">- Nama pada Dokumen</div>
                          <div className="w-4">:</div>
                          <div className="flex-1 font-bold">"{data.wrongName}"</div>
                       </div>
                       <div className="flex">
                          <div className="w-48">- Tempat Lahir</div>
                          <div className="w-4">:</div>
                          <div className="flex-1 font-bold">"{data.wrongPlaceBirth}"</div>
                       </div>
                       <div className="flex">
                          <div className="w-48">- Tanggal Lahir</div>
                          <div className="w-4">:</div>
                          <div className="flex-1 font-bold">"{formatDate(data.wrongDateBirth)}"</div>
                       </div>
                    </div>
                  </div>
               </div>
            </div>

            {/* PASAL 3 */}
            <div className="mb-4 text-justify break-inside-avoid">
               <p className="font-bold mb-1 text-center mt-6">PASAL 3<br/>PERNYATAAN KESATUAN SUBJEK HUKUM</p>
               <div className="flex gap-2">
                  <span>1.</span>
                  <p>Bahwa nama <strong>{data.name}</strong> (sesuai KTP) dan nama <strong>{data.wrongName}</strong> (sesuai {data.documentType}) beserta atribut data yang menyertainya adalah benar dan mutlak merujuk pada <strong>SATU ORANG YANG SAMA</strong>, yakni diri Pembuat Pernyataan.</p>
               </div>
               <div className="flex gap-2 mt-1">
                  <span>2.</span>
                  <p>Bahwa perbedaan penulisan data tersebut tidak menggugurkan, menghapuskan, atau membatalkan hak-hak keperdataan Pembuat Pernyataan yang timbul dan melekat pada dokumen {data.documentType} tersebut.</p>
               </div>
            </div>

            {/* PASAL 4 */}
            <div className="mb-4 text-justify break-inside-avoid">
               <p className="font-bold mb-1 text-center mt-6">PASAL 4<br/>ALASAN DAN PENYEBAB PERBEDAAN</p>
               <div className="flex gap-2">
                  <span>1.</span>
                  <p>Bahwa perbedaan penulisan identitas sebagaimana diuraikan dalam Pasal 2 terjadi dikarenakan alasan berikut: <em>{data.reason}</em>.</p>
               </div>
               <div className="flex gap-2 mt-1">
                  <span>2.</span>
                  <p>Bahwa Pembuat Pernyataan tidak memiliki niat, tujuan, atau unsur kesengajaan dalam bentuk apapun untuk memalsukan identitas, mengaburkan fakta hukum, melakukan tindakan penipuan (<em>fraude</em>), atau tindak pidana lainnya.</p>
               </div>
            </div>

            {/* PASAL 5 */}
            <div className="mb-4 text-justify break-inside-avoid">
               <p className="font-bold mb-1 text-center mt-6">PASAL 5<br/>TUJUAN DAN PENGGUNAAN SURAT PERNYATAAN</p>
               <div className="flex gap-2">
                  <span>1.</span>
                  <p>Bahwa Akta Pernyataan dan Keterangan Beda Identitas ini disusun dan ditandatangani guna memenuhi persyaratan administratif dan hukum untuk keperluan: <strong>{data.purpose}</strong>.</p>
               </div>
               <div className="flex gap-2 mt-1">
                  <span>2.</span>
                  <p>Bahwa dokumen ini merupakan alat bukti keterangan yang sah dan dapat diajukan kepada instansi pemerintah, lembaga perbankan/keuangan, instansi hukum, atau pihak swasta lainnya yang berkepentingan.</p>
               </div>
            </div>

            {/* PASAL 6 */}
            <div className="mb-4 text-justify break-inside-avoid">
               <p className="font-bold mb-1 text-center mt-6">PASAL 6<br/>TANGGUNG JAWAB HUKUM (INDEMNIFIKASI)</p>
               <div className="flex gap-2">
                  <span>1.</span>
                  <p>Bahwa Pembuat Pernyataan secara mutlak membebaskan pihak-pihak terkait, termasuk namun tidak terbatas pada instansi penerima dokumen ini, dari segala macam tuntutan hukum, gugatan perdata, maupun laporan pidana apabila di kemudian hari ditemukan ketidakbenaran materiil atas akta pernyataan ini.</p>
               </div>
               <div className="flex gap-2 mt-1">
                  <span>2.</span>
                  <p>Bahwa segala kerugian yang mungkin timbul terhadap pihak ketiga akibat penggunaan dokumen beridentitas ganda ini sepenuhnya menjadi beban dan tanggung jawab pribadi Pembuat Pernyataan.</p>
               </div>
            </div>

            {/* PASAL 7 */}
            <div className="mb-4 text-justify break-inside-avoid">
               <p className="font-bold mb-1 text-center mt-6">PASAL 7<br/>KEADAAN KAHAR (FORCE MAJEURE)</p>
               <div className="flex gap-2">
                  <span>1.</span>
                  <p>Bahwa Pembuat Pernyataan tidak dapat dimintai pertanggungjawaban atas cacat dokumen tambahan di kemudian hari apabila kerusakan atau kehilangan dokumen yang menjadi objek pernyataan ini diakibatkan oleh Keadaan Kahar (<em>Force Majeure</em>).</p>
               </div>
               <div className="flex gap-2 mt-1">
                  <span>2.</span>
                  <p>Keadaan Kahar yang dimaksud meliputi bencana alam (gempa bumi, banjir, kebakaran), huru-hara, kebijakan moneter/pemerintah secara nasional, dan peristiwa luar biasa lainnya di luar kendali wajar Pembuat Pernyataan.</p>
               </div>
            </div>

            {/* PASAL 8 */}
            <div className="mb-4 text-justify break-inside-avoid">
               <p className="font-bold mb-1 text-center mt-6">PASAL 8<br/>PENYELESAIAN SENGKETA DAN DOMISILI HUKUM</p>
               <div className="flex gap-2">
                  <span>1.</span>
                  <p>Segala bentuk sengketa, perselisihan, atau perbedaan pendapat yang timbul akibat dari pelaksanaan atau penafsiran Surat Pernyataan ini akan diselesaikan mengutamakan: <strong>{data.disputeResolution}</strong>.</p>
               </div>
               <div className="flex gap-2 mt-1">
                  <span>2.</span>
                  <p>Apabila penyelesaian sebagaimana dimaksud pada ayat 1 tidak mencapai kesepakatan secara mufakat, maka Pembuat Pernyataan sepakat untuk memilih domisili hukum yang tetap dan umum di Kepaniteraan Pengadilan Negeri <strong>{data.city}</strong>.</p>
               </div>
            </div>

            <p className="mt-8 indent-12 break-inside-avoid">
               Demikian Akta Pernyataan dan Keterangan Beda Identitas ini dibuat pada hari ini, {formatDate(data.date)}, di {data.city}, dalam keadaan sadar, sehat jasmani dan rohani, serta dibubuhi meterai secukupnya sehingga memiliki kekuatan pembuktian yang sah di mata hukum.
            </p>
         </div>

         {/* TANDA TANGAN */}
         <div className="mt-12 break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
            <p className="text-right mb-8">{data.city}, {formatDate(data.date)}</p>
            
            <div className="flex justify-between items-start mt-6">
               <div className="text-center w-80">
                  <p className="mb-6 font-bold uppercase text-[10pt] text-slate-700">Saksi-Saksi:</p>
                  <div className="flex flex-col gap-10 text-left pl-4 mt-2">
                     <div className="relative">
                        <div className="flex items-end mb-1">
                           <span className="w-6 font-bold">1.</span>
                           <div className="border-b border-black w-48 pb-1 text-sm font-bold capitalize">{data.witness1Name}</div>
                        </div>
                        <div className="pl-6 text-[10px] text-slate-500">NIK: {data.witness1Nik}</div>
                     </div>
                     <div className="relative">
                        <div className="flex items-end mb-1">
                           <span className="w-6 font-bold">2.</span>
                           <div className="border-b border-black w-48 pb-1 text-sm font-bold capitalize">{data.witness2Name}</div>
                        </div>
                        <div className="pl-6 text-[10px] text-slate-500">NIK: {data.witness2Nik}</div>
                     </div>
                  </div>
               </div>

               <div className="text-center w-64">
                  <p className="mb-4 font-bold uppercase text-xs">Yang Membuat Pernyataan,</p>
                  <div className="border border-slate-400 w-24 h-14 mx-auto mb-4 flex items-center justify-center text-[8px] text-slate-400 italic bg-slate-50">
                     MATERAI<br/>10.000
                  </div>
                  <p className="font-bold underline uppercase text-sm mt-6">{data.name}</p>
               </div>
            </div>
         </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* CSS PRINT FIXED - NO GRID/TABLES FOR DOCUMENT CONTENT AS INSTRUCTED */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 20mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER NAVY */}
      <header className="no-print bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 h-16 shrink-0 shadow-lg">
         <div className="max-w-[1600px] mx-auto px-4 h-full flex items-center justify-between">
            <div className="flex items-center gap-4">
               <Link href="/" className="flex items-center gap-2 px-4 py-2 hover:bg-slate-800 rounded-full transition-all group">
                  <ArrowLeftCircle size={20} className="text-slate-400 group-hover:text-emerald-400 transition-colors"/>
                  <span className="text-sm font-bold text-slate-300 group-hover:text-white">Dashboard</span>
               </Link>
               <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
               <div><h1 className="font-black text-white text-sm md:text-base uppercase tracking-tight hidden md:block">Legal <span className="text-emerald-400">Pernyataan Beda Nama</span></h1></div>
            </div>
            <div className="flex items-center gap-3">
               <button 
                 onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} 
                 className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg hover:shadow-emerald-500/30 transition-all active:scale-95"
               >
                 <Printer size={18}/> <span className="hidden sm:inline">Cetak Dokumen</span>
               </button>
            </div>
         </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
         
         {/* EDITOR SIDEBAR */}
         <div className={`no-print w-full md:w-[450px] lg:w-[500px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute md:relative shadow-xl md:shadow-none ${activeTab === 'preview' ? '-translate-x-full print:translate-x-0 md:translate-x-0' : 'translate-x-0'}`}>
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10">
                <h2 className="font-bold text-slate-700 flex items-center gap-2"><Edit3 size={16} /> Isi Formulir Pernyataan</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8 pb-32 md:pb-10 custom-scrollbar print:hidden print:overflow-visible print:bg-white">
               
               {/* 1. IDENTITAS */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><UserCircle2 size={12}/> Pasal 1: Identitas (Sesuai KTP)</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Lengkap (KTP)</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-emerald-500 outline-none uppercase" value={data.name} onChange={e => handleDataChange('name', e.target.value)} /></div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nomor Induk Kependudukan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Pekerjaan</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.job} onChange={e => handleDataChange('job', e.target.value)} /></div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tempat Lahir</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.placeBirth} onChange={e => handleDataChange('placeBirth', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tanggal Lahir</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.dateBirth} onChange={e => handleDataChange('dateBirth', e.target.value)} /></div>
                      </div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Alamat Lengkap (Sesuai KTP)</label><textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.address} onChange={e => handleDataChange('address', e.target.value)} /></div>
                  </div>
               </div>

               {/* 2. DATA PERBEDAAN (OBJEK) */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><FileWarning size={12}/> Pasal 2: Data Pada Dokumen Berbeda</h3>
                  <div className="bg-red-50 p-4 rounded-2xl border border-red-200 shadow-sm space-y-3">
                      <div className="grid grid-cols-[2fr_1fr] gap-3">
                          <div className="space-y-1"><label className="text-[10px] font-bold text-red-600">Jenis Dokumen Berbeda</label><input className="w-full px-3 py-2 border border-red-200 rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none" placeholder="Cth: Ijazah, Buku Nikah" value={data.documentType} onChange={e => handleDataChange('documentType', e.target.value)} /></div>
                          <div className="space-y-1"><label className="text-[10px] font-bold text-red-600">Nomor Dokumen</label><input className="w-full px-3 py-2 border border-red-200 rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none" placeholder="No Dokumen" value={data.docNumber} onChange={e => handleDataChange('docNumber', e.target.value)} /></div>
                      </div>
                      <div className="space-y-1"><label className="text-[10px] font-bold text-red-600">Nama (Yang Salah Tertulis di Dokumen)</label><input className="w-full px-3 py-2 border border-red-300 rounded-lg text-sm font-bold text-red-800 focus:ring-2 focus:ring-red-500 outline-none uppercase bg-white" value={data.wrongName} onChange={e => handleDataChange('wrongName', e.target.value)} /></div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-red-600">Tempat Lahir (Salah)</label><input className="w-full px-3 py-2 border border-red-300 rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none bg-white" value={data.wrongPlaceBirth} onChange={e => handleDataChange('wrongPlaceBirth', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-red-600">Tgl Lahir (Salah)</label><input type="date" className="w-full px-3 py-2 border border-red-300 rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none bg-white" value={data.wrongDateBirth} onChange={e => handleDataChange('wrongDateBirth', e.target.value)} /></div>
                      </div>
                  </div>
               </div>

               {/* 3. ALASAN & KEPERLUAN */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><ShieldAlert size={12}/> Pasal 4 & 5: Alasan & Keperluan</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                      <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500">Alasan Perbedaan Terjadi</label>
                          <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-white" value={data.reason} onChange={e => handleDataChange('reason', e.target.value)}>
                              <option value="Kesalahan administrasi ketik oleh instansi penerbit">Kesalahan administrasi ketik oleh instansi penerbit</option>
                              <option value="Perbedaan sistem ejaan lama dan baru (Soewandi/EYD)">Perbedaan sistem ejaan lama dan baru (Soewandi/EYD)</option>
                              <option value="Pencantuman/penghilangan gelar akademik atau keagamaan">Pencantuman/penghilangan gelar akademik atau keagamaan</option>
                              <option value="Penyesuaian akibat kekhilafan pelaporan data keluarga di masa lalu">Penyesuaian akibat kekhilafan pelaporan data keluarga</option>
                          </select>
                      </div>
                      <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500">Tujuan Surat Pernyataan Dibuat Untuk?</label>
                          <textarea className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" placeholder="Cth: Persyaratan pengajuan kredit pemilikan rumah..." value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} />
                      </div>
                  </div>
               </div>

               {/* 4. SENGKETA & SAKSI */}
               <div className="space-y-3">
                  <h3 className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-2 px-1"><Scale size={12}/> Sengketa, Saksi, & Tempat Tanggal</h3>
                  <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                      <div className="space-y-1">
                          <label className="text-[10px] font-bold text-slate-500">Penyelesaian Sengketa (Pasal 8)</label>
                          <select className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none bg-white" value={data.disputeResolution} onChange={e => handleDataChange('disputeResolution', e.target.value)}>
                              <option value="Kekeluargaan (Musyawarah untuk mufakat)">Kekeluargaan (Musyawarah untuk mufakat)</option>
                              <option value="Mediasi hukum di luar pengadilan (Non-Litigasi)">Mediasi hukum (Non-Litigasi)</option>
                              <option value="Arbitrase atau Pengadilan Negeri">Jalur Hukum (Litigasi)</option>
                          </select>
                      </div>
                      
                      <hr className="border-slate-100" />
                      
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Saksi 1</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.witness1Name} onChange={e => handleDataChange('witness1Name', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIK Saksi 1</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.witness1Nik} onChange={e => handleDataChange('witness1Nik', e.target.value)} /></div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Nama Saksi 2</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.witness2Name} onChange={e => handleDataChange('witness2Name', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">NIK Saksi 2</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.witness2Nik} onChange={e => handleDataChange('witness2Nik', e.target.value)} /></div>
                      </div>

                      <hr className="border-slate-100" />

                      <div className="grid grid-cols-[1.5fr_1fr] gap-3">
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tempat Surat</label><input className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} /></div>
                         <div className="space-y-1"><label className="text-[10px] font-bold text-slate-500">Tanggal Surat</label><input type="date" className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} /></div>
                      </div>
                  </div>
               </div>
               <div className="h-20 md:hidden"></div>
            </div>
         </div>

         {/* PREVIEW */}
         <div className="no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center print:hidden print:overflow-visible print:bg-white print:static">
             <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar print:hidden print:overflow-visible print:bg-white">
                <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-100 mb-[-100mm] md:mb-10 mt-2 md:mt-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                   <div className="bg-white shadow-2xl mx-auto overflow-hidden relative border border-slate-300" style={{ width: '210mm', minHeight: '297mm', padding: '25mm' }}>
                      <ContentInside />
                   </div>
                </div>
             </div>
         </div>
      </main>

      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Akta_Pernyataan_Beda_Identitas" price={20000} />
      </div>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5">
         <button onClick={() => setActiveTab('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setActiveTab('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${activeTab === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* PRINT PORTAL */}
      <div id="print-only-root" className="hidden print:h-auto print:static">
         <table className="print-table w-full">
            <thead><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></thead>
            <tbody>
               <tr>
                  <td>
                     <div className="print-content-wrapper w-full">
                        <ContentInside />
                     </div>
                  </td>
               </tr>
            </tbody>
            <tfoot><tr><td><div style={{ height: '20mm' }}>&nbsp;</div></td></tr></tfoot>
         </table>
      </div>

    </div>
  );
}
