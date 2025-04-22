import feedparser
import openai
import os
from datetime import datetime
from supabase import create_client, Client

# ENV değerleri
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('SUPABASE_KEY')
GPT_API_KEY = os.getenv('GPT_API_KEY')

openai.api_key = GPT_API_KEY
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Örnek RSS Kaynağı
feed_url = "https://www.theverge.com/rss/index.xml"

def summarize(content):
    try:
        prompt = f"""Bu haberin içeriğini özetle ve kullanıcıya sade bir dille anlat. 300 kelimeyi geçmesin. Tweet önerisiyle bitir:
{content}"""
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
        )
        return response['choices'][0]['message']['content']
    except Exception as e:
        print(f"Özetleme hatası: {str(e)}")
        return None

def fetch_and_store():
    try:
        feed = feedparser.parse(feed_url)
        print(f"Toplam {len(feed.entries)} haber bulundu")
        
        for i, entry in enumerate(feed.entries[:10], 1):
            print(f"\n{i}. Haber işleniyor: {entry.title}")
            summary = summarize(entry.summary)
            
            if summary:
                try:
                    result = supabase.table("news").insert({
                        "title": entry.title,
                        "url": entry.link,
                        "summary": summary,
                        "published_at": datetime.now().isoformat()
                    }).execute()
                    print(f"Haber başarıyla kaydedildi: {entry.title}")
                except Exception as e:
                    print(f"Veritabanı hatası: {str(e)}")
            else:
                print(f"Haber özetlenemedi: {entry.title}")
    except Exception as e:
        print(f"Genel hata: {str(e)}")

if __name__ == "__main__":
    fetch_and_store() 