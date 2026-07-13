'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, RotateCcw, ArrowLeftCircle, BookOpen, Edit3, Plus, Trash2
} from 'lucide-react';
import Link from 'next/link';

// --- 1. TYPE DEFINITIONS ---
interface HandoverItem {
  id: string;
  name: string;
  quantity: string;
  remarks: string;
}

interface BastData {
  day: string;
  date: string;
  city: string;
  
  // Pihak 1 (Yang Menyerahkan)
  p1Name: string; p1Id: string; p1Job: string; p1Address: string; 
  
  // Pihak 2 (Yang Menerima)
  p2Name: string; p2Id: string; p2Job: string; p2Address: string;
  
  // Detail Serah Terima
  handoverType: string;
  items: HandoverItem[];
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: BastData = {
  day: 'Jumat',
  date: '2026-07-10', 
  city: 'Jakarta',
  
  p1Name: 'BAMBANG SUDARSO', p1Id: '3404010101740001', p1Job: 'Manager Operasional', p1Address: 'PT Maju Mundur, Jl. Sudirman No. 10, Jakarta', 
  
  p2Name: 'ANDI PRATAMA', p2Id: '3471010101960002', p2Job: 'Vendor IT', p2Address: 'PT Solusi Tekno, Jl. Thamrin No. 20, Jakarta',
  
  handoverType: 'Barang',
  items: [
    { id: '1', name: 'Laptop Lenovo Thinkpad T14', quantity: '1 Unit', remarks: 'Kondisi Baru (Segel)' },
    { id: '2', name: 'Mouse Wireless Logitech', quantity: '1 Unit', remarks: 'Warna Hitam' }
  ]
};

// --- 3. KOMPONEN UTAMA ---
export default function BastPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <BastBuilder />
    </Suspense>
  );
}

function BastBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<BastData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'pihak1' | 'pihak2' | 'objek'>('pihak1');

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  const handleDataChange = (field: keyof BastData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleItemChange = (index: number, field: keyof HandoverItem, val: string) => {
    const newItems = [...data.items];
    newItems[index] = { ...newItems[index], [field]: val };
    setData(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setData(prev => ({
      ...prev,
      items: [...prev.items, { id: Date.now().toString(), name: '', quantity: '', remarks: '' }]
    }));
  };

  const removeItem = (index: number) => {
    const newItems = data.items.filter((_, i) => i !== index);
    setData(prev => ({ ...prev, items: newItems }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal? Semua perubahan akan hilang.')) {
        setData({ ...INITIAL_DATA });
    }
  };

  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-slate-900 font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 h-auto ${className}`}>
      {children}
    </div>
  );

  const DocumentContent = () => {
    const formatDateSafe = (dateString: string) => {
        if(!dateString) return '...';
        return new Date(dateString).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
    };

    return (
      <div className="flex flex-col gap-8 print:gap-0">
          <Kertas className="print:w-full print:min-w-0">
              {/* HEADER */}
              <div className="text-center mb-10 pb-2 border-b-[3px] border-black border-double">
                  <h1 className="font-bold text-xl uppercase tracking-wider">BERITA ACARA SERAH TERIMA {data.handoverType.toUpperCase()}</h1>
              </div>
              
              {/* PREAMBLE */}
              <div className="mb-6 text-justify">
                  <p>
                      Pada hari ini, <strong>{data.day}</strong>, tanggal <strong>{formatDateSafe(data.date)}</strong>, bertempat di <strong>{data.city}</strong>, yang bertanda tangan di bawah ini:
                  </p>
              </div>

              {/* IDENTITAS PIHAK 1 */}
              <div className="flex flex-row mb-4 text-justify break-inside-avoid">
                  <div className="w-8 shrink-0 font-bold">I.</div>
                  <div className="flex-1">
                      <div className="flex flex-row">
                          <div className="w-56 shrink-0">Nama Lengkap</div>
                          <div className="w-4 shrink-0">:</div>
                          <div className="font-bold uppercase">{data.p1Name}</div>
                      </div>
                      <div className="flex flex-row">
                          <div className="w-56 shrink-0">Nomor Identitas (NIK/NIP)</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.p1Id}</div>
                      </div>
                      <div className="flex flex-row">
                          <div className="w-56 shrink-0">Jabatan / Pekerjaan</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.p1Job}</div>
                      </div>
                      <div className="flex flex-row">
                          <div className="w-56 shrink-0">Alamat / Instansi</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.p1Address}</div>
                      </div>
                      <div className="mt-2">
                          Yang selanjutnya dalam Berita Acara ini disebut sebagai <strong>PIHAK PERTAMA (YANG MENYERAHKAN)</strong>.
                      </div>
                  </div>
              </div>

              {/* IDENTITAS PIHAK 2 */}
              <div className="flex flex-row mb-6 text-justify break-inside-avoid">
                  <div className="w-8 shrink-0 font-bold">II.</div>
                  <div className="flex-1">
                      <div className="flex flex-row">
                          <div className="w-56 shrink-0">Nama Lengkap</div>
                          <div className="w-4 shrink-0">:</div>
                          <div className="font-bold uppercase">{data.p2Name}</div>
                      </div>
                      <div className="flex flex-row">
                          <div className="w-56 shrink-0">Nomor Identitas (NIK/NIP)</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.p2Id}</div>
                      </div>
                      <div className="flex flex-row">
                          <div className="w-56 shrink-0">Jabatan / Pekerjaan</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.p2Job}</div>
                      </div>
                      <div className="flex flex-row">
                          <div className="w-56 shrink-0">Alamat / Instansi</div>
                          <div className="w-4 shrink-0">:</div>
                          <div>{data.p2Address}</div>
                      </div>
                      <div className="mt-2">
                          Yang selanjutnya dalam Berita Acara ini disebut sebagai <strong>PIHAK KEDUA (YANG MENERIMA)</strong>.
                      </div>
                  </div>
              </div>

              {/* RECITALS */}
              <div className="mb-4 text-justify">
                  <p>PIHAK PERTAMA dan PIHAK KEDUA (selanjutnya secara bersama-sama disebut <strong>"PARA PIHAK"</strong>) dengan ini menerangkan bahwa PIHAK PERTAMA telah menyerahkan kepada PIHAK KEDUA, dan PIHAK KEDUA telah menerima dari PIHAK PERTAMA berupa {data.handoverType.toLowerCase()} dengan rincian sebagai berikut:</p>
              </div>

              {/* DETAIL BARANG / DOKUMEN / HASIL PEKERJAAN */}
              <div className="mb-6 break-inside-avoid">
                  <table className="w-full border-collapse border border-black text-sm text-left">
                      <thead>
                          <tr>
                              <th className="border border-black p-2 w-12 text-center">No.</th>
                              <th className="border border-black p-2">Keterangan / Nama {data.handoverType}</th>
                              <th className="border border-black p-2 w-32 text-center">Jumlah</th>
                              <th className="border border-black p-2 w-48 text-center">Catatan</th>
                          </tr>
                      </thead>
                      <tbody>
                          {data.items.length > 0 ? data.items.map((item, index) => (
                              <tr key={item.id}>
                                  <td className="border border-black p-2 text-center">{index + 1}.</td>
                                  <td className="border border-black p-2">{item.name}</td>
                                  <td className="border border-black p-2 text-center">{item.quantity}</td>
                                  <td className="border border-black p-2 text-center">{item.remarks}</td>
                              </tr>
                          )) : (
                              <tr>
                                  <td colSpan={4} className="border border-black p-4 text-center italic text-slate-500">Tidak ada rincian data.</td>
                              </tr>
                          )}
                      </tbody>
                  </table>
              </div>

              {/* KLAUSUL MUTLAK */}
              <div className="mb-8 text-justify">
                  <p className="font-bold underline">Kewajiban Penyerah dianggap selesai dan barang/pekerjaan diterima dalam kondisi baik.</p>
              </div>

              <div className="mb-12 mt-8 text-justify">
                  <p>Demikian Berita Acara Serah Terima ini dibuat dalam rangkap 2 (dua), masing-masing bermeterai cukup dan memiliki kekuatan hukum yang sama bagi PARA PIHAK.</p>
              </div>

              {/* TANDA TANGAN */}
              <div className="grid grid-cols-2 gap-8 text-center mt-12 break-inside-avoid pb-12">
                  <div>
                      <p className="mb-20 font-bold uppercase">PIHAK KEDUA (YANG MENERIMA)</p>
                      <p className="font-bold underline uppercase">{data.p2Name}</p>
                  </div>
                  <div>
                      <p className="mb-4 font-bold uppercase">PIHAK PERTAMA (YANG MENYERAHKAN)</p>
                      <div className="border-2 border-slate-300 border-dashed w-28 h-16 mx-auto mb-2 flex items-center justify-center text-[10px] text-slate-400 italic">METERAI<br/>Rp10.000,-</div>
                      <p className="font-bold underline uppercase">{data.p1Name}</p>
                  </div>
              </div>

          </Kertas>
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: absolute; top: 0; left: 0; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
          .break-before-auto { break-before: auto !important; page-break-before: auto !important; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-50 border-b border-slate-700 h-16 flex items-center px-4 justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-emerald-400" />
              <span className="text-xs font-bold uppercase tracking-widest hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-300 uppercase tracking-tighter">
               <BookOpen size={16} className="text-emerald-500" /> <span>Legal Draft - Berita Acara Serah Terima (BAST)</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { if(typeof window !== 'undefined') window.print(); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:block print:h-auto print:overflow-visible">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan Dokumen</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('pihak1')} className={`flex-1 py-3 border-r ${activeTab === 'pihak1' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Penyerah</button>
              <button onClick={() => setActiveTab('pihak2')} className={`flex-1 py-3 border-r ${activeTab === 'pihak2' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Penerima</button>
              <button onClick={() => setActiveTab('objek')} className={`flex-1 py-3 border-r ${activeTab === 'objek' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Rincian & Waktu</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32 print:block print:overflow-visible print:bg-white">
              
              {activeTab === 'pihak1' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Pihak Pertama (Yang Menyerahkan)</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.p1Name} onChange={e => handleDataChange('p1Name', e.target.value)} placeholder="Contoh: BAMBANG SUDARSO" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Identitas (NIK/NIP)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.p1Id} onChange={e => handleDataChange('p1Id', e.target.value)} placeholder="Contoh: 3404010101740001" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan / Pekerjaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.p1Job} onChange={e => handleDataChange('p1Job', e.target.value)} placeholder="Contoh: Manager Operasional" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat / Instansi</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.p1Address} onChange={e => handleDataChange('p1Address', e.target.value)} placeholder="Contoh: PT Maju Mundur, Jl. Sudirman No. 10, Jakarta" />
                </div>
              </div>
              )}

              {activeTab === 'pihak2' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Pihak Kedua (Yang Menerima)</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Lengkap</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.p2Name} onChange={e => handleDataChange('p2Name', e.target.value)} placeholder="Contoh: ANDI PRATAMA" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Identitas (NIK/NIP)</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.p2Id} onChange={e => handleDataChange('p2Id', e.target.value)} placeholder="Contoh: 3471010101960002" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan / Pekerjaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.p2Job} onChange={e => handleDataChange('p2Job', e.target.value)} placeholder="Contoh: Vendor IT" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat / Instansi</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.p2Address} onChange={e => handleDataChange('p2Address', e.target.value)} placeholder="Contoh: PT Solusi Tekno, Jl. Thamrin No. 20, Jakarta" />
                </div>
              </div>
              )}

              {activeTab === 'objek' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4">Rincian Serah Terima & Waktu</h3>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Hari</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.day} onChange={e => handleDataChange('day', e.target.value)} placeholder="Contoh: Senin" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.date} onChange={e => handleDataChange('date', e.target.value)} />
                  </div>
                  <div className="col-span-2">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat / Kota</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.city} onChange={e => handleDataChange('city', e.target.value)} placeholder="Contoh: Jakarta" />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jenis Serah Terima</label>
                  <select className="w-full p-2 border rounded-lg text-sm mt-1 bg-white font-bold" value={data.handoverType} onChange={e => handleDataChange('handoverType', e.target.value)}>
                      <option value="Barang">Barang</option>
                      <option value="Dokumen">Dokumen</option>
                      <option value="Hasil Pekerjaan">Hasil Pekerjaan</option>
                  </select>
                </div>

                <div className="pt-4 border-t mt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-[10px] font-bold text-emerald-700 uppercase">Daftar {data.handoverType}</h4>
                    <button onClick={addItem} className="flex items-center gap-1 text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded hover:bg-emerald-200 transition-colors">
                      <Plus size={12} /> Tambah
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {data.items.map((item, index) => (
                      <div key={item.id} className="p-3 border rounded-lg bg-slate-50 relative">
                        <button onClick={() => removeItem(index)} className="absolute top-2 right-2 text-slate-400 hover:text-red-500" title="Hapus Item"><Trash2 size={14}/></button>
                        <div className="space-y-2">
                          <div>
                            <label className="text-[9px] text-slate-500 uppercase font-bold">Keterangan / Nama {data.handoverType}</label>
                            <input className="w-full p-2 border rounded-md text-xs mt-1" value={item.name} onChange={e => handleItemChange(index, 'name', e.target.value)} placeholder={`Contoh: Nama ${data.handoverType}`} />
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="text-[9px] text-slate-500 uppercase font-bold">Jumlah</label>
                              <input className="w-full p-2 border rounded-md text-xs mt-1" value={item.quantity} onChange={e => handleItemChange(index, 'quantity', e.target.value)} placeholder="Contoh: 1 Unit / 1 Berkas" />
                            </div>
                            <div>
                              <label className="text-[9px] text-slate-500 uppercase font-bold">Catatan</label>
                              <input className="w-full p-2 border rounded-md text-xs mt-1" value={item.remarks} onChange={e => handleItemChange(index, 'remarks', e.target.value)} placeholder="Contoh: Baik / Asli" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    {data.items.length === 0 && (
                      <div className="text-center p-4 border border-dashed rounded-lg text-slate-400 text-xs">
                        Belum ada daftar {data.handoverType.toLowerCase()}. Silakan tambah item.
                      </div>
                    )}
                  </div>
                </div>

              </div>
              )}

           </div>

           {/* Mobile Navigation Toggles */}
           <div className="md:hidden border-t p-4 bg-white flex gap-2 no-print">
              <button onClick={() => setMobileView('preview')} className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold text-xs">Lihat Dokumen</button>
           </div>
        </div>

        {/* PANEL KANAN: PREVIEW DOKUMEN */}
        <div className={`flex-1 bg-slate-200 overflow-y-auto relative transition-transform ${mobileView === 'editor' ? 'translate-x-full md:translate-x-0 hidden md:block' : 'translate-x-0 block'} md:block print:block print:overflow-visible print:bg-white print:static`}>
          
          <div className="md:hidden sticky top-0 bg-slate-800 text-white p-3 z-10 flex justify-between items-center shadow-md no-print">
            <span className="text-xs font-bold uppercase">Preview Dokumen</span>
            <button onClick={() => setMobileView('editor')} className="bg-slate-700 px-3 py-1 rounded text-xs font-bold hover:bg-slate-600">Kembali ke Editor</button>
          </div>

          <div className="p-4 md:p-8 min-h-full flex flex-col items-center justify-start print:p-0">
             <div id="print-only-root" className="w-full flex justify-center print:h-auto print:static">
                <DocumentContent />
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}