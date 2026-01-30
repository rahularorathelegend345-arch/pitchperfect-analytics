import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  BarChart3, 
  FileText, 
  TrendingUp, 
  CheckCircle,
  ArrowRight,
  Sparkles
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate("/dashboard");
      }
    };
    checkAuth();
  }, [navigate]);

  const features = [
    {
      icon: BarChart3,
      title: "Market Analytics",
      description: "Real-time market rates, trends, and competitive analysis at your fingertips.",
    },
    {
      icon: TrendingUp,
      title: "ROI Projections",
      description: "Data-driven return estimates with appreciation and rental yield breakdowns.",
    },
    {
      icon: FileText,
      title: "Auto-Generated Decks",
      description: "Professional pitch presentations created instantly from your analysis.",
    },
  ];

  const benefits = [
    "McKinsey-grade market analysis",
    "Instant PPT generation",
    "Competitive brokerage insights",
    "AI-powered market signals",
    "Client-ready presentations",
    "Data-backed recommendations",
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
                <Building2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg text-foreground">PitchEstate</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/auth">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/auth">
                <Button size="sm">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-6">
            <Sparkles className="h-4 w-4" />
            Consulting-grade analytics for real estate
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            Pitch Real Estate Like a{" "}
            <span className="text-primary">Top-Tier Consultant</span>
          </h1>
          
          <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Transform market data into compelling, client-ready pitch decks. 
            Analyze rates, project ROI, and close deals with confidence.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth">
              <Button size="lg" className="gap-2 px-8">
                Start Creating Pitches
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="lg">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">
              Everything You Need to Close Deals
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Professional tools designed for real estate agents who want to stand out
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-card rounded-xl border p-6 shadow-card hover:shadow-card-hover transition-shadow"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">
                Why Top Agents Choose PitchEstate
              </h2>
              <p className="text-muted-foreground mb-8">
                Stop guessing. Start presenting data-driven insights that clients trust.
                Our platform transforms complex market data into compelling narratives.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-3 w-3 text-success" />
                    </div>
                    <span className="text-sm text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl border p-8 shadow-card">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">₹12,500</p>
                    <p className="text-sm text-muted-foreground">Avg. market rate/sq ft</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-success">+18%</p>
                    <p className="text-sm text-muted-foreground">Projected 5-year ROI</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">5 slides</p>
                    <p className="text-sm text-muted-foreground">Auto-generated deck</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your Pitches?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join real estate professionals who close more deals with data-driven presentations.
          </p>
          <Link to="/auth">
            <Button size="lg" variant="secondary" className="gap-2 px-8">
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Building2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">PitchEstate</span>
          </div>
          <p className="text-sm text-muted-foreground">
            © 2024 PitchEstate. Built for real estate professionals.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
