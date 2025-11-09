import React from 'react'
import MovieList from './MovieList'
import { useSelector } from 'react-redux'

const SecondaryContainer = () => {
  const movies = useSelector(store => store.movies)
  return (

    movies?.nowPlayingMovies && (
      <div className="bg-black">
        <div className="-mt-52 pl-6 relative z-20 ">
          <MovieList key={movies?.nowPlayingMovies?.id} title={"Now Playing"} movies={movies?.nowPlayingMovies} />
          <MovieList key={movies?.nowPlayingMovies?.id} title={"Popular"} movies={movies?.popularMovies} />
          <MovieList key={movies?.nowPlayingMovies?.id} title={"Top Rated"} movies={movies?.topRatedMovies} />
          <MovieList key={movies?.nowPlayingMovies?.id} title={"Upcoming"} movies={movies?.upcomingMovies} />
        </div>
      </div>

    )
  );
}

export default SecondaryContainer;