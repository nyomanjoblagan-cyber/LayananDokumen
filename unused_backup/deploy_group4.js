const fs = require('fs');
const path = require('path');

const scratchDir = 'C:\\Users\\RECEIVING\\.gemini\\antigravity\\brain\\4749b856-1833-471c-88ca-f8f32c30c989\\scratch';
const templatesDir = path.join(__dirname, 'components', 'templates');

const mappings = {
  'domisili-draft.tsx': 'domisili',
  'domisili.tsx': 'domisili',
  'sktm.tsx': 'sktm',
  'sku.tsx': 'sku',
  'pengantar-rt.tsx': 'pengantar-rt',
  'kematian.tsx': 'kematian',
  'belum-menikah.tsx': 'belum-menikah',
  'beda-nama.tsx': 'beda-nama',
  'nikah.tsx': 'nikah',
  'ahli-waris-desa-draft.tsx': 'ahli-waris-desa',
  'pernyataan-waris-draft.tsx': 'pernyataan-waris',
  'beasiswa.tsx': 'beasiswa',
  'cuti-kuliah.tsx': 'cuti-kuliah',
  'resign-akademik.tsx': 'resign-akademik',
  'rekomendasi-akademik-draft.tsx': 'rekomendasi-akademik',
  'sk-non-bantuan.tsx': 'sk-non-bantuan'
};

for (const [file, folder] of Object.entries(mappings)) {
    const src = path.join(scratchDir, file);
    const dest = path.join(templatesDir, folder, 'index.tsx');
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`Copied ${file} to ${folder}`);
    }
}
