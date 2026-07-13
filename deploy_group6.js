const fs = require('fs');
const path = require('path');

const myScratchDir = 'C:\\Users\\RECEIVING\\.gemini\\antigravity\\brain\\4749b856-1833-471c-88ca-f8f32c30c989\\scratch';
const templatesDir = path.join(__dirname, 'components', 'templates');

const mappings = {
  'bebas-narkoba.tsx': 'bebas-narkoba',
  'usia.tsx': 'usia',
  'panitia.tsx': 'panitia',
  'pph.tsx': 'pph',
  'spb.tsx': 'spb',
  'klaim-asuransi.tsx': 'klaim-asuransi',
  'redelivery.tsx': 'redelivery',
  'ket-dokter.tsx': 'ket-dokter',
  'rekomendasi.tsx': 'rekomendasi'
};

for (const [file, folder] of Object.entries(mappings)) {
    const src = path.join(myScratchDir, file);
    const dest = path.join(templatesDir, folder, 'index.tsx');
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`Copied ${file} to ${folder}`);
    } else {
        console.log(`File not found: ${src}`);
    }
}
