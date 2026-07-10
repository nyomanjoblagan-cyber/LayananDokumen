const fs = require('fs');

const diff = fs.readFileSync('diff_margin.patch', 'utf16le');

const md = `# Code Diffs: Margin & Overflow Fix (The Teeth Protocol v2)

> [!IMPORTANT]
> Bli, seluruh sistem cetak telah diperbaiki dari masalah hardware margin conflict.
> Lebar \`210mm\` yang kaku kini dibebaskan menjadi \`w-full\` saat dicetak, sehingga browser leluasa menyusutkan ukuran dokumen menyesuaikan margin 15mm yang baru tanpa menebas teks di sisi kanan.
> 
> **Perbaikan yang Diterapkan di Seluruh 18 Template:**
> 1. Restorasi blok \`@media print\` dengan margin 15mm dan penyesuaian \`width: 100%\`.
> 2. Penambahan \`print:w-full\` dan \`print:min-w-0\` di komponen \`<Kertas>\` agar responsif terhadap batas kertas printer.
> 
> Berikut adalah cuplikan diff dari \`jual-beli-tanah\` dan \`sewa-rumah\` sebagai perwakilan eksekusi ke 18 file lainnya:

\`\`\`diff
${diff}
\`\`\`
`;

fs.writeFileSync('C:/Users/RECEIVING/.gemini/antigravity/brain/4749b856-1833-471c-88ca-f8f32c30c989/review_margin_fix.md', md, 'utf8');
console.log('Artifact created.');
