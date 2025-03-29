/* eslint-disable no-unused-vars */
/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
  if (!date) return "N/A";

  try {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (err) {
    return "Invalid Date";
  }
};

/**
 * Extract error message from API error response
 * @param {Error} error - Error object
 * @param {string} fallbackMessage - Fallback message if error can't be extracted
 * @returns {string} Error message
 */
export const getErrorMessage = (
  error,
  fallbackMessage = "An error occurred"
) => {
  if (!error) return fallbackMessage;

  if (error.response?.data?.error) {
    return error.response.data.error;
  }

  if (error.message) {
    return error.message;
  }

  return fallbackMessage;
};

/**
 * Truncate text to specified length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.substring(0, maxLength).trim()}...`;
};

/**
 * Check if token is expired
 * @param {string} token - JWT token
 * @returns {boolean} True if token is expired
 */
export const isTokenExpired = (token) => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.exp * 1000 < Date.now();
  } catch (err) {
    return true;
  }
};

/**
 * Debounce function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
