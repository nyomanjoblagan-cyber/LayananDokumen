'use client';

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, RotateCcw,
  Trash2, ChevronDown, Eye, Edit3, X, ImagePlus,
  MapPin, Calendar, Building2, UserCircle2, Briefcase, FileText, ArrowLeftCircle,
  Wallet
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

interface Staff {
  name: string;
  id: string;
  position: string;
}

interface Biaya {
  jenis: string;
  ditanggungOleh: string;
}

interface TaskData {
  compName: string;
  compInfo: string;
  city: string;
  date: string;
  no: string;
  taskTitle: string;
  location: string;
  startDate: string;
  endDate: string;
  staffs: Staff[];
  instruction: string;
  signerName: string;
  signerJob: string;
  cc: string;
  biaya: Biaya[];
}

const TEMPLATES = [
  { id: 1, name: "Corporate HR Enterprise", desc: "Standar operasional formal" }
];

const INITIAL_DATA: TaskData = {
  compName: 'PT. MAJU BERSAMA ENTERPRISE',
  compInfo: 'Cyber Tower, 15th Floor, Jl. H.R. Rasuna Said, Jakarta\nPhone: (021) 888-9999 | Email: hrd@majubersama.com',
  city: 'Jakarta',
  date: '', 
  no: '124/HRD/ST/VII/2026',
  taskTitle: 'Implementasi Sistem ERP dan Pelatihan Karyawan',
  location: 'Kantor Cabang Yogyakarta',
  startDate: '2026-07-15',
  endDate: '2026-07-20',
  staffs: [
    { name: 'Budi Santoso', id: 'EMP-2021001', position: 'Senior IT Consultant' },
    { name: 'Siti Aminah', id: 'EMP-2022045', position: 'HR Training Specialist' }
  ],
  instruction: 'Harap berkoordinasi dengan Kepala Cabang setempat. Pastikan seluruh modul ERP terpasang dan disosialisasikan.',
  signerName: 'KARTIKA WIDYA',
  signerJob: 'Chief Human Resources Officer',
  cc: '1. Direktur Utama\n2. Finance Department',
  biaya: [
    { jenis: 'Akomodasi (Penginapan)', ditanggungOleh: 'Perusahaan (Corporate Account)' },
    { jenis: 'Transportasi', ditanggungOleh: 'Perusahaan (Reimbursement)' },
    { jenis: 'Uang Harian (Per Diem)', ditanggungOleh: 'Perusahaan (Diberikan dimuka)' }
  ]
};

