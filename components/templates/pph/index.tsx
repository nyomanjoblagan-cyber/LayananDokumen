'use client';

import React, { useRef } from 'react';
import { Printer } from 'lucide-react';
import PrintWrapper from '@/components/PrintWrapper';

// ─────────────────────────────────────────────────────────────────────────────
//  DATA STATIS (ganti sesuai data aktual dari props/API)
// ─────────────────────────────────────────────────────────────────────────────
const DATA = {
  // Header
  nomorBuktiPotong: '1.1-12-26-0000001',
  masaAwal: '01',
  masaAkhir: '12',
  tahunPajak: '2026',
  kodeObjekPajak: '21-100-01',

  // Bagian A – Pemotong
  pemotong: {
    npwp: '01.234.567.8-901.000',
    nama: 'PT TECH INNOVATION NUSANTARA',
    alamat: 'Jl. Sudirman Kav. 52-53, Jakarta Selatan 12190',
  },

  // Bagian B – Penerima
  penerima: {
    npwp: '87.654.321.0-123.000',
    nik: '3174012345678901',
    nama: 'BUDI SANTOSO',
    alamat: 'Jl. Kebon Jeruk No. 12, Jakarta Barat 11530',
    jenisKelamin: 'L', // 'L' | 'P'
    statusPtkp: 'K/1',
    jabatan: 'SOFTWARE ENGINEER',
    masaKerjaAwal: '01',
    masaKerjaAkhir: '12',
  },

  // Bagian C – Rincian Penghasilan (semua dalam Rupiah penuh)
  penghasilan: {
    // Penghasilan Bruto
    gajiPensiun: 120_000_000,
    tunjanganPph: 0,
    tunjanganLainnya: 20_000_000,
    honorarium: 0,
    premiAsuransi: 5_000_000,
    naturaKenikmatan: 0,
    tantiem: 10_000_000,
    // (baris 8 = jumlah 1–7, dihitung otomatis)

    // Pengurang
    biayaJabatan: 6_000_000,
    iuranPensiun: 3_000_000,
    // (baris 11 = jumlah 9–10, dihitung otomatis)

    // PPh sebelumnya
    penghasilanNetoPrevious: 0,
    pphPrevious: 0,
  },

  // PTKP (sesuai status – K/1 = 63.000.000)
  ptkp: 63_000_000,

  // Bagian D – Tanggal & penandatangan
  tanggalTtd: '31 / 12 / 2026',
  namaPenandatangan: 'ANDIKA PRASETYO',
  jabatanPenandatangan: 'HR DIRECTOR',
};

// ─────────────────────────────────────────────────────────────────────────────
//  HELPER – FORMAT RUPIAH
// ─────────────────────────────────────────────────────────────────────────────
function fmt(n: number): string {
  if (n === 0) return '0';
  return n.toLocaleString('id-ID');
}

// ─────────────────────────────────────────────────────────────────────────────
//  HELPER – TARIF PROGRESIF PPh 21 (UU HPP / PMK 168/2023)
// ─────────────────────────────────────────────────────────────────────────────
interface TarifLayer {
  label: string;
  batasAtas: number;
  tarif: number;
  pkpDilapisan: number;
  pphDilapisan: number;
}

function hitungTarifProgresif(pkp: number): TarifLayer[] {
  const layers = [
    { label: 's.d. Rp 60.000.000', batasAtas: 60_000_000, tarif: 5 },
    { label: '> Rp 60.000.000 s.d. Rp 250.000.000', batasAtas: 250_000_000, tarif: 15 },
    { label: '> Rp 250.000.000 s.d. Rp 500.000.000', batasAtas: 500_000_000, tarif: 25 },
    { label: '> Rp 500.000.000 s.d. Rp 5.000.000.000', batasAtas: 5_000_000_000, tarif: 30 },
    { label: '> Rp 5.000.000.000', batasAtas: Infinity, tarif: 35 },
  ];

  let sisa = pkp > 0 ? pkp : 0;
  let prev = 0;
  return layers.map((l) => {
    const batas = l.batasAtas === Infinity ? sisa : Math.min(l.batasAtas - prev, sisa);
    const pkpDilapisan = Math.max(0, batas);
    const pphDilapisan = Math.round(pkpDilapisan * (l.tarif / 100));
    sisa -= pkpDilapisan;
    prev = l.batasAtas;
    return { ...l, pkpDilapisan, pphDilapisan };
  });
}

