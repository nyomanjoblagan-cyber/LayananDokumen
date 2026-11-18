import sys

def main():
    file_path = r"d:\WEB DESIGN\LayananDokumen\components\templates\diskon\index.tsx"
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Add templateId and Menu
    state_injection = """  const [templateId, setTemplateId] = useState<number>(1);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const activeTemplateName = templateId === 1 ? 'Legal Formal' : 'Compact Rapi';

  const TemplateMenu = () => (
      <div className="absolute top-full right-0 mt-2 w-64 bg-white text-slate-800 border border-slate-100 rounded-xl shadow-xl p-2 z-[60]">
          <button onClick={() => {setTemplateId(1); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 1 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
              <div className={`w-2 h-2 rounded-full ${templateId === 1 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
              Format Legal Formal (Serif)
          </button>
          <button onClick={() => {setTemplateId(2); setShowTemplateMenu(false)}} className={`w-full text-left p-3 hover:bg-emerald-50 rounded-lg text-sm font-medium flex items-center gap-2 ${templateId === 2 ? 'bg-emerald-50 text-emerald-700' : ''}`}>
              <div className={`w-2 h-2 rounded-full ${templateId === 2 ? 'bg-emerald-500' : 'bg-slate-300'}`}></div> 
              Format Compact Rapi (Sans)
          </button>
      </div>
  );

  const DocumentContent = () => (
"""
    
    # 2. Extract DocumentContent
    start_tag = '<div ref={printRef} className="print-safe-area bg-white text-black shadow-2xl mx-auto" style={{ width: \'210mm\', minHeight: \'297mm\', padding: \'20mm\', fontFamily: \'Arial, sans-serif\' }}>'
    end_tag = '          </div>\n                  <div className="no-print mt-8 mb-4">'
    
    start_idx = content.find(start_tag)
    end_idx = content.find(end_tag) + len('          </div>\n')
    
    document_content_body = content[start_idx:end_idx]
    
    # Replace the fixed inline styles with the templateId logic
    document_content_body = document_content_body.replace(
        '<div ref={printRef} className="print-safe-area bg-white text-black shadow-2xl mx-auto" style={{ width: \'210mm\', minHeight: \'297mm\', padding: \'20mm\', fontFamily: \'Arial, sans-serif\' }}>',
        '<div ref={printRef} className={`print-safe-area bg-white text-black shadow-2xl mx-auto print:shadow-none ${templateId === 1 ? \'font-serif text-[11pt]\' : \'font-sans text-[10pt]\'}`} style={{ width: \'210mm\', minHeight: \'297mm\', padding: \'20mm\' }}>'
    )
    
    # Inject DocumentContent after printRef declaration
    insert_pos = content.find("const printRef = useRef<HTMLDivElement>(null);")
    insert_pos = content.find("\n", insert_pos) + 1
    
    new_content = content[:insert_pos] + "\n" + state_injection + "    " + document_content_body + "\n  );\n\n" + content[insert_pos:]
    
    # Replace the old document content block in the preview area
    new_content = new_content.replace(content[start_idx:end_idx], "          <DocumentContent />\n")
    
    # Add Menu to header
    header_target = """        <h2 className="text-xl font-bold mb-5 text-gray-800 dark:text-white border-b pb-3 flex items-center gap-2">
          <Tag className="w-5 h-5 text-orange-600" />
          Surat Persetujuan Diskon
        </h2>"""
    header_replacement = """        <div className="flex justify-between items-center mb-5 border-b pb-3">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <Tag className="w-5 h-5 text-orange-600" />
            Surat Persetujuan Diskon
          </h2>
          <div className="relative">
              <button onClick={() => setShowTemplateMenu(!showTemplateMenu)} className="bg-slate-800 hover:bg-slate-700 border border-slate-600 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all text-white">
                  <span className="text-emerald-400">❖</span> 
                  <span className="hidden md:inline">{activeTemplateName}</span>
              </button>
              {showTemplateMenu && <TemplateMenu />}
          </div>
        </div>"""
    new_content = new_content.replace(header_target, header_replacement)
    
    # Add print:hidden to outermost wrapper
    new_content = new_content.replace('<div className="flex flex-col md:flex-row gap-6">', '<div className="flex flex-col md:flex-row gap-6 print:hidden">')
    
    # Close outermost wrapper and add print-only-root at the bottom
    bottom_target = """      </div>
    </div>
  );
}"""
    bottom_replacement = """      </div>
    </div>

    {/* --- PRINT PORTAL --- */}
    <div id="print-only-root" className="hidden print:block print:w-full print:h-auto print:static bg-white">
       <DocumentContent />
    </div>
  </>
  );
}"""
    
    new_content = new_content.replace(bottom_target, bottom_replacement)
    
    # Add fragment at top
    new_content = new_content.replace('return (\n    <div className="flex flex-col md:flex-row gap-6 print:hidden">', 'return (\n  <>\n    <div className="flex flex-col md:flex-row gap-6 print:hidden">')

    with open(file_path, "w", encoding="utf-8") as f:
        f.write(new_content)

if __name__ == "__main__":
    main()
