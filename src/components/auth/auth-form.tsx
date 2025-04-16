import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Loader2, Mail, Lock, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

const signupSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

export function AuthForm() {
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onLoginSubmit(values: LoginFormValues) {
    setIsLoggingIn(true);
    
    try {
      console.log("Login values:", values);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Successfully logged in!");
      
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Failed to login. Please try again.");
    } finally {
      setIsLoggingIn(false);
    }
  }

  async function onSignupSubmit(values: SignupFormValues) {
    setIsSigningUp(true);
    
    try {
      console.log("Signup values:", values);
      
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Successfully created account!");
      
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Failed to create account. Please try again.");
    } finally {
      setIsSigningUp(false);
    }
  }

  async function handleGoogleAuth() {
    try {
      toast.success("Google authentication not implemented yet!");
    } catch (error) {
      console.error("Google auth error:", error);
      toast.error("Failed to authenticate with Google. Please try again.");
    }
  }

  return (
    <Card className="w-full max-w-md animate-fade-in bg-black border-yellow-400/20">
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "signup")} className="w-full">
        <TabsList className="grid w-full grid-cols-2 bg-black/50">
          <TabsTrigger 
            value="login"
            className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
          >
            Login
          </TabsTrigger>
          <TabsTrigger 
            value="signup"
            className="data-[state=active]:bg-yellow-400 data-[state=active]:text-black"
          >
            Sign Up
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="login" className="animate-slide-in-up">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-white">Welcome back</CardTitle>
            <CardDescription className="text-white/70">Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
                          <Input placeholder="you@example.com" className="pl-10 bg-black/50 border-yellow-400/20 text-white placeholder:text-white/30" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage className="text-yellow-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={loginForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
                          <Input type="password" placeholder="••••••" className="pl-10 bg-black/50 border-yellow-400/20 text-white placeholder:text-white/30" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage className="text-yellow-400" />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-yellow-400 text-black hover:bg-yellow-500" disabled={isLoggingIn}>
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "Log in"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </TabsContent>

        <TabsContent value="signup" className="animate-slide-in-up">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-white">Create an account</CardTitle>
            <CardDescription className="text-white/70">Enter your details to create a new account</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...signupForm}>
              <form onSubmit={signupForm.handleSubmit(onSignupSubmit)} className="space-y-4">
                <FormField
                  control={signupForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Email</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
                          <Input placeholder="you@example.com" className="pl-10 bg-black/50 border-yellow-400/20 text-white placeholder:text-white/30" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage className="text-yellow-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
                          <Input type="password" placeholder="••••••" className="pl-10 bg-black/50 border-yellow-400/20 text-white placeholder:text-white/30" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage className="text-yellow-400" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={signupForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">Confirm Password</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-white/50" />
                          <Input type="password" placeholder="••••••" className="pl-10 bg-black/50 border-yellow-400/20 text-white placeholder:text-white/30" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage className="text-yellow-400" />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-yellow-400 text-black hover:bg-yellow-500" disabled={isSigningUp}>
                  {isSigningUp ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    "Sign up"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </TabsContent>

        <CardFooter className="flex flex-col space-y-4 pt-4">
          <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-yellow-400/20"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-black px-2 text-white/50">or continue with</span>
            </div>
          </div>
          <Button variant="outline" className="w-full bg-black border-yellow-400/20 text-white hover:bg-yellow-400 hover:text-black" onClick={handleGoogleAuth}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" className="mr-2">
              <path fill="currentColor" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z" />
              <path fill="currentColor" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z" />
              <path fill="currentColor" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z" />
              <path fill="currentColor" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z" />
            </svg>
            Continue with Google
          </Button>
        </CardFooter>
      </Tabs>
    </Card>
  );
}
