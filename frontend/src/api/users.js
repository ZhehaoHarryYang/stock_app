import axios from 'axios';

const BASE_URL = 'stock-app-env.eba-nzdp58fi.us-east-1.elasticbeanstalk.com' || 'http://192.168.3.42:8000/api';

export const createAccount = async (userName, email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/create-account`, {
      userName,
      email,
      password
    });
    
    // Return the response data if the request is successful
    return response.data;
  } catch (error) {
    // Handle errors based on their type
    if (error.response) {
      // Server responded with a status other than 2xx
      throw new Error(error.response.data.message || 'Server error');
    } else if (error.request) {
      // No response was received
      throw new Error('No response received from server');
    } else {
      // Something happened while setting up the request
      throw new Error(error.message || 'Unknown error');
    }
  }
};


export const loginUser = async (userName, password) => {
  try {
      const response = await axios.post(`${BASE_URL}/login`, { userName, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      return token;
  } catch (error) {
      throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const fetchUserAccount = async (userName) => {
  try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${BASE_URL}/user-account/${userName}`, {
          headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
  } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch protected data');
  }
};

export const updatePassword = async (userName, currentPassword, newPassword) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${BASE_URL}/user-account/${userName}/password`, {
      currentPassword,
      newPassword
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update password');
  }
};

export const updateUserInfo = async (userName, email) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.put(`${BASE_URL}/user-account/${userName}/email`, {
      email
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;

  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update email');
  }
};

export const deleteUser = async (userName, password) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios({
      method: 'DELETE',
      url: `${BASE_URL}/delete-account/${userName}`,
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      data: { password } // Send password in the request body
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete user');
  }
};