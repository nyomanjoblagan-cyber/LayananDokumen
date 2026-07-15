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
    content = content.replace(/(import React.*?;\r?\n)/, "$1import PrintWrapper from '@/components/PrintWrapper';\n");
  }

  if (!content.includes('<PrintWrapper')) {
    const docName = 'Dokumen_' + f.replace(/-/g, '_');
    const wrapperCode = `\n      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">\n         <PrintWrapper documentName="${docName}" price={15000} />\n      </div>\n    `;
    
    const lastDivIndex = content.lastIndexOf('</div>');
    if (lastDivIndex !== -1) {
      content = content.slice(0, lastDivIndex) + wrapperCode + content.slice(lastDivIndex);
    }
  }

  fs.writeFileSync(filePath, content);
  console.log('Updated', f);
}

const bmPath = path.join(__dirname, 'components', 'templates', 'belum-menikah', 'index.tsx');
if (fs.existsSync(bmPath)) {
    let bmContent = fs.readFileSync(bmPath, 'utf8');
    bmContent = bmContent.replace(/<div className="no-print hidden md:block">/, '<div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">');
    fs.writeFileSync(bmPath, bmContent);
    console.log('Updated belum-menikah');
}
