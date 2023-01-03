import express from 'express';
import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';

const router = express.Router(); 

// Get the list of movies
router.get('/discover', asyncHandler(async (req, res) => {
    // Get the arguments from the query string
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 20;
    const sortingCode = req.query.sort_by || "popularity.desc";
    const genre = req.query.with_genre || -1;

    // Fetch the movies
    const movies = await movieModel.getPageMovies(page, perPage, genre, sortingCode, false);

    // Get the total number of movies
    const totalResults = await movieModel.countDocuments();

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalResults / perPage);

    // Return the results
    res.status(200).json({
        page: page,
        results: movies,
        total_pages: totalPages,
        total_results: totalResults,
    });
}));

// Get the upcoming movies
router.get('/upcoming', asyncHandler(async (req, res) => {
    // Get the arguments from the query string
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 20;
    const sortingCode = req.query.sort_by || "popularity.desc";
    const genre = req.query.with_genre || -1;

    // Fetch the movies
    const movies = await movieModel.getPageMovies(page, perPage, genre, sortingCode, true);

    // Get the total number of movies
    const totalResults = await movieModel.countDocuments();

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalResults / perPage);

    // Return the results
    res.status(200).json({
        page: page,
        results: movies,
        total_pages: totalPages,
        total_results: totalResults,
    });
}));

// Get popular movies
router.get('/popular', asyncHandler(async (req, res) => {
    // Get the arguments from the query string
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 20;
    const genre = req.query.with_genre || -1;
    const sortingCode = "popularity.desc";

    // Fetch the movies
    const movies = await movieModel.getPageMovies(page, perPage, genre, sortingCode, false);

    // Get the total number of movies
    const totalResults = await movieModel.countDocuments();

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalResults / perPage);

    // Return the results
    res.status(200).json({
        page: page,
        results: movies,
        total_pages: totalPages,
        total_results: totalResults,
    });
}));

// Get movie genres
router.get('/genres', asyncHandler(async (req, res) => {
    const genres = await movieModel.getGenres();
    res.status(200).json({genres: genres});
}));

// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
    } else {
        res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
}));

// Get movie images
router.get('/:id/images', asyncHandler(async (req, res) => {
    // Get the movie id from the URL
    const id = parseInt(req.params.id);
    // Construct the URL for the movie images API
    const url = `https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}`;
    // Redirect to the movie images API
    res.redirect(url);
}));

export default router;