const fs = require('fs');
const path = require('path');

const templatesDir = 'd:/WEB DESIGN/LayananDokumen/components/templates';
const dirs = fs.readdirSync(templatesDir).filter(f => fs.statSync(path.join(templatesDir, f)).isDirectory());

const report = {
  missingPrintWrapper: [],
  missingTranslateFix: [],
  printHiddenOnMain: [],
  printHiddenOnPreview: [],
};

dirs.forEach(dir => {
  const file = path.join(dir, 'index.tsx');
  const fullPath = path.join(templatesDir, file);
  if (!fs.existsSync(fullPath)) return;
  
  const content = fs.readFileSync(fullPath, 'utf8');
  
  if (!content.includes('<PrintWrapper')) {
    report.missingPrintWrapper.push(dir);
  }
  
  if (content.includes('translate-x-full') && !content.includes('print:translate-x-0')) {
     report.missingTranslateFix.push(dir);
  }
  
  if (/<main[^>]*className=[^>]*print:hidden/.test(content)) {
     report.printHiddenOnMain.push(dir);
  }
});

console.log(JSON.stringify(report, null, 2));
