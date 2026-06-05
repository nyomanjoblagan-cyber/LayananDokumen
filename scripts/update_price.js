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

  // Replace price={3000} with price={10000}
  if (content.includes('price={3000}')) {
    content = content.replace(/price=\{3000\}/g, 'price={10000}');
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

console.log(`Successfully updated price to 10000 in ${successCount} files.`);
