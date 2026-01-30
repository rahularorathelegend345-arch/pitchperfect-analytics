import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { PlusCircle, MapPin, TrendingUp, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

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

const goalLabels: Record<string, string> = {
  investment: "Investment",
  "end-use": "End Use",
  "rental-yield": "Rental Yield",
};

const Pitches = () => {
  const { user } = useAuth();
  const [pitches, setPitches] = useState<Pitch[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchPitches = async () => {
      if (!user) return;

      try {
        const { data } = await supabase
          .from("pitches")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        setPitches(data || []);
      } catch (error) {
        console.error("Error fetching pitches:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPitches();
  }, [user]);

  const filteredPitches = pitches.filter(
    (pitch) =>
      pitch.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pitch.locality?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">All Pitches</h1>
            <p className="text-muted-foreground mt-1">
              {pitches.length} pitch{pitches.length !== 1 ? "es" : ""} created
            </p>
          </div>
          <Link to="/pitch/new">
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Create New Pitch
            </Button>
          </Link>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by city or locality..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 max-w-md"
          />
        </div>

        {/* Pitches List */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-10 w-10 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          </div>
        ) : filteredPitches.length === 0 ? (
          <div className="bg-card rounded-lg border p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
              <MapPin className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-foreground mb-2">
              {searchQuery ? "No pitches found" : "No pitches yet"}
            </h3>
            <p className="text-sm text-muted-foreground mb-4">
              {searchQuery
                ? "Try a different search term"
                : "Create your first pitch to start analyzing market data"}
            </p>
            {!searchQuery && (
              <Link to="/pitch/new">
                <Button>Create your first pitch</Button>
              </Link>
            )}
          </div>
        ) : (
          <div className="bg-card rounded-lg border overflow-hidden">
            <div className="divide-y">
              {filteredPitches.map((pitch) => (
                <Link
                  key={pitch.id}
                  to={`/pitch/${pitch.id}`}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">
                      {pitch.city}
                      {pitch.locality && `, ${pitch.locality}`}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground capitalize">
                        {pitch.property_type}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {goalLabels[pitch.client_goal] || pitch.client_goal}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          pitch.status === "completed"
                            ? "bg-success/10 text-success"
                            : pitch.status === "processing"
                            ? "bg-warning/10 text-warning"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {pitch.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    {pitch.projected_roi && pitch.status === "completed" && (
                      <div className="flex items-center gap-1 text-success">
                        <TrendingUp className="h-4 w-4" />
                        <span className="text-sm font-medium">{pitch.projected_roi}%</span>
                      </div>
                    )}
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(new Date(pitch.created_at), "MMM d, yyyy")}
                    </p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Pitches;
