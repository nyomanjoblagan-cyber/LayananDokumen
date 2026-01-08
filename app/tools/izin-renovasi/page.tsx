'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  Hammer, UserCircle2, MapPin, CalendarDays, Clock, Info
} from 'lucide-react';
import Link from 'next/link';

export default function IzinRenovasiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat...</div>}>
      <RenovasiBuilder />
    </Suspense>
  );
}

function RenovasiBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  const [data, setData] = useState({
    city: 'Sleman',
    date: new Date().toISOString().split('T')[0],
    
    // DATA PEMILIK
    ownerName: 'BUDI SANTOSO',
    phone: '0812-3456-7890',
    address: 'Perumahan Griya Indah, Blok C No. 12, Sleman',
    
    // DETAIL RENOVASI
    renovationType: 'Perbaikan Atap dan Penambahan Dapur',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '', // Diisi manual oleh user
    workerCount: '3',
    
    // PEJABAT SETEMPAT
    rt: '04',
    rw: '12',
    ketuaRt: 'Bapak Mulyono'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const TEMPLATES = [
    { id: 1, name: "Formal (RT/RW)", desc: "Standar untuk lingkungan perumahan" },
    { id: 2, name: "Izin Tetangga", desc: "Fokus pada permohonan maaf atas kebisingan" }
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
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors"><ArrowLeft size={18} /></Link>
            <h1 className="font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
               <Hammer size={16} /> Izin Renovasi Rumah
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
            <button onClick={() => window.print()} className="bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold uppercase hover:bg-emerald-500 shadow-lg flex items-center gap-2 transition-all">
              <Printer size={16} /> Print
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)] overflow-hidden">
        
        {/* SIDEBAR */}
        <div className="no-print w-full lg:w-[420px] shrink-0 h-full overflow-y-auto pr-2 pb-20 space-y-6">
           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-amber-600 tracking-widest"><UserCircle2 size={14}/> Identitas Pemilik</h3>
              <input className="w-full p-2 border rounded text-xs font-bold" placeholder="Nama Pemilik" value={data.ownerName} onChange={e => handleDataChange('ownerName', e.target.value)} />
              <input className="w-full p-2 border rounded text-xs" placeholder="No. HP" value={data.phone} onChange={e => handleDataChange('phone', e.target.value)} />
              <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" placeholder="Alamat Rumah" value={data.address} onChange={e => handleDataChange('address', e.target.value)} />
           </div>

           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 font-sans">
              <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-blue-600 tracking-widest"><Info size={14}/> Detail Renovasi</h3>
              <input className="w-full p-2 border rounded text-xs" placeholder="Jenis Pekerjaan (Misal: Cat Ulang)" value={data.renovationType} onChange={e => handleDataChange('renovationType', e.target.value)} />
              <div className="grid grid-cols-2 gap-3">
                 <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase">Tgl Mulai</label>
                    <input type="date" className="w-full p-2 border rounded text-xs" value={data.startDate} onChange={e => handleDataChange('startDate', e.target.value)} />
                 </div>
                 <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase">Tgl Selesai (Est)</label>
                    <input type="date" className="w-full p-2 border rounded text-xs" value={data.endDate} onChange={e => handleDataChange('endDate', e.target.value)} />
                 </div>
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-slate-400 tracking-widest"><MapPin size={14}/> Wilayah RT/RW</h3>
              <div className="grid grid-cols-2 gap-3">
                <input className="w-full p-2 border rounded text-xs" placeholder="RT" value={data.rt} onChange={e => handleDataChange('rt', e.target.value)} />
                <input className="w-full p-2 border rounded text-xs" placeholder="RW" value={data.rw} onChange={e => handleDataChange('rw', e.target.value)} />
              </div>
              <input className="w-full p-2 border rounded text-xs" placeholder="Nama Ketua RT" value={data.ketuaRt} onChange={e => handleDataChange('ketuaRt', e.target.value)} />
           </div>
        </div>

        {/* PREVIEW */}
        <div id="preview-area-scroll" className="flex-1 w-full flex justify-center bg-slate-300/30 lg:rounded-xl p-0 md:p-8 overflow-y-auto h-full">
             <div className="origin-top scale-[0.45] sm:scale-[0.6] lg:scale-[0.85] xl:scale-100 transition-transform shadow-2xl print:scale-100">
                
                <div className="kertas-print bg-white mx-auto flex flex-col box-border font-serif p-[25mm] text-[11pt]" 
                     style={{ width: '210mm', height: '296mm' }}>
                    
                    <div className="text-right text-sm mb-10">
                       <p>{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
                    </div>

                    <div className="mb-8">
                       <p>Hal : <strong>Permohonan Izin Renovasi Rumah</strong></p>
                       <p>Lamp : -</p>
                    </div>

                    <div className="mb-10">
                       <p>Kepada Yth,</p>
                       <p><strong>Ketua RT {data.rt} / RW {data.rw}</strong></p>
                       <p>Di Tempat</p>
                    </div>

                    <div className="space-y-6 flex-grow">
                      <p>Dengan hormat,</p>
                      <p>Saya yang bertanda tangan di bawah ini:</p>
                      
                      <div className="ml-8 space-y-1">
                        <div className="grid grid-cols-[150px_10px_1fr]"><span>Nama Pemilik</span><span>:</span><span className="font-bold uppercase">{data.ownerName}</span></div>
                        <div className="grid grid-cols-[150px_10px_1fr]"><span>Alamat</span><span>:</span><span>{data.address}</span></div>
                        <div className="grid grid-cols-[150px_10px_1fr]"><span>No. Telepon/HP</span><span>:</span><span>{data.phone}</span></div>
                      </div>

                      <p className="text-justify leading-relaxed">
                        Melalui surat ini, saya bermaksud untuk memohon izin kepada Bapak Ketua RT/RW dan warga sekitar guna melakukan pekerjaan <strong>{data.renovationType}</strong> pada bangunan rumah saya tersebut di atas.
                      </p>

                      <p className="text-justify leading-relaxed">
                        Adapun pekerjaan renovasi ini direncanakan akan berlangsung mulai tanggal <strong>{data.startDate ? new Date(data.startDate).toLocaleDateString('id-ID', {dateStyle:'long'}) : '...'}</strong> sampai dengan <strong>{data.endDate ? new Date(data.endDate).toLocaleDateString('id-ID', {dateStyle:'long'}) : 'selesai'}</strong>.
                      </p>

                      <p className="text-justify leading-relaxed">
                        Selama pengerjaan renovasi berlangsung, saya akan berusaha semaksimal mungkin untuk menjaga kebersihan lingkungan serta meminimalisir gangguan suara maupun debu. Saya juga memohon maaf kepada Bapak dan warga sekitar atas ketidaknyamanan yang mungkin timbul selama proses ini.
                      </p>

                      <p>Demikian surat permohonan ini saya sampaikan. Atas perhatian dan izin yang diberikan, saya ucapkan terima kasih.</p>
                    </div>

                    {/* TANDA TANGAN */}
                    <div className="shrink-0 mt-12">
                      <div className="flex justify-between">
                         <div className="text-center w-60">
                            <p className="mb-20 font-bold uppercase text-xs">Mengetahui,<br/>Ketua RT {data.rt}</p>
                            <p className="font-bold underline uppercase">{data.ketuaRt}</p>
                         </div>
                         
                         <div className="text-center w-60">
                            <p className="mb-20 font-bold uppercase text-xs">Hormat Saya,</p>
                            <p className="font-bold underline uppercase">{data.ownerName}</p>
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