'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  Landmark, UserCircle2, Map, CalendarDays, Receipt, FileText, BadgeCheck
} from 'lucide-react';
import Link from 'next/link';

export default function PajakTanahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem Perpajakan...</div>}>
      <TaxBuilder />
    </Suspense>
  );
}

function TaxBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Sleman',
    date: new Date().toISOString().split('T')[0],
    
    // DATA WAJIB PAJAK
    wpName: 'BAMBANG SUDARSO',
    wpAddress: 'Jl. Kaliurang KM 10, Sardonoharjo, Ngaglik, Sleman',
    wpNik: '3404010101740001',

    // DATA OBJEK PAJAK (PBB)
    nop: '34.04.050.001.012-0345.0',
    taxYear: '2025',
    landArea: '500',
    buildingArea: '150',
    objLocation: 'Desa Sardonoharjo, Ngaglik, Sleman',
    
    // DETAIL PEMBAYARAN
    taxAmount: 1250000,
    taxAmountText: 'Satu Juta Dua Ratus Lima Puluh Ribu Rupiah',
    paymentStatus: 'LUNAS / PAID',
    bankName: 'BPD DIY / Bank Mandiri'
  });

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const TEMPLATES = [
    { id: 1, name: "Formal (Surat Keterangan)", desc: "Untuk syarat BPN / Perbankan" },
    { id: 2, name: "Slip Bukti Bayar", desc: "Layout ringkas seperti struk" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // ISI SURAT
  const SuratKonten = () => (
    <div className="bg-white mx-auto flex flex-col font-serif p-[20mm] text-[11pt] leading-normal text-slate-900 border print:border-none print:p-[15mm] print:m-0" 
         style={{ width: '210mm', height: '296mm', boxSizing: 'border-box' }}>
        
        <div className="flex justify-between items-start border-b-4 border-double border-black pb-4 mb-8 shrink-0">
           <div className="flex gap-4 items-center">
              <div className="w-16 h-16 bg-slate-100 rounded flex items-center justify-center border-2 border-slate-300">
                 <Landmark size={32} className="text-slate-400" />
              </div>
              <div>
                 <h2 className="font-black text-lg leading-tight uppercase">Pemerintah Kabupaten {data.city}</h2>
                 <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Badan Pengelolaan Keuangan dan Aset Daerah</p>
              </div>
           </div>
           <div className="text-right">
              <div className="bg-emerald-600 text-white px-3 py-1 text-[10px] font-black rounded uppercase">PBB-P2 LUNAS</div>
              <p className="text-[10px] mt-1 font-mono">ID: {data.nop.replace(/\D/g,'')}</p>
           </div>
        </div>

        <div className="text-center mb-8 shrink-0">
          <h1 className="font-black text-lg uppercase underline decoration-2 underline-offset-4">SURAT KETERANGAN PELUNASAN PAJAK</h1>
          <p className="text-xs mt-1">Nomor: REG/PBB/{data.taxYear}/{(Math.random()*1000).toFixed(0)}</p>
        </div>

        <div className="space-y-6 flex-grow">
          <p className="text-justify">Yang bertanda tangan di bawah ini menerangkan bahwa Wajib Pajak tersebut di bawah ini telah melakukan pelunasan Pajak Bumi dan Bangunan (PBB-P2) sebagai berikut:</p>
          
          <div className="bg-slate-50 p-6 rounded-xl border space-y-4">
            <h3 className="font-bold border-b pb-2 text-xs uppercase text-slate-500">A. Identitas Wajib Pajak</h3>
            <div className="grid grid-cols-[160px_10px_1fr] text-sm"><span>Nama Wajib Pajak</span><span>:</span><span className="font-bold">{data.wpName}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr] text-sm"><span>Alamat WP</span><span>:</span><span>{data.wpAddress}</span></div>
            
            <h3 className="font-bold border-b pb-2 pt-4 text-xs uppercase text-slate-500">B. Objek Pajak</h3>
            <div className="grid grid-cols-[160px_10px_1fr] text-sm font-mono"><span>Nomor Objek Pajak</span><span>:</span><span className="font-bold">{data.nop}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr] text-sm"><span>Lokasi Objek</span><span>:</span><span>{data.objLocation}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr] text-sm"><span>Tahun Pajak</span><span>:</span><span className="font-bold">{data.taxYear}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr] text-sm"><span>Luas Tanah / Bangunan</span><span>:</span><span>{data.landArea} m² / {data.buildingArea} m²</span></div>

            <h3 className="font-bold border-b pb-2 pt-4 text-xs uppercase text-slate-500">C. Status Pembayaran</h3>
            <div className="grid grid-cols-[160px_10px_1fr] text-sm"><span>Jumlah Bayar</span><span>:</span><span className="font-bold">{formatRupiah(data.taxAmount)}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr] text-sm font-black text-emerald-700"><span>Status</span><span>:</span><span>{data.paymentStatus}</span></div>
          </div>

          <p className="text-justify text-sm">Demikian Surat Keterangan ini dibuat dengan sebenarnya untuk dipergunakan sebagai kelengkapan administrasi pengurusan aset tanah/bangunan atau keperluan lainnya yang sah menurut hukum.</p>
        </div>

        <div className="shrink-0 mt-8 flex justify-between items-end border-t pt-8">
           <div className="text-center w-48">
              <div className="p-2 border-2 border-dashed border-slate-300 rounded mb-2">
                 <BadgeCheck size={32} className="mx-auto text-slate-300" />
                 <p className="text-[8px] text-slate-400 uppercase">E-Verification System</p>
              </div>
           </div>
           <div className="text-center w-64">
              <p className="text-xs mb-14">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
              <p className="font-bold underline uppercase text-sm leading-none">Kepala BPKAD / Pejabat Berwenang</p>
              <p className="text-[10px] text-slate-500 mt-1">Kabupaten {data.city}</p>
           </div>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-200">
      
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0 !important; }
          body, html { margin: 0 !important; padding: 0 !important; height: 297mm !important; overflow: hidden !important; }
          #ui-root { display: none !important; }
          #print-only-root { display: block !important; position: absolute !important; top: 0 !important; left: 0 !important; }
        }
      `}</style>

      {/* UI EDITOR */}
      <div id="ui-root" className="flex flex-col h-screen no-print">
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700 font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors"><ArrowLeft size={18} /></Link>
            <h1 className="font-bold text-emerald-400 uppercase tracking-widest text-sm flex items-center gap-2">
              <Receipt size={16} /> Pajak Tanah (PBB)
            </h1>
          </div>
          <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-2 rounded-lg font-bold uppercase text-xs flex items-center gap-2 shadow-lg">
            <Printer size={16} /> Print Pajak
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR */}
          <div className="w-[400px] bg-white border-r overflow-y-auto p-6 space-y-6 font-sans">
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-2 tracking-widest flex items-center gap-2"><UserCircle2 size={14}/> Wajib Pajak</h3>
                <input className="w-full p-2 border rounded text-xs font-bold" value={data.wpName} onChange={e => handleDataChange('wpName', e.target.value)} placeholder="Nama WP" />
                <textarea className="w-full p-2 border rounded text-xs h-16" value={data.wpAddress} onChange={e => handleDataChange('wpAddress', e.target.value)} placeholder="Alamat WP" />
             </div>
             
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-2 tracking-widest flex items-center gap-2"><Map size={14}/> Objek Pajak</h3>
                <input className="w-full p-2 border rounded text-xs font-mono font-bold" value={data.nop} onChange={e => handleDataChange('nop', e.target.value)} placeholder="Nomor NOP" />
                <div className="grid grid-cols-2 gap-2">
                   <input className="w-full p-2 border rounded text-xs" value={data.landArea} onChange={e => handleDataChange('landArea', e.target.value)} placeholder="Luas Tanah" />
                   <input className="w-full p-2 border rounded text-xs" value={data.taxYear} onChange={e => handleDataChange('taxYear', e.target.value)} placeholder="Tahun" />
                </div>
                <input className="w-full p-2 border rounded text-xs" value={data.objLocation} onChange={e => handleDataChange('objLocation', e.target.value)} placeholder="Lokasi Objek" />
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-2 tracking-widest flex items-center gap-2"><Receipt size={14}/> Pembayaran</h3>
                <input type="number" className="w-full p-2 border rounded text-xs font-bold" value={data.taxAmount} onChange={e => handleDataChange('taxAmount', parseInt(e.target.value))} />
                <input className="w-full p-2 border rounded text-xs font-bold text-emerald-600 uppercase" value={data.paymentStatus} onChange={e => handleDataChange('paymentStatus', e.target.value)} />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-400/20">
             <div className="origin-top scale-[0.55] lg:scale-[0.8] xl:scale-100 shadow-2xl">
                <SuratKonten />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <SuratKonten />
      </div>

    </div>
  );
}