import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import PitchForm from "@/components/PitchForm";
import ProcessingSteps from "@/components/ProcessingSteps";
import { useToast } from "@/hooks/use-toast";

export interface PitchFormData {
  city: string;
  locality: string;
  propertyType: "residential" | "commercial";
  clientGoal: "investment" | "end-use" | "rental-yield";
  budgetMin: number;
  budgetMax: number;
  timeHorizon: number;
}

const NewPitch = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [pitchId, setPitchId] = useState<string | null>(null);

  const handleSubmit = async (data: PitchFormData) => {
    if (!user) return;

    try {
      // Create pitch in database
      const { data: pitch, error } = await supabase
        .from("pitches")
        .insert({
          user_id: user.id,
          city: data.city,
          locality: data.locality || null,
          property_type: data.propertyType,
          client_goal: data.clientGoal,
          budget_min: data.budgetMin,
          budget_max: data.budgetMax,
          time_horizon: data.timeHorizon,
          status: "processing",
        })
        .select()
        .single();

      if (error) throw error;

      setPitchId(pitch.id);
      setIsProcessing(true);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create pitch",
        variant: "destructive",
      });
    }
  };

  const handleProcessingComplete = async () => {
    if (!pitchId) return;

    // Generate mock analytics data
    const marketRate = Math.floor(Math.random() * 5000) + 8000;
    const brokerageRate = Math.floor(Math.random() * 10) / 10 + 1.5;
    const projectedROI = Math.floor(Math.random() * 15) + 12;

    const insights = {
      demandDrivers: [
        "Strong infrastructure development in the area",
        "Proximity to IT corridors driving residential demand",
        "New metro line connectivity improving accessibility",
      ],
      growthSignals: [
        "15% YoY appreciation in the micro-market",
        "Upcoming commercial developments within 5km radius",
        "Government infrastructure spending of ₹2,500 Cr announced",
      ],
      riskFactors: [
        "Moderate supply in the mid-segment",
        "Interest rate sensitivity for investment buyers",
        "Construction timeline delays in some projects",
      ],
      investmentAttractiveness: "High",
    };

    try {
      const { error } = await supabase
        .from("pitches")
        .update({
          status: "completed",
          market_rate: marketRate,
          brokerage_rate: brokerageRate,
          projected_roi: projectedROI,
          insights: insights,
        })
        .eq("id", pitchId);

      if (error) throw error;

      navigate(`/pitch/${pitchId}`);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to save analytics",
        variant: "destructive",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-4xl mx-auto">
        {isProcessing ? (
          <ProcessingSteps onComplete={handleProcessingComplete} />
        ) : (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-bold text-foreground">
                Create New Pitch
              </h1>
              <p className="text-muted-foreground mt-1">
                Enter property details to generate market analysis and pitch deck
              </p>
            </div>
            <PitchForm onSubmit={handleSubmit} />
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default NewPitch;
