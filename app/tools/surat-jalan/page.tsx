'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, Plus, Trash2,
  Truck, Building2, User, Package, MapPin, ChevronDown, Check
} from 'lucide-react';
import Link from 'next/link';

export default function DeliveryOrderPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem Logistik...</div>}>
      <DOToolBuilder />
    </Suspense>
  );
}

function DOToolBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);

  // DATA DEFAULT
  const [data, setData] = useState({
    no: `DO/${new Date().getFullYear()}/${Math.floor(Math.random() * 1000)}`,
    date: new Date().toISOString().split('T')[0],
    refPo: 'PO-2026-001', // Referensi PO dari customer
    
    // PENGIRIM (Gudang Kita)
    senderName: 'PT. LOGISTIK MAJU JAYA',
    senderInfo: 'Kawasan Industri Pulogadung Blok A3\nJakarta Timur | Telp: 021-460-1234',
    
    // PENERIMA (Customer)
    receiverName: 'Toko Bangunan Sejahtera',
    receiverContact: 'Bpk. Herman',
    receiverAddress: 'Jl. Raya Bogor KM 28, Cibinong\nJawa Barat',
    
    // LOGISTIK
    driverName: 'Asep Sunandar',
    vehicleNo: 'B 9876 TXT',
    expedition: 'Armada Sendiri (Truck Engkel)',
    
    items: [
      { id: 1, name: 'Semen Tiga Roda (50kg)', qty: 100, unit: 'Sak', remarks: 'Segel Utuh' },
      { id: 2, name: 'Cat Tembok Putih (25kg)', qty: 20, unit: 'Pail', remarks: '' },
    ],
    
    notes: '1. Barang harus diperiksa saat penerimaan.\n2. Komplain setelah supir meninggalkan lokasi tidak dilayani.\n3. Lembar Putih (Asli) kembali ke Pengirim.',
    
    // PENANDA TANGAN
    signerWarehouse: 'Admin Gudang',
    signerDriver: 'Supir / Kurir',
    signerReceiver: 'Penerima Barang'
  });

  // HANDLERS
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setLogo(URL.createObjectURL(file));
  };
  const handleItemChange = (idx: number, field: string, val: any) => {
    const newItems = [...data.items];
    // @ts-ignore
    newItems[idx][field] = val;
    setData({ ...data, items: newItems });
  };
  const addItem = () => setData({ ...data, items: [...data.items, { id: Date.now(), name: '', qty: 1, unit: 'Pcs', remarks: '' }] });
  
  const removeItem = (idx: number) => {
    const newItems = [...data.items];
    newItems.splice(idx, 1);
    setData({ ...data, items: newItems });
  };

  const TEMPLATES = [
    { id: 1, name: "Surat Jalan Gudang", desc: "Format tabel tegas dengan kotak tanda tangan" },
    { id: 2, name: "Delivery Note Modern", desc: "Tampilan bersih untuk logistik corporate" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN KERTAS (FINAL FIX: NO BLANK PAGE) ---
  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`
      /* TAMPILAN LAYAR (Preview) */
      w-[210mm] min-h-[297mm] 
      bg-white shadow-2xl 
      p-[20mm] mx-auto 
      text-[#1e293b] font-serif leading-relaxed text-[11pt]
      relative box-border mb-10
      
      /* TAMPILAN CETAK (Print) */
      print:w-[210mm] 
      print:min-h-0 /* KUNCI: Reset tinggi minimal agar tidak maksa 297mm + padding */
      print:h-auto 
      print:static 
      print:shadow-none print:m-0 
      print:p-[20mm] /* Padding aman agar tidak kepotong */
      print:overflow-visible
      
      ${className}
    `}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800 print:bg-white">
      
      {/* CSS PRINT - TOTAL RESET */}
      <style jsx global>{`
        @media print {
          @page { 
            size: A4; 
            margin: 0mm; /* Margin browser 0, kita atur sendiri via padding div */
          } 
          
          body, html { 
            margin: 0; 
            padding: 0; 
            background: white !important; 
            overflow: visible !important;
            height: auto !important;
          }

          /* Sembunyikan UI */
          header, nav, .no-print, button { display: none !important; }
          
          /* Paksa warna background (untuk header tabel) tercetak */
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
            <h1 className="text-sm font-bold tracking-wide text-emerald-400 uppercase">Surat Jalan (DO)</h1>
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
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pilih Gaya Dokumen</div>
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
        <div className="no-print w-full lg:w-[420px] shrink-0 h-full overflow-y-auto pr-2 pb-20 space-y-6">
          
          {/* Identitas Pengirim */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <Building2 size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Pengirim (Gudang)</h3>
             </div>
             <div className="p-4 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-lg border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all" onClick={() => fileInputRef.current?.click()}>
                    {logo ? <img src={logo} className="w-full h-full object-contain" /> : <Upload size={20} className="text-slate-300" />}
                  </div>
                  <div className="flex-1">
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    <button onClick={() => fileInputRef.current?.click()} className="text-xs font-bold text-blue-600 hover:underline">Upload Logo</button>
                    {logo && <button onClick={() => setLogo(null)} className="text-[10px] text-red-500 block mt-1">Hapus Logo</button>}
                  </div>
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Perusahaan</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-semibold" value={data.senderName} onChange={e => setData({...data, senderName: e.target.value})} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Gudang</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-16 resize-none" value={data.senderInfo} onChange={e => setData({...data, senderInfo: e.target.value})} />
                </div>
             </div>
          </div>

          {/* Info Penerima & Driver */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <Truck size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Penerima & Armada</h3>
             </div>
             <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor SJ</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs font-mono" value={data.no} onChange={e => setData({...data, no: e.target.value})} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Kirim</label>
                      <input type="date" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.date} onChange={e => setData({...data, date: e.target.value})} />
                   </div>
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Referensi (No PO/Invoice)</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm" value={data.refPo} onChange={e => setData({...data, refPo: e.target.value})} />
                </div>
                
                <div className="pt-2 border-t border-slate-100 space-y-2">
                   <label className="text-[10px] font-bold text-blue-600 uppercase">Data Penerima</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-medium" placeholder="Nama Toko / PT" value={data.receiverName} onChange={e => setData({...data, receiverName: e.target.value})} />
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" placeholder="Attn / Kontak" value={data.receiverContact} onChange={e => setData({...data, receiverContact: e.target.value})} />
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-14 resize-none" placeholder="Alamat Pengiriman" value={data.receiverAddress} onChange={e => setData({...data, receiverAddress: e.target.value})} />
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-2">
                   <label className="text-[10px] font-bold text-blue-600 uppercase">Data Supir & Kendaraan</label>
                   <div className="grid grid-cols-2 gap-2">
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" placeholder="Nama Supir" value={data.driverName} onChange={e => setData({...data, driverName: e.target.value})} />
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" placeholder="Plat Nomor (B 1234 XX)" value={data.vehicleNo} onChange={e => setData({...data, vehicleNo: e.target.value})} />
                   </div>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" placeholder="Nama Ekspedisi" value={data.expedition} onChange={e => setData({...data, expedition: e.target.value})} />
                </div>
             </div>
          </div>

          {/* Item */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <Package size={14} className="text-blue-600" />
                   <h3 className="text-xs font-bold text-slate-700 uppercase">Barang Kiriman</h3>
                </div>
                <button onClick={addItem} className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 flex items-center gap-1"><Plus size={10} /> Tambah</button>
             </div>
             <div className="p-2 space-y-3">
                {data.items.map((item, idx) => (
                   <div key={item.id} className="bg-slate-50 p-2 rounded border border-slate-200 relative group">
                      <div className="mb-2">
                         <input type="text" className="w-full bg-transparent border-b border-slate-300 text-xs font-medium focus:border-blue-500 outline-none pb-1" placeholder="Nama Barang..." value={item.name} onChange={e => handleItemChange(idx, 'name', e.target.value)} />
                      </div>
                      <div className="flex gap-2">
                         <div className="w-20">
                            <span className="text-[9px] text-slate-400 uppercase">Qty</span>
                            <input type="number" className="w-full bg-white border border-slate-300 rounded text-xs p-1 text-center" value={item.qty} onChange={e => handleItemChange(idx, 'qty', e.target.value)} />
                         </div>
                         <div className="w-24">
                            <span className="text-[9px] text-slate-400 uppercase">Satuan</span>
                            <input type="text" className="w-full bg-white border border-slate-300 rounded text-xs p-1 text-center" placeholder="Pcs/Dus" value={item.unit} onChange={e => handleItemChange(idx, 'unit', e.target.value)} />
                         </div>
                         <div className="flex-1">
                            <span className="text-[9px] text-slate-400 uppercase">Keterangan</span>
                            <input type="text" className="w-full bg-white border border-slate-300 rounded text-xs p-1" placeholder="Kondisi barang..." value={item.remarks} onChange={e => handleItemChange(idx, 'remarks', e.target.value)} />
                         </div>
                      </div>
                      <button onClick={() => removeItem(idx)} className="absolute top-2 right-2 text-slate-400 hover:text-red-500"><Trash2 size={12} /></button>
                   </div>
                ))}
             </div>
          </div>

          {/* Footer */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="p-4 space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Catatan Kaki</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-20 resize-none focus:border-blue-500 outline-none" value={data.notes} onChange={e => setData({...data, notes: e.target.value})} />
                </div>
                <div className="grid grid-cols-3 gap-2">
                   <div>
                      <label className="text-[9px] font-bold text-slate-500 uppercase">Label TTD 1</label>
                      <input type="text" className="w-full p-1.5 border border-slate-300 rounded text-[10px]" value={data.signerWarehouse} onChange={e => setData({...data, signerWarehouse: e.target.value})} />
                   </div>
                   <div>
                      <label className="text-[9px] font-bold text-slate-500 uppercase">Label TTD 2</label>
                      <input type="text" className="w-full p-1.5 border border-slate-300 rounded text-[10px]" value={data.signerDriver} onChange={e => setData({...data, signerDriver: e.target.value})} />
                   </div>
                   <div>
                      <label className="text-[9px] font-bold text-slate-500 uppercase">Label TTD 3</label>
                      <input type="text" className="w-full p-1.5 border border-slate-300 rounded text-[10px]" value={data.signerReceiver} onChange={e => setData({...data, signerReceiver: e.target.value})} />
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* --- RIGHT PREVIEW --- */}
        <div className="flex-1 h-full bg-slate-200/50 rounded-xl flex justify-center p-8 overflow-y-auto print:p-0 print:bg-white print:w-full">
          
          {/* TEMPLATE 1: SURAT JALAN GUDANG (Boxy & Strict) */}
          {templateId === 1 && (
            <Kertas>
              <div className="flex justify-between items-start mb-6 border-b-2 border-black pb-4">
                 <div className="flex items-center gap-4">
                    {logo && <img src={logo} className="h-14 w-auto object-contain" />}
                    <div>
                       <h1 className="text-xl font-black uppercase">{data.senderName}</h1>
                       <div className="text-xs text-slate-600 whitespace-pre-line leading-tight mt-1">{data.senderInfo}</div>
                    </div>
                 </div>
                 <div className="text-right">
                    <h2 className="text-2xl font-black uppercase tracking-wider border-2 border-black px-4 py-1 inline-block mb-2">SURAT JALAN</h2>
                    <div className="text-sm font-bold">No: {data.no}</div>
                    <div className="text-xs">Tgl: {data.date}</div>
                 </div>
              </div>

              <div className="flex gap-4 mb-6 text-xs">
                 <div className="w-1/2 border border-black p-3">
                    <div className="font-bold border-b border-black -m-3 mb-3 p-1 px-3 bg-slate-100 uppercase">Penerima Barang</div>
                    <div className="font-bold text-sm mb-1">{data.receiverName}</div>
                    <div className="mb-1">{data.receiverContact}</div>
                    <div className="whitespace-pre-line text-slate-600">{data.receiverAddress}</div>
                 </div>
                 <div className="w-1/2 border border-black p-3">
                    <div className="font-bold border-b border-black -m-3 mb-3 p-1 px-3 bg-slate-100 uppercase">Ekspedisi / Armada</div>
                    <div className="grid grid-cols-[60px_1fr] gap-1 mb-1">
                       <span>Supir</span><span className="font-bold">: {data.driverName}</span>
                       <span>No. Pol</span><span className="font-bold">: {data.vehicleNo}</span>
                       <span>Via</span><span>: {data.expedition}</span>
                       <span>Ref No.</span><span>: {data.refPo}</span>
                    </div>
                 </div>
              </div>

              <div className="mb-6 flex-1">
                 <table className="w-full border-collapse border border-black text-xs">
                    <thead>
                       <tr className="bg-slate-100 text-center">
                          <th className="border border-black py-2 w-10">NO</th>
                          <th className="border border-black py-2 text-left px-2">NAMA BARANG / DESKRIPSI</th>
                          <th className="border border-black py-2 w-16">QTY</th>
                          <th className="border border-black py-2 w-16">UNIT</th>
                          <th className="border border-black py-2 w-16">CHECK</th>
                          <th className="border border-black py-2 w-40">KETERANGAN</th>
                       </tr>
                    </thead>
                    <tbody>
                       {data.items.map((item, idx) => (
                          <tr key={item.id}>
                             <td className="border border-black py-2 text-center">{idx + 1}</td>
                             <td className="border border-black py-2 px-2 font-medium">{item.name}</td>
                             <td className="border border-black py-2 text-center font-bold">{item.qty}</td>
                             <td className="border border-black py-2 text-center uppercase">{item.unit}</td>
                             <td className="border border-black py-2 text-center text-slate-300">___</td>
                             <td className="border border-black py-2 px-2 italic">{item.remarks}</td>
                          </tr>
                       ))}
                       {/* Empty rows filler */}
                       {[...Array(Math.max(0, 10 - data.items.length))].map((_, i) => (
                          <tr key={i}><td className="border border-black h-8"></td><td className="border border-black"></td><td className="border border-black"></td><td className="border border-black"></td><td className="border border-black"></td><td className="border border-black"></td></tr>
                       ))}
                    </tbody>
                 </table>
              </div>

              <div className="border border-black p-2 text-[10px] mb-6">
                 <strong>Catatan:</strong>
                 <div className="whitespace-pre-line mt-1">{data.notes}</div>
              </div>

              <div className="flex border border-black text-xs text-center">
                 <div className="flex-1 border-r border-black p-2 pt-4">
                    <div className="mb-16">{data.signerWarehouse}</div>
                    <div className="border-t border-black w-3/4 mx-auto pt-1">( ........................ )</div>
                 </div>
                 <div className="flex-1 border-r border-black p-2 pt-4">
                    <div className="mb-16">{data.signerDriver}</div>
                    <div className="border-t border-black w-3/4 mx-auto pt-1">( ........................ )</div>
                 </div>
                 <div className="flex-1 p-2 pt-4">
                    <div className="mb-16">{data.signerReceiver}</div>
                    <div className="border-t border-black w-3/4 mx-auto pt-1">( ........................ )</div>
                 </div>
              </div>
            </Kertas>
          )}

          {/* TEMPLATE 2: DELIVERY NOTE MODERN (Clean Blue) */}
          {templateId === 2 && (
            <Kertas className="flex flex-col h-full font-sans">
               <div className="flex justify-between items-start mb-10">
                  <div>
                     <h1 className="text-4xl font-bold text-blue-800 tracking-tight mb-2">DELIVERY NOTE</h1>
                     <div className="text-sm font-bold text-slate-500">DO #: {data.no}</div>
                     <div className="text-xs text-slate-500">Date: {data.date}</div>
                  </div>
                  <div className="text-right">
                     {logo && <img src={logo} className="h-12 w-auto object-contain mb-2 ml-auto" />}
                     <h2 className="font-bold text-lg text-slate-800">{data.senderName}</h2>
                     <div className="text-xs text-slate-500 max-w-[250px] ml-auto whitespace-pre-line">{data.senderInfo}</div>
                  </div>
               </div>

               <div className="grid grid-cols-2 gap-12 mb-10 text-sm">
                  <div>
                     <h3 className="text-xs font-bold text-blue-600 uppercase mb-2 border-b border-blue-200 pb-1">Ship To (Penerima)</h3>
                     <div className="font-bold text-slate-800">{data.receiverName}</div>
                     <div className="text-slate-600">{data.receiverContact}</div>
                     <div className="text-slate-500 text-xs mt-1">{data.receiverAddress}</div>
                  </div>
                  <div>
                     <h3 className="text-xs font-bold text-blue-600 uppercase mb-2 border-b border-blue-200 pb-1">Transport & Reference</h3>
                     <div className="grid grid-cols-[80px_1fr] gap-1 text-slate-700">
                        <span className="text-slate-500">Driver</span><span>: {data.driverName}</span>
                        <span className="text-slate-500">Vehicle</span><span>: {data.vehicleNo}</span>
                        <span className="text-slate-500">Ref PO</span><span>: {data.refPo}</span>
                     </div>
                  </div>
               </div>

               <div className="mb-8">
                  <table className="w-full text-sm">
                     <thead>
                        <tr className="border-b-2 border-blue-600 text-blue-800 font-bold text-xs uppercase">
                           <th className="py-2 text-left w-10">No</th>
                           <th className="py-2 text-left">Item Description</th>
                           <th className="py-2 text-center w-20">Qty</th>
                           <th className="py-2 text-center w-20">Unit</th>
                           <th className="py-2 text-left w-48 pl-4">Remarks</th>
                        </tr>
                     </thead>
                     <tbody className="text-slate-700">
                        {data.items.map((item, idx) => (
                           <tr key={item.id} className="border-b border-slate-100">
                              <td className="py-3 text-slate-400">{idx + 1}</td>
                              <td className="py-3 font-medium">{item.name}</td>
                              <td className="py-3 text-center font-bold text-slate-900">{item.qty}</td>
                              <td className="py-3 text-center text-xs uppercase text-slate-500">{item.unit}</td>
                              <td className="py-3 pl-4 italic text-slate-500 text-xs">{item.remarks}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>

               <div className="mt-auto">
                  <div className="mb-10 text-xs text-slate-500 bg-slate-50 p-4 rounded border border-slate-100">
                     <span className="font-bold text-slate-700 mr-2">Note:</span> {data.notes.replace(/\n/g, ' ')}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-8 text-center text-xs text-slate-600">
                     <div>
                        <div className="mb-16 font-bold">{data.signerWarehouse}</div>
                        <div className="border-t border-slate-300 pt-2">Authorized Signature</div>
                     </div>
                     <div>
                        <div className="mb-16 font-bold">{data.signerDriver}</div>
                        <div className="border-t border-slate-300 pt-2">Carrier / Driver</div>
                     </div>
                     <div>
                        <div className="mb-16 font-bold">{data.signerReceiver}</div>
                        <div className="border-t border-slate-300 pt-2">Received By</div>
                     </div>
                  </div>
               </div>
            </Kertas>
          )}

        </div>
      </div>
    </div>
  );
}