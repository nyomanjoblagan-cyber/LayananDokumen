'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, 
  FileWarning, Plus, Trash2, MapPin, Clock, Calendar, Check, ChevronDown
} from 'lucide-react';
import Link from 'next/link';

export default function KehilanganPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat...</div>}>
      <LossStatementBuilder />
    </Suspense>
  );
}

function LossStatementBuilder() {
  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Jakarta',
    signDate: new Date().toISOString().split('T')[0],
    
    // PELAPOR
    name: 'Budi Santoso',
    nik: '3171010203040005',
    job: 'Karyawan Swasta',
    phone: '0812-3456-7890',
    address: 'Jl. Merpati No. 12, RT 01 RW 02, Tebet, Jakarta Selatan',
    
    // KEJADIAN
    lostDate: '2026-01-04',
    lostTime: '18.30 WIB',
    lostPlace: 'Sekitar Stasiun Manggarai s.d Tebet',
    chronology: 'Saya melakukan perjalanan pulang kerja menggunakan KRL. Tas saya taruh di rak atas. Sesampainya di stasiun tujuan, saya menyadari tas saya sudah terbuka dan dompet beserta isinya sudah tidak ada.',
    
    // BARANG HILANG
    items: [
      { id: 1, name: 'KTP Asli', desc: 'a.n Budi Santoso' },
      { id: 2, name: 'SIM C', desc: 'Masa berlaku s.d 2027' },
      { id: 3, name: 'Kartu ATM BCA', desc: 'Warna Biru (Debit)' },
    ]
  });

  // HANDLERS
  const handleDataChange = (field: string, val: string) => {
    setData({ ...data, [field]: val });
  };

  // ITEM MANAGEMENT
  const addItem = () => {
    setData({ ...data, items: [...data.items, { id: Date.now(), name: '', desc: '' }] });
  };
  const removeItem = (idx: number) => {
    const newItems = [...data.items];
    newItems.splice(idx, 1);
    setData({ ...data, items: newItems });
  };
  const updateItem = (idx: number, field: 'name' | 'desc', val: string) => {
    const newItems = [...data.items];
    // @ts-ignore
    newItems[idx][field] = val;
    setData({ ...data, items: newItems });
  };

  // PRESET ITEMS
  const addPresetItem = (type: string) => {
    let newItem = { id: Date.now(), name: '', desc: '' };
    if (type === 'ktp') newItem = { ...newItem, name: 'KTP (Kartu Tanda Penduduk)', desc: 'Asli a.n Pelapor' };
    if (type === 'sim') newItem = { ...newItem, name: 'SIM A / C', desc: 'No. SIM: ...' };
    if (type === 'atm') newItem = { ...newItem, name: 'Kartu ATM Bank ...', desc: 'Jenis ...' };
    if (type === 'stnk') newItem = { ...newItem, name: 'STNK Motor/Mobil', desc: 'Plat No: ...' };
    
    setData({ ...data, items: [...data.items, newItem] });
  };

  const TEMPLATES = [
    { id: 1, name: "Pribadi (Compact)", desc: "Format standar lapor polisi/bank, muat 1 halaman" },
    { id: 2, name: "Aset Kantor (Resmi)", desc: "Kehilangan barang inventaris perusahaan" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN KERTAS (STABIL) ---
  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`
      w-[210mm] min-h-[297mm] 
      bg-white shadow-2xl 
      p-[20mm] mx-auto 
      text-[#1e293b] font-serif leading-relaxed text-[11pt]
      relative box-border mb-8 
      
      /* PRINT STYLES - ANTI SCROLLBAR */
      print:fixed print:top-0 print:left-0 
      print:w-[210mm] print:h-[297mm] 
      print:shadow-none print:mb-0 print:p-[20mm] 
      print:overflow-hidden print:z-[9999]
      print:transform print:scale-[0.95] print:origin-top
      
      ${className}
    `}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800 print:bg-white">
      
      {/* CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { 
            margin: 0 !important; 
            padding: 0 !important; 
            background: white; 
            overflow: hidden !important; 
          }
          ::-webkit-scrollbar { display: none !important; width: 0 !important; }
          * { -ms-overflow-style: none !important; scrollbar-width: none !important; }
          header, nav, .no-print { display: none !important; }
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
            <h1 className="text-sm font-bold tracking-wide text-emerald-400 uppercase">Surat Pernyataan Kehilangan</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setShowTemplateMenu(!showTemplateMenu)}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-colors min-w-[180px] justify-between"
              >
                <div className="flex items-center gap-2">
                  <LayoutTemplate size={14} className="text-blue-400" />
                  <span>{activeTemplateName}</span>
                </div>
                <ChevronDown size={12} className={`transition-transform ${showTemplateMenu ? 'rotate-180' : ''}`} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50">
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pilih Gaya Surat</div>
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-700'}`}>
                      <div><div className="font-medium">{t.name}</div><div className="text-[10px] text-slate-400 mt-0.5">{t.desc}</div></div>
                      {templateId === t.id && <Check size={14} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg ring-1 ring-emerald-400/50">
              <Printer size={16} /> Cetak PDF
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)]">
        
        {/* --- LEFT SIDEBAR: INPUT --- */}
        <div className="no-print w-full lg:w-[450px] shrink-0 h-full overflow-y-auto pr-2 pb-20 space-y-6">
          
          {/* Data Pelapor */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <FileWarning size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Identitas Pelapor</h3>
             </div>
             <div className="p-4 space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-semibold" value={data.name} onChange={e => handleDataChange('name', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">{templateId === 1 ? 'NIK (KTP)' : 'NIK / NIP'}</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.nik} onChange={e => handleDataChange('nik', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">No. HP</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.phone} onChange={e => handleDataChange('phone', e.target.value)} />
                   </div>
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.job} onChange={e => handleDataChange('job', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-16 resize-none" value={data.address} onChange={e => handleDataChange('address', e.target.value)} />
                </div>
             </div>
          </div>

          {/* Kronologi */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <MapPin size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Waktu & Tempat Kejadian</h3>
             </div>
             <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Hilang</label>
                      <input type="date" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.lostDate} onChange={e => handleDataChange('lostDate', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Jam (Perkiraan)</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.lostTime} onChange={e => handleDataChange('lostTime', e.target.value)} />
                   </div>
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Lokasi Kejadian</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.lostPlace} onChange={e => handleDataChange('lostPlace', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Kronologi Singkat</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-20 resize-none" value={data.chronology} onChange={e => handleDataChange('chronology', e.target.value)} />
                </div>
             </div>
          </div>

          {/* Barang Hilang */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <Check size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Daftar Barang Hilang</h3>
             </div>
             
             {/* Quick Add */}
             <div className="px-4 pt-3 pb-1 flex gap-2 overflow-x-auto no-scrollbar">
                <button onClick={() => addPresetItem('ktp')} className="text-[10px] bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded border whitespace-nowrap">+ KTP</button>
                <button onClick={() => addPresetItem('sim')} className="text-[10px] bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded border whitespace-nowrap">+ SIM</button>
                <button onClick={() => addPresetItem('atm')} className="text-[10px] bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded border whitespace-nowrap">+ ATM</button>
                <button onClick={() => addPresetItem('stnk')} className="text-[10px] bg-slate-100 hover:bg-slate-200 px-2 py-1 rounded border whitespace-nowrap">+ STNK</button>
             </div>

             <div className="p-4 space-y-2">
                {data.items.map((item, idx) => (
                   <div key={item.id} className="flex gap-2 items-start group">
                      <div className="w-6 text-center pt-2 text-xs text-slate-400 font-bold">{idx + 1}.</div>
                      <div className="flex-1 space-y-1">
                         <input type="text" className="w-full p-1.5 border border-slate-300 rounded text-xs font-bold placeholder:font-normal" placeholder="Nama Barang (ex: KTP)" value={item.name} onChange={e => updateItem(idx, 'name', e.target.value)} />
                         <input type="text" className="w-full p-1.5 border border-slate-300 rounded text-xs placeholder:text-slate-300" placeholder="Keterangan (ex: a.n Budi)" value={item.desc} onChange={e => updateItem(idx, 'desc', e.target.value)} />
                      </div>
                      <button onClick={() => removeItem(idx)} className="p-1.5 text-slate-300 hover:text-red-500 transition-colors mt-1"><Trash2 size={12} /></button>
                   </div>
                ))}
                <button onClick={addItem} className="w-full py-2 border border-dashed border-slate-300 rounded text-xs text-slate-500 hover:bg-slate-50 hover:text-blue-600 transition-colors flex items-center justify-center gap-1 mt-2">
                   <Plus size={12}/> Tambah Baris Manual
                </button>
             </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Kota</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tgl Pernyataan</label>
                      <input type="date" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.signDate} onChange={e => handleDataChange('signDate', e.target.value)} />
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* --- RIGHT PREVIEW --- */}
        <div className="flex-1 h-full bg-slate-200/50 rounded-xl flex justify-center p-8 overflow-y-auto print:p-0 print:bg-white print:w-full">
          
          <Kertas>
            
            {/* TEMPLATE 1: PRIBADI / UMUM (COMPACT) */}
            {templateId === 1 && (
              <div className="font-serif text-[10pt] leading-normal h-full flex flex-col">
                 <div className="text-center mb-6 border-b-4 border-double border-black pb-3">
                    <h2 className="font-bold text-lg uppercase underline tracking-wide">SURAT PERNYATAAN KEHILANGAN</h2>
                 </div>

                 <p className="mb-4 text-justify">Saya yang bertanda tangan di bawah ini:</p>
                 
                 {/* IDENTITAS - RAPAT */}
                 <div className="ml-4 mb-4">
                    <table className="w-full leading-snug">
                       <tbody>
                          <tr><td className="w-32 py-0.5">Nama</td><td className="w-3 py-0.5">:</td><td className="font-bold py-0.5 uppercase">{data.name}</td></tr>
                          <tr><td className="py-0.5">NIK</td><td className="py-0.5">:</td><td className="py-0.5">{data.nik}</td></tr>
                          <tr><td className="py-0.5">Pekerjaan</td><td className="py-0.5">:</td><td className="py-0.5">{data.job}</td></tr>
                          <tr><td className="py-0.5">No. HP</td><td className="py-0.5">:</td><td className="py-0.5">{data.phone}</td></tr>
                          <tr><td className="py-0.5 align-top">Alamat</td><td className="py-0.5 align-top">:</td><td className="py-0.5 align-top">{data.address}</td></tr>
                       </tbody>
                    </table>
                 </div>

                 <p className="mb-4 text-justify">
                    Dengan ini menyatakan dengan sesungguhnya bahwa saya telah kehilangan barang/dokumen sebagai berikut:
                 </p>

                 {/* TABEL BARANG - PADDING KECIL */}
                 <div className="mb-4 mx-2 border border-black">
                    <table className="w-full text-xs">
                       <thead>
                          <tr className="bg-slate-100 border-b border-black">
                             <th className="py-1 px-2 w-8 border-r border-black">No</th>
                             <th className="py-1 px-2 text-left border-r border-black">Nama Barang / Dokumen</th>
                             <th className="py-1 px-2 text-left">Keterangan</th>
                          </tr>
                       </thead>
                       <tbody>
                          {data.items.length > 0 ? data.items.map((item, idx) => (
                             <tr key={item.id} className="border-b border-black last:border-0">
                                <td className="py-1 px-2 text-center border-r border-black align-top">{idx + 1}</td>
                                <td className="py-1 px-2 font-bold border-r border-black align-top">{item.name}</td>
                                <td className="py-1 px-2 align-top">{item.desc}</td>
                             </tr>
                          )) : (
                             <tr><td colSpan={3} className="py-2 text-center italic text-slate-400">Belum ada barang yang dimasukkan</td></tr>
                          )}
                       </tbody>
                    </table>
                 </div>

                 <p className="mb-2 text-justify">Barang tersebut hilang pada:</p>
                 <div className="ml-4 mb-4">
                    <table className="w-full leading-snug">
                       <tbody>
                          <tr><td className="w-32 py-0.5">Hari / Tanggal</td><td className="w-3 py-0.5">:</td><td className="py-0.5 font-bold">{new Date(data.lostDate).toLocaleDateString('id-ID', {weekday: 'long', day:'numeric', month:'long', year:'numeric'})}</td></tr>
                          <tr><td className="py-0.5">Pukul</td><td className="py-0.5">:</td><td className="py-0.5">{data.lostTime}</td></tr>
                          <tr><td className="py-0.5">Lokasi</td><td className="py-0.5">:</td><td className="py-0.5">{data.lostPlace}</td></tr>
                       </tbody>
                    </table>
                 </div>

                 <p className="mb-2 font-bold underline text-sm">Kronologi Kejadian:</p>
                 <div className="mb-6 text-justify bg-slate-50 p-2 border border-slate-200 rounded italic text-sm">
                    "{data.chronology}"
                 </div>

                 <p className="mb-8 text-justify">
                    Demikian Surat Pernyataan Kehilangan ini saya buat dengan sebenar-benarnya tanpa ada paksaan dari pihak manapun, untuk dapat dipergunakan sebagaimana mestinya.
                 </p>

                 {/* TTD */}
                 <div className="flex justify-end text-center mt-auto">
                    <div className="w-64">
                       <p className="mb-1">{data.city}, {new Date(data.signDate).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
                       <p className="mb-20">Yang Menyatakan,</p>
                       <div className="border-b border-black mb-1 w-2/3 mx-auto"></div>
                       <p className="font-bold uppercase">{data.name}</p>
                    </div>
                 </div>
              </div>
            )}

            {/* TEMPLATE 2: ASET KANTOR / RESMI (COMPACT) */}
            {templateId === 2 && (
              <div className="font-sans text-[10pt] leading-relaxed h-full flex flex-col">
                 <div className="text-center mb-6 pb-2 border-b-2 border-black">
                    <h1 className="text-xl font-black uppercase tracking-tighter">BERITA ACARA KEHILANGAN</h1>
                    <div className="text-sm font-bold text-slate-500">Internal Use Only</div>
                 </div>

                 <div className="mb-4">
                    <p className="mb-1 font-bold uppercase text-xs tracking-wider text-slate-500">1. IDENTITAS PELAPOR</p>
                    <div className="grid grid-cols-[100px_10px_1fr] gap-0.5 ml-2">
                       <div>Nama</div><div>:</div><div className="font-bold">{data.name}</div>
                       <div>ID / NIK</div><div>:</div><div>{data.nik}</div>
                       <div>Jabatan</div><div>:</div><div>{data.job}</div>
                       <div>Kontak</div><div>:</div><div>{data.phone}</div>
                    </div>
                 </div>

                 <div className="mb-4">
                    <p className="mb-1 font-bold uppercase text-xs tracking-wider text-slate-500">2. WAKTU & TEMPAT KEJADIAN</p>
                    <div className="grid grid-cols-[100px_10px_1fr] gap-0.5 ml-2">
                       <div>Tanggal</div><div>:</div><div>{new Date(data.lostDate).toLocaleDateString('id-ID', {weekday: 'long', day:'numeric', month:'long', year:'numeric'})}</div>
                       <div>Pukul</div><div>:</div><div>{data.lostTime}</div>
                       <div>Lokasi</div><div>:</div><div>{data.lostPlace}</div>
                    </div>
                 </div>

                 <div className="mb-4">
                    <p className="mb-1 font-bold uppercase text-xs tracking-wider text-slate-500">3. RINCIAN BARANG HILANG</p>
                    <ul className="ml-6 list-disc space-y-0.5">
                       {data.items.map((item) => (
                          <li key={item.id}>
                             <span className="font-bold text-slate-800">{item.name}</span>
                             {item.desc && <span className="text-slate-600"> — {item.desc}</span>}
                          </li>
                       ))}
                    </ul>
                 </div>

                 <div className="mb-6">
                    <p className="mb-1 font-bold uppercase text-xs tracking-wider text-slate-500">4. KRONOLOGIS KEJADIAN</p>
                    <p className="text-justify p-3 bg-slate-50 border border-slate-200 rounded text-sm leading-relaxed">
                       {data.chronology}
                    </p>
                 </div>

                 <p className="mb-6 text-justify text-sm">
                    Saya menyatakan bahwa laporan ini dibuat dengan sebenar-benarnya. Saya bertanggung jawab penuh atas segala konsekuensi hukum apabila dikemudian hari terbukti laporan ini palsu.
                 </p>

                 <div className="flex justify-end text-center mt-auto">
                    <div className="w-64">
                       <p className="mb-1 text-xs text-slate-500">{data.city}, {new Date(data.signDate).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
                       <p className="mb-20 font-bold text-sm">Pelapor,</p>
                       <p className="font-bold border-b border-black inline-block px-4">{data.name}</p>
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