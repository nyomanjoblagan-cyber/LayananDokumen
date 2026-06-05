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

const touchFiles = async () => {
  for (const filePath of pages) {
    let content = fs.readFileSync(filePath, 'utf-8');
    // Add a dummy comment to force HMR
    if (!content.includes('// FORCE-HMR-UPDATE')) {
      content += '\n// FORCE-HMR-UPDATE';
      fs.writeFileSync(filePath, content, 'utf-8');
    } else {
      // Remove it to toggle it
      content = content.replace('\n// FORCE-HMR-UPDATE', '');
      fs.writeFileSync(filePath, content, 'utf-8');
    }
    
    // Wait 50ms between files to allow Turbopack to queue them up properly
    await new Promise(resolve => setTimeout(resolve, 50));
  }
  console.log(`Successfully touched ${pages.length} files to trigger Next.js Turbopack HMR.`);
};

touchFiles();
