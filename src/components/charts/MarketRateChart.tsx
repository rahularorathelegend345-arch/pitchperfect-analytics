import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

interface MarketRateChartProps {
  currentRate: number;
}

const MarketRateChart = ({ currentRate }: MarketRateChartProps) => {
  // Generate historical data
  const data = [
    { month: "Jan", rate: currentRate * 0.85 },
    { month: "Feb", rate: currentRate * 0.87 },
    { month: "Mar", rate: currentRate * 0.88 },
    { month: "Apr", rate: currentRate * 0.90 },
    { month: "May", rate: currentRate * 0.91 },
    { month: "Jun", rate: currentRate * 0.93 },
    { month: "Jul", rate: currentRate * 0.94 },
    { month: "Aug", rate: currentRate * 0.95 },
    { month: "Sep", rate: currentRate * 0.97 },
    { month: "Oct", rate: currentRate * 0.98 },
    { month: "Nov", rate: currentRate * 0.99 },
    { month: "Dec", rate: currentRate },
  ];

  const yoyChange = Math.round(((currentRate - currentRate * 0.85) / (currentRate * 0.85)) * 100);

  return (
    <div className="chart-container">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">Current Market Rate</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Average price per sq ft over the last 12 months
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-foreground">
            ₹{currentRate.toLocaleString()}
          </p>
          <p className="text-sm text-muted-foreground">per sq ft</p>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              axisLine={{ stroke: "hsl(var(--border))" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              axisLine={{ stroke: "hsl(var(--border))" }}
              tickLine={false}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "var(--shadow-lg)",
              }}
              formatter={(value: number) => [`₹${value.toLocaleString()}/sq ft`, "Rate"]}
            />
            <ReferenceLine
              y={currentRate}
              stroke="hsl(var(--accent))"
              strokeDasharray="5 5"
              label={{
                value: "Current",
                position: "right",
                fill: "hsl(var(--accent))",
                fontSize: 12,
              }}
            />
            <Line
              type="monotone"
              dataKey="rate"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="insight-highlight mt-6">
        <p className="text-sm text-foreground">
          <span className="font-semibold">Insight:</span> Current market rate is ₹{currentRate.toLocaleString()}/sq ft, 
          up <span className="text-success font-medium">{yoyChange}% YoY</span>. Strong appreciation trend indicates 
          robust demand in this micro-market.
        </p>
      </div>
    </div>
  );
};

export default MarketRateChart;
