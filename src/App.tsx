
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { BottomNavigation } from "./components/bottom-navigation";
import Index from "./pages/Index";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route 
            path="/dashboard" 
            element={
              <div className="flex flex-col h-screen bg-black">
                <div className="flex-1 overflow-auto pb-16">
                  <Dashboard />
                </div>
                <BottomNavigation />
              </div>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <div className="flex flex-col h-screen bg-black">
                <div className="flex-1 overflow-auto pb-16">
                  <Profile />
                </div>
                <BottomNavigation />
              </div>
            } 
          />
          <Route 
            path="/messages" 
            element={
              <div className="flex flex-col h-screen bg-black">
                <div className="flex-1 overflow-auto pb-16">
                  <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-bold text-white mb-6">Messages</h1>
                    <p className="text-white/70">This feature is coming soon...</p>
                  </div>
                </div>
                <BottomNavigation />
              </div>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <div className="flex flex-col h-screen bg-black">
                <div className="flex-1 overflow-auto pb-16">
                  <div className="container mx-auto px-4 py-8">
                    <h1 className="text-2xl font-bold text-white mb-6">Settings</h1>
                    <p className="text-white/70">This feature is coming soon...</p>
                  </div>
                </div>
                <BottomNavigation />
              </div>
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
