const fs = require('fs');
const path = require('path');

const categories = {
  "Bisnis & UMKM": ["finance", "po", "penawaran", "keterangan-penghasilan", "penagihan", "spk", "kas", "faktur-pajak", "garansi", "pengaduan", "distributor", "spb", "konfirmasi-order", "laba-rugi"],
  "HRD & Karir": ["lamaran", "cv", "kontrak-kerja", "surat-tugas", "sp-karyawan", "paklaring", "resign", "nda", "rekomendasi", "bebas-narkoba", "pernyataan-kerja", "cuti-karyawan", "belum-nikah-hrd", "phk", "promosi"],
  "Legal & Aset": ["jual-beli-tanah", "jual-beli-kendaraan", "sewa-rumah", "hutang", "surat-kuasa", "mou", "ahli-waris", "perjanjian-damai", "gadai", "pernyataan-waris", "hibah", "sewa-kendaraan", "wasiat", "joint-venture", "kuasa-pajak", "franchise"],
  "Administrasi Desa": ["pengantar-rt", "sku", "domisili", "sktm", "belum-menikah", "izin-keramaian", "pernyataan-kehilangan", "beda-nama", "belum-punya-rumah", "kematian", "penghasilan-ortu", "ahli-waris-desa", "nikah", "sk-non-bantuan", "imb", "tanah-aman"],
  "Logistik & Operasional": ["surat-jalan", "bast", "surat-dinas", "label-pengiriman", "izin-renovasi", "izin-barang", "tanda-terima", "klaim-asuransi", "redelivery", "hilang-kirim"],
  "Akademik & Medis": ["izin-sekolah", "beasiswa", "magang", "pernyataan-ortu", "izin-pasangan", "sponsor-visa", "skl", "resign-akademik", "cuti-kuliah", "rekomendasi-akademik", "stop-studi", "penelitian", "rujukan", "rawat-inap", "ket-dokter", "donor"],
  "Kalkulator & Event": ["sponsorship", "donasi", "panitia", "business-plan", "terbilang", "kpr", "diskon", "usia", "pph", "pajak-tanah", "pesangon"],
  "Lainnya": ["katalog-deskripsi"]
};

const templatesPath = path.join(__dirname, '../data/templates.ts');
let templatesContent = fs.readFileSync(templatesPath, 'utf8');

// The file contains: export const TEMPLATES: Record<string, any> = { ... }
// We can use a regex to replace each key block to add the category.

for (const [category, slugs] of Object.entries(categories)) {
  for (const slug of slugs) {
    const regex = new RegExp(`("${slug}":\\s*{[^}]*?)(\\n\\s*},)`, 'g');
    templatesContent = templatesContent.replace(regex, `$1,\n    category: "${category}"$2`);
  }
}

fs.writeFileSync(templatesPath, templatesContent);
console.log('Categories added successfully!');
