'use client';

import { useState, useEffect, Suspense, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, Plus, Trash2,
  User, CreditCard, ChevronDown, Check, Edit3, Eye, RotateCcw
} from 'lucide-react';
import Link from 'next/link'; // FIXED IMPORT

// IMPORT KOMPONEN SAKTI
import DocumentServices from '@/components/DocumentServices';

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
  return "";
};

interface Item {
  id: number;
  name: string;
  qty: number;
  price: number;
}

interface FinanceData {
  no: string;
  date: string;
  senderName: string;
  senderInfo: string;
  receiverName: string;
  receiverInfo: string;
  items: Item[];
  notes: string;
  city: string;
  signer: string;
  footerNote: string;
}

const INITIAL_DATA: FinanceData = {
  no: 'INV/2026/001',
  date: '', 
  senderName: 'BORCELLE FOOD',
  senderInfo: 'Jl. Raya Merdeka No. 45, Jakarta Selatan\nWhatsApp: 0812-3456-7890',
  receiverName: 'PT. Teknologi Maju',
  receiverInfo: 'Gedung Menara 1, Lt. 5\nJl. Sudirman, Jakarta',
  items: [
    { id: 1, name: 'Jasa Katering (Paket Premium)', qty: 50, price: 50000 },
    { id: 2, name: 'Biaya Layanan & Pengiriman', qty: 1, price: 150000 },
  ],
  notes: 'Mohon transfer ke BCA 123-456-789 a.n Borcelle Food.',
  city: 'DENPASAR',
  signer: 'Manager Keuangan',
  footerNote: 'Barang yang sudah dibeli tidak dapat ditukar/dikembalikan.'
};

export default function FinancePage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Studio Dokumen...</div>}>
      <FinanceToolBuilder />
    </Suspense>
  );
}

