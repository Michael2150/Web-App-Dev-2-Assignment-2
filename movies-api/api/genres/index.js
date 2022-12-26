import express from 'express';
import asyncHandler from 'express-async-handler';
import Genre from './genreModel';

const router = express.Router(); 

//GET genres list endpoint
router.get('/', async (req, res) => {
    const genres = await Genre.find();
    res.status(200).json(genres);
});

export default router;