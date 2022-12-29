import React, { useState } from "react";
import Header from "../headerShowList";
import FilterCard from "../filterShowsCard";
import ShowList from "../showList";
import Grid from "@mui/material/Grid";
import Pagination from "../../paginator";

function ShowListPageTemplate({ shows, title, action: favourite_show_action, page_data}) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [sortByFilter, setSortByFilter] = useState("popularity");
  const [sortDirectionFilter, setSortDirectionFilter] = useState("desc");
  const [currentPage, setCurrentPage] = useState(page_data ? Number(page_data.page) : 1);
  const genreId = Number(genreFilter);
  
  const filteredShows = shows
    .filter((m) => {
      return m.name.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
    })
    .filter((m) => {
      return genreId > 0 ? m.genre_ids.includes(Number(genreFilter)) : true;
    })
    .sort((a, b) => {
      if (sortByFilter === "vote_average") {
        return sortDirectionFilter === "asc"
          ? a.vote_average - b.vote_average
          : b.vote_average - a.vote_average;
      } else if (sortByFilter === "vote_count") {
        return sortDirectionFilter === "asc"
          ? a.vote_count - b.vote_count
          : b.vote_count - a.vote_count;
      } else if (sortByFilter === "release_date") {
        return sortDirectionFilter === "asc"
          ? a.release_date - b.release_date
          : b.release_date - a.release_date;
      } else if (sortByFilter === "revenue") {
        return sortDirectionFilter === "asc"
          ? a.revenue - b.revenue
          : b.revenue - a.revenue;
      } else if (sortByFilter === "primary_release_date") {
        return sortDirectionFilter === "asc"
          ? a.primary_release_date - b.primary_release_date
          : b.primary_release_date - a.primary_release_date;
      } else {
        return sortDirectionFilter === "asc"
          ? a.popularity - b.popularity
          : b.popularity - a.popularity;
      }
    });


  const handleChange = (type, value) => {
    if (type === "name") {
      setNameFilter(value);
    } else if (type === "genre") {
      setGenreFilter(value);
    } else if (type === "page") {
      setCurrentPage(value);
      page_data.onPageChange(value);
    } else if (type === "sortBy") {
      setSortByFilter(value);
    } else if (type === "sortDirection") {
      setSortDirectionFilter(value);
    }
  };

  return (
    <>
    <Grid container sx={{ padding: '20px' }}>
      <Grid item xs={12}>
        <Header title={title} />
      </Grid>
      {
        page_data &&
        <Grid item xs={12} sx={{ padding: '20px 0' }}>
          <Pagination className="pagination-bar" currentPage={currentPage} totalCount={page_data.totalPages} pageSize={1} onPageChange={new_page => handleChange("page",new_page)}/>
        </Grid>
      }
      <Grid item container spacing={5}>
        <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            sortByFilter={sortByFilter}
            sortDirectionFilter={sortDirectionFilter}
          />
        </Grid>
        <ShowList action={favourite_show_action} shows={filteredShows}></ShowList>
      </Grid>
      {
        page_data &&
        <Grid item xs={12} sx={{ padding: '20px 0' }}>
          <Pagination className="pagination-bar" currentPage={currentPage} totalCount={page_data.totalPages} pageSize={1} onPageChange={new_page => handleChange("page",new_page)}/>
        </Grid>
      }
    </Grid>
    </>
  );
}
export default ShowListPageTemplate;