import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const data = [
    { name: "Completed", value: 540, color: "hsl(var(--primary))" },
    { name: "Pending", value: 65, color: "hsl(var(--warning))" },
    { name: "Cancelled", value: 16, color: "hsl(var(--destructive))" },
];

export function BookingOverview() {
    return (
        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} bookings`, "Count"]} />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}