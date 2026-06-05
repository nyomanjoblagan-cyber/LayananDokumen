const fs = require('fs');
const path = require('path');

const toolsDir = path.join(__dirname, '../app/tools');

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
  let modified = false;

  if (!content.includes('<PrintWrapper')) {
    // We must inject <PrintWrapper /> right before <div id="print-only-root"
    const printRootIndex = content.indexOf('<div id="print-only-root"');
    
    if (printRootIndex !== -1) {
      const injectionString = `
      {/* AREA TOMBOL MONETISASI */}
      <div id="print-options" className="no-print w-full max-w-4xl mx-auto p-4 mb-10">
         <PrintWrapper documentName="Dokumen" price={3000} />
      </div>

      `;
      content = content.slice(0, printRootIndex) + injectionString + content.slice(printRootIndex);
      modified = true;
    }
  }
  
  // Make sure import PrintWrapper exists
  if (!content.includes("import PrintWrapper from '@/components/PrintWrapper'")) {
    const importStr = "import PrintWrapper from '@/components/PrintWrapper';\n";
    const lucideIndex = content.indexOf("import {");
    if (lucideIndex !== -1) {
        content = content.slice(0, lucideIndex) + importStr + content.slice(lucideIndex);
    } else {
        content = importStr + content;
    }
    modified = true;
  }

  // FORCE HMR update
  if (!content.includes('// FORCE-HMR-UPDATE')) {
    content += '\n// FORCE-HMR-UPDATE';
  } else {
    content = content.replace('\n// FORCE-HMR-UPDATE', '');
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    successCount++;
  }
});

console.log(`Successfully injected <PrintWrapper> into ${successCount} files.`);
