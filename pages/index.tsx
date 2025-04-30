import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

export default function Home() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news');
        const data = await response.json();
        setNews(data);
        setLoading(false);
      } catch (error) {
        console.error('Haberler yüklenirken hata oluştu:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const filteredNews = news.filter(item =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col gap-8">
          {/* Hero Section */}
          <section className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Silikon Vadisi Rehberi
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
              Teknoloji dünyasının nabzını tutan en güncel haberler ve startup ekosistemi hakkında detaylı bilgiler
            </p>
            <div className="flex justify-center">
              <Input
                type="search"
                placeholder="Haberlerde ara..."
                className="max-w-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </section>

          {/* Main Content */}
          <Tabs defaultValue="haberler" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="haberler">Haberler</TabsTrigger>
              <TabsTrigger value="egitimler">Eğitimler</TabsTrigger>
            </TabsList>
            
            <TabsContent value="haberler" className="space-y-6">
              {loading ? (
                <div className="text-center">Yükleniyor...</div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredNews.map((item) => (
                    <Card key={item.id} className="overflow-hidden">
                      {item.imageUrl && (
                        <div className="aspect-video relative">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="object-cover w-full h-full"
                          />
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary">{item.category}</Badge>
                          <span className="text-sm text-gray-500">
                            {format(new Date(item.publishedAt), 'd MMMM yyyy', { locale: tr })}
                          </span>
                        </div>
                        <CardTitle className="line-clamp-2">{item.title}</CardTitle>
                        <CardDescription className="line-clamp-3">
                          {item.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <Button variant="outline" className="w-full" asChild>
                          <a href={item.url} target="_blank" rel="noopener noreferrer">
                            Devamını Oku
                          </a>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>

            <TabsContent value="egitimler" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Startup Nedir?</CardTitle>
                    <CardDescription>
                      Girişimcilik dünyasına giriş yapmak isteyenler için temel kavramlar
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="/egitimler/startup-nedir">Eğitime Git</a>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Yatırım Alma Rehberi</CardTitle>
                    <CardDescription>
                      Startuplar için yatırım alma süreci ve stratejileri
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="/egitimler/yatirim-alma">Eğitime Git</a>
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Yapay Zeka ve Girişimcilik</CardTitle>
                    <CardDescription>
                      AI teknolojilerini startup'ınızda nasıl kullanabilirsiniz?
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="/egitimler/yapay-zeka">Eğitime Git</a>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
} 