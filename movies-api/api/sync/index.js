import express from 'express';
import dotenv from 'dotenv';
import asyncHandler from 'express-async-handler';
import movieModel from '../movies/movieModel';
import tvShowModel from '../tv shows/tvShowModel';

const fetch = require('isomorphic-fetch');
const router = express.Router(); 

router.post('/', asyncHandler(async (req, res) => {
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

    // Save a tv show to the database
    const saveTvShow = async (tvShow, isUpcoming) => {
        const url = `https://api.themoviedb.org/3/tv/${tvShow.id}?api_key=${key}&language=en-US`;
        const response = await fetch(url);
        const data = await response.json();
        var tvShowDetails = data;

        //add a new "isUpcoming" property to the movie object
        tvShowDetails.isUpcoming = isUpcoming;

        //Check if the tv show's id is already in the database
        const tvShowExists = await tvShowModel.findOne({
            id: tvShowDetails.id
        });
        //If the tv show is not in the database, add it
        if (!tvShowExists) {
            tvShowModel.create(tvShowDetails);
        }
    }

    //Fetch all the tv shows from the TMDB API
    console.log(`Syncing ${pages} pages of discover tv shows from TMDB API...`)
    for (let i = 1; i <= pages; i++) {
        const url = `https://api.themoviedb.org/3/discover/tv?api_key=${key}&language=en-US&include_adult=false&include_video=false&page=${i}`
        const response = await fetch(url);
        const data = await response.json();
        const tvShows = data.results;

        //Get the details of each tv show
        for (let j = 0; j < tvShows.length; j++) {
            const tvShow = tvShows[j];
            saveTvShow(tvShow, false)
        }

        //If the total number of pages is less than the number of pages to sync, break the loop
        if (i == data.total_pages) break;
    }
    console.log("Discover tv shows synced.")

    //Fetch all the upcoming tv shows from the TMDB API
    console.log(`Syncing ${pages} pages of upcoming tv shows from TMDB API...`)
    for (let i = 1; i <= pages; i++) {
        const url = `https://api.themoviedb.org/3/tv/on_the_air?api_key=${key}&language=en-US&include_adult=false&include_video=false&page=${i}`
        const response = await fetch(url);
        const data = await response.json();
        const tvShows = data.results;

        //Get the details of each tv show
        for (let j = 0; j < tvShows.length; j++) {
            const tvShow = tvShows[j];
            saveTvShow(tvShow, true)
        }

        //If the total number of pages is less than the number of pages to sync, break the loop
        if (i == data.total_pages) break;
    }
    console.log("Upcoming tv shows synced.")

    //Send a response to the client
    res.send({ message: `${pages} pages of data synced.` });
} ));

export default router;