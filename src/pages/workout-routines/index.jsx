import { useEffect, useState } from "react";
import Button from "../../components/ui/Button";
import { getRoutines, createRoutine } from "../../services/routineService";
import CreateRoutineModal from "./components/CreateRoutineModal";
import { useNavigate } from "react-router-dom";

export default function WorkoutRoutines() {
    const [loading, setLoading] = useState(true);
    const [routines, setRoutines] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadRoutines();
    }, []);

    async function loadRoutines() {
        try {
            const data = await getRoutines();
            setRoutines(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    async function handleCreateRoutine(name, description) {
        try {
            await createRoutine(name, description);
            await loadRoutines();
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-2xl">
                Loading...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-white">
            <div className="max-w-6xl mx-auto py-12 px-6">

                {/* Header */}
                <div className="flex items-center justify-between mb-10">

                    <div>
                        <h1 className="text-4xl font-bold">
                            My Workout Routines
                        </h1>

                        <p className="text-gray-400 mt-2">
                            Build your own workout plans
                        </p>
                    </div>

                    <Button onClick={() => setShowModal(true)}>
                        + Create Routine
                    </Button>

                </div>

                {/* Empty State */}
                {routines.length === 0 ? (

                    <div className="bg-card rounded-2xl p-16 text-center border border-border">

                        <h2 className="text-2xl font-semibold mb-4">
                            No routines yet
                        </h2>

                        <p className="text-gray-400">
                            Create your first workout routine.
                        </p>

                    </div>

                ) : (

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

                        {routines.map((routine) => (

                            <div
                                key={routine.id}
                                onClick={() => navigate(`/routine/${routine.id}`)}
                                className="bg-card border border-border rounded-xl p-6 hover:border-primary hover:cursor-pointer transition-all duration-300"
                            >
                                <h3 className="text-xl font-bold">
                                    {routine.name}
                                </h3>

                                <p className="text-gray-400 mt-2">
                                    {routine.description || "No description"}
                                </p>

                                <p className="text-sm text-primary mt-5">
                                    Created {new Date(routine.created_at).toLocaleDateString()}
                                </p>

                            </div>

                        ))}

                    </div>

                )}

                {/* Create Routine Modal */}
                <CreateRoutineModal
                    open={showModal}
                    onClose={() => setShowModal(false)}
                    onSave={handleCreateRoutine}
                />

            </div>
        </div>
    );
}