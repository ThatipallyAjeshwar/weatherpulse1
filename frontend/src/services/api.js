import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api';

// Weather API
export const getWeather = async (city) => {
  const response = await axios.get(`${BASE_URL}/weather?city=${city}`);
  return response.data;
};

export const getWeatherByCoords = async (lat, lon) => {
  const response = await axios.get(`${BASE_URL}/weather/coords?lat=${lat}&lon=${lon}`);
  return response.data;
};

// News API
export const getTopHeadlines = async (country = 'in') => {
  const response = await axios.get(`${BASE_URL}/news?country=${country}`);
  return response.data;
};

export const searchNews = async (keyword) => {
  const response = await axios.get(`${BASE_URL}/news/search?keyword=${keyword}`);
  return response.data;
};

// Cities API
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