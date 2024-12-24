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

export const getMoviesByGenre = (genreId) => {
    return fetch(`/api/movies/genre/${genreId}`).then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(error.message || "Something went wrong");
        });
      }
      return response.json();
    });
  };
  
  
  


