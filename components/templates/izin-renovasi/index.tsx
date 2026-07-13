'use client';

/**
 * FILE: IzinRenovasiPage.tsx
 * STATUS: PRODUCTION READY
 * DESC: Generator Surat Izin Renovasi (Building Management Standard)
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, ChevronDown, Check, LayoutTemplate, 
  Hammer, UserCircle2, MapPin, Info, Edit3, RotateCcw, Building2, HardHat
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface RenovasiData {
  city: string;
  date: string;
  ownerName: string;
  phone: string;
  unit: string;
  tower: string;
  renovationType: string;
  startDate: string;
  endDate: string;
  vendorName: string;
  picName: string;
  picPhone: string;
  workerCount: string;
  bmName: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: RenovasiData = {
  city: 'JAKARTA',
  date: '', 
  ownerName: 'BUDI SANTOSO',
  phone: '0812-3456-7890',
  unit: '12-A',
  tower: 'TOWER B',
  renovationType: 'Pemasangan Partisi dan Instalasi Listrik',
  startDate: '',
  endDate: '', 
  vendorName: 'PT. MAJU BERSAMA',
  picName: 'AGUS SETIAWAN',
  picPhone: '0819-8765-4321',
  workerCount: '5',
  bmName: 'Bapak Hendra (Building Manager)'
};

export default function IzinRenovasiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat...</div>}>
      <RenovasiBuilder />
    </Suspense>
  );
}

function RenovasiBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<RenovasiData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    
    setData(prev => ({ 
        ...prev, 
        date: today.toISOString().split('T')[0],
        startDate: today.toISOString().split('T')[0],
        endDate: nextWeek.toISOString().split('T')[0]
    }));
  }, []);

  const handleDataChange = (field: keyof RenovasiData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(nextWeek.getDate() + 7);
        setData({ 
            ...INITIAL_DATA, 
            date: today.toISOString().split('T')[0], 
            startDate: today.toISOString().split('T')[0], 
            endDate: nextWeek.toISOString().split('T')[0] 
        });
    }
  };

  const activeTemplateName = templateId === 1 ? 'Permohonan Fit-Out' : 'Pernyataan Tata Tertib';

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
      if(!dateString) return '...';
      try {
        return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
      } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[11pt] p-[25mm] print:p-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 shadow-2xl print:shadow-none print:m-0">
          
          {templateId === 1 ? (
              <>
                  <div className="text-right text-sm mb-8 shrink-0">
                      <p>{data.city}, {formatDateSafe(data.date)}</p>
                  </div>

                  <div className="mb-6 shrink-0">
                      <p>Hal : <strong>Permohonan Izin Renovasi / Fit-Out Unit</strong></p>
                      <p>Lamp : 1 (Satu) Berkas (Gambar Kerja & Identitas Pekerja)</p>
                  </div>

                  <div className="mb-10 shrink-0">
                      <p>Kepada Yth,</p>
                      <p><strong>Building Management {data.tower}</strong></p>
                      <p>Di Tempat</p>
                  </div>

                  <div className="space-y-4 flex-grow text-justify">
                      <p>Dengan hormat,</p>
                      <p>Saya yang bertanda tangan di bawah ini selaku Pemilik/Penyewa Unit:</p>
                      
                      <div className="ml-6 space-y-1 text-[11pt] break-inside-avoid">
                          <div className="grid grid-cols-[150px_10px_1fr]"><span>Nama Penghuni</span><span>:</span><span className="font-bold uppercase">{data.ownerName}</span></div>
                          <div className="grid grid-cols-[150px_10px_1fr] align-top"><span>Unit / Tower</span><span>:</span><span>{data.unit} / {data.tower}</span></div>
                          <div className="grid grid-cols-[150px_10px_1fr]"><span>No. Telepon/HP</span><span>:</span><span>{data.phone}</span></div>
                      </div>

                      <p className="mt-4 break-inside-avoid">
                          Melalui surat ini bermaksud mengajukan permohonan izin untuk melaksanakan pekerjaan <strong>{data.renovationType}</strong> di unit tersebut.
                      </p>

                      <p className="break-inside-avoid">Pekerjaan tersebut akan dilaksanakan oleh kontraktor/vendor dengan rincian sebagai berikut:</p>
                      
                      <div className="ml-6 space-y-1 text-[11pt] break-inside-avoid">
                          <div className="grid grid-cols-[150px_10px_1fr]"><span>Nama Kontraktor</span><span>:</span><span className="font-bold uppercase">{data.vendorName}</span></div>
                          <div className="grid grid-cols-[150px_10px_1fr]"><span>Nama PIC / Pj</span><span>:</span><span>{data.picName} ({data.picPhone})</span></div>
                          <div className="grid grid-cols-[150px_10px_1fr]"><span>Jumlah Pekerja</span><span>:</span><span>{data.workerCount} Orang</span></div>
                          <div className="grid grid-cols-[150px_10px_1fr]"><span>Jadwal Pelaksanaan</span><span>:</span><span>{formatDateSafe(data.startDate)} s/d {formatDateSafe(data.endDate)}</span></div>
                      </div>

                      <p className="mt-4 break-inside-avoid">
                          Selama pelaksanaan pekerjaan, kami berkomitmen untuk mematuhi seluruh tata tertib Building Management, khususnya mengenai jam kerja yang diperbolehkan (Senin - Jumat, pkl 09:00 - 17:00), serta menjaga kebersihan, ketertiban, dan keamanan di area gedung.
                      </p>

                      <p className="mt-4 break-inside-avoid">Demikian surat permohonan ini kami sampaikan. Atas persetujuan dan kerja samanya, kami ucapkan terima kasih.</p>
                  </div>

                  <div className="shrink-0 mt-8 mb-4" style={{ pageBreakInside: 'avoid' }}>
                      <div className="flex justify-between items-end text-[11pt]">
                          <div className="text-center w-60">
                              <p className="mb-20 font-bold uppercase text-xs">Menyetujui,<br/>Building Management</p>
                              <p className="font-bold underline uppercase">{data.bmName}</p>
                          </div>
                          <div className="text-center w-60">
                              <p className="mb-20 font-bold uppercase text-xs">Pemohon,<br/>Pemilik / Penyewa Unit</p>
                              <p className="font-bold underline uppercase">{data.ownerName}</p>
                          </div>
                      </div>
                  </div>
              </>
          ) : (
              <>
                  <div className="text-center mb-8 border-b-2 border-black pb-4">
                      <h1 className="text-xl font-black uppercase tracking-wider">SURAT PERNYATAAN<br/>TATA TERTIB & GANTI RUGI ASET</h1>
                  </div>
                  
                  <div className="space-y-4 flex-grow text-justify">
                      <p>Saya yang bertanda tangan di bawah ini:</p>
                      <div className="ml-6 space-y-1 text-[11pt] break-inside-avoid">
                          <div className="grid grid-cols-[150px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold uppercase">{data.ownerName}</span></div>
                          <div className="grid grid-cols-[150px_10px_1fr]"><span>Unit / Tower</span><span>:</span><span>{data.unit} / {data.tower}</span></div>
                          <div className="grid grid-cols-[150px_10px_1fr]"><span>Bertindak Sebagai</span><span>:</span><span>Pemilik / Penyewa Unit</span></div>
                      </div>

                      <p className="mt-4">
                          Sehubungan dengan pelaksanaan pekerjaan <strong>{data.renovationType}</strong> yang dikerjakan oleh <strong>{data.vendorName}</strong> pada <strong>{formatDateSafe(data.startDate)}</strong> s/d <strong>{formatDateSafe(data.endDate)}</strong>, dengan ini menyatakan setuju dan sanggup mematuhi ketentuan sebagai berikut:
                      </p>

                      <ol className="list-decimal ml-6 space-y-2 break-inside-avoid">
                          <li className="pl-2"><strong>Jam Kerja:</strong> Pekerjaan yang menimbulkan kebisingan (bobok, bor, ketok) hanya diizinkan pada hari <strong>Senin s.d Jumat pukul 09:00 - 17:00 WIB</strong>. Pekerjaan di luar jam kerja wajib mendapat izin tertulis (lembur) dari Building Management.</li>
                          <li className="pl-2"><strong>Kebersihan:</strong> Puing dan sampah sisa renovasi wajib dibersihkan dan dibuang pada hari yang sama ke area yang telah ditentukan. Dilarang membuang sisa material ke dalam saluran air/toilet.</li>
                          <li className="pl-2"><strong>Ganti Rugi Aset:</strong> Apabila dalam pelaksanaan pekerjaan terjadi kerusakan pada aset/fasilitas gedung (koridor, lift, fasilitas umum, saluran pipa utama) atau kerugian pada unit di sekitar (kebocoran, retak), maka kami <strong>bertanggung jawab penuh untuk melakukan perbaikan</strong> dan/atau <strong>memberikan ganti rugi 100%</strong> sesuai nilai kerusakan.</li>
                          <li className="pl-2"><strong>Akses Pekerja:</strong> Seluruh pekerja/tukang (berjumlah {data.workerCount} orang) wajib menggunakan ID Card khusus pekerja renovasi, berpakaian rapi, bersepatu, dan tidak menginap di dalam unit.</li>
                          <li className="pl-2"><strong>Sanksi:</strong> Building Management berhak memberhentikan sementara atau menghentikan secara permanen pekerjaan renovasi apabila ditemukan pelanggaran terhadap peraturan yang berlaku.</li>
                      </ol>

                      <p className="mt-6 break-inside-avoid">
                          Pernyataan ini dibuat dengan sebenar-benarnya tanpa ada paksaan dari pihak mana pun untuk digunakan sebagaimana mestinya.
                      </p>
                  </div>

                  <div className="shrink-0 mt-8 mb-4 break-inside-avoid">
                      <div className="flex justify-between items-end text-[11pt]">
                          <div className="text-center w-60">
                              <p className="mb-20 font-bold uppercase text-xs">Mengetahui,<br/>Building Management</p>
                              <p className="font-bold underline uppercase">{data.bmName}</p>
                          </div>
                          <div className="text-center w-60">
                              <p className="mb-4 text-xs">{data.city}, {formatDateSafe(data.date)}</p>
                              <div className="w-24 h-16 border-2 border-dashed border-slate-300 mx-auto flex items-center justify-center text-[10px] text-slate-400 mb-2">Materai<br/>10.000</div>
                              <p className="font-bold underline uppercase">{data.ownerName}</p>
                          </div>
                      </div>
                  </div>
              </>
          )}
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <Building2 size={16} className="text-amber-500" /> <span className="uppercase tracking-tighter">BUILDING PERMIT BUILDER</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white text-slate-800 border rounded-xl shadow-xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-bold flex items-center justify-between ${templateId === 1 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Permohonan Fit-Out {templateId === 1 && <Check size={14}/>}</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-bold flex items-center justify-between ${templateId === 2 ? 'text-emerald-700 bg-emerald-50' : ''}`}>Pernyataan Tata Tertib {templateId === 2 && <Check size={14}/>}</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Cetak</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans print:block print:overflow-visible print:bg-white">
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-amber-600 tracking-widest"><UserCircle2 size={14}/> Identitas Penghuni & Lokasi</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold" value={data.ownerName} onChange={e => handleDataChange('ownerName', e.target.value)} placeholder="Nama Penghuni / Pemilik" />
                 <input className="w-full p-2 border rounded-lg text-xs" value={data.phone} onChange={e => handleDataChange('phone', e.target.value)} placeholder="No. Telepon / HP" />
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs" value={data.tower} onChange={e => handleDataChange('tower', e.target.value)} placeholder="Tower / Blok" />
                    <input className="w-full p-2 border rounded-lg text-xs" value={data.unit} onChange={e => handleDataChange('unit', e.target.value)} placeholder="No. Unit" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-blue-600 tracking-widest"><Info size={14}/> Detail Renovasi & Waktu</h3>
                 <input className="w-full p-2 border rounded-lg text-xs" value={data.renovationType} onChange={e => handleDataChange('renovationType', e.target.value)} placeholder="Jenis Pekerjaan" />
                 <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-slate-500 font-bold mb-1 block">Tgl Mulai</label>
                      <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.startDate} onChange={e => handleDataChange('startDate', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 font-bold mb-1 block">Tgl Selesai</label>
                      <input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.endDate} onChange={e => handleDataChange('endDate', e.target.value)} />
                    </div>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-emerald-600 tracking-widest"><HardHat size={14}/> Data Kontraktor</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold" value={data.vendorName} onChange={e => handleDataChange('vendorName', e.target.value)} placeholder="Nama PT/Vendor" />
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border rounded-lg text-xs" value={data.picName} onChange={e => handleDataChange('picName', e.target.value)} placeholder="Nama PIC" />
                    <input className="w-full p-2 border rounded-lg text-xs" value={data.picPhone} onChange={e => handleDataChange('picPhone', e.target.value)} placeholder="No. HP PIC" />
                 </div>
                 <input className="w-full p-2 border rounded-lg text-xs" value={data.workerCount} onChange={e => handleDataChange('workerCount', e.target.value)} placeholder="Jumlah Pekerja (Orang)" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-slate-400 tracking-widest"><MapPin size={14}/> Building Management</h3>
                 <input className="w-full p-2 border rounded-lg text-xs" value={data.bmName} onChange={e => handleDataChange('bmName', e.target.value)} placeholder="Nama PIC BM / Pengelola" />
                 <input className="w-full p-2 border rounded-lg text-xs uppercase" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
              </div>
           </div>
        </div>

        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:block print:overflow-visible print:bg-white print:static`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                <DocumentContent />
            </div>
            </div>
      </main>

      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Izin Renovasi BM" price={15000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
