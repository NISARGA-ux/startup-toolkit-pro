import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PitchGenerator from "./pages/PitchGenerator";
import LogoGenerator from "./pages/LogoGenerator";
import ShareholderCalculator from "./pages/ShareholderCalculator";
import VestingSchedule from "./pages/VestingSchedule";
import BurnRate from "./pages/BurnRate";
import UserJourney from "./pages/UserJourney";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/pitch-generator" element={<PitchGenerator />} />
          <Route path="/logo-generator" element={<LogoGenerator />} />
          <Route path="/shareholder-calculator" element={<ShareholderCalculator />} />
          <Route path="/vesting-schedule" element={<VestingSchedule />} />
          <Route path="/burn-rate" element={<BurnRate />} />
          <Route path="/user-journey" element={<UserJourney />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
