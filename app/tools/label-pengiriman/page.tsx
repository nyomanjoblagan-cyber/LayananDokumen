'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, LayoutTemplate, 
  Package, Truck, AlertTriangle, Video, MapPin, ChevronDown, Check
} from 'lucide-react';
import Link from 'next/link';

export default function LabelPengirimanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem Logistik...</div>}>
      <ShippingLabelBuilder />
    </Suspense>
  );
}

function ShippingLabelBuilder() {
  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    // EKSPEDISI
    courier: 'JNE', 
    service: 'REG (Reguler)',
    resi: 'JP1234567890',
    weight: '1 Kg',
    date: new Date().toISOString().split('T')[0],
    
    // PENGIRIM
    senderName: 'Tokoku Gadget Official',
    senderPhone: '0812-3456-7890',
    senderAddress: 'Mangga Dua Mall Lt. 3 No. 45, Jakarta Pusat',
    
    // PENERIMA
    receiverName: 'Budi Santoso',
    receiverPhone: '0813-9999-8888',
    receiverAddress: 'Jl. Merdeka No. 10, RT 01 RW 02, Kec. Sukmajaya, Kota Depok, Jawa Barat, 16412',
    
    // ISI PAKET
    content: '1x HP Android, 1x Casing, 1x Charger',
    note: 'Warna Hitam, Jangan dibanting!',
    
    // OPSI
    isCod: false,
    codAmount: 150000,
    isFragile: false,
    isUnboxing: true
  });

  // HELPER CURRENCY
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  // HANDLERS
  const handleDataChange = (field: string, val: any) => {
    setData({ ...data, [field]: val });
  };

  // PRESETS
  const applyPreset = (type: 'olshop' | 'pribadi' | 'dokumen') => {
    if (type === 'olshop') {
      setData(prev => ({
        ...prev,
        senderName: 'Fashion Store ID',
        content: 'Baju Kaos Pria (L), Celana Jeans (32)',
        isUnboxing: true,
        isFragile: false
      }));
    } else if (type === 'pribadi') {
      setData(prev => ({
        ...prev,
        senderName: 'Agus (Personal)',
        content: 'Oleh-oleh Makanan Kering',
        isUnboxing: false,
        isFragile: true,
        note: 'Makanan, jangan ditumpuk berat'
      }));
    } else if (type === 'dokumen') {
      setData(prev => ({
        ...prev,
        senderName: 'HRD PT. Maju Mundur',
        content: 'Dokumen Kontrak Asli',
        isUnboxing: false,
        isFragile: false,
        note: 'DOKUMEN PENTING - JANGAN DILIPAT'
      }));
    }
  };

  const TEMPLATES = [
    { id: 1, name: "Standard Marketplace", desc: "Mirip label Shopee/Tokped, layout bersih" },
    { id: 2, name: "Warning / Fragile", desc: "Fokus pada peringatan barang pecah belah" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800 print:bg-white">
      
      {/* CSS KHUSUS PRINT A6 LABEL - ANTI SCROLLBAR */}
      <style jsx global>{`
        @media print {
          @page { size: 105mm 148mm; margin: 0; } /* Ukuran A6 Pas */
          
          body { 
            margin: 0 !important; 
            padding: 0 !important; 
            background: white; 
            overflow: hidden !important; /* MATIKAN SCROLLBAR */
          }

          /* Hilangkan elemen batang scrollbar */
          ::-webkit-scrollbar { display: none !important; width: 0 !important; }
          * { -ms-overflow-style: none !important; scrollbar-width: none !important; }

          header, nav, .no-print { display: none !important; }
          
          /* Paksa warna background muncul */
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
            <h1 className="text-sm font-bold tracking-wide text-emerald-400 uppercase">Label Pengiriman</h1>
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
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pilih Gaya Label</div>
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
              <Printer size={16} /> Cetak Label
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)]">
        
        {/* --- LEFT SIDEBAR: INPUT --- */}
        <div className="no-print w-full lg:w-[450px] shrink-0 h-full overflow-y-auto pr-2 pb-20 space-y-6">
          
          {/* Quick Preset */}
          <div className="bg-emerald-50 rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
             <div className="px-4 py-3 border-b border-emerald-200 flex items-center gap-2">
                <Package size={14} className="text-emerald-600" />
                <h3 className="text-xs font-bold text-emerald-800 uppercase">Isi Otomatis</h3>
             </div>
             <div className="p-4 grid grid-cols-3 gap-2">
                <button onClick={() => applyPreset('olshop')} className="bg-white hover:bg-emerald-100 border border-emerald-200 text-emerald-700 py-2 rounded text-[10px] font-bold transition-colors flex flex-col items-center gap-1">
                   <Package size={14}/> Olshop
                </button>
                <button onClick={() => applyPreset('pribadi')} className="bg-white hover:bg-blue-100 border border-blue-200 text-blue-700 py-2 rounded text-[10px] font-bold transition-colors flex flex-col items-center gap-1">
                   <Truck size={14}/> Pribadi
                </button>
                <button onClick={() => applyPreset('dokumen')} className="bg-white hover:bg-amber-100 border border-amber-200 text-amber-700 py-2 rounded text-[10px] font-bold transition-colors flex flex-col items-center gap-1">
                   <LayoutTemplate size={14}/> Dokumen
                </button>
             </div>
          </div>

          {/* Pengiriman Info */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <Truck size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Ekspedisi & Layanan</h3>
             </div>
             <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Kurir</label>
                      <select className="w-full p-2 border border-slate-300 rounded text-xs font-bold" value={data.courier} onChange={e => handleDataChange('courier', e.target.value)}>
                         <option value="JNE">JNE</option>
                         <option value="J&T">J&T</option>
                         <option value="SiCepat">SiCepat</option>
                         <option value="Shopee Xpress">Shopee Xpress</option>
                         <option value="ID Express">ID Express</option>
                         <option value="AnterAja">AnterAja</option>
                         <option value="Pos Indo">Pos Indo</option>
                         <option value="GoSend">GoSend</option>
                         <option value="GrabExpress">GrabExpress</option>
                      </select>
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Jenis Layanan</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" placeholder="REG / YES / CARGO" value={data.service} onChange={e => handleDataChange('service', e.target.value)} />
                   </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">No. Resi (Opsional)</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs uppercase font-mono" value={data.resi} onChange={e => handleDataChange('resi', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Berat (Kg)</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.weight} onChange={e => handleDataChange('weight', e.target.value)} />
                   </div>
                </div>
             </div>
          </div>

          {/* Alamat */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <MapPin size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Alamat Tujuan</h3>
             </div>
             <div className="p-4 space-y-4">
                <div className="p-3 bg-blue-50 border border-blue-100 rounded">
                   <div className="text-[10px] font-bold text-blue-700 uppercase mb-2">Penerima (Kepada)</div>
                   <input type="text" className="w-full p-2 border border-blue-200 rounded text-xs font-bold mb-2" placeholder="Nama Penerima" value={data.receiverName} onChange={e => handleDataChange('receiverName', e.target.value)} />
                   <input type="text" className="w-full p-2 border border-blue-200 rounded text-xs mb-2" placeholder="No. HP Penerima" value={data.receiverPhone} onChange={e => handleDataChange('receiverPhone', e.target.value)} />
                   <textarea className="w-full p-2 border border-blue-200 rounded text-xs h-20 resize-none" placeholder="Alamat Lengkap (Jalan, RT/RW, Kota, Kode Pos)" value={data.receiverAddress} onChange={e => handleDataChange('receiverAddress', e.target.value)} />
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                   <div className="text-[10px] font-bold text-slate-600 uppercase mb-2">Pengirim (Dari)</div>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs font-bold mb-2" placeholder="Nama Pengirim / Toko" value={data.senderName} onChange={e => handleDataChange('senderName', e.target.value)} />
                   <div className="grid grid-cols-2 gap-2">
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" placeholder="No. HP" value={data.senderPhone} onChange={e => handleDataChange('senderPhone', e.target.value)} />
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" placeholder="Kota Asal" value={data.senderAddress} onChange={e => handleDataChange('senderAddress', e.target.value)} />
                   </div>
                </div>
             </div>
          </div>

          {/* Isi Paket & Opsi */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <Package size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Isi & Fitur</h3>
             </div>
             <div className="p-4 space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Deskripsi Isi Paket</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-12 resize-none" value={data.content} onChange={e => handleDataChange('content', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Catatan Kurir (Opsional)</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" placeholder="Misal: Warna Hitam, Size L" value={data.note} onChange={e => handleDataChange('note', e.target.value)} />
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                   <label className="flex items-center gap-2 cursor-pointer p-2 border rounded hover:bg-slate-50">
                      <input type="checkbox" checked={data.isCod} onChange={e => handleDataChange('isCod', e.target.checked)} />
                      <span className="text-xs font-bold">Aktifkan COD</span>
                   </label>
                   {data.isCod && (
                      <div>
                         <input type="number" className="w-full p-2 border border-emerald-300 rounded text-xs font-bold text-emerald-700" placeholder="Nominal COD" value={data.codAmount} onChange={e => handleDataChange('codAmount', parseInt(e.target.value) || 0)} />
                      </div>
                   )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <label className="flex items-center gap-2 cursor-pointer p-2 border rounded hover:bg-slate-50">
                      <input type="checkbox" checked={data.isFragile} onChange={e => handleDataChange('isFragile', e.target.checked)} />
                      <span className="text-xs font-bold text-red-600">Fragile</span>
                   </label>
                   <label className="flex items-center gap-2 cursor-pointer p-2 border rounded hover:bg-slate-50">
                      <input type="checkbox" checked={data.isUnboxing} onChange={e => handleDataChange('isUnboxing', e.target.checked)} />
                      <span className="text-xs font-bold text-blue-600">Video Unboxing</span>
                   </label>
                </div>
             </div>
          </div>

        </div>

        {/* --- RIGHT PREVIEW --- */}
        <div className="flex-1 h-full bg-slate-200/50 rounded-xl flex justify-center p-8 overflow-y-auto print:p-0 print:bg-white print:w-full">
          
          {/* CONTAINER A6 - FIXED WIDTH & SCALE PRINT */}
          <div className={`
             bg-white shadow-2xl 
             w-[105mm] min-h-[148mm] 
             flex flex-col text-[#1e293b] box-border relative transition-all border-2 border-black 
             
             /* PRINT STYLE: FIXED POSITION, NO SHADOW, NO BORDER, SCALE 95% */
             print:absolute print:top-0 print:left-0 
             print:w-[105mm] print:h-[148mm] print:overflow-hidden
             print:shadow-none print:border-none print:m-0
             print:transform print:scale-[0.95] print:origin-top-left
          `}>
            
            {/* TEMPLATE 1: STANDARD OLSHOP */}
            {templateId === 1 && (
              <div className="font-sans text-xs h-full flex flex-col">
                 
                 {/* Header Kurir */}
                 <div className="flex border-b-2 border-black">
                    <div className="w-[40%] border-r-2 border-black p-3 flex flex-col justify-center items-center">
                       <h2 className="text-xl font-black uppercase italic tracking-tighter">{data.courier}</h2>
                       <div className="text-sm font-bold mt-1 bg-black text-white px-2 py-0.5 rounded">{data.service}</div>
                    </div>
                    <div className="w-[60%] p-2 flex flex-col justify-center items-center">
                       {/* DUMMY BARCODE */}
                       <div className="h-10 w-full bg-[repeating-linear-gradient(90deg,black,black_2px,white_2px,white_4px)] mb-1"></div>
                       <div className="font-mono text-sm font-bold tracking-widest">{data.resi}</div>
                    </div>
                 </div>

                 {/* COD & Weight */}
                 {data.isCod ? (
                    <div className="bg-black text-white p-2 text-center border-b-2 border-black">
                       <div className="text-[10px] font-bold uppercase tracking-widest opacity-80">Cash On Delivery (COD)</div>
                       <div className="text-2xl font-black">{formatRupiah(data.codAmount)}</div>
                    </div>
                 ) : (
                    <div className="bg-slate-100 p-1 text-center border-b-2 border-black text-[10px] font-bold text-slate-500 uppercase">
                       Non-COD (Sudah Dibayar)
                    </div>
                 )}

                 {/* Penerima - Besar */}
                 <div className="p-4 flex-grow">
                    <div className="flex items-start gap-2 mb-1">
                       <div className="text-[10px] font-bold bg-black text-white px-1.5 py-0.5 rounded uppercase">Kepada</div>
                       <div className="text-[10px] text-slate-500 mt-0.5">{data.weight}</div>
                    </div>
                    <div className="text-lg font-bold uppercase leading-tight mb-1">{data.receiverName}</div>
                    <div className="text-sm font-bold mb-2">{data.receiverPhone}</div>
                    <div className="text-sm leading-snug text-slate-800">
                       {data.receiverAddress}
                    </div>
                 </div>

                 {/* Pengirim - Kecil */}
                 <div className="p-3 border-t-2 border-dashed border-black bg-slate-50">
                    <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">Pengirim (Dari):</div>
                    <div className="flex justify-between items-start">
                       <div className="w-[60%]">
                          <div className="font-bold uppercase text-xs">{data.senderName}</div>
                          <div className="text-[10px] text-slate-600">{data.senderAddress}</div>
                       </div>
                       <div className="font-bold text-xs">{data.senderPhone}</div>
                    </div>
                 </div>

                 {/* Produk & Note */}
                 <div className="p-2 border-t-2 border-black text-[10px]">
                    <div className="flex gap-1 mb-1">
                       <span className="font-bold">Isi:</span>
                       <span className="line-clamp-2">{data.content}</span>
                    </div>
                    {data.note && <div className="italic text-slate-500">Catatan: {data.note}</div>}
                 </div>

                 {/* Footer Icons */}
                 {(data.isFragile || data.isUnboxing) && (
                    <div className="flex border-t-2 border-black">
                       {data.isFragile && (
                          <div className="flex-1 bg-red-600 text-white p-2 flex items-center justify-center gap-1">
                             <AlertTriangle size={16} fill="white" className="text-red-600" />
                             <span className="font-black text-xs uppercase">FRAGILE</span>
                          </div>
                       )}
                       {data.isUnboxing && (
                          <div className="flex-1 bg-blue-600 text-white p-2 flex items-center justify-center gap-1">
                             <Video size={16} />
                             <span className="font-bold text-[9px] uppercase leading-none text-center">Wajib Video<br/>Unboxing</span>
                          </div>
                       )}
                    </div>
                 )}
              </div>
            )}

            {/* TEMPLATE 2: WARNING / FRAGILE */}
            {templateId === 2 && (
              <div className="font-sans text-xs h-full flex flex-col bg-white">
                 
                 {/* Header Warning */}
                 <div className="bg-red-600 text-white text-center p-2 border-b-2 border-black">
                    <h2 className="text-2xl font-black uppercase tracking-tighter animate-pulse">FRAGILE</h2>
                    <div className="text-[10px] font-bold">JANGAN DIBANTING / MUDAH PECAH</div>
                 </div>

                 {/* Kurir & Resi */}
                 <div className="flex border-b-2 border-black p-2 justify-between items-center bg-slate-50">
                    <div className="font-black text-xl italic">{data.courier}</div>
                    <div className="text-right">
                       <div className="font-mono font-bold text-sm">{data.resi}</div>
                       <div className="text-[10px]">{data.service} • {data.weight}</div>
                    </div>
                 </div>

                 {/* Penerima */}
                 <div className="p-4 flex-grow">
                    <div className="text-[10px] text-slate-500 uppercase mb-1">Penerima:</div>
                    <div className="text-xl font-bold uppercase leading-none mb-1">{data.receiverName}</div>
                    <div className="font-mono text-sm font-bold bg-yellow-300 inline-block px-1 mb-3">{data.receiverPhone}</div>
                    <div className="text-sm border-l-4 border-red-600 pl-3 py-1">
                       {data.receiverAddress}
                    </div>
                 </div>

                 {/* Isi Paket */}
                 <div className="px-4 py-2 border-t border-dashed border-slate-300">
                    <div className="text-[10px] text-slate-400 uppercase">Isi Paket:</div>
                    <div className="font-bold text-xs">{data.content}</div>
                 </div>

                 {/* Pengirim */}
                 <div className="p-3 bg-black text-white text-xs flex justify-between items-center">
                    <div>
                       <span className="opacity-70 text-[10px]">Dari: </span>
                       <span className="font-bold uppercase">{data.senderName}</span>
                    </div>
                    <div className="font-mono">{data.senderPhone}</div>
                 </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}