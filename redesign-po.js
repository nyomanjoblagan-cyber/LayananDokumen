const fs = require('fs');
const file = 'd:/WEB DESIGN/LayananDokumen/components/templates/po/index.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Update State
content = content.replace(
  "const [templateId, setTemplateId] = useState<number>(1);\n  const [showTemplateMenu, setShowTemplateMenu] = useState(false);\n  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');",
  "const [showResetModal, setShowResetModal] = useState(false);\n  const [mobileView, setMobileView] = useState<'editor' | 'preview'>('editor');"
);

// 2. Fix handleReset & remove activeTemplateName
content = content.replace(
  "  const handleReset = () => {\n    if(typeof window !== 'undefined' && window.confirm('Reset formulir ke awal?')) {\n        const today = new Date().toISOString().split('T')[0];\n        const nextWeek = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0];\n        setData({ ...INITIAL_DATA, date: today, deliveryDate: nextWeek });\n        setLogo(null);\n    }\n  };\n\n  const activeTemplateName = templateId === 1 ? 'Industrial' : 'Corporate';",
  `  const handleReset = () => {
    setShowResetModal(true);
  };

  const confirmReset = () => {
    const today = new Date().toISOString().split('T')[0];
    const nextWeek = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0];
    setData({ ...INITIAL_DATA, date: today, deliveryDate: nextWeek });
    setLogo(null);
    setShowResetModal(false);
  };`
);

