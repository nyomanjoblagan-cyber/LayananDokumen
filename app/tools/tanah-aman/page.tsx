'use client';

import { useState, Suspense, useEffect, useRef } from 'react';
import { 
  Printer, ArrowLeft, Map, Building2, UserCircle2, 
  MapPin, LayoutTemplate, X, PenTool, ShieldCheck, Navigation, Users,
  ChevronDown, Check, Edit3, Eye, ImagePlus, Scale, Scroll, Gavel, FileText
} from 'lucide-react';
import Link from 'next/link';

export default function TanahAmanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Editor Pro...</div>}>
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

  // DATA DEFAULT LENGKAP
  const [data, setData] = useState({
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
  });

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
  }, []);

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const TEMPLATES = [
    { id: 1, name: "Format Pro (2 Hal)", desc: "Legal formal dengan pasal lengkap" },
    { id: 2, name: "Format Modern (2 Hal)", desc: "Layout bersih rata kiri" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI DOKUMEN ---
  const DocumentContent = () => (
    <div className={`text-slate-900 font-serif leading-relaxed print:text-black ${templateId === 2 ? 'font-sans' : ''}`}>
      
      {/* HALAMAN 1 */}
      <div className="w-[210mm] h-[296mm] p-[25mm] bg-white shadow-2xl print:shadow-none box-border flex flex-col mb-10 print:mb-0 print:break-after-page overflow-hidden border-b print:border-none relative">
        <div className={`flex items-center gap-6 ${templateId === 1 ? 'border-b-4 border-double border-black' : 'border-b border-slate-200'} pb-4 mb-8 text-center shrink-0`}>
          {logo && <img src={logo} alt="Logo" className="w-16 h-16 object-contain" />}
          <div className="flex-grow text-center">
            <div className={`text-[12pt] font-black leading-tight uppercase ${templateId === 1 ? 'italic' : ''} whitespace-pre-line`}>
              {data.issuerOffice}
            </div>
          </div>
        </div>

        <div className="text-center mb-8 shrink-0">
          <h2 className="text-xl font-black underline uppercase decoration-1 underline-offset-4 tracking-widest">SURAT PERNYATAAN FISIK & TIDAK SENGKETA</h2>
          <p className="text-[10pt] font-sans mt-1 font-bold">NOMOR: {data.docNo}</p>
        </div>

        <div className="text-justify text-[10.5pt] space-y-6">
          <p>Saya yang bertanda tangan di bawah ini (selanjutnya disebut sebagai <b>PENYATA</b>):</p>
          <div className="ml-8 space-y-0.5 font-sans border-l-4 border-slate-100 pl-6 italic print:border-slate-300">
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.ownerName}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.ownerNik}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat Domisili</span><span>:</span><span>{data.ownerAddress}</span></div>
          </div>

          <p>Menyatakan dengan sesungguhnya di bawah sumpah bahwa saya menguasai sebidang tanah dengan rincian:</p>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-sans space-y-0.5 print:bg-transparent print:border-black">
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Letak Objek</span><span>:</span><span className="font-bold">{data.landLocation}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Luas Objek</span><span>:</span><span>{data.landSize}</span></div>
              <div className="grid grid-cols-[140px_10px_1fr]"><span>Alas Hak</span><span>:</span><span className="italic">{data.landStatus}</span></div>
          </div>

          <div className="space-y-3 pt-2">
            <h3 className="font-bold uppercase text-[9pt] border-b pb-1">PASAL 1: BATAS-BATAS BIDANG TANAH</h3>
            <div className="grid grid-cols-2 gap-x-12 gap-y-1 ml-4 font-sans text-[9pt]">
                <div className="flex gap-2"><span>- Utara:</span><span className="font-bold">{data.borderNorth}</span></div>
                <div className="flex gap-2"><span>- Selatan:</span><span className="font-bold">{data.borderSouth}</span></div>
                <div className="flex gap-2"><span>- Timur:</span><span className="font-bold">{data.borderEast}</span></div>
                <div className="flex gap-2"><span>- Barat:</span><span className="font-bold">{data.borderWest}</span></div>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold uppercase text-[9pt] border-b pb-1">PASAL 2: PERNYATAAN STATUS HUKUM</h3>
            <ol className="list-decimal ml-10 space-y-2">
              <li>Benar merupakan milik Penyata dan tidak dalam keadaan sengketa, baik kepemilikan maupun batas-batasnya dengan pihak manapun juga.</li>
            </ol>
          </div>
          <p className="text-center italic text-slate-400 text-[8pt] pt-20">--- Bersambung ke halaman berikutnya ---</p>
        </div>
      </div>

      {/* HALAMAN 2 */}
      <div className="w-[210mm] h-[296mm] p-[25mm] bg-white shadow-2xl print:shadow-none box-border flex flex-col relative overflow-hidden">
        <div className="text-justify text-[10.5pt] space-y-6">
          <div className="space-y-4">
            <ol className="list-decimal ml-10 space-y-2 font-sans" start={2}>
              <li>Tidak sedang dijadikan jaminan/agunanan utang piutang pada Bank atau Lembaga Keuangan lainnya.</li>
              <li>Tidak sedang berada dalam sitaan pengadilan atau terlibat dalam perkara perdata maupun pidana.</li>
              <li>Belum pernah dijualbelikan atau dialihkan haknya kepada pihak lain dalam bentuk apapun.</li>
            </ol>
          </div>
          <div className="space-y-4 pt-4">
            <h3 className="font-bold uppercase text-[9pt] border-b pb-1">PASAL 3: KLAUSUL PENJAMINAN & GANTI RUGI</h3>
            <ul className="list-disc ml-10 space-y-3 italic">
              <li>Penyata bersedia dituntut sesuai dengan ketentuan hukum yang berlaku sesuai Pasal 242 dan 266 KUHP tentang pemberian keterangan palsu di atas sumpah.</li>
              <li>Penyata bersedia menanggung segala biaya dan kerugian yang timbul tanpa melibatkan pihak Pemerintah Desa/Kelurahan maupun saksi-saksi.</li>
            </ul>
          </div>
          <div className="space-y-4 pt-4">
            <h3 className="font-bold uppercase text-[9pt] border-b pb-1">PASAL 4: PENUTUP</h3>
            <p>Surat Pernyataan ini dibuat dengan penuh kesadaran untuk dipergunakan sebagaimana mestinya.</p>
          </div>
          <div className="pt-4 text-right">
            <p className="font-bold">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : ''}</p>
          </div>
        </div>

        <div className="mt-auto border-t-2 border-black pt-6">
           <div className="grid grid-cols-2 gap-x-10 text-center mb-6">
              <div className="flex flex-col items-center">
                <p className="font-bold uppercase text-[8pt] mb-14 text-slate-500 print:text-black">Saksi I (RT/RW)</p>
                <p className="font-bold underline uppercase text-[10pt]">({data.witness1})</p>
              </div>
              <div className="flex flex-col items-center">
                <p className="font-bold uppercase text-[8pt] mb-14 text-slate-500 print:text-black">Saksi II (Tokoh)</p>
                <p className="font-bold underline uppercase text-[10pt]">({data.witness2})</p>
              </div>
           </div>
           <div className="flex flex-col items-center">
              <div className="text-center w-64 mb-6">
                 <p className="font-black uppercase text-[8pt] mb-2 tracking-widest text-slate-400 print:text-black">Penyata / Pemilik,</p>
                 <div className="border border-slate-200 w-24 h-12 mx-auto mb-2 flex items-center justify-center text-[7pt] italic uppercase print:border-black">Materai</div>
                 <p className="font-bold underline uppercase text-[11pt] leading-none">{data.ownerName}</p>
              </div>
              <div className="text-center w-full pt-6 border-t-2 border-dotted border-black">
                 <p className="text-[10pt] font-black uppercase mb-16 leading-tight">Mengetahui,<br/>{data.villageJob}</p>
                 <p className="font-bold underline uppercase text-[13pt] leading-none">{data.villageHead}</p>
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

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 h-16 border-b border-slate-700">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> <span>Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <h1 className="text-sm font-bold text-blue-400 uppercase tracking-tighter italic">Legal Statement Builder</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative font-sans text-left">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-all">
                <LayoutTemplate size={14} className="text-blue-400" />
                <span className="hidden sm:inline">{activeTemplateName}</span>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-transform' : ''} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 z-50 text-slate-900 overflow-hidden font-sans">
                  {TEMPLATES.map(t => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600' : ''}`}>
                      <div>{t.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase shadow-lg active:scale-95 transition-all flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Print 2 Halaman</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] relative">
        {/* --- FULL POWER EDITOR PANEL --- */}
        <div className={`no-print w-full md:w-[450px] lg:w-[500px] bg-white border-r overflow-y-auto p-4 md:p-6 space-y-6 z-20 h-full ${mobileView === 'preview' ? 'hidden md:block' : 'block'}`}>
           
           {/* Section 1: Instansi */}
           <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4 font-sans text-left">
              <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Instansi & Nomor</h3>
              <div className="flex items-center gap-4">
                 <button onClick={() => fileInputRef.current?.click()} className="w-14 h-14 bg-white border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center text-slate-400 hover:border-blue-400 transition-all shrink-0"><ImagePlus size={20} /></button>
                 <input type="file" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
                 <textarea className="flex-1 p-2 border rounded-xl text-[10px] font-bold uppercase bg-white h-20 leading-tight" value={data.issuerOffice} onChange={e => handleDataChange('issuerOffice', e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-2">
                 <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400 uppercase">Nomor Surat</label><input className="w-full p-2 border rounded-lg text-xs" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} /></div>
                 <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400 uppercase">Kota</label><input className="w-full p-2 border rounded-lg text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} /></div>
              </div>
           </div>

           {/* Section 2: Pemilik */}
           <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4 font-sans text-left">
              <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Data Pemilik (Penyata)</h3>
              <input className="w-full p-3 border rounded-xl font-bold uppercase text-xs" value={data.ownerName} onChange={e => handleDataChange('ownerName', e.target.value)} placeholder="Nama Lengkap" />
              <input className="w-full p-3 border rounded-xl text-xs" value={data.ownerNik} onChange={e => handleDataChange('ownerNik', e.target.value)} placeholder="NIK Pemilik" />
              <textarea className="w-full p-3 border rounded-xl text-xs h-16" value={data.ownerAddress} onChange={e => handleDataChange('ownerAddress', e.target.value)} placeholder="Alamat Sesuai KTP" />
           </div>

           {/* Section 3: Detail Tanah */}
           <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4 font-sans text-left">
              <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><MapPin size={12}/> Detail Objek Tanah</h3>
              <input className="w-full p-3 border rounded-xl text-xs" value={data.landLocation} onChange={e => handleDataChange('landLocation', e.target.value)} placeholder="Lokasi Tanah" />
              <div className="grid grid-cols-2 gap-2">
                 <input className="w-full p-3 border rounded-xl text-xs" value={data.landSize} onChange={e => handleDataChange('landSize', e.target.value)} placeholder="Luas ±" />
                 <input className="w-full p-3 border rounded-xl text-xs" value={data.landStatus} onChange={e => handleDataChange('landStatus', e.target.value)} placeholder="Alas Hak" />
              </div>
           </div>

           {/* Section 4: Batas */}
           <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-4 font-sans text-left">
              <h3 className="text-[10px] font-black uppercase text-rose-600 border-b pb-1 flex items-center gap-2"><Navigation size={12}/> Batas Wilayah</h3>
              <div className="grid grid-cols-2 gap-3">
                 <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400 uppercase">Utara</label><input className="w-full p-2 border rounded-lg text-xs" value={data.borderNorth} onChange={e => handleDataChange('borderNorth', e.target.value)} /></div>
                 <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400 uppercase">Selatan</label><input className="w-full p-2 border rounded-lg text-xs" value={data.borderSouth} onChange={e => handleDataChange('borderSouth', e.target.value)} /></div>
                 <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400 uppercase">Timur</label><input className="w-full p-2 border rounded-lg text-xs" value={data.borderEast} onChange={e => handleDataChange('borderEast', e.target.value)} /></div>
                 <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400 uppercase">Barat</label><input className="w-full p-2 border rounded-lg text-xs" value={data.borderWest} onChange={e => handleDataChange('borderWest', e.target.value)} /></div>
              </div>
           </div>

           {/* Section 5: Legalitas */}
           <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4 font-sans text-left pb-16">
              <h3 className="text-[10px] font-black uppercase text-indigo-600 border-b pb-1 flex items-center gap-2"><ShieldCheck size={12}/> Saksi & Pejabat</h3>
              <div className="grid grid-cols-2 gap-2">
                <input className="w-full p-3 border rounded-xl text-xs" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} placeholder="Saksi I (RT/RW)" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} placeholder="Saksi II (Tokoh)" />
              </div>
              <input className="w-full p-3 border rounded-xl font-bold text-xs" value={data.villageHead} onChange={e => handleDataChange('villageHead', e.target.value)} placeholder="Nama Kades/Lurah" />
              <input className="w-full p-3 border rounded-xl text-xs" value={data.villageJob} onChange={e => handleDataChange('villageJob', e.target.value)} placeholder="Jabatan Pejabat" />
           </div>
           <div className="h-10 md:hidden"></div>
        </div>

        {/* PREVIEW SCALE 0.43 */}
        <div className={`flex-1 bg-slate-200/50 relative h-full no-print ${mobileView === 'editor' ? 'hidden md:block' : 'block'}`}>
           <div className="absolute inset-0 overflow-y-auto overflow-x-hidden p-4 md:p-12 flex flex-col items-center custom-scrollbar">
              <div className="origin-top transition-transform duration-300 transform scale-[0.43] sm:scale-[0.55] md:scale-[0.8] lg:scale-100 h-fit mb-12">
                 <DocumentContent />
              </div>
           </div>
        </div>
      </main>

      {/* MOBILE NAV BAR */}
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