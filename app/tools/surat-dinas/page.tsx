'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Upload, X, Image as ImageIcon, 
  ChevronDown, Check, LayoutTemplate, Building2, 
  Mail, Users, FileText, Calendar, Plus, Trash2
} from 'lucide-react';
import Link from 'next/link';

export default function OfficialLetterPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat...</div>}>
      <OfficialLetterBuilder />
    </Suspense>
  );
}

function OfficialLetterBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);

  // DATA DEFAULT
  const [data, setData] = useState({
    compName: 'DINAS PENDIDIKAN DAN KEBUDAYAAN',
    compAddress: 'Jl. Jenderal Sudirman No. 10, Jakarta Pusat\nTelp: (021) 555-7777 | Email: info@disdik.go.id',
    city: 'Jakarta',
    date: new Date().toISOString().split('T')[0],
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

  // PRESETS
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
    if (file) setLogo(URL.createObjectURL(file));
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
    { id: 1, name: "Instansi/Pemerintahan", desc: "Format klasik, kop tengah, font serif, garis tebal" },
    { id: 2, name: "Modern Corporate", desc: "Format blok rata kiri, bersih, tanpa garis kop heboh" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- COMPONENT: KERTAS (ANTI-SCROLLBAR & TOP-CLIPPING FIX) ---
  const Kertas = ({ children }: { children: React.ReactNode }) => (
    <div className="
      /* Screen View */
      w-[210mm] min-h-[297mm] bg-white shadow-2xl p-[25mm] mx-auto box-border mb-10 relative
      /* Print View - Reset Total */
      print:w-[210mm] print:h-auto print:min-h-0 print:shadow-none print:m-0 print:p-[20mm] print:static print:block
    ">
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800 print:bg-white">
      <style jsx global>{`
        @media print {
          /* Reset total margin browser */
          @page { 
            size: A4; 
            margin: 0mm !important; 
          }
          
          body, html { 
            margin: 0 !important; 
            padding: 0 !important; 
            background: white !important; 
            overflow: visible !important; 
            height: auto !important; 
          }

          header, nav, .no-print, button { display: none !important; }

          /* Pastikan container tidak memiliki overflow */
          #print-area-wrapper {
            overflow: visible !important;
            height: auto !important;
            display: block !important;
          }

          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>

      {/* HEADER */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft size={18} /> <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2"></div>
            <h1 className="text-sm font-bold tracking-wide text-emerald-400 uppercase">Editor Surat Dinas</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium min-w-[180px] justify-between">
                <div className="flex items-center gap-2"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} className={`transition-transform ${showTemplateMenu ? 'rotate-180' : ''}`} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50">
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 ${templateId === t.id ? 'bg-blue-50 text-blue-700' : 'text-slate-700'}`}>
                      <div><div className="font-medium">{t.name}</div><div className="text-[10px] text-slate-400">{t.desc}</div></div>
                      {templateId === t.id && <Check size={14} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 shadow-lg transition-all">
              <Printer size={16} /> Cetak PDF
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)]">
        {/* --- LEFT SIDEBAR: INPUT --- */}
        <div className="no-print w-full lg:w-[450px] shrink-0 h-full overflow-y-auto pr-2 pb-20 space-y-6">
          {/* Quick Preset */}
          <div className="bg-emerald-50 rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
             <div className="px-4 py-3 border-b border-emerald-200 flex items-center gap-2"><FileText size={14} className="text-emerald-600" /><h3 className="text-xs font-bold text-emerald-800 uppercase">Jenis Surat Cepat</h3></div>
             <div className="p-4 grid grid-cols-3 gap-2">
                <button onClick={() => applyPreset('meeting')} className="bg-white hover:bg-emerald-100 border border-emerald-200 text-emerald-700 py-2 rounded text-[10px] font-bold">Undangan</button>
                <button onClick={() => applyPreset('assignment')} className="bg-white hover:bg-blue-100 border border-blue-200 text-blue-700 py-2 rounded text-[10px] font-bold">Surat Tugas</button>
                <button onClick={() => applyPreset('permission')} className="bg-white hover:bg-amber-100 border border-amber-200 text-amber-700 py-2 rounded text-[10px] font-bold">Permohonan</button>
             </div>
          </div>

          {/* Kop & Metadata */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
             <div className="flex items-center gap-4 border-b border-slate-100 pb-4">
                <div className="w-16 h-16 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-blue-400 transition-all" onClick={() => fileInputRef.current?.click()}>
                  {logo ? <img src={logo} className="w-full h-full object-contain" /> : <Upload size={20} className="text-slate-300" />}
                  <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                </div>
                <div><h4 className="text-xs font-bold text-slate-700 uppercase">Kepala Surat</h4><p className="text-[10px] text-slate-400">Upload logo instansi Anda</p></div>
             </div>
             <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs font-bold" placeholder="Nama Instansi" value={data.compName} onChange={e => setData({...data, compName: e.target.value})} />
             <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-16" placeholder="Alamat & Kontak" value={data.compAddress} onChange={e => setData({...data, compAddress: e.target.value})} />
          </div>

          {/* Penerima & Isi */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
             <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase">Nomor</label><input className="w-full p-2 border border-slate-300 rounded text-xs" value={data.no} onChange={e => setData({...data, no: e.target.value})} /></div>
                <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase">Perihal</label><input className="w-full p-2 border border-slate-300 rounded text-xs" value={data.perihal} onChange={e => setData({...data, perihal: e.target.value})} /></div>
             </div>
             <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase">Tujuan (Yth.)</label><textarea className="w-full p-2 border border-slate-300 rounded text-xs h-16" value={data.receiver} onChange={e => setData({...data, receiver: e.target.value})} /></div>
             <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase">Isi Pembuka</label><textarea className="w-full p-2 border border-slate-300 rounded text-xs h-20" value={data.opening} onChange={e => setData({...data, opening: e.target.value})} /></div>
             <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase">Detail Acara/Tugas</label><textarea className="w-full p-2 border border-slate-300 rounded text-xs h-24 font-mono" value={data.eventDetails} onChange={e => setData({...data, eventDetails: e.target.value})} /></div>
          </div>

          {/* Signer & CC */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
             <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase">Nama Penanda Tangan</label><input className="w-full p-2 border border-slate-300 rounded text-xs" value={data.signerName} onChange={e => setData({...data, signerName: e.target.value})} /></div>
                <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase">Jabatan</label><input className="w-full p-2 border border-slate-300 rounded text-xs" value={data.signerJob} onChange={e => setData({...data, signerJob: e.target.value})} /></div>
             </div>
             <div className="space-y-2">
                <div className="flex justify-between items-center"><label className="text-[10px] font-bold text-slate-400 uppercase">Tembusan (CC)</label><button onClick={addCC} className="text-[10px] text-blue-600 font-bold">+ Tambah</button></div>
                {data.cc.map((item, idx) => (
                  <div key={idx} className="flex gap-2"><input className="flex-1 p-2 border border-slate-300 rounded text-xs" value={item} onChange={e => handleCCChange(idx, e.target.value)} /><button onClick={() => removeCC(idx)} className="text-red-400"><Trash2 size={14}/></button></div>
                ))}
             </div>
          </div>
        </div>

        {/* --- RIGHT PREVIEW --- */}
        <div id="print-area-wrapper" className="flex-1 h-full bg-slate-200/50 rounded-xl flex justify-center p-8 overflow-y-auto print:p-0 print:bg-white print:w-full print:block">
          <Kertas>
            {templateId === 1 && (
              <div className="font-serif text-[11pt] leading-relaxed">
                {/* TEMPLATE 1: INSTANSI */}
                <div className="flex items-center justify-center gap-6 border-b-[3px] border-double border-black pb-4 mb-6">
                  {logo && <img src={logo} className="h-20 w-auto object-contain" alt="logo" />}
                  <div className="text-center">
                    <h1 className="text-xl font-bold uppercase tracking-wide leading-tight mb-1">{data.compName}</h1>
                    <div className="text-[10pt] leading-tight whitespace-pre-line font-sans">{data.compAddress}</div>
                  </div>
                </div>
                <div className="flex justify-end mb-6 font-sans text-[10pt]">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</div>
                <div className="flex mb-8">
                  <div className="w-[60%]">
                    <table><tbody>
                      <tr><td className="w-20">Nomor</td><td className="w-3">:</td><td>{data.no}</td></tr>
                      <tr><td>Sifat</td><td>:</td><td>Penting</td></tr>
                      <tr><td>Lampiran</td><td>:</td><td>{data.lampiran}</td></tr>
                      <tr><td className="align-top">Perihal</td><td className="align-top">:</td><td className="font-bold underline">{data.perihal}</td></tr>
                    </tbody></table>
                  </div>
                  <div className="w-[40%] pl-8">
                    <div>Kepada Yth.</div>
                    <div className="font-bold whitespace-pre-line">{data.receiver}</div>
                    <div>{data.receiverAddress}</div>
                  </div>
                </div>
                <div className="mb-4 whitespace-pre-line text-justify">{data.opening}</div>
                {data.eventDetails && <div className="ml-12 mb-6 whitespace-pre-line">{data.eventDetails}</div>}
                <div className="mb-12 whitespace-pre-line text-justify">{data.closing}</div>
                <div className="flex justify-end text-center">
                  <div className="w-64">
                    <div className="mb-24 font-bold">{data.signerJob}</div>
                    <div className="font-bold underline uppercase">{data.signerName}</div>
                    <div className="text-[10pt]">{data.signerNIP}</div>
                  </div>
                </div>
                {data.cc.length > 0 && (
                  <div className="mt-12 text-[9pt] font-sans">
                    <div className="underline font-bold mb-1">Tembusan:</div>
                    <ol className="list-decimal ml-5">{data.cc.map((item, idx) => (<li key={idx}>{item}</li>))}</ol>
                  </div>
                )}
              </div>
            )}

            {templateId === 2 && (
              <div className="font-sans text-[11pt] leading-relaxed">
                {/* TEMPLATE 2: MODERN CORPORATE */}
                <div className="flex justify-between items-start border-b border-slate-300 pb-6 mb-8">
                  <div className="flex items-center gap-4">
                    {logo && <img src={logo} className="h-12 w-auto" alt="logo" />}
                    <div><h1 className="text-lg font-black text-slate-800 uppercase tracking-tighter">{data.compName}</h1><div className="text-xs text-slate-400">{data.city}</div></div>
                  </div>
                  <div className="text-right text-[9pt] text-slate-400 max-w-[250px] whitespace-pre-line leading-tight">{data.compAddress}</div>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-10">
                  <div className="text-sm font-bold text-slate-900 border-l-4 border-emerald-500 pl-3 py-1">No: {data.no}<br/>{new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</div>
                  <div className="text-right text-[10pt]"><span className="text-slate-400 mr-2 uppercase text-[8pt] font-bold">To:</span><span className="font-bold text-slate-800 whitespace-pre-line">{data.receiver}</span></div>
                </div>
                <h2 className="text-xl font-black text-slate-900 mb-8 border-b-2 border-slate-100 pb-2 uppercase">{data.perihal}</h2>
                <div className="space-y-6 text-slate-700 text-justify">
                  <div className="whitespace-pre-line">{data.opening}</div>
                  {data.eventDetails && <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 font-medium text-slate-800 whitespace-pre-line leading-loose">{data.eventDetails}</div>}
                  <div className="whitespace-pre-line">{data.closing}</div>
                </div>
                <div className="mt-16"><div className="font-black text-slate-900 uppercase tracking-tighter">{data.signerName}</div><div className="text-xs text-slate-400 font-bold uppercase tracking-widest">{data.signerJob}</div></div>
                {data.cc.length > 0 && <div className="mt-auto pt-10 text-[8pt] text-slate-400 border-t border-slate-100 italic"><span className="font-bold mr-2 uppercase">CC:</span>{data.cc.join(', ')}</div>}
              </div>
            )}
          </Kertas>
        </div>
      </div>
    </div>
  );
}