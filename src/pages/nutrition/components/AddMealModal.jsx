import React, { useState } from "react";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";
import { addMeal } from "../../../services/nutritionService";

export default function AddMealModal({
  isOpen = true,
  onClose = () => {},
  onMealAdded = () => {},
}) {
  const [meal, setMeal] = useState({
    mealType: "Breakfast",
    food: "",
    calories: "",
    protein: "",
    carbs: "",
    fat: "",
    notes: "",
  });

  const [saving, setSaving] = useState(false);

  if (!isOpen) return null;

  function handleChange(e) {
    setMeal({
      ...meal,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSave() {
    try {
      setSaving(true);

      await addMeal(meal);

      setMeal({
        mealType: "Breakfast",
        food: "",
        calories: "",
        protein: "",
        carbs: "",
        fat: "",
        notes: "",
      });

      onMealAdded();
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-6">

      <div className="bg-card border border-border rounded-3xl w-full max-w-2xl p-8">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h2 className="text-3xl font-bold text-foreground">
              Add Meal
            </h2>

            <p className="text-muted-foreground">
              Track your nutrition
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center"
          >
            <Icon name="X" size={22} />
          </button>

        </div>

        <div className="grid md:grid-cols-2 gap-5">

          <select
            name="mealType"
            value={meal.mealType}
            onChange={handleChange}
            className="bg-background border border-border rounded-xl px-4 py-3 text-foreground"
          >
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snack</option>
          </select>

          <input
            name="food"
            placeholder="Food Name"
            value={meal.food}
            onChange={handleChange}
            className="bg-background border border-border rounded-xl px-4 py-3 text-foreground"
          />

          <input
            name="calories"
            type="number"
            placeholder="Calories"
            value={meal.calories}
            onChange={handleChange}
            className="bg-background border border-border rounded-xl px-4 py-3 text-foreground"
          />

          <input
            name="protein"
            type="number"
            placeholder="Protein (g)"
            value={meal.protein}
            onChange={handleChange}
            className="bg-background border border-border rounded-xl px-4 py-3 text-foreground"
          />

          <input
            name="carbs"
            type="number"
            placeholder="Carbs (g)"
            value={meal.carbs}
            onChange={handleChange}
            className="bg-background border border-border rounded-xl px-4 py-3 text-foreground"
          />

          <input
            name="fat"
            type="number"
            placeholder="Fat (g)"
            value={meal.fat}
            onChange={handleChange}
            className="bg-background border border-border rounded-xl px-4 py-3 text-foreground"
          />

          <input
            name="notes"
            placeholder="Notes"
            value={meal.notes}
            onChange={handleChange}
            className="bg-background border border-border rounded-xl px-4 py-3 text-foreground md:col-span-2"
          />

        </div>

        <div className="flex justify-end gap-4 mt-8">

          <Button
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            iconName="Plus"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Add Meal"}
          </Button>

        </div>

      </div>

    </div>
  );
}