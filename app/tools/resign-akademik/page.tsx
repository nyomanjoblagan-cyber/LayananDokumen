'use client';

import { useState, Suspense, useRef } from 'react';
import { 
  Printer, ArrowLeft, GraduationCap, Building2, UserCircle2, 
  X, PenTool, ShieldCheck, FileWarning, Undo2, MapPin
} from 'lucide-react';
import Link from 'next/link';

export default function UndurDiriPendidikanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat Pengunduran Diri...</div>}>
      <WithdrawalBuilder />
    </Suspense>
  );
}

function WithdrawalBuilder() {
  const [data, setData] = useState({
    city: 'Denpasar',
    date: '2026-01-08',
    
    // INSTANSI TUJUAN
    institutionName: 'UNIVERSITAS UDAYANA (UNUD)',
    facultyDept: 'Fakultas Teknik / Teknologi Informasi',
    institutionAddress: 'Kampus Bukit Jimbaran, Badung, Bali',

    // DATA MAHASISWA/SISWA
    studentName: 'BAGUS RAMADHAN',
    studentId: '2208561001',
    semester: 'Semester IV (Empat)',
    
    // DATA ORANG TUA
    parentName: 'SLAMET MULYONO',
    parentAddress: 'Jl. Ahmad Yani No. 100, Denpasar Utara',

    // ALASAN & TUJUAN PINDAH
    reason: 'Pindah domisili mengikuti orang tua ke luar kota (Jakarta), sehingga tidak memungkinkan untuk melanjutkan studi secara tatap muka di instansi ini.',
    newTarget: 'Universitas Indonesia (UI) - Jalur Transfer',
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const WithdrawalContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border print:m-0 print:border-none print:shadow-none p-[25mm] print:p-[20mm] text-slate-900 font-serif" 
         style={{ width: '210mm', height: '290mm' }}>
      
      {/* HEADER TANGGAL */}
      <div className="text-right mb-10 text-[11pt]">
        <p>{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
      </div>

      {/* TUJUAN SURAT */}
      <div className="mb-10 text-[11pt]">
        <p>Hal: <b>Permohonan Pengunduran Diri</b></p>
        <div className="mt-4">
          <p>Yth. <b>Bapak/Ibu Dekan / Kepala Sekolah</b></p>
          <p>{data.institutionName}</p>
          <p>{data.facultyDept}</p>
          <p>Di Tempat</p>
        </div>
      </div>

      {/* ISI SURAT */}
      <div className="flex-grow text-[11pt] leading-relaxed text-justify overflow-hidden">
        <p className="mb-4">Dengan hormat,</p>
        <p className="mb-4">Saya yang bertanda tangan di bawah ini:</p>
        
        <div className="ml-8 mb-6 space-y-1 font-sans text-[10pt] border-l-4 border-slate-100 pl-4 italic">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.studentName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>NIM/NISN</span><span>:</span><span>{data.studentId}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Semester/Kelas</span><span>:</span><span>{data.semester}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Program Studi</span><span>:</span><span>{data.facultyDept}</span></div>
        </div>

        <p className="mb-4">Melalui surat ini, saya bermaksud mengajukan permohonan pengunduran diri sebagai mahasiswa/siswa dari <b>{data.institutionName}</b> dikarenakan:</p>
        
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 font-sans text-[10pt] mb-6 italic">
            "{data.reason}"
        </div>

        <p className="mb-6">
          Saya mengucapkan terima kasih yang sebesar-besarnya atas bimbingan dan ilmu yang telah diberikan selama saya menempuh pendidikan di instansi ini. Saya juga memohon maaf atas segala kesalahan yang mungkin pernah saya lakukan selama menjadi bagian dari keluarga besar {data.institutionName}.
        </p>

        <p>Demikian permohonan ini saya sampaikan, kiranya Bapak/Ibu dapat memberikan izin serta membantu kelancaran proses administrasi pengunduran diri saya. Atas perhatiannya, saya ucapkan terima kasih.</p>
      </div>

      {/* TANDA TANGAN SIMETRIS (ORANG TUA & SISWA) */}
      <div className="shrink-0 mt-10">
        <table className="w-full table-fixed">
          <tbody>
            <tr className="text-[9pt] font-black text-slate-400 uppercase tracking-widest text-center">
              <td className="pb-4">Mengetahui, Orang Tua/Wali</td>
              <td className="pb-4">Hormat Saya,</td>
            </tr>
            <tr>
              <td className="text-center align-bottom">
                <div className="h-32 flex flex-col justify-end items-center">
                   <p className="font-bold underline uppercase">({data.parentName})</p>
                </div>
              </td>
              <td className="text-center align-bottom">
                <div className="h-32 flex flex-col justify-end items-center">
                   <div className="border border-slate-200 w-24 h-14 flex items-center justify-center text-[7pt] text-slate-400 italic mb-4">MATERAI 10.000</div>
                   <p className="font-bold underline uppercase text-[11pt] tracking-tight">{data.studentName}</p>
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
            <h1 className="font-black text-sm uppercase tracking-tighter text-red-400 flex items-center gap-2 italic">
               <Undo2 size={18} /> Withdrawal <span className="text-white not-italic opacity-40 font-normal italic">Education Builder</span>
            </h1>
          </div>
          <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 active:scale-95 transition-all shadow-lg">
            <Printer size={16} /> Print Surat
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR */}
          <div className="w-[420px] bg-white border-r overflow-y-auto p-6 space-y-8 scrollbar-thin text-slate-900 shadow-inner">
             
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><Building2 size={12}/> Instansi Tujuan</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase bg-slate-50" value={data.institutionName} onChange={e => handleDataChange('institutionName', e.target.value)} placeholder="Nama Kampus/Sekolah" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.facultyDept} onChange={e => handleDataChange('facultyDept', e.target.value)} placeholder="Fakultas / Program Studi" />
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><UserCircle2 size={12}/> Data Mahasiswa/Siswa</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase" value={data.studentName} onChange={e => handleDataChange('studentName', e.target.value)} />
                <div className="grid grid-cols-2 gap-2">
                   <input className="w-full p-3 border rounded-xl text-xs" value={data.studentId} onChange={e => handleDataChange('studentId', e.target.value)} placeholder="NIM / NISN" />
                   <input className="w-full p-3 border rounded-xl text-xs" value={data.semester} onChange={e => handleDataChange('semester', e.target.value)} placeholder="Semester/Kelas" />
                </div>
             </div>

             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1 flex items-center gap-2"><FileWarning size={12}/> Alasan & Orang Tua</h3>
                <textarea className="w-full p-3 border rounded-xl text-xs h-32 resize-none leading-relaxed" value={data.reason} onChange={e => handleDataChange('reason', e.target.value)} placeholder="Tuliskan alasan pengunduran diri..." />
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.parentName} onChange={e => handleDataChange('parentName', e.target.value)} placeholder="Nama Orang Tua" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-300/30 shadow-inner">
             <div className="origin-top scale-[0.55] lg:scale-[0.85] xl:scale-100 transition-transform shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                <WithdrawalContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <WithdrawalContent />
      </div>
    </div>
  );
}