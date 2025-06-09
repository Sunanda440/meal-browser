
import { Meal } from '@/types/user';

export const mealDatabase: Meal[] = [
  // Breakfast meals
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
    tags: ['vegetarian', 'high-protein', 'quick']
  },
  {
    id: 'breakfast_2',
    name: 'Avocado Toast',
    description: 'Whole grain toast topped with mashed avocado and eggs',
    calories: 380,
    protein: 18,
    carbs: 30,
    fat: 22,
    ingredients: ['Whole grain bread', 'Avocado', 'Eggs', 'Cherry tomatoes', 'Salt', 'Pepper'],
    instructions: ['Toast bread', 'Mash avocado', 'Fry eggs', 'Assemble and season'],
    prepTime: 10,
    cookTime: 5,
    servings: 1,
    tags: ['vegetarian', 'healthy-fats', 'filling']
  },
  {
    id: 'breakfast_3',
    name: 'Protein Smoothie Bowl',
    description: 'Thick smoothie bowl topped with fruits and nuts',
    calories: 420,
    protein: 25,
    carbs: 45,
    fat: 15,
    ingredients: ['Protein powder', 'Banana', 'Berries', 'Almond milk', 'Chia seeds', 'Almonds'],
    instructions: ['Blend smoothie ingredients', 'Pour into bowl', 'Add toppings'],
    prepTime: 8,
    cookTime: 0,
    servings: 1,
    tags: ['high-protein', 'vegan-option', 'nutrient-dense']
  },
  {
    id: 'breakfast_4',
    name: 'Oatmeal with Fruits',
    description: 'Steel-cut oats with seasonal fruits and nuts',
    calories: 350,
    protein: 12,
    carbs: 55,
    fat: 10,
    ingredients: ['Steel-cut oats', 'Milk', 'Banana', 'Walnuts', 'Cinnamon'],
    instructions: ['Cook oats', 'Add milk', 'Top with fruits and nuts'],
    prepTime: 5,
    cookTime: 15,
    servings: 1,
    tags: ['whole-grain', 'fiber-rich', 'comfort-food']
  },

  // Lunch meals
  {
    id: 'lunch_1',
    name: 'Quinoa Buddha Bowl',
    description: 'Nutritious bowl with quinoa, roasted vegetables, and tahini dressing',
    calories: 480,
    protein: 18,
    carbs: 65,
    fat: 16,
    ingredients: ['Quinoa', 'Sweet potato', 'Chickpeas', 'Spinach', 'Tahini', 'Lemon'],
    instructions: ['Cook quinoa', 'Roast vegetables', 'Prepare dressing', 'Assemble bowl'],
    prepTime: 15,
    cookTime: 30,
    servings: 1,
    tags: ['vegan', 'complete-protein', 'mediterranean']
  },
  {
    id: 'lunch_2',
    name: 'Grilled Chicken Salad',
    description: 'Mixed greens with grilled chicken and balsamic vinaigrette',
    calories: 420,
    protein: 35,
    carbs: 15,
    fat: 25,
    ingredients: ['Chicken breast', 'Mixed greens', 'Cherry tomatoes', 'Cucumber', 'Olive oil', 'Balsamic vinegar'],
    instructions: ['Grill chicken', 'Prepare salad', 'Make dressing', 'Combine all ingredients'],
    prepTime: 10,
    cookTime: 15,
    servings: 1,
    tags: ['high-protein', 'low-carb', 'keto-friendly']
  },
  {
    id: 'lunch_3',
    name: 'Lentil Soup',
    description: 'Hearty red lentil soup with vegetables and spices',
    calories: 380,
    protein: 20,
    carbs: 55,
    fat: 8,
    ingredients: ['Red lentils', 'Carrots', 'Celery', 'Onion', 'Garlic', 'Vegetable broth'],
    instructions: ['Sauté vegetables', 'Add lentils and broth', 'Simmer until tender'],
    prepTime: 10,
    cookTime: 25,
    servings: 2,
    tags: ['vegan', 'high-fiber', 'budget-friendly']
  },
  {
    id: 'lunch_4',
    name: 'Turkey Wrap',
    description: 'Whole wheat wrap with turkey, vegetables, and hummus',
    calories: 450,
    protein: 28,
    carbs: 40,
    fat: 20,
    ingredients: ['Whole wheat tortilla', 'Turkey breast', 'Hummus', 'Lettuce', 'Tomato', 'Cucumber'],
    instructions: ['Spread hummus on wrap', 'Add turkey and vegetables', 'Roll tightly'],
    prepTime: 8,
    cookTime: 0,
    servings: 1,
    tags: ['quick', 'portable', 'balanced']
  },

  // Dinner meals
  {
    id: 'dinner_1',
    name: 'Baked Salmon with Vegetables',
    description: 'Omega-3 rich salmon with roasted seasonal vegetables',
    calories: 520,
    protein: 40,
    carbs: 25,
    fat: 28,
    ingredients: ['Salmon fillet', 'Broccoli', 'Sweet potato', 'Olive oil', 'Lemon', 'Herbs'],
    instructions: ['Season salmon', 'Roast vegetables', 'Bake salmon', 'Serve together'],
    prepTime: 15,
    cookTime: 25,
    servings: 1,
    tags: ['omega-3', 'heart-healthy', 'anti-inflammatory']
  },
  {
    id: 'dinner_2',
    name: 'Vegetarian Stir-fry',
    description: 'Colorful mix of vegetables with tofu in savory sauce',
    calories: 440,
    protein: 22,
    carbs: 45,
    fat: 18,
    ingredients: ['Tofu', 'Bell peppers', 'Broccoli', 'Carrots', 'Soy sauce', 'Ginger', 'Brown rice'],
    instructions: ['Press tofu', 'Prepare vegetables', 'Stir-fry in batches', 'Serve over rice'],
    prepTime: 20,
    cookTime: 15,
    servings: 1,
    tags: ['vegan', 'colorful', 'asian-inspired']
  },
  {
    id: 'dinner_3',
    name: 'Lean Beef with Sweet Potato',
    description: 'Grass-fed beef with roasted sweet potato and green beans',
    calories: 580,
    protein: 45,
    carbs: 35,
    fat: 25,
    ingredients: ['Lean beef', 'Sweet potato', 'Green beans', 'Garlic', 'Rosemary'],
    instructions: ['Season beef', 'Roast sweet potato', 'Steam green beans', 'Cook beef to preference'],
    prepTime: 15,
    cookTime: 30,
    servings: 1,
    tags: ['high-protein', 'iron-rich', 'paleo-friendly']
  },
  {
    id: 'dinner_4',
    name: 'Chickpea Curry',
    description: 'Spiced chickpea curry with coconut milk and vegetables',
    calories: 460,
    protein: 18,
    carbs: 65,
    fat: 15,
    ingredients: ['Chickpeas', 'Coconut milk', 'Tomatoes', 'Spinach', 'Curry spices', 'Brown rice'],
    instructions: ['Sauté spices', 'Add chickpeas and coconut milk', 'Simmer with vegetables'],
    prepTime: 15,
    cookTime: 25,
    servings: 2,
    tags: ['vegan', 'warming', 'indian-inspired']
  },

  // Snacks
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
    tags: ['natural', 'portable', 'satisfying']
  },
  {
    id: 'snack_2',
    name: 'Trail Mix',
    description: 'Mixed nuts, seeds, and dried fruits',
    calories: 180,
    protein: 5,
    carbs: 15,
    fat: 12,
    ingredients: ['Almonds', 'Walnuts', 'Pumpkin seeds', 'Dried berries'],
    instructions: ['Mix all ingredients', 'Store in airtight container'],
    prepTime: 2,
    cookTime: 0,
    servings: 1,
    tags: ['energy', 'portable', 'healthy-fats']
  }
];

export const getDietaryFilteredMeals = (meals: Meal[], dietaryPreferences: string[], allergies: string[]): Meal[] => {
  return meals.filter(meal => {
    // Check dietary preferences
    const meetsDietaryReqs = dietaryPreferences.every(pref => {
      switch (pref) {
        case 'vegetarian':
          return meal.tags.includes('vegetarian') || meal.tags.includes('vegan');
        case 'vegan':
          return meal.tags.includes('vegan') || meal.tags.includes('vegan-option');
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
