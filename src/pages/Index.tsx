
import { AuthForm } from "@/components/auth/auth-form";
import { Logo } from "@/components/logo";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background relative overflow-hidden">
      {/* Abstract shapes for modern look */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="w-full max-w-md space-y-8 z-10">
        <div className="text-center space-y-4">
          <Logo size="lg" />
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome to Linker's DB
          </h1>
          <p className="text-muted-foreground text-lg">
            Your personal collection of important links, organized and easily accessible.
          </p>
        </div>
        
        <div className="bg-white/70 backdrop-blur-md rounded-xl border border-border p-6 shadow-lg">
          <AuthForm />
        </div>
        
        <p className="text-center text-sm text-muted-foreground pt-4">
          By signing up, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Index;
