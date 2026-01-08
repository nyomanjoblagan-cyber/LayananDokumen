'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, Map, 
  BadgeDollarSign, Users, GripHorizontal, CreditCard, CalendarDays, FileText
} from 'lucide-react';
import Link from 'next/link';

export default function JualBeliTanahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Legal Editor...</div>}>
      <LandSaleBuilder />
    </Suspense>
  );
}

function LandSaleBuilder() {
  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    // WAKTU & TEMPAT (YANG TADI KURANG)
    day: 'Senin',
    date: new Date().toISOString().split('T')[0],
    city: 'Sleman',

    // PIHAK 1
    p1Name: 'BAMBANG SUDARSO', p1Age: '52', p1Job: 'Pensiunan PNS', p1Address: 'Jl. Kaliurang KM 10, Sleman, Yogyakarta', p1Nik: '3404010101740001', 
    p1Spouse: 'Siti Aminah', // Penyetuju
    
    // PIHAK 2
    p2Name: 'ANDI PRATAMA', p2Age: '30', p2Job: 'Wiraswasta', p2Address: 'Jl. Gejayan No. 15, Depok, Sleman', p2Nik: '3471010101960002',
    
    // OBJEK TANAH
    landCertType: 'SHM', landCertNo: '01234/Sardonoharjo', landArea: '500', landAddress: 'Desa Sardonoharjo, Kec. Ngaglik, Kab. Sleman',
    bNorth: 'Tanah Bapak Joko', bSouth: 'Jalan Desa (Aspal)', bEast: 'Selokan Mataram', bWest: 'Rumah Ibu Ani',
    
    // HARGA & BAYAR
    price: 1500000000, priceText: 'Satu Milyar Lima Ratus Juta Rupiah', dp: 500000000, paymentMethod: 'Transfer Bank BCA',
    
    // SAKSI
    witness1: 'Ketua RT 05 (Pak Rahmat)', 
    witness2: 'Adik Kandung Penjual',

    // PASAL TAMBAHAN (REQUEST BARU)
    additionalClause: '' 
  });

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const TEMPLATES = [
    { id: 1, name: "Legal Formal (2 Halaman)", desc: "Pasal lengkap, layout lega" },
    { id: 2, name: "Compact Rapi (1 Halaman)", desc: "Layout tabel presisi" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN KERTAS ---
  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`
      w-[210mm] h-[296mm] 
      bg-white shadow-2xl print:shadow-none 
      p-[20mm] mx-auto 
      text-slate-900 font-serif leading-relaxed text-[11pt]
      overflow-hidden relative
      mb-8 print:mb-0 
      ${className}
    `}>
      {children}
    </div>
  );

  // --- ISI DOKUMEN ---
  const DocumentContent = (
    <>
      {/* TEMPLATE 1: FORMAL (2 HALAMAN) */}
      {templateId === 1 && (
        <>
          <Kertas>
              <div className="text-center mb-8 pb-4 border-b-2 border-black">
                <h1 className="font-black text-xl uppercase tracking-widest underline">SURAT PERJANJIAN JUAL BELI TANAH</h1>
              </div>

              {/* BAGIAN INI YANG TADI TIDAK BISA DIEDIT, SEKARANG AMBIL DARI STATE */}
              <p className="mb-4 text-justify">Pada hari ini <strong>{data.day}</strong> tanggal <strong>{new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</strong>, bertempat di <strong>{data.city}</strong>, kami yang bertanda tangan di bawah ini:</p>

              <div className="ml-4 mb-4 text-sm">
                <table className="w-full leading-snug">
                    <tbody>
                      <tr><td className="w-24 font-bold">Nama</td><td className="w-3">:</td><td className="font-bold uppercase">{data.p1Name}</td></tr>
                      <tr><td>Umur</td><td>:</td><td>{data.p1Age} Tahun</td></tr>
                      <tr><td>Pekerjaan</td><td>:</td><td>{data.p1Job}</td></tr>
                      <tr><td>NIK</td><td>:</td><td>{data.p1Nik}</td></tr>
                      <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.p1Address}</td></tr>
                    </tbody>
                </table>
                <div className="mt-1 italic">Selanjutnya disebut <strong>PIHAK PERTAMA (PENJUAL)</strong>.</div>
              </div>

              <div className="ml-4 mb-6 text-sm">
                <table className="w-full leading-snug">
                    <tbody>
                      <tr><td className="w-24 font-bold">Nama</td><td className="w-3">:</td><td className="font-bold uppercase">{data.p2Name}</td></tr>
                      <tr><td>Umur</td><td>:</td><td>{data.p2Age} Tahun</td></tr>
                      <tr><td>Pekerjaan</td><td>:</td><td>{data.p2Job}</td></tr>
                      <tr><td>NIK</td><td>:</td><td>{data.p2Nik}</td></tr>
                      <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.p2Address}</td></tr>
                    </tbody>
                </table>
                <div className="mt-1 italic">Selanjutnya disebut <strong>PIHAK KEDUA (PEMBELI)</strong>.</div>
              </div>

              <p className="mb-4">Sepakat mengadakan perjanjian jual beli tanah dengan ketentuan sebagai berikut:</p>

              <div className="mb-4">
                <div className="text-center font-bold uppercase mb-2">PASAL 1<br/>OBJEK JUAL BELI</div>
                <p>PIHAK PERTAMA menjual kepada PIHAK KEDUA sebidang tanah dengan spesifikasi:</p>
                <div className="ml-4 mt-2 text-sm">
                    <table className="w-full leading-snug">
                      <tbody>
                          <tr><td className="w-32">Status Tanah</td><td className="w-3">:</td><td className="font-bold">{data.landCertType}</td></tr>
                          <tr><td>Nomor Sertifikat</td><td>:</td><td className="font-bold">{data.landCertNo}</td></tr>
                          <tr><td>Luas Tanah</td><td>:</td><td>{data.landArea} m²</td></tr>
                          <tr><td className="align-top">Letak Tanah</td><td className="align-top">:</td><td className="align-top">{data.landAddress}</td></tr>
                      </tbody>
                    </table>
                    <div className="mt-2 font-bold underline">Batas-batas tanah:</div>
                    <ul className="list-disc ml-5 grid grid-cols-2 gap-x-4 text-xs">
                      <li>Utara: {data.bNorth}</li><li>Selatan: {data.bSouth}</li>
                      <li>Timur: {data.bEast}</li><li>Barat: {data.bWest}</li>
                    </ul>
                </div>
              </div>

              <div className="mb-4">
                <div className="text-center font-bold uppercase mb-2">PASAL 2<br/>HARGA TANAH</div>
                <p>Disepakati dengan harga <strong>{formatRupiah(data.price)}</strong> <br/>(<em>{data.priceText}</em>).</p>
              </div>

              <div className="absolute bottom-10 right-10 text-[10px] text-slate-400 italic">Halaman 1 dari 2</div>
          </Kertas>

          <Kertas>
              <div className="space-y-6 text-justify pt-4">
                <div>
                    <div className="text-center font-bold uppercase mb-2">PASAL 3<br/>PEMBAYARAN</div>
                    <ul className="list-decimal ml-5 text-sm space-y-1">
                      <li>Uang Muka (DP) sebesar <strong>{formatRupiah(data.dp)}</strong> dibayar saat penandatanganan.</li>
                      <li>Sisa sebesar <strong>{formatRupiah(data.price - data.dp)}</strong> dibayar via {data.paymentMethod}.</li>
                    </ul>
                </div>
                <div>
                    <div className="text-center font-bold uppercase mb-2">PASAL 4<br/>JAMINAN & SENGKETA</div>
                    <p className="text-sm">Tanah dijamin bebas sengketa. Jika terjadi sengketa, PIHAK PERTAMA bertanggung jawab penuh.</p>
                </div>
                <div>
                    <div className="text-center font-bold uppercase mb-2">PASAL 5<br/>LAIN-LAIN</div>
                    <p className="text-sm">Biaya balik nama ditanggung PIHAK KEDUA. Pajak Penjual ditanggung PIHAK PERTAMA.</p>
                </div>

                {/* PASAL TAMBAHAN (JIKA ADA) */}
                {data.additionalClause && (
                  <div>
                    <div className="text-center font-bold uppercase mb-2">PASAL TAMBAHAN</div>
                    <p className="text-sm whitespace-pre-wrap">{data.additionalClause}</p>
                  </div>
                )}
              </div>

              <p className="mt-8 mb-8 text-sm">Demikian surat perjanjian ini dibuat rangkap 2 (dua) bermaterai cukup.</p>

              <div className="grid grid-cols-2 gap-8 text-center text-sm mb-12">
                <div>
                    <p className="mb-20 font-bold">PIHAK KEDUA</p>
                    <p className="font-bold underline uppercase">{data.p2Name}</p>
                </div>
                <div>
                    <p className="mb-4 font-bold">PIHAK PERTAMA</p>
                    <div className="border border-slate-300 w-24 h-16 mx-auto mb-2 flex items-center justify-center text-[10px] text-slate-400">MATERAI</div>
                    <p className="font-bold underline uppercase">{data.p1Name}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div><p className="mb-16 font-bold text-xs">Saksi I</p><p className="border-b border-black">{data.witness1}</p></div>
                <div><p className="mb-16 font-bold text-xs">Penyetuju</p><p className="border-b border-black">{data.p1Spouse}</p></div>
                <div><p className="mb-16 font-bold text-xs">Saksi II</p><p className="border-b border-black">{data.witness2}</p></div>
              </div>

              <div className="absolute bottom-10 right-10 text-[10px] text-slate-400 italic">Halaman 2 dari 2</div>
          </Kertas>
        </>
      )}

      {/* TEMPLATE 2: COMPACT (1 HALAMAN) */}
      {templateId === 2 && (
        <Kertas>
            <div className="text-center mb-6 border-b-2 border-black pb-2">
              <h1 className="font-bold text-xl uppercase underline">PERJANJIAN JUAL BELI TANAH</h1>
            </div>
            {/* BAGIAN INI JUGA AMBIL DARI STATE */}
            <p className="mb-4 text-justify">Pada {data.day}, {new Date(data.date).toLocaleDateString('id-ID', {dateStyle:'full'})}, bertempat di {data.city}, kami yang bertanda tangan di bawah ini:</p>

            <div className="mb-3 text-sm">
              <div className="font-bold uppercase underline">I. PIHAK PERTAMA (PENJUAL)</div>
              <table className="w-full"><tbody>
                  <tr><td className="w-24">Nama</td><td>: {data.p1Name}</td></tr>
                  <tr><td>NIK</td><td>: {data.p1Nik}</td></tr>
                  <tr><td>Alamat</td><td>: {data.p1Address}</td></tr>
              </tbody></table>
            </div>

            <div className="mb-6 text-sm">
              <div className="font-bold uppercase underline">II. PIHAK KEDUA (PEMBELI)</div>
              <table className="w-full"><tbody>
                  <tr><td className="w-24">Nama</td><td>: {data.p2Name}</td></tr>
                  <tr><td>NIK</td><td>: {data.p2Nik}</td></tr>
                  <tr><td>Alamat</td><td>: {data.p2Address}</td></tr>
              </tbody></table>
            </div>

            <div className="mb-6 border border-black p-4 text-sm">
              <div className="font-bold mb-2">OBJEK TANAH:</div>
              Lokasi: {data.landAddress}<br/>
              Luas: {data.landArea} m² ({data.landCertType} No. {data.landCertNo})<br/>
              Batas: U: {data.bNorth}, S: {data.bSouth}, T: {data.bEast}, B: {data.bWest}
            </div>

            <div className="mb-6 text-sm">
              <div className="font-bold">HARGA: {formatRupiah(data.price)}</div>
              <div className="italic mb-2">({data.priceText})</div>
              Pembayaran: DP {formatRupiah(data.dp)}, Sisa {formatRupiah(data.price - data.dp)} via {data.paymentMethod}.
            </div>

            <div className="mb-8 text-justify text-sm">
              Pihak Pertama menjamin tanah tersebut bebas sengketa. Biaya balik nama ditanggung Pihak Kedua. Perjanjian ini dibuat rangkap dua bermaterai cukup.
              {/* PASAL TAMBAHAN COMPACT */}
              {data.additionalClause && (
                <span className="block mt-2 font-bold italic">Catatan Tambahan: {data.additionalClause}</span>
              )}
            </div>

            <div className="flex justify-between text-center mt-auto mb-8 text-sm">
              <div className="w-40">
                  <p className="mb-16 font-bold">PIHAK KEDUA</p>
                  <p className="font-bold underline uppercase">{data.p2Name}</p>
              </div>
              <div className="w-40">
                  <p className="mb-2 font-bold">PIHAK PERTAMA</p>
                  <div className="border border-slate-300 w-20 h-12 mx-auto mb-2 flex items-center justify-center text-[8px] text-slate-300">MATERAI</div>
                  <p className="font-bold underline uppercase">{data.p1Name}</p>
              </div>
            </div>

            <div className="text-center text-xs">
              <p className="mb-16 font-bold underline">SAKSI-SAKSI</p>
              <div className="flex justify-center gap-12">
                  <div>( {data.witness1} )</div>
                  <div>( {data.p1Spouse} )</div>
                  <div>( {data.witness2} )</div>
              </div>
            </div>
        </Kertas>
      )}
    </>
  );

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 print:bg-white">
      
      {/* GLOBAL CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0mm; }
          body { margin: 0 !important; padding: 0 !important; }
        }
      `}</style>

      {/* HEADER */}
      <div className="bg-slate-900 text-white shadow-lg print:hidden sticky top-0 z-50 border-b border-slate-700 h-16">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
              <ArrowLeft size={18} /> <span className="text-sm font-medium">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2"></div>
            <h1 className="text-sm font-bold tracking-wide text-emerald-400 uppercase">Jual Beli Tanah</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium min-w-[180px] justify-between">
                <div className="flex items-center gap-2"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} className={`transition-transform ${showTemplateMenu ? 'rotate-180' : ''}`} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50">
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase">Pilih Template</div>
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-700'}`}>
                      <div><div className="font-medium">{t.name}</div><div className="text-[10px] text-slate-400">{t.desc}</div></div>
                      {templateId === t.id && <Check size={14} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase hover:bg-emerald-500 shadow-lg ring-1 ring-emerald-400/50">
              <Printer size={16} /> Print
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)]">
        
        {/* SIDEBAR INPUT */}
        <div className="w-full lg:w-[450px] shrink-0 h-full overflow-y-auto pr-2 pb-20 print:hidden space-y-6">
           
           {/* 1. BAGIAN WAKTU & TEMPAT (REQUEST UTAMA: BISA EDIT "SLEMAN", "HARI", "TANGGAL") */}
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2">
                 <CalendarDays size={14} className="text-slate-600"/>
                 <h3 className="text-xs font-bold uppercase">Waktu & Tempat</h3>
              </div>
              <div className="space-y-3">
                 <div>
                    <label className="text-[10px] text-slate-500 font-bold block mb-1">Kota / Tempat Penandatanganan</label>
                    <input className="w-full p-2 border rounded text-xs font-bold text-emerald-700" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Contoh: Sleman" />
                 </div>
                 <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-[10px] text-slate-500 font-bold block mb-1">Hari</label>
                        <input className="w-full p-2 border rounded text-xs" value={data.day} onChange={e => handleDataChange('day', e.target.value)} placeholder="Senin" />
                    </div>
                    <div>
                        <label className="text-[10px] text-slate-500 font-bold block mb-1">Tanggal</label>
                        <input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                    </div>
                 </div>
              </div>
           </div>

           {/* 2. IDENTITAS */}
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-6">
             <div className="border-l-4 border-red-500 pl-3">
                <h4 className="text-xs font-bold text-red-600 mb-2 uppercase">Penjual (Pihak 1)</h4>
                <div className="space-y-2">
                   <input className="w-full p-2 border rounded text-xs font-bold" placeholder="Nama" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} />
                   <div className="grid grid-cols-2 gap-2">
                      <input className="w-full p-2 border rounded text-xs" placeholder="NIK" value={data.p1Nik} onChange={e => handleDataChange('p1Nik', e.target.value)} />
                      <input className="w-full p-2 border rounded text-xs" placeholder="Umur" value={data.p1Age} onChange={e => handleDataChange('p1Age', e.target.value)} />
                   </div>
                   <input className="w-full p-2 border rounded text-xs" placeholder="Pekerjaan" value={data.p1Job} onChange={e => handleDataChange('p1Job', e.target.value)} />
                   <textarea className="w-full p-2 border rounded text-xs h-12" placeholder="Alamat" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} />
                </div>
             </div>
             <div className="border-l-4 border-blue-500 pl-3">
                <h4 className="text-xs font-bold text-blue-600 mb-2 uppercase">Pembeli (Pihak 2)</h4>
                <div className="space-y-2">
                   <input className="w-full p-2 border rounded text-xs font-bold" placeholder="Nama" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} />
                   <div className="grid grid-cols-2 gap-2">
                      <input className="w-full p-2 border rounded text-xs" placeholder="NIK" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} />
                      <input className="w-full p-2 border rounded text-xs" placeholder="Umur" value={data.p2Age} onChange={e => handleDataChange('p2Age', e.target.value)} />
                   </div>
                   <input className="w-full p-2 border rounded text-xs" placeholder="Pekerjaan" value={data.p2Job} onChange={e => handleDataChange('p2Job', e.target.value)} />
                   <textarea className="w-full p-2 border rounded text-xs h-12" placeholder="Alamat" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} />
                </div>
             </div>
          </div>

          {/* 3. OBJEK TANAH */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
             <div className="flex items-center gap-2 border-b pb-2"><Map size={14}/><h3 className="text-xs font-bold uppercase">Objek Tanah</h3></div>
             <div className="grid grid-cols-2 gap-3">
                <input className="w-full p-2 border rounded text-xs" value={data.landCertType} onChange={e => handleDataChange('landCertType', e.target.value)} placeholder="Jenis Sertifikat" />
                <input className="w-full p-2 border rounded text-xs" value={data.landCertNo} onChange={e => handleDataChange('landCertNo', e.target.value)} placeholder="No Sertifikat" />
             </div>
             <input className="w-full p-2 border rounded text-xs" value={data.landArea} onChange={e => handleDataChange('landArea', e.target.value)} placeholder="Luas (m2)" />
             <textarea className="w-full p-2 border rounded text-xs h-12" value={data.landAddress} onChange={e => handleDataChange('landAddress', e.target.value)} placeholder="Alamat Tanah" />
             
             {/* INPUT BATAS TANAH */}
             <div className="bg-slate-50 p-2 border rounded">
                <div className="flex items-center gap-2 mb-2"><GripHorizontal size={12}/><label className="text-[10px] font-bold">BATAS-BATAS</label></div>
                <div className="grid grid-cols-2 gap-2">
                    <input className="w-full p-1.5 border rounded text-[10px]" value={data.bNorth} onChange={e => handleDataChange('bNorth', e.target.value)} placeholder="Utara" />
                    <input className="w-full p-1.5 border rounded text-[10px]" value={data.bSouth} onChange={e => handleDataChange('bSouth', e.target.value)} placeholder="Selatan" />
                    <input className="w-full p-1.5 border rounded text-[10px]" value={data.bEast} onChange={e => handleDataChange('bEast', e.target.value)} placeholder="Timur" />
                    <input className="w-full p-1.5 border rounded text-[10px]" value={data.bWest} onChange={e => handleDataChange('bWest', e.target.value)} placeholder="Barat" />
                </div>
             </div>
          </div>

          {/* 4. HARGA & BAYAR */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
             <div className="flex items-center gap-2 border-b pb-2"><BadgeDollarSign size={14}/><h3 className="text-xs font-bold uppercase">Harga Total</h3></div>
             <input type="number" className="w-full p-2 border rounded text-sm font-bold" value={data.price} onChange={e => handleDataChange('price', parseInt(e.target.value))} />
             <div className="text-[10px] font-bold text-emerald-600 text-right">{formatRupiah(data.price)}</div>
             <textarea className="w-full p-2 border rounded text-xs h-12" value={data.priceText} onChange={e => handleDataChange('priceText', e.target.value)} placeholder="Terbilang" />
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
             <div className="flex items-center gap-2 border-b pb-2"><CreditCard size={14}/><h3 className="text-xs font-bold uppercase">Pembayaran</h3></div>
             <div className="space-y-3">
                 <div>
                    <label className="text-[10px] text-slate-500 font-bold block mb-1">Uang Muka (DP)</label>
                    <input type="number" className="w-full p-2 border rounded text-xs" value={data.dp} onChange={e => handleDataChange('dp', parseInt(e.target.value))} placeholder="Nominal DP" />
                    <div className="text-[9px] text-emerald-600 text-right mt-1">{formatRupiah(data.dp)}</div>
                 </div>
                 <div>
                    <label className="text-[10px] text-slate-500 font-bold block mb-1">Cara Pembayaran Sisa</label>
                    <input className="w-full p-2 border rounded text-xs" value={data.paymentMethod} onChange={e => handleDataChange('paymentMethod', e.target.value)} placeholder="Contoh: Transfer BCA / Tunai Bertahap" />
                 </div>
             </div>
          </div>

          {/* 5. SAKSI & PENYETUJU */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
             <div className="flex items-center gap-2 border-b pb-2">
               <Users size={14} className="text-slate-600"/>
               <h3 className="text-xs font-bold uppercase">Saksi & Persetujuan</h3>
             </div>
             
             <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-500 uppercase">Penyetuju (Suami/Istri Penjual)</label>
                <input className="w-full p-2 border rounded text-xs" value={data.p1Spouse} onChange={e => handleDataChange('p1Spouse', e.target.value)} placeholder="Nama Suami/Istri" />
             </div>

             <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Saksi 1</label>
                    <input className="w-full p-2 border rounded text-xs" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} placeholder="Nama Saksi 1" />
                </div>
                <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Saksi 2</label>
                    <input className="w-full p-2 border rounded text-xs" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} placeholder="Nama Saksi 2" />
                </div>
             </div>
          </div>

          {/* 6. PASAL TAMBAHAN (REQUEST USER: MENAMBAH/MENGURANGI) */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
             <div className="flex items-center gap-2 border-b pb-2">
               <FileText size={14} className="text-slate-600"/>
               <h3 className="text-xs font-bold uppercase">Pasal Tambahan (Opsional)</h3>
             </div>
             <div className="space-y-1">
                <label className="text-[10px] text-slate-500 block mb-1">Isi jika ingin menambahkan klausul khusus di akhir surat.</label>
                <textarea 
                    className="w-full p-3 border rounded text-xs h-32 leading-relaxed" 
                    value={data.additionalClause} 
                    onChange={e => handleDataChange('additionalClause', e.target.value)} 
                    placeholder="Contoh: Jika pembeli membatalkan sepihak, maka DP hangus..." 
                />
             </div>
          </div>

        </div>

        {/* PREVIEW AREA */}
        <div className="flex-1 w-full flex justify-center print:hidden pb-20">
             <div className="w-[210mm] origin-top scale-[0.5] sm:scale-[0.6] lg:scale-100 transition-transform">
                {DocumentContent}
             </div>
        </div>

      </div>

      {/* PRINT AREA */}
      <div className="hidden print:block absolute top-0 left-0 w-full">
          {DocumentContent}
      </div>

    </div>
  );
}