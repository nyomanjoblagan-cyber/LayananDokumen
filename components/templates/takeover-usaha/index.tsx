'use client';

import React, { useState } from 'react';
import { useFormSync } from '@/lib/useFormSync';
import PrintWrapper from '@/components/PrintWrapper';

const INITIAL_DATA = {
  hari: 'Rabu',
  tanggal: '10',
  bulan: 'Agustus',
  tahun: '2026',
  
  // Pihak Pertama (Penjual/Over Alih)
  pihak1Nama: '',
  pihak1Nik: '',
  pihak1Alamat: '',
  pihak1NoHp: '',
  
  // Pihak Kedua (Pembeli/Penerima)
  pihak2Nama: '',
  pihak2Nik: '',
  pihak2Alamat: '',
  pihak2NoHp: '',
  
  // Detail Usaha
  namaUsaha: 'Kedai Kopi Senja',
  bidangUsaha: 'Food & Beverage',
  alamatUsaha: '',
  
  // Detail Transaksi
  hargaTakeover: '75.000.000',
  hargaTerbilang: 'Tujuh Puluh Lima Juta Rupiah',
  
  // Aset yang dialihkan
  daftarAset: '1. Hak Sewa Kios sisa 2 tahun\n2. Peralatan Kedai Lengkap (Mesin Espresso, Meja, Kursi)\n3. Akun Sosial Media (Instagram, TikTok)\n4. Resep dan SOP Operasional',
};

