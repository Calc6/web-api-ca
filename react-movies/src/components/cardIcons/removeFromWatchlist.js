import React from 'react';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

const RemoveFromWatchlistIcon = ({ movie, onRemoveClick }) => (
  <IconButton onClick={() => onRemoveClick(movie.id)}>
    <DeleteIcon color="secondary" />
  </IconButton>
);

export default RemoveFromWatchlistIcon;