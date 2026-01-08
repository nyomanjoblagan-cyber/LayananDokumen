'use client';

import { useState, Suspense, useRef } from 'react';
import { 
  Printer, ArrowLeft, Car, Building2, UserCircle2, 
  MapPin, LayoutTemplate, ChevronDown, X, PenTool, ShieldCheck, Key, FileWarning
} from 'lucide-react';
import Link from 'next/link';

export default function SewaKendaraanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Perjanjian Sewa...</div>}>
      <VehicleRentalBuilder />
    </Suspense>
  );
}

function VehicleRentalBuilder() {
  const [logo, setLogo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState({
    city: 'Denpasar',
    date: new Date().toISOString().split('T')[0],
    docNo: 'RENT/2026/01/007',
    
    // PEMILIK KENDARAAN (PIHAK I)
    ownerName: 'I MADE WIGUNA',
    ownerNik: '5171010101880001',
    ownerAddress: 'Jl. Sunset Road No. 88, Kuta, Bali',

    // PENYEWA (PIHAK II)
    renterName: 'JOHN DOE',
    renterNik: '3172020202950003',
    renterAddress: 'Villa Seminyak, No. 12A, Badung, Bali',

    // DETAIL KENDARAAN
    vehicleModel: 'Toyota Avanza Veloz 2024',
    plateNumber: 'DK 1234 AB',
    frameNumber: 'MHFW123456789',
    engineNumber: '1NR-FE12345',
    
    // KETENTUAN SEWA
    rentalDuration: '3 (Tiga) Hari',
    startDate: '2026-01-10',
    endDate: '2026-01-13',
    rentalPrice: 'Rp 450.000,- / Hari',
    totalPrice: 'Rp 1.350.000,-',
    fineRate: 'Rp 50.000,- / Jam (Keterlambatan)'
  });

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const RentalContent = () => (
    <div className="bg-white mx-auto flex flex-col box-border print:m-0 print:border-none print:shadow-none p-[20mm] print:p-[15mm] text-slate-900 font-serif" 
         style={{ width: '210mm', height: '290mm' }}>
      
      {/* JUDUL */}
      <div className="text-center mb-6 shrink-0 leading-tight">
        <h2 className="text-lg font-black underline uppercase decoration-2 underline-offset-4 tracking-widest">SURAT PERJANJIAN SEWA KENDARAAN</h2>
        <p className="text-[10pt] font-sans mt-1 italic uppercase tracking-widest">Nomor: {data.docNo}</p>
      </div>

      {/* ISI SURAT */}
      <div className="space-y-4 flex-grow text-[10pt] leading-relaxed text-justify overflow-hidden">
        <p>Pada hari ini, tanggal {new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'})}, kami yang bertanda tangan di bawah ini:</p>
        
        <div className="space-y-2">
            <div className="flex gap-4">
                <span className="w-4 font-bold">1.</span>
                <div className="flex-grow border-l-2 border-slate-100 pl-4">
                    <div className="grid grid-cols-[130px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.ownerName}</span></div>
                    <div className="grid grid-cols-[130px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.ownerNik}</span></div>
                    <div className="grid grid-cols-[130px_10px_1fr]"><span>Alamat</span><span>:</span><span>{data.ownerAddress}</span></div>
                    <p className="mt-1 font-bold italic">Disebut sebagai PIHAK PERTAMA (Pemilik Kendaraan).</p>
                </div>
            </div>

            <div className="flex gap-4">
                <span className="w-4 font-bold">2.</span>
                <div className="flex-grow border-l-2 border-slate-100 pl-4">
                    <div className="grid grid-cols-[130px_10px_1fr]"><span>Nama Lengkap</span><span>:</span><span className="font-bold uppercase">{data.renterName}</span></div>
                    <div className="grid grid-cols-[130px_10px_1fr]"><span>NIK</span><span>:</span><span>{data.renterNik}</span></div>
                    <div className="grid grid-cols-[130px_10px_1fr]"><span>Alamat</span><span>:</span><span>{data.renterAddress}</span></div>
                    <p className="mt-1 font-bold italic">Disebut sebagai PIHAK KEDUA (Penyewa Kendaraan).</p>
                </div>
            </div>
        </div>

        <p>Kedua belah pihak sepakat melakukan sewa menyewa satu unit kendaraan dengan spesifikasi:</p>
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 font-sans text-[9.5pt] grid grid-cols-2 gap-x-6 gap-y-1">
            <div className="flex justify-between"><span>Merk/Type</span><span className="font-bold">{data.vehicleModel}</span></div>
            <div className="flex justify-between"><span>No. Polisi (Plat)</span><span className="font-bold">{data.plateNumber}</span></div>
            <div className="flex justify-between"><span>No. Rangka</span><span>{data.frameNumber}</span></div>
            <div className="flex justify-between"><span>No. Mesin</span><span>{data.engineNumber}</span></div>
        </div>

        <div className="space-y-3">
            <p><span className="font-bold">PASAL 1 (DURASI & BIAYA):</span> PIHAK KEDUA menyewa selama <b>{data.rentalDuration}</b> terhitung tanggal <b>{data.startDate}</b> hingga <b>{data.endDate}</b> dengan total biaya <b>{data.totalPrice}</b>.</p>
            <p><span className="font-bold">PASAL 2 (TANGGUNG JAWAB):</span> PIHAK KEDUA bertanggung jawab penuh atas segala kerusakan, kehilangan kendaraan, atau denda tilang selama masa sewa berlangsung.</p>
            <p><span className="font-bold">PASAL 3 (PENGEMBALIAN):</span> Kendaraan wajib dikembalikan dalam kondisi semula. Keterlambatan akan dikenakan denda sebesar <b>{data.fineRate}</b>.</p>
        </div>
        
        <p>Demikian surat perjanjian ini dibuat dalam rangkap dua dan ditandatangani oleh kedua belah pihak tanpa ada paksaan.</p>
      </div>

      {/* TANDA TANGAN SEJAJAR SEMPURNA */}
      <div className="shrink-0 mt-auto pt-6 border-t border-slate-100">
         <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col h-40 text-center">
               <div className="h-6 mb-2"></div> 
               <p className="uppercase text-[8pt] font-black text-slate-400 tracking-widest">PIHAK PERTAMA (Pemilik),</p>
               <div className="mt-auto">
                  <p className="font-bold underline uppercase tracking-tight leading-none">{data.ownerName}</p>
               </div>
            </div>

            <div className="flex flex-col h-40 text-center">
               <p className="text-[9pt] font-bold h-6 mb-2">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {dateStyle: 'long'})}</p>
               <p className="uppercase text-[8pt] font-black text-slate-400 tracking-widest">PIHAK KEDUA (Penyewa),</p>
               <div className="mt-auto">
                  <div className="border border-slate-300 w-16 h-8 mx-auto mb-2 flex items-center justify-center text-[6pt] text-slate-400 italic">MATERAI</div>
                  <p className="font-bold underline uppercase tracking-tight leading-none">{data.renterName}</p>
               </div>
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
            <h1 className="font-black text-sm uppercase tracking-tighter text-blue-400 italic flex items-center gap-2">
              <Car size={18} /> Rental <span className="text-white not-italic opacity-50 font-normal italic">Contract Builder</span>
            </h1>
          </div>
          <button onClick={() => window.print()} className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-2 rounded-xl font-black uppercase text-xs flex items-center gap-2 shadow-lg active:scale-95 transition-all">
            <Printer size={16} /> Print Perjanjian
          </button>
        </div>

        <div className="flex-grow flex overflow-hidden">
          <div className="w-[420px] bg-white border-r overflow-y-auto p-6 space-y-8 scrollbar-thin shadow-inner">
             
             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-2 tracking-widest flex items-center gap-2"><Key size={12}/> Info Pemilik (Pihak I)</h3>
                <input className="w-full p-2.5 border rounded-xl text-xs font-bold uppercase" value={data.ownerName} onChange={e => handleDataChange('ownerName', e.target.value)} placeholder="Nama Pemilik" />
                <input className="w-full p-2.5 border rounded-xl text-xs" value={data.ownerNik} onChange={e => handleDataChange('ownerNik', e.target.value)} placeholder="NIK Pemilik" />
                <input className="w-full p-2.5 border rounded-xl text-xs" value={data.ownerAddress} onChange={e => handleDataChange('ownerAddress', e.target.value)} placeholder="Alamat Pemilik" />
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-2 tracking-widest flex items-center gap-2"><UserCircle2 size={12}/> Info Penyewa (Pihak II)</h3>
                <input className="w-full p-2.5 border rounded-xl text-xs font-bold uppercase" value={data.renterName} onChange={e => handleDataChange('renterName', e.target.value)} placeholder="Nama Penyewa" />
                <input className="w-full p-2.5 border rounded-xl text-xs" value={data.renterNik} onChange={e => handleDataChange('renterNik', e.target.value)} placeholder="NIK Penyewa" />
             </div>

             <div className="space-y-4">
                <h3 className="text-[10px] font-black uppercase text-amber-600 border-b pb-2 tracking-widest flex items-center gap-2"><Car size={12}/> Detail Unit & Sewa</h3>
                <input className="w-full p-2.5 border rounded-xl text-xs font-bold" value={data.vehicleModel} onChange={e => handleDataChange('vehicleModel', e.target.value)} placeholder="Merk Kendaraan" />
                <input className="w-full p-2.5 border rounded-xl text-xs" value={data.plateNumber} onChange={e => handleDataChange('plateNumber', e.target.value)} placeholder="No. Polisi" />
                <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-2.5 border rounded-xl text-xs" value={data.rentalDuration} onChange={e => handleDataChange('rentalDuration', e.target.value)} placeholder="Durasi" />
                    <input className="w-full p-2.5 border rounded-xl text-xs font-bold" value={data.totalPrice} onChange={e => handleDataChange('totalPrice', e.target.value)} placeholder="Total Bayar" />
                </div>
             </div>

             <div className="space-y-4 pb-10">
                <h3 className="text-[10px] font-black uppercase text-red-500 border-b pb-2 tracking-widest flex items-center gap-2"><FileWarning size={12}/> Keterlambatan</h3>
                <input className="w-full p-2.5 border rounded-xl text-xs" value={data.fineRate} onChange={e => handleDataChange('fineRate', e.target.value)} placeholder="Denda Per Jam" />
                <input className="w-full p-2.5 border rounded-xl text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
             </div>
          </div>

          <div className="flex-1 overflow-y-auto p-12 flex justify-center bg-slate-300/30">
             <div className="origin-top scale-[0.55] lg:scale-[0.8] xl:scale-100 transition-transform shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)]">
                <RentalContent />
             </div>
          </div>
        </div>
      </div>

      <div id="print-only-root" className="hidden">
         <RentalContent />
      </div>
    </div>
  );
}