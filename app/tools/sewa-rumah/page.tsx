'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Upload, LayoutTemplate, 
  Home, Store, Hotel, BadgeDollarSign, Users, Key, ChevronDown, Check
} from 'lucide-react';
import Link from 'next/link';

export default function SewaRumahPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem Properti...</div>}>
      <RentalAgreementBuilder />
    </Suspense>
  );
}

function RentalAgreementBuilder() {
  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    // META
    day: 'Senin',
    date: new Date().toISOString().split('T')[0],
    city: 'Surabaya',

    // PIHAK 1 (PEMILIK)
    ownerName: 'H. Abdul Rofiq',
    ownerNik: '3578010101700001',
    ownerPhone: '0811-2222-3333',
    ownerAddress: 'Jl. Darmo Permai No. 10, Surabaya',

    // PIHAK 2 (PENYEWA)
    tenantName: 'CV. Maju Terus (Budi Santoso)',
    tenantNik: '3578010101850005',
    tenantPhone: '0812-3456-7890',
    tenantAddress: 'Jl. Ahmad Yani No. 5, Sidoarjo',

    // OBJEK SEWA
    type: 'Ruko 2 Lantai', // Rumah / Ruko / Apartemen
    addressProp: 'Ruko Rungkut Megah Raya Blok A-15, Surabaya',
    facilities: 'Listrik 2200W, Air PDAM, 2 Kamar Mandi, AC 2 Unit',
    purpose: 'Kantor Cabang / Tempat Usaha',

    // WAKTU
    duration: '2 (Dua) Tahun',
    startDate: '2026-03-01',
    endDate: '2028-03-01',

    // BIAYA
    price: 75000000, // Per tahun / total
    priceText: 'Tujuh Puluh Lima Juta Rupiah',
    deposit: 5000000,
    paymentMethod: 'Transfer BCA',
    
    // SAKSI
    witness: 'Ketua RT setempat'
  });

  // HELPER CURRENCY
  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  };

  // HANDLERS
  const handleDataChange = (field: string, val: any) => {
    setData({ ...data, [field]: val });
  };

  // PRESETS
  const applyPreset = (type: 'rumah' | 'ruko' | 'kost') => {
    if (type === 'rumah') {
      setData(prev => ({
        ...prev,
        type: 'Rumah Tinggal',
        addressProp: 'Perumahan Graha Famili Blok B-10...',
        facilities: 'Listrik 1300W, Air Sumur, Carport, 2 KT, 1 KM',
        purpose: 'Tempat Tinggal Keluarga',
        price: 25000000,
        priceText: 'Dua Puluh Lima Juta Rupiah',
        deposit: 2000000
      }));
      setTemplateId(1);
    } else if (type === 'ruko') {
      setData(prev => ({
        ...prev,
        type: 'Ruko / Tempat Usaha',
        addressProp: 'Jl. Raya Utama No. 88...',
        facilities: 'Listrik 5500W, Rolling Door, Toilet',
        purpose: 'Toko Kelontong / Kantor',
        price: 60000000,
        priceText: 'Enam Puluh Juta Rupiah',
        deposit: 5000000
      }));
      setTemplateId(1);
    } else if (type === 'kost') {
      setData(prev => ({
        ...prev,
        type: 'Kamar Kost (Kamar No. 05)',
        addressProp: 'Kost Ibu Tini, Jl. Kampus No. 5...',
        facilities: 'Kasur, Lemari, WiFi, KM Luar',
        purpose: 'Tempat Tinggal Mahasiswa',
        duration: '6 (Enam) Bulan',
        price: 6000000,
        priceText: 'Enam Juta Rupiah',
        deposit: 500000,
      }));
      setTemplateId(2);
    }
  };

  const TEMPLATES = [
    { id: 1, name: "Legal Formal (2 Halaman)", desc: "Pasal lengkap (Renovasi, Larangan, Force Majeure)" },
    { id: 2, name: "Simple / Kost (1 Halaman)", desc: "Ringkas, cocok untuk sewa bulanan/tahunan murah" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN KERTAS (CONTAINER AMAN) ---
  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`
      /* TAMPILAN LAYAR */
      w-[210mm] min-h-[297mm] 
      bg-white shadow-2xl 
      p-[20mm] mx-auto 
      text-[#1e293b] font-serif leading-relaxed text-[11pt]
      relative box-border mb-10
      
      /* TAMPILAN PRINT (BLOCK FLOW) */
      print:w-[210mm] print:h-auto 
      print:static print:block 
      print:shadow-none print:m-0 print:p-[20mm] 
      print:overflow-visible
      
      ${className}
    `}>
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f3f4f6] font-sans text-slate-800 print:bg-white">
      
      {/* CSS PRINT - SOLUSI HALAMAN HILANG */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; }
          
          /* 1. RESET BODY HTML */
          body, html { 
            margin: 0; padding: 0; 
            background: white; 
            height: auto !important; 
            overflow: visible !important; 
          }

          /* 2. SEMBUNYIKAN UI */
          header, nav, .no-print { display: none !important; }
          
          /* 3. RESET WRAPPER UTAMA (PENTING!) */
          /* Mematikan flexbox di parent agar halaman mengalir ke bawah */
          .print-reset-layout {
             display: block !important;
             height: auto !important;
             overflow: visible !important;
             position: static !important;
          }

          /* 4. PEMISAH HALAMAN */
          .page-break { 
            page-break-after: always; 
            break-after: page; 
            display: block;
          }

          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
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
            <h1 className="text-sm font-bold tracking-wide text-emerald-400 uppercase">Sewa Menyewa</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setShowTemplateMenu(!showTemplateMenu)}
                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium transition-colors min-w-[180px] justify-between"
              >
                <div className="flex items-center gap-2">
                  <LayoutTemplate size={14} className="text-blue-400" />
                  <span>{activeTemplateName}</span>
                </div>
                <ChevronDown size={12} className={`transition-transform ${showTemplateMenu ? 'rotate-180' : ''}`} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50">
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pilih Gaya Dokumen</div>
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-slate-700'}`}>
                      <div><div className="font-medium">{t.name}</div><div className="text-[10px] text-slate-400 mt-0.5">{t.desc}</div></div>
                      {templateId === t.id && <Check size={14} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg ring-1 ring-emerald-400/50">
              <Printer size={16} /> Cetak PDF
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)]">
        
        {/* --- LEFT SIDEBAR: INPUT --- */}
        <div className="no-print w-full lg:w-[450px] shrink-0 h-full overflow-y-auto pr-2 pb-20 space-y-6">
          
          {/* Quick Preset */}
          <div className="bg-emerald-50 rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
             <div className="px-4 py-3 border-b border-emerald-200 flex items-center gap-2">
                <Home size={14} className="text-emerald-600" />
                <h3 className="text-xs font-bold text-emerald-800 uppercase">Isi Otomatis</h3>
             </div>
             <div className="p-4 grid grid-cols-3 gap-2">
                <button onClick={() => applyPreset('rumah')} className="bg-white hover:bg-emerald-100 border border-emerald-200 text-emerald-700 py-2 rounded text-[10px] font-bold transition-colors flex flex-col items-center gap-1">
                   <Home size={14}/> Rumah
                </button>
                <button onClick={() => applyPreset('ruko')} className="bg-white hover:bg-blue-100 border border-blue-200 text-blue-700 py-2 rounded text-[10px] font-bold transition-colors flex flex-col items-center gap-1">
                   <Store size={14}/> Ruko
                </button>
                <button onClick={() => applyPreset('kost')} className="bg-white hover:bg-amber-100 border border-amber-200 text-amber-700 py-2 rounded text-[10px] font-bold transition-colors flex flex-col items-center gap-1">
                   <Hotel size={14}/> Kost
                </button>
             </div>
          </div>

          {/* Para Pihak */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <Users size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Identitas Pihak</h3>
             </div>
             <div className="p-4 space-y-6">
                <div className="border-l-2 border-red-500 pl-3">
                   <h4 className="text-xs font-bold text-red-600 mb-2 uppercase">Pihak Pertama (Pemilik)</h4>
                   <div className="space-y-2">
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs font-bold" placeholder="Nama Pemilik" value={data.ownerName} onChange={e => handleDataChange('ownerName', e.target.value)} />
                      <div className="grid grid-cols-2 gap-2">
                         <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" placeholder="NIK" value={data.ownerNik} onChange={e => handleDataChange('ownerNik', e.target.value)} />
                         <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" placeholder="No. HP" value={data.ownerPhone} onChange={e => handleDataChange('ownerPhone', e.target.value)} />
                      </div>
                      <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-12 resize-none" placeholder="Alamat Pemilik" value={data.ownerAddress} onChange={e => handleDataChange('ownerAddress', e.target.value)} />
                   </div>
                </div>

                <div className="border-l-2 border-blue-500 pl-3">
                   <h4 className="text-xs font-bold text-blue-600 mb-2 uppercase">Pihak Kedua (Penyewa)</h4>
                   <div className="space-y-2">
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs font-bold" placeholder="Nama Penyewa" value={data.tenantName} onChange={e => handleDataChange('tenantName', e.target.value)} />
                      <div className="grid grid-cols-2 gap-2">
                         <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" placeholder="NIK" value={data.tenantNik} onChange={e => handleDataChange('tenantNik', e.target.value)} />
                         <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" placeholder="No. HP" value={data.tenantPhone} onChange={e => handleDataChange('tenantPhone', e.target.value)} />
                      </div>
                      <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-12 resize-none" placeholder="Alamat Penyewa" value={data.tenantAddress} onChange={e => handleDataChange('tenantAddress', e.target.value)} />
                   </div>
                </div>
             </div>
          </div>

          {/* Objek Sewa & Waktu */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <Key size={14} className="text-blue-600" />
                <h3 className="text-xs font-bold text-slate-700 uppercase">Objek Sewa</h3>
             </div>
             <div className="p-4 space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Jenis Properti</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs font-bold" value={data.type} onChange={e => handleDataChange('type', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Properti</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-12 resize-none" value={data.addressProp} onChange={e => handleDataChange('addressProp', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Fasilitas / Kondisi</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-12 resize-none" value={data.facilities} onChange={e => handleDataChange('facilities', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Peruntukan (Untuk apa?)</label>
                   <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.purpose} onChange={e => handleDataChange('purpose', e.target.value)} />
                </div>
                
                <div className="bg-blue-50 p-3 rounded border border-blue-200">
                   <div className="grid grid-cols-2 gap-3 mb-2">
                      <div>
                         <label className="text-[10px] font-bold text-blue-700 uppercase">Tgl Mulai</label>
                         <input type="date" className="w-full p-2 border border-blue-300 rounded text-xs" value={data.startDate} onChange={e => handleDataChange('startDate', e.target.value)} />
                      </div>
                      <div>
                         <label className="text-[10px] font-bold text-blue-700 uppercase">Tgl Selesai</label>
                         <input type="date" className="w-full p-2 border border-blue-300 rounded text-xs" value={data.endDate} onChange={e => handleDataChange('endDate', e.target.value)} />
                      </div>
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-blue-700 uppercase">Durasi Sewa (Teks)</label>
                      <input type="text" className="w-full p-2 border border-blue-300 rounded text-xs" value={data.duration} onChange={e => handleDataChange('duration', e.target.value)} />
                   </div>
                </div>
             </div>
          </div>

          {/* Biaya */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
             <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center gap-2">
                <BadgeDollarSign size={14} className="text-emerald-600" />
                <h3 className="text-xs font-bold text-emerald-800 uppercase">Biaya Sewa</h3>
             </div>
             <div className="p-4 space-y-4">
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Harga Sewa Total</label>
                   <input type="number" className="w-full p-2 border border-slate-300 rounded text-sm font-bold text-emerald-700" value={data.price} onChange={e => handleDataChange('price', parseInt(e.target.value) || 0)} />
                   <div className="text-[10px] text-emerald-600 mt-1 font-bold">{formatRupiah(data.price)}</div>
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Terbilang</label>
                   <textarea className="w-full p-2 border border-slate-300 rounded text-xs h-12 resize-none" value={data.priceText} onChange={e => handleDataChange('priceText', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] font-bold text-slate-500 uppercase">Uang Jaminan (Deposit)</label>
                   <input type="number" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.deposit} onChange={e => handleDataChange('deposit', parseInt(e.target.value) || 0)} />
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-4">
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Kota</label>
                      <input type="text" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Tanda Tangan</label>
                      <input type="date" className="w-full p-2 border border-slate-300 rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                   </div>
                </div>
             </div>
          </div>

        </div>

        {/* --- RIGHT PREVIEW (DENGAN RESET WRAPPER) --- */}
        <div className="print-reset-layout flex-1 h-full bg-slate-200/50 rounded-xl flex justify-center p-8 overflow-y-auto print:p-0 print:bg-white print:w-full">
          
          <div className="space-y-8 print:space-y-0">
            
            {/* TEMPLATE 1: LEGAL FORMAL (2 HALAMAN) */}
            {templateId === 1 && (
              <>
                {/* HALAMAN 1 */}
                <Kertas className="page-break">
                   <div className="text-center mb-8 pb-4 border-b-2 border-black">
                      <h1 className="font-black text-xl uppercase tracking-widest underline">PERJANJIAN SEWA MENYEWA</h1>
                   </div>

                   <p className="mb-4 text-sm">Pada hari ini {data.day}, tanggal {new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}, bertempat di {data.city}, kami yang bertanda tangan di bawah ini:</p>

                   {/* PIHAK 1 */}
                   <div className="ml-4 mb-4 text-sm">
                      <table className="w-full leading-snug">
                         <tbody>
                            <tr><td className="w-24 font-bold">Nama</td><td className="w-3">:</td><td className="font-bold uppercase">{data.ownerName}</td></tr>
                            <tr><td>NIK</td><td>:</td><td>{data.ownerNik}</td></tr>
                            <tr><td>No. HP</td><td>:</td><td>{data.ownerPhone}</td></tr>
                            <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.ownerAddress}</td></tr>
                         </tbody>
                      </table>
                      <div className="mt-1 italic">Bertindak sebagai Pemilik Properti, selanjutnya disebut <strong>PIHAK PERTAMA</strong>.</div>
                   </div>

                   {/* PIHAK 2 */}
                   <div className="ml-4 mb-6 text-sm">
                      <table className="w-full leading-snug">
                         <tbody>
                            <tr><td className="w-24 font-bold">Nama</td><td className="w-3">:</td><td className="font-bold uppercase">{data.tenantName}</td></tr>
                            <tr><td>NIK</td><td>:</td><td>{data.tenantNik}</td></tr>
                            <tr><td>No. HP</td><td>:</td><td>{data.tenantPhone}</td></tr>
                            <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.tenantAddress}</td></tr>
                         </tbody>
                      </table>
                      <div className="mt-1 italic">Bertindak sebagai Penyewa, selanjutnya disebut <strong>PIHAK KEDUA</strong>.</div>
                   </div>

                   <p className="mb-4 text-sm">Para Pihak sepakat untuk mengadakan perjanjian sewa menyewa dengan ketentuan sebagai berikut:</p>

                   <div className="space-y-4 text-sm">
                      <div>
                         <div className="text-center font-bold uppercase mb-1">PASAL 1: OBJEK SEWA</div>
                         <p>PIHAK PERTAMA menyewakan kepada PIHAK KEDUA berupa <strong>{data.type}</strong> yang beralamat di <strong>{data.addressProp}</strong> dengan fasilitas: {data.facilities}.</p>
                      </div>

                      <div>
                         <div className="text-center font-bold uppercase mb-1">PASAL 2: JANGKA WAKTU</div>
                         <p>Sewa menyewa ini dilangsungkan untuk jangka waktu <strong>{data.duration}</strong>, terhitung mulai tanggal <strong>{new Date(data.startDate).toLocaleDateString('id-ID')}</strong> sampai dengan <strong>{new Date(data.endDate).toLocaleDateString('id-ID')}</strong>.</p>
                      </div>

                      <div>
                         <div className="text-center font-bold uppercase mb-1">PASAL 3: HARGA & PEMBAYARAN</div>
                         <p>Harga sewa disepakati sebesar <strong>{formatRupiah(data.price)}</strong> (<em>{data.priceText}</em>). Pembayaran dilakukan melalui {data.paymentMethod} secara LUNAS sebelum penyerahan kunci.</p>
                      </div>

                      <div>
                         <div className="text-center font-bold uppercase mb-1">PASAL 4: UANG JAMINAN (DEPOSIT)</div>
                         <p>PIHAK KEDUA wajib menyerahkan uang jaminan sebesar <strong>{formatRupiah(data.deposit)}</strong>. Uang ini akan dikembalikan penuh di akhir masa sewa apabila tidak ada tunggakan tagihan atau kerusakan properti.</p>
                      </div>
                   </div>

                   <div className="absolute bottom-10 right-10 text-[10px] text-slate-400 italic">Halaman 1 dari 2</div>
                </Kertas>

                {/* HALAMAN 2 */}
                <Kertas>
                   <div className="space-y-6 pt-4 text-sm">
                      <div>
                         <div className="text-center font-bold uppercase mb-1">PASAL 5: KEWAJIBAN & LARANGAN</div>
                         <ul className="list-decimal ml-5 space-y-1">
                            <li>PIHAK KEDUA wajib membayar tagihan listrik, air, keamanan, dan kebersihan selama masa sewa.</li>
                            <li>PIHAK KEDUA <strong>DILARANG</strong> menggunakan properti untuk kegiatan melanggar hukum, asusila, atau menyimpan barang terlarang (Narkoba, Miras, Bahan Peledak).</li>
                            <li>PIHAK KEDUA <strong>DILARANG</strong> memindah-tangankan atau menyewakan kembali properti kepada pihak lain tanpa izin tertulis PIHAK PERTAMA.</li>
                            <li>Peruntukan sewa hanya digunakan sebagai: <strong>{data.purpose}</strong>.</li>
                         </ul>
                      </div>

                      <div>
                         <div className="text-center font-bold uppercase mb-1">PASAL 6: PERUBAHAN BANGUNAN</div>
                         <p>PIHAK KEDUA tidak diperbolehkan mengubah struktur bangunan tanpa izin PIHAK PERTAMA. Penambahan fasilitas (seperti AC, Sekat Partisi) diperbolehkan dengan biaya sendiri dan wajib dikembalikan ke kondisi semula saat masa sewa berakhir, kecuali disepakati lain.</p>
                      </div>

                      <div>
                         <div className="text-center font-bold uppercase mb-1">PASAL 7: PENYELESAIAN PERSELISIHAN</div>
                         <p>Apabila terjadi perselisihan, kedua belah pihak sepakat menyelesaikannya secara musyawarah kekeluargaan. Jika tidak tercapai mufakat, maka akan diselesaikan melalui jalur hukum yang berlaku.</p>
                      </div>
                   </div>

                   <p className="mt-8 mb-8 text-sm">Demikian Surat Perjanjian ini dibuat rangkap dua bermaterai cukup yang memiliki kekuatan hukum yang sama.</p>

                   {/* TTD BOX */}
                   <div className="grid grid-cols-2 gap-8 text-center text-sm mb-12">
                      <div>
                         <p className="mb-20 font-bold">PIHAK KEDUA (Penyewa)</p>
                         <p className="font-bold underline uppercase">{data.tenantName}</p>
                      </div>
                      <div>
                         <p className="mb-4 font-bold">PIHAK PERTAMA (Pemilik)</p>
                         <div className="border border-slate-300 w-24 h-16 mx-auto mb-2 flex items-center justify-center text-[10px] text-slate-400">MATERAI<br/>10.000</div>
                         <p className="font-bold underline uppercase">{data.ownerName}</p>
                      </div>
                   </div>

                   <div className="text-center text-sm">
                      <p className="mb-20 font-bold text-xs">SAKSI</p>
                      <p className="border-b border-black inline-block px-4">{data.witness}</p>
                   </div>

                   <div className="absolute bottom-10 right-10 text-[10px] text-slate-400 italic">Halaman 2 dari 2</div>
                </Kertas>
              </>
            )}

            {/* TEMPLATE 2: SIMPLE / KOST (1 HALAMAN) */}
            {templateId === 2 && (
              <Kertas className="font-sans">
                 <div className="text-center mb-6 border-b-2 border-black pb-2">
                    <h1 className="font-bold text-xl uppercase underline">PERJANJIAN SEWA MENYEWA</h1>
                 </div>

                 <p className="mb-4 text-justify">Pada hari ini {data.day}, {new Date(data.date).toLocaleDateString('id-ID', {dateStyle:'full'})}, disepakati perjanjian sewa antara:</p>

                 <div className="bg-slate-50 p-4 border border-slate-200 mb-4 text-sm">
                    <table className="w-full leading-snug">
                       <tbody>
                          <tr><td className="w-24 font-bold">PEMILIK</td><td className="w-3">:</td><td className="font-bold uppercase">{data.ownerName}</td></tr>
                          <tr><td>No. HP</td><td>:</td><td>{data.ownerPhone}</td></tr>
                          <tr><td colSpan={3} className="h-2"></td></tr>
                          <tr><td className="font-bold">PENYEWA</td><td>:</td><td className="font-bold uppercase">{data.tenantName}</td></tr>
                          <tr><td>No. HP</td><td>:</td><td>{data.tenantPhone}</td></tr>
                          <tr><td>NIK</td><td>:</td><td>{data.tenantNik}</td></tr>
                       </tbody>
                    </table>
                 </div>

                 <p className="mb-2 font-bold underline text-sm">DETAIL SEWA:</p>
                 <ul className="list-disc ml-5 mb-4 space-y-1 text-sm">
                    <li><strong>Objek Sewa:</strong> {data.type}</li>
                    <li><strong>Alamat:</strong> {data.addressProp}</li>
                    <li><strong>Fasilitas:</strong> {data.facilities}</li>
                    <li><strong>Durasi:</strong> {data.duration} ({new Date(data.startDate).toLocaleDateString('id-ID')} s/d {new Date(data.endDate).toLocaleDateString('id-ID')})</li>
                    <li><strong>Harga Sewa:</strong> {formatRupiah(data.price)} (LUNAS)</li>
                    <li><strong>Deposit:</strong> {formatRupiah(data.deposit)} (Dikembalikan di akhir sewa)</li>
                 </ul>

                 <p className="mb-2 font-bold underline text-sm">TATA TERTIB & KETENTUAN:</p>
                 <ol className="list-decimal ml-5 mb-6 space-y-1 text-sm text-justify">
                    <li>Penyewa wajib menjaga kebersihan dan merawat fasilitas properti.</li>
                    <li>Dilarang membawa tamu lawan jenis (bukan suami istri sah) menginap (Khusus Kost).</li>
                    <li>Dilarang menggunakan properti untuk kegiatan melanggar hukum (Narkoba/Miras).</li>
                    <li>Uang sewa yang sudah dibayarkan tidak dapat diminta kembali jika Penyewa memutuskan kontrak sepihak sebelum masa sewa habis.</li>
                    <li>Biaya listrik/air/sampah menjadi tanggungan <strong>Penyewa</strong>.</li>
                 </ol>

                 <p className="mb-8 text-center text-sm italic">
                    Perjanjian ini dibuat dengan kesadaran penuh tanpa paksaan.
                 </p>

                 <div className="flex justify-between text-center mt-auto mb-8 text-sm">
                    <div className="w-40">
                       <p className="mb-16 font-bold">PENYEWA</p>
                       <p className="font-bold underline uppercase">{data.tenantName}</p>
                    </div>
                    <div className="w-40">
                       <p className="mb-2 font-bold">PEMILIK</p>
                       <div className="border border-slate-300 w-20 h-12 mx-auto mb-2 flex items-center justify-center text-[8px] text-slate-300">MATERAI</div>
                       <p className="font-bold underline uppercase">{data.ownerName}</p>
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