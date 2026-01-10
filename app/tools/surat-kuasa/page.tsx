'use client';

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, 
  User, UserCheck, FileText, Scroll, Car, GraduationCap, Banknote, ChevronDown, Check, Edit3, Eye
} from 'lucide-react';
import Link from 'next/link';

export default function SuratKuasaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Editor Kuasa...</div>}>
      <KuasaToolBuilder />
    </Suspense>
  );
}

function KuasaToolBuilder() {
  // --- STATE SYSTEM (RESTORED) ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);

  const [data, setData] = useState({
    city: 'Jakarta',
    date: '',
    pemberiName: 'BUDI SANTOSO',
    pemberiNik: '3171010101800001',
    pemberiJob: 'Wiraswasta',
    pemberiAddress: 'Jl. Merdeka No. 45, Jakarta Pusat',
    penerimaName: 'ANDI SAPUTRA',
    penerimaNik: '3201010101950002',
    penerimaJob: 'Karyawan Swasta',
    penerimaAddress: 'Jl. Kemenangan No. 10, Bekasi',
    purposeTitle: 'PENGAMBILAN BPKB KENDARAAN BERMOTOR',
    purposeDetail: 'Untuk mengambil Buku Pemilik Kendaraan Bermotor (BPKB) dengan rincian:\n\nMerk/Type : Honda Vario 125\nNo. Polisi : B 1234 XXX\nNo. Rangka : MH1JM123456789\nAtas Nama : Budi Santoso',
  });

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
  }, []);

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const applyPreset = (type: 'bpkb' | 'ijazah' | 'gaji' | 'umum') => {
    let title = '';
    let detail = '';
    if (type === 'bpkb') {
      title = 'PENGAMBILAN BPKB KENDARAAN';
      detail = 'Untuk mengambil Buku Pemilik Kendaraan Bermotor (BPKB) di SAMSAT/Leasing [...] dengan rincian:\nMerk : ...\nNo. Polisi : ...\nNo. Rangka : ...';
    } else if (type === 'ijazah') {
      title = 'PENGAMBILAN IJAZAH';
      detail = 'Untuk mengambil Ijazah Asli dan Transkrip Nilai pada:\nInstansi : ...\nJurusan : ...\nLulus Tahun : ...';
    } else if (type === 'gaji') {
      title = 'PENGAMBILAN DANA / GAJI';
      detail = 'Untuk mengambil uang gaji/pensiun bulan [...] pada:\nBank/Kantor : ...\nJumlah : Rp ...';
    } else {
      title = 'PENGAMBILAN DOKUMEN';
      detail = 'Untuk mengambil dokumen berupa [...] yang berada di [...] dengan nomor referensi [...].';
    }
    setData(prev => ({ ...prev, purposeTitle: title, purposeDetail: detail }));
  };

  const TEMPLATES = [
    { id: 1, name: "Format Klasik", desc: "Layout standar satu halaman" },
    { id: 2, name: "Format Modern", desc: "Layout blok tanpa garis ganda" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI DOKUMEN ---
  const DocumentContent = () => (
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 print:h-auto print:min-h-0 print:p-[15mm] ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
      
      <div className={`text-center mb-8 shrink-0 ${templateId === 1 ? 'border-b-4 border-double border-slate-900 pb-2' : ''}`}>
        <h1 className="text-2xl font-black underline uppercase tracking-widest leading-none">SURAT KUASA</h1>
      </div>

      <div className="space-y-6 flex-grow text-left">
        <p>Saya yang bertanda tangan di bawah ini (Pemberi Kuasa):</p>
        <div className="ml-8 space-y-1 font-sans italic border-l-4 border-slate-100 pl-6 print:border-slate-300">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.pemberiName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK / No. KTP</span><span>:</span><span>{data.pemberiNik}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat Domisili</span><span>:</span><span>{data.pemberiAddress}</span></div>
        </div>

        <p>Dengan ini memberikan kuasa penuh kepada (Penerima Kuasa):</p>
        <div className="ml-8 space-y-1 font-sans italic border-l-4 border-blue-100 pl-6 print:border-slate-300">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.penerimaName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK / No. KTP</span><span>:</span><span>{data.penerimaNik}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat Domisili</span><span>:</span><span>{data.penerimaAddress}</span></div>
        </div>

        <div className="space-y-4 pt-4">
          <p className="font-bold text-center underline uppercase text-[10pt] tracking-widest italic">-------------------- KHUSUS --------------------</p>
          <p className="text-justify leading-relaxed">Untuk dan atas nama Pemberi Kuasa melakukan <b>{data.purposeTitle}</b> dengan rincian sebagai berikut:</p>
          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 print:bg-transparent print:border-black whitespace-pre-line leading-relaxed italic text-[10.5pt]">
            {data.purposeDetail}
          </div>
        </div>

        <p className="text-justify leading-relaxed">Surat kuasa ini dibuat untuk dapat dipergunakan sebagaimana mestinya. Segala akibat yang timbul menjadi tanggung jawab Pemberi Kuasa.</p>
      </div>

      <div className="shrink-0 mt-8 pt-8 border-t border-slate-100 print:border-black" style={{ pageBreakInside: 'avoid' }}>
         <div className="grid grid-cols-2 gap-10 text-center">
            <div className="flex flex-col h-40">
               <p className="uppercase text-[8.5pt] font-black text-slate-400 tracking-widest print:text-black mb-1">Penerima Kuasa,</p>
               <div className="mt-auto">
                  <p className="font-bold underline uppercase tracking-tight leading-none text-[11pt]">{data.penerimaName}</p>
               </div>
            </div>

            <div className="flex flex-col h-40">
               <p className="text-[10pt] mb-1 font-bold">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : ''}</p>
               <p className="uppercase text-[8.5pt] font-black text-slate-400 tracking-widest print:text-black mb-1">Pemberi Kuasa,</p>
               <div className="mt-auto flex flex-col items-center">
                  <div className="border border-slate-200 w-24 h-14 flex items-center justify-center text-[7pt] text-slate-300 italic print:border-black print:text-black uppercase mb-3">Materai 10.000</div>
                  <p className="font-bold underline uppercase tracking-tight leading-none text-[11pt]">{data.pemberiName}</p>
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

      {/* HEADER NAV (RESTORED) */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> <span>Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-tighter italic">
               <Scroll size={16} /> <span>Surat Kuasa Builder</span>
            </div>
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
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Surat</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] relative">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-white border-r overflow-y-auto p-4 md:p-6 space-y-6 z-20 h-full ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
           <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 space-y-3">
              <h3 className="text-[10px] font-black uppercase text-emerald-800 flex items-center gap-2"><Check size={12}/> Pilih Jenis Kuasa</h3>
              <div className="grid grid-cols-2 gap-2">
                 <button onClick={() => applyPreset('bpkb')} className="bg-white p-2 rounded border text-[9px] font-bold hover:bg-emerald-100 flex items-center gap-2 font-sans"><Car size={14}/> AMBIL BPKB</button>
                 <button onClick={() => applyPreset('ijazah')} className="bg-white p-2 rounded border text-[9px] font-bold hover:bg-blue-100 flex items-center gap-2 font-sans"><GraduationCap size={14}/> AMBIL IJAZAH</button>
                 <button onClick={() => applyPreset('gaji')} className="bg-white p-2 rounded border text-[9px] font-bold hover:bg-amber-100 flex items-center gap-2 font-sans"><Banknote size={14}/> AMBIL GAJI</button>
                 <button onClick={() => applyPreset('umum')} className="bg-white p-2 rounded border text-[9px] font-bold hover:bg-slate-100 flex items-center gap-2 font-sans"><FileText size={14}/> LAINNYA</button>
              </div>
           </div>

           <div className="space-y-4 font-sans text-left pb-10">
              <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.pemberiName} onChange={e => handleDataChange('pemberiName', e.target.value)} placeholder="Nama Anda" />
              <input className="w-full p-2 border rounded text-xs font-bold uppercase bg-slate-50" value={data.penerimaName} onChange={e => handleDataChange('penerimaName', e.target.value)} placeholder="Nama Wakil" />
              <textarea className="w-full p-2 border rounded text-xs h-16 resize-none leading-tight" value={data.pemberiAddress} onChange={e => handleDataChange('pemberiAddress', e.target.value)} placeholder="Alamat KTP" />
              <input className="w-full p-2 border rounded text-xs font-bold text-blue-700" value={data.purposeTitle} onChange={e => handleDataChange('purposeTitle', e.target.value)} />
              <textarea className="w-full p-2 border rounded text-xs h-32 resize-none leading-relaxed italic" value={data.purposeDetail} onChange={e => handleDataChange('purposeDetail', e.target.value)} />
           </div>
           <div className="h-20 md:hidden"></div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 bg-slate-200/50 relative h-full no-print ${mobileView === 'editor' ? 'hidden lg:block' : 'block'}`}>
           <div className="absolute inset-0 overflow-y-auto overflow-x-hidden p-4 md:p-12 flex justify-center custom-scrollbar">
              <div className="origin-top transition-transform duration-300 transform scale-[0.43] sm:scale-[0.55] md:scale-[0.8] lg:scale-100 h-fit mb-12 shadow-2xl">
                 <DocumentContent />
                 <div className="h-24 lg:hidden"></div>
              </div>
           </div>
        </div>
      </main>

      {/* MOBILE NAV */}
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