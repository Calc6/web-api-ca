import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import WatchlistPage from "./pages/WatchlistPage";
import TrendingMoviesPage from "./pages/trendingPage";
import UpcomingPage from "./pages/UpcomingPage";
import MoviesByGenrePage from "./pages/MovieByGenrePage";
import TopRatedMoviesPage from "./pages/TopRatedMoviesPage";
import SignUpPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
  },
  typography: {
    button: {
      fontSize: '1.25rem', 
      fontWeight: 500,       
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            <Route path="/movies/favorites" element={<FavoriteMoviesPage />} />
            <Route path="/reviews/:id" element={ <MovieReviewPage /> } />
            <Route path="/movies/:id" element={<MoviePage />} />
            <Route path="/reviews/form" element={ <AddMovieReviewPage /> } />
            <Route path="/watchlist" element={<WatchlistPage />} />
            <Route path="/movies/genre/:genreId" element={<MoviesByGenrePage />} />
            <Route path="/movies/top-rated" element={<TopRatedMoviesPage />} />
            <Route path="/movies/trending" element={<TrendingMoviesPage />} />
            <Route path= "/movies/upcoming" element={<UpcomingPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<Navigate to="/signup" replace />} />
            <Route path="*" element={<Navigate to="/signup" replace />} />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ThemeProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"));
rootElement.render(<App />);
