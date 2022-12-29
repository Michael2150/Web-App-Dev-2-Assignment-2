import React from "react";
import SiteHeader from './components/siteHeader'
import {createRoot} from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools'
import LoginPage from "./pages/loginPage";
import PrivateRoute from './privateRoute'
import Contexts from "./contexts/contextWrapper";
import SignupPage from "./pages/signupPage";
import AccountPage from "./pages/accountDetailsPage";
import LogoutPage from "./pages/logoutPage";

import AddMovieReviewPage from './pages/movies/addMovieReviewPage';
import MoviePage from "./pages/movies/movieDetailsPage";
import FavouriteMoviesPage from "./pages/movies/favouriteMoviesPage"; 
import MovieReviewPage from "./pages/movies/movieReviewPage";
import UpcomingMoviesPage from "./pages/movies/upcomingMoviesPage";
import MoviesListPage from "./pages/movies/moviesListPage";

import AddShowReviewPage from './pages/shows/addShowReviewPage';
import ShowPage from "./pages/shows/showDetailsPage";
import FavouriteShowsPage from "./pages/shows/favouriteShowPage";
import ShowReviewPage from "./pages/shows/showReviewPage";
import UpcomingShowsPage from "./pages/shows/upcomingShowsPage";
import ShowsListPage from "./pages/shows/showListPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <Contexts>
          <SiteHeader />
          <Routes>
            <Route path="/" element={<PrivateRoute> <HomePage/> </PrivateRoute>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/sign-up" element={<SignupPage/>} />
            <Route path="/account" element={<PrivateRoute> <AccountPage/> </PrivateRoute>} />
            <Route path="/logout" element={<LogoutPage/>}/>
            
            {/* Movies Section */}
            <Route path="/movies" element={<PrivateRoute> <Navigate to="/movies/1" /> </PrivateRoute>} />
            <Route path="/movies/:page" element={<PrivateRoute> <MoviesListPage/> </PrivateRoute>} />
            <Route path="/movie/:id" element={<PrivateRoute> <MoviePage/> </PrivateRoute>} />
            <Route exact path="/movies/favourites" element={<PrivateRoute> <FavouriteMoviesPage/> </PrivateRoute>} />
            <Route path="/movies/upcoming" element={<PrivateRoute> <Navigate to="movies/upcoming/1" /> </PrivateRoute>} />
            <Route path="/movies/upcoming/:page" element={<PrivateRoute> <UpcomingMoviesPage/> </PrivateRoute>} />
            <Route path="movies/reviews/form" element={<PrivateRoute> <AddMovieReviewPage/> </PrivateRoute>} />
            <Route path="movies/reviews/:id" element={<PrivateRoute> <MovieReviewPage/> </PrivateRoute>} />

            {/* Shows Section */}
            <Route path="/shows" element={<PrivateRoute> <Navigate to="/shows/1" /> </PrivateRoute>} />
            <Route path="/shows/:page" element={<PrivateRoute> <ShowsListPage/> </PrivateRoute>} />
            <Route path="/show/:id" element={<PrivateRoute> <ShowPage/> </PrivateRoute>} />
            <Route exact path="/shows/favourites" element={<PrivateRoute> <FavouriteShowsPage/> </PrivateRoute>} />
            <Route path="/shows/upcoming" element={<PrivateRoute> <Navigate to="shows/upcoming/1" /> </PrivateRoute>} />
            <Route path="/shows/upcoming/:page" element={<PrivateRoute> <UpcomingShowsPage/> </PrivateRoute>} />
            <Route path="shows/reviews/form" element={<PrivateRoute> <AddShowReviewPage/> </PrivateRoute>} />
            <Route path="shows/reviews/:id" element={<PrivateRoute> <ShowReviewPage/> </PrivateRoute>} />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
      </Contexts>
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot( document.getElementById("root") )
rootElement.render(<App /> );