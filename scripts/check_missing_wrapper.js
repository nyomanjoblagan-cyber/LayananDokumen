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
const missing = [];

pages.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf-8');
  if (!content.includes('<PrintWrapper')) {
    missing.push(filePath);
  }
});

console.log('Files missing <PrintWrapper>:');
missing.forEach(f => console.log(f));
console.log(`Total missing: ${missing.length}`);
