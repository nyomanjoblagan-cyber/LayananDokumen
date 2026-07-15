'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { 
  Printer, ArrowLeftCircle, FileText, Edit3, Eye, RotateCcw,
  User, Building, Info, Calendar
} from 'lucide-react';
import Link from 'next/link';

interface IzinData {
  kotaSurat: string;
  tanggalSurat: string;

  jenisTujuan: 'Sekolah' | 'Kampus';
  namaTujuan: string;
  alamatTujuan: string;

  namaPemohon: string;
  nomorIdentitas: string;
  kelasAtauProdi: string;

  alasanIzin: 'Sakit' | 'Acara Keluarga' | 'Lainnya';
  tanggalMulai: string;
  tanggalSelesai: string;
  
  keteranganSakit: string;
  lampiranDokter: boolean;

  jenisAcara: string;

  alasanLainnya: string;

  namaPenandatangan: string;
  hubunganPenandatangan: 'Diri Sendiri' | 'Orang Tua' | 'Wali';
}

const INITIAL_DATA: IzinData = {
  kotaSurat: 'Jakarta',
  tanggalSurat: new Date().toISOString().split('T')[0],
  
  jenisTujuan: 'Sekolah',
  namaTujuan: 'SMA Negeri 1 Jakarta',
  alamatTujuan: 'Jl. Budi Utomo No. 7, Jakarta Pusat',
  
  namaPemohon: 'Budi Santoso',
  nomorIdentitas: '1029384756',
  kelasAtauProdi: 'XII IPA 1',
  
  alasanIzin: 'Sakit',
  tanggalMulai: new Date().toISOString().split('T')[0],
  tanggalSelesai: new Date().toISOString().split('T')[0],
  
  keteranganSakit: 'demam tinggi',
  lampiranDokter: true,
  
  jenisAcara: '',
  alasanLainnya: '',
  
  namaPenandatangan: 'Andi Santoso',
  hubunganPenandatangan: 'Orang Tua'
};

export default function IzinSekolahPage() {
  return (
    <Suspense fallback={<div style={{ display: 'flex', height: '100vh', alignItems: 'center', justifyContent: 'center' }}>Memuat Editor...</div>}>
      <IzinBuilder />
    </Suspense>
  );
}

