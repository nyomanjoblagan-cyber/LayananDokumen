const fs = require('fs');
const file = 'd:/WEB DESIGN/LayananDokumen/components/templates/finance/index.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Update useState
content = content.replace(
  "const [activeDocType, setActiveDocType] = useState<'invoice' | 'kuitansi'>('invoice');",
  "const [activeDocType, setActiveDocType] = useState<'invoice' | 'kuitansi' | 'nota'>('invoice');"
);

// 2. Update mode param
content = content.replace(
  "if (modeParam === 'kwitansi' || modeParam === 'kuitansi') setActiveDocType('kuitansi');\n    else setActiveDocType('invoice');",
  "if (modeParam === 'kwitansi' || modeParam === 'kuitansi') setActiveDocType('kuitansi');\n    else if (modeParam === 'nota') setActiveDocType('nota');\n    else setActiveDocType('invoice');"
);

// 3. Update navbar map
content = content.replace(
  "(['invoice', 'kuitansi'] as const)",
  "(['invoice', 'kuitansi', 'nota'] as const)"
);

// 4. Update navbar icon
content = content.replace(
  "{t === 'invoice' ? <span className=\"flex items-center gap-1\"><FileText size={14}/> Invoice</span> : <span className=\"flex items-center gap-1\"><Landmark size={14}/> Receipt</span>}",
  "{t === 'invoice' ? <span className=\"flex items-center gap-1\"><FileText size={14}/> Invoice</span> : t === 'kuitansi' ? <span className=\"flex items-center gap-1\"><Landmark size={14}/> Receipt</span> : <span className=\"flex items-center gap-1\"><FileText size={14}/> Nota</span>}"
);

// 5. Update Kertas Component definition to support dynamic dims
content = content.replace(
  "const Kertas = ({ children, className = '' }: { children: React.ReactNode, className?: string }) => (",
  "const Kertas = ({ children, className = '', w = '210mm', h = '296mm' }: { children: React.ReactNode, className?: string, w?: string, h?: string }) => ("
);
content = content.replace(
  "w-[210mm] print:w-full print:min-w-0 min-h-[296mm]",
  "print:w-full print:min-w-0"
);
content = content.replace(
  "h-auto ${className}\`}>",
  "h-auto ${className}\`} style={{ width: w, minHeight: h, maxWidth: '100%' }}>"
);

// 6. Provide Kertas width based on activeDocType in DocumentContent
// We will replace `<Kertas className="flex flex-col">` with dynamic Kertas
const documentContentRegex = /const DocumentContent = \(\) => \(\s*<Kertas className="flex flex-col">/;
content = content.replace(
  documentContentRegex,
  `const dims = (activeDocType === 'nota') ? { w: '105mm', h: '148mm' } : (activeDocType === 'kuitansi') ? { w: '210mm', h: '99mm' } : { w: '210mm', h: '296mm' };
  const DocumentContent = () => (
    <Kertas className="flex flex-col" w={dims.w} h={dims.h}>`
);


// 7. Inject nota rendering block
const notaBlock = `

      {activeDocType === 'nota' && (
        <div className="flex-1 flex flex-col font-sans text-slate-900 print:-mt-4">
           <div className="flex justify-between items-start border-b-2 border-slate-900 pb-3 mb-4 shrink-0">
             <div className="flex gap-3">
               {logo ? <img src={logo} className="w-12 h-12 object-contain grayscale" alt="logo" /> : <div className="w-12 h-12 bg-slate-200 flex items-center justify-center font-bold text-[8px] text-slate-400">LOGO</div>}
               <div><h1 className="font-black text-lg leading-none uppercase">{data.senderName}</h1><p className="text-[8px] text-slate-500 leading-tight whitespace-pre-line mt-1">{data.senderInfo}</p></div>
             </div>
             <div className="text-right"><h2 className="text-2xl font-black italic text-slate-300 -mt-2">NOTA</h2><p className="font-mono text-[9px] font-bold">No: {data.no}</p></div>
           </div>
           <div className="flex justify-between text-[10px] mb-4">
              <div><p className="text-slate-400 uppercase text-[8px]">Kepada:</p><p className="font-bold uppercase">{data.receiverName}</p></div>
              <div className="text-right"><p className="text-slate-400 uppercase text-[8px]">Tanggal:</p><p className="font-bold">{formatDateSafe(data.date)}</p></div>
           </div>
           <table className="w-full text-[10px] border-collapse flex-grow">
              <thead className="bg-slate-100 uppercase text-[8px] font-bold">
                <tr><th className="border border-slate-900 p-1.5 w-[30px]">NO</th><th className="border border-slate-900 p-1.5 text-left">NAMA BARANG</th><th className="border border-slate-900 p-1.5 w-[40px]">QTY</th><th className="border border-slate-900 p-1.5 w-[70px]">HARGA</th><th className="border border-slate-900 p-1.5 w-[80px]">TOTAL</th></tr>
              </thead>
              <tbody>
                {data.items.map((item, i) => (
                  <tr key={item.id}><td className="border border-slate-900 p-1.5 text-center">{i+1}</td><td className="border border-slate-900 p-1.5 uppercase font-medium">{item.name}</td><td className="border border-slate-900 p-1.5 text-center">{item.qty}</td><td className="border border-slate-900 p-1.5 text-right">{item.price.toLocaleString('id-ID')}</td><td className="border border-slate-900 p-1.5 text-right font-bold">{(item.qty * item.price).toLocaleString('id-ID')}</td></tr>
                ))}
              </tbody>
           </table>
           <div className="mt-4 shrink-0 flex justify-end">
              <div className="flex border-2 border-slate-900 font-black text-xs uppercase">
                <div className="px-3 py-1.5 bg-slate-900 text-white">Grand Total</div>
                <div className="px-4 py-1.5 bg-white min-w-[100px] text-right">Rp {total.toLocaleString('id-ID')}</div>
              </div>
           </div>
           <div className="flex justify-between items-end mt-4 text-[9px] uppercase font-bold text-slate-400 px-2">
              <div className="text-center w-24"><p className="mb-10">Penerima</p><div className="border-b border-slate-300"></div></div>
              <p className="italic lowercase font-normal text-[8px] max-w-[100px]">{data.footerNote}</p>
              <div className="text-center w-24"><p className="mb-10">Hormat Kami</p><p className="text-slate-900">{data.signer}</p></div>
           </div>
        </div>
      )}
`;

content = content.replace("    </Kertas>", notaBlock + "\n    </Kertas>");

fs.writeFileSync(file, content, 'utf8');
console.log('Restored nota to finance template');
