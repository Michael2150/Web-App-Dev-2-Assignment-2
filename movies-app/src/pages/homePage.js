import React, { useContext } from "react";
import { getPopularMovies, getPopularShows } from "../api/tmdb-api";
import PageTemplate from '../components/templateHomePage';
import { useQuery } from 'react-query';
import Spinner from '../components/spinner';
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites'
import RemoveFromFavourites from "../components/cardIcons/removeFromFavourites";
import WriteReview from "../components/cardIcons/writeReview";
import { MoviesContext } from "../contexts/moviesContext";

const HomePage = (props) => {
  const {favourites: movieIds, favouriteShows } = useContext(MoviesContext);
  const {data: movies_data, error: movies_error, isLoading: movies_isLoading, isError: movies_isError }  = useQuery(["PopularMovies"], getPopularMovies);
  const {data: shows_data, error: shows_error, isLoading: shows_isLoading, isError: shows_isError }  = useQuery(["PopularShows"], getPopularShows);

  if (movies_isLoading || shows_isLoading) {
    return <Spinner />
  }
  if (!movies_data || !shows_data) {
    return <Spinner />
  }
  if (movies_isError || shows_isError) {
    return <><h1>{movies_error.message}</h1><h1>{shows_error.message}</h1></>
  }  

  const shows_action = (s) => {
    
  };

  return (
    <PageTemplate
      title="Dashboard"
      popular_movies={movies_data.results}
      popular_shows={shows_data.results}
      movies_action={(movie) => {
        return (
          <>
            {movieIds.includes(movie.id) ? (
              <RemoveFromFavourites movie={movie} />
            ) : (
              <AddToFavouritesIcon movie={movie} />
            )}
            <WriteReview movie={movie} />
          </>
        );
      }}
      shows_action={(show) => {
        return (
          <>
            {favouriteShows.includes(show.id) ? (
              <RemoveFromFavourites show={show} />
            ) : (
              <AddToFavouritesIcon show={show} />
            )}
            <WriteReview show={show} />
          </>
        );
      }}
    />
  );
};
export default HomePage;