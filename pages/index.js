import { supabase } from '../lib/supabase'
import { useEffect, useState } from "react"
import NewsCard from '../components/NewsCard'
import EducationCard from '../components/EducationCard'
import { Button } from '../components/ui/button'

export default function HomePage() {
  const [news, setNews] = useState([])
  const [education, setEducation] = useState([])

  useEffect(() => {
    // Son haberleri çek
    supabase.from("news")
      .select("*")
      .order("published_at", { ascending: false })
      .limit(5)
      .then(res => {
        if (res.data) setNews(res.data)
      })

    // Eğitim içeriklerini çek
    supabase.from("education")
      .select("topic, slug")
      .order("created_at", { ascending: false })
      .limit(5)
      .then(res => {
        if (res.data) setEducation(res.data)
      })
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Silikon Vadisi Rehberi</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Teknoloji dünyasının kalbinden en güncel haberler ve eğitim içerikleri
          </p>
        </section>

        {/* Haberler Bölümü */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">📢 Güncel Haberler</h2>
            <Button variant="outline" size="sm">
              Tüm Haberler
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {news.map((n, i) => (
              <NewsCard key={i} {...n} />
            ))}
          </div>
        </section>

        {/* Eğitim Bölümü */}
        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">📚 Eğitim İçerikleri</h2>
            <Button variant="outline" size="sm">
              Tüm Eğitimler
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {education.map((e, i) => (
              <EducationCard key={i} {...e} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
} 