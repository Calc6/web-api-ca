import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import { getUpcomingMovies, getGenres, getTopRatedMovies, getMoviesByGenre } from '../tmdb-api';

const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
}));


router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
}));


router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));

router.get('/tmdb/genres', asyncHandler(async (req, res) => {
    const genres = await getGenres();
    res.status(200).json(genres);
}));

router.get('/tmdb/top-rated', asyncHandler(async (req, res) => {
    try {
        console.log('Fetching top-rated movies');
        const topRatedMovies = await getTopRatedMovies(); 
        res.status(200).json(topRatedMovies);
    } catch (err) {
        console.error(`Error fetching top-rated movies: ${err.message}`);
        res.status(500).json({ message: 'Internal server error' });
    }
}));


router.get('/genre/:genreId', asyncHandler(async (req, res) => {
    const { genreId } = req.params;
    console.log(`Fetching movies by genre: ${genreId}`);
    try {
        const movies = await movieModel.find({ genre_ids: parseInt(genreId, 10) });
        if (!movies || movies.length === 0) {
            return res.status(404).json({ message: 'No movies found', status_code: 404 });
        }
        res.status(200).json(movies);
    } catch (err) {
        console.error(`Error fetching movies by genre: ${err.message}`);
    }
}));




export default router;