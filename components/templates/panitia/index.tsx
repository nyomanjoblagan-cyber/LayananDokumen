'use client';

/**
 * FILE: SKPanitiaPage.tsx
 * STATUS: PRODUCTION READY
 * DESC: Generator Surat Keputusan (SK) Susunan Panitia
 */

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, ShieldCheck, Building2, 
  Edit3, RotateCcw, Plus, Trash2, FileText, CheckCircle, Users
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface SusunanAnggota {
  id: string;
  jabatan: string;
  nama: string;
}

interface PanitiaData {
  kopInstansi: string;
  kopKontak: string;
  
  judulSk: string;
  nomorSk: string;
  tentang: string;

  menimbang: string[];
  mengingat: string[];
  diktum: string[];

  ditetapkanDi: string;
  tanggalPenetapan: string;
  jabatanPenetapan: string;
  namaPenetapan: string;

  susunanPanitia: SusunanAnggota[];
}

const generateId = () => Math.random().toString(36).substring(2, 9);

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: PanitiaData = {
  kopInstansi: 'PEMERINTAH KABUPATEN GIANYAR\nKECAMATAN UBUD\nDESA SINGAKERTA',
  kopKontak: 'Jalan Raya Singakerta, Telp. (0361) 123456, Email: info@singakerta.desa.id',
  
  judulSk: 'KEPUTUSAN PERBEKEL DESA SINGAKERTA',
  nomorSk: '144 / 05 / KEP / 2026',
  tentang: 'PEMBENTUKAN PANITIA PERINGATAN HARI KEMERDEKAAN REPUBLIK INDONESIA KE-81 TINGKAT DESA SINGAKERTA TAHUN 2026',

  menimbang: [
    'bahwa untuk kelancaran dan kesuksesan pelaksanaan peringatan Hari Kemerdekaan Republik Indonesia ke-81 di tingkat Desa Singakerta, dipandang perlu membentuk Panitia Pelaksana;',
    'bahwa mereka yang namanya tercantum dalam lampiran keputusan ini dipandang cakap dan mampu untuk diserahi tugas sebagai panitia pelaksana;',
    'bahwa berdasarkan pertimbangan sebagaimana dimaksud pada huruf a dan huruf b, perlu menetapkan Keputusan Perbekel tentang Pembentukan Panitia Peringatan Hari Kemerdekaan Republik Indonesia ke-81.'
  ],
  mengingat: [
    'Undang-Undang Nomor 6 Tahun 2014 tentang Desa;',
    'Peraturan Pemerintah Nomor 43 Tahun 2014 tentang Peraturan Pelaksanaan Undang-Undang Nomor 6 Tahun 2014 tentang Desa;',
    'Peraturan Menteri Dalam Negeri Nomor 111 Tahun 2014 tentang Pedoman Teknis Peraturan di Desa.'
  ],
  diktum: [
    'Membentuk Panitia Peringatan Hari Kemerdekaan Republik Indonesia ke-81 Tingkat Desa Singakerta Tahun 2026 dengan susunan keanggotaan sebagaimana tercantum dalam Lampiran Keputusan ini.',
    'Panitia sebagaimana dimaksud pada Diktum KESATU mempunyai tugas menyusun rencana kegiatan, menyelenggarakan seluruh rangkaian kegiatan dengan penuh tanggung jawab, serta melaporkan hasil pelaksanaan kegiatan dan pertanggungjawaban kepada Perbekel.',
    'Segala biaya yang timbul akibat ditetapkannya Keputusan ini dibebankan pada Anggaran Pendapatan dan Belanja Desa (APBDes) Singakerta Tahun Anggaran 2026 dan sumber dana lain yang sah dan tidak mengikat.',
    'Keputusan ini mulai berlaku pada tanggal ditetapkan.'
  ],

  ditetapkanDi: 'Singakerta',
  tanggalPenetapan: '',
  jabatanPenetapan: 'Perbekel Desa Singakerta',
  namaPenetapan: 'I Kadek Bagus',

  susunanPanitia: [
    { id: '1', jabatan: 'Pelindung / Penasihat', nama: 'Perbekel Desa Singakerta' },
    { id: '2', jabatan: 'Ketua', nama: 'I Wayan Sugiartha' },
    { id: '3', jabatan: 'Wakil Ketua', nama: 'I Made Budiana' },
    { id: '4', jabatan: 'Sekretaris', nama: 'Ni Nyoman Sari' },
    { id: '5', jabatan: 'Bendahara', nama: 'Ni Ketut Ayu' },
    { id: '6', jabatan: 'Seksi Acara', nama: 'I Putu Gede' },
    { id: '7', jabatan: 'Seksi Perlengkapan', nama: 'I Made Yasa' },
    { id: '8', jabatan: 'Seksi Konsumsi', nama: 'Ni Wayan Suci' }
  ]
};

