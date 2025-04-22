import { supabase } from '../lib/supabase'
import { useEffect, useState } from "react"
import NewsCard from '../components/NewsCard'
import EducationCard from '../components/EducationCard'

type News = {
  title: string
  summary: string
  url: string
}

type Education = {
  topic: string
  slug: string
}

export default function HomePage() {
  const [news, setNews] = useState<News[]>([])
  const [education, setEducation] = useState<Education[]>([])

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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-4">
        {/* Haberler Bölümü */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">📢 Güncel Haberler</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {news.map((n, i) => (
              <NewsCard key={i} {...n} />
            ))}
          </div>
        </section>

        {/* Eğitim Bölümü */}
        <section>
          <h2 className="text-2xl font-bold mb-6">📚 Eğitim İçerikleri</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {education.map((e, i) => (
              <EducationCard key={i} {...e} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
} 