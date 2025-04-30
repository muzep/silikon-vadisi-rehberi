import type { NextApiRequest, NextApiResponse } from 'next';

type EducationItem = {
  id: string;
  title: string;
  description: string;
  content: string;
  category: string;
};

const educationContent: EducationItem[] = [
  {
    id: 'startup-basics',
    title: 'Startup Nedir?',
    description: 'Startup kavramını ve temel özelliklerini öğrenin',
    content: `
      Startup, yenilikçi bir iş fikrini hayata geçirmek için kurulan, hızlı büyüme potansiyeli olan şirketlerdir. 
      Temel özellikleri:
      - Yenilikçi çözümler
      - Ölçeklenebilir iş modeli
      - Hızlı büyüme potansiyeli
      - Risk ve belirsizlik
      - Teknoloji odaklı yaklaşım
    `,
    category: 'Temel Bilgiler'
  },
  {
    id: 'investment-guide',
    title: 'Yatırım Rehberi',
    description: 'Startup\'ınız için yatırım alma sürecini öğrenin',
    content: `
      Yatırım alma süreci:
      1. İş planı hazırlama
      2. Pitch deck oluşturma
      3. Yatırımcı ağı oluşturma
      4. Görüşmeler ve sunumlar
      5. Due diligence süreci
      6. Term sheet ve anlaşma
    `,
    category: 'Finans'
  },
  {
    id: 'ai-entrepreneurship',
    title: 'AI ve Girişimcilik',
    description: 'Yapay zeka teknolojilerini girişiminizde nasıl kullanacağınızı öğrenin',
    content: `
      AI teknolojilerinin girişimlerde kullanımı:
      - Müşteri hizmetleri otomasyonu
      - Veri analizi ve tahminleme
      - Ürün önerileri
      - Pazarlama optimizasyonu
      - Süreç otomasyonu
    `,
    category: 'Teknoloji'
  }
];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<EducationItem[]>
) {
  res.status(200).json(educationContent);
} 