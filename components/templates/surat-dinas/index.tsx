'use client';

import { useState, Suspense, useEffect } from 'react';
import { 
  Printer, ArrowLeft, Edit3, RotateCcw, ArrowLeftCircle, BookOpen, Users, MapPin, CalendarDays, Car
} from 'lucide-react';
import Link from 'next/link';

interface SuratDinasData {
  kopInstansi: string;
  kopAlamat: string;
  kopKontak: string;
  
  nomorSurat: string;
  sifat: string;
  lampiran: string;
  perihal: string;
  tempatTerbit: string;
  tanggalSurat: string;

  pegawaiNama: string;
  pegawaiNip: string;
  pegawaiPangkat: string;
  pegawaiJabatan: string;

  tujuanInstansi: string;
  tujuanKota: string;
  agenda: string;

  tanggalBerangkat: string;
  tanggalKembali: string;
  waktuPelaksanaan: string;

  jenisKendaraan: string;

  ttdJabatan: string;
  ttdNama: string;
  ttdNip: string;
}

const INITIAL_DATA: SuratDinasData = {
  kopInstansi: 'PEMERINTAH KABUPATEN SLEMAN\nDINAS KOMUNIKASI DAN INFORMATIKA',
  kopAlamat: 'Jalan Parasamya No. 1, Beran, Tridadi, Sleman, Yogyakarta 55511',
  kopKontak: 'Telepon: (0274) 868405, Faksimile: (0274) 868405\nEmail: diskominfo@slemankab.go.id, Website: diskominfo.slemankab.go.id',
  
  nomorSurat: '090/123/KOMINFO/2026',
  sifat: 'Biasa',
  lampiran: '-',
  perihal: 'Surat Tugas Perjalanan Dinas',
  tempatTerbit: 'Sleman',
  tanggalSurat: '2026-07-11',

  pegawaiNama: 'Budi Santoso, S.Kom., M.Eng.',
  pegawaiNip: '19850101 201001 1 001',
  pegawaiPangkat: 'Penata Tk. I (III/d)',
  pegawaiJabatan: 'Kepala Bidang Infrastruktur TIK',

  tujuanInstansi: 'Kementerian Komunikasi dan Informatika RI',
  tujuanKota: 'Jakarta Pusat',
  agenda: 'Koordinasi dan Konsultasi Teknis Pengembangan Smart City',

  tanggalBerangkat: '2026-07-15',
  tanggalKembali: '2026-07-17',
  waktuPelaksanaan: '08:00 WIB s.d. Selesai',

  jenisKendaraan: 'Pesawat Udara (Komersial) & Kendaraan Dinas',

  ttdJabatan: 'KEPALA DINAS',
  ttdNama: 'Drs. Supriyanto, M.M.',
  ttdNip: '19700510 199503 1 005',
};

export default function SuratDinasPage() {
  return (
    <Suspense fallback={<div className="flex h-screen items-center justify-center text-slate-400 font-medium bg-slate-50">Memuat Legal Editor...</div>}>
      <SuratDinasBuilder />
    </Suspense>
  );
}

