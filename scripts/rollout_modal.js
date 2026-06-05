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

  // Ubah onClick untuk trigger modal PrintWrapper
  const oldOnClick = /onClick=\{\(\)\s*=>\s*document\.getElementById\('print-options'\)\?\.scrollIntoView\(\{behavior:\s*'smooth'\}\)\}/g;
  if (oldOnClick.test(content)) {
    content = content.replace(oldOnClick, "onClick={() => window.dispatchEvent(new Event('open-print-modal'))}");
    modified = true;
  }

  // Khusus untuk template hutang yang href nya ke print-options atau memiliki pola a href print-options
  const oldHref = /href="#print-options"/g;
  if (oldHref.test(content)) {
     // Ubah <a href="#print-options" menjadi <button onClick...
     content = content.replace(/<a href="#print-options"([^>]*)>([\s\S]*?)<\/a>/g, "<button onClick={() => window.dispatchEvent(new Event('open-print-modal'))}$1>$2</button>");
     modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf-8');
    successCount++;
    console.log(`✅ Updated to Modal System: ${filePath}`);
  }
});

console.log(`\n🎉 Rollout Selesai! Berhasil mengupdate ${successCount} file menjadi sistem Modal.`);
