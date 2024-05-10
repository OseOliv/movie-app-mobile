import axios from "axios";
import { apiKey } from "../constants";

// Endpoints
const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?language=pt-BR&api_key=${apiKey}`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?language=pt-BR&api_key=${apiKey}`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?language=pt-BR&api_key=${apiKey}`;
const searchMoviesEndPoint = 
  `${apiBaseUrl}/search/movie?language=pt-BR&api_key=${apiKey}`;

const movieDetailsEndPoint = (id) =>
  `${apiBaseUrl}/movie/${id}?language=pt-BR&api_key=${apiKey}`;
const movieCreditsEndPoint = (id) =>
  `${apiBaseUrl}/movie/${id}/credits?language=pt-BR&api_key=${apiKey}`;
const movieSimilarEndPoint = (id) =>
  `${apiBaseUrl}/movie/${id}/similar?language=pt-BR&api_key=${apiKey}`;
const personDetailsEndPoint = (id) =>
  `${apiBaseUrl}/person/${id}?language=pt-BR&api_key=${apiKey}`;
const personMoviesEndPoint = (id) =>
  `${apiBaseUrl}/person/${id}/movie_credits?language=pt-BR&api_key=${apiKey}`;


// https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1
// https://api.themoviedb.org/3/person/person_id/movie_credits?language=en-US

// https://api.themoviedb.org/3/person/person_id?language=en-US
// https://api.themoviedb.org/3/movie/movie_id/similar?language=en-US&page=1

export const image500 = (path) =>
  path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = (path) =>
  path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = (path) =>
  path ? `https://image.tmdb.org/t/p/w185${path}` : null;

export const fallbackMoviePoster =
  "https://media.istockphoto.com/id/1472933890/vector/no-image-vector-symbol-missing-available-icon-no-gallery-for-this-moment-placeholder.jpg?s=612x612&w=0&k=20&c=Rdn-lecwAj8ciQEccm0Ep2RX50FCuUJOaEM8qQjiLL0=";
export const fallbackPersonPoster =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeLwbewetC0_h8gdqSbnZwirj-c_AUlApotat1BvuYzooKfrAwr-CPf0CUhWauYkzGs-A&usqp=CAU";

const apiCall = async (endpoint, params) => {
  const options = {
    method: "GET",
    url: endpoint,
    params: params ? params : {},
  };
  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    console.log("error: ", error);
    return {};
  }
};

export const fetchTrendingMovies = () => {
  return apiCall(trendingMoviesEndpoint);
};
export const fetchUpcomingMovies = () => {
  return apiCall(upcomingMoviesEndpoint);
};
export const fetchTopRatedMovies = () => {
  return apiCall(topRatedMoviesEndpoint);
};

export const fetchMovieDetails = (id) => {
  return apiCall(movieDetailsEndPoint(id));
};
export const fetchCreditsDetails = (id) => {
  return apiCall(movieCreditsEndPoint(id));
};
export const fetchSimilarDetails = (id) => {
  return apiCall(movieSimilarEndPoint(id));
};

export const fetchPersonDetails = (id) => {
  return apiCall(personDetailsEndPoint(id));
};

export const fetchPersonMovies = (id) => {
  return apiCall(personMoviesEndPoint(id));
};

export const searchMovies = (params) => {
  return apiCall(searchMoviesEndPoint, params);
};
