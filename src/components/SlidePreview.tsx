import { FileText, BarChart3, PieChart, TrendingUp, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface SlidePreviewProps {
  city: string;
  locality?: string;
  propertyType: string;
  projectedROI: number;
}

const slides = [
  {
    id: 1,
    title: "Executive Summary",
    icon: FileText,
    description: "Investment overview and key highlights",
    color: "bg-primary/10 text-primary",
  },
  {
    id: 2,
    title: "Market Rate Analysis",
    icon: BarChart3,
    description: "Current pricing trends and historical data",
    color: "bg-accent/10 text-accent",
  },
  {
    id: 3,
    title: "Brokerage Breakdown",
    icon: PieChart,
    description: "Competitive brokerage comparison",
    color: "bg-success/10 text-success",
  },
  {
    id: 4,
    title: "ROI & Investment Rationale",
    icon: TrendingUp,
    description: "Projected returns and investment thesis",
    color: "bg-warning/10 text-warning",
  },
  {
    id: 5,
    title: "Final Recommendation",
    icon: CheckCircle,
    description: "Actionable next steps for the client",
    color: "bg-primary/10 text-primary",
  },
];

const SlidePreview = ({ city, locality, propertyType, projectedROI }: SlidePreviewProps) => {
  return (
    <div className="bg-card rounded-lg border p-6">
      <div className="mb-6">
        <h3 className="font-semibold text-foreground">Pitch Deck Preview</h3>
        <p className="text-sm text-muted-foreground mt-1">
          5 slides ready for presentation
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="slide-preview group cursor-pointer"
          >
            {/* Slide thumbnail */}
            <div className="aspect-[16/10] bg-gradient-hero border-b flex flex-col items-center justify-center p-4">
              <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center mb-2", slide.color)}>
                <slide.icon className="h-5 w-5" />
              </div>
              <p className="text-xs font-medium text-foreground text-center line-clamp-1">
                {slide.title}
              </p>
              {index === 0 && (
                <p className="text-[10px] text-muted-foreground mt-1 text-center">
                  {city}{locality && `, ${locality}`}
                </p>
              )}
              {index === 3 && (
                <p className="text-[10px] text-success font-medium mt-1">
                  {projectedROI}% ROI
                </p>
              )}
            </div>

            {/* Slide info */}
            <div className="p-3">
              <p className="text-xs font-medium text-foreground line-clamp-1">
                Slide {slide.id}
              </p>
              <p className="text-[10px] text-muted-foreground line-clamp-2 mt-0.5">
                {slide.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlidePreview;
