const fs = require('fs');
const path = require('path');

const scratchDir = 'C:\\Users\\RECEIVING\\.gemini\\antigravity\\brain\\4749b856-1833-471c-88ca-f8f32c30c989\\scratch';
const templatesDir = path.join(__dirname, 'components', 'templates');

const mappings = {
  'pernyataan-kehilangan.tsx': 'pernyataan-kehilangan',
  'keterangan-penghasilan.tsx': 'keterangan-penghasilan',
  'pernyataan-kerja.tsx': 'pernyataan-kerja',
  'pernyataan-ortu.tsx': 'pernyataan-ortu',
  'izin-keramaian.tsx': 'izin-keramaian',
  'cuti-karyawan.tsx': 'cuti-karyawan',
  'magang.tsx': 'magang'
};

for (const [file, folder] of Object.entries(mappings)) {
    const src = path.join(scratchDir, file);
    const dest = path.join(templatesDir, folder, 'index.tsx');
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`Copied ${file} to ${folder}`);
    }
}
