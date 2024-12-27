import React from "react";
import PageTemplate from '../components/templateMovieListPage';
import { getTopRatedMovies } from "../api/tmdb-api";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';

const TopRatedMoviesPage = () => {
  const { data, error, isLoading, isError } = useQuery('topRated', getTopRatedMovies);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  const topRatedMovies = data;

  return (
    <PageTemplate
      title="Top Rated Movies"
      movies={topRatedMovies}
    />
  );
};

export default TopRatedMoviesPage;