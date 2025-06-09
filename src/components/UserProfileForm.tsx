
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';

const UserProfileForm = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    weight: user?.weight || 0,
    height: user?.height || 0,
    age: user?.age || 0,
    gender: user?.gender || 'male',
    activityLevel: user?.activityLevel || 'moderately_active',
    goal: user?.goal || 'maintain_weight',
    dietaryPreferences: user?.dietaryPreferences || [],
    allergies: user?.allergies || []
  });

  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'non-vegetarian', label: 'Non-Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'keto', label: 'Ketogenic' },
    { id: 'paleo', label: 'Paleo' },
    { id: 'gluten-free', label: 'Gluten-Free' },
    { id: 'dairy-free', label: 'Dairy-Free' }
  ];

  const allergyOptions = [
    { id: 'nuts', label: 'Nuts' },
    { id: 'dairy', label: 'Dairy' },
    { id: 'eggs', label: 'Eggs' },
    { id: 'fish', label: 'Fish' },
    { id: 'shellfish', label: 'Shellfish' },
    { id: 'soy', label: 'Soy' },
    { id: 'gluten', label: 'Gluten' }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser(formData);
    toast({
      title: "Profile updated!",
      description: "Your meal plans will be regenerated based on your new preferences.",
    });
  };

  const handleDietaryChange = (dietaryId: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        dietaryPreferences: [...prev.dietaryPreferences, dietaryId]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        dietaryPreferences: prev.dietaryPreferences.filter(id => id !== dietaryId)
      }));
    }
  };

  const handleAllergyChange = (allergyId: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        allergies: [...prev.allergies, allergyId]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        allergies: prev.allergies.filter(id => id !== allergyId)
      }));
    }
  };

  const isProfileComplete = formData.weight > 0 && formData.height > 0 && formData.age > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
        <CardDescription>
          Tell us about yourself to get personalized meal recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                value={formData.weight || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, weight: Number(e.target.value) }))}
                placeholder="70"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input
                id="height"
                type="number"
                value={formData.height || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, height: Number(e.target.value) }))}
                placeholder="175"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                type="number"
                value={formData.age || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, age: Number(e.target.value) }))}
                placeholder="30"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={formData.gender} onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value as 'male' | 'female' }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="activity">Activity Level</Label>
              <Select value={formData.activityLevel} onValueChange={(value) => setFormData(prev => ({ ...prev, activityLevel: value as any }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select activity level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentary (little/no exercise)</SelectItem>
                  <SelectItem value="lightly_active">Lightly Active (light exercise 1-3 days/week)</SelectItem>
                  <SelectItem value="moderately_active">Moderately Active (moderate exercise 3-5 days/week)</SelectItem>
                  <SelectItem value="very_active">Very Active (hard exercise 6-7 days/week)</SelectItem>
                  <SelectItem value="extra_active">Extra Active (very hard exercise, physical job)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal">Goal</Label>
            <Select value={formData.goal} onValueChange={(value) => setFormData(prev => ({ ...prev, goal: value as any }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select your goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="lose_weight">Lose Weight</SelectItem>
                <SelectItem value="maintain_weight">Maintain Weight</SelectItem>
                <SelectItem value="gain_weight">Gain Weight</SelectItem>
                <SelectItem value="build_muscle">Build Muscle</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <Label>Dietary Preferences</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {dietaryOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.id}
                    checked={formData.dietaryPreferences.includes(option.id)}
                    onCheckedChange={(checked) => handleDietaryChange(option.id, checked as boolean)}
                  />
                  <Label htmlFor={option.id}>{option.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label>Allergies</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {allergyOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={option.id}
                    checked={formData.allergies.includes(option.id)}
                    onCheckedChange={(checked) => handleAllergyChange(option.id, checked as boolean)}
                  />
                  <Label htmlFor={option.id}>{option.label}</Label>
                </div>
              ))}
            </div>
          </div>

          <Button type="submit" className="w-full">
            {isProfileComplete ? 'Update Profile' : 'Complete Profile'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default UserProfileForm;
