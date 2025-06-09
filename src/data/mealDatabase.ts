
import { Meal } from '@/types/user';

export const mealDatabase: Meal[] = [
  // 7 Breakfast meals
  {
    id: 'breakfast_1',
    name: 'Greek Yogurt Parfait',
    description: 'Creamy Greek yogurt layered with fresh berries and granola',
    calories: 320,
    protein: 20,
    carbs: 35,
    fat: 8,
    ingredients: ['Greek yogurt', 'Mixed berries', 'Granola', 'Honey'],
    instructions: ['Layer yogurt in bowl', 'Add berries', 'Top with granola', 'Drizzle honey'],
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    tags: ['vegetarian', 'high-protein', 'quick', 'weight-loss-friendly']
  },
  {
    id: 'breakfast_2',
    name: 'Scrambled Eggs with Avocado Toast',
    description: 'Protein-rich scrambled eggs with whole grain toast and avocado',
    calories: 420,
    protein: 22,
    carbs: 28,
    fat: 25,
    ingredients: ['Eggs', 'Whole grain bread', 'Avocado', 'Olive oil', 'Salt', 'Pepper'],
    instructions: ['Scramble eggs', 'Toast bread', 'Mash avocado', 'Assemble and season'],
    prepTime: 10,
    cookTime: 5,
    servings: 1,
    tags: ['non-vegetarian', 'high-protein', 'muscle-building', 'healthy-fats']
  },
  {
    id: 'breakfast_3',
    name: 'Oatmeal with Banana and Nuts',
    description: 'Steel-cut oats with sliced banana, walnuts, and cinnamon',
    calories: 380,
    protein: 12,
    carbs: 58,
    fat: 12,
    ingredients: ['Steel-cut oats', 'Banana', 'Walnuts', 'Cinnamon', 'Almond milk'],
    instructions: ['Cook oats', 'Slice banana', 'Add nuts and cinnamon', 'Serve warm'],
    prepTime: 5,
    cookTime: 15,
    servings: 1,
    tags: ['vegan', 'fiber-rich', 'energy-boosting', 'weight-gain-friendly']
  },
  {
    id: 'breakfast_4',
    name: 'Protein Smoothie Bowl',
    description: 'Thick protein smoothie topped with granola and fresh fruits',
    calories: 450,
    protein: 28,
    carbs: 42,
    fat: 18,
    ingredients: ['Protein powder', 'Banana', 'Berries', 'Spinach', 'Almond butter', 'Granola'],
    instructions: ['Blend smoothie ingredients', 'Pour into bowl', 'Add toppings'],
    prepTime: 8,
    cookTime: 0,
    servings: 1,
    tags: ['high-protein', 'muscle-building', 'nutrient-dense', 'post-workout']
  },
  {
    id: 'breakfast_5',
    name: 'Chicken Sausage and Veggie Scramble',
    description: 'Lean chicken sausage with scrambled eggs and vegetables',
    calories: 380,
    protein: 28,
    carbs: 12,
    fat: 24,
    ingredients: ['Chicken sausage', 'Eggs', 'Bell peppers', 'Spinach', 'Onions', 'Olive oil'],
    instructions: ['Cook sausage', 'Sauté vegetables', 'Scramble eggs', 'Combine all'],
    prepTime: 12,
    cookTime: 10,
    servings: 1,
    tags: ['non-vegetarian', 'keto-friendly', 'high-protein', 'low-carb']
  },
  {
    id: 'breakfast_6',
    name: 'Quinoa Breakfast Bowl',
    description: 'Quinoa porridge with almond milk, fruits, and seeds',
    calories: 350,
    protein: 14,
    carbs: 55,
    fat: 10,
    ingredients: ['Quinoa', 'Almond milk', 'Apple', 'Chia seeds', 'Maple syrup', 'Almonds'],
    instructions: ['Cook quinoa in almond milk', 'Add diced apple', 'Top with seeds and nuts'],
    prepTime: 8,
    cookTime: 18,
    servings: 1,
    tags: ['vegan', 'gluten-free', 'complete-protein', 'fiber-rich']
  },
  {
    id: 'breakfast_7',
    name: 'Smoked Salmon Bagel',
    description: 'Whole grain bagel with cream cheese, smoked salmon, and capers',
    calories: 480,
    protein: 24,
    carbs: 48,
    fat: 22,
    ingredients: ['Whole grain bagel', 'Cream cheese', 'Smoked salmon', 'Capers', 'Red onion', 'Dill'],
    instructions: ['Toast bagel', 'Spread cream cheese', 'Add salmon and toppings'],
    prepTime: 5,
    cookTime: 2,
    servings: 1,
    tags: ['non-vegetarian', 'omega-3', 'gourmet', 'weight-gain-friendly']
  },

  // 7 Lunch meals
  {
    id: 'lunch_1',
    name: 'Grilled Chicken Quinoa Bowl',
    description: 'Grilled chicken breast with quinoa, roasted vegetables, and tahini',
    calories: 520,
    protein: 42,
    carbs: 45,
    fat: 18,
    ingredients: ['Chicken breast', 'Quinoa', 'Sweet potato', 'Broccoli', 'Tahini', 'Lemon'],
    instructions: ['Grill chicken', 'Cook quinoa', 'Roast vegetables', 'Assemble with dressing'],
    prepTime: 15,
    cookTime: 25,
    servings: 1,
    tags: ['non-vegetarian', 'high-protein', 'muscle-building', 'complete-meal']
  },
  {
    id: 'lunch_2',
    name: 'Mediterranean Lentil Salad',
    description: 'Protein-rich lentils with cucumber, tomatoes, and feta cheese',
    calories: 420,
    protein: 18,
    carbs: 52,
    fat: 14,
    ingredients: ['Green lentils', 'Cucumber', 'Cherry tomatoes', 'Feta cheese', 'Olive oil', 'Herbs'],
    instructions: ['Cook lentils', 'Chop vegetables', 'Crumble feta', 'Toss with dressing'],
    prepTime: 10,
    cookTime: 20,
    servings: 1,
    tags: ['vegetarian', 'mediterranean', 'fiber-rich', 'heart-healthy']
  },
  {
    id: 'lunch_3',
    name: 'Beef and Vegetable Stir-fry',
    description: 'Lean beef strips with mixed vegetables in Asian sauce',
    calories: 480,
    protein: 35,
    carbs: 32,
    fat: 22,
    ingredients: ['Lean beef', 'Bell peppers', 'Broccoli', 'Carrots', 'Brown rice', 'Soy sauce', 'Ginger'],
    instructions: ['Slice beef', 'Stir-fry beef and vegetables', 'Serve over rice'],
    prepTime: 15,
    cookTime: 12,
    servings: 1,
    tags: ['non-vegetarian', 'high-protein', 'iron-rich', 'asian-inspired']
  },
  {
    id: 'lunch_4',
    name: 'Chickpea and Spinach Curry',
    description: 'Spiced chickpeas with spinach in coconut milk sauce',
    calories: 390,
    protein: 16,
    carbs: 58,
    fat: 12,
    ingredients: ['Chickpeas', 'Spinach', 'Coconut milk', 'Onions', 'Garlic', 'Curry spices', 'Brown rice'],
    instructions: ['Sauté onions and spices', 'Add chickpeas and coconut milk', 'Stir in spinach'],
    prepTime: 10,
    cookTime: 20,
    servings: 1,
    tags: ['vegan', 'indian-inspired', 'fiber-rich', 'anti-inflammatory']
  },
  {
    id: 'lunch_5',
    name: 'Salmon Poke Bowl',
    description: 'Fresh salmon cubes with vegetables and avocado over rice',
    calories: 550,
    protein: 38,
    carbs: 42,
    fat: 25,
    ingredients: ['Fresh salmon', 'Brown rice', 'Avocado', 'Cucumber', 'Edamame', 'Sesame oil', 'Nori'],
    instructions: ['Cube salmon', 'Prepare rice', 'Slice vegetables', 'Assemble bowl'],
    prepTime: 20,
    cookTime: 15,
    servings: 1,
    tags: ['non-vegetarian', 'omega-3', 'fresh', 'japanese-inspired']
  },
  {
    id: 'lunch_6',
    name: 'Turkey and Hummus Wrap',
    description: 'Whole wheat wrap with turkey, hummus, and fresh vegetables',
    calories: 450,
    protein: 28,
    carbs: 38,
    fat: 20,
    ingredients: ['Whole wheat tortilla', 'Turkey breast', 'Hummus', 'Lettuce', 'Tomato', 'Cucumber', 'Red onion'],
    instructions: ['Spread hummus on wrap', 'Add turkey and vegetables', 'Roll tightly'],
    prepTime: 8,
    cookTime: 0,
    servings: 1,
    tags: ['non-vegetarian', 'quick', 'portable', 'balanced']
  },
  {
    id: 'lunch_7',
    name: 'Vegetarian Buddha Bowl',
    description: 'Rainbow bowl with quinoa, roasted vegetables, and tahini dressing',
    calories: 480,
    protein: 18,
    carbs: 65,
    fat: 16,
    ingredients: ['Quinoa', 'Sweet potato', 'Beets', 'Chickpeas', 'Kale', 'Tahini', 'Lemon'],
    instructions: ['Cook quinoa', 'Roast vegetables', 'Massage kale', 'Assemble with dressing'],
    prepTime: 15,
    cookTime: 30,
    servings: 1,
    tags: ['vegan', 'colorful', 'nutrient-dense', 'antioxidant-rich']
  },

  // 7 Dinner meals
  {
    id: 'dinner_1',
    name: 'Baked Salmon with Sweet Potato',
    description: 'Herb-crusted salmon with roasted sweet potato and asparagus',
    calories: 580,
    protein: 45,
    carbs: 35,
    fat: 28,
    ingredients: ['Salmon fillet', 'Sweet potato', 'Asparagus', 'Olive oil', 'Herbs', 'Lemon'],
    instructions: ['Season salmon', 'Roast sweet potato', 'Steam asparagus', 'Bake salmon'],
    prepTime: 15,
    cookTime: 25,
    servings: 1,
    tags: ['non-vegetarian', 'omega-3', 'heart-healthy', 'anti-inflammatory']
  },
  {
    id: 'dinner_2',
    name: 'Grilled Chicken with Quinoa',
    description: 'Marinated grilled chicken with quinoa pilaf and green beans',
    calories: 520,
    protein: 42,
    carbs: 38,
    fat: 20,
    ingredients: ['Chicken breast', 'Quinoa', 'Green beans', 'Garlic', 'Herbs', 'Olive oil'],
    instructions: ['Marinate chicken', 'Grill chicken', 'Cook quinoa pilaf', 'Steam green beans'],
    prepTime: 20,
    cookTime: 20,
    servings: 1,
    tags: ['non-vegetarian', 'high-protein', 'muscle-building', 'lean']
  },
  {
    id: 'dinner_3',
    name: 'Vegetarian Stuffed Bell Peppers',
    description: 'Bell peppers stuffed with quinoa, black beans, and vegetables',
    calories: 420,
    protein: 16,
    carbs: 68,
    fat: 12,
    ingredients: ['Bell peppers', 'Quinoa', 'Black beans', 'Corn', 'Tomatoes', 'Cheese', 'Spices'],
    instructions: ['Hollow peppers', 'Cook quinoa mixture', 'Stuff peppers', 'Bake until tender'],
    prepTime: 20,
    cookTime: 35,
    servings: 1,
    tags: ['vegetarian', 'fiber-rich', 'colorful', 'comfort-food']
  },
  {
    id: 'dinner_4',
    name: 'Lean Beef Steak with Vegetables',
    description: 'Grilled sirloin steak with roasted Brussels sprouts and cauliflower',
    calories: 480,
    protein: 40,
    carbs: 18,
    fat: 28,
    ingredients: ['Sirloin steak', 'Brussels sprouts', 'Cauliflower', 'Garlic', 'Rosemary', 'Olive oil'],
    instructions: ['Season steak', 'Roast vegetables', 'Grill steak to preference'],
    prepTime: 15,
    cookTime: 20,
    servings: 1,
    tags: ['non-vegetarian', 'keto-friendly', 'high-protein', 'iron-rich']
  },
  {
    id: 'dinner_5',
    name: 'Baked Cod with Wild Rice',
    description: 'Herb-baked cod with wild rice pilaf and steamed broccoli',
    calories: 450,
    protein: 38,
    carbs: 45,
    fat: 12,
    ingredients: ['Cod fillet', 'Wild rice', 'Broccoli', 'Herbs', 'Lemon', 'Vegetable broth'],
    instructions: ['Season cod', 'Cook wild rice', 'Steam broccoli', 'Bake cod'],
    prepTime: 15,
    cookTime: 30,
    servings: 1,
    tags: ['non-vegetarian', 'lean-protein', 'weight-loss-friendly', 'low-fat']
  },
  {
    id: 'dinner_6',
    name: 'Tofu and Vegetable Curry',
    description: 'Coconut curry with tofu, mixed vegetables, and brown rice',
    calories: 460,
    protein: 22,
    carbs: 55,
    fat: 18,
    ingredients: ['Firm tofu', 'Coconut milk', 'Mixed vegetables', 'Curry paste', 'Brown rice', 'Lime'],
    instructions: ['Press and cube tofu', 'Sauté vegetables', 'Add coconut milk and curry paste', 'Simmer'],
    prepTime: 15,
    cookTime: 25,
    servings: 1,
    tags: ['vegan', 'thai-inspired', 'plant-protein', 'warming']
  },
  {
    id: 'dinner_7',
    name: 'Turkey Meatballs with Zucchini Noodles',
    description: 'Lean turkey meatballs with spiralized zucchini and marinara',
    calories: 380,
    protein: 32,
    carbs: 22,
    fat: 18,
    ingredients: ['Ground turkey', 'Zucchini', 'Marinara sauce', 'Herbs', 'Parmesan', 'Olive oil'],
    instructions: ['Form meatballs', 'Bake meatballs', 'Spiralize zucchini', 'Combine with sauce'],
    prepTime: 20,
    cookTime: 25,
    servings: 1,
    tags: ['non-vegetarian', 'low-carb', 'weight-loss-friendly', 'italian-inspired']
  },

  // 7 Snacks
  {
    id: 'snack_1',
    name: 'Apple with Almond Butter',
    description: 'Crisp apple slices with natural almond butter',
    calories: 220,
    protein: 6,
    carbs: 25,
    fat: 12,
    ingredients: ['Apple', 'Almond butter'],
    instructions: ['Slice apple', 'Serve with almond butter'],
    prepTime: 3,
    cookTime: 0,
    servings: 1,
    tags: ['natural', 'portable', 'satisfying', 'healthy-fats']
  },
  {
    id: 'snack_2',
    name: 'Greek Yogurt with Berries',
    description: 'High-protein Greek yogurt topped with mixed berries',
    calories: 180,
    protein: 15,
    carbs: 20,
    fat: 4,
    ingredients: ['Greek yogurt', 'Mixed berries', 'Honey'],
    instructions: ['Add berries to yogurt', 'Drizzle with honey'],
    prepTime: 2,
    cookTime: 0,
    servings: 1,
    tags: ['vegetarian', 'high-protein', 'probiotic', 'antioxidant-rich']
  },
  {
    id: 'snack_3',
    name: 'Hard-Boiled Eggs with Whole Grain Crackers',
    description: 'Protein-rich hard-boiled eggs with fiber-rich crackers',
    calories: 200,
    protein: 14,
    carbs: 15,
    fat: 10,
    ingredients: ['Hard-boiled eggs', 'Whole grain crackers', 'Salt', 'Pepper'],
    instructions: ['Peel eggs', 'Serve with crackers'],
    prepTime: 2,
    cookTime: 0,
    servings: 1,
    tags: ['non-vegetarian', 'high-protein', 'portable', 'filling']
  },
  {
    id: 'snack_4',
    name: 'Hummus with Vegetable Sticks',
    description: 'Creamy hummus with colorful vegetable sticks',
    calories: 160,
    protein: 6,
    carbs: 18,
    fat: 8,
    ingredients: ['Hummus', 'Carrots', 'Celery', 'Bell peppers', 'Cucumber'],
    instructions: ['Cut vegetables into sticks', 'Serve with hummus'],
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    tags: ['vegan', 'fiber-rich', 'colorful', 'low-calorie']
  },
  {
    id: 'snack_5',
    name: 'Mixed Nuts and Seeds',
    description: 'Energy-dense mix of almonds, walnuts, and pumpkin seeds',
    calories: 200,
    protein: 7,
    carbs: 8,
    fat: 18,
    ingredients: ['Almonds', 'Walnuts', 'Pumpkin seeds', 'Sunflower seeds'],
    instructions: ['Mix all nuts and seeds', 'Store in airtight container'],
    prepTime: 2,
    cookTime: 0,
    servings: 1,
    tags: ['vegan', 'healthy-fats', 'energy', 'portable']
  },
  {
    id: 'snack_6',
    name: 'Cottage Cheese with Pineapple',
    description: 'High-protein cottage cheese with sweet pineapple chunks',
    calories: 150,
    protein: 14,
    carbs: 18,
    fat: 2,
    ingredients: ['Cottage cheese', 'Fresh pineapple', 'Cinnamon'],
    instructions: ['Add pineapple to cottage cheese', 'Sprinkle with cinnamon'],
    prepTime: 3,
    cookTime: 0,
    servings: 1,
    tags: ['vegetarian', 'high-protein', 'low-fat', 'refreshing']
  },
  {
    id: 'snack_7',
    name: 'Turkey Roll-ups',
    description: 'Lean turkey slices rolled with cucumber and cream cheese',
    calories: 180,
    protein: 18,
    carbs: 4,
    fat: 10,
    ingredients: ['Turkey slices', 'Cucumber', 'Cream cheese', 'Herbs'],
    instructions: ['Spread cream cheese on turkey', 'Add cucumber', 'Roll up'],
    prepTime: 5,
    cookTime: 0,
    servings: 1,
    tags: ['non-vegetarian', 'keto-friendly', 'high-protein', 'low-carb']
  },

  // 7 Juices
  {
    id: 'juice_1',
    name: 'Green Detox Juice',
    description: 'Nutrient-packed green juice with spinach, apple, and lemon',
    calories: 120,
    protein: 3,
    carbs: 28,
    fat: 1,
    ingredients: ['Spinach', 'Green apple', 'Cucumber', 'Lemon', 'Ginger'],
    instructions: ['Wash all ingredients', 'Juice in order', 'Stir and serve immediately'],
    prepTime: 10,
    cookTime: 0,
    servings: 1,
    tags: ['vegan', 'detox', 'vitamin-rich', 'alkalizing']
  },
  {
    id: 'juice_2',
    name: 'Carrot Ginger Juice',
    description: 'Sweet carrot juice with warming ginger and orange',
    calories: 110,
    protein: 2,
    carbs: 26,
    fat: 0,
    ingredients: ['Carrots', 'Fresh ginger', 'Orange', 'Turmeric'],
    instructions: ['Peel carrots and ginger', 'Juice all ingredients', 'Mix well'],
    prepTime: 8,
    cookTime: 0,
    servings: 1,
    tags: ['vegan', 'anti-inflammatory', 'immune-boosting', 'beta-carotene']
  },
  {
    id: 'juice_3',
    name: 'Beet and Berry Juice',
    description: 'Antioxidant-rich beetroot and berry juice blend',
    calories: 130,
    protein: 3,
    carbs: 30,
    fat: 1,
    ingredients: ['Beetroot', 'Mixed berries', 'Apple', 'Lime'],
    instructions: ['Wash and prep ingredients', 'Juice beets and apple', 'Blend with berries'],
    prepTime: 12,
    cookTime: 0,
    servings: 1,
    tags: ['vegan', 'antioxidant-rich', 'heart-healthy', 'nitrate-rich']
  },
  {
    id: 'juice_4',
    name: 'Celery and Cucumber Juice',
    description: 'Hydrating and alkalizing celery cucumber blend',
    calories: 60,
    protein: 2,
    carbs: 14,
    fat: 0,
    ingredients: ['Celery stalks', 'Cucumber', 'Green apple', 'Mint'],
    instructions: ['Wash vegetables', 'Juice all ingredients', 'Add mint for freshness'],
    prepTime: 8,
    cookTime: 0,
    servings: 1,
    tags: ['vegan', 'hydrating', 'low-calorie', 'alkalizing']
  },
  {
    id: 'juice_5',
    name: 'Pineapple Turmeric Juice',
    description: 'Tropical pineapple juice with anti-inflammatory turmeric',
    calories: 140,
    protein: 1,
    carbs: 35,
    fat: 0,
    ingredients: ['Fresh pineapple', 'Turmeric root', 'Lime', 'Black pepper'],
    instructions: ['Core pineapple', 'Juice with turmeric', 'Add lime and pepper'],
    prepTime: 10,
    cookTime: 0,
    servings: 1,
    tags: ['vegan', 'tropical', 'anti-inflammatory', 'vitamin-c']
  },
  {
    id: 'juice_6',
    name: 'Watermelon Mint Juice',
    description: 'Refreshing watermelon juice with cooling mint',
    calories: 90,
    protein: 2,
    carbs: 22,
    fat: 0,
    ingredients: ['Watermelon', 'Fresh mint', 'Lime', 'Sea salt'],
    instructions: ['Remove watermelon seeds', 'Juice with mint', 'Add lime and pinch of salt'],
    prepTime: 8,
    cookTime: 0,
    servings: 1,
    tags: ['vegan', 'hydrating', 'electrolyte', 'summer-drink']
  },
  {
    id: 'juice_7',
    name: 'Pomegranate Cherry Juice',
    description: 'Antioxidant powerhouse with pomegranate and tart cherries',
    calories: 150,
    protein: 2,
    carbs: 37,
    fat: 1,
    ingredients: ['Pomegranate seeds', 'Tart cherries', 'Apple', 'Lemon'],
    instructions: ['Extract pomegranate seeds', 'Juice with cherries and apple', 'Add lemon'],
    prepTime: 15,
    cookTime: 0,
    servings: 1,
    tags: ['vegan', 'antioxidant-rich', 'anti-inflammatory', 'recovery-drink']
  }
];

export const getDietaryFilteredMeals = (meals: Meal[], dietaryPreferences: string[], allergies: string[]): Meal[] => {
  return meals.filter(meal => {
    // Check dietary preferences
    const meetsDietaryReqs = dietaryPreferences.length === 0 || dietaryPreferences.some(pref => {
      switch (pref) {
        case 'vegetarian':
          return meal.tags.includes('vegetarian') || meal.tags.includes('vegan');
        case 'non-vegetarian':
          return meal.tags.includes('non-vegetarian');
        case 'vegan':
          return meal.tags.includes('vegan');
        case 'keto':
          return meal.tags.includes('keto-friendly') || meal.carbs <= 20;
        case 'paleo':
          return meal.tags.includes('paleo-friendly');
        case 'gluten-free':
          return meal.tags.includes('gluten-free');
        default:
          return true;
      }
    });

    // Check allergies (simplified - in real app would be more comprehensive)
    const hasAllergies = allergies.some(allergy => 
      meal.ingredients.some(ingredient => 
        ingredient.toLowerCase().includes(allergy.toLowerCase())
      )
    );

    return meetsDietaryReqs && !hasAllergies;
  });
};
