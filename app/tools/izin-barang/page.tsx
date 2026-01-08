'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  Truck, UserCircle2, Package, CalendarDays, MapPin, ClipboardList, Plus, Trash2
} from 'lucide-react';
import Link from 'next/link';

export default function IzinBarangPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat...</div>}>
      <IzinBarangBuilder />
    </Suspense>
  );
}

function IzinBarangBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Jakarta',
    date: new Date().toISOString().split('T')[0],
    
    // DETAIL IZIN
    type: 'KELUAR', // KELUAR atau MASUK
    noSurat: 'SKMB/001/I/2026',
    
    // PEMBAWA BARANG
    carrierName: 'BUDI SETIADI',
    carrierPhone: '0812-7788-9900',
    vehicleNo: 'B 1234 ABC',
    companyOrigin: 'PT. LOGISTIK JAYA',
    
    // DAFTAR BARANG
    items: [
      { name: 'Laptop MacBook Pro 14"', qty: '2', unit: 'Unit', note: 'Perbaikan' },
      { name: 'Monitor LG 24"', qty: '5', unit: 'Unit', note: 'Mutasi Kantor' },
    ],
    
    // LOKASI
    destination: 'Gudang Cabang Bekasi',
    authorizedBy: 'SURYONO M.S.',
    authorizedJob: 'Head of Security / Ops'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const addItem = () => setData({ ...data, items: [...data.items, { name: '', qty: '', unit: '', note: '' }] });
  const removeItem = (idx: number) => {
    const newItems = [...data.items];
    newItems.splice(idx, 1);
    setData({ ...data, items: newItems });
  };

  const handleItemChange = (idx: number, field: string, val: string) => {
    const newItems = [...data.items];
    // @ts-ignore
    newItems[idx][field] = val;
    setData({ ...data, items: newItems });
  };

  const TEMPLATES = [
    { id: 1, name: "Formal (Gate Pass)", desc: "Standar industri/kantor" },
    { id: 2, name: "Simpel (Surat Jalan)", desc: "Layout cepat & praktis" }
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
            <h1 className="font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
               <Truck size={16} /> Izin Keluar Masuk Barang
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative text-xs">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 min-w-[180px] justify-between transition-all">
                <LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span><ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border overflow-hidden z-50 text-slate-700 font-sans">
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
              <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-emerald-600 tracking-widest"><Truck size={14}/> Jenis Izin</h3>
              <div className="grid grid-cols-2 gap-2">
                 <button onClick={() => handleDataChange('type', 'KELUAR')} className={`py-2 rounded-lg text-xs font-bold transition-all ${data.type === 'KELUAR' ? 'bg-red-600 text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}>KELUAR</button>
                 <button onClick={() => handleDataChange('type', 'MASUK')} className={`py-2 rounded-lg text-xs font-bold transition-all ${data.type === 'MASUK' ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 text-slate-400'}`}>MASUK</button>
              </div>
              <input className="w-full p-2 border rounded text-xs" placeholder="No. Surat" value={data.noSurat} onChange={e => handleDataChange('noSurat', e.target.value)} />
           </div>

           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-blue-600 tracking-widest"><UserCircle2 size={14}/> Identitas Pembawa</h3>
              <input className="w-full p-2 border rounded text-xs font-bold" placeholder="Nama Pembawa" value={data.carrierName} onChange={e => handleDataChange('carrierName', e.target.value)} />
              <div className="grid grid-cols-2 gap-2">
                 <input className="w-full p-2 border rounded text-xs" placeholder="No. Kendaraan" value={data.vehicleNo} onChange={e => handleDataChange('vehicleNo', e.target.value)} />
                 <input className="w-full p-2 border rounded text-xs" placeholder="Instansi/PT" value={data.companyOrigin} onChange={e => handleDataChange('companyOrigin', e.target.value)} />
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                 <h3 className="text-[10px] font-black uppercase flex items-center gap-2 text-amber-600 tracking-widest"><Package size={14}/> Daftar Barang</h3>
                 <button onClick={addItem} className="text-[9px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded font-bold flex items-center gap-1 hover:bg-emerald-200"><Plus size={12}/> Tambah</button>
              </div>
              <div className="space-y-3">
                 {data.items.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-lg border relative group">
                       <button onClick={() => removeItem(idx)} className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12}/></button>
                       <input className="w-full p-1 bg-transparent border-b mb-2 text-xs font-bold" placeholder="Nama Barang" value={item.name} onChange={e => handleItemChange(idx, 'name', e.target.value)} />
                       <div className="grid grid-cols-3 gap-2">
                          <input className="w-full p-1 bg-transparent border-b text-[10px]" placeholder="Qty" value={item.qty} onChange={e => handleItemChange(idx, 'qty', e.target.value)} />
                          <input className="w-full p-1 bg-transparent border-b text-[10px]" placeholder="Satuan" value={item.unit} onChange={e => handleItemChange(idx, 'unit', e.target.value)} />
                          <input className="w-full p-1 bg-transparent border-b text-[10px]" placeholder="Ket" value={item.note} onChange={e => handleItemChange(idx, 'note', e.target.value)} />
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <h3 className="text-[10px] font-black uppercase border-b pb-2 flex items-center gap-2 text-purple-600 tracking-widest"><ClipboardList size={14}/> Otorisasi</h3>
              <input className="w-full p-2 border rounded text-xs" placeholder="Nama Pejabat Izin" value={data.authorizedBy} onChange={e => handleDataChange('authorizedBy', e.target.value)} />
              <input className="w-full p-2 border rounded text-xs" placeholder="Jabatan" value={data.authorizedJob} onChange={e => handleDataChange('authorizedJob', e.target.value)} />
              <div className="grid grid-cols-2 gap-2">
                 <input className="w-full p-2 border rounded text-xs" placeholder="Kota" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                 <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
              </div>
           </div>
        </div>

        {/* PREVIEW */}
        <div id="preview-area-scroll" className="flex-1 w-full flex justify-center bg-slate-300/30 lg:rounded-xl p-0 md:p-8 overflow-y-auto h-full">
             <div className="origin-top scale-[0.45] sm:scale-[0.6] lg:scale-[0.85] xl:scale-100 transition-transform shadow-2xl print:scale-100">
                
                <div className="kertas-print bg-white mx-auto flex flex-col box-border p-[20mm] font-sans" 
                     style={{ width: '210mm', height: '296mm' }}>
                    
                    {/* KOP SEDERHANA */}
                    <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-8">
                       <div>
                          <h1 className="text-xl font-black uppercase tracking-tighter italic">Layanan<span className="text-emerald-600">Dokumen</span></h1>
                          <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Logistics & Gate Pass Division</p>
                       </div>
                       <div className="text-right">
                          <div className={`px-4 py-1 rounded text-white font-black text-sm mb-1 ${data.type === 'KELUAR' ? 'bg-red-600' : 'bg-emerald-600'}`}>
                             IZIN {data.type} BARANG
                          </div>
                          <p className="text-[10px] font-mono">No: {data.noSurat}</p>
                       </div>
                    </div>

                    <div className="space-y-6 flex-grow">
                       <div className="grid grid-cols-2 gap-8 text-[11pt]">
                          <div className="space-y-2">
                             <h4 className="text-[10px] font-black text-slate-400 uppercase border-b">Detail Pembawa</h4>
                             <div className="grid grid-cols-[80px_5px_1fr] gap-1"><span>Nama</span><span>:</span><span className="font-bold">{data.carrierName}</span></div>
                             <div className="grid grid-cols-[80px_5px_1fr] gap-1"><span>Kendaraan</span><span>:</span><span className="font-mono">{data.vehicleNo}</span></div>
                             <div className="grid grid-cols-[80px_5px_1fr] gap-1"><span>Asal/PT</span><span>:</span><span>{data.companyOrigin}</span></div>
                          </div>
                          <div className="space-y-2">
                             <h4 className="text-[10px] font-black text-slate-400 uppercase border-b">Waktu</h4>
                             <div className="grid grid-cols-[80px_5px_1fr] gap-1"><span>Tanggal</span><span>:</span><span>{new Date(data.date).toLocaleDateString('id-ID', {dateStyle:'full'})}</span></div>
                             <div className="grid grid-cols-[80px_5px_1fr] gap-1"><span>Lokasi</span><span>:</span><span>{data.city}</span></div>
                          </div>
                       </div>

                       <div className="mt-8">
                          <h4 className="text-[10px] font-black text-slate-400 uppercase mb-2">Daftar Rincian Barang:</h4>
                          <table className="w-full border-collapse">
                             <thead>
                                <tr className="bg-slate-100 border-y-2 border-slate-900">
                                   <th className="p-2 text-center text-xs w-10">NO</th>
                                   <th className="p-2 text-left text-xs">NAMA BARANG</th>
                                   <th className="p-2 text-center text-xs w-20">QTY</th>
                                   <th className="p-2 text-center text-xs w-20">SATUAN</th>
                                   <th className="p-2 text-left text-xs">KETERANGAN</th>
                                </tr>
                             </thead>
                             <tbody>
                                {data.items.map((item, idx) => (
                                   <tr key={idx} className="border-b border-slate-200">
                                      <td className="p-2 text-center text-sm">{idx + 1}</td>
                                      <td className="p-2 text-sm font-bold uppercase">{item.name}</td>
                                      <td className="p-2 text-center text-sm">{item.qty}</td>
                                      <td className="p-2 text-center text-sm uppercase">{item.unit}</td>
                                      <td className="p-2 text-sm italic text-slate-600">{item.note}</td>
                                   </tr>
                                ))}
                             </tbody>
                          </table>
                       </div>

                       <div className="mt-6 bg-slate-50 p-4 border border-dashed border-slate-300 rounded text-xs text-slate-500 italic">
                          "Petugas keamanan berhak memeriksa kembali kesesuaian fisik barang dengan daftar yang tertera di atas sebelum memberikan izin akses gerbang."
                       </div>
                    </div>

                    {/* TANDA TANGAN */}
                    <div className="shrink-0 mt-12">
                       <div className="grid grid-cols-3 gap-4 text-center">
                          <div className="space-y-20">
                             <p className="text-xs font-black uppercase border-b">Pembawa</p>
                             <p className="text-sm font-bold underline uppercase">{data.carrierName}</p>
                          </div>
                          <div className="space-y-20">
                             <p className="text-xs font-black uppercase border-b">Security (Check)</p>
                             <p className="text-sm font-bold">( ............................ )</p>
                          </div>
                          <div className="space-y-20">
                             <p className="text-xs font-black uppercase border-b">Pemberi Izin</p>
                             <div className="relative">
                                <p className="text-sm font-bold underline uppercase">{data.authorizedBy}</p>
                                <p className="text-[9px] text-slate-500">{data.authorizedJob}</p>
                             </div>
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