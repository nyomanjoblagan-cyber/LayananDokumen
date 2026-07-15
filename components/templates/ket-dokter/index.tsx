'use client';
import PrintWrapper from '@/components/PrintWrapper';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, RotateCcw, ArrowLeft, Settings2, User,
  Activity, Stethoscope, Building2, Calendar, FileText, BadgePlus
} from 'lucide-react';
import Link from 'next/link';

// --- 1. TYPE DEFINITIONS ---
interface MedicalCertificateData {
  clinicName: string;
  clinicAddress: string;
  doctorName: string;
  doctorSip: string;
  city: string;
  date: string;
  patientName: string;
  patientAge: string;
  patientGender: string;
  patientJob: string;
  patientAddress: string;
  examinationResult: string;
  restDays: number;
  restStartDate: string;
  restEndDate: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: MedicalCertificateData = {
  clinicName: 'RUMAH SAKIT UMUM SEJAHTERA',
  clinicAddress: 'Jl. Jenderal Sudirman No. 123, Sleman, Daerah Istimewa Yogyakarta 55281',
  doctorName: 'dr. Budi Santoso, Sp.PD',
  doctorSip: '123/SIP/DKK/2026',
  city: 'Sleman',
  date: '2026-07-13',
  patientName: 'ANDI PRATAMA',
  patientAge: '28',
  patientGender: 'Laki-laki',
  patientJob: 'Karyawan Swasta',
  patientAddress: 'Jl. Gejayan No. 15, Depok, Sleman',
  examinationResult: 'Demam Berdarah Dengue (DBD) grade I. Pasien mengeluhkan demam tinggi sejak 3 hari yang lalu disertai nyeri sendi dan ruam.',
  restDays: 3,
  restStartDate: '2026-07-13',
  restEndDate: '2026-07-15',
};

export default function KeteranganDokterPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <MedicalCertificateBuilder />
    </Suspense>
  );
}

