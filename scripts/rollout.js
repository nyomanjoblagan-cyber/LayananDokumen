const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '../app/tools');

// Fungsi rekursif untuk mencari semua page.tsx
const getAllPages = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllPages(filePath, fileList);
    } else if (file === 'page.tsx') {
      fileList.push(filePath);
    }
  }
  return fileList;
};

const pages = getAllPages(toolsDir);
let successCount = 0;

pages.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf-8');

  // Skip hutang/page.tsx as it is already configured manually
  if (filePath.includes('hutang\\page.tsx') || filePath.includes('hutang/page.tsx')) {
      console.log(`Skipping (already done): ${filePath}`);
      return;
  }

  let modified = false;

  // 1. Inject Import PrintWrapper
  if (!content.includes('import PrintWrapper')) {
    content = content.replace(
      /(import DocumentServices from '@\/components\/DocumentServices';)/g,
      "$1\nimport PrintWrapper from '@/components/PrintWrapper';"
    );
    modified = true;
  }

  // 2. Ubah fungsi onClick pada tombol cetak Header
  const printRegex1 = /onClick=\{\(\)\s*=>\s*\{\s*window\.print\(\);\s*setShowDonation\(true\);\s*\}\}/g;
  if (printRegex1.test(content)) {
    content = content.replace(printRegex1, "onClick={() => document.getElementById('print-options')?.scrollIntoView({behavior: 'smooth'})}");
    modified = true;
  }

  const printRegex2 = /onClick=\{\(\)\s*=>\s*window\.print\(\)\}/g;
  if (printRegex2.test(content)) {
    content = content.replace(printRegex2, "onClick={() => document.getElementById('print-options')?.scrollIntoView({behavior: 'smooth'})}");
    modified = true;
  }

  // 3. Inject Komponen PrintWrapper di atas DocumentServices
  const wrapperInjection = `
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={3000} />
      </div>

      {/* INJEKSI KOMPONEN SAKTI`;

  if (!content.includes('<PrintWrapper')) {
    content = content.replace(/\s*\{\/\*\s*INJEKSI KOMPONEN SAKTI/g, wrapperInjection);
    modified = true;
  }

  // Save changes if modified
  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    successCount++;
    console.log(`✅ Updated: ${filePath}`);
  }
});

console.log(`\n🎉 Rollout Selesai! Berhasil mengupdate ${successCount} file.`);
