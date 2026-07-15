import React, { useState, useEffect } from "react";
import Button from "../../../components/ui/Button";
import Icon from "../../../components/AppIcon";
import { addMeal } from "../../../services/nutritionService";

export default function QuickAddMealModal({
  food,
  isOpen,
  onClose,
  onMealAdded,
}) {
  const [mealType, setMealType] = useState("Breakfast");
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMealType("Breakfast");
      setQuantity(1);
      setNotes("");
    }
  }, [isOpen]);

  if (!isOpen || !food) return null;

  const calories = Math.round(food.calories * quantity);
  const protein = +(food.protein * quantity).toFixed(1);
  const carbs = +(food.carbs * quantity).toFixed(1);
  const fat = +(food.fat * quantity).toFixed(1);

  async function handleSave() {
    try {
      setSaving(true);

      await addMeal({
        mealType,
        food: food.name,
        calories,
        protein,
        carbs,
        fat,
        notes,
      });

      await onMealAdded?.();
      onClose();
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-6">
      <div className="bg-card border border-border rounded-3xl w-full max-w-lg p-8">

        {/* Header */}

        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground">
              Add Meal
            </h2>

            <p className="text-muted-foreground mt-1">
              Confirm meal details
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center"
          >
            <Icon name="X" size={22} />
          </button>
        </div>

        {/* Food */}

        <div className="bg-background rounded-2xl p-5 mb-6">
          <h3 className="text-xl font-bold text-foreground">
            {food.name}
          </h3>

          <p className="text-sm text-muted-foreground mt-1">
            Serving Size: <strong>{food.serving}</strong>
          </p>

          <p className="text-muted-foreground mt-2">
            {calories} kcal • {protein}g Protein • {carbs}g Carbs • {fat}g Fat
          </p>
        </div>

        {/* Meal Type */}

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium">
            Meal Type
          </label>

          <select
            value={mealType}
            onChange={(e) => setMealType(e.target.value)}
            className="w-full bg-background border border-border rounded-xl px-4 py-3"
          >
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Snack</option>
          </select>
        </div>

        {/* Quantity */}

        <div className="mb-5">
          <label className="block mb-2 text-sm font-medium">
            Quantity
          </label>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() =>
                setQuantity((prev) => Math.max(0.25, prev - 0.25))
              }
              className="w-12 rounded-xl bg-background border border-border text-lg"
            >
              −
            </button>

            <input
              type="number"
              min="0.25"
              step="0.25"
              value={quantity}
              onChange={(e) =>
                setQuantity(Number(e.target.value) || 1)
              }
              className="flex-1 bg-background border border-border rounded-xl px-4 py-3 text-center"
            />

            <button
              type="button"
              onClick={() => setQuantity((prev) => prev + 0.25)}
              className="w-12 rounded-xl bg-background border border-border text-lg"
            >
              +
            </button>
          </div>

          <p className="text-xs text-muted-foreground mt-2">
            × {food.serving}
          </p>
        </div>

        {/* Notes */}

        <div className="mb-8">
          <label className="block mb-2 text-sm font-medium">
            Notes
          </label>

          <textarea
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional..."
            className="w-full bg-background border border-border rounded-xl px-4 py-3 resize-none"
          />
        </div>

        {/* Nutrition Summary */}

        <div className="grid grid-cols-4 gap-3 mb-8">

          <div className="bg-primary/10 rounded-xl p-3 text-center">
            <div className="font-bold text-primary">
              {calories}
            </div>
            <div className="text-xs text-muted-foreground">
              kcal
            </div>
          </div>

          <div className="bg-success/10 rounded-xl p-3 text-center">
            <div className="font-bold text-success">
              {protein}g
            </div>
            <div className="text-xs text-muted-foreground">
              Protein
            </div>
          </div>

          <div className="bg-warning/10 rounded-xl p-3 text-center">
            <div className="font-bold text-warning">
              {carbs}g
            </div>
            <div className="text-xs text-muted-foreground">
              Carbs
            </div>
          </div>

          <div className="bg-red-500/10 rounded-xl p-3 text-center">
            <div className="font-bold text-red-500">
              {fat}g
            </div>
            <div className="text-xs text-muted-foreground">
              Fat
            </div>
          </div>

        </div>

        {/* Buttons */}

        <div className="flex justify-end gap-4">

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