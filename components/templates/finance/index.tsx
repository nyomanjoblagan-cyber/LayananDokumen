'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Printer, ArrowLeft, Upload, Plus, Trash2,
  Edit3, Eye, RotateCcw, ArrowLeftCircle, Building2, Landmark, 
  FileText, Calendar, ShieldCheck
} from 'lucide-react';
import Link from 'next/link'; 

import PrintWrapper from '@/components/PrintWrapper';

// --- 1. HELPER: TERBILANG ---
const terbilang = (angka: number): string => {
  const bil = ["", "Satu", "Dua", "Tiga", "Empat", "Lima", "Enam", "Tujuh", "Delapan", "Sembilan", "Sepuluh", "Sebelas"];
  if (angka < 12) return " " + bil[angka];
  if (angka < 20) return terbilang(angka - 10) + " Belas";
  if (angka < 100) return terbilang(Math.floor(angka / 10)) + " Puluh" + terbilang(angka % 10);
  if (angka < 200) return " Seratus" + terbilang(angka - 100);
  if (angka < 1000) return terbilang(Math.floor(angka / 100)) + " Ratus" + terbilang(angka % 100);
  if (angka < 1000000) return terbilang(Math.floor(angka / 1000)) + " Ribu" + terbilang(angka % 1000);
  if (angka < 1000000000) return terbilang(Math.floor(angka / 1000000)) + " Juta" + terbilang(angka % 1000000);
  if (angka < 1000000000000) return terbilang(Math.floor(angka / 1000000000)) + " Miliar" + terbilang(angka % 1000000000);
  return "";
};

