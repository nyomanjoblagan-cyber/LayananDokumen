const fs = require('fs');
const path = require('path');

const myScratchDir = 'C:\\Users\\RECEIVING\\.gemini\\antigravity\\brain\\4749b856-1833-471c-88ca-f8f32c30c989\\scratch';
const izinSekolahScratch = 'C:\\Users\\RECEIVING\\.gemini\\antigravity\\brain\\9341c642-43a7-47fc-a783-a0a339d72aa6\\scratch';
const templatesDir = path.join(__dirname, 'components', 'templates');

const mappings = {
  'cv.tsx': { dir: myScratchDir, folder: 'cv' },
  'promosi.tsx': { dir: myScratchDir, folder: 'promosi' },
  'penghasilan-ortu.tsx': { dir: myScratchDir, folder: 'penghasilan-ortu' },
  'izin-sekolah.tsx': { dir: izinSekolahScratch, folder: 'izin-sekolah' },
  'izin-barang.tsx': { dir: myScratchDir, folder: 'izin-barang' },
  'izin-pasangan.tsx': { dir: myScratchDir, folder: 'izin-pasangan' },
  'izin-renovasi.tsx': { dir: myScratchDir, folder: 'izin-renovasi' },
};

for (const [file, info] of Object.entries(mappings)) {
    const src = path.join(info.dir, file);
    const dest = path.join(templatesDir, info.folder, 'index.tsx');
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`Copied ${file} to ${info.folder}`);
    } else {
        console.log(`File not found: ${src}`);
    }
}
