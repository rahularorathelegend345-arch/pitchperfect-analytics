import { TrendingUp, AlertTriangle, Zap, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Insights {
  demandDrivers: string[];
  growthSignals: string[];
  riskFactors: string[];
  investmentAttractiveness: string;
}

interface MarketInsightsProps {
  insights: Insights;
}

const MarketInsights = ({ insights }: MarketInsightsProps) => {
  const attractivenessColors: Record<string, string> = {
    High: "bg-success/10 text-success border-success/20",
    Medium: "bg-warning/10 text-warning border-warning/20",
    Low: "bg-destructive/10 text-destructive border-destructive/20",
  };

  return (
    <div className="bg-card rounded-lg border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-foreground">AI-Generated Market Insights</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Data-driven analysis of market conditions
          </p>
        </div>
        <div
          className={cn(
            "px-4 py-2 rounded-full border text-sm font-medium",
            attractivenessColors[insights.investmentAttractiveness] || attractivenessColors.Medium
          )}
        >
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            {insights.investmentAttractiveness} Attractiveness
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Demand Drivers */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-success">
            <TrendingUp className="h-5 w-5" />
            <h4 className="font-medium">Demand Drivers</h4>
          </div>
          <ul className="space-y-2">
            {insights.demandDrivers.map((driver, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-success mt-2 flex-shrink-0" />
                {driver}
              </li>
            ))}
          </ul>
        </div>

        {/* Growth Signals */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-accent">
            <Zap className="h-5 w-5" />
            <h4 className="font-medium">Growth Signals</h4>
          </div>
          <ul className="space-y-2">
            {insights.growthSignals.map((signal, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                {signal}
              </li>
            ))}
          </ul>
        </div>

        {/* Risk Factors */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-warning">
            <AlertTriangle className="h-5 w-5" />
            <h4 className="font-medium">Risk Factors</h4>
          </div>
          <ul className="space-y-2">
            {insights.riskFactors.map((risk, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-warning mt-2 flex-shrink-0" />
                {risk}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MarketInsights;
