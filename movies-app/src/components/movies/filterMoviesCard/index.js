import React from "react";  
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import img from '../../../images/pexels-dziana-hasanbekava-5480827.jpg';
import { getMoviesGenres } from "../../../api/tmdb-api";
import { useQuery } from "react-query";
import Spinner from '../../spinner'

const formControl = 
  {
    margin: 1,
    minWidth: 220,
    backgroundColor: "rgb(255, 255, 255)"
  };

export default function FilterMoviesCard(props) {
  const { data, error, isLoading, isError } = useQuery("genres", getMoviesGenres);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }
  const genres = data.genres;
  if (genres[0].name !== "All"){
    genres.unshift({ id: "0", name: "All" });
  }

  const sortDirection = [
    { id: "asc", name: "Ascending" },
    { id: "desc", name: "Descending" },
  ];
  const sortBy = [
    { id: "popularity", name:"Popularity"}, 
    { id: "release_date", name:"Release date"},
    { id: "revenue", name:"Revenue"},
    { id: "primary_release_date", name:"Primary release date"},
    { id: "vote_average", name:"Vote average"},
    { id: "vote_count", name:"Vote count"},
  ]

  const handleChange = (e, type, value) => {
    e.preventDefault();
    props.onUserInput(type, value); // NEW
  };

  const handleTextChange = (e, props) => {
    handleChange(e, "name", e.target.value);
  };

  const handleGenreChange = (e) => {
    handleChange(e, "genre", e.target.value);
  };

  const handleSortByChange = (e) => {
    handleChange(e, "sortBy", e.target.value);
  };

  const handleSortDirectionChange = (e) => {
    handleChange(e, "sortDirection", e.target.value);
  };

  return (
    <Card 
      sx={{
        maxWidth: 345,
        backgroundColor: "rgb(204, 204, 0)"
      }} 
      variant="outlined">
      <CardContent> 
        <Typography variant="h5" component="h1">
          <SearchIcon fontSize="large" />
          Filter/Sort Movies.
        </Typography>
        <TextField
      sx={formControl}
      id="filled-search"
      label="Search field"
      type="search"
      variant="filled"
      value={props.titleFilter}
      onChange={handleTextChange}
    />
        <FormControl sx={formControl}>
          <InputLabel style={
            {margin: -7}
          } id="genre-label">Genre</InputLabel>
          <Select
            labelId="genre-label"
            id="genre-select"
            defaultValue=""
            value={props.genreFilter}
            onChange={handleGenreChange}
          >
            {genres.map((genre) => {
              return (
                <MenuItem key={genre.id} value={genre.id}>
                  {genre.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl sx={formControl}>
          <InputLabel style={
            {margin: -7}
          } id="sort-by-label">Sort By</InputLabel>
          <Select
            labelId="sort-by-label"
            id="sort-by-select"
            defaultValue="default"
            value={props.sortByFilter}
            onChange={handleSortByChange}
          >
            {sortBy.map((sort) => {
              return (
                <MenuItem key={sort.id} value={sort.id}>
                  {sort.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>

        <FormControl sx={formControl}>
          <Select
            labelId="sort-direction-label"
            id="sort-direction-select"
            defaultValue="asc"
            value={props.sortDirectionFilter}
            onChange={handleSortDirectionChange}
          >
            {sortDirection.map((sort) => {
              return (
                <MenuItem key={sort.id} value={sort.id}>
                  {sort.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
}