'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, ShieldAlert, Building2, UserCircle2, 
  LayoutTemplate, X, ShieldCheck, ClipboardList, PackageX, Coins, AlertCircle, Edit3, Eye, Check, ChevronDown
} from 'lucide-react';
import Link from 'next/link';
import AdsterraBanner from '@/components/AdsterraBanner'; 

export default function KlaimAsuransiPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Klaim Asuransi...</div>}>
      <InsuranceClaimBuilder />
    </Suspense>
  );
}

function InsuranceClaimBuilder() {
  // --- STATE SYSTEM ---
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Jakarta',
    date: '',
    docNo: 'CLAIMS/EXP-001/I/2026',
    insuranceName: 'PT. ASURANSI JIWA BERSAMA',
    courierName: 'JNE Express / Logistik ABC',
    awbNumber: 'AWB-123456789XYZ',
    claimantName: 'BUDI SETIAWAN',
    claimantPhone: '0812-3456-7890',
    claimantAddress: 'Jl. Melati No. 45, Jakarta Selatan',
    incidentDate: '',
    incidentType: 'Barang Rusak Total (Total Loss)',
    itemDescription: '1 Unit Laptop MacBook Pro M3 14 Inch',
    claimAmount: 'Rp 28.500.000,-',
    chronology: 'Paket diterima dalam kondisi box penyok parah dan basah. Setelah dibuka, layar laptop pecah dan perangkat tidak dapat menyala (mati total). Sudah dikonfirmasi oleh kurir saat serah terima.',
    witnessName: 'ANDRI (Kurir/Staff Cargo)'
  });

  useEffect(() => {
    setIsClient(true);
    const today = new Date();
    const incident = new Date();
    incident.setDate(today.getDate() - 3);

    setData(prev => ({ 
        ...prev, 
        date: today.toISOString().split('T')[0],
        incidentDate: incident.toISOString().split('T')[0]
    }));
  }, []);

  const handleDataChange = (field: string, val: any) => setData({ ...data, [field]: val });

  const TEMPLATES = [
    { id: 1, name: "Format Standar Logistik", desc: "Klaim kerusakan/kehilangan barang kiriman" },
    { id: 2, name: "Format Umum", desc: "Klaim asuransi properti/kendaraan umum" }
  ];
  const activeTemplateName = TEMPLATES.find(t => t.id === templateId)?.name;

  // --- KOMPONEN ISI SURAT ---
  const ClaimContent = () => (
    // SETTING: text-[10.5pt], leading-normal, padding 20mm (Titik tengah pas)
    <div className="bg-white flex flex-col box-border font-serif text-slate-900 leading-normal text-[10.5pt] p-[20mm] w-[210mm] min-h-[296mm] shadow-2xl print:shadow-none print:m-0">
      
      {/* JUDUL */}
      <div className="text-center mb-8 shrink-0">
        <h1 className="text-xl font-black underline uppercase decoration-2 underline-offset-8">SURAT PERNYATAAN KLAIM ASURANSI</h1>
        <p className="text-[10pt] font-sans mt-3 italic uppercase tracking-widest text-slate-500">Logistik & Pengiriman Barang</p>
        <p className="text-[9pt] font-sans font-bold mt-1">Nomor Pengajuan: {data.docNo}</p>
      </div>

      {/* ISI SURAT */}
      <div className="flex-grow">
        <div className="mb-6">
            <p>Kepada Yth,</p>
            <p><b>Bagian Klaim {data.insuranceName}</b></p>
            <p>Di Tempat</p>
        </div>
        
        <p className="mb-4">Dengan hormat,</p>
        <p className="mb-4">Saya yang bertanda tangan di bawah ini mengajukan permohonan klaim atas kerusakan/kehilangan barang pengiriman dengan rincian data sebagai berikut:</p>
        
        {/* DATA PEMOHON */}
        <div className="ml-4 mb-6 space-y-1.5 font-sans text-[10pt] border-l-4 border-red-200 pl-6 italic">
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Pemohon</span><span>:</span><span className="font-bold uppercase">{data.claimantName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>No. Resi (AWB)</span><span>:</span><span className="font-bold">{data.awbNumber}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Ekspedisi</span><span>:</span><span>{data.courierName}</span></div>
            <div className="grid grid-cols-[140px_10px_1fr]"><span>Tanggal Kejadian</span><span>:</span><span>{isClient && data.incidentDate ? new Date(data.incidentDate).toLocaleDateString('id-ID', {dateStyle: 'long'}) : '...'}</span></div>
        </div>

        {/* DETAIL OBJEK - Padding disesuaikan (p-5) */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 font-sans text-[10pt] mb-6 print:bg-transparent print:border-black">
            <p className="font-black text-red-600 uppercase text-[9pt] mb-2 tracking-widest print:text-black border-b border-slate-300 pb-1 print:border-black">Detail Objek Klaim</p>
            <div className="space-y-1">
                <div className="grid grid-cols-[140px_10px_1fr]"><span>Jenis Kerugian</span><span>:</span><span className="font-bold">{data.incidentType}</span></div>
                <div className="grid grid-cols-[140px_10px_1fr]"><span>Nama Barang</span><span>:</span><span>{data.itemDescription}</span></div>
                <div className="grid grid-cols-[140px_10px_1fr] text-blue-700 print:text-black"><span>Nilai Klaim</span><span>:</span><span className="font-black text-[11pt]">{data.claimAmount}</span></div>
            </div>
        </div>

        <div className="mb-6">
            <p className="font-bold underline mb-2">Kronologi Kejadian:</p>
            <p className="text-slate-800 bg-white p-2 italic leading-relaxed">"{data.chronology}"</p>
        </div>

        <p className="text-justify mb-4">Bersama ini saya lampirkan bukti foto kerusakan, faktur pembelian barang, dan dokumen pendukung lainnya. Demikian permohonan ini saya buat dengan sebenar-benarnya untuk diproses lebih lanjut.</p>
      </div>

      {/* TANDA TANGAN SIMETRIS */}
      <div className="shrink-0 mt-6" style={{ pageBreakInside: 'avoid' }}>
        <table className="w-full table-fixed border-none">
          <tbody>
            <tr>
              <td className="w-1/2"></td>
              <td className="text-center font-bold text-[10.5pt] pb-8">
                {data.city}, {isClient && data.date ? new Date(data.date).toLocaleDateString('id-ID', {day: 'numeric', month: 'long', year: 'numeric'}) : '...'}
              </td>
            </tr>
            <tr className="text-[9pt] font-black text-slate-500 uppercase tracking-widest text-center print:text-black">
              <td className="pb-4">Saksi / Petugas Lapangan,</td>
              <td className="pb-4">Pemohon Klaim,</td>
            </tr>
            <tr>
              <td className="text-center align-bottom">
                <div className="h-24 flex flex-col justify-end items-center">
                   <p className="font-bold underline uppercase">({data.witnessName})</p>
                </div>
              </td>
              <td className="text-center align-bottom">
                <div className="h-24 flex flex-col justify-end items-center">
                   <div className="border border-slate-300 w-24 h-12 flex items-center justify-center text-[7pt] text-slate-400 italic mb-2 print:border-black print:text-black">MATERAI 10.000</div>
                   <p className="font-bold underline uppercase text-[10.5pt]">{data.claimantName}</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  if (!isClient) return <div className="flex h-screen items-center justify-center font-sans text-slate-400">Memuat...</div>;

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 print:bg-white print:m-0">
      
      {/* GLOBAL CSS PRINT */}
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0; } 
          body { background: white; margin: 0; padding: 0; }
          .no-print { display: none !important; }
          #print-only-root { 
            display: block !important; 
            position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; 
          }
        }
      `}</style>

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 font-sans">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 font-bold uppercase tracking-widest text-xs">
               <ArrowLeft size={18} /> Dashboard
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300">
               <ShieldAlert size={16} className="text-red-500" /> <span>INSURANCE CLAIM BUILDER</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-1.5 rounded-lg border border-slate-700 text-xs font-medium min-w-[160px] justify-between transition-all">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide"><LayoutTemplate size={14} className="text-blue-400" /><span>{activeTemplateName}</span></div>
                <ChevronDown size={12} className={showTemplateMenu ? 'rotate-180 transition-all' : 'transition-all'} />
              </button>
              {showTemplateMenu && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-slate-200 overflow-hidden z-50 text-slate-900">
                  <div className="bg-slate-50 px-3 py-2 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Pilih Template</div>
                  {TEMPLATES.map((t) => (
                    <button key={t.id} onClick={() => { setTemplateId(t.id); setShowTemplateMenu(false); }} className={`w-full text-left px-4 py-3 text-sm flex items-center justify-between hover:bg-blue-50 transition-colors ${templateId === t.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-slate-700'}`}>
                      <div><div className="font-bold">{t.name}</div><div className="text-[10px] text-slate-400 mt-0.5">{t.desc}</div></div>
                      {templateId === t.id && <Check size={14} className="text-blue-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-500 transition-all shadow-lg active:scale-95">
              <Printer size={16} /> <span className="hidden md:inline">Print</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        
        {/* SIDEBAR INPUT */}
        <div className={`no-print w-full lg:w-[450px] bg-slate-50 border-r border-slate-200 flex flex-col h-full z-10 transition-transform duration-300 absolute lg:relative shadow-xl lg:shadow-none ${mobileView === 'preview' ? '-translate-x-full lg:translate-x-0' : 'translate-x-0'}`}>
           <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 pb-20 custom-scrollbar">
             
              <div className="md:hidden flex justify-center pb-4 border-b border-dashed border-slate-200"><AdsterraBanner adKey="8fd377728513d5d23b9caf7a2bba1a73" width={320} height={50} /></div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-blue-600 border-b pb-1 flex items-center gap-2"><ClipboardList size={12}/> Data Pengiriman</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold uppercase" value={data.insuranceName} onChange={e => handleDataChange('insuranceName', e.target.value)} />
                 <input className="w-full p-2 border rounded text-xs" value={data.awbNumber} onChange={e => handleDataChange('awbNumber', e.target.value)} placeholder="Nomor Resi / AWB" />
                 <input className="w-full p-2 border rounded text-xs" value={data.courierName} onChange={e => handleDataChange('courierName', e.target.value)} placeholder="Nama Ekspedisi" />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-red-600 border-b pb-1 flex items-center gap-2"><AlertCircle size={12}/> Detail Kejadian</h3>
                 <div className="grid grid-cols-2 gap-2">
                    <input type="date" className="w-full p-2 border rounded text-[10px]" value={data.incidentDate} onChange={e => handleDataChange('incidentDate', e.target.value)} />
                    <select className="w-full p-2 border rounded text-xs" value={data.incidentType} onChange={e => handleDataChange('incidentType', e.target.value)}>
                        <option>Barang Rusak Total (Total Loss)</option>
                        <option>Barang Rusak Sebagian</option>
                        <option>Barang Hilang / Tidak Sampai</option>
                    </select>
                 </div>
                 <input className="w-full p-2 border rounded text-xs" value={data.itemDescription} onChange={e => handleDataChange('itemDescription', e.target.value)} placeholder="Deskripsi Barang" />
                 <textarea className="w-full p-2 border rounded text-xs h-24 resize-none leading-relaxed" value={data.chronology} onChange={e => handleDataChange('chronology', e.target.value)} />
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 space-y-4">
                 <h3 className="text-[10px] font-black uppercase text-emerald-600 border-b pb-1 flex items-center gap-2"><Coins size={12}/> Nilai & Otoritas</h3>
                 <input className="w-full p-2 border rounded text-xs font-bold text-emerald-700 bg-emerald-50" value={data.claimAmount} onChange={e => handleDataChange('claimAmount', e.target.value)} placeholder="Total Nilai Klaim" />
                 <input className="w-full p-2 border rounded text-xs font-bold" value={data.claimantName} onChange={e => handleDataChange('claimantName', e.target.value)} />
                 <input className="w-full p-2 border rounded text-xs" value={data.witnessName} onChange={e => handleDataChange('witnessName', e.target.value)} />
                 <input className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => handleDataChange('city', e.target.value)} />
              </div>
              <div className="h-20 md:hidden"></div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className={`no-print flex-1 bg-slate-200/50 relative overflow-hidden flex flex-col items-center ${mobileView === 'editor' ? 'hidden lg:flex' : 'flex'}`}>
            <div className="flex-1 overflow-y-auto w-full flex justify-center p-4 md:p-8 custom-scrollbar">
               <div className="origin-top transition-transform duration-300 transform scale-[0.55] md:scale-[0.85] lg:scale-100 mb-[-130mm] md:mb-[-20mm] lg:mb-0 shadow-2xl flex flex-col items-center">
                 <div style={{ width: '210mm' }}>
                    <ClaimContent />
                 </div>
               </div>
            </div>
        </div>
      </main>

      {/* MOBILE NAV */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl border border-white/10 flex p-1.5 font-sans">
         <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'editor' ? 'bg-white text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}><Edit3 size={16}/> Editor</button>
         <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl flex items-center justify-center gap-2 text-xs font-bold transition-all ${mobileView === 'preview' ? 'bg-emerald-500 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}><Eye size={16}/> Preview</button>
      </div>

      {/* PRINT AREA */}
      <div id="print-only-root" className="hidden">
         <div className="flex flex-col">
            <ClaimContent />
         </div>
      </div>

    </div>
  );
}