// ─────────────────────────────────────────────────────────────────────────────
//  KALKULASI OTOMATIS
// ─────────────────────────────────────────────────────────────────────────────
function kalkulasi() {
  const p = DATA.penghasilan;

  const bruto1 = p.gajiPensiun;
  const bruto2 = p.tunjanganPph;
  const bruto3 = p.tunjanganLainnya;
  const bruto4 = p.honorarium;
  const bruto5 = p.premiAsuransi;
  const bruto6 = p.naturaKenikmatan;
  const bruto7 = p.tantiem;
  const bruto8 = bruto1 + bruto2 + bruto3 + bruto4 + bruto5 + bruto6 + bruto7;

  const pengurang9  = p.biayaJabatan;
  const pengurang10 = p.iuranPensiun;
  const pengurang11 = pengurang9 + pengurang10;

  const neto12 = bruto8 - pengurang11;
  const neto13 = p.penghasilanNetoPrevious;
  const neto14 = neto12 + neto13;

  const ptkp15 = DATA.ptkp;
  const pkp16  = Math.max(0, neto14 - ptkp15);

  const layers = hitungTarifProgresif(pkp16);
  const pph17  = layers.reduce((acc, l) => acc + l.pphDilapisan, 0);
  const pph18  = p.pphPrevious;
  const pph19  = Math.max(0, pph17 - pph18);
  const pph20  = pph19;

  return {
    bruto1, bruto2, bruto3, bruto4, bruto5, bruto6, bruto7, bruto8,
    pengurang9, pengurang10, pengurang11,
    neto12, neto13, neto14,
    ptkp15, pkp16,
    layers, pph17, pph18, pph19, pph20,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
//  SUB-KOMPONEN: baris tabel
// ─────────────────────────────────────────────────────────────────────────────
function Row({
  no,
  label,
  value,
  bold,
  shaded,
}: {
  no: string | number;
  label: string;
  value: number | string;
  bold?: boolean;
  shaded?: boolean;
}) {
  return (
    <tr
      style={{
        background: shaded ? '#f1f5f9' : 'white',
        fontWeight: bold ? 700 : 400,
        borderBottom: '1px solid #000',
      }}
    >
      <td
        style={{
          borderRight: '1.5px solid #000',
          textAlign: 'center',
          padding: '4px 6px',
          verticalAlign: 'middle',
          whiteSpace: 'nowrap',
          fontSize: '10px',
        }}
      >
        {no}
      </td>
      <td
        style={{
          borderRight: '1.5px solid #000',
          padding: '4px 6px',
          verticalAlign: 'middle',
          fontSize: '10px',
        }}
      >
        {label}
      </td>
      <td
        style={{
          textAlign: 'right',
          padding: '4px 12px 4px 6px',
          fontFamily: 'monospace',
          fontSize: '10px',
          verticalAlign: 'middle',
          whiteSpace: 'nowrap',
        }}
      >
        {typeof value === 'number' ? fmt(value) : value}
      </td>
    </tr>
  );
}

function SectionHeader({ label }: { label: string }) {
  return (
    <tr>
      <td
        colSpan={3}
        style={{
          background: '#e2e8f0',
          fontWeight: 800,
          fontSize: '10px',
          padding: '4px 6px',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          borderBottom: '1.5px solid #000',
          borderTop: '1px solid #000',
        }}
      >
        {label}
      </td>
    </tr>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  KOMPONEN UTAMA
// ─────────────────────────────────────────────────────────────────────────────
export default function PphReportForm() {
  const printRef = useRef<HTMLDivElement>(null);
  const calc = kalkulasi();

  return (
    <div className="flex flex-col gap-6 items-center">
      
      {/* Container utama preview - full width untuk cetak A4 yang benar */}
      <div className="w-full max-w-[210mm] mx-auto overflow-x-auto custom-scrollbar pb-12">
        <div className="flex flex-col items-center w-full">
          <div
            ref={printRef}
            className="print-safe-area"
            style={{
              width: '210mm',
              minHeight: '297mm',
              margin: '0 auto',
              background: '#fff',
              boxShadow: '0 8px 40px rgba(0,0,0,0.1)',
              padding: '10mm',
              boxSizing: 'border-box',
              fontSize: '10px',
              color: '#000',
              lineHeight: 1.4,
              fontFamily: "'Arial','Helvetica Neue',sans-serif",
            }}
          >
            <style dangerouslySetInnerHTML={{__html: `
              @media print {
                @page { size: A4 portrait; margin: 10mm; }
                body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
                .print-safe-area { box-shadow: none !important; }
              }
            `}} />
            <div style={{ border: '2px solid #000' }}>

              {/* ── HEADER ── */}
              <div style={{ display: 'flex', borderBottom: '2px solid #000' }}>
                {/* Logo DJP */}
                <div
                  style={{
                    width: '18%',
                    borderRight: '2px solid #000',
                    padding: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    gap: '4px',
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      border: '2px solid #000',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 900,
                      fontSize: '11px',
                      letterSpacing: '-1px',
                    }}
                  >
                    DJP
                  </div>
                  <p style={{ fontSize: '7px', fontWeight: 900, letterSpacing: '0.08em', margin: 0 }}>
                    KEMENTERIAN KEUANGAN RI
                  </p>
                  <p style={{ fontSize: '7px', fontWeight: 900, letterSpacing: '0.08em', margin: 0 }}>
                    DIREKTORAT JENDERAL PAJAK
                  </p>
                </div>

                {/* Judul */}
                <div
                  style={{
                    flex: 1,
                    borderRight: '2px solid #000',
                    padding: '10px 12px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    gap: '4px',
                  }}
                >
                  <h1
                    style={{
                      fontSize: '13px',
                      fontWeight: 900,
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em',
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    Bukti Pemotongan Pajak Penghasilan<br />Pasal 21
                  </h1>
                  <p style={{ fontSize: '9px', fontWeight: 600, margin: 0 }}>
                    Bagi Pegawai Tetap atau Penerima Pensiun atau<br />
                    Tunjangan Hari Tua / Jaminan Hari Tua Berkala
                  </p>
                </div>

                {/* Nomor Formulir */}
                <div
                  style={{
                    width: '20%',
                    padding: '8px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center',
                    gap: '6px',
                  }}
                >
                  <div
                    style={{
                      border: '2px solid #000',
                      padding: '4px 8px',
                      fontWeight: 900,
                      fontSize: '11px',
                      letterSpacing: '0.02em',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    FORMULIR 1721 – A1
                  </div>
                  <p style={{ fontSize: '8px', fontWeight: 600, fontStyle: 'italic', margin: 0 }}>
                    Lembar 1: Untuk Penerima Penghasilan
                  </p>
                </div>
              </div>

              {/* ── NOMOR & MASA ── */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '5px 8px',
                  borderBottom: '2px solid #000',
                  fontSize: '10px',
                  fontWeight: 700,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span>NOMOR :</span>
                  <span
                    style={{
                      fontFamily: 'monospace',
                      letterSpacing: '0.15em',
                      borderBottom: '1px dotted #000',
                      padding: '0 8px 2px',
                    }}
                  >
                    {DATA.nomorBuktiPotong}
                  </span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>Masa Perolehan Penghasilan :</span>
                  <span style={{ border: '1px solid #000', padding: '1px 6px', fontFamily: 'monospace', fontWeight: 900 }}>
                    {DATA.masaAwal}
                  </span>
                  <span>–</span>
                  <span style={{ border: '1px solid #000', padding: '1px 6px', fontFamily: 'monospace', fontWeight: 900 }}>
                    {DATA.masaAkhir}
                  </span>
                  <span style={{ marginLeft: '4px' }}>Tahun Pajak:</span>
                  <span style={{ border: '1px solid #000', padding: '1px 6px', fontFamily: 'monospace', fontWeight: 900 }}>
                    {DATA.tahunPajak}
                  </span>
                </div>
              </div>

              {/* ── BAGIAN A ── */}
              <div style={{ background: '#e2e8f0', borderBottom: '1.5px solid #000', padding: '4px 8px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                A. Identitas Pemotong PPh Pasal 21
              </div>
              <div style={{ borderBottom: '1.5px solid #000', padding: '6px 10px', fontSize: '10px', fontWeight: 600, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {([
                  ['1. NPWP', DATA.pemotong.npwp, true],
                  ['2. Nama', DATA.pemotong.nama, false],
                  ['3. Alamat', DATA.pemotong.alamat, false],
                ] as [string, string, boolean][]).map(([key, val, mono]) => (
                  <div key={key} style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ width: '22%', fontWeight: 700 }}>{key}</div>
                    <div style={{ marginRight: '6px' }}>:</div>
                    <div style={{ fontFamily: mono ? 'monospace' : 'inherit', letterSpacing: mono ? '0.15em' : 'normal', border: mono ? '1.5px solid #000' : 'none', padding: mono ? '2px 8px' : '0' }}>
                      {val}
                    </div>
                  </div>
                ))}
              </div>

              {/* ── BAGIAN B ── */}
              <div style={{ background: '#e2e8f0', borderBottom: '1.5px solid #000', padding: '4px 8px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                B. Identitas Penerima Penghasilan yang Dipotong
              </div>
              <div style={{ borderBottom: '1.5px solid #000', padding: '6px 10px', fontSize: '10px', fontWeight: 600, display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {/* NPWP */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '22%', fontWeight: 700 }}>1. NPWP</div>
                  <div style={{ marginRight: '6px' }}>:</div>
                  <span style={{ fontFamily: 'monospace', letterSpacing: '0.15em', border: '1.5px solid #000', padding: '2px 8px' }}>{DATA.penerima.npwp}</span>
                </div>
                {/* NIK */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '22%', fontWeight: 700 }}>2. NIK / No. Paspor</div>
                  <div style={{ marginRight: '6px' }}>:</div>
                  <span style={{ fontFamily: 'monospace', letterSpacing: '0.15em', border: '1.5px solid #000', padding: '2px 8px' }}>{DATA.penerima.nik}</span>
                </div>
                {/* Nama */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '22%', fontWeight: 700 }}>3. Nama</div>
                  <div style={{ marginRight: '6px' }}>:</div>
                  <span style={{ borderBottom: '1px dotted #000', paddingBottom: '1px', minWidth: '160px' }}>{DATA.penerima.nama}</span>
                </div>
                {/* Alamat */}
                <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                  <div style={{ width: '22%', fontWeight: 700 }}>4. Alamat</div>
                  <div style={{ marginRight: '6px', paddingTop: '1px' }}>:</div>
                  <span style={{ borderBottom: '1px dotted #000', paddingBottom: '1px', flex: 1 }}>{DATA.penerima.alamat}</span>
                </div>
                {/* Jenis Kelamin */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '22%', fontWeight: 700 }}>5. Jenis Kelamin</div>
                  <div style={{ marginRight: '6px' }}>:</div>
                  <div style={{ display: 'flex', gap: '24px' }}>
                    {(['L', 'P'] as const).map((jk) => (
                      <span key={jk} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span style={{ width: '14px', height: '14px', border: '1.5px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '10px' }}>
                          {DATA.penerima.jenisKelamin === jk ? '✓' : ''}
                        </span>
                        {jk === 'L' ? 'Laki-laki' : 'Perempuan'}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Status PTKP */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '22%', fontWeight: 700 }}>6. Status PTKP</div>
                  <div style={{ marginRight: '6px' }}>:</div>
                  <span style={{ border: '1.5px solid #000', padding: '2px 12px', fontWeight: 900, fontSize: '11px', fontFamily: 'monospace' }}>{DATA.penerima.statusPtkp}</span>
                  <span style={{ marginLeft: '16px', fontSize: '9px', color: '#555' }}>(PTKP: Rp {fmt(DATA.ptkp)})</span>
                </div>
                {/* Jabatan */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '22%', fontWeight: 700 }}>7. Jabatan</div>
                  <div style={{ marginRight: '6px' }}>:</div>
                  <span style={{ borderBottom: '1px dotted #000', paddingBottom: '1px', minWidth: '200px' }}>{DATA.penerima.jabatan}</span>
                </div>
                {/* Masa Kerja */}
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div style={{ width: '22%', fontWeight: 700 }}>8. Masa Kerja</div>
                  <div style={{ marginRight: '6px' }}>:</div>
                  <span style={{ marginRight: '6px' }}>Bulan</span>
                  <span style={{ border: '1px solid #000', padding: '1px 8px', fontFamily: 'monospace', fontWeight: 700 }}>{DATA.penerima.masaKerjaAwal}</span>
                  <span style={{ margin: '0 6px' }}>s.d.</span>
                  <span style={{ border: '1px solid #000', padding: '1px 8px', fontFamily: 'monospace', fontWeight: 700 }}>{DATA.penerima.masaKerjaAkhir}</span>
                  <span style={{ marginLeft: '6px' }}>Tahun {DATA.tahunPajak}</span>
                </div>
              </div>

              {/* ── BAGIAN C ── */}
              <div style={{ background: '#e2e8f0', borderBottom: '1.5px solid #000', padding: '4px 8px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                C. Rincian Penghasilan dan Penghitungan PPh Pasal 21
              </div>
              <div style={{ borderBottom: '1px solid #000', padding: '3px 8px', fontSize: '9px', fontWeight: 700, background: '#f8fafc', letterSpacing: '0.05em' }}>
                Kode Objek Pajak: <strong>{DATA.kodeObjekPajak}</strong> — Pegawai Tetap
              </div>

              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10px' }}>
                <thead>
                  <tr style={{ background: '#cbd5e1', fontWeight: 800, borderBottom: '2px solid #000' }}>
                    <th style={{ width: '36px', borderRight: '1.5px solid #000', padding: '5px 4px', textAlign: 'center', fontSize: '10px' }}>NO</th>
                    <th style={{ borderRight: '1.5px solid #000', padding: '5px 8px', textAlign: 'left', fontSize: '10px' }}>URAIAN</th>
                    <th style={{ width: '140px', padding: '5px 12px 5px 6px', textAlign: 'right', fontSize: '10px' }}>JUMLAH (Rp)</th>
                  </tr>
                </thead>
                <tbody>
                  {/* PENGHASILAN BRUTO */}
                  <SectionHeader label="PENGHASILAN BRUTO" />
                  <Row no={1}  label="Gaji / Pensiun atau THT / JHT" value={calc.bruto1} />
                  <Row no={2}  label="Tunjangan PPh" value={calc.bruto2} />
                  <Row no={3}  label="Tunjangan Lainnya, Uang Lembur, dsb." value={calc.bruto3} />
                  <Row no={4}  label="Honorarium dan Imbalan Lainnya sejenis" value={calc.bruto4} />
                  <Row no={5}  label="Premi Asuransi yang dibayar Pemberi Kerja" value={calc.bruto5} />
                  <Row no={6}  label="Penerimaan dalam Bentuk Natura / Kenikmatan Lainnya" value={calc.bruto6} />
                  <Row no={7}  label="Tantiem, Bonus, Gratifikasi, Jasa Produksi, dan THR" value={calc.bruto7} />
                  <Row no={8}  label="JUMLAH PENGHASILAN BRUTO (1 s.d. 7)" value={calc.bruto8} bold shaded />

                  {/* PENGURANG */}
                  <SectionHeader label="PENGURANG" />
                  <Row no={9}  label="Biaya Jabatan / Biaya Pensiun" value={calc.pengurang9} />
                  <Row no={10} label="Iuran Pensiun atau Iuran THT / JHT" value={calc.pengurang10} />
                  <Row no={11} label="JUMLAH PENGURANG (9 s.d. 10)" value={calc.pengurang11} bold shaded />

                  {/* PENGHITUNGAN PPh */}
                  <SectionHeader label="PENGHITUNGAN PPh PASAL 21" />
                  <Row no={12} label="Jumlah Penghasilan Neto (8 – 11)" value={calc.neto12} />
                  <Row no={13} label="Penghasilan Neto Masa Sebelumnya" value={calc.neto13} />
                  <Row no={14} label="JUMLAH PENGHASILAN NETO UNTUK PENGHITUNGAN PPh PASAL 21 (12 + 13)" value={calc.neto14} bold shaded />
                  <Row no={15} label={`Penghasilan Tidak Kena Pajak (PTKP) — Status: ${DATA.penerima.statusPtkp}`} value={calc.ptkp15} />
                  <Row no={16} label="PENGHASILAN KENA PAJAK (PKP) SETAHUN / DISETAHUNKAN (14 – 15)" value={calc.pkp16} bold shaded />

                  {/* Rincian Tarif Progresif */}
                  <tr>
                    <td colSpan={3} style={{ background: '#f8fafc', borderBottom: '1px solid #000', borderTop: '1px solid #000', padding: '3px 8px', fontSize: '9px', fontWeight: 700 }}>
                      Rincian Penerapan Tarif Progresif PPh Pasal 17 atas PKP Rp {fmt(calc.pkp16)}
                    </td>
                  </tr>
                  {calc.layers.map((layer, idx) => (
                    <tr key={idx} style={{ background: idx % 2 === 0 ? '#fff' : '#f8fafc', borderBottom: '1px dotted #666', fontSize: '9px' }}>
                      <td style={{ borderRight: '1.5px solid #000', textAlign: 'center', padding: '3px 4px', color: '#555' }}>{idx + 1}</td>
                      <td style={{ borderRight: '1.5px solid #000', padding: '3px 8px 3px 24px', color: '#222' }}>
                        Lapisan {layer.label} × {layer.tarif}% → Rp {fmt(layer.pkpDilapisan)} × {layer.tarif}%
                      </td>
                      <td style={{ textAlign: 'right', padding: '3px 12px 3px 6px', fontFamily: 'monospace', color: '#222' }}>{fmt(layer.pphDilapisan)}</td>
                    </tr>
                  ))}

                  <Row no={17} label="PPh Pasal 21 atas Penghasilan Kena Pajak Setahun / Disetahunkan" value={calc.pph17} bold shaded />
                  <Row no={18} label="PPh Pasal 21 yang Telah Dipotong Masa Sebelumnya" value={calc.pph18} />
                  <Row no={19} label="PPh PASAL 21 TERUTANG (17 – 18)" value={calc.pph19} bold shaded />
                  <Row no={20} label="PPh PASAL 21 DAN PPh PASAL 26 YANG TELAH DIPOTONG DAN DILUNASI" value={calc.pph20} bold shaded />
                </tbody>
              </table>

              {/* ── BAGIAN D ── */}
              <div style={{ background: '#e2e8f0', borderTop: '2px solid #000', borderBottom: '1.5px solid #000', padding: '4px 8px', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                D. Identitas Pemotong
              </div>
              <div style={{ display: 'flex', padding: '10px 12px', gap: '12px' }}>
                {/* Kiri */}
                <div style={{ flex: 1, fontSize: '10px', fontWeight: 600, display: 'flex', flexDirection: 'column', gap: '5px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ width: '60px', fontWeight: 700 }}>NPWP</span>
                    <span style={{ marginRight: '6px' }}>:</span>
                    <span style={{ fontFamily: 'monospace', letterSpacing: '0.1em', border: '1.5px solid #000', padding: '2px 8px', fontSize: '9px' }}>{DATA.pemotong.npwp}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span style={{ width: '60px', fontWeight: 700 }}>NAMA</span>
                    <span style={{ marginRight: '6px' }}>:</span>
                    <span>{DATA.pemotong.nama}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <span style={{ width: '60px', fontWeight: 700 }}>ALAMAT</span>
                    <span style={{ marginRight: '6px' }}>:</span>
                    <span style={{ flex: 1 }}>{DATA.pemotong.alamat}</span>
                  </div>
                  <div style={{ marginTop: '8px', padding: '6px 8px', border: '1px solid #94a3b8', borderRadius: '4px', fontSize: '8px', color: '#374151', background: '#f8fafc', lineHeight: 1.5 }}>
                    Dengan ini saya menyatakan bahwa informasi yang tertera pada formulir ini adalah benar, lengkap, dan jelas sesuai dengan keadaan yang sebenarnya (Pasal 7 ayat (1) UU KUP — sanksi pidana bila keterangan tidak benar).
                  </div>
                </div>
                {/* Kanan: TTD */}
                <div style={{ width: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 600 }}>
                    Tanggal: <span style={{ borderBottom: '1px dotted #000', display: 'inline-block', minWidth: '100px', textAlign: 'center', paddingBottom: '1px' }}>{DATA.tanggalTtd}</span>
                  </div>
                  <div style={{ width: '180px', height: '80px', border: '1.5px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', background: '#fafafa' }}>
                    <span style={{ color: '#cbd5e1', fontWeight: 700, fontSize: '9px', letterSpacing: '0.1em' }}>TANDA TANGAN &amp; CAP</span>
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.06, pointerEvents: 'none' }}>
                      <div style={{ width: '64px', height: '64px', borderRadius: '50%', border: '4px double #000', transform: 'rotate(-15deg)' }} />
                    </div>
                  </div>
                  <div style={{ borderBottom: '1.5px solid #000', width: '180px', textAlign: 'center', paddingBottom: '2px', fontWeight: 800, fontSize: '10px' }}>{DATA.namaPenandatangan}</div>
                  <div style={{ fontSize: '9px', fontWeight: 600, textAlign: 'center', color: '#374151' }}>{DATA.jabatanPenandatangan}</div>
                </div>
              </div>

              {/* Footer Formulir */}
              <div style={{ borderTop: '2px solid #000', padding: '4px 8px', fontSize: '8px', fontWeight: 600, color: '#374151', display: 'flex', justifyContent: 'space-between', background: '#f8fafc' }}>
                <span>Formulir 1721-A1 · PMK-168/PMK.03/2023 · Diperbarui sesuai UU HPP No. 7 Tahun 2021</span>
                <span>Lembar 1 dari 2 (Lembar 2 untuk Pemotong)</span>
              </div>

            </div>

            {/* Catatan kaki */}
            <div style={{ marginTop: '8px', fontSize: '8px', fontWeight: 600, color: '#64748b', textAlign: 'center', lineHeight: 1.6 }}>
              Dokumen ini dicetak secara otomatis dan merupakan Bukti Pemotongan PPh Pasal 21 yang sah.
            </div>
          </div>
                  <div className="no-print mt-8 mb-4">
            <button onClick={() => window.dispatchEvent(new Event('open-print-modal'))} className="bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 hover:bg-emerald-600 transition-all cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
              Cetak / Print
            </button>
            <PrintWrapper documentName="Cetak_Dokumen" price={15000} />
          </div>
        </div>
      </div>
    </div>
  );
}
