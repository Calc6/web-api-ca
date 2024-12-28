# Assignment 2 - Web API.

Name: Calum Cullen

## Features.

A bullet-point list of the ADDITIONAL features you have implemented in the API **THAT WERE NOT IN THE LABS** (or modifications to existing features)
 
 + Top Rated endpoint 
 + Genre ENdpoint + drop down menu
 + Basic Login & Sign up
 + etc

## Setup requirements.

Run mongod + mongosh 
Run front end 
Run back end

## API Configuration

Navigate to the other folder in the root of the repository, 'movies-api'

Create a .env file with the following (substitute your own keys into each variable).

NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=your_mongo_uri
TMDB_KEY=your_tmdb_key

- You should also have Mongod and mongosh running in terminals
- Install necessary packages for the api to run 
- npm install 
- npm start

## API Design
Give an overview of your web API design, perhaps similar to the following: 

- /api/movies | GET | Gets a list of movies 
- /api/movies/{movieid} | GET | Gets a single movie 
- /api/movies/{movieid}/reviews | GET | Get all reviews for movie 
- /api/movies/{movieid}/reviews | POST | Create a new review for Movie 
- /api/movies/tmdb/genres | GET |Retrieves a list of movie genres from the TMDB API.
- /api/movies/tmdb/top-rated | GET | Retrieves a list of top-rated movies from the database or TMDB API
- /api/movies/genre/{genreId} | GET |  Fetches movies belonging to a specific genre from the TMDB API using the genreId 
- /api/users/signup | POST |Registers a new user. Requires username and password in the request body.
- /api/users/login | POST |Authenticates a user with username and password. 

## Integrating with React App

The React app was integrated with a custom Web API to handle user authentication and movie-related operations. The backend API was built using Express.js, with routes for user signup, login, and movie data retrieval. The React app was updated to make HTTP requests to these backend routes instead of the TMDB API for certain functionalities.

