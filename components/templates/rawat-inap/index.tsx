'use client';

/**
 * FILE: RawatInapPage.tsx
 * STATUS: PRODUCTION READY (ENTERPRISE FORMAT)
 * DESC: Generator Surat Keterangan Rawat Inap (Rumah Sakit)
 */

import React, { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, Building2, UserCircle2, 
  Stethoscope, CalendarRange, Activity, ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

// --- 1. TYPE DEFINITIONS ---
interface InpatientData {
  hospitalName: string;
  hospitalAddress: string;
  hospitalContact: string;
  
  docNo: string;
  
  patientName: string;
  patientRm: string;
  patientDobAge: string;
  patientGender: string;
  patientJob: string;
  patientAddress: string;
  
  admissionDate: string;
  dischargeDate: string;
  roomName: string;
  diagnosis: string;
  purpose: string;
  
  doctorName: string;
  sipNumber: string;
  city: string;
  date: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: InpatientData = {
  hospitalName: 'RSUD BALI MANDARA',
  hospitalAddress: 'Jl. Bypass Ngurah Rai No. 548, Sanur Kauh, Denpasar Selatan, Kota Denpasar, Bali 80227',
  hospitalContact: 'Telp: (0361) 4490566 | Email: info@rsbm.baliprov.go.id',
  
  docNo: 'SKRI/RSBM/2026/01/088',
  
  patientName: 'BAGUS RAMADHAN',
  patientRm: 'RM-889201',
  patientDobAge: 'Denpasar, 15 Mei 1999 / 27 Tahun',
  patientGender: 'Laki-laki',
  patientJob: 'Wiraswasta',
  patientAddress: 'Jl. Ahmad Yani Utara No. 100, Peguyangan, Denpasar Utara',
  
  admissionDate: '2026-01-05',
  dischargeDate: '2026-01-08',
  roomName: 'Ruang Amerta - Kamar 302',
  diagnosis: 'Demam Berdarah Dengue (DBD) derajat II',
  purpose: 'Klaim Asuransi Kesehatan dan Izin Istirahat Kerja',
  
  doctorName: 'dr. I MADE WIRA, Sp.PD',
  sipNumber: 'SIP. 445/112/DINKES/2024',
  city: 'Denpasar',
  date: '2026-01-08' 
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
  <div className="bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] md:p-[20mm] print:p-0 text-slate-900 leading-relaxed box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto font-sans text-[11pt]">
    {children}
  </div>
);

// --- 4. KOMPONEN UTAMA ---
export default function RawatInapPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor Surat Keterangan...</div>}>
      <InpatientBuilder />
    </Suspense>
  );
}

function InpatientBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [activeTab, setActiveTab] = useState<'rs' | 'pasien' | 'perawatan' | 'ttd'>('rs');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<InpatientData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleChange = (field: keyof InpatientData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset surat keterangan ke awal?')) {
        setData(INITIAL_DATA);
    }
  };

  const DocumentContent = () => (
    <Kertas>
      {/* KOP SURAT RUMAH SAKIT */}
      <div className="text-center mb-6 break-inside-avoid border-b-[3px] border-black pb-4">
        <h1 className="font-bold text-2xl uppercase tracking-wider text-green-700 print:text-black">{data.hospitalName}</h1>
        <p className="text-sm mt-1">{data.hospitalAddress}</p>
        <p className="text-sm">{data.hospitalContact}</p>
      </div>

      {/* JUDUL SURAT */}
      <div className="text-center mb-8 break-inside-avoid">
        <h2 className="font-bold text-xl underline uppercase">SURAT KETERANGAN RAWAT INAP</h2>
        <p className="font-bold tracking-wider mt-1">Nomor: {data.docNo}</p>
      </div>

      <div className="mb-4 text-justify break-inside-avoid">
        <p>Yang bertanda tangan di bawah ini, Dokter Pemeriksa pada <strong>{data.hospitalName}</strong>, menerangkan dengan sesungguhnya bahwa:</p>
      </div>

      {/* DATA PASIEN */}
      <div className="mb-6 break-inside-avoid bg-slate-50 border border-slate-300 p-4 rounded-xl print:bg-transparent print:border-none print:p-0 print:rounded-none">
        <div className="ml-4">
            <div className="flex mb-1.5"><div className="w-48 align-top font-bold text-slate-700 print:text-black">Nama Pasien</div><div className="w-4 align-top">:</div><div className="flex-1 font-bold uppercase align-top">{data.patientName}</div></div>
            <div className="flex mb-1.5"><div className="w-48 align-top font-bold text-slate-700 print:text-black">No. Rekam Medis (RM)</div><div className="w-4 align-top">:</div><div className="flex-1 font-mono align-top">{data.patientRm}</div></div>
            <div className="flex mb-1.5"><div className="w-48 align-top font-bold text-slate-700 print:text-black">Tempat Lahir / Umur</div><div className="w-4 align-top">:</div><div className="flex-1 align-top">{data.patientDobAge}</div></div>
            <div className="flex mb-1.5"><div className="w-48 align-top font-bold text-slate-700 print:text-black">Jenis Kelamin</div><div className="w-4 align-top">:</div><div className="flex-1 align-top">{data.patientGender}</div></div>
            <div className="flex mb-1.5"><div className="w-48 align-top font-bold text-slate-700 print:text-black">Pekerjaan</div><div className="w-4 align-top">:</div><div className="flex-1 align-top">{data.patientJob}</div></div>
            <div className="flex mb-1.5"><div className="w-48 align-top font-bold text-slate-700 print:text-black">Alamat Pasien</div><div className="w-4 align-top">:</div><div className="flex-1 text-justify align-top">{data.patientAddress}</div></div>
        </div>
      </div>

      {/* DETAIL PERAWATAN */}
      <div className="mb-6 text-justify break-inside-avoid">
        <p className="mb-2">Adalah benar pasien kami yang telah menjalani masa perawatan/rawat inap di <strong>{data.hospitalName}</strong>, dengan rincian sebagai berikut:</p>
        <div className="ml-8 mb-4 border-l-2 border-green-600 pl-4 py-1 print:border-black">
            <div className="flex mb-1.5"><div className="w-40 align-top">Tanggal Masuk</div><div className="w-4 align-top">:</div><div className="flex-1 font-bold align-top">{formatDateDisplay(data.admissionDate)}</div></div>
            <div className="flex mb-1.5"><div className="w-40 align-top">Tanggal Keluar</div><div className="w-4 align-top">:</div><div className="flex-1 font-bold align-top">{formatDateDisplay(data.dischargeDate)}</div></div>
            <div className="flex mb-1.5"><div className="w-40 align-top">Ruang Perawatan</div><div className="w-4 align-top">:</div><div className="flex-1 align-top">{data.roomName}</div></div>
            <div className="flex mb-1.5"><div className="w-40 align-top">Diagnosa Medis</div><div className="w-4 align-top">:</div><div className="flex-1 font-bold uppercase align-top">{data.diagnosis}</div></div>
        </div>
        <p className="mb-2">Surat keterangan ini diberikan atas permintaan pasien / keluarga pasien untuk keperluan:</p>
        <div className="text-center font-bold uppercase bg-slate-100 p-2 mx-8 border border-slate-300 print:bg-transparent print:border-black">
            "{data.purpose}"
        </div>
      </div>

      <div className="mb-10 text-justify break-inside-avoid">
        <p>Demikian surat keterangan ini dibuat berdasarkan rekam medis yang sebenarnya agar dapat dipergunakan sebagaimana mestinya.</p>
      </div>

      {/* TANDA TANGAN */}
      <div className="flex justify-end text-center break-inside-avoid px-4">
        <div className="w-64">
            <p className="mb-2">{data.city}, {formatDateDisplay(data.date)}<br/><strong>Dokter Penanggung Jawab Pelayanan (DPJP)</strong></p>
            <div className="h-24 flex items-center justify-center">
                <ShieldCheck size={48} className="text-slate-200 print:hidden opacity-50" />
            </div>
            <p className="font-bold underline uppercase">{data.doctorName}</p>
            <p className="text-sm">SIP. {data.sipNumber}</p>
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
              <ArrowLeftCircle size={20} className="text-green-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">SK Rawat Inap</h1>
            </div>
          </div>
          <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-green-600 hover:bg-green-500 text-white px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-green-900/50 active:scale-95 flex items-center gap-2 transition-all">
            <Printer size={16} /> <span className="hidden md:inline">Cetak Surat</span>
          </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* INPUT SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[500px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
           <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-white sticky top-0 z-10 font-sans shrink-0">
                <h2 className="font-black text-slate-700 flex items-center gap-2 text-sm uppercase tracking-widest"><Stethoscope size={18} className="text-green-600" /> Editor Medis</h2>
                <button onClick={handleReset} title="Reset Form" className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"><RotateCcw size={16}/></button>
            </div>

            {/* DESKTOP TABS */}
            <div className="flex bg-slate-100 border-b border-slate-200 shrink-0">
                <button onClick={() => setActiveTab('rs')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'rs' ? 'bg-white border-t-2 border-slate-700 text-slate-900' : 'text-slate-500 hover:bg-slate-200'}`}>1. Instansi</button>
                <button onClick={() => setActiveTab('pasien')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'pasien' ? 'bg-white border-t-2 border-blue-500 text-blue-700' : 'text-slate-500 hover:bg-slate-200'}`}>2. Pasien</button>
                <button onClick={() => setActiveTab('perawatan')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'perawatan' ? 'bg-white border-t-2 border-green-500 text-green-700' : 'text-slate-500 hover:bg-slate-200'}`}>3. Medis</button>
                <button onClick={() => setActiveTab('ttd')} className={`flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors ${activeTab === 'ttd' ? 'bg-white border-t-2 border-amber-500 text-amber-700' : 'text-slate-500 hover:bg-slate-200'}`}>4. TTD</button>
                <button onClick={() => setMobileView('preview')} className="md:hidden flex-1 py-3 text-[10px] font-bold uppercase tracking-wider transition-colors text-slate-500 bg-slate-200">Preview</button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-32 custom-scrollbar font-sans">
              
              {activeTab === 'rs' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-slate-700">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Building2 size={14} className="text-slate-600"/> Data Rumah Sakit
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Rumah Sakit / Klinik</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.hospitalName} onChange={e => handleChange('hospitalName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat RS (Kop Surat)</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.hospitalAddress} onChange={e => handleChange('hospitalAddress', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kontak RS (Telp/Email)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.hospitalContact} onChange={e => handleChange('hospitalContact', e.target.value)} />
                        </div>
                        <div className="border-t border-slate-200 pt-4 mt-4"></div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor Surat / Register Medis</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-slate-500 outline-none" value={data.docNo} onChange={e => handleChange('docNo', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'pasien' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-blue-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <UserCircle2 size={14} className="text-blue-600"/> Data Identitas Pasien
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Lengkap Pasien</label>
                            <input className="w-full bg-blue-50 p-2.5 border border-blue-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.patientName} onChange={e => handleChange('patientName', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">No. Rekam Medis (RM)</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-mono focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.patientRm} onChange={e => handleChange('patientRm', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Jenis Kelamin</label>
                                <select className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.patientGender} onChange={e => handleChange('patientGender', e.target.value)}>
                                    <option value="Laki-laki">Laki-laki</option>
                                    <option value="Perempuan">Perempuan</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tempat Lahir / Umur</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.patientDobAge} onChange={e => handleChange('patientDobAge', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Pekerjaan Pasien</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.patientJob} onChange={e => handleChange('patientJob', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Alamat Lengkap</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm h-20 resize-none focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none" value={data.patientAddress} onChange={e => handleChange('patientAddress', e.target.value)} />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'perawatan' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-green-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <Activity size={14} className="text-green-600"/> Rincian Rawat Inap & Medis
                    </h3>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Masuk (Admission)</label>
                                <input type="date" className="w-full bg-green-50 p-2.5 border border-green-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-green-500 outline-none" value={data.admissionDate} onChange={e => handleChange('admissionDate', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tgl Keluar (Discharge)</label>
                                <input type="date" className="w-full bg-green-50 p-2.5 border border-green-200 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-green-500 outline-none" value={data.dischargeDate} onChange={e => handleChange('dischargeDate', e.target.value)} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Ruang / Kamar / Bangsal</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-green-500 outline-none" value={data.roomName} onChange={e => handleChange('roomName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Diagnosa Medis Lengkap</label>
                            <textarea className="w-full bg-slate-50 p-3 border border-slate-200 rounded-xl text-sm font-bold h-20 resize-none focus:bg-white focus:ring-2 focus:ring-green-500 outline-none" value={data.diagnosis} onChange={e => handleChange('diagnosis', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Keperluan Surat (Tujuan)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-green-500 outline-none" value={data.purpose} onChange={e => handleChange('purpose', e.target.value)} placeholder="Contoh: Klaim Asuransi" />
                        </div>
                    </div>
                  </div>
              )}

              {activeTab === 'ttd' && (
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 space-y-4 border-l-4 border-l-amber-500">
                    <h3 className="text-xs font-black uppercase text-slate-800 tracking-tight flex items-center gap-2 border-b pb-3 border-slate-100">
                      <ShieldCheck size={14} className="text-amber-600"/> Otorisasi Dokter DPJP
                    </h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nama Dokter Pemeriksa / DPJP</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm font-bold uppercase focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.doctorName} onChange={e => handleChange('doctorName', e.target.value)} />
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Nomor SIP (Surat Izin Praktik)</label>
                            <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.sipNumber} onChange={e => handleChange('sipNumber', e.target.value)} />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Kota TTD</label>
                                <input className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm uppercase focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.city} onChange={e => handleChange('city', e.target.value)} />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">Tanggal TTD</label>
                                <input type="date" className="w-full bg-slate-50 p-2.5 border border-slate-200 rounded-xl text-sm focus:bg-white focus:ring-2 focus:ring-amber-500 outline-none" value={data.date} onChange={e => handleChange('date', e.target.value)} />
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
              <PrintWrapper documentName={`SKRI_${data.patientName.replace(/\s+/g, '_')}`} price={5000} />
           </div>

        </div>
      </main>

    </div>
  );
}
