// src/utils/calculations.js

/**
 * Calculate daily water intake based on personal metrics
 * @param {Object} userMetrics - User's personal metrics
 * @param {number} userMetrics.age - Age in years
 * @param {string} userMetrics.sex - 'male' or 'female'
 * @param {number} userMetrics.weight - Weight in kg
 * @param {number} userMetrics.height - Height in cm
 * @returns {number} - Recommended daily water intake in ml
 */
export const calculateWaterIntake = (userMetrics) => {
  const { age, sex, weight, height } = userMetrics;

  // Base calculation based on weight
  // Approximately 30-35ml per kg of body weight
  let baseIntake = weight * 33;

  // Adjust for age - older adults may need slightly less
  if (age > 55) {
    baseIntake *= 0.9;
  }

  // Adjust for sex - generally males need more water than females due to body composition
  if (sex === "male") {
    baseIntake *= 1.1;
  }

  // Small adjustment for height - taller people typically have greater water requirements
  const heightFactor = height / 170; // 170cm as a reference height
  baseIntake *= heightFactor;

  // Round to nearest 50ml for simplicity
  return Math.round(baseIntake / 50) * 50;
};

/**
 * Calculate the percentage of daily goal achieved
 * @param {number} currentIntake - Current water intake in ml
 * @param {number} targetIntake - Target water intake in ml
 * @returns {number} - Percentage of goal achieved (0-100)
 */
export const calculatePercentage = (currentIntake, targetIntake) => {
  const percentage = (currentIntake / targetIntake) * 100;
  // Cap at 100% for visual purposes
  return Math.min(percentage, 100);
};
