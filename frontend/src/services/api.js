import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';
const GNEWS_KEY = 'YOUR_GNEWS_KEY'; // get free key from gnews.io

// ── Weather ──
export const getWeather = async (city) => {
  const response = await axios.get(`${BASE_URL}/weather?city=${city}`);
  return response.data;
};

export const getWeatherByCoords = async (lat, lon) => {
  const response = await axios.get(
    `${BASE_URL}/weather/coords?lat=${lat}&lon=${lon}`
  );
  return response.data;
};

// ── News (GNews API - works on localhost) ──
export const getTopHeadlines = async () => {
  const response = await axios.get(
    `https://gnews.io/api/v4/top-headlines?category=general&lang=en&country=in&max=9&apikey=${GNEWS_KEY}`
  );
  return { articles: response.data.articles };
};

export const searchNews = async (keyword) => {
  const response = await axios.get(
    `https://gnews.io/api/v4/search?q=${keyword}&lang=en&max=9&apikey=${GNEWS_KEY}`
  );
  return { articles: response.data.articles };
};

// ── Cities ──
export const getAllCities = async () => {
  const response = await axios.get(`${BASE_URL}/cities`);
  return response.data;
};

export const saveCity = async (city) => {
  const response = await axios.post(`${BASE_URL}/cities`, city);
  return response.data;
};

export const toggleFavourite = async (id) => {
  const response = await axios.put(`${BASE_URL}/cities/${id}/favourite`);
  return response.data;
};

export const deleteCity = async (id) => {
  await axios.delete(`${BASE_URL}/cities/${id}`);
};