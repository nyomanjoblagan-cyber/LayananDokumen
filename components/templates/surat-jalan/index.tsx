'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeftCircle, Edit3, RotateCcw, Truck, Plus, Trash2, FileText, BookOpen
} from 'lucide-react';
import Link from 'next/link';

// --- 1. TYPE DEFINITIONS ---
interface SuratJalanItem {
  id: string;
  nama: string;
  qty: number;
  satuan: string;
}

interface SuratJalanData {
  noSurat: string;
  tanggal: string;
  pengirim: string;
  penerima: string;
  alamatPenerima: string;
  supir: string;
  platKendaraan: string;
  keterangan: string;
  items: SuratJalanItem[];
}

// --- 2. DATA DEFAULT ---
const INITIAL_DATA: SuratJalanData = {
  noSurat: 'SJ-20260711-001',
  tanggal: '2026-07-11',
  pengirim: 'PT. MAJU BERSAMA',
  penerima: 'TOKO SENTOSA',
  alamatPenerima: 'Jl. Merdeka No. 45, Jakarta Selatan',
  supir: 'Budi Santoso',
  platKendaraan: 'B 1234 CD',
  keterangan: 'Harap dikirim sebelum jam 17:00 WIB',
  items: [
    { id: '1', nama: 'Semen Portland 50kg', qty: 100, satuan: 'Sak' },
    { id: '2', nama: 'Besi Beton 12mm', qty: 50, satuan: 'Batang' },
  ]
};

// --- 3. KOMPONEN UTAMA ---
export default function SuratJalanPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Editor...</div>}>
      <SuratJalanBuilder />
    </Suspense>
  );
}

