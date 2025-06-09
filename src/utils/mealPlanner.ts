
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

  // Goal adjustments based on scientific recommendations
  const goalAdjustments = {
    lose_weight: -500, // 500 calorie deficit for 1lb/week loss
    maintain_weight: 0,
    gain_weight: 300, // 300 calorie surplus for lean gain
    build_muscle: 200 // 200 calorie surplus with high protein
  };

  return Math.round(tdee + goalAdjustments[user.goal]);
};

export const calculateMacros = (calories: number, user: User) => {
  let proteinRatio = 0.25;
  let fatRatio = 0.30;
  let carbRatio = 0.45;

  // Goal-specific macro adjustments based on sports nutrition science
  if (user.goal === 'build_muscle') {
    proteinRatio = 0.30; // Higher protein for muscle synthesis
    fatRatio = 0.25;
    carbRatio = 0.45; // Adequate carbs for training
  } else if (user.goal === 'lose_weight') {
    proteinRatio = 0.35; // Higher protein to preserve muscle
    fatRatio = 0.30;
    carbRatio = 0.35; // Lower carbs for fat loss
  } else if (user.goal === 'gain_weight') {
    proteinRatio = 0.20;
    fatRatio = 0.35; // Higher fats for calorie density
    carbRatio = 0.45;
  }

  // Activity level adjustments
  if (user.activityLevel === 'very_active' || user.activityLevel === 'extra_active') {
    carbRatio += 0.05; // More carbs for high activity
    fatRatio -= 0.05;
  }

  // Dietary preference adjustments
  if (user.dietaryPreferences.includes('keto')) {
    proteinRatio = 0.25;
    fatRatio = 0.70;
    carbRatio = 0.05;
  }

  return {
    protein: Math.round((calories * proteinRatio) / 4),
    carbs: Math.round((calories * carbRatio) / 4),
    fat: Math.round((calories * fatRatio) / 9)
  };
};

const selectGoalBasedMeals = (meals: Meal[], goal: string, count: number): Meal[] => {
  let filteredMeals = meals;
  
  // Filter meals based on goal-specific tags
  switch (goal) {
    case 'lose_weight':
      filteredMeals = meals.filter(meal => 
        meal.tags.includes('weight-loss-friendly') || 
        meal.tags.includes('low-calorie') || 
        meal.tags.includes('low-carb') ||
        meal.calories < 400
      );
      break;
    case 'build_muscle':
      filteredMeals = meals.filter(meal => 
        meal.tags.includes('muscle-building') || 
        meal.tags.includes('high-protein') ||
        meal.protein >= 20
      );
      break;
    case 'gain_weight':
      filteredMeals = meals.filter(meal => 
        meal.tags.includes('weight-gain-friendly') || 
        meal.calories > 350
      );
      break;
  }
  
  // If no goal-specific meals found, use all available meals
  if (filteredMeals.length === 0) {
    filteredMeals = meals;
  }
  
  return filteredMeals.slice(0, count);
};

export const generateMealPlan = (user: User): MealPlan[] => {
  const dailyCalories = calculateDailyCalories(user);
  const dailyMacros = calculateMacros(dailyCalories, user);
  
  // Filter meals based on dietary preferences and allergies
  const availableMeals = getDietaryFilteredMeals(mealDatabase, user.dietaryPreferences, user.allergies);
  
  // Separate meals by type
  let breakfastMeals = availableMeals.filter(meal => meal.id.startsWith('breakfast_'));
  let lunchMeals = availableMeals.filter(meal => meal.id.startsWith('lunch_'));
  let dinnerMeals = availableMeals.filter(meal => meal.id.startsWith('dinner_'));
  let snackMeals = availableMeals.filter(meal => meal.id.startsWith('snack_'));
  let juiceMeals = availableMeals.filter(meal => meal.id.startsWith('juice_'));

  // Fallback to all meals of each type if filtered arrays are empty
  if (breakfastMeals.length === 0) {
    breakfastMeals = mealDatabase.filter(meal => meal.id.startsWith('breakfast_'));
  }
  if (lunchMeals.length === 0) {
    lunchMeals = mealDatabase.filter(meal => meal.id.startsWith('lunch_'));
  }
  if (dinnerMeals.length === 0) {
    dinnerMeals = mealDatabase.filter(meal => meal.id.startsWith('dinner_'));
  }
  if (snackMeals.length === 0) {
    snackMeals = mealDatabase.filter(meal => meal.id.startsWith('snack_'));
  }
  if (juiceMeals.length === 0) {
    juiceMeals = mealDatabase.filter(meal => meal.id.startsWith('juice_'));
  }

  // Apply goal-based filtering for better meal selection
  breakfastMeals = selectGoalBasedMeals(breakfastMeals, user.goal, 7);
  lunchMeals = selectGoalBasedMeals(lunchMeals, user.goal, 7);
  dinnerMeals = selectGoalBasedMeals(dinnerMeals, user.goal, 7);

  console.log('Meal arrays length:', {
    breakfast: breakfastMeals.length,
    lunch: lunchMeals.length,
    dinner: dinnerMeals.length,
    snacks: snackMeals.length,
    juices: juiceMeals.length
  });

  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealPlan: MealPlan[] = [];

  for (let day = 1; day <= 7; day++) {
    // Select different meals for each day
    const breakfast = breakfastMeals[(day - 1) % breakfastMeals.length];
    const lunch = lunchMeals[(day - 1) % lunchMeals.length];
    const dinner = dinnerMeals[(day - 1) % dinnerMeals.length];
    const snack = snackMeals[(day - 1) % snackMeals.length];
    const juice = juiceMeals[(day - 1) % juiceMeals.length];

    // Verify all meals are defined
    if (!breakfast || !lunch || !dinner || !snack || !juice) {
      console.error('One or more meals are undefined:', { breakfast, lunch, dinner, snack, juice });
      continue;
    }

    const dayMeals = {
      breakfast,
      lunch,
      dinner,
      snacks: [snack],
      juice
    };

    const totalCalories = breakfast.calories + lunch.calories + dinner.calories + 
                         snack.calories + juice.calories;
    
    const totalMacros = {
      protein: breakfast.protein + lunch.protein + dinner.protein + snack.protein + juice.protein,
      carbs: breakfast.carbs + lunch.carbs + dinner.carbs + snack.carbs + juice.carbs,
      fat: breakfast.fat + lunch.fat + dinner.fat + snack.fat + juice.fat
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
