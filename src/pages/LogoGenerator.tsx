import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Download, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type LogoStyle = "rounded" | "circle" | "gradient" | "minimal";

const LogoGenerator = () => {
  const [companyName, setCompanyName] = useState("");
  const [color, setColor] = useState("#0ea5e9");
  const [secondaryColor, setSecondaryColor] = useState("#06b6d4");
  const [initials, setInitials] = useState("");
  const [style, setStyle] = useState<LogoStyle>("rounded");

  const colorPresets = [
    { name: "Sky", primary: "#0ea5e9", secondary: "#06b6d4" },
    { name: "Violet", primary: "#8b5cf6", secondary: "#a78bfa" },
    { name: "Rose", primary: "#f43f5e", secondary: "#fb7185" },
    { name: "Emerald", primary: "#10b981", secondary: "#34d399" },
    { name: "Amber", primary: "#f59e0b", secondary: "#fbbf24" },
    { name: "Slate", primary: "#475569", secondary: "#64748b" },
  ];

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

  const downloadLogo = (size: number = 512) => {
    const svg = document.getElementById(`logo-${style}`);
    if (!svg) return;

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    
    const img = new Image();
    img.onload = () => {
      ctx?.drawImage(img, 0, 0, size, size);
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${companyName.replace(/\s+/g, "-").toLowerCase()}-logo-${size}px.png`;
          a.click();
          toast.success(`Logo downloaded (${size}x${size}px)!`);
        }
      });
    };
    img.src = "data:image/svg+xml;base64," + btoa(svgData);
  };

  const renderLogo = (logoStyle: LogoStyle, id: string, size: number = 200) => {
    const commonProps = {
      id,
      width: size,
      height: size,
      viewBox: `0 0 ${size} ${size}`,
    };

    switch (logoStyle) {
      case "circle":
        return (
          <svg {...commonProps}>
            <circle cx={size / 2} cy={size / 2} r={size / 2} fill={color} />
            <text
              x={size / 2}
              y={size / 2}
              fontSize={size * 0.4}
              fontWeight="bold"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
            >
              {initials}
            </text>
          </svg>
        );
      case "gradient":
        return (
          <svg {...commonProps}>
            <defs>
              <linearGradient id={`grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: color, stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: secondaryColor, stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <rect width={size} height={size} rx={size * 0.1} fill={`url(#grad-${id})`} />
            <text
              x={size / 2}
              y={size / 2}
              fontSize={size * 0.4}
              fontWeight="bold"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
            >
              {initials}
            </text>
          </svg>
        );
      case "minimal":
        return (
          <svg {...commonProps}>
            <rect width={size} height={size} fill="white" />
            <text
              x={size / 2}
              y={size / 2}
              fontSize={size * 0.4}
              fontWeight="600"
              textAnchor="middle"
              dominantBaseline="middle"
              fill={color}
            >
              {initials}
            </text>
          </svg>
        );
      default: // rounded
        return (
          <svg {...commonProps}>
            <rect width={size} height={size} rx={size * 0.1} fill={color} />
            <text
              x={size / 2}
              y={size / 2}
              fontSize={size * 0.4}
              fontWeight="bold"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
            >
              {initials}
            </text>
          </svg>
        );
    }
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
            <CardTitle className="text-3xl flex items-center gap-2">
              <Sparkles className="w-8 h-8 text-primary" />
              Logo Generator
            </CardTitle>
            <CardDescription>Create beautiful, professional logos for your startup in seconds</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
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
                  <Label>Color Presets</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {colorPresets.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => {
                          setColor(preset.primary);
                          setSecondaryColor(preset.secondary);
                        }}
                        className="flex flex-col items-center gap-1 p-2 rounded-lg border-2 hover:border-primary transition-colors"
                        style={{
                          borderColor: color === preset.primary ? preset.primary : "transparent",
                        }}
                      >
                        <div
                          className="w-full h-8 rounded"
                          style={{
                            background: `linear-gradient(135deg, ${preset.primary}, ${preset.secondary})`,
                          }}
                        />
                        <span className="text-xs text-muted-foreground">{preset.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="color">Custom Colors</Label>
                  <div className="flex gap-3">
                    <div className="flex-1">
                      <Label className="text-xs text-muted-foreground mb-1">Primary</Label>
                      <Input
                        id="color"
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        className="w-full h-12 cursor-pointer"
                      />
                    </div>
                    <div className="flex-1">
                      <Label className="text-xs text-muted-foreground mb-1">Secondary</Label>
                      <Input
                        type="color"
                        value={secondaryColor}
                        onChange={(e) => setSecondaryColor(e.target.value)}
                        className="w-full h-12 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <Button onClick={generateInitials} className="w-full" size="lg">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Logo
                </Button>
              </div>

              {initials && (
                <div className="space-y-4">
                  <Label>Preview</Label>
                  <Tabs value={style} onValueChange={(v) => setStyle(v as LogoStyle)}>
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="rounded">Rounded</TabsTrigger>
                      <TabsTrigger value="circle">Circle</TabsTrigger>
                      <TabsTrigger value="gradient">Gradient</TabsTrigger>
                      <TabsTrigger value="minimal">Minimal</TabsTrigger>
                    </TabsList>
                    <TabsContent value={style} className="mt-4">
                      <div className="flex justify-center p-8 bg-muted rounded-lg">
                        {renderLogo(style, `logo-${style}`, 200)}
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              )}
            </div>

            {initials && (
              <div className="space-y-3 pt-4 border-t">
                <Label>Download Options</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  <Button onClick={() => downloadLogo(256)} variant="outline" size="sm">
                    <Download className="w-3 h-3 mr-2" />
                    256px
                  </Button>
                  <Button onClick={() => downloadLogo(512)} variant="outline" size="sm">
                    <Download className="w-3 h-3 mr-2" />
                    512px
                  </Button>
                  <Button onClick={() => downloadLogo(1024)} variant="outline" size="sm">
                    <Download className="w-3 h-3 mr-2" />
                    1024px
                  </Button>
                  <Button onClick={() => downloadLogo(2048)} variant="outline" size="sm">
                    <Download className="w-3 h-3 mr-2" />
                    2048px
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LogoGenerator;
