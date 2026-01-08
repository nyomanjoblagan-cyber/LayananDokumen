'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  UserCircle2, FileWarning, CalendarDays, FileText, Landmark, Users
} from 'lucide-react';
import Link from 'next/link';

export default function BedaNamaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Pernyataan...</div>}>
      <BedaNamaBuilder />
    </Suspense>
  );
}

function BedaNamaBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  const [data, setData] = useState({
    city: 'Sleman',
    date: new Date().toISOString().split('T')[0],
    nameKtp: 'MUHAMMAD RIZKY RAMADHAN',
    nik: '3404010101950003',
    placeBirth: 'Yogyakarta',
    dateBirth: '1995-02-15',
    job: 'Karyawan Swasta',
    address: 'Jl. Magelang KM 5, Mlati, Sleman, Yogyakarta',
    documentType: 'Ijazah S1 / Paspor',
    nameOnDoc: 'M. RIZKY RAMADHAN',
    purpose: 'Persyaratan pengurusan administrasi pembuatan Paspor di Kantor Imigrasi Kelas I Yogyakarta.',
    witness1: 'Sudarsono (Ketua RT)',
    witness2: 'Dwi Astuti (Ibu Kandung)'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const TEMPLATES = [
    { id: 1, name: "Formal (Materai)", desc: "Standar hukum untuk instansi" },
    { id: 2, name: "Ringkas (Internal)", desc: "Layout simpel untuk bank/perusahaan" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      
      {/* CSS CRITICAL UNTUK FIX HALAMAN KOSONG */}
      <style jsx global>{`
        @media print {
          @page { 
            size: A4; 
            margin: 0 !important; 
          }
          html, body {
            height: 100%;
            margin: 0 !important;
            padding: 0 !important;
            overflow: hidden;
          }
          header, nav, aside, .no-print { 
            display: none !important; 
          }
          #preview-area-scroll {
            overflow: visible !important;
            padding: 0 !important;
            margin: 0 !important;
            position: absolute !important;
            top: 0 !important;
            left: 0 !important;
            width: 210mm !important;
          }
          .kertas-print {
            box-shadow: none !important;
            margin: 0 !important;
            border: none !important;
            width: 210mm !important;
            height: 297mm !important;
            page-break-after: avoid !important;
            page-break-before: avoid !important;
          }
        }
      `}</style>

      {/* HEADER NAV (NO PRINT) */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-[100] h-16 border-b border-slate-700 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors"><ArrowLeft size={18} /></Link>
            <h1 className="font-bold text-emerald-400 uppercase tracking-widest text-sm">Pernyataan Beda Nama</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative text-xs">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 min-w-[180px] justify-between">
                <LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span><ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border overflow-hidden text-slate-700">
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600' : ''}`}>
                      <div className="font-bold uppercase tracking-tighter text-[10px]">{t.name}</div><div className="text-[10px] text-slate-400">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold uppercase hover:bg-emerald-500 shadow-lg flex items-center gap-2 text-sm transition-all active:scale-95">
              <Printer size={16} /> Print
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)]">
        
        {/* EDITOR SIDEBAR (NO PRINT) */}
        <div className="no-print w-full lg:w-[420px] shrink-0 h-full overflow-y-auto pr-2 pb-20 space-y-6">
           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-emerald-600 tracking-widest"><UserCircle2 size={14}/> Data Identitas</h3>
              <input className="w-full p-2 border rounded text-xs font-bold" value={data.nameKtp} onChange={e => handleDataChange('nameKtp', e.target.value)} />
              <input className="w-full p-2 border rounded text-xs" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} />
              <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.address} onChange={e => handleDataChange('address', e.target.value)} />
           </div>
           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-amber-600 tracking-widest"><FileWarning size={14}/> Perbedaan</h3>
              <input className="w-full p-2 border rounded text-xs" placeholder="Dokumen Lain" value={data.documentType} onChange={e => handleDataChange('documentType', e.target.value)} />
              <input className="w-full p-2 border rounded text-xs font-bold text-red-600 uppercase" placeholder="Nama Beda" value={data.nameOnDoc} onChange={e => handleDataChange('nameOnDoc', e.target.value)} />
           </div>
           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-purple-600 tracking-widest"><Users size={14}/> Saksi</h3>
              <input className="w-full p-2 border rounded text-xs" placeholder="Saksi 1" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} />
              <input className="w-full p-2 border rounded text-xs" placeholder="Saksi 2" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} />
           </div>
        </div>

        {/* PREVIEW AREA (AREA YANG DICETAK) */}
        <div id="preview-area-scroll" className="flex-1 w-full flex justify-center bg-slate-300/30 lg:rounded-xl p-0 md:p-8 overflow-y-auto h-full">
             <div className="origin-top scale-[0.45] sm:scale-[0.6] lg:scale-[0.85] xl:scale-100 transition-transform print:scale-100">
                
                <div className={`kertas-print bg-white mx-auto flex flex-col box-border print:m-0 print:border-none ${templateId === 1 ? 'font-serif p-[25mm] text-[11pt]' : 'font-sans p-[20mm] text-[10pt]'}`} 
                     style={{ width: '210mm', height: '296mm' }}>
                    
                    {templateId === 1 ? (
                      <>
                        <div className="text-center mb-8 pb-4 border-b-2 border-black shrink-0">
                          <h1 className="font-black text-xl uppercase tracking-tighter underline underline-offset-4 leading-none">SURAT PERNYATAAN BEDA NAMA</h1>
                        </div>

                        <div className="space-y-6 flex-grow">
                          <p>Saya yang bertanda tangan di bawah ini:</p>
                          <div className="ml-8 space-y-2 text-sm">
                            <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama (Sesuai KTP)</span><span>:</span><span className="font-bold uppercase">{data.nameKtp}</span></div>
                            <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.nik}</span></div>
                            <div className="grid grid-cols-[160px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.address}</span></div>
                          </div>

                          <p className="text-justify leading-relaxed">Menyatakan dengan sebenarnya bahwa nama yang tercantum dalam <strong>Kartu Tanda Penduduk (KTP)</strong> saya adalah:</p>
                          <div className="text-center font-bold text-lg bg-slate-50 py-2 border border-slate-200 uppercase">"{data.nameKtp}"</div>

                          <p className="text-justify leading-relaxed">Sedangkan nama yang tercantum dalam dokumen <strong>{data.documentType}</strong> adalah:</p>
                          <div className="text-center font-bold text-lg bg-slate-50 py-2 border border-slate-200 uppercase">"{data.nameOnDoc}"</div>

                          <p className="text-justify leading-relaxed">Bahwa kedua nama tersebut di atas adalah <strong>SATU ORANG YANG SAMA</strong> yaitu diri saya sendiri. Perbedaan penulisan terjadi tanpa ada unsur pemalsuan identitas.</p>
                          <p className="text-justify leading-relaxed">Surat pernyataan ini saya buat guna memenuhi keperluan: <strong>{data.purpose}</strong>.</p>
                          <p className="text-justify leading-relaxed">Demikian pernyataan ini saya buat dengan sebenarnya untuk dipergunakan sebagaimana mestinya.</p>
                        </div>

                        <div className="shrink-0 mt-8 pt-6 border-t border-slate-100">
                          <p className="text-right mb-10">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
                          <div className="flex justify-between items-end">
                             <div className="text-center">
                                <p className="mb-14 font-bold uppercase text-[10px] text-slate-400">Saksi-Saksi:</p>
                                <div className="flex gap-8">
                                   <div className="w-28 border-b border-black text-[10px] uppercase font-bold text-slate-700 pb-1">{data.witness1}</div>
                                   <div className="w-28 border-b border-black text-[10px] uppercase font-bold text-slate-700 pb-1">{data.witness2}</div>
                                </div>
                             </div>
                             <div className="text-center w-60">
                                <p className="mb-4 font-bold uppercase text-xs text-slate-800">Yang Membuat Pernyataan,</p>
                                <div className="border border-slate-300 w-24 h-16 mx-auto mb-2 flex items-center justify-center text-[8px] text-slate-400 italic">MATERAI 10.000</div>
                                <p className="font-bold underline uppercase text-sm leading-none">{data.nameKtp}</p>
                             </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col h-full font-sans">
                         <div className="border-b-4 border-slate-900 pb-4 mb-10 shrink-0">
                            <h1 className="text-2xl font-black uppercase tracking-tighter italic">Identity Verification</h1>
                         </div>
                         <div className="space-y-8 flex-grow">
                            <p className="text-sm">To whom it may concern, I hereby confirm my identity:</p>
                            <div className="grid grid-cols-2 gap-8 bg-slate-50 p-6 rounded-2xl border">
                               <div><label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Legal KTP Identity</label><p className="font-black text-lg uppercase">{data.nameKtp}</p><p className="text-xs text-slate-500">{data.nik}</p></div>
                               <div className="border-l pl-8"><label className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Document Identity</label><p className="font-black text-lg uppercase text-emerald-600">{data.nameOnDoc}</p><p className="text-xs text-slate-500">{data.documentType}</p></div>
                            </div>
                            <div className="text-center py-10">
                               <p className="italic text-slate-600 font-medium leading-relaxed">"Both names refer to one and the same person, utilized for {data.purpose}."</p>
                            </div>
                         </div>
                         <div className="pt-10 flex justify-between items-end border-t-2 border-slate-100">
                            <div className="space-y-1">
                               <p className="text-[9px] font-bold uppercase text-slate-400 tracking-widest">Signed at {data.city}</p>
                               <p className="font-bold text-xs">{new Date(data.date).toLocaleDateString('id-ID', {dateStyle:'full'})}</p>
                            </div>
                            <div className="text-right">
                               <p className="text-[10px] text-slate-400 font-bold mb-14 uppercase tracking-widest">The Undersigned</p>
                               <p className="font-black text-slate-900 text-lg uppercase underline decoration-2">{data.nameKtp}</p>
                            </div>
                         </div>
                      </div>
                    )}
                </div>

             </div>
        </div>

      </div>
    </div>
  );
}