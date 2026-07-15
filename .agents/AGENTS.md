# Panduan Standarisasi Template Layanan Dokumen

Untuk menyelaraskan (menstandarisasi) pembuatan atau modifikasi template surat/dokumen lainnya, patuhi aturan-aturan berikut:

## 1. Antarmuka / UI Sidebar Editor
- **Wajib Menggunakan Label Input**: Jangan hanya mengandalkan `placeholder`. Setiap elemen `<input>` atau `<textarea>` di sidebar harus memiliki label teks berukuran kecil di atasnya.
  Contoh implementasi:
  ```tsx
  <div className="space-y-1">
      <label className="text-[9px] font-bold text-slate-400">NAMA LENGKAP</label>
      <input className="..." placeholder="Masukkan Nama Lengkap" />
  </div>
  ```

## 2. Layout & Print Configuration (Menghindari Cetak Dobel)
- Elemen pratinjau utama (di dalam `<main>`) **wajib disembunyikan saat dicetak** menggunakan class `print:hidden`.
  Contoh: `<main className="... print:hidden">`
- Gunakan `<div id="print-only-root">` sebagai container khusus cetak yang akan di-_render_ saat diprint. Hal ini mencegah dokumen tercetak dua kali (dobel).

## 3. Format Dokumen
- Selalu sediakan **2 pilihan format template**:
  1. **Format Legal (Asuransi/Baku)**: Menggunakan jenis huruf serif (contoh: Times New Roman) dengan ukuran yang sesuai (misal `10.5pt`).
  2. **Format Modern**: Menggunakan jenis huruf sans-serif (contoh: Arial / Inter) dengan ukuran `10pt`.
- Kedua format ini wajib diakomodasi melalui `templateId` dan diletakkan secara dinamis pada *wrapper* dokumen.

## 4. Isi Surat (Enterprise-Grade)
- Gaya bahasa harus menggunakan **Bahasa Indonesia Hukum/Resmi** yang lugas dan mengikat.
- Pastikan surat perjanjian atau kontrak level bisnis (B2B/Enterprise) memiliki pasal-pasal perlindungan yang kuat, seperti:
  - **Denda/Sanksi Keterlambatan (Penalty)**
  - **Larangan Pindah Tangan / Sub-lease**
  - **Batas Wilayah Operasional** (jika relevan)
  - **Penyelesaian Sengketa** (Penunjukan domisili hukum/Pengadilan)
  - **Force Majeure** (Keadaan Kahar)
