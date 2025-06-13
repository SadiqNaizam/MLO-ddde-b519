import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { IndianRupee, RefreshCcw } from 'lucide-react';

// Constants for cost calculation
const BASE_COST_PER_DAY = 500; // Basic local activities, small expenses

const MEAL_OPTIONS = [
  { id: 'breakfast_only', label: 'Breakfast Only', cost: 300 },
  { id: 'half_board', label: 'Half Board (Breakfast & Dinner)', cost: 700 },
  { id: 'full_board', label: 'Full Board (All Meals)', cost: 1200 },
];

const TRANSPORT_OPTIONS = [
  { id: 'economy', label: 'Economy (Bus/Train)', cost_per_day: 200 },
  { id: 'comfort', label: 'Comfort (AC Train/Shared Cab)', cost_per_day: 600 },
  { id: 'luxury', label: 'Luxury (Private Car/Flights)', cost_per_day: 1500 },
];

const ACCOMMODATION_OPTIONS = [
  { id: 'budget', label: 'Budget (Hostels/Guesthouses)', cost_per_night: 800 },
  { id: 'mid_range', label: 'Mid-Range (3-Star Hotels)', cost_per_night: 2500 },
  { id: 'luxury', label: 'Luxury (4-5 Star Hotels)', cost_per_night: 6000 },
];

const DEFAULT_DAYS = 7;
const DEFAULT_MEAL_TYPE = MEAL_OPTIONS[0].id;
const DEFAULT_TRANSPORT_MODE = TRANSPORT_OPTIONS[0].id;
const DEFAULT_ACCOMMODATION_STYLE = ACCOMMODATION_OPTIONS[0].id;

const TripCalculatorWidget: React.FC = () => {
  const [numDays, setNumDays] = useState<number>(DEFAULT_DAYS);
  const [mealType, setMealType] = useState<string>(DEFAULT_MEAL_TYPE);
  const [transportMode, setTransportMode] = useState<string>(DEFAULT_TRANSPORT_MODE);
  const [accommodationStyle, setAccommodationStyle] = useState<string>(DEFAULT_ACCOMMODATION_STYLE);
  const [calculatedCost, setCalculatedCost] = useState<number>(0);

  console.log('TripCalculatorWidget loaded');

  const calculateCost = useCallback(() => {
    const selectedMeal = MEAL_OPTIONS.find(opt => opt.id === mealType);
    const selectedTransport = TRANSPORT_OPTIONS.find(opt => opt.id === transportMode);
    const selectedAccommodation = ACCOMMODATION_OPTIONS.find(opt => opt.id === accommodationStyle);

    if (!selectedMeal || !selectedTransport || !selectedAccommodation || numDays <= 0) {
      setCalculatedCost(0);
      return;
    }

    const dailyMealCost = selectedMeal.cost;
    const dailyTransportCost = selectedTransport.cost_per_day;
    const nightlyAccommodationCost = selectedAccommodation.cost_per_night;

    // Assuming accommodation for numDays nights (e.g. a 1 day trip might still mean 1 night stay)
    // Or, if numDays means X days and X-1 nights, adjust. For simplicity, let's use numDays for nights.
    const totalCost = (BASE_COST_PER_DAY + dailyMealCost + dailyTransportCost + nightlyAccommodationCost) * numDays;
    setCalculatedCost(totalCost);
  }, [numDays, mealType, transportMode, accommodationStyle]);

  useEffect(() => {
    calculateCost();
  }, [calculateCost]);

  const handleDaysChange = (value: number[]) => {
    setNumDays(value[0]);
  };

  const handleReset = () => {
    setNumDays(DEFAULT_DAYS);
    setMealType(DEFAULT_MEAL_TYPE);
    setTransportMode(DEFAULT_TRANSPORT_MODE);
    setAccommodationStyle(DEFAULT_ACCOMMODATION_STYLE);
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold text-center text-primary">Trip Cost Estimator</CardTitle>
        <CardDescription className="text-center">
          Customize your trip details to get an estimated cost.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="days-slider" className="text-md font-medium">Number of Days: {numDays}</Label>
          <Slider
            id="days-slider"
            min={1}
            max={30}
            step={1}
            value={[numDays]}
            onValueChange={handleDaysChange}
            className="mt-2"
          />
        </div>

        <Separator />

        <div className="space-y-3">
          <Label className="text-md font-medium">Meal Preferences</Label>
          <RadioGroup value={mealType} onValueChange={setMealType} className="space-y-2">
            {MEAL_OPTIONS.map(option => (
              <div key={option.id} className="flex items-center space-x-2">
                <RadioGroupItem value={option.id} id={`meal-${option.id}`} />
                <Label htmlFor={`meal-${option.id}`} className="font-normal">{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="transport-mode" className="text-md font-medium">Transport Mode</Label>
          <Select value={transportMode} onValueChange={setTransportMode}>
            <SelectTrigger id="transport-mode">
              <SelectValue placeholder="Select transport" />
            </SelectTrigger>
            <SelectContent>
              {TRANSPORT_OPTIONS.map(option => (
                <SelectItem key={option.id} value={option.id}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator />

        <div className="space-y-2">
          <Label htmlFor="accommodation-style" className="text-md font-medium">Accommodation Style</Label>
          <Select value={accommodationStyle} onValueChange={setAccommodationStyle}>
            <SelectTrigger id="accommodation-style">
              <SelectValue placeholder="Select accommodation" />
            </SelectTrigger>
            <SelectContent>
              {ACCOMMODATION_OPTIONS.map(option => (
                <SelectItem key={option.id} value={option.id}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center space-y-4 pt-6 border-t">
        <div className="text-center">
          <p className="text-lg font-medium text-gray-600">Estimated Trip Cost:</p>
          <p className="text-3xl font-bold text-green-600 flex items-center justify-center">
            <IndianRupee className="h-7 w-7 mr-1" />
            {calculatedCost.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
          </p>
        </div>
        <Button onClick={handleReset} variant="outline" className="w-full sm:w-auto">
          <RefreshCcw className="mr-2 h-4 w-4" /> Reset Calculator
        </Button>
      </CardFooter>
    </Card>
  );
};

export default TripCalculatorWidget;