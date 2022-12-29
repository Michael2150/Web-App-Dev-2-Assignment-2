import React from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import FavoriteIcon from "@mui/icons-material/Favorite";

const MovieHeader = (props) => {
  const movie = props.movie;
  const navigate = useNavigate();
  
  const favouriteMovies = JSON.parse(localStorage.getItem("favourites"));
  let fav;
  favouriteMovies.forEach(element => {
    (element.id === movie.id) ? (fav = true) : (fav = false);
  });  

  return (
    <Paper 
        component="div" 
        sx={{
            display: "flex",
            justifyContent: "space-around",
            flexWrap: "wrap",
            padding: 1.5,
            margin: 0,
        }}
      >
      {
        fav ? <Avatar sx={{ backgroundColor: 'red' }}>
        <FavoriteIcon />
        </Avatar> : null 
      }

      <Typography variant="h4" component="h3">
        {movie.title}
        <a href={movie.homepage}>
          <HomeIcon color="primary" />
        </a>
        <br />
        <span sx={{ fontSize: "1.5rem" }}>{`   "${movie.tagline}"`} </span>
      </Typography>
    </Paper>
  );
};

export default MovieHeader;