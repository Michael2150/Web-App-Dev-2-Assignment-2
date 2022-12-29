import express from 'express';
import uniqid from 'uniqid';
import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';

const router = express.Router(); 
router.get('/', asyncHandler(async (req, res) => {
    // Get the arguments from the query string
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 20;
    const sortingCode = req.query.sort_by || "popularity.desc";
    const genre = req.query.with_genre || -1;

    // Log the arguments
    console.log(`Fetching page ${page} of movies with ${perPage} results per page, sorted by ${sortingCode}`);

    // Fetch the movies
    const movies = await movieModel.getPageMovies(page, perPage, genre, sortingCode);

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

export default router;