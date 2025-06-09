
import React from 'react';
import { MealPlan, Meal } from '@/types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';

interface MealPlanDisplayProps {
  mealPlans: MealPlan[];
  targetCalories: number;
  targetMacros: { protein: number; carbs: number; fat: number };
}

const MealCard: React.FC<{ meal: Meal; type: string }> = ({ meal, type }) => (
  <Card className={`meal-card meal-${type}`}>
    <CardHeader className="pb-3">
      <div className="flex justify-between items-start">
        <CardTitle className="text-lg">{meal.name}</CardTitle>
        <Badge variant="secondary">{meal.calories} cal</Badge>
      </div>
      <CardDescription>{meal.description}</CardDescription>
    </CardHeader>
    <CardContent className="space-y-3">
      <div className="flex justify-between text-sm">
        <span>Protein: {meal.protein}g</span>
        <span>Carbs: {meal.carbs}g</span>
        <span>Fat: {meal.fat}g</span>
      </div>
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Prep: {meal.prepTime}min</span>
        <span>Cook: {meal.cookTime}min</span>
        <span>Serves: {meal.servings}</span>
      </div>
      <div className="flex flex-wrap gap-1 mt-2">
        {meal.tags.slice(0, 3).map((tag) => (
          <Badge key={tag} variant="outline" className="text-xs">
            {tag.replace('-', ' ')}
          </Badge>
        ))}
      </div>
    </CardContent>
  </Card>
);

const MealPlanDisplay: React.FC<MealPlanDisplayProps> = ({ mealPlans, targetCalories, targetMacros }) => {
  if (mealPlans.length === 0) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <p className="text-muted-foreground">Complete your profile to see personalized meal plans!</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">Your 7-Day Meal Plan</h2>
        <p className="text-muted-foreground">
          Personalized nutrition plan targeting {targetCalories} calories per day
        </p>
      </div>

      <Tabs defaultValue="day-1" className="w-full">
        <TabsList className="grid w-full grid-cols-7">
          {mealPlans.map((plan) => (
            <TabsTrigger key={plan.day} value={`day-${plan.day}`} className="text-xs">
              {plan.dayName.substring(0, 3)}
            </TabsTrigger>
          ))}
        </TabsList>

        {mealPlans.map((plan) => (
          <TabsContent key={plan.day} value={`day-${plan.day}`} className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-2">{plan.dayName}</h3>
              <div className="flex justify-center gap-6 text-sm">
                <span>Total: {plan.totalCalories} calories</span>
                <span>P: {plan.macros.protein}g</span>
                <span>C: {plan.macros.carbs}g</span>
                <span>F: {plan.macros.fat}g</span>
              </div>
            </div>

            {/* Macro Progress Bars */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Nutrition Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Calories</span>
                    <span>{plan.totalCalories} / {targetCalories}</span>
                  </div>
                  <Progress value={(plan.totalCalories / targetCalories) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Protein</span>
                    <span>{plan.macros.protein}g / {targetMacros.protein}g</span>
                  </div>
                  <Progress value={(plan.macros.protein / targetMacros.protein) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Carbs</span>
                    <span>{plan.macros.carbs}g / {targetMacros.carbs}g</span>
                  </div>
                  <Progress value={(plan.macros.carbs / targetMacros.carbs) * 100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Fat</span>
                    <span>{plan.macros.fat}g / {targetMacros.fat}g</span>
                  </div>
                  <Progress value={(plan.macros.fat / targetMacros.fat) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Meals */}
            <div className="space-y-6">
              <div>
                <h4 className="text-xl font-semibold mb-3 text-yellow-600">🌅 Breakfast</h4>
                <MealCard meal={plan.meals.breakfast} type="breakfast" />
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-3 text-green-600">🥤 Fresh Juice</h4>
                <MealCard meal={plan.meals.juice} type="juice" />
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-3 text-orange-600">☀️ Lunch</h4>
                <MealCard meal={plan.meals.lunch} type="lunch" />
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-3 text-pink-600">🍎 Snack</h4>
                <MealCard meal={plan.meals.snacks[0]} type="snack" />
              </div>

              <div>
                <h4 className="text-xl font-semibold mb-3 text-purple-600">🌙 Dinner</h4>
                <MealCard meal={plan.meals.dinner} type="dinner" />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MealPlanDisplay;
