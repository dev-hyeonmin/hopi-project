const TOKEN_KEY = import.meta.env.VITE_AUTH_TOKEN;

/**
 * Save the auth token to local storage
 * @param token
 * @param refreshToken
 */
export const saveAuthToken = (token: string, refreshToken: string) => {
  const tokenData = JSON.stringify({
    accessToken: token,
    refreshToken: refreshToken,
  });

  localStorage.setItem(TOKEN_KEY, tokenData);
  window.location.reload();
};

/**
 * Get the auth token from local storage
 */
export const getAuthToken = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) {
    return JSON.parse(token);
  }
  return null;
};

/**
 * Remove the auth token from local storage
 */
export const removeAuthToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  window.location.reload();
};
