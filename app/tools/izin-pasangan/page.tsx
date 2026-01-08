'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, LayoutTemplate, 
  Heart, UserCircle2, ShieldCheck, MapPin, CalendarDays, FileText
} from 'lucide-react';
import Link from 'next/link';

export default function IzinPasanganPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat...</div>}>
      <PartnerConsentBuilder />
    </Suspense>
  );
}

function PartnerConsentBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  const [data, setData] = useState({
    city: 'Sleman',
    date: new Date().toISOString().split('T')[0],
    
    // DATA PASANGAN (YANG MEMBERI IZIN)
    partnerName: 'SITI AMINAH',
    partnerNik: '3404014506920002',
    partnerJob: 'Ibu Rumah Tangga',
    partnerAddress: 'Jl. Kaliurang KM 10, Gayam, Sleman',
    partnerRelation: 'ISTRI', // ISTRI atau SUAMI

    // DATA YANG DIIZINKAN (USER)
    userName: 'ANDI PRASETYO',
    userNik: '3404011203900005',
    
    // TUJUAN IZIN
    purpose: 'Melamar Pekerjaan sebagai Operator Produksi di PT. Maju Bersama Jaya dan bersedia ditempatkan di luar kota.',
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const TEMPLATES = [
    { id: 1, name: "Formal (Materai)", desc: "Standar untuk dunia kerja & bank" },
    { id: 2, name: "Sederhana", desc: "Layout simpel untuk urusan umum" }
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
          }
        }
      `}</style>

      {/* NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-[100] h-16 border-b border-slate-700">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors"><ArrowLeft size={18} /></Link>
            <h1 className="font-bold text-pink-400 uppercase tracking-widest flex items-center gap-2">
               <Heart size={16} /> Izin Suami / Istri
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative text-xs">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 min-w-[180px] justify-between">
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
            <button onClick={() => window.print()} className="bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold uppercase hover:bg-emerald-500 shadow-lg flex items-center gap-2 transition-all active:scale-95">
              <Printer size={16} /> Print
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)] overflow-hidden">
        
        {/* SIDEBAR EDITOR */}
        <div className="no-print w-full lg:w-[420px] shrink-0 h-full overflow-y-auto pr-2 pb-20 space-y-6">
           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-pink-600 tracking-widest"><Heart size={14}/> Data Pemberi Izin</h3>
              <div className="grid grid-cols-2 gap-2">
                 <button onClick={() => handleDataChange('partnerRelation', 'ISTRI')} className={`py-2 rounded-lg text-xs font-bold transition-all ${data.partnerRelation === 'ISTRI' ? 'bg-pink-600 text-white' : 'bg-slate-100 text-slate-400'}`}>ISTRI</button>
                 <button onClick={() => handleDataChange('partnerRelation', 'SUAMI')} className={`py-2 rounded-lg text-xs font-bold transition-all ${data.partnerRelation === 'SUAMI' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>SUAMI</button>
              </div>
              <input className="w-full p-2 border rounded text-xs font-bold" placeholder="Nama Pasangan" value={data.partnerName} onChange={e => handleDataChange('partnerName', e.target.value)} />
              <input className="w-full p-2 border rounded text-xs" placeholder="NIK Pasangan" value={data.partnerNik} onChange={e => handleDataChange('partnerNik', e.target.value)} />
              <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" placeholder="Alamat Pasangan" value={data.partnerAddress} onChange={e => handleDataChange('partnerAddress', e.target.value)} />
           </div>

           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 font-sans">
              <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-blue-600 tracking-widest"><UserCircle2 size={14}/> Yang Diberi Izin</h3>
              <input className="w-full p-2 border rounded text-xs font-bold uppercase" placeholder="Nama Anda" value={data.userName} onChange={e => handleDataChange('userName', e.target.value)} />
              <input className="w-full p-2 border rounded text-xs" placeholder="NIK Anda" value={data.userNik} onChange={e => handleDataChange('userNik', e.target.value)} />
           </div>

           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-slate-400 tracking-widest"><FileText size={14}/> Keperluan Izin</h3>
              <textarea className="w-full p-2 border rounded text-xs h-24 resize-none" placeholder="Contoh: Bekerja di Luar Negeri" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} />
              <div className="grid grid-cols-2 gap-2">
                 <input className="w-full p-2 border rounded text-xs" placeholder="Kota" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                 <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
              </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div id="preview-area-scroll" className="flex-1 w-full flex justify-center bg-slate-300/30 lg:rounded-xl p-0 md:p-8 overflow-y-auto h-full">
             <div className="origin-top scale-[0.45] sm:scale-[0.6] lg:scale-[0.85] xl:scale-100 transition-transform shadow-2xl print:scale-100">
                
                <div className="kertas-print bg-white mx-auto flex flex-col box-border font-serif p-[25mm] text-[12pt]" 
                     style={{ width: '210mm', height: '296mm' }}>
                    
                    <div className="text-center mb-10 pb-4 border-b-2 border-black shrink-0">
                      <h1 className="font-black text-xl uppercase tracking-tighter underline underline-offset-4 leading-none">SURAT IZIN {data.partnerRelation}</h1>
                    </div>

                    <div className="space-y-6 flex-grow">
                      <p>Saya yang bertanda tangan di bawah ini:</p>
                      
                      <div className="ml-8 space-y-2">
                        <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.partnerName}</span></div>
                        <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.partnerNik}</span></div>
                        <div className="grid grid-cols-[160px_10px_1fr]"><span>Pekerjaan</span><span>:</span><span>{data.partnerJob}</span></div>
                        <div className="grid grid-cols-[160px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.partnerAddress}</span></div>
                      </div>

                      <p>Dengan ini memberikan <strong>IZIN SEPENUHNYA</strong> kepada {data.partnerRelation === 'ISTRI' ? 'Suami' : 'Istri'} saya:</p>

                      <div className="ml-8 space-y-2">
                        <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.userName}</span></div>
                        <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.userNik}</span></div>
                      </div>

                      <div className="space-y-4 text-justify leading-relaxed">
                        <p>Untuk mengikuti / melakukan hal sebagai berikut:</p>
                        <div className="bg-slate-50 p-4 border italic font-medium">
                          "{data.purpose}"
                        </div>
                        
                        <p>Bahwa selaku {data.partnerRelation}, saya mendukung penuh keputusan tersebut dan tidak akan melakukan tuntutan apapun di kemudian hari kepada pihak penyelenggara/perusahaan terkait selama kegiatan tersebut tidak melanggar hukum dan norma yang berlaku.</p>
                        
                        <p>Demikian surat izin ini saya buat dengan penuh kesadaran dan tanpa ada paksaan dari pihak manapun, untuk dipergunakan sebagaimana mestinya.</p>
                      </div>
                    </div>

                    {/* TANDA TANGAN */}
                    <div className="shrink-0 mt-8 pt-8">
                      <p className="text-right mb-10">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
                      
                      <div className="flex justify-between items-end">
                         <div className="text-center w-60">
                            <p className="mb-20 font-bold uppercase text-xs">Yang Diberi Izin,</p>
                            <p className="font-bold underline uppercase text-sm leading-none">{data.userName}</p>
                         </div>
                         
                         <div className="text-center w-64">
                            <p className="mb-4 font-bold uppercase text-xs">Pemberi Izin ({data.partnerRelation}),</p>
                            {templateId === 1 ? (
                              <div className="border border-slate-300 w-24 h-16 mx-auto mb-2 flex items-center justify-center text-[8px] text-slate-400 italic">MATERAI 10.000</div>
                            ) : (
                              <div className="h-16"></div>
                            )}
                            <p className="font-bold underline uppercase text-sm leading-none">{data.partnerName}</p>
                         </div>
                      </div>
                    </div>

                </div>

             </div>
        </div>

      </div>
    </div>
  );
}