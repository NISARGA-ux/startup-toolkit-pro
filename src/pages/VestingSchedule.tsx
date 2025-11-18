import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const VestingSchedule = () => {
  const [shares, setShares] = useState<number>(10000);
  const [cliff, setCliff] = useState<number>(12);
  const [duration, setDuration] = useState<number>(48);

  const calculateVesting = () => {
    const months = Array.from({ length: duration + 1 }, (_, i) => i);
    return months.map(month => {
      if (month < cliff) return { month, vested: 0 };
      const vested = (shares / duration) * month;
      return { month, vested: Math.floor(vested) };
    });
  };

  const schedule = calculateVesting();
  const maxVested = shares;

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
            <CardTitle className="text-3xl">Vesting Schedule Visualizer</CardTitle>
            <CardDescription>Visualize how founder shares vest over time</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="shares">Total Shares</Label>
                <Input
                  id="shares"
                  type="number"
                  value={shares}
                  onChange={(e) => setShares(parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cliff">Cliff (months)</Label>
                <Input
                  id="cliff"
                  type="number"
                  value={cliff}
                  onChange={(e) => setCliff(parseInt(e.target.value) || 0)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Duration (months)</Label>
                <Input
                  id="duration"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Vesting Timeline</h3>
              <div className="space-y-2">
                {schedule.filter((_, i) => i % 6 === 0 || i === schedule.length - 1).map(({ month, vested }) => (
                  <div key={month} className="flex items-center gap-3">
                    <div className="w-20 text-sm text-muted-foreground">
                      Month {month}
                    </div>
                    <div className="flex-1 h-8 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${(vested / maxVested) * 100}%` }}
                      />
                    </div>
                    <div className="w-32 text-sm font-medium text-right">
                      {vested.toLocaleString()} shares
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 p-4 bg-secondary rounded-lg">
              <div>
                <div className="text-sm text-muted-foreground">At Cliff ({cliff} months)</div>
                <div className="text-2xl font-bold">
                  {schedule[cliff]?.vested.toLocaleString() || 0}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Fully Vested ({duration} months)</div>
                <div className="text-2xl font-bold">
                  {shares.toLocaleString()}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VestingSchedule;
