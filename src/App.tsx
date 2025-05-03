
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
import { Provider } from 'react-redux';
import { store } from './store';
import { DataInitializer } from './components/data-initializer';
import { MessagePage } from "./components/messages/message-page";
import { ThemeProvider } from "./components/theme-provider";

const queryClient = new QueryClient();

const App = () => {
  return (
    <Provider store={store}>
      {/* Add DataInitializer to load data when app starts */}
      <DataInitializer />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" attribute="class">
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route
                  path="/dashboard"
                  element={
                    <div className="flex flex-col h-screen">
                      <div className="flex-1 pt-16 md:pt-20 overflow-y-auto">
                        <Dashboard />
                      </div>
                    </div>
                  }
                />
                <Route
                  path="/profile"
                  element={
                    <div className="flex flex-col h-screen bg-black">
                      <div className="flex-1 pt-16 md:pt-20 overflow-y-auto">
                        <div className="container mx-auto px-4">
                          <Profile />
                        </div>
                      </div>
                      <BottomNavigation />
                    </div>
                  }
                />
                <Route
                  path="/messages"
                  element={
                    <div className="flex flex-col h-screen bg-black">
                      <div className="flex-1 pt-16 md:pt-20 overflow-y-auto">
                        <div className="container mx-auto px-4">
                          <MessagePage />
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
                      <div className="flex-1 pt-16 md:pt-20 overflow-y-auto">
                        <div className="container mx-auto px-4">
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
        </ThemeProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
