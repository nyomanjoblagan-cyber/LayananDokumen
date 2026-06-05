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

  // 1. Remove import DocumentServices
  const importRegex = /import\s+DocumentServices\s+from\s+['"]@\/components\/DocumentServices['"];?\s*/g;
  if (importRegex.test(content)) {
    content = content.replace(importRegex, '');
    modified = true;
  }

  // 2. Remove state showDonation
  const stateRegex = /const\s+\[showDonation,\s*setShowDonation\]\s*=\s*useState\(false\);\s*/g;
  if (stateRegex.test(content)) {
    content = content.replace(stateRegex, '');
    modified = true;
  }
  
  // Also remove the comment before it
  const commentRegex = /\/\/\s*STATE MODAL SAWERIA\s*/g;
  if (commentRegex.test(content)) {
    content = content.replace(commentRegex, '');
    modified = true;
  }

  // 3. Remove <DocumentServices /> component
  const componentRegex = /\{\/\*\s*INJEKSI KOMPONEN SAKTI \(IKLAN BANNER & MODAL DONASI\)\s*\*\/\}\s*<DocumentServices\s+showDonation=\{showDonation\}\s+setShowDonation=\{setShowDonation\}\s*\/>\s*/g;
  if (componentRegex.test(content)) {
    content = content.replace(componentRegex, '');
    modified = true;
  }
  
  // Just in case without comment
  const componentRegex2 = /<DocumentServices\s+showDonation=\{showDonation\}\s+setShowDonation=\{setShowDonation\}\s*\/>\s*/g;
  if (componentRegex2.test(content)) {
    content = content.replace(componentRegex2, '');
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

console.log(`Successfully removed DocumentServices from ${successCount} files.`);
