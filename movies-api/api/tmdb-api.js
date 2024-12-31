import fetch from 'node-fetch';

export const getUpcomingMovies = async () => {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
        );

        if (!response.ok) {
            throw new Error(response.json().message);
        }

        return await response.json();
    } catch (error) {
        throw error;
    }
};

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

export const getMoviesByGenre = (genreId) => {
  return fetch(
    `/api/movies/genre/${genreId}`,
    { headers: getAuthHeaders() }
  ).then((response) => {
    if (!response.ok) {
      return response.json().then((error) => {
        throw new Error(error.status_message || "Something went wrong");
      });
    }
    return response.json();
  })
  .catch((error) => {
    throw error;
  });
};

export const getTopRatedMovies = async () => {
  try {
      const response = await fetch(
          `https://api.themoviedb.org/3/movie/top_rated?api_key=${process.env.TMDB_KEY}&language=en-US&page=1`
      );
      const data = await response.json();
      console.log('Top Rated Movies:', data);
      return data.results; 
  } catch (error) {
      console.error('Error fetching top-rated movies:', error.message);
      throw error;
  }
};


  
  
  


