type Props = {
  topic: string
  slug: string
}

export default function EducationCard({ topic, slug }: Props) {
  return (
    <a 
      href={`/education/${slug}`}
      className="block p-6 rounded-2xl bg-white shadow hover:bg-gray-50 transition"
    >
      <h2 className="text-xl font-bold mb-2">{topic}</h2>
      <p className="text-gray-600">Detaylı bilgi için tıklayın</p>
    </a>
  )
} 