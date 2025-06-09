
import { User, MealPlan, Meal } from '@/types/user';
import { mealDatabase, getDietaryFilteredMeals } from '@/data/mealDatabase';

export const calculateDailyCalories = (user: User): number => {
  // BMR calculation using Mifflin-St Jeor Equation
  let bmr: number;
  if (user.gender === 'male') {
    bmr = 88.362 + (13.397 * user.weight) + (4.799 * user.height) - (5.677 * user.age);
  } else {
    bmr = 447.593 + (9.247 * user.weight) + (3.098 * user.height) - (4.330 * user.age);
  }

  // Activity level multipliers
  const activityMultipliers = {
    sedentary: 1.2,
    lightly_active: 1.375,
    moderately_active: 1.55,
    very_active: 1.725,
    extra_active: 1.9
  };

  const tdee = bmr * activityMultipliers[user.activityLevel];

  // Goal adjustments
  const goalAdjustments = {
    lose_weight: -500, // 500 calorie deficit
    maintain_weight: 0,
    gain_weight: 300, // 300 calorie surplus
    build_muscle: 200 // 200 calorie surplus
  };

  return Math.round(tdee + goalAdjustments[user.goal]);
};

export const calculateMacros = (calories: number, user: User) => {
  let proteinRatio = 0.25; // Default 25%
  let fatRatio = 0.30; // Default 30%
  let carbRatio = 0.45; // Default 45%

  // Adjust macros based on goal
  if (user.goal === 'build_muscle') {
    proteinRatio = 0.30;
    fatRatio = 0.25;
    carbRatio = 0.45;
  } else if (user.goal === 'lose_weight') {
    proteinRatio = 0.30;
    fatRatio = 0.35;
    carbRatio = 0.35;
  }

  // Adjust for keto diet
  if (user.dietaryPreferences.includes('keto')) {
    proteinRatio = 0.25;
    fatRatio = 0.70;
    carbRatio = 0.05;
  }

  return {
    protein: Math.round((calories * proteinRatio) / 4), // 4 calories per gram
    carbs: Math.round((calories * carbRatio) / 4), // 4 calories per gram
    fat: Math.round((calories * fatRatio) / 9) // 9 calories per gram
  };
};

export const generateMealPlan = (user: User): MealPlan[] => {
  const dailyCalories = calculateDailyCalories(user);
  const dailyMacros = calculateMacros(dailyCalories, user);
  
  // Filter meals based on dietary preferences and allergies
  const availableMeals = getDietaryFilteredMeals(mealDatabase, user.dietaryPreferences, user.allergies);
  
  const breakfastMeals = availableMeals.filter(meal => meal.id.startsWith('breakfast_'));
  const lunchMeals = availableMeals.filter(meal => meal.id.startsWith('lunch_'));
  const dinnerMeals = availableMeals.filter(meal => meal.id.startsWith('dinner_'));
  const snackMeals = availableMeals.filter(meal => meal.id.startsWith('snack_'));

  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  const mealPlan: MealPlan[] = [];

  for (let day = 1; day <= 7; day++) {
    // Select meals for the day (cycling through available options)
    const breakfast = breakfastMeals[(day - 1) % breakfastMeals.length];
    const lunch = lunchMeals[(day - 1) % lunchMeals.length];
    const dinner = dinnerMeals[(day - 1) % dinnerMeals.length];
    const snack1 = snackMeals[(day - 1) % snackMeals.length];
    const snack2 = snackMeals[((day - 1) + 1) % snackMeals.length];

    const dayMeals = {
      breakfast,
      lunch,
      dinner,
      snacks: [snack1, snack2]
    };

    const totalCalories = breakfast.calories + lunch.calories + dinner.calories + 
                         snack1.calories + snack2.calories;
    
    const totalMacros = {
      protein: breakfast.protein + lunch.protein + dinner.protein + snack1.protein + snack2.protein,
      carbs: breakfast.carbs + lunch.carbs + dinner.carbs + snack1.carbs + snack2.carbs,
      fat: breakfast.fat + lunch.fat + dinner.fat + snack1.fat + snack2.fat
    };

    mealPlan.push({
      day,
      dayName: dayNames[day - 1],
      meals: dayMeals,
      totalCalories,
      macros: totalMacros
    });
  }

  return mealPlan;
};
