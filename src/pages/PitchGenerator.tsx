import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const PitchGenerator = () => {
  const [target, setTarget] = useState("");
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [pitch, setPitch] = useState("");

  const generatePitch = () => {
    if (!target || !problem || !solution) {
      toast.error("Please fill in all fields");
      return;
    }

    const templates = [
      `We help ${target} ${solution} so they can ${problem.replace("struggle with", "overcome")}`,
      `${target} struggle with ${problem}. We solve this by ${solution}`,
      `We're building ${solution} for ${target} who ${problem}`,
      `The ${solution} for ${target} who ${problem}`,
    ];

    const randomPitch = templates[Math.floor(Math.random() * templates.length)];
    setPitch(randomPitch);
    
    // Save to localStorage
    localStorage.setItem("lastPitch", JSON.stringify({ target, problem, solution, pitch: randomPitch }));
    toast.success("Pitch generated!");
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

        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-primary" />
              One-Line Pitch Generator
            </CardTitle>
            <CardDescription>Answer a few questions to generate your perfect pitch</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="target">Who is your target customer?</Label>
              <Input
                id="target"
                placeholder="e.g., busy founders, small businesses, developers"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="problem">What problem do they have?</Label>
              <Input
                id="problem"
                placeholder="e.g., struggle with managing their time"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="solution">What's your solution?</Label>
              <Input
                id="solution"
                placeholder="e.g., an AI-powered scheduling assistant"
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
              />
            </div>

            <Button onClick={generatePitch} className="w-full" size="lg">
              Generate Pitch
            </Button>

            {pitch && (
              <div className="mt-6 p-6 bg-secondary rounded-lg border-2 border-primary">
                <p className="text-lg font-medium text-center">{pitch}</p>
                <Button
                  variant="outline"
                  className="w-full mt-4"
                  onClick={() => {
                    navigator.clipboard.writeText(pitch);
                    toast.success("Copied to clipboard!");
                  }}
                >
                  Copy to Clipboard
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export function Pitch() {
return (
<div className="max-w-xl">
<h2 className="text-2xl font-bold mb-4">One‑Line Pitch</h2>
<input className="w-full p-3 rounded bg-slate-800 mb-3" placeholder="Target user" />
<input className="w-full p-3 rounded bg-slate-800 mb-3" placeholder="Problem" />
<input className="w-full p-3 rounded bg-slate-800 mb-3" placeholder="Solution" />
<div className="bg-slate-900 p-4 rounded mt-4">
<p className="text-slate-400">Live Preview</p>
<p className="font-semibold">We help ___ solve ___ using ___</p>
</div>
</div>
);
}
export default PitchGenerator;
