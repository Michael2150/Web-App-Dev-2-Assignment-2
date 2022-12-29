import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";

const AddToFavouritesIcon = ({ movie, show }) => {
  const context = useContext(MoviesContext);

  const handleAddToFavourites = (e) => {
    e.preventDefault();
    if (movie){
      context.addToFavourites(movie);
    } else if (show){
      context.addShowToFavourites(show);
    }
  };

  return (
    <IconButton aria-label="add to favorites" onClick={handleAddToFavourites}>
      <FavoriteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToFavouritesIcon;