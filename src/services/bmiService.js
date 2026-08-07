export function calculateBMI(heightCm, weightKg) {
  if (!heightCm || !weightKg) return null;

  const height = heightCm / 100;
  const bmi = weightKg / (height * height);

  return Number(bmi.toFixed(1));
}

export function getBMICategory(bmi) {
  if (!bmi) return "Unknown";

  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";

  return "Obese";
}