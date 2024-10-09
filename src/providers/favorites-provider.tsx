// FavoritesContext.tsx

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react'

interface Movie {
  imdbID: string
  Title: string // Título do filme
  Year: string // Ano de lançamento
  Poster: string // URL do poster
  Plot?: string // Resumo do filme (opcional)
  // Adicione outros campos relevantes que você deseja armazenar
}

interface FavoritesContextType {
  favoriteMovies: Movie[]
  addFavoriteMovie: (movie: Movie) => void
  removeFavoriteMovie: (id: string) => void
  toggleFavorite: (movie: Movie) => void
  isFavoriteMovie: (imdbID: string) => boolean
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined,
)

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>(() => {
    const storedMovies = localStorage.getItem('favoriteMovies')
    return storedMovies ? JSON.parse(storedMovies) : []
  })

  useEffect(() => {
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies))
  }, [favoriteMovies])

  const addFavoriteMovie = (movie: Movie) => {
    setFavoriteMovies((prevFavorites) => {
      return [...prevFavorites, movie]
    })
  }
  console.log(favoriteMovies)
  const removeFavoriteMovie = (imdbID: string) => {
    setFavoriteMovies((prevFavorites) =>
      prevFavorites.filter((movie) => movie.imdbID !== imdbID),
    )
  }
  const toggleFavorite = (movie: Movie) => {
    if (favoriteMovies.some((favMovie) => favMovie?.imdbID === movie?.imdbID)) {
      removeFavoriteMovie(movie?.imdbID)
    } else {
      addFavoriteMovie(movie)
    }
  }
  function isFavoriteMovie(imdbID: string) {
    return favoriteMovies.some((movie) => movie?.imdbID === imdbID)
  }

  return (
    <FavoritesContext.Provider
      value={{
        favoriteMovies,
        addFavoriteMovie,
        removeFavoriteMovie,
        toggleFavorite,
        isFavoriteMovie,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavoritesContext = () => {
  const context = useContext(FavoritesContext)
  if (!context) {
    throw new Error(
      'useFavoritesContext must be used within a FavoritesProvider',
    )
  }
  return context
}
