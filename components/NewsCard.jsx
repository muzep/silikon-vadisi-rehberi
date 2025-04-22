import { Button } from './ui/button'
import { format } from 'date-fns'
import { tr } from 'date-fns/locale'

export default function NewsCard({ title, content, published_at, url }) {
  return (
    <div className="group relative rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md">
      <div className="flex flex-col h-full">
        <h3 className="font-semibold mb-2 line-clamp-2">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{content}</p>
        <div className="mt-auto">
          <div className="text-xs text-muted-foreground mb-3">
            {format(new Date(published_at), 'd MMMM yyyy', { locale: tr })}
          </div>
          <Button variant="outline" size="sm" className="w-full" asChild>
            <a href={url} target="_blank" rel="noopener noreferrer">
              Haberi Oku
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
} 