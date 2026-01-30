import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

interface BrokerageChartProps {
  agentRate: number;
}

const BrokerageChart = ({ agentRate }: BrokerageChartProps) => {
  const data = [
    { name: "Market Avg", rate: 2.5, fill: "hsl(var(--chart-quaternary))" },
    { name: "Your Rate", rate: agentRate, fill: "hsl(var(--chart-secondary))" },
    { name: "Competitor A", rate: 2.8, fill: "hsl(var(--chart-quaternary))" },
    { name: "Competitor B", rate: 3.0, fill: "hsl(var(--chart-quaternary))" },
  ];

  const savings = ((2.5 - agentRate) / 2.5 * 100).toFixed(0);

  return (
    <div className="chart-container">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Brokerage Rate Analysis</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Comparison with market and competitors
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-accent">{agentRate}%</p>
          <p className="text-sm text-muted-foreground">your rate</p>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              axisLine={{ stroke: "hsl(var(--border))" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              axisLine={{ stroke: "hsl(var(--border))" }}
              tickLine={false}
              tickFormatter={(value) => `${value}%`}
              domain={[0, 4]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "var(--shadow-lg)",
              }}
              formatter={(value: number) => [`${value}%`, "Brokerage Rate"]}
            />
            <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="insight-highlight mt-6">
        <p className="text-sm text-foreground">
          <span className="font-semibold">Insight:</span> Competitive brokerage at {agentRate}% 
          {Number(savings) > 0 && (
            <> — <span className="text-success font-medium">{savings}% lower</span> than market average</>
          )}
          . This improves deal closure probability and client trust.
        </p>
      </div>
    </div>
  );
};

export default BrokerageChart;
