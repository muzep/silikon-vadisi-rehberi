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

EDUCATION_TOPICS = [
    "Startup Nedir?",
    "Startup Nasıl Kurulur?",
    "Yatırım Nasıl Alınır?",
    "Pitch Deck Hazırlama",
    "Minimum Viable Product (MVP)",
    "Startup Ekosistemi",
    "Silikon Vadisi'nde Başarılı Olmak",
    "Startup Finansmanı",
    "Startup Pazarlama Stratejileri",
    "Startup Hukuku"
]

def generate_content(topic):
    prompt = f"""Aşağıdaki konu hakkında detaylı bir eğitim içeriği oluştur. İçerik Türkçe olmalı ve şu bölümleri içermeli:
1. Giriş ve önem
2. Temel kavramlar
3. Adım adım süreç
4. Örnekler ve vaka çalışmaları
5. Öneriler ve ipuçları
6. Sonuç

Konu: {topic}

İçerik en az 1000 kelime olmalı ve markdown formatında yazılmalı."""
    
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[{"role": "user", "content": prompt}],
    )
    return response['choices'][0]['message']['content']

def generate_and_store():
    try:
        # Mevcut konuları kontrol et
        res = supabase.table("education").select("topic").execute()
        existing_topics = [item["topic"] for item in res.data] if res.data else []
        
        # Henüz işlenmemiş bir konu bul
        for topic in EDUCATION_TOPICS:
            if topic not in existing_topics:
                print(f"İçerik oluşturuluyor: {topic}")
                content = generate_content(topic)
                
                # Veritabanına kaydet
                supabase.table("education").insert({
                    "topic": topic,
                    "content": content,
                    "created_at": datetime.now().isoformat(),
                    "slug": topic.lower().replace(" ", "-").replace("?", "")
                }).execute()
                
                print(f"İçerik kaydedildi: {topic}")
                break
    except Exception as e:
        print(f"Hata: {str(e)}")

if __name__ == "__main__":
    generate_and_store() 