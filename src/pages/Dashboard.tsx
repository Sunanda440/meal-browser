
import React, { useMemo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import UserProfileForm from '@/components/UserProfileForm';
import MealPlanDisplay from '@/components/MealPlanDisplay';
import AlarmManager from '@/components/AlarmManager';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { generateMealPlan, calculateDailyCalories, calculateMacros } from '@/utils/mealPlanner';

const Dashboard = () => {
  const { user, logout } = useAuth();

  const isProfileComplete = user && user.weight > 0 && user.height > 0 && user.age > 0;

  const { mealPlans, targetCalories, targetMacros } = useMemo(() => {
    if (!isProfileComplete) {
      return { mealPlans: [], targetCalories: 0, targetMacros: { protein: 0, carbs: 0, fat: 0 } };
    }

    const calories = calculateDailyCalories(user!);
    const macros = calculateMacros(calories, user!);
    const plans = generateMealPlan(user!);

    return {
      mealPlans: plans,
      targetCalories: calories,
      targetMacros: macros
    };
  }, [user, isProfileComplete]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Meal Magic
            </h1>
            <p className="text-sm text-muted-foreground">Welcome back, {user?.name}!</p>
          </div>
          <Button variant="outline" onClick={logout}>
            Sign Out
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Profile Section */}
        <UserProfileForm />

        {/* Alarm System */}
        <AlarmManager />

        {/* Quick Stats */}
        {isProfileComplete && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Daily Calories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{targetCalories}</div>
                <p className="text-xs text-muted-foreground">Personalized target</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Protein</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{targetMacros.protein}g</div>
                <p className="text-xs text-muted-foreground">Daily target</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Carbs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{targetMacros.carbs}g</div>
                <p className="text-xs text-muted-foreground">Daily target</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Fat</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">{targetMacros.fat}g</div>
                <p className="text-xs text-muted-foreground">Daily target</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Meal Plan Section */}
        <MealPlanDisplay 
          mealPlans={mealPlans} 
          targetCalories={targetCalories}
          targetMacros={targetMacros}
        />
      </div>
    </div>
  );
};

export default Dashboard;
