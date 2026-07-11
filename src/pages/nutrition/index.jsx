import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from "../../components/ui/Header";
import useAuth from "../../hooks/useAuth";

import NutritionHeader from "./components/NutritionHeader";
import DailyCalories from "./components/DailyCalories";
import MacroCard from "./components/MacroCard";
import WaterTracker from "./components/WaterTracker";
import MealPlanner from "./components/MealPlanner";
import FoodSearch from "./components/FoodSearch";
import NutritionInsights from "./components/NutritionInsights";
import NutritionChart from "./components/NutritionChart";
import AddMealModal from "./components/AddMealModal";

export default function Nutrition() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [showAddMeal, setShowAddMeal] = useState(false);

  return (
    <div className="min-h-screen bg-background">

      <Header
        user={user}
        onNavigate={(path) => navigate(path)}
      />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">

        <NutritionHeader />

        {/* Top Section */}

        <div className="grid lg:grid-cols-3 gap-8">

          <div className="lg:col-span-2">

            <DailyCalories />

          </div>

          <WaterTracker />

        </div>

        {/* Macros */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          <MacroCard
            title="Protein"
            consumed={135}
            goal={180}
            color="bg-success"
            icon="Beef"
          />

          <MacroCard
            title="Carbohydrates"
            consumed={220}
            goal={280}
            color="bg-warning"
            icon="Wheat"
          />

          <MacroCard
            title="Fat"
            consumed={62}
            goal={80}
            color="bg-red-500"
            icon="Droplets"
          />

          <MacroCard
            title="Fiber"
            consumed={24}
            goal={35}
            color="bg-primary"
            icon="Leaf"
          />

        </div>

        {/* Meals */}

        <MealPlanner />

        {/* Bottom */}

        <div className="grid lg:grid-cols-2 gap-8">

          <FoodSearch />

          <NutritionInsights />

        </div>

        <NutritionChart />

        {/* Floating Button */}

        <button
          onClick={() => setShowAddMeal(true)}
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-primary shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-40"
        >

          <span className="text-white text-4xl">

            +

          </span>

        </button>

      </main>

      <AddMealModal
        isOpen={showAddMeal}
        onClose={() => setShowAddMeal(false)}
      />

    </div>
  );
}