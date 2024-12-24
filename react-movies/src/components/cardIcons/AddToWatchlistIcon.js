import React, { useContext } from 'react';
import IconButton from '@mui/material/IconButton';
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';
import { MoviesContext } from '../../contexts/moviesContext';

const AddToWatchlistIcon = ({ movie }) => {
  const { addMovieToWatchlist } = useContext(MoviesContext);

  return (
    <IconButton onClick={() => addMovieToWatchlist(movie)}>
      <PlaylistAddIcon color="primary" />
    </IconButton>
  );
};

export default AddToWatchlistIcon;