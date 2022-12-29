import React, {useContext} from "react";
import { getUpcomingShows } from "../../api/tmdb-api";
import PageTemplate from '../../components/shows/templateShowListPage';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/spinner';
import { MoviesContext } from "../../contexts/moviesContext";
import AddToFavouritesIcon from '../../components/cardIcons/addToFavourites'
import RemoveFromFavourites from "../../components/cardIcons/removeFromFavourites";
import { useNavigate } from "react-router-dom";

const UpcomingShowsPage = (props) => {
  const { page } = useParams();
  const { data, error, isLoading, isError }  = useQuery(['upcoming_shows', page], getUpcomingShows)
  const {favourites: showIds } = useContext(MoviesContext);
  const navigate = useNavigate();

  if (isLoading) {
    return <Spinner />
  }

  if (isError) {
    return <h1>{error.message}</h1>
  }  

  const shows = data.results;
    return (
      <PageTemplate
        title="Upcoming Shows"
        shows={shows}
        action={(show) => {
          return <>
              {showIds.includes(show.id) ? (
                <RemoveFromFavourites show={show} />
              ) : (
                <AddToFavouritesIcon show={show} />
              )}
        </>
        }}
        page_data={
          {
            page: page,
            totalPages: data.total_pages,
            onPageChange: (p) => {
              navigate(`/shows/upcoming/${p}`);
            }
          }
        }
        />
    );
};
export default UpcomingShowsPage;