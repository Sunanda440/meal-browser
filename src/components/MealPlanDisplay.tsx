
import React, { useState } from 'react';
import { MealPlan, Meal } from '@/types/user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Eye } from 'lucide-react';
import { useAlarmSystem } from '@/hooks/useAlarmSystem';
import MealDetailsPanel from './MealDetailsPanel';
import MealAlarmCard from './MealAlarmCard';

interface MealPlanDisplayProps {
  mealPlans: MealPlan[];
  targetCalories: number;
  targetMacros: { protein: number; carbs: number; fat: number };
}

// Meal time mappings for alarms
const MEAL_TIME_MAPPINGS = {
  breakfast: '08:30',
  juice: '10:30', 
  lunch: '12:30',
  snack: '17:00',
  dinner: '19:20'
};

const MealCard: React.FC<{ 
  meal: Meal; 
  type: string;
  onViewDetails: (meal: Meal) => void;
}> = ({ meal, type, onViewDetails }) => (
  <Card className={`meal-card meal-${type}`}>
    <CardHeader className="pb-3">
      <div className="flex justify-between items-start">
        <CardTitle className="text-lg">{meal.name}</CardTitle>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => onViewDetails(meal)}
            className="text-xs px-2 py-1 h-auto"
          >
            <Eye className="w-3 h-3 mr-1" />
            Recipe
          </Button>
          <Badge variant="secondary">{meal.calories} cal</Badge>
        </div>
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
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [showMealDetails, setShowMealDetails] = useState(false);
  const { alarms, toggleAlarm } = useAlarmSystem();

  const handleViewMealDetails = (meal: Meal) => {
    setSelectedMeal(meal);
    setShowMealDetails(true);
  };

  const getMealAlarm = (mealType: string) => {
    const targetTime = MEAL_TIME_MAPPINGS[mealType as keyof typeof MEAL_TIME_MAPPINGS];
    return alarms.find(alarm => alarm.time === targetTime);
  };
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
              <div className="space-y-3">
                <h4 className="text-xl font-semibold mb-3 text-yellow-600">🌅 Breakfast</h4>
                <MealAlarmCard 
                  alarm={getMealAlarm('breakfast')}
                  mealTime="8:30 AM"
                  mealLabel="Breakfast Time"
                  onToggle={toggleAlarm}
                />
                <MealCard meal={plan.meals.breakfast} type="breakfast" onViewDetails={handleViewMealDetails} />
              </div>

              <div className="space-y-3">
                <h4 className="text-xl font-semibold mb-3 text-green-600">🥤 Fresh Juice</h4>
                <MealAlarmCard 
                  alarm={getMealAlarm('juice')}
                  mealTime="10:30 AM"
                  mealLabel="Morning Snack"
                  onToggle={toggleAlarm}
                />
                <MealCard meal={plan.meals.juice} type="juice" onViewDetails={handleViewMealDetails} />
              </div>

              <div className="space-y-3">
                <h4 className="text-xl font-semibold mb-3 text-orange-600">☀️ Lunch</h4>
                <MealAlarmCard 
                  alarm={getMealAlarm('lunch')}
                  mealTime="12:30 PM"
                  mealLabel="Lunch Time"
                  onToggle={toggleAlarm}
                />
                <MealCard meal={plan.meals.lunch} type="lunch" onViewDetails={handleViewMealDetails} />
              </div>

              <div className="space-y-3">
                <h4 className="text-xl font-semibold mb-3 text-pink-600">🍎 Snack</h4>
                <MealAlarmCard 
                  alarm={getMealAlarm('snack')}
                  mealTime="5:00 PM"
                  mealLabel="Afternoon Snack"
                  onToggle={toggleAlarm}
                />
                <MealCard meal={plan.meals.snacks[0]} type="snack" onViewDetails={handleViewMealDetails} />
              </div>

              <div className="space-y-3">
                <h4 className="text-xl font-semibold mb-3 text-purple-600">🌙 Dinner</h4>
                <MealAlarmCard 
                  alarm={getMealAlarm('dinner')}
                  mealTime="7:20 PM"
                  mealLabel="Dinner Time"
                  onToggle={toggleAlarm}
                />
                <MealCard meal={plan.meals.dinner} type="dinner" onViewDetails={handleViewMealDetails} />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <MealDetailsPanel 
        meal={selectedMeal}
        isOpen={showMealDetails}
        onClose={() => setShowMealDetails(false)}
      />
    </div>
  );
};

export default MealPlanDisplay;