export default function TakeoverUsahaTemplate() {
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

  const DocumentContent = () => (
    <Kertas>
      {/* KOP atau JUDUL */}
      <div className="text-center mb-8">
        <h1 className="font-bold text-lg uppercase underline">SURAT PERJANJIAN OPER ALIH (TAKEOVER) USAHA</h1>
      </div>

      <div className="text-justify space-y-4">
        <p>Pada hari ini <strong>{data.hari || '.....'}</strong> tanggal <strong>{data.tanggal || '.....'}</strong> bulan <strong>{data.bulan || '.....'}</strong> tahun <strong>{data.tahun || '.....'}</strong>, telah dibuat dan ditandatangani Perjanjian Oper Alih (Takeover) Usaha oleh dan antara:</p>

        <table className="w-full ml-4">
          <tbody>
            <tr><td className="w-40 align-top">Nama</td><td className="w-4 align-top">:</td><td><strong>{data.pihak1Nama || '..............................'}</strong></td></tr>
            <tr><td className="w-40 align-top">NIK</td><td className="w-4 align-top">:</td><td>{data.pihak1Nik || '..............................'}</td></tr>
            <tr><td className="w-40 align-top">Alamat</td><td className="w-4 align-top">:</td><td>{data.pihak1Alamat || '..............................'}</td></tr>
            <tr><td className="w-40 align-top">No. HP/WA</td><td className="w-4 align-top">:</td><td>{data.pihak1NoHp || '..............................'}</td></tr>
          </tbody>
        </table>
        <p>Dalam hal ini bertindak sebagai Pemilik Lama yang mengalihkan usaha, selanjutnya disebut <strong>PIHAK PERTAMA</strong>.</p>

        <table className="w-full ml-4">
          <tbody>
            <tr><td className="w-40 align-top">Nama</td><td className="w-4 align-top">:</td><td><strong>{data.pihak2Nama || '..............................'}</strong></td></tr>
            <tr><td className="w-40 align-top">NIK</td><td className="w-4 align-top">:</td><td>{data.pihak2Nik || '..............................'}</td></tr>
            <tr><td className="w-40 align-top">Alamat</td><td className="w-4 align-top">:</td><td>{data.pihak2Alamat || '..............................'}</td></tr>
            <tr><td className="w-40 align-top">No. HP/WA</td><td className="w-4 align-top">:</td><td>{data.pihak2NoHp || '..............................'}</td></tr>
          </tbody>
        </table>
        <p>Dalam hal ini bertindak sebagai Pemilik Baru yang menerima pengalihan usaha, selanjutnya disebut <strong>PIHAK KEDUA</strong>.</p>

        <p>PIHAK PERTAMA dan PIHAK KEDUA secara bersama-sama (selanjutnya disebut "Para Pihak") sepakat untuk melakukan Oper Alih (Takeover) sebuah usaha dengan ketentuan sebagai berikut:</p>

        <div className="font-bold text-center mt-6 mb-2">PASAL 1<br/>OBJEK TAKEOVER</div>
        <p>PIHAK PERTAMA sepakat untuk mengalihkan, menyerahkan, dan memindahtangankan usaha miliknya kepada PIHAK KEDUA berupa:</p>
        <table className="w-full ml-4 mb-2">
          <tbody>
            <tr><td className="w-40 align-top">Nama Usaha</td><td className="w-4 align-top">:</td><td><strong>{data.namaUsaha || '..............................'}</strong></td></tr>
            <tr><td className="w-40 align-top">Bidang Usaha</td><td className="w-4 align-top">:</td><td>{data.bidangUsaha || '..............................'}</td></tr>
            <tr><td className="w-40 align-top">Lokasi Usaha</td><td className="w-4 align-top">:</td><td>{data.alamatUsaha || '..............................'}</td></tr>
          </tbody>
        </table>
        <p>Adapun seluruh aset, hak, dan wewenang yang turut dialihkan dalam oper alih ini mencakup tetapi tidak terbatas pada:</p>
        <div className="ml-8 my-2 whitespace-pre-wrap">{data.daftarAset || '1. ....................\n2. ....................'}</div>

        <div className="font-bold text-center mt-6 mb-2">PASAL 2<br/>NILAI OPER ALIH DAN PEMBAYARAN</div>
        <p>PIHAK KEDUA sepakat untuk mengambil alih usaha tersebut dari PIHAK PERTAMA dengan harga sebesar <strong>Rp {data.hargaTakeover || '................'}</strong> (<em>{data.hargaTerbilang || '................'}</em>). Pembayaran ini dibayarkan secara LUNAS pada saat penandatanganan perjanjian ini, dan penandatanganan ini sekaligus berlaku sebagai kuitansi/tanda terima pembayaran yang sah.</p>

        <div className="font-bold text-center mt-6 mb-2">PASAL 3<br/>JAMINAN BEBAS SENGKETA & TANGGUNG JAWAB UTANG</div>
        <ol className="list-decimal ml-8 space-y-1">
          <li>PIHAK PERTAMA menjamin bahwa usaha dan seluruh aset yang dialihkan kepada PIHAK KEDUA adalah sah miliknya, tidak sedang dalam sengketa, tidak sedang dijaminkan kepada pihak lain, dan tidak tersangkut masalah hukum.</li>
          <li>Seluruh kewajiban finansial (termasuk hutang piutang, tagihan *supplier*, tunggakan gaji karyawan, listrik, air, pajak, dll) yang timbul <strong>sebelum</strong> tanggal penandatanganan perjanjian ini adalah sepenuhnya tanggung jawab <strong>PIHAK PERTAMA</strong>.</li>
          <li>Seluruh keuntungan, kerugian, operasional, dan kewajiban hukum yang timbul <strong>setelah</strong> tanggal penandatanganan perjanjian ini sepenuhnya menjadi hak dan tanggung jawab <strong>PIHAK KEDUA</strong>.</li>
        </ol>

        <div className="font-bold text-center mt-6 mb-2">PASAL 4<br/>PENYERAHAN ASET DAN HAK SEWA</div>
        <p>Setelah pelunasan dilakukan, PIHAK PERTAMA secara fisik dan legal menyerahkan seluruh kunci, aset inventaris, hak cipta (resep/SOP jika ada), <em>password</em> aset digital, serta mengalihkan hak sewa tempat (kios/ruko) secara penuh kepada PIHAK KEDUA tanpa ada yang ditutupi atau ditahan.</p>

        <div className="font-bold text-center mt-6 mb-2">PASAL 5<br/>PENUTUP</div>
        <p>Perjanjian ini dibuat dan ditandatangani oleh Para Pihak dalam keadaan sadar, sehat jasmani dan rohani, serta tanpa adanya paksaan dari pihak mana pun. Segala perselisihan yang timbul akan diselesaikan secara musyawarah, dan apabila gagal akan diselesaikan melalui jalur hukum.</p>

        <div className="flex justify-between items-start mt-12 pt-8">
          <div className="text-center w-1/2">
            <p><strong>PIHAK PERTAMA</strong></p>
            <p className="text-sm">(Pemilik Lama)</p>
            <div className="h-24 flex items-center justify-center">
              <span className="text-[10px] border border-black p-1">Meterai 10000</span>
            </div>
            <p className="font-bold underline uppercase">{data.pihak1Nama || '..............................'}</p>
          </div>
          
          <div className="text-center w-1/2">
            <p><strong>PIHAK KEDUA</strong></p>
            <p className="text-sm">(Pemilik Baru)</p>
            <div className="h-24"></div>
            <p className="font-bold underline uppercase">{data.pihak2Nama || '..............................'}</p>
          </div>
        </div>
      </div>
    </Kertas>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 font-sans">
      <main className="flex-1 flex flex-col md:flex-row overflow-hidden h-screen print:h-auto print:overflow-visible">
        
        {/* PANEL KIRI - FORM (disembunyikan saat print) */}
        <div className={`no-print ${mobileView === 'editor' ? 'flex' : 'hidden'} md:flex w-full md:w-[450px] lg:w-[500px] flex-col bg-white border-r border-slate-200 shadow-xl z-10 h-full`}>
          <div className="p-5 border-b border-slate-200 bg-white sticky top-0 z-20 flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-slate-800">Takeover Usaha</h2>
              <p className="text-xs text-slate-500">Oper Alih Bisnis/Kios</p>
            </div>
            <button onClick={resetForm} className="text-xs font-semibold text-rose-600 bg-rose-50 px-3 py-1.5 rounded-lg hover:bg-rose-100 transition-colors">
              Reset
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 custom-scrollbar pb-24 md:pb-5">
            <div className="space-y-6">
              
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-2">Tanggal Perjanjian</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Hari</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.hari} onChange={(e) => handleChange('hari', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Tanggal</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.tanggal} onChange={(e) => handleChange('tanggal', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Bulan</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.bulan} onChange={(e) => handleChange('bulan', e.target.value)} /></div>
                  <div><label className="block text-xs font-medium text-slate-600 mb-1">Tahun</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.tahun} onChange={(e) => handleChange('tahun', e.target.value)} /></div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-2">Pihak Pertama (Lama)</h3>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Nama Pemilik Lama</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak1Nama} onChange={(e) => handleChange('pihak1Nama', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">NIK</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak1Nik} onChange={(e) => handleChange('pihak1Nik', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Alamat</label><textarea className="w-full p-2 border border-slate-300 rounded-lg text-sm" rows={2} value={data.pihak1Alamat} onChange={(e) => handleChange('pihak1Alamat', e.target.value)}></textarea></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">No HP/WA</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak1NoHp} onChange={(e) => handleChange('pihak1NoHp', e.target.value)} /></div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-2">Pihak Kedua (Baru)</h3>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Nama Pemilik Baru</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak2Nama} onChange={(e) => handleChange('pihak2Nama', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">NIK</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak2Nik} onChange={(e) => handleChange('pihak2Nik', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Alamat</label><textarea className="w-full p-2 border border-slate-300 rounded-lg text-sm" rows={2} value={data.pihak2Alamat} onChange={(e) => handleChange('pihak2Alamat', e.target.value)}></textarea></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">No HP/WA</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.pihak2NoHp} onChange={(e) => handleChange('pihak2NoHp', e.target.value)} /></div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-2">Detail Objek Takeover</h3>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Nama Usaha/Toko/Kios</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.namaUsaha} onChange={(e) => handleChange('namaUsaha', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Bidang Usaha</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.bidangUsaha} onChange={(e) => handleChange('bidangUsaha', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Lokasi Usaha</label><textarea className="w-full p-2 border border-slate-300 rounded-lg text-sm" rows={2} value={data.alamatUsaha} onChange={(e) => handleChange('alamatUsaha', e.target.value)}></textarea></div>
                
                <div>
                  <label className="block text-xs font-medium text-slate-600 mb-1">Daftar Aset (Sewa/Mesin/SOP)</label>
                  <textarea className="w-full p-2 border border-slate-300 rounded-lg text-sm" rows={5} value={data.daftarAset} onChange={(e) => handleChange('daftarAset', e.target.value)}></textarea>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-sm text-slate-800 border-b pb-2">Nilai Transaksi</h3>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Harga Takeover (Angka)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.hargaTakeover} onChange={(e) => handleChange('hargaTakeover', e.target.value)} /></div>
                <div><label className="block text-xs font-medium text-slate-600 mb-1">Harga Takeover (Terbilang)</label><input type="text" className="w-full p-2 border border-slate-300 rounded-lg text-sm" value={data.hargaTerbilang} onChange={(e) => handleChange('hargaTerbilang', e.target.value)} /></div>
              </div>

            </div>
          </div>
        </div>

        {/* PANEL KANAN - PREVIEW */}
        <div className={`${mobileView === 'preview' ? 'flex' : 'hidden'} md:flex flex-1 bg-slate-300 overflow-y-auto p-4 md:p-8 flex-col items-center custom-scrollbar print:overflow-visible print:p-0 print:block print:h-auto print:w-full`}>
           <div id="print-only-root" className="print:w-full print:max-w-none print:min-w-0 print:min-h-0 mx-auto origin-top transition-transform duration-300 scale-[0.6] sm:scale-75 md:scale-[0.85] lg:scale-100 mb-[-120mm] md:mb-0 print:scale-100 print:transform-none print:mb-0">
              <DocumentContent />
           </div>

           <div className="no-print mt-12 w-full max-w-[210mm] mx-auto pb-20">
              <PrintWrapper documentName={`Takeover_Usaha_${data.namaUsaha.replace(/\s+/g, '_')}`} price={15000} />
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
