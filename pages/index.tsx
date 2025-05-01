import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface NewsItem {
  title: string;
  description: string;
  url: string;
  source: string;
  publishedAt: string;
}

interface EducationItem {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
}

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [education, setEducation] = useState<EducationItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsRes, educationRes] = await Promise.all([
          fetch('/api/news'),
          fetch('/api/education')
        ]);

        if (!newsRes.ok || !educationRes.ok) {
          throw new Error('Veri yüklenirken bir hata oluştu');
        }

        const [newsData, educationData] = await Promise.all([
          newsRes.json(),
          educationRes.json()
        ]);

        setNews(newsData);
        setEducation(educationData);
      } catch (err) {
        setError('Veriler yüklenirken bir hata oluştu');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEducation = education.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500 text-xl">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">Silikon Vadisi Rehberi</h1>
        <p className="text-gray-600">Teknoloji dünyasından en güncel haberler ve eğitim kaynakları</p>
      </div>

      <div className="mb-8">
        <Input
          type="text"
          placeholder="Haber veya eğitim ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md mx-auto"
        />
      </div>

      <Tabs defaultValue="news" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="news">Haberler</TabsTrigger>
          <TabsTrigger value="education">Eğitim</TabsTrigger>
        </TabsList>

        <TabsContent value="news">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((item, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                  <CardDescription>
                    <Badge variant="secondary" className="mr-2">{item.source}</Badge>
                    {new Date(item.publishedAt).toLocaleDateString('tr-TR')}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3 mb-4">{item.description}</p>
                  <Button asChild className="w-full">
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      Devamını Oku
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="education">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEducation.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                  <CardDescription>
                    <Badge variant="secondary">{item.category}</Badge>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 line-clamp-3 mb-4">{item.description}</p>
                  <Button asChild className="w-full">
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      Kaynağa Git
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 