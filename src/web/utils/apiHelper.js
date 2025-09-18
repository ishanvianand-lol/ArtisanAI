// src/utils/apiHelpers.js
import axios from 'axios';

export const uploadCraft = async (formData) => {
  try {
    const response = await axios.post('/api/crafts', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    // Return the data directly for easier use in your components
    return { data: response.data };
  } catch (error) {
    console.error("Error uploading craft:", error.response?.data || error.message);
    // Return a structured error object
    return { error: error.response?.data || { message: 'An unknown error occurred.' } };
  }
};

export const generateDescription = async (prompt) => {
  try {
    const response = await axios.post('/api/ai/generateDescription', { prompt });
    // Return the data directly for easier use in your components
    return { data: response.data };
  } catch (error) {
    console.error("Error generating description:", error.response?.data || error.message);
    // Return a structured error object
    return { error: error.response?.data || { message: 'An unknown error occurred.' } };
  }
};