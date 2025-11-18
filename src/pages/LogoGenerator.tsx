import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Download } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const LogoGenerator = () => {
  const [companyName, setCompanyName] = useState("");
  const [color, setColor] = useState("#0ea5e9");
  const [initials, setInitials] = useState("");

  const generateInitials = () => {
    if (!companyName) {
      toast.error("Please enter a company name");
      return;
    }
    const words = companyName.trim().split(" ");
    const generated = words.map(word => word[0]).join("").toUpperCase().slice(0, 2);
    setInitials(generated);
    toast.success("Logo generated!");
  };

  const downloadLogo = () => {
    const svg = document.getElementById("logo-preview");
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 400;
    const ctx = canvas.getContext("2d");
    
    const img = new Image();
    img.onload = () => {
      ctx?.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${companyName.replace(/\s+/g, "-").toLowerCase()}-logo.png`;
          a.click();
          toast.success("Logo downloaded!");
        }
      });
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
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
            <CardTitle className="text-3xl">Logo Placeholder Generator</CardTitle>
            <CardDescription>Create a simple, professional logo for your startup</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input
                id="company"
                placeholder="Your Startup"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="color">Brand Color</Label>
              <div className="flex gap-3 items-center">
                <Input
                  id="color"
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  className="w-20 h-12 cursor-pointer"
                />
                <Input
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="#0ea5e9"
                />
              </div>
            </div>

            <Button onClick={generateInitials} className="w-full" size="lg">
              Generate Logo
            </Button>

            {initials && (
              <div className="mt-6 space-y-4">
                <div className="flex justify-center p-8 bg-muted rounded-lg">
                  <svg id="logo-preview" width="200" height="200" viewBox="0 0 200 200">
                    <rect width="200" height="200" rx="20" fill={color} />
                    <text
                      x="100"
                      y="100"
                      fontSize="80"
                      fontWeight="bold"
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="white"
                    >
                      {initials}
                    </text>
                  </svg>
                </div>
                <Button onClick={downloadLogo} variant="outline" className="w-full">
                  <Download className="w-4 h-4 mr-2" />
                  Download PNG
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LogoGenerator;
