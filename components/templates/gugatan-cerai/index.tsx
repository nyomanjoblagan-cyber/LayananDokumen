'use client';

import React, { useState } from 'react';
import { useFormSync } from '@/lib/useFormSync';
import PrintWrapper from '@/components/PrintWrapper';
import Link from 'next/link';
import { Printer, ArrowLeftCircle, Edit3, FileText, RotateCcw, User } from 'lucide-react';

const INITIAL_DATA = {
  kotaPembuatan: 'Jakarta Selatan',
  tanggalPembuatan: '25 Agustus 2026',
  
  pengadilanTujuan: 'Pengadilan Agama Jakarta Selatan',
  alamatPengadilan: 'Jl. Harsono RM No.1, Ragunan, Jakarta Selatan',
  
  jenisGugatan: 'Gugatan Cerai', // Gugatan Cerai (Istri) atau Cerai Talak (Suami)
  
  // Pihak Penggugat/Pemohon
  penggugatNama: '',
  penggugatUmur: '30',
  penggugatAgama: 'Islam',
  penggugatPekerjaan: 'Karyawan Swasta',
  penggugatAlamat: '',
  
  // Pihak Tergugat/Termohon
  tergugatNama: '',
  tergugatUmur: '35',
  tergugatAgama: 'Islam',
  tergugatPekerjaan: 'Wiraswasta',
  tergugatAlamat: '',
  
  // Fakta Pernikahan
  tanggalNikah: '10 Februari 2015',
  kuaPencatat: 'KUA Kecamatan Kebayoran Baru',
  noKutipanNikah: '123/45/II/2015',
  
  // Anak
  namaAnak1: 'Budi Santoso',
  umurAnak1: '10',
  
  // Alasan Cerai (Posita Utama)
  alasanCerai: 'Bahwa sejak awal tahun 2024, ketentraman rumah tangga antara Penggugat dan Tergugat mulai goyah, sering terjadi perselisihan dan pertengkaran terus menerus yang disebabkan oleh masalah ekonomi dan kurangnya tanggung jawab Tergugat terhadap nafkah keluarga. Bahwa saat ini Penggugat dan Tergugat telah pisah ranjang/rumah selama 1 tahun berturut-turut tanpa ada komunikasi lagi.',
  
  // Nafkah Iddah/Mutah (Optional)
  tuntutanNafkahIddah: '15.000.000',
  tuntutanNafkahAnak: '5.000.000',
};

