'use client';

/**
 * FILE: konfirmasi-order.tsx (Generator B2B Procurement Document)
 * STATUS: PRODUCTION READY (FULL FEATURE)
 * DESC: Generator B2B Procurement (Purchase Order & Order Confirmation)
 */

import { useState, Suspense, useEffect, Fragment } from 'react';
import { 
  Printer, ArrowLeftCircle, Building2, UserCircle2, 
  RotateCcw, LayoutTemplate, ChevronDown, Plus, Trash2, Edit3, 
  ShoppingBag, Calculator, FileText, Truck, ShieldCheck, 
  Hash, Calendar, Briefcase, Percent, FileSignature
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface OrderItem {
  id: string;
  desc: string;
  qty: number;
  unit: string;
  price: number;
  discount: number;
}

interface ProcurementData {
  docType: 'ORDER CONFIRMATION';
  docNo: string;
  docDate: string;
  estDeliveryDate: string;
  
  issuerName: string;
  issuerAddress: string;
  issuerContact: string;
  issuerEmail: string;
  issuerTaxId: string; // NPWP

  recipientName: string;
  recipientAddress: string;
  recipientContact: string;
  recipientEmail: string;

  items: OrderItem[];
  
  taxRate: number; 
  shippingFee: number;
  downPayment: number;
  
  shippingMethod: string;
  paymentTerms: string; 
  notes: string;
  termsAndConditions: string;

  authorizedSignName: string;
  authorizedSignTitle: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: ProcurementData = {
  docType: 'ORDER CONFIRMATION',
  docNo: 'PO/2026/08/001-A',
  docDate: '',
  estDeliveryDate: '',
  
  issuerName: 'PT. NUSANTARA MAKMUR SEJAHTERA',
  issuerAddress: 'Gedung Menara Merdeka Lt. 14\nJl. Jend. Sudirman Kav 21, Jakarta Selatan 12920',
  issuerContact: '+62 21 5551234',
  issuerEmail: 'procurement@nusantaramakmur.co.id',
  issuerTaxId: '01.234.567.8-091.000',

  recipientName: 'PT. KREATIF LOGISTIK SOLUSINDO',
  recipientAddress: 'Kawasan Industri Cikarang Blok B-12\nBekasi, Jawa Barat 17530',
  recipientContact: 'Bpk. Ahmad (Sales Director)',
  recipientEmail: 'sales@kreatiflogistik.co.id',

  items: [
    { id: '1', desc: 'Enterprise Server Rack 42U - Heavy Duty', qty: 2, unit: 'Unit', price: 15500000, discount: 0 },
    { id: '2', desc: 'Cisco Catalyst 9300 Switch 48-port', qty: 4, unit: 'Unit', price: 28000000, discount: 2000000 },
    { id: '3', desc: 'Installation & Network Setup Services', qty: 1, unit: 'Lot', price: 12000000, discount: 0 },
  ],
  
  taxRate: 11,
  shippingFee: 1500000,
  downPayment: 0,
  
  shippingMethod: 'Vendor Delivery Fleet',
  paymentTerms: 'Net 30 Days after Invoice Date',
  notes: 'Harap melampirkan Faktur Pajak yang sah saat penagihan tagihan ini.',
  termsAndConditions: '1. Barang yang dikirim harus 100% baru dan sesuai dengan spesifikasi di atas.\n2. Keterlambatan pengiriman akan dikenakan denda keterlambatan sebesar 1‰ (satu permil) per hari kalender.\n3. Garansi perangkat minimal 1 (satu) tahun sejak Berita Acara Serah Terima (BAST) ditandatangani.',

  authorizedSignName: 'Budi Santoso',
  authorizedSignTitle: 'Chief Procurement Officer'
};

export default function ProcurementDocumentPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Procurement Editor...</div>}>
      <ProcurementBuilder />
    </Suspense>
  );
}

function ProcurementBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<ProcurementData>(INITIAL_DATA);
  
  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const nextMonth = new Date(today);
    nextMonth.setDate(today.getDate() + 14);

    setData(prev => ({ 
        ...prev, 
        docDate: today.toISOString().split('T')[0],
        estDeliveryDate: nextMonth.toISOString().split('T')[0]
    }));
  }, []);

  const handleDataChange = (field: keyof ProcurementData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const addItem = () => {
    setData(prev => ({
      ...prev,
      items: [...prev.items, { id: Date.now().toString(), desc: '', qty: 1, unit: 'Pcs', price: 0, discount: 0 }]
    }));
  };
  
  const removeItem = (idx: number) => {
    const newItems = [...data.items];
    newItems.splice(idx, 1);
    setData(prev => ({ ...prev, items: newItems }));
  };

  const handleItemChange = (idx: number, field: keyof OrderItem, val: any) => {
    const newItems = [...data.items];
    // @ts-ignore
    newItems[idx][field] = val;
    setData(prev => ({ ...prev, items: newItems }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir B2B ini ke pengaturan awal?')) {
        const today = new Date();
        const nextMonth = new Date(today);
        nextMonth.setDate(today.getDate() + 14);
        setData({ 
            ...INITIAL_DATA, 
            docDate: today.toISOString().split('T')[0], 
            estDeliveryDate: nextMonth.toISOString().split('T')[0] 
        });
    }
  };

  const activeTemplateName = templateId === 1 ? 'Enterprise Modern' : 'Classic Corporate';

  const subTotal = data.items.reduce((acc, item) => acc + (item.qty * item.price) - item.discount, 0);
  const taxAmount = (subTotal * data.taxRate) / 100;
  const grandTotal = subTotal + taxAmount + data.shippingFee;
  const balanceDue = grandTotal - data.downPayment;

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);

  const ProcurementContent = () => {
    const formatDateSafe = (dateString: string) => {
      if(!dateString) return '...';
      try {
        return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', { dateStyle: 'long' });
      } catch { return dateString; }
    };

    return (
      <div className="bg-white flex flex-col box-border font-sans text-[10pt] leading-normal text-slate-900 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 p-[15mm] md:p-[20mm] print:p-0 shadow-2xl print:shadow-none print:m-0 mx-auto relative">
        
        {/* TEMPLATE 1: ENTERPRISE MODERN */}
        {templateId === 1 && (
          <>
            {/* Header Area */}
            <div className="flex justify-between items-start border-b-[3px] border-slate-900 pb-6 mb-8 shrink-0 break-inside-avoid">
              <div className="flex flex-col gap-1 w-1/2 pr-4">
                 <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900 mb-2">{data.issuerName}</h1>
                 <p className="text-[9pt] text-slate-600 whitespace-pre-line leading-relaxed">{data.issuerAddress}</p>
                 <div className="flex flex-wrap gap-x-4 mt-2 text-[9pt] text-slate-500 font-medium">
                    {data.issuerContact && <span>P: {data.issuerContact}</span>}
                    {data.issuerEmail && <span>E: {data.issuerEmail}</span>}
                    {data.issuerTaxId && <span>NPWP: {data.issuerTaxId}</span>}
                 </div>
              </div>
              <div className="w-1/2 text-right pl-4">
                 <div className="bg-slate-900 text-white px-5 py-2 inline-block shadow-sm">
                    <h2 className="text-xl font-black uppercase tracking-widest">{data.docType}</h2>
                 </div>
                 <div className="mt-4 grid grid-cols-2 gap-2 text-[9.5pt]">
                    <div className="text-slate-500 font-medium">Document No.</div>
                    <div className="font-bold text-slate-900">{data.docNo}</div>
                    <div className="text-slate-500 font-medium">Date</div>
                    <div className="font-bold text-slate-900">{formatDateSafe(data.docDate)}</div>
                 </div>
              </div>
            </div>

            {/* Entity Info Area */}
            <div className="grid grid-cols-2 gap-8 mb-8 shrink-0 break-inside-avoid">
               <div className="bg-slate-50 p-4 border border-slate-200">
                  <h4 className="text-[8pt] font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-200 pb-2">To (Vendor / Supplier):</h4>
                  <p className="font-bold text-[11pt] uppercase text-blue-900 mb-1">{data.recipientName}</p>
                  <p className="text-[9.5pt] whitespace-pre-line text-slate-700 leading-relaxed mb-2">{data.recipientAddress}</p>
                  <p className="text-[9.5pt] font-medium text-slate-800">Attn: {data.recipientContact}</p>
                  {data.recipientEmail && <p className="text-[9.5pt] text-slate-600">{data.recipientEmail}</p>}
               </div>
               <div className="flex flex-col gap-4">
                  <div className="bg-slate-50 p-4 border border-slate-200 h-full">
                     <h4 className="text-[8pt] font-bold text-slate-400 uppercase tracking-widest mb-3 border-b border-slate-200 pb-2">Delivery & Terms:</h4>
                     <table className="w-full text-[9.5pt]">
                        <tbody>
                           <tr>
                              <td className="py-1 text-slate-500 w-32">Est. Delivery</td>
                              <td className="py-1 font-bold text-slate-900">: {formatDateSafe(data.estDeliveryDate)}</td>
                           </tr>
                           <tr>
                              <td className="py-1 text-slate-500">Shipping Via</td>
                              <td className="py-1 font-bold text-slate-900">: {data.shippingMethod}</td>
                           </tr>
                           <tr>
                              <td className="py-1 text-slate-500">Payment Terms</td>
                              <td className="py-1 font-bold text-blue-800">: {data.paymentTerms}</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>

            {/* Items Table */}
            <div className="flex-grow">
               <table className="w-full border-collapse text-[9.5pt] mb-6">
                  <thead>
                     <tr className="bg-slate-900 text-white border-y-2 border-slate-900">
                        <th className="p-3 text-center w-10 font-semibold uppercase text-[8pt] tracking-wider">No</th>
                        <th className="p-3 text-left font-semibold uppercase text-[8pt] tracking-wider">Item Description</th>
                        <th className="p-3 text-center w-24 font-semibold uppercase text-[8pt] tracking-wider">Qty</th>
                        <th className="p-3 text-right w-28 font-semibold uppercase text-[8pt] tracking-wider">Unit Price</th>
                        <th className="p-3 text-right w-28 font-semibold uppercase text-[8pt] tracking-wider">Disc.</th>
                        <th className="p-3 text-right w-32 font-semibold uppercase text-[8pt] tracking-wider">Amount</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 border-b-2 border-slate-900">
                     {data.items.map((item, idx) => {
                        const lineTotal = (item.qty * item.price) - item.discount;
                        return (
                           <tr key={item.id} className="break-inside-avoid hover:bg-slate-50">
                              <td className="p-3 text-center text-slate-500">{idx + 1}</td>
                              <td className="p-3 font-medium text-slate-900">{item.desc}</td>
                              <td className="p-3 text-center">{item.qty} {item.unit}</td>
                              <td className="p-3 text-right">{formatRupiah(item.price)}</td>
                              <td className="p-3 text-right text-red-600">{item.discount > 0 ? `-${formatRupiah(item.discount)}` : '-'}</td>
                              <td className="p-3 text-right font-bold text-slate-900">{formatRupiah(lineTotal)}</td>
                           </tr>
                        )
                     })}
                  </tbody>
               </table>

               {/* Financials & Notes */}
               <div className="flex flex-col md:flex-row gap-8 break-inside-avoid">
                  <div className="w-full md:w-1/2 flex flex-col gap-4">
                     {data.notes && (
                        <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-600 text-[9pt]">
                           <div className="font-bold text-blue-900 mb-1 uppercase text-[8pt] tracking-widest">Remarks / Notes</div>
                           <p className="text-blue-800 leading-relaxed whitespace-pre-line">{data.notes}</p>
                        </div>
                     )}
                     {data.termsAndConditions && (
                        <div className="text-[8pt] text-slate-600">
                           <div className="font-bold text-slate-800 mb-1 uppercase tracking-widest">Terms & Conditions</div>
                           <p className="whitespace-pre-line leading-relaxed">{data.termsAndConditions}</p>
                        </div>
                     )}
                  </div>
                  
                  <div className="w-full md:w-1/2 bg-slate-50 p-4 border border-slate-200">
                     <table className="w-full text-[9.5pt]">
                        <tbody>
                           <tr className="border-b border-slate-200">
                              <td className="py-2 text-slate-600 uppercase font-bold text-[8pt]">Subtotal</td>
                              <td className="py-2 text-right font-bold">{formatRupiah(subTotal)}</td>
                           </tr>
                           {data.taxRate > 0 && (
                              <tr className="border-b border-slate-200">
                                 <td className="py-2 text-slate-600 uppercase font-bold text-[8pt]">Tax (VAT {data.taxRate}%)</td>
                                 <td className="py-2 text-right font-medium">{formatRupiah(taxAmount)}</td>
                              </tr>
                           )}
                           {data.shippingFee > 0 && (
                              <tr className="border-b border-slate-200">
                                 <td className="py-2 text-slate-600 uppercase font-bold text-[8pt]">Shipping & Handling</td>
                                 <td className="py-2 text-right font-medium">{formatRupiah(data.shippingFee)}</td>
                              </tr>
                           )}
                           {data.downPayment > 0 && (
                              <tr className="border-b border-slate-200">
                                 <td className="py-2 text-red-600 uppercase font-bold text-[8pt]">Down Payment</td>
                                 <td className="py-2 text-right font-medium text-red-600">-{formatRupiah(data.downPayment)}</td>
                              </tr>
                           )}
                           <tr className="bg-slate-900 text-white">
                              <td className="py-3 px-3 uppercase font-black tracking-widest text-[10pt]">Total Due</td>
                              <td className="py-3 px-3 text-right font-black text-[12pt]">{formatRupiah(balanceDue)}</td>
                           </tr>
                        </tbody>
                     </table>
                  </div>
               </div>
            </div>

            {/* Signatures */}
            <div className="shrink-0 mt-12 pt-6 border-t border-slate-300 break-inside-avoid grid grid-cols-3 gap-6 text-center">
               <div></div>
               <div>
                  <p className="mb-16 text-[8pt] uppercase font-bold tracking-widest text-slate-500">Accepted By (Vendor)</p>
                  <div className="border-b border-slate-400 w-4/5 mx-auto mb-1"></div>
                  <p className="text-[9pt] font-medium text-slate-700">Authorized Signature & Stamp</p>
               </div>
               <div>
                  <p className="mb-16 text-[8pt] uppercase font-bold tracking-widest text-slate-500">Authorized By (Buyer)</p>
                  <p className="text-[10pt] font-bold text-slate-900 uppercase border-b border-slate-400 pb-1 w-4/5 mx-auto mb-1">{data.authorizedSignName}</p>
                  <p className="text-[9pt] font-medium text-slate-700">{data.authorizedSignTitle}</p>
               </div>
            </div>
            
            <div className="absolute bottom-4 left-0 w-full text-center text-[7pt] text-slate-400 font-mono tracking-widest no-print">
               Generated by Procurement B2B System
            </div>
          </>
        )}

        {/* TEMPLATE 2: CLASSIC CORPORATE */}
        {templateId === 2 && (
          <div className="flex flex-col h-full border-[6px] border-slate-800 p-8 bg-white relative">
             {/* Header */}
             <div className="flex justify-between items-center mb-6 pb-6 border-b-[4px] border-slate-800 shrink-0">
                <div className="w-3/5">
                    <h1 className="text-3xl font-serif font-bold uppercase tracking-tight text-slate-900">{data.issuerName}</h1>
                    <p className="text-[10pt] mt-2 font-medium text-slate-700 whitespace-pre-line">{data.issuerAddress}</p>
                    <p className="text-[9pt] mt-1 text-slate-600">Tel: {data.issuerContact} | NPWP: {data.issuerTaxId}</p>
                </div>
                <div className="w-2/5 text-right flex flex-col items-end">
                    <div className="border-[3px] border-slate-800 p-2 inline-block mb-3">
                       <h2 className="text-2xl font-black text-slate-900 uppercase tracking-widest">{data.docType}</h2>
                    </div>
                    <table className="text-[9pt] w-48 text-left border-collapse">
                       <tbody>
                          <tr>
                             <th className="border border-slate-400 p-1 bg-slate-100 font-bold w-1/2">Doc No</th>
                             <td className="border border-slate-400 p-1 font-mono font-bold text-right">{data.docNo}</td>
                          </tr>
                          <tr>
                             <th className="border border-slate-400 p-1 bg-slate-100 font-bold">Date</th>
                             <td className="border border-slate-400 p-1 text-right">{formatDateSafe(data.docDate)}</td>
                          </tr>
                       </tbody>
                    </table>
                </div>
             </div>

             {/* Vendor & Shipping */}
             <div className="flex gap-6 mb-6 shrink-0 text-[10pt] break-inside-avoid">
                <div className="w-1/2 border-2 border-slate-800 p-3 relative">
                   <div className="absolute -top-3 left-3 bg-white px-2 font-black uppercase text-[9pt] tracking-widest">Supplier / Vendor</div>
                   <div className="font-bold text-lg mt-2 mb-1">{data.recipientName}</div>
                   <div className="whitespace-pre-line text-slate-800 mb-2">{data.recipientAddress}</div>
                   <div><strong>Attn:</strong> {data.recipientContact}</div>
                   <div><strong>Email:</strong> {data.recipientEmail}</div>
                </div>
                <div className="w-1/2 border-2 border-slate-800 p-3 relative">
                   <div className="absolute -top-3 left-3 bg-white px-2 font-black uppercase text-[9pt] tracking-widest">Shipment Details</div>
                   <table className="w-full mt-2">
                      <tbody>
                         <tr><td className="py-1 font-bold w-24">Ship Via</td><td>: {data.shippingMethod}</td></tr>
                         <tr><td className="py-1 font-bold">Req. Date</td><td>: {formatDateSafe(data.estDeliveryDate)}</td></tr>
                         <tr><td className="py-1 font-bold">Terms</td><td>: {data.paymentTerms}</td></tr>
                      </tbody>
                   </table>
                </div>
             </div>

             {/* Table */}
             <div className="flex-grow">
                <table className="w-full border-[3px] border-slate-800 mb-6 text-[10pt]">
                   <thead>
                      <tr className="bg-slate-200 text-slate-900 border-b-[3px] border-slate-800">
                         <th className="p-2 border-r border-slate-400 text-center w-12 font-black">NO</th>
                         <th className="p-2 border-r border-slate-400 text-left font-black">DESCRIPTION</th>
                         <th className="p-2 border-r border-slate-400 text-center w-24 font-black">QTY</th>
                         <th className="p-2 border-r border-slate-400 text-right w-28 font-black">UNIT PRICE</th>
                         <th className="p-2 border-r border-slate-400 text-right w-24 font-black">DISCOUNT</th>
                         <th className="p-2 text-right w-36 font-black">AMOUNT</th>
                      </tr>
                   </thead>
                   <tbody>
                      {data.items.map((item, idx) => (
                         <tr key={item.id} className="break-inside-avoid border-b border-slate-300">
                            <td className="p-2 border-r border-slate-400 text-center font-medium">{idx + 1}</td>
                            <td className="p-2 border-r border-slate-400">{item.desc}</td>
                            <td className="p-2 border-r border-slate-400 text-center">{item.qty} {item.unit}</td>
                            <td className="p-2 border-r border-slate-400 text-right">{formatRupiah(item.price)}</td>
                            <td className="p-2 border-r border-slate-400 text-right">{item.discount > 0 ? formatRupiah(item.discount) : '-'}</td>
                            <td className="p-2 text-right font-bold">{formatRupiah((item.qty * item.price) - item.discount)}</td>
                         </tr>
                      ))}
                      {/* Empty rows filler if needed, but we keep it auto for now */}
                   </tbody>
                </table>

                {/* Bottom Section */}
                <div className="flex gap-6 break-inside-avoid">
                   <div className="w-1/2 flex flex-col gap-4">
                      {data.notes && (
                         <div className="border border-slate-400 p-2 text-[9pt]">
                            <strong className="underline">NOTES:</strong>
                            <p className="mt-1 whitespace-pre-line">{data.notes}</p>
                         </div>
                      )}
                      {data.termsAndConditions && (
                         <div className="text-[8pt]">
                            <strong className="underline">TERMS & CONDITIONS:</strong>
                            <p className="mt-1 whitespace-pre-line leading-tight">{data.termsAndConditions}</p>
                         </div>
                      )}
                   </div>
                   
                   <div className="w-1/2">
                      <table className="w-full border-2 border-slate-800 text-[10pt]">
                         <tbody>
                            <tr className="border-b border-slate-400">
                               <th className="p-2 text-left bg-slate-100 w-1/2">SUBTOTAL</th>
                               <td className="p-2 text-right font-bold">{formatRupiah(subTotal)}</td>
                            </tr>
                            <tr className="border-b border-slate-400">
                               <th className="p-2 text-left bg-slate-100">TAX ({data.taxRate}%)</th>
                               <td className="p-2 text-right">{formatRupiah(taxAmount)}</td>
                            </tr>
                            <tr className="border-b border-slate-400">
                               <th className="p-2 text-left bg-slate-100">SHIPPING</th>
                               <td className="p-2 text-right">{formatRupiah(data.shippingFee)}</td>
                            </tr>
                            <tr className="border-b border-slate-400">
                               <th className="p-2 text-left bg-slate-100">DOWN PAYMENT</th>
                               <td className="p-2 text-right text-red-600">-{formatRupiah(data.downPayment)}</td>
                            </tr>
                            <tr>
                               <th className="p-3 text-left bg-slate-800 text-white font-black text-[11pt]">TOTAL DUE</th>
                               <td className="p-3 text-right bg-slate-100 font-black text-[12pt]">{formatRupiah(balanceDue)}</td>
                            </tr>
                         </tbody>
                      </table>
                   </div>
                </div>
             </div>

             {/* Signatures */}
             <div className="mt-12 flex justify-between text-center break-inside-avoid font-serif">
                <div className="w-48">
                   <p className="mb-20 text-[10pt] font-bold">VENDOR ACCEPTANCE</p>
                   <div className="border-t-2 border-slate-800 pt-1 font-bold text-[10pt]">Signature & Date</div>
                </div>
                <div className="w-48">
                   <p className="mb-20 text-[10pt] font-bold">AUTHORIZED BY</p>
                   <div className="border-t-2 border-slate-800 pt-1 font-bold text-[10pt] uppercase">{data.authorizedSignName}</div>
                   <p className="text-[9pt] italic">{data.authorizedSignTitle}</p>
                </div>
             </div>
          </div>
        )}
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 10mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-950 text-white shadow-xl sticky top-0 z-50 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-200">
               <Briefcase size={16} className="text-blue-500" /> <span className="uppercase tracking-widest">Procurement System B2B</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 border border-slate-700 px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all hover:bg-slate-700">
                <LayoutTemplate size={14} className="text-blue-400" /> {activeTemplateName} <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white text-slate-800 border rounded-xl shadow-2xl p-2 z-[60]">
                    <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-blue-50 rounded-lg text-xs font-bold flex items-center gap-2 ${templateId===1?'bg-blue-50 text-blue-700':''}`}>Enterprise Modern</button>
                    <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-blue-50 rounded-lg text-xs font-bold flex items-center gap-2 ${templateId===2?'bg-blue-50 text-blue-700':''}`}>Classic Corporate</button>
                </div>
              )}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-blue-600 hover:bg-blue-500 px-6 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-transform">
              <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        {/* EDITOR SIDEBAR */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r border-slate-200 flex flex-col h-full absolute md:relative z-10 transition-transform duration-300 ${mobileView === 'preview' ? '-translate-x-full print:translate-x-0 md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 font-sans shadow-sm z-10">
              <h2 className="font-black text-xs uppercase text-slate-800 flex items-center gap-2 tracking-widest"><Edit3 size={16} className="text-blue-600" /> Data Editor</h2>
              <button onClick={handleReset} className="text-slate-500 hover:text-red-500 transition-colors bg-slate-200 hover:bg-red-100 p-1.5 rounded-md"><RotateCcw size={14}/></button>
           </div>
           
           <div className="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar pb-32 font-sans bg-slate-50 print:hidden print:overflow-visible print:bg-white">
              
              {/* Document Meta */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <h3 className="text-[11px] font-black uppercase text-slate-800 border-b pb-2 tracking-widest flex items-center gap-2"><FileText size={14} className="text-indigo-500"/> Document Settings</h3>
                 <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2">
                       <label className="text-[10px] font-bold text-slate-500 mb-1 block">Document Type</label>
                       <select className="w-full p-2 border border-slate-300 rounded-lg text-xs font-bold focus:ring-2 focus:ring-indigo-500 outline-none bg-slate-50" value={data.docType} onChange={e => handleDataChange('docType', e.target.value)}>
                          <option value="ORDER CONFIRMATION">Order Confirmation (OC)</option>
                       </select>
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 mb-1 block">Document No</label>
                       <input className="w-full p-2 border border-slate-300 rounded-lg text-xs font-mono focus:ring-2 focus:ring-indigo-500 outline-none" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} />
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 mb-1 block">Doc Date</label>
                       <input type="date" className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-indigo-500 outline-none" value={data.docDate} onChange={e => handleDataChange('docDate', e.target.value)} />
                    </div>
                 </div>
              </div>

              {/* Issuer */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <h3 className="text-[11px] font-black uppercase text-slate-800 border-b pb-2 tracking-widest flex items-center gap-2"><Building2 size={14} className="text-blue-500"/> Issuer Company (Your Co)</h3>
                 <input className="w-full p-2 border border-slate-300 rounded-lg text-xs font-bold focus:ring-2 focus:ring-blue-500 outline-none" value={data.issuerName} onChange={e => handleDataChange('issuerName', e.target.value)} placeholder="Company Name" />
                 <textarea className="w-full p-2 border border-slate-300 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.issuerAddress} onChange={e => handleDataChange('issuerAddress', e.target.value)} placeholder="Full Address" />
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.issuerContact} onChange={e => handleDataChange('issuerContact', e.target.value)} placeholder="Phone/Contact" />
                    <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.issuerEmail} onChange={e => handleDataChange('issuerEmail', e.target.value)} placeholder="Email" />
                 </div>
                 <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.issuerTaxId} onChange={e => handleDataChange('issuerTaxId', e.target.value)} placeholder="NPWP / Tax ID" />
              </div>

              {/* Recipient */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <h3 className="text-[11px] font-black uppercase text-slate-800 border-b pb-2 tracking-widest flex items-center gap-2"><UserCircle2 size={14} className="text-emerald-500"/> Recipient (Vendor/Client)</h3>
                 <input className="w-full p-2 border border-slate-300 rounded-lg text-xs font-bold focus:ring-2 focus:ring-emerald-500 outline-none" value={data.recipientName} onChange={e => handleDataChange('recipientName', e.target.value)} placeholder="Vendor/Client Name" />
                 <textarea className="w-full p-2 border border-slate-300 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-emerald-500 outline-none" value={data.recipientAddress} onChange={e => handleDataChange('recipientAddress', e.target.value)} placeholder="Full Address" />
                 <div className="grid grid-cols-2 gap-3">
                    <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.recipientContact} onChange={e => handleDataChange('recipientContact', e.target.value)} placeholder="Attn / Contact Person" />
                    <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none" value={data.recipientEmail} onChange={e => handleDataChange('recipientEmail', e.target.value)} placeholder="Email" />
                 </div>
              </div>

              {/* Items */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                    <h3 className="text-[11px] font-black uppercase text-slate-800 flex items-center gap-2 tracking-widest"><ShoppingBag size={14} className="text-amber-500"/> Line Items</h3>
                    <button onClick={addItem} className="text-[10px] bg-amber-500 hover:bg-amber-600 transition-colors text-white px-3 py-1 rounded-md font-bold uppercase tracking-widest shadow-sm flex items-center gap-1"><Plus size={12}/> Add</button>
                 </div>
                 
                 <div className="space-y-3">
                 {data.items.map((item, idx) => (
                    <div key={item.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 relative group animate-in slide-in-from-right-2">
                       <button onClick={() => removeItem(idx)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 shadow-md hover:bg-red-600 transition-transform hover:scale-110 z-10"><Trash2 size={12}/></button>
                       <div className="space-y-2">
                          <input className="w-full p-2 bg-white border border-slate-300 rounded text-xs font-semibold focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Item Description" value={item.desc} onChange={e => handleItemChange(idx, 'desc', e.target.value)} />
                          <div className="grid grid-cols-4 gap-2">
                             <div className="col-span-1">
                                <label className="text-[9px] text-slate-500 font-bold block mb-1">Qty</label>
                                <input type="number" className="w-full p-2 bg-white border border-slate-300 rounded text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={item.qty} onChange={e => handleItemChange(idx, 'qty', parseInt(e.target.value) || 0)} />
                             </div>
                             <div className="col-span-1">
                                <label className="text-[9px] text-slate-500 font-bold block mb-1">Unit</label>
                                <input className="w-full p-2 bg-white border border-slate-300 rounded text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={item.unit} onChange={e => handleItemChange(idx, 'unit', e.target.value)} placeholder="Pcs/Unit" />
                             </div>
                             <div className="col-span-2">
                                <label className="text-[9px] text-slate-500 font-bold block mb-1">Unit Price (Rp)</label>
                                <input type="number" className="w-full p-2 bg-white border border-slate-300 rounded text-xs focus:ring-2 focus:ring-amber-500 outline-none" value={item.price} onChange={e => handleItemChange(idx, 'price', parseInt(e.target.value) || 0)} />
                             </div>
                          </div>
                          <div>
                             <label className="text-[9px] text-slate-500 font-bold block mb-1">Discount Amount (Rp)</label>
                             <input type="number" className="w-full p-2 bg-white border border-slate-300 rounded text-xs focus:ring-2 focus:ring-amber-500 outline-none text-red-600 font-semibold" value={item.discount} onChange={e => handleItemChange(idx, 'discount', parseInt(e.target.value) || 0)} />
                          </div>
                       </div>
                    </div>
                 ))}
                 </div>
              </div>

              {/* Financials & Shipping */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <h3 className="text-[11px] font-black uppercase text-slate-800 border-b pb-2 tracking-widest flex items-center gap-2"><Calculator size={14} className="text-teal-500"/> Financials & Terms</h3>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 mb-1 block">Tax Rate (%)</label>
                       <input type="number" className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-teal-500 outline-none" value={data.taxRate} onChange={e => handleDataChange('taxRate', parseFloat(e.target.value) || 0)} />
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 mb-1 block">Shipping Fee (Rp)</label>
                       <input type="number" className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-teal-500 outline-none" value={data.shippingFee} onChange={e => handleDataChange('shippingFee', parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="col-span-2">
                       <label className="text-[10px] font-bold text-slate-500 mb-1 block">Down Payment (Rp)</label>
                       <input type="number" className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-teal-500 outline-none" value={data.downPayment} onChange={e => handleDataChange('downPayment', parseInt(e.target.value) || 0)} />
                    </div>
                    <div className="col-span-2">
                       <label className="text-[10px] font-bold text-slate-500 mb-1 block">Est. Delivery Date</label>
                       <input type="date" className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-teal-500 outline-none" value={data.estDeliveryDate} onChange={e => handleDataChange('estDeliveryDate', e.target.value)} />
                    </div>
                    <div className="col-span-2">
                       <label className="text-[10px] font-bold text-slate-500 mb-1 block">Shipping Method</label>
                       <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-teal-500 outline-none" value={data.shippingMethod} onChange={e => handleDataChange('shippingMethod', e.target.value)} />
                    </div>
                    <div className="col-span-2">
                       <label className="text-[10px] font-bold text-slate-500 mb-1 block">Payment Terms</label>
                       <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-teal-500 outline-none" value={data.paymentTerms} onChange={e => handleDataChange('paymentTerms', e.target.value)} />
                    </div>
                 </div>
              </div>

              {/* Notes & T&C */}
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 space-y-4">
                 <h3 className="text-[11px] font-black uppercase text-slate-800 border-b pb-2 tracking-widest flex items-center gap-2"><FileSignature size={14} className="text-rose-500"/> Notes & Signatures</h3>
                 
                 <div>
                    <label className="text-[10px] font-bold text-slate-500 mb-1 block">Remarks / Notes</label>
                    <textarea className="w-full p-2 border border-slate-300 rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-rose-500 outline-none" value={data.notes} onChange={e => handleDataChange('notes', e.target.value)} />
                 </div>
                 
                 <div>
                    <label className="text-[10px] font-bold text-slate-500 mb-1 block">Terms & Conditions</label>
                    <textarea className="w-full p-2 border border-slate-300 rounded-lg text-xs h-24 resize-none focus:ring-2 focus:ring-rose-500 outline-none" value={data.termsAndConditions} onChange={e => handleDataChange('termsAndConditions', e.target.value)} />
                 </div>

                 <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100">
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 mb-1 block">Signatory Name</label>
                       <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-rose-500 outline-none" value={data.authorizedSignName} onChange={e => handleDataChange('authorizedSignName', e.target.value)} />
                    </div>
                    <div>
                       <label className="text-[10px] font-bold text-slate-500 mb-1 block">Signatory Title</label>
                       <input className="w-full p-2 border border-slate-300 rounded-lg text-xs focus:ring-2 focus:ring-rose-500 outline-none" value={data.authorizedSignTitle} onChange={e => handleDataChange('authorizedSignTitle', e.target.value)} />
                    </div>
                 </div>
              </div>
              
           </div>
        </div>

        {/* PREVIEW CANVAS */}
        <div className={`flex-1 h-full bg-slate-200/60 flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:hidden print:overflow-visible print:bg-white print:static print:p-0`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.75] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                <ProcurementContent />
            </div>
        </div>
      </main>

      {/* MOBILE TOGGLE BOTTOM BAR */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1.5 shadow-2xl font-sans border border-slate-700">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}>PREVIEW</button>
      </div>
      
      {/* AREA TOMBOL MONETISASI / PRINT WRAPPER */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Procurement B2B Document" price={15000} />
      </div>

      <div id="print-only-root" className="hidden print:h-auto print:static"><div className="bg-white"><ProcurementContent /></div></div>
    </div>
  );
}
