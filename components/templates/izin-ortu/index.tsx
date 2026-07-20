'use client';
import { useFormSync } from '@/lib/useFormSync';
import React, { useState, Suspense } from 'react';
import { Printer, ArrowLeftCircle, Edit3, Eye, RotateCcw, UserCircle2, Briefcase, Users } from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

const INITIAL_DATA = {
  city: 'Bandung',
  date: new Date().toISOString().split('T')[0],
  
  // PEMBERI IZIN
  p1Name: 'Agus Setiawan',
  p1Birth: 'Bandung, 15 Agustus 1970',
  p1Job: 'Wiraswasta',
  p1Address: 'Jl. Melati No. 12, RT 01/RW 02, Kec. Sukajadi, Kota Bandung',
  p1Relation: 'Orang Tua (Ayah)',

  // YANG DIBERI IZIN
  p2Name: 'Siti Nurhaliza',
  p2Birth: 'Bandung, 20 Oktober 2001',
  p2Gender: 'Perempuan',
  p2Address: 'Jl. Melati No. 12, RT 01/RW 02, Kec. Sukajadi, Kota Bandung',

  // TUJUAN IZIN
  purpose: 'Bekerja / Magang',
  companyName: 'PT. Maju Mundur Sejahtera',
  location: 'Cikarang, Jawa Barat',
};

const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[11pt]">
    {children}
  </div>
);

export default function IzinOrtuPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Sistem...</div>}>
      <IzinOrtuBuilder />
    </Suspense>
  );
}

function IzinOrtuBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState('pemberi');
  
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
            <h1 className="font-bold text-lg uppercase underline tracking-wide">SURAT IZIN {data.p1Relation.toUpperCase()}</h1>
        </div>

        <p className="mb-4 text-justify">
            Yang bertanda tangan di bawah ini:
        </p>

        {/* PEMBERI IZIN */}
        <div className="mb-4">
            <div className="ml-4 space-y-2">
                <div className="flex"><div className="w-48">Nama</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.p1Name}</div></div>
                <div className="flex"><div className="w-48">Tempat, Tanggal Lahir</div><div className="w-4">:</div><div className="flex-1">{data.p1Birth}</div></div>
                <div className="flex"><div className="w-48">Pekerjaan</div><div className="w-4">:</div><div className="flex-1">{data.p1Job}</div></div>
                <div className="flex"><div className="w-48">Alamat</div><div className="w-4">:</div><div className="flex-1 text-justify">{data.p1Address}</div></div>
            </div>
        </div>

        <p className="mb-4 text-justify">
            Selaku <strong>{data.p1Relation}</strong> dari:
        </p>

        {/* YANG DIBERI IZIN */}
        <div className="mb-4">
            <div className="ml-4 space-y-2">
                <div className="flex"><div className="w-48">Nama</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.p2Name}</div></div>
                <div className="flex"><div className="w-48">Tempat, Tanggal Lahir</div><div className="w-4">:</div><div className="flex-1">{data.p2Birth}</div></div>
                <div className="flex"><div className="w-48">Jenis Kelamin</div><div className="w-4">:</div><div className="flex-1">{data.p2Gender}</div></div>
                <div className="flex"><div className="w-48">Alamat</div><div className="w-4">:</div><div className="flex-1 text-justify">{data.p2Address}</div></div>
            </div>
        </div>

        <p className="mb-4 text-justify">
            Dengan ini menyatakan bahwa kami memberikan <strong>IZIN SEPENUHNYA</strong> kepada anak/istri/suami kami tersebut di atas untuk <strong>{data.purpose}</strong> di <strong>{data.companyName}</strong> yang berlokasi di <strong>{data.location}</strong>.
        </p>
        
        <p className="mb-4 text-justify">
            Kami juga menyatakan persetujuan dan tidak keberatan apabila yang bersangkutan ditempatkan atau ditugaskan sesuai dengan ketentuan dan peraturan yang berlaku di perusahaan tersebut. Segala risiko yang timbul akibat pekerjaan tersebut menjadi tanggung jawab kami sepenuhnya.
        </p>

        <p className="mb-8 text-justify">
            Demikian Surat Izin {data.p1Relation} ini dibuat dengan sebenar-benarnya dalam keadaan sadar dan tanpa paksaan dari pihak manapun untuk dipergunakan sebagaimana mestinya.
        </p>

        {/* TANDA TANGAN */}
        <div className="flex justify-between mt-8 mb-10 text-center break-inside-avoid">
            <div className="w-1/2">
                {/* Kosong untuk layout */}
            </div>
            <div className="w-1/2">
                <p className="mb-1">{data.city}, {formatDateSafe(data.date)}</p>
                <p className="mb-16">Yang Memberi Izin,<br/><span className="text-[10px]">({data.p1Relation})</span></p>
                <p className="font-bold underline uppercase">{data.p1Name}</p>
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
            <h1 className="font-black text-slate-800 text-sm md:text-lg tracking-tight flex items-center gap-2">IZIN ORANG TUA / SUAMI</h1>
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
                  <button onClick={() => setActiveTab('pemberi')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'pemberi' ? 'bg-white shadow-sm text-sky-700' : 'text-slate-500 hover:text-slate-700'}`}>Pemberi Izin</button>
                  <button onClick={() => setActiveTab('penerima')} className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === 'penerima' ? 'bg-white shadow-sm text-rose-700' : 'text-slate-500 hover:text-slate-700'}`}>Penerima & Tujuan</button>
                </div>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg"><RotateCcw size={16}/></button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar pb-32">
              {activeTab === 'pemberi' && (
                 <>
                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100"><UserCircle2 size={14} className="text-sky-600"/> Data Pemberi Izin</h3>
                      <div className="space-y-4">
                          <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Status Hubungan</label>
                              <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 outline-none font-bold text-sky-700" value={data.p1Relation} onChange={e => handleDataChange('p1Relation', e.target.value)}>
                                  <option value="Orang Tua (Ayah)">Orang Tua (Ayah)</option>
                                  <option value="Orang Tua (Ibu)">Orang Tua (Ibu)</option>
                                  <option value="Suami">Suami</option>
                                  <option value="Istri">Istri</option>
                                  <option value="Wali">Wali</option>
                              </select>
                          </div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Nama Lengkap</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold text-sky-800 focus:bg-white focus:ring-2 outline-none" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Tempat, Tanggal Lahir</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 outline-none" value={data.p1Birth} onChange={e => handleDataChange('p1Birth', e.target.value)} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Pekerjaan</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 outline-none" value={data.p1Job} onChange={e => handleDataChange('p1Job', e.target.value)} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Alamat Lengkap</label><textarea className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm h-20 focus:bg-white focus:ring-2 outline-none" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} /></div>
                      </div>
                   </div>
                 </>
              )}

              {activeTab === 'penerima' && (
                 <>
                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100"><Users size={14} className="text-rose-600"/> Data Yang Diberi Izin</h3>
                      <div className="space-y-4">
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Nama Lengkap</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold text-rose-800 focus:bg-white focus:ring-2 outline-none" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Tempat, Tanggal Lahir</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 outline-none" value={data.p2Birth} onChange={e => handleDataChange('p2Birth', e.target.value)} /></div>
                          <div>
                              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Jenis Kelamin</label>
                              <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 outline-none" value={data.p2Gender} onChange={e => handleDataChange('p2Gender', e.target.value)}>
                                  <option value="Laki-Laki">Laki-Laki</option>
                                  <option value="Perempuan">Perempuan</option>
                              </select>
                          </div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Alamat Lengkap</label><textarea className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm h-20 focus:bg-white focus:ring-2 outline-none" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} /></div>
                      </div>
                   </div>

                   <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4">
                      <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100"><Briefcase size={14} className="text-amber-600"/> Tujuan & Lokasi</h3>
                      <div className="space-y-4">
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Keperluan Izin</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 outline-none" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} placeholder="Bekerja / Magang / Menikah" /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Nama Perusahaan / Instansi</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 outline-none" value={data.companyName} onChange={e => handleDataChange('companyName', e.target.value)} /></div>
                          <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Lokasi / Penempatan</label><input type="text" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 outline-none" value={data.location} onChange={e => handleDataChange('location', e.target.value)} /></div>
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
              <PrintWrapper documentName="Surat Izin Orang Tua" price={10000} />
           </div>
        </div>
      </main>
    </div>
  );
}
