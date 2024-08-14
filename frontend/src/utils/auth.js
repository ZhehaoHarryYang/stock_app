const TOKEN_KEY = 'token';
const EXPIRATION_KEY = 'tokenExpiration';

export const setToken = (token, expiration) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(EXPIRATION_KEY, expiration);
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const isTokenExpired = () => {
  const expiration = localStorage.getItem(EXPIRATION_KEY);
  if (!expiration) return true;
  return new Date().getTime() > new Date(expiration).getTime();
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(EXPIRATION_KEY);
};
