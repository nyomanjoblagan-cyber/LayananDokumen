'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, RotateCcw, ArrowLeftCircle, BookOpen, Edit3, Stethoscope
} from 'lucide-react';
import Link from 'next/link';

// --- 1. TYPE DEFINITIONS ---
interface MedicalCertificateData {
  // Klinik/Dokter
  clinicName: string;
  clinicAddress: string;
  doctorName: string;
  doctorSip: string;
  
  // Waktu pembuatan surat
  city: string;
  date: string;
  
  // Identitas Pasien
  patientName: string;
  patientAge: string;
  patientGender: string;
  patientJob: string;
  patientAddress: string;
  
  // Hasil Pemeriksaan Ringkas
  examinationResult: string;
  
  // Anjuran Istirahat
  restDays: number;
  restStartDate: string;
  restEndDate: string;
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: MedicalCertificateData = {
  clinicName: 'KLINIK SEHAT SEJAHTERA',
  clinicAddress: 'Jl. Jenderal Sudirman No. 123, Sleman, Yogyakarta',
  doctorName: 'dr. Budi Santoso',
  doctorSip: '123/SIP/DKK/2026',
  
  city: 'Sleman',
  date: '2026-07-11',
  
  patientName: 'ANDI PRATAMA',
  patientAge: '28',
  patientGender: 'Laki-laki',
  patientJob: 'Karyawan Swasta',
  patientAddress: 'Jl. Gejayan No. 15, Depok, Sleman',
  
  examinationResult: 'Demam Berdarah Dengue (DBD) grade I. Pasien mengeluhkan demam tinggi sejak 3 hari yang lalu disertai nyeri sendi dan ruam.',
  
  restDays: 3,
  restStartDate: '2026-07-11',
  restEndDate: '2026-07-13',
};

// --- 3. KOMPONEN UTAMA ---
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
  const [activeTab, setActiveTab] = useState<'klinik' | 'pasien' | 'medis'>('pasien');
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
              {/* KOP SURAT */}
              <div className="text-center mb-8 pb-4 border-b-[3px] border-black border-double">
                  <h1 className="font-bold text-2xl uppercase tracking-wider">{data.clinicName}</h1>
                  <p className="text-sm">{data.clinicAddress}</p>
              </div>
              
              {/* HEADER SURAT */}
              <div className="text-center mb-10">
                  <h2 className="font-bold text-xl uppercase underline tracking-wider">SURAT KETERANGAN SAKIT</h2>
              </div>
              
              {/* PREAMBLE */}
              <div className="mb-6 text-justify">
                  <p>
                      Yang bertanda tangan di bawah ini, Dokter pada <strong>{data.clinicName}</strong>, menerangkan dengan sesungguhnya bahwa:
                  </p>
              </div>

