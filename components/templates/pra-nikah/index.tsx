'use client';
import { useFormSync } from '@/lib/useFormSync';
import React, { useState, Suspense } from 'react';
import { Printer, ArrowLeftCircle, Edit3, Eye, RotateCcw, UserCircle2, Briefcase, Gem, Users, UserPlus } from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

const INITIAL_DATA = {
  city: 'Jakarta',
  date: new Date().toISOString().split('T')[0],
  day: 'Sabtu',
  
  // PIHAK PERTAMA (Calon Suami)
  p1Name: 'Arif Rahman',
  p1Nik: '3171234567890001',
  p1Job: 'Karyawan Swasta',
  p1Address: 'Jl. Melati No. 10, Jakarta Selatan',

  // PIHAK KEDUA (Calon Istri)
  p2Name: 'Ayu Lestari',
  p2Nik: '3179876543210002',
  p2Job: 'Dokter',
  p2Address: 'Jl. Mawar No. 5, Jakarta Pusat',

  // DETAIL PERJANJIAN
  marriageDate: '2026-10-15',
  p1Assets: '1 Unit Rumah di Jakarta Selatan, 1 Unit Mobil Honda HRV',
  p2Assets: '1 Unit Apartemen di Jakarta Pusat, Deposito senilai Rp 100.000.000',

  // SAKSI
  witness1: 'Bambang (Ayah Calon Suami)', 
  witness2: 'Sutrisno (Ayah Calon Istri)'
};

const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[10pt]">
    {children}
  </div>
);

export default function PraNikahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Sistem...</div>}>
      <PraNikahBuilder />
    </Suspense>
  );
}

function PraNikahBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState('pihak');
  
  const [data, setData] = useFormSync(INITIAL_DATA);
  const handleDataChange = (field: string, val: any) => setData((prev: any) => ({ ...prev, [field]: val }));
  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        setData(INITIAL_DATA);
    }
  };

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try { return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}); } 
        catch { return dateString; }
    };

    return (
      <Kertas>
        <div className="text-center mb-6">
            <h1 className="font-bold text-lg uppercase underline tracking-wide">SURAT PERJANJIAN PRA-NIKAH<br/>(PRENUPTIAL AGREEMENT)</h1>
        </div>

        <p className="mb-4 text-justify">
            Pada hari ini, <strong>{data.day}</strong> tanggal <strong>{formatDateSafe(data.date)}</strong> di <strong>{data.city}</strong>, yang bertanda tangan di bawah ini:
        </p>

        {/* PIHAK PERTAMA */}
        <div className="mb-4 ml-4">
            <p className="font-bold mb-2 underline">PIHAK PERTAMA (CALON SUAMI)</p>
            <div className="ml-4 space-y-1">
                <div className="flex"><div className="w-40">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.p1Name}</div></div>
                <div className="flex"><div className="w-40">NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.p1Nik}</div></div>
                <div className="flex"><div className="w-40">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.p1Job}</div></div>
                <div className="flex"><div className="w-40">Alamat Lengkap</div><div className="w-4">:</div><div className="flex-1">{data.p1Address}</div></div>
            </div>
        </div>

        {/* PIHAK KEDUA */}
        <div className="mb-4 ml-4">
            <p className="font-bold mb-2 underline">PIHAK KEDUA (CALON ISTRI)</p>
            <div className="ml-4 space-y-1">
                <div className="flex"><div className="w-40">Nama Lengkap</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.p2Name}</div></div>
                <div className="flex"><div className="w-40">NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.p2Nik}</div></div>
                <div className="flex"><div className="w-40">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.p2Job}</div></div>
                <div className="flex"><div className="w-40">Alamat Lengkap</div><div className="w-4">:</div><div className="flex-1">{data.p2Address}</div></div>
            </div>
        </div>

        <p className="mb-4 text-justify">
            PARA PIHAK akan melangsungkan pernikahan pada tanggal <strong>{formatDateSafe(data.marriageDate)}</strong>. Guna menjamin ketertiban dan kepastian hukum mengenai harta kekayaan yang didapat sebelum dan sesudah pernikahan, PARA PIHAK sepakat untuk membuat Perjanjian Pra-Nikah dengan ketentuan sebagai berikut:
        </p>

        <div className="text-center font-bold mb-2 mt-4">Pasal 1<br/>PEMISAHAN HARTA BAWAAN</div>
        <p className="text-justify mb-2">
            1. Seluruh harta kekayaan, baik harta bergerak maupun tidak bergerak, yang diperoleh masing-masing pihak <strong>sebelum</strong> berlangsungnya pernikahan tetap menjadi hak milik penuh masing-masing pihak (Harta Bawaan).
        </p>
        <p className="text-justify mb-2">
            2. Rincian Harta Bawaan PIHAK PERTAMA meliputi: <strong>{data.p1Assets}</strong>, serta aset lainnya yang tidak disebutkan.
        </p>
        <p className="text-justify mb-4">
            3. Rincian Harta Bawaan PIHAK KEDUA meliputi: <strong>{data.p2Assets}</strong>, serta aset lainnya yang tidak disebutkan.
        </p>

        <div className="text-center font-bold mb-2 mt-4">Pasal 2<br/>PEMISAHAN HUTANG PIUTANG</div>
        <p className="text-justify mb-4">
            Seluruh hutang dan kewajiban finansial yang timbul atas nama masing-masing pihak, baik sebelum maupun sesudah pernikahan (kecuali disepakati tertulis untuk kebutuhan rumah tangga bersama), menjadi tanggung jawab penuh masing-masing pihak yang meminjam. Pihak lainnya tidak dapat dituntut atau dibebani kewajiban atas hutang tersebut.
        </p>

        <div className="text-center font-bold mb-2 mt-4">Pasal 3<br/>HARTA BERSAMA (GONO GINI)</div>
        <p className="text-justify mb-4">
            Harta kekayaan yang diperoleh PARA PIHAK <strong>setelah</strong> berlangsungnya pernikahan yang ditujukan untuk kepentingan keluarga secara bersama-sama akan menjadi Harta Bersama (Gono Gini). Namun demikian, hasil dari pengelolaan Harta Bawaan (seperti uang sewa, deviden, bunga deposito dari Harta Bawaan) tetap menjadi hak sepenuhnya dari pemilik Harta Bawaan tersebut.
        </p>

        <div className="text-center font-bold mb-2 mt-4">Pasal 4<br/>PENGESAHAN PERJANJIAN</div>
        <p className="text-justify mb-4">
            Surat Perjanjian Pra-Nikah ini akan dicatatkan pada Kantor Urusan Agama (KUA) atau Kantor Catatan Sipil tempat perkawinan dilangsungkan agar sah secara hukum berdasarkan ketentuan Undang-Undang No. 1 Tahun 1974 tentang Perkawinan jo. Putusan Mahkamah Konstitusi No. 69/PUU-XIII/2015.
        </p>

        <p className="mb-6 text-justify mt-8">
            Demikian Perjanjian Pra-Nikah ini dibuat dalam keadaan sehat, tanpa paksaan dari pihak manapun, dibuat rangkap 2 (dua) bermeterai cukup dan memiliki kekuatan hukum yang sama.
        </p>

        {/* TANDA TANGAN */}
        <div className="flex justify-between mt-12 mb-16 text-center break-inside-avoid">
            <div className="w-1/2">
                <p className="mb-24">PIHAK PERTAMA<br/><span className="text-[10px]">(Calon Suami)</span></p>
                <p className="font-bold underline uppercase">{data.p1Name}</p>
            </div>
            <div className="w-1/2">
                <p className="mb-24">PIHAK KEDUA<br/><span className="text-[10px]">(Calon Istri)</span></p>
                <p className="font-bold underline uppercase">{data.p2Name}</p>
            </div>
        </div>

        <div className="mt-4 mb-4 text-center font-bold underline break-inside-avoid">SAKSI-SAKSI</div>
        <div className="flex justify-between text-center break-inside-avoid mb-10">
            <div className="w-1/2">
                <p className="mb-24">Saksi 1</p>
                <p className="font-bold underline uppercase">{data.witness1}</p>
            </div>
            <div className="w-1/2">
                <p className="mb-24">Saksi 2</p>
                <p className="font-bold underline uppercase">{data.witness2}</p>
            </div>
        </div>

      </Kertas>
    );
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans">
      <div className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 md:px-8 shrink-0 shadow-sm z-50 no-print">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-500 hover:text-sky-600 transition-colors"><ArrowLeftCircle size={24} /></Link>
            <h1 className="font-black text-slate-800 text-sm md:text-lg tracking-tight flex items-center gap-2">PRA-NIKAH (PRENUP)</h1>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-sky-600 hover:bg-sky-500 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-900/50 active:scale-95 flex items-center gap-2 transition-all text-white">
            <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
          </button>
      </div>

      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-[998] no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'editor' ? 'text-sky-700 border-b-2 border-sky-700 bg-sky-50' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'preview' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50' : 'text-slate-500'}`}>
          <Eye size={16} /> Preview
        </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[540px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
            <div className="p-5 bg-white border-b border-slate-200 flex justify-between items-center shrink-0">
                <div className="flex bg-slate-100 p-1 rounded-xl">
                  <button onClick={() => setActiveTab('pihak')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'pihak' ? 'bg-white shadow-sm text-sky-700' : 'text-slate-500 hover:text-slate-700'}`}>Pihak</button>
                  <button onClick={() => setActiveTab('harta')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'harta' ? 'bg-white shadow-sm text-emerald-700' : 'text-slate-500 hover:text-slate-700'}`}>Harta Bawaan</button>
                </div>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg"><RotateCcw size={16}/></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar pb-32">
              {activeTab === 'pihak' && (
                 <>
                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100"><UserCircle2 size={14} className="text-sky-600"/> Pihak Calon Suami</h3>
                      <div className="space-y-4">
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Nama Lengkap</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold text-sky-800 focus:bg-white focus:ring-2 outline-none" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">NIK</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 outline-none" value={data.p1Nik} onChange={e => handleDataChange('p1Nik', e.target.value)} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Pekerjaan</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 outline-none" value={data.p1Job} onChange={e => handleDataChange('p1Job', e.target.value)} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Alamat</label><textarea className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm h-16 focus:bg-white focus:ring-2 outline-none" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} /></div>
                      </div>
                   </div>
                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100"><Users size={14} className="text-rose-600"/> Pihak Calon Istri</h3>
                      <div className="space-y-4">
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Nama Lengkap</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold text-rose-800 focus:bg-white focus:ring-2 outline-none" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">NIK</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 outline-none" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Pekerjaan</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 outline-none" value={data.p2Job} onChange={e => handleDataChange('p2Job', e.target.value)} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Alamat</label><textarea className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm h-16 focus:bg-white focus:ring-2 outline-none" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} /></div>
                      </div>
                   </div>
                 </>
              )}

              {activeTab === 'harta' && (
                 <>
                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100"><Gem size={14} className="text-emerald-600"/> Rincian Harta & Tanggal Nikah</h3>
                      <div className="space-y-4">
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Rencana Tanggal Perkawinan</label><input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 outline-none" value={data.marriageDate} onChange={e => handleDataChange('marriageDate', e.target.value)} /></div>
                          
                          <div className="border-t border-slate-100 pt-4"></div>

                          <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Harta Bawaan Calon Suami</label>
                              <textarea className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm h-24 focus:bg-white focus:ring-2 outline-none" value={data.p1Assets} onChange={e => handleDataChange('p1Assets', e.target.value)} placeholder="Tuliskan rumah, mobil, saham, tanah, dll" />
                          </div>
                          <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Harta Bawaan Calon Istri</label>
                              <textarea className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm h-24 focus:bg-white focus:ring-2 outline-none" value={data.p2Assets} onChange={e => handleDataChange('p2Assets', e.target.value)} placeholder="Tuliskan emas, tabungan, rumah, bisnis, dll" />
                          </div>
                      </div>
                   </div>
                 </>
              )}
            </div>
        </aside>

        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>
           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName="Surat Perjanjian Pra-Nikah" price={10000} />
           </div>
        </div>
      </main>
    </div>
  );
}
