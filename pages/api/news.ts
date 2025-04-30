import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

type NewsItem = {
  id: string;
  title: string;
  description: string;
  url: string;
  imageUrl: string;
  publishedAt: string;
  category: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<NewsItem[]>
) {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=(silicon valley OR technology OR startup)&language=tr&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`
    );

    const news = response.data.articles.map((article: any) => ({
      id: article.url,
      title: article.title,
      description: article.description,
      url: article.url,
      imageUrl: article.urlToImage,
      publishedAt: article.publishedAt,
      category: 'Teknoloji'
    }));

    res.status(200).json(news);
  } catch (error) {
    console.error('Haberler alınırken hata oluştu:', error);
    res.status(500).json([]);
  }
} 