import React, { createContext, useState } from "react";

export const MoviesContext = React.createContext(null);

const MoviesContextProvider = (props) => {
  const [favorites, setFavorites] = useState( [] )
  const [myReviews, setMyReviews] = useState( {} ) 
  const [watchlist, setWatchlist] = useState( [] );

  const addToFavorites = (movie) => {
    let newFavorites = [];
    if (!favorites.includes(movie.id)){
      newFavorites = [...favorites, movie.id];
    }
    else{
      newFavorites = [...favorites];
    }
    setFavorites(newFavorites)
  };
  
  const removeFromFavorites = (movie) => {
    setFavorites( favorites.filter(
      (mId) => mId !== movie.id
    ) )
  };
  
  const addReview = (movie, review) => {
    setMyReviews( {...myReviews, [movie.id]: review } )
  };

  const addMovieToWatchlist = movie => {
    setWatchlist(prevWatchlist => {
      if(!prevWatchlist.find(m => m.id === movie.id)){
        return[...prevWatchlist, movie];
      
      }else{
        return prevWatchlist
      }
    })
  }

  const removeMovieFromWatchlist = movvieId => {
    setWatchlist(prevWatchlist => prevWatchlist.filter(m => m.id !== movvieId));
  };



  return (
    <MoviesContext.Provider
      value={{
        favorites,
        addToFavorites,
        removeFromFavorites,
        addReview,
        addMovieToWatchlist,
        removeMovieFromWatchlist,
        watchlist
        
      }}
    >
      {props.children}
    </MoviesContext.Provider>
  );
};

export default MoviesContextProvider;