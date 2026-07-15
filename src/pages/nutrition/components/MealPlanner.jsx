import React from "react";
import MealCard from "./MealCard";

const icons = {
  Breakfast: "Coffee",
  Lunch: "UtensilsCrossed",
  Dinner: "Soup",
  Snack: "Apple",
};

export default function MealPlanner({
  meals = [],
}) {
  return (
    <div className="morphic-card bg-card border border-border rounded-3xl p-8">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-2xl font-bold text-foreground">
            Today's Meals
          </h2>

          <p className="text-muted-foreground">
            Meals you've logged today
          </p>

        </div>

      </div>

      {meals.length === 0 ? (

        <div className="text-center py-16">

          <h3 className="text-2xl font-bold">
            No Meals Logged 🍽️
          </h3>

          <p className="text-muted-foreground mt-4">
            Click the + button to add your first meal.
          </p>

        </div>

      ) : (

        <div className="grid md:grid-cols-2 gap-6">

          {meals.map((meal) => (

            <MealCard
              key={meal.id}
              mealName={meal.food_name}
              icon={
                icons[meal.meal_type] ||
                "UtensilsCrossed"
              }
              calories={meal.calories}
              protein={meal.protein}
              carbs={meal.carbs}
              fat={meal.fat}
              completed={true}
            />

          ))}

        </div>

      )}

    </div>
  );
}