// --- 2. ATURAN KERTAS MUTLAK ---
const Kertas = ({ children, className = '', w = '210mm', h = '296mm', p = 'p-[20mm]' }: { children: React.ReactNode, className?: string, w?: string, h?: string, p?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto ${p} print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 print:w-full print:min-w-0 print:min-h-0 h-auto ${className}`} style={{ width: w, minHeight: h, maxWidth: '100%' }}>
    {children}
  </div>
);

// --- 3. TYPE DEFINITIONS ---
interface Item {
  id: number;
  name: string;
  qty: number;
  price: number;
}

interface FinanceData {
  no: string;
  date: string;
  dueDate: string;
  senderName: string;
  senderInfo: string;
  receiverName: string;
  receiverInfo: string;
  items: Item[];
  notes: string;
  bankDetails: string;
  terms: string;
  taxRate: number;
  city: string;
  signer: string;
  signerRole: string;
  footerNote: string;
}

// --- 4. DATA DEFAULT B2B ---
const INITIAL_DATA: FinanceData = {
  no: 'INV/B2B/2026/001',
  date: '', 
  dueDate: '',
  senderName: 'PT. BORCELLE NUSA MANDIRI',
  senderInfo: 'Gedung Borcelle Tower Lt. 12\nJl. Jend. Sudirman Kav. 45, Jakarta Selatan 12920\nTelp: (021) 1234-5678 | Email: finance@borcelle.co.id\nNPWP: 01.234.567.8-901.000',
  receiverName: 'PT. TEKNOLOGI MAJU BERSAMA',
  receiverInfo: 'Gedung Menara Inovasi Lt. 5\nJl. MH Thamrin No. 10, Jakarta Pusat 10350\nAttn: Finance Department',
  items: [
    { id: 1, name: 'Enterprise Software License (Annual)', qty: 1, price: 150000000 },
    { id: 2, name: 'Implementation & Training Services', qty: 1, price: 25000000 },
    { id: 3, name: 'Premium SLA Support (12 Months)', qty: 12, price: 5000000 },
  ],
  taxRate: 11, // 11% PPN
  notes: 'Tagihan ini mencakup biaya lisensi dan layanan untuk periode 2026-2027.',
  bankDetails: 'Bank Central Asia (BCA)\nKCU Sudirman\nNo. Rekening: 123-456-7890\nAtas Nama: PT. BORCELLE NUSA MANDIRI',
  terms: '1. Pembayaran jatuh tempo 30 hari sejak tanggal invoice.\n2. Keterlambatan pembayaran dikenakan denda 2% per bulan.\n3. Harap mencantumkan Nomor Invoice pada berita transfer.\n4. Bukti potong PPh Pasal 23 (jika ada) dikirimkan maksimal tanggal 15 bulan berikutnya.',
  city: 'Jakarta',
  signer: 'Anindita Wijaya',
  signerRole: 'Finance Director',
  footerNote: 'Dokumen ini sah dan diterbitkan secara elektronik, tidak memerlukan stempel basah.'
};

export default function FinancePage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Sistem Enterprise...</div>}>
      <FinanceToolBuilder />
    </Suspense>
  );
}

function FinanceToolBuilder() {
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeDocType, setActiveDocType] = useState<'invoice' | 'kuitansi' | 'nota'>('invoice');
  const [mobileMode, setMobileMode] = useState<'editor' | 'preview'>('editor');
  const [logo, setLogo] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<FinanceData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const modeParam = searchParams.get('mode');
    const today = new Date();
    const thirtyDaysLater = new Date();
    thirtyDaysLater.setDate(today.getDate() + 30);
    
    setData(prev => ({ 
      ...prev, 
      date: today.toISOString().split('T')[0],
      dueDate: thirtyDaysLater.toISOString().split('T')[0]
    }));

    if (modeParam === 'kwitansi' || modeParam === 'kuitansi') setActiveDocType('kuitansi');
    else if (modeParam === 'nota') setActiveDocType('nota');
    else setActiveDocType('invoice');

    return () => {
      if (logo) URL.revokeObjectURL(logo);
    };
  }, [searchParams]);

  if (!isClient) return null;

  const subtotal = data.items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const taxAmount = (subtotal * data.taxRate) / 100;
  const total = subtotal + taxAmount; 
  const terbilangText = total > 0 ? `${terbilang(Math.round(total)).trim()} Rupiah` : 'Nol Rupiah';

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (logo) URL.revokeObjectURL(logo);
      setLogo(URL.createObjectURL(file));
    }
  };
  
  const handleItemChange = (idx: number, field: keyof Item, val: any) => {
    const newItems = [...data.items];
    // @ts-ignore
    newItems[idx][field] = val;
    setData(prev => ({ ...prev, items: newItems }));
  };
  
  const addItem = () => setData(prev => ({ ...prev, items: [...prev.items, { id: Date.now(), name: '', qty: 1, price: 0 }] }));
  
  const removeItem = (idx: number) => {
    const newItems = [...data.items];
    newItems.splice(idx, 1);
    setData(prev => ({ ...prev, items: newItems }));
  };

  const handleReset = () => {
    if(window.confirm('Reset formulir B2B ke awal?')) {
      const today = new Date();
      const thirtyDaysLater = new Date();
      thirtyDaysLater.setDate(today.getDate() + 30);
      setData({ 
        ...INITIAL_DATA, 
        date: today.toISOString().split('T')[0],
        dueDate: thirtyDaysLater.toISOString().split('T')[0]
      });
      setLogo(null);
    }
  };

  const formatDateSafe = (dateStr: string) => {
    if(!dateStr) return '-';
    try {
      return new Date(dateStr + 'T00:00:00').toLocaleDateString('id-ID', { dateStyle: 'long' });
    } catch { return dateStr; }
  };

  const dims = (activeDocType === 'nota') ? { w: '105mm', h: '148mm' } : (activeDocType === 'kuitansi') ? { w: '210mm', h: '99mm' } : { w: '210mm', h: '296mm' };
  const paperPadding = (activeDocType === 'nota') ? 'p-[6mm]' : 'p-[20mm]';
  const DocumentContent = () => (
    <Kertas className="flex flex-col" w={dims.w} h={dims.h} p={paperPadding}>
      {activeDocType === 'invoice' && (
        <div className="flex-1 flex flex-col font-sans text-slate-800">
          {/* HEADER */}
          <div className="flex justify-between items-start border-b-2 border-slate-900 pb-6 mb-6">
            <div className="w-[55%]">
              {logo ? (
                <img src={logo} className="h-20 w-auto object-contain mb-4" alt="Company Logo" />
              ) : (
                <div className="h-20 w-20 bg-slate-200 mb-4 flex items-center justify-center text-slate-400 font-bold text-xs">LOGO</div>
              )}
              <h2 className="text-xl font-black uppercase text-slate-900 tracking-tight">{data.senderName}</h2>
              <div className="text-[10px] text-slate-600 whitespace-pre-line mt-2 leading-relaxed">{data.senderInfo}</div>
            </div>
            <div className="w-[45%] text-right">
              <h1 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-4">INVOICE</h1>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="font-bold text-slate-500 uppercase">Invoice No</div>
                <div className="font-bold text-slate-900">{data.no}</div>
                <div className="font-bold text-slate-500 uppercase">Invoice Date</div>
                <div className="font-semibold">{formatDateSafe(data.date)}</div>
                <div className="font-bold text-slate-500 uppercase">Due Date</div>
                <div className="font-semibold text-red-600">{formatDateSafe(data.dueDate)}</div>
              </div>
            </div>
          </div>

          {/* BILL TO */}
          <div className="mb-8 grid grid-cols-2 gap-8 break-inside-avoid">
            <div className="bg-slate-50 p-4 rounded-sm border-l-4 border-slate-800 print:bg-transparent print:border-none print:p-0">
              <h3 className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">BILLED TO</h3>
              <div className="text-sm font-black text-slate-900 uppercase">{data.receiverName}</div>
              <div className="text-xs text-slate-600 whitespace-pre-line mt-1 leading-relaxed">{data.receiverInfo}</div>
            </div>
            <div>
              <h3 className="text-[10px] font-black text-slate-400 uppercase mb-2 tracking-widest">PAYMENT INFO</h3>
              <div className="text-xs text-slate-800 whitespace-pre-line leading-relaxed p-3 border border-slate-200 rounded-sm bg-white">
                {data.bankDetails}
              </div>
            </div>
          </div>

          {/* TABLE */}
          <div className="flex-grow">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white uppercase tracking-widest text-[10px]">
                  <th className="p-3 text-center w-12 border border-slate-900">No</th>
                  <th className="p-3 text-left border border-slate-900">Description</th>
                  <th className="p-3 text-center w-20 border border-slate-900">Qty</th>
                  <th className="p-3 text-right w-36 border border-slate-900">Unit Price (Rp)</th>
                  <th className="p-3 text-right w-36 border border-slate-900">Amount (Rp)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {data.items.map((item, index) => (
                  <tr key={item.id} className="break-inside-avoid hover:bg-slate-50 transition-colors">
                    <td className="p-3 text-center border-x border-b border-slate-300 font-medium">{index + 1}</td>
                    <td className="p-3 text-left border-x border-b border-slate-300 font-bold text-slate-800">{item.name}</td>
                    <td className="p-3 text-center border-x border-b border-slate-300 tabular-nums">{item.qty}</td>
                    <td className="p-3 text-right border-x border-b border-slate-300 tabular-nums">{item.price.toLocaleString('id-ID')}</td>
                    <td className="p-3 text-right border-x border-b border-slate-300 font-bold text-slate-800 tabular-nums">{(item.qty * item.price).toLocaleString('id-ID')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* TOTALS */}
          <div className="flex justify-end mt-4 break-inside-avoid">
            <div className="w-[50%]">
              <div className="flex justify-between py-2 border-b border-slate-200 text-sm">
                <span className="font-bold text-slate-600 uppercase text-xs">Subtotal</span>
                <span className="font-bold tabular-nums">Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-200 text-sm">
                <span className="font-bold text-slate-600 uppercase text-xs">VAT / PPN ({data.taxRate}%)</span>
                <span className="font-bold tabular-nums">Rp {taxAmount.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between py-3 border-b-4 border-slate-900 text-lg">
                <span className="font-black text-slate-900 uppercase text-sm self-center">Grand Total</span>
                <span className="font-black text-slate-900 tabular-nums">Rp {total.toLocaleString('id-ID')}</span>
              </div>
              <div className="mt-2 bg-slate-100 p-2 text-[10px] font-black italic uppercase text-center border border-dashed border-slate-300">
                "{terbilangText}"
              </div>
            </div>
          </div>

          {/* TERMS & SIGNATURE */}
          <div className="mt-10 pt-6 border-t border-slate-200 flex justify-between items-end break-inside-avoid text-xs">
            <div className="w-[60%] space-y-4">
              <div>
                <h4 className="font-black text-slate-800 uppercase text-[10px] tracking-widest mb-1">Notes:</h4>
                <p className="text-slate-600 italic whitespace-pre-line">{data.notes}</p>
              </div>
              <div>
                <h4 className="font-black text-slate-800 uppercase text-[10px] tracking-widest mb-1">Terms & Conditions:</h4>
                <p className="text-slate-600 whitespace-pre-line leading-tight text-[10px]">{data.terms}</p>
              </div>
            </div>
            <div className="w-[30%] text-center">
              <p className="text-[10px] mb-1 uppercase font-bold text-slate-600">{data.city}, {formatDateSafe(data.date)}</p>
              <p className="text-[10px] font-bold text-slate-800 uppercase mb-16">{data.senderName}</p>
              <div className="border-b border-slate-900 px-4 pb-1">
                <p className="font-black text-slate-900 uppercase text-sm leading-none">{data.signer}</p>
              </div>
              <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold">{data.signerRole}</p>
            </div>
          </div>
          
          <div className="mt-8 text-center text-[9px] text-slate-400 italic break-inside-avoid">
            *** {data.footerNote} ***
          </div>
        </div>
      )}

      {activeDocType === 'kuitansi' && (
        <div className="flex-1 flex flex-col font-sans text-slate-800">
          <div className="border-4 border-double border-slate-900 p-8 flex-grow flex flex-col justify-between">
            {/* HEADER KUITANSI */}
            <div className="flex justify-between items-start border-b-4 border-slate-900 pb-6">
              <div className="flex gap-4 items-center">
                {logo ? (
                  <img src={logo} className="h-16 w-auto object-contain" alt="Company Logo" />
                ) : (
                  <div className="h-16 w-16 bg-slate-200 flex items-center justify-center text-slate-400 font-bold text-xs">LOGO</div>
                )}
                <div>
                  <h2 className="text-xl font-black uppercase text-slate-900">{data.senderName}</h2>
                  <p className="text-[9px] text-slate-500 mt-1 uppercase max-w-[200px]">{data.senderInfo.split('\n')[0]}</p>
                </div>
              </div>
              <div className="text-right">
                <h1 className="text-4xl font-black italic tracking-tighter text-slate-900">OFFICIAL RECEIPT</h1>
                <p className="font-mono text-sm font-bold text-slate-600 mt-2">No. {data.no}</p>
              </div>
            </div>
            
            {/* BODY KUITANSI */}
            <div className="space-y-8 py-12">
               <div className="flex items-end gap-4">
                 <span className="w-48 uppercase text-xs font-black text-slate-500 tracking-widest">Telah Terima Dari</span>
                 <div className="flex-1 border-b-2 border-slate-400 px-2 font-black uppercase text-lg text-slate-900">
                   : {data.receiverName}
                 </div>
               </div>
               
               <div className="flex items-end gap-4">
                 <span className="w-48 uppercase text-xs font-black text-slate-500 tracking-widest">Uang Sejumlah</span>
                 <div className="flex-1 border-b-2 border-slate-400 bg-slate-100 px-4 py-2 font-black italic text-slate-800 text-sm border-dashed">
                   # {terbilangText} #
                 </div>
               </div>
               
               <div className="flex items-end gap-4">
                 <span className="w-48 uppercase text-xs font-black text-slate-500 tracking-widest">Untuk Pembayaran</span>
                 <div className="flex-1 border-b-2 border-slate-400 px-2 uppercase text-sm font-bold text-slate-800 leading-relaxed">
                   : {data.items.map(i => i.name).join(', ')}
                   {data.notes && ` - ${data.notes}`}
                 </div>
               </div>
            </div>

            {/* FOOTER KUITANSI */}
            <div className="flex justify-between items-end border-t border-slate-200 pt-8 mt-auto">
              <div className="flex flex-col gap-4">
                <div className="bg-slate-900 text-white px-8 py-4 text-3xl font-black shadow-xl rounded-sm tabular-nums tracking-tight">
                  Rp {total.toLocaleString('id-ID')}
                </div>
                <div className="text-[10px] text-slate-500 font-bold uppercase w-64 border border-slate-200 p-2 bg-slate-50">
                  <span className="text-slate-800 border-b border-slate-200 block pb-1 mb-1">Transfer Info:</span>
                  {data.bankDetails.split('\n').slice(0, 3).join('\n')}
                </div>
              </div>
              <div className="text-center w-72">
                <p className="text-xs mb-2 uppercase font-black text-slate-500">{data.city}, {formatDateSafe(data.date)}</p>
                <p className="text-xs font-bold text-slate-800 uppercase mb-16">{data.senderName}</p>
                <p className="font-black border-b-2 border-slate-900 uppercase text-sm pb-1 leading-none">{data.signer}</p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold">{data.signerRole}</p>
              </div>
            </div>
          </div>
        </div>
      )}


      {activeDocType === 'nota' && (
        <div className="flex-1 flex flex-col font-sans text-slate-800">
           {/* HEADER */}
           <div className="flex justify-between items-start border-b border-slate-200 pb-3 mb-4">
             <div className="w-[60%]">
               {logo ? <img src={logo} className="w-10 h-10 object-contain mb-1" alt="logo" /> : <div className="w-8 h-8 bg-slate-100 rounded flex items-center justify-center font-bold text-[6px] text-slate-400 mb-1">LOGO</div>}
               <h1 className="font-black text-xs leading-tight uppercase text-slate-900">{data.senderName}</h1>
               <p className="text-[7px] text-slate-500 leading-relaxed whitespace-pre-line mt-0.5">{data.senderInfo}</p>
             </div>
             <div className="w-[40%] text-right">
               <h2 className="text-xl font-black tracking-tighter text-blue-600 uppercase">NOTA</h2>
               <div className="mt-1 text-[8px] font-bold text-slate-700 bg-slate-50 inline-block px-2 py-1 rounded border border-slate-200">
                 NO: {data.no}
               </div>
             </div>
           </div>

           {/* INFO KEPADA & TANGGAL */}
           <div className="flex justify-between mb-4 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              <div className="w-[60%]">
                <p className="text-[7px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Kepada Yth:</p>
                <p className="font-bold text-[10px] text-slate-800 uppercase">{data.receiverName}</p>
                <p className="text-[8px] text-slate-500 mt-0.5 whitespace-pre-line max-w-[95%]">{data.receiverInfo}</p>
              </div>
              <div className="w-[40%] text-right">
                <p className="text-[7px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Tanggal</p>
                <p className="font-bold text-[9px] text-slate-800">{formatDateSafe(data.date)}</p>
              </div>
           </div>

           {/* TABEL BARANG */}
           <div className="flex-grow">
             <table className="w-full text-[9px] border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white uppercase text-[7px] tracking-widest">
                    <th className="py-2 px-2 text-left rounded-tl-md">Deskripsi Item</th>
                    <th className="py-2 px-1 text-center w-8">Qty</th>
                    <th className="py-2 px-1 text-right w-16">Harga</th>
                    <th className="py-2 px-2 text-right w-20 rounded-tr-md">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.items.map((item, i) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2 px-2 font-bold text-slate-800 uppercase">{item.name}</td>
                      <td className="py-2 px-1 text-center text-slate-600 font-medium tabular-nums">{item.qty}</td>
                      <td className="py-2 px-1 text-right text-slate-600 font-medium tabular-nums">{item.price.toLocaleString('id-ID')}</td>
                      <td className="py-2 px-2 text-right font-black text-slate-900 tabular-nums">{(item.qty * item.price).toLocaleString('id-ID')}</td>
                    </tr>
                  ))}
                  {[...Array(Math.max(0, 5 - data.items.length))].map((_, i) => (
                    <tr key={i}><td className="py-2 px-2 h-[24px]"></td><td className="py-2 px-1"></td><td className="py-2 px-1"></td><td className="py-2 px-2"></td></tr>
                  ))}
                </tbody>
             </table>
           </div>

           {/* TOTAL & TTD */}
           <div className="mt-4 border-t-2 border-slate-200 pt-4">
              <div className="flex justify-end mb-6">
                <div className="w-[85%] flex items-center justify-between bg-blue-50/80 p-2.5 rounded-lg border border-blue-100">
                  <span className="font-black text-blue-900 uppercase text-[8px] tracking-widest">Grand Total</span>
                  <span className="font-black text-sm text-blue-700 tabular-nums">Rp {total.toLocaleString('id-ID')}</span>
                </div>
              </div>

              <div className="flex justify-between items-end text-[8px]">
                <div className="w-1/3">
                  <p className="font-black text-slate-400 uppercase tracking-widest mb-10 text-center">Penerima</p>
                  <div className="border-b border-slate-300 w-3/4 mx-auto"></div>
                </div>
                <div className="w-1/3 text-center px-1">
                  <p className="italic text-slate-400 text-[6px] leading-relaxed">{data.footerNote}</p>
                </div>
                <div className="w-1/3 text-center">
                  <p className="font-black text-slate-400 uppercase tracking-widest mb-10">Hormat Kami</p>
                  <p className="font-bold text-slate-900 uppercase border-b border-slate-900 pb-0.5 w-max mx-auto px-2">{data.signer}</p>
                </div>
              </div>
           </div>
        </div>
      )}

    </Kertas>
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800">
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 h-16 shrink-0 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
             <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
               <ArrowLeftCircle size={20} className="text-blue-400"/>
               <span className="text-xs font-black uppercase tracking-widest hidden md:inline">Dashboard B2B</span>
             </Link>
             <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
             <div className="flex bg-slate-800 p-1 rounded-lg border border-slate-700">
                {(['invoice', 'kuitansi', 'nota'] as const).map((t) => (
                  <button 
                    key={t} onClick={() => setActiveDocType(t)}
                    className={`px-5 py-1.5 rounded-md text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${activeDocType === t ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
                  >
                    {t === 'invoice' ? <span className="flex items-center gap-1"><FileText size={14}/> Invoice</span> : t === 'kuitansi' ? <span className="flex items-center gap-1"><Landmark size={14}/> Receipt</span> : <span className="flex items-center gap-1"><FileText size={14}/> Nota</span>}
                  </button>
                ))}
             </div>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={handleReset} className="p-2 text-slate-400 hover:text-red-400 transition-colors"><RotateCcw size={18}/></button>
             <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg font-black text-xs uppercase tracking-widest transition-all active:scale-95 shadow-lg flex items-center gap-2">
                <Printer size={16}/> Cetak B2B
             </button>
          </div>
      </div>

      <main className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col md:flex-row gap-6 h-[calc(100vh-64px)] overflow-hidden relative print:hidden print:h-auto print:overflow-visible">
        {/* EDITOR SIDEBAR */}
        <div className={`no-print w-full md:w-[500px] bg-white rounded-xl border border-slate-200 flex flex-col h-full absolute md:relative z-10 transition-transform shadow-xl md:shadow-none ${mobileMode === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="bg-slate-50 p-4 border-b flex justify-between items-center">
              <h3 className="text-xs font-black uppercase text-slate-700 flex items-center gap-2"><Building2 size={16} className="text-blue-600"/> B2B Enterprise Data</h3>
              <span className="text-[10px] font-black bg-blue-100 text-blue-700 px-2 py-0.5 rounded uppercase tracking-tighter">{activeDocType}</span>
           </div>
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 md:pb-10 print:hidden print:overflow-visible print:bg-white">
              
              {/* SENDER INFO */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl border-2 border-dashed border-slate-300 flex items-center justify-center cursor-pointer bg-slate-50 overflow-hidden hover:border-blue-400 transition-colors" onClick={() => fileInputRef.current?.click()}>
                    {logo ? <img src={logo} className="w-full h-full object-contain" alt="logo" /> : <Upload size={20} className="text-slate-300" />}
                  </div>
                  <div className="flex-1">
                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    <button onClick={() => fileInputRef.current?.click()} className="text-xs font-bold text-blue-600 hover:underline">Upload Company Logo</button>
                    <p className="text-[9px] text-slate-400 uppercase mt-1">Rekomendasi PNG Transparan</p>
                  </div>
                </div>
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase ml-1">Company Name</label>
                  <input className="w-full p-2.5 border rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.senderName} onChange={e => setData({...data, senderName: e.target.value})} />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase ml-1">Company Details (Address, Email, NPWP)</label>
                  <textarea className="w-full p-2.5 border rounded-lg text-xs h-24 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.senderInfo} onChange={e => setData({...data, senderInfo: e.target.value})} />
                </div>
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="col-span-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase ml-1">Document No.</label>
                    <input className="w-full p-2.5 border rounded-lg text-xs font-mono font-bold" value={data.no} onChange={e => setData({...data, no: e.target.value})} />
                  </div>
                  <div className="col-span-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase ml-1">Issue Date</label>
                    <input type="date" className="w-full p-2.5 border rounded-lg text-xs" value={data.date} onChange={e => setData({...data, date: e.target.value})} />
                  </div>
                  <div className="col-span-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase ml-1">Due Date</label>
                    <input type="date" className="w-full p-2.5 border rounded-lg text-xs" value={data.dueDate} onChange={e => setData({...data, dueDate: e.target.value})} />
                  </div>
                </div>
              </div>

              {/* RECEIVER INFO */}
              <div className="border-t pt-4 space-y-4">
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase ml-1">Billed To (Client Company)</label>
                  <input className="w-full p-2.5 border rounded-lg text-sm font-bold uppercase" value={data.receiverName} onChange={e => setData({...data, receiverName: e.target.value})} />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase ml-1">Client Address & Attn</label>
                  <textarea className="w-full p-2.5 border rounded-lg text-xs h-20 outline-none" value={data.receiverInfo} onChange={e => setData({...data, receiverInfo: e.target.value})} />
                </div>
              </div>

              {/* ITEMS */}
              <div className="border-t pt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest flex items-center gap-1"><ShieldCheck size={14}/> Products / Services</label>
                  <button onClick={addItem} className="text-[10px] bg-blue-600 text-white px-4 py-1.5 rounded-full font-black shadow-lg shadow-blue-100 hover:bg-blue-700">+ ADD ITEM</button>
                </div>
                <div className="space-y-3">
                  {data.items.map((item, idx) => (
                    <div key={item.id} className="bg-slate-50 p-3 rounded-xl border border-slate-200 relative group animate-in slide-in-from-right-2">
                      <input className="w-full bg-white p-2 border border-slate-200 rounded-lg text-xs font-bold mb-2 outline-none" placeholder="Description..." value={item.name} onChange={e => handleItemChange(idx, 'name', e.target.value)} />
                      <div className="flex gap-2">
                        <div className="w-20">
                          <label className="text-[8px] font-bold text-slate-400 uppercase ml-1">Qty</label>
                          <input type="number" className="w-full bg-white border border-slate-200 rounded-lg text-xs p-2 text-center" value={item.qty} onChange={e => handleItemChange(idx, 'qty', parseInt(e.target.value) || 0)} />
                        </div>
                        <div className="flex-1">
                          <label className="text-[8px] font-bold text-slate-400 uppercase ml-1">Unit Price (Rp)</label>
                          <input type="number" className="w-full bg-white border border-slate-200 rounded-lg text-xs p-2 text-right font-mono font-bold" value={item.price} onChange={e => handleItemChange(idx, 'price', parseInt(e.target.value) || 0)} />
                        </div>
                      </div>
                      <button onClick={() => removeItem(idx)} className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12} /></button>
                    </div>
                  ))}
                </div>
                <div className="pt-2">
                  <label className="text-[9px] font-bold text-slate-400 uppercase ml-1">VAT / PPN Rate (%)</label>
                  <input type="number" className="w-32 p-2 border rounded-lg text-xs font-bold block" value={data.taxRate} onChange={e => setData({...data, taxRate: parseInt(e.target.value) || 0})} />
                </div>
              </div>

              {/* PAYMENT & TERMS */}
              <div className="border-t pt-4 space-y-4">
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase ml-1">Bank Account Details</label>
                  <textarea className="w-full p-2.5 border rounded-lg text-xs h-24 font-mono bg-slate-50" value={data.bankDetails} onChange={e => setData({...data, bankDetails: e.target.value})} />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase ml-1">Terms & Conditions</label>
                  <textarea className="w-full p-2.5 border rounded-lg text-xs h-24 bg-slate-50" value={data.terms} onChange={e => setData({...data, terms: e.target.value})} />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase ml-1">General Notes</label>
                  <textarea className="w-full p-2.5 border rounded-lg text-xs h-16 bg-slate-50" value={data.notes} onChange={e => setData({...data, notes: e.target.value})} />
                </div>
              </div>

              {/* SIGNATURE */}
              <div className="border-t pt-4 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase ml-1">City</label>
                    <input className="w-full p-2.5 border rounded-lg text-xs uppercase" value={data.city} onChange={e => setData({...data, city: e.target.value})} />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-slate-400 uppercase ml-1">Signer Name</label>
                    <input className="w-full p-2.5 border rounded-lg text-xs font-bold uppercase" value={data.signer} onChange={e => setData({...data, signer: e.target.value})} />
                  </div>
                </div>
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase ml-1">Signer Role (e.g. Finance Director)</label>
                  <input className="w-full p-2.5 border rounded-lg text-xs uppercase" value={data.signerRole} onChange={e => setData({...data, signerRole: e.target.value})} />
                </div>
                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase ml-1">Footer Note</label>
                  <input className="w-full p-2.5 border rounded-lg text-xs italic" value={data.footerNote} onChange={e => setData({...data, footerNote: e.target.value})} />
                </div>
              </div>

           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/80 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileMode === 'editor' ? 'hidden md:flex' : 'flex'} custom-scrollbar print:hidden print:overflow-visible print:bg-white print:static`}>
          <div className="origin-top transition-transform duration-300 transform scale-[0.35] sm:scale-[0.55] md:scale-[0.7] lg:scale-[0.85] xl:scale-100 mb-[-150%] sm:mb-[-100mm] md:mb-[-40mm] lg:mb-[-10mm] xl:mb-10 mt-2 xl:mt-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
             <DocumentContent />
          </div>
        </div>
      </main>

      {/* MOBILE NAV TOGGLE */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1.5 shadow-2xl border border-white/10">
          <button onClick={() => setMobileMode('editor')} className={`flex-1 rounded-xl text-xs font-black tracking-widest flex items-center justify-center gap-2 transition-all ${mobileMode === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}><Edit3 size={16}/> EDITOR</button>
          <button onClick={() => setMobileMode('preview')} className={`flex-1 rounded-xl text-xs font-black tracking-widest flex items-center justify-center gap-2 transition-all ${mobileMode === 'preview' ? 'bg-blue-500 text-white shadow-lg' : 'text-slate-400'}`}><Eye size={16}/> PREVIEW</button>
      </div>
      
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="B2B Document" price={25000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static">
         <DocumentContent />
      </div>
    </div>
  );
}
