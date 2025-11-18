import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface Shareholder {
  id: string;
  name: string;
  shares: number;
}

const ShareholderCalculator = () => {
  const [shareholders, setShareholders] = useState<Shareholder[]>([
    { id: "1", name: "", shares: 0 },
  ]);

  const addShareholder = () => {
    setShareholders([...shareholders, { id: Date.now().toString(), name: "", shares: 0 }]);
  };

  const removeShareholder = (id: string) => {
    if (shareholders.length > 1) {
      setShareholders(shareholders.filter(s => s.id !== id));
    }
  };

  const updateShareholder = (id: string, field: "name" | "shares", value: string | number) => {
    setShareholders(shareholders.map(s => 
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  const totalShares = shareholders.reduce((sum, s) => sum + (s.shares || 0), 0);

  const calculatePercentage = (shares: number) => {
    if (totalShares === 0) return 0;
    return ((shares / totalShares) * 100).toFixed(2);
  };

  const saveCalculation = () => {
    localStorage.setItem("shareholderData", JSON.stringify(shareholders));
    toast.success("Calculation saved!");
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
            <CardTitle className="text-3xl">Shareholder Calculator</CardTitle>
            <CardDescription>Calculate equity splits and ownership percentages</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {shareholders.map((shareholder, index) => (
              <div key={shareholder.id} className="p-4 border rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Shareholder {index + 1}</Label>
                  {shareholders.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeShareholder(shareholder.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    placeholder="Name"
                    value={shareholder.name}
                    onChange={(e) => updateShareholder(shareholder.id, "name", e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Shares"
                    value={shareholder.shares || ""}
                    onChange={(e) => updateShareholder(shareholder.id, "shares", parseInt(e.target.value) || 0)}
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  Ownership: {calculatePercentage(shareholder.shares)}%
                </div>
              </div>
            ))}

            <Button onClick={addShareholder} variant="outline" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Add Shareholder
            </Button>

            <div className="p-4 bg-secondary rounded-lg">
              <div className="text-sm font-medium mb-2">Summary</div>
              <div className="text-2xl font-bold">Total Shares: {totalShares.toLocaleString()}</div>
            </div>

            <Button onClick={saveCalculation} className="w-full" size="lg">
              Save Calculation
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ShareholderCalculator;
