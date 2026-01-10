'use client';

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, X, Image as ImageIcon, 
  ChevronDown, Check, LayoutTemplate, Building2, 
  Mail, Users, FileText, Calendar, Plus, Trash2, Edit3, Eye, ImagePlus
} from 'lucide-react';
import Link from 'next/link';

export default function OfficialLetterPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs">Memuat Editor Surat...</div>}>
      <OfficialLetterBuilder />
    </Suspense>
  );
}

function OfficialLetterBuilder() {
  // --- STATE SYSTEM (SERAGAM) ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // DATA DEFAULT
  const [data, setData] = useState({
    compName: 'DINAS PENDIDIKAN DAN KEBUDAYAAN',
    compAddress: 'Jl. Jenderal Sudirman No. 10, Jakarta Pusat\nTelp: (021) 555-7777 | Email: info@disdik.go.id',
    city: 'Jakarta',
    date: '',
    no: '005/UND/I/2026',
    lampiran: '-',
    perihal: 'Undangan Rapat Evaluasi Tahunan',
    receiver: 'Bapak/Ibu Kepala Sekolah\nSe-DKI Jakarta',
    receiverAddress: 'Di Tempat',
    opening: 'Dengan hormat,\n\nSehubungan dengan telah berakhirnya Tahun Anggaran 2025, kami bermaksud mengundang Bapak/Ibu untuk hadir dalam rapat evaluasi kinerja yang akan diselenggarakan pada:',
    eventDetails: 'Hari/Tanggal : Senin, 20 Januari 2026\nWaktu : 09.00 WIB s.d Selesai\nTempat : Aula Utama Gedung A, Lantai 2\nAgenda : Laporan Pertanggungjawaban & Rencana Kerja 2026',
    closing: 'Mengingat pentingnya acara tersebut, kami mohon kehadiran Bapak/Ibu tepat pada waktunya.\n\nDemikian undangan ini kami sampaikan. Atas perhatian dan kerjasamanya, kami ucapkan terima kasih.',
    signerName: 'Dr. H. Budi Santoso, M.Pd',
    signerNIP: 'NIP. 19800101 200501 1 001',
    signerJob: 'Kepala Dinas',
    cc: ['Bupati/Walikota (sebagai laporan)', 'Arsip']
  });

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
  }, []);

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const applyPreset = (type: 'meeting' | 'assignment' | 'permission') => {
    if (type === 'meeting') {
      setData(prev => ({
        ...prev,
        no: '005/UND/HRD/I/2026',
        perihal: 'Undangan Rapat Koordinasi',
        opening: 'Dengan hormat,\n\nMengharap kehadiran Bapak/Ibu pada rapat koordinasi bulanan yang akan dilaksanakan pada:',
        eventDetails: 'Hari/Tanggal : Senin, 20 Januari 2026\nWaktu : 13.00 WIB - Selesai\nTempat : Ruang Meeting Lt. 3\nAgenda : Pembahasan Target Q1 2026',
        closing: 'Demikian undangan ini kami sampaikan. Atas perhatiannya diucapkan terima kasih.'
      }));
    } else if (type === 'assignment') {
      setData(prev => ({
        ...prev,
        no: '090/ST/OPS/I/2026',
        perihal: 'Surat Perintah Tugas',
        opening: 'Yang bertanda tangan di bawah ini memberikan tugas kepada nama-nama terlampir untuk melakukan perjalanan dinas dalam rangka survei lapangan.',
        eventDetails: 'Tujuan : Cabang Surabaya & Malang\nDurasi : 3 (Tiga) Hari\nTanggal : 25 - 27 Januari 2026',
        closing: 'Demikian surat tugas ini dibuat untuk dilaksanakan dengan penuh tanggung jawab.'
      }));
    } else if (type === 'permission') {
      setData(prev => ({
        ...prev,
        no: '012/IZIN/GA/I/2026',
        perihal: 'Permohonan Izin Penggunaan Tempat',
        opening: 'Dengan hormat,\n\nSehubungan dengan akan diadakannya kegiatan "Family Gathering 2026", kami bermaksud memohon izin penggunaan area lapangan yang Bapak/Ibu kelola.',
        eventDetails: 'Kegiatan : Family Gathering Karyawan\nTanggal : Sabtu, 15 Februari 2026\nWaktu : 07.00 - 15.00 WIB\nPeserta : +/- 100 Orang',
        closing: 'Besar harapan kami agar permohonan ini dapat dikabulkan. Atas kerjasamanya kami ucapkan terima kasih.'
      }));
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleCCChange = (idx: number, val: string) => {
    const newCC = [...data.cc];
    newCC[idx] = val;
    setData({ ...data, cc: newCC });
  };
  const addCC = () => setData({ ...data, cc: [...data.cc, ''] });
  const removeCC = (idx: number) => {
    const newCC = [...data.cc];
    newCC.splice(idx, 1);
    setData({ ...data, cc: newCC });
  };

  const TEMPLATES = [
    { id: 1, name: "Instansi Pemerintah", desc: "Format klasik, kop tengah, font serif" },
    { id: 2, name: "Modern Corporate", desc: "Blok rata kiri, bersih, profesional" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    <div className={`bg-white flex flex-col box-border text-slate-900 leading-normal p-[15mm] md:p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0 print:h-auto print:min-h-0 print:p-[15mm] ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10.5pt]'}`}>
      
      {/* HEADER SURAT / KOP */}
      <div className={`flex items-center gap-6 border-b-4 border-double border-slate-900 pb-4 mb-6 shrink-0 ${templateId === 1 ? 'text-center' : 'text-left'}`}>
        {logo ? (
          <img src={logo} alt="Logo" className="w-20 h-20 object-contain shrink-0" />
        ) : (
          <div className="w-16 h-16 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-300 shrink-0 no-print">
            <Building2 size={32} />
          </div>
        )}
        <div className="flex-grow">
          <h1 className="text-[14pt] font-black uppercase leading-tight tracking-tight mb-1">{data.compName}</h1>
          <p className="text-[9pt] font-sans whitespace-pre-line text-slate-600 print:text-black italic leading-tight">{data.compAddress}</p>
        </div>
      </div>

      {/* METADATA & PENERIMA */}
      <div className="space-y-6 flex-grow overflow-hidden text-left">
        <div className="flex justify-between items-start font-sans text-[10pt]">
            <div className="space-y-0.5">
                <p>Nomor : {data.no}</p>
                <p>Lampiran : {data.lampiran}</p>
                <p>Perihal : <b>{data.perihal}</b></p>
            </div>
            <p className="text-right">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : ''}</p>
        </div>

        <div className="pt-4 space-y-1">
          <p>Yth. <b>{data.receiver}</b></p>
          <p>{data.receiverAddress}</p>
        </div>

        {/* ISI SURAT */}
        <div className="pt-4 space-y-4 text-justify leading-relaxed">
          <p className="whitespace-pre-line">{data.opening}</p>
          
          <div className="ml-10 bg-slate-50 p-5 rounded-xl border border-slate-200 print:bg-transparent print:border-black font-mono text-[9.5pt] whitespace-pre-line leading-relaxed italic">
            {data.eventDetails}
          </div>

          <p className="whitespace-pre-line">{data.closing}</p>
        </div>
      </div>

      {/* TANDA TANGAN (NORMAL FLOW) */}
      <div className="shrink-0 mt-8 pt-6 border-t border-slate-100 print:border-black" style={{ pageBreakInside: 'avoid' }}>
        <div className="flex justify-end text-center">
          <div className="w-72 flex flex-col h-44">
            <p className="font-bold mb-1">{data.signerJob},</p>
            <div className="mt-auto">
              <p className="font-bold underline uppercase tracking-tight leading-none text-[11pt]">{data.signerName}</p>
              <p className="text-[9pt] font-sans mt-1">{data.signerNIP}</p>
            </div>
          </div>
        </div>

        {/* TEMBUSAN */}
        {data.cc.length > 0 && (
          <div className="mt-8 text-[8.5pt] font-sans border-t pt-4">
            <p className="font-bold underline mb-1 italic">Tembusan Yth:</p>
            <ol className="list-decimal ml-5 text-slate-600 print:text-black">
              {data.cc.map((item, idx) => (
                <li key={idx}>{item}</li>
              ))}
            </ol>
          </div>
        )}
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
          .no-print, header, .mobile-nav { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
        }
      `}</style>

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> <span>Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-blue-400 uppercase tracking-tighter italic">
               <Mail size={16} /> <span>Official Letter Builder</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative font-sans text-left">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-all leading-none">
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
              <Printer size={16} /> <span className="hidden md:inline">Print Document</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] relative">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-white border-r overflow-y-auto p-4 md:p-6 space-y-6 z-20 h-full ${mobileView === 'preview' ? 'hidden lg:block' : 'block'}`}>
           <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 space-y-3 font-sans text-left">
              <h3 className="text-[10px] font-black uppercase text-emerald-800 flex items-center gap-2"><Check size={12}/> Pilih Preset Cepat</h3>
              <div className="grid grid-cols-3 gap-2">
                 <button onClick={() => applyPreset('meeting')} className="bg-white p-2 rounded border border-emerald-200 text-[8px] font-bold hover:bg-emerald-100">UNDANGAN</button>
                 <button onClick={() => applyPreset('assignment')} className="bg-white p-2 rounded border border-blue-200 text-[8px] font-bold hover:bg-blue-100">SURAT TUGAS</button>
                 <button onClick={() => applyPreset('permission')} className="bg-white p-2 rounded border border-amber-200 text-[8px] font-bold hover:bg-amber-100">PERMOHONAN</button>
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left">
              <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Instansi / Kop</h3>
              <div className="flex items-center gap-4">
                 {logo ? (
                    <div className="relative w-14 h-14 border rounded overflow-hidden shrink-0 group">
                       <img src={logo} className="w-full h-full object-contain" />
                       <button onClick={() => setLogo(null)} className="absolute inset-0 bg-red-600/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><X size={16} /></button>
                    </div>
                 ) : (
                    <button onClick={() => fileInputRef.current?.click()} className="w-14 h-14 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-400 hover:border-blue-400 shrink-0 transition-all"><ImagePlus size={20} /></button>
                 )}
                 <input type="file" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
                 <input className="flex-1 p-2 border rounded text-xs font-bold uppercase bg-slate-50 leading-tight" value={data.compName} onChange={e => handleDataChange('compName', e.target.value)} />
              </div>
              <textarea className="w-full p-2 border rounded text-xs h-16 resize-none leading-tight" value={data.compAddress} onChange={e => handleDataChange('compAddress', e.target.value)} placeholder="Alamat & Kontak" />
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left text-xs">
              <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><Mail size={12}/> Detail Surat</h3>
              <div className="grid grid-cols-2 gap-2">
                <input className="w-full p-2 border rounded text-xs" value={data.no} onChange={e => handleDataChange('no', e.target.value)} placeholder="Nomor Surat" />
                <input className="w-full p-2 border rounded text-xs" value={data.lampiran} onChange={e => handleDataChange('lampiran', e.target.value)} placeholder="Lampiran" />
              </div>
              <input className="w-full p-2 border rounded text-xs font-bold" value={data.perihal} onChange={e => handleDataChange('perihal', e.target.value)} placeholder="Perihal" />
              <textarea className="w-full p-2 border rounded text-xs h-16 resize-none" value={data.receiver} onChange={e => handleDataChange('receiver', e.target.value)} placeholder="Tujuan (Kepada Yth.)" />
           </div>

           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4 font-sans text-left pb-10">
              <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><FileText size={12}/> Isi Surat & CC</h3>
              <textarea className="w-full p-2 border rounded text-xs h-24 resize-none leading-relaxed" value={data.opening} onChange={e => handleDataChange('opening', e.target.value)} placeholder="Pembuka" />
              <textarea className="w-full p-2 border rounded text-xs h-32 resize-none font-mono text-[10px] leading-tight" value={data.eventDetails} onChange={e => handleDataChange('eventDetails', e.target.value)} placeholder="Detail (Hari, Tanggal, Tempat)" />
              
              <div className="space-y-2 border-t pt-4">
                <div className="flex justify-between items-center"><label className="text-[10px] font-bold text-slate-400 uppercase">Tembusan (CC)</label><button onClick={addCC} className="text-[10px] text-blue-600 font-bold hover:underline">+ TAMBAH</button></div>
                {data.cc.map((item, idx) => (
                  <div key={idx} className="flex gap-2"><input className="flex-1 p-2 border border-slate-200 rounded text-xs bg-slate-50" value={item} onChange={e => handleCCChange(idx, e.target.value)} /><button onClick={() => removeCC(idx)} className="text-red-400 hover:text-red-600 transition-colors"><Trash2 size={14}/></button></div>
                ))}
              </div>
           </div>
           <div className="h-20 md:hidden"></div>
        </div>

        {/* PREVIEW AREA (STABILIZED) */}
        <div className={`flex-1 bg-slate-200/50 relative h-full no-print ${mobileView === 'editor' ? 'hidden lg:block' : 'block'}`}>
           <div className="absolute inset-0 overflow-y-auto overflow-x-hidden p-4 md:p-12 flex justify-center custom-scrollbar">
              <div className="origin-top transition-transform duration-300 transform scale-[0.43] sm:scale-[0.55] md:scale-[0.8] lg:scale-100 h-fit mb-12 shadow-2xl">
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