
import { AuthForm } from "@/components/auth/auth-form";
import { Logo } from "@/components/logo";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <Logo size="lg" />
          <h1 className="text-2xl font-medium tracking-tight">
            Welcome to LinkTrove
          </h1>
          <p className="text-muted-foreground">
            Your personal collection of important links, organized and easily accessible.
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};

export default Index;