// 3. Remove Template Menu from Header
const menuBlockRegex = /<div className="relative">[\s\S]*?<\/div>\s*<button onClick=\{\(\) => \{ if\(typeof window/g;
content = content.replace(menuBlockRegex, "<button onClick={() => { if(typeof window");

// 4. Redesign DocumentContent
const docContentRegex = /<Kertas className=\{templateId === 1 \? 'font-serif' : 'font-sans'\}>[\s\S]*?<\/Kertas>/;
const newDocContent = `<Kertas className="font-sans flex flex-col h-full bg-white relative z-0">
        
        {/* Dekorasi Air / Latar Premium */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-50/50 rounded-full blur-3xl -z-10 -translate-y-1/2 translate-x-1/4"></div>

        {/* HEADER PO */}
        <div className="flex justify-between items-start mb-6 border-b-2 border-slate-100 pb-5 shrink-0">
          <div className="flex items-center gap-5">
            {logo ? (
              <img src={logo} className="h-16 w-16 object-contain block" alt="Logo" />
            ) : (
              <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 font-bold text-[10px] print:hidden shadow-inner">
                LOGO
              </div>
            )}
            <div>
              <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">{data.companyName}</h1>
              <div className="text-[10px] text-slate-500 whitespace-pre-line leading-relaxed mt-1">{data.companyInfo}</div>
            </div>
          </div>
          <div className="text-right">
            <h2 className="text-4xl font-black uppercase tracking-tighter text-blue-600 mb-1">PURCHASE ORDER</h2>
            <div className="text-xs font-bold font-mono text-slate-700 bg-slate-50 inline-block px-3 py-1.5 rounded-lg border border-slate-100">{data.no}</div>
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">Date: {formatDateSafe(data.date)}</div>
          </div>
        </div>

        {/* VENDOR & SHIP INFO */}
        <div className="grid grid-cols-2 gap-6 mb-8 text-[9.5pt] shrink-0 break-inside-avoid">
          <div className="p-5 border border-slate-100 rounded-2xl bg-slate-50/50 shadow-sm">
            <div className="font-black uppercase text-[8px] text-slate-400 mb-3 tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span> To (Vendor)
            </div>
            <div className="font-black text-slate-900 uppercase text-sm mb-1">{data.vendorName}</div>
            <div className="font-bold text-slate-600 mb-2">Attn: {data.vendorContact}</div>
            <div className="text-slate-500 leading-relaxed text-xs">{data.vendorAddress}</div>
          </div>
          <div className="p-5 border border-slate-100 rounded-2xl bg-blue-50/30 shadow-sm relative overflow-hidden">
            <div className="font-black uppercase text-[8px] text-slate-400 mb-3 tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Ship To
            </div>
            <div className="font-black text-slate-900 uppercase text-sm mb-1">{data.shipToName}</div>
            <div className="text-slate-500 leading-relaxed text-xs mb-3">{data.shipToAddress}</div>
            <div className="text-[10px] font-bold text-slate-500 inline-flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-100">
              Delivery Via: <span className="uppercase text-emerald-600 font-black">{data.shipVia}</span>
            </div>
          </div>
        </div>

        {/* TABLE ITEMS */}
        <div className="flex-grow mb-6">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white uppercase text-[8px] tracking-widest">
                <th className="py-3 px-3 text-center w-10 rounded-tl-xl font-black">#</th>
                <th className="py-3 px-3 font-black">Description of Goods / Services</th>
                <th className="py-3 px-3 text-center w-16 font-black">Qty</th>
                <th className="py-3 px-3 text-center w-16 font-black">Unit</th>
                <th className="py-3 px-3 text-right w-28 font-black">Unit Price</th>
                <th className="py-3 px-4 text-right w-36 rounded-tr-xl font-black">Total Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {data.items.map((item, idx) => (
                <tr key={idx} className="break-inside-avoid hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 text-center text-slate-400 font-bold">{idx + 1}</td>
                  <td className="py-3 px-3 font-bold text-slate-800 uppercase">{item.name}</td>
                  <td className="py-3 px-3 text-center font-bold text-slate-600">{item.qty}</td>
                  <td className="py-3 px-3 text-center font-bold text-slate-600">{item.unit}</td>
                  <td className="py-3 px-3 text-right font-bold text-slate-600">{item.price.toLocaleString('id-ID')}</td>
                  <td className="py-3 px-4 text-right font-black text-slate-900">{(item.qty * item.price).toLocaleString('id-ID')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* TOTALS & TERMS */}
        <div className="grid grid-cols-12 gap-8 break-inside-avoid shrink-0">
          <div className="col-span-7 space-y-5">
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
              <div className="font-black uppercase text-[8px] text-slate-400 mb-3 tracking-widest border-b border-slate-200 pb-2">Terms & Conditions</div>
              <div className="grid grid-cols-3 gap-y-3 text-[10px] mt-2">
                <div className="text-slate-500 font-bold uppercase tracking-wide">Payment Terms:</div>
                <div className="col-span-2 text-slate-800 font-black">{data.termsPayment}</div>
                <div className="text-slate-500 font-bold uppercase tracking-wide">Delivery Terms:</div>
                <div className="col-span-2 text-slate-800 font-black">{data.termsDelivery}</div>
                <div className="text-slate-500 font-bold uppercase tracking-wide">Delivery Date:</div>
                <div className="col-span-2 text-emerald-600 font-black bg-emerald-50 px-2 py-0.5 rounded w-max inline-block border border-emerald-100">{formatDateSafe(data.deliveryDate)}</div>
              </div>
            </div>
            
            <div>
              <div className="font-black uppercase text-[8px] text-slate-400 mb-2 tracking-widest">Special Notes / Instructions</div>
              <div className="text-[10px] text-slate-600 whitespace-pre-line leading-relaxed italic bg-slate-50/50 p-3 rounded-xl border border-slate-100 border-l-4 border-l-slate-300">{data.notes}</div>
            </div>
          </div>
          
          <div className="col-span-5 flex flex-col justify-end pb-1">
            <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-white">
              <div className="flex justify-between p-3.5 border-b border-slate-50 text-xs bg-slate-50/50">
                <span className="font-bold text-slate-500 uppercase tracking-widest text-[9px]">Subtotal</span>
                <span className="font-bold text-slate-800 tabular-nums">Rp {subtotal.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between p-3.5 border-b border-slate-50 text-xs bg-slate-50/50">
                <span className="font-bold text-slate-500 uppercase tracking-widest text-[9px]">VAT / PPN ({data.taxRate}%)</span>
                <span className="font-bold text-slate-800 tabular-nums">Rp {taxAmount.toLocaleString('id-ID')}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-slate-900 text-white shadow-inner">
                <span className="font-black tracking-widest text-[10px] uppercase text-slate-300">Total</span>
                <span className="text-xl font-black tabular-nums tracking-tight">Rp {total.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* SIGNATURES */}
        <div className="mt-12 flex justify-end shrink-0 break-inside-avoid">
          <div className="text-center w-64 pt-6 relative">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-slate-200 rounded-full"></div>
             <p className="text-[8px] font-black uppercase text-slate-400 tracking-widest mb-16">Authorized Signature</p>
             <p className="font-black uppercase text-sm text-slate-900 border-b-2 border-slate-900 pb-1 w-max mx-auto px-4">{data.signer}</p>
             <p className="text-[9px] font-bold text-slate-500 mt-1.5 uppercase tracking-widest">{data.signerJob}</p>
          </div>
        </div>
      </Kertas>`;

content = content.replace(docContentRegex, newDocContent);

// 5. Add Reset Modal JSX at the end
const resetModalJSX = `
      {/* RESET MODAL */}
      {showResetModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200 border border-slate-100">
            <div className="p-8 text-center">
              <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner border border-red-100">
                <Trash2 size={40} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3 tracking-tight">Reset Formulir?</h3>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">Seluruh data yang sudah Anda isi pada dokumen ini akan dihapus secara permanen. Anda yakin?</p>
              <div className="flex gap-4">
                <button onClick={() => setShowResetModal(false)} className="flex-1 py-3.5 rounded-2xl font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">Batal</button>
                <button onClick={confirmReset} className="flex-1 py-3.5 rounded-2xl font-bold text-white bg-red-600 hover:bg-red-700 transition-colors shadow-lg shadow-red-200 border border-red-600">Ya, Reset</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}`;

content = content.replace(/<\/div>\s*<\/div>\s*\);\s*\}/, "      </div>" + resetModalJSX);

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully redesigned Purchase Order template!');
