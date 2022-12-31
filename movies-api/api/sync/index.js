import express from 'express';
import dotenv from 'dotenv';
import asyncHandler from 'express-async-handler';
import movieModel from '../movies/movieModel';

const fetch = require('isomorphic-fetch');
const router = express.Router(); 

router.get('/', asyncHandler(async (req, res) => {
    console.log("Syncing data from TMDB API...")

    //Get the API key from the environment variable
    const key = process.env.REACT_APP_TMDB_KEY;
    const pages = req.query.pages || 5;
    
    //Clear the database
    console.log("Clearing the database...")
    await movieModel.deleteMany();    

    //Save a movie to the database
    const saveMovie = async (movie, isUpcoming) => {
        const url = `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${key}&language=en-US`;
        const response = await fetch(url);
        const data = await response.json();
        var movieDetails = data;

        //add a new "isUpcoming" property to the movie object
        movieDetails.isUpcoming = isUpcoming;

        //Check if the movie's id is already in the database
        const movieExists = await movieModel.findOne({
            id: movieDetails.id
        });
        //If the movie is not in the database, add it
        if (!movieExists) {
            movieModel.create(movieDetails);
        }
    }

    //Fetch all the movies from the TMDB API from
    console.log(`Syncing ${pages} pages of discover movies from TMDB API...`)
    for (let i = 1; i <= pages; i++) {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&include_adult=false&include_video=false&page=${i}`
        const response = await fetch(url);
        const data = await response.json();
        const movies = data.results;

        //Get the details of each movie
        for (let j = 0; j < movies.length; j++) {
            const movie = movies[j];
            saveMovie(movie, false)
        }

        //If the total number of pages is less than the number of pages to sync, break the loop
        if (i == data.total_pages) break;
    }
    console.log("Discover movies synced.")

    //Fetch all the upcoming movies from the TMDB API
    console.log(`Syncing ${pages} pages of upcoming movies from TMDB API...`)
    for (let i = 1; i <= pages; i++) {
        const url = `https://api.themoviedb.org/3/movie/upcoming?api_key=${key}&language=en-US&include_adult=false&include_video=false&page=${i}`
        const response = await fetch(url);
        const data = await response.json();
        const movies = data.results;
        
        //Get the details of each movie
        for (let j = 0; j < movies.length; j++) {
            const movie = movies[j];
            saveMovie(movie, true)
        }

        //If the total number of pages is less than the number of pages to sync, break the loop
        if (i == data.total_pages) break;
    }
    console.log("Upcoming movies synced.")

    //Send a response to the client
    res.send({ message: `${pages} pages of data synced.` });
} ));

export default router;