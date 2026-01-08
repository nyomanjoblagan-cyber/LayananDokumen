'use client';

import { useState, Suspense, useRef } from 'react';
import { 
  Printer, ArrowLeft, PenTool, UserCircle2, 
  X, ShieldCheck, UserPlus, Trash2, Heart, FileText
} from 'lucide-react';
import Link from 'next/link';

export default function SuratWasiatPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat Wasiat...</div>}>
      <WillLetterBuilder />
    </Suspense>
  );
}

function WillLetterBuilder() {
  const [data, setData] = useState({
    city: 'Yogyakarta',
    date: new Date().toISOString().split('T')[0],
    testatorName: 'H. MUHAMMAD YUSUF',
    testatorNik: '3471010101700001',
    testatorAddress: 'Jl. Malioboro No. 10, Sosromenduran, Yogyakarta',
    beneficiaries: [
      { name: 'SITI FATIMAH', item: 'Rumah tinggal yang berlokasi di Jl. Malioboro No. 10.' },
      { name: 'AHMAD RIZKY', item: 'Tabungan di Bank Mandiri atas nama saya pribadi.' }
    ],
    specialMessage: 'Saya berharap seluruh keluarga tetap menjaga silaturahmi dan rukun satu sama lain setelah kepergian saya.',
    witness1: 'Ir. BAMBANG SUTRISNO',
    witness2: 'Drs. HARTONO'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const addBeneficiary = () => {
    setData({ ...data, beneficiaries: [...data.beneficiaries, { name: '', item: '' }] });
  };

  const removeBeneficiary = (index: number) => {
    const newItems = [...data.beneficiaries];
    newItems.splice(index, 1);
    setData({ ...data, beneficiaries: newItems });
  };

  const updateBeneficiary = (index: number, field: string, val: string) => {
    const newItems = [...data.beneficiaries];
    // @ts-ignore
    newItems[index][field] = val;
    setData({ ...data, beneficiaries: newItems });
  };

  const WillContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border print:m-0 print:border-none print:shadow-none p-[25mm] print:p-[20mm] text-slate-900 font-serif" 
         style={{ width: '210mm', height: '290mm' }}>
      
      {/* JUDUL */}
      <div className="text-center mb-10 shrink-0">
        <h1 className="text-xl font-black underline uppercase decoration-2 underline-offset-8">SURAT WASIAT</h1>
      </div>

      {/* ISI SURAT */}
      <div className="flex-grow text-[11pt] leading-relaxed text-justify overflow-hidden">
        <p className="mb-4">Saya yang bertanda tangan di bawah ini:</p>
        <div className="ml-8 mb-6 space-y-1 font-sans text-[10pt] border-l-4 border-slate-100 pl-4 italic">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.testatorName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.testatorNik}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr] align-top"><span>Alamat</span><span>:</span><span>{data.testatorAddress}</span></div>
        </div>

        <p className="mb-4">Menyatakan dengan sesungguhnya bahwa pada saat ini saya dalam keadaan sehat walafiat, sadar, dan tanpa paksaan dari pihak manapun, memberikan wasiat harta kekayaan saya kepada:</p>
        
        <div className="space-y-4 mb-6">
            {data.beneficiaries.map((b, i) => (
                <div key={i} className="flex gap-4 items-start">
                    <span className="font-bold">{i + 1}.</span>
                    <p className="flex-grow">Memberikan <b>{b.item}</b> kepada <b>{b.name}</b> secara mutlak.</p>
                </div>
            ))}
        </div>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded-lg italic mb-6">
            <p className="font-sans text-[8pt] font-black text-slate-400 uppercase mb-1 tracking-widest">Amanat Khusus:</p>
            "{data.specialMessage}"
        </div>

        <p className="font-bold italic">
          Demikian surat wasiat ini saya buat agar dapat dilaksanakan sebagaimana mestinya. Segala surat wasiat yang saya buat sebelumnya dengan ini dinyatakan tidak berlaku.
        </p>
      </div>

      {/* TANDA TANGAN (TABLE BASED - ANTI BERANTAKAN) */}
      <div className="shrink-0 mt-6">
        <table className="w-full table-fixed">
          <tbody>
            <tr>
              <td colSpan={2} className="text-right font-bold text-[11pt] pb-8">
                {data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'})}
              </td>
            </tr>
            {/* LABEL TTD */}
            <tr className="text-[9pt] font-black text-slate-400 uppercase tracking-[0.2em]">
              <td className="text-center pb-4">Saksi-Saksi</td>
              <td className="text-center pb-4">Pembuat Wasiat</td>
            </tr>
            {/* AREA TANDA TANGAN 1 */}
            <tr>
              <td className="text-center align-bottom pb-2">
                <div className="h-20 flex flex-col justify-end items-center">
                   <p className="font-bold underline uppercase">({data.witness1})</p>
                   <p className="text-[8pt] font-normal lowercase tracking-widest text-slate-400 mt-1">Saksi I</p>
                </div>
              </td>
              <td rowSpan={2} className="text-center align-middle">
                <div className="flex flex-col items-center justify-center">
                   <div className="border border-slate-300 w-24 h-14 flex items-center justify-center text-[7pt] text-slate-400 italic mb-4">MATERAI 10.000</div>
                   <p className="font-bold underline uppercase text-[12pt]">{data.testatorName}</p>
                </div>
              </td>
            </tr>
            {/* AREA TANDA TANGAN 2 */}
            <tr>
              <td className="text-center align-bottom pt-6">
                <div className="h-20 flex flex-col justify-end items-center">
                   <p className="font-bold underline uppercase">({data.witness2})</p>
                   <p className="text-[8pt] font-normal lowercase tracking-widest text-slate-400 mt-1">Saksi II</p>
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
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-all"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-amber-400">Will Editor <span className="text-white opacity-40">Pro</span></h1>
          </div>
          <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 active:scale-95 transition-all">
            <Printer size={16} /> Print Wasiat
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          <div className="w-[420px] bg-white border-r overflow-y-auto p-6 space-y-6 scrollbar-thin shadow-inner">
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1">Data Testator</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase bg-slate-50" value={data.testatorName} onChange={e => handleDataChange('testatorName', e.target.value)} />
                <textarea className="w-full p-3 border rounded-xl text-xs h-20 resize-none" value={data.testatorAddress} onChange={e => handleDataChange('testatorAddress', e.target.value)} />
             </div>

             <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-1">
                   <h3 className="text-[10px] font-black uppercase text-emerald-600">Ahli Waris</h3>
                   <button onClick={addBeneficiary} className="bg-emerald-100 text-emerald-700 p-1 rounded-md"><UserPlus size={16}/></button>
                </div>
                {data.beneficiaries.map((b, idx) => (
                   <div key={idx} className="p-4 bg-slate-50 rounded-xl border relative group">
                      <button onClick={() => removeBeneficiary(idx)} className="absolute top-2 right-2 text-red-400 opacity-0 group-hover:opacity-100"><Trash2 size={14}/></button>
                      <input className="w-full p-2 border-b bg-transparent text-xs font-bold mb-2" value={b.name} onChange={e => updateBeneficiary(idx, 'name', e.target.value)} placeholder="Penerima" />
                      <textarea className="w-full p-2 text-[10px] h-12 resize-none bg-white border rounded" value={b.item} onChange={e => updateBeneficiary(idx, 'item', e.target.value)} placeholder="Item..." />
                   </div>
                ))}
             </div>

             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-1">Otoritas</h3>
                <input className="w-full p-3 border rounded-xl text-xs" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} placeholder="Saksi 1" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} placeholder="Saksi 2" />
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                <textarea className="w-full p-3 border rounded-xl text-xs h-24 resize-none" value={data.specialMessage} onChange={e => handleDataChange('specialMessage', e.target.value)} />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-300/30">
             <div className="origin-top scale-[0.55] lg:scale-[0.85] xl:scale-100 transition-transform shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                <WillContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <WillContent />
      </div>
    </div>
  );
}