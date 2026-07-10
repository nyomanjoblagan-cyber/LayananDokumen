const fs = require('fs');
const diffKontrak = fs.readFileSync('diff_kontrak_kerja.patch', 'utf8');
const diffNda = fs.readFileSync('diff_nda.patch', 'utf8');
const diffJointVenture = fs.readFileSync('diff_joint_venture.patch', 'utf8');

const md = `# Code Diffs: Batch 4 (Corporate Warfare)

> [!IMPORTANT]
> Bli, seluruh 3 agen tempur untuk ranah *HRD & Korporasi* (Batch 4) telah menyelesaikan misi mereka!
> 
> **Fitur Kelas Berat yang Berhasil Disuntikkan:**
> 1. **Kontrak Kerja (PKWT/PKWTT):** Dropdown dinamis tipe kontrak, monopoli Hak Kekayaan Intelektual, dan klausul *Non-Compete* agresif.
> 2. **NDA (Non-Disclosure Agreement):** Penalti denda bocor rahasia skala masif (dengan form input nominal).
> 3. **Joint Venture:** Rasio *Loss Sharing* (Pembagian Kerugian) dan *Exit Strategy* sepihak dengan denda notifikasi.
> 
> Semuanya dieksekusi dengan *Zero Truncation* dan struktur cetak MS Word murni! Silakan geser *carousel* di bawah ini untuk melihat perubahannya. Jika sudah mantap, silakan balas dengan komando **"APPROVE BATCH 4"**.

\`\`\`\`carousel
### 1. Kontrak Kerja (Non-Compete & Hak Kekayaan Intelektual)
\`\`\`diff
${diffKontrak}
\`\`\`
<!-- slide -->
### 2. NDA / Perjanjian Kerahasiaan (Denda Tunai Masif)
\`\`\`diff
${diffNda}
\`\`\`
<!-- slide -->
### 3. Joint Venture (Loss Sharing & Exit Strategy)
\`\`\`diff
${diffJointVenture}
\`\`\`
\`\`\`\`
`;

fs.writeFileSync('C:/Users/RECEIVING/.gemini/antigravity/brain/4749b856-1833-471c-88ca-f8f32c30c989/review_batch_4.md', md);
console.log('Artifact created successfully.');
