import React, { useContext } from 'react';
import { MoviesContext } from '../contexts/moviesContext';
import MovieListPageTemplate from '../components/templateMovieListPage';
import RemoveFromWatchlistIcon from '../components/cardIcons/removeFromWatchlist'; 

const WatchlistPage = () => {
  const { watchlist, removeMovieFromWatchlist } = useContext(MoviesContext);
  console.log(watchlist);


  return (
    <MovieListPageTemplate
      title="Watchlist"
      movies={watchlist}
      action={movie => (
        <RemoveFromWatchlistIcon movie={movie} onRemoveClick={() => removeMovieFromWatchlist(movie.id)} />
      )}
    />
  );
};

export default WatchlistPage;