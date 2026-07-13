import React from 'react';

const IzinBarangTemplate = () => {
  return (
    <div className="w-full max-w-5xl mx-auto bg-white p-10 shadow-xl text-sm text-gray-800 font-sans border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-start border-b-4 border-slate-800 pb-6 mb-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 bg-slate-800 flex items-center justify-center font-bold text-white text-xl rounded shadow-sm">
            LOGO
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight uppercase text-slate-900">PT KORPORAT LOGISTIK MANDIRI</h1>
            <p className="text-sm text-gray-600 mt-1 font-medium">Kawasan Industri Cikarang Utama Blok A1, Jawa Barat 17530</p>
            <p className="text-sm text-gray-600">Telp: (021) 890-1234 | Fax: (021) 890-1235 | Email: logistic@korporat.com</p>
          </div>
        </div>
        <div className="text-right">
          <h2 className="text-4xl font-black uppercase tracking-widest text-slate-900">GATE PASS</h2>
          <p className="text-base font-bold text-slate-700 mt-1 uppercase">Surat Izin Keluar/Masuk Barang</p>
          <div className="mt-3 inline-block bg-red-50 border border-red-200 px-4 py-2 rounded">
            <p className="text-lg text-red-700 font-bold tracking-wider">No: GP-2026/07/00142</p>
          </div>
        </div>
      </div>

      {/* Main Info */}
      <div className="grid grid-cols-2 gap-x-12 gap-y-6 mb-8">
        <div className="bg-slate-50 p-4 rounded border border-slate-200">
          <h3 className="text-xs font-bold uppercase text-slate-500 mb-3 tracking-wider border-b border-slate-200 pb-2">Informasi Gate Pass</h3>
          <table className="w-full text-sm">
            <tbody>
              <tr>
                <td className="py-1.5 font-semibold text-slate-700 w-36">Tipe Gate Pass</td>
                <td className="py-1.5 px-2 text-slate-400">:</td>
                <td className="py-1.5 font-bold text-blue-700">KELUAR (OUTBOUND)</td>
              </tr>
              <tr>
                <td className="py-1.5 font-semibold text-slate-700">Tanggal & Waktu</td>
                <td className="py-1.5 px-2 text-slate-400">:</td>
                <td className="py-1.5 font-medium">13 Juli 2026, 14:30 WIB</td>
              </tr>
              <tr>
                <td className="py-1.5 font-semibold text-slate-700">Departemen</td>
                <td className="py-1.5 px-2 text-slate-400">:</td>
                <td className="py-1.5 font-medium">Warehouse & Distribution</td>
              </tr>
              <tr>
                <td className="py-1.5 font-semibold text-slate-700">Referensi Dokumen</td>
                <td className="py-1.5 px-2 text-slate-400">:</td>
                <td className="py-1.5 font-medium">DO-559281-XYZ / PO-9901</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="bg-slate-50 p-4 rounded border border-slate-200">
          <h3 className="text-xs font-bold uppercase text-slate-500 mb-3 tracking-wider border-b border-slate-200 pb-2">Informasi Pembawa & Armada</h3>
          <table className="w-full text-sm">
            <tbody>
              <tr>
                <td className="py-1.5 font-semibold text-slate-700 w-36">Nama Pengemudi</td>
                <td className="py-1.5 px-2 text-slate-400">:</td>
                <td className="py-1.5 font-medium">Budi Santoso</td>
              </tr>
              <tr>
                <td className="py-1.5 font-semibold text-slate-700">No. Kendaraan (Nopol)</td>
                <td className="py-1.5 px-2 text-slate-400">:</td>
                <td className="py-1.5 uppercase font-bold text-slate-900 bg-yellow-100 px-2 py-0.5 rounded inline-block">B 9921 UYQ</td>
              </tr>
              <tr>
                <td className="py-1.5 font-semibold text-slate-700">Vendor Ekspedisi</td>
                <td className="py-1.5 px-2 text-slate-400">:</td>
                <td className="py-1.5 font-medium">PT Trans Lintas Nusantara</td>
              </tr>
              <tr>
                <td className="py-1.5 font-semibold text-slate-700">Tujuan / Asal</td>
                <td className="py-1.5 px-2 text-slate-400">:</td>
                <td className="py-1.5 font-medium">Gudang Distributor Surabaya</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-base font-bold uppercase border-l-4 border-slate-800 pl-3 text-slate-800">Rincian Barang</h3>
          <span className="text-xs font-medium bg-slate-100 text-slate-600 px-3 py-1 rounded-full border border-slate-200">Total: 4 Item</span>
        </div>
        <table className="w-full border-collapse border border-slate-300 text-sm">
          <thead className="bg-slate-800 text-white">
            <tr>
              <th className="border border-slate-300 py-3 px-3 w-12 text-center font-semibold">No</th>
              <th className="border border-slate-300 py-3 px-3 w-32 text-left font-semibold">Kode Barang</th>
              <th className="border border-slate-300 py-3 px-3 text-left font-semibold">Deskripsi Barang</th>
              <th className="border border-slate-300 py-3 px-3 w-20 text-center font-semibold">Qty</th>
              <th className="border border-slate-300 py-3 px-3 w-20 text-center font-semibold">Satuan</th>
              <th className="border border-slate-300 py-3 px-3 w-48 text-left font-semibold">Keterangan / Serial No</th>
            </tr>
          </thead>
          <tbody>
            {[
              { id: 'ITM-001', desc: 'Kompresor Industri XG-500', qty: 2, uom: 'Unit', notes: 'SN: XG5-001, XG5-002' },
              { id: 'ITM-045', desc: 'Suku Cadang Valve V-200', qty: 15, uom: 'Pcs', notes: 'Box Kayu (Fragile)' },
              { id: 'ITM-089', desc: 'Pelumas Sintetis Drum 200L', qty: 4, uom: 'Drum', notes: 'Handling Hati-hati' },
              { id: 'ITM-112', desc: 'Filter Udara H13', qty: 10, uom: 'Box', notes: '-' },
              { id: '', desc: '', qty: '', uom: '', notes: '' },
              { id: '', desc: '', qty: '', uom: '', notes: '' },
            ].map((item, index) => (
              <tr key={index} className="hover:bg-slate-50">
                <td className="border border-slate-300 py-2.5 px-3 text-center text-slate-500">{item.desc ? index + 1 : '\u00A0'}</td>
                <td className="border border-slate-300 py-2.5 px-3 font-mono text-xs text-slate-700">{item.id}</td>
                <td className="border border-slate-300 py-2.5 px-3 font-medium text-slate-800">{item.desc}</td>
                <td className="border border-slate-300 py-2.5 px-3 text-center font-bold text-slate-900">{item.qty}</td>
                <td className="border border-slate-300 py-2.5 px-3 text-center text-slate-600">{item.uom}</td>
                <td className="border border-slate-300 py-2.5 px-3 text-xs text-slate-500">{item.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Security / Condition Info */}
      <div className="mb-10 bg-slate-50 border border-slate-300 p-5 rounded">
        <h3 className="text-sm font-bold uppercase mb-4 text-slate-800">Checklist Pemeriksaan Keamanan (Diisi oleh Security Gate)</h3>
        <div className="flex gap-10">
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="w-5 h-5 border-2 border-slate-400 rounded-sm flex items-center justify-center bg-white"></div>
            <span className="text-sm font-medium text-slate-700">Kesesuaian Dokumen (DO/PO)</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="w-5 h-5 border-2 border-slate-400 rounded-sm flex items-center justify-center bg-white"></div>
            <span className="text-sm font-medium text-slate-700">Kesesuaian Fisik & Kuantitas</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <div className="w-5 h-5 border-2 border-slate-400 rounded-sm flex items-center justify-center bg-white"></div>
            <span className="text-sm font-medium text-slate-700">Kondisi Segel / Pengamanan Aman</span>
          </label>
        </div>
        <div className="mt-4 pt-3 border-t border-slate-200">
          <p className="text-xs text-red-600 font-semibold italic">* Peringatan: Jika ada ketidaksesuaian checklist di atas, Gate Pass dibatalkan dan kendaraan dilarang melintas area pabrik.</p>
        </div>
      </div>

      {/* Signatures */}
      <div className="grid grid-cols-4 gap-6 text-center mt-8">
        <div className="flex flex-col items-center">
          <p className="text-xs font-bold text-slate-600 mb-16 uppercase">Dibuat Oleh</p>
          <div className="border-b-2 border-slate-400 w-full mb-2"></div>
          <p className="text-sm font-bold text-slate-800">Admin Gudang</p>
          <p className="text-xs text-slate-500">Tgl: __/__/____</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-xs font-bold text-slate-600 mb-16 uppercase">Disetujui Oleh</p>
          <div className="border-b-2 border-slate-400 w-full mb-2"></div>
          <p className="text-sm font-bold text-slate-800">Manager Logistik</p>
          <p className="text-xs text-slate-500">Tgl: __/__/____</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-xs font-bold text-slate-600 mb-16 uppercase">Diperiksa Oleh</p>
          <div className="border-b-2 border-slate-400 w-full mb-2"></div>
          <p className="text-sm font-bold text-slate-800">Security Gate</p>
          <p className="text-xs text-slate-500">Tgl: __/__/____</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-xs font-bold text-slate-600 mb-16 uppercase">Pembawa (Pengemudi)</p>
          <div className="border-b-2 border-slate-400 w-full mb-2"></div>
          <p className="text-sm font-bold text-slate-800">Nama Jelas & Ttd</p>
          <p className="text-xs text-slate-500">Tgl: __/__/____</p>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 pt-5 border-t-2 border-slate-100 flex justify-between items-end">
        <div className="text-xs text-slate-500 font-medium">
          <p className="mb-1">Distribusi Dokumen:</p>
          <p><span className="font-bold text-slate-700">Lembar 1 (Putih):</span> Security / Pos Jaga</p>
          <p><span className="font-bold text-slate-700">Lembar 2 (Merah):</span> Arsip Gudang (Logistik)</p>
          <p><span className="font-bold text-slate-700">Lembar 3 (Kuning):</span> Ekspedisi / Pengemudi</p>
        </div>
        <div className="text-right text-xs text-slate-400">
          <p>Dokumen ini dicetak oleh sistem secara otomatis.</p>
          <p>Waktu Cetak: 13/07/2026 10:30:10 WIB</p>
          <p className="font-mono mt-1 text-slate-300">REF-ID: KLM-GP-8839201A</p>
        </div>
      </div>
    </div>
  );
};

export default IzinBarangTemplate;
