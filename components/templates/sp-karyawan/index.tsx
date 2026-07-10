'use client';

import { useState, useRef, Suspense, useEffect } from 'react';
import { 
  Printer, AlertTriangle, ShieldAlert, User, Building2, Edit3, ImagePlus, RotateCcw,
  ArrowLeftCircle, Scale, Clock
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

// --- ATURAN KERTAS MUTLAK ---
const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 h-auto ${className}`}>
    {children}
  </div>
);

interface SPData {
  no: string;
  date: string;
  validUntil: string;
  spLevel: string;
  sanctionDuration: string;
  
  // Perusahaan
  compName: string;
  compInfo: string;
  
  // Karyawan
  empName: string;
  empId: string;
  empDiv: string;
  empTitle: string;
  
  // Pelanggaran
  violationType: string;
  violationDate: string;
  violationDesc: string;
  pasalPP: string;
  sanction: string;
  
  // Penandatangan
  signer: string;
  signerJob: string;
}

const INITIAL_DATA: SPData = {
  no: `SP-001/HRD/2026`,
  date: '', 
  validUntil: '', 
  spLevel: '1',
  sanctionDuration: '6 (enam) bulan',
  
  compName: 'PT. MAJU MUNDUR SEJAHTERA',
  compInfo: 'Jl. Jend. Sudirman Kav. 1, Jakarta Selatan\nEmail: hrd@majumundur.com',
  
  empName: 'BUDI SANTOSO',
  empId: 'NIK-2023005',
  empDiv: 'Sales & Marketing',
  empTitle: 'Sales Executive',
  
  violationType: 'Mangkir / Ketidakhadiran Tanpa Izin',
  violationDate: '10, 11, dan 12 Januari 2026',
  violationDesc: 'Sdr. Budi Santoso telah melakukan tindakan indisipliner berupa ketidakhadiran tanpa alasan yang sah (mangkir) selama 3 (tiga) hari kerja berturut-turut serta tidak berupaya menghubungi pihak Perusahaan maupun atasan langsung.',
  pasalPP: 'Pasal 24 Ayat 1 dan 2 Peraturan Perusahaan tentang Kedisiplinan Kehadiran dan Waktu Kerja',
  sanction: 'Selama masa berlakunya Surat Peringatan ini, Perusahaan menangguhkan segala bentuk fasilitas penunjang tidak tetap dan menunda evaluasi kenaikan golongan/gaji tahunan. Apabila Saudara mengulangi pelanggaran yang sama atau melakukan pelanggaran lain, Perusahaan berhak menerbitkan sanksi yang lebih berat hingga Pemutusan Hubungan Kerja (PHK).',
  
  signer: 'SISKA AMELIA',
  signerJob: 'HR Manager'
};

export default function SPPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50 uppercase tracking-widest text-xs">Memuat Sistem HRD...</div>}>
      <SPToolBuilder />
    </Suspense>
  );
}

function SPToolBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<SPData>(INITIAL_DATA);

  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const sixMonths = new Date(new Date().setMonth(today.getMonth() + 6));
    setData(prev => ({ 
        ...prev, 
        date: today.toISOString().split('T')[0],
        validUntil: sixMonths.toISOString().split('T')[0]
    }));
  }, []);

  const handleDataChange = (field: keyof SPData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleSpLevelChange = (level: string) => {
    let newSanction = '';
    let newDuration = '6 (enam) bulan';
    
    if (level === '1') {
      newSanction = 'Selama masa berlakunya Surat Peringatan ini, Perusahaan menangguhkan segala bentuk fasilitas penunjang tidak tetap dan menunda evaluasi kenaikan golongan/gaji tahunan. Apabila Saudara mengulangi pelanggaran yang sama atau melakukan pelanggaran lain, Perusahaan berhak menerbitkan sanksi yang lebih berat hingga Pemutusan Hubungan Kerja (PHK).';
    } else if (level === '2') {
      newSanction = 'Sebagai akibat dari pelanggaran berulang, Perusahaan menjatuhkan sanksi administratif dan penangguhan bonus tahunan. Apabila dalam masa berlakunya SP 2 ini Saudara kembali melakukan tindakan indisipliner, maka Perusahaan akan menerbitkan SP 3 yang dapat berujung pada Pemutusan Hubungan Kerja (PHK) tanpa kompensasi tambahan sesuai ketentuan yang berlaku.';
    } else {
      newSanction = 'INI ADALAH PERINGATAN TERAKHIR. Segala bentuk pelanggaran sekecil apapun selama masa berlakunya Surat Peringatan ke-3 ini akan langsung berakibat pada PEMUTUSAN HUBUNGAN KERJA (PHK) karena pelanggaran berat / pengulangan kesalahan, tanpa perlu pemberitahuan lebih lanjut.';
    }

    setData(prev => ({
      ...prev,
      spLevel: level,
      no: `SP-00${level}/HRD/2026`,
      sanction: newSanction,
      sanctionDuration: newDuration
    }));
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        const today = new Date();
        const sixMonths = new Date(new Date().setMonth(today.getMonth() + 6));
        setData({ 
            ...INITIAL_DATA, 
            date: today.toISOString().split('T')[0],
            validUntil: sixMonths.toISOString().split('T')[0]
        });
        setLogo(null);
    }
  };

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        try {
            return new Date(dateString + 'T00:00:00').toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'});
        } catch { return dateString; }
    };

    return (
      <Kertas>
        {/* KOP PERUSAHAAN */}
        <div className="flex items-center gap-6 border-b-4 border-double border-slate-900 pb-4 mb-8 shrink-0 font-sans">
            {logo ? (
              <img src={logo} alt="Logo" className="w-20 h-20 object-contain shrink-0" />
            ) : (
              <div className="w-20 h-20 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex items-center justify-center text-slate-300 shrink-0 print:hidden">
                 <Building2 size={32} />
              </div>
            )}
            <div className="flex-grow text-left">
                <h1 className="text-[16pt] font-black uppercase leading-tight tracking-tighter text-slate-900">{data.compName}</h1>
                <p className="text-[9pt] mt-1 text-slate-700 print:text-black leading-tight whitespace-pre-line">{data.compInfo}</p>
            </div>
        </div>

        {/* JUDUL */}
        <div className="text-center mb-8 shrink-0 leading-tight font-sans">
            <h2 className="text-[14pt] font-black underline uppercase tracking-widest text-slate-900">
                SURAT PERINGATAN {data.spLevel}
            </h2>
            <p className="text-[10pt] mt-2 font-semibold text-slate-700 print:text-black uppercase tracking-wider font-mono">
                NOMOR: {data.no}
            </p>
        </div>

        {/* ISI SURAT */}
        <div className="flex-grow space-y-6 text-justify leading-relaxed">
            <p>
                Surat Peringatan {data.spLevel} ini diterbitkan oleh Manajemen {data.compName} dan ditujukan kepada:
            </p>
            
            <div className="ml-8 space-y-2 font-sans text-[10.5pt]">
                <div className="grid grid-cols-[160px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.empName}</span></div>
                <div className="grid grid-cols-[160px_10px_1fr]"><span>Nomor Induk Karyawan</span><span>:</span><span className="font-mono">{data.empId}</span></div>
                <div className="grid grid-cols-[160px_10px_1fr]"><span>Jabatan / Divisi</span><span>:</span><span>{data.empTitle} / {data.empDiv}</span></div>
            </div>

            <p>
                Surat Peringatan ini merupakan tindakan indisipliner formal yang diterbitkan atas dasar pelanggaran serius terhadap Peraturan Perusahaan, dengan rincian sebagai berikut:
            </p>

            <table className="w-full border-collapse border border-slate-900 text-[10pt] mt-2 mb-4 break-inside-avoid">
                <tbody>
                    <tr>
                        <td className="border border-slate-900 p-2 font-bold w-[35%] align-top bg-slate-50 print:bg-transparent">Jenis Pelanggaran</td>
                        <td className="border border-slate-900 p-2 align-top">{data.violationType}</td>
                    </tr>
                    <tr>
                        <td className="border border-slate-900 p-2 font-bold align-top bg-slate-50 print:bg-transparent">Tanggal Kejadian</td>
                        <td className="border border-slate-900 p-2 align-top">{data.violationDate}</td>
                    </tr>
                    <tr>
                        <td className="border border-slate-900 p-2 font-bold align-top bg-slate-50 print:bg-transparent">Rincian Kejadian</td>
                        <td className="border border-slate-900 p-2 align-top">{data.violationDesc}</td>
                    </tr>
                    <tr>
                        <td className="border border-slate-900 p-2 font-bold align-top bg-slate-50 print:bg-transparent">Ketentuan yang Dilanggar</td>
                        <td className="border border-slate-900 p-2 align-top font-bold italic">{data.pasalPP}</td>
                    </tr>
                </tbody>
            </table>

            <div className="space-y-2">
                <p>
                    Tindakan Saudara secara nyata telah merugikan operasional dan tata tertib kerja. Oleh karena itu, Perusahaan menetapkan sanksi administratif dan konsekuensi sebagai berikut:
                </p>
                <div className="pl-6 border-l-4 border-slate-900 italic font-medium text-slate-800 print:text-black">
                    "{data.sanction}"
                </div>
            </div>

            <p>
                Surat Peringatan ini berlaku efektif selama <strong>{data.sanctionDuration}</strong> sejak tanggal <strong>{formatDateSafe(data.date)}</strong> hingga <strong>{formatDateSafe(data.validUntil)}</strong>. Apabila Saudara menolak menandatangani surat ini, Surat Peringatan tetap dinyatakan sah dan berlaku mengikat secara hukum sejak diterbitkan.
            </p>

            <p>
                Demikian Surat Peringatan ini dibuat agar menjadi perhatian serius dan Saudara diwajibkan untuk segera memperbaiki kinerja serta mematuhi seluruh Peraturan Perusahaan tanpa terkecuali.
            </p>
        </div>

        {/* TANDA TANGAN */}
        <div className="shrink-0 mt-12 pt-8 border-t border-slate-900 break-inside-avoid" style={{ pageBreakInside: 'avoid' }}>
            <p className="text-right mb-8">Jakarta, {formatDateSafe(data.date)}</p>
             <div className="grid grid-cols-2 gap-10 text-center font-sans">
                <div className="flex flex-col h-32">
                   <p className="uppercase text-[9pt] font-bold text-slate-700 tracking-wider mb-1">Dibuat Oleh Manajemen,</p>
                   <div className="mt-auto">
                      <p className="font-bold underline uppercase tracking-tight text-[11pt]">{data.signer}</p>
                      <p className="text-[9pt] text-slate-700">{data.signerJob}</p>
                   </div>
                </div>
                <div className="flex flex-col h-32">
                   <p className="uppercase text-[9pt] font-bold text-slate-700 tracking-wider mb-1">Diterima & Disetujui Oleh,</p>
                   <div className="mt-auto">
                      <p className="font-bold underline uppercase tracking-tight text-[11pt]">{data.empName}</p>
                      <p className="text-[9pt] text-slate-700">Karyawan Ybs.</p>
                   </div>
                </div>
             </div>
        </div>
      </Kertas>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900 relative">
      {/* ATURAN PRINT MUTLAK */}
      <style dangerouslySetInnerHTML={{ __html: `\n@media print {\n  @page { size: A4; margin: 15mm; } \n  body { background: white; margin: 0; padding: 0; width: 100%; }\n  .no-print { display: none !important; }\n  #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }\n  .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }\n  .break-before-auto { break-before: auto !important; page-break-before: auto !important; }\n  * { box-sizing: border-box !important; }\n}\n` }} />

      {/* NAVBAR */}
      <div className="no-print bg-slate-900 text-white h-16 sticky top-0 z-50 border-b border-slate-700 flex items-center px-4 justify-between shadow-md">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 hidden md:block mx-2"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-red-400 uppercase tracking-tighter">
               <ShieldAlert size={16} /> <span>Corporate HR - SP Builder</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-rose-600 hover:bg-rose-500 text-white px-5 py-2 rounded-lg font-bold text-xs uppercase shadow-lg active:scale-95 transition-all flex items-center gap-2">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen HR</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full md:w-[450px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50 font-sans">
                <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> HR Administrator Form</h2>
                <button onClick={handleReset} className="text-slate-400 hover:text-red-500" title="Reset Formulir"><RotateCcw size={16}/></button>
           </div>
           
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar pb-32 font-sans">
              
              <div className="bg-red-50 p-4 rounded-xl border border-red-200 space-y-4">
                 <h3 className="text-xs font-black uppercase text-red-800 flex items-center gap-2"><AlertTriangle size={14}/> Penetapan SP</h3>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-slate-600 uppercase">Tingkat Pelanggaran</label>
                    <select 
                        className="w-full p-2.5 border border-red-300 rounded-lg text-sm font-bold text-slate-800 focus:ring-2 focus:ring-red-500 outline-none bg-white cursor-pointer"
                        value={data.spLevel}
                        onChange={(e) => handleSpLevelChange(e.target.value)}
                    >
                        <option value="1">Surat Peringatan 1 (SP 1)</option>
                        <option value="2">Surat Peringatan 2 (SP 2)</option>
                        <option value="3">Surat Peringatan 3 (SP 3) / Terakhir</option>
                    </select>
                 </div>
                 
                 <div className="grid grid-cols-2 gap-3">
                   <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-600 uppercase">No. Dokumen</label>
                      <input className="w-full p-2 border border-red-300 rounded-lg text-xs focus:ring-2 focus:ring-red-500 outline-none font-mono" value={data.no} onChange={e => handleDataChange('no', e.target.value)} />
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] font-bold text-slate-600 uppercase">Tanggal Diterbitkan</label>
                      <input type="date" className="w-full p-2 border border-red-300 rounded-lg text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                   </div>
                 </div>
              </div>

              <div className="space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-700 border-b pb-1 tracking-widest flex items-center gap-2"><Building2 size={12}/> Identitas Perusahaan</h3>
                 <div className="flex items-center gap-4 py-2">
                    <div onClick={() => fileInputRef.current?.click()} className="w-16 h-16 border-2 border-dashed border-slate-300 rounded-lg flex items-center justify-center cursor-pointer hover:bg-slate-50 overflow-hidden shrink-0">
                       {logo ? <img src={logo} className="w-full h-full object-contain" alt="Logo" /> : <ImagePlus size={20} className="text-slate-400" />}
                       <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleLogoUpload} />
                    </div>
                    <input className="flex-1 p-2.5 border rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-blue-500 outline-none" value={data.compName} onChange={e => handleDataChange('compName', e.target.value)} placeholder="NAMA PERUSAHAAN" />
                 </div>
                 <textarea className="w-full p-2.5 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-blue-500 outline-none" value={data.compInfo} onChange={e => handleDataChange('compInfo', e.target.value)} placeholder="Alamat & Kontak Perusahaan" />
              </div>

              <div className="space-y-4 border-t pt-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-700 border-b pb-1 tracking-widest flex items-center gap-2"><User size={12}/> Identitas Karyawan (Tersanksi)</h3>
                 <div className="space-y-3">
                    <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                        <input className="w-full p-2.5 border rounded-lg text-sm font-bold uppercase focus:ring-2 focus:ring-slate-500 outline-none" value={data.empName} onChange={e => handleDataChange('empName', e.target.value)} placeholder="Nama Karyawan" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase">NIK / ID</label>
                            <input className="w-full p-2.5 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none font-mono" value={data.empId} onChange={e => handleDataChange('empId', e.target.value)} placeholder="NIK" />
                        </div>
                        <div>
                            <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan</label>
                            <input className="w-full p-2.5 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.empTitle} onChange={e => handleDataChange('empTitle', e.target.value)} placeholder="Jabatan" />
                        </div>
                    </div>
                    <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase">Departemen / Divisi</label>
                        <input className="w-full p-2.5 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.empDiv} onChange={e => handleDataChange('empDiv', e.target.value)} placeholder="Divisi" />
                    </div>
                 </div>
              </div>

              <div className="space-y-4 border-t pt-4">
                 <h3 className="text-[10px] font-black uppercase text-slate-700 border-b pb-1 tracking-widest flex items-center gap-2"><Scale size={12}/> Detail Kasus & Pelanggaran</h3>
                 <div className="space-y-3">
                     <div>
                         <label className="text-[10px] font-bold text-slate-500 uppercase">Jenis Pelanggaran</label>
                         <input className="w-full p-2.5 border rounded-lg text-xs font-bold focus:ring-2 focus:ring-slate-500 outline-none" value={data.violationType} onChange={e => handleDataChange('violationType', e.target.value)} />
                     </div>
                     <div>
                         <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Kejadian</label>
                         <input className="w-full p-2.5 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.violationDate} onChange={e => handleDataChange('violationDate', e.target.value)} />
                     </div>
                     <div>
                         <label className="text-[10px] font-bold text-slate-500 uppercase">Rincian Kejadian</label>
                         <textarea className="w-full p-2.5 border rounded-lg text-xs h-24 resize-none focus:ring-2 focus:ring-slate-500 outline-none leading-relaxed" value={data.violationDesc} onChange={e => handleDataChange('violationDesc', e.target.value)} />
                     </div>
                     <div>
                         <label className="text-[10px] font-bold text-slate-500 uppercase">Pasal / Peraturan yang Dilanggar (Legal HR)</label>
                         <textarea className="w-full p-2.5 border rounded-lg text-xs h-16 resize-none focus:ring-2 focus:ring-red-500 outline-none font-medium" value={data.pasalPP} onChange={e => handleDataChange('pasalPP', e.target.value)} />
                     </div>
                 </div>
              </div>

              <div className="space-y-4 border-t pt-4 pb-10">
                 <h3 className="text-[10px] font-black uppercase text-slate-700 border-b pb-1 tracking-widest flex items-center gap-2"><Clock size={12}/> Konsekuensi & Sanksi</h3>
                 <div className="space-y-3">
                     <div>
                         <label className="text-[10px] font-bold text-slate-500 uppercase">Redaksi Sanksi (Baku)</label>
                         <textarea className="w-full p-2.5 border rounded-lg text-xs h-32 resize-none focus:ring-2 focus:ring-slate-500 outline-none font-medium bg-slate-50" value={data.sanction} onChange={e => handleDataChange('sanction', e.target.value)} />
                     </div>
                     <div className="grid grid-cols-2 gap-3">
                         <div>
                             <label className="text-[10px] font-bold text-slate-500 uppercase">Masa Berlaku</label>
                             <input className="w-full p-2.5 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.sanctionDuration} onChange={e => handleDataChange('sanctionDuration', e.target.value)} />
                         </div>
                         <div>
                             <label className="text-[10px] font-bold text-slate-500 uppercase">S.D Tanggal</label>
                             <input type="date" className="w-full p-2.5 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.validUntil} onChange={e => handleDataChange('validUntil', e.target.value)} />
                         </div>
                     </div>
                 </div>
                 
                 <div className="space-y-3 pt-4">
                     <h4 className="text-[10px] font-bold text-slate-500 uppercase border-b pb-1">Penandatangan (HR/Manajemen)</h4>
                     <div className="grid grid-cols-2 gap-3">
                         <input className="w-full p-2.5 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none uppercase font-bold" value={data.signer} onChange={e => handleDataChange('signer', e.target.value)} placeholder="Nama Penandatangan" />
                         <input className="w-full p-2.5 border rounded-lg text-xs focus:ring-2 focus:ring-slate-500 outline-none" value={data.signerJob} onChange={e => handleDataChange('signerJob', e.target.value)} placeholder="Jabatan Penandatangan" />
                     </div>
                 </div>
              </div>

           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`flex-1 h-full bg-slate-200/50 rounded-xl flex flex-col items-center p-4 md:p-8 overflow-y-auto relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'}`}>
            <div className="origin-top transition-transform duration-300 transform scale-[0.40] sm:scale-[0.55] md:scale-[0.8] lg:scale-[0.9] xl:scale-100 mb-[-180mm] sm:mb-[-100mm] md:mb-[-20mm] lg:mb-0 shadow-2xl shrink-0">
                <DocumentContent />
            </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl flex p-1 shadow-2xl font-sans font-bold text-xs uppercase">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400'}`}>Form HR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400'}`}>Preview</button>
      </div>

      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Surat_Peringatan_Karyawan" price={15000} />
      </div>

      <div id="print-only-root" className="hidden"><div className="bg-white"><DocumentContent /></div></div>
    </div>
  );
}
