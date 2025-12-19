import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { job: "Frontend Dev", applicants: 45 },
  { job: "Backend Dev", applicants: 32 },
  { job: "UI Designer", applicants: 28 },
  { job: "Product Manager", applicants: 22 },
  { job: "DevOps", applicants: 18 },
];

export function ApplicantsChart() {
  return (
    <div className="bg-card rounded-xl border border-border p-6 animate-slide-up">
      <h3 className="text-lg font-semibold mb-4">Applicants per Job</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" tick={{ fill: "hsl(var(--muted-foreground))" }} />
            <YAxis
              dataKey="job"
              type="category"
              tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              width={100}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Bar
              dataKey="applicants"
              fill="hsl(var(--primary))"
              radius={[0, 4, 4, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
