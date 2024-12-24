import React from "react";
import PageTemplate from '../components/templateMovieListPage';
import { getTrendingMovies } from "../api/tmdb-api";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';

const TrendingMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery('trending', getTrendingMovies);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const trendingMovies = data.results;

  const action = (movie) => (
    <button onClick={() => console.log(`Clicked: ${movie.title}`)}>Action</button>
  );

  return (
    <PageTemplate
      title="Trending Movies"
      movies={trendingMovies}
      action={action} 
    />
  );
};

export default TrendingMoviesPage;
