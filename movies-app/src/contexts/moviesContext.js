import React, { useState, useEffect } from "react";
import { getUserSettings, setUserSettings } from "../database/dataAccess";
import { useAuth } from "./authContext";
import { useQuery } from "react-query";
import Spinner from '../components/spinner';

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const { currentUser } = useAuth();
  const {data: user_settings, error, isLoading, isError }  = useQuery(["user_settings", currentUser? currentUser.uid : ""], getUserSettings, {cacheTime: 0, staletime: 0});
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const [favouriteShows, setFavouriteShows] = useState([]);

  useEffect(() => {
    if (user_settings) {
      setFavouriteMovies(user_settings.favourite_movies);
      setFavouriteShows(user_settings.favourite_shows);
    }
  }, [user_settings]);

  if (isLoading) {
    return <>
    <br/><br/><br/><Spinner />
    </>
  } else if (isError) {
      return <><br/><br/><br/><h1>{error.message}</h1></>
  }

  const addMovieToFavourites = (movie) => {
    let newFavourites = [...user_settings.favourite_movies];
    if (!user_settings.favourite_movies.includes(movie.id)) {
      newFavourites.push(movie.id);
    }
    user_settings.favourite_movies = newFavourites;
    setUserSettings({ user_settings, favourite_movies: newFavourites });
    setFavouriteMovies(newFavourites);
  };

  const removeMovieFromFavourites = (movie) => {
    let newFavourites = [...user_settings.favourite_movies];
    if (user_settings.favourite_movies.includes(movie)) {
      newFavourites = newFavourites.filter((m) => m !== movie);
    }
    user_settings.favourite_movies = newFavourites;
    setUserSettings({ user_settings, favourite_movies: newFavourites });
    setFavouriteMovies(newFavourites);
  };

  const addShowToFavourites = (show) => {
    let newFavourites = [...user_settings.favourite_shows];
    if (!user_settings.favourite_shows.includes(show.id)) {
      newFavourites.push(show.id);
    }
    user_settings.favourite_shows = newFavourites;
    setUserSettings({ user_settings, favourite_shows: newFavourites });
    setFavouriteShows(newFavourites);
  };

  const removeShowFromFavourites = (show) => {
    console.log("Removing show from favourites", show);
    let newFavourites = [...user_settings.favourite_shows];
    if (user_settings.favourite_shows.includes(show)) {
      newFavourites = newFavourites.filter((m) => m !== show);
    }
    user_settings.favourite_shows = newFavourites;
    setUserSettings({ user_settings, favourite_shows: newFavourites });
    setFavouriteShows(newFavourites);
    console.log("Removed show from favourites", user_settings);
  };

  const addReview = (movie, review) => {
    let newReviews = [...user_settings.reviews];
    newReviews.push({ movie_id: movie.id, review: review });
    user_settings.reviews = newReviews;
    console.log("Added review", user_settings);
    setUserSettings({ user_settings, reviews: newReviews });
  };

  return (
    <MoviesContext.Provider
      value={{
        favourites: favouriteMovies,
        addToFavourites: addMovieToFavourites,
        removeFromFavourites: removeMovieFromFavourites,
        favouriteShows,
        addShowToFavourites,
        removeShowFromFavourites,
        reviews: [],
        addReview,
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;