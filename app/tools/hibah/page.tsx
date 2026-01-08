'use client';

import { useState, Suspense, useRef } from 'react';
import { 
  Printer, ArrowLeft, Gift, Building2, UserCircle2, 
  MapPin, LayoutTemplate, ChevronDown, X, PenTool, ShieldCheck, PlusCircle, Trash2
} from 'lucide-react';
import Link from 'next/link';

export default function SuratHibahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Surat Hibah...</div>}>
      <GrantLetterBuilder />
    </Suspense>
  );
}

function GrantLetterBuilder() {
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState({
    city: 'Jakarta',
    date: new Date().toISOString().split('T')[0],
    docNo: 'HB-001/SK/2026',
    
    // PEMBERI HIBAH (PIHAK PERTAMA)
    grantorName: 'SUPARMAN HADI',
    grantorNik: '3201010101010001',
    grantorAge: '62',
    grantorAddress: 'Jl. Melati No. 12, Kel. Menteng, Jakarta Pusat',

    // PENERIMA HIBAH (PIHAK KEDUA)
    granteeName: 'ANDRE KURNIAWAN',
    granteeNik: '3201010101010005',
    granteeAge: '30',
    granteeAddress: 'Jl. Kebon Sirih No. 5, Jakarta Pusat',

    // OBJEK HIBAH
    objectType: 'Sebidang Tanah dan Bangunan',
    objectDetail: 'Sertifikat Hak Milik (SHM) No. 1234 dengan luas tanah 250 m2, terletak di Blok B No. 15, Kelurahan Rawamangun, Jakarta Timur.',
    
    // SAKSI-SAKSI
    witness1: 'H. RAMLI',
    witness2: 'SURYADI, S.H.'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setLogo(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const HibahContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border print:m-0 print:border-none print:shadow-none p-[25mm] print:p-[20mm] text-slate-900 font-serif" 
         style={{ width: '210mm', height: '290mm' }}>
      
      {/* JUDUL */}
      <div className="text-center mb-10 shrink-0">
        <h2 className="text-lg font-black underline uppercase decoration-2 underline-offset-4 tracking-widest">SURAT KETERANGAN HIBAH</h2>
        <p className="text-[10pt] font-sans mt-1 italic uppercase tracking-widest">Nomor: {data.docNo}</p>
      </div>

      {/* ISI SURAT */}
      <div className="space-y-6 flex-grow text-[11pt] leading-relaxed text-justify overflow-hidden">
        <p>Pada hari ini, tanggal {new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'})}, bertempat di {data.city}, kami yang bertanda tangan di bawah ini:</p>
        
        <div className="space-y-3">
            <div className="flex gap-4">
                <span className="w-4 font-bold">1.</span>
                <div className="flex-grow italic border-l-2 border-slate-100 pl-4">
                    <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold uppercase">{data.grantorName}</span></div>
                    <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.grantorNik}</span></div>
                    <div className="grid grid-cols-[140px_10px_1fr]"><span>Alamat</span><span>:</span><span>{data.grantorAddress}</span></div>
                    <p className="mt-1">Selanjutnya disebut sebagai <b>PIHAK PERTAMA (PEMBERI HIBAH)</b>.</p>
                </div>
            </div>

            <div className="flex gap-4">
                <span className="w-4 font-bold">2.</span>
                <div className="flex-grow italic border-l-2 border-slate-100 pl-4">
                    <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama</span><span>:</span><span className="font-bold uppercase">{data.granteeName}</span></div>
                    <div className="grid grid-cols-[140px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.granteeNik}</span></div>
                    <div className="grid grid-cols-[140px_10px_1fr]"><span>Alamat</span><span>:</span><span>{data.granteeAddress}</span></div>
                    <p className="mt-1">Selanjutnya disebut sebagai <b>PIHAK KEDUA (PENERIMA HIBAH)</b>.</p>
                </div>
            </div>
        </div>

        <p>Dengan ini PIHAK PERTAMA menyatakan menghibahkan secara sukarela kepada PIHAK KEDUA, berupa objek hibah sebagai berikut:</p>
        
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 font-sans text-[10pt]">
            <p className="font-bold underline mb-1">{data.objectType}</p>
            <p className="leading-relaxed">{data.objectDetail}</p>
        </div>

        <p>Semenjak surat ini ditandatangani, maka objek hibah tersebut sepenuhnya menjadi hak milik PIHAK KEDUA. PIHAK PERTAMA menjamin bahwa objek hibah tersebut bebas dari sengketa atau tuntutan pihak lain.</p>
        
        <p>Demikian surat hibah ini dibuat dengan sebenar-benarnya tanpa ada paksaan dari pihak manapun.</p>
      </div>

      {/* TANDA TANGAN SEJAJAR SEMPURNA */}
      <div className="shrink-0 mt-auto pt-10 border-t-2 border-slate-100">
         <div className="grid grid-cols-2 gap-10">
            {/* PIHAK KEDUA */}
            <div className="flex flex-col h-44 text-center">
               <div className="h-6 mb-2"></div> 
               <p className="uppercase text-[9pt] font-black text-slate-400 tracking-widest">Penerima Hibah (Pihak II),</p>
               <div className="mt-auto">
                  <p className="font-bold underline uppercase tracking-tight leading-none">{data.granteeName}</p>
                  <p className="text-[9pt] italic mt-2 leading-tight">Penerima</p>
               </div>
            </div>

            {/* PIHAK PERTAMA */}
            <div className="flex flex-col h-44 text-center">
               <p className="text-[10pt] font-bold h-6 mb-2">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'})}</p>
               <p className="uppercase text-[9pt] font-black text-slate-400 tracking-widest">Pemberi Hibah (Pihak I),</p>
               <div className="mt-auto">
                  <div className="border border-slate-300 w-20 h-10 mx-auto mb-2 flex items-center justify-center text-[7pt] text-slate-400 italic">MATERAI 10.000</div>
                  <p className="font-bold underline uppercase tracking-tight leading-none">{data.grantorName}</p>
                  <p className="text-[9pt] italic mt-2 leading-tight">Pemberi</p>
               </div>
            </div>
         </div>

         {/* SAKSI SEJAJAR DI BAWAH */}
         <div className="mt-12 text-center">
            <p className="text-[8pt] font-sans font-bold uppercase text-slate-400 mb-8 tracking-widest">Saksi-Saksi:</p>
            <div className="grid grid-cols-2 gap-10">
                <p className="font-bold underline">({data.witness1})</p>
                <p className="font-bold underline">({data.witness2})</p>
            </div>
         </div>
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

      <div id="ui-root" className="flex flex-col h-screen no-print">
        <div className="bg-slate-900 text-white h-16 shrink-0 flex items-center justify-between px-6 border-b border-slate-700 shadow-xl">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-all"><ArrowLeft size={20} /></Link>
            <h1 className="font-black text-sm uppercase tracking-tighter text-emerald-400 italic flex items-center gap-2">
              <Gift size={18} /> Hibah <span className="text-white not-italic opacity-50 font-normal italic">Deed Builder</span>
            </h1>
          </div>
          <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 shadow-lg active:scale-95 transition-all">
            <Printer size={16} /> Print Surat Hibah
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          {/* SIDEBAR */}
          <div className="w-[420px] bg-white border-r overflow-y-auto p-6 space-y-8 scrollbar-thin shadow-inner">
             
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-2 tracking-widest">Pemberi Hibah (Pihak I)</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase" value={data.grantorName} onChange={e => handleDataChange('grantorName', e.target.value)} placeholder="Nama Pemberi" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.grantorNik} onChange={e => handleDataChange('grantorNik', e.target.value)} placeholder="NIK Pemberi" />
                <textarea className="w-full p-3 border rounded-xl text-xs h-16 resize-none" value={data.grantorAddress} onChange={e => handleDataChange('grantorAddress', e.target.value)} placeholder="Alamat Pemberi" />
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-2 tracking-widest">Penerima Hibah (Pihak II)</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold uppercase" value={data.granteeName} onChange={e => handleDataChange('granteeName', e.target.value)} placeholder="Nama Penerima" />
                <input className="w-full p-3 border rounded-xl text-xs" value={data.granteeNik} onChange={e => handleDataChange('granteeNik', e.target.value)} placeholder="NIK Penerima" />
                <textarea className="w-full p-3 border rounded-xl text-xs h-16 resize-none" value={data.granteeAddress} onChange={e => handleDataChange('granteeAddress', e.target.value)} placeholder="Alamat Penerima" />
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-2 tracking-widest">Objek Hibah</h3>
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.objectType} onChange={e => handleDataChange('objectType', e.target.value)} placeholder="Jenis (cth: Tanah)" />
                <textarea className="w-full p-3 border rounded-xl text-xs h-24 resize-none leading-relaxed" value={data.objectDetail} onChange={e => handleDataChange('objectDetail', e.target.value)} placeholder="Detail Sertifikat, Lokasi, dsb..." />
             </div>

             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-slate-400 border-b pb-2 tracking-widest">Saksi & Kota</h3>
                <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-3 border rounded-xl text-xs" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} placeholder="Saksi 1" />
                    <input className="w-full p-3 border rounded-xl text-xs" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} placeholder="Saksi 2" />
                </div>
                <input className="w-full p-3 border rounded-xl text-xs font-bold" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-300/30">
             <div className="origin-top scale-[0.55] lg:scale-[0.8] xl:scale-100 transition-transform shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                <HibahContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <HibahContent />
      </div>
    </div>
  );
}