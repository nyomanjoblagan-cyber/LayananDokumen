'use client';

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    // Cuma div biasa. JANGAN ADA <html> atau <body> di sini!
    <div className="min-h-screen bg-[#f3f4f6]">
      {children}
    </div>
  );
}