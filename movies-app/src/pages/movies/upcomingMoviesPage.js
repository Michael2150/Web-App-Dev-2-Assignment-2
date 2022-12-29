import React, {useContext} from "react";
import { getUpcomingMovies } from "../../api/tmdb-api";
import PageTemplate from '../../components/movies/templateMovieListPage';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/spinner';
import { MoviesContext } from "../../contexts/moviesContext";
import AddToFavouritesIcon from '../../components/cardIcons/addToFavourites'
import RemoveFromFavourites from "../../components/cardIcons/removeFromFavourites";
import { useNavigate } from "react-router-dom";

const UpcomingMoviesPage = (props) => {
  const { page } = useParams();
  const { data, error, isLoading, isError }  = useQuery(['upcoming_movies', page], getUpcomingMovies)
  const {favourites: movieIds } = useContext(MoviesContext);
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
        title="Upcoming Movies"
        movies={movies}
        action={(movie) => {
          return <>
              {movieIds.includes(movie.id) ? (
                <RemoveFromFavourites movie={movie} />
              ) : (
                <AddToFavouritesIcon movie={movie} />
              )}
        </>
        }}
        page_data={
          {
            page: page,
            totalPages: data.total_pages,
            onPageChange: (p) => {
              navigate(`/movies/upcoming/${p}`);
            }
          }
        }
        />
    );
};
export default UpcomingMoviesPage;