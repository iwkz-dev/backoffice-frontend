const storage = localStorage;
const AUTH_TOKEN_KEY = 'authToken';
const CURRENT_USER_KEY = 'currentUser';

export const setAuthToken = (token) => {
  storage.setItem(AUTH_TOKEN_KEY, token);
};

export const getAuthToken = () => storage.getItem(AUTH_TOKEN_KEY);

export const setCurrentUser = (user) => {
  const userObject = JSON.stringify(user);
  storage.setItem(CURRENT_USER_KEY, userObject);
};

export const getCurrentUser = () => {
  const userObject = storage.getItem(CURRENT_USER_KEY);
  return JSON.parse(userObject);
};

export const clearAll = () => {
  storage.clear();
};
