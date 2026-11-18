import sys

def main():
    file_path = r"d:\WEB DESIGN\LayananDokumen\components\templates\panitia\index.tsx"
    
    new_content = """'use client';

/**
 * FILE: SKPanitiaPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Keputusan (SK) Susunan Panitia
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, ShieldCheck, Building2, 
  Edit3, RotateCcw, Plus, Trash2, FileText, CheckCircle, Users, Scale
} from 'lucide-react';
import Link from 'next/link';

// IMPORT KOMPONEN SAKTI
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
  kopInstansi: 'PEMERINTAH KABUPATEN GIANYAR\\nKECAMATAN UBUD\\nDESA SINGAKERTA',
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
  tanggalPenetapan: '2026-08-01',
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

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[10.5pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function SKPanitiaPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor SK Panitia...</div>}>
      <PanitiaBuilder />
    </Suspense>
  );
}

function PanitiaBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<PanitiaData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'kop' | 'diktum' | 'panitia'>('kop');

  useEffect(() => {
    setIsClient(true);
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, tanggalPenetapan: today }));
  }, []);

  const handleChange = (field: keyof PanitiaData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleArrayChange = (field: 'menimbang' | 'mengingat' | 'diktum', index: number, val: string) => {
    const newArr = [...data[field]];
    newArr[index] = val;
    setData(prev => ({ ...prev, [field]: newArr }));
  };

  const addArrayItem = (field: 'menimbang' | 'mengingat' | 'diktum') => {
    setData(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  const removeArrayItem = (field: 'menimbang' | 'mengingat' | 'diktum', index: number) => {
    const newArr = [...data[field]];
    newArr.splice(index, 1);
    setData(prev => ({ ...prev, [field]: newArr }));
  };

  const handlePanitiaChange = (index: number, field: keyof SusunanAnggota, val: string) => {
    const newPanitia = [...data.susunanPanitia];
    newPanitia[index] = { ...newPanitia[index], [field]: val };
    setData(prev => ({ ...prev, susunanPanitia: newPanitia }));
  };

  const addPanitia = () => {
    setData(prev => ({ 
        ...prev, 
        susunanPanitia: [...prev.susunanPanitia, { id: generateId(), jabatan: '', nama: '' }] 
    }));
  };

  const removePanitia = (index: number) => {
    const newPanitia = [...data.susunanPanitia];
    newPanitia.splice(index, 1);
    setData(prev => ({ ...prev, susunanPanitia: newPanitia }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset draft SK ke setelan awal?')) {
        const today = new Date().toISOString().split('T')[0];
        setData({ ...INITIAL_DATA, tanggalPenetapan: today });
    }
  };

  const numberToLetters = (num: number) => {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'];
    return letters[num] || String.fromCharCode(97 + num);
  };

  const numberToOrdinalWords = (num: number) => {
    const words = ['KESATU', 'KEDUA', 'KETIGA', 'KEEMPAT', 'KELIMA', 'KEENAM', 'KETUJUH', 'KEDELAPAN', 'KESEMBILAN', 'KESEPULUH'];
    return words[num] || `KE-${num + 1}`;
  };

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try { return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}); } catch { return dateString; }
    };

    return (
      <div className="flex flex-col gap-8 print:gap-0">
        {/* HALAMAN 1: SK */}
        <Kertas>
            {/* KOP SURAT */}
            <div className="text-center border-b-[3px] border-black pb-3 mb-6 break-inside-avoid relative">
                <div className="font-bold uppercase text-md tracking-wider leading-snug whitespace-pre-line">{data.kopInstansi}</div>
                <p className="text-[9pt] italic mt-2 font-sans">{data.kopKontak}</p>
            </div>

            {/* JUDUL SK */}
            <div className="text-center mb-8 break-inside-avoid">
                <h1 className="font-bold text-lg uppercase tracking-wider">{data.judulSk}</h1>
                <p className="font-bold text-md mt-1">NOMOR: {data.nomorSk}</p>
                <p className="font-bold text-md mt-4 uppercase">TENTANG</p>
                <p className="font-bold text-md uppercase mt-1 w-4/5 mx-auto">{data.tentang}</p>
            </div>

            <div className="text-center font-bold mb-6 break-inside-avoid">
                <p className="uppercase">{data.judulSk.split(' ')[0] || 'KEPALA'} {data.kopInstansi.split('\\n')[0]}</p>
            </div>

            {/* MENIMBANG & MENGINGAT */}
            <div className="mb-6 break-inside-avoid">
                <table className="w-full text-justify">
                    <tbody>
                        <tr>
                            <td className="w-24 align-top py-1">Menimbang</td>
                            <td className="w-4 align-top py-1">:</td>
                            <td className="align-top py-1">
                                {data.menimbang.map((item, idx) => (
                                    <div key={idx} className="flex mb-1">
                                        <div className="w-6">{numberToLetters(idx)}.</div>
                                        <div className="flex-1">{item}</div>
                                    </div>
                                ))}
                            </td>
                        </tr>
                        <tr>
                            <td className="w-24 align-top py-1 pt-3">Mengingat</td>
                            <td className="w-4 align-top py-1 pt-3">:</td>
                            <td className="align-top py-1 pt-3">
                                {data.mengingat.map((item, idx) => (
                                    <div key={idx} className="flex mb-1">
                                        <div className="w-6">{idx + 1}.</div>
                                        <div className="flex-1">{item}</div>
                                    </div>
                                ))}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="text-center font-bold mb-6 break-inside-avoid">
                <p>MEMUTUSKAN:</p>
            </div>

            {/* DIKTUM */}
            <div className="mb-8 break-inside-avoid text-justify">
                <table className="w-full">
                    <tbody>
                        <tr>
                            <td className="w-24 align-top py-1">Menetapkan</td>
                            <td className="w-4 align-top py-1">:</td>
                            <td className="align-top py-1 font-bold uppercase">{data.tentang}</td>
                        </tr>
                        {data.diktum.map((item, idx) => (
                            <tr key={idx}>
                                <td className="w-24 align-top py-1 pt-3 font-bold">{numberToOrdinalWords(idx)}</td>
                                <td className="w-4 align-top py-1 pt-3">:</td>
                                <td className="align-top py-1 pt-3">{item}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* TANDA TANGAN HAL 1 */}
            <div className="flex justify-end text-center break-inside-avoid pr-8">
                <div className="w-72">
                    <table className="w-full text-left mb-2">
                        <tbody>
                            <tr><td className="w-20">Ditetapkan di</td><td className="w-4">:</td><td>{data.ditetapkanDi}</td></tr>
                            <tr><td>Pada tanggal</td><td>:</td><td>{formatDateSafe(data.tanggalPenetapan)}</td></tr>
                        </tbody>
                    </table>
                    <div className="border-t border-black mb-2"></div>
                    <p className="font-bold uppercase mb-20">{data.jabatanPenetapan}</p>
                    <p className="font-bold underline uppercase">{data.namaPenetapan}</p>
                </div>
            </div>
        </Kertas>

        {/* HALAMAN 2: LAMPIRAN SUSUNAN PANITIA */}
        <Kertas>
            <div className="flex justify-end mb-8 text-[10pt] break-inside-avoid">
                <table className="w-80">
                    <tbody>
                        <tr><td className="w-20 align-top">LAMPIRAN</td><td className="w-4 align-top">:</td><td className="align-top">{data.judulSk}</td></tr>
                        <tr><td className="align-top">NOMOR</td><td className="align-top">:</td><td className="align-top">{data.nomorSk}</td></tr>
                        <tr><td className="align-top">TANGGAL</td><td className="align-top">:</td><td className="align-top">{formatDateSafe(data.tanggalPenetapan)}</td></tr>
                        <tr><td className="align-top">TENTANG</td><td className="align-top">:</td><td className="align-top font-bold">{data.tentang}</td></tr>
                    </tbody>
                </table>
            </div>

            <div className="text-center font-bold mb-8 break-inside-avoid uppercase">
                <h3>SUSUNAN KEPANITIAAN</h3>
                <h3 className="w-4/5 mx-auto">{data.tentang}</h3>
            </div>

            <div className="mb-12 break-inside-avoid">
                <table className="w-full border-collapse border border-black text-[10pt]">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-black p-2 w-16 text-center">NO</th>
                            <th className="border border-black p-2 w-1/3 text-left">JABATAN DALAM KEPANITIAAN</th>
                            <th className="border border-black p-2 text-left">NAMA LENGKAP</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.susunanPanitia.map((anggota, index) => (
                            <tr key={anggota.id}>
                                <td className="border border-black p-2 text-center align-top">{index + 1}</td>
                                <td className="border border-black p-2 align-top">{anggota.jabatan}</td>
                                <td className="border border-black p-2 align-top font-bold">{anggota.nama}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* TANDA TANGAN HAL 2 */}
            <div className="flex justify-end text-center break-inside-avoid pr-8">
                <div className="w-72">
                    <p className="font-bold uppercase mb-20">{data.jabatanPenetapan}</p>
                    <p className="font-bold underline uppercase">{data.namaPenetapan}</p>
                </div>
            </div>
        </Kertas>
      </div>
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
              <ArrowLeftCircle size={20} className="text-teal-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">SK Susunan Panitia</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-teal-600 hover:bg-teal-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-teal-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[500px] lg:w-[600px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Edit3 size={18} className="text-teal-600" /> Draft SK</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('kop')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'kop' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>1. Identitas SK</button>
                <button onClick={() => setActiveTab('diktum')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'diktum' ? 'bg-white border-t-2 border-teal-500 text-teal-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Konsideran (Isi)</button>
                <button onClick={() => setActiveTab('panitia')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'panitia' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. Daftar Anggota</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'kop' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building2 size={14} className="text-slate-600"/> Kop & Detail SK
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kop Instansi (Baris Baru = Enter)</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm font-bold uppercase h-24 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.kopInstansi} onChange={e => handleChange('kopInstansi', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kontak & Alamat Instansi</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.kopKontak} onChange={e => handleChange('kopKontak', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Judul Keputusan (Pejabat)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.judulSk} onChange={e => handleChange('judulSk', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor SK</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.nomorSk} onChange={e => handleChange('nomorSk', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tentang (Topik Pembentukan Panitia)</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm font-bold uppercase h-20 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.tentang} onChange={e => handleChange('tentang', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 my-4"></div>
                        <h4 className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Penetapan Surat</h4>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Ditetapkan Di (Kota)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.ditetapkanDi} onChange={e => handleChange('ditetapkanDi', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Penetapan</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.tanggalPenetapan} onChange={e => handleChange('tanggalPenetapan', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan Penanda Tangan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.jabatanPenetapan} onChange={e => handleChange('jabatanPenetapan', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Penanda Tangan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.namaPenetapan} onChange={e => handleChange('namaPenetapan', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'diktum' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-6 border-l-4 border-l-teal-500">
                    
                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2">
                                <Scale size={14} className="text-teal-600"/> Konsideran Menimbang
                            </h3>
                            <button onClick={() => addArrayItem('menimbang')} className="text-[10px] bg-teal-100 text-teal-700 px-2 py-1 rounded font-bold hover:bg-teal-200 flex items-center gap-1"><Plus size={12}/> Tambah</button>
                        </div>
                        <div className="space-y-3">
                            {data.menimbang.map((item, idx) => (
                                <div key={idx} className="flex gap-2 items-start">
                                    <div className="bg-slate-100 text-slate-500 font-bold px-2 py-2 rounded text-xs w-8 text-center">{String.fromCharCode(97 + idx)}.</div>
                                    <textarea className="flex-1 bg-slate-50 p-2 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none" value={item} onChange={(e) => handleArrayChange('menimbang', idx, e.target.value)} />
                                    <button onClick={() => removeArrayItem('menimbang', idx)} className="p-2 text-rose-400 hover:bg-rose-50 rounded-lg"><Trash2 size={16}/></button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-slate-200"></div>

                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2">
                                <FileText size={14} className="text-teal-600"/> Dasar Hukum Mengingat
                            </h3>
                            <button onClick={() => addArrayItem('mengingat')} className="text-[10px] bg-teal-100 text-teal-700 px-2 py-1 rounded font-bold hover:bg-teal-200 flex items-center gap-1"><Plus size={12}/> Tambah</button>
                        </div>
                        <div className="space-y-3">
                            {data.mengingat.map((item, idx) => (
                                <div key={idx} className="flex gap-2 items-start">
                                    <div className="bg-slate-100 text-slate-500 font-bold px-2 py-2 rounded text-xs w-8 text-center">{idx + 1}.</div>
                                    <textarea className="flex-1 bg-slate-50 p-2 border border-slate-200 rounded-xl text-sm h-12 resize-none focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none" value={item} onChange={(e) => handleArrayChange('mengingat', idx, e.target.value)} />
                                    <button onClick={() => removeArrayItem('mengingat', idx)} className="p-2 text-rose-400 hover:bg-rose-50 rounded-lg"><Trash2 size={16}/></button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t border-slate-200"></div>

                    <div>
                        <div className="flex justify-between items-center mb-3">
                            <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2">
                                <CheckCircle size={14} className="text-teal-600"/> Diktum Keputusan
                            </h3>
                            <button onClick={() => addArrayItem('diktum')} className="text-[10px] bg-teal-100 text-teal-700 px-2 py-1 rounded font-bold hover:bg-teal-200 flex items-center gap-1"><Plus size={12}/> Tambah</button>
                        </div>
                        <div className="space-y-3">
                            {data.diktum.map((item, idx) => (
                                <div key={idx} className="flex gap-2 items-start">
                                    <div className="bg-slate-100 text-slate-500 font-bold px-2 py-2 rounded text-[9px] uppercase w-20 text-center tracking-tighter">KE-{idx + 1}</div>
                                    <textarea className="flex-1 bg-slate-50 p-2 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-teal-500 outline-none" value={item} onChange={(e) => handleArrayChange('diktum', idx, e.target.value)} />
                                    <button onClick={() => removeArrayItem('diktum', idx)} className="p-2 text-rose-400 hover:bg-rose-50 rounded-lg"><Trash2 size={16}/></button>
                                </div>
                            ))}
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'panitia' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <div className="flex justify-between items-center border-b pb-3 border-slate-100">
                        <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2">
                            <Users size={14} className="text-blue-600"/> Susunan Anggota
                        </h3>
                        <button onClick={addPanitia} className="text-xs bg-blue-600 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-blue-700 shadow-md flex items-center gap-1"><Plus size={14}/> Tambah Anggota</button>
                    </div>
                    
                    <div className="space-y-3 mt-4">
                        {data.susunanPanitia.map((anggota, index) => (
                            <div key={anggota.id} className="flex gap-2 items-center bg-slate-50 p-2 rounded-xl border border-slate-200 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                                <div className="bg-blue-100 text-blue-800 font-bold w-6 h-6 rounded-full flex items-center justify-center text-[10px] shrink-0">{index + 1}</div>
                                <input 
                                    className="w-1/3 bg-white p-2 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500" 
                                    placeholder="Jabatan (Ketua/Anggota)"
                                    value={anggota.jabatan}
                                    onChange={e => handlePanitiaChange(index, 'jabatan', e.target.value)}
                                />
                                <input 
                                    className="flex-1 bg-white p-2 border border-slate-200 rounded-lg text-sm outline-none font-bold focus:border-blue-500" 
                                    placeholder="Nama Lengkap"
                                    value={anggota.nama}
                                    onChange={e => handlePanitiaChange(index, 'nama', e.target.value)}
                                />
                                <button onClick={() => removePanitia(index)} className="p-2 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg shrink-0 transition-colors">
                                    <Trash2 size={16}/>
                                </button>
                            </div>
                        ))}
                    </div>
                  </div>
              )}

            </div>
        </aside>

        {/* PREVIEW AREA */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.5] sm:scale-[0.6] md:scale-[0.7] lg:scale-100 mb-[-300mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           {/* Paywall Monetisasi - Diletakkan di luar print flow */}
           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName={`SK_Panitia_${data.nomorSk.replace(/[^a-zA-Z0-9]/g, '_')}`} price={45000} />
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
