import React from "react";
import PageTemplate from '../components/templateMovieListPage';
import { getMoviesByGenre } from "../api/tmdb-api";
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import { useParams } from 'react-router-dom';

const MoviesByGenrePage = () => {
    const { genreId } = useParams();
    const { data, error, isLoading, isError } = useQuery(['moviesByGenre', genreId], () => getMoviesByGenre(genreId));

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }

    const movies = data;

    return (
        <PageTemplate
            title={`Movies in Genre ${genreId}`}
            movies={movies}
        />
    );
};

export default MoviesByGenrePage;
