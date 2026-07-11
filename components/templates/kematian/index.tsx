'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, Edit3, RotateCcw, ArrowLeftCircle, BookOpen
} from 'lucide-react';
import Link from 'next/link';

// --- 1. TYPE DEFINITIONS ---
interface KematianData {
  city: string;
  dateStr: string;
  
  // Almarhum
  aName: string; 
  aNik: string; 
  aPob: string; 
  aDob: string; 
  aGender: string;
  aReligion: string; 
  aJob: string; 
  aAddress: string;

  // Pelapor
  pName: string; 
  pNik: string; 
  pPob: string; 
  pDob: string; 
  pJob: string; 
  pAddress: string; 
  pRelation: string;

  // Kejadian
  kDay: string;
  kDate: string;
  kTime: string;
  kLocation: string;
  kCause: string;
}

const INITIAL_DATA: KematianData = {
  city: 'Sleman',
  dateStr: '2026-07-11',
  
  aName: 'BUDI SANTOSO', aNik: '3404010101740001', aPob: 'Sleman', aDob: '1974-05-12', aGender: 'Laki-laki', aReligion: 'Islam', aJob: 'Wiraswasta', aAddress: 'Jl. Kaliurang KM 10, Sleman, Yogyakarta',
  
  pName: 'SITI AMINAH', pNik: '3404010101800002', pPob: 'Bantul', pDob: '1980-08-20', pJob: 'Ibu Rumah Tangga', pAddress: 'Jl. Kaliurang KM 10, Sleman, Yogyakarta', pRelation: 'Istri',
  
  kDay: 'Sabtu', kDate: '2026-07-11', kTime: '10:30 WIB', kLocation: 'RSUP Dr. Sardjito', kCause: 'Sakit'
};

export default function KematianPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <KematianBuilder />
    </Suspense>
  );
}

function KematianBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<KematianData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'almarhum' | 'pelapor' | 'kejadian'>('almarhum');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDataChange = (field: keyof KematianData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal? Semua perubahan akan hilang.')) {
        setData({ ...INITIAL_DATA });
    }
  };

  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 h-auto ${className}`}>
      {children}
    </div>
  );

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        return new Date(dateString).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
    };

    return (
      <div className="flex flex-col gap-8 print:gap-0" id="print-only-root">
          <Kertas className="print:w-full print:min-w-0">
             {/* HEADER SURAT KEMATIAN */}
             <div className="text-center mb-10 pb-2 border-b-[3px] border-black border-double">
                 <h1 className="font-bold text-xl uppercase tracking-wider">SURAT KETERANGAN KEMATIAN</h1>
                 <p className="text-sm">Nomor: 474.3 / ______ / {new Date().getFullYear()}</p>
             </div>

             <div className="mb-6 text-justify">
                 <p>Yang bertanda tangan di bawah ini, selaku Kepala Desa/Lurah __________, Kecamatan __________, Kabupaten/Kota __________, menerangkan dengan sesungguhnya bahwa:</p>
             </div>

             {/* IDENTITAS ALMARHUM */}
             <div className="flex flex-row mb-6 text-justify break-inside-avoid">
                 <div className="flex-1 ml-4">
                     <div className="flex flex-row">
                         <div className="w-48 shrink-0">Nama Lengkap</div>
                         <div className="w-4 shrink-0">:</div>
                         <div className="font-bold uppercase">{data.aName}</div>
                     </div>
                     <div className="flex flex-row">
                         <div className="w-48 shrink-0">Nomor Induk Kependudukan (NIK)</div>
                         <div className="w-4 shrink-0">:</div>
                         <div>{data.aNik}</div>
                     </div>
                     <div className="flex flex-row">
                         <div className="w-48 shrink-0">Tempat, Tanggal Lahir</div>
                         <div className="w-4 shrink-0">:</div>
                         <div>{data.aPob}, {formatDateSafe(data.aDob)}</div>
                     </div>
                     <div className="flex flex-row">
                         <div className="w-48 shrink-0">Jenis Kelamin</div>
                         <div className="w-4 shrink-0">:</div>
                         <div>{data.aGender}</div>
                     </div>
                     <div className="flex flex-row">
                         <div className="w-48 shrink-0">Agama</div>
                         <div className="w-4 shrink-0">:</div>
                         <div>{data.aReligion}</div>
                     </div>
                     <div className="flex flex-row">
                         <div className="w-48 shrink-0">Pekerjaan</div>
                         <div className="w-4 shrink-0">:</div>
                         <div>{data.aJob}</div>
                     </div>
                     <div className="flex flex-row">
                         <div className="w-48 shrink-0">Alamat Lengkap</div>
                         <div className="w-4 shrink-0">:</div>
                         <div>{data.aAddress}</div>
                     </div>
                 </div>
             </div>

             <div className="mb-6 text-justify">
                 <p>Orang tersebut di atas telah meninggal dunia pada:</p>
             </div>

             {/* DATA KEJADIAN KEMATIAN */}
             <div className="flex flex-row mb-6 text-justify break-inside-avoid">
                 <div className="flex-1 ml-4">
                     <div className="flex flex-row">
                         <div className="w-48 shrink-0">Hari</div>
                         <div className="w-4 shrink-0">:</div>
                         <div>{data.kDay}</div>
                     </div>
                     <div className="flex flex-row">
                         <div className="w-48 shrink-0">Tanggal</div>
                         <div className="w-4 shrink-0">:</div>
                         <div>{formatDateSafe(data.kDate)}</div>
                     </div>
                     <div className="flex flex-row">
                         <div className="w-48 shrink-0">Pukul</div>
                         <div className="w-4 shrink-0">:</div>
                         <div>{data.kTime}</div>
                     </div>
                     <div className="flex flex-row">
                         <div className="w-48 shrink-0">Tempat Meninggal</div>
                         <div className="w-4 shrink-0">:</div>
                         <div>{data.kLocation}</div>
                     </div>
                     <div className="flex flex-row">
                         <div className="w-48 shrink-0">Penyebab Kematian</div>
                         <div className="w-4 shrink-0">:</div>
                         <div>{data.kCause}</div>
                     </div>
                 </div>
             </div>

             <div className="mb-6 text-justify">
                 <p>Surat Keterangan Kematian ini dibuat atas dasar laporan dari:</p>
             </div>

             {/* IDENTITAS PELAPOR */}
             <div className="flex flex-row mb-6 text-justify break-inside-avoid">
                 <div className="flex-1 ml-4">
                     <div className="flex flex-row">
                         <div className="w-48 shrink-0">Nama Lengkap</div>
                         <div className="w-4 shrink-0">:</div>
                         <div className="font-bold uppercase">{data.pName}</div>
                     </div>
                     <div className="flex flex-row">
                         <div className="w-48 shrink-0">Nomor Induk Kependudukan (NIK)</div>
                         <div className="w-4 shrink-0">:</div>
                         <div>{data.pNik}</div>
                     </div>
                     <div className="flex flex-row">
                         <div className="w-48 shrink-0">Tempat, Tanggal Lahir</div>
                         <div className="w-4 shrink-0">:</div>
                         <div>{data.pPob}, {formatDateSafe(data.pDob)}</div>
                     </div>
                     <div className="flex flex-row">
                         <div className="w-48 shrink-0">Pekerjaan</div>
                         <div className="w-4 shrink-0">:</div>
                         <div>{data.pJob}</div>
                     </div>
                     <div className="flex flex-row">
                         <div className="w-48 shrink-0">Alamat Lengkap</div>
                         <div className="w-4 shrink-0">:</div>
                         <div>{data.pAddress}</div>
                     </div>
                     <div className="flex flex-row">
                         <div className="w-48 shrink-0">Hubungan dengan Almarhum</div>
                         <div className="w-4 shrink-0">:</div>
                         <div>{data.pRelation}</div>
                     </div>
                 </div>
             </div>

             <div className="mb-12 text-justify">
                 <p>Demikian Surat Keterangan Kematian ini dibuat dengan sebenar-benarnya untuk dapat dipergunakan sebagaimana mestinya.</p>
             </div>

             {/* TANDA TANGAN */}
             <div className="grid grid-cols-2 gap-8 text-center mt-12 break-inside-avoid pb-12">
                 <div>
                     <p className="mb-20">Pelapor</p>
                     <p className="font-bold underline uppercase">{data.pName}</p>
                 </div>
                 <div>
                     <p className="mb-1">{data.city}, {formatDateSafe(data.dateStr)}</p>
                     <p className="mb-20">Kepala Desa/Lurah</p>
                     <p className="font-bold underline uppercase">______________________</p>
                     <p>NIP. ___________________</p>
                 </div>
             </div>
          </Kertas>
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <BookOpen size={16} className="text-emerald-500" /> <span>Legal Draft - Surat Kematian</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.print(); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan Dokumen</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('almarhum')} className={`flex-1 py-3 border-r ${activeTab === 'almarhum' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Almarhum</button>
              <button onClick={() => setActiveTab('pelapor')} className={`flex-1 py-3 border-r ${activeTab === 'pelapor' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pelapor</button>
              <button onClick={() => setActiveTab('kejadian')} className={`flex-1 py-3 ${activeTab === 'kejadian' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>Kejadian</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32">
              
              {activeTab === 'almarhum' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Identitas Almarhum/Almarhumah</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.aName} onChange={e => handleDataChange('aName', e.target.value)} placeholder="Contoh: BUDI SANTOSO" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Induk Kependudukan (NIK)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.aNik} onChange={e => handleDataChange('aNik', e.target.value)} placeholder="16 Digit NIK" maxLength={16} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.aPob} onChange={e => handleDataChange('aPob', e.target.value)} placeholder="Kota Lahir" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.aDob} onChange={e => handleDataChange('aDob', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Jenis Kelamin</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.aGender} onChange={e => handleDataChange('aGender', e.target.value)}>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Agama</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.aReligion} onChange={e => handleDataChange('aReligion', e.target.value)} placeholder="Contoh: Islam" />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.aJob} onChange={e => handleDataChange('aJob', e.target.value)} placeholder="Contoh: Pensiunan PNS" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.aAddress} onChange={e => handleDataChange('aAddress', e.target.value)} placeholder="Alamat Sesuai KTP" />
                </div>
              </div>
              )}

              {activeTab === 'pelapor' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Identitas Pelapor</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.pName} onChange={e => handleDataChange('pName', e.target.value)} placeholder="Contoh: SITI AMINAH" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Induk Kependudukan (NIK)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pNik} onChange={e => handleDataChange('pNik', e.target.value)} placeholder="16 Digit NIK" maxLength={16} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Lahir</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pPob} onChange={e => handleDataChange('pPob', e.target.value)} placeholder="Kota Lahir" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Lahir</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pDob} onChange={e => handleDataChange('pDob', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pJob} onChange={e => handleDataChange('pJob', e.target.value)} placeholder="Contoh: Wiraswasta" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.pAddress} onChange={e => handleDataChange('pAddress', e.target.value)} placeholder="Alamat Sesuai KTP" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Hubungan dengan Almarhum</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pRelation} onChange={e => handleDataChange('pRelation', e.target.value)} placeholder="Contoh: Istri / Anak Kandung / Adik" />
                </div>
              </div>
              )}

              {activeTab === 'kejadian' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-amber-600 border-b pb-1 mb-4">Waktu & Tempat Kematian</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Hari</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.kDay} onChange={e => handleDataChange('kDay', e.target.value)} placeholder="Contoh: Senin" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.kDate} onChange={e => handleDataChange('kDate', e.target.value)} />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jam / Pukul</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.kTime} onChange={e => handleDataChange('kTime', e.target.value)} placeholder="Contoh: 10:30 WIB" />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Lokasi / Tempat Meninggal</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.kLocation} onChange={e => handleDataChange('kLocation', e.target.value)} placeholder="Contoh: RSUP Dr. Sardjito / Rumah" />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Penyebab Kematian</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.kCause} onChange={e => handleDataChange('kCause', e.target.value)} placeholder="Contoh: Sakit / Usia Lanjut" />
                </div>

                <div className="pt-4 border-t mt-4">
                  <h3 className="text-[10px] font-black uppercase text-slate-600 mb-2">PENGATURAN SURAT</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Kota Surat</label>
                      <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Contoh: Sleman" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Surat</label>
                      <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.dateStr} onChange={e => handleDataChange('dateStr', e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
              )}

           </div>
        </div>

        {/* PANEL KANAN: PREVIEW DOKUMEN */}
        <div className="flex-1 bg-slate-200 overflow-y-auto relative p-4 md:p-8 custom-scrollbar no-print-area print:p-0 print:bg-white print:overflow-visible">
          <DocumentContent />
        </div>

      </main>
      
      {/* MOBILE TOGGLE (TOMBOL MENGAMBANG) */}
      <div className="md:hidden fixed bottom-4 right-4 z-50 no-print">
         <button 
            onClick={() => setMobileView(mobileView === 'editor' ? 'preview' : 'editor')}
            className="bg-slate-900 text-white p-4 rounded-full shadow-2xl flex items-center justify-center hover:bg-slate-800 active:scale-95 transition-all"
         >
            {mobileView === 'editor' ? <Printer size={24} /> : <Edit3 size={24} />}
         </button>
      </div>
    </div>
  );
}