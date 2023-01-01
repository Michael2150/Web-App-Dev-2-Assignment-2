const allowedSortingCodes = ["popularity.asc","popularity.desc","release_date.asc","release_date.desc","revenue.asc","revenue.desc","primary_release_date.asc","primary_release_date.desc","vote_average.asc","vote_average.desc","vote_count.asc","vote_count.desc"]

const service_url = "http://localhost:8080";

export const getMovies = (args) => {
  var [, pagePart, sorting, genre] = args.queryKey;
  if (!sorting){
    sorting = "popularity.desc";
  }
  if (!genre){
    genre = -1;	
  }

  const url = `${service_url}/api/movies/discover?page=${pagePart}&with_genre=${genre}&sort_by=${sorting}`
  return fetch(
    url,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_LOCAL_API_KEY}`,
      },
    }
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};

export const getUpcomingMovies = (args) => {
  const [, pagePart] = args.queryKey;
  const url = `${service_url}/api/movies/upcoming?page=${pagePart}`
  return fetch(
    url,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_LOCAL_API_KEY}`,
      },
    }
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};

export const getPopularMovies = () => {
  const url = `${service_url}/api/movies/popular`
  return fetch(
    url,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_LOCAL_API_KEY}`,
      },
    }
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
}

export const getMovie = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    `${service_url}/api/movies/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_LOCAL_API_KEY}`,
      },
    }
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

export const getMoviesGenres = async () => {
  return fetch(
    `${service_url}/api/movies/genres`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_LOCAL_API_KEY}`,
      },
    }
  ).then( (response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error
 });
};

export const getMovieImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    //`https://api.themoviedb.org/3/movie/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en`
    `${service_url}/api/movies/${id}/images`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_LOCAL_API_KEY}`,
      },
    }
  ).then( (response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();

  })
  .catch((error) => {
    throw error
 });
};

export const getMovieReviews = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      return json.results;
    });
};

export const getShows = (args) => {
  var [, pagePart, sorting, genre] = args.queryKey;
  if (!sorting){
    sorting = "popularity.desc";
  }
  if (!genre){
    genre = "";
  }
  return fetch(
   //`https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-uk&page=${pagePart}&with_genres=${genre}&sort_by=${sorting}`
    `${service_url}/api/tv/discover?page=${pagePart}&with_genre=${genre}&sort_by=${sorting}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_LOCAL_API_KEY}`,
      },
    }
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};

export const getShow = (args) => {
  const [, idPart] = args.queryKey;
  const { id } = idPart;
  return fetch(
    //`https://api.themoviedb.org/3/tv/${id}?api_key=${process.env.REACT_APP_TMDB_KEY}`
    `${service_url}/api/tv/${id}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_LOCAL_API_KEY}`,
      },
    }
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }   
    return response.json();
  })
  .catch((error) => {
    throw error
  });
};

export const getShowsGenres = async () => {
  return fetch(
    "https://api.themoviedb.org/3/genre/tv/list?api_key=" + process.env.REACT_APP_TMDB_KEY + "&language=en-US"
  ).then( (response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
    throw error
  });
};

export const getShowImages = ({ queryKey }) => {
  const [, idPart] = queryKey;
  const { id } = idPart;
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}/images?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en`
  ).then( (response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    } 
    return response.json();
  })
  .catch((error) => {
    throw error
  });
};

export const getShowReviews = (id) => {
  return fetch(
    `https://api.themoviedb.org/3/tv/${id}/reviews?api_key=${process.env.REACT_APP_TMDB_KEY}`
  )
    .then((res) => res.json())
    .then((json) => {
      return json.results;
    });
};

export const getUpcomingShows = (args) => {
  const [, pagePart] = args.queryKey;
  return fetch(
    `https://api.themoviedb.org/3/tv/on_the_air?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=${pagePart}`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
};

export const getPopularShows = () => {
  return fetch(
    `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&page=1`
  ).then((response) => {
    if (!response.ok) {
      throw new Error(response.json().message);
    }
    return response.json();
  })
  .catch((error) => {
      throw error
  });
}