function SuratDinasBuilder() {
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<SuratDinasData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'kop' | 'pegawai' | 'tujuan' | 'waktu' | 'kendaraan' | 'ttd'>('kop');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDataChange = (field: keyof SuratDinasData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal? Semua perubahan akan hilang.')) {
        setData({ ...INITIAL_DATA });
    }
  };

  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-black font-serif leading-relaxed text-[11pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[296mm] print:min-h-0 h-auto ${className}`}>
      {children}
    </div>
  );

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  const DocumentContent = () => (
    <div className="flex flex-col gap-8 print:gap-0">
        <Kertas className="print:w-full print:min-w-0">
            {/* KOP SURAT */}
            <div className="flex flex-col items-center border-b-[3px] border-black pb-2 mb-1">
                <div className="border-b-[1px] border-black w-full pb-2 flex flex-col items-center text-center">
                    <h1 className="font-bold text-lg whitespace-pre-wrap leading-tight">{data.kopInstansi}</h1>
                    <p className="text-sm mt-1 whitespace-pre-wrap">{data.kopAlamat}</p>
                    <p className="text-xs mt-1 whitespace-pre-wrap">{data.kopKontak}</p>
                </div>
            </div>
            
            {/* HEADER SURAT */}
            <div className="flex justify-between mt-6">
                <div>
                    <table className="w-full text-justify">
                        <tbody>
                            <tr>
                                <td className="w-24 align-top">Nomor</td>
                                <td className="w-4 align-top">:</td>
                                <td>{data.nomorSurat}</td>
                            </tr>
                            <tr>
                                <td className="w-24 align-top">Sifat</td>
                                <td className="w-4 align-top">:</td>
                                <td>{data.sifat}</td>
                            </tr>
                            <tr>
                                <td className="w-24 align-top">Lampiran</td>
                                <td className="w-4 align-top">:</td>
                                <td>{data.lampiran}</td>
                            </tr>
                            <tr>
                                <td className="w-24 align-top">Hal</td>
                                <td className="w-4 align-top">:</td>
                                <td>{data.perihal}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="text-right">
                    {data.tempatTerbit}, {formatDate(data.tanggalSurat)}
                </div>
            </div>

            {/* BODY SURAT */}
            <div className="mt-8 text-justify">
                <p>Berdasarkan Peraturan Bupati dan/atau Pedoman Perjalanan Dinas yang berlaku, dengan ini kami menugaskan kepada:</p>
                
                <table className="w-full mt-4 ml-4">
                    <tbody>
                        <tr>
                            <td className="w-40 align-top py-1">Nama</td>
                            <td className="w-4 align-top py-1">:</td>
                            <td className="font-bold py-1">{data.pegawaiNama}</td>
                        </tr>
                        <tr>
                            <td className="w-40 align-top py-1">NIP</td>
                            <td className="w-4 align-top py-1">:</td>
                            <td className="py-1">{data.pegawaiNip}</td>
                        </tr>
                        <tr>
                            <td className="w-40 align-top py-1">Pangkat/Gol. Ruang</td>
                            <td className="w-4 align-top py-1">:</td>
                            <td className="py-1">{data.pegawaiPangkat}</td>
                        </tr>
                        <tr>
                            <td className="w-40 align-top py-1">Jabatan</td>
                            <td className="w-4 align-top py-1">:</td>
                            <td className="py-1">{data.pegawaiJabatan}</td>
                        </tr>
                    </tbody>
                </table>

                <p className="mt-4">Untuk melaksanakan Perjalanan Dinas dalam rangka <strong>{data.agenda}</strong>, yang dilaksanakan dengan ketentuan sebagai berikut:</p>

                <table className="w-full mt-4 ml-4">
                    <tbody>
                        <tr>
                            <td className="w-40 align-top py-1">Instansi Tujuan</td>
                            <td className="w-4 align-top py-1">:</td>
                            <td className="py-1">{data.tujuanInstansi}</td>
                        </tr>
                        <tr>
                            <td className="w-40 align-top py-1">Tempat/Kota Tujuan</td>
                            <td className="w-4 align-top py-1">:</td>
                            <td className="py-1">{data.tujuanKota}</td>
                        </tr>
                        <tr>
                            <td className="w-40 align-top py-1">Tanggal Berangkat</td>
                            <td className="w-4 align-top py-1">:</td>
                            <td className="py-1">{formatDate(data.tanggalBerangkat)}</td>
                        </tr>
                        <tr>
                            <td className="w-40 align-top py-1">Tanggal Kembali</td>
                            <td className="w-4 align-top py-1">:</td>
                            <td className="py-1">{formatDate(data.tanggalKembali)}</td>
                        </tr>
                        <tr>
                            <td className="w-40 align-top py-1">Waktu Pelaksanaan</td>
                            <td className="w-4 align-top py-1">:</td>
                            <td className="py-1">{data.waktuPelaksanaan}</td>
                        </tr>
                        <tr>
                            <td className="w-40 align-top py-1">Kendaraan</td>
                            <td className="w-4 align-top py-1">:</td>
                            <td className="py-1">{data.jenisKendaraan}</td>
                        </tr>
                    </tbody>
                </table>

                <p className="mt-4">Demikian Surat Tugas ini dibuat untuk dilaksanakan dengan penuh tanggung jawab, dan setelah selesai melaksanakan tugas agar segera menyampaikan laporan tertulis kepada atasan yang memberikan perintah.</p>
            </div>

            {/* TANDA TANGAN */}
            <div className="mt-16 flex justify-end break-inside-avoid">
                <div className="w-72 text-center">
                    <p className="mb-24 uppercase">{data.ttdJabatan}</p>
                    <p className="font-bold underline uppercase">{data.ttdNama}</p>
                    <p>NIP. {data.ttdNip}</p>
                </div>
            </div>

        </Kertas>
    </div>
  );

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4; margin: 15mm; } 
          body { background: white; margin: 0; padding: 0; width: 100%; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: relative; width: 100%; z-index: 9999; background: white; }
          .break-inside-avoid { page-break-inside: avoid !important; break-inside: avoid !important; }
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
               <BookOpen size={16} className="text-emerald-500" /> <span>Surat Dinas (Format Baku)</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => window.dispatchEvent(new Event('open-print-modal'))} className="bg-emerald-600 hover:bg-emerald-500 px-5 py-2 rounded-lg font-bold text-xs uppercase tracking-wider shadow-lg active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak Dokumen</span>
            </button>
          </div>
      </div>

      <main className="flex-grow flex flex-col md:flex-row overflow-hidden h-[calc(100vh-64px)] print:hidden print:h-auto print:overflow-visible">
        
        {/* PANEL KIRI: FORM EDITOR */}
        <div className={`no-print w-full md:w-[480px] bg-white border-r flex flex-col h-full absolute md:relative z-10 transition-transform ${mobileView === 'preview' ? '-translate-x-full md:translate-x-0' : 'translate-x-0'}`}>
           <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h2 className="font-black text-xs uppercase text-slate-700 flex items-center gap-2"><Edit3 size={16} className="text-blue-500" /> Pengaturan Dokumen</h2>
              <button onClick={handleReset} className="text-slate-400 hover:text-red-500 transition-colors" title="Reset Form"><RotateCcw size={16}/></button>
           </div>
           
           {/* TAB NAVIGATION */}
           <div className="flex flex-wrap border-b bg-slate-100 text-[10px] font-bold uppercase overflow-x-auto custom-scrollbar">
              <button onClick={() => setActiveTab('kop')} className={`flex-1 min-w-[80px] py-3 border-r ${activeTab === 'kop' ? 'bg-white text-blue-600 border-b-2 border-b-blue-600' : 'text-slate-500 hover:bg-slate-200'}`}>Surat</button>
              <button onClick={() => setActiveTab('pegawai')} className={`flex-1 min-w-[80px] py-3 border-r ${activeTab === 'pegawai' ? 'bg-white text-emerald-600 border-b-2 border-b-emerald-600' : 'text-slate-500 hover:bg-slate-200'}`}>Pegawai</button>
              <button onClick={() => setActiveTab('tujuan')} className={`flex-1 min-w-[80px] py-3 border-r ${activeTab === 'tujuan' ? 'bg-white text-amber-600 border-b-2 border-b-amber-600' : 'text-slate-500 hover:bg-slate-200'}`}>Tujuan</button>
              <button onClick={() => setActiveTab('waktu')} className={`flex-1 min-w-[80px] py-3 border-r ${activeTab === 'waktu' ? 'bg-white text-purple-600 border-b-2 border-b-purple-600' : 'text-slate-500 hover:bg-slate-200'}`}>Waktu</button>
              <button onClick={() => setActiveTab('kendaraan')} className={`flex-1 min-w-[90px] py-3 border-r ${activeTab === 'kendaraan' ? 'bg-white text-pink-600 border-b-2 border-b-pink-600' : 'text-slate-500 hover:bg-slate-200'}`}>Kendaraan</button>
              <button onClick={() => setActiveTab('ttd')} className={`flex-1 min-w-[80px] py-3 ${activeTab === 'ttd' ? 'bg-white text-red-600 border-b-2 border-b-red-600' : 'text-slate-500 hover:bg-slate-200'}`}>TTD</button>
           </div>

           <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-32 print:hidden print:overflow-visible print:bg-white">
              
              {activeTab === 'kop' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-blue-600 border-b pb-1 mb-4">Informasi Surat</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Kop Instansi Utama</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 font-bold h-16" value={data.kopInstansi} onChange={e => handleDataChange('kopInstansi', e.target.value)} placeholder="Contoh: KEMENTERIAN KOMUNIKASI DAN INFORMATIKA" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Alamat Kop</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-12" value={data.kopAlamat} onChange={e => handleDataChange('kopAlamat', e.target.value)} placeholder="Contoh: Jl. Medan Merdeka Barat No. 9" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Kontak Kop</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-12" value={data.kopKontak} onChange={e => handleDataChange('kopKontak', e.target.value)} placeholder="Telepon, Email, Website" />
                </div>
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Nomor Surat</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.nomorSurat} onChange={e => handleDataChange('nomorSurat', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Sifat</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.sifat} onChange={e => handleDataChange('sifat', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Lampiran</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.lampiran} onChange={e => handleDataChange('lampiran', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Perihal</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.perihal} onChange={e => handleDataChange('perihal', e.target.value)} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat Terbit</label>
                    <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tempatTerbit} onChange={e => handleDataChange('tempatTerbit', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Surat</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tanggalSurat} onChange={e => handleDataChange('tanggalSurat', e.target.value)} />
                  </div>
                </div>
              </div>
              )}

              {activeTab === 'pegawai' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-emerald-600 border-b pb-1 mb-4 flex items-center gap-2"><Users size={14}/> Rincian Pegawai</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Pegawai</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1" value={data.pegawaiNama} onChange={e => handleDataChange('pegawaiNama', e.target.value)} placeholder="Nama beserta gelar" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">NIP</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pegawaiNip} onChange={e => handleDataChange('pegawaiNip', e.target.value)} placeholder="Nomor Induk Pegawai" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Pangkat/Gol. Ruang</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pegawaiPangkat} onChange={e => handleDataChange('pegawaiPangkat', e.target.value)} placeholder="Contoh: Penata Tk. I (III/d)" />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.pegawaiJabatan} onChange={e => handleDataChange('pegawaiJabatan', e.target.value)} placeholder="Jabatan pegawai" />
                </div>
              </div>
              )}

              {activeTab === 'tujuan' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-amber-600 border-b pb-1 mb-4 flex items-center gap-2"><MapPin size={14}/> Tujuan Perjalanan</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Instansi Tujuan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tujuanInstansi} onChange={e => handleDataChange('tujuanInstansi', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Tempat / Kota Tujuan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tujuanKota} onChange={e => handleDataChange('tujuanKota', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Maksud / Agenda Perjalanan</label>
                  <textarea className="w-full p-2 border rounded-lg text-sm mt-1 h-20" value={data.agenda} onChange={e => handleDataChange('agenda', e.target.value)} />
                </div>
              </div>
              )}

              {activeTab === 'waktu' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-purple-600 border-b pb-1 mb-4 flex items-center gap-2"><CalendarDays size={14}/> Waktu Berangkat-Kembali</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Berangkat</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tanggalBerangkat} onChange={e => handleDataChange('tanggalBerangkat', e.target.value)} />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-slate-500 uppercase">Tanggal Kembali</label>
                    <input type="date" className="w-full p-2 border rounded-lg text-sm mt-1" value={data.tanggalKembali} onChange={e => handleDataChange('tanggalKembali', e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Waktu Pelaksanaan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.waktuPelaksanaan} onChange={e => handleDataChange('waktuPelaksanaan', e.target.value)} placeholder="Contoh: 08:00 WIB s.d. Selesai" />
                </div>
              </div>
              )}

              {activeTab === 'kendaraan' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-pink-600 border-b pb-1 mb-4 flex items-center gap-2"><Car size={14}/> Kendaraan Operasional</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jenis Kendaraan</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.jenisKendaraan} onChange={e => handleDataChange('jenisKendaraan', e.target.value)} placeholder="Contoh: Kendaraan Dinas / Pesawat Udara" />
                </div>
              </div>
              )}

              {activeTab === 'ttd' && (
              <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <h3 className="text-xs font-black uppercase text-red-600 border-b pb-1 mb-4">Penandatangan</h3>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Jabatan Penandatangan</label>
                  <input className="w-full p-2 border rounded-lg text-sm font-bold mt-1 uppercase" value={data.ttdJabatan} onChange={e => handleDataChange('ttdJabatan', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">Nama Pejabat</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1 font-bold" value={data.ttdNama} onChange={e => handleDataChange('ttdNama', e.target.value)} />
                </div>
                <div>
                  <label className="text-[10px] font-bold text-slate-500 uppercase">NIP Pejabat</label>
                  <input className="w-full p-2 border rounded-lg text-sm mt-1" value={data.ttdNip} onChange={e => handleDataChange('ttdNip', e.target.value)} />
                </div>
              </div>
              )}

           </div>
        </div>

        {/* PANEL KANAN: PREVIEW DOKUMEN */}
        <div className={`flex-1 bg-slate-200/50 overflow-y-auto h-full flex flex-col relative ${mobileView === 'editor' ? 'hidden md:flex' : 'flex'} print:hidden print:overflow-visible print:bg-white print:static`}>
            <div className="md:hidden p-3 bg-white border-b flex justify-between items-center sticky top-0 z-10 shadow-sm">
                <button onClick={() => setMobileView('editor')} className="text-sm font-bold flex items-center gap-2 text-slate-600"><ArrowLeft size={16}/> Kembali Edit</button>
                <div className="text-xs font-bold text-slate-400 uppercase">Preview Mode</div>
            </div>
            
            <div className="flex-1 p-4 md:p-8 overflow-y-auto custom-scrollbar flex justify-center pb-32 print:hidden print:overflow-visible print:bg-white">
                 <div id="print-only-root" className="w-full flex justify-center print:h-auto print:static">
                     <DocumentContent />
                 </div>
            </div>
            
            {/* MOBILE FLOATING BUTTON */}
            <div className="md:hidden fixed bottom-6 right-6 z-20">
               <button onClick={() => window.dispatchEvent(new Event('open-print-modal'))} className="bg-emerald-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center">
                  <Printer size={24} />
               </button>
            </div>
        </div>

        {/* MOBILE VIEW TOGGLE */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex justify-around z-20">
            <button onClick={() => setMobileView('editor')} className={`flex flex-col items-center p-2 ${mobileView === 'editor' ? 'text-blue-600' : 'text-slate-400'}`}>
               <Edit3 size={20} />
               <span className="text-[10px] font-bold mt-1">Editor</span>
            </button>
            <button onClick={() => setMobileView('preview')} className={`flex flex-col items-center p-2 ${mobileView === 'preview' ? 'text-blue-600' : 'text-slate-400'}`}>
               <BookOpen size={20} />
               <span className="text-[10px] font-bold mt-1">Preview</span>
            </button>
        </div>

      </main>
    
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen_surat_dinas" price={15000} />
      </div>
    </div>
  );
}

