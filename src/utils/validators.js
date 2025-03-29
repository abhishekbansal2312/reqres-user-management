/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
  if (!email) return false;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate required field
 * @param {string} value - Field value
 * @returns {boolean} True if valid
 */
export const isRequired = (value) => {
  if (value === undefined || value === null) return false;
  return value.toString().trim().length > 0;
};

/**
 * Validate minimum length
 * @param {string} value - Field value
 * @param {number} minLength - Minimum length
 * @returns {boolean} True if valid
 */
export const minLength = (value, min) => {
  if (!value) return false;
  return value.length >= min;
};

/**
 * Validate maximum length
 * @param {string} value - Field value
 * @param {number} maxLength - Maximum length
 * @returns {boolean} True if valid
 */
export const maxLength = (value, max) => {
  if (!value) return true;
  return value.length <= max;
};

/**
 * Validate form fields
 * @param {Object} fields - Form fields
 * @param {Object} validations - Validation rules
 * @returns {Object} Validation errors
 */
export const validateForm = (fields, validations) => {
  const errors = {};

  Object.keys(validations).forEach((field) => {
    const value = fields[field];
    const fieldValidations = validations[field];

    if (fieldValidations.required && !isRequired(value)) {
      errors[field] = `${field.replace("_", " ")} is required`;
    } else if (
      fieldValidations.email &&
      isRequired(value) &&
      !isValidEmail(value)
    ) {
      errors[field] = "Invalid email format";
    } else if (
      fieldValidations.minLength &&
      isRequired(value) &&
      !minLength(value, fieldValidations.minLength)
    ) {
      errors[field] = `${field.replace("_", " ")} must be at least ${
        fieldValidations.minLength
      } characters`;
    } else if (
      fieldValidations.maxLength &&
      isRequired(value) &&
      !maxLength(value, fieldValidations.maxLength)
    ) {
      errors[field] = `${field.replace("_", " ")} cannot exceed ${
        fieldValidations.maxLength
      } characters`;
    }
  });

  return errors;
};