              {/* IDENTITAS PASIEN */}
              <div className="ml-8 mb-6">
                <table className="w-full">
                  <tbody>
                    <tr>
                      <td className="w-40 py-1 align-top">Nama Lengkap</td>
                      <td className="w-4 py-1 align-top">:</td>
                      <td className="py-1 align-top font-bold uppercase">{data.patientName}</td>
                    </tr>
                    <tr>
                      <td className="w-40 py-1 align-top">Umur</td>
                      <td className="w-4 py-1 align-top">:</td>
                      <td className="py-1 align-top">{data.patientAge} Tahun</td>
                    </tr>
                    <tr>
                      <td className="w-40 py-1 align-top">Jenis Kelamin</td>
                      <td className="w-4 py-1 align-top">:</td>
                      <td className="py-1 align-top">{data.patientGender}</td>
                    </tr>
                    <tr>
                      <td className="w-40 py-1 align-top">Pekerjaan</td>
                      <td className="w-4 py-1 align-top">:</td>
                      <td className="py-1 align-top">{data.patientJob}</td>
                    </tr>
                    <tr>
                      <td className="w-40 py-1 align-top">Alamat</td>
                      <td className="w-4 py-1 align-top">:</td>
                      <td className="py-1 align-top">{data.patientAddress}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* HASIL PEMERIKSAAN & ANJURAN */}
              <div className="mb-4 text-justify">
                  <p>Berdasarkan hasil pemeriksaan medis yang telah dilakukan pada hari ini, pasien tersebut didiagnosa mengalami:</p>
              </div>
              <div className="mb-6 text-justify p-4 border border-slate-300 bg-slate-50 italic">
                  "{data.examinationResult}"
              </div>
              
              <div className="mb-8 text-justify">
                  <p>
                      Oleh karena keadaan kesehatan tersebut, pasien perlu diberikan <strong>istirahat selama {data.restDays} ({data.restDays}) hari</strong>, 
                      terhitung mulai tanggal <strong>{formatDateSafe(data.restStartDate)}</strong> sampai dengan tanggal <strong>{formatDateSafe(data.restEndDate)}</strong>.
                  </p>
              </div>

              {/* PENUTUP */}
              <div className="mb-16 text-justify">
                  <p>Demikian Surat Keterangan Sakit ini dibuat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.</p>
              </div>

              {/* TANDA TANGAN */}
              <div className="flex justify-end text-center break-inside-avoid">
                  <div>
                      <p className="mb-2">{data.city}, {formatDateSafe(data.date)}</p>
                      <p className="mb-20">Dokter Pemeriksa,</p>
                      <p className="font-bold underline uppercase">{data.doctorName}</p>
                      <p>SIP. {data.doctorSip}</p>
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

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <Stethoscope size={16} className="text-emerald-500" /> <span>Surat Keterangan Sakit</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => { if(typeof window !== 'undefined') window.print(); }} 
              className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
            <button 
              onClick={() => setMobileView(mobileView === 'editor' ? 'preview' : 'editor')} 
              className="md:hidden bg-slate-800 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase">
              {mobileView === 'editor' ? 'Lihat Preview' : 'Edit Form'}
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan Dokumen</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('pasien')} className={`flex-1 py-3 border-r ${activeTab === 'pasien' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Identitas Pasien</button>
              <button onClick={() => setActiveTab('medis')} className={`flex-1 py-3 border-r ${activeTab === 'medis' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pemeriksaan</button>
              <button onClick={() => setActiveTab('klinik')} className={`flex-1 py-3 ${activeTab === 'klinik' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Klinik & Dokter</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32 print:block print:overflow-visible print:bg-white">
              
              {activeTab === 'pasien' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Identitas Pasien</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap Pasien</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.patientName} onChange={e => handleDataChange('patientName', e.target.value)} placeholder="Contoh: ANDI PRATAMA" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Umur (Tahun)</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.patientAge} onChange={e => handleDataChange('patientAge', e.target.value)} placeholder="Contoh: 28" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Jenis Kelamin</label>
                    <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white" value={data.patientGender} onChange={e => handleDataChange('patientGender', e.target.value)}>
                        <option value="Laki-laki">Laki-laki</option>
                        <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pekerjaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.patientJob} onChange={e => handleDataChange('patientJob', e.target.value)} placeholder="Contoh: Karyawan Swasta" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Lengkap</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.patientAddress} onChange={e => handleDataChange('patientAddress', e.target.value)} placeholder="Alamat domisili" />
                </div>
              </div>
              )}

              {activeTab === 'medis' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-amber-600 border-b pb-1 mb-4">Pemeriksaan & Istirahat</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Hasil Pemeriksaan Ringkas / Diagnosa</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-24" value={data.examinationResult} onChange={e => handleDataChange('examinationResult', e.target.value)} placeholder="Tuliskan diagnosa ringkas atau keluhan utama" />
                </div>
                <div className="pt-2 border-t mt-4">
                  <h4 className="text-[10px] font-bold text-amber-700 uppercase mb-3">Anjuran Istirahat</h4>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Jumlah Hari</label>
                    <input type="number" className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.restDays} onChange={e => handleDataChange('restDays', parseInt(e.target.value) || 0)} placeholder="Contoh: 3" />
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Dari Tanggal</label>
                      <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.restStartDate} onChange={e => handleDataChange('restStartDate', e.target.value)} />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Sampai Tanggal</label>
                      <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.restEndDate} onChange={e => handleDataChange('restEndDate', e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'klinik' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Identitas Klinik & Dokter</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Klinik / Puskesmas / RS</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1 font-bold" value={data.clinicName} onChange={e => handleDataChange('clinicName', e.target.value)} placeholder="Nama Fasilitas Kesehatan" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Fasilitas Kesehatan</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-16" value={data.clinicAddress} onChange={e => handleDataChange('clinicAddress', e.target.value)} placeholder="Alamat Faskes" />
                </div>
                <div className="pt-2 border-t mt-4">
                  <h4 className="text-[10px] font-bold text-blue-700 uppercase mb-3">Dokter Pemeriksa</h4>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Dokter</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1 font-bold" value={data.doctorName} onChange={e => handleDataChange('doctorName', e.target.value)} placeholder="Nama beserta gelar" />
                  </div>
                  <div className="mt-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">SIP Dokter</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.doctorSip} onChange={e => handleDataChange('doctorSip', e.target.value)} placeholder="Nomor Surat Izin Praktik" />
                  </div>
                </div>
                <div className="pt-2 border-t mt-4">
                  <h4 className="text-[10px] font-bold text-blue-700 uppercase mb-3">Waktu Pembuatan</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Kota</label>
                      <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota pembuatan" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal</label>
                      <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
              )}

           </div>
        </div>
        
        {/* PANEL KANAN: PREVIEW DOKUMEN */}
        <div className={`flex-1 bg-slate-400 overflow-y-auto p-4 md:p-8 flex justify-center w-full h-full custom-scrollbar transition-transform ${mobileView === 'editor' ? 'translate-x-full md:translate-x-0 hidden md:flex' : 'translate-x-0 flex'} print:block print:overflow-visible print:bg-white`}>
            <DocumentContent />
        </div>
        
      </main>
    </div>
  );
}