function SuratJalanBuilder() {
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<SuratJalanData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'info' | 'barang'>('info');
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDataChange = (field: keyof SuratJalanData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleItemChange = (id: string, field: keyof SuratJalanItem, val: any) => {
    setData(prev => ({
      ...prev,
      items: prev.items.map(item => item.id === id ? { ...item, [field]: val } : item)
    }));
  };

  const addItem = () => {
    setData(prev => ({
      ...prev,
      items: [...prev.items, { id: Date.now().toString(), nama: '', qty: 1, satuan: 'Pcs' }]
    }));
  };

  const removeItem = (id: string) => {
    setData(prev => ({
      ...prev,
      items: prev.items.filter(item => item.id !== id)
    }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal? Semua perubahan akan hilang.')) {
        setData({ ...INITIAL_DATA });
    }
  };

  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[15mm] print:p-0 text-slate-900 font-sans leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 h-auto ${className}`}>
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
              {/* HEADER SURAT JALAN */}
              <div className="flex justify-between items-start border-b-[3px] border-black pb-4 mb-6">
                  <div>
                      <h1 className="font-bold text-3xl uppercase tracking-wider mb-2">SURAT JALAN</h1>
                      <div className="text-sm">
                          <table className="w-full text-left">
                              <tbody>
                                  <tr>
                                      <td className="w-24 font-semibold py-1">No. Surat</td>
                                      <td className="w-4 py-1">:</td>
                                      <td className="py-1">{data.noSurat || '-'}</td>
                                  </tr>
                                  <tr>
                                      <td className="w-24 font-semibold py-1">Tanggal</td>
                                      <td className="w-4 py-1">:</td>
                                      <td className="py-1">{formatDateSafe(data.tanggal)}</td>
                                  </tr>
                              </tbody>
                          </table>
                      </div>
                  </div>
                  <div className="w-72">
                      <div className="border border-black p-3 text-sm min-h-[100px]">
                          <p className="font-semibold mb-1 border-b border-black pb-1 inline-block">Kepada Yth:</p>
                          <p className="font-bold uppercase mt-1">{data.penerima || '...'}</p>
                          <p className="whitespace-pre-line mt-1">{data.alamatPenerima || '...'}</p>
                      </div>
                  </div>
              </div>

              {/* KETERANGAN PENGIRIMAN */}
              <div className="mb-6 text-sm">
                  <table className="w-full text-left">
                      <tbody>
                          <tr>
                              <td className="w-32 font-semibold py-1">Pengirim</td>
                              <td className="w-4 py-1">:</td>
                              <td className="py-1 font-bold uppercase">{data.pengirim || '-'}</td>
                          </tr>
                          <tr>
                              <td className="w-32 font-semibold py-1">Supir</td>
                              <td className="w-4 py-1">:</td>
                              <td className="py-1 uppercase">{data.supir || '-'}</td>
                          </tr>
                          <tr>
                              <td className="w-32 font-semibold py-1">Plat Kendaraan</td>
                              <td className="w-4 py-1">:</td>
                              <td className="py-1 uppercase font-semibold">{data.platKendaraan || '-'}</td>
                          </tr>
                          <tr>
                              <td className="w-32 font-semibold py-1 align-top">Keterangan</td>
                              <td className="w-4 py-1 align-top">:</td>
                              <td className="py-1">{data.keterangan || '-'}</td>
                          </tr>
                      </tbody>
                  </table>
              </div>

              {/* DAFTAR BARANG */}
              <div className="mb-10">
                  <p className="mb-3 text-sm">Bersama ini kami kirimkan barang-barang sebagai berikut:</p>
                  <table className="w-full border-collapse border border-black text-sm">
                      <thead>
                          <tr className="bg-slate-100 print:bg-transparent">
                              <th className="border border-black px-3 py-2 w-12 text-center">NO</th>
                              <th className="border border-black px-3 py-2 text-left">NAMA BARANG</th>
                              <th className="border border-black px-3 py-2 w-24 text-center">QTY</th>
                              <th className="border border-black px-3 py-2 w-32 text-center">SATUAN</th>
                          </tr>
                      </thead>
                      <tbody>
                          {data.items.length === 0 ? (
                              <tr>
                                  <td colSpan={4} className="border border-black px-3 py-8 text-center italic text-slate-500">Belum ada barang yang ditambahkan</td>
                              </tr>
                          ) : (
                              data.items.map((item, index) => (
                                  <tr key={item.id}>
                                      <td className="border border-black px-3 py-2 text-center">{index + 1}</td>
                                      <td className="border border-black px-3 py-2">{item.nama}</td>
                                      <td className="border border-black px-3 py-2 text-center">{item.qty}</td>
                                      <td className="border border-black px-3 py-2 text-center">{item.satuan}</td>
                                  </tr>
                              ))
                          )}
                      </tbody>
                  </table>
              </div>

              {/* TANDA TANGAN */}
              <div className="w-full mt-16 break-inside-avoid">
                  <table className="w-full text-center text-sm border-collapse">
                      <tbody>
                          <tr>
                              <td className="w-1/3 pb-24 align-top font-semibold">Penerima,</td>
                              <td className="w-1/3 pb-24 align-top font-semibold">Supir,</td>
                              <td className="w-1/3 pb-24 align-top font-semibold">Pengirim,</td>
                          </tr>
                          <tr>
                              <td className="align-bottom">
                                  <div className="border-b border-black w-48 mx-auto"></div>
                                  <div className="mt-2 font-bold uppercase">{data.penerima}</div>
                              </td>
                              <td className="align-bottom">
                                  <div className="border-b border-black w-48 mx-auto"></div>
                                  <div className="mt-2 font-bold uppercase">{data.supir}</div>
                                  <div className="text-xs mt-1 uppercase">({data.platKendaraan})</div>
                              </td>
                              <td className="align-bottom">
                                  <div className="border-b border-black w-48 mx-auto"></div>
                                  <div className="mt-2 font-bold uppercase">{data.pengirim}</div>
                              </td>
                          </tr>
                      </tbody>
                  </table>
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
               <Truck size={16} className="text-emerald-500" /> <span>Template - Surat Jalan</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="md:hidden flex bg-slate-800 rounded-lg p-1">
                <button onClick={() => setMobileView('editor')} className={`px-3 py-1 text-xs font-bold rounded ${mobileView === 'editor' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}>Form</button>
                <button onClick={() => setMobileView('preview')} className={`px-3 py-1 text-xs font-bold rounded ${mobileView === 'preview' ? 'bg-slate-700 text-white' : 'text-slate-400'}`}>Preview</button>
             </div>
            <button onClick={() => { if(typeof window !== 'undefined') window.print(); }} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)]">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan Dokumen</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex border-b bg-slate-100 text-[10px] font-bold uppercase">
              <button onClick={() => setActiveTab('info')} className={`flex-1 py-3 border-r ${activeTab === 'info' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Informasi</button>
              <button onClick={() => setActiveTab('barang')} className={`flex-1 py-3 ${activeTab === 'barang' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Daftar Barang</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32">
              
              {activeTab === 'info' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Informasi Pengiriman</h3>
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">No. Surat</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1 uppercase font-semibold" value={data.noSurat} onChange={e => handleDataChange('noSurat', e.target.value)} placeholder="Contoh: SJ-001" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Pengiriman</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tanggal} onChange={e => handleDataChange('tanggal', e.target.value)} />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Pengirim</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1 uppercase" value={data.pengirim} onChange={e => handleDataChange('pengirim', e.target.value)} placeholder="Nama Perusahaan / Toko" />
                </div>

                <div className="border-t pt-4 mt-2">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-2">Tujuan Pengiriman</h4>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Penerima</label>
                    <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1 uppercase" value={data.penerima} onChange={e => handleDataChange('penerima', e.target.value)} placeholder="Nama Pembeli / Toko Tujuan" />
                  </div>
                  <div className="mt-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Penerima</label>
                    <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.alamatPenerima} onChange={e => handleDataChange('alamatPenerima', e.target.value)} placeholder="Alamat lengkap tujuan pengiriman" />
                  </div>
                </div>

                <div className="border-t pt-4 mt-2">
                  <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-2">Informasi Kendaraan & Supir</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Supir</label>
                      <input className="w-full p-2 border rounded-lg text-sm mt-1 uppercase font-semibold" value={data.supir} onChange={e => handleDataChange('supir', e.target.value)} placeholder="Nama Supir" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase">Plat Kendaraan</label>
                      <input className="w-full p-2 border rounded-lg text-sm mt-1 uppercase font-semibold" value={data.platKendaraan} onChange={e => handleDataChange('platKendaraan', e.target.value)} placeholder="B 1234 CD" />
                    </div>
                  </div>
                  <div className="mt-3">
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Keterangan Tambahan</label>
                    <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-16" value={data.keterangan} onChange={e => handleDataChange('keterangan', e.target.value)} placeholder="Contoh: Harap dikirim sebelum jam 17:00 WIB" />
                  </div>
                </div>

              </div>
              )}

              {activeTab === 'barang' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div className="flex justify-between items-center border-b pb-1 mb-4">
                    <h3 className="text-xs font-black uppercase text-emerald-600">Daftar Barang</h3>
                    <button onClick={addItem} className="text-[10px] font-bold bg-emerald-100 text-emerald-700 px-2 py-1 rounded flex items-center gap-1 hover:bg-emerald-200 transition-colors">
                        <Plus size={12} /> Tambah
                    </button>
                </div>

                <div className="space-y-3">
                    {data.items.length === 0 && (
                        <div className="text-center p-6 border-2 border-dashed rounded-lg text-slate-400">
                            <FileText className="mx-auto mb-2 opacity-50" />
                            <p className="text-xs">Belum ada barang.<br/>Klik Tambah untuk memasukkan barang.</p>
                        </div>
                    )}
                    {data.items.map((item, idx) => (
                        <div key={item.id} className="p-3 border rounded-lg bg-slate-50 relative group">
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button onClick={() => removeItem(item.id)} className="text-red-500 hover:bg-red-100 p-1 rounded">
                                    <Trash2 size={14} />
                                </button>
                            </div>
                            <div className="flex gap-2 items-center mb-2">
                                <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">{idx + 1}</div>
                                <div className="flex-1">
                                    <input className="w-full p-2 border rounded text-sm font-semibold" value={item.nama} onChange={e => handleItemChange(item.id, 'nama', e.target.value)} placeholder="Nama Barang" />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-2 pl-8">
                                <div>
                                    <label className="text-[9px] font-bold text-slate-500 uppercase">Qty</label>
                                    <input type="number" className="w-full p-2 border rounded text-sm font-semibold" value={item.qty} onChange={e => handleItemChange(item.id, 'qty', parseInt(e.target.value) || 0)} placeholder="1" />
                                </div>
                                <div>
                                    <label className="text-[9px] font-bold text-slate-500 uppercase">Satuan</label>
                                    <input className="w-full p-2 border rounded text-sm" value={item.satuan} onChange={e => handleItemChange(item.id, 'satuan', e.target.value)} placeholder="Pcs, Kg, Dus" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
              </div>
              )}

           </div>
        </div>

        {/* PANEL KANAN: PREVIEW DOKUMEN */}
        <div className={`w-full md:flex-1 bg-slate-300 md:overflow-y-auto flex justify-center py-0 md:py-8 absolute md:relative z-0 h-full transition-transform ${mobileView === 'editor' ? 'translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
          <div id="print-only-root" className="w-full flex justify-center">
             <DocumentContent />
          </div>
        </div>

      </main>
    </div>
  );
}