const fs = require('fs');
const diffKuasa = fs.readFileSync('diff_surat_kuasa.patch', 'utf8');
const diffMou = fs.readFileSync('diff_mou.patch', 'utf8');
const diffHutang = fs.readFileSync('diff_hutang.patch', 'utf8');

const md = `# Code Diffs: Kloter 1 Batch 2 (Hutang, Surat Kuasa, MoU)

> [!IMPORTANT]
> Bli, seluruh agen untuk **Batch 2** telah berhasil menyelesaikan tugasnya! 
> Sama seperti Batch 1, mereka telah mengubah template dokumen ini menjadi format *Enterprise-Grade* dengan standar form KTP, 5-8 Pasal, Form Dinamis (Pilihan lunas sekaligus/cicilan di Hutang), dan UI Cetak murni HTML (tanpa CSS Grid).
> 
> Silakan geser *carousel* di bawah ini untuk melihat perbandingan (diff) perombakannya.
> 
> Jika Bli sudah me-*review* semuanya, balas dengan **"APPROVE BATCH 2"** agar saya dapat mem-push perubahannya ke produksi dan melanjutkan sisa Kloter 1!

\`\`\`\`carousel
### 1. Perjanjian Hutang Piutang (8 Pasal, Form Dinamis Lunas/Cicil)
\`\`\`diff
${diffHutang}
\`\`\`
<!-- slide -->
### 2. Surat Kuasa (6 Pasal, Kuasa Umum/Khusus)
\`\`\`diff
${diffKuasa}
\`\`\`
<!-- slide -->
### 3. MoU / Nota Kesepahaman (8 Pasal, Form Dinamis Pajak & Pembayaran)
\`\`\`diff
${diffMou}
\`\`\`
\`\`\`\`
`;

fs.writeFileSync('C:/Users/RECEIVING/.gemini/antigravity/brain/4749b856-1833-471c-88ca-f8f32c30c989/review_batch_2.md', md);
console.log('Artifact Batch 2 created successfully.');
