'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, Car, 
  Bike, BadgeDollarSign, Users, FileCheck
} from 'lucide-react';
import Link from 'next/link';

export default function JualBeliKendaraanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem Transaksi...</div>}>
      <VehicleSaleBuilder />
    </Suspense>
  );
}

function VehicleSaleBuilder() {
  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    day: 'Senin',
    date: new Date().toISOString().split('T')[0],
    city: 'Jakarta Selatan',
    p1Name: 'AGUS SETIAWAN',
    p1Nik: '3174010101850001',
    p1Job: 'Karyawan Swasta',
    p1Address: 'Jl. Fatmawati No. 10, Cilandak, Jakarta Selatan',
    p2Name: 'DONI PRATAMA',
    p2Nik: '3674010101900002',
    p2Job: 'Wiraswasta',
    p2Address: 'Jl. Bintaro Utama Sektor 5, Tangerang Selatan',
    brand: 'Toyota',
    type: 'Avanza Veloz 1.5 AT',
    year: '2019',
    color: 'Putih Metalik',
    nopol: 'B 1234 XXX',
    frameNo: 'MHF1234567890',
    engineNo: '1NR-FE-123456',
    bpkbNo: 'N-12345678',
    price: 185000000,
    priceText: 'Seratus Delapan Puluh Lima Juta Rupiah',
    paymentMethod: 'Transfer BCA a.n Agus Setiawan',
    witness1: 'Iwan (Teman Penjual)',
    witness2: 'Santi (Istri Pembeli)'
  });

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  const handleDataChange = (field: string, val: any) => {
    setData({ ...data, [field]: val });
  };

  const applyPreset = (type: 'motor' | 'mobil') => {
    if (type === 'motor') {
      setData(prev => ({
        ...prev,
        brand: 'Honda',
        type: 'Vario 150 CBS ISS',
        year: '2021',
        color: 'Hitam Doff',
        nopol: 'B 4567 TZY',
        price: 18500000,
        priceText: 'Delapan Belas Juta Lima Ratus Ribu Rupiah'
      }));
    } else if (type === 'mobil') {
      setData(prev => ({
        ...prev,
        brand: 'Honda',
        type: 'Brio Satya E CVT',
        year: '2020',
        color: 'Kuning (Carnival Yellow)',
        nopol: 'D 1888 AA',
        price: 145000000,
        priceText: 'Seratus Empat Puluh Lima Juta Rupiah'
      }));
    }
  }

  const TEMPLATES = [
    { id: 1, name: "Legal Formal (Padat)", desc: "1 Halaman, Font 10pt, Rapi" },
    { id: 2, name: "Kwitansi Besar", desc: "Format Landscape/Kotak" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN KERTAS (FINAL COMPACT) ---
  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`
      /* TAMPILAN LAYAR */
      w-[210mm] min-h-[297mm] 
      bg-white shadow-xl 
      p-[20mm] mx-auto 
      text-black font-serif leading-snug text-[10pt]
      relative box-border mb-8 

      /* TAMPILAN PRINT (SCALE 85% & NO SCROLL) */
      print:absolute print:top-0 print:left-0 
      print:w-[210mm] print:h-auto 
      print:shadow-none print:mb-0 
      
      /* Padding Atas 2.5cm agar judul aman, tapi di-scale down jadi muat */
      print:pt-[25mm] print:px-[15mm] print:pb-[10mm]
      
      print:z-[9999]
      /* SKALA 85% = DIJAMIN MUAT 1 HALAMAN TANPA SCROLLBAR */
      print:transform print:scale-[0.85] print:origin-top
      
      ${className}
    `}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800 print:bg-white">
      
      {/* GLOBAL CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          body { margin: 0 !important; padding: 0 !important; background: white; overflow: hidden !important; }
          
          /* HILANGKAN SCROLLBAR SECARA PAKSA */
          ::-webkit-scrollbar { display: none !important; width: 0 !important; height: 0 !important; }
          * { -ms-overflow-style: none !important; scrollbar-width: none !important; }
          
          .no-print { display: none !important; }
          .print-area { display: block !important; overflow: visible !important; height: auto !important; }
          
          /* FORCE BLACK TEXT */
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; color: #000 !important; }
        }
      `}</style>

      {/* HEADER */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft size={18} /> <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2"></div>
            <h1 className="text-sm font-bold tracking-wide text-emerald-400 uppercase">Jual Beli Kendaraan</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium min-w-[180px] justify-between">
                <div className="flex items-center gap-2"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50">
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 ${templateId === t.id ? 'bg-blue-50 text-blue-700' : 'text-slate-700'}`}>
                      <div><div className="font-medium">{t.name}</div><div className="text-[10px] text-slate-400">{t.desc}</div></div>
                      {templateId === t.id && <Check size={14} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase hover:bg-emerald-500 shadow-lg">
              <Printer size={16} /> Print
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)]">
        
        {/* SIDEBAR INPUT */}
        <div className="no-print w-full lg:w-[450px] shrink-0 h-full overflow-y-auto pr-2 pb-20 space-y-6">
          {/* Quick Preset */}
          <div className="bg-emerald-50 rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
             <div className="px-4 py-3 border-b border-emerald-200 flex items-center gap-2">
                <Car size={14} className="text-emerald-600" />
                <h3 className="text-xs font-bold text-emerald-800 uppercase">Isi Otomatis</h3>
             </div>
             <div className="p-4 grid grid-cols-2 gap-2">
                <button onClick={() => applyPreset('mobil')} className="bg-white hover:bg-emerald-100 border border-emerald-200 text-emerald-700 py-2 rounded text-[10px] font-bold flex items-center justify-center gap-1">
                   <Car size={12}/> Contoh Mobil
                </button>
                <button onClick={() => applyPreset('motor')} className="bg-white hover:bg-blue-100 border border-blue-200 text-blue-700 py-2 rounded text-[10px] font-bold flex items-center justify-center gap-1">
                   <Bike size={12}/> Contoh Motor
                </button>
             </div>
          </div>

          {/* Para Pihak */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <Users size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Data Pihak</h3>
             </div>
             <div className="p-4 space-y-6">
                <div className="border-l-2 border-red-500 pl-3">
                   <h4 className="text-xs font-bold text-red-600 mb-2 uppercase">Penjual (Pihak 1)</h4>
                   <div className="space-y-2">
                      <input type="text" className="w-full p-2 border rounded text-xs font-bold" placeholder="Nama" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} />
                      <div className="grid grid-cols-2 gap-2">
                         <input type="text" className="w-full p-2 border rounded text-xs" placeholder="NIK" value={data.p1Nik} onChange={e => handleDataChange('p1Nik', e.target.value)} />
                         <input type="text" className="w-full p-2 border rounded text-xs" placeholder="Pekerjaan" value={data.p1Job} onChange={e => handleDataChange('p1Job', e.target.value)} />
                      </div>
                      <textarea className="w-full p-2 border rounded text-xs h-12" placeholder="Alamat" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} />
                   </div>
                </div>
                <div className="border-l-2 border-blue-500 pl-3">
                   <h4 className="text-xs font-bold text-blue-600 mb-2 uppercase">Pembeli (Pihak 2)</h4>
                   <div className="space-y-2">
                      <input type="text" className="w-full p-2 border rounded text-xs font-bold" placeholder="Nama" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} />
                      <div className="grid grid-cols-2 gap-2">
                         <input type="text" className="w-full p-2 border rounded text-xs" placeholder="NIK" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} />
                         <input type="text" className="w-full p-2 border rounded text-xs" placeholder="Pekerjaan" value={data.p2Job} onChange={e => handleDataChange('p2Job', e.target.value)} />
                      </div>
                      <textarea className="w-full p-2 border rounded text-xs h-12" placeholder="Alamat" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} />
                   </div>
                </div>
             </div>
          </div>

          {/* Kendaraan & Harga */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <FileCheck size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Detail Kendaraan</h3>
             </div>
             <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                   <input type="text" className="w-full p-2 border rounded text-xs" value={data.brand} onChange={e => handleDataChange('brand', e.target.value)} placeholder="Merk" />
                   <input type="text" className="w-full p-2 border rounded text-xs" value={data.type} onChange={e => handleDataChange('type', e.target.value)} placeholder="Tipe" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <input type="text" className="w-full p-2 border rounded text-xs" value={data.year} onChange={e => handleDataChange('year', e.target.value)} placeholder="Tahun" />
                   <input type="text" className="w-full p-2 border rounded text-xs" value={data.color} onChange={e => handleDataChange('color', e.target.value)} placeholder="Warna" />
                </div>
                <input type="text" className="w-full p-2 border rounded text-sm font-bold bg-slate-50" value={data.nopol} onChange={e => handleDataChange('nopol', e.target.value)} placeholder="No Polisi" />
                <div className="grid grid-cols-2 gap-3">
                   <input type="text" className="w-full p-2 border rounded text-xs font-mono" value={data.frameNo} onChange={e => handleDataChange('frameNo', e.target.value)} placeholder="No Rangka" />
                   <input type="text" className="w-full p-2 border rounded text-xs font-mono" value={data.engineNo} onChange={e => handleDataChange('engineNo', e.target.value)} placeholder="No Mesin" />
                </div>
                <input type="text" className="w-full p-2 border rounded text-xs font-mono" value={data.bpkbNo} onChange={e => handleDataChange('bpkbNo', e.target.value)} placeholder="No BPKB" />
             </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="p-4 space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Harga & Pembayaran</label>
                   <input type="number" className="w-full p-2 border rounded text-sm font-bold" value={data.price} onChange={e => handleDataChange('price', parseInt(e.target.value))} />
                   <div className="text-[10px] text-emerald-600 mt-1">{formatRupiah(data.price)}</div>
                </div>
                <textarea className="w-full p-2 border rounded text-xs h-12" value={data.priceText} onChange={e => handleDataChange('priceText', e.target.value)} placeholder="Terbilang" />
                <input type="text" className="w-full p-2 border rounded text-xs" value={data.paymentMethod} onChange={e => handleDataChange('paymentMethod', e.target.value)} placeholder="Metode Bayar" />
                <div className="grid grid-cols-2 gap-3">
                   <input type="text" className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                   <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <input type="text" className="w-full p-2 border rounded text-xs" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} placeholder="Saksi 1" />
                   <input type="text" className="w-full p-2 border rounded text-xs" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} placeholder="Saksi 2" />
                </div>
             </div>
          </div>
        </div>

        {/* --- RIGHT PREVIEW --- */}
        <div className="flex-1 h-full bg-slate-200/50 rounded-xl flex justify-center p-8 overflow-y-auto print:p-0 print:bg-white print:w-full print-area">
          
          <div className="w-[210mm] origin-top scale-[0.5] sm:scale-[0.6] lg:scale-100 transition-transform print:scale-100 print:w-full">
            
            {/* TEMPLATE 1: LEGAL FORMAL (PADAT 10pt) */}
            {templateId === 1 && (
              <Kertas>
                  <div className="text-center mb-6 border-b-2 border-black pb-2">
                    <h1 className="font-black text-lg uppercase underline tracking-wide text-black">SURAT PERJANJIAN JUAL BELI KENDARAAN</h1>
                  </div>

                  <p className="mb-2 text-justify text-black">Pada hari ini <strong>{data.day}</strong> tanggal <strong>{new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</strong>, bertempat di <strong>{data.city}</strong>, kami yang bertanda tangan di bawah ini:</p>

                  <div className="ml-4 mb-2">
                    <div className="font-bold underline text-xs uppercase mb-0.5 text-black">I. PIHAK PERTAMA (PENJUAL)</div>
                    <table className="w-full leading-snug">
                        <tbody>
                          <tr><td className="w-20 text-black">Nama</td><td className="w-3 text-black">:</td><td className="font-bold uppercase text-black">{data.p1Name}</td></tr>
                          <tr><td className="text-black">NIK</td><td className="text-black">:</td><td className="text-black">{data.p1Nik}</td></tr>
                          <tr><td className="text-black">Pekerjaan</td><td className="text-black">:</td><td className="text-black">{data.p1Job}</td></tr>
                          <tr><td className="align-top text-black">Alamat</td><td className="align-top text-black">:</td><td className="align-top text-black">{data.p1Address}</td></tr>
                        </tbody>
                    </table>
                  </div>

                  <div className="ml-4 mb-4">
                    <div className="font-bold underline text-xs uppercase mb-0.5 text-black">II. PIHAK KEDUA (PEMBELI)</div>
                    <table className="w-full leading-snug">
                        <tbody>
                          <tr><td className="w-20 text-black">Nama</td><td className="w-3 text-black">:</td><td className="font-bold uppercase text-black">{data.p2Name}</td></tr>
                          <tr><td className="text-black">NIK</td><td className="text-black">:</td><td className="text-black">{data.p2Nik}</td></tr>
                          <tr><td className="text-black">Pekerjaan</td><td className="text-black">:</td><td className="text-black">{data.p2Job}</td></tr>
                          <tr><td className="align-top text-black">Alamat</td><td className="align-top text-black">:</td><td className="align-top text-black">{data.p2Address}</td></tr>
                        </tbody>
                    </table>
                  </div>

                  <p className="mb-2 text-black">Sepakat melakukan transaksi jual beli kendaraan dengan data sebagai berikut:</p>

                  <div className="mb-2 border border-black p-2 bg-slate-50 print:bg-transparent">
                    <table className="w-full leading-snug">
                        <tbody>
                          <tr><td className="w-24 font-bold text-black">Merk / Type</td><td className="w-3 text-black">:</td><td className="text-black">{data.brand} / {data.type}</td><td className="w-20 font-bold text-black">No. Polisi</td><td className="w-3 text-black">:</td><td className="font-bold text-black">{data.nopol}</td></tr>
                          <tr><td className="font-bold text-black">Tahun/Warna</td><td className="text-black">:</td><td className="text-black">{data.year} / {data.color}</td><td className="font-bold text-black">No. Rangka</td><td className="text-black">:</td><td className="font-mono text-xs text-black">{data.frameNo}</td></tr>
                          <tr><td className="font-bold text-black">No. BPKB</td><td className="text-black">:</td><td className="font-mono text-xs text-black">{data.bpkbNo}</td><td className="font-bold text-black">No. Mesin</td><td className="text-black">:</td><td className="font-mono text-xs text-black">{data.engineNo}</td></tr>
                        </tbody>
                    </table>
                  </div>

                  <div className="space-y-1 text-justify">
                    <div>
                        <div className="font-bold underline mb-0.5 text-black">PASAL 1: HARGA & PEMBAYARAN</div>
                        <p className="text-black">Disepakati harga kendaraan tersebut sebesar <strong>{formatRupiah(data.price)}</strong> (<em>{data.priceText}</em>) yang dibayarkan oleh Pihak Kedua kepada Pihak Pertama secara <strong>{data.paymentMethod}</strong>.</p>
                    </div>

                    <div>
                        <div className="font-bold underline mb-0.5 text-black">PASAL 2: PENYERAHAN & JAMINAN</div>
                        <p className="text-black">Kendaraan diserahkan dalam kondisi "as is" (apa adanya). Pihak Pertama menjamin bahwa kendaraan tersebut adalah milik sah, tidak dalam sengketa, dan bebas dari sitaan pihak manapun.</p>
                    </div>

                    <div>
                        <div className="font-bold underline mb-0.5 text-black">PASAL 3: BALIK NAMA & PAJAK</div>
                        <p className="text-black">Segala biaya balik nama menjadi tanggung jawab Pihak Kedua. Pajak/E-Tilang yang terjadi <strong>SEBELUM</strong> tanggal transaksi ini adalah tanggung jawab Pihak Pertama.</p>
                    </div>
                  </div>

                  <p className="mt-4 mb-4 text-center text-xs italic text-black">Surat ini dibuat rangkap dua bermaterai cukup dan memiliki kekuatan hukum sama.</p>

                  {/* TTD DENGAN SPACE YANG CUKUP */}
                  <div className="flex justify-between text-center mt-auto mb-10">
                    <div className="w-48">
                        <p className="mb-20 font-bold text-black">PIHAK KEDUA (Pembeli)</p>
                        <p className="font-bold underline uppercase text-black">{data.p2Name}</p>
                    </div>
                    <div className="w-48">
                        <p className="mb-4 font-bold text-black">PIHAK PERTAMA (Penjual)</p>
                        <div className="border border-black w-24 h-12 mx-auto mb-1 flex items-center justify-center text-[10px] text-black">MATERAI 10.000</div>
                        <p className="font-bold underline uppercase text-black">{data.p1Name}</p>
                    </div>
                  </div>

                  <div className="text-center text-xs">
                    <p className="mb-2 font-bold underline text-black">SAKSI-SAKSI</p>
                    <div className="flex justify-center gap-16">
                        <div className="text-center w-40">
                          <div className="text-xs mb-12 font-bold text-black">Saksi I</div>
                          <div className="border-b border-black text-black">{data.witness1}</div>
                        </div>
                        <div className="text-center w-40">
                          <div className="text-xs mb-12 font-bold text-black">Saksi II</div>
                          <div className="border-b border-black text-black">{data.witness2}</div>
                        </div>
                    </div>
                  </div>
              </Kertas>
            )}

            {/* TEMPLATE 2: KWITANSI (LANDSCAPE BOX) */}
            {templateId === 2 && (
              <Kertas>
                  <div className="border-4 double border-black p-6 h-full flex flex-col justify-between">
                    <div>
                        <div className="flex justify-between items-start border-b-2 border-black pb-4 mb-6">
                            <div>
                              <h1 className="text-3xl font-black uppercase tracking-wider text-black">BUKTI JUAL BELI</h1>
                              <div className="text-sm font-bold text-black uppercase tracking-[0.3em]">Kendaraan Bermotor</div>
                            </div>
                            <div className="text-right">
                              <div className="text-xs text-black uppercase font-bold">Tanggal Transaksi</div>
                              <div className="font-bold text-lg text-black">{new Date(data.date).toLocaleDateString('id-ID', {dateStyle:'full'})}</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-[100px_10px_1fr] gap-2 mb-6 text-sm">
                            <div className="font-bold text-black py-1">PENJUAL</div><div className="py-1 text-black">:</div><div className="font-bold uppercase py-1 border-b border-black text-black">{data.p1Name}</div>
                            <div className="text-black">Alamat</div><div className="text-black">:</div><div className="text-xs text-black">{data.p1Address}</div>
                            
                            <div className="h-4 col-span-3"></div>

                            <div className="font-bold text-black py-1">PEMBELI</div><div className="py-1 text-black">:</div><div className="font-bold uppercase py-1 border-b border-black text-black">{data.p2Name}</div>
                            <div className="text-black">Alamat</div><div className="text-black">:</div><div className="text-xs text-black">{data.p2Address}</div>
                        </div>

                        <div className="bg-slate-50 print:bg-transparent p-6 rounded-xl mb-6 border border-black">
                            <h3 className="font-bold text-xs mb-3 border-b border-black pb-2 text-black">DATA KENDARAAN</h3>
                            <div className="grid grid-cols-2 gap-x-8 gap-y-4 text-sm">
                              <div className="flex justify-between"><span className="text-black">Merk/Type</span><span className="text-black">:</span></div><div className="font-bold text-black">{data.brand} {data.type}</div>
                              <div className="flex justify-between"><span className="text-black">Thn/Warna</span><span className="text-black">:</span></div><div className="font-bold text-black">{data.year} / {data.color}</div>
                              <div className="flex justify-between"><span className="text-black">No. Polisi</span><span className="text-black">:</span></div><div className="font-bold text-black">{data.nopol}</div>
                              <div className="flex justify-between"><span className="text-black">No. Rangka</span><span className="text-black">:</span></div><div className="font-mono text-xs text-black">{data.frameNo}</div>
                              <div className="flex justify-between"><span className="text-black">No. Mesin</span><span className="text-black">:</span></div><div className="font-mono text-xs text-black">{data.engineNo}</div>
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="text-xs font-bold text-black uppercase tracking-widest mb-1">TOTAL HARGA</div>
                            <div className="text-3xl font-black text-black mb-2">{formatRupiah(data.price)}</div>
                            <div className="text-sm italic text-black bg-slate-50 print:bg-transparent p-2 border-l-4 border-black">"{data.priceText}"</div>
                        </div>
                    </div>

                    <div className="flex justify-between mt-auto pt-8 border-t-2 border-dashed border-black">
                        <div className="text-center w-40">
                            <div className="mb-24 text-xs font-bold uppercase tracking-wider text-black">Pembeli</div>
                            <div className="font-bold uppercase border-b border-black text-sm text-black">{data.p2Name}</div>
                        </div>
                        <div className="text-center w-40">
                            <div className="mb-2 text-xs font-bold uppercase tracking-wider text-black">Penjual</div>
                            <div className="border border-black text-[8px] text-black h-16 flex items-center justify-center mb-2 mx-auto w-24 bg-slate-50 print:bg-transparent">Materai</div>
                            <div className="font-bold uppercase border-b border-black text-sm text-black">{data.p1Name}</div>
                        </div>
                    </div>
                  </div>
              </Kertas>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}