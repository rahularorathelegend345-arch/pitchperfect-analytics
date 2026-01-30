import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import KPICard from "@/components/KPICard";
import RecentPitches from "@/components/RecentPitches";
import { Button } from "@/components/ui/button";
import { PlusCircle, FileText, TrendingUp, MapPin } from "lucide-react";

interface Profile {
  full_name: string | null;
  email: string | null;
}

interface Pitch {
  id: string;
  city: string;
  locality: string | null;
  property_type: string;
  client_goal: string;
  status: string;
  projected_roi: number | null;
  created_at: string;
}

const Dashboard = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [pitches, setPitches] = useState<Pitch[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;

      try {
        // Fetch profile
        const { data: profileData } = await supabase
          .from("profiles")
          .select("full_name, email")
          .eq("user_id", user.id)
          .maybeSingle();

        setProfile(profileData);

        // Fetch pitches
        const { data: pitchesData } = await supabase
          .from("pitches")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(5);

        setPitches(pitchesData || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const completedPitches = pitches.filter((p) => p.status === "completed");
  const averageROI = completedPitches.length > 0
    ? Math.round(
        completedPitches.reduce((acc, p) => acc + (p.projected_roi || 0), 0) /
          completedPitches.length
      )
    : 0;
  const lastLocation = pitches[0]
    ? `${pitches[0].city}${pitches[0].locality ? `, ${pitches[0].locality}` : ""}`
    : "—";

  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split("@")[0] || "there";

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Welcome back, {displayName}
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's an overview of your pitch performance
            </p>
          </div>
          <Link to="/pitch/new">
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Create New Pitch
            </Button>
          </Link>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <KPICard
            title="Total Pitches"
            value={pitches.length}
            subtitle="All time"
            icon={FileText}
            trend={
              pitches.length > 0
                ? { value: 12, label: "vs last month", positive: true }
                : undefined
            }
          />
          <KPICard
            title="Average ROI"
            value={averageROI > 0 ? `${averageROI}%` : "—"}
            subtitle="Projected returns"
            icon={TrendingUp}
            trend={
              averageROI > 0
                ? { value: 3.2, label: "vs market avg", positive: true }
                : undefined
            }
          />
          <KPICard
            title="Last Analyzed"
            value={lastLocation}
            subtitle={pitches[0] ? "Most recent location" : "No pitches yet"}
            icon={MapPin}
          />
        </div>

        {/* Recent Pitches */}
        <RecentPitches
          pitches={pitches.map((p) => ({
            id: p.id,
            city: p.city,
            locality: p.locality || undefined,
            property_type: p.property_type,
            client_goal: p.client_goal,
            status: p.status,
            projected_roi: p.projected_roi || undefined,
            created_at: p.created_at,
          }))}
        />
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
