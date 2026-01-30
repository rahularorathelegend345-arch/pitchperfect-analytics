import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { MapPin, Building, TrendingUp, ChevronRight } from "lucide-react";

interface Pitch {
  id: string;
  city: string;
  locality?: string;
  property_type: string;
  client_goal: string;
  status: string;
  projected_roi?: number;
  created_at: string;
}

interface RecentPitchesProps {
  pitches: Pitch[];
}

const goalLabels: Record<string, string> = {
  investment: "Investment",
  "end-use": "End Use",
  "rental-yield": "Rental Yield",
};

const RecentPitches = ({ pitches }: RecentPitchesProps) => {
  if (pitches.length === 0) {
    return (
      <div className="bg-card rounded-lg border p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
          <Building className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="font-semibold text-foreground mb-2">No pitches yet</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Create your first pitch to start analyzing market data
        </p>
        <Link
          to="/pitch/new"
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          Create your first pitch
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-lg border overflow-hidden">
      <div className="px-6 py-4 border-b">
        <h3 className="font-semibold text-foreground">Recent Pitches</h3>
      </div>
      <div className="divide-y">
        {pitches.map((pitch) => (
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
                {pitch.city}{pitch.locality && `, ${pitch.locality}`}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground capitalize">
                  {pitch.property_type}
                </span>
                <span className="text-xs text-muted-foreground">•</span>
                <span className="text-xs text-muted-foreground">
                  {goalLabels[pitch.client_goal] || pitch.client_goal}
                </span>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              {pitch.projected_roi && (
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
  );
};

export default RecentPitches;
