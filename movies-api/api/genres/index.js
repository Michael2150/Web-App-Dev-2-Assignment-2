import express from 'express';
import asyncHandler from 'express-async-handler';
import MovieGenre from './movieGenreModel.js';

const router = express.Router(); 

//GET all movies genres
router.get('/movies', async (req, res) => {
    const genres = await MovieGenre.find();
    res.status(200).json(genres);
});

export default router;