import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import MarketRateChart from "@/components/charts/MarketRateChart";
import BrokerageChart from "@/components/charts/BrokerageChart";
import ROIChart from "@/components/charts/ROIChart";
import MarketInsights from "@/components/MarketInsights";
import SlidePreview from "@/components/SlidePreview";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Download, RefreshCw, Edit, MapPin, Building, Target, Clock } from "lucide-react";
import { Json } from "@/integrations/supabase/types";

interface Pitch {
  id: string;
  city: string;
  locality: string | null;
  property_type: string;
  client_goal: string;
  budget_min: number | null;
  budget_max: number | null;
  time_horizon: number;
  status: string;
  market_rate: number | null;
  brokerage_rate: number | null;
  projected_roi: number | null;
  insights: Json | null;
  created_at: string;
}

interface Insights {
  demandDrivers: string[];
  growthSignals: string[];
  riskFactors: string[];
  investmentAttractiveness: string;
}

const goalLabels: Record<string, string> = {
  investment: "Investment",
  "end-use": "End Use",
  "rental-yield": "Rental Yield",
};

const PitchDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [pitch, setPitch] = useState<Pitch | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPitch = async () => {
      if (!id || !user) return;

      try {
        const { data, error } = await supabase
          .from("pitches")
          .select("*")
          .eq("id", id)
          .eq("user_id", user.id)
          .single();

        if (error) throw error;
        setPitch(data);
      } catch (error: any) {
        toast({
          title: "Error",
          description: "Failed to load pitch details",
          variant: "destructive",
        });
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchPitch();
  }, [id, user, navigate, toast]);

  const handleDownload = () => {
    toast({
      title: "Download Started",
      description: "Your PowerPoint presentation is being generated...",
    });
    // In production, this would trigger actual PPT generation
    setTimeout(() => {
      toast({
        title: "Download Ready",
        description: "Pitch deck has been downloaded successfully.",
      });
    }, 2000);
  };

  const handleRegenerate = async () => {
    toast({
      title: "Regenerating...",
      description: "Creating a fresh analysis with updated data.",
    });
    // Would trigger new analysis
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  if (!pitch) {
    return (
      <DashboardLayout>
        <div className="p-6 lg:p-8 text-center">
          <p className="text-muted-foreground">Pitch not found</p>
          <Link to="/dashboard" className="text-primary hover:underline mt-2 inline-block">
            Return to dashboard
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const insights = pitch.insights as unknown as Insights | null;

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                {pitch.city}{pitch.locality && `, ${pitch.locality}`}
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Building className="h-4 w-4" />
                  <span className="capitalize">{pitch.property_type}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Target className="h-4 w-4" />
                  {goalLabels[pitch.client_goal] || pitch.client_goal}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {pitch.time_horizon} year horizon
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm" onClick={handleRegenerate} className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Regenerate
              </Button>
              <Link to={`/pitch/new?edit=${pitch.id}`}>
                <Button variant="outline" size="sm" className="gap-2">
                  <Edit className="h-4 w-4" />
                  Edit Inputs
                </Button>
              </Link>
              <Button size="sm" onClick={handleDownload} className="gap-2">
                <Download className="h-4 w-4" />
                Download PPT
              </Button>
            </div>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="space-y-6">
          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <MarketRateChart currentRate={pitch.market_rate || 12500} />
            <BrokerageChart agentRate={pitch.brokerage_rate || 2.0} />
          </div>

          {/* ROI Chart */}
          <ROIChart
            projectedROI={pitch.projected_roi || 18}
            timeHorizon={pitch.time_horizon}
          />

          {/* Market Insights */}
          {insights && <MarketInsights insights={insights} />}

          {/* Slide Preview */}
          <SlidePreview
            city={pitch.city}
            locality={pitch.locality || undefined}
            propertyType={pitch.property_type}
            projectedROI={pitch.projected_roi || 18}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PitchDetail;
