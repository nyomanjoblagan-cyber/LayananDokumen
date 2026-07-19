'use client';
import { useFormSync } from '@/lib/useFormSync';


import React, { useState, Suspense, useEffect } from 'react';
import { 
    Printer, ArrowLeftCircle, Edit3, RotateCcw, 
    Plus, Trash2, User, UserCheck, MapPin, Package, Scale, FileText, CheckCircle
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface HandoverItem {
  id: string;
  name: string;
  quantity: string;
  remarks: string;
}

interface BastData {
  day: string;
  date: string;
  city: string;
  
  // Pihak 1 (Yang Menyerahkan)
  p1Name: string; p1Nik: string; p1Ttl: string; p1Job: string; p1Address: string; 
  
  // Pihak 2 (Yang Menerima)
  p2Name: string; p2Nik: string; p2Ttl: string; p2Job: string; p2Address: string;
  
  // Detail Serah Terima
  handoverType: string;
  items: HandoverItem[];

  // Klausul Tambahan
  warrantyPeriode: string;
  disputeResolution: 'pengadilan' | 'arbitrase' | 'musyawarah';
  courtCity: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: BastData = {
  day: 'Jumat',
  date: '2026-07-10', 
  city: 'Jakarta Selatan',
  
  p1Name: 'BAMBANG SUDARSO', p1Nik: '3404010101740001', p1Ttl: 'Bandung, 12 Agustus 1974', p1Job: 'Manager Operasional', p1Address: 'Jl. Sudirman No. 10, RT 001/RW 002, Kel. Senayan, Kec. Kebayoran Baru, Jakarta Selatan', 
  
  p2Name: 'ANDI PRATAMA', p2Nik: '3471010101960002', p2Ttl: 'Jakarta, 05 November 1996', p2Job: 'Direktur Utama', p2Address: 'Jl. Thamrin No. 20, RT 005/RW 003, Kel. Gondangdia, Kec. Menteng, Jakarta Pusat',
  
  handoverType: 'Barang',
  items: [
    { id: '1', name: 'Laptop Lenovo Thinkpad T14 Gen 3', quantity: '1 Unit', remarks: 'Kondisi Baru (Segel pabrik)' },
    { id: '2', name: 'Mouse Wireless Logitech M330', quantity: '1 Unit', remarks: 'Warna Hitam, Kondisi Baru' }
  ],
  warrantyPeriode: '14',
  disputeResolution: 'pengadilan',
  courtCity: 'Jakarta Selatan'
};

// --- 3. KOMPONEN KERTAS MUTLAK (LEGAL FORMAL) ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black font-serif leading-relaxed text-[11pt] box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto">
    {children}
  </div>
);

const IdentityRow = ({ label, value }: { label: string, value: string }) => (
  <div className="flex mb-1">
     <div className="w-48 shrink-0">{label}</div>
     <div className="w-4 shrink-0">:</div>
     <div className="flex-1 font-bold uppercase">{value}</div>
  </div>
);

const ClauseItem = ({ num, text }: { num: string, text: React.ReactNode }) => (
  <div className="flex text-justify mb-2">
     <div className="w-8 shrink-0 font-bold">{num}.</div>
     <div className="flex-1">{text}</div>
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function BastPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor BAST...</div>}>
      <BastBuilder />
    </Suspense>
  );
}

function BastBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useFormSync<BastData>(INITIAL_DATA);

  useEffect(() => setIsClient(true), []);

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke setelan awal?')) {
        setData(INITIAL_DATA);
    }
  };

  const handleStringChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleItemChange = (id: string, field: keyof HandoverItem, value: string) => {
    setData({ ...data, items: data.items.map(item => item.id === id ? { ...item, [field]: value } : item) });
  };
  const addItem = () => {
    setData({ ...data, items: [...data.items, { id: Date.now().toString(), name: '', quantity: '', remarks: '' }] });
  };
  const removeItem = (id: string) => {
    setData({ ...data, items: data.items.filter(item => item.id !== id) });
  };

  const formatDateSafe = (dateString: string) => {
      if(!dateString) return '...';
      return new Date(dateString).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
  };

  const DocumentContent = () => (
    <Kertas>
      {/* HEADER */}
      <div className="text-center mb-10 pb-2 border-b-[3px] border-black border-double break-inside-avoid">
          <h1 className="font-bold text-[14pt] uppercase tracking-wider underline underline-offset-4">BERITA ACARA SERAH TERIMA</h1>
          <h2 className="font-bold text-[12pt] uppercase tracking-wider mt-1">{data.handoverType.toUpperCase()}</h2>
      </div>
      
      {/* PREAMBLE */}
      <div className="mb-6 text-justify">
          <p>
              Pada hari ini, <strong>{data.day}</strong>, tanggal <strong>{formatDateSafe(data.date)}</strong>, bertempat di <strong>{data.city}</strong>, yang bertanda tangan di bawah ini:
          </p>
      </div>

      {/* IDENTITAS PARA PIHAK */}
      <div className="pl-4 space-y-4 mb-6">
          <div className="flex break-inside-avoid">
              <div className="w-8 shrink-0 font-bold">I.</div>
              <div className="flex-1">
                  <IdentityRow label="Nama Lengkap" value={data.p1Name} />
                  <IdentityRow label="NIK" value={data.p1Nik} />
                  <IdentityRow label="Tempat, Tgl Lahir" value={data.p1Ttl} />
                  <IdentityRow label="Pekerjaan / Jabatan" value={data.p1Job} />
                  <IdentityRow label="Alamat Lengkap" value={data.p1Address} />
                  <div className="mt-2 text-justify">
                    Dalam hal ini bertindak sebagai pihak yang menyerahkan, selanjutnya disebut sebagai <strong>PIHAK PERTAMA</strong>.
                  </div>
              </div>
          </div>
          <div className="flex break-inside-avoid mt-6">
              <div className="w-8 shrink-0 font-bold">II.</div>
              <div className="flex-1">
                  <IdentityRow label="Nama Lengkap" value={data.p2Name} />
                  <IdentityRow label="NIK" value={data.p2Nik} />
                  <IdentityRow label="Tempat, Tgl Lahir" value={data.p2Ttl} />
                  <IdentityRow label="Pekerjaan / Jabatan" value={data.p2Job} />
                  <IdentityRow label="Alamat Lengkap" value={data.p2Address} />
                  <div className="mt-2 text-justify">
                    Dalam hal ini bertindak sebagai pihak yang menerima, selanjutnya disebut sebagai <strong>PIHAK KEDUA</strong>.
                  </div>
              </div>
          </div>
      </div>

      <div className="mb-6 text-justify">
          <p>
              PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama selanjutnya disebut sebagai <strong>PARA PIHAK</strong>. PARA PIHAK dengan ini menerangkan dan menyatakan telah sepakat untuk melakukan serah terima {data.handoverType} dengan rincian dan ketentuan sebagai berikut:
          </p>
      </div>

      {/* PASAL 1 - OBJEK SERAH TERIMA */}
      <div className="mb-6 break-inside-avoid">
          <h3 className="font-bold text-center underline mb-4">PASAL 1 : OBJEK SERAH TERIMA</h3>
          <p className="text-justify mb-2">PIHAK PERTAMA telah menyerahkan kepada PIHAK KEDUA, dan PIHAK KEDUA telah menerima dari PIHAK PERTAMA berupa {data.handoverType.toLowerCase()} dengan rincian:</p>
          <table className="w-full border-collapse border border-black text-sm mt-4">
              <thead>
                  <tr className="bg-gray-100">
                      <th className="border border-black p-2 w-10 text-center">No</th>
                      <th className="border border-black p-2">Nama / Deskripsi {data.handoverType}</th>
                      <th className="border border-black p-2 w-32 text-center">Kuantitas</th>
                      <th className="border border-black p-2 w-48">Keterangan</th>
                  </tr>
              </thead>
              <tbody>
                  {data.items.map((item, index) => (
                      <tr key={item.id}>
                          <td className="border border-black p-2 text-center">{index + 1}</td>
                          <td className="border border-black p-2">{item.name}</td>
                          <td className="border border-black p-2 text-center">{item.quantity}</td>
                          <td className="border border-black p-2">{item.remarks}</td>
                      </tr>
                  ))}
                  {data.items.length === 0 && (
                      <tr>
                          <td colSpan={4} className="border border-black p-4 text-center italic text-gray-500">Tidak ada item ditambahkan</td>
                      </tr>
                  )}
              </tbody>
          </table>
      </div>

      {/* PASAL 2 - PERALIHAN TANGGUNG JAWAB */}
      <div className="mb-6 break-inside-avoid">
          <h3 className="font-bold text-center underline mb-4">PASAL 2 : PERALIHAN TANGGUNG JAWAB</h3>
          <ClauseItem num="1" text={`Sejak ditandatanganinya Berita Acara Serah Terima ini, maka segala risiko, tanggung jawab, keamanan, dan perawatan atas objek serah terima sebagaimana dimaksud dalam Pasal 1 beralih sepenuhnya dari PIHAK PERTAMA menjadi tanggung jawab mutlak PIHAK KEDUA.`} />
          <ClauseItem num="2" text={`PIHAK PERTAMA membebaskan diri dari segala tuntutan hukum yang berkaitan dengan kerusakan, kehilangan, atau penyalahgunaan objek tersebut setelah proses serah terima ini selesai.`} />
          {data.warrantyPeriode && parseInt(data.warrantyPeriode) > 0 && (
              <ClauseItem num="3" text={<span>PIHAK PERTAMA memberikan jaminan/garansi terhadap fungsi teknis dari objek serah terima selama <strong>{data.warrantyPeriode} hari kalender</strong> terhitung sejak tanggal dokumen ini ditandatangani, dengan catatan kerusakan bukan disebabkan oleh kelalaian (<em>human error</em>) PIHAK KEDUA.</span>} />
          )}
      </div>

      {/* PASAL 3 - PENYELESAIAN SENGKETA */}
      <div className="mb-8 break-inside-avoid">
          <h3 className="font-bold text-center underline mb-4">PASAL 3 : PENYELESAIAN SENGKETA</h3>
          <p className="text-justify indent-8">
              Apabila di kemudian hari terjadi perselisihan atau perbedaan penafsiran sehubungan dengan Berita Acara Serah Terima ini, PARA PIHAK sepakat untuk menyelesaikannya secara musyawarah mufakat. Apabila musyawarah tidak mencapai kesepakatan, maka PARA PIHAK sepakat untuk menyelesaikannya melalui <strong>{data.disputeResolution === 'pengadilan' ? 'Kepaniteraan Pengadilan Negeri' : data.disputeResolution === 'arbitrase' ? 'Badan Arbitrase Nasional Indonesia (BANI)' : 'jalur Musyawarah Kekeluargaan'} {data.courtCity && data.disputeResolution !== 'musyawarah' ? `di ${data.courtCity}` : ''}</strong>.
          </p>
      </div>

      {/* PENUTUP & TANDA TANGAN */}
      <div className="break-inside-avoid">
          <p className="text-justify mb-12">
              Demikian Berita Acara Serah Terima ini dibuat dan ditandatangani oleh PARA PIHAK dalam keadaan sehat jasmani dan rohani, tanpa adanya unsur paksaan dari pihak manapun, dibuat dalam rangkap 2 (dua) yang masing-masing memiliki kekuatan hukum yang sama.
          </p>
          
          <div className="flex justify-between text-center px-8">
              <div className="w-[45%]">
                  <p className="font-bold mb-24 uppercase">PIHAK PERTAMA<br/>Yang Menyerahkan,</p>
                  <p className="font-bold underline uppercase">{data.p1Name}</p>
              </div>
              <div className="w-[45%]">
                  <p className="font-bold mb-24 uppercase">PIHAK KEDUA<br/>Yang Menerima,</p>
                  <p className="font-bold underline uppercase">{data.p2Name}</p>
              </div>
          </div>
      </div>
    </Kertas>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* BULLETPROOF PRINT CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          html, body { height: auto !important; overflow: visible !important; background: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: static !important; width: 100%; background: white; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-[999] border-b border-slate-800 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-purple-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Berita Acara Serah Terima (BAST)</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-300 hidden md:inline-block">
                LEGAL FORMAL FORMAT
            </span>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-purple-600 hover:bg-purple-500 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-900/50 active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-[998] no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'editor' ? 'text-purple-700 border-b-2 border-purple-700 bg-purple-50' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'preview' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50' : 'text-slate-500'}`}>
          <Printer size={16} /> Preview
        </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* EDITOR SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[540px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
            <div className="p-5 bg-white border-b border-slate-200 flex justify-between items-center shrink-0">
                <h2 className="font-black text-slate-800 uppercase tracking-tight text-sm flex items-center gap-2">
                  <FileText size={18} className="text-purple-600" /> Editor BAST
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar pb-32">
                
                {/* 1. LOKASI & TANGGAL */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <MapPin size={14} className="text-sky-600"/> Lokasi & Waktu
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Hari</label>
                        <input type="text" name="day" value={data.day} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal</label>
                        <input type="date" name="date" value={data.date} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota / Lokasi Serah Terima</label>
                      <input type="text" name="city" value={data.city} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                    </div>
                  </div>
                </div>

                {/* 2. PIHAK PERTAMA */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <User size={14} className="text-purple-600"/> Pihak Pertama (Yang Menyerahkan)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                      <input type="text" name="p1Name" value={data.p1Name} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK</label>
                      <input type="text" name="p1Nik" value={data.p1Nik} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat, Tanggal Lahir</label>
                      <input type="text" name="p1Ttl" value={data.p1Ttl} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan / Jabatan</label>
                      <input type="text" name="p1Job" value={data.p1Job} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap</label>
                      <textarea name="p1Address" value={data.p1Address} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"></textarea>
                    </div>
                  </div>
                </div>

                {/* 3. PIHAK KEDUA */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <UserCheck size={14} className="text-emerald-600"/> Pihak Kedua (Yang Menerima)
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                      <input type="text" name="p2Name" value={data.p2Name} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK</label>
                      <input type="text" name="p2Nik" value={data.p2Nik} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat, Tanggal Lahir</label>
                      <input type="text" name="p2Ttl" value={data.p2Ttl} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan / Jabatan</label>
                      <input type="text" name="p2Job" value={data.p2Job} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap</label>
                      <textarea name="p2Address" value={data.p2Address} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"></textarea>
                    </div>
                  </div>
                </div>

                {/* 4. OBJEK SERAH TERIMA */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                    <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2">
                      <Package size={14} className="text-amber-600"/> Objek Serah Terima
                    </h3>
                    <button onClick={addItem} className="text-xs bg-amber-100 text-amber-700 px-3 py-1.5 rounded-lg font-bold hover:bg-amber-200 flex items-center gap-1 transition-colors">
                      <Plus size={14}/> Tambah Barang
                    </button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Objek (Barang / Dokumen / Kendaraan)</label>
                      <input type="text" name="handoverType" value={data.handoverType} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none transition-all" />
                    </div>
                    <div className="space-y-4 pt-2">
                      {data.items.map((item, idx) => (
                        <div key={item.id} className="relative bg-slate-50 border border-slate-200 rounded-xl p-4">
                          <div className="absolute top-3 right-3 flex gap-2">
                            <span className="text-xs font-bold text-slate-400">Item #{idx + 1}</span>
                            <button onClick={() => removeItem(item.id)} className="text-rose-400 hover:text-rose-600 bg-rose-50 hover:bg-rose-100 p-1.5 rounded-lg transition-colors">
                              <Trash2 size={14}/>
                            </button>
                          </div>
                          <div className="space-y-3 pr-10">
                            <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Nama / Deskripsi Objek</label>
                              <input type="text" value={item.name} onChange={(e) => handleItemChange(item.id, 'name', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm font-bold text-slate-800 focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Cth: Laptop Macbook Pro M2" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Kuantitas</label>
                                <input type="text" value={item.quantity} onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 focus:ring-2 focus:ring-amber-500 outline-none" placeholder="1 Unit" />
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Keterangan / Kondisi</label>
                                <input type="text" value={item.remarks} onChange={(e) => handleItemChange(item.id, 'remarks', e.target.value)} className="w-full bg-white border border-slate-200 rounded-lg p-2 text-sm text-slate-800 focus:ring-2 focus:ring-amber-500 outline-none" placeholder="Baik / Baru" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 5. KLAUSUL */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Scale size={14} className="text-teal-600"/> Klausul Hukum
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Garansi / Jaminan (Hari Kalender)</label>
                      <input type="number" name="warrantyPeriode" value={data.warrantyPeriode} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all" placeholder="Kosongkan jika tidak ada garansi" />
                      <p className="text-[10px] text-slate-400 mt-1">Kosongkan atau isi 0 jika serah terima bersifat mutlak tanpa garansi.</p>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Penyelesaian Sengketa</label>
                      <select name="disputeResolution" value={data.disputeResolution} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none">
                        <option value="pengadilan">Pengadilan Negeri</option>
                        <option value="arbitrase">Badan Arbitrase Nasional Indonesia (BANI)</option>
                        <option value="musyawarah">Musyawarah Kekeluargaan (Tanpa Pengadilan)</option>
                      </select>
                    </div>
                    {data.disputeResolution !== 'musyawarah' && (
                        <div>
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota / Lokasi Pengadilan/Arbitrase</label>
                          <input type="text" name="courtCity" value={data.courtCity} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none transition-all" />
                        </div>
                    )}
                  </div>
                </div>

            </div>
        </aside>

        {/* PREVIEW AREA (BULLETPROOF PRINT TARGET) */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           {/* Paywall Monetisasi - Diletakkan di luar print flow */}
           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName="Berita Acara Serah Terima (BAST)" price={5000} />
           </div>

        </div>
      </main>
    </div>
  );
}
