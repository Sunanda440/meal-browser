
import { User, MealPlan, Meal } from '@/types/user';
import { mealDatabase, getDietaryFilteredMeals } from '@/data/mealDatabase';

export const calculateDailyCalories = (user: User): number => {
  // BMR calculation using Mifflin-St Jeor Equation (widely accepted by nutrition professionals)
  let bmr: number;
  if (user.gender === 'male') {
    bmr = 88.362 + (13.397 * user.weight) + (4.799 * user.height) - (5.677 * user.age);
  } else {
    bmr = 447.593 + (9.247 * user.weight) + (3.098 * user.height) - (4.330 * user.age);
  }

  // Activity level multipliers based on research from American College of Sports Medicine
  const activityMultipliers = {
    sedentary: 1.2,           // Office job, little/no exercise
    lightly_active: 1.375,    // Light exercise 1-3 days/week
    moderately_active: 1.55,  // Moderate exercise 3-5 days/week
    very_active: 1.725,       // Hard exercise 6-7 days/week
    extra_active: 1.9         // Very hard exercise, physical job
  };

  const tdee = bmr * activityMultipliers[user.activityLevel];

  // Goal adjustments based on evidence from nutrition science
  const goalAdjustments = {
    lose_weight: -500,    // 500 cal deficit = ~1lb/week loss (safe and sustainable)
    maintain_weight: 0,   // Maintain current weight
    gain_weight: 300,     // 300 cal surplus = ~0.5lb/week gain (mostly lean mass)
    build_muscle: 200     // Small surplus with high protein for muscle synthesis
  };

  return Math.round(tdee + goalAdjustments[user.goal]);
};

export const calculateMacros = (calories: number, user: User) => {
  // Macro ratios based on scientific recommendations from ISSN, ACSM, and WHO guidelines
  let proteinRatio = 0.25;  // 25% default
  let fatRatio = 0.30;      // 30% default
  let carbRatio = 0.45;     // 45% default

  // Goal-specific macro adjustments based on sports nutrition research
  if (user.goal === 'build_muscle') {
    // Higher protein for muscle protein synthesis (1.6-2.2g/kg body weight)
    proteinRatio = 0.30;     // 30% protein
    fatRatio = 0.25;         // 25% fat
    carbRatio = 0.45;        // 45% carbs for training fuel
  } else if (user.goal === 'lose_weight') {
    // Higher protein to preserve muscle mass during caloric deficit
    proteinRatio = 0.35;     // 35% protein (muscle preservation)
    fatRatio = 0.30;         // 30% fat (hormone production)
    carbRatio = 0.35;        // 35% carbs (lower for fat loss)
  } else if (user.goal === 'gain_weight') {
    // Balanced approach with slightly higher fats for calorie density
    proteinRatio = 0.20;     // 20% protein
    fatRatio = 0.35;         // 35% fat (calorie dense)
    carbRatio = 0.45;        // 45% carbs (energy and glycogen)
  }

  // Activity level adjustments based on training demands
  if (user.activityLevel === 'very_active' || user.activityLevel === 'extra_active') {
    // Athletes need more carbs for glycogen replenishment
    carbRatio += 0.05;       // +5% carbs
    fatRatio -= 0.05;        // -5% fat
  } else if (user.activityLevel === 'sedentary') {
    // Lower carb needs for sedentary individuals
    carbRatio -= 0.05;       // -5% carbs
    proteinRatio += 0.05;    // +5% protein (better satiety)
  }

  // Special dietary considerations
  if (user.dietaryPreferences.includes('keto')) {
    // Ketogenic diet macros
    proteinRatio = 0.25;     // 25% protein
    fatRatio = 0.70;         // 70% fat
    carbRatio = 0.05;        // 5% carbs
  } else if (user.dietaryPreferences.includes('vegan')) {
    // Plant-based may need slightly higher protein due to amino acid profile
    proteinRatio += 0.02;    // +2% protein
    carbRatio -= 0.02;       // -2% carbs
  }

  // Age-related adjustments (sarcopenia prevention for older adults)
  if (user.age > 50) {
    proteinRatio += 0.03;    // +3% protein for muscle preservation
    carbRatio -= 0.03;       // -3% carbs
  }

  return {
    protein: Math.round((calories * proteinRatio) / 4),    // 4 calories per gram
    carbs: Math.round((calories * carbRatio) / 4),         // 4 calories per gram
    fat: Math.round((calories * fatRatio) / 9)             // 9 calories per gram
  };
};

