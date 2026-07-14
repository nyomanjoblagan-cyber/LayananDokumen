'use client';

import React, { useState, Suspense, useEffect } from "react";
import { Printer, Plus, Trash2, ArrowLeftCircle, Edit3, RotateCcw, BookOpen } from "lucide-react";
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface BebanBiaya {
  id: string;
  jenis: string;
  ditanggungOleh: string;
  keterangan: string;
}

interface SuratTugasData {
  nomorSurat: string;
  tanggalSurat: string;
  pemberiTugas: {
    nama: string;
    jabatan: string;
    nip: string;
  };
  penerimaTugas: {
    nama: string;
    jabatan: string;
    nip: string;
  };
  tujuanTugas: string;
  lokasi: string;
  waktuMulai: string;
  waktuSelesai: string;
  bebanBiaya: BebanBiaya[];
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: SuratTugasData = {
  nomorSurat: "001/ST/2026",
  tanggalSurat: "",
  pemberiTugas: {
    nama: "Dr. Budi Santoso",
    jabatan: "Direktur Utama",
    nip: "198001012005011001"
  },
  penerimaTugas: {
    nama: "Andi Wijaya, S.Kom.",
    jabatan: "Staff IT",
    nip: "199002022015021002"
  },
  tujuanTugas: "Melakukan maintenance server dan instalasi jaringan baru",
  lokasi: "Kantor Cabang Bandung",
  waktuMulai: "",
  waktuSelesai: "",
  bebanBiaya: [
    { id: "1", jenis: "Akomodasi", ditanggungOleh: "Perusahaan", keterangan: "Hotel Bintang 3" },
    { id: "2", jenis: "Transportasi", ditanggungOleh: "Perusahaan", keterangan: "Pesawat PP" },
    { id: "3", jenis: "Uang Harian", ditanggungOleh: "Perusahaan", keterangan: "Rp 500.000/hari" }
  ]
};

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto ${className}`}>
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function SuratTugasPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Tugas...</div>}>
      <SuratTugasBuilder />
    </Suspense>
  );
}

function SuratTugasBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'info' | 'pemberi' | 'penerima' | 'detail' | 'biaya'>('info');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<SuratTugasData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const now = new Date();
    const threeDaysLater = new Date(Date.now() + 86400000 * 3);
    setData(prev => ({
        ...prev,
        tanggalSurat: now.toISOString().split('T')[0],
        waktuMulai: now.toISOString().split('T')[0],
        waktuSelesai: threeDaysLater.toISOString().split('T')[0]
    }));
  }, []);

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const now = new Date();
        const threeDaysLater = new Date(Date.now() + 86400000 * 3);
        setData({ 
            ...INITIAL_DATA,
            tanggalSurat: now.toISOString().split('T')[0],
            waktuMulai: now.toISOString().split('T')[0],
            waktuSelesai: threeDaysLater.toISOString().split('T')[0]
        });
    }
  };

  const addBiaya = () => setData({ ...data, bebanBiaya: [...data.bebanBiaya, { id: Date.now().toString(), jenis: "", ditanggungOleh: "", keterangan: "" }] });
  const removeBiaya = (id: string) => setData({ ...data, bebanBiaya: data.bebanBiaya.filter(b => b.id !== id) });
  const updateBiaya = (id: string, field: keyof BebanBiaya, value: string) => setData({ ...data, bebanBiaya: data.bebanBiaya.map(b => b.id === id ? { ...b, [field]: value } : b) });

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).format(date);
    } catch {
      return dateString;
    }
  };

  const DocumentContent = () => (
    <Kertas>
      {/* Header */}
      <div className="text-center mb-10 border-b-2 border-black pb-4 break-inside-avoid">
        <h1 className="text-2xl font-bold uppercase tracking-wider mb-1">SURAT PERINTAH TUGAS</h1>
        <p className="text-lg">Nomor: {data.nomorSurat}</p>
      </div>

      {/* Pembukaan */}
      <div className="mb-6 break-inside-avoid">
        <p className="mb-3">Yang bertanda tangan di bawah ini:</p>
        <table className="w-full ml-4 mb-4">
          <tbody>
            <tr>
              <td className="w-1/4 align-top py-1.5">Nama</td>
              <td className="w-[1%] align-top py-1.5 px-2">:</td>
              <td className="align-top py-1.5 font-bold">{data.pemberiTugas.nama}</td>
            </tr>
            <tr>
              <td className="align-top py-1.5">Jabatan</td>
              <td className="align-top py-1.5 px-2">:</td>
              <td className="align-top py-1.5">{data.pemberiTugas.jabatan}</td>
            </tr>
            {data.pemberiTugas.nip && (
              <tr>
                <td className="align-top py-1.5">NIP/NIK</td>
                <td className="align-top py-1.5 px-2">:</td>
                <td className="align-top py-1.5">{data.pemberiTugas.nip}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="mb-6 break-inside-avoid">
        <p className="mb-3">Dengan ini memberikan tugas dan wewenang kepada:</p>
        <table className="w-full ml-4 mb-4">
          <tbody>
            <tr>
              <td className="w-1/4 align-top py-1.5">Nama</td>
              <td className="w-[1%] align-top py-1.5 px-2">:</td>
              <td className="align-top py-1.5 font-bold">{data.penerimaTugas.nama}</td>
            </tr>
            <tr>
              <td className="align-top py-1.5">Jabatan</td>
              <td className="align-top py-1.5 px-2">:</td>
              <td className="align-top py-1.5">{data.penerimaTugas.jabatan}</td>
            </tr>
            {data.penerimaTugas.nip && (
              <tr>
                <td className="align-top py-1.5">NIP/NIK</td>
                <td className="align-top py-1.5 px-2">:</td>
                <td className="align-top py-1.5">{data.penerimaTugas.nip}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Detail Tugas */}
      <div className="mb-6 break-inside-avoid">
        <p className="mb-3">Untuk melaksanakan tugas kedinasan dengan rincian sebagai berikut:</p>
        <table className="w-full ml-4 mb-4">
          <tbody>
            <tr>
              <td className="w-1/4 align-top py-1.5">Maksud dan Tujuan</td>
              <td className="w-[1%] align-top py-1.5 px-2">:</td>
              <td className="align-top py-1.5 text-justify">{data.tujuanTugas || "-"}</td>
            </tr>
            <tr>
              <td className="align-top py-1.5">Tempat / Lokasi</td>
              <td className="align-top py-1.5 px-2">:</td>
              <td className="align-top py-1.5">{data.lokasi || "-"}</td>
            </tr>
            <tr>
              <td className="align-top py-1.5">Waktu Pelaksanaan</td>
              <td className="align-top py-1.5 px-2">:</td>
              <td className="align-top py-1.5">
                {formatDate(data.waktuMulai)} 
                {data.waktuMulai !== data.waktuSelesai && ` s/d ${formatDate(data.waktuSelesai)}`}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Beban Biaya */}
      <div className="mb-8 break-inside-avoid">
        <p className="mb-3">Adapun rincian beban biaya yang timbul atas pelaksanaan tugas ini diatur sebagai berikut:</p>
        <table className="w-full border-collapse border border-slate-900 mb-4">
          <thead>
            <tr>
              <th className="border border-slate-900 px-4 py-2 font-bold w-12 text-center bg-slate-100 print:bg-transparent">No</th>
              <th className="border border-slate-900 px-4 py-2 font-bold text-left bg-slate-100 print:bg-transparent">Jenis Biaya</th>
              <th className="border border-slate-900 px-4 py-2 font-bold text-left bg-slate-100 print:bg-transparent">Ditanggung Oleh</th>
              <th className="border border-slate-900 px-4 py-2 font-bold text-left bg-slate-100 print:bg-transparent">Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {data.bebanBiaya.length > 0 ? (
              data.bebanBiaya.map((biaya, idx) => (
                <tr key={biaya.id}>
                  <td className="border border-slate-900 px-4 py-2 text-center">{idx + 1}</td>
                  <td className="border border-slate-900 px-4 py-2">{biaya.jenis || "-"}</td>
                  <td className="border border-slate-900 px-4 py-2">{biaya.ditanggungOleh || "-"}</td>
                  <td className="border border-slate-900 px-4 py-2">{biaya.keterangan || "-"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="border border-slate-900 px-4 py-6 text-center italic">Tidak ada rincian beban biaya.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Clause Laporan */}
      <div className="mb-12 text-justify bg-slate-50 p-4 border-l-4 border-slate-800 break-inside-avoid">
        <p className="font-semibold text-slate-900">
          Klausul Wajib Laporan:
        </p>
        <p>
          Karyawan yang bersangkutan diwajibkan untuk menyampaikan laporan tertulis pelaksanaan tugas selambat-lambatnya <strong>3 (tiga) hari kerja</strong> setelah tugas selesai dilaksanakan.
        </p>
      </div>

      <p className="mb-8 break-inside-avoid">Demikian Surat Perintah Tugas ini dibuat untuk dapat dilaksanakan dengan penuh tanggung jawab.</p>

      {/* Tanda Tangan */}
      <div className="flex justify-between items-end mt-16 px-4 break-inside-avoid shrink-0">
        <div className="text-center w-1/3">
          <p className="mb-24">Penerima Tugas,</p>
          <p className="font-bold underline">{data.penerimaTugas.nama}</p>
          {data.penerimaTugas.nip && <p>NIP. {data.penerimaTugas.nip}</p>}
        </div>
        <div className="text-center w-1/3">
          <p className="mb-1">Jakarta, {formatDate(data.tanggalSurat)}</p>
          <p className="mb-24">Pemberi Tugas,</p>
          <p className="font-bold underline">{data.pemberiTugas.nama}</p>
          {data.pemberiTugas.nip && <p>NIP. {data.pemberiTugas.nip}</p>}
        </div>
      </div>
    </Kertas>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Perintah Tugas</h1>
              <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">Corporate Tools</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-40 no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mobileView === 'editor' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 ${mobileView === 'preview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-500'}`}>
          <Printer size={16} /> Preview
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden relative print:hidden">
        
        {/* EDITOR SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] bg-white border-r border-slate-200 h-[calc(100vh-64px)] md:sticky md:top-16 z-30 no-print shadow-xl shrink-0`}>
            <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center shrink-0">
                <h2 className="font-black text-slate-800 uppercase tracking-tight text-sm flex items-center gap-2">
                  <Edit3 size={18} className="text-emerald-600" /> Editor Surat Tugas
                </h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>

            {/* TAB NAVIGATION */}
            <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('info')} className={`flex-1 py-3 border-r ${activeTab === 'info' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Info</button>
              <button onClick={() => setActiveTab('pemberi')} className={`flex-1 py-3 border-r ${activeTab === 'pemberi' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pemberi</button>
              <button onClick={() => setActiveTab('penerima')} className={`flex-1 py-3 border-r ${activeTab === 'penerima' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Penerima</button>
              <button onClick={() => setActiveTab('detail')} className={`flex-1 py-3 border-r ${activeTab === 'detail' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>Detail</button>
              <button onClick={() => setActiveTab('biaya')} className={`flex-1 py-3 ${activeTab === 'biaya' ? 'bg-white text-red-600 border-b-2 border-b-red-600' : 'text-slate-500 hover:bg-slate-200'}`}>Biaya</button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent">
                
                {activeTab === 'info' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Informasi Surat</h3>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Surat</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none" value={data.nomorSurat} onChange={e => setData({ ...data, nomorSurat: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Surat</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none" value={data.tanggalSurat} onChange={e => setData({ ...data, tanggalSurat: e.target.value })} />
                  </div>
                </div>
                )}

                {activeTab === 'pemberi' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Pemberi Tugas</h3>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                    <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1 focus:ring-2 focus:ring-blue-500 outline-none" value={data.pemberiTugas.nama} onChange={e => setData({ ...data, pemberiTugas: { ...data.pemberiTugas, nama: e.target.value } })} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none" value={data.pemberiTugas.jabatan} onChange={e => setData({ ...data, pemberiTugas: { ...data.pemberiTugas, jabatan: e.target.value } })} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">NIP / NIK (Opsional)</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-blue-500 outline-none" value={data.pemberiTugas.nip} onChange={e => setData({ ...data, pemberiTugas: { ...data.pemberiTugas, nip: e.target.value } })} />
                  </div>
                </div>
                )}

                {activeTab === 'penerima' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Penerima Tugas</h3>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                    <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1 focus:ring-2 focus:ring-emerald-500 outline-none" value={data.penerimaTugas.nama} onChange={e => setData({ ...data, penerimaTugas: { ...data.penerimaTugas, nama: e.target.value } })} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-emerald-500 outline-none" value={data.penerimaTugas.jabatan} onChange={e => setData({ ...data, penerimaTugas: { ...data.penerimaTugas, jabatan: e.target.value } })} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">NIP / NIK (Opsional)</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-emerald-500 outline-none" value={data.penerimaTugas.nip} onChange={e => setData({ ...data, penerimaTugas: { ...data.penerimaTugas, nip: e.target.value } })} />
                  </div>
                </div>
                )}

                {activeTab === 'detail' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <h3 className="text-xs font-black uppercase text-amber-600 border-b pb-1 mb-4">Detail Tugas</h3>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Maksud dan Tujuan Tugas</label>
                    <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-24 focus:ring-2 focus:ring-amber-500 outline-none" value={data.tujuanTugas} onChange={e => setData({ ...data, tujuanTugas: e.target.value })} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Lokasi / Tempat Pelaksanaan</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-amber-500 outline-none" value={data.lokasi} onChange={e => setData({ ...data, lokasi: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Waktu Mulai</label>
                      <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-amber-500 outline-none" value={data.waktuMulai} onChange={e => setData({ ...data, waktuMulai: e.target.value })} />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Waktu Selesai</label>
                      <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1 focus:ring-2 focus:ring-amber-500 outline-none" value={data.waktuSelesai} onChange={e => setData({ ...data, waktuSelesai: e.target.value })} />
                    </div>
                  </div>
                </div>
                )}

                {activeTab === 'biaya' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                  <div className="flex justify-between items-center border-b pb-1 mb-4">
                    <h3 className="text-xs font-black uppercase text-red-600">Rincian Beban Biaya</h3>
                    <button onClick={addBiaya} className="text-[10px] bg-red-50 text-red-700 hover:bg-red-100 font-bold px-2 py-1 rounded flex items-center gap-1 transition-colors uppercase tracking-wider">
                      <Plus size={12} /> Tambah
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {data.bebanBiaya.map((biaya, index) => (
                      <div key={biaya.id} className="relative bg-slate-50 p-3 border border-slate-200 rounded-lg">
                        <div className="absolute top-2 right-2">
                          <button onClick={() => removeBiaya(biaya.id)} className="text-slate-400 hover:text-red-500 hover:bg-red-50 p-1 rounded transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-1 pr-6">
                          <div>
                            <label className="text-[9px] font-bold text-slate-500 uppercase">Jenis Biaya</label>
                            <input type="text" placeholder="Cth: Akomodasi" className="w-full text-xs border rounded-md p-2 mt-1 focus:ring-2 focus:ring-red-500 outline-none" value={biaya.jenis} onChange={(e) => updateBiaya(biaya.id, 'jenis', e.target.value)} />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-slate-500 uppercase">Ditanggung Oleh</label>
                            <input type="text" placeholder="Cth: Perusahaan" className="w-full text-xs border rounded-md p-2 mt-1 focus:ring-2 focus:ring-red-500 outline-none" value={biaya.ditanggungOleh} onChange={(e) => updateBiaya(biaya.id, 'ditanggungOleh', e.target.value)} />
                          </div>
                          <div className="md:col-span-2">
                            <label className="text-[9px] font-bold text-slate-500 uppercase">Keterangan Tambahan</label>
                            <input type="text" placeholder="Cth: Hotel Bintang 3" className="w-full text-xs border rounded-md p-2 mt-1 focus:ring-2 focus:ring-red-500 outline-none" value={biaya.keterangan} onChange={(e) => updateBiaya(biaya.id, 'keterangan', e.target.value)} />
                          </div>
                        </div>
                      </div>
                    ))}
                    {data.bebanBiaya.length === 0 && (
                      <div className="text-center p-4 border-2 border-dashed border-slate-200 rounded-lg text-slate-400 text-[10px] uppercase font-bold">
                        Tidak ada data biaya
                      </div>
                    )}
                  </div>
                </div>
                )}

                <div className="pb-10"></div>
            </div>
        </aside>

        {/* PREVIEW AREA */}
        <main className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-200/50 overflow-y-auto p-4 md:p-8 lg:p-12 justify-center scrollbar-hide`}>
           <div className="scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 origin-top">
              <DocumentContent />
           </div>
        </main>
      </div>

      <div className="no-print hidden md:block">
         <PrintWrapper documentName="Surat_Tugas" price={10000} />
      </div>

      {/* PRINT-ONLY ROOT */}
      <div id="print-only-root" className="hidden print:block print:h-auto print:static">
         <div className="bg-white"><DocumentContent /></div>
      </div>
    </div>
  );
}
