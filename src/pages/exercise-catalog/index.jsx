import React, { useEffect, useState } from "react";

import Header from "../../components/ui/Header";
import QuickActions from "./components/QuickActions";
import CategoryFilter from "./components/CategoryFilter";
import FilterControls from "./components/FilterControls";
import ExerciseGrid from "./components/ExerciseGrid";

import { supabase } from "../../lib/supabase";
import useAuth from "../../hooks/useAuth";

export default function ExerciseCatalog() {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const [sortBy, setSortBy] = useState("name");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [equipmentFilter, setEquipmentFilter] = useState("all");
  const [durationFilter, setDurationFilter] = useState("all");

  useEffect(() => {
    loadExercises();
  }, []);

  async function loadExercises() {
    setLoading(true);

    const { data, error } = await supabase
      .from("exercises")
      .select("*");

    if (error) {
      console.error(error);
    } else {
      setExercises(data || []);
    }

    setLoading(false);
  }

  const filteredExercises = exercises.filter((exercise) => {
    const matchesSearch =
      exercise.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.description
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase());

    const matchesCategory =
      activeCategory === "all" ||
      exercise.category === activeCategory;

    const matchesDifficulty =
      difficultyFilter === "all" ||
      exercise.difficulty === difficultyFilter;

    const matchesEquipment =
      equipmentFilter === "all" ||
      exercise.equipment === equipmentFilter;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesDifficulty &&
      matchesEquipment
    );
  });

  const categories = [
    {
      id: "strength",
      name: "Strength",
      icon: "Dumbbell",
      color: "bg-primary text-primary-foreground",
    },
    {
      id: "cardio",
      name: "Cardio",
      icon: "Heart",
      color: "bg-red-500 text-white",
    },
    {
      id: "flexibility",
      name: "Flexibility",
      icon: "Activity",
      color: "bg-green-500 text-white",
    },
    {
      id: "balance",
      name: "Balance",
      icon: "Shield",
      color: "bg-yellow-500 text-black",
    },
  ];

  const exerciseCounts = {
    all: exercises.length,
    strength: exercises.filter((e) => e.category === "strength").length,
    cardio: exercises.filter((e) => e.category === "cardio").length,
    flexibility: exercises.filter((e) => e.category === "flexibility").length,
    balance: exercises.filter((e) => e.category === "balance").length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} />

      <main className="container mx-auto p-6 space-y-6">
        <QuickActions />

        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          exerciseCounts={exerciseCounts}
          onCategoryChange={setActiveCategory}
        />

        <FilterControls
          searchQuery={searchQuery}
          sortBy={sortBy}
          difficultyFilter={difficultyFilter}
          equipmentFilter={equipmentFilter}
          durationFilter={durationFilter}
          resultCount={filteredExercises.length}
          onSearchChange={setSearchQuery}
          onSortChange={setSortBy}
          onDifficultyChange={setDifficultyFilter}
          onEquipmentChange={setEquipmentFilter}
          onDurationChange={setDurationFilter}
          onClearFilters={() => {
            setSearchQuery("");
            setActiveCategory("all");
            setDifficultyFilter("all");
            setEquipmentFilter("all");
            setDurationFilter("all");
          }}
        />

        <ExerciseGrid
          exercises={filteredExercises}
          bookmarkedExercises={[]}
          onBookmark={() => {}}
          onAddToRoutine={() => {}}
          isLoading={loading}
        />
      </main>
    </div>
  );
}