function IzinBuilder() {
  const [isClient, setIsClient] = useState(false);
  const [data, setData] = useState<IzinData>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'pemohon' | 'tujuan' | 'izin'>('pemohon');
  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleDataChange = (field: keyof IzinData, val: any) => {
    setData(prev => ({ ...prev, [field]: val }));
  };

  const handleReset = () => {
    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {
        setData({ ...INITIAL_DATA });
    }
  };

  const formatDateSafe = (dateString: string) => {
      if(!dateString) return '...';
      try {
          return new Date(dateString).toLocaleDateString('id-ID', {day:'numeric', month:'long', year:'numeric'});
      } catch {
          return dateString;
      }
  };

  const generateAlasanText = () => {
    if (data.alasanIzin === 'Sakit') {
        const text = `sakit ${data.keteranganSakit ? data.keteranganSakit : ''}`.trim();
        const lampiran = data.lampiranDokter ? ' Bersama surat ini, saya juga melampirkan surat keterangan dari dokter.' : '';
        return text + '.' + lampiran;
    } else if (data.alasanIzin === 'Acara Keluarga') {
        return `ada keperluan keluarga, yaitu ${data.jenisAcara || '...'} .`;
    } else {
        return `${data.alasanLainnya || '...'} .`;
    }
  };

  const durasiHari = () => {
      if (data.tanggalMulai && data.tanggalSelesai) {
          const start = new Date(data.tanggalMulai);
          const end = new Date(data.tanggalSelesai);
          const diff = end.getTime() - start.getTime();
          if (diff >= 0) return Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1;
      }
      return 1;
  };

  if (!isClient) return null;

  return (
    <div className="app-container">
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Playfair+Display:wght@400;600;700&display=swap');

        :root {
          --primary: #3b82f6;
          --primary-hover: #2563eb;
          --bg-gradient: linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%);
          --text-main: #0f172a;
          --text-muted: #64748b;
          --border: #e2e8f0;
          --surface: rgba(255, 255, 255, 0.85);
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .app-container {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
          font-family: 'Inter', system-ui, sans-serif;
          background: var(--bg-gradient);
          color: var(--text-main);
        }

        .header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 24px;
          height: 64px;
          background: rgba(255, 255, 255, 0.6);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255,255,255,0.3);
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          position: sticky;
          top: 0;
          z-index: 50;
        }

        .header-title {
          display: flex;
          align-items: center;
          gap: 12px;
          font-weight: 700;
          font-size: 14px;
          color: var(--text-main);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .btn-primary {
          background: var(--primary);
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.25);
        }

        .btn-primary:hover {
          background: var(--primary-hover);
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(59, 130, 246, 0.35);
        }

        .main-content {
          display: flex;
          flex: 1;
          overflow: hidden;
          height: calc(100vh - 64px);
        }

        .sidebar {
          width: 440px;
          background: var(--surface);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-right: 1px solid rgba(255,255,255,0.5);
          display: flex;
          flex-direction: column;
          box-shadow: 4px 0 24px rgba(0,0,0,0.03);
          z-index: 10;
        }

        .sidebar-header {
          padding: 16px 20px;
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255,255,255,0.5);
        }

        .sidebar-header h2 {
          font-size: 13px;
          font-weight: 800;
          text-transform: uppercase;
          color: var(--text-main);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .btn-icon {
          background: transparent;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 6px;
          border-radius: 6px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .btn-icon:hover {
          background: rgba(0,0,0,0.05);
          color: #ef4444;
        }

        .tabs {
          display: flex;
          border-bottom: 1px solid var(--border);
          background: rgba(248, 250, 252, 0.5);
        }

        .tab-btn {
          flex: 1;
          padding: 14px 8px;
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          font-weight: 700;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--text-muted);
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }

        .tab-btn.active {
          color: var(--primary);
          border-bottom-color: var(--primary);
          background: white;
        }

        .form-area {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }

        /* Custom Scrollbar for form-area */
        .form-area::-webkit-scrollbar {
          width: 6px;
        }
        .form-area::-webkit-scrollbar-track {
          background: transparent;
        }
        .form-area::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.1);
          border-radius: 10px;
        }

        .form-group {
          margin-bottom: 20px;
          animation: slideUp 0.3s ease forwards;
          opacity: 0;
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .form-label {
          display: block;
          font-size: 11px;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 6px;
        }

        .form-input, .form-select, .form-textarea {
          width: 100%;
          padding: 12px 14px;
          border: 1px solid #cbd5e1;
          border-radius: 10px;
          font-size: 14px;
          font-family: inherit;
          background: white;
          color: var(--text-main);
          transition: all 0.2s ease;
          box-shadow: inset 0 1px 2px rgba(0,0,0,0.02);
        }

        .form-textarea {
          resize: vertical;
          min-height: 80px;
        }

        .form-input:focus, .form-select:focus, .form-textarea:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
        }

        .grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .section-title {
          font-size: 12px;
          font-weight: 800;
          color: var(--text-main);
          text-transform: uppercase;
          margin-bottom: 16px;
          padding-bottom: 8px;
          border-bottom: 2px solid rgba(0,0,0,0.05);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .preview-area {
          flex: 1;
          overflow-y: auto;
          padding: 40px;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          background: transparent;
        }

        .paper-wrapper {
          position: relative;
        }

        .paper {
          background: white;
          width: 210mm;
          min-height: 297mm;
          padding: 20mm 25mm;
          box-shadow: 0 24px 48px -12px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.02);
          font-family: 'Times New Roman', Times, serif;
          font-size: 12pt;
          line-height: 1.5;
          color: #000;
          position: relative;
          transition: all 0.3s ease;
        }

        /* Document Styles */
        .doc-header {
          text-align: right;
          margin-bottom: 30px;
        }
        
        .doc-hal-lampiran {
          margin-bottom: 30px;
        }

        .doc-tujuan {
          margin-bottom: 30px;
        }

        .doc-salam {
          margin-bottom: 15px;
        }

        .doc-identitas {
          margin-left: 20px;
          margin-bottom: 20px;
          width: 100%;
          border-collapse: collapse;
        }
        .doc-identitas td {
          padding: 3px 0;
          vertical-align: top;
        }
        .doc-identitas .col-label { width: 150px; }
        .doc-identitas .col-colon { width: 20px; text-align: center; }
        .doc-identitas .col-value { font-weight: bold; }

        .doc-isi {
          text-align: justify;
          margin-bottom: 40px;
        }

        .doc-isi p {
          margin-bottom: 10px;
          text-indent: 30px;
        }

        .doc-ttd {
          display: flex;
          justify-content: flex-end;
          margin-top: 50px;
        }
        .doc-ttd-box {
          text-align: center;
          width: 250px;
        }
        .doc-ttd-space {
          height: 80px;
        }
        .doc-ttd-name {
          font-weight: bold;
          text-decoration: underline;
          text-transform: uppercase;
        }

        /* Print Styles */
        @media print {
          @page { size: A4; margin: 0; }
          body { background: white; }
          .no-print { display: none !important; }
          .app-container { background: white; display: block; height: auto; }
          .main-content { display: block; height: auto; overflow: visible; }
          .preview-area { padding: 0; display: block; }
          .paper { 
            width: 100%; min-height: 0; padding: 20mm; 
            box-shadow: none; margin: 0; border: none;
          }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }

        /* Responsive Mobile */
        .mobile-nav {
          display: none;
        }
        @media (max-width: 1024px) {
          .sidebar { width: 350px; }
        }
        @media (max-width: 768px) {
          .main-content { position: relative; }
          .sidebar { 
            position: relative; width: 100%; 
            transition: transform 0.3s ease;
            transform: translateX(0);
          }
          .sidebar.hide-mobile { transform: translateX(-100%); }
          .preview-area {
            position: relative; width: 100%;
            transition: transform 0.3s ease;
            transform: translateX(100%);
            padding: 20px;
          }
          .preview-area.show-mobile { transform: translateX(0); }
          .paper { width: 100%; padding: 15mm; min-height: auto; }
          .mobile-nav {
            display: flex; position: fixed; bottom: 0; width: 100%;
            background: white; border-top: 1px solid var(--border);
            z-index: 100;
          }
          .mobile-nav-btn {
            flex: 1; padding: 16px; border: none; background: transparent;
            font-size: 12px; font-weight: 700; text-transform: uppercase;
            display: flex; align-items: center; justify-content: center; gap: 8px;
            color: var(--text-muted);
          }
          .mobile-nav-btn.active { color: var(--primary); }
        }
      `}} />

      <header className="header no-print">
        <div className="header-title">
          <Link href="/" style={{ color: 'var(--primary)', display: 'flex', alignItems: 'center' }}>
            <ArrowLeftCircle size={22} />
          </Link>
          <span style={{ width: 1, height: 20, background: 'var(--border)', margin: '0 8px' }}></span>
          <FileText size={18} style={{ color: 'var(--primary)' }} />
          <span>Generator Surat Izin</span>
        </div>
        <button onClick={() => window.dispatchEvent(new Event('open-print-modal'))} className="btn-primary">
          <Printer size={16} />
          <span>Cetak PDF</span>
        </button>
      </header>

      <main className="main-content">
        {/* SIDEBAR EDITOR */}
        <aside className={`sidebar no-print ${mobileView === 'preview' ? 'hide-mobile' : ''}`}>
          <div className="sidebar-header">
            <h2><Edit3 size={16} style={{ color: 'var(--primary)' }}/> Pengaturan Dokumen</h2>
            <button onClick={handleReset} className="btn-icon" title="Reset Formulir">
              <RotateCcw size={16} />
            </button>
          </div>

          <div className="tabs">
            <button 
              className={`tab-btn ${activeTab === 'pemohon' ? 'active' : ''}`}
              onClick={() => setActiveTab('pemohon')}
            >
              <User size={14}/> Pemohon
            </button>
            <button 
              className={`tab-btn ${activeTab === 'tujuan' ? 'active' : ''}`}
              onClick={() => setActiveTab('tujuan')}
            >
              <Building size={14}/> Tujuan
            </button>
            <button 
              className={`tab-btn ${activeTab === 'izin' ? 'active' : ''}`}
              onClick={() => setActiveTab('izin')}
            >
              <Info size={14}/> Detail Izin
            </button>
          </div>

          <div className="form-area">
            {activeTab === 'pemohon' && (
              <div style={{ animationDelay: '0ms' }}>
                <h3 className="section-title"><User size={14} color="var(--primary)"/> Data Pemohon (Siswa/Mahasiswa)</h3>
                <div className="form-group" style={{ animationDelay: '50ms' }}>
                  <label className="form-label">Nama Lengkap</label>
                  <input className="form-input" value={data.namaPemohon} onChange={e => handleDataChange('namaPemohon', e.target.value)} placeholder="Contoh: Budi Santoso" />
                </div>
                <div className="form-group" style={{ animationDelay: '100ms' }}>
                  <label className="form-label">
                    {data.jenisTujuan === 'Sekolah' ? 'NIS / NISN' : 'NIM'}
                  </label>
                  <input className="form-input" value={data.nomorIdentitas} onChange={e => handleDataChange('nomorIdentitas', e.target.value)} placeholder="Nomor Identitas" />
                </div>
                <div className="form-group" style={{ animationDelay: '150ms' }}>
                  <label className="form-label">
                    {data.jenisTujuan === 'Sekolah' ? 'Kelas' : 'Program Studi'}
                  </label>
                  <input className="form-input" value={data.kelasAtauProdi} onChange={e => handleDataChange('kelasAtauProdi', e.target.value)} placeholder="Contoh: XII IPA 1" />
                </div>

                <h3 className="section-title" style={{ marginTop: '32px' }}><Edit3 size={14} color="var(--primary)"/> Tanda Tangan</h3>
                <div className="form-group" style={{ animationDelay: '200ms' }}>
                  <label className="form-label">Nama Penanda Tangan</label>
                  <input className="form-input" value={data.namaPenandatangan} onChange={e => handleDataChange('namaPenandatangan', e.target.value)} placeholder="Nama yang bertanda tangan" />
                </div>
                <div className="form-group" style={{ animationDelay: '250ms' }}>
                  <label className="form-label">Hubungan dengan Pemohon</label>
                  <select className="form-select" value={data.hubunganPenandatangan} onChange={e => handleDataChange('hubunganPenandatangan', e.target.value)}>
                    <option value="Diri Sendiri">Diri Sendiri (Pemohon)</option>
                    <option value="Orang Tua">Orang Tua</option>
                    <option value="Wali">Wali</option>
                  </select>
                </div>
              </div>
            )}

            {activeTab === 'tujuan' && (
              <div style={{ animationDelay: '0ms' }}>
                <h3 className="section-title"><Building size={14} color="var(--primary)"/> Instansi Tujuan</h3>
                <div className="form-group" style={{ animationDelay: '50ms' }}>
                  <label className="form-label">Jenis Instansi</label>
                  <select className="form-select" value={data.jenisTujuan} onChange={e => handleDataChange('jenisTujuan', e.target.value)}>
                    <option value="Sekolah">Sekolah</option>
                    <option value="Kampus">Kampus / Universitas</option>
                  </select>
                </div>
                <div className="form-group" style={{ animationDelay: '100ms' }}>
                  <label className="form-label">Nama {data.jenisTujuan}</label>
                  <input className="form-input" value={data.namaTujuan} onChange={e => handleDataChange('namaTujuan', e.target.value)} placeholder={`Contoh: ${data.jenisTujuan === 'Sekolah' ? 'SMA Negeri 1 Jakarta' : 'Universitas Indonesia'}`} />
                </div>
                <div className="form-group" style={{ animationDelay: '150ms' }}>
                  <label className="form-label">Alamat Lengkap</label>
                  <textarea className="form-textarea" value={data.alamatTujuan} onChange={e => handleDataChange('alamatTujuan', e.target.value)} placeholder="Alamat lengkap instansi..." />
                </div>

                <h3 className="section-title" style={{ marginTop: '32px' }}><Calendar size={14} color="var(--primary)"/> Tempat & Tanggal Surat</h3>
                <div className="grid-2">
                  <div className="form-group" style={{ animationDelay: '200ms' }}>
                    <label className="form-label">Kota Surat</label>
                    <input className="form-input" value={data.kotaSurat} onChange={e => handleDataChange('kotaSurat', e.target.value)} placeholder="Contoh: Jakarta" />
                  </div>
                  <div className="form-group" style={{ animationDelay: '250ms' }}>
                    <label className="form-label">Tanggal Surat</label>
                    <input type="date" className="form-input" value={data.tanggalSurat} onChange={e => handleDataChange('tanggalSurat', e.target.value)} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'izin' && (
              <div style={{ animationDelay: '0ms' }}>
                <h3 className="section-title"><Info size={14} color="var(--primary)"/> Keterangan Izin</h3>
                <div className="form-group" style={{ animationDelay: '50ms' }}>
                  <label className="form-label">Alasan Utama</label>
                  <select className="form-select" value={data.alasanIzin} onChange={e => handleDataChange('alasanIzin', e.target.value)} style={{ fontWeight: 'bold', color: 'var(--primary)' }}>
                    <option value="Sakit">Sakit</option>
                    <option value="Acara Keluarga">Acara Keluarga</option>
                    <option value="Lainnya">Lainnya...</option>
                  </select>
                </div>

                {/* DYNAMIC FIELDS */}
                {data.alasanIzin === 'Sakit' && (
                  <div style={{ background: 'rgba(59, 130, 246, 0.05)', padding: '16px', borderRadius: '12px', marginBottom: '20px', border: '1px dashed rgba(59, 130, 246, 0.3)' }}>
                    <div className="form-group" style={{ marginBottom: '12px' }}>
                      <label className="form-label">Sakit Apa? (Opsional)</label>
                      <input className="form-input" value={data.keteranganSakit} onChange={e => handleDataChange('keteranganSakit', e.target.value)} placeholder="Contoh: demam dan batuk" />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <input 
                        type="checkbox" 
                        id="lampiran" 
                        checked={data.lampiranDokter} 
                        onChange={e => handleDataChange('lampiranDokter', e.target.checked)}
                        style={{ width: '18px', height: '18px', accentColor: 'var(--primary)' }}
                      />
                      <label htmlFor="lampiran" className="form-label" style={{ margin: 0, cursor: 'pointer' }}>Ada Lampiran Surat Dokter?</label>
                    </div>
                  </div>
                )}

                {data.alasanIzin === 'Acara Keluarga' && (
                  <div className="form-group" style={{ animationDelay: '100ms' }}>
                    <label className="form-label">Jenis Acara Keluarga</label>
                    <input className="form-input" value={data.jenisAcara} onChange={e => handleDataChange('jenisAcara', e.target.value)} placeholder="Contoh: pernikahan kakak kandung, kedukaan, dll" />
                  </div>
                )}

                {data.alasanIzin === 'Lainnya' && (
                  <div className="form-group" style={{ animationDelay: '100ms' }}>
                    <label className="form-label">Keterangan Alasan Lengkap</label>
                    <textarea className="form-textarea" value={data.alasanLainnya} onChange={e => handleDataChange('alasanLainnya', e.target.value)} placeholder="Jelaskan alasan izin Anda..." />
                  </div>
                )}

                <h3 className="section-title" style={{ marginTop: '24px' }}><Calendar size={14} color="var(--primary)"/> Periode Izin</h3>
                <div className="grid-2">
                  <div className="form-group" style={{ animationDelay: '150ms' }}>
                    <label className="form-label">Mulai Tanggal</label>
                    <input type="date" className="form-input" value={data.tanggalMulai} onChange={e => handleDataChange('tanggalMulai', e.target.value)} />
                  </div>
                  <div className="form-group" style={{ animationDelay: '200ms' }}>
                    <label className="form-label">Sampai Tanggal</label>
                    <input type="date" className="form-input" value={data.tanggalSelesai} onChange={e => handleDataChange('tanggalSelesai', e.target.value)} />
                  </div>
                </div>
                
                {durasiHari() > 0 && (
                  <div style={{ padding: '12px', background: 'rgba(0,0,0,0.03)', borderRadius: '8px', fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)', textAlign: 'center' }}>
                    Total Durasi Izin: <span style={{ color: 'var(--primary)', fontSize: '14px' }}>{durasiHari()} Hari</span>
                  </div>
                )}
              </div>
            )}
          </div>
        </aside>

        {/* PREVIEW AREA */}
        <section className={`preview-area ${mobileView === 'preview' ? 'show-mobile' : ''}`}>
          <div className="paper-wrapper">
            <div className="paper">
              <div className="doc-header">
                {data.kotaSurat}, {formatDateSafe(data.tanggalSurat)}
              </div>
              
              <div className="doc-hal-lampiran">
                <table>
                  <tbody>
                    <tr>
                      <td style={{ width: '80px', verticalAlign: 'top' }}>Hal</td>
                      <td style={{ width: '20px', verticalAlign: 'top' }}>:</td>
                      <td style={{ fontWeight: 'bold' }}>Permohonan Izin {data.alasanIzin}</td>
                    </tr>
                    <tr>
                      <td style={{ verticalAlign: 'top' }}>Lampiran</td>
                      <td style={{ verticalAlign: 'top' }}>:</td>
                      <td>
                        {data.alasanIzin === 'Sakit' && data.lampiranDokter ? '1 (Satu) Lembar' : '-'}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="doc-tujuan">
                Yth. Bapak/Ibu {data.jenisTujuan === 'Sekolah' ? 'Wali Kelas / Kepala Sekolah' : 'Dosen / Pimpinan Fakultas'}<br/>
                <strong>{data.namaTujuan}</strong><br/>
                {data.alamatTujuan}
              </div>

              <div className="doc-salam">
                Dengan hormat,
              </div>

              <div className="doc-isi">
                <p style={{ textIndent: 0 }}>Yang bertanda tangan di bawah ini:</p>
                <table className="doc-identitas">
                  <tbody>
                    <tr>
                      <td className="col-label">Nama</td>
                      <td className="col-colon">:</td>
                      <td className="col-value">{data.namaPemohon}</td>
                    </tr>
                    <tr>
                      <td className="col-label">
                        {data.jenisTujuan === 'Sekolah' ? 'NIS / NISN' : 'NIM'}
                      </td>
                      <td className="col-colon">:</td>
                      <td className="col-value">{data.nomorIdentitas}</td>
                    </tr>
                    <tr>
                      <td className="col-label">
                        {data.jenisTujuan === 'Sekolah' ? 'Kelas' : 'Program Studi'}
                      </td>
                      <td className="col-colon">:</td>
                      <td className="col-value">{data.kelasAtauProdi}</td>
                    </tr>
                  </tbody>
                </table>
                
                <p>
                  Bermaksud untuk menyampaikan permohonan izin 
                  <strong> tidak dapat {data.jenisTujuan === 'Sekolah' ? 'mengikuti kegiatan belajar mengajar' : 'mengikuti perkuliahan'} </strong> 
                  pada tanggal <strong>{formatDateSafe(data.tanggalMulai)}</strong> 
                  {data.tanggalMulai !== data.tanggalSelesai ? ` sampai dengan tanggal ${formatDateSafe(data.tanggalSelesai)} (selama ${durasiHari()} hari)` : ''}.
                </p>
                
                <p>
                  Hal ini dikarenakan {data.hubunganPenandatangan === 'Diri Sendiri' ? 'saya' : 'anak saya'} sedang <strong>{generateAlasanText()}</strong>
                </p>

                <p>
                  Demikian surat permohonan izin ini {data.hubunganPenandatangan === 'Diri Sendiri' ? 'saya' : 'kami'} buat dengan sebenar-benarnya. Atas perhatian dan izin yang diberikan oleh Bapak/Ibu, {data.hubunganPenandatangan === 'Diri Sendiri' ? 'saya' : 'kami'} mengucapkan terima kasih.
                </p>
              </div>

              <div className="doc-ttd">
                <div className="doc-ttd-box">
                  Hormat {data.hubunganPenandatangan === 'Diri Sendiri' ? 'Saya' : 'Kami'},
                  <div className="doc-ttd-space"></div>
                  <div className="doc-ttd-name">{data.namaPenandatangan}</div>
                  <div style={{ fontSize: '10pt', marginTop: '4px' }}>
                    {data.hubunganPenandatangan !== 'Diri Sendiri' ? `(${data.hubunganPenandatangan})` : ''}
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      {/* MOBILE BOTTOM NAVIGATION */}
      <div className="mobile-nav no-print">
        <button 
          className={`mobile-nav-btn ${mobileView === 'editor' ? 'active' : ''}`}
          onClick={() => setMobileView('editor')}
        >
          <Edit3 size={16} /> Editor Form
        </button>
        <button 
          className={`mobile-nav-btn ${mobileView === 'preview' ? 'active' : ''}`}
          onClick={() => setMobileView('preview')}
        >
          <Eye size={16} /> Pratinjau
        </button>
      </div>

    </div>
  );
}