function FinanceToolBuilder() {
  const searchParams = useSearchParams();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [activeDocType, setActiveDocType] = useState<'invoice' | 'nota' | 'kuitansi'>('invoice');
  const [mobileMode, setMobileMode] = useState<'editor' | 'preview'>('editor');
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<FinanceData>(INITIAL_DATA);
  const [showDonation, setShowDonation] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const modeParam = searchParams.get('mode');
    const today = new Date().toISOString().split('T')[0];
    
    setData(prev => ({ ...prev, date: today }));
    if (modeParam === 'nota') setActiveDocType('nota');
    else if (modeParam === 'kwitansi' || modeParam === 'kuitansi') setActiveDocType('kuitansi');
    
    return () => { if (logo) URL.revokeObjectURL(logo); };
  }, [searchParams]);

  if (!isClient) return null; // Mencegah Hydration Error

  const total = data.items.reduce((acc, item) => acc + (item.qty * item.price), 0);
  const terbilangText = total > 0 ? `${terbilang(total)} Rupiah` : 'Nol Rupiah';

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (logo) URL.revokeObjectURL(logo);
      setLogo(URL.createObjectURL(file));
    }
  };

  const handleReset = () => {
    if(window.confirm('Reset formulir ke awal?')) {
      setData({ ...INITIAL_DATA, date: new Date().toISOString().split('T')[0] });
      setLogo(null);
    }
  };

  const dims = (activeDocType === 'nota') ? { w: '105mm', h: '148mm' } : 
               (activeDocType === 'kuitansi') ? { w: '210mm', h: '99mm' } : 
               { w: '210mm', h: '297mm' };

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800">
      {/* HEADER */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 shrink-0 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
             <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2"><ArrowLeft size={16}/> Dashboard</Link>
             <div className="flex bg-slate-800 p-1 rounded-lg">
                {['invoice', 'nota', 'kuitansi'].map((t) => (
                  <button key={t} onClick={() => setActiveDocType(t as any)} className={`px-4 py-1 rounded text-xs uppercase font-bold ${activeDocType === t ? 'bg-blue-600 text-white' : 'text-slate-400'}`}>{t}</button>
                ))}
             </div>
          </div>
          <button onClick={() => window.print()} className="bg-emerald-600 px-6 py-2 rounded-lg font-bold flex items-center gap-2"><Printer size={16}/> Cetak</button>
      </div>

      <main className="max-w-[1600px] mx-auto p-4 flex flex-col md:flex-row gap-6 h-[calc(100vh-64px)] overflow-hidden">
        {/* EDITOR */}
        <div className={`w-full md:w-[400px] bg-white rounded-xl border p-4 overflow-y-auto ${mobileMode === 'preview' ? 'hidden md:block' : 'block'}`}>
           <h2 className="font-bold mb-4 flex items-center gap-2"><Edit3 size={16}/> Editor</h2>
           <div className="space-y-4">
              <input type="text" className="w-full p-2 border rounded" value={data.senderName} onChange={e => setData({...data, senderName: e.target.value})} placeholder="Nama Usaha" />
              <textarea className="w-full p-2 border rounded h-20" value={data.senderInfo} onChange={e => setData({...data, senderInfo: e.target.value})} placeholder="Alamat" />
              <div className="border-t pt-4">
                 <button onClick={() => setData({...data, items: [...data.items, {id: Date.now(), name: '', qty: 1, price: 0}]})} className="w-full bg-blue-600 text-white py-2 rounded font-bold mb-4">+ Tambah Item</button>
                 {data.items.map((item, idx) => (
                   <div key={item.id} className="bg-slate-50 p-2 rounded mb-2 relative">
                      <input type="text" className="w-full mb-2 p-1 border rounded text-xs" value={item.name} onChange={e => {
                        const newItems = [...data.items]; newItems[idx].name = e.target.value; setData({...data, items: newItems});
                      }} />
                      <div className="flex gap-2">
                        <input type="number" className="w-16 p-1 border rounded text-xs" value={item.qty} onChange={e => {
                          const newItems = [...data.items]; newItems[idx].qty = parseInt(e.target.value) || 0; setData({...data, items: newItems});
                        }} />
                        <input type="number" className="flex-1 p-1 border rounded text-xs" value={item.price} onChange={e => {
                          const newItems = [...data.items]; newItems[idx].price = parseInt(e.target.value) || 0; setData({...data, items: newItems});
                        }} />
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* PREVIEW */}
        <div className={`flex-1 bg-slate-200/50 rounded-xl overflow-y-auto p-4 flex flex-col items-center ${mobileMode === 'editor' ? 'hidden md:flex' : 'flex'}`}>
           <div className="shadow-2xl origin-top scale-[0.4] sm:scale-[0.6] md:scale-[0.8] lg:scale-100" style={{width: dims.w, minHeight: dims.h, background:'white'}}>
              {/* Konten Dokumen Sederhana untuk Test Build */}
              <div className="p-10">
                 <h1 className="text-4xl font-black">{activeDocType.toUpperCase()}</h1>
                 <p className="mt-4">Penerbit: {data.senderName}</p>
                 <table className="w-full mt-10 border-collapse">
                    <tr className="border-b-2 border-black font-bold"><td>Item</td><td>Total</td></tr>
                    {data.items.map(i => <tr key={i.id}><td>{i.name}</td><td>{i.qty * i.price}</td></tr>)}
                 </table>
                 <h2 className="text-2xl mt-10 font-bold">Total: Rp {total.toLocaleString()}</h2>
              </div>
           </div>
        </div>
      </main>

      <DocumentServices showDonation={showDonation} setShowDonation={setShowDonation} />
      
      {/* MOBILE TOGGLE */}
      <div className="fixed bottom-4 left-4 right-4 md:hidden flex gap-2 no-print">
         <button onClick={() => setMobileMode('editor')} className={`flex-1 p-3 rounded-xl font-bold ${mobileMode === 'editor' ? 'bg-slate-900 text-white' : 'bg-white'}`}>Editor</button>
         <button onClick={() => setMobileMode('preview')} className={`flex-1 p-3 rounded-xl font-bold ${mobileMode === 'preview' ? 'bg-blue-600 text-white' : 'bg-white'}`}>Preview</button>
      </div>
    </div>
  );
}