// --- 3. KOMPONEN UTAMA ---
export default function SKPanitiaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat...</div>}>
      <StatementBuilder />
    </Suspense>
  );
}

function StatementBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<PanitiaData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, tanggalPenetapan: today }));
  }, []);

  const handleDataChange = (field: keyof PanitiaData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleArrayChange = (field: 'menimbang' | 'mengingat' | 'diktum', idx: number, val: string) => {
    setData(prev => {
       const arr = [...prev[field]];
       arr[idx] = val;
       return { ...prev, [field]: arr };
    });
  };
  
  const addArrayItem = (field: 'menimbang' | 'mengingat' | 'diktum') => {
    setData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };
  
  const removeArrayItem = (field: 'menimbang' | 'mengingat' | 'diktum', idx: number) => {
    setData(prev => {
       const arr = [...prev[field]];
       arr.splice(idx, 1);
       return { ...prev, [field]: arr };
    });
  };

  const handlePanitiaChange = (idx: number, key: 'jabatan' | 'nama', val: string) => {
    setData(prev => {
       const arr = [...prev.susunanPanitia];
       arr[idx] = { ...arr[idx], [key]: val };
       return { ...prev, susunanPanitia: arr };
    });
  };

  const addPanitia = () => {
    setData(prev => ({ ...prev, susunanPanitia: [...prev.susunanPanitia, { id: generateId(), jabatan: '', nama: '' }] }));
  };

  const removePanitia = (idx: number) => {
    setData(prev => {
       const arr = [...prev.susunanPanitia];
       arr.splice(idx, 1);
       return { ...prev, susunanPanitia: arr };
    });
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, tanggalPenetapan: today });
    }
  };

  const StatementContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    const getNumberingAlphabet = (idx: number) => String.fromCharCode(97 + idx) + '.';
    const getNumberingRomanDiktum = (idx: number) => {
       const diktumArr = ['KESATU', 'KEDUA', 'KETIGA', 'KEEMPAT', 'KELIMA', 'KEENAM', 'KETUJUH', 'KEDELAPAN', 'KESEMBILAN', 'KESEPULUH'];
       return diktumArr[idx] || `KE-${idx+1}`;
    };

    return (
      <div className="bg-white flex flex-col font-serif text-slate-900 leading-relaxed text-[11pt] w-[210mm] shadow-2xl mx-auto print:shadow-none print:w-full print:m-0">
        
        {/* PAGE 1: SK UTAMA */}
        <div className="w-[210mm] min-h-[297mm] p-[20mm] box-border relative bg-white print:w-full print:min-h-0 print:p-[20mm] print:break-after-page" style={{ pageBreakAfter: 'always' }}>
          
          {/* KOP SURAT */}
          <div className="border-b-[3px] border-black pb-2 mb-6 text-center">
              <h1 className="text-[14pt] font-black uppercase leading-tight whitespace-pre-line">{data.kopInstansi}</h1>
              <p className="text-[10pt] font-sans mt-1">{data.kopKontak}</p>
          </div>

          {/* JUDUL SK */}
          <div className="text-center mb-8">
             <h2 className="text-[12pt] font-bold uppercase">{data.judulSk}</h2>
             <p className="text-[11pt]">NOMOR: {data.nomorSk}</p>
             <p className="text-[12pt] font-bold uppercase mt-2">TENTANG</p>
             <p className="text-[12pt] font-bold uppercase">{data.tentang}</p>
          </div>

          {/* BUPATI / PERBEKEL / KETUA */}
          <div className="text-center mb-6">
             <h2 className="text-[12pt] font-bold uppercase">{data.jabatanPenetapan},</h2>
          </div>

          {/* KONSIDERAN */}
          <table className="w-full text-[11pt] mb-6 text-justify align-top border-collapse">
             <tbody>
               {data.menimbang.length > 0 && (
                 <tr>
                    <td className="w-[90px] align-top pb-2">Menimbang</td>
                    <td className="w-[15px] align-top pb-2">:</td>
                    <td className="align-top pb-2">
                       <table className="w-full">
                         <tbody>
                           {data.menimbang.map((item, i) => (
                             <tr key={i}>
                               <td className="w-[20px] align-top">{getNumberingAlphabet(i)}</td>
                               <td className="align-top pb-1 whitespace-pre-line">{item}</td>
                             </tr>
                           ))}
                         </tbody>
                       </table>
                    </td>
                 </tr>
               )}
               {data.mengingat.length > 0 && (
                 <tr>
                    <td className="w-[90px] align-top pb-2">Mengingat</td>
                    <td className="w-[15px] align-top pb-2">:</td>
                    <td className="align-top pb-2">
                       <table className="w-full">
                         <tbody>
                           {data.mengingat.map((item, i) => (
                             <tr key={i}>
                               <td className="w-[20px] align-top">{i+1}.</td>
                               <td className="align-top pb-1 whitespace-pre-line">{item}</td>
                             </tr>
                           ))}
                         </tbody>
                       </table>
                    </td>
                 </tr>
               )}
             </tbody>
          </table>

          {/* MEMUTUSKAN */}
          <div className="text-center mb-4 mt-2">
             <h2 className="text-[12pt] font-bold uppercase">MEMUTUSKAN:</h2>
          </div>

          <table className="w-full text-[11pt] mb-8 text-justify align-top border-collapse">
             <tbody>
               <tr>
                  <td className="w-[90px] align-top pb-2">Menetapkan</td>
                  <td className="w-[15px] align-top pb-2">:</td>
                  <td className="align-top pb-2 uppercase font-bold">{data.tentang}</td>
               </tr>
               {data.diktum.map((item, i) => (
                 <tr key={i}>
                    <td className="w-[90px] align-top pb-2">{getNumberingRomanDiktum(i)}</td>
                    <td className="w-[15px] align-top pb-2">:</td>
                    <td className="align-top pb-2 whitespace-pre-line">{item}</td>
                 </tr>
               ))}
             </tbody>
          </table>

          {/* TTD PENETAPAN */}
          <div className="flex justify-end break-inside-avoid">
             <table className="w-[300px] text-[11pt]">
                <tbody>
                  <tr>
                     <td className="pb-1">Ditetapkan di</td>
                     <td className="w-[10px]">:</td>
                     <td>{data.ditetapkanDi}</td>
                  </tr>
                  <tr>
                     <td className="pb-6">Pada tanggal</td>
                     <td>:</td>
                     <td>{formatDateSafe(data.tanggalPenetapan)}</td>
                  </tr>
                  <tr>
                     <td colSpan={3} className="text-center font-bold uppercase pb-16">{data.jabatanPenetapan}</td>
                  </tr>
                  <tr>
                     <td colSpan={3} className="text-center font-bold underline uppercase">{data.namaPenetapan}</td>
                  </tr>
                </tbody>
             </table>
          </div>
        </div>

        {/* PAGE 2: LAMPIRAN */}
        <div className="w-[210mm] min-h-[297mm] p-[20mm] box-border relative bg-white print:w-full print:min-h-0 print:p-[20mm] print:break-before-page" style={{ pageBreakBefore: 'always' }}>
           <div className="flex justify-end mb-10 text-[10pt]">
              <table className="w-[350px]">
                 <tbody>
                    <tr>
                       <td className="align-top w-[75px]">LAMPIRAN</td>
                       <td className="align-top w-[15px]">:</td>
                       <td className="align-top uppercase font-bold">{data.judulSk}</td>
                    </tr>
                    <tr>
                       <td className="align-top">NOMOR</td>
                       <td className="align-top">:</td>
                       <td className="align-top">{data.nomorSk}</td>
                    </tr>
                    <tr>
                       <td className="align-top">TANGGAL</td>
                       <td className="align-top">:</td>
                       <td className="align-top">{formatDateSafe(data.tanggalPenetapan)}</td>
                    </tr>
                    <tr>
                       <td className="align-top">TENTANG</td>
                       <td className="align-top">:</td>
                       <td className="align-top uppercase">{data.tentang}</td>
                    </tr>
                 </tbody>
              </table>
           </div>

           <div className="text-center mb-10">
              <h2 className="text-[12pt] font-bold uppercase underline">SUSUNAN KEPANITIAAN</h2>
           </div>

           <table className="w-full text-[11pt] border-collapse mb-12">
              <tbody>
                 {data.susunanPanitia.map((anggota, i) => (
                    <tr key={anggota.id}>
                       <td className="py-1.5 align-top w-[40px] text-center">{i+1}.</td>
                       <td className="py-1.5 align-top w-[200px]">{anggota.jabatan}</td>
                       <td className="py-1.5 align-top w-[15px]">:</td>
                       <td className="py-1.5 align-top font-bold">{anggota.nama}</td>
                    </tr>
                 ))}
              </tbody>
           </table>

           {/* TTD PENETAPAN (LAMPIRAN) */}
           <div className="flex justify-end break-inside-avoid">
             <table className="w-[300px] text-[11pt]">
                <tbody>
                  <tr>
                     <td className="text-center font-bold uppercase pb-16">{data.jabatanPenetapan}</td>
                  </tr>
                  <tr>
                     <td className="text-center font-bold underline uppercase">{data.namaPenetapan}</td>
                  </tr>
                </tbody>
             </table>
          </div>
        </div>

      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 0; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <ShieldCheck size={16} className="text-blue-500" /> <span>SK Generator (Susunan Panitia)</span>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak SK</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full print:translate-x-0 md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans">
             <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Editor SK Panitia</h2>
             <button onClick={handleReset} className="text-slate-400 hover:text-red-500" title="Reset Formulir"><RotateCcw size={16}/></button>
           </div>
           
 <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans print:flex print:overflow-visible print:bg-white">
              
              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Identitas SK</h3>
                 <div className="space-y-1">
                   <label className="text-[10px] font-bold text-slate-500">Kop Instansi</label>
                   <textarea className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none resize-none h-16" value={data.kopInstansi} onChange={e => handleDataChange('kopInstansi', e.target.value)} placeholder="PEMERINTAH KABUPATEN..." />
                 </div>
                 <div className="space-y-1">
                   <label className="text-[10px] font-bold text-slate-500">Kontak Instansi (Baris ke-2 Kop)</label>
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.kopKontak} onChange={e => handleDataChange('kopKontak', e.target.value)} placeholder="Alamat, Telp, Email" />
                 </div>
                 <div className="space-y-1">
                   <label className="text-[10px] font-bold text-slate-500">Judul SK (KEPUTUSAN ...)</label>
                   <input className="w-full p-2 border rounded-lg text-xs font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.judulSk} onChange={e => handleDataChange('judulSk', e.target.value)} placeholder="KEPUTUSAN KEPALA DESA / KETUA" />
                 </div>
                 <div className="space-y-1">
                   <label className="text-[10px] font-bold text-slate-500">Nomor SK</label>
                   <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none" value={data.nomorSk} onChange={e => handleDataChange('nomorSk', e.target.value)} placeholder="Nomor SK" />
                 </div>
                 <div className="space-y-1">
                   <label className="text-[10px] font-bold text-slate-500">Tentang / Perihal</label>
                   <textarea className="w-full p-2 border rounded-lg text-xs font-bold uppercase h-20 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.tentang} onChange={e => handleDataChange('tentang', e.target.value)} placeholder="TENTANG PEMBENTUKAN PANITIA..." />
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-6">
                 <h3 className="text-[10px] font-black uppercase text-purple-600 border-b pb-1 tracking-widest flex items-center gap-2"><CheckCircle size={12}/> Konsideran & Diktum</h3>
                 
                 <div className="space-y-2">
                    <div className="flex justify-between items-center"><label className="text-xs font-bold">Menimbang (a, b, c)</label> <button onClick={() => addArrayItem('menimbang')} className="text-blue-500 hover:text-blue-600 p-1"><Plus size={14}/></button></div>
                    {data.menimbang.map((item, i) => (
                       <div key={i} className="flex gap-2">
                          <textarea className="flex-1 p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-purple-500 outline-none" value={item} onChange={e => handleArrayChange('menimbang', i, e.target.value)} placeholder="bahwa..." />
                          <button onClick={() => removeArrayItem('menimbang', i)} className="text-red-400 hover:text-red-600"><Trash2 size={14}/></button>
                       </div>
                    ))}
                 </div>

                 <div className="space-y-2">
                    <div className="flex justify-between items-center"><label className="text-xs font-bold">Mengingat (1, 2, 3)</label> <button onClick={() => addArrayItem('mengingat')} className="text-blue-500 hover:text-blue-600 p-1"><Plus size={14}/></button></div>
                    {data.mengingat.map((item, i) => (
                       <div key={i} className="flex gap-2">
                          <textarea className="flex-1 p-2 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-purple-500 outline-none" value={item} onChange={e => handleArrayChange('mengingat', i, e.target.value)} placeholder="Undang-undang..." />
                          <button onClick={() => removeArrayItem('mengingat', i)} className="text-red-400 hover:text-red-600"><Trash2 size={14}/></button>
                       </div>
                    ))}
                 </div>

                 <div className="space-y-2">
                    <div className="flex justify-between items-center"><label className="text-xs font-bold">Diktum (KESATU, KEDUA)</label> <button onClick={() => addArrayItem('diktum')} className="text-blue-500 hover:text-blue-600 p-1"><Plus size={14}/></button></div>
                    {data.diktum.map((item, i) => (
                       <div key={i} className="flex gap-2">
                          <textarea className="flex-1 p-2 border rounded-lg text-xs h-20 resize-none focus:ring-2 focus:ring-purple-500 outline-none" value={item} onChange={e => handleArrayChange('diktum', i, e.target.value)} placeholder="Isi keputusan..." />
                          <button onClick={() => removeArrayItem('diktum', i)} className="text-red-400 hover:text-red-600"><Trash2 size={14}/></button>
                       </div>
                    ))}
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 tracking-widest flex items-center gap-2"><Users size={12}/> Susunan Panitia (Lampiran)</h3>
                 
                 <div className="space-y-3">
                    {data.susunanPanitia.map((anggota, i) => (
                       <div key={anggota.id} className="flex gap-2 items-center bg-slate-50 p-2 rounded-lg border">
                          <div className="flex-1 space-y-2">
                             <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-medium" placeholder="Jabatan (Ketua, Sekretaris, dll)" value={anggota.jabatan} onChange={e => handlePanitiaChange(i, 'jabatan', e.target.value)} />
                             <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-emerald-500 outline-none font-bold" placeholder="Nama Lengkap" value={anggota.nama} onChange={e => handlePanitiaChange(i, 'nama', e.target.value)} />
                          </div>
                          <button onClick={() => removePanitia(i)} className="text-red-400 hover:text-red-600 p-2"><Trash2 size={16}/></button>
                       </div>
                    ))}
                    <button onClick={addPanitia} className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 text-xs font-bold rounded-lg flex items-center justify-center gap-2 transition-colors">
                       <Plus size={14} /> Tambah Anggota Panitia
                    </button>
                 </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-orange-600 border-b pb-1 tracking-widest flex items-center gap-2"><FileText size={12}/> Penetapan SK</h3>
                 <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                       <label className="text-[10px] font-bold text-slate-500">Ditetapkan Di</label>
                       <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-orange-500 outline-none" value={data.ditetapkanDi} onChange={e => handleDataChange('ditetapkanDi', e.target.value)} placeholder="Kota / Tempat" />
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] font-bold text-slate-500">Tanggal</label>
                       <input type="date" className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-orange-500 outline-none" value={data.tanggalPenetapan} onChange={e => handleDataChange('tanggalPenetapan', e.target.value)} />
                    </div>
                 </div>
                 <div className="space-y-1">
                     <label className="text-[10px] font-bold text-slate-500">Jabatan Penandatangan</label>
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-orange-500 outline-none font-bold uppercase" value={data.jabatanPenetapan} onChange={e => handleDataChange('jabatanPenetapan', e.target.value)} placeholder="Cth: Perbekel Desa Singakerta" />
                 </div>
                 <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500">Nama Penandatangan</label>
                    <input className="w-full p-2 border rounded-lg text-xs focus:ring-2 focus:ring-orange-500 outline-none font-bold uppercase" value={data.namaPenetapan} onChange={e => handleDataChange('namaPenetapan', e.target.value)} placeholder="Nama Terang" />
                 </div>
              </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
 <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:flex print:overflow-visible print:bg-white print:static`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 shadow-2xl shrink-0 print:scale-100 print:transform-none print:w-full print:m-0 print:block">
                <StatementContent />
            </div>
            
            {/* AREA TOMBOL MONETISASI (ONLY SHOW IN PREVIEW SCREEN) */}
            <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mt-8">
               <PrintWrapper documentName="SK Susunan Panitia" price={15000} />
            </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>PREVIEW</button>
      </div>

      <div id="print-only-root" className="hidden print:block print:h-auto print:static bg-white w-full"><StatementContent /></div>
    </div>
  );
}
