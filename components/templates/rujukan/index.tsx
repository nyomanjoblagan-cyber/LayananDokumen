'use client';

/**
 * FILE: RujukanTemplate.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Rujukan Medis/Faskes
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, Activity, User, MapPin, 
  Stethoscope, Cross, Search
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- 1. TYPE DEFINITIONS ---
interface RujukanData {
  namaFaskes: string;
  alamatFaskes: string;
  kontakFaskes: string;
  
  noRujukan: string;
  tanggalSurat: string;
  
  rsTujuan: string;
  poliTujuan: string;
  
  namaPasien: string;
  noBPJS: string;
  nik: string;
  umur: string;
  jenisKelamin: string;
  alamatPasien: string;
  noTelp: string;
  
  anamnesa: string;
  pemeriksaanFisik: string;
  diagnosaAwal: string;
  kodeICD10: string;
  terapiDiberikan: string;
  alasanRujuk: string;
  
  namaDokter: string;
  sipDokter: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: RujukanData = {
  namaFaskes: 'PUSKESMAS KECAMATAN SEHAT SENTOSA',
  alamatFaskes: 'Jl. Kesehatan No. 99, Jakarta Barat 11220',
  kontakFaskes: 'Telp: (021) 123-4567 | Email: puskesmas.ss@dinkes.go.id',
  
  noRujukan: '112233/RJK/VII/2026',
  tanggalSurat: '2026-07-13',
  
  rsTujuan: 'RSUD TARAKAN',
  poliTujuan: 'Poli Spesialis Penyakit Dalam',
  
  namaPasien: 'Budi Santoso',
  noBPJS: '0001234567890',
  nik: '3173012345678901',
  umur: '45 Tahun',
  jenisKelamin: 'Laki-laki',
  alamatPasien: 'Jl. Anggrek Raya No. 15, Kebon Jeruk, Jakarta Barat',
  noTelp: '0812-9876-5432',
  
  anamnesa: 'Pasien datang mengeluh nyeri dada sebelah kiri sejak 2 hari yang lalu, menjalar ke lengan. Keringat dingin (+), mual (-). Riwayat hipertensi sejak 5 tahun lalu.',
  pemeriksaanFisik: 'TD: 160/100 mmHg, Nadi: 90x/mnt, RR: 20x/mnt, Suhu: 36.5 C',
  diagnosaAwal: 'Susp. Coronary Artery Disease (CAD)',
  kodeICD10: 'I20.9 - Angina Pectoris, Unspecified',
  terapiDiberikan: '1. Amlodipine 10mg (1x1)\n2. Aspirin 80mg (1x1)\n3. Oksigen nasal kanul 2 lpm',
  alasanRujuk: 'Memerlukan pemeriksaan penunjang lebih lanjut (EKG, Echocardiography) dan penanganan spesialistik.',
  
  namaDokter: 'dr. Andi Gunawan',
  sipDokter: 'SIP.123/456/DINKES/2023'
};

// --- HELPERS ---
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
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-black leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-sans text-[10pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function RujukanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Rujukan...</div>}>
      <RujukanBuilder />
    </Suspense>
  );
}

function RujukanBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'faskes' | 'pasien' | 'medis'>('faskes');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<RujukanData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field: keyof RujukanData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset surat rujukan ke default?')) {
        setData(INITIAL_DATA);
    }
  };

  const DocumentContent = () => (
    <Kertas>
      {/* KOP SURAT */}
      <div className="text-center border-b-[3px] border-double border-black pb-4 mb-6">
        <h1 className="font-black text-[16pt] uppercase tracking-wide">{data.namaFaskes}</h1>
        <p className="text-[10pt] mt-1">{data.alamatFaskes}</p>
        <p className="text-[10pt]">{data.kontakFaskes}</p>
      </div>

      <div className="text-center font-bold uppercase text-[12pt] underline tracking-wider mb-6">
        SURAT RUJUKAN MEDIS
      </div>

      <div className="flex justify-between items-start mb-6 text-[10pt]">
        <div>
          <div className="flex mb-1"><div className="w-24">Nomor</div><div className="w-4">:</div><div className="font-bold">{data.noRujukan}</div></div>
          <div className="flex mb-1"><div className="w-24">Tanggal</div><div className="w-4">:</div><div>{formatDateDisplay(data.tanggalSurat)}</div></div>
        </div>
        <div className="text-right">
          <p>Kepada Yth. Teman Sejawat,</p>
          <p className="font-bold uppercase mt-1">{data.rsTujuan}</p>
          <p>{data.poliTujuan}</p>
        </div>
      </div>

      <div className="text-justify mb-4">
        <p>Bersama surat ini, kami mohon bantuan pemeriksaan dan penanganan lebih lanjut terhadap pasien:</p>
      </div>

      {/* DATA PASIEN */}
      <div className="border border-black p-4 mb-6 text-[10pt]">
        <div className="flex mb-1"><div className="w-40 font-bold">Nama Pasien</div><div className="w-4">:</div><div className="flex-1 font-bold uppercase">{data.namaPasien}</div></div>
        <div className="flex mb-1"><div className="w-40">No. BPJS/JKN</div><div className="w-4">:</div><div className="flex-1 font-mono font-bold">{data.noBPJS}</div></div>
        <div className="flex mb-1"><div className="w-40">NIK</div><div className="w-4">:</div><div className="flex-1 font-mono">{data.nik}</div></div>
        <div className="flex mb-1"><div className="w-40">Umur / Jenis Kelamin</div><div className="w-4">:</div><div className="flex-1">{data.umur} / {data.jenisKelamin}</div></div>
        <div className="flex mb-1"><div className="w-40">No. Telepon / HP</div><div className="w-4">:</div><div className="flex-1">{data.noTelp}</div></div>
        <div className="flex"><div className="w-40">Alamat</div><div className="w-4">:</div><div className="flex-1">{data.alamatPasien}</div></div>
      </div>

      {/* HASIL PEMERIKSAAN MEDIS */}
      <div className="mb-6 space-y-4 text-[10pt] text-justify">
        <div>
          <span className="font-bold block mb-1">1. Anamnesa (Keluhan Utama & Riwayat):</span>
          <p className="pl-4">{data.anamnesa}</p>
        </div>
        <div>
          <span className="font-bold block mb-1">2. Pemeriksaan Fisik:</span>
          <p className="pl-4">{data.pemeriksaanFisik}</p>
        </div>
        <div>
          <span className="font-bold block mb-1">3. Diagnosa Awal / Diagnosis Kerja:</span>
          <p className="pl-4 font-bold">{data.diagnosaAwal}</p>
          {data.kodeICD10 && <p className="pl-4 italic text-[9pt]">ICD-10: {data.kodeICD10}</p>}
        </div>
        <div>
          <span className="font-bold block mb-1">4. Terapi / Tindakan yang telah diberikan:</span>
          <div className="pl-4 whitespace-pre-line">{data.terapiDiberikan}</div>
        </div>
        <div>
          <span className="font-bold block mb-1">5. Alasan Rujukan:</span>
          <p className="pl-4">{data.alasanRujuk}</p>
        </div>
      </div>

      <div className="text-justify mb-8">
        <p>Demikian surat rujukan ini kami buat untuk dapat dipergunakan sebagaimana mestinya. Atas bantuan dan kerja sama teman sejawat, kami ucapkan terima kasih.</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="flex justify-end pr-8">
        <div className="text-center w-64">
            <p className="mb-2">Hormat kami,</p>
            <div className="h-20 flex justify-center items-center">
                <span className="text-gray-300 text-[10px] print:hidden">(Cap Faskes & Tanda Tangan)</span>
            </div>
            <p className="font-bold underline uppercase">{data.namaDokter}</p>
            <p className="text-[9pt]">SIP: {data.sipDokter}</p>
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
              <ArrowLeftCircle size={20} className="text-cyan-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Rujukan Medis / Faskes</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-cyan-600 hover:bg-cyan-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-cyan-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Surat</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Activity size={18} className="text-cyan-600" /> Editor Medis</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('faskes')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'faskes' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>Tujuan & Faskes</button>
                <button onClick={() => setActiveTab('pasien')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pasien' ? 'bg-white border-t-2 border-cyan-500 text-cyan-700' : 'text-slate-500 hover:bg-slate-200'}`}>Data Pasien</button>
                <button onClick={() => setActiveTab('medis')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'medis' ? 'bg-white border-t-2 border-red-500 text-red-700' : 'text-slate-500 hover:bg-slate-200'}`}>Medis & Diagnosa</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'faskes' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <MapPin size={14} className="text-slate-600"/> Data Faskes Perujuk & Tujuan
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Faskes Anda (KOP)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.namaFaskes} onChange={e => handleChange('namaFaskes', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Faskes</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.alamatFaskes} onChange={e => handleChange('alamatFaskes', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kontak (Telp/Email)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.kontakFaskes} onChange={e => handleChange('kontakFaskes', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4">
                            <h4 className="text-[10px] font-bold text-slate-700 uppercase mb-3">Administrasi Surat & Tujuan</h4>
                            <div className="grid grid-cols-2 gap-3 mb-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Rujukan</label>
                                    <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.noRujukan} onChange={e => handleChange('noRujukan', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal Surat</label>
                                    <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.tanggalSurat} onChange={e => handleChange('tanggalSurat', e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Rumah Sakit Tujuan</label>
                                    <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.rsTujuan} onChange={e => handleChange('rsTujuan', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Poliklinik Tujuan</label>
                                    <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.poliTujuan} onChange={e => handleChange('poliTujuan', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'pasien' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-cyan-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <User size={14} className="text-cyan-600"/> Identitas Pasien
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Pasien</label>
                            <input className="w-full bg-cyan-50 p-2.5 border border-cyan-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none" value={data.namaPasien} onChange={e => handleChange('namaPasien', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. BPJS/JKN</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono font-bold focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none" value={data.noBPJS} onChange={e => handleChange('noBPJS', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">NIK (KTP)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none" value={data.nik} onChange={e => handleChange('nik', e.target.value)} />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Umur</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none" value={data.umur} onChange={e => handleChange('umur', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Kelamin</label>
                                <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none" value={data.jenisKelamin} onChange={e => handleChange('jenisKelamin', e.target.value)}>
                                    <option value="Laki-laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Telepon / HP</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none" value={data.noTelp} onChange={e => handleChange('noTelp', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Pasien</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-cyan-500 outline-none" value={data.alamatPasien} onChange={e => handleChange('alamatPasien', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'medis' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-red-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Stethoscope size={14} className="text-red-600"/> Resume Medis & Diagnosa
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Anamnesa (Keluhan & Riwayat)</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.anamnesa} onChange={e => handleChange('anamnesa', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pemeriksaan Fisik (TTV, dll)</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-16 resize-none focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.pemeriksaanFisik} onChange={e => handleChange('pemeriksaanFisik', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Diagnosa Awal / Kerja</label>
                                <input className="w-full bg-red-50 p-2.5 border border-red-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.diagnosaAwal} onChange={e => handleChange('diagnosaAwal', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kode ICD-10 (Opsional)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.kodeICD10} onChange={e => handleChange('kodeICD10', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Terapi / Tindakan yang Diberikan</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-24 resize-none focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.terapiDiberikan} onChange={e => handleChange('terapiDiberikan', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alasan Rujukan</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.alasanRujuk} onChange={e => handleChange('alasanRujuk', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4">
                            <h4 className="text-[10px] font-bold text-slate-700 uppercase mb-3">Dokter Perujuk</h4>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Dokter</label>
                                    <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.namaDokter} onChange={e => handleChange('namaDokter', e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. SIP</label>
                                    <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-red-500 outline-none" value={data.sipDokter} onChange={e => handleChange('sipDokter', e.target.value)} />
                                </div>
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
              <PrintWrapper documentName={`Rujukan_Medis_${data.namaPasien.replace(/\s+/g, '_')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
