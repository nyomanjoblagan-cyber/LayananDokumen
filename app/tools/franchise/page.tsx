'use client';

import { useState, useEffect, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Store, ShieldCheck, User, 
  FileText, BadgeCheck, Coins, LayoutTemplate, ChevronDown, Check, Edit3, Eye, Briefcase
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function FranchisePage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium font-sans">Memuat Editor Franchise...</div>}>
      <FranchiseBuilder />
    </Suspense>
  );
}

function FranchiseBuilder() {
  // --- STATE SYSTEM ---
  const [isClient, setIsClient] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Jakarta',
    date: '', 
    docNo: 'FRA/LGL/2026/012',
    
    // FRANCHISOR
    p1Name: 'DODI PRASETYO',
    p1Title: 'Direktur Utama',
    p1Company: 'PT. KULINER NUSANTARA JAYA',
    p1Brand: 'Kopi Kenangan Rakyat',
    p1Address: 'Menara Bisnis Lt. 12, Jl. HR Rasuna Said, Jakarta Selatan',

    // FRANCHISEE
    p2Name: 'IWAN SETIAWAN',
    p2ID: '3273012345670001',
    p2Address: 'Jl. Merdeka No. 88, Bandung, Jawa Barat',
    p2Location: 'Cihampelas Walk, Bandung (Unit G-05)',

    // DETAIL BISNIS
    franchiseFee: 'Rp 150.000.000,-',
    royaltyFee: '5% dari Omzet Kotor',
    marketingFee: '1% dari Omzet Kotor',
    contractDuration: '5 (Lima) Tahun',
    
    // SAKSI
    witness1: 'SITI RAHMAWATI, S.H.',
    witness2: 'ANDI WIJAYA'
  });

  // Hydration Fix
  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
  }, []);

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const TEMPLATES = [
    { id: 1, name: "Klasik Formal", desc: "Format perjanjian standar (Serif)" },
    { id: 2, name: "Modern Corporate", desc: "Tampilan bersih & tegas (Sans)" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  // (Tanpa Padding Hardcode, karena akan diatur oleh Wrapper)
  const DocumentContent = () => (
    <div className="w-full h-full text-slate-900">
      
      {/* --- TEMPLATE 1: KLASIK SERIF --- */}
      {templateId === 1 && (
        <div className="font-serif text-[11pt] leading-relaxed text-justify">
          <div className="text-center mb-8">
            <h1 className="text-xl font-black underline uppercase decoration-2 underline-offset-4">PERJANJIAN WARALABA</h1>
            <p className="text-[10pt] font-sans mt-2 italic text-slate-500">Nomor: {data.docNo}</p>
          </div>

          <p className="mb-4">
            Pada hari ini, <b>{isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'}) : '...'}</b>, bertempat di {data.city}, kami yang bertanda tangan di bawah ini:
          </p>
          
          <div className="mb-6 pl-4 space-y-4">
              <div className="flex break-inside-avoid">
                  <span className="w-8 font-bold">1.</span>
                  <div className="flex-1">
                    <table className="w-full">
                      <tbody>
                        <tr><td className="w-24 font-bold">Nama</td><td>: <b>{data.p1Name}</b></td></tr>
                        <tr><td className="font-bold">Jabatan</td><td>: {data.p1Title}</td></tr>
                        <tr><td className="font-bold">Perusahaan</td><td>: {data.p1Company}</td></tr>
                        <tr><td className="font-bold align-top">Alamat</td><td>: {data.p1Address}</td></tr>
                      </tbody>
                    </table>
                    <p className="mt-2">Bertindak untuk dan atas nama <b>{data.p1Company}</b> selaku Pemilik Merek <b>"{data.p1Brand}"</b>, selanjutnya disebut <b>PIHAK PERTAMA (FRANCHISOR)</b>.</p>
                  </div>
              </div>
              <div className="flex break-inside-avoid">
                  <span className="w-8 font-bold">2.</span>
                  <div className="flex-1">
                    <table className="w-full">
                      <tbody>
                        <tr><td className="w-24 font-bold">Nama</td><td>: <b>{data.p2Name}</b></td></tr>
                        <tr><td className="font-bold">No. KTP</td><td>: {data.p2ID}</td></tr>
                        <tr><td className="font-bold align-top">Alamat</td><td>: {data.p2Address}</td></tr>
                      </tbody>
                    </table>
                    <p className="mt-2">Bertindak atas nama pribadi, bermaksud menjalankan usaha di <b>{data.p2Location}</b>, selanjutnya disebut <b>PIHAK KEDUA (FRANCHISEE)</b>.</p>
                  </div>
              </div>
          </div>

          <p className="mb-4">Para Pihak sepakat mengikatkan diri dalam Perjanjian Waralaba dengan ketentuan:</p>

          <div className="space-y-4 mb-8">
              <div className="break-inside-avoid">
                <h3 className="font-bold text-center underline uppercase mb-1">Pasal 1: PEMBERIAN HAK</h3>
                <p>Pihak Pertama memberikan hak eksklusif kepada Pihak Kedua untuk menggunakan merek dan sistem <b>{data.p1Brand}</b> di lokasi <b>{data.p2Location}</b>.</p>
              </div>

              <div className="break-inside-avoid">
                <h3 className="font-bold text-center underline uppercase mb-1">Pasal 2: BIAYA & ROYALTI</h3>
                <ol className="list-decimal list-inside space-y-1">
                  <li>Franchise Fee: <b>{data.franchiseFee}</b> dibayar di muka.</li>
                  <li>Royalty Fee: <b>{data.royaltyFee}</b> dibayar setiap bulan.</li>
                  <li>Marketing Fee: <b>{data.marketingFee}</b> dibayar setiap bulan.</li>
                </ol>
              </div>

              <div className="break-inside-avoid">
                <h3 className="font-bold text-center underline uppercase mb-1">Pasal 3: JANGKA WAKTU</h3>
                <p>Perjanjian ini berlaku selama <b>{data.contractDuration}</b> terhitung sejak tanggal ditandatanganinya perjanjian ini.</p>
              </div>

              <div className="break-inside-avoid">
                  <h3 className="font-bold text-center underline uppercase mb-1">Pasal 4: PENYELESAIAN PERSELISIHAN</h3>
                  <p>Segala perselisihan akan diselesaikan secara musyawarah. Apabila tidak tercapai kata sepakat, akan diselesaikan di Pengadilan Negeri {data.city}.</p>
              </div>
          </div>

          <p className="mb-8">
            Demikian perjanjian ini dibuat dalam 2 (dua) rangkap bermaterai cukup.
          </p>

          <div className="break-inside-avoid mt-8 pt-4">
            <table className="w-full text-center">
              <tbody>
                <tr>
                  <td className="pb-24 font-bold w-1/2 align-top">PIHAK PERTAMA</td>
                  <td className="pb-24 font-bold w-1/2 align-top">PIHAK KEDUA</td>
                </tr>
                <tr>
                  <td className="uppercase font-bold underline">({data.p1Name})</td>
                  <td className="uppercase font-bold underline">({data.p2Name})</td>
                </tr>
                <tr>
                  <td className="pt-12 pb-16 font-bold text-xs text-slate-500 align-top" colSpan={2}>Saksi-Saksi:</td>
                </tr>
                <tr>
                  <td className="uppercase font-bold text-sm">({data.witness1})</td>
                  <td className="uppercase font-bold text-sm">({data.witness2})</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- TEMPLATE 2: MODERN CORPORATE --- */}
      {templateId === 2 && (
        <div className="font-sans text-[10pt] leading-snug text-slate-800">
          <div className="flex justify-between items-start border-b-4 border-blue-900 pb-4 mb-6">
              <div>
                 <h1 className="text-3xl font-black text-blue-900 uppercase tracking-tighter leading-none">Perjanjian Waralaba</h1>
                 <p className="text-xs font-bold text-slate-500 tracking-widest uppercase mt-1">{data.p1Brand}</p>
              </div>
              <div className="text-right">
                 <div className="text-[10px] font-bold text-slate-400 uppercase">Nomor Dokumen</div>
                 <div className="font-mono font-bold text-slate-900">{data.docNo}</div>
              </div>
          </div>

          <div className="bg-slate-50 px-4 py-3 rounded-lg border border-slate-200 mb-6 text-xs flex justify-between">
              <p>Tanggal: <b>{isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : ''}</b></p>
              <p>Lokasi: <b>{data.city}</b></p>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50/50 p-4 rounded border border-blue-100 break-inside-avoid">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 mb-2 tracking-widest border-b border-blue-200 pb-1">Franchisor</h3>
                 <div className="space-y-1 text-xs">
                    <p><span className="block text-[9px] text-slate-400 uppercase font-bold">Perusahaan</span> <span className="font-bold">{data.p1Company}</span></p>
                    <p><span className="block text-[9px] text-slate-400 uppercase font-bold">Diwakili Oleh</span> {data.p1Name} ({data.p1Title})</p>
                    <p><span className="block text-[9px] text-slate-400 uppercase font-bold">Alamat</span> {data.p1Address}</p>
                 </div>
              </div>
              <div className="bg-emerald-50/50 p-4 rounded border border-emerald-100 break-inside-avoid">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 mb-2 tracking-widest border-b border-emerald-200 pb-1">Franchisee</h3>
                 <div className="space-y-1 text-xs">
                    <p><span className="block text-[9px] text-slate-400 uppercase font-bold">Nama Mitra</span> <span className="font-bold">{data.p2Name}</span></p>
                    <p><span className="block text-[9px] text-slate-400 uppercase font-bold">Identitas</span> {data.p2ID}</p>
                    <p><span className="block text-[9px] text-slate-400 uppercase font-bold">Lokasi Usaha</span> {data.p2Location}</p>
                 </div>
              </div>
          </div>

          <div className="space-y-4 mb-8">
              <div className="border-l-4 border-blue-900 pl-4 py-1 break-inside-avoid">
                 <h4 className="font-bold text-blue-900 uppercase text-xs mb-1">Pasal 1 &mdash; Lisensi</h4>
                 <p className="text-justify text-slate-600 text-xs">Franchisor memberikan lisensi kepada Franchisee untuk menggunakan merek <b>{data.p1Brand}</b> secara eksklusif di lokasi yang disepakati.</p>
              </div>
              <div className="border-l-4 border-blue-900 pl-4 py-1 break-inside-avoid">
                 <h4 className="font-bold text-blue-900 uppercase text-xs mb-1">Pasal 2 &mdash; Biaya</h4>
                 <div className="grid grid-cols-3 gap-2 mt-1">
                    <div className="bg-slate-100 p-2 rounded">
                       <span className="block text-[8px] uppercase font-bold text-slate-500">Franchise Fee</span>
                       <span className="font-bold text-xs">{data.franchiseFee}</span>
                    </div>
                    <div className="bg-slate-100 p-2 rounded">
                       <span className="block text-[8px] uppercase font-bold text-slate-500">Royalty Fee</span>
                       <span className="font-bold text-xs">{data.royaltyFee}</span>
                    </div>
                    <div className="bg-slate-100 p-2 rounded">
                       <span className="block text-[8px] uppercase font-bold text-slate-500">Marketing Fee</span>
                       <span className="font-bold text-xs">{data.marketingFee}</span>
                    </div>
                 </div>
              </div>
              <div className="border-l-4 border-blue-900 pl-4 py-1 break-inside-avoid">
                 <h4 className="font-bold text-blue-900 uppercase text-xs mb-1">Pasal 3 &mdash; Ketentuan</h4>
                 <p className="text-justify text-slate-600 text-xs">Berlaku selama <b>{data.contractDuration}</b>. Franchisee wajib mematuhi SOP dan menjaga kerahasiaan bisnis.</p>
              </div>
          </div>

          <div className="flex items-end justify-between pt-8 border-t-2 border-slate-900 mt-auto break-inside-avoid">
              <div className="text-center w-1/3">
                 <p className="text-[9px] font-bold text-slate-400 uppercase mb-16">Pihak Pertama</p>
                 <p className="font-bold border-b border-slate-900 pb-1 text-xs">{data.p1Name}</p>
                 <p className="text-[8px] text-slate-500 mt-1">Direktur Utama</p>
              </div>
              <div className="text-center w-1/4">
                 <p className="text-[9px] font-bold text-slate-400 uppercase mb-4">Saksi-Saksi</p>
                 <div className="space-y-8 text-[9px]">
                    <p className="border-b border-slate-300 pb-1">{data.witness1}</p>
                    <p className="border-b border-slate-300 pb-1">{data.witness2}</p>
                 </div>
              </div>
              <div className="text-center w-1/3">
                 <p className="text-[9px] font-bold text-slate-400 uppercase mb-16">Pihak Kedua</p>
                 <p className="font-bold border-b border-slate-900 pb-1 text-xs">{data.p2Name}</p>
                 <p className="text-[8px] text-slate-500 mt-1">Mitra Usaha</p>
              </div>
          </div>
        </div>
      )}
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800 overflow-x-hidden">
      
      {/* --- JURUS TABLE WRAPPER (Teknik dari file Beasiswa) --- */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          .no-print { display: none !important; }
          body { background: white; margin: 0; padding: 0; display: block !important; }
          
          #print-only-root { 
            display: block !important; 
            width: 100%; 
            height: auto; 
            position: absolute; 
            top: 0; 
            left: 0; 
            z-index: 9999; 
            background: white; 
          }
          
          /* INI KUNCINYA: Membuat margin virtual menggunakan tinggi tabel */
          .print-table { width: 100%; border-collapse: collapse; }
          .print-table thead { height: 25mm; } 
          .print-table tfoot { height: 25mm; } 
          .print-content-wrapper { padding: 0 25mm; } /* Padding Horizontal 25mm */
          
          tr, .break-inside-avoid { page-break-inside: avoid !important; }
        }
      `}</style>

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs">
              <ArrowLeft size={18} /> Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <Briefcase size={16} /> <span>FRANCHISE EDITOR</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-colors min-w-[160px] justify-between">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-all' : 'transition-all'} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50 text-slate-900">
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pilih Template</div>
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'}`}>
                      <div><div className="font-bold">{t.name}</div><div className="text-[10px] text-slate-400 mt-0.5">{t.desc}</div></div>
                      {templateId === t.id && <Check size={14} className="text-blue-600"/>}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg active:scale-95">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)] overflow-hidden">
        
        {/* INPUT SIDEBAR */}
        <div className={`no-print w-full lg:w-[420px] shrink-0 h-full overflow-y-auto pr-2 pb-20 space-y-6 sidebar-input ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2 text-slate-700 font-bold uppercase text-xs">
                <FileText size={14} className="text-blue-600" /> Dokumen Utama
             </div>
             <div className="p-4 space-y-4">
                <input className="w-full p-2 border rounded text-xs font-bold font-mono" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} placeholder="Nomor Dokumen" />
                <div className="grid grid-cols-2 gap-3">
                   <input type="text" className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                   <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                </div>
             </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2 text-slate-700 font-bold uppercase text-xs">
                <BadgeCheck size={14} className="text-amber-600" /> Franchisor (Pihak 1)
             </div>
             <div className="p-4 space-y-3">
                <input className="w-full p-2 border rounded text-xs font-bold" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} placeholder="Nama Penanggung Jawab" />
                <input className="w-full p-2 border rounded text-xs" value={data.p1Title} onChange={e => handleDataChange('p1Title', e.target.value)} placeholder="Jabatan" />
                <input className="w-full p-2 border rounded text-xs" value={data.p1Company} onChange={e => handleDataChange('p1Company', e.target.value)} placeholder="Nama Perusahaan" />
                <input className="w-full p-2 border rounded text-xs" value={data.p1Brand} onChange={e => handleDataChange('p1Brand', e.target.value)} placeholder="Merek Dagang" />
                <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} placeholder="Alamat Perusahaan" />
             </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2 text-slate-700 font-bold uppercase text-xs">
                <Store size={14} className="text-emerald-600" /> Franchisee (Pihak 2)
             </div>
             <div className="p-4 space-y-3">
                <input className="w-full p-2 border rounded text-xs font-bold" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} placeholder="Nama Mitra" />
                <input className="w-full p-2 border rounded text-xs" value={data.p2ID} onChange={e => handleDataChange('p2ID', e.target.value)} placeholder="No KTP" />
                <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} placeholder="Alamat Mitra" />
                <input className="w-full p-2 border rounded text-xs" value={data.p2Location} onChange={e => handleDataChange('p2Location', e.target.value)} placeholder="Lokasi Outlet" />
             </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2 text-slate-700 font-bold uppercase text-xs">
                <Coins size={14} className="text-blue-600" /> Biaya & Durasi
             </div>
             <div className="p-4 space-y-3">
                <input className="w-full p-2 border rounded text-xs" value={data.franchiseFee} onChange={e => handleDataChange('franchiseFee', e.target.value)} placeholder="Franchise Fee" />
                <input className="w-full p-2 border rounded text-xs" value={data.royaltyFee} onChange={e => handleDataChange('royaltyFee', e.target.value)} placeholder="Royalty Fee" />
                <input className="w-full p-2 border rounded text-xs" value={data.marketingFee} onChange={e => handleDataChange('marketingFee', e.target.value)} placeholder="Marketing Fee" />
                <input className="w-full p-2 border rounded text-xs font-bold" value={data.contractDuration} onChange={e => handleDataChange('contractDuration', e.target.value)} placeholder="Durasi Kontrak" />
             </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2 text-slate-700 font-bold uppercase text-xs">
                <ShieldCheck size={14} className="text-purple-600" /> Saksi
             </div>
             <div className="p-4 space-y-3">
                <input className="w-full p-2 border rounded text-xs" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} placeholder="Nama Saksi 1" />
                <input className="w-full p-2 border rounded text-xs" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} placeholder="Nama Saksi 2" />
             </div>
           </div>
           <div className="h-20 lg:hidden"></div>
        </div>

        {/* PREVIEW */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex justify-center p-0 md:p-8 overflow-y-auto overflow-x-auto h-full ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
           <div className="w-full max-w-full flex justify-center items-start pt-4 md:pt-0 min-w-[210mm] md:min-w-0">
             <div className="relative origin-top-left md:origin-top transition-transform duration-300 scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-0 shadow-2xl">
                {/* WRAPPER KERTAS PREVIEW: 
                   - Punya padding visual (p-[25mm]) agar di layar terlihat rapi.
                   - Tapi padding ini di-override oleh CSS Print (lihat block @media print).
                */}
                <div style={{ width: '210mm', minHeight: '297mm' }} className="bg-white flex flex-col p-[25mm] print:p-0">
                  <DocumentContent />
                </div>
             </div>
           </div>
        </div>
      </div>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-[100] h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 font-sans">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* PRINT PORTAL - TEPAT DI SINI KUNCI SUKSESNYA */}
      <div id="print-only-root" className="hidden">
         <table className="print-table">
            <thead><tr><td><div style={{ height: '25mm' }}>&nbsp;</div></td></tr></thead>
            <tbody><tr><td><div className="print-content-wrapper"><DocumentContent /></div></td></tr></tbody>
            <tfoot><tr><td><div style={{ height: '25mm' }}>&nbsp;</div></td></tr></tfoot>
         </table>
      </div>
    </div>
  );
}