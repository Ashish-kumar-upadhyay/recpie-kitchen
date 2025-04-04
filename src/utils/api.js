import axios from 'axios';

const API_BASE_URL = 'https://api.spoonacular.com';
const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;

// Debug log for API key (remove in production)
console.log('API Key status:', API_KEY ? 'Present' : 'Missing');

if (!API_KEY) {
  console.error('Spoonacular API key is missing. Please check your .env.local file.');
}

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  params: {
    apiKey: API_KEY,
  },
});

// Add request interceptor for debugging
api.interceptors.request.use(
  (config) => {
    // Debug log for requests (remove in production)
    console.log('Making request to:', config.url);
    console.log('With API key present:', !!config.params.apiKey);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 402:
          console.error('API quota exceeded. Please check your Spoonacular API plan.');
          throw new Error('Daily API quota exceeded. Please try again tomorrow.');
        case 401:
          console.error('Invalid API key. Please check your Spoonacular API key.');
          console.error('Current API key status:', !!API_KEY);
          throw new Error('Invalid API key. Please check your configuration.');
        case 429:
          console.error('Too many requests. Please wait before trying again.');
          throw new Error('Too many requests. Please try again in a few minutes.');
        default:
          console.error('API Error:', data);
          throw new Error('An error occurred while fetching recipes.');
      }
    }
    return Promise.reject(error);
  }
);

export const searchRecipes = async (query, options = {}) => {
  try {
    const response = await api.get('/recipes/complexSearch', {
      params: {
        query,
        ...options,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRecipeById = async (id) => {
  try {
    const response = await api.get(`/recipes/${id}/information`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getRandomRecipes = async (number = 6) => {
  try {
    const response = await api.get('/recipes/random', {
      params: {
        number,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default api; 