// Enhanced meal selection based on scientific nutrition principles
const selectGoalBasedMeals = (meals: Meal[], goal: string, activityLevel: string, count: number): Meal[] => {
  let filteredMeals = [...meals];
  
  // Primary filtering based on goal-specific nutritional needs
  switch (goal) {
    case 'lose_weight':
      // Prioritize high-protein, lower-calorie, high-satiety foods
      filteredMeals = meals.filter(meal => 
        meal.tags.includes('weight-loss-friendly') || 
        meal.tags.includes('low-calorie') || 
        meal.tags.includes('high-protein') ||
        meal.calories < 400 ||
        (meal.protein / meal.calories) > 0.25  // High protein ratio
      );
      break;
      
    case 'build_muscle':
      // Prioritize high-protein foods for muscle protein synthesis
      filteredMeals = meals.filter(meal => 
        meal.tags.includes('muscle-building') || 
        meal.tags.includes('high-protein') ||
        meal.protein >= 20 ||
        meal.tags.includes('post-workout')
      );
      break;
      
    case 'gain_weight':
      // Prioritize calorie-dense, nutritious foods
      filteredMeals = meals.filter(meal => 
        meal.tags.includes('weight-gain-friendly') || 
        meal.calories > 350 ||
        meal.tags.includes('comfort-food') ||
        (meal.fat / meal.calories) > 0.25  // Higher calorie density
      );
      break;
      
    case 'maintain_weight':
      // Balanced approach, all meals acceptable
      filteredMeals = meals;
      break;
  }
  
  // Secondary filtering based on activity level
  if (activityLevel === 'very_active' || activityLevel === 'extra_active') {
    // Athletes need more carbs and calories
    const highCarbMeals = filteredMeals.filter(meal => 
      meal.carbs > 30 || 
      meal.tags.includes('energy-boosting') ||
      meal.tags.includes('post-workout')
    );
    if (highCarbMeals.length >= count) {
      filteredMeals = highCarbMeals;
    }
  } else if (activityLevel === 'sedentary') {
    // Sedentary individuals benefit from lower-calorie options
    const lowerCalMeals = filteredMeals.filter(meal => 
      meal.calories < 450 ||
      meal.tags.includes('weight-loss-friendly')
    );
    if (lowerCalMeals.length >= count) {
      filteredMeals = lowerCalMeals;
    }
  }
  
  // If filtered results are insufficient, fall back to original meals
  if (filteredMeals.length < count) {
    filteredMeals = meals;
  }
  
  // Randomize selection for variety while ensuring we have enough meals
  const shuffled = filteredMeals.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, Math.max(count, shuffled.length));
};

export const generateMealPlan = (user: User): MealPlan[] => {
  const dailyCalories = calculateDailyCalories(user);
  const dailyMacros = calculateMacros(dailyCalories, user);
  
  console.log('Generating meal plan for:', {
    goal: user.goal,
    activityLevel: user.activityLevel,
    dailyCalories,
    dailyMacros
  });
  
  // Filter meals based on dietary preferences and allergies
  const availableMeals = getDietaryFilteredMeals(mealDatabase, user.dietaryPreferences, user.allergies);
  
  // Separate meals by type with enhanced selection
  const mealTypes = {
    breakfast: availableMeals.filter(meal => meal.id.startsWith('breakfast_')),
    lunch: availableMeals.filter(meal => meal.id.startsWith('lunch_')),
    dinner: availableMeals.filter(meal => meal.id.startsWith('dinner_')),
    snack: availableMeals.filter(meal => meal.id.startsWith('snack_')),
    juice: availableMeals.filter(meal => meal.id.startsWith('juice_'))
  };

  // Apply intelligent meal selection for each type
  const selectedMeals = {
    breakfast: selectGoalBasedMeals(mealTypes.breakfast.length > 0 ? mealTypes.breakfast : 
      mealDatabase.filter(m => m.id.startsWith('breakfast_')), user.goal, user.activityLevel, 7),
    lunch: selectGoalBasedMeals(mealTypes.lunch.length > 0 ? mealTypes.lunch : 
      mealDatabase.filter(m => m.id.startsWith('lunch_')), user.goal, user.activityLevel, 7),
    dinner: selectGoalBasedMeals(mealTypes.dinner.length > 0 ? mealTypes.dinner : 
      mealDatabase.filter(m => m.id.startsWith('dinner_')), user.goal, user.activityLevel, 7),
    snack: selectGoalBasedMeals(mealTypes.snack.length > 0 ? mealTypes.snack : 
      mealDatabase.filter(m => m.id.startsWith('snack_')), user.goal, user.activityLevel, 8),
    juice: selectGoalBasedMeals(mealTypes.juice.length > 0 ? mealTypes.juice : 
      mealDatabase.filter(m => m.id.startsWith('juice_')), user.goal, user.activityLevel, 8)
  };

  console.log('Selected meal counts:', {
    breakfast: selectedMeals.breakfast.length,
    lunch: selectedMeals.lunch.length,
    dinner: selectedMeals.dinner.length,
    snack: selectedMeals.snack.length,
    juice: selectedMeals.juice.length
  });

  const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const mealPlan: MealPlan[] = [];

  for (let day = 1; day <= 7; day++) {
    // Select different meals for each day with rotation
    const breakfast = selectedMeals.breakfast[(day - 1) % selectedMeals.breakfast.length];
    const lunch = selectedMeals.lunch[(day - 1) % selectedMeals.lunch.length];
    const dinner = selectedMeals.dinner[(day - 1) % selectedMeals.dinner.length];
    const snack = selectedMeals.snack[(day - 1) % selectedMeals.snack.length];
    const juice = selectedMeals.juice[(day - 1) % selectedMeals.juice.length];

    // Verify all meals are defined
    if (!breakfast || !lunch || !dinner || !snack || !juice) {
      console.error('One or more meals are undefined for day', day, { breakfast, lunch, dinner, snack, juice });
      continue;
    }

    const dayMeals = {
      breakfast,
      lunch,
      dinner,
      snacks: [snack],
      juice
    };

    // Calculate daily totals
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

  console.log('Generated meal plan for', mealPlan.length, 'days');
  return mealPlan;
};
