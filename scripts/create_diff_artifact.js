const fs = require('fs');
const diffTanah = fs.readFileSync('diff_tanah.patch', 'utf8');
const diffKendaraan = fs.readFileSync('diff_kendaraan.patch', 'utf8');
const diffSewaRumah = fs.readFileSync('diff_sewa_rumah.patch', 'utf8');

const md = `# Code Diffs: Kloter 1 Batch 1 (Tanah, Kendaraan, Sewa Rumah)

> [!IMPORTANT]
> Bli, ketiga *Subagents* telah selesai merombak 3 dokumen tersulit di Kloter 1 dengan **Zero Truncation** (kode utuh tanpa pemotongan) dan format murni MS Word (tanpa CSS Grid pada isi pasal).
> 
> Silakan geser *carousel* di bawah ini untuk melihat perbandingan (diff) perombakan besar-besaran untuk masing-masing template.
> 
> Jika Bli sudah me-*review* UI dan logika hukumnya, balas dengan **"APPROVE BATCH 1"** agar saya segera me-replace file produksi dengan draft ini dan memanggil *Subagents* untuk batch selanjutnya!

\`\`\`\`carousel
### 1. Jual Beli Tanah (8 Pasal, Form Dinamis)
\`\`\`diff
${diffTanah}
\`\`\`
<!-- slide -->
### 2. Jual Beli Kendaraan (7 Pasal, Metode Pembayaran Dinamis)
\`\`\`diff
${diffKendaraan}
\`\`\`
<!-- slide -->
### 3. Sewa Rumah (8 Pasal, Layout Form 4 Tab)
\`\`\`diff
${diffSewaRumah}
\`\`\`
\`\`\`\`
`;

fs.writeFileSync('C:/Users/RECEIVING/.gemini/antigravity/brain/4749b856-1833-471c-88ca-f8f32c30c989/review_batch_1.md', md);
console.log('Artifact updated successfully.');
