import React, { useContext } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CardHeader from "@mui/material/CardHeader";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CalendarIcon from "@mui/icons-material/CalendarTodayTwoTone";
import StarRateIcon from "@mui/icons-material/StarRate";
import Avatar from '@mui/material/Avatar';
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";
import img from '../../images/film-poster-placeholder.png';
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@mui/material/IconButton";
import BookmarkIcon from "@mui/icons-material/Bookmark"; 

export default function MovieCard({ movie, action = () => null }) {
  const { favorites, addToFavorites, removeFromFavorites, watchlist, addMovieToWatchlist, removeMovieFromWatchlist } = useContext(MoviesContext);

  const isFavorite = favorites.includes(movie.id);
  const isInWatchlist = watchlist.some(watchlistMovie => watchlistMovie.id === movie.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(movie);
    } else {
      addToFavorites(movie);
    }
  };

  const handleWatchlistClick = () => {
    if (isInWatchlist) {
      removeMovieFromWatchlist(movie.id);
    } else {
      addMovieToWatchlist(movie);
    }
  };

  return (
    <Card>
      <CardHeader
        avatar={
          isFavorite ? (
            <Avatar sx={{ backgroundColor: 'red' }}>
              <FavoriteIcon />
            </Avatar>
          ) : null
        }
        title={
          <Typography variant="h5" component="p">
            {movie.title}
          </Typography>
        }
      />
      <CardMedia
        sx={{ height: 500 }}
        image={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : img}
      />
      <CardContent>
        <Grid container>
          <Grid xs={6}>
            <Typography variant="h6" component="p">
              <CalendarIcon fontSize="small" />
              {movie.release_date}
            </Typography>
          </Grid>
          <Grid xs={6}>
            <Typography variant="h6" component="p">
              <StarRateIcon fontSize="small" />
              {movie.vote_average}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleFavoriteClick}>
          <FavoriteIcon color={isFavorite ? "error" : "disabled"} />
        </IconButton>
        <IconButton onClick={handleWatchlistClick}>
          <BookmarkIcon color={isInWatchlist ? "primary" : "disabled"} />
        </IconButton>
        {typeof action === 'function' ? action(movie) : null}
        <Link to={`/movies/${movie.id}`}>
          <Button variant="outlined" size="medium" color="primary">
            More Info ...
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
}
