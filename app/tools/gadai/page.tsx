'use client';

import { useState, Suspense } from 'react';
import { 
  Printer, ArrowLeft, ChevronDown, Check, LayoutTemplate, 
  Wallet, ShieldCheck, Scale, CalendarDays, FileText, User, Box
} from 'lucide-react';
import Link from 'next/link';

export default function GadaiAsetPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Gadai Editor...</div>}>
      <GadaiBuilder />
    </Suspense>
  );
}

function GadaiBuilder() {
  // --- STATE ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    day: 'Senin',
    date: new Date().toISOString().split('T')[0],
    city: 'Jakarta',

    // PIHAK 1 (PENERIMA GADAI / YANG MEMINJAMKAN UANG)
    p1Name: 'BUDI SANTOSO', p1Nik: '3171010101780001', 
    p1Address: 'Jl. Merdeka No. 10, Jakarta Selatan',
    
    // PIHAK 2 (PEMBERI GADAI / YANG MEMINJAM UANG)
    p2Name: 'ANDI WIJAYA', p2Nik: '3171020202920005',
    p2Address: 'Jl. Sudirman No. 45, Jakarta Pusat',
    
    // DETAIL ASET GADAI
    assetName: '1 (satu) unit Sepeda Motor Honda Vario 150',
    assetDetail: 'Tahun 2022, Warna Hitam, No. Polisi B 1234 ABC, No. Rangka: MH123..., No. Mesin: JFG123... dilengkapi dengan STNK dan BPKB asli.',
    
    // PINJAMAN & JANGKA WAKTU
    loanAmount: 10000000,
    loanAmountText: 'Sepuluh Juta Rupiah',
    dueDate: '2026-07-08',
    interest: '0% (Tanpa Bunga)',
    
    // SAKSI
    witness1: 'Hendra Saputra', 
    witness2: 'Siti Aminah',

    additionalClause: 'Apabila sampai jatuh tempo Pihak Kedua tidak melunasi hutangnya, maka Pihak Pertama berhak menjual aset tersebut untuk pelunasan.' 
  });

  const formatRupiah = (num: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(num);
  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const TEMPLATES = [
    { id: 1, name: "Formal (2 Halaman)", desc: "Pasal lengkap & detail" },
    { id: 2, name: "Ringkas (1 Halaman)", desc: "Layout tabel simpel" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- LOGIKA ISI DOKUMEN ---
  const DocumentContent = (
    <div id="print-area">
      {templateId === 1 ? (
        <>
          {/* HALAMAN 1 */}
          <div className="kertas-print bg-white shadow-2xl mx-auto mb-8 font-serif text-[11pt] p-[25mm] w-[210mm] min-h-[296mm] flex flex-col print:shadow-none">
            <div className="text-center mb-8 pb-4 border-b-2 border-black">
              <h1 className="font-black text-xl uppercase tracking-widest underline">SURAT PERJANJIAN GADAI ASET</h1>
            </div>

            <p className="mb-4 text-justify">Pada hari ini <strong>{data.day}</strong> tanggal <strong>{new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</strong>, kami yang bertanda tangan di bawah ini:</p>

            <div className="ml-4 mb-4 space-y-4">
              <div className="text-sm">
                <table className="w-full leading-snug">
                    <tbody>
                      <tr><td className="w-24 font-bold">Nama</td><td className="w-3">:</td><td className="font-bold uppercase">{data.p1Name}</td></tr>
                      <tr><td>NIK</td><td>:</td><td>{data.p1Nik}</td></tr>
                      <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.p1Address}</td></tr>
                    </tbody>
                </table>
                <div className="mt-1 italic">Selanjutnya disebut <strong>PIHAK PERTAMA (PENERIMA GADAI)</strong>.</div>
              </div>

              <div className="text-sm">
                <table className="w-full leading-snug">
                    <tbody>
                      <tr><td className="w-24 font-bold">Nama</td><td className="w-3">:</td><td className="font-bold uppercase">{data.p2Name}</td></tr>
                      <tr><td>NIK</td><td>:</td><td>{data.p2Nik}</td></tr>
                      <tr><td className="align-top">Alamat</td><td className="align-top">:</td><td className="align-top">{data.p2Address}</td></tr>
                    </tbody>
                </table>
                <div className="mt-1 italic">Selanjutnya disebut <strong>PIHAK KEDUA (PEMBERI GADAI)</strong>.</div>
              </div>
            </div>

            <p className="mb-4 text-justify">Kedua belah pihak telah bersepakat untuk mengadakan perjanjian gadai dengan ketentuan sebagai berikut:</p>

            <div className="mb-6">
              <div className="text-center font-bold uppercase mb-2">PASAL 1<br/>NILAI PINJAMAN</div>
              <p className="text-sm text-justify">PIHAK KEDUA telah meminjam uang kepada PIHAK PERTAMA sebesar <strong>{formatRupiah(data.loanAmount)}</strong> ({data.loanAmountText}) yang telah diterima secara tunai/transfer pada saat penandatanganan surat ini.</p>
            </div>

            <div className="mb-4">
              <div className="text-center font-bold uppercase mb-2">PASAL 2<br/>OBJEK GADAI</div>
              <p className="text-sm">Sebagai jaminan atas pinjaman tersebut, PIHAK KEDUA menyerahkan aset kepada PIHAK PERTAMA berupa:</p>
              <div className="ml-4 mt-2 p-3 bg-slate-50 border rounded text-sm italic">
                <strong>{data.assetName}</strong><br/>
                {data.assetDetail}
              </div>
            </div>

            <div className="mt-auto text-center text-[10px] text-slate-400 italic">Halaman 1 dari 2</div>
          </div>

          {/* HALAMAN 2 */}
          <div className="kertas-print bg-white shadow-2xl mx-auto font-serif text-[11pt] p-[25mm] w-[210mm] min-h-[296mm] flex flex-col print:shadow-none">
            <div className="space-y-6 text-justify pt-4">
              <div>
                  <div className="text-center font-bold uppercase mb-2">PASAL 3<br/>JANGKA WAKTU & PENGEMBALIAN</div>
                  <p className="text-sm">PIHAK KEDUA berjanji akan melunasi pinjaman tersebut paling lambat pada tanggal <strong>{new Date(data.dueDate).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</strong>. Apabila pinjaman telah lunas, PIHAK PERTAMA wajib mengembalikan aset gadai dalam kondisi baik.</p>
              </div>
              <div>
                  <div className="text-center font-bold uppercase mb-2">PASAL 4<br/>KONSEKUENSI WANPRESTASI</div>
                  <p className="text-sm">Apabila sampai batas waktu yang ditentukan PIHAK KEDUA belum melunasi hutangnya, maka PIHAK PERTAMA berhak untuk mengambil tindakan hukum atau menjual aset jaminan tersebut untuk menutupi hutang PIHAK KEDUA.</p>
              </div>

              {data.additionalClause && (
                <div>
                  <div className="text-center font-bold uppercase mb-2">PASAL 5<br/>LAIN-LAIN</div>
                  <p className="text-sm whitespace-pre-wrap">{data.additionalClause}</p>
                </div>
              )}
            </div>

            <p className="mt-8 mb-8 text-sm text-justify text-slate-600 italic">Demikian perjanjian ini dibuat rangkap 2 (dua) di atas kertas bermaterai cukup dan mempunyai kekuatan hukum yang sama.</p>

            <div className="grid grid-cols-2 gap-8 text-center text-sm mb-12">
              <div>
                  <p className="mb-20 font-bold uppercase underline">Pihak Kedua</p>
                  <p className="font-bold uppercase leading-none">{data.p2Name}</p>
              </div>
              <div>
                  <p className="mb-4 font-bold uppercase underline">Pihak Pertama</p>
                  <div className="border border-slate-300 w-24 h-16 mx-auto mb-2 flex items-center justify-center text-[10px] text-slate-400">MATERAI 10.000</div>
                  <p className="font-bold uppercase leading-none">{data.p1Name}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-12 text-center text-sm">
              <div><p className="mb-16 font-bold text-xs">Saksi I</p><p className="border-b border-black">{data.witness1}</p></div>
              <div><p className="mb-16 font-bold text-xs">Saksi II</p><p className="border-b border-black">{data.witness2}</p></div>
            </div>

            <div className="mt-auto text-center text-[10px] text-slate-400 italic">Halaman 2 dari 2</div>
          </div>
        </>
      ) : (
        /* TEMPLATE 2: RINGKAS */
        <div className="bg-white shadow-2xl mx-auto p-[25mm] w-[210mm] min-h-[296mm] font-serif text-[11pt] print:shadow-none">
            <div className="text-center mb-6 border-b-2 border-black pb-2">
              <h1 className="font-bold text-xl uppercase underline tracking-tighter">SURAT BUKTI GADAI</h1>
            </div>
            <p className="mb-4 text-justify text-sm italic">Kami yang bertanda tangan di bawah ini sepakat melakukan serah terima aset gadai sebagai jaminan hutang:</p>

            <div className="grid grid-cols-2 gap-4 mb-4 text-[10px] font-sans">
              <div className="border p-2 rounded">
                <div className="font-bold uppercase mb-1 border-b">Penerima Gadai (Pihak I)</div>
                Nama: {data.p1Name}<br/>Alamat: {data.p1Address}
              </div>
              <div className="border p-2 rounded">
                <div className="font-bold uppercase mb-1 border-b">Pemberi Gadai (Pihak II)</div>
                Nama: {data.p2Name}<br/>Alamat: {data.p2Address}
              </div>
            </div>

            <div className="mb-4 border border-black p-4 text-sm bg-slate-50">
              <div className="font-bold border-b mb-2">OBJEK JAMINAN:</div>
              {data.assetName}<br/>
              <span className="text-xs text-slate-600">{data.assetDetail}</span>
            </div>

            <div className="mb-6 text-sm space-y-2">
              <p>1. Pihak II meminjam sebesar <strong>{formatRupiah(data.loanAmount)}</strong>.</p>
              <p>2. Jatuh tempo pelunasan pada: <strong>{new Date(data.dueDate).toLocaleDateString('id-ID', {dateStyle:'full'})}</strong>.</p>
              <p>3. Jika tidak lunas, aset menjadi milik Pihak I atau dijual.</p>
            </div>

            <div className="flex justify-between text-center mt-20 mb-12 text-sm">
              <div className="w-40">
                  <p className="mb-20 font-bold uppercase underline">Pihak II</p>
                  <p className="font-bold uppercase">{data.p2Name}</p>
              </div>
              <div className="w-40">
                  <p className="mb-4 font-bold uppercase underline">Pihak I</p>
                  <div className="border border-slate-300 w-20 h-12 mx-auto mb-2 flex items-center justify-center text-[8px] text-slate-300">MATERAI</div>
                  <p className="font-bold uppercase">{data.p1Name}</p>
              </div>
            </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 print:bg-white">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0mm; }
          body { margin: 0 !important; padding: 0 !important; background: white !important; }
          header, nav, aside, button, .no-print { display: none !important; }
          #main-content { padding: 0 !important; margin: 0 !important; display: block !important; }
        }
      `}</style>

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors"><ArrowLeft size={18} /></Link>
            <div className="h-6 w-px bg-slate-700 mx-2"></div>
            <h1 className="text-sm font-bold text-emerald-400 uppercase tracking-widest">Perjanjian Gadai</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium min-w-[180px] justify-between transition-all">
                <div className="flex items-center gap-2"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50 text-slate-700">
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-medium' : ''}`}>
                      <div className="font-medium">{t.name}</div>
                      <div className="text-[10px] text-slate-400">{t.desc}</div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase hover:bg-emerald-500 shadow-lg">
              <Printer size={16} /> Cetak
            </button>
          </div>
        </div>
      </div>

      <div id="main-content" className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)] overflow-hidden">
        
        {/* --- SIDEBAR EDITOR --- */}
        <div className="no-print w-full lg:w-[450px] shrink-0 h-full overflow-y-auto pr-2 pb-20 space-y-6 font-sans">
           
           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><CalendarDays size={14}/><h3 className="text-xs font-bold uppercase">Waktu & Tempat</h3></div>
              <div className="grid grid-cols-2 gap-3">
                <input className="w-full p-2 border rounded text-xs" value={data.day} onChange={e => handleDataChange('day', e.target.value)} placeholder="Hari" />
                <input className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Kota" />
                <div className="col-span-2"><input type="date" className="w-full p-2 border rounded text-xs" value={data.date} onChange={e => handleDataChange('date', e.target.value)} /></div>
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><User size={14}/><h3 className="text-xs font-bold uppercase">Pihak Terlibat</h3></div>
              <div className="space-y-4">
                <div className="p-2 border-l-4 border-emerald-500 bg-emerald-50/50 space-y-2">
                  <label className="text-[9px] font-bold text-emerald-700">Pihak I (Penerima Gadai)</label>
                  <input className="w-full p-2 border rounded text-xs" placeholder="Nama Pihak I" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} />
                  <input className="w-full p-2 border rounded text-xs" placeholder="NIK" value={data.p1Nik} onChange={e => handleDataChange('p1Nik', e.target.value)} />
                </div>
                <div className="p-2 border-l-4 border-blue-500 bg-blue-50/50 space-y-2">
                  <label className="text-[9px] font-bold text-blue-700">Pihak II (Pemberi Gadai)</label>
                  <input className="w-full p-2 border rounded text-xs" placeholder="Nama Pihak II" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} />
                  <input className="w-full p-2 border rounded text-xs" placeholder="NIK" value={data.p2Nik} onChange={e => handleDataChange('p2Nik', e.target.value)} />
                </div>
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><Box size={14}/><h3 className="text-xs font-bold uppercase">Aset Jaminan</h3></div>
              <input className="w-full p-2 border rounded text-xs font-bold" placeholder="Nama Barang (Misal: Motor Vario)" value={data.assetName} onChange={e => handleDataChange('assetName', e.target.value)} />
              <textarea className="w-full p-2 border rounded text-xs h-20" placeholder="Detail (Warna, No Polisi, No Rangka, dll)" value={data.assetDetail} onChange={e => handleDataChange('assetDetail', e.target.value)} />
           </div>

           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><Wallet size={14}/><h3 className="text-xs font-bold uppercase">Pinjaman & Tempo</h3></div>
              <div className="space-y-3">
                <input type="number" className="w-full p-2 border rounded text-xs font-bold" value={data.loanAmount} onChange={e => handleDataChange('loanAmount', parseInt(e.target.value))} />
                <input className="w-full p-2 border rounded text-xs" placeholder="Terbilang Rupiah" value={data.loanAmountText} onChange={e => handleDataChange('loanAmountText', e.target.value)} />
                <div className="grid grid-cols-2 gap-3 pt-2">
                   <div>
                     <label className="text-[9px] font-bold uppercase text-slate-400">Jatuh Tempo</label>
                     <input type="date" className="w-full p-2 border rounded text-xs" value={data.dueDate} onChange={e => handleDataChange('dueDate', e.target.value)} />
                   </div>
                   <div>
                     <label className="text-[9px] font-bold uppercase text-slate-400">Bunga / Biaya</label>
                     <input className="w-full p-2 border rounded text-xs" value={data.interest} onChange={e => handleDataChange('interest', e.target.value)} />
                   </div>
                </div>
              </div>
           </div>

           <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
              <div className="flex items-center gap-2 border-b pb-2"><FileText size={14}/><h3 className="text-xs font-bold uppercase">Pasal Tambahan</h3></div>
              <textarea className="w-full p-2 border rounded text-xs h-24" value={data.additionalClause} onChange={e => handleDataChange('additionalClause', e.target.value)} placeholder="Contoh: Jika tidak lunas aset dijual..." />
           </div>
        </div>

        {/* --- PREVIEW AREA --- */}
        <div className="flex-1 w-full flex justify-center print:hidden pb-20 overflow-y-auto h-full bg-slate-300/30 rounded-xl p-8">
             <div className="origin-top scale-[0.5] sm:scale-[0.6] lg:scale-[0.85] xl:scale-100 transition-transform">
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