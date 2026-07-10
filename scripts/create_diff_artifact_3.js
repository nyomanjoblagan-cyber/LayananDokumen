const fs = require('fs');
const diffTanahTaring = fs.readFileSync('diff_tanah_taring.patch', 'utf8');
const diffKendaraanTaring = fs.readFileSync('diff_kendaraan_taring.patch', 'utf8');
const diffSewaTaring = fs.readFileSync('diff_sewa_rumah_taring.patch', 'utf8');
const diffAhliWaris = fs.readFileSync('diff_ahli_waris.patch', 'utf8');
const diffPerjanjianDamai = fs.readFileSync('diff_perjanjian_damai.patch', 'utf8');
const diffGadai = fs.readFileSync('diff_gadai.patch', 'utf8');

const md = `# Code Diffs: Operasi Taring Hukum & Eksekusi Batch 3

> [!IMPORTANT]
> Bli, seluruh agen (6 Subagents) telah menyelesaikan misi ganda ini dengan sempurna!
> 
> **1. Operasi Taring Hukum (Batch 1 Revisi):** Klausul Wanprestasi, denda keterlambatan harian, penyitaan DP ganda, dan pengosongan paksa kini telah disuntikkan beserta panel input form pengaturannya.
> **2. Eksekusi Batch 3:** Surat Ahli Waris, Perjanjian Damai, dan Gadai (beserta opsi lelang sepihak) telah ditulis dari nol sesuai standar *Enterprise*.
> 
> Silakan geser *carousel* di bawah ini untuk melihat 6 perombakan raksasa tersebut. Jika sudah sesuai, balas dengan komando pengesahan Bli!

\`\`\`\`carousel
### 1. Jual Beli Tanah (Taring Hukum: DP Hangus, Denda Keterlambatan)
\`\`\`diff
${diffTanahTaring}
\`\`\`
<!-- slide -->
### 2. Jual Beli Kendaraan (Taring Hukum: DP 2x Lipat, Denda Harian)
\`\`\`diff
${diffKendaraanTaring}
\`\`\`
<!-- slide -->
### 3. Sewa Rumah (Taring Hukum: Pengosongan Paksa, Pemutusan Listrik/Air)
\`\`\`diff
${diffSewaTaring}
\`\`\`
<!-- slide -->
### 4. Surat Pernyataan Ahli Waris (Klausul Pidana Pemalsuan)
\`\`\`diff
${diffAhliWaris}
\`\`\`
<!-- slide -->
### 5. Surat Perjanjian Damai (Klausul Anti Penuntutan)
\`\`\`diff
${diffPerjanjianDamai}
\`\`\`
<!-- slide -->
### 6. Perjanjian Gadai (Klausul Pelelangan/Eksekusi Sepihak)
\`\`\`diff
${diffGadai}
\`\`\`
\`\`\`\`
`;

fs.writeFileSync('C:/Users/RECEIVING/.gemini/antigravity/brain/4749b856-1833-471c-88ca-f8f32c30c989/review_batch_1_revised_and_batch_3.md', md);
console.log('Artifact created successfully.');
