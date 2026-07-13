import React, { useState } from 'react';

interface ApplicationLetterData {
  applicantName: string;
  applicantAddress: string;
  applicantEmail: string;
  applicantPhone: string;
  applicantLinkedIn: string;
  
  cityAndDate: string;
  
  recipientName: string;
  recipientTitle: string;
  companyName: string;
  companyAddress: string;

  positionApplied: string;
  sourceOfInformation: string;
  
  education: string;
  yearsOfExperience: string;
  keySkills: string;
  expectedSalary: string;
  
  additionalInfo: string;
}

const JobApplicationTemplate: React.FC = () => {
  const [formData, setFormData] = useState<ApplicationLetterData>({
    applicantName: 'Budi Santoso, S.Kom., M.Sc.',
    applicantAddress: 'Jl. Sudirman No. 45, Jakarta Selatan 12190',
    applicantEmail: 'budi.santoso@email.com',
    applicantPhone: '+62 812-3456-7890',
    applicantLinkedIn: 'linkedin.com/in/budisantoso',
    
    cityAndDate: 'Jakarta, 24 Agustus 2026',
    
    recipientName: 'Bpk. Andi Wijaya',
    recipientTitle: 'Direktur Sumber Daya Manusia (HRD)',
    companyName: 'PT Teknologi Nusantara Global',
    companyAddress: 'Gedung Cyber Tower Lt. 15\nJl. H.R. Rasuna Said Blok X5\nJakarta Selatan 12950',
    
    positionApplied: 'Senior Software Engineer',
    sourceOfInformation: 'portal karir LinkedIn pada tanggal 20 Agustus 2026',
    
    education: 'S2 Ilmu Komputer dari Universitas Indonesia dengan IPK 3.85',
    yearsOfExperience: '5',
    keySkills: 'React, Node.js, TypeScript, dan Arsitektur Cloud (AWS)',
    expectedSalary: 'Rp 25.000.000 - Rp 30.000.000',
    
    additionalInfo: 'Saya terbiasa memimpin tim dalam lingkungan Agile dan selalu berorientasi pada pencapaian target dengan kualitas terbaik.',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-neutral-100 p-4 md:p-8 font-sans text-neutral-800 selection:bg-blue-200">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Form Section - Hidden on Print */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow-lg border border-neutral-200 print:hidden overflow-y-auto max-h-[90vh]">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-bold text-slate-800">Kustomisasi Dokumen</h2>
            <button 
              onClick={handlePrint}
              className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9V2h12v7"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><path d="M6 14h12v8H6z"/></svg>
              Cetak PDF
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Applicant Info Group */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider border-b pb-2">Data Pelamar</h3>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap & Gelar</label>
                <input type="text" name="applicantName" value={formData.applicantName} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Alamat Domisili</label>
                <textarea name="applicantAddress" value={formData.applicantAddress} onChange={handleChange} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input type="email" name="applicantEmail" value={formData.applicantEmail} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">No. HP/WA</label>
                  <input type="text" name="applicantPhone" value={formData.applicantPhone} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm" />
                </div>
              </div>
            </div>

            {/* Recipient & Company Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider border-b pb-2">Tujuan Surat</h3>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Kota & Tanggal</label>
                <input type="text" name="cityAndDate" value={formData.cityAndDate} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nama Penerima</label>
                  <input type="text" name="recipientName" value={formData.recipientName} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Jabatan Penerima</label>
                  <input type="text" name="recipientTitle" value={formData.recipientTitle} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Perusahaan</label>
                <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Alamat Perusahaan</label>
                <textarea name="companyAddress" value={formData.companyAddress} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm" />
              </div>
            </div>

            {/* Job Application Details */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider border-b pb-2">Detail Lamaran & Kualifikasi</h3>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Posisi yang Dilamar</label>
                <input type="text" name="positionApplied" value={formData.positionApplied} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Sumber Informasi Lowongan</label>
                <input type="text" name="sourceOfInformation" value={formData.sourceOfInformation} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Latar Belakang Pendidikan</label>
                <textarea name="education" value={formData.education} onChange={handleChange} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm" />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Keahlian Utama (Skills)</label>
                <textarea name="keySkills" value={formData.keySkills} onChange={handleChange} rows={2} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm" />
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Pengalaman (Tahun)</label>
                  <input type="text" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Ekspektasi Gaji</label>
                  <input type="text" name="expectedSalary" value={formData.expectedSalary} onChange={handleChange} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nilai Tambah / Info Lainnya</label>
                <textarea name="additionalInfo" value={formData.additionalInfo} onChange={handleChange} rows={3} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-500 text-sm" />
              </div>
            </div>

          </div>
        </div>

        {/* Document Preview Section */}
        <div className="w-full lg:w-2/3 flex justify-center print:w-full print:block">
          {/* A4 Paper Dimensions: 210 x 297 mm */}
          <div className="bg-white shadow-2xl print:shadow-none w-[210mm] min-h-[297mm] p-[25.4mm] text-[11pt] leading-[1.6] font-serif text-black mx-auto shrink-0 relative overflow-hidden group">
            
            {/* Header/Letterhead for Corporate Feel */}
            <div className="border-b-2 border-black pb-4 mb-8 flex justify-between items-end">
              <div>
                <h1 className="text-2xl font-bold uppercase tracking-widest text-slate-800">{formData.applicantName}</h1>
                <p className="text-sm text-slate-600 mt-1 font-sans">{formData.positionApplied} Professional</p>
              </div>
              <div className="text-right text-[9pt] font-sans text-slate-600 space-y-1">
                <p>{formData.applicantAddress}</p>
                <p>{formData.applicantEmail} | {formData.applicantPhone}</p>
                <p>{formData.applicantLinkedIn}</p>
              </div>
            </div>

            <div className="flex justify-between items-start mb-10">
              <div className="w-1/2">
                <p>{formData.cityAndDate}</p>
                <br />
                <p>Kepada Yth.,</p>
                <p className="font-bold">{formData.recipientName}</p>
                <p>{formData.recipientTitle}</p>
                <p className="font-bold">{formData.companyName}</p>
                <p className="whitespace-pre-wrap">{formData.companyAddress}</p>
              </div>
            </div>

            <div className="mb-6">
              <p>Perihal: <strong>Lamaran Pekerjaan – {formData.positionApplied}</strong></p>
            </div>

            <div className="space-y-4 text-justify">
              <p>Dengan hormat,</p>
              
              <p>
                Menanggapi informasi lowongan pekerjaan yang dipublikasikan melalui {formData.sourceOfInformation}, 
                bersama surat ini saya bermaksud menyampaikan ketertarikan saya untuk mengisi posisi 
                <strong> {formData.positionApplied}</strong> di <strong>{formData.companyName}</strong>. 
                Dengan rekam jejak profesional yang solid dan komitmen terhadap keunggulan operasional, 
                saya yakin dapat memberikan kontribusi strategis bagi perusahaan yang Bapak/Ibu pimpin.
              </p>

              <p>
                Sebagai profesional dengan pengalaman selama lebih dari {formData.yearsOfExperience} tahun di industri ini, 
                saya telah mengembangkan kompetensi yang mendalam di bidang spesifik yang relevan dengan kebutuhan perusahaan. 
                Latar belakang pendidikan saya, yaitu {formData.education}, telah membekali saya dengan 
                landasan analitis dan pemecahan masalah yang tajam.
              </p>

              <p>
                Sepanjang karir saya, saya telah menguasai dan mengaplikasikan berbagai keahlian kunci, 
                di antaranya: {formData.keySkills}. {formData.additionalInfo} Saya terbiasa 
                bekerja dalam ekosistem perusahaan yang dinamis, menuntut adaptabilitas tinggi, 
                serta kolaborasi lintas divisi untuk mencapai sasaran bisnis.
              </p>

              <p>
                Mengenai ekspektasi kompensasi, berdasarkan riset pasar dan kualifikasi yang saya tawarkan, 
                saya mengajukan kisaran remunerasi sebesar {formData.expectedSalary}. Namun, saya 
                sangat terbuka untuk mendiskusikan hal ini lebih lanjut, sejalan dengan struktur 
                kompensasi yang berlaku di <strong>{formData.companyName}</strong> serta total 
                benefit yang ditawarkan.
              </p>

              <p>
                Bersama surat lamaran ini, turut saya lampirkan <em>Curriculum Vitae</em> (CV) dan 
                portofolio dokumen pendukung lainnya sebagai bahan pertimbangan komprehensif Bapak/Ibu. 
                Saya sangat menantikan kesempatan untuk dapat berdiskusi lebih lanjut dalam sesi 
                wawancara guna memaparkan bagaimana kualifikasi saya dapat sejalan dengan visi dan 
                kebutuhan <strong>{formData.companyName}</strong>.
              </p>

              <p>
                Atas waktu, perhatian, dan kesempatan yang Bapak/Ibu berikan, saya mengucapkan 
                terima kasih yang sebesar-besarnya.
              </p>
            </div>

            <div className="mt-12 space-y-16">
              <p>Hormat saya,</p>
              <div className="flex flex-col">
                <p className="font-bold underline">{formData.applicantName}</p>
                <p className="text-sm italic text-slate-600">Pelamar</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default JobApplicationTemplate;