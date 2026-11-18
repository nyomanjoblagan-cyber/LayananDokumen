import sys

def main():
    file_path = r"d:\WEB DESIGN\LayananDokumen\components\templates\surat-dinas\index.tsx"
    
    new_content = """'use client';

/**
 * FILE: SuratDinasPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Tugas Perjalanan Dinas Resmi
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, ArrowLeft, BookOpen, Users, MapPin, CalendarDays, Car
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface SuratDinasData {
  kopInstansi: string;
  kopAlamat: string;
  kopKontak: string;
  
  nomorSurat: string;
  sifat: string;
  lampiran: string;
  perihal: string;
  tempatTerbit: string;
  tanggalSurat: string;

  pegawaiNama: string;
  pegawaiNip: string;
  pegawaiPangkat: string;
  pegawaiJabatan: string;

  tujuanInstansi: string;
  tujuanKota: string;
  agenda: string;

  tanggalBerangkat: string;
  tanggalKembali: string;
  waktuPelaksanaan: string;

  jenisKendaraan: string;

  ttdJabatan: string;
  ttdNama: string;
  ttdNip: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: SuratDinasData = {
  kopInstansi: 'PEMERINTAH KABUPATEN SLEMAN\\nDINAS KOMUNIKASI DAN INFORMATIKA',
  kopAlamat: 'Jalan Parasamya No. 1, Beran, Tridadi, Sleman, Yogyakarta 55511',
  kopKontak: 'Telepon: (0274) 868405, Faksimile: (0274) 868405\\nEmail: diskominfo@slemankab.go.id, Website: diskominfo.slemankab.go.id',
  
  nomorSurat: '090/123/KOMINFO/2026',
  sifat: 'Biasa',
  lampiran: '-',
  perihal: 'Surat Tugas Perjalanan Dinas',
  tempatTerbit: 'Sleman',
  tanggalSurat: '2026-07-13',

  pegawaiNama: 'Budi Santoso, S.Kom., M.Eng.',
  pegawaiNip: '19850101 201001 1 001',
  pegawaiPangkat: 'Penata Tk. I (III/d)',
  pegawaiJabatan: 'Kepala Bidang Infrastruktur TIK',

  tujuanInstansi: 'Kementerian Komunikasi dan Informatika RI',
  tujuanKota: 'Jakarta Pusat',
  agenda: 'Koordinasi dan Konsultasi Teknis Pengembangan Smart City',

  tanggalBerangkat: '2026-07-15',
  tanggalKembali: '2026-07-17',
  waktuPelaksanaan: '08:00 WIB s.d. Selesai',

  jenisKendaraan: 'Pesawat Udara (Komersial) & Kendaraan Dinas',

  ttdJabatan: 'KEPALA DINAS',
  ttdNama: 'Drs. Supriyanto, M.M.',
  ttdNip: '19700510 199503 1 005',
};

function formatDateDisplay(dateStr: string) {
    if(!dateStr) return '';
    try {
        const parts = dateStr.split('-');
        if (parts.length === 3) {
            const date = new Date(dateStr);
            return new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
        }
    } catch {}
    return dateStr;
}

// --- 3. KERTAS MUTLAK ---
const Kertas = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-serif text-[11pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function SuratDinasPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Dinas...</div>}>
      <SuratDinasBuilder />
    </Suspense>
  );
}

function SuratDinasBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'kop' | 'pegawai' | 'tujuan' | 'waktu' | 'ttd'>('kop');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<SuratDinasData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field: keyof SuratDinasData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke default?')) {
        setData(INITIAL_DATA);
    }
  };

  const DocumentContent = () => (
    <Kertas>
      {/* KOP SURAT */}
      <div className="border-b-[3px] border-black pb-2 mb-6 text-center">
        <h1 className="text-xl font-bold uppercase whitespace-pre-line leading-tight">{data.kopInstansi}</h1>
        <p className="text-sm mt-1">{data.kopAlamat}</p>
        <p className="text-sm whitespace-pre-line leading-tight">{data.kopKontak}</p>
      </div>

      {/* META SURAT */}
      <div className="flex justify-between items-start mb-6 break-inside-avoid">
        <div>
            <table className="text-sm">
                <tbody>
                    <tr><td className="pr-4">Nomor</td><td>: {data.nomorSurat}</td></tr>
                    <tr><td className="pr-4">Sifat</td><td>: {data.sifat}</td></tr>
                    <tr><td className="pr-4">Lampiran</td><td>: {data.lampiran}</td></tr>
                    <tr><td className="pr-4">Perihal</td><td>: <strong>{data.perihal}</strong></td></tr>
                </tbody>
            </table>
        </div>
        <div className="text-right text-sm">
            <p>{data.tempatTerbit}, {formatDateDisplay(data.tanggalSurat)}</p>
        </div>
      </div>

      <div className="mb-6 break-inside-avoid">
        <p>Yth. {data.tujuanInstansi}</p>
        <p>di {data.tujuanKota}</p>
      </div>

      <div className="text-justify mb-4 break-inside-avoid">
        <p>Dengan hormat,</p>
        <p className="mt-2 text-justify">Sehubungan dengan tugas kedinasan untuk {data.agenda}, dengan ini kami menugaskan pegawai di lingkungan {data.kopInstansi.split('\\n')[0]} yang tersebut di bawah ini:</p>
      </div>

      {/* DATA PEGAWAI */}
      <div className="mb-6 pl-8 border-l-2 border-black ml-4 break-inside-avoid">
        <div className="flex mb-1"><div className="w-40 font-bold">Nama</div><div className="w-4">:</div><div className="flex-1 font-bold">{data.pegawaiNama}</div></div>
        <div className="flex mb-1"><div className="w-40">NIP</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.pegawaiNip}</div></div>
        <div className="flex mb-1"><div className="w-40">Pangkat/Gol.</div><div className="w-4">:</div><div className="flex-1">{data.pegawaiPangkat}</div></div>
        <div className="flex mb-1"><div className="w-40">Jabatan</div><div className="w-4">:</div><div className="flex-1">{data.pegawaiJabatan}</div></div>
      </div>

      <div className="text-justify mb-4 break-inside-avoid">
        <p>Untuk melaksanakan perjalanan dinas dengan ketentuan sebagai berikut:</p>
      </div>

      {/* DETAIL TUGAS */}
      <div className="mb-6 pl-8 border-l-2 border-black ml-4 break-inside-avoid">
        <div className="flex mb-1"><div className="w-40 font-bold">Tujuan / Agenda</div><div className="w-4">:</div><div className="flex-1 text-justify">{data.agenda}</div></div>
        <div className="flex mb-1"><div className="w-40 font-bold">Instansi Tujuan</div><div className="w-4">:</div><div className="flex-1">{data.tujuanInstansi}, {data.tujuanKota}</div></div>
        <div className="flex mb-1"><div className="w-40 font-bold">Waktu Pelaksanaan</div><div className="w-4">:</div><div className="flex-1">
            {formatDateDisplay(data.tanggalBerangkat)} s/d {formatDateDisplay(data.tanggalKembali)}
        </div></div>
        <div className="flex mb-1"><div className="w-40 font-bold">Jam</div><div className="w-4">:</div><div className="flex-1">{data.waktuPelaksanaan}</div></div>
        <div className="flex mb-1"><div className="w-40 font-bold">Alat Transportasi</div><div className="w-4">:</div><div className="flex-1">{data.jenisKendaraan}</div></div>
      </div>

      <div className="text-justify mb-8 break-inside-avoid">
        <p>Demikian Surat Tugas ini dibuat untuk dapat dilaksanakan dengan penuh tanggung jawab. Kepada instansi atau pihak terkait, dimohon kerjasamanya agar tugas ini dapat berjalan dengan lancar. Setelah selesai melaksanakan tugas, yang bersangkutan diwajibkan memberikan laporan hasil perjalanan dinas.</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="flex justify-end px-4 break-inside-avoid mt-8 mb-8">
        <div className="text-center w-72">
            <p className="mb-2 uppercase">{data.ttdJabatan}</p>
            <div className="h-24 flex justify-center items-center">
                <span className="text-gray-300 text-[10px] print:hidden">(Stempel Instansi & TTD)</span>
            </div>
            <p className="font-bold underline uppercase">{data.ttdNama}</p>
            <p className="text-sm">NIP. {data.ttdNip}</p>
        </div>
      </div>
    </Kertas>
  );

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
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Surat Dinas Instansi</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-emerald-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><BookOpen size={18} className="text-emerald-600" /> Editor Dinas</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0 overflow-x-auto no-scrollbar">
                <button onClick={() => setActiveTab('kop')} className={`whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'kop' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>Kop & Meta</button>
                <button onClick={() => setActiveTab('pegawai')} className={`whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pegawai' ? 'bg-white border-t-2 border-emerald-500 text-emerald-700' : 'text-slate-500 hover:bg-slate-200'}`}>Pegawai</button>
                <button onClick={() => setActiveTab('tujuan')} className={`whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'tujuan' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>Agenda</button>
                <button onClick={() => setActiveTab('waktu')} className={`whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'waktu' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>Waktu & Trans</button>
                <button onClick={() => setActiveTab('ttd')} className={`whitespace-nowrap px-4 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'ttd' ? 'bg-white border-t-2 border-rose-500 text-rose-700' : 'text-slate-500 hover:bg-slate-200'}`}>TTD</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'kop' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <BookOpen size={14} className="text-slate-600"/> Kop Surat & Meta Data
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kop Instansi (Nama Pemda/Dinas)</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none uppercase font-bold" value={data.kopInstansi} onChange={e => handleChange('kopInstansi', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Instansi</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.kopAlamat} onChange={e => handleChange('kopAlamat', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kontak & Website</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.kopKontak} onChange={e => handleChange('kopKontak', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4 grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Surat</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.nomorSurat} onChange={e => handleChange('nomorSurat', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Sifat</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.sifat} onChange={e => handleChange('sifat', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Lampiran</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.lampiran} onChange={e => handleChange('lampiran', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Perihal</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.perihal} onChange={e => handleChange('perihal', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Terbit</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.tempatTerbit} onChange={e => handleChange('tempatTerbit', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Surat</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.tanggalSurat} onChange={e => handleChange('tanggalSurat', e.target.value)} />
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'pegawai' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-emerald-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Users size={14} className="text-emerald-600"/> Data Pegawai
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Pegawai Yang Ditugaskan</label>
                            <input className="w-full bg-emerald-50 p-2.5 border border-emerald-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pegawaiNama} onChange={e => handleChange('pegawaiNama', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIP</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pegawaiNip} onChange={e => handleChange('pegawaiNip', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pangkat/Golongan</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pegawaiPangkat} onChange={e => handleChange('pegawaiPangkat', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan Pegawai</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-emerald-500 outline-none" value={data.pegawaiJabatan} onChange={e => handleChange('pegawaiJabatan', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'tujuan' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <MapPin size={14} className="text-amber-600"/> Tujuan Dinas & Agenda
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Instansi Tujuan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.tujuanInstansi} onChange={e => handleChange('tujuanInstansi', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota Tujuan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.tujuanKota} onChange={e => handleChange('tujuanKota', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Rincian Agenda Dinas</label>
                            <textarea className="w-full bg-amber-50 p-3 border border-amber-200 rounded-xl text-sm h-24 resize-none focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none leading-relaxed" value={data.agenda} onChange={e => handleChange('agenda', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}
              
              {activeTab === 'waktu' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <CalendarDays size={14} className="text-blue-600"/> Jadwal & Transportasi
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Keberangkatan</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.tanggalBerangkat} onChange={e => handleChange('tanggalBerangkat', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Kembali</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.tanggalKembali} onChange={e => handleChange('tanggalKembali', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jam Pelaksanaan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.waktuPelaksanaan} onChange={e => handleChange('waktuPelaksanaan', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4">
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-2"><Car size={14} className="text-blue-600"/> Kendaraan / Transportasi</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.jenisKendaraan} onChange={e => handleChange('jenisKendaraan', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'ttd' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-rose-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Edit3 size={14} className="text-rose-600"/> Pengesahan (Pejabat Terwenang)
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jabatan Penandatangan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase font-bold focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.ttdJabatan} onChange={e => handleChange('ttdJabatan', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Pejabat Penandatangan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.ttdNama} onChange={e => handleChange('ttdNama', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIP Pejabat</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-rose-500 outline-none" value={data.ttdNip} onChange={e => handleChange('ttdNip', e.target.value)} />
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
              <PrintWrapper documentName={`SuratDinas_${data.pegawaiNama.replace(/\\s+/g, '_')}`} price={35000} />
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
