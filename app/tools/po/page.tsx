'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, Plus, Trash2,
  Truck, Building2, Calendar, FileText, Percent, ChevronDown, Check
} from 'lucide-react';
import Link from 'next/link';

export default function PurchaseOrderPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem PO...</div>}>
      <POToolBuilder />
    </Suspense>
  );
}

function POToolBuilder() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);

  // DATA DEFAULT
  const [data, setData] = useState({
    no: `PO/${new Date().getFullYear()}/${Math.floor(Math.random() * 1000)}`,
    date: new Date().toISOString().split('T')[0],
    deliveryDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0], // Default +7 hari
    
    // PEMBELI (Kita)
    companyName: 'PT. KARYA MAJU SENTOSA',
    companyInfo: 'Jl. Industri Raya No. 88, Cikarang\nEmail: procurement@kms.com | Telp: 021-8999-7777',
    
    // VENDOR (Supplier)
    vendorName: 'CV. BESI BAJA UTAMA',
    vendorContact: 'Ibu Ratna Sari',
    vendorAddress: 'Jl. Logam No. 12, Jakarta Utara',
    
    // PENGIRIMAN (Gudang Kita)
    shipToName: 'Gudang Pusat Cikarang',
    shipToAddress: 'Kawasan Industri Jababeka II, Blok C-15, Cikarang',
    shipVia: 'Truk Engkel (Vendor)',
    
    items: [
      { id: 1, name: 'Besi Beton Ulir 13mm (SNI)', qty: 200, unit: 'Batang', price: 85000 },
      { id: 2, name: 'Semen Portland (50kg)', qty: 50, unit: 'Sak', price: 65000 },
    ],
    
    taxRate: 11,
    notes: '1. Mohon lampirkan Invoice & Surat Jalan saat pengiriman.\n2. Barang harus diterima sebelum jam 16.00 WIB.\n3. Pembayaran TOP 30 Hari setelah invoice diterima.',
    
    signer: 'Budi Santoso',
    signerJob: 'Procurement Manager'
  });

  // --- LOGIC HITUNGAN ---
  const subtotal = data.items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const taxAmount = (subtotal * data.taxRate) / 100;
  const total = subtotal + taxAmount;

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
  const addItem = () => setData({ ...data, items: [...data.items, { id: Date.now(), name: '', qty: 1, unit: 'Pcs', price: 0 }] });
  const removeItem = (idx: number) => {
    const newItems = [...data.items];
    newItems.splice(idx, 1);
    setData({ ...data, items: newItems });
  };

  const TEMPLATES = [
    { id: 1, name: "Industrial (Standard)", desc: "Format kotak tegas, jelas untuk gudang" },
    { id: 2, name: "Modern Corporate", desc: "Tampilan biru bersih" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN KERTAS (ANTI SCROLLBAR) ---
  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`
      /* TAMPILAN LAYAR */
      w-[210mm] min-h-[297mm] 
      bg-white shadow-2xl 
      p-[20mm] mx-auto 
      text-[#1e293b] font-serif leading-relaxed text-[11pt]
      relative box-border mb-8 
      
      /* TAMPILAN PRINT (LOCKED) */
      print:fixed print:top-0 print:left-0 
      print:w-[210mm] print:h-[297mm] 
      print:shadow-none print:mb-0 print:p-[20mm] 
      print:overflow-hidden /* KUNCI UTAMA */
      print:z-[9999]
      
      /* SCALING AMAN */
      print:transform print:scale-[0.95] print:origin-top
      
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
          @page { size: A4; margin: 0; }
          
          body { 
            margin: 0 !important; 
            padding: 0 !important; 
            background: white; 
            overflow: hidden !important; /* HILANGKAN SCROLL DI BODY */
          }

          /* HILANGKAN VISUAL SCROLLBAR */
          ::-webkit-scrollbar { display: none !important; width: 0 !important; }
          * { -ms-overflow-style: none !important; scrollbar-width: none !important; }

          header, nav, .no-print { display: none !important; }
          
          /* WARNA TEXT JELAS */
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
            <h1 className="text-sm font-bold tracking-wide text-emerald-400 uppercase">Purchase Order (PO)</h1>
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
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pilih Gaya PO</div>
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
          
          {/* Identitas Perusahaan */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <Building2 size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Identitas Pembeli (Anda)</h3>
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
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-semibold focus:border-blue-500 outline-none" value={data.companyName} onChange={e => setData({...data, companyName: e.target.value})} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat & Kontak</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-16 resize-none focus:border-blue-500 outline-none" value={data.companyInfo} onChange={e => setData({...data, companyInfo: e.target.value})} />
                </div>
             </div>
          </div>

          {/* Data PO & Vendor */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <FileText size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Detail PO & Vendor</h3>
             </div>
             <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor PO</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs font-mono" value={data.no} onChange={e => setData({...data, no: e.target.value})} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal PO</label>
                      <input type="date" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.date} onChange={e => setData({...data, date: e.target.value})} />
                   </div>
                </div>
                <div className="space-y-2 pt-2 border-t border-slate-100">
                   <label className="text-[10px] font-bold text-blue-600 uppercase">Supplier / Vendor</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm font-medium" placeholder="Nama Perusahaan Vendor" value={data.vendorName} onChange={e => setData({...data, vendorName: e.target.value})} />
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" placeholder="Kontak Person (Sales)" value={data.vendorContact} onChange={e => setData({...data, vendorContact: e.target.value})} />
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-14 resize-none" placeholder="Alamat Vendor" value={data.vendorAddress} onChange={e => setData({...data, vendorAddress: e.target.value})} />
                </div>
             </div>
          </div>

          {/* Pengiriman / Logistik */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <Truck size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Info Pengiriman (Ship To)</h3>
             </div>
             <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tgl Pengiriman</label>
                      <input type="date" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.deliveryDate} onChange={e => setData({...data, deliveryDate: e.target.value})} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Metode Kirim</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" placeholder="Ex: JNE / Trucking" value={data.shipVia} onChange={e => setData({...data, shipVia: e.target.value})} />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Dikirim ke Alamat (Gudang)</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-sm" placeholder="Nama Gudang / Penerima" value={data.shipToName} onChange={e => setData({...data, shipToName: e.target.value})} />
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-14 resize-none" placeholder="Alamat Lengkap Pengiriman" value={data.shipToAddress} onChange={e => setData({...data, shipToAddress: e.target.value})} />
                </div>
             </div>
          </div>

          {/* Item & Harga */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                   <FileText size={14} className="text-blue-600" />
                   <h3 className="text-xs font-bold text-slate-700 uppercase">Item Order</h3>
                </div>
                <button onClick={addItem} className="text-[10px] bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700 flex items-center gap-1"><Plus size={10} /> Tambah</button>
             </div>
             <div className="p-4 space-y-3">
                {data.items.map((item, idx) => (
                   <div key={item.id} className="bg-slate-50 p-2 rounded border border-slate-200 relative group">
                      <div className="mb-2 flex gap-2">
                         <input type="text" className="w-full bg-transparent border-b border-slate-300 text-xs font-medium focus:border-blue-500 outline-none pb-1" placeholder="Nama Barang..." value={item.name} onChange={e => handleItemChange(idx, 'name', e.target.value)} />
                      </div>
                      <div className="flex gap-2">
                         <div className="w-16">
                            <span className="text-[9px] text-slate-400 uppercase">Qty</span>
                            <input type="number" className="w-full bg-white border border-slate-300 rounded text-xs p-1 text-center" value={item.qty} onChange={e => handleItemChange(idx, 'qty', e.target.value)} />
                         </div>
                         <div className="w-20">
                            <span className="text-[9px] text-slate-400 uppercase">Satuan</span>
                            <input type="text" className="w-full bg-white border border-slate-300 rounded text-xs p-1 text-center" placeholder="Pcs/Set" value={item.unit} onChange={e => handleItemChange(idx, 'unit', e.target.value)} />
                         </div>
                         <div className="flex-1">
                            <span className="text-[9px] text-slate-400 uppercase">Harga</span>
                            <input type="number" className="w-full bg-white border border-slate-300 rounded text-xs p-1 text-right" value={item.price} onChange={e => handleItemChange(idx, 'price', e.target.value)} />
                         </div>
                      </div>
                      <button onClick={() => removeItem(idx)} className="absolute top-2 right-2 text-slate-400 hover:text-red-500"><Trash2 size={12} /></button>
                   </div>
                ))}
                
                <div className="bg-blue-50 p-3 rounded border border-blue-100 flex items-center justify-between mt-2">
                   <div className="flex items-center gap-2">
                      <Percent size={14} className="text-blue-600" />
                      <label className="text-[10px] font-bold text-blue-700 uppercase">Pajak (PPN %)</label>
                   </div>
                   <input type="number" className="w-16 p-1 border border-blue-200 rounded text-xs text-right font-bold" value={data.taxRate} onChange={e => setData({...data, taxRate: Number(e.target.value)})} />
                </div>
             </div>
          </div>

          {/* Footer */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="p-4 space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Instruksi / Catatan</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-20 resize-none focus:border-blue-500 outline-none" value={data.notes} onChange={e => setData({...data, notes: e.target.value})} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Otorisasi (TTD)</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" placeholder="Nama Penanda Tangan" value={data.signer} onChange={e => setData({...data, signer: e.target.value})} />
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs mt-1" placeholder="Jabatan" value={data.signerJob} onChange={e => setData({...data, signerJob: e.target.value})} />
                </div>
             </div>
          </div>

        </div>

        {/* --- RIGHT PREVIEW --- */}
        <div className="flex-1 h-full bg-slate-200/50 rounded-xl flex justify-center p-8 overflow-y-auto print:p-0 print:bg-white print:w-full">
          
          <Kertas>
            
            {/* TEMPLATE 1: INDUSTRIAL STANDARD (KOTAK TEGAS) */}
            {templateId === 1 && (
              <>
                <div className="flex justify-between items-start mb-8 border-b-2 border-black pb-4">
                   <div className="flex items-center gap-4">
                      {logo && <img src={logo} className="h-16 w-auto object-contain" />}
                      <div>
                         <h1 className="text-xl font-bold uppercase">{data.companyName}</h1>
                         <div className="text-xs text-slate-600 whitespace-pre-line leading-tight mt-1">{data.companyInfo}</div>
                      </div>
                   </div>
                   <div className="text-right">
                      <h2 className="text-3xl font-black uppercase tracking-wider mb-2">Purchase Order</h2>
                      <div className="text-sm font-bold">No: {data.no}</div>
                      <div className="text-xs text-slate-500">Date: {data.date}</div>
                   </div>
                </div>

                <div className="flex gap-8 mb-8 text-xs">
                   <div className="w-1/2 border border-black p-3">
                      <div className="font-bold bg-slate-100 border-b border-black -m-3 mb-3 p-1 px-3 uppercase tracking-wide">Vendor (Supplier)</div>
                      <div className="font-bold text-sm mb-1">{data.vendorName}</div>
                      <div className="mb-1">{data.vendorContact}</div>
                      <div className="whitespace-pre-line text-slate-600">{data.vendorAddress}</div>
                   </div>
                   <div className="w-1/2 border border-black p-3">
                      <div className="font-bold bg-slate-100 border-b border-black -m-3 mb-3 p-1 px-3 uppercase tracking-wide">Ship To (Kirim Ke)</div>
                      <div className="font-bold text-sm mb-1">{data.shipToName}</div>
                      <div className="mb-1">Via: {data.shipVia}</div>
                      <div className="whitespace-pre-line text-slate-600">{data.shipToAddress}</div>
                   </div>
                </div>

                <div className="mb-6">
                   <table className="w-full border-collapse border border-black text-xs">
                      <thead>
                         <tr className="bg-slate-100 text-center">
                            <th className="border border-black py-2 w-10">NO</th>
                            <th className="border border-black py-2 text-left px-2">DESCRIPTION</th>
                            <th className="border border-black py-2 w-16">QTY</th>
                            <th className="border border-black py-2 w-16">UNIT</th>
                            <th className="border border-black py-2 w-28">UNIT PRICE</th>
                            <th className="border border-black py-2 w-28">AMOUNT</th>
                         </tr>
                      </thead>
                      <tbody>
                         {data.items.map((item, idx) => (
                            <tr key={item.id}>
                               <td className="border border-black py-2 text-center">{idx + 1}</td>
                               <td className="border border-black py-2 px-2 font-medium">{item.name}</td>
                               <td className="border border-black py-2 text-center">{item.qty}</td>
                               <td className="border border-black py-2 text-center uppercase">{item.unit}</td>
                               <td className="border border-black py-2 px-2 text-right">{item.price.toLocaleString()}</td>
                               <td className="border border-black py-2 px-2 text-right font-bold">{(item.qty * item.price).toLocaleString()}</td>
                            </tr>
                         ))}
                         {/* Empty rows filler */}
                         {[...Array(Math.max(0, 8 - data.items.length))].map((_, i) => (
                            <tr key={i}><td className="border border-black h-8"></td><td className="border border-black"></td><td className="border border-black"></td><td className="border border-black"></td><td className="border border-black"></td><td className="border border-black"></td></tr>
                         ))}
                      </tbody>
                      <tfoot>
                         <tr>
                            <td colSpan={4} rowSpan={3} className="border border-black p-2 align-top">
                               <div className="font-bold mb-1">Notes / Instructions:</div>
                               <div className="whitespace-pre-line text-[10px] text-slate-600">{data.notes}</div>
                            </td>
                            <td className="border border-black p-2 font-bold text-right bg-slate-50">SUBTOTAL</td>
                            <td className="border border-black p-2 text-right">{subtotal.toLocaleString()}</td>
                         </tr>
                         <tr>
                            <td className="border border-black p-2 font-bold text-right bg-slate-50">TAX ({data.taxRate}%)</td>
                            <td className="border border-black p-2 text-right">{taxAmount.toLocaleString()}</td>
                         </tr>
                         <tr>
                            <td className="border border-black p-2 font-black text-right bg-slate-200">TOTAL</td>
                            <td className="border border-black p-2 text-right font-black">{total.toLocaleString()}</td>
                         </tr>
                      </tfoot>
                   </table>
                </div>

                <div className="flex mt-auto pt-8">
                   <div className="w-1/2">
                      <div className="text-[10px] mb-12">
                         <span className="font-bold">Delivery Required By:</span> {new Date(data.deliveryDate).toLocaleDateString('id-ID', {dateStyle:'full'})}
                      </div>
                   </div>
                   <div className="w-1/2 text-center">
                      <div className="mb-16 font-bold">Authorized Signature</div>
                      <div className="border-t border-black w-3/4 mx-auto pt-1 font-bold">{data.signer}</div>
                      <div className="text-xs">{data.signerJob}</div>
                   </div>
                </div>
              </>
            )}

            {/* TEMPLATE 2: MODERN CORPORATE (BLUE CLEAN) */}
            {templateId === 2 && (
              <div className="flex flex-col h-full font-sans">
                 <div className="flex justify-between items-start mb-10">
                    <div>
                       <h1 className="text-4xl font-bold text-blue-800 tracking-tight mb-2">PURCHASE ORDER</h1>
                       <div className="text-sm font-bold text-slate-500">PO #: {data.no}</div>
                    </div>
                    <div className="text-right">
                       {logo && <img src={logo} className="h-12 w-auto object-contain mb-2 ml-auto" />}
                       <h2 className="font-bold text-lg text-slate-800">{data.companyName}</h2>
                       <div className="text-xs text-slate-500 max-w-[250px] ml-auto whitespace-pre-line">{data.companyInfo}</div>
                    </div>
                 </div>

                 <div className="flex gap-12 mb-10 text-sm">
                    <div className="w-1/2">
                       <h3 className="text-xs font-bold text-blue-600 uppercase mb-2">Vendor</h3>
                       <div className="font-bold text-slate-800">{data.vendorName}</div>
                       <div className="text-slate-600">{data.vendorContact}</div>
                       <div className="text-slate-500 text-xs mt-1">{data.vendorAddress}</div>
                    </div>
                    <div className="w-1/2">
                       <h3 className="text-xs font-bold text-blue-600 uppercase mb-2">Ship To</h3>
                       <div className="font-bold text-slate-800">{data.shipToName}</div>
                       <div className="text-slate-600">{data.shipToAddress}</div>
                       <div className="mt-2 text-xs bg-blue-50 p-2 rounded inline-block text-blue-800">
                          <strong>Delivery:</strong> {data.deliveryDate} | <strong>Via:</strong> {data.shipVia}
                       </div>
                    </div>
                 </div>

                 <div className="mb-8">
                    <table className="w-full text-sm">
                       <thead>
                          <tr className="border-b-2 border-blue-600 text-blue-800 font-bold text-xs uppercase">
                             <th className="py-2 text-left">Item Description</th>
                             <th className="py-2 text-center w-16">Qty</th>
                             <th className="py-2 text-center w-16">Unit</th>
                             <th className="py-2 text-right w-24">Price</th>
                             <th className="py-2 text-right w-28">Total</th>
                          </tr>
                       </thead>
                       <tbody className="text-slate-700">
                          {data.items.map((item, idx) => (
                             <tr key={item.id} className="border-b border-slate-100">
                                <td className="py-3 font-medium">{item.name}</td>
                                <td className="py-3 text-center">{item.qty}</td>
                                <td className="py-3 text-center text-xs uppercase text-slate-500">{item.unit}</td>
                                <td className="py-3 text-right">{item.price.toLocaleString()}</td>
                                <td className="py-3 text-right font-bold text-slate-900">{(item.qty * item.price).toLocaleString()}</td>
                             </tr>
                          ))}
                       </tbody>
                    </table>
                 </div>

                 <div className="flex justify-end mb-12">
                    <div className="w-1/2">
                       <div className="flex justify-between py-2 border-b border-slate-100 text-sm">
                          <span className="text-slate-500">Subtotal</span>
                          <span className="font-medium">Rp {subtotal.toLocaleString()}</span>
                       </div>
                       <div className="flex justify-between py-2 border-b border-slate-100 text-sm">
                          <span className="text-slate-500">Tax ({data.taxRate}%)</span>
                          <span className="font-medium">Rp {taxAmount.toLocaleString()}</span>
                       </div>
                       <div className="flex justify-between py-3 text-lg font-bold text-blue-800">
                          <span>Total</span>
                          <span>Rp {total.toLocaleString()}</span>
                       </div>
                    </div>
                 </div>

                 <div className="mt-auto">
                    <div className="mb-8 p-4 bg-slate-50 rounded border-l-4 border-blue-400 text-xs text-slate-600">
                       <div className="font-bold mb-1 text-slate-800">Terms & Conditions:</div>
                       <div className="whitespace-pre-line">{data.notes}</div>
                    </div>
                    
                    <div className="flex justify-end pt-8 border-t border-slate-200">
                       <div className="text-center w-48">
                          <div className="font-['Caveat',cursive] text-2xl text-slate-400 mb-2">Approved</div>
                          <div className="font-bold text-slate-800">{data.signer}</div>
                          <div className="text-xs text-slate-500 uppercase">{data.signerJob}</div>
                       </div>
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