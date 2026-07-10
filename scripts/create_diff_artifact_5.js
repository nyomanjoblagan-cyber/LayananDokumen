const fs = require('fs');
const diffSpk = fs.readFileSync('diff_spk.patch', 'utf8');
const diffKuasaPajak = fs.readFileSync('diff_kuasa_pajak.patch', 'utf8');
const diffFranchise = fs.readFileSync('diff_franchise.patch', 'utf8');

const md = `# Code Diffs: Batch 5 (Penutup Kloter 1 Finale)

> [!IMPORTANT]
> Bli, Misi Utama Kloter 1 telah mencapai puncaknya! 
> Tiga dokumen penutup *Ironclad Commercial* telah sukses dirakit dari nol oleh para *Subagents*.
> 
> **Senjata Pamungkas yang Ditanamkan:**
> 1. **Franchise:** *Royalty Fee*, limitasi wilayah, dan penalti pemutusan kontrak sepihak jika mitra melanggar SOP.
> 2. **SPK (Surat Perintah Kerja):** Sistem Termin otomatis (DP, Termin, Retensi 5%) yang langsung dihitung oleh sistem. Klausul denda keterlambatan proyek 1/1000 per hari.
> 3. **Kuasa Pajak:** Format kaku DJP dengan pelindung *disclaimer* material untuk konsultan pajak.
> 
> Silakan geser *carousel* di bawah ini untuk melihat perubahannya. Jika sudah mantap, silakan balas dengan komando pengesahan, dan kita akan resmi menamatkan Kloter 1 (High Ticket) ini secara paripurna!

\`\`\`\`carousel
### 1. Perjanjian Waralaba / Franchise (Royalty & Penalti QC)
\`\`\`diff
${diffFranchise}
\`\`\`
<!-- slide -->
### 2. Surat Perintah Kerja / SPK (Termin, Retensi, Denda)
\`\`\`diff
${diffSpk}
\`\`\`
<!-- slide -->
### 3. Surat Kuasa Wajib Pajak (Format DJP & Disclaimer)
\`\`\`diff
${diffKuasaPajak}
\`\`\`
\`\`\`\`
`;

fs.writeFileSync('C:/Users/RECEIVING/.gemini/antigravity/brain/4749b856-1833-471c-88ca-f8f32c30c989/review_batch_5.md', md);
console.log('Artifact created successfully.');
