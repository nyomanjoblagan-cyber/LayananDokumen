'use client';

import { useState, Suspense, useRef, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Car, Building2, UserCircle2, 
  MapPin, LayoutTemplate, ChevronDown, X, PenTool, ShieldCheck, Key, FileWarning,
  Edit3, Eye, Check
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function SewaKendaraanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Editor Perjanjian...</div>}>
      <VehicleRentalBuilder />
    </Suspense>
  );
}

function VehicleRentalBuilder() {
  // --- STATE SYSTEM (SERAGAM) ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Denpasar',
    date: '',
    docNo: 'RENT/2026/01/007',
    ownerName: 'I MADE WIGUNA',
    ownerNik: '5171010101880001',
    ownerAddress: 'Jl. Sunset Road No. 88, Kuta, Bali',
    renterName: 'JOHN DOE',
    renterNik: '3172020202950003',
    renterAddress: 'Villa Seminyak, No. 12A, Badung, Bali',
    vehicleModel: 'Toyota Avanza Veloz 2024',
    plateNumber: 'DK 1234 AB',
    frameNumber: 'MHFW123456789',
    engineNumber: '1NR-FE12345',
    rentalDuration: '3 (Tiga) Hari',
    startDate: '2026-01-10',
    endDate: '2026-01-13',
    rentalPrice: 'Rp 450.000,- / Hari',
    totalPrice: 'Rp 1.350.000,-',
    fineRate: 'Rp 50.000,- / Jam (Keterlambatan)'
  });

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
  }, []);

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const TEMPLATES = [
    { id: 1, name: "Format Klasik", desc: "Bahasa hukum standar Indonesia" },
    { id: 2, name: "Format Modern", desc: "Layout bersih dengan aksen biru" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 print:h-auto print:min-h-0 print:p-[15mm] ${templateId === 1 ? 'font-serif text-[10pt]' : 'font-sans text-[9.5pt]'}`}>
      
      {/* JUDUL */}
      <div className="text-center mb-6 shrink-0 leading-tight">
        <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest">SURAT PERJANJIAN SEWA KENDARAAN</h2>
        <p className="text-[9pt] font-sans mt-1 italic uppercase tracking-widest text-slate-500">Nomor: {data.docNo}</p>
      </div>

      {/* ISI SURAT */}
      <div className="space-y-4 flex-grow text-justify overflow-hidden leading-relaxed">
        <p>Pada hari ini, tanggal {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'}) : ''}, kami yang bertanda tangan di bawah ini:</p>
        
        <div className="space-y-3">
            <div className="flex gap-4">
                <span className="w-4 font-bold">1.</span>
                <div className="flex-grow border-l-4 border-slate-100 pl-4 print:border-slate-300">
                    <div className="grid grid-cols-[130px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.ownerName}</span></div>
                    <div className="grid grid-cols-[130px_10px_1fr]"><span>NIK / No. KTP</span><span>:</span><span>{data.ownerNik}</span></div>
                    <div className="grid grid-cols-[130px_10px_1fr]"><span>Alamat</span><span>:</span><span>{data.ownerAddress}</span></div>
                    <p className="mt-1 font-bold italic text-blue-700 print:text-black text-[9pt]">Disebut sebagai PIHAK PERTAMA (Pemilik Kendaraan).</p>
                </div>
            </div>

            <div className="flex gap-4">
                <span className="w-4 font-bold">2.</span>
                <div className="flex-grow border-l-4 border-slate-100 pl-4 print:border-slate-300">
                    <div className="grid grid-cols-[130px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.renterName}</span></div>
                    <div className="grid grid-cols-[130px_10px_1fr]"><span>NIK / No. KTP</span><span>:</span><span>{data.renterNik}</span></div>
                    <div className="grid grid-cols-[130px_10px_1fr]"><span>Alamat</span><span>:</span><span>{data.renterAddress}</span></div>
                    <p className="mt-1 font-bold italic text-blue-700 print:text-black text-[9pt]">Disebut sebagai PIHAK KEDUA (Penyewa Kendaraan).</p>
                </div>
            </div>
        </div>

        <p>Kedua belah pihak sepakat melakukan sewa menyewa satu unit kendaraan dengan spesifikasi sebagai berikut:</p>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-sans text-[9pt] grid grid-cols-2 gap-x-8 gap-y-1 print:bg-transparent print:border-black">
            <div className="flex justify-between border-b border-slate-200 print:border-black"><span>Merk / Type</span><span className="font-bold">{data.vehicleModel}</span></div>
            <div className="flex justify-between border-b border-slate-200 print:border-black"><span>No. Polisi</span><span className="font-bold">{data.plateNumber}</span></div>
            <div className="flex justify-between border-b border-slate-200 print:border-black"><span>No. Rangka</span><span>{data.frameNumber}</span></div>
            <div className="flex justify-between border-b border-slate-200 print:border-black"><span>No. Mesin</span><span>{data.engineNumber}</span></div>
        </div>

        <div className="space-y-3 pt-2">
            <p><span className="font-bold">PASAL 1 (DURASI & BIAYA):</span> PIHAK KEDUA menyewa selama <b>{data.rentalDuration}</b> terhitung tanggal <b>{data.startDate}</b> hingga <b>{data.endDate}</b> dengan total biaya sewa sebesar <b>{data.totalPrice}</b>.</p>
            <p><span className="font-bold">PASAL 2 (TANGGUNG JAWAB):</span> PIHAK KEDUA bertanggung jawab penuh atas segala kerusakan mekanis maupun fisik, kehilangan kendaraan, atau denda tilang (E-TLE) yang terjadi selama masa sewa berlangsung.</p>
            <p><span className="font-bold">PASAL 3 (PENGEMBALIAN):</span> Kendaraan wajib dikembalikan tepat waktu dalam kondisi semula. Keterlambatan pengembalian dikenakan denda sebesar <b>{data.fineRate}</b>.</p>
        </div>
        
        <p>Demikian surat perjanjian ini dibuat dalam rangkap dua bermaterai cukup untuk dipergunakan sebagaimana mestinya.</p>
      </div>

      {/* TANDA TANGAN (NORMAL FLOW) */}
      <div className="shrink-0 mt-8 pt-6 border-t border-slate-100 print:border-black" style={{ pageBreakInside: 'avoid' }}>
         <div className="grid grid-cols-2 gap-10 text-center">
            <div className="flex flex-col h-40">
               <p className="uppercase text-[8.5pt] font-black text-slate-400 tracking-widest print:text-black mb-1">Pihak Pertama,</p>
               <p className="uppercase text-[8pt] text-slate-400 print:text-black mb-6 italic">(Pemilik)</p>
               <div className="mt-auto">
                  <p className="font-bold underline uppercase text-[10.5pt] tracking-tight leading-none">{data.ownerName}</p>
               </div>
            </div>

            <div className="flex flex-col h-40">
               <p className="text-[9pt] font-bold mb-1">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'}) : ''}</p>
               <p className="uppercase text-[8.5pt] font-black text-slate-400 tracking-widest print:text-black mb-1">Pihak Kedua,</p>
               <div className="mt-auto flex flex-col items-center">
                  <div className="border border-slate-200 w-24 h-12 flex items-center justify-center text-[7pt] text-slate-300 italic mb-2 print:border-black print:text-black uppercase">Materai</div>
                  <p className="font-bold underline uppercase text-[10.5pt] tracking-tight leading-none">{data.renterName}</p>
               </div>
            </div>
         </div>
      </div>
    </div>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; } 
          body { background: white !important; margin: 0 !important; }
          .no-print, .mobile-nav { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
        }
      `}</style>

      {/* HEADER NAV (SERAGAM) */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> <span>Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-tighter italic">
               <Car size={16} /> <span>Vehicle Rental Builder</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-all">
                <LayoutTemplate size={14} className="text-blue-400" />
                <span className="hidden sm:inline">{activeTemplateName}</span>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-transform' : ''} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 z-50 text-slate-900 font-sans overflow-hidden">
                  {TEMPLATES.map(t => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600' : ''}`}>
                      <div>{t.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] relative font-sans text-left">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-white border-r overflow-y-auto p-4 md:p-6 space-y-6 z-20 h-full ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
              <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Key size={12}/> Pihak I (Pemilik)</h3>
              <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.ownerName} onChange={e => handleDataChange('ownerName', e.target.value)} placeholder="Nama Pemilik" />
              <input className="w-full p-2 border rounded text-xs" value={data.ownerNik} onChange={e => handleDataChange('ownerNik', e.target.value)} placeholder="NIK Pemilik" />
              <textarea className="w-full p-2 border rounded text-xs h-16 resize-none leading-tight" value={data.ownerAddress} onChange={e => handleDataChange('ownerAddress', e.target.value)} placeholder="Alamat Pemilik" />
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans">
              <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Pihak II (Penyewa)</h3>
              <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.renterName} onChange={e => handleDataChange('renterName', e.target.value)} placeholder="Nama Penyewa" />
              <input className="w-full p-2 border rounded text-xs" value={data.renterNik} onChange={e => handleDataChange('renterNik', e.target.value)} placeholder="NIK Penyewa" />
              <textarea className="w-full p-2 border rounded text-xs h-16 resize-none leading-tight" value={data.renterAddress} onChange={e => handleDataChange('renterAddress', e.target.value)} placeholder="Alamat Penyewa" />
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans">
              <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 flex items-center gap-2"><Car size={12}/> Detail Kendaraan</h3>
              <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.vehicleModel} onChange={e => handleDataChange('vehicleModel', e.target.value)} />
              <div className="grid grid-cols-2 gap-2">
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.plateNumber} onChange={e => handleDataChange('plateNumber', e.target.value)} placeholder="No. Polisi" />
                 <input className="w-full p-2 border rounded text-xs" value={data.frameNumber} onChange={e => handleDataChange('frameNumber', e.target.value)} placeholder="No. Rangka" />
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans pb-10">
              <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><FileWarning size={12}/> Ketentuan Sewa</h3>
              <div className="grid grid-cols-2 gap-2">
                 <input className="w-full p-2 border rounded text-xs" value={data.rentalDuration} onChange={e => handleDataChange('rentalDuration', e.target.value)} placeholder="Durasi" />
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.totalPrice} onChange={e => handleDataChange('totalPrice', e.target.value)} placeholder="Total Biaya" />
              </div>
              <input className="w-full p-2 border rounded text-xs" value={data.fineRate} onChange={e => handleDataChange('fineRate', e.target.value)} placeholder="Denda Telat" />
              <div className="grid grid-cols-2 gap-2 border-t pt-4">
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                 <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
              </div>
           </div>
           <div className="h-20 md:hidden"></div>
        </div>

        {/* PREVIEW AREA (STABILIZED) */}
        <div className={`flex-1 bg-slate-200/50 relative h-full no-print ${mobileView === 'editor' ? 'hidden lg:block' : 'block'}`}>
           <div className="absolute inset-0 overflow-y-auto overflow-x-hidden p-4 md:p-12 flex justify-center custom-scrollbar">
              <div className="origin-top transition-transform duration-300 transform scale-[0.43] sm:scale-[0.55] md:scale-[0.8] lg:scale-100 h-fit mb-12">
                 <DocumentContent />
                 <div className="h-24 lg:hidden"></div>
              </div>
           </div>
        </div>
      </main>

      {/* MOBILE NAV (SERAGAM) */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 z-50 mobile-nav">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}><Eye size={16}/> Preview</button>
      </div>

      <div id="print-only-root" className="hidden">
         <div className="flex flex-col">
            <DocumentContent />
         </div>
      </div>
    </div>
  );
}