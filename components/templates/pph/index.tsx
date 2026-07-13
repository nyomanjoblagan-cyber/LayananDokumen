'use client';

import React, { useRef } from 'react';
import { Printer } from 'lucide-react';

export default function PphReportForm() {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 print:py-0 print:bg-white font-sans text-xs">
      <div className="max-w-4xl mx-auto mb-6 print:hidden flex justify-between items-center px-4">
        <h2 className="text-xl font-bold text-slate-800">Pratinjau Bukti Potong PPh 21 (1721-A1)</h2>
        <button 
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 transition-colors text-white px-6 py-2.5 rounded-lg shadow-lg font-bold flex items-center gap-2"
        >
          <Printer size={18} />
          Cetak PDF (A4)
        </button>
      </div>
      
      {/* KERTAS A4 (210mm x 297mm) */}
      <div 
        ref={printRef}
        className="w-[210mm] min-h-[297mm] mx-auto bg-white p-10 shadow-2xl print:shadow-none print:p-0 print:m-0 print:w-full print:h-full relative overflow-hidden"
      >
        <div className="border-[1.5px] border-black">
          {/* HEADER FORM */}
          <div className="flex border-b-[1.5px] border-black">
            <div className="w-[20%] border-r-[1.5px] border-black p-2 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 border-[1.5px] border-black rounded-full mb-1 flex items-center justify-center font-black text-sm tracking-tighter">
                DJP
              </div>
              <p className="text-[7px] font-black tracking-widest mt-1">KEMENTERIAN KEUANGAN RI</p>
              <p className="text-[7px] font-black tracking-widest">DIREKTORAT JENDERAL PAJAK</p>
            </div>
            <div className="w-[60%] border-r-[1.5px] border-black p-3 text-center flex flex-col justify-center">
              <h1 className="text-[13px] font-black uppercase tracking-tight leading-tight">Bukti Pemotongan Pajak Penghasilan<br/>Pasal 21</h1>
              <p className="text-[9px] font-semibold mt-1">Bagi Pegawai Tetap atau Penerima Pensiun atau<br/>Tunjangan Hari Tua/Jaminan Hari Tua Berkala</p>
            </div>
            <div className="w-[20%] p-2 flex flex-col items-center justify-center text-center">
              <div className="border-[1.5px] border-black px-2 py-1 text-sm font-black whitespace-nowrap">
                FORMULIR 1721 - A1
              </div>
              <p className="text-[8px] mt-1 font-semibold italic">Lembar 1: Untuk Penerima</p>
            </div>
          </div>

          <div className="border-b-[1.5px] border-black p-2 flex justify-between items-center text-[10px] font-black">
            <div className="flex items-center gap-2">
              <span>NOMOR :</span>
              <span className="tracking-[0.2em] font-mono border-b border-black border-dotted px-2">1.1 - 12 - 26 - 0000001</span>
            </div>
            <div>
              Masa Perolehan Penghasilan [ 0 1 ] - [ 1 2 ]
            </div>
          </div>

          {/* BAGIAN A */}
          <div className="bg-slate-50 border-b-[1.5px] border-black p-1.5 text-[10px] font-black uppercase tracking-widest">
            A. IDENTITAS PEMOTONG PPh PASAL 21
          </div>
          <div className="p-2 border-b-[1.5px] border-black space-y-1.5 text-[10px] font-bold">
            <div className="flex">
              <div className="w-[25%]">1. NPWP</div>
              <div className="w-[75%] flex items-center gap-1">: <span className="font-mono tracking-[0.3em] border-[1.5px] border-black px-3 py-0.5">0 1 . 2 3 4 . 5 6 7 . 8 - 9 0 1 . 0 0 0</span></div>
            </div>
            <div className="flex">
              <div className="w-[25%]">2. NAMA</div>
              <div className="w-[75%]">: PT TECH INNOVATION NUSANTARA</div>
            </div>
          </div>

          {/* BAGIAN B */}
          <div className="bg-slate-50 border-b-[1.5px] border-black p-1.5 text-[10px] font-black uppercase tracking-widest">
            B. IDENTITAS PENERIMA PENGHASILAN YANG DIPOTONG
          </div>
          <div className="p-2 border-b-[1.5px] border-black space-y-1.5 text-[10px] font-bold">
            <div className="flex">
              <div className="w-[25%]">1. NPWP</div>
              <div className="w-[75%] flex items-center gap-1">: <span className="font-mono tracking-[0.3em] border-[1.5px] border-black px-3 py-0.5">8 7 . 6 5 4 . 3 2 1 . 0 - 1 2 3 . 0 0 0</span></div>
            </div>
            <div className="flex">
              <div className="w-[25%]">2. NIK / NO. PASPOR</div>
              <div className="w-[75%] flex items-center gap-1">: <span className="font-mono tracking-[0.3em] border-[1.5px] border-black px-3 py-0.5">3 1 7 4 0 1 2 3 4 5 6 7 8 9 0 1</span></div>
            </div>
            <div className="flex">
              <div className="w-[25%]">3. NAMA</div>
              <div className="w-[75%] border-b border-black border-dotted w-max pr-8 pb-0.5">: BUDI SANTOSO</div>
            </div>
            <div className="flex">
              <div className="w-[25%]">4. ALAMAT</div>
              <div className="w-[75%] border-b border-black border-dotted w-max pr-8 pb-0.5">: JL. SUDIRMAN KAV. 1, JAKARTA SELATAN</div>
            </div>
            <div className="flex items-center pt-1">
              <div className="w-[25%]">5. JENIS KELAMIN</div>
              <div className="w-[75%] flex items-center gap-6">
                <span className="flex items-center gap-2"><div className="w-3 h-3 border-[1.5px] border-black flex items-center justify-center font-black">X</div> Laki-laki</span>
                <span className="flex items-center gap-2"><div className="w-3 h-3 border-[1.5px] border-black"></div> Perempuan</span>
              </div>
            </div>
            <div className="flex items-center pt-1">
              <div className="w-[25%]">6. STATUS PTKP</div>
              <div className="w-[75%] flex items-center gap-4">
                <div className="flex items-center gap-2">
                   <span>:</span> 
                   <div className="border-[1.5px] border-black px-2 py-0.5 font-black">K / 1</div>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="w-[25%]">7. JABATAN</div>
              <div className="w-[75%] border-b border-black border-dotted w-max pr-8 pb-0.5">: SOFTWARE ENGINEER</div>
            </div>
          </div>

          {/* BAGIAN C */}
          <div className="bg-slate-50 border-b-[1.5px] border-black p-1.5 text-[10px] font-black uppercase tracking-widest">
            C. RINCIAN PENGHASILAN DAN PENGHITUNGAN PPh PASAL 21
          </div>
          <table className="w-full text-[10px]">
            <thead>
              <tr className="border-b-[1.5px] border-black font-black">
                <th className="w-10 border-r-[1.5px] border-black p-1.5 text-center">NO</th>
                <th className="border-r-[1.5px] border-black p-1.5 text-center">URAIAN</th>
                <th className="w-36 p-1.5 text-center">JUMLAH (Rp)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-slate-100 font-bold border-b border-black">
                <td className="border-r-[1.5px] border-black p-1"></td>
                <td className="border-r-[1.5px] border-black p-1 text-[9px] uppercase tracking-wider">KODE OBJEK PAJAK: 21-100-01</td>
                <td className="p-1"></td>
              </tr>
              <tr className="bg-slate-100 font-bold border-b border-black">
                <td className="border-r-[1.5px] border-black p-1"></td>
                <td className="border-r-[1.5px] border-black p-1">PENGHASILAN BRUTO</td>
                <td className="p-1"></td>
              </tr>
              
              {/* PENGHASILAN BRUTO ROWS */}
              {[
                { no: '1', label: 'Gaji/Pensiun atau THT/JHT', value: '120.000.000' },
                { no: '2', label: 'Tunjangan PPh', value: '0' },
                { no: '3', label: 'Tunjangan Lainnya, Uang Lembur dsb', value: '20.000.000' },
                { no: '4', label: 'Honorarium dan Imbalan Lainnya sejenis', value: '0' },
                { no: '5', label: 'Premi Asuransi yang dibayar Pemberi Kerja', value: '5.000.000' },
                { no: '6', label: 'Penerimaan dalam bentuk Natura/Kenikmatan Lainnya', value: '0' },
                { no: '7', label: 'Tantiem, Bonus, Gratifikasi, Jasa Produksi, dan THR', value: '10.000.000' },
              ].map(item => (
                <tr key={item.no} className="border-b border-black border-dotted font-medium">
                  <td className="border-r-[1.5px] border-black text-center p-1.5">{item.no}</td>
                  <td className="border-r-[1.5px] border-black p-1.5">{item.label}</td>
                  <td className="p-1.5 text-right font-mono pr-4">{item.value}</td>
                </tr>
              ))}
              <tr className="border-b-[1.5px] border-black font-black bg-slate-50">
                <td className="border-r-[1.5px] border-black text-center p-1.5">8</td>
                <td className="border-r-[1.5px] border-black p-1.5">JUMLAH PENGHASILAN BRUTO (1 s.d. 7)</td>
                <td className="p-1.5 text-right font-mono pr-4">155.000.000</td>
              </tr>
              
              {/* PENGURANGAN */}
              <tr className="bg-slate-100 font-bold border-b border-black">
                <td className="border-r-[1.5px] border-black p-1"></td>
                <td className="border-r-[1.5px] border-black p-1">PENGURANGAN</td>
                <td className="p-1"></td>
              </tr>
              <tr className="border-b border-black border-dotted font-medium">
                <td className="border-r-[1.5px] border-black text-center p-1.5">9</td>
                <td className="border-r-[1.5px] border-black p-1.5">Biaya Jabatan / Biaya Pensiun</td>
                <td className="p-1.5 text-right font-mono pr-4">6.000.000</td>
              </tr>
              <tr className="border-b border-black border-dotted font-medium">
                <td className="border-r-[1.5px] border-black text-center p-1.5">10</td>
                <td className="border-r-[1.5px] border-black p-1.5">Iuran Pensiun atau Iuran THT/JHT</td>
                <td className="p-1.5 text-right font-mono pr-4">3.000.000</td>
              </tr>
              <tr className="border-b-[1.5px] border-black font-black bg-slate-50">
                <td className="border-r-[1.5px] border-black text-center p-1.5">11</td>
                <td className="border-r-[1.5px] border-black p-1.5">JUMLAH PENGURANGAN (9 s.d. 10)</td>
                <td className="p-1.5 text-right font-mono pr-4">9.000.000</td>
              </tr>

              {/* PENGHITUNGAN PPh */}
              <tr className="bg-slate-100 font-bold border-b border-black">
                <td className="border-r-[1.5px] border-black p-1"></td>
                <td className="border-r-[1.5px] border-black p-1">PENGHITUNGAN PPh PASAL 21</td>
                <td className="p-1"></td>
              </tr>
              <tr className="border-b border-black border-dotted font-medium">
                <td className="border-r-[1.5px] border-black text-center p-1.5">12</td>
                <td className="border-r-[1.5px] border-black p-1.5">Jumlah Penghasilan Neto (8 - 11)</td>
                <td className="p-1.5 text-right font-mono pr-4">146.000.000</td>
              </tr>
              <tr className="border-b border-black border-dotted font-medium">
                <td className="border-r-[1.5px] border-black text-center p-1.5">13</td>
                <td className="border-r-[1.5px] border-black p-1.5">Penghasilan Neto Masa Sebelumnya</td>
                <td className="p-1.5 text-right font-mono pr-4">0</td>
              </tr>
              <tr className="border-b-[1.5px] border-black font-black bg-slate-50">
                <td className="border-r-[1.5px] border-black text-center p-1.5">14</td>
                <td className="border-r-[1.5px] border-black p-1.5">JUMLAH PENGHASILAN NETO UNTUK PENGHITUNGAN PPh Psl 21 (12 + 13)</td>
                <td className="p-1.5 text-right font-mono pr-4">146.000.000</td>
              </tr>
              <tr className="border-b border-black border-dotted font-medium">
                <td className="border-r-[1.5px] border-black text-center p-1.5">15</td>
                <td className="border-r-[1.5px] border-black p-1.5">Penghasilan Tidak Kena Pajak (PTKP)</td>
                <td className="p-1.5 text-right font-mono pr-4">63.000.000</td>
              </tr>
              <tr className="border-b-[1.5px] border-black font-black bg-slate-50">
                <td className="border-r-[1.5px] border-black text-center p-1.5">16</td>
                <td className="border-r-[1.5px] border-black p-1.5">PENGHASILAN KENA PAJAK SETAHUN/DISETAHUNKAN (14 - 15)</td>
                <td className="p-1.5 text-right font-mono pr-4">83.000.000</td>
              </tr>
              <tr className="border-b border-black border-dotted font-medium">
                <td className="border-r-[1.5px] border-black text-center p-1.5">17</td>
                <td className="border-r-[1.5px] border-black p-1.5">PPh Pasal 21 atas Penghasilan Kena Pajak Setahun/Disetahunkan</td>
                <td className="p-1.5 text-right font-mono pr-4">6.450.000</td>
              </tr>
              <tr className="border-b border-black border-dotted font-medium">
                <td className="border-r-[1.5px] border-black text-center p-1.5">18</td>
                <td className="border-r-[1.5px] border-black p-1.5">PPh Pasal 21 yang telah dipotong Masa Sebelumnya</td>
                <td className="p-1.5 text-right font-mono pr-4">0</td>
              </tr>
              <tr className="border-b-[1.5px] border-black font-black bg-slate-50">
                <td className="border-r-[1.5px] border-black text-center p-1.5">19</td>
                <td className="border-r-[1.5px] border-black p-1.5">PPh PASAL 21 TERUTANG</td>
                <td className="p-1.5 text-right font-mono pr-4">6.450.000</td>
              </tr>
              <tr className="font-black bg-slate-50">
                <td className="border-r-[1.5px] border-black text-center p-1.5">20</td>
                <td className="border-r-[1.5px] border-black p-1.5">PPh PASAL 21 DAN PPh PASAL 26 YANG TELAH DIPOTONG DAN DILUNASI</td>
                <td className="p-1.5 text-right font-mono pr-4">6.450.000</td>
              </tr>
            </tbody>
          </table>

          {/* BAGIAN D: TANDA TANGAN */}
          <div className="bg-slate-50 border-t-[1.5px] border-b-[1.5px] border-black p-1.5 text-[10px] font-black uppercase tracking-widest">
            D. IDENTITAS PEMOTONG
          </div>
          <div className="p-4 flex justify-between">
            <div className="w-[50%] flex flex-col space-y-2 text-[10px] font-bold">
              <div className="flex">
                <div className="w-[20%]">NPWP</div>
                <div className="w-[80%] flex items-center gap-1">: <span className="font-mono tracking-[0.2em] border-[1.5px] border-black px-2">0 1 . 2 3 4 . 5 6 7 . 8 - 9 0 1 . 0 0 0</span></div>
              </div>
              <div className="flex">
                <div className="w-[20%]">NAMA</div>
                <div className="w-[80%]">: PT TECH INNOVATION NUSANTARA</div>
              </div>
            </div>
            <div className="w-[40%] flex flex-col items-center">
              <div className="mb-2 text-[10px] font-bold">Tanggal: <span className="border-b border-black border-dotted inline-block w-32 text-center pb-0.5">31 / 12 / 2026</span></div>
              <div className="w-56 h-28 border-[1.5px] border-black flex items-center justify-center relative bg-slate-50/50">
                <span className="text-slate-300 italic text-[10px] font-bold tracking-widest">Tanda Tangan & Cap</span>
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                   <div className="w-16 h-16 rounded-full border-4 border-black border-double rotate-[-15deg]"></div>
                </div>
              </div>
              <div className="mt-2 border-b border-black w-48 text-center font-black text-[10px]">HR DIRECTOR</div>
            </div>
          </div>
        </div>
        
        {/* FOOTNOTE */}
        <div className="mt-4 text-[8px] font-bold text-slate-500 text-center">
          Dokumen ini dicetak secara otomatis dan merupakan bukti pemotongan PPh Pasal 21 yang sah.
        </div>
      </div>
    </div>
  );
}
