import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "New", value: 45, color: "hsl(var(--primary))" },
  { name: "Screening", value: 30, color: "hsl(var(--accent))" },
  { name: "Interview", value: 25, color: "hsl(var(--warning))" },
  { name: "Shortlisted", value: 18, color: "hsl(var(--success))" },
  { name: "Rejected", value: 27, color: "hsl(var(--destructive))" },
];

export function StatusPieChart() {
  return (
    <div className="bg-card rounded-xl border border-border p-6 animate-slide-up">
      <h3 className="text-lg font-semibold mb-4">Application Status Distribution</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend
              verticalAlign="bottom"
              height={36}
              formatter={(value) => (
                <span style={{ color: "hsl(var(--foreground))" }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