function MedicalCertificateBuilder() {
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<MedicalCertificateData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'pasien' | 'medis' | 'klinik'>('pasien');
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDataChange = (field: keyof MedicalCertificateData, val: any) => {
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
      <div className="flex flex-col gap-8 print:gap-0">
          <Kertas>
              {/* KOP SURAT ELEGANT */}
              <div className="flex items-center gap-6 mb-6 pb-6 border-b-[4px] border-emerald-800 relative">
                  <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center border-2 border-emerald-800 shrink-0">
                     <BadgePlus className="w-12 h-12 text-emerald-800" />
                  </div>
                  <div className="flex-1 text-center pr-24">
                      <h1 className="font-bold text-3xl uppercase tracking-widest text-emerald-900 mb-2">{data.clinicName}</h1>
                      <p className="text-sm text-slate-700 max-w-[80%] mx-auto leading-tight">{data.clinicAddress}</p>
                      <p className="text-xs text-slate-500 mt-1">Telp: (021) 1234567 | Email: info@hospital.com | Web: www.hospital.com</p>
                  </div>
              </div>
              
              {/* WATERMARK BG */}
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0">
                  <BadgePlus className="w-96 h-96" />
              </div>
              
              {/* CONTENT WRAPPER */}
              <div className="relative z-10 px-8">
                  {/* HEADER SURAT */}
                  <div className="text-center mb-10 mt-4">
                      <h2 className="font-bold text-2xl uppercase tracking-widest text-slate-900 border-b-2 border-slate-900 inline-block pb-1">SURAT KETERANGAN SAKIT</h2>
                      <p className="mt-2 text-sm">Nomor: {new Date().getFullYear()}/SKS/{new Date().getMonth() + 1}/{Math.floor(Math.random() * 1000).toString().padStart(3, '0')}</p>
                  </div>
                  
                  {/* PREAMBLE */}
                  <div className="mb-6 text-justify">
                      <p className="leading-loose">
                          Yang bertanda tangan di bawah ini, <strong>{data.doctorName}</strong> pada <strong>{data.clinicName}</strong>, menerangkan dengan sesungguhnya bahwa:
                      </p>
                  </div>

                  {/* IDENTITAS PASIEN */}
                  <div className="ml-10 mb-8 p-6 bg-slate-50/50 border border-slate-200 rounded-lg">
                    <table className="w-full">
                      <tbody>
                        <tr>
                          <td className="w-48 py-2 align-top text-slate-600">Nama Lengkap</td>
                          <td className="w-4 py-2 align-top">:</td>
                          <td className="py-2 align-top font-bold uppercase text-slate-900">{data.patientName}</td>
                        </tr>
                        <tr>
                          <td className="w-48 py-2 align-top text-slate-600">Umur</td>
                          <td className="w-4 py-2 align-top">:</td>
                          <td className="py-2 align-top">{data.patientAge} Tahun</td>
                        </tr>
                        <tr>
                          <td className="w-48 py-2 align-top text-slate-600">Jenis Kelamin</td>
                          <td className="w-4 py-2 align-top">:</td>
                          <td className="py-2 align-top">{data.patientGender}</td>
                        </tr>
                        <tr>
                          <td className="w-48 py-2 align-top text-slate-600">Pekerjaan</td>
                          <td className="w-4 py-2 align-top">:</td>
                          <td className="py-2 align-top">{data.patientJob}</td>
                        </tr>
                        <tr>
                          <td className="w-48 py-2 align-top text-slate-600">Alamat Lengkap</td>
                          <td className="w-4 py-2 align-top">:</td>
                          <td className="py-2 align-top leading-tight">{data.patientAddress}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* HASIL PEMERIKSAAN & ANJURAN */}
                  <div className="mb-4 text-justify">
                      <p className="leading-loose">Berdasarkan hasil pemeriksaan medis yang telah dilakukan pada hari ini, pasien tersebut didiagnosa mengalami:</p>
                  </div>
                  
                  <div className="mb-8 text-justify p-5 border-l-4 border-emerald-700 bg-emerald-50/50 italic text-slate-800">
                      "{data.examinationResult}"
                  </div>
                  
                  <div className="mb-10 text-justify">
                      <p className="leading-loose">
                          Oleh karena keadaan kesehatan tersebut, pasien perlu diberikan <strong>istirahat selama {data.restDays} ({data.restDays}) hari</strong>, 
                          terhitung mulai tanggal <strong>{formatDateSafe(data.restStartDate)}</strong> sampai dengan tanggal <strong>{formatDateSafe(data.restEndDate)}</strong>.
                      </p>
                  </div>

                  {/* PENUTUP */}
                  <div className="mb-16 text-justify">
                      <p className="leading-loose">Demikian Surat Keterangan Sakit ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.</p>
                  </div>

                  {/* TANDA TANGAN */}
                  <div className="flex justify-end text-center break-inside-avoid mt-12">
                      <div className="w-64">
                          <p className="mb-1">{data.city}, {formatDateSafe(data.date)}</p>
                          <p className="mb-24">Dokter Pemeriksa,</p>
                          <div className="border-b-2 border-slate-900 pb-1 mb-1">
                              <p className="font-bold uppercase tracking-wider">{data.doctorName}</p>
                          </div>
                          <p className="text-sm text-slate-600">SIP. {data.doctorSip}</p>
                      </div>
                  </div>
              </div>
          </Kertas>
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER NAV */}
      <header className="no-print bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50 h-16 flex items-center px-4 md:px-6 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-500 hover:text-emerald-600 flex items-center gap-2 transition-colors group">
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-semibold hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-200 mx-2 hidden md:block"></div>
            <div className="flex items-center gap-2.5">
               <div className="bg-emerald-100 p-1.5 rounded-lg text-emerald-700">
                  <FileText className="w-4 h-4" />
               </div>
               <span className="font-bold text-slate-800 text-sm md:text-base">Surat Keterangan Sakit</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-semibold text-sm shadow-sm hover:shadow-md active:scale-95 flex items-center gap-2 transition-all">
              <Printer className="w-4 h-4" /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
            <button 
              onClick={() => setMobileView(mobileView === 'editor' ? 'preview' : 'editor')} 
              className="md:hidden bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors">
              {mobileView === 'editor' ? 'Lihat Preview' : 'Edit Form'}
            </button>
          </div>
      </header>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <aside className={`no-print w-full md:w-[480px] bg-white border-r border-slate-200 flex flex-col h-full absolute md:relative z-10 transition-transform duration-300 shadow-xl md:shadow-none ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
              <div className="flex items-center gap-3">
                 <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                    <Settings2 className="w-5 h-5" />
                 </div>
                 <div>
                    <h2 className="font-bold text-slate-800">Editor Dokumen</h2>
                    <p className="text-xs text-slate-500">Sesuaikan data surat keterangan</p>
                 </div>
              </div>
              <button onClick={handleReset} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Reset Form">
                  <RotateCcw className="w-5 h-5"/>
              </button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex p-2 bg-slate-100/50 border-b border-slate-100">
              <button 
                  onClick={() => setActiveTab('pasien')} 
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-2 rounded-lg text-xs font-semibold transition-all ${activeTab === 'pasien' ? 'bg-white text-emerald-700 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:bg-slate-200/50'}`}>
                  <User className="w-4 h-4" /> Pasien
              </button>
              <button 
                  onClick={() => setActiveTab('medis')} 
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-2 rounded-lg text-xs font-semibold transition-all mx-1 ${activeTab === 'medis' ? 'bg-white text-emerald-700 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:bg-slate-200/50'}`}>
                  <Activity className="w-4 h-4" /> Medis
              </button>
              <button 
                  onClick={() => setActiveTab('klinik')} 
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-2 rounded-lg text-xs font-semibold transition-all ${activeTab === 'klinik' ? 'bg-white text-emerald-700 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:bg-slate-200/50'}`}>
                  <Building2 className="w-4 h-4" /> Klinik
              </button>
           </div>

           <div className="flex-1 overflow-y-auto p-6 custom-scrollbar pb-32 print:block print:overflow-visible print:bg-white">
              
              {activeTab === 'pasien' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <User className="w-5 h-5 text-emerald-600" />
                    <h3 className="font-bold text-slate-800">Identitas Pasien</h3>
                </div>
                
                <div className="space-y-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600 flex items-center gap-1">Nama Lengkap Pasien <span className="text-red-500">*</span></label>
                      <input className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" value={data.patientName} onChange={e => handleDataChange('patientName', e.target.value)} placeholder="Contoh: ANDI PRATAMA" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-600">Umur (Tahun)</label>
                        <input className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" value={data.patientAge} onChange={e => handleDataChange('patientAge', e.target.value)} placeholder="Contoh: 28" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-600">Jenis Kelamin</label>
                        <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all appearance-none" value={data.patientGender} onChange={e => handleDataChange('patientGender', e.target.value)}>
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">Pekerjaan</label>
                      <input className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all" value={data.patientJob} onChange={e => handleDataChange('patientJob', e.target.value)} placeholder="Contoh: Karyawan Swasta" />
                    </div>
                    
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">Alamat Lengkap</label>
                      <textarea className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all resize-none h-28" value={data.patientAddress} onChange={e => handleDataChange('patientAddress', e.target.value)} placeholder="Alamat lengkap domisili pasien" />
                    </div>
                </div>
              </div>
              )}

              {activeTab === 'medis' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <Activity className="w-5 h-5 text-amber-500" />
                    <h3 className="font-bold text-slate-800">Hasil Pemeriksaan</h3>
                </div>
                
                <div className="space-y-6">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600 flex items-center gap-2">
                          Diagnosa / Hasil Pemeriksaan <span className="text-red-500">*</span>
                      </label>
                      <textarea className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all resize-none h-32" value={data.examinationResult} onChange={e => handleDataChange('examinationResult', e.target.value)} placeholder="Tuliskan diagnosa medis secara rinci..." />
                    </div>
                    
                    <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-xl space-y-4">
                      <div className="flex items-center gap-2 text-amber-700 font-bold text-sm">
                          <Calendar className="w-4 h-4" />
                          <h4>Anjuran Istirahat</h4>
                      </div>
                      
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-amber-900/70">Jumlah Hari</label>
                        <input type="number" className="w-full px-4 py-2.5 bg-white border border-amber-200 rounded-lg text-sm font-bold focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all" value={data.restDays} onChange={e => handleDataChange('restDays', parseInt(e.target.value) || 0)} placeholder="Contoh: 3" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-amber-900/70">Mulai Tanggal</label>
                          <input type="date" className="w-full px-4 py-2 bg-white border border-amber-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all" value={data.restStartDate} onChange={e => handleDataChange('restStartDate', e.target.value)} />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-amber-900/70">Sampai Tanggal</label>
                          <input type="date" className="w-full px-4 py-2 bg-white border border-amber-200 rounded-lg text-sm focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-all" value={data.restEndDate} onChange={e => handleDataChange('restEndDate', e.target.value)} />
                        </div>
                      </div>
                    </div>
                </div>
              </div>
              )}

              {activeTab === 'klinik' && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                    <Building2 className="w-5 h-5 text-blue-600" />
                    <h3 className="font-bold text-slate-800">Fasilitas & Dokter</h3>
                </div>
                
                <div className="space-y-5">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">Nama Klinik / Rumah Sakit</label>
                      <input className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" value={data.clinicName} onChange={e => handleDataChange('clinicName', e.target.value)} placeholder="Nama Fasilitas Kesehatan" />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-600">Alamat Lengkap Faskes</label>
                      <textarea className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none h-20" value={data.clinicAddress} onChange={e => handleDataChange('clinicAddress', e.target.value)} placeholder="Alamat lengkap fasilitas kesehatan" />
                    </div>
                    
                    <div className="pt-4 border-t border-slate-100 space-y-4">
                      <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                          <Stethoscope className="w-4 h-4" />
                          <h4>Dokter Pemeriksa</h4>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-600">Nama Dokter (beserta gelar)</label>
                        <input className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" value={data.doctorName} onChange={e => handleDataChange('doctorName', e.target.value)} placeholder="Contoh: dr. Budi Santoso, Sp.PD" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs font-semibold text-slate-600">Nomor SIP</label>
                        <input className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" value={data.doctorSip} onChange={e => handleDataChange('doctorSip', e.target.value)} placeholder="Surat Izin Praktik" />
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t border-slate-100 space-y-4">
                      <div className="flex items-center gap-2 text-blue-700 font-bold text-sm">
                          <Calendar className="w-4 h-4" />
                          <h4>Waktu & Tempat Penandatanganan</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-600">Kota</label>
                          <input className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Contoh: Jakarta" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-xs font-semibold text-slate-600">Tanggal</label>
                          <input type="date" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                        </div>
                      </div>
                    </div>
                </div>
              </div>
              )}

           </div>
        </aside>
        
        {/* PANEL KANAN: PREVIEW DOKUMEN */}
        <div className={`flex-1 bg-slate-200/50 overflow-y-auto p-4 md:p-8 flex justify-center w-full h-full custom-scrollbar transition-transform ${mobileView === 'editor' ? 'translate-x-full md:translate-x-0 hidden md:flex' : 'translate-x-0 flex'} print:block print:overflow-visible print:bg-white`}>
            <DocumentContent />
        </div>
        
      </main>
    
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen_ket_dokter" price={15000} />
      </div>
    </div>
  );
}

