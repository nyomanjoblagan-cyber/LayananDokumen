'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, 
  Briefcase, Users, MapPin, Calendar, Plus, Trash2, 
  ChevronDown, Check
} from 'lucide-react';
import Link from 'next/link';

export default function SuratTugasPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem HRD...</div>}>
      <SuratTugasBuilder />
    </Suspense>
  );
}

function SuratTugasBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);

  // DATA DEFAULT
  const [data, setData] = useState({
    compName: 'PT. TEKNOLOGI CIPTA MANDIRI',
    compInfo: 'Gedung Cyber Lt. 12, Jl. Kuningan Barat, Jakarta Selatan\nTelp: 021-555-0123 | Email: hrd@tcm.id',
    city: 'Jakarta',
    date: new Date().toISOString().split('T')[0],
    no: '045/HRD-ST/I/2026',
    taskTitle: 'Audit Tahunan Kantor Cabang',
    location: 'Cabang Surabaya & Malang',
    startDate: '2026-01-15',
    endDate: '2026-01-18',
    staffs: [
      { name: 'Rahmat Hidayat', id: 'NIK-10293', position: 'Senior Auditor' },
      { name: 'Siska Amelia', id: 'NIK-10442', position: 'Staff Keuangan' }
    ],
    instruction: 'Melakukan pemeriksaan laporan keuangan tahunan dan verifikasi aset fisik di kantor cabang Surabaya dan Malang. Seluruh biaya perjalanan dan akomodasi ditanggung oleh perusahaan sesuai dengan kebijakan perjalanan dinas yang berlaku.',
    signerName: 'Hendra Wijaya, S.E.',
    signerJob: 'Direktur Operasional'
  });

  // HANDLERS
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogo(URL.createObjectURL(file));
  };
  const handleStaffChange = (idx: number, field: string, val: string) => {
    const newStaffs = [...data.staffs];
    // @ts-ignore
    newStaffs[idx][field] = val;
    setData({ ...data, staffs: newStaffs });
  };
  const addStaff = () => setData({ ...data, staffs: [...data.staffs, { name: '', id: '', position: '' }] });
  const removeStaff = (idx: number) => {
    const newStaffs = [...data.staffs];
    newStaffs.splice(idx, 1);
    setData({ ...data, staffs: newStaffs });
  };

  const TEMPLATES = [
    { id: 1, name: "Formal Corporate", desc: "Layout standar dengan tabel personel" },
    { id: 2, name: "Modern Minimalist", desc: "Tampilan bersih tanpa garis tabel" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN KERTAS (ANTI-KEPOTONG) ---
  const Kertas = ({ children }: { children: React.ReactNode }) => (
    <div className="
      /* Layar Browser */
      w-[210mm] min-h-[297mm] bg-white shadow-2xl p-[20mm] mx-auto box-border mb-10 relative
      /* Saat Print */
      print:w-[210mm] print:h-auto print:shadow-none print:m-0 print:p-[15mm] print:block print:static
    ">
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 print:bg-white">
      {/* CSS PRINT - ANTI KEPOTONG & ANTI SCROLLBAR */}
      <style jsx global>{`
        @media print {
          @page { 
            size: A4; 
            margin: 5mm 0mm; /* Memberi ruang napas untuk printer di atas & bawah */
          }
          body, html { 
            margin: 0 !important; 
            padding: 0 !important; 
            background: white !important; 
            overflow: visible !important; 
            height: auto !important; 
          }
          header, nav, aside, button, .no-print { 
            display: none !important; 
          }
          #print-container {
            padding: 0 !important;
            margin: 0 !important;
            display: block !important;
          }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>

      {/* NAV BAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors"><ArrowLeft size={18} /></Link>
            <h1 className="text-sm font-bold text-emerald-400 uppercase tracking-widest">Surat Tugas HRD</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs min-w-[180px] justify-between">
                <div className="flex items-center gap-2"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border z-50 overflow-hidden text-slate-700">
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className="w-full text-left px-4 py-3 text-sm hover:bg-blue-50 border-b last:border-0">
                      <div className="font-bold">{t.name}</div>
                      <div className="text-[10px] text-slate-400">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase hover:bg-emerald-500 shadow-lg">
              <Printer size={16} /> Cetak
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)] overflow-hidden">
        {/* SIDEBAR INPUT */}
        <div className="no-print w-full lg:w-[450px] shrink-0 h-full overflow-y-auto space-y-6 pb-20 pr-2">
          {/* Form Kop */}
          <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
             <label className="text-[10px] font-bold text-slate-400 uppercase">Kepala Surat (Kop)</label>
             <div className="flex items-center gap-4">
                <div onClick={() => fileInputRef.current?.click()} className="w-16 h-16 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 relative overflow-hidden">
                   {logo ? <img src={logo} className="w-full h-full object-contain" alt="logo" /> : <Upload size={20} className="text-slate-300" />}
                   <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                </div>
                <input type="text" className="flex-1 p-2 border rounded text-xs font-bold" placeholder="Nama Perusahaan" value={data.compName} onChange={e => setData({...data, compName: e.target.value})} />
             </div>
             <textarea className="w-full p-2 border rounded text-xs h-14" placeholder="Info Perusahaan" value={data.compInfo} onChange={e => setData({...data, compInfo: e.target.value})} />
          </div>

          {/* Form Personel */}
          <div className="bg-white rounded-xl shadow-sm border p-4">
             <div className="flex justify-between items-center mb-4">
                <h3 className="text-xs font-bold uppercase text-slate-500">Daftar Personel</h3>
                <button onClick={addStaff} className="text-[10px] bg-blue-50 text-blue-600 px-2 py-1 rounded font-bold">+ Tambah</button>
             </div>
             <div className="space-y-3">
                {data.staffs.map((s, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded border relative group">
                    <button onClick={() => removeStaff(idx)} className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100"><Trash2 size={12}/></button>
                    <div className="grid grid-cols-2 gap-2 mb-2">
                       <input className="p-1.5 border rounded text-xs" placeholder="Nama" value={s.name} onChange={e => handleStaffChange(idx, 'name', e.target.value)} />
                       <input className="p-1.5 border rounded text-xs" placeholder="NIK/ID" value={s.id} onChange={e => handleStaffChange(idx, 'id', e.target.value)} />
                    </div>
                    <input className="w-full p-1.5 border rounded text-xs" placeholder="Jabatan" value={s.position} onChange={e => handleStaffChange(idx, 'position', e.target.value)} />
                  </div>
                ))}
             </div>
          </div>

          {/* Form Detail */}
          <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
             <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase">Nomor Surat</label><input className="w-full p-2 border rounded text-xs font-mono" value={data.no} onChange={e => setData({...data, no: e.target.value})} /></div>
             <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase">Tugas Utama</label><input className="w-full p-2 border rounded text-xs font-bold" value={data.taskTitle} onChange={e => setData({...data, taskTitle: e.target.value})} /></div>
             <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase">Lokasi</label><input className="w-full p-2 border rounded text-xs" value={data.location} onChange={e => setData({...data, location: e.target.value})} /></div>
             <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase">Tgl Mulai</label><input type="date" className="w-full p-2 border rounded text-xs" value={data.startDate} onChange={e => setData({...data, startDate: e.target.value})} /></div>
                <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase">Tgl Selesai</label><input type="date" className="w-full p-2 border rounded text-xs" value={data.endDate} onChange={e => setData({...data, endDate: e.target.value})} /></div>
             </div>
             <div className="space-y-1"><label className="text-[10px] font-bold text-slate-400 uppercase">Deskripsi Instruksi</label><textarea className="w-full p-2 border rounded text-xs h-20" value={data.instruction} onChange={e => setData({...data, instruction: e.target.value})} /></div>
          </div>
        </div>

        {/* PREVIEW AREA */}
        <div id="print-container" className="flex-1 h-full flex justify-center overflow-y-auto p-4 bg-slate-200/50 rounded-xl print:p-0 print:bg-white print:overflow-visible">
          <Kertas>
            {templateId === 1 ? (
              /* TEMPLATE 1: FORMAL CORPORATE */
              <div className="font-serif text-[11pt]">
                <div className="flex items-center gap-6 border-b-2 border-black pb-4 mb-8">
                  {logo && <img src={logo} className="h-16 w-auto object-contain" alt="logo" />}
                  <div className="flex-1">
                    <h1 className="text-xl font-bold uppercase tracking-tight leading-none mb-2">{data.compName}</h1>
                    <div className="text-[10pt] font-sans whitespace-pre-line text-slate-500 leading-tight">{data.compInfo}</div>
                  </div>
                </div>

                <div className="text-center mb-8">
                   <h2 className="text-xl font-bold uppercase underline tracking-widest">SURAT PERINTAH TUGAS</h2>
                   <div className="text-sm mt-1">Nomor: {data.no}</div>
                </div>

                <p className="mb-4">Direksi {data.compName} dengan ini memberikan tugas kepada:</p>

                <table className="w-full border-collapse border border-black mb-6">
                  <thead>
                    <tr className="bg-slate-50 text-sm">
                      <th className="border border-black p-2 w-10 text-center">No</th>
                      <th className="border border-black p-2 text-left">Nama / NIK</th>
                      <th className="border border-black p-2 text-left">Jabatan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.staffs.map((s, i) => (
                      <tr key={i} className="text-sm">
                        <td className="border border-black p-2 text-center">{i + 1}</td>
                        <td className="border border-black p-2 font-bold">{s.name} <br/><span className="text-xs font-normal text-slate-500">{s.id}</span></td>
                        <td className="border border-black p-2">{s.position}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="space-y-4 text-justify leading-relaxed">
                   <p>Untuk melaksanakan tugas <strong>{data.taskTitle}</strong> bertempat di <strong>{data.location}</strong>.</p>
                   <p>Penugasan ini dilaksanakan mulai tanggal <strong>{new Date(data.startDate).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</strong> s.d <strong>{new Date(data.endDate).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</strong>.</p>
                   <p className="whitespace-pre-line">{data.instruction}</p>
                </div>

                <p className="mt-8 mb-16">Demikian surat tugas ini dibuat agar dapat dilaksanakan dengan penuh tanggung jawab.</p>

                <div className="flex justify-end text-center">
                   <div className="w-64">
                      <div className="mb-1">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</div>
                      <div className="mb-24 font-bold">{data.signerJob}</div>
                      <div className="font-bold underline uppercase leading-none">{data.signerName}</div>
                   </div>
                </div>
              </div>
            ) : (
              /* TEMPLATE 2: MODERN MINIMALIST */
              <div className="font-sans text-[10.5pt] leading-relaxed">
                <div className="flex justify-between items-start border-b border-slate-100 pb-6 mb-10">
                   <div className="flex items-center gap-4">
                      {logo && <img src={logo} className="h-10 w-auto" alt="logo" />}
                      <div className="font-bold text-slate-800 text-lg uppercase tracking-tight">{data.compName}</div>
                   </div>
                   <div className="text-right text-[8pt] text-slate-400 max-w-[200px] whitespace-pre-line">{data.compInfo}</div>
                </div>

                <div className="mb-10">
                   <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tighter mb-1">Surat Tugas</h1>
                   <div className="text-sm text-emerald-600 font-mono">{data.no}</div>
                </div>

                <div className="grid grid-cols-[120px_1fr] gap-y-8 mb-10">
                   <div className="text-slate-400 uppercase text-[8pt] font-bold tracking-widest pt-1">Personel</div>
                   <div className="space-y-4">
                      {data.staffs.map((s, i) => (
                        <div key={i} className="flex flex-col border-l-2 border-emerald-500 pl-4">
                           <span className="font-bold text-slate-800 text-sm">{s.name}</span>
                           <span className="text-[9pt] text-slate-500 uppercase">{s.position} — {s.id}</span>
                        </div>
                      ))}
                   </div>

                   <div className="text-slate-400 uppercase text-[8pt] font-bold tracking-widest">Penugasan</div>
                   <div className="text-slate-800">
                      <div className="text-lg font-bold mb-2">{data.taskTitle}</div>
                      <div className="flex items-center gap-4 text-sm text-slate-600">
                         <div className="flex items-center gap-1"><MapPin size={14}/> {data.location}</div>
                         <div className="flex items-center gap-1"><Calendar size={14}/> {new Date(data.startDate).toLocaleDateString('id-ID')} s.d {new Date(data.endDate).toLocaleDateString('id-ID')}</div>
                      </div>
                   </div>

                   <div className="text-slate-400 uppercase text-[8pt] font-bold tracking-widest pt-1">Instruksi</div>
                   <div className="text-slate-700 text-sm italic bg-slate-50 p-4 rounded-lg border border-slate-100">
                      "{data.instruction}"
                   </div>
                </div>

                <div className="mt-auto pt-10 flex justify-between items-end border-t border-slate-100">
                   <div className="text-[7.5pt] text-slate-400 italic max-w-[250px]">Surat ini sah dan diterbitkan secara elektronik oleh Divisi HRD {data.compName} pada {new Date(data.date).toLocaleDateString('id-ID')}.</div>
                   <div className="text-right">
                      <div className="font-black text-slate-900 text-lg uppercase tracking-tight">{data.signerName}</div>
                      <div className="text-[8pt] text-slate-500 uppercase tracking-widest font-bold">{data.signerJob}</div>
                   </div>
                </div>
              </div>
            )}
          </Kertas>
        </div>
      </div>
    </div>
  );
}