'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, ShieldCheck, UserCircle2, 
  Briefcase, CalendarDays, FileText, LayoutTemplate, ChevronDown, Check
} from 'lucide-react';
import Link from 'next/link';

export default function BebasKontrakPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Pernyataan...</div>}>
      <ContractFreeBuilder />
    </Suspense>
  );
}

function ContractFreeBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  const [data, setData] = useState({
    city: 'Jakarta',
    date: new Date().toISOString().split('T')[0],
    name: 'RIZKY RAMADHAN',
    nik: '3171010101980005',
    placeBirth: 'Jakarta',
    dateBirth: '1998-05-12',
    address: 'Jl. Tebet Dalam IV No. 15, Jakarta Selatan',
    targetCompany: 'PT. TEKNOLOGI MAJU INDONESIA',
    position: 'Full Stack Developer',
    lastCompany: 'PT. SOLUSI DIGITAL LAMA',
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const TEMPLATES = [
    { id: 1, name: "Klasik Formal", desc: "Standar HRD (Gaya Kaku)" },
    { id: 2, name: "Modern Clean", desc: "Minimalis (Gaya Startup)" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  const ReportContent = () => (
    <div className={`bg-white mx-auto flex flex-col box-border print:m-0 print:border-none print:shadow-none p-[20mm] print:p-[15mm] text-slate-900 ${templateId === 1 ? 'font-serif' : 'font-sans'}`} 
         style={{ width: '210mm', height: '290mm' }}>
      
      {templateId === 1 ? (
        /* TEMPLATE 1: KLASIK */
        <>
          <div className="text-center mb-10 pb-4 border-b-2 border-black shrink-0">
            <h1 className="font-black text-xl uppercase tracking-tighter underline underline-offset-4">SURAT PERNYATAAN BEBAS KONTRAK</h1>
          </div>

          <div className="space-y-6 flex-grow text-[11pt] leading-relaxed">
            <p>Saya yang bertanda tangan di bawah ini:</p>
            <div className="ml-8 space-y-2 font-sans text-sm">
               <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.name}</span></div>
               <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.nik}</span></div>
               <div className="grid grid-cols-[160px_10px_1fr]"><span>Tempat/Tgl Lahir</span><span>:</span><span>{data.placeBirth}, {new Date(data.dateBirth).toLocaleDateString('id-ID', {dateStyle: 'long'})}</span></div>
               <div className="grid grid-cols-[160px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.address}</span></div>
            </div>

            <p className="text-justify">Menyatakan dengan sebenarnya bahwa sampai saat ini saya <strong>TIDAK SEDANG TERIKAT KONTRAK KERJA</strong> dengan instansi atau perusahaan manapun. Pernyataan ini dibuat sehubungan dengan proses rekrutmen di <strong>{data.targetCompany}</strong> sebagai <strong>{data.position}</strong>.</p>
            <p className="text-justify">Saya menjamin bahwa pengunduran diri dari perusahaan sebelumnya (<strong>{data.lastCompany}</strong>) telah tuntas secara administratif. Apabila pernyataan ini terbukti tidak benar, saya bersedia menerima sanksi sesuai aturan perusahaan.</p>
            <p>Demikian pernyataan ini saya buat untuk dipergunakan sebagaimana mestinya.</p>
          </div>

          <div className="shrink-0 mt-8 flex justify-end">
             <div className="text-center w-64">
                <p className="text-xs mb-4">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'})}</p>
                <div className="border border-slate-300 w-24 h-16 mx-auto mb-2 flex items-center justify-center text-[8px] text-slate-400 italic font-sans">MATERAI 10.000</div>
                <p className="font-bold underline uppercase text-sm leading-none">{data.name}</p>
             </div>
          </div>
        </>
      ) : (
        /* TEMPLATE 2: MODERN */
        <div className="flex flex-col h-full border-t-[10px] border-blue-600 pt-10">
          <div className="flex justify-between items-start mb-12">
            <div>
              <h1 className="text-3xl font-black text-blue-600 tracking-tighter">CLEARANCE</h1>
              <p className="text-xs font-bold tracking-[0.2em] text-slate-400 uppercase">Employment Statement</p>
            </div>
            <div className="text-right text-[10px] font-bold text-slate-400">
               <p>REF: STMT-{new Date().getFullYear()}-{Math.floor(Math.random()*1000)}</p>
               <p>{data.city}, {data.date}</p>
            </div>
          </div>

          <div className="space-y-10 flex-grow">
            <div className="grid grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="text-[10px] font-black text-blue-600 uppercase border-b border-blue-100 block pb-1">Person In Charge</label>
                <div>
                  <p className="text-lg font-black uppercase text-slate-800">{data.name}</p>
                  <p className="text-xs text-slate-500">NIK: {data.nik}</p>
                </div>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black text-blue-600 uppercase border-b border-blue-100 block pb-1">Destination</label>
                <div>
                  <p className="text-sm font-bold uppercase text-slate-800">{data.targetCompany}</p>
                  <p className="text-xs text-slate-500">As {data.position}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border-2 border-dashed border-slate-200">
              <p className="text-sm italic leading-relaxed text-slate-600">
                "I hereby confirm that as of today, I have no active employment contracts or legal ties with any other organization, including my previous role at <b>{data.lastCompany}</b>. I am fully available to join the team and will take full responsibility for the accuracy of this statement."
              </p>
            </div>
          </div>

          <div className="shrink-0 pt-10 border-t border-slate-100 flex justify-between items-end">
            <div className="flex items-center gap-2 text-blue-600">
              <ShieldCheck size={20} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Verified Identity</span>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase text-slate-400 mb-10 tracking-widest">Digital Signature</p>
              <p className="text-xl font-black text-slate-900 uppercase underline decoration-4 decoration-blue-600 underline-offset-8">{data.name}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-200 font-sans text-slate-900">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0 !important; }
          body, html { height: 297mm !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: white !important; }
          #ui-root { display: none !important; }
          #print-only-root { display: block !important; position: absolute !important; top: 0 !important; left: 0 !important; width: 210mm !important; }
        }
      `}</style>

      {/* UI EDITOR */}
      <div id="ui-root" className="flex flex-col h-screen no-print">
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700 shadow-xl">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-all"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-blue-400 flex items-center gap-2">
              <ShieldCheck size={18} /> Clearance Builder
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 text-xs px-3 py-1.5 rounded-lg border border-slate-700 flex items-center gap-2 min-w-[180px] justify-between transition-all hover:bg-slate-700">
                <LayoutTemplate size={14} className="text-blue-400" />
                <span className="truncate">{activeTemplateName}</span>
                <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-2xl border border-slate-200 z-[999] overflow-hidden">
                  {TEMPLATES.map(t => (
                    <button key={t.id} onClick={() => {setTemplateId(t.id); setShowTemplateMenu(false)}} className={`w-full text-left p-4 text-xs hover:bg-blue-50 border-b last:border-0 ${templateId === t.id ? 'bg-blue-50 border-l-4 border-blue-600 font-bold' : 'text-slate-700'}`}>
                      {t.name}
                      <p className="text-[10px] text-slate-400 font-normal">{t.desc}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-black uppercase text-xs flex items-center gap-2 transition-all active:scale-95 shadow-lg">
              <Printer size={16} /> Print Surat
            </button>
          </div>
        </div>

        <div className="flex-grow flex overflow-hidden">
          <div className="w-[400px] bg-white border-r overflow-y-auto p-5 space-y-6 scrollbar-thin">
             <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1">Identitas</h3>
                <input className="w-full p-2 border rounded text-xs font-bold" value={data.name} onChange={e => handleDataChange('name', e.target.value)} placeholder="Nama Lengkap" />
                <input className="w-full p-2 border rounded text-xs" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} placeholder="NIK" />
                <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.address} onChange={e => handleDataChange('address', e.target.value)} placeholder="Alamat" />
             </div>
             
             <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1">Tujuan Pekerjaan</h3>
                <input className="w-full p-2 border rounded text-xs font-bold" value={data.targetCompany} onChange={e => handleDataChange('targetCompany', e.target.value)} placeholder="Perusahaan Baru" />
                <input className="w-full p-2 border rounded text-xs" value={data.position} onChange={e => handleDataChange('position', e.target.value)} placeholder="Posisi" />
             </div>

             <div className="space-y-3">
                <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1">History</h3>
                <input className="w-full p-2 border rounded text-xs" value={data.lastCompany} onChange={e => handleDataChange('lastCompany', e.target.value)} placeholder="Perusahaan Terakhir" />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-400/20">
             <div className="origin-top scale-[0.6] lg:scale-[0.85] xl:scale-100 transition-transform shadow-2xl">
                <ReportContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <ReportContent />
      </div>
    </div>
  );
}