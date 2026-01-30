import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { PitchFormData } from "@/pages/NewPitch";
import { MapPin, Building, Target, Wallet, Clock, Sparkles } from "lucide-react";

interface PitchFormProps {
  onSubmit: (data: PitchFormData) => void;
}

const PitchForm = ({ onSubmit }: PitchFormProps) => {
  const [city, setCity] = useState("");
  const [locality, setLocality] = useState("");
  const [propertyType, setPropertyType] = useState<"residential" | "commercial">("residential");
  const [clientGoal, setClientGoal] = useState<"investment" | "end-use" | "rental-yield">("investment");
  const [budgetMin, setBudgetMin] = useState(5000000);
  const [budgetMax, setBudgetMax] = useState(20000000);
  const [timeHorizon, setTimeHorizon] = useState([5]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    onSubmit({
      city,
      locality,
      propertyType,
      clientGoal,
      budgetMin,
      budgetMax,
      timeHorizon: timeHorizon[0],
    });
  };

  const formatCurrency = (value: number) => {
    if (value >= 10000000) {
      return `₹${(value / 10000000).toFixed(1)} Cr`;
    }
    return `₹${(value / 100000).toFixed(0)} L`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Location Section */}
      <div className="bg-card rounded-lg border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <MapPin className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Location</h3>
            <p className="text-sm text-muted-foreground">Where is the property located?</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              placeholder="e.g., Mumbai, Bangalore"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="locality">Locality / Area</Label>
            <Input
              id="locality"
              placeholder="e.g., Bandra, Whitefield"
              value={locality}
              onChange={(e) => setLocality(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Property Type Section */}
      <div className="bg-card rounded-lg border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Building className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Property Type</h3>
            <p className="text-sm text-muted-foreground">What type of property?</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setPropertyType("residential")}
            className={`p-4 rounded-lg border-2 transition-all ${
              propertyType === "residential"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="text-left">
              <p className="font-medium text-foreground">Residential</p>
              <p className="text-sm text-muted-foreground mt-1">
                Apartments, villas, plots
              </p>
            </div>
          </button>
          <button
            type="button"
            onClick={() => setPropertyType("commercial")}
            className={`p-4 rounded-lg border-2 transition-all ${
              propertyType === "commercial"
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="text-left">
              <p className="font-medium text-foreground">Commercial</p>
              <p className="text-sm text-muted-foreground mt-1">
                Office, retail, warehouse
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Client Goal Section */}
      <div className="bg-card rounded-lg border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Target className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Client Goal</h3>
            <p className="text-sm text-muted-foreground">What's the primary objective?</p>
          </div>
        </div>
        <Select value={clientGoal} onValueChange={(v) => setClientGoal(v as typeof clientGoal)}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="investment">
              <span className="flex items-center gap-2">
                Investment — Capital appreciation focus
              </span>
            </SelectItem>
            <SelectItem value="end-use">
              <span className="flex items-center gap-2">
                End Use — Personal/business occupancy
              </span>
            </SelectItem>
            <SelectItem value="rental-yield">
              <span className="flex items-center gap-2">
                Rental Yield — Passive income focus
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Budget Section */}
      <div className="bg-card rounded-lg border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Wallet className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Budget Range</h3>
            <p className="text-sm text-muted-foreground">Client's investment capacity</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="budgetMin">Minimum Budget</Label>
            <Input
              id="budgetMin"
              type="number"
              value={budgetMin}
              onChange={(e) => setBudgetMin(Number(e.target.value))}
              min={0}
            />
            <p className="text-sm text-muted-foreground">{formatCurrency(budgetMin)}</p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="budgetMax">Maximum Budget</Label>
            <Input
              id="budgetMax"
              type="number"
              value={budgetMax}
              onChange={(e) => setBudgetMax(Number(e.target.value))}
              min={budgetMin}
            />
            <p className="text-sm text-muted-foreground">{formatCurrency(budgetMax)}</p>
          </div>
        </div>
      </div>

      {/* Time Horizon Section */}
      <div className="bg-card rounded-lg border p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Investment Horizon</h3>
            <p className="text-sm text-muted-foreground">Expected holding period</p>
          </div>
        </div>
        <div className="space-y-4">
          <Slider
            value={timeHorizon}
            onValueChange={setTimeHorizon}
            min={1}
            max={15}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>1 year</span>
            <span className="font-medium text-foreground">{timeHorizon[0]} years</span>
            <span>15 years</span>
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        className="w-full gap-2"
        disabled={!city || isSubmitting}
      >
        <Sparkles className="h-5 w-5" />
        Analyze Market & Generate Pitch
      </Button>
    </form>
  );
};

export default PitchForm;
