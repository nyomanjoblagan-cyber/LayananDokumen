const fs = require('fs');
const path = require('path');

const dir = 'd:/WEB DESIGN/LayananDokumen/components/templates';
const subdirs = fs.readdirSync(dir);

let count = 0;
for (const subdir of subdirs) {
  const filePath = path.join(dir, subdir, 'index.tsx');
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    if (content.includes('<PrintWrapper printRef={printRef}>')) {
      content = content.replace('<PrintWrapper printRef={printRef}>', '<div className="flex flex-col items-center w-full">');
      
      const replaceClosing = `          <div className="no-print mt-8 mb-4">
            <button onClick={() => window.dispatchEvent(new Event('open-print-modal'))} className="bg-emerald-500 text-white px-8 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 hover:bg-emerald-600 transition-all cursor-pointer">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 6 2 18 2 18 9"></polyline><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path><rect x="6" y="14" width="12" height="8"></rect></svg>
              Cetak / Print
            </button>
            <PrintWrapper documentName="Cetak_Dokumen" price={15000} />
          </div>
        </div>`;
      
      content = content.replace('</PrintWrapper>', replaceClosing);
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Fixed ' + subdir);
      count++;
    }
  }
}

console.log('Total fixed: ' + count);
