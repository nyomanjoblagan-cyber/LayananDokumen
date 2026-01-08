'use client';

import { useState, useRef, Suspense } from 'react';
import { 
  Printer, ArrowLeft, Plus, Trash2, 
  Users, Gavel, Home, ChevronDown, Check, LayoutTemplate
} from 'lucide-react';
import Link from 'next/link';

export default function AhliWarisPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium">Memuat Editor Ahli Waris...</div>}>
      <AhliWarisToolBuilder />
    </Suspense>
  );
}

function AhliWarisToolBuilder() {
  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);

  // DATA DEFAULT
  const [data, setData] = useState({
    city: 'Jakarta',
    date: new Date().toISOString().split('T')[0],
    
    deceasedName: 'H. Sudirman bin Kartoprawiro',
    deceasedDate: '2025-05-20',
    deceasedLocation: 'Jakarta',
    
    assetDescription: 'Sebidang tanah dan bangunan yang terletak di Jl. Mawar No. 45, Tebet, Jakarta Selatan dengan Sertifikat Hak Milik (SHM) No. 1234/Tebet seluas 250 m2.',
    
    heirs: [
      { name: 'Siti Aminah', age: '52', relation: 'Istri / Janda' },
      { name: 'Budi Santoso', age: '30', relation: 'Anak Kandung Pertama' },
      { name: 'Lestari Putri', age: '27', relation: 'Anak Kandung Kedua' },
    ],

    agreement: 'Bahwa seluruh Ahli Waris sepakat untuk memberikan kuasa penuh kepada Siti Aminah untuk melakukan proses balik nama dan/atau penjualan aset tersebut, yang mana hasilnya akan dibagikan sesuai dengan ketentuan hukum Waris yang disepakati.'
  });

  const handleHeirChange = (idx: number, field: string, val: string) => {
    const newHeirs = [...data.heirs];
    // @ts-ignore
    newHeirs[idx][field] = val;
    setData({ ...data, heirs: newHeirs });
  };

  const addHeir = () => setData({ ...data, heirs: [...data.heirs, { name: '', age: '', relation: '' }] });
  const removeHeir = (idx: number) => {
    const newHeirs = [...data.heirs];
    newHeirs.splice(idx, 1);
    setData({ ...data, heirs: newHeirs });
  };

  // --- KOMPONEN KERTAS (FIXED MELUBER) ---
  const Kertas = ({ children }: { children: React.ReactNode }) => (
    <div className="w-[210mm] min-h-[297mm] bg-white shadow-2xl p-[25mm] mx-auto text-[#1e293b] font-serif leading-relaxed text-[11pt] relative box-border mb-12 flex flex-col print:shadow-none print:m-0 print:p-[20mm] print:w-[210mm] print:min-h-0">
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-800 print:bg-white text-sm">
      <style jsx global>{`
        @media print {
          @page { size: A4; margin: 0mm; }
          body, html { margin: 0 !important; padding: 0 !important; background: white !important; overflow: visible !important; height: auto !important; }
          header, nav, aside, button, .no-print { display: none !important; }
          #main-content { padding: 0 !important; margin: 0 !important; display: block !important; height: auto !important; }
          #preview-container { padding: 0 !important; margin: 0 !important; overflow: visible !important; }
        }
      `}</style>

      {/* HEADER NAV */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16">
        <div className="max-w-[1600px] mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white transition-colors"><ArrowLeft size={18} /></Link>
            <div className="h-6 w-px bg-slate-700 mx-2"></div>
            <h1 className="text-sm font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2">
              <Users size={16} /> Kesepakatan Ahli Waris
            </h1>
          </div>
          <button onClick={() => window.print()} className="flex items-center gap-2 bg-emerald-600 text-white px-5 py-1.5 rounded-lg font-bold text-xs uppercase hover:bg-emerald-500 shadow-lg">
            <Printer size={16} /> Cetak
          </button>
        </div>
      </div>

      <div id="main-content" className="max-w-[1600px] mx-auto p-4 md:p-6 flex flex-col lg:flex-row gap-6 items-start h-[calc(100vh-64px)] overflow-hidden">
        
        {/* SIDEBAR INPUT */}
        <div className="no-print w-full lg:w-[420px] shrink-0 h-full overflow-y-auto pr-2 pb-20 space-y-6 font-sans">
          
          <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
             <h3 className="text-xs font-bold text-slate-700 uppercase flex items-center gap-2 border-b pb-2"><Gavel size={14}/> Keterangan Pewaris</h3>
             <div><label className="text-[10px] font-bold text-slate-400 uppercase">Nama Lengkap Pewaris</label><input type="text" className="w-full p-2 border rounded text-xs font-bold" value={data.deceasedName} onChange={e => setData({...data, deceasedName: e.target.value})} /></div>
             <div className="grid grid-cols-2 gap-3">
                <div><label className="text-[10px] font-bold text-slate-400 uppercase">Tgl Meninggal</label><input type="date" className="w-full p-2 border rounded text-xs" value={data.deceasedDate} onChange={e => setData({...data, deceasedDate: e.target.value})} /></div>
                <div><label className="text-[10px] font-bold text-slate-400 uppercase">Kota</label><input type="text" className="w-full p-2 border rounded text-xs" value={data.city} onChange={e => setData({...data, city: e.target.value})} /></div>
             </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
             <div className="flex justify-between items-center border-b pb-2">
                <h3 className="text-xs font-bold text-slate-700 uppercase flex items-center gap-2"><Users size={14}/> Daftar Ahli Waris</h3>
                <button onClick={addHeir} className="text-[9px] bg-emerald-100 text-emerald-700 px-2 py-1 rounded-md font-bold flex items-center gap-1 hover:bg-emerald-200"><Plus size={12}/> Tambah</button>
             </div>
             {data.heirs.map((heir, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-lg border relative group">
                   <button onClick={() => removeHeir(idx)} className="absolute -top-2 -right-2 bg-red-100 text-red-600 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12}/></button>
                   <input className="w-full p-1 bg-transparent border-b mb-2 text-xs font-bold" placeholder="Nama Lengkap" value={heir.name} onChange={e => handleHeirChange(idx, 'name', e.target.value)} />
                   <div className="grid grid-cols-2 gap-2">
                      <input className="w-full p-1 bg-transparent border-b text-[10px]" placeholder="Umur" value={heir.age} onChange={e => handleHeirChange(idx, 'age', e.target.value)} />
                      <input className="w-full p-1 bg-transparent border-b text-[10px]" placeholder="Hubungan" value={heir.relation} onChange={e => handleHeirChange(idx, 'relation', e.target.value)} />
                   </div>
                </div>
             ))}
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
             <h3 className="text-xs font-bold text-slate-700 uppercase flex items-center gap-2 border-b pb-2"><Home size={14}/> Aset & Kesepakatan</h3>
             <textarea className="w-full p-2 border rounded text-xs h-20 resize-none" placeholder="Deskripsi Aset" value={data.assetDescription} onChange={e => setData({...data, assetDescription: e.target.value})} />
             <textarea className="w-full p-2 border rounded text-xs h-24 resize-none" placeholder="Pernyataan Kesepakatan" value={data.agreement} onChange={e => setData({...data, agreement: e.target.value})} />
          </div>

        </div>

        {/* --- PREVIEW AREA (FIXED MELUBER) --- */}
        <div id="preview-container" className="flex-1 h-full bg-slate-300/50 rounded-xl flex justify-center p-4 md:p-8 overflow-y-auto print:p-0 print:bg-white print:overflow-visible">
          <div className="origin-top scale-[0.45] sm:scale-[0.6] lg:scale-[0.85] xl:scale-100 transition-transform">
            <Kertas>
              <div className="flex flex-col h-full font-serif text-[11pt] leading-normal text-justify">
                <div className="text-center mb-8 shrink-0">
                   <h1 className="font-black text-xl uppercase underline decoration-1 underline-offset-4">SURAT KESEPAKATAN BERSAMA AHLI WARIS</h1>
                </div>

                <div className="shrink-0">
                  <p className="mb-4">Kami yang bertanda tangan di bawah ini, adalah Ahli Waris yang sah dari Almarhum <strong>{data.deceasedName}</strong>, yang telah meninggal dunia pada tanggal {new Date(data.deceasedDate).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})} di {data.deceasedLocation}, dengan rincian sebagai berikut:</p>
                  
                  <table className="w-full mb-6 border-collapse text-sm">
                     <thead>
                        <tr className="bg-slate-50">
                           <th className="border border-slate-300 p-2 text-center w-10">No</th>
                           <th className="border border-slate-300 p-2 text-left">Nama Ahli Waris</th>
                           <th className="border border-slate-300 p-2 text-center w-20">Umur</th>
                           <th className="border border-slate-300 p-2 text-left">Hubungan Keluarga</th>
                        </tr>
                     </thead>
                     <tbody>
                        {data.heirs.map((heir, idx) => (
                          <tr key={idx}>
                             <td className="border border-slate-300 p-2 text-center">{idx + 1}</td>
                             <td className="border border-slate-300 p-2 font-bold uppercase">{heir.name || '...'}</td>
                             <td className="border border-slate-300 p-2 text-center">{heir.age || '0'} Thn</td>
                             <td className="border border-slate-300 p-2">{heir.relation || '...'}</td>
                          </tr>
                        ))}
                     </tbody>
                  </table>
                </div>

                <div className="flex-grow space-y-4">
                  <p>Bahwa semasa hidupnya, Almarhum <strong>{data.deceasedName}</strong> memiliki harta peninggalan berupa:</p>
                  <div className="bg-slate-50 p-4 border rounded italic text-sm">
                    {data.assetDescription || '...'}
                  </div>
                  <p>Terhadap harta peninggalan tersebut di atas, kami para Ahli Waris telah bersepakat secara mufakat dan tanpa paksaan dari pihak manapun untuk:</p>
                  <div className="bg-emerald-50/30 p-4 border border-emerald-100 rounded font-medium text-sm">
                    {data.agreement || '...'}
                  </div>
                  <p className="mt-4">Demikian surat kesepakatan ini kami buat dengan sebenarnya dalam keadaan sadar dan sehat jasmani maupun rohani untuk dapat dipergunakan sebagaimana mestinya.</p>
                </div>

                <div className="shrink-0 mt-8">
                   <p className="text-right mb-6">{data.city}, {new Date(data.date).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'})}</p>
                   <p className="font-bold mb-4 underline">KAMI PARA AHLI WARIS:</p>
                   <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                      {data.heirs.map((heir, idx) => (
                        <div key={idx} className="flex flex-col">
                           <span className="text-[10px] text-slate-400 mb-1">Ahli Waris {idx + 1}</span>
                           <div className="h-10 flex items-end">
                              {idx === 0 && <span className="border border-dashed border-slate-300 p-1 text-[7px] text-slate-400 mb-1">MATERAI 10.000</span>}
                           </div>
                           <p className="font-bold underline uppercase text-sm">{heir.name || '..........................'}</p>
                        </div>
                      ))}
                   </div>
                </div>
              </div>
            </Kertas>
          </div>
        </div>
      </div>
    </div>
  );
}