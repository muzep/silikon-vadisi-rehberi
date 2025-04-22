export default function NewsCard({ title, summary, url }) {
  return (
    <a 
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-6 rounded-2xl bg-white shadow hover:bg-gray-50 transition"
    >
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="text-gray-600">{summary}</p>
    </a>
  )
} 