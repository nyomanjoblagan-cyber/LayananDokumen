'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Search, Building2, UserCircle2, 
  MapPin, LayoutTemplate, X, PenTool, ShieldCheck, FileSearch
} from 'lucide-react';
import Link from 'next/link';

export default function PenelitianPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat Izin Riset...</div>}>
      <ResearchBuilder />
    </Suspense>
  );
}

function ResearchBuilder() {
  const [data, setData] = useState({
    city: 'Denpasar',
    date: '2026-01-08',
    docNo: '044/UNUD/FT/I/2026',
    
    // INSTANSI KAMPUS
    university: 'UNIVERSITAS UDAYANA (UNUD)',
    faculty: 'Fakultas Teknik',
    department: 'Program Studi Teknologi Informasi',
    campusAddress: 'Kampus Bukit Jimbaran, Badung, Bali',

    // TUJUAN PENELITIAN
    targetOffice: 'Pimpinan PT. Teknologi Indonesia Makmur',
    targetAddress: 'Jl. Gatot Subroto No. 45, Denpasar',

    // DATA MAHASISWA
    studentName: 'BAGUS RAMADHAN',
    studentId: '2208561001',
    semester: 'Semester VIII (Delapan)',
    
    // DETAIL PENELITIAN
    researchTitle: 'Analisis Keamanan Jaringan Menggunakan Metode Zero Trust Architecture pada Sistem Distribusi Logistik.',
    duration: '3 (Tiga) Bulan',
    
    // PENGESAH
    deanName: 'PROF. DR. IR. NYOMAN GEDE, M.T.',
    deanNip: '19750101 200003 1 002'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const ResearchContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border print:m-0 print:border-none print:shadow-none p-[25mm] print:p-[20mm] text-slate-900 font-serif" 
         style={{ width: '210mm', height: '290mm' }}>
      
      {/* KOP UNIVERSITAS */}
      <div className="flex flex-col items-center border-b-4 border-double border-slate-900 pb-4 mb-8 shrink-0 text-center">
        <h2 className="text-[11pt] font-black uppercase leading-tight italic">KEMENTERIAN PENDIDIKAN, KEBUDAYAAN, RISET, DAN TEKNOLOGI</h2>
        <h1 className="text-[13pt] font-black uppercase leading-tight mt-1">{data.university}</h1>
        <h2 className="text-[12pt] font-bold uppercase leading-tight">{data.faculty}</h2>
        <p className="text-[9pt] font-sans mt-1 italic">{data.campusAddress}</p>
      </div>

      {/* TANGGAL & NOMOR */}
      <div className="flex justify-between mb-8 text-[11pt]">
         <div className="space-y-1">
            <p>Nomor : {data.docNo}</p>
            <p>Lampiran : 1 (satu) Berkas Proposal</p>
            <p>Hal : <b>Permohonan Izin Penelitian</b></p>
         </div>
         <p>{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
      </div>

      {/* TUJUAN */}
      <div className="mb-8 text-[11pt]">
        <p>Yth. <b>{data.targetOffice}</b></p>
        <p>{data.targetAddress}</p>
        <p>Di Tempat</p>
      </div>

      {/* ISI SURAT */}
      <div className="flex-grow text-[11pt] leading-relaxed text-justify overflow-hidden">
        <p className="mb-4">Dengan hormat,</p>
        <p className="mb-4">Dalam rangka penyelesaian tugas akhir (Skripsi/Tesis), kami bermaksud memohon bantuan Bapak/Ibu untuk memberikan izin penelitian kepada mahasiswa kami:</p>
        
        <div className="ml-10 mb-6 space-y-1 font-sans text-[10pt] border-l-4 border-blue-100 pl-6">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase tracking-tight">{data.studentName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>NIM</span><span>:</span><span>{data.studentId}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Program Studi</span><span>:</span><span>{data.department}</span></div>
        </div>

        <p className="mb-4">Adapun rencana penelitian tersebut akan dilaksanakan dengan rincian:</p>
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 font-sans text-[10pt] mb-6 space-y-2">
            <p className="leading-relaxed italic"><b>Judul Penelitian:</b><br/>"{data.researchTitle}"</p>
            <p><b>Durasi Penelitian:</b> {data.duration}</p>
        </div>

        <p className="mb-6 leading-relaxed">
          Seluruh data yang diperoleh hanya akan digunakan untuk kepentingan akademik dan kerahasiaan data instansi akan dijaga sesuai dengan kode etik penelitian.
        </p>

        <p>Demikian surat permohonan ini kami sampaikan. Atas bantuan dan kerja sama yang diberikan, kami ucapkan terima kasih.</p>
      </div>

      {/* TANDA TANGAN (RIGHT ALIGNED) */}
      <div className="shrink-0 mt-10">
        <table className="w-full table-fixed">
          <tbody>
            <tr>
              <td className="w-1/2"></td>
              <td className="text-center">
                <p className="font-bold mb-24 uppercase text-[9.5pt]">Dekan / Ketua Program Studi,</p>
                <div className="flex flex-col items-center">
                   <p className="font-bold underline uppercase text-[11pt] tracking-tight">{data.deanName}</p>
                   <p className="text-[9pt] font-sans mt-1">NIP. {data.deanNip}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-200 font-sans text-slate-900">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0 !important; }
          body, html { height: 297mm !important; margin: 0 !important; padding: 0 !important; overflow: hidden !important; background: white !important; }
          #ui-root { display: none !important; }
          #print-only-root { display: block !important; position: absolute !important; top: 0 !important; left: 0 !important; width: 210mm !important; }
        }
      `}</style>

      {/* UI EDITOR */}
      <div id="ui-root" className="flex flex-col h-screen no-print">
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700 shadow-xl">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-all"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-blue-400 italic flex items-center gap-2">
               <FileSearch size={18} /> Research <span className="text-white not-italic opacity-40 font-normal italic">Permit Builder</span>
            </h1>
          </div>
          <button onClick={() => window.print()} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 active:scale-95 transition-all shadow-lg">
            <Printer size={16} /> Print Surat Izin
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR */}
          <div className="w-[420px] bg-white border-r overflow-y-auto p-6 space-y-8 scrollbar-thin text-slate-900 shadow-inner">
             
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Kop Kampus</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase bg-slate-50" value={data.university} onChange={e => handleDataChange('university', e.target.value)} />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.faculty} onChange={e => handleDataChange('faculty', e.target.value)} placeholder="Fakultas" />
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Data Peneliti</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase" value={data.studentName} onChange={e => handleDataChange('studentName', e.target.value)} />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.studentId} onChange={e => handleDataChange('studentId', e.target.value)} placeholder="NIM" />
             </div>

             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><Search size={12}/> Objek & Judul Riset</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.targetOffice} onChange={e => handleDataChange('targetOffice', e.target.value)} placeholder="Tujuan Surat (Instansi)" />
                <textarea className="w-full p-3 border rounded-xl text-xs h-28 resize-none leading-relaxed italic" value={data.researchTitle} onChange={e => handleDataChange('researchTitle', e.target.value)} placeholder="Judul Penelitian..." />
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.deanName} onChange={e => handleDataChange('deanName', e.target.value)} placeholder="Nama Dekan/Kaprodi" />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-300/30">
             <div className="origin-top scale-[0.55] lg:scale-[0.85] xl:scale-100 transition-transform shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                <ResearchContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <ResearchContent />
      </div>
    </div>
  );
}