const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 h-auto ${className}`}>
    {children}
  </div>
);

export default function SuratTugasPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium uppercase tracking-widest text-xs bg-slate-50">Loading HR System...</div>}>
      <SuratTugasBuilder />
    </Suspense>
  );
}

function SuratTugasBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<TaskData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    setData(prev => ({ ...prev, date: new Date().toISOString().split('T')[0] }));
  }, []);

  const handleDataChange = (field: keyof TaskData, val: any) => setData({ ...data, [field]: val });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleStaffChange = (idx: number, field: keyof Staff, val: string) => {
    const newStaffs = [...data.staffs];
    newStaffs[idx][field] = val;
    setData({ ...data, staffs: newStaffs });
  };

  const handleBiayaChange = (idx: number, field: keyof Biaya, val: string) => {
    const newBiaya = [...data.biaya];
    newBiaya[idx][field] = val;
    setData({ ...data, biaya: newBiaya });
  };

  const addStaff = () => setData({ ...data, staffs: [...data.staffs, { name: '', id: '', position: '' }] });
  const removeStaff = (idx: number) => {
    const temp = [...data.staffs];
    if(temp.length > 1) {
        temp.splice(idx, 1);
        setData({ ...data, staffs: temp });
    }
  };

  const addBiaya = () => setData({ ...data, biaya: [...data.biaya, { jenis: '', ditanggungOleh: '' }] });
  const removeBiaya = (idx: number) => {
    const temp = [...data.biaya];
    if(temp.length > 1) {
        temp.splice(idx, 1);
        setData({ ...data, biaya: temp });
    }
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset semua data surat tugas?')) {
        setData({ ...INITIAL_DATA, date: new Date().toISOString().split('T')[0] });
        setLogo(null);
    }
  };

  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <Kertas>
        {/* HEADER / KOP SURAT */}
        <div className="flex items-center gap-6 border-b-4 border-double border-slate-900 pb-4 mb-6 shrink-0 text-center font-sans">
          {logo ? (
            <img src={logo} alt="Logo" className="w-24 h-24 object-contain shrink-0" />
          ) : (
            <div className="w-24 h-24 bg-slate-50 border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 shrink-0 print:hidden">
              <Building2 size={36} />
            </div>
          )}
          <div className="flex-grow text-left">
            <h1 className="text-[18pt] font-black uppercase leading-tight tracking-tighter text-slate-900">{data.compName}</h1>
            <p className="text-[9pt] mt-1 text-slate-600 print:text-black leading-tight whitespace-pre-line font-medium">{data.compInfo}</p>
          </div>
        </div>

        {/* TITLE */}
        <div className="text-center mb-6 shrink-0 leading-tight font-serif">
          <h2 className="text-2xl font-black underline uppercase tracking-wider text-slate-900">SURAT PERINTAH TUGAS</h2>
          <p className="text-[11pt] mt-2 text-slate-700 print:text-black">Nomor: {data.no}</p>
        </div>

        {/* BODY */}
        <div className="space-y-4 overflow-visible text-justify leading-relaxed flex-grow text-[11pt]">
          <p>Berdasarkan kebutuhan operasional perusahaan, Direksi <strong>{data.compName}</strong> dengan ini memberikan instruksi dan penugasan resmi kepada:</p>
          
          <div className="overflow-hidden border border-slate-900 break-inside-avoid">
            <table className="w-full border-collapse text-[10pt] font-sans">
                <thead>
                    <tr className="bg-slate-100 text-slate-900 font-bold print:bg-transparent print:border-b print:border-black">
                        <th className="py-2 w-12 text-center border-r border-slate-900 print:border-black">NO</th>
                        <th className="py-2 text-left px-3 border-r border-slate-900 print:border-black">NAMA / NIK</th>
                        <th className="py-2 text-left px-3">JABATAN</th>
                    </tr>
                </thead>
                <tbody>
                    {data.staffs.map((s, i) => (
                        <tr key={i} className="border-t border-slate-900 print:border-black">
                            <td className="py-2 text-center border-r border-slate-900 print:border-black">{i + 1}</td>
                            <td className="py-2 px-3 border-r border-slate-900 print:border-black">
                                <div className="font-bold uppercase text-slate-900">{s.name || '...'}</div>
                                <div className="text-[9pt] font-mono text-slate-600 print:text-black">{s.id || '...'}</div>
                            </td>
                            <td className="py-2 px-3 font-medium uppercase text-[9.5pt]">{s.position || '...'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
          </div>

          <p>Untuk melaksanakan tugas kedinasan dengan rincian sebagai berikut:</p>

          <div className="pl-4 space-y-2 break-inside-avoid">
              <table className="w-full text-[11pt]">
                  <tbody>
                      <tr>
                          <td className="w-48 py-1 font-semibold align-top">Maksud & Tujuan</td>
                          <td className="w-4 py-1 align-top">:</td>
                          <td className="py-1 align-top font-bold">{data.taskTitle}</td>
                      </tr>
                      <tr>
                          <td className="py-1 font-semibold align-top">Lokasi / Tempat</td>
                          <td className="py-1 align-top">:</td>
                          <td className="py-1 align-top">{data.location}</td>
                      </tr>
                      <tr>
                          <td className="py-1 font-semibold align-top">Waktu Pelaksanaan</td>
                          <td className="py-1 align-top">:</td>
                          <td className="py-1 align-top">
                              {formatDateSafe(data.startDate)} s.d. {formatDateSafe(data.endDate)}
                          </td>
                      </tr>
                  </tbody>
              </table>
          </div>

          <div className="mt-4 break-inside-avoid">
              <p className="font-bold mb-2">Rincian Beban Biaya:</p>
              <table className="w-full border-collapse text-[10pt] border border-slate-900 font-sans">
                  <thead>
                      <tr className="bg-slate-100 print:bg-transparent print:border-b print:border-black">
                          <th className="py-2 px-3 text-left border-r border-slate-900 print:border-black">Jenis Biaya</th>
                          <th className="py-2 px-3 text-left">Ditanggung Oleh</th>
                      </tr>
                  </thead>
                  <tbody>
                      {data.biaya.map((b, i) => (
                          <tr key={i} className="border-t border-slate-900 print:border-black">
                              <td className="py-2 px-3 border-r border-slate-900 print:border-black">{b.jenis}</td>
                              <td className="py-2 px-3">{b.ditanggungOleh}</td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>

          <div className="mt-4 border border-slate-900 p-4 break-inside-avoid text-justify">
              <p className="font-bold underline mb-1 uppercase text-[10pt] font-sans">Instruksi Khusus & Pelaporan:</p>
              <p>{data.instruction}</p>
              <p className="mt-2 font-bold italic">
                  Karyawan wajib memberikan laporan tertulis kepada atasan langsung maksimal 3 (tiga) hari kerja setelah tugas selesai dilaksanakan.
              </p>
          </div>

          <p>Demikian Surat Perintah Tugas ini diterbitkan agar dapat dilaksanakan dengan penuh tanggung jawab. Kepada pihak-pihak yang terkait mohon bantuan dan kerja samanya kelancaran tugas tersebut.</p>
        </div>

        {/* SIGNATURE */}
        <div className="shrink-0 mt-8 break-inside-avoid">
            <div className="flex justify-end text-center font-sans">
              <div className="w-72 flex flex-col h-40">
                 <p className="text-[11pt] mb-1">{data.city}, {formatDateSafe(data.date)}</p>
                 <p className="font-bold text-[11pt] mb-1">{data.compName}</p>
                 <div className="mt-auto">
                    <p className="font-black underline uppercase tracking-tight leading-none text-[12pt] text-slate-900">{data.signerName}</p>
                    <p className="text-[10pt] font-medium mt-1">{data.signerJob}</p>
                 </div>
              </div>
            </div>
            {data.cc && (
               <div className="text-[10pt] font-sans mt-6">
                  <p className="font-bold underline mb-1">Tembusan:</p>
                  <span className="whitespace-pre-line leading-relaxed">{data.cc}</span>
               </div>
            )}
        </div>
      </Kertas>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      {/* ATURAN PRINT MUTLAK */}
      <style dangerouslySetInnerHTML={{ __html: `\n@media print {\n  @page { size: A4; margin: 15mm; } \n  body { background: white; margin: 0; padding: 0; width: 100%; }\n  .no-print { display: none !important; }\n  #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }\n  .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }\n  .break-before-auto { break-before: auto !important; page-break-before: auto !important; }\n  * { box-sizing: border-box !important; }\n}\n` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white h-16 sticky top-0 z-50 border-b border-slate-700 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block mx-2"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-emerald-400 uppercase tracking-tighter italic">
               <Briefcase size={16} /> <span>Corporate HR Document System</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative text-left">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-widest border border-slate-700">
                <LayoutTemplate size={14} className="text-blue-400" />
                <span className="hidden sm:inline">{activeTemplateName}</span>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-transform' : ''} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 z-50 overflow-hidden p-1">
                  {TEMPLATES.map(t => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm rounded-lg hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'}`}>
                      <div className="font-bold">{t.name}</div>
                      <div className="text-[10px] text-slate-400 font-normal">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Surat</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] relative text-left">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans">
               <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> HRD Editor</h2>
               <button onClick={handleReset} className="text-slate-400 hover:text-red-500"><RotateCcw size={16}/></button>
           </div>

           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Data Perusahaan</h3>
                 <div className="flex items-center gap-4 py-2">
                    <div onClick={() => fileInputRef.current?.click()} className="w-16 h-16 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 overflow-hidden shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" alt="Logo" /> : <ImagePlus size={20} className="text-slate-300" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    <input className="flex-1 p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none uppercase" value={data.compName} onChange={e => handleDataChange('compName', e.target.value)} placeholder="Nama Perusahaan" />
                 </div>
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.compInfo} onChange={e => handleDataChange('compInfo', e.target.value)} placeholder="Alamat & Kontak" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Personel Ditugaskan</h3>
                 {data.staffs.map((s, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-100 space-y-3 relative group">
                        <button onClick={() => removeStaff(idx)} className="absolute top-3 right-3 text-slate-300 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                        <input className="w-full p-2 bg-white border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-emerald-500 outline-none" value={s.name} onChange={e => handleStaffChange(idx, 'name', e.target.value)} placeholder="Nama Lengkap" />
                        <div className="grid grid-cols-2 gap-3">
                            <input className="w-full p-2 bg-white border rounded-lg text-[10px] focus:ring-2 focus:ring-emerald-500 outline-none font-mono" value={s.id} onChange={e => handleStaffChange(idx, 'id', e.target.value)} placeholder="NIK / ID" />
                            <input className="w-full p-2 bg-white border rounded-lg text-[10px] focus:ring-2 focus:ring-emerald-500 outline-none" value={s.position} onChange={e => handleStaffChange(idx, 'position', e.target.value)} placeholder="Jabatan" />
                        </div>
                    </div>
                 ))}
                 <button onClick={addStaff} className="w-full py-3 border-2 border-dashed border-blue-200 rounded-2xl text-blue-600 font-black hover:bg-blue-50 text-[10px] uppercase transition-all tracking-widest">+ Tambah Personel</button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-violet-600 border-b pb-1 tracking-widest flex items-center gap-2"><Wallet size={12}/> Rincian Beban Biaya</h3>
                 {data.biaya.map((b, idx) => (
                    <div key={idx} className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-2 relative group">
                        <button onClick={() => removeBiaya(idx)} className="absolute top-2 right-2 text-slate-300 hover:text-red-500 transition-colors"><X size={14}/></button>
                        <input className="w-full p-1.5 bg-white border rounded-lg text-[11px] font-bold focus:ring-2 focus:ring-violet-500 outline-none" value={b.jenis} onChange={e => handleBiayaChange(idx, 'jenis', e.target.value)} placeholder="Jenis Biaya (Contoh: Akomodasi)" />
                        <input className="w-full p-1.5 bg-white border rounded-lg text-[11px] focus:ring-2 focus:ring-violet-500 outline-none" value={b.ditanggungOleh} onChange={e => handleBiayaChange(idx, 'ditanggungOleh', e.target.value)} placeholder="Ditanggung Oleh" />
                    </div>
                 ))}
                 <button onClick={addBiaya} className="w-full py-2 border-2 border-dashed border-violet-200 rounded-xl text-violet-600 font-bold hover:bg-violet-50 text-[10px] uppercase transition-all tracking-wider">+ Tambah Biaya</button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4 pb-10">
                 <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 tracking-widest flex items-center gap-2"><FileText size={12}/> Rincian Penugasan</h3>
                 <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400 uppercase">Maksud Penugasan</label>
                 <input className="w-full p-2 border rounded-lg text-xs font-black focus:ring-2 focus:ring-amber-500 outline-none uppercase" value={data.taskTitle} onChange={e => handleDataChange('taskTitle', e.target.value)} placeholder="Contoh: Audit Keuangan" /></div>
                 
                 <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400 uppercase">Lokasi / Tempat</label>
                 <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={data.location} onChange={e => handleDataChange('location', e.target.value)} placeholder="Kantor Cabang, etc." /></div>
                 
                 <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400 uppercase">Tgl Mulai</label><input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.startDate} onChange={e => handleDataChange('startDate', e.target.value)} /></div>
                    <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400 uppercase">Tgl Selesai</label><input type="date" className="w-full p-2 border rounded-lg text-xs" value={data.endDate} onChange={e => handleDataChange('endDate', e.target.value)} /></div>
                 </div>
                 
                 <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400 uppercase">Instruksi Khusus (Kewajiban lapor sudah otomatis tercetak)</label>
                 <textarea className="w-full p-2 border rounded-lg text-xs h-24 resize-none focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed" value={data.instruction} onChange={e => handleDataChange('instruction', e.target.value)} placeholder="Instruksi Operasional Khusus..." /></div>
                 
                 <div className="grid grid-cols-2 gap-3 pt-2 border-t">
                    <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400 uppercase">Pemberi Tugas</label>
                    <input className="w-full p-2 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-slate-500 outline-none uppercase" value={data.signerName} onChange={e => handleDataChange('signerName', e.target.value)} placeholder="Nama Penyetuju" /></div>
                    <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400 uppercase">Jabatan</label>
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.signerJob} onChange={e => handleDataChange('signerJob', e.target.value)} placeholder="HR Manager / Direktur" /></div>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400 uppercase">Kota Terbit</label>
                    <input className="w-full p-2 border rounded-lg text-xs uppercase focus:ring-2 focus:ring-slate-500 outline-none" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" /></div>
                    <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400 uppercase">No. Surat</label>
                    <input className="w-full p-2 border rounded-lg text-[10px] focus:ring-2 focus:ring-slate-500 outline-none font-mono" value={data.no} onChange={e => handleDataChange('no', e.target.value)} placeholder="No. Surat" /></div>
                 </div>
                 
                 <div className="space-y-1"><label className="text-[9px] font-bold text-slate-400 uppercase">Tembusan (Opsional)</label>
                 <textarea className="w-full p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-slate-500 outline-none" value={data.cc} onChange={e => handleDataChange('cc', e.target.value)} placeholder="Tembusan (CC)..." /></div>
              </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-0.9 xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <DocumentContent />
            </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Surat Perintah Tugas" price={10000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
