'use client'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Movie } from '@/api-uses/types/movies'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useFavoritesContext } from '@/providers/favorites-provider'
type MoviesListProps = {
  movies: Movie[]
}

export default function MoviesList({ movies }: MoviesListProps) {
  const router = useRouter()
  const { toggleFavorite, isFavoriteMovie } = useFavoritesContext()
  if (movies.length === 0) {
    return (
      <div className="py-10 text-center">
        <p className="text-xl text-muted-foreground">No movies found.</p>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {movies.map((movie) => {
        const isFavorite = isFavoriteMovie(movie.imdbID)
        return (
          <Card
            key={movie.imdbID}
            className="relative cursor-pointer transition-shadow duration-200 hover:shadow-lg"
            onClick={() => router.push(`/movies/${movie.imdbID}`)}
          >
            <CardHeader className="p-0">
              <div className="relative aspect-[2/3] overflow-hidden rounded-t-lg">
                <Image
                  src={
                    movie.Poster !== 'N/A'
                      ? movie.Poster
                      : '/placeholder.svg?height=450&width=300'
                  }
                  alt={movie.Title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="line-clamp-2 text-lg">
                {movie.Title}
              </CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">{movie.Year}</p>
            </CardContent>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-2 bg-background/80 backdrop-blur-sm"
              onClick={(e) => {
                e.stopPropagation()
                toggleFavorite(movie)
              }}
              aria-label={
                isFavorite ? 'Remove from favorites' : 'Add to favorites'
              }
            >
              <Heart
                className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-500'}`}
              />
            </Button>
          </Card>
        )
      })}
    </div>
  )
}
