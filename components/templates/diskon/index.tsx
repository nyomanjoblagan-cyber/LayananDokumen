'use client';

import React, { useState } from 'react';
import { 
  Building2, User, FileText, Calendar, 
  MessageSquare, ArrowLeft, RefreshCw
} from 'lucide-react';
import Link from 'next/link';
import PrintWrapper from '@/components/PrintWrapper';

export default function SuratDiskonB2B() {
  const [formData, setFormData] = useState({
    // Pengirim
    senderCompany: 'PT Solusi Teknologi Nusantara',
    senderAddress: 'Gedung Cyber Lt. 10, Jl. Kuningan Barat No. 8, Jakarta Selatan 12710',
    senderName: 'Budi Santoso',
    senderPosition: 'Direktur Keuangan',
    senderContact: '021-5551234 / budi.s@solusiteknologi.co.id',
    
    // Penerima
    recipientCompany: 'PT Global Data Asia',
    recipientName: 'Bpk. Hendra Wijaya',
    recipientPosition: 'VP of Enterprise Sales',
    recipientAddress: 'Sudirman Central Business District (SCBD) Lot 9, Jakarta 12190',
    
    // Detail Surat
    letterNumber: '045/FIN-STN/XI/2023',
    letterDate: '15 November 2023',
    letterSubject: 'Pengajuan Penyesuaian Harga / Diskon Layanan Cloud Infrastructure',
    
    // Konteks & Alasan
    referenceId: 'INV-2023-11-0089',
    originalAmount: 'Rp 250.000.000',
    requestedDiscount: '15%',
    reasonText: 'Mengingat kondisi efisiensi anggaran perusahaan pada kuartal keempat ini serta komitmen kami untuk memperpanjang kontrak layanan untuk 2 (dua) tahun ke depan, kami bermaksud mengajukan permohonan penyesuaian harga atau diskon sebesar 15% dari total invoice.',
    closingText: 'Kami sangat menghargai kemitraan strategis yang telah terjalin baik selama ini dan berharap permohonan ini dapat dipertimbangkan. Kami siap berdiskusi lebih lanjut mengenai hal ini.'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      senderCompany: '', senderAddress: '', senderName: '', senderPosition: '', senderContact: '',
      recipientCompany: '', recipientName: '', recipientPosition: '', recipientAddress: '',
      letterNumber: '', letterDate: '', letterSubject: '', referenceId: '', originalAmount: '', requestedDiscount: '', reasonText: '', closingText: ''
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 flex flex-col">
      {/* HEADER */}
      <div className="bg-slate-900 text-white shadow-md sticky top-0 z-50 border-b border-slate-700 h-16 shrink-0 print:hidden">
        <div className="max-w-7xl mx-auto px-4 h-full flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
              <div className="bg-slate-800 p-1.5 rounded-full group-hover:bg-slate-700 transition-colors">
                 <ArrowLeft size={16} /> 
              </div>
              <span className="text-sm font-medium hidden sm:block">Dashboard</span>
            </Link>
            <div className="h-6 w-px bg-slate-700 mx-2 hidden md:block"></div>
            <h1 className="text-sm font-bold tracking-wide text-blue-400 uppercase flex items-center gap-2">
              <FileText size={16}/> Surat Pengajuan Diskon B2B
            </h1>
          </div>
          <div className="text-[10px] md:text-xs text-slate-500 font-medium">
            Professional Document Generator
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto p-4 md:p-8 flex-grow w-full grid grid-cols-1 lg:grid-cols-12 gap-8 print:block print:p-0 print:h-auto print:overflow-visible">
        
        {/* LEFT COLUMN: FORM (Hidden on Print) */}
        <div className="lg:col-span-5 space-y-6 print:hidden">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
              <h2 className="font-bold text-slate-700 flex items-center gap-2">
                <FileText size={18} className="text-blue-500"/>
                Form Data Surat
              </h2>
              <button onClick={handleReset} className="text-xs text-slate-500 hover:text-red-500 flex items-center gap-1 transition-colors">
                <RefreshCw size={12}/> Reset
              </button>
            </div>
            
            <div className="p-6 space-y-8 max-h-[calc(100vh-12rem)] overflow-y-auto custom-scrollbar">
              
              {/* Seksi 1: Pengirim */}
              <section className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Building2 size={14}/> Data Perusahaan Pengirim
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Nama Perusahaan</label>
                    <input type="text" name="senderCompany" value={formData.senderCompany} onChange={handleChange} className="w-full p-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Alamat Perusahaan</label>
                    <textarea name="senderAddress" value={formData.senderAddress} onChange={handleChange} rows={2} className="w-full p-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Nama Penanda Tangan</label>
                      <input type="text" name="senderName" value={formData.senderName} onChange={handleChange} className="w-full p-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Jabatan</label>
                      <input type="text" name="senderPosition" value={formData.senderPosition} onChange={handleChange} className="w-full p-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Kontak (Telp/Email)</label>
                    <input type="text" name="senderContact" value={formData.senderContact} onChange={handleChange} className="w-full p-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                  </div>
                </div>
              </section>

              <hr className="border-slate-100" />

              {/* Seksi 2: Penerima */}
              <section className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <User size={14}/> Tujuan Surat (Penerima)
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Nama Perusahaan Penerima</label>
                    <input type="text" name="recipientCompany" value={formData.recipientCompany} onChange={handleChange} className="w-full p-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Nama Tujuan (Attn)</label>
                      <input type="text" name="recipientName" value={formData.recipientName} onChange={handleChange} className="w-full p-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Jabatan Tujuan</label>
                      <input type="text" name="recipientPosition" value={formData.recipientPosition} onChange={handleChange} className="w-full p-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Alamat Penerima</label>
                    <textarea name="recipientAddress" value={formData.recipientAddress} onChange={handleChange} rows={2} className="w-full p-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                  </div>
                </div>
              </section>

              <hr className="border-slate-100" />

              {/* Seksi 3: Detail Surat */}
              <section className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <Calendar size={14}/> Atribut Surat
                </h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Nomor Surat</label>
                      <input type="text" name="letterNumber" value={formData.letterNumber} onChange={handleChange} className="w-full p-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Tanggal Surat</label>
                      <input type="text" name="letterDate" value={formData.letterDate} onChange={handleChange} className="w-full p-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Perihal (Subject)</label>
                    <input type="text" name="letterSubject" value={formData.letterSubject} onChange={handleChange} className="w-full p-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                  </div>
                </div>
              </section>

              <hr className="border-slate-100" />

              {/* Seksi 4: Isi Permohonan */}
              <section className="space-y-4">
                <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                  <MessageSquare size={14}/> Inti Permohonan
                </h3>
                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Nomor Invoice/Kontrak Referensi</label>
                      <input type="text" name="referenceId" value={formData.referenceId} onChange={handleChange} className="w-full p-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                    </div>
                    <div>
                      <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Nominal Tagihan Awal</label>
                      <input type="text" name="originalAmount" value={formData.originalAmount} onChange={handleChange} className="w-full p-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" />
                    </div>
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Besaran Diskon/Keringanan Diminta</label>
                    <input type="text" name="requestedDiscount" value={formData.requestedDiscount} onChange={handleChange} className="w-full p-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all" placeholder="Contoh: 15% atau Rp 10.000.000" />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Alasan Permohonan</label>
                    <textarea name="reasonText" value={formData.reasonText} onChange={handleChange} rows={4} className="w-full p-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all leading-relaxed" />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-500 mb-1 block">Kalimat Penutup</label>
                    <textarea name="closingText" value={formData.closingText} onChange={handleChange} rows={3} className="w-full p-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all leading-relaxed" />
                  </div>
                </div>
              </section>

            </div>
          </div>
          
          <div className="mb-10">
             <PrintWrapper documentName="Surat_Pengajuan_Diskon" price={15000} />
          </div>
        </div>

        {/* RIGHT COLUMN: DOCUMENT PREVIEW */}
        <div className="lg:col-span-7 print:col-span-12 print:w-full">
          <div className="sticky top-24 bg-white p-8 md:p-12 shadow-2xl rounded-sm border border-slate-200 w-full min-h-[297mm] font-serif text-slate-800 mx-auto print:shadow-none print:border-none print:p-0 print:m-0 print:min-h-0 text-[11pt] leading-relaxed">
            
            {/* Kop Surat (Header) */}
            <div className="border-b-[3px] border-slate-800 pb-4 mb-6 flex flex-col items-center justify-center text-center">
              <h1 className="text-xl md:text-2xl font-bold uppercase tracking-wider text-slate-900 mb-1">
                {formData.senderCompany || 'NAMA PERUSAHAAN'}
              </h1>
              <p className="text-sm text-slate-600 max-w-lg">
                {formData.senderAddress || 'Alamat Perusahaan'}
              </p>
              <p className="text-sm text-slate-600 mt-1">
                {formData.senderContact ? `Kontak: ${formData.senderContact}` : ''}
              </p>
            </div>

            {/* Atribut Surat */}
            <div className="flex justify-between mb-8">
              <div className="space-y-1">
                <div className="flex">
                  <span className="w-20 inline-block">Nomor</span>
                  <span className="mr-2">:</span>
                  <span>{formData.letterNumber || '...../...../...../.....'}</span>
                </div>
                <div className="flex">
                  <span className="w-20 inline-block">Lampiran</span>
                  <span className="mr-2">:</span>
                  <span>-</span>
                </div>
                <div className="flex">
                  <span className="w-20 inline-block">Perihal</span>
                  <span className="mr-2">:</span>
                  <span className="font-bold">{formData.letterSubject || 'Pengajuan Diskon / Keringanan'}</span>
                </div>
              </div>
              <div className="text-right">
                <p>{formData.letterDate || 'Jakarta, DDBulanYYYY'}</p>
              </div>
            </div>

            {/* Tujuan Surat */}
            <div className="mb-8">
              <p>Kepada Yth.,</p>
              <p className="font-bold">{formData.recipientName || 'Nama Tujuan'}</p>
              <p>{formData.recipientPosition || 'Jabatan Tujuan'}</p>
              <p className="font-bold">{formData.recipientCompany || 'Perusahaan Tujuan'}</p>
              <p className="whitespace-pre-line max-w-sm mt-1">{formData.recipientAddress || 'Alamat Tujuan'}</p>
            </div>

            {/* Isi Surat */}
            <div className="space-y-4 mb-8 text-justify">
              <p>Dengan hormat,</p>
              <p>
                Melalui surat ini, kami mendoakan Bapak/Ibu beserta seluruh jajaran manajemen <span className="font-semibold">{formData.recipientCompany || '[Perusahaan Tujuan]'}</span> selalu dalam keadaan sehat dan sukses menjalankan aktivitas perusahaan.
              </p>
              <p>
                Sehubungan dengan tagihan / kewajiban pembayaran kami berdasarkan Nomor Referensi/Invoice: <span className="font-semibold">{formData.referenceId || '[No. Ref]'}</span> senilai <span className="font-semibold">{formData.originalAmount || '[Nominal]'}</span>, kami ingin menyampaikan hal penting terkait kondisi bisnis kami saat ini.
              </p>
              <p>
                {formData.reasonText || '[Penjelasan alasan pengajuan diskon di sini]'}
              </p>
              <p>
                Berdasarkan pertimbangan tersebut, kami mengajukan permohonan keringanan / diskon sebesar <span className="font-bold underline">{formData.requestedDiscount || '[Besaran Diskon]'}</span> dari total tagihan tersebut. Kami berharap penyesuaian ini dapat membantu kelancaran operasional kami sekaligus menjaga keberlanjutan kerja sama yang saling menguntungkan di masa mendatang.
              </p>
              <p>
                {formData.closingText || '[Kalimat penutup]'}
              </p>
              <p>
                Demikian surat permohonan ini kami sampaikan. Atas perhatian, pengertian, dan kerja sama yang baik dari Bapak/Ibu, kami ucapkan terima kasih.
              </p>
            </div>

            {/* Tanda Tangan */}
            <div className="mt-12 w-64">
              <p className="mb-24">Hormat kami,</p>
              <p className="font-bold underline">{formData.senderName || 'Nama Penanda Tangan'}</p>
              <p>{formData.senderPosition || 'Jabatan'}</p>
              <p className="font-bold mt-1">{formData.senderCompany || 'Nama Perusahaan'}</p>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}