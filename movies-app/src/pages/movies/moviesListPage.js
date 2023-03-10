import React, { useContext } from "react";
import { getMovies } from "../../api/tmdb-api";
import PageTemplate from '../../components/movies/templateMovieListPage';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/spinner';
import AddToFavouritesIcon from '../../components/cardIcons/addToFavourites'
import RemoveFromFavourites from "../../components/cardIcons/removeFromFavourites";
import WriteReview from "../../components/cardIcons/writeReview";
import { MoviesContext } from "../../contexts/moviesContext";
import { useNavigate } from "react-router-dom";

const MoviesListPage = (props) => {
  const {favourites: movieIds } = useContext(MoviesContext);
  const { page } = useParams();
  const {data, error, isLoading, isError }  = useQuery(["movies", page], getMovies);
  const navigate = useNavigate();
  
  if (isLoading) {
    return <Spinner />
  }
  
  if (isError) {
    return <h1>{error.message}</h1>
  }  
  
  const movies = data.results;

  return (
    <PageTemplate
      title="Discover Movies"
      movies={movies}
      action={(movie) => {
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
      page_data={
        {
          page: page,
          totalPages: Math.min(data.total_pages, 500),
          onPageChange: (p) => {
            navigate(`/movies/${p}`);
          }
        }
      }

    />
  );
};

export default MoviesListPage;