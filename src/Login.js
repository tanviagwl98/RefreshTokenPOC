import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = 'https://api.spotify.com/v1';
const CLIENT_ID = '6f160e02d96d4703949471d901f9b904';
const CLIENT_SECRET = '379aa218a8f64e4f96ac9b1351dd4dd9';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Call the token API to get an access token and refresh token
      const response = await axios.post('/api/token', {
        grant_type: 'password',
        username,
        password,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
      });

      // Set the access token and refresh token in local storage
      const { access_token, refresh_token } = response.data;
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      // Set the access token in the Axios client instance
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;

      // Redirect the user to the home page
      window.location.href = '/home';
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Log in</button>
    </form>
  );
};

// Add an interceptor to automatically refresh the access token
apiClient.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    // If the error response status is 401 (Unauthorized) and the request
    // was not already retried, try refreshing the access token
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // Call the refresh token API to get a new access token
      const refreshResponse = await axios.post('/api/refresh_token', {
        refresh_token: localStorage.getItem('refresh_token'),
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
      });

      // Update the access token in the Axios client instance and local storage
      const { access_token } = refreshResponse.data;
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      localStorage.setItem('access_token', access_token);

      // Retry the original request with the new access token
      return apiClient(originalRequest);
    }

    // If the error response status is not 401 or the request was already retried,
    // reject the promise with the error object
    return Promise.reject(error);
  }
);

export default Login;
