import express from 'express';
import asyncHandler from 'express-async-handler';
import tvShowModel from './tvShowModel';

const router = express.Router(); 

// Get the list of TV shows
router.get('/discover', asyncHandler(async (req, res) => {
    // Get the arguments from the query string
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 20;
    const sortingCode = req.query.sort_by || "popularity.desc";
    const genre = req.query.with_genre || -1;

    // Fetch the TV shows
    const tvShows = await tvShowModel.getPageTVShows(page, perPage, genre, sortingCode, false);

    // Get the total number of TV shows
    const totalResults = await tvShowModel.countDocuments();

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalResults / perPage);

    // Return the results
    res.status(200).json({
        page: page,
        results: tvShows,
        total_pages: totalPages,
        total_results: totalResults,
    });
}));

// Get the upcoming TV shows
router.get('/upcoming', asyncHandler(async (req, res) => {
    // Get the arguments from the query string
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 20;
    const sortingCode = req.query.sort_by || "popularity.desc";
    const genre = req.query.with_genre || -1;

    // Fetch the TV shows
    const tvShows = await tvShowModel.getPageTVShows(page, perPage, genre, sortingCode, true);

    // Get the total number of TV shows
    const totalResults = await tvShowModel.countDocuments();

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalResults / perPage);

    // Return the results
    res.status(200).json({
        page: page,
        results: tvShows,
        total_pages: totalPages,
        total_results: totalResults,
    });
}));

// Get popular TV shows
router.get('/popular', asyncHandler(async (req, res) => {
    // Get the arguments from the query string
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 20;
    const genre = req.query.with_genre || -1;
    const sortingCode = "popularity.desc";

    // Fetch the TV shows
    const tvShows = await tvShowModel.getPageTVShows(page, perPage, genre, sortingCode);

    // Get the total number of TV shows
    const totalResults = await tvShowModel.getTVShowCount();

    // Calculate the total number of pages
    const totalPages = Math.ceil(totalResults / perPage);

    // Return the results
    res.status(200).json({
        page: page,
        results: tvShows,
        total_pages: totalPages,
        total_results: totalResults,
    });
}));


// Get the list of genres
router.get('/genres', asyncHandler(async (req, res) => {
    const genres = await tvShowModel.getGenres();
    res.status(200).json({genres: genres});
}));


// Get TV show details
router.get('/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const tvShow = await tvShowModel.findByTVShowDBId(id);
    if (tvShow) {
      res.status(200).json(tvShow);
    } else {
      res.status(404).json({message: 'The resource you requested could not be found.', status_code: 404});
    }
  }));
  

// Get movie images
router.get('/:id/images', asyncHandler(async (req, res) => {
    res.status(200).json({message: 'Not implemented yet.'});
}));

export default router;