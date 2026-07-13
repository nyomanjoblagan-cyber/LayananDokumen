const fs = require('fs');
const path = require('path');

const scratch = 'C:\\Users\\RECEIVING\\.gemini\\antigravity\\brain\\4749b856-1833-471c-88ca-f8f32c30c989\\scratch';
const templatesDir = path.join(__dirname, 'components', 'templates');

// Files ready in our scratch dir
const ready = [
  'penagihan', 'paklaring', 'laba-rugi', 'sponsor-visa', 'skl',
  'kas', 'pajak-tanah', 'label-pengiriman', 'penelitian', 'wasiat',
  'surat-jalan', 'konfirmasi-order', 'sp-karyawan'
];

// Files written directly to project by subagents (rujukan, sewa-kendaraan, surat-jalan already deployed)
const directlyDeployed = ['rujukan', 'sewa-kendaraan'];

let deployed = 0, skipped = 0;

for (const folder of ready) {
  const src = path.join(scratch, folder + '.tsx');
  const dest = path.join(templatesDir, folder, 'index.tsx');
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`✓ Deployed: ${folder}`);
    deployed++;
  } else {
    console.log(`✗ Not found in scratch: ${folder}`);
    skipped++;
  }
}

for (const folder of directlyDeployed) {
  const dest = path.join(templatesDir, folder, 'index.tsx');
  if (fs.existsSync(dest)) {
    console.log(`✓ Already deployed (direct): ${folder}`);
    deployed++;
  } else {
    console.log(`✗ Missing: ${folder}`);
  }
}

console.log(`\nDeployed: ${deployed}, Skipped: ${skipped}`);
