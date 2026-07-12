import {
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    Legend,
} from "recharts";

export default function WeeklyActivityChart({
    data,
}) {
    return (
        <div className="bg-card rounded-3xl border border-border p-8">

            <h2 className="text-2xl font-bold mb-8">
                Weekly Activity
            </h2>

            <div className="h-80">

                <ResponsiveContainer width="100%" height="100%">

                    <BarChart data={data}>

                        <XAxis dataKey="day" />

                        <YAxis />

                        <Tooltip />

                        <CartesianGrid strokeDasharray="3 3" />

                        <Legend />

                        <Bar
                            dataKey="calories"
                            name="Calories"
                            radius={[6, 6, 0, 0]}
                        />

                        <Bar
                            dataKey="workouts"
                            name="Workouts"
                            radius={[6, 6, 0, 0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}