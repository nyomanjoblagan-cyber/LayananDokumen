const fs = require('fs');
const path = require('path');

const files = [
  'bast', 'bebas-narkoba', 'domisili', 'izin-keramaian', 'izin-sekolah', 
  'kematian', 'ket-dokter', 'kpr', 'magang', 'pengantar-rt', 
  'penghasilan-ortu', 'pernyataan-kehilangan', 'phk', 'sktm', 'sku', 'surat-dinas'
];

for (const f of files) {
  const filePath = path.join(__dirname, 'components', 'templates', f, 'index.tsx');
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf8');

  if (!content.includes('import PrintWrapper')) {
    content = content.replace(/'use client';\r?\n/, "'use client';\nimport PrintWrapper from '@/components/PrintWrapper';\n");
    fs.writeFileSync(filePath, content);
    console.log('Added import to', f);
  }
}
