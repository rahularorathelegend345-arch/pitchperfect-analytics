import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ROIChartProps {
  projectedROI: number;
  timeHorizon: number;
}

const ROIChart = ({ projectedROI, timeHorizon }: ROIChartProps) => {
  // Generate projection data based on time horizon
  const data = Array.from({ length: timeHorizon + 1 }, (_, i) => {
    const year = i;
    const appreciation = Math.pow(1 + projectedROI / 100 / timeHorizon, year) - 1;
    const rentalYield = 0.03 * year; // 3% annual rental yield
    const totalROI = appreciation + rentalYield;

    return {
      year: `Year ${year}`,
      appreciation: Math.round(appreciation * 100),
      rental: Math.round(rentalYield * 100),
      total: Math.round(totalROI * 100),
    };
  });

  const totalReturn = data[data.length - 1].total;
  const annualizedReturn = (projectedROI / timeHorizon + 3).toFixed(1);

  return (
    <div className="chart-container">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">ROI & Returns Analysis</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Projected returns over {timeHorizon} years
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-success">{totalReturn}%</p>
          <p className="text-sm text-muted-foreground">total projected ROI</p>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorAppreciation" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-primary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--chart-primary))" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorRental" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-secondary))" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(var(--chart-secondary))" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              axisLine={{ stroke: "hsl(var(--border))" }}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }}
              axisLine={{ stroke: "hsl(var(--border))" }}
              tickLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                boxShadow: "var(--shadow-lg)",
              }}
              formatter={(value: number, name: string) => {
                const labels: Record<string, string> = {
                  appreciation: "Capital Appreciation",
                  rental: "Rental Yield",
                  total: "Total ROI",
                };
                return [`${value}%`, labels[name] || name];
              }}
            />
            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value) => {
                const labels: Record<string, string> = {
                  appreciation: "Appreciation",
                  rental: "Rental",
                };
                return labels[value] || value;
              }}
            />
            <Area
              type="monotone"
              dataKey="appreciation"
              stackId="1"
              stroke="hsl(var(--chart-primary))"
              fill="url(#colorAppreciation)"
              strokeWidth={2}
            />
            <Area
              type="monotone"
              dataKey="rental"
              stackId="1"
              stroke="hsl(var(--chart-secondary))"
              fill="url(#colorRental)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="insight-highlight mt-6">
        <p className="text-sm text-foreground">
          <span className="font-semibold">Insight:</span> Projected ROI of{" "}
          <span className="text-success font-medium">{totalReturn}%</span> over {timeHorizon} years,
          translating to <span className="font-medium">{annualizedReturn}% annualized returns</span>.
          This outperforms traditional fixed deposits by 3-4x.
        </p>
      </div>
    </div>
  );
};

export default ROIChart;
