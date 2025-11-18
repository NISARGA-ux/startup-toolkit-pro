import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calculator, Palette, Users, TrendingDown, Calendar, Map } from "lucide-react";

const tools = [
  {
    title: "Pitch Generator",
    description: "Generate a compelling one-line pitch for your startup",
    icon: Calendar,
    path: "/pitch-generator",
    color: "text-primary",
  },
  {
    title: "Logo Generator",
    description: "Create simple, professional logo placeholders",
    icon: Palette,
    path: "/logo-generator",
    color: "text-accent",
  },
  {
    title: "Shareholder Calculator",
    description: "Calculate equity splits and ownership percentages",
    icon: Users,
    path: "/shareholder-calculator",
    color: "text-success",
  },
  {
    title: "Vesting Schedule",
    description: "Visualize founder vesting schedules over time",
    icon: TrendingDown,
    path: "/vesting-schedule",
    color: "text-primary",
  },
  {
    title: "Burn Rate Calculator",
    description: "Track your monthly burn and runway",
    icon: Calculator,
    path: "/burn-rate",
    color: "text-destructive",
  },
  {
    title: "User Journey Mapper",
    description: "Map out your user's experience step by step",
    icon: Map,
    path: "/user-journey",
    color: "text-accent",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 text-foreground">Micro-Startup Tools</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Essential utilities for early-stage founders. Simple, practical, and built for speed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {tools.map((tool) => (
            <Link key={tool.path} to={tool.path}>
              <Card className="h-full transition-all hover:shadow-lg hover:scale-105 cursor-pointer border-border">
                <CardHeader>
                  <div className={`w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-3 ${tool.color}`}>
                    <tool.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{tool.title}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Launch Tool
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            All data is stored locally in your browser. No signup required.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
