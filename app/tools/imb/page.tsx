'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Home, Building2, UserCircle2, 
  MapPin, LayoutTemplate, X, PenTool, ShieldCheck, Ruler,
  Edit3, Eye, Briefcase
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function IMBSederhanaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat IMB...</div>}>
      <IMBBuilder />
    </Suspense>
  );
}

function IMBBuilder() {
  // --- STATE SYSTEM ---
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Denpasar',
    date: '', // Diisi useEffect
    docNo: '640/021/DPP/I/2026',
    
    // INSTANSI (DESA/KECAMATAN)
    issuerOffice: 'PEMERINTAH KOTA DENPASAR\nKECAMATAN DENPASAR UTARA\nDESA PEMECUTAN KAJA',
    villageHead: 'I NYOMAN GEDE, S.E.',
    villageJob: 'Perbekel Pemecutan Kaja',

    // DATA PEMILIK
    ownerName: 'BAGUS RAMADHAN',
    ownerNik: '5171010101990001',
    ownerAddress: 'Jl. Ahmad Yani No. 100, Denpasar Utara',

    // DATA BANGUNAN
    buildingType: 'Rumah Tinggal (Permanen)',
    buildingLocation: 'Jl. Ahmad Yani No. 100, Denpasar Utara',
    landArea: '150 m2',
    buildingArea: '80 m2',
    landStatus: 'Sertifikat Hak Milik (SHM) No. 442',
    
    purpose: 'Sebagai syarat administrasi permohonan PBG/IMB Hunian Sederhana.'
  });

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  // --- KOMPONEN ISI SURAT ---
  const DocumentContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border print:m-0 print:border-none print:shadow-none p-[20mm] print:p-[15mm] text-slate-900 font-serif text-[11pt]" 
         style={{ width: '210mm', minHeight: '290mm' }}>
      
      {/* KOP SURAT */}
      <div className="flex flex-col items-center border-b-4 border-double border-slate-900 pb-4 mb-8 shrink-0">
        <div className="flex items-center gap-6 w-full px-4 text-center">
           <div className="flex-grow">
              <div className="text-[12pt] font-black leading-tight whitespace-pre-line uppercase tracking-tighter italic">
                 {data.issuerOffice}
              </div>
           </div>
        </div>
      </div>

      {/* JUDUL */}
      <div className="text-center mb-10 shrink-0">
        <h2 className="text-lg font-black underline uppercase decoration-1 underline-offset-4 tracking-widest leading-none">SURAT KETERANGAN IJIN BANGUNAN</h2>
        <p className="text-[10pt] font-sans mt-2 italic uppercase tracking-widest text-slate-500">Nomor: {data.docNo}</p>
      </div>

      {/* BODY SURAT */}
      <div className="flex-grow leading-relaxed text-justify overflow-hidden">
        <p className="mb-4">Yang bertanda tangan di bawah ini menerangkan dengan sebenarnya bahwa:</p>
        
        <div className="ml-8 mb-6 space-y-1.5 font-sans text-[10pt] border-l-4 border-slate-100 pl-6 italic">
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.ownerName}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.ownerNik}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr] align-top"><span>Alamat Pemilik</span><span>:</span><span>{data.ownerAddress}</span></div>
        </div>

        <p className="mb-4">Bahwa yang bersangkutan berencana membangun/merenovasi bangunan dengan spesifikasi sebagai berikut:</p>

        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 font-sans text-[10pt] mb-6 space-y-1">
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Jenis Bangunan</span><span>:</span><span className="font-bold">{data.buildingType}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Lokasi Bangunan</span><span>:</span><span>{data.buildingLocation}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Luas Tanah</span><span>:</span><span>{data.landArea}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Luas Bangunan</span><span>:</span><span>{data.buildingArea}</span></div>
            <div className="grid grid-cols-[160px_10px_1fr]"><span>Status Tanah</span><span>:</span><span className="italic">{data.landStatus}</span></div>
        </div>

        <p className="mb-6">
          Berdasarkan tinjauan kami, lokasi tersebut tidak dalam sengketa dan pembangunannya tidak mengganggu ketertiban umum. Surat keterangan ini diberikan untuk digunakan sebagai <b>{data.purpose}</b>.
        </p>

        <p>Demikian surat keterangan ini kami buat dengan sebenarnya agar dapat dipergunakan sebagaimana mestinya.</p>
      </div>

      {/* TANDA TANGAN SIMETRIS (TABLE BASED) */}
      <div className="shrink-0 mt-10" style={{ pageBreakInside: 'avoid' }}>
        <table className="w-full table-fixed">
          <tbody>
            <tr>
              <td className="text-center align-top">
                <div className="h-6 mb-2"></div>
                <p className="uppercase text-[8pt] font-black text-slate-400 tracking-widest mb-20 uppercase">Pemilik Bangunan,</p>
                <p className="font-bold underline uppercase text-[10.5pt]">({data.ownerName})</p>
              </td>
              <td className="text-center align-top">
                <p className="text-[10.5pt] font-bold h-6 mb-2">{data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : '...'}</p>
                <p className="uppercase text-[8pt] font-black text-slate-400 tracking-widest mb-20 uppercase">{data.villageJob},</p>
                <p className="font-bold underline uppercase text-[10.5pt]">{data.villageHead}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-800">
      
      {/* GLOBAL CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; } 
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          
          #print-only-root { 
            display: block !important; 
            position: absolute; 
            top: 0; 
            left: 0; 
            width: 100%; 
            z-index: 9999; 
            background: white; 
          }
        }
      `}</style>

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs">
              <ArrowLeft size={18} /> Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <Home size={16} /> <span>IMB BUILDER</span>
            </div>
          </div>
          <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg active:scale-95">
            <Printer size={16} /> <span className="hidden md:inline">Print</span>
          </button>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        
        {/* SIDEBAR INPUT (SLIDING ANIMATION) */}
        <div className={`no-print w-full md:w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute md:relative shadow-xl md:shadow-none ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
              
               <div className="md:hidden flex justify-center pb-4 border-b border-dashed border-slate-200"><AdsterraBanner adKey="8fd377728513d5d23b9caf7a2bba1a73" width={320} height={50} /></div>

               {/* Instansi Desa */}
               <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <div className="flex items-center gap-2 border-b pb-2"><Building2 size={14}/><h3 className="text-xs font-bold uppercase">Instansi / Desa</h3></div>
                 <div className="space-y-3">
                    <div>
                        <label className="text-[10px] text-slate-500 font-bold block mb-1">Kop Surat (Instansi)</label>
                        <textarea className="w-full p-2 border rounded text-xs h-20 resize-none font-bold uppercase" value={data.issuerOffice} onChange={e => handleDataChange('issuerOffice', e.target.value)} />
                    </div>
                    <div>
                        <label className="text-[10px] text-slate-500 font-bold block mb-1">Nomor Surat</label>
                        <input className="w-full p-2 border rounded text-xs font-mono" value={data.docNo} onChange={e => handleDataChange('docNo', e.target.value)} />
                    </div>
                    <div>
                        <label className="text-[10px] text-slate-500 font-bold block mb-1">Jabatan Pejabat</label>
                        <input className="w-full p-2 border rounded text-xs" value={data.villageJob} onChange={e => handleDataChange('villageJob', e.target.value)} />
                    </div>
                    <div>
                        <label className="text-[10px] text-slate-500 font-bold block mb-1">Nama Pejabat</label>
                        <input className="w-full p-2 border rounded text-xs font-bold" value={data.villageHead} onChange={e => handleDataChange('villageHead', e.target.value)} />
                    </div>
                 </div>
               </div>

               {/* Data Pemilik */}
               <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <div className="flex items-center gap-2 border-b pb-2"><UserCircle2 size={14}/><h3 className="text-xs font-bold uppercase">Data Pemilik</h3></div>
                 <div className="space-y-3">
                    <input className="w-full p-2 border rounded text-xs font-bold" placeholder="Nama Pemilik" value={data.ownerName} onChange={e => handleDataChange('ownerName', e.target.value)} />
                    <input className="w-full p-2 border rounded text-xs" placeholder="NIK" value={data.ownerNik} onChange={e => handleDataChange('ownerNik', e.target.value)} />
                    <textarea className="w-full p-2 border rounded text-xs h-16" placeholder="Alamat Pemilik" value={data.ownerAddress} onChange={e => handleDataChange('ownerAddress', e.target.value)} />
                 </div>
               </div>

               {/* Spesifikasi Bangunan */}
               <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <div className="flex items-center gap-2 border-b pb-2"><Ruler size={14}/><h3 className="text-xs font-bold uppercase">Spesifikasi Bangunan</h3></div>
                 <div className="space-y-3">
                    <div>
                        <label className="text-[10px] text-slate-500 font-bold block mb-1">Jenis Bangunan</label>
                        <input className="w-full p-2 border rounded text-xs font-bold" value={data.buildingType} onChange={e => handleDataChange('buildingType', e.target.value)} />
                    </div>
                    <div>
                        <label className="text-[10px] text-slate-500 font-bold block mb-1">Lokasi Bangunan</label>
                        <textarea className="w-full p-2 border rounded text-xs h-12" value={data.buildingLocation} onChange={e => handleDataChange('buildingLocation', e.target.value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label className="text-[10px] text-slate-500 font-bold block mb-1">Luas Tanah</label>
                            <input className="w-full p-2 border rounded text-xs" value={data.landArea} onChange={e => handleDataChange('landArea', e.target.value)} />
                        </div>
                        <div>
                            <label className="text-[10px] text-slate-500 font-bold block mb-1">Luas Bangunan</label>
                            <input className="w-full p-2 border rounded text-xs" value={data.buildingArea} onChange={e => handleDataChange('buildingArea', e.target.value)} />
                        </div>
                    </div>
                    <div>
                        <label className="text-[10px] text-slate-500 font-bold block mb-1">Status Tanah (SHM/AJB)</label>
                        <input className="w-full p-2 border rounded text-xs" value={data.landStatus} onChange={e => handleDataChange('landStatus', e.target.value)} />
                    </div>
                    <div>
                        <label className="text-[10px] text-slate-500 font-bold block mb-1">Tujuan Surat</label>
                        <textarea className="w-full p-2 border rounded text-xs h-16" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} />
                    </div>
                 </div>
               </div>

               <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA (ALWAYS RENDERED BEHIND SIDEBAR) */}
        <div className="no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center">
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-100 mb-[-130mm] md:mb-10 mt-2 md:mt-0 shadow-2xl flex flex-col items-center">
                 <div style={{ width: '210mm' }}>
                    <DocumentContent />
                 </div>
               </div>
            </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 font-sans">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* PRINT AREA */}
      <div id="print-only-root" className="hidden">
         <div style={{ width: '210mm', minHeight: 'auto' }} className="flex flex-col">
            <DocumentContent />
         </div>
      </div>

    </div>
  );
}