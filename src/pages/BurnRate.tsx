import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

interface Expense {
  id: string;
  name: string;
  amount: number;
}

const BurnRate = () => {
  const [balance, setBalance] = useState<number>(100000);
  const [expenses, setExpenses] = useState<Expense[]>([
    { id: "1", name: "", amount: 0 },
  ]);

  const addExpense = () => {
    setExpenses([...expenses, { id: Date.now().toString(), name: "", amount: 0 }]);
  };

  const removeExpense = (id: string) => {
    if (expenses.length > 1) {
      setExpenses(expenses.filter(e => e.id !== id));
    }
  };

  const updateExpense = (id: string, field: "name" | "amount", value: string | number) => {
    setExpenses(expenses.map(e => 
      e.id === id ? { ...e, [field]: value } : e
    ));
  };

  const monthlyBurn = expenses.reduce((sum, e) => sum + (e.amount || 0), 0);
  const runway = balance > 0 && monthlyBurn > 0 ? (balance / monthlyBurn).toFixed(1) : "∞";

  const saveData = () => {
    localStorage.setItem("burnRateData", JSON.stringify({ balance, expenses }));
    toast.success("Data saved!");
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
            <CardTitle className="text-3xl">Burn Rate Calculator</CardTitle>
            <CardDescription>Track monthly burn and calculate runway</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="balance">Current Balance ($)</Label>
              <Input
                id="balance"
                type="number"
                placeholder="100000"
                value={balance || ""}
                onChange={(e) => setBalance(parseInt(e.target.value) || 0)}
              />
            </div>

            <div className="space-y-3">
              <Label>Monthly Expenses</Label>
              {expenses.map((expense, index) => (
                <div key={expense.id} className="flex gap-2">
                  <Input
                    placeholder="Expense name"
                    value={expense.name}
                    onChange={(e) => updateExpense(expense.id, "name", e.target.value)}
                  />
                  <Input
                    type="number"
                    placeholder="Amount"
                    className="w-40"
                    value={expense.amount || ""}
                    onChange={(e) => updateExpense(expense.id, "amount", parseInt(e.target.value) || 0)}
                  />
                  {expenses.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeExpense(expense.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button onClick={addExpense} variant="outline" className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add Expense
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 p-6 bg-secondary rounded-lg">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Monthly Burn</div>
                <div className="text-3xl font-bold text-destructive">
                  ${monthlyBurn.toLocaleString()}
                </div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground mb-1">Runway</div>
                <div className="text-3xl font-bold text-primary">
                  {runway} {runway !== "∞" && "months"}
                </div>
              </div>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <div className="text-sm font-medium mb-2">Burn Rate Breakdown</div>
              {expenses.filter(e => e.amount > 0).map(expense => (
                <div key={expense.id} className="flex justify-between py-1">
                  <span className="text-sm">{expense.name || "Unnamed expense"}</span>
                  <span className="text-sm font-medium">${expense.amount.toLocaleString()}</span>
                </div>
              ))}
            </div>

            <Button onClick={saveData} className="w-full" size="lg">
              Save Data
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export function BurnRate() {
return (
<div className="max-w-md">
<h2 className="text-2xl font-bold mb-4">Burn Rate Calculator</h2>
<input type="number" className="w-full p-3 rounded bg-slate-800 mb-3" placeholder="Monthly expenses" />
<input type="number" className="w-full p-3 rounded bg-slate-800 mb-3" placeholder="Cash available" />
<div className="bg-slate-900 p-4 rounded">
<p className="text-slate-400">Runway</p>
<p className="text-xl font-bold">— months</p>
</div>
</div>
);
}
export default BurnRate;
