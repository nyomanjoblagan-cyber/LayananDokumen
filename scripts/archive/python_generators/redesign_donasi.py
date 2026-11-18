import sys

def main():
    file_path = r"d:\WEB DESIGN\LayananDokumen\components\templates\donasi\index.tsx"
    
    new_content = """'use client';

import React, { useState, Suspense, useEffect } from 'react';
import { 
    Printer, ArrowLeftCircle, Edit3, RotateCcw, 
    Building2, Heart, Coins, LayoutTemplate, MessageSquareQuote, FileText
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface DonationData {
  city: string;
  date: string;
  docNo: string;
  
  // Penyelenggara
  orgName: string;
  orgAddress: string;
  contactPerson: string;

  // Detail Kegiatan
  activityName: string;
  targetAudience: string;
  executionDate: string;

  // Penerima Surat
  targetName: string;
  targetLocation: string;

  // Detail Donasi
  totalNeed: string;
  bankInfo: string;
  closingWord: string;

  // Otoritas
  chairmanName: string;
  treasurerName: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: DonationData = {
  city: 'Denpasar',
  date: '13 Juli 2026',
  docNo: '012/PAN-SOSIAL/I/2026',
  
  orgName: 'Yayasan Bakti Sosial Bali',
  orgAddress: 'Jl. Raya Puputan No. 22, Renon, Denpasar',
  contactPerson: 'Bagus Ramadhan (0812-3456-7890)',

  activityName: 'Program Sembako Untuk Lansia & Yatim Piatu',
  targetAudience: '100 Kepala Keluarga di wilayah Denpasar Timur',
  executionDate: '25 Januari 2026',

  targetName: 'Bapak/Ibu Donatur / Pimpinan Perusahaan',
  targetLocation: 'Di Tempat',

  totalNeed: 'Rp 25.000.000,-',
  bankInfo: 'Bank BCA No. Rek: 123-456-7890 a.n Yayasan Bakti Sosial',
  closingWord: 'Setiap kontribusi Anda, sekecil apapun, akan memberikan senyum dan harapan baru bagi mereka yang membutuhkan.',

  chairmanName: 'Bagus Ramadhan',
  treasurerName: 'Made Wira Kusuma'
};

// --- 3. KOMPONEN KERTAS MUTLAK ---
const Kertas = ({ children, templateId }: { children: React.ReactNode, templateId: number }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto group ${templateId === 1 ? 'font-serif text-[11pt]' : 'font-sans text-[10pt]'}`}>
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function PermohonanDonasiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Donasi...</div>}>
      <DonationBuilder />
    </Suspense>
  );
}

function DonationBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<DonationData>(INITIAL_DATA);
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  useEffect(() => setIsClient(true), []);

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke setelan awal?')) {
        setData(INITIAL_DATA);
    }
  };

  const handleStringChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const activeTemplateName = templateId === 1 ? 'Legal Formal (Serif)' : 'Modern Premium (Sans)';

  const TemplateMenu = () => (
      <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[9999]">
          <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-sky-50 rounded-lg text-sm font-bold flex items-center gap-3 transition-colors ${templateId === 1 ? 'bg-sky-50 text-sky-700' : 'text-slate-600'}`}>
              <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-sky-500' : 'bg-slate-300'}`}></div> Legal Formal (Serif)
          </button>
          <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-sky-50 rounded-lg text-sm font-bold flex items-center gap-3 transition-colors ${templateId === 2 ? 'bg-sky-50 text-sky-700' : 'text-slate-600'}`}>
              <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-sky-500' : 'bg-slate-300'}`}></div> Modern Premium (Sans)
          </button>
      </div>
  );

  const DocumentContent = () => (
    <Kertas templateId={templateId}>
       {/* KOP SURAT */}
       <div className="border-b-[4px] border-black pb-4 mb-8 break-inside-avoid text-center">
           <h1 className="font-black text-2xl uppercase tracking-widest">{data.orgName}</h1>
           <p className="text-[10pt] mt-1">{data.orgAddress}</p>
           <p className="text-[10pt]">Kontak: {data.contactPerson}</p>
       </div>

       {/* KEPALA SURAT */}
       <div className="flex justify-between mb-8 break-inside-avoid">
           <div>
               <table className="text-[11pt]">
                   <tbody>
                       <tr><td className="w-24 pb-1">Nomor</td><td className="w-4 pb-1">:</td><td className="pb-1">{data.docNo}</td></tr>
                       <tr><td className="w-24 pb-1">Lampiran</td><td className="w-4 pb-1">:</td><td className="pb-1">1 (Satu) Berkas Proposal</td></tr>
                       <tr><td className="w-24 pb-1 align-top">Perihal</td><td className="w-4 pb-1 align-top">:</td><td className="pb-1 align-top font-bold underline uppercase">Permohonan Bantuan Dana / Donasi</td></tr>
                   </tbody>
               </table>
           </div>
           <div className="text-right">
               <p>{data.city}, {data.date}</p>
           </div>
       </div>

       {/* TUJUAN SURAT */}
       <div className="mb-8">
           <p className="mb-1">Kepada Yth.,</p>
           <p className="font-bold">{data.targetName}</p>
           <p>{data.targetLocation}</p>
       </div>

       {/* ISI SURAT */}
       <div className="mb-6 text-justify leading-relaxed">
           <p className="mb-4">Dengan hormat,</p>
           <p className="mb-4">
               Puji syukur kita panjatkan ke hadirat Tuhan Yang Maha Esa atas segala rahmat dan karunia-Nya. Teriring salam dan doa semoga Bapak/Ibu senantiasa dalam keadaan sehat dan sukses dalam menjalankan aktivitas sehari-hari.
           </p>
           <p className="mb-4">
               Bersama surat ini, kami dari <b>{data.orgName}</b> bermaksud menyampaikan rencana kegiatan sosial kemanusiaan dengan nama kegiatan <b>"{data.activityName}"</b>. Kegiatan ini bertujuan untuk meringankan beban dan memberikan bantuan kepada <b>{data.targetAudience}</b> yang akan kami laksanakan pada tanggal <b>{data.executionDate}</b>.
           </p>
           <p className="mb-4">
               Demi kelancaran dan kesuksesan kegiatan mulia tersebut, kami sangat membutuhkan dukungan materil maupun moril dari berbagai pihak. Adapun total estimasi kebutuhan dana untuk kegiatan ini adalah sebesar <b>{data.totalNeed}</b>.
           </p>
           <p className="mb-4">
               Oleh karena itu, kami mengetuk hati Bapak/Ibu untuk berkenan memberikan bantuan dana / donasi / sponsorship. Bantuan dari Bapak/Ibu dapat disalurkan langsung secara tunai kepada panitia atau melalui transfer ke rekening resmi kami:
           </p>
           <div className="font-bold p-4 border-2 border-dashed border-slate-400 bg-slate-50 text-center text-[12pt] mb-4">
               {data.bankInfo}
           </div>
           <p className="mb-4 italic text-center font-bold">
               "{data.closingWord}"
           </p>
           <p className="mb-4">
               Sebagai bahan pertimbangan Bapak/Ibu, bersama surat ini turut kami lampirkan 1 (satu) berkas proposal kegiatan yang memuat rincian anggaran dan jadwal acara secara lebih mendetail.
           </p>
           <p>
               Demikian surat permohonan ini kami sampaikan. Atas perhatian, dukungan, dan partisipasi aktif Bapak/Ibu, kami mengucapkan terima kasih yang sebesar-besarnya.
           </p>
       </div>

       {/* PENGESAHAN (TANDA TANGAN) */}
       <div className="mt-12 break-inside-avoid">
          <div className="text-center font-bold mb-6">Panitia Pelaksana</div>
          <div className="flex justify-between text-center items-stretch mb-4">
             <div className="w-[45%] flex flex-col justify-between">
                <p className="mb-4">Ketua Pelaksana,</p>
                <div className="h-24"></div>
                <p className="font-bold underline uppercase">{data.chairmanName}</p>
             </div>
             <div className="w-[45%] flex flex-col justify-between">
                <p className="mb-4">Bendahara,</p>
                <div className="h-24"></div>
                <p className="font-bold underline uppercase">{data.treasurerName}</p>
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
              <ArrowLeftCircle size={20} className="text-sky-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Proposal Donasi</h1>
            </div>
          </div>
          <div className="flex items-center gap-3 relative">
            <div className="relative">
                <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 hover:bg-slate-700 border border-slate-600 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all text-white">
                    <LayoutTemplate size={14} className="text-sky-400" /> 
                    <span className="hidden md:inline">{activeTemplateName}</span>
                </button>
                {showTemplateMenu && <TemplateMenu />}
            </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-sky-600 hover:bg-sky-500 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-sky-900/50 active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-[998] no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'editor' ? 'text-sky-700 border-b-2 border-sky-700 bg-sky-50' : 'text-slate-500'}`}>
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
                  <Heart size={18} className="text-sky-600" /> Editor Surat Donasi
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar pb-32">
                
                {/* 1. INFORMASI SURAT & INSTANSI */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Building2 size={14} className="text-amber-600"/> Penyelenggara & Surat
                  </h3>
                  <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Terbit</label>
                            <input type="text" name="city" value={data.city} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Surat</label>
                            <input type="text" name="date" value={data.date} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                          </div>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Surat</label>
                        <input type="text" name="docNo" value={data.docNo} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Organisasi / Panitia</label>
                        <input type="text" name="orgName" value={data.orgName} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Sekretariat</label>
                        <textarea name="orgAddress" value={data.orgAddress} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-slate-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all"></textarea>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kontak Panitia / Narahubung</label>
                        <input type="text" name="contactPerson" value={data.contactPerson} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-slate-800 focus:bg-white focus:ring-2 focus:ring-sky-500 outline-none transition-all" />
                      </div>
                  </div>
                </div>

                {/* 2. TUJUAN SURAT & KEGIATAN */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <FileText size={14} className="text-emerald-600"/> Tujuan & Kegiatan
                  </h3>
                  <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Tujuan (Contoh: Bapak Donatur)</label>
                        <input type="text" name="targetName" value={data.targetName} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Lokasi / Alamat Tujuan</label>
                        <input type="text" name="targetLocation" value={data.targetLocation} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div className="pt-2 border-t border-dashed border-slate-200">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Kegiatan</label>
                        <textarea name="activityName" value={data.activityName} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm font-bold text-emerald-800 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"></textarea>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Target Penerima Manfaat</label>
                        <input type="text" name="targetAudience" value={data.targetAudience} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Pelaksanaan Kegiatan</label>
                        <input type="text" name="executionDate" value={data.executionDate} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-emerald-800 focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all" />
                      </div>
                  </div>
                </div>

                {/* 3. KEUANGAN & OTORITAS */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                  <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <Coins size={14} className="text-purple-600"/> Keuangan & Otoritas
                  </h3>
                  <div className="space-y-4">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Total Kebutuhan Dana</label>
                        <input type="text" name="totalNeed" value={data.totalNeed} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm font-bold text-purple-700 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Informasi Rekening Bank (Tercetak Kotak)</label>
                        <textarea name="bankInfo" value={data.bankInfo} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-purple-700 h-16 resize-none focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"></textarea>
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kata Penutup Khusus (Tercetak Miring)</label>
                        <textarea name="closingWord" value={data.closingWord} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-sm text-purple-700 h-20 resize-none focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all"></textarea>
                      </div>
                      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-dashed border-slate-200">
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Ketua Pelaksana</label>
                            <input type="text" name="chairmanName" value={data.chairmanName} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-purple-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Bendahara</label>
                            <input type="text" name="treasurerName" value={data.treasurerName} onChange={handleStringChange} className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-sm text-purple-800 focus:bg-white focus:ring-2 focus:ring-purple-500 outline-none transition-all" />
                          </div>
                      </div>
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
              <PrintWrapper documentName="Proposal Permohonan Donasi" price={10000} />
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
