'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  Home, UserCircle2, ShieldCheck, MapPin, CalendarDays, FileText
} from 'lucide-react';
import Link from 'next/link';

export default function BelumPunyaRumahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat...</div>}>
      <HomeDeclarationBuilder />
    </Suspense>
  );
}

function HomeDeclarationBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  const [data, setData] = useState({
    city: 'Sleman',
    date: new Date().toISOString().split('T')[0],
    
    // DATA IDENTITAS
    name: 'AGUS SETIAWAN',
    nik: '3404020101920005',
    placeBirth: 'Yogyakarta',
    dateBirth: '1992-08-20',
    job: 'Karyawan Swasta',
    address: 'Jl. Palagan Tentara Pelajar No. 45, Sariharjo, Ngaglik, Sleman',
    
    // TUJUAN
    purpose: 'Persyaratan Pengajuan KPR Bersubsidi (FLPP) melalui Bank Tabungan Negara (BTN).',
    
    // KETUA RT/RW (Opsional untuk memperkuat)
    rt: '04',
    rw: '12',
    kelurahan: 'Sariharjo'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const TEMPLATES = [
    { id: 1, name: "Formal (Materai)", desc: "Standar hukum untuk pengajuan KPR/Bank" },
    { id: 2, name: "Sederhana", desc: "Layout simpel untuk urusan internal/asrama" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0 !important; }
          html, body { height: 100%; margin: 0 !important; padding: 0 !important; overflow: hidden; }
          header, nav, aside, .no-print { display: none !important; }
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

      {/* NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-[100] h-16 border-b border-slate-700">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors"><ArrowLeft size={18} /></Link>
            <h1 className="font-bold text-emerald-400 uppercase tracking-widest text-sm flex items-center gap-2">
               <Home size={16} /> Pernyataan Belum Punya Rumah
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative text-xs">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 min-w-[180px] justify-between transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span><ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border overflow-hidden z-50 text-slate-700">
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold border-l-4 border-blue-600' : ''}`}>
                      <div className="font-bold uppercase tracking-tighter text-[10px]">{t.name}</div><div className="text-[10px] text-slate-400">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold uppercase hover:bg-emerald-500 shadow-lg flex items-center gap-2 text-sm">
              <Printer size={16} /> Print
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)]">
        
        {/* SIDEBAR EDITOR */}
        <div className="no-print w-full lg:w-[420px] shrink-0 h-full overflow-y-auto pr-2 pb-20 space-y-6">
           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-emerald-600 tracking-widest"><UserCircle2 size={14}/> Identitas Pemohon</h3>
              <input className="w-full p-2 border rounded text-xs font-bold" placeholder="Nama Lengkap" value={data.name} onChange={e => handleDataChange('name', e.target.value)} />
              <input className="w-full p-2 border rounded text-xs" placeholder="NIK" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} />
              <div className="grid grid-cols-2 gap-3">
                <input className="w-full p-2 border rounded text-xs" placeholder="Tempat Lahir" value={data.placeBirth} onChange={e => handleDataChange('placeBirth', e.target.value)} />
                <input type="date" className="w-full p-2 border rounded text-xs" value={data.dateBirth} onChange={e => handleDataChange('dateBirth', e.target.value)} />
              </div>
              <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" placeholder="Alamat Sesuai KTP" value={data.address} onChange={e => handleDataChange('address', e.target.value)} />
           </div>

           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 font-sans">
              <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-blue-600 tracking-widest"><MapPin size={14}/> Detail Lokasi & Tujuan</h3>
              <div className="grid grid-cols-2 gap-3">
                 <input className="w-full p-2 border rounded text-xs" placeholder="RT" value={data.rt} onChange={e => handleDataChange('rt', e.target.value)} />
                 <input className="w-full p-2 border rounded text-xs" placeholder="RW" value={data.rw} onChange={e => handleDataChange('rw', e.target.value)} />
              </div>
              <textarea className="w-full p-2 border rounded text-xs h-20 resize-none" placeholder="Tujuan Pembuatan (Contoh: Syarat KPR)" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} />
           </div>

           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-slate-400 tracking-widest"><CalendarDays size={14}/> Tanggal Surat</h3>
              <div className="grid grid-cols-2 gap-3">
                <input className="w-full p-2 border rounded text-xs" placeholder="Kota" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
              </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div id="preview-area-scroll" className="flex-1 w-full flex justify-center bg-slate-300/30 lg:rounded-xl p-0 md:p-8 overflow-y-auto h-full">
             <div className="origin-top scale-[0.45] sm:scale-[0.6] lg:scale-[0.85] xl:scale-100 transition-transform shadow-2xl print:scale-100">
                
                <div className={`kertas-print bg-white mx-auto flex flex-col box-border print:m-0 ${templateId === 1 ? 'font-serif p-[25mm] text-[12pt]' : 'font-sans p-[20mm] text-[11pt]'}`} 
                     style={{ width: '210mm', height: '296mm' }}>
                    
                    {/* ISI SURAT */}
                    <div className="text-center mb-10 pb-4 border-b-2 border-black shrink-0">
                      <h1 className="font-black text-xl uppercase tracking-tighter underline underline-offset-4 leading-none">SURAT PERNYATAAN BELUM MEMILIKI RUMAH</h1>
                    </div>

                    <div className="space-y-6 flex-grow">
                      <p>Saya yang bertanda tangan di bawah ini:</p>
                      
                      <div className="ml-8 space-y-2 text-sm md:text-base">
                        <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.name}</span></div>
                        <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.nik}</span></div>
                        <div className="grid grid-cols-[160px_10px_1fr]"><span>Tempat/Tgl Lahir</span><span>:</span><span>{data.placeBirth}, {new Date(data.dateBirth).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</span></div>
                        <div className="grid grid-cols-[160px_10px_1fr]"><span>Pekerjaan</span><span>:</span><span>{data.job}</span></div>
                        <div className="grid grid-cols-[160px_10px_1fr] align-top"><span>Alamat (sesuai KTP)</span><span>:</span><span>{data.address}</span></div>
                      </div>

                      <div className="space-y-4 text-justify leading-relaxed">
                        <p>Dengan ini menyatakan dengan sebenarnya, bahwa sampai dengan saat ini saya <strong>BELUM MEMILIKI RUMAH TINGGAL</strong> baik di wilayah Kabupaten/Kota tempat tinggal saya sekarang, maupun di wilayah manapun di Republik Indonesia.</p>
                        
                        <p>Surat Pernyataan ini saya buat guna memenuhi persyaratan administrasi dalam rangka: <br/> <strong>{data.purpose}</strong></p>
                        
                        <p>Demikian pernyataan ini saya buat dengan penuh kesadaran dan tanpa ada paksaan dari pihak manapun. Apabila di kemudian hari pernyataan ini terbukti tidak benar, maka saya bersedia menerima sanksi sesuai dengan ketentuan hukum dan peraturan yang berlaku, serta bersedia membatalkan pengajuan/kepemilikan rumah tersebut.</p>
                      </div>
                    </div>

                    {/* TANDA TANGAN */}
                    <div className="shrink-0 mt-8 pt-8 border-t border-slate-100">
                      <p className="text-right mb-10">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
                      
                      <div className="flex justify-between items-end">
                         <div className="text-center w-60">
                            <p className="mb-14 font-bold uppercase text-[10px] text-slate-400">Mengetahui,<br/>Ketua RT {data.rt} / RW {data.rw}</p>
                            <div className="w-32 border-b border-black mx-auto"></div>
                            <p className="text-[10px] mt-1 font-bold">( ........................................ )</p>
                         </div>
                         
                         <div className="text-center w-64">
                            <p className="mb-4 font-bold uppercase text-xs">Hormat Saya,</p>
                            {templateId === 1 ? (
                              <div className="border border-slate-300 w-24 h-16 mx-auto mb-2 flex items-center justify-center text-[8px] text-slate-400 italic">MATERAI 10.000</div>
                            ) : (
                              <div className="h-16"></div>
                            )}
                            <p className="font-bold underline uppercase text-sm leading-none">{data.name}</p>
                         </div>
                      </div>
                    </div>

                    <div className="mt-auto text-center text-[9px] text-slate-300 italic no-print">
                      Dokumen dihasilkan otomatis oleh LayananDokumen.com
                    </div>
                </div>

             </div>
        </div>

      </div>
    </div>
  );
}