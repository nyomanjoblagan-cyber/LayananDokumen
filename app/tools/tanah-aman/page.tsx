'use client';

/**
 * FILE: TanahAmanPage.tsx
 * STATUS: PRODUCTION READY (FULL FEATURE - FIXED DEPLOY)
 * DESC: Generator Surat Pernyataan Fisik & Tidak Sengketa Tanah (2 Halaman)
 * FIX: Ganti styled-jsx ke dangerouslySetInnerHTML untuk stabilitas build TypeScript
 */

import { useState, Suspense, useEffect, useRef } from 'react';
import { 
  Printer, ArrowLeft, Map, Building2, UserCircle2, 
  MapPin, LayoutTemplate, X, PenTool, ShieldCheck, Navigation, Users,
  ChevronDown, Check, Edit3, Eye, ImagePlus, RotateCcw, Scale, Scroll, Gavel, FileText, ArrowLeftCircle
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface LandData {
  city: string;
  date: string;
  docNo: string;
  issuerOffice: string;
  villageHead: string;
  villageJob: string;
  ownerName: string;
  ownerNik: string;
  ownerAddress: string;
  landLocation: string;
  landSize: string;
  landStatus: string;
  borderNorth: string;
  borderSouth: string;
  borderEast: string;
  borderWest: string;
  witness1: string;
  witness2: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: LandData = {
  city: 'Denpasar',
  date: '', 
  docNo: '590/042/PEM/I/2026',
  issuerOffice: 'PEMERINTAH KOTA DENPASAR\nKECAMATAN DENPASAR UTARA\nDESA PEMECUTAN KAJA',
  villageHead: 'I NYOMAN GEDE, S.E.',
  villageJob: 'Perbekel Pemecutan Kaja',
  ownerName: 'BAGUS RAMADHAN',
  ownerNik: '5171010101990001',
  ownerAddress: 'Jl. Ahmad Yani No. 100, Denpasar Utara',
  landLocation: 'Jl. Ahmad Yani Gg. VII, Pemecutan Kaja',
  landSize: '200 m2',
  landStatus: 'Tanah Milik Adat (Pipil/Kikit) No. 1234',
  borderNorth: 'Tanah Milik Bapak Wayan',
  borderSouth: 'Jalan Desa / Gang VII',
  borderEast: 'Tanah Milik Ibu Sari',
  borderWest: 'Saluran Irigasi / Parit',
  witness1: 'I KETUT SUDARSANA',
  witness2: 'MADE WIRA'
};

export default function TanahAmanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs bg-slate-50">Memuat Editor Pro...</div>}>
      <LandSafetyBuilder />
    </Suspense>
  );
}

function LandSafetyBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<LandData>(INITIAL_DATA);
  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
  }, []);

  const handleDataChange = (field: keyof LandData, val: any) => setData({ ...data, [field]: val });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset semua data tanah?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, date: today });
        setLogo(null);
    }
  };

  const TEMPLATES = [
    { id: 1, name: "Format Pro (2 Hal)", desc: "Legal formal dengan pasal lengkap" },
    { id: 2, name: "Format Modern (2 Hal)", desc: "Layout bersih rata kiri" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI DOKUMEN ---
  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <div className={`text-slate-900 leading-normal print:text-black ${templateId === 2 ? 'font-sans' : 'font-serif'}`}>
        
        {/* HALAMAN 1 */}
        <div className="w-[210mm] min-h-[296mm] p-[20mm] md:p-[25mm] bg-white shadow-2xl print:shadow-none box-border flex flex-col mb-10 print:mb-0 print:break-after-page overflow-hidden relative border-b print:border-none">
          {/* KOP */}
          <div className={`flex items-center gap-6 border-b-4 border-double border-black pb-4 mb-8 text-center shrink-0`}>
            {logo ? (
              <img src={logo} alt="Logo" className="w-18 h-18 object-contain shrink-0" />
            ) : (
              <div className="w-16 h-16 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-300 shrink-0 print:hidden">
                <Building2 size={32} />
              </div>
            )}
            <div className="flex-grow text-center font-sans">
              <div className="text-[12pt] font-black leading-tight uppercase whitespace-pre-line text-slate-900">
                {data.issuerOffice}
              </div>
            </div>
          </div>

          {/* JUDUL */}
          <div className="text-center mb-8 shrink-0">
            <h2 className="text-xl font-black underline uppercase decoration-2 underline-offset-8 tracking-widest text-slate-900">SURAT PERNYATAAN FISIK & TIDAK SENGKETA</h2>
            <p className="text-[10pt] font-mono mt-4 font-bold text-slate-400 print:text-black uppercase">NOMOR Register: {data.docNo}</p>
          </div>

          {/* BODY HALAMAN 1 */}
          <div className="text-justify text-[10.5pt] space-y-5 flex-grow">
            <p>Saya yang bertanda tangan di bawah ini (selanjutnya disebut sebagai <strong>PENYATA</strong>):</p>
            <div className="ml-8 space-y-1 font-sans border-l-4 border-slate-100 pl-8 py-1 italic print:border-slate-300">
                <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold text-slate-900 uppercase">{data.ownerName}</span></div>
                <div className="grid grid-cols-[140px_10px_1fr]"><span>Nomor NIK</span><span>:</span><span className="font-mono">{data.ownerNik}</span></div>
                <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat Domisili</span><span>:</span><span className="leading-snug">{data.ownerAddress}</span></div>
            </div>

            <p>Menyatakan dengan sesungguhnya di bawah sumpah bahwa saya menguasai sebidang tanah dengan rincian identitas sebagai berikut:</p>
            <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 font-sans space-y-1.5 print:bg-transparent print:border-black break-inside-avoid">
                <div className="grid grid-cols-[140px_10px_1fr]"><span>Letak Objek</span><span>:</span><span className="font-bold text-slate-900">{data.landLocation}</span></div>
                <div className="grid grid-cols-[140px_10px_1fr]"><span>Luas Objek</span><span>:</span><span className="font-black text-blue-700 print:text-black">± {data.landSize}</span></div>
                <div className="grid grid-cols-[140px_10px_1fr]"><span>Status Hak</span><span>:</span><span className="italic">{data.landStatus}</span></div>
            </div>

            <div className="space-y-3 pt-2">
              <p className="font-black uppercase text-[9pt] tracking-widest text-slate-400 border-b pb-1 inline-block">PASAL 1: BATAS-BATAS BIDANG TANAH</p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 ml-4 font-sans text-[9.5pt]">
                  <div className="flex gap-2 border-b border-slate-100 pb-1"><span>- Utara :</span><span className="font-bold text-slate-900">{data.borderNorth}</span></div>
                  <div className="flex gap-2 border-b border-slate-100 pb-1"><span>- Selatan :</span><span className="font-bold text-slate-900">{data.borderSouth}</span></div>
                  <div className="flex gap-2 border-b border-slate-100 pb-1"><span>- Timur :</span><span className="font-bold text-slate-900">{data.borderEast}</span></div>
                  <div className="flex gap-2 border-b border-slate-100 pb-1"><span>- Barat :</span><span className="font-bold text-slate-900">{data.borderWest}</span></div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="font-black uppercase text-[9pt] tracking-widest text-slate-400 border-b pb-1 inline-block">PASAL 2: PERNYATAAN STATUS HUKUM</p>
              <ol className="list-decimal ml-10 space-y-2 leading-relaxed">
                <li>Benar merupakan milik Penyata dan tidak dalam keadaan sengketa, baik kepemilikan maupun batas-batasnya dengan pihak manapun juga.</li>
                <li>Benar tanah tersebut dikuasai secara fisik oleh Penyata secara terus-menerus dan itikad baik.</li>
              </ol>
            </div>
            <p className="text-center italic text-slate-300 text-[8pt] pt-12 uppercase tracking-widest">--- Bersambung ke halaman 2 ---</p>
          </div>
        </div>

        {/* HALAMAN 2 */}
        <div className="w-[210mm] min-h-[296mm] p-[20mm] md:p-[25mm] bg-white shadow-2xl print:shadow-none box-border flex flex-col relative overflow-hidden">
          <div className="text-justify text-[10.5pt] space-y-8 flex-grow">
            <div className="space-y-4">
              <ol className="list-decimal ml-10 space-y-3" start={3}>
                <li>Tanah tersebut tidak sedang dijadikan jaminan/agunan utang piutang pada Bank atau Lembaga Keuangan lainnya oleh pihak manapun.</li>
                <li>Tanah tersebut tidak sedang berada dalam sitaan pengadilan atau terlibat dalam perkara perdata maupun pidana di instansi penegak hukum manapun.</li>
                <li>Tanah tersebut belum pernah dijualbelikan atau dialihkan haknya kepada pihak lain dalam bentuk apapun (hibah/waris/tukar guling).</li>
              </ol>
            </div>
            
            <div className="space-y-3 pt-4">
              <p className="font-black uppercase text-[9pt] tracking-widest text-slate-400 border-b pb-1 inline-block">PASAL 3: KLAUSUL PENJAMINAN & SANKSI</p>
              <ul className="list-disc ml-10 space-y-3 italic text-slate-700 print:text-black leading-relaxed">
                <li>Penyata bersedia dituntut sesuai dengan ketentuan hukum yang berlaku sesuai <strong>Pasal 242 dan 266 KUHP</strong> tentang pemberian keterangan palsu di atas sumpah.</li>
                <li>Penyata bersedia menanggung segala biaya dan kerugian yang timbul di kemudian hari tanpa melibatkan pihak Pemerintah Desa/Kelurahan maupun saksi-saksi yang bertanda tangan.</li>
              </ul>
            </div>

            <div className="space-y-4 pt-4">
              <p className="font-black uppercase text-[9pt] tracking-widest text-slate-400 border-b pb-1 inline-block">PASAL 4: PENUTUP</p>
              <p>Demikian Surat Pernyataan ini saya buat dengan sebenarnya dalam keadaan sadar, sehat jasmani dan rohani, serta tanpa ada paksaan dari pihak manapun untuk dapat dipergunakan sebagai mestinya.</p>
            </div>

            <div className="pt-6 text-right font-bold text-slate-400 print:text-black">
              <p>{data.city}, {formatDateSafe(data.date)}</p>
            </div>
          </div>

          {/* AREA TANDA TANGAN */}
          <div className="mt-auto border-t-2 border-slate-900 pt-8 font-sans">
              <div className="grid grid-cols-2 gap-x-10 text-center mb-10">
                <div className="flex flex-col items-center">
                  <p className="font-black uppercase text-[8pt] mb-16 text-slate-300 print:text-black">Saksi I (RT/RW)</p>
                  <p className="font-black underline uppercase text-[10pt] text-slate-900">({data.witness1})</p>
                </div>
                <div className="flex flex-col items-center">
                  <p className="font-black uppercase text-[8pt] mb-16 text-slate-300 print:text-black">Saksi II (Tokoh Masyarakat)</p>
                  <p className="font-black underline uppercase text-[10pt] text-slate-900">({data.witness2})</p>
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="text-center w-80 mb-8 break-inside-avoid">
                   <p className="font-black uppercase text-[8pt] mb-3 tracking-[0.2em] text-slate-300 print:text-black">Penyata / Pemilik Tanah,</p>
                   <div className="border border-slate-200 w-24 h-16 mx-auto mb-4 flex items-center justify-center text-[7pt] italic uppercase text-slate-300 print:border-black print:text-black">Materai 10.000</div>
                   <p className="font-black underline uppercase text-[11pt] leading-none text-slate-900">{data.ownerName}</p>
                </div>
                <div className="text-center w-full pt-8 border-t-2 border-dotted border-slate-200 print:border-black">
                   <p className="text-[10pt] font-black uppercase mb-20 leading-tight text-slate-900">Mengetahui,<br/>{data.villageJob}</p>
                   <p className="font-black underline uppercase text-[13pt] leading-none text-slate-900">{data.villageHead}</p>
                </div>
              </div>
          </div>
        </div>
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 0; } 
          body { background: white !important; margin: 0 !important; padding: 0; min-width: 210mm; }
          .no-print { display: none !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 210mm; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white h-16 sticky top-0 z-50 border-b border-slate-700 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block mx-2"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-tighter italic">
               <Gavel size={16} /> <span>Land Safety Statement Builder</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative text-left">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all uppercase tracking-widest">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden p-1 text-slate-900 font-sans">
                  {TEMPLATES.map(t => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm rounded-lg hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold' : ''}`}>
                      <div className="font-bold">{t.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-xl font-bold text-xs uppercase shadow-lg active:scale-95 transition-all flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Print (2 Hal)</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans"><h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor Proyek Tanah</h2><button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button></div>

           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Wilayah & Kop</h3>
                 <div className="flex items-center gap-4 py-2">
                    <div onClick={() => fileInputRef.current?.click()} className="w-16 h-16 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 overflow-hidden shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" alt="Logo" /> : <ImagePlus size={20} className="text-slate-300" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    <textarea className="flex-1 p-2 border rounded-lg text-[10px] font-bold focus:ring-2 focus:ring-blue-500 outline-none uppercase h-20 leading-tight" value={data.issuerOffice} onChange={e => handleDataChange('issuerOffice', e.target.value)} placeholder="Instansi Penerbit" />
                 </div>
                 <input className="w-full p-2 border rounded-lg text-xs font-mono focus:ring-2 focus:ring-blue-500 outline-none" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} placeholder="Nomor Surat" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Data Penyata</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={data.ownerName} onChange={e => handleDataChange('ownerName', e.target.value)} placeholder="Nama Lengkap" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-mono" value={data.ownerNik} onChange={e => handleDataChange('ownerNik', e.target.value)} placeholder="NIK Pemilik" />
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.ownerAddress} onChange={e => handleDataChange('ownerAddress', e.target.value)} placeholder="Alamat Domisili" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><MapPin size={12}/> Detail Bidang Tanah</h3>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-amber-500 outline-none" value={data.landLocation} onChange={e => handleDataChange('landLocation', e.target.value)} placeholder="Lokasi Tanah" />
                 <div className="grid grid-cols-2 gap-3">
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.landSize} onChange={e => handleDataChange('landSize', e.target.value)} placeholder="Luas Tanah" />
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.landStatus} onChange={e => handleDataChange('landStatus', e.target.value)} placeholder="Status Alas Hak" />
                 </div>
                 <div className="grid grid-cols-2 gap-2 mt-2">
                    <input className="p-2 border rounded-lg text-[10px] focus:ring-2 focus:ring-rose-500 outline-none" value={data.borderNorth} onChange={e => handleDataChange('borderNorth', e.target.value)} placeholder="Batas Utara" />
                    <input className="p-2 border rounded-lg text-[10px] focus:ring-2 focus:ring-rose-500 outline-none" value={data.borderSouth} onChange={e => handleDataChange('borderSouth', e.target.value)} placeholder="Batas Selatan" />
                    <input className="p-2 border rounded-lg text-[10px] focus:ring-2 focus:ring-rose-500 outline-none" value={data.borderEast} onChange={e => handleDataChange('borderEast', e.target.value)} placeholder="Batas Timur" />
                    <input className="p-2 border rounded-lg text-[10px] focus:ring-2 focus:ring-rose-500 outline-none" value={data.borderWest} onChange={e => handleDataChange('borderWest', e.target.value)} placeholder="Batas Barat" />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 pb-10">
                 <h3 className="text-[10px] font-black uppercase text-indigo-600 border-b pb-1 tracking-widest flex items-center gap-2"><Scale size={12}/> Otoritas & Saksi</h3>
                 <div className="grid grid-cols-2 gap-3">
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} placeholder="Saksi I (RT/RW)" />
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} placeholder="Saksi II (Tokoh)" />
                 </div>
                 <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-indigo-500 outline-none uppercase" value={data.villageHead} onChange={e => handleDataChange('villageHead', e.target.value)} placeholder="Kepala Desa/Lurah" />
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none" value={data.villageJob} onChange={e => handleDataChange('villageJob', e.target.value)} placeholder="Jabatan Penanda Tangan" />
                 <div className="grid grid-cols-2 gap-3 pt-2">
                    <input className="w-full p-2 border rounded-lg text-xs uppercase focus:ring-2 focus:ring-indigo-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                    <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                 </div>
              </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <DocumentContent />
            </div>
            </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={3000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
// FORCE-HMR-UPDATE