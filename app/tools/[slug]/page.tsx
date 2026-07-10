import { TEMPLATES } from '@/data/templates';
import { TemplateRegistry } from '@/data/registry';
import { notFound } from 'next/navigation';
import SeoGuide from '@/components/SeoGuide';
import { Metadata } from 'next';

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

// 1. Generate Metadata SEO secara Dinamis
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const data = TEMPLATES[slug];
  
  if (!data) {
    return {
      title: 'Template Tidak Ditemukan | LayananDokumen.com',
      description: 'Template dokumen yang Anda cari tidak tersedia.'
    };
  }
  
  return { 
    title: data.title, 
    description: data.description,
    openGraph: {
      title: data.title,
      description: data.description,
      type: 'website',
    }
  };
}

// 2. Render Halaman Template & Panduan SEO
export default async function ToolPage({ params }: Props) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  // Ambil komponen dari registry untuk menghindari error build "dynamic string"
  const TemplateClient = TemplateRegistry[slug];
  const templateData = TEMPLATES[slug];
  
  // Jika URL tidak valid atau template tidak terdaftar, tampilkan halaman 404
  if (!TemplateClient || !templateData) {
    notFound(); 
  }
  
  // Skema JSON-LD untuk memenangkan cuplikan kaya Google
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': templateData.title,
    'operatingSystem': 'Web Browser',
    'applicationCategory': 'BusinessApplication',
    'description': templateData.description,
    'offers': {
      '@type': 'Offer',
      'price': '10000.00',
      'priceCurrency': 'IDR'
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Render Form Klien (Unik per template) */}
      <TemplateClient />
      
      {/* Render Artikel SEO Terbuka (Disembunyikan saat di-print via class 'no-print' di dalam komponen) */}
      <SeoGuide data={templateData} />
    </>
  );
}
