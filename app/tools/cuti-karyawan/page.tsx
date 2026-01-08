'use client';

import { useState, Suspense, useMemo } from 'react';
import { 
  Printer, ArrowLeft, CalendarDays, UserCircle2, 
  Stethoscope, Baby, Palmtree, LayoutTemplate, ChevronDown, Check,
  Info, FileText, BadgeCheck
} from 'lucide-react';
import Link from 'next/link';

export default function IzinCutiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat Izin...</div>}>
      <LeaveRequestBuilder />
    </Suspense>
  );
}

function LeaveRequestBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [leaveType, setLeaveType] = useState<'Tahunan' | 'Hamil' | 'Sakit'>('Tahunan');

  const [data, setData] = useState({
    city: 'Bandung',
    date: new Date().toISOString().split('T')[0],
    name: 'ANISA PUTRI',
    empId: 'EMP-99021',
    position: 'Senior Accounting',
    department: 'Finance & Tax',
    startDate: '2026-02-01',
    endDate: '2026-02-03',
    reason: 'Keperluan mendesak keluarga yang tidak bisa diwakilkan di luar kota.',
    substitute: 'Rendi Arisandi',
    managerName: 'BAMBANG HERMAWAN',
    managerJob: 'HR Manager'
  });

  const TEMPLATES = [
    { id: 1, name: "Klasik Korporat", desc: "Format Standar Perkantoran" },
    { id: 2, name: "Modern Minimalis", desc: "Desain Bersih & Elegan" }
  ];

  const activeTemplate = TEMPLATES.find(t => t.id === templateId) || TEMPLATES[0];
  const activeTemplateName = activeTemplate.name;

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const diffDays = useMemo(() => {
    const start = new Date(data.startDate);
    const end = new Date(data.endDate);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return 0;
    const diffTime = Math.abs(end.getTime() - start.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }, [data.startDate, data.endDate]);

  const getIcon = () => {
    if (leaveType === 'Hamil') return <Baby size={32} />;
    if (leaveType === 'Sakit') return <Stethoscope size={32} />;
    return <Palmtree size={32} />;
  };

  const RequestContent = () => (
    <div className={`bg-white mx-auto flex flex-col box-border print:m-0 print:border-none print:shadow-none p-[25mm] print:p-[20mm] text-slate-900 ${templateId === 1 ? 'font-serif' : 'font-sans'}`} 
         style={{ width: '210mm', height: '290mm' }}>
      
      {templateId === 1 ? (
        /* TEMPLATE 1: FORMAL BERBOBOT */
        <>
          <div className="text-right text-[10pt] mb-12">
            <p className="font-bold">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}</p>
          </div>

          <div className="mb-10 space-y-1">
            <p>Hal: <b>Permohonan Izin {leaveType === 'Tahunan' ? 'Cuti Tahunan' : (leaveType === 'Sakit' ? 'Sakit (Medical Leave)' : 'Cuti Melahirkan')}</b></p>
            <p className="pt-4">Kepada Yth,</p>
            <p className="font-bold">Bapak/Ibu {data.managerName}</p>
            <p>{data.managerJob}</p>
            <p className="font-medium">{data.department}</p>
          </div>

          <div className="space-y-6 flex-grow text-[11pt] leading-relaxed">
            <p>Dengan hormat,</p>
            <p>Saya yang bertanda tangan di bawah ini, karyawan dari departemen <b>{data.department}</b>:</p>
            
            <div className="ml-8 space-y-1.5 border-l-4 border-slate-100 pl-6 py-2">
               <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold">{data.name}</span></div>
               <div className="grid grid-cols-[140px_10px_1fr]"><span>Nomor Induk</span><span>:</span><span>{data.empId}</span></div>
               <div className="grid grid-cols-[140px_10px_1fr]"><span>Jabatan</span><span>:</span><span>{data.position}</span></div>
            </div>

            <p className="text-justify">
              Melalui surat ini, saya bermaksud mengajukan permohonan izin <b>{leaveType}</b> untuk jangka waktu selama <b>{diffDays} ({(diffDays === 1 ? 'Satu' : (diffDays === 2 ? 'Dua' : (diffDays === 3 ? 'Tiga' : '...')))}) hari kerja</b>, yang akan dimulai pada tanggal <b>{new Date(data.startDate).toLocaleDateString('id-ID', {dateStyle: 'long'})}</b> hingga <b>{new Date(data.endDate).toLocaleDateString('id-ID', {dateStyle: 'long'})}</b>.
            </p>
            
            <p className="text-justify">
              Adapun permohonan ini saya ajukan dikarenakan <b>{data.reason}</b>. Saya telah memastikan bahwa seluruh pekerjaan yang bersifat mendesak telah diselesaikan dan tanggung jawab sementara akan dikoordinasikan bersama rekan kerja saya, <b>{data.substitute}</b>.
            </p>
            
            <p className="text-justify">Demikian surat permohonan ini saya sampaikan dengan harapan dapat Bapak/Ibu setujui. Atas perhatian, pengertian, dan kerja samanya, saya ucapkan terima kasih banyak.</p>
          </div>

          <div className="shrink-0 mt-10 grid grid-cols-2 gap-10 text-center">
             <div className="space-y-20">
                <p className="uppercase text-[9pt] font-black text-slate-400">Menyetujui,</p>
                <div>
                   <p className="font-bold underline uppercase">{data.managerName}</p>
                   <p className="text-[9pt]">{data.managerJob}</p>
                </div>
             </div>
             <div className="space-y-20">
                <p className="uppercase text-[9pt] font-black text-slate-400">Hormat Saya,</p>
                <div>
                   <p className="font-bold underline uppercase">{data.name}</p>
                   <p className="text-[9pt]">Karyawan</p>
                </div>
             </div>
          </div>
        </>
      ) : (
        /* TEMPLATE 2: MODERN CLEAN */
        <div className="flex flex-col h-full border-t-[12px] border-slate-900 pt-10">
          <div className="flex justify-between items-center mb-12">
            <div className="flex items-center gap-5">
               <div className="p-4 bg-slate-900 text-white rounded-3xl shadow-lg">{getIcon()}</div>
               <div>
                  <h1 className="text-3xl font-black tracking-tighter uppercase leading-none italic">Leave Form</h1>
                  <p className="text-[10px] font-black text-blue-600 tracking-[0.4em] uppercase mt-1">Request ID: #{data.empId}-{new Date().getFullYear()}</p>
               </div>
            </div>
            <div className="text-right">
               <div className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[9pt] font-black mb-2 inline-block">STATUS: PENDING</div>
               <p className="text-xs font-bold text-slate-400 uppercase">{data.city}, {data.date}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mb-10">
             <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-[9pt] font-black text-slate-400 uppercase mb-2">Applicant</p>
                <p className="font-bold text-slate-900">{data.name}</p>
                <p className="text-[10px] text-slate-500">{data.position}</p>
             </div>
             <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-[9pt] font-black text-slate-400 uppercase mb-2">Timeframe</p>
                <p className="font-bold text-slate-900">{diffDays} Working Days</p>
                <p className="text-[10px] text-slate-500">{data.startDate} ~ {data.endDate}</p>
             </div>
             <div className="p-5 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-[9pt] font-black text-slate-400 uppercase mb-2">Back-up Person</p>
                <p className="font-bold text-slate-900">{data.substitute}</p>
                <p className="text-[10px] text-slate-500">Operation Support</p>
             </div>
          </div>

          <div className="flex-grow space-y-8">
             <div>
                <h4 className="text-[9pt] font-black uppercase text-slate-300 mb-3 tracking-widest flex items-center gap-2">
                   <FileText size={14}/> Statement of Purpose
                </h4>
                <div className="p-8 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-sm italic leading-relaxed text-slate-700">
                   "Saya dengan ini mengajukan izin <b>{leaveType}</b> dikarenakan <b>{data.reason}</b>. Saya menyadari kewajiban saya dan telah melakukan koordinasi serah terima tugas dengan tim terkait untuk memastikan produktivitas tetap terjaga selama absennya saya."
                </div>
             </div>
             <div className="flex items-start gap-3 text-slate-400 bg-slate-50/50 p-4 rounded-xl">
                <Info size={16} className="shrink-0 mt-0.5" />
                <p className="text-[10px] leading-relaxed">Dokumen ini merupakan draf permohonan resmi. Harap lampirkan dokumen pendukung (seperti surat dokter atau hasil pemeriksaan) jika diperlukan oleh pihak manajemen atau HRD.</p>
             </div>
          </div>

          <div className="shrink-0 pt-10 border-t border-slate-100 flex justify-between items-end">
             <div className="space-y-4">
                <div className="w-48 h-12 border-b-2 border-slate-100"></div>
                <p className="text-[9pt] font-black uppercase text-slate-300 tracking-widest">Management Approval</p>
             </div>
             <div className="text-right group">
                <BadgeCheck size={32} className="ml-auto text-blue-600 mb-2 opacity-20" />
                <p className="text-2xl font-black text-slate-900 tracking-tighter uppercase leading-none">{data.name}</p>
                <p className="text-[9pt] font-bold text-blue-600 uppercase tracking-widest mt-1">Employee Signature</p>
             </div>
          </div>
        </div>
      )}
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

      {/* HEADER UI */}
      <div id="ui-root" className="flex flex-col h-screen no-print">
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700 shadow-xl">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-all"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-blue-400 flex items-center gap-2 italic">
               Request <span className="text-white font-normal not-italic">Manager</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 text-xs px-4 py-2 rounded-xl border border-slate-700 flex items-center gap-3 min-w-[200px] justify-between hover:bg-slate-700 transition-all shadow-inner">
                <LayoutTemplate size={14} className="text-blue-400" />
                <span className="truncate font-bold tracking-tight uppercase">{activeTemplateName}</span>
                <ChevronDown size={14} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-2xl shadow-2xl border border-slate-200 z-[999] overflow-hidden">
                  {TEMPLATES.map(t => (
                    <button key={t.id} onClick={() => {setTemplateId(t.id); setShowTemplateMenu(false)}} className={`w-full text-left p-4 text-xs hover:bg-blue-50 border-b last:border-0 transition-colors ${templateId === t.id ? 'bg-blue-50 font-bold border-l-4 border-blue-600' : 'text-slate-700'}`}>
                      {t.name}
                      <p className="text-[10px] text-slate-400 font-normal">{t.desc}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 shadow-lg active:scale-95 transition-all">
              <Printer size={16} /> Print Surat
            </button>
          </div>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR */}
          <div className="w-[420px] bg-white border-r overflow-y-auto p-6 space-y-8 scrollbar-thin shadow-inner">
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-2 tracking-[0.2em]">Kategori Izin</h3>
                <div className="grid grid-cols-3 gap-2">
                   {(['Tahunan', 'Hamil', 'Sakit'] as const).map(type => (
                      <button key={type} onClick={() => setLeaveType(type)} className={`py-3 text-[10px] font-black rounded-xl border transition-all uppercase tracking-tighter ${leaveType === type ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'}`}>
                         {type}
                      </button>
                   ))}
                </div>
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-2 tracking-[0.2em] flex items-center gap-2"><UserCircle2 size={12}/> Info Karyawan</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.name} onChange={e => handleDataChange('name', e.target.value)} placeholder="Nama Lengkap" />
                <div className="grid grid-cols-2 gap-2">
                   <input className="w-full p-3 border rounded-xl text-xs" value={data.position} onChange={e => handleDataChange('position', e.target.value)} placeholder="Jabatan" />
                   <input className="w-full p-3 border rounded-xl text-xs" value={data.department} onChange={e => handleDataChange('department', e.target.value)} placeholder="Dept" />
                </div>
             </div>
             
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-2 tracking-[0.2em] flex items-center gap-2"><CalendarDays size={12}/> Konfigurasi Waktu</h3>
                <div className="grid grid-cols-2 gap-3">
                   <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase ml-1">Dari</label>
                      <input type="date" className="w-full p-3 border rounded-xl text-xs font-black" value={data.startDate} onChange={e => handleDataChange('startDate', e.target.value)} />
                   </div>
                   <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400 uppercase ml-1">Hingga</label>
                      <input type="date" className="w-full p-3 border rounded-xl text-xs font-black" value={data.endDate} onChange={e => handleDataChange('endDate', e.target.value)} />
                   </div>
                </div>
                <textarea className="w-full p-3 border rounded-xl text-xs h-24 resize-none leading-relaxed" value={data.reason} onChange={e => handleDataChange('reason', e.target.value)} placeholder="Jelaskan alasan pengajuan izin secara lengkap..." />
                <input className="w-full p-3 border rounded-xl text-xs font-bold bg-slate-50" value={data.substitute} onChange={e => handleDataChange('substitute', e.target.value)} placeholder="Rekan Pengganti Tugas" />
             </div>
          </div>

          {/* PREVIEW */}
          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-400/20 shadow-inner">
             <div className="origin-top scale-[0.55] lg:scale-[0.8] xl:scale-100 transition-transform shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                <RequestContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <RequestContent />
      </div>
    </div>
  );
}