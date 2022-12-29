import React, { useContext } from "react";
import PageTemplate from "../../components/shows/templateShowListPage";
import { MoviesContext } from "../../contexts/moviesContext";
import { useQueries } from "react-query";
import { getShow } from "../../api/tmdb-api";
import Spinner from '../../components/spinner'
import RemoveFromFavourites from "../../components/cardIcons/removeFromFavourites";
import WriteReview from "../../components/cardIcons/writeReview";

const FavouriteShowsPage = () => {
  const {favouriteShows: showIds } = useContext(MoviesContext);
  console.log(showIds);

  // Create an array of queries and run in parallel.
  const favouriteShowQueries = useQueries(
    showIds.map((showId) => {
      return {
        queryKey: ["show", { id: showId }],
        queryFn: getShow,
      };
    })
  );
  // Check if any of the parallel queries is still loading.
  const isLoading = favouriteShowQueries.find((m) => m.isLoading === true);

  if (isLoading) {
    return <Spinner />;
  }

  const shows = favouriteShowQueries.map((q) => {
    q.data.genre_ids = q.data.genres.map(g => g.id)
    return q.data
  });

  return (
    <PageTemplate
      title="Favourite Shows"
      shows={shows}
      action={(show) => {
        return (
          <>
            <RemoveFromFavourites show={show} />
            <WriteReview show={show} />
          </>
        );
      }}
    />
  );
};

export default FavouriteShowsPage;