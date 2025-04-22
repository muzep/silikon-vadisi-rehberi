import { Button } from './ui/button'
import Link from 'next/link'

export default function EducationCard({ topic, slug }) {
  return (
    <div className="group relative rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex flex-col h-full">
        <h3 className="font-semibold mb-2 line-clamp-2">{topic}</h3>
        <div className="mt-auto">
          <Button variant="outline" size="sm" className="w-full" asChild>
            <Link href={`/education/${slug}`}>
              Eğitimi İncele
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 