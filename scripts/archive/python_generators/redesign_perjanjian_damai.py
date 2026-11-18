import sys

def main():
    file_path = r"d:\WEB DESIGN\LayananDokumen\components\templates\perjanjian-damai\index.tsx"
    
    new_content = """'use client';

/**
 * FILE: PerjanjianDamaiPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Perjanjian Perdamaian (Settlement Agreement)
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, 
  HeartHandshake, ShieldAlert, Users, Scale, FileText, User
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface SettlementData {
  day: string;
  date: string;
  city: string;
  
  // Pihak 1 (Pelaku/Penanggung)
  p1Name: string;
  p1Nik: string;
  p1BirthPlace: string;
  p1BirthDate: string;
  p1Job: string;
  p1Address: string;
  
  // Pihak 2 (Korban/Penerima)
  p2Name: string;
  p2Nik: string;
  p2BirthPlace: string;
  p2BirthDate: string;
  p2Job: string;
  p2Address: string;
  
  // Insiden
  incidentTitle: string;
  incidentDate: string;
  incidentDetail: string;
  
  // Kesepakatan
  compensationAmount: string;
  compensationText: string;
  compensationMethod: 'Tunai' | 'Transfer Bank' | 'Cicilan';
  settlementDetail: string;
  
  // Pelarangan & Penalti
  penaltyAmount: string;
  penaltyText: string;
  
  // Saksi
  witness1: string;
  witness2: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: SettlementData = {
  day: 'SENIN',
  date: '2026-08-01', 
  city: 'JAKARTA',
  
  p1Name: 'BUDI SANTOSO', 
  p1Nik: '3171010101780001',
  p1BirthPlace: 'Jakarta',
  p1BirthDate: '1978-01-01',
  p1Job: 'Wiraswasta', 
  p1Address: 'Jl. Merdeka No. 10, RT 01/02, Kelurahan Tebet Barat, Kecamatan Tebet, Jakarta Selatan',
  
  p2Name: 'ANDI WIJAYA', 
  p2Nik: '3171020202920005',
  p2BirthPlace: 'Bandung',
  p2BirthDate: '1992-02-02',
  p2Job: 'Karyawan Swasta', 
  p2Address: 'Jl. Sudirman No. 45, RT 05/03, Kelurahan Karet, Kecamatan Setiabudi, Jakarta Selatan',
  
  incidentTitle: 'Kecelakaan Lalu Lintas',
  incidentDate: '2026-01-05',
  incidentDetail: 'Kecelakaan lalu lintas ringan di area Parkir Mal Senayan yang mengakibatkan kerusakan pada bemper depan mobil Pihak Kedua serta lecet pada pintu samping mobil Pihak Pertama.',
  
  compensationAmount: 'Rp 2.500.000,-',
  compensationText: 'Dua Juta Lima Ratus Ribu Rupiah',
  compensationMethod: 'Tunai',
  settlementDetail: 'Pihak Pertama menanggung seluruh biaya perbaikan kendaraan Pihak Kedua di bengkel resmi sesuai kuitansi yang terlampir.',
  
  penaltyAmount: 'Rp 50.000.000,-',
  penaltyText: 'Lima Puluh Juta Rupiah',
  
  witness1: 'HENDRA SAPUTRA (Ketua RT)', 
  witness2: 'SITI AMINAH (Saksi Mata)'
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[10.5pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function PerjanjianDamaiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <DamaiBuilder />
    </Suspense>
  );
}

function DamaiBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<SettlementData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'info' | 'p1' | 'p2' | 'insiden' | 'damai'>('info');

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    const days = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
    const currentDay = days[new Date().getDay()];
    setData(prev => ({ ...prev, date: today, day: currentDay }));
  }, []);

  const handleChange = (field: keyof SettlementData, val: string) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir perjanjian damai?')) {
        const today = new Date().toISOString().split('T')[0];
        const days = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];
        const currentDay = days[new Date().getDay()];
        setData({ ...INITIAL_DATA, date: today, day: currentDay });
    }
  };

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try { return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}); } catch { return dateString; }
    };

    return (
      <Kertas>
        {/* HEADER / JUDUL */}
        <div className="text-center mb-8 break-inside-avoid">
            <h1 className="font-bold text-lg tracking-wider uppercase underline">SURAT PERJANJIAN PERDAMAIAN</h1>
            <p className="mt-1 font-mono text-sm">(SETTLEMENT AGREEMENT)</p>
        </div>

        {/* PEMBUKA */}
        <div className="mb-6 text-justify break-inside-avoid">
            <p>
                Pada hari ini, <strong>{data.day}</strong> tanggal <strong>{formatDateSafe(data.date)}</strong> bertempat di <strong>{data.city}</strong>, dibuat dan ditandatangani Kesepakatan Perdamaian oleh dan antara pihak-pihak di bawah ini:
            </p>
        </div>

        {/* PIHAK PERTAMA */}
        <div className="mb-4 break-inside-avoid">
            <h3 className="font-bold mb-2">I. PIHAK PERTAMA (PIHAK PENANGGUNG)</h3>
            <div className="ml-6">
                <div className="flex mb-1"><div className="w-48">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.p1Name}</div></div>
                <div className="flex mb-1"><div className="w-48">Nomor Induk Kependudukan</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.p1Nik}</div></div>
                <div className="flex mb-1"><div className="w-48">Tempat, Tanggal Lahir</div><div className="w-4">:</div><div className="flex-1">{data.p1BirthPlace}, {formatDateSafe(data.p1BirthDate)}</div></div>
                <div className="flex mb-1"><div className="w-48">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.p1Job}</div></div>
                <div className="flex mb-1"><div className="w-48 align-top">Alamat Domisili</div><div className="w-4 align-top">:</div><div className="flex-1 text-justify">{data.p1Address}</div></div>
            </div>
        </div>

        {/* PIHAK KEDUA */}
        <div className="mb-6 break-inside-avoid">
            <h3 className="font-bold mb-2">II. PIHAK KEDUA (PIHAK KORBAN / PENERIMA)</h3>
            <div className="ml-6">
                <div className="flex mb-1"><div className="w-48">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.p2Name}</div></div>
                <div className="flex mb-1"><div className="w-48">Nomor Induk Kependudukan</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.p2Nik}</div></div>
                <div className="flex mb-1"><div className="w-48">Tempat, Tanggal Lahir</div><div className="w-4">:</div><div className="flex-1">{data.p2BirthPlace}, {formatDateSafe(data.p2BirthDate)}</div></div>
                <div className="flex mb-1"><div className="w-48">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.p2Job}</div></div>
                <div className="flex mb-1"><div className="w-48 align-top">Alamat Domisili</div><div className="w-4 align-top">:</div><div className="flex-1 text-justify">{data.p2Address}</div></div>
            </div>
        </div>

        <div className="mb-6 text-justify break-inside-avoid">
            <p>
                Pihak Pertama dan Pihak Kedua secara bersama-sama selanjutnya disebut "Para Pihak". 
                Bahwa sehubungan dengan terjadinya insiden <strong>{data.incidentTitle}</strong> pada tanggal <strong>{formatDateSafe(data.incidentDate)}</strong>, 
                Para Pihak dengan iktikad baik dan tanpa adanya paksaan dari pihak mana pun telah sepakat untuk menyelesaikan permasalahan tersebut secara kekeluargaan (Mediasi Penal/Perdata) 
                dengan ketentuan dan syarat-syarat sebagai berikut:
            </p>
        </div>

        {/* PASAL 1 - KRONOLOGI */}
        <div className="mb-4 text-justify break-inside-avoid">
            <h3 className="font-bold text-center mb-1">Pasal 1<br/>PENGAKUAN DAN KRONOLOGI KEJADIAN</h3>
            <p>
                Bahwa Pihak Pertama mengakui telah terjadi insiden yang merugikan Pihak Kedua dengan rincian kronologi sebagai berikut: 
                "{data.incidentDetail}". Atas kejadian tersebut, Pihak Pertama menyampaikan permohonan maaf yang sebesar-besarnya dan Pihak Kedua telah menerima permohonan maaf tersebut.
            </p>
        </div>

        {/* PASAL 2 - KOMPENSASI */}
        <div className="mb-4 text-justify break-inside-avoid">
            <h3 className="font-bold text-center mb-1">Pasal 2<br/>BENTUK PENYELESAIAN DAN KOMPENSASI</h3>
            <p>
                Sebagai bentuk itikad baik dan tanggung jawab penuh, Pihak Pertama sepakat untuk memberikan kompensasi ganti rugi (restitusi) kepada Pihak Kedua berupa uang sejumlah <strong>{data.compensationAmount}</strong> <em>({data.compensationText})</em> yang diserahkan secara <strong>{data.compensationMethod}</strong>.
            </p>
            <p className="mt-2">
                Selain itu, Para Pihak juga menyepakati penyelesaian tambahan sebagai berikut: "{data.settlementDetail}".
            </p>
        </div>

        {/* PASAL 3 - PELARANGAN TUNTUTAN HUKUM */}
        <div className="mb-4 text-justify break-inside-avoid">
            <h3 className="font-bold text-center mb-1">Pasal 3<br/>PELEPASAN HAK TUNTUTAN (RELEASE AND WAIVER)</h3>
            <p>
                Dengan ditandatanganinya Perjanjian Perdamaian ini dan diserahkannya kompensasi sebagaimana dimaksud dalam Pasal 2, maka Pihak Kedua menyatakan permasalahan ini telah <strong>SELESAI SECARA TUNTAS</strong>. Pihak Kedua melepaskan segala haknya untuk mengajukan tuntutan hukum di kemudian hari, baik secara perdata, pidana, maupun pelaporan ke instansi kepolisian (Pencabutan Laporan/Restorative Justice).
            </p>
        </div>

        {/* PASAL 4 - SANKSI / PENALTI */}
        <div className="mb-6 text-justify break-inside-avoid">
            <h3 className="font-bold text-center mb-1">Pasal 4<br/>KLAUSUL PELANGGARAN DAN DENDA (PENALTY)</h3>
            <p>
                Apabila di kemudian hari salah satu pihak melanggar atau mengingkari isi dari Kesepakatan Perdamaian ini, termasuk mengungkit kembali permasalahan yang telah diselesaikan atau melakukan tindakan pencemaran nama baik, maka pihak yang melanggar bersedia dikenakan sanksi denda sebesar <strong>{data.penaltyAmount}</strong> <em>({data.penaltyText})</em> yang wajib dibayarkan seketika dan sekaligus kepada pihak yang dirugikan, tanpa mengurangi hak untuk menempuh jalur hukum sesuai peraturan perundang-undangan yang berlaku.
            </p>
        </div>

        {/* PENUTUP */}
        <div className="mb-12 text-justify break-inside-avoid">
            <p>
                Demikian Surat Perjanjian Perdamaian ini dibuat dalam rangkap 2 (dua), masing-masing bermeterai cukup dan memiliki kekuatan hukum pembuktian yang sama, ditandatangani oleh Para Pihak dan disaksikan oleh saksi-saksi dalam keadaan sadar dan tanpa tekanan dari pihak manapun.
            </p>
        </div>

        {/* TANDA TANGAN */}
        <div className="flex justify-between text-center break-inside-avoid px-4 mt-8">
            <div className="w-56">
                <p className="mb-2 font-bold uppercase">PIHAK PERTAMA<br/>(Penanggung)</p>
                <div className="h-4"></div>
                <div className="w-24 h-12 border border-dashed border-gray-400 mx-auto text-[9px] text-gray-400 flex items-center justify-center">Meterai 10.000</div>
                <div className="h-4"></div>
                <p className="font-bold underline uppercase">{data.p1Name}</p>
            </div>
            
            <div className="w-56">
                <p className="mb-2 font-bold uppercase">PIHAK KEDUA<br/>(Korban / Penerima)</p>
                <div className="h-4"></div>
                <div className="w-24 h-12 border border-dashed border-gray-400 mx-auto text-[9px] text-gray-400 flex items-center justify-center">Meterai 10.000</div>
                <div className="h-4"></div>
                <p className="font-bold underline uppercase">{data.p2Name}</p>
            </div>
        </div>

        {/* SAKSI */}
        <div className="mt-12 break-inside-avoid text-center">
            <p className="font-bold uppercase mb-8">SAKSI - SAKSI:</p>
            <div className="flex justify-around px-12">
                <div className="w-48">
                    <p className="mb-16">Saksi 1</p>
                    <p className="font-bold underline uppercase">{data.witness1}</p>
                </div>
                <div className="w-48">
                    <p className="mb-16">Saksi 2</p>
                    <p className="font-bold underline uppercase">{data.witness2}</p>
                </div>
            </div>
        </div>

      </Kertas>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* GLOBAL CSS PRINT */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          html, body { height: auto !important; overflow: visible !important; background: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: static !important; width: 100%; background: white; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-[999] border-b border-slate-800 h-16 flex items-center px-4 justify-between font-sans shrink-0">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-pink-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Perjanjian Damai</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-pink-600 hover:bg-pink-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-pink-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[600px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-pink-600" /> Draft Perjanjian</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('info')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'info' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>1. Info & Saksi</button>
                <button onClick={() => setActiveTab('p1')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'p1' ? 'bg-white border-t-2 border-rose-500 text-rose-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Pihak Pertama</button>
                <button onClick={() => setActiveTab('p2')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'p2' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. Pihak Kedua</button>
                <button onClick={() => setActiveTab('insiden')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'insiden' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>4. Kronologi</button>
                <button onClick={() => setActiveTab('damai')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'damai' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>5. Ganti Rugi</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'info' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <FileText size={14} className="text-slate-600"/> Informasi Penandatanganan
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Tempat Damai</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.city} onChange={e => handleChange('city', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Kesepakatan</label>
                            <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.date} onChange={e => handleChange('date', e.target.value)} />
                        </div>
                    </div>
                    <div className="border-t border-slate-100 my-4"></div>
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Users size={14} className="text-slate-600"/> Data Saksi-Saksi
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Saksi 1</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.witness1} onChange={e => handleChange('witness1', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Saksi 2</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.witness2} onChange={e => handleChange('witness2', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'p1' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-rose-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <User size={14} className="text-rose-600"/> Data Pihak 1 (Pelaku/Penanggung)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                            <input className="w-full bg-rose-50 p-2.5 border border-rose-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.p1Name} onChange={e => handleChange('p1Name', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (KTP)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.p1Nik} onChange={e => handleChange('p1Nik', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.p1Job} onChange={e => handleChange('p1Job', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.p1BirthPlace} onChange={e => handleChange('p1BirthPlace', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.p1BirthDate} onChange={e => handleChange('p1BirthDate', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Domisili KTP</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.p1Address} onChange={e => handleChange('p1Address', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'p2' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <User size={14} className="text-blue-600"/> Data Pihak 2 (Korban/Penerima)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap</label>
                            <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p2Name} onChange={e => handleChange('p2Name', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (KTP)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p2Nik} onChange={e => handleChange('p2Nik', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p2Job} onChange={e => handleChange('p2Job', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p2BirthPlace} onChange={e => handleChange('p2BirthPlace', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Lahir</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p2BirthDate} onChange={e => handleChange('p2BirthDate', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Domisili KTP</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.p2Address} onChange={e => handleChange('p2Address', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'insiden' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <ShieldAlert size={14} className="text-amber-600"/> Kronologi Insiden
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Masalah / Insiden</label>
                                <input className="w-full bg-amber-50 p-2.5 border border-amber-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.incidentTitle} onChange={e => handleChange('incidentTitle', e.target.value)} placeholder="Contoh: Kecelakaan Lalu Lintas" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Kejadian</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.incidentDate} onChange={e => handleChange('incidentDate', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Rincian Kronologi & Kerugian</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-32 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none text-justify" value={data.incidentDetail} onChange={e => handleChange('incidentDetail', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'damai' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <HeartHandshake size={14} className="text-emerald-600"/> Kesepakatan & Ganti Rugi
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nominal Ganti Rugi</label>
                                <input className="w-full bg-emerald-50 text-emerald-900 p-2.5 border border-emerald-200 rounded-xl text-sm font-black font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.compensationAmount} onChange={e => handleChange('compensationAmount', e.target.value)} placeholder="Rp 5.000.000,-" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Metode Pembayaran</label>
                                <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.compensationMethod} onChange={e => handleChange('compensationMethod', e.target.value)}>
                                    <option value="Tunai">Tunai / Cash</option>
                                    <option value="Transfer Bank">Transfer Bank</option>
                                    <option value="Cicilan">Cicilan Tertulis</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Terbilang (Teks Rupiah)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm italic focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.compensationText} onChange={e => handleChange('compensationText', e.target.value)} placeholder="Lima Juta Rupiah" />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kewajiban Tambahan (Perbaikan/Biaya RS dll)</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.settlementDetail} onChange={e => handleChange('settlementDetail', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 my-4"></div>
                        <h4 className="text-[10px] font-bold text-rose-700 uppercase tracking-wider mb-2">Sanksi Pelanggaran Perjanjian (Wanprestasi)</h4>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nominal Penalti (Denda)</label>
                                <input className="w-full bg-rose-50 text-rose-900 p-2.5 border border-rose-200 rounded-xl text-sm font-bold font-mono focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.penaltyAmount} onChange={e => handleChange('penaltyAmount', e.target.value)} placeholder="Rp 50.000.000,-" />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Terbilang (Teks Denda)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm italic focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.penaltyText} onChange={e => handleChange('penaltyText', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

            </div>
        </aside>

        {/* PREVIEW AREA */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           {/* Paywall Monetisasi - Diletakkan di luar print flow */}
           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName={`Perjanjian_Damai_${data.p1Name.replace(/\\s+/g, '_')}`} price={65000} />
           </div>

        </div>
      </main>

    </div>
  );
}
"""
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)

if __name__ == "__main__":
    main()
