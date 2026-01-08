'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, GraduationCap, Building2, UserCircle2, 
  X, PenTool, ShieldCheck, CalendarClock, FileText, MapPin
} from 'lucide-react';
import Link from 'next/link';

export default function CutiKuliahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat Cuti...</div>}>
      <LeaveBuilder />
    </Suspense>
  );
}

function LeaveBuilder() {
  const [data, setData] = useState({
    city: 'Denpasar',
    date: '2026-01-08',
    
    // INSTANSI
    university: 'UNIVERSITAS UDAYANA (UNUD)',
    faculty: 'Fakultas Teknik',
    department: 'Teknologi Informasi',

    // DATA MAHASISWA
    studentName: 'BAGUS RAMADHAN',
    studentId: '2208561001',
    semester: 'Semester IV (Empat)',
    ipk: '3.75',
    
    // DETAIL CUTI
    leaveDuration: '1 (Satu) Semester',
    academicYear: '2025/2026 Genap',
    reason: 'Fokus pada pemulihan kesehatan pasca operasi dan memerlukan waktu istirahat intensif sesuai anjuran dokter (Surat Keterangan Medis terlampir).',

    // PENANDATANGAN
    advisorName: 'DR. I MADE WIRA, S.T., M.T.',
    deanName: 'PROF. DR. IR. NYOMAN GEDE, M.T.',
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const LeaveContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border print:m-0 print:border-none print:shadow-none p-[25mm] print:p-[20mm] text-slate-900 font-serif" 
         style={{ width: '210mm', height: '290mm' }}>
      
      {/* HEADER TANGGAL */}
      <div className="text-right mb-10 text-[11pt]">
        <p>{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
      </div>

      {/* TUJUAN SURAT */}
      <div className="mb-10 text-[11pt]">
        <p>Hal: <b>Permohonan Cuti Akademik (Cuti Kuliah)</b></p>
        <div className="mt-4">
          <p>Yth. <b>Bapak/Ibu Dekan {data.faculty}</b></p>
          <p>{data.university}</p>
          <p>Di Tempat</p>
        </div>
      </div>

      {/* ISI SURAT */}
      <div className="flex-grow text-[11pt] leading-relaxed text-justify overflow-hidden">
        <p className="mb-4">Dengan hormat,</p>
        <p className="mb-4">Saya yang bertanda tangan di bawah ini:</p>
        
        <div className="ml-8 mb-6 space-y-1 font-sans text-[10pt] border-l-4 border-blue-100 pl-4 italic">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.studentName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>NIM</span><span>:</span><span>{data.studentId}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Prodi / Jurusan</span><span>:</span><span>{data.department}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>IPK Terakhir</span><span>:</span><span>{data.ipk}</span></div>
        </div>

        <p className="mb-4">Mengajukan permohonan untuk mengambil Cuti Akademik selama <b>{data.leaveDuration}</b> pada Tahun Akademik <b>{data.academicYear}</b>, dengan alasan:</p>
        
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 font-sans text-[10pt] mb-6 italic leading-relaxed">
            "{data.reason}"
        </div>

        <p className="mb-6">
          Sebagai bahan pertimbangan, saya melampirkan dokumen pendukung (KRS terakhir / Surat Keterangan Medis). Saya berjanji akan melaporkan diri kembali ke bagian akademik tepat waktu setelah masa cuti berakhir.
        </p>

        <p>Demikian surat permohonan ini saya sampaikan. Atas perhatian dan izin yang Bapak/Ibu berikan, saya ucapkan terima kasih.</p>
      </div>

      {/* TANDA TANGAN MULTI-LAYER */}
      <div className="shrink-0 mt-8">
        <table className="w-full table-fixed text-[10pt]">
          <tbody>
            <tr className="text-center font-bold">
              <td className="pb-20 uppercase tracking-widest text-[8pt] text-slate-400">Menyetujui,<br/>Dosen Pembimbing Akademik</td>
              <td className="pb-20 uppercase tracking-widest text-[8pt] text-slate-400">Hormat Saya,<br/>Mahasiswa</td>
            </tr>
            <tr className="text-center font-bold">
              <td>
                <p className="underline uppercase">{data.advisorName}</p>
              </td>
              <td>
                <div className="flex flex-col items-center">
                   <div className="border border-slate-200 w-20 h-10 flex items-center justify-center text-[6pt] text-slate-300 italic mb-2">MATERAI 10.000</div>
                   <p className="underline uppercase">{data.studentName}</p>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="text-center pt-12">
                <p className="uppercase font-bold text-[8pt] text-slate-400 mb-20">Mengetahui,<br/>Dekan {data.faculty}</p>
                <p className="underline font-bold uppercase">{data.deanName}</p>
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
               <CalendarClock size={18} /> Academic <span className="text-white not-italic opacity-40 font-normal italic">Leave Builder</span>
            </h1>
          </div>
          <button onClick={() => window.print()} className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 active:scale-95 transition-all shadow-lg">
            <Printer size={16} /> Print Surat Cuti
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          <div className="w-[420px] bg-white border-r overflow-y-auto p-6 space-y-8 scrollbar-thin text-slate-900 shadow-inner">
             
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Info Kampus</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase" value={data.university} onChange={e => handleDataChange('university', e.target.value)} />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.faculty} onChange={e => handleDataChange('faculty', e.target.value)} placeholder="Fakultas" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.department} onChange={e => handleDataChange('department', e.target.value)} placeholder="Program Studi" />
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Data Mahasiswa</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase bg-slate-50" value={data.studentName} onChange={e => handleDataChange('studentName', e.target.value)} />
                <div className="grid grid-cols-2 gap-2">
                   <input className="w-full p-3 border rounded-xl text-xs" value={data.studentId} onChange={e => handleDataChange('studentId', e.target.value)} placeholder="NIM" />
                   <input className="w-full p-3 border rounded-xl text-xs" value={data.ipk} onChange={e => handleDataChange('ipk', e.target.value)} placeholder="IPK" />
                </div>
             </div>

             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><FileText size={12}/> Durasi & Alasan</h3>
                <input className="w-full p-3 border rounded-xl text-xs" value={data.leaveDuration} onChange={e => handleDataChange('leaveDuration', e.target.value)} placeholder="Lama Cuti (cth: 1 Semester)" />
                <textarea className="w-full p-3 border rounded-xl text-xs h-32 resize-none leading-relaxed" value={data.reason} onChange={e => handleDataChange('reason', e.target.value)} placeholder="Alasan Cuti..." />
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.advisorName} onChange={e => handleDataChange('advisorName', e.target.value)} placeholder="Nama Dosen Wali" />
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.deanName} onChange={e => handleDataChange('deanName', e.target.value)} placeholder="Nama Dekan" />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-300/30">
             <div className="origin-top scale-[0.55] lg:scale-[0.85] xl:scale-100 transition-transform shadow-2xl">
                <LeaveContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <LeaveContent />
      </div>
    </div>
  );
}