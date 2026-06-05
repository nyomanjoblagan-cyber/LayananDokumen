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

  // The faulty code that causes TS errors
  const badString1 = "onClick={() => { if(typeof window !== 'undefined') { if(window.openPrintModal) window.openPrintModal(); else window.dispatchEvent(new Event('open-print-modal')); } }}";
  const badString2 = 'onClick={() => { if(typeof window !== \'undefined\') { if(window.openPrintModal) window.openPrintModal(); else window.dispatchEvent(new Event(\'open-print-modal\')); } }}';

  const goodString = "onClick={() => { if(typeof window !== 'undefined') window.dispatchEvent(new Event('open-print-modal')); }}";

  if (content.includes(badString1)) {
    content = content.split(badString1).join(goodString);
    modified = true;
  }
  
  if (content.includes(badString2)) {
    content = content.split(badString2).join(goodString);
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    successCount++;
  }
});

console.log(`Fixed TS errors in ${successCount} files.`);