export default function GugatanCeraiTemplate() {
  const [data, setData] = useFormSync<any>(INITIAL_DATA);
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  const handleChange = (field: string, value: string) => {
    setData((prev: any) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    if (confirm('Reset semua isian data?')) {
      setData(INITIAL_DATA);
    }
  };

  const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (
    <div className={`bg-white shadow-2xl print:shadow-none mx-auto p-[20mm] print:p-0 text-black font-serif leading-relaxed text-[12pt] relative box-border mb-8 print:mb-0 print:m-0 w-[210mm] print:w-full print:min-w-0 min-h-[297mm] print:min-h-0 h-auto ${className}`}>
      {children}
    </div>
  );

  const isTalak = data.jenisGugatan === 'Cerai Talak';
  const labelPihak1 = isTalak ? 'Pemohon' : 'Penggugat';
  const labelPihak2 = isTalak ? 'Termohon' : 'Tergugat';

  const DocumentContent = () => (
    <Kertas>
      {/* JUDUL/TUJUAN */}
      <div className="flex justify-between items-start mb-8">
        <div className="w-1/2">
          <p>Hal: <strong>{isTalak ? 'Permohonan Cerai Talak' : 'Gugatan Cerai'}{data.namaAnak1 ? ' & Hak Asuh Anak' : ''}</strong></p>
        </div>
        <div className="w-1/2 text-right">
          <p>{data.kotaPembuatan || '...............'}, {data.tanggalPembuatan || '...............'}</p>
        </div>
      </div>

      <div className="mb-8">
        <p>Kepada Yth.,</p>
        <p><strong>Ketua {data.pengadilanTujuan || 'Pengadilan Agama .......................'}</strong></p>
        <p>Di -</p>
        <p className="ml-8">{data.alamatPengadilan || '...........................................'}</p>
      </div>

      <div className="text-justify space-y-4">
        <p><em>Assalamu'alaikum Warahmatullahi Wabarakatuh,</em></p>
        <p>Yang bertanda tangan di bawah ini:</p>

        <table className="w-full ml-4">
          <tbody>
            <tr><td className="w-32 align-top">Nama Lengkap</td><td className="w-4 align-top">:</td><td><strong>{data.penggugatNama || '..............................'}</strong></td></tr>
            <tr><td className="w-32 align-top">Umur</td><td className="w-4 align-top">:</td><td>{data.penggugatUmur || '.....'} tahun</td></tr>
            <tr><td className="w-32 align-top">Agama</td><td className="w-4 align-top">:</td><td>{data.penggugatAgama || 'Islam'}</td></tr>
            <tr><td className="w-32 align-top">Pekerjaan</td><td className="w-4 align-top">:</td><td>{data.penggugatPekerjaan || '..............................'}</td></tr>
            <tr><td className="w-32 align-top">Tempat Kediaman</td><td className="w-4 align-top">:</td><td>{data.penggugatAlamat || '..............................'}</td></tr>
          </tbody>
        </table>
        <p>Selanjutnya disebut sebagai <strong>{labelPihak1.toUpperCase()}</strong>.</p>

        <p>Dengan ini mengajukan {data.jenisGugatan.toLowerCase()} terhadap {isTalak ? 'istri' : 'suami'} {labelPihak1.toLowerCase()}:</p>

        <table className="w-full ml-4">
          <tbody>
            <tr><td className="w-32 align-top">Nama Lengkap</td><td className="w-4 align-top">:</td><td><strong>{data.tergugatNama || '..............................'}</strong></td></tr>
            <tr><td className="w-32 align-top">Umur</td><td className="w-4 align-top">:</td><td>{data.tergugatUmur || '.....'} tahun</td></tr>
            <tr><td className="w-32 align-top">Agama</td><td className="w-4 align-top">:</td><td>{data.tergugatAgama || 'Islam'}</td></tr>
            <tr><td className="w-32 align-top">Pekerjaan</td><td className="w-4 align-top">:</td><td>{data.tergugatPekerjaan || '..............................'}</td></tr>
            <tr><td className="w-32 align-top">Tempat Kediaman</td><td className="w-4 align-top">:</td><td>{data.tergugatAlamat || '..............................'}</td></tr>
          </tbody>
        </table>
        <p>Selanjutnya disebut sebagai <strong>{labelPihak2.toUpperCase()}</strong>.</p>

        <div className="font-bold text-center mt-8 mb-4">POSITA (ALASAN-ALASAN)</div>
        <p>Adapun yang menjadi alasan/dalil-dalil permohonan ini diajukan adalah sebagai berikut:</p>
        <ol className="list-decimal ml-8 space-y-2">
          <li>Bahwa {labelPihak1} dan {labelPihak2} adalah suami istri sah yang melangsungkan pernikahan pada tanggal <strong>{data.tanggalNikah || '.....'}</strong>, yang dicatat oleh Pegawai Pencatat Nikah Kantor Urusan Agama (KUA) <strong>{data.kuaPencatat || '.....'}</strong> sebagaimana tercatat dalam Kutipan Akta Nikah Nomor: <strong>{data.noKutipanNikah || '.....'}</strong>.</li>
          <li>Bahwa setelah pernikahan tersebut, {labelPihak1} dan {labelPihak2} telah hidup bersama sebagaimana layaknya suami istri dan {data.namaAnak1 ? `telah dikaruniai seorang anak yang bernama ${data.namaAnak1} (Umur ${data.umurAnak1} Tahun).` : 'belum dikaruniai keturunan.'}</li>
          <li className="whitespace-pre-wrap">{data.alasanCerai || 'Bahwa sejak awal tahun 2024, ketentraman rumah tangga mulai goyah dan terjadi perselisihan terus menerus.'}</li>
          <li>Bahwa atas dasar perselisihan dan pertengkaran yang terjadi secara terus menerus, tidak ada harapan lagi akan hidup rukun dalam rumah tangga, sehingga tujuan perkawinan untuk membentuk keluarga yang sakinah, mawaddah, dan warahmah tidak mungkin lagi tercapai.</li>
          <li>Bahwa {labelPihak1} telah berupaya semaksimal mungkin untuk mempertahankan keutuhan rumah tangga melalui musyawarah keluarga, namun tidak membuahkan hasil.</li>
        </ol>

        <div className="font-bold text-center mt-8 mb-4">PETITUM (TUNTUTAN)</div>
        <p>Berdasarkan dalil-dalil yang telah diuraikan di atas, {labelPihak1} memohon kepada Majelis Hakim Yang Mulia pada {data.pengadilanTujuan || 'Pengadilan Agama'} agar berkenan memeriksa, mengadili, dan memutus perkara ini dengan amar putusan sebagai berikut:</p>
        <ol className="list-decimal ml-8 space-y-1">
          <li>Mengabulkan permohonan {labelPihak1} untuk seluruhnya.</li>
          {isTalak ? (
            <li>Memberi izin kepada Pemohon untuk menjatuhkan talak satu raj'i terhadap Termohon di depan sidang Pengadilan Agama.</li>
          ) : (
            <li>Menjatuhkan talak satu bain sughra dari Tergugat terhadap Penggugat.</li>
          )}
          {data.namaAnak1 && (
            <>
              <li>Menetapkan hak asuh/hadhanah atas anak bernama {data.namaAnak1} berada di bawah pemeliharaan {labelPihak1}.</li>
              <li>Menghukum {labelPihak2} untuk membayar biaya nafkah/pemeliharaan anak tersebut sebesar Rp {data.tuntutanNafkahAnak || '.....'} setiap bulannya hingga anak tersebut dewasa/mandiri.</li>
            </>
          )}
          {data.tuntutanNafkahIddah && !isTalak && (
             <li>Menghukum Tergugat untuk membayar nafkah Iddah dan Mut'ah sebesar Rp {data.tuntutanNafkahIddah} kepada Penggugat.</li>
          )}
          <li>Membebankan biaya perkara sesuai dengan hukum yang berlaku.</li>
        </ol>
        <p className="mt-4">Atau apabila Majelis Hakim berpendapat lain, mohon putusan yang seadil-adilnya (<em>Ex Aequo Et Bono</em>).</p>

        <p className="mt-8"><em>Wassalamu'alaikum Warahmatullahi Wabarakatuh.</em></p>

        <div className="flex justify-end mt-12 pt-8">
          <div className="text-center w-1/3">
            <p><strong>Hormat {labelPihak1},</strong></p>
            <div className="h-24"></div>
            <p className="font-bold underline uppercase">{data.penggugatNama || '..............................'}</p>
          </div>
        </div>
      </div>
    </Kertas>
  );

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* BULLETPROOF PRINT CSS */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          html, body { height: auto !important; overflow: visible !important; background: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: static !important; width: 100%; background: white; }
          * { box-sizing: border-box !important; }
        }
      ` }} />

      {/* HEADER NAVBAR */}
      <div className="no-print bg-slate-900 text-white shadow-lg sticky top-0 z-[999] border-b border-slate-800 h-16 flex items-center px-4 justify-between font-sans">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-400 hover:text-white flex items-center gap-2 transition-colors">
              <ArrowLeftCircle size={20} className="text-purple-400" />
              <span className="font-bold tracking-wide text-sm hidden md:inline">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-1"></div>
            <div className="flex flex-col">
              <h1 className="font-black text-sm tracking-widest uppercase text-white">Draft Gugatan Cerai</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl font-bold text-xs uppercase tracking-wider text-slate-300 hidden md:inline-block">
                LEGAL FORMAL FORMAT
            </span>
            <button onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }} className="bg-purple-600 hover:bg-purple-500 px-5 py-2 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-purple-900/50 active:scale-95 flex items-center gap-2 transition-all">
              <Printer size={16} /> <span className="hidden md:inline">Cetak PDF</span>
            </button>
          </div>
      </div>

      {/* MOBILE TABS */}
      <div className="md:hidden flex bg-white border-b border-slate-200 sticky top-16 z-[998] no-print font-sans">
        <button onClick={() => setMobileView('editor')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'editor' ? 'text-purple-700 border-b-2 border-purple-700 bg-purple-50' : 'text-slate-500'}`}>
          <Edit3 size={16} /> Editor
        </button>
        <button onClick={() => setMobileView('preview')} className={`flex-1 py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-colors ${mobileView === 'preview' ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50' : 'text-slate-500'}`}>
          <Printer size={16} /> Preview
        </button>
      </div>

      <main className="flex-grow flex flex-col md:flex-row h-[calc(100vh-64px)] overflow-hidden print:h-auto print:overflow-visible print:block relative">
        
        {/* EDITOR SIDEBAR */}
        <aside className={`${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-[480px] lg:w-[540px] bg-slate-50 border-r border-slate-200 h-full z-[90] no-print shadow-xl shrink-0`}>
            <div className="p-5 bg-white border-b border-slate-200 flex justify-between items-center shrink-0">
                <h2 className="font-black text-slate-800 uppercase tracking-tight text-sm flex items-center gap-2">
                  <FileText size={18} className="text-purple-600" /> Editor Legal
                </h2>
                <button onClick={resetForm} className="text-slate-400 hover:text-rose-500 transition-colors p-2 hover:bg-rose-50 rounded-lg" title="Reset Form">
                  <RotateCcw size={16}/>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 space-y-8 custom-scrollbar pb-32">
              
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <User size={14} className="text-purple-600"/> Informasi Pendaftaran
                  </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Kota Pembuatan</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.kotaPembuatan} onChange={(e) => handleChange('kotaPembuatan', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Tgl Pembuatan</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.tanggalPembuatan} onChange={(e) => handleChange('tanggalPembuatan', e.target.value)} /></div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Tujuan Pengadilan (Sesuai KTP Istri)</label>
                  <input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm mb-2" placeholder="Pengadilan Agama Jakarta Selatan" value={data.pengadilanTujuan} onChange={(e) => handleChange('pengadilanTujuan', e.target.value)} />
                  <textarea className="w-full p-2 border border-slate-300 rounded-lg text-sm" rows={2} placeholder="Alamat Pengadilan" value={data.alamatPengadilan} onChange={(e) => handleChange('alamatPengadilan', e.target.value)}></textarea>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Jenis Perkara</label>
                  <select className="w-full p-2 border border-slate-300 rounded-lg text-sm font-semibold" value={data.jenisGugatan} onChange={(e) => handleChange('jenisGugatan', e.target.value)}>
                    <option value="Gugatan Cerai">Gugatan Cerai (Istri yang Menggugat)</option>
                    <option value="Cerai Talak">Cerai Talak (Suami yang Memohon)</option>
                  </select>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <User size={14} className="text-purple-600"/> Data {labelPihak1} (Anda)
                  </h3>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Nama Lengkap Sesuai KTP</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.penggugatNama} onChange={(e) => handleChange('penggugatNama', e.target.value)} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Umur</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.penggugatUmur} onChange={(e) => handleChange('penggugatUmur', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Pekerjaan</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.penggugatPekerjaan} onChange={(e) => handleChange('penggugatPekerjaan', e.target.value)} /></div>
                </div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Tempat Kediaman (Domisili)</label><textarea className="w-full p-2 border border-slate-300 rounded-lg text-sm" rows={2} value={data.penggugatAlamat} onChange={(e) => handleChange('penggugatAlamat', e.target.value)}></textarea></div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <User size={14} className="text-purple-600"/> Data {labelPihak2} (Pasangan)
                  </h3>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Nama Lengkap Pasangan</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.tergugatNama} onChange={(e) => handleChange('tergugatNama', e.target.value)} /></div>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Umur</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.tergugatUmur} onChange={(e) => handleChange('tergugatUmur', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Pekerjaan</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.tergugatPekerjaan} onChange={(e) => handleChange('tergugatPekerjaan', e.target.value)} /></div>
                </div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Tempat Kediaman Terakhir</label><textarea className="w-full p-2 border border-slate-300 rounded-lg text-sm" rows={2} value={data.tergugatAlamat} onChange={(e) => handleChange('tergugatAlamat', e.target.value)}></textarea></div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <User size={14} className="text-purple-600"/> Fakta Pernikahan & Anak
                  </h3>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Tanggal Menikah</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.tanggalNikah} onChange={(e) => handleChange('tanggalNikah', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">KUA Pencatat Nikah</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.kuaPencatat} onChange={(e) => handleChange('kuaPencatat', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">No. Kutipan Buku Nikah</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.noKutipanNikah} onChange={(e) => handleChange('noKutipanNikah', e.target.value)} /></div>
                
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2"><label className="block text-xs font-medium text-slate-600 mb-1">Nama Anak (Kosongkan bila tdk ada)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.namaAnak1} onChange={(e) => handleChange('namaAnak1', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Umur Anak</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.umurAnak1} onChange={(e) => handleChange('umurAnak1', e.target.value)} /></div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <User size={14} className="text-purple-600"/> Posita (Alasan Perceraian Utama)
                  </h3>
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Deskripsikan alasan pisah secara rinci (Faktor ekonomi, KDRT, Pisah Rumah, dll)</label>
                  <textarea className="w-full p-3 border border-slate-300 rounded-lg text-sm leading-relaxed" rows={7} value={data.alasanCerai} onChange={(e) => handleChange('alasanCerai', e.target.value)}></textarea>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                <h3 className="font-black text-slate-800 text-xs uppercase tracking-widest flex items-center gap-2 border-b border-slate-100 pb-3">
                    <User size={14} className="text-purple-600"/> Tuntutan Finansial (Petitum)
                  </h3>
                {!isTalak && (
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Tuntutan Nafkah Iddah/Mut'ah (Rp)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.tuntutanNafkahIddah} onChange={(e) => handleChange('tuntutanNafkahIddah', e.target.value)} /></div>
                )}
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Tuntutan Nafkah Anak per Bulan (Rp)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.tuntutanNafkahAnak} onChange={(e) => handleChange('tuntutanNafkahAnak', e.target.value)} /></div>
              </div>

                        </div>
        </aside>

        {/* PREVIEW AREA (BULLETPROOF PRINT TARGET) */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName={`Gugatan_Cerai_${data.penggugatNama.replace(/\s+/g, '_')}`} price={25000} />
           </div>
        </div>
      </main>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="no-print md:hidden fixed bottom-6 left-6 right-6 z-50 h-14 bg-neutral-900/90 backdrop-blur-xl rounded-2xl flex p-1.5 shadow-2xl border border-neutral-800 font-sans">
          <button onClick={() => setMobileView('editor')} className={`flex-1 rounded-xl text-xs font-bold transition-all duration-300 ${mobileView === 'editor' ? 'bg-neutral-800 text-white shadow-lg' : 'text-neutral-500 hover:text-neutral-300'}`}><span className="block text-[10px] mb-0.5 opacity-60">Kembali ke</span>EDITOR</button>
          <button onClick={() => setMobileView('preview')} className={`flex-1 rounded-xl text-xs font-bold transition-all duration-300 ${mobileView === 'preview' ? 'bg-emerald-600 text-white shadow-lg' : 'text-neutral-500 hover:text-neutral-300'}`}><span className="block text-[10px] mb-0.5 opacity-60">Lihat Hasil</span>PREVIEW</button>
      </div>

      {/* GLOBAL CSS PRINT */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          @page { size: A4 portrait; margin: 15mm; } 
          html, body { height: auto !important; overflow: visible !important; background: white; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .no-print { display: none !important; }
          #print-only-root { display: block !important; position: static !important; width: 100%; background: white; }
          * { box-sizing: border-box !important; }
        }
      ` }} />
    </div>
  );
}
