'use client';

import { useState, Suspense, useRef } from 'react';
import { 
  Printer, ArrowLeft, PackageCheck, Building2, UserCircle2, 
  PlusCircle, Trash2, X, PenTool, ShieldCheck, Truck, ClipboardList
} from 'lucide-react';
import Link from 'next/link';

export default function TandaTerimaBarangPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Tanda Terima...</div>}>
      <ReceiptBuilder />
    </Suspense>
  );
}

function ReceiptBuilder() {
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState({
    city: 'Denpasar',
    date: '2026-01-08',
    docNo: 'DO/BWC/2026/01/044',
    
    // PENGIRIM (PIHAK I)
    senderName: 'PT. BANGUN WARGA CEMERLANG',
    senderAddress: 'Jl. Gatot Subroto No. 45, Denpasar, Bali',
    senderPhone: '(0361) 223344',

    // PENERIMA (PIHAK II)
    receiverName: 'MADE WIRA KUSUMA',
    receiverAddress: 'Proyek Renovasi Villa Seminyak, Badung',
    receiverPhone: '0812-3456-7890',

    // DAFTAR BARANG (DYNAMIC)
    items: [
      { name: 'Semen Gresik 50kg', qty: '50', unit: 'Sak', note: 'Kondisi Baik' },
      { name: 'Besi Beton 10mm', qty: '20', unit: 'Batang', note: 'Standar SNI' },
      { name: 'Pasir Cor (Colt)', qty: '2', unit: 'Rit', note: 'Pasir Hitam' }
    ],

    // PETUGAS
    delivererName: 'AHMAD JUNAIDI',
    receiverSignName: 'MADE WIRA KUSUMA'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const addItem = () => {
    setData({ ...data, items: [...data.items, { name: '', qty: '', unit: '', note: '' }] });
  };

  const removeItem = (index: number) => {
    const newItems = [...data.items];
    newItems.splice(index, 1);
    setData({ ...data, items: newItems });
  };

  const updateItem = (index: number, field: string, val: string) => {
    const newItems = [...data.items];
    // @ts-ignore
    newItems[index][field] = val;
    setData({ ...data, items: newItems });
  };

  const ReceiptContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border print:m-0 print:border-none print:shadow-none p-[20mm] print:p-[15mm] text-slate-900 font-sans" 
         style={{ width: '210mm', height: '290mm' }}>
      
      {/* HEADER / KOP */}
      <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4 mb-6 shrink-0">
        <div className="flex-grow">
          <h1 className="text-xl font-black uppercase tracking-tighter leading-none mb-1 text-blue-800">{data.senderName}</h1>
          <p className="text-[9pt] text-slate-500 italic leading-tight">{data.senderAddress}</p>
          <p className="text-[9pt] text-slate-500">Telp: {data.senderPhone}</p>
        </div>
        <div className="text-right">
          <h2 className="text-lg font-black uppercase tracking-widest text-slate-800">TANDA TERIMA BARANG</h2>
          <p className="text-[10pt] font-bold">No: {data.docNo}</p>
        </div>
      </div>

      {/* INFO PIHAK */}
      <div className="grid grid-cols-2 gap-10 mb-6 text-[10pt]">
         <div className="space-y-1">
            <p className="font-bold border-b text-[8pt] text-slate-400 uppercase tracking-widest mb-1">Penerima:</p>
            <p className="font-black text-[11pt]">{data.receiverName}</p>
            <p className="italic text-slate-600">{data.receiverAddress}</p>
            <p>HP: {data.receiverPhone}</p>
         </div>
         <div className="space-y-1 text-right">
            <p className="font-bold border-b text-[8pt] text-slate-400 uppercase tracking-widest mb-1">Detail Pengiriman:</p>
            <p>Tanggal: <b>{new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'})}</b></p>
            <p>Kota: {data.city}</p>
         </div>
      </div>

      {/* TABEL BARANG */}
      <div className="flex-grow overflow-hidden">
        <table className="w-full border-collapse border border-slate-900 text-[10pt]">
           <thead className="bg-slate-100 uppercase font-black text-[9pt]">
              <tr>
                 <th className="border border-slate-900 p-2 w-10">No</th>
                 <th className="border border-slate-900 p-2 text-left">Deskripsi Barang</th>
                 <th className="border border-slate-900 p-2 w-20">Qty</th>
                 <th className="border border-slate-900 p-2 w-20">Satuan</th>
                 <th className="border border-slate-900 p-2 text-left">Keterangan</th>
              </tr>
           </thead>
           <tbody>
              {data.items.map((item, i) => (
                 <tr key={i} className="h-10">
                    <td className="border border-slate-900 p-2 text-center">{i + 1}</td>
                    <td className="border border-slate-900 p-2 font-bold">{item.name}</td>
                    <td className="border border-slate-900 p-2 text-center">{item.qty}</td>
                    <td className="border border-slate-900 p-2 text-center">{item.unit}</td>
                    <td className="border border-slate-900 p-2 italic text-slate-600">{item.note}</td>
                 </tr>
              ))}
              {/* Spacer empty rows if items < 8 */}
              {data.items.length < 8 && Array.from({length: 8 - data.items.length}).map((_, i) => (
                <tr key={`empty-${i}`} className="h-10">
                  <td className="border border-slate-900 p-2"></td>
                  <td className="border border-slate-900 p-2"></td>
                  <td className="border border-slate-900 p-2"></td>
                  <td className="border border-slate-900 p-2"></td>
                  <td className="border border-slate-900 p-2"></td>
                </tr>
              ))}
           </tbody>
        </table>
        <p className="text-[8pt] italic mt-4 text-slate-500">* Barang yang sudah diterima dalam kondisi baik tidak dapat dikembalikan tanpa perjanjian sebelumnya.</p>
      </div>

      {/* TANDA TANGAN TRIPLE (SEJAJAR) */}
      <div className="shrink-0 mt-6 pt-4 border-t-2 border-slate-100">
        <table className="w-full table-fixed text-[10pt]">
          <tbody>
            <tr className="text-center font-black text-[8pt] text-slate-400 uppercase tracking-widest">
              <td className="pb-4">Hormat Kami,</td>
              <td className="pb-4">Pengantar,</td>
              <td className="pb-4">Penerima,</td>
            </tr>
            <tr className="h-24">
              <td className="text-center align-bottom italic text-slate-300 text-[7pt] pb-2">(Stempel Toko)</td>
              <td></td>
              <td></td>
            </tr>
            <tr className="text-center font-bold">
              <td className="underline uppercase">{data.senderName.split(' ')[0]} ...</td>
              <td className="underline uppercase">({data.delivererName})</td>
              <td className="underline uppercase">({data.receiverSignName})</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-200 font-sans text-slate-900">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0 !important; }
          body, html { height: 297mm !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: white !important; }
          #ui-root { display: none !important; }
          #print-only-root { display: block !important; position: absolute !important; top: 0 !important; left: 0 !important; width: 210mm !important; }
        }
      `}</style>

      {/* UI EDITOR */}
      <div id="ui-root" className="flex flex-col h-screen no-print">
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-blue-400 flex items-center gap-2 italic">
               <PackageCheck size={18} /> Delivery <span className="text-white not-italic opacity-40 font-normal">Receipt Builder</span>
            </h1>
          </div>
          <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 active:scale-95 transition-all shadow-lg">
            <Printer size={16} /> Print Tanda Terima
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR */}
          <div className="w-[420px] bg-white border-r overflow-y-auto p-6 space-y-8 scrollbar-thin shadow-inner">
             
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Info Pengirim</h3>
                <input className="w-full p-2.5 border rounded-xl text-xs font-bold uppercase" value={data.senderName} onChange={e => handleDataChange('senderName', e.target.value)} />
                <input className="w-full p-2.5 border rounded-xl text-xs" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} placeholder="Nomor Surat" />
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Info Penerima</h3>
                <input className="w-full p-2.5 border rounded-xl text-xs font-bold uppercase" value={data.receiverName} onChange={e => handleDataChange('receiverName', e.target.value)} />
                <textarea className="w-full p-2.5 border rounded-xl text-xs h-16 resize-none" value={data.receiverAddress} onChange={e => handleDataChange('receiverAddress', e.target.value)} placeholder="Alamat Tujuan" />
             </div>

             <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-1">
                   <h3 className="text-[10px] font-black uppercase text-amber-600 flex items-center gap-2"><ClipboardList size={12}/> Daftar Barang</h3>
                   <button onClick={addItem} className="bg-amber-100 text-amber-700 p-1 rounded-md"><PlusCircle size={16}/></button>
                </div>
                {data.items.map((item, idx) => (
                   <div key={idx} className="p-3 bg-slate-50 rounded-xl border relative group space-y-2">
                      <button onClick={() => removeItem(idx)} className="absolute top-1 right-1 text-red-400 opacity-0 group-hover:opacity-100"><Trash2 size={12}/></button>
                      <input className="w-full p-1 border-b bg-transparent text-xs font-bold" value={item.name} onChange={e => updateItem(idx, 'name', e.target.value)} placeholder="Nama Barang" />
                      <div className="grid grid-cols-3 gap-2">
                         <input className="w-full p-1 border rounded text-[10px]" value={item.qty} onChange={e => updateItem(idx, 'qty', e.target.value)} placeholder="Qty" />
                         <input className="w-full p-1 border rounded text-[10px]" value={item.unit} onChange={e => updateItem(idx, 'unit', e.target.value)} placeholder="Satuan" />
                         <input className="w-full p-1 border rounded text-[10px]" value={item.note} onChange={e => updateItem(idx, 'note', e.target.value)} placeholder="Ket" />
                      </div>
                   </div>
                ))}
             </div>

             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-1 flex items-center gap-2"><Truck size={12}/> Otoritas</h3>
                <input className="w-full p-2.5 border rounded-xl text-xs font-bold" value={data.delivererName} onChange={e => handleDataChange('delivererName', e.target.value)} placeholder="Nama Pengantar/Sopir" />
                <input className="w-full p-2.5 border rounded-xl text-xs font-bold" value={data.receiverSignName} onChange={e => handleDataChange('receiverSignName', e.target.value)} placeholder="Nama Penerima (TTD)" />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-300/30">
             <div className="origin-top scale-[0.55] lg:scale-[0.85] xl:scale-100 transition-transform shadow-2xl">
                <ReceiptContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <ReceiptContent />
      </div>
    </div>
  );
}