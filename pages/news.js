import { supabase } from '../lib/supabase'
import { useEffect, useState } from "react"
import NewsCard from '../components/NewsCard'

export default function NewsPage() {
  const [news, setNews] = useState([])

  useEffect(() => {
    supabase.from("news")
      .select("*")
      .order("published_at", { ascending: false })
      .then(res => {
        if (res.data) setNews(res.data)
      })
  }, [])

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">📢 Güncel Teknoloji & AI Haberleri</h1>
      <div className="space-y-4">
        {news.map((n, i) => (
          <NewsCard key={i} {...n} />
        ))}
      </div>
    </div>
  )
} 