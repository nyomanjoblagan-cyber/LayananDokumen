'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  Wallet, Landmark, Users, CalendarClock, ShieldAlert, FileText
} from 'lucide-react';
import Link from 'next/link';

export default function HutangPiutangPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Sistem Keuangan...</div>}>
      <DebtAgreementBuilder />
    </Suspense>
  );
}

function DebtAgreementBuilder() {
  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    // META
    city: 'Jakarta',
    date: new Date().toISOString().split('T')[0],

    // PIHAK 1 (PEMBERI HUTANG / KREDITUR)
    p1Name: 'BUDI SANTOSO',
    p1Nik: '3171010101800001',
    p1Job: 'Wiraswasta',
    p1Address: 'Jl. Menteng Atas No. 5, Jakarta Selatan',

    // PIHAK 2 (PENERIMA HUTANG / DEBITUR)
    p2Name: 'ASEP SAEPULOH',
    p2Nik: '3201010101900002',
    p2Job: 'Karyawan Swasta',
    p2Address: 'Jl. Raya Bogor KM 30, Depok',

    // RINCIAN HUTANG
    amount: 50000000,
    amountText: 'Lima Puluh Juta Rupiah',
    loanDate: new Date().toISOString().split('T')[0],
    
    // CARA BAYAR
    paymentType: 'Cicilan',
    dueDate: '2026-12-31',
    installmentAmount: 'Rp 2.500.000 per bulan',
    paymentMethod: 'Transfer ke BCA 1234567890 a.n Budi Santoso',

    // JAMINAN & SANKSI
    collateral: 'BPKB Motor Honda PCX Tahun 2022 (Plat B 1234 XYZ)',
    penalty: 'Apabila terlambat membayar, dikenakan denda keterlambatan sebesar 1% per hari dari nilai angsuran.',
    
    // SAKSI
    witness1: 'Iwan (Adik Pihak 2)',
    witness2: 'Ketua RT 05'
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
  const applyPreset = (type: 'personal' | 'business') => {
    if (type === 'personal') {
      setData(prev => ({
        ...prev,
        amount: 5000000,
        amountText: 'Lima Juta Rupiah',
        paymentType: 'Lunas Sekaligus',
        installmentAmount: '-',
        collateral: 'Tanpa Jaminan (Atas dasar kepercayaan kekeluargaan)',
        penalty: 'Musyawarah kekeluargaan.',
        templateId: 2 // Auto switch to simple
      }));
      setTemplateId(2);
    } else if (type === 'business') {
      setData(prev => ({
        ...prev,
        amount: 100000000,
        amountText: 'Seratus Juta Rupiah',
        paymentType: 'Cicilan Bertahap',
        installmentAmount: 'Rp 10.000.000 setiap tanggal 5',
        collateral: 'Sertifikat Tanah Hak Milik (SHM) No. 12345 seluas 100m2 di Bogor',
        penalty: 'Denda 5% per bulan keterlambatan dan aset jaminan dapat disita.',
        templateId: 1 // Auto switch to formal
      }));
      setTemplateId(1);
    }
  };

  const TEMPLATES = [
    { id: 1, name: "Legal Formal (2 Halaman)", desc: "Layout lega, pasal lengkap, profesional" },
    { id: 2, name: "Kekeluargaan (Simple)", desc: "Surat pernyataan sederhana 1 halaman" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN KERTAS (SAMA PERSIS DENGAN JUAL BELI TANAH) ---
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
                <h1 className="font-black text-xl uppercase tracking-widest underline">SURAT PERJANJIAN HUTANG PIUTANG</h1>
              </div>

              <p className="mb-4 text-justify">Pada hari ini, <strong>{new Date(data.date).toLocaleDateString('id-ID', {weekday:'long'})}</strong>, tanggal <strong>{new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</strong>, bertempat di {data.city}, kami yang bertanda tangan di bawah ini:</p>

              {/* PIHAK 1 */}
              <div className="ml-4 mb-4 text-sm">
                <div className="font-bold underline text-xs uppercase mb-1">I. PIHAK PERTAMA (PEMBERI HUTANG)</div>
                <table className="w-full leading-snug">
                    <tbody>
                      <tr><td className="w-24 font-bold">Nama</td><td className="w-3">:</td><td className="font-bold uppercase">{data.p1Name}</td></tr>
                      <tr><td>NIK</td><td>:</td><td>{data.p1Nik}</td></tr>
                      <tr><td>Pekerjaan</td><td>:</td><td>{data.p1Job}</td></tr>
                      <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.p1Address}</td></tr>
                    </tbody>
                </table>
              </div>

              {/* PIHAK 2 */}
              <div className="ml-4 mb-6 text-sm">
                <div className="font-bold underline text-xs uppercase mb-1">II. PIHAK KEDUA (PENERIMA HUTANG)</div>
                <table className="w-full leading-snug">
                    <tbody>
                      <tr><td className="w-24 font-bold">Nama</td><td className="w-3">:</td><td className="font-bold uppercase">{data.p2Name}</td></tr>
                      <tr><td>NIK</td><td>:</td><td>{data.p2Nik}</td></tr>
                      <tr><td>Pekerjaan</td><td>:</td><td>{data.p2Job}</td></tr>
                      <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.p2Address}</td></tr>
                    </tbody>
                </table>
              </div>

              <p className="mb-4">Para Pihak sepakat untuk mengadakan perjanjian hutang piutang dengan ketentuan dan syarat-syarat sebagai berikut:</p>

              <div className="mb-4">
                <div className="text-center font-bold uppercase mb-2">PASAL 1<br/>JUMLAH HUTANG</div>
                <p>Pihak Pertama memberikan pinjaman uang kepada Pihak Kedua sebesar <strong>{formatRupiah(data.amount)}</strong> (<em>{data.amountText}</em>). Pihak Kedua mengaku telah menerima uang tersebut secara lengkap dan tunai/transfer pada tanggal {new Date(data.loanDate).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}.</p>
              </div>

              <div className="mb-4">
                <div className="text-center font-bold uppercase mb-2">PASAL 2<br/>JANGKA WAKTU & CARA PEMBAYARAN</div>
                <ul className="list-decimal ml-5 text-sm space-y-1">
                   <li>Pihak Kedua berjanji akan mengembalikan hutang tersebut dengan cara <strong>{data.paymentType.toUpperCase()}</strong>.</li>
                   {data.paymentType === 'Cicilan Bertahap' && (
                      <li>Rincian angsuran yang disepakati adalah: {data.installmentAmount}.</li>
                   )}
                   <li>Pembayaran akan dilakukan melalui {data.paymentMethod}.</li>
                   <li>Hutang tersebut wajib LUNAS selambat-lambatnya pada tanggal <strong>{new Date(data.dueDate).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</strong>.</li>
                </ul>
              </div>

              <div className="absolute bottom-10 right-10 text-[10px] text-slate-400 italic">Halaman 1 dari 2</div>
          </Kertas>

          <Kertas>
              <div className="space-y-6 text-justify pt-4">
                <div>
                   <div className="text-center font-bold uppercase mb-2">PASAL 3<br/>JAMINAN (AGUNAN)</div>
                   <p className="text-sm">Untuk menjamin pelunasan hutang ini, Pihak Kedua menyerahkan jaminan kepada Pihak Pertama berupa:</p>
                   <div className="p-3 bg-slate-50 border border-slate-200 mt-2 mb-2 italic text-sm font-bold text-center">
                      "{data.collateral}"
                   </div>
                   <p className="text-sm">Jaminan tersebut akan dikembalikan dalam keadaan baik kepada Pihak Kedua segera setelah seluruh hutang lunas.</p>
                </div>

                <div>
                   <div className="text-center font-bold uppercase mb-2">PASAL 4<br/>SANKSI & KETERLAMBATAN</div>
                   <p className="text-sm">{data.penalty}</p>
                   <p className="text-sm mt-2">Apabila Pihak Kedua tidak dapat melunasi hutang hingga batas waktu yang ditentukan, maka Pihak Pertama berhak untuk menjual/melelang barang jaminan tersebut untuk menutupi hutang.</p>
                </div>

                <div>
                   <div className="text-center font-bold uppercase mb-2">PASAL 5<br/>PENYELESAIAN PERSELISIHAN</div>
                   <p className="text-sm">Apabila terjadi perselisihan, kedua belah pihak sepakat untuk menyelesaikannya secara musyawarah untuk mufakat.</p>
                </div>
              </div>

              <p className="mt-8 mb-8 text-sm">Demikian Surat Perjanjian ini dibuat dalam rangkap 2 (dua) bermaterai cukup dan masing-masing memiliki kekuatan hukum yang sama.</p>

              <div className="grid grid-cols-2 gap-8 text-center text-sm mb-12">
                <div>
                    <p className="mb-20 font-bold">PIHAK KEDUA (Debitur)</p>
                    <div className="border border-slate-300 w-24 h-16 mx-auto mb-2 flex items-center justify-center text-[10px] text-slate-400">MATERAI</div>
                    <p className="font-bold underline uppercase">{data.p2Name}</p>
                </div>
                <div>
                    <p className="mb-24 font-bold">PIHAK PERTAMA (Kreditur)</p>
                    <p className="font-bold underline uppercase">{data.p1Name}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-8 text-center text-sm">
                <div>
                    <p className="mb-16 text-xs font-bold underline">SAKSI I</p>
                    <p>{data.witness1}</p>
                </div>
                <div>
                    <p className="mb-16 text-xs font-bold underline">SAKSI II</p>
                    <p>{data.witness2}</p>
                </div>
              </div>

              <div className="absolute bottom-10 right-10 text-[10px] text-slate-400 italic">Halaman 2 dari 2</div>
          </Kertas>
        </>
      )}

      {/* TEMPLATE 2: SIMPLE (1 HALAMAN) */}
      {templateId === 2 && (
        <Kertas>
            <div className="text-center mb-8 border-b-2 border-black pb-4">
              <h1 className="font-bold text-xl uppercase underline">SURAT PERNYATAAN HUTANG</h1>
            </div>

            <p className="mb-4 text-justify">Saya yang bertanda tangan di bawah ini:</p>

            <div className="ml-4 mb-6 text-sm">
              <table className="w-full leading-snug">
                 <tbody>
                    <tr><td className="w-32 font-bold">Nama</td><td className="w-3">:</td><td className="uppercase font-bold">{data.p2Name}</td></tr>
                    <tr><td>NIK</td><td>:</td><td>{data.p2Nik}</td></tr>
                    <tr><td>Alamat</td><td>:</td><td>{data.p2Address}</td></tr>
                 </tbody>
              </table>
            </div>

            <p className="mb-4 text-justify">
               Dengan ini menyatakan dengan sesungguhnya bahwa saya memiliki hutang kepada:
            </p>

            <div className="ml-4 mb-6 text-sm">
               <table className="w-full leading-snug">
                  <tbody>
                     <tr><td className="w-32 font-bold">Nama</td><td className="w-3">:</td><td className="uppercase font-bold">{data.p1Name}</td></tr>
                     <tr><td>Alamat</td><td>:</td><td>{data.p1Address}</td></tr>
                  </tbody>
               </table>
            </div>

            <div className="bg-slate-50 border border-black p-4 mb-6 text-sm">
               <table className="w-full">
                  <tbody>
                     <tr><td className="w-32 font-bold">Jumlah Hutang</td><td>:</td><td className="font-bold">{formatRupiah(data.amount)}</td></tr>
                     <tr><td className="font-bold">Terbilang</td><td>:</td><td className="italic">{data.amountText}</td></tr>
                     <tr><td className="font-bold">Jatuh Tempo</td><td>:</td><td className="font-bold text-red-600">{new Date(data.dueDate).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</td></tr>
                     <tr><td className="font-bold align-top">Jaminan</td><td className="align-top">:</td><td className="italic">{data.collateral}</td></tr>
                  </tbody>
               </table>
            </div>

            <p className="mb-8 text-justify text-sm">
               Saya berjanji akan melunasi hutang tersebut tepat waktu. Apabila melanggar, saya bersedia dituntut sesuai hukum yang berlaku.
            </p>

            <div className="flex justify-end text-center mt-auto mb-8 text-sm">
               <div className="w-56">
                  <p className="mb-1">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
                  <p className="mb-2 font-bold">Yang Membuat Pernyataan,</p>
                  <div className="border border-slate-300 w-24 h-16 mx-auto mb-2 flex items-center justify-center text-[10px] text-slate-300">MATERAI 10.000</div>
                  <p className="font-bold underline uppercase">{data.p2Name}</p>
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
            <h1 className="text-sm font-bold tracking-wide text-emerald-400 uppercase">Hutang Piutang</h1>
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
           
           {/* Quick Preset */}
           <div className="bg-emerald-50 rounded-xl shadow-sm border border-emerald-100 overflow-hidden">
             <div className="px-4 py-3 border-b border-emerald-200 flex items-center gap-2">
                <Wallet size={14} className="text-emerald-600" />
                <h3 className="text-xs font-bold text-emerald-800 uppercase">Isi Otomatis</h3>
             </div>
             <div className="p-4 grid grid-cols-2 gap-2">
                <button onClick={() => applyPreset('personal')} className="bg-white hover:bg-blue-100 border border-blue-200 text-blue-700 py-2 rounded text-[10px] font-bold transition-colors flex items-center justify-center gap-1">
                   <Users size={12} className="mr-1"/> Personal (Keluarga)
                </button>
                <button onClick={() => applyPreset('business')} className="bg-white hover:bg-emerald-100 border border-emerald-200 text-emerald-700 py-2 rounded text-[10px] font-bold transition-colors flex items-center justify-center gap-1">
                   <Landmark size={12} className="mr-1"/> Bisnis (Besar)
                </button>
             </div>
           </div>

           {/* Identitas */}
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-6">
             <div className="border-l-4 border-green-500 pl-3">
                <h4 className="text-xs font-bold text-green-600 mb-2 uppercase">Pemberi Hutang (Pihak 1)</h4>
                <div className="space-y-2">
                   <input className="w-full p-2 border rounded text-xs font-bold" placeholder="Nama" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} />
                   <div className="grid grid-cols-2 gap-2">
                      <input className="w-full p-2 border rounded text-xs" placeholder="NIK" value={data.p1Nik} onChange={e => handleDataChange('p1Nik', e.target.value)} />
                      <input className="w-full p-2 border rounded text-xs" placeholder="Pekerjaan" value={data.p1Job} onChange={e => handleDataChange('p1Job', e.target.value)} />
                   </div>
                   <textarea className="w-full p-2 border rounded text-xs h-12" placeholder="Alamat" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} />
                </div>
             </div>
             <div className="border-l-4 border-red-500 pl-3">
                <h4 className="text-xs font-bold text-red-600 mb-2 uppercase">Penerima Hutang (Pihak 2)</h4>
                <div className="space-y-2">
                   <input className="w-full p-2 border rounded text-xs font-bold" placeholder="Nama" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} />
                   <div className="grid grid-cols-2 gap-2">
                      <input className="w-full p-2 border rounded text-xs" placeholder="NIK" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} />
                      <input className="w-full p-2 border rounded text-xs" placeholder="Pekerjaan" value={data.p2Job} onChange={e => handleDataChange('p2Job', e.target.value)} />
                   </div>
                   <textarea className="w-full p-2 border rounded text-xs h-12" placeholder="Alamat" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} />
                </div>
             </div>
           </div>

           {/* Rincian Hutang */}
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
             <div className="flex items-center gap-2 border-b pb-2"><Wallet size={14}/><h3 className="text-xs font-bold uppercase">Rincian Hutang</h3></div>
             <div className="space-y-3">
                <div>
                   <label className="text-[10px] text-slate-500 font-bold block mb-1">Jumlah Pinjaman</label>
                   <input type="number" className="w-full p-2 border rounded text-sm font-bold" value={data.amount} onChange={e => handleDataChange('amount', parseInt(e.target.value) || 0)} />
                   <div className="text-[10px] font-bold text-emerald-600 text-right">{formatRupiah(data.amount)}</div>
                </div>
                <div>
                   <label className="text-[10px] text-slate-500 font-bold block mb-1">Terbilang</label>
                   <textarea className="w-full p-2 border rounded text-xs h-12" value={data.amountText} onChange={e => handleDataChange('amountText', e.target.value)} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                   <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-1">Tanggal Pinjam</label>
                      <input type="date" className="w-full p-2 border rounded text-xs" value={data.loanDate} onChange={e => handleDataChange('loanDate', e.target.value)} />
                   </div>
                   <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-1">Jatuh Tempo</label>
                      <input type="date" className="w-full p-2 border rounded text-xs" value={data.dueDate} onChange={e => handleDataChange('dueDate', e.target.value)} />
                   </div>
                </div>
             </div>
           </div>

           {/* Pembayaran & Jaminan */}
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
             <div className="flex items-center gap-2 border-b pb-2"><CalendarClock size={14}/><h3 className="text-xs font-bold uppercase">Pembayaran & Jaminan</h3></div>
             <div className="space-y-3">
                <div>
                   <label className="text-[10px] text-slate-500 font-bold block mb-1">Sistem Pembayaran</label>
                   <select className="w-full p-2 border rounded text-xs bg-white" value={data.paymentType} onChange={e => handleDataChange('paymentType', e.target.value)}>
                      <option value="Lunas Sekaligus">Lunas Sekaligus (Di Akhir)</option>
                      <option value="Cicilan Bertahap">Cicilan Bertahap</option>
                   </select>
                </div>
                {data.paymentType === 'Cicilan Bertahap' && (
                   <div>
                      <label className="text-[10px] text-slate-500 font-bold block mb-1">Rincian Cicilan</label>
                      <input className="w-full p-2 border rounded text-xs" value={data.installmentAmount} onChange={e => handleDataChange('installmentAmount', e.target.value)} placeholder="Contoh: 1 Juta per bulan" />
                   </div>
                )}
                <div>
                   <label className="text-[10px] text-slate-500 font-bold block mb-1">Metode Transfer/Tunai</label>
                   <input className="w-full p-2 border rounded text-xs" value={data.paymentMethod} onChange={e => handleDataChange('paymentMethod', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] text-slate-500 font-bold block mb-1">Jaminan (Agunan)</label>
                   <textarea className="w-full p-2 border rounded text-xs h-16" value={data.collateral} onChange={e => handleDataChange('collateral', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] text-slate-500 font-bold block mb-1">Sanksi Denda</label>
                   <textarea className="w-full p-2 border rounded text-xs h-16" value={data.penalty} onChange={e => handleDataChange('penalty', e.target.value)} />
                </div>
             </div>
           </div>

           {/* SAKSI */}
           <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
             <div className="flex items-center gap-2 border-b pb-2"><Users size={14}/><h3 className="text-xs font-bold uppercase">Saksi-Saksi</h3></div>
             <div className="grid grid-cols-2 gap-3">
                <div>
                   <label className="text-[10px] text-slate-500 font-bold block mb-1">Saksi 1</label>
                   <input className="w-full p-2 border rounded text-xs" value={data.witness1} onChange={e => handleDataChange('witness1', e.target.value)} />
                </div>
                <div>
                   <label className="text-[10px] text-slate-500 font-bold block mb-1">Saksi 2</label>
                   <input className="w-full p-2 border rounded text-xs" value={data.witness2} onChange={e => handleDataChange('witness2', e.target.value)} />
                </div>
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