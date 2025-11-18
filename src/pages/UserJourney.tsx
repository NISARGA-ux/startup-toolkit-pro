import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Plus, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface Step {
  id: string;
  title: string;
  description: string;
}

const UserJourney = () => {
  const [journeyName, setJourneyName] = useState("");
  const [steps, setSteps] = useState<Step[]>([
    { id: "1", title: "", description: "" },
  ]);

  const addStep = () => {
    setSteps([...steps, { id: Date.now().toString(), title: "", description: "" }]);
  };

  const removeStep = (id: string) => {
    if (steps.length > 1) {
      setSteps(steps.filter(s => s.id !== id));
    }
  };

  const updateStep = (id: string, field: "title" | "description", value: string) => {
    setSteps(steps.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  const saveJourney = () => {
    if (!journeyName) {
      toast.error("Please enter a journey name");
      return;
    }
    localStorage.setItem("userJourney", JSON.stringify({ journeyName, steps }));
    toast.success("Journey saved!");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link to="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Tools
          </Button>
        </Link>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl">User Journey Mapper</CardTitle>
            <CardDescription>Map out your user's experience step by step</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="journey-name">Journey Name</Label>
              <Input
                id="journey-name"
                placeholder="e.g., New User Onboarding"
                value={journeyName}
                onChange={(e) => setJourneyName(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <div key={step.id}>
                  <div className="p-4 border rounded-lg space-y-3">
                    <div className="flex justify-between items-center">
                      <Label className="text-base">Step {index + 1}</Label>
                      {steps.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeStep(step.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                    <Input
                      placeholder="Step title"
                      value={step.title}
                      onChange={(e) => updateStep(step.id, "title", e.target.value)}
                    />
                    <Textarea
                      placeholder="Describe what happens in this step"
                      value={step.description}
                      onChange={(e) => updateStep(step.id, "description", e.target.value)}
                      rows={2}
                    />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex justify-center py-2">
                      <ArrowRight className="w-5 h-5 text-muted-foreground" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <Button onClick={addStep} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Step
            </Button>

            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm font-medium mb-2">Journey Summary</div>
              <div className="text-sm text-muted-foreground">
                Total Steps: {steps.length}
              </div>
            </div>

            <Button onClick={saveJourney} className="w-full" size="lg">
              Save Journey
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserJourney;
