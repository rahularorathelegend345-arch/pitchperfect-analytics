import DashboardLayout from "@/components/DashboardLayout";
import MarketRateChart from "@/components/charts/MarketRateChart";
import BrokerageChart from "@/components/charts/BrokerageChart";
import ROIChart from "@/components/charts/ROIChart";
import MarketInsights from "@/components/MarketInsights";
import KPICard from "@/components/KPICard";
import { TrendingUp, BarChart3, PieChart, Activity } from "lucide-react";

const Analytics = () => {
  // Demo data for the analytics overview
  const demoInsights = {
    demandDrivers: [
      "Growing IT sector driving residential demand",
      "Infrastructure development improving connectivity",
      "Rising disposable incomes in target demographics",
    ],
    growthSignals: [
      "18% YoY appreciation in key micro-markets",
      "New commercial developments attracting investment",
      "Government policies supporting real estate growth",
    ],
    riskFactors: [
      "Interest rate volatility impacting affordability",
      "Regulatory changes in certain zones",
      "Competition from new supply in some segments",
    ],
    investmentAttractiveness: "High",
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground">Market Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Comprehensive market overview and trends
          </p>
        </div>

        {/* KPI Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <KPICard
            title="Avg Market Rate"
            value="₹12,500"
            subtitle="per sq ft"
            icon={BarChart3}
            trend={{ value: 15, label: "YoY", positive: true }}
          />
          <KPICard
            title="Your Brokerage"
            value="2.0%"
            subtitle="competitive rate"
            icon={PieChart}
            trend={{ value: 20, label: "below market", positive: true }}
          />
          <KPICard
            title="Avg Projected ROI"
            value="18%"
            subtitle="5-year horizon"
            icon={TrendingUp}
            trend={{ value: 3.2, label: "vs benchmark", positive: true }}
          />
          <KPICard
            title="Market Activity"
            value="High"
            subtitle="transaction volume"
            icon={Activity}
          />
        </div>

        {/* Charts */}
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MarketRateChart currentRate={12500} />
            <BrokerageChart agentRate={2.0} />
          </div>

          <ROIChart projectedROI={18} timeHorizon={5} />

          <MarketInsights insights={demoInsights} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
