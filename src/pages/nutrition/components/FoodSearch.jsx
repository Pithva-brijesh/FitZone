import React, { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

import Icon from "../../../components/AppIcon";
import Button from "../../../components/ui/Button";
import QuickAddMealModal from "./QuickAddMealModal";

export default function FoodSearch({ onMealAdded }) {
  const [search, setSearch] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);

  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFoods();
  }, []);

  async function loadFoods() {
    setLoading(true);

    const { data, error } = await supabase
      .from("foods")
      .select("*")
      .order("name");

    if (error) {
      console.error(error);
    } else {
      setFoods(data || []);
    }

    setLoading(false);
  }

  const filteredFoods = foods.filter((food) =>
    food.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <div className="morphic-card bg-card border border-border rounded-3xl p-8">

        {/* Header */}

        <div className="flex items-center gap-3 mb-6">

          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Icon
              name="Search"
              size={22}
              className="text-primary"
            />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">
              Food Search
            </h2>

            <p className="text-muted-foreground">
              Quickly add food to today's meals
            </p>
          </div>

        </div>

        {/* Search */}

        <div className="relative mb-8">

          <Icon
            name="Search"
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
          />

          <input
            type="text"
            placeholder="Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-background border border-border rounded-xl pl-12 pr-4 py-3 text-foreground focus:outline-none focus:border-primary"
          />

        </div>

        {/* Food List */}

        {loading ? (

          <div className="text-center py-10 text-muted-foreground">
            Loading foods...
          </div>

        ) : (

          <div className="space-y-4 max-h-96 overflow-y-auto">

            {filteredFoods.map((food) => (

              <div
                key={food.id}
                className="flex items-center justify-between bg-background rounded-2xl p-4"
              >

                <div>

                  <h4 className="font-semibold text-foreground">
                    {food.name}
                  </h4>

                  <p className="text-sm text-muted-foreground">
                    {food.calories} kcal • {food.protein}g Protein
                  </p>

                </div>

                <Button
                  size="sm"
                  iconName="Plus"
                  onClick={() => setSelectedFood(food)}
                >
                  Add
                </Button>

              </div>

            ))}

            {filteredFoods.length === 0 && (

              <div className="text-center py-8 text-muted-foreground">
                No food found.
              </div>

            )}

          </div>

        )}

      </div>

      <QuickAddMealModal
        food={selectedFood}
        isOpen={selectedFood !== null}
        onClose={() => setSelectedFood(null)}
        onMealAdded={() => {
          setSelectedFood(null);

          if (onMealAdded) {
            onMealAdded();
          }
        }}
      />
    </>
  );
}