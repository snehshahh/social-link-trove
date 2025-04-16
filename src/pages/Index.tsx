import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AuthForm } from "@/components/auth/auth-form";
import { Logo } from "@/components/logo";
import { Helmet } from "react-helmet";
import img from "../undraw_dev-productivity_5wps_outline.svg";

export default function Index() {
  const [showAuthForm, setShowAuthForm] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* SEO Optimization */}
      <Helmet>
        <title>Linker's DB - Organize Your Digital World With Precision</title>
        <meta name="description" content="The most powerful link management platform for professionals, researchers, and content creators. Save, organize, and access your digital resources with unmatched efficiency." />
        <meta name="keywords" content="link management, bookmark organizer, URL database, digital resources, content organization" />
        <meta property="og:title" content="Linker's DB - Your Links, Your Way, Shared with the World" />
        <meta property="og:description" content="Save, organize, and access your digital resources with unmatched efficiency." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://linkersdb.com" />
      </Helmet>

      <section className="flex min-h-screen items-center justify-center px-4 relative overflow-hidden bg-black">
        {/* Solid Black Background */}
        <div className="absolute inset-0 bg-black z-0"></div>

        {/* SVG Outline Background - Adjusted for better visibility and positioning */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src={img}
            alt="Background Outline"
            className="h-full w-full object-cover opacity-5 transform scale-125 md:scale-100"
          />
        </div>

        {/* Main Content Container */}
        <div className="container mx-auto z-10 font-poppins">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            
            {/* Left: Vertical Logo - Hidden on mobile */}
            <div className="hidden md:flex flex-1 justify-center">
              <div className="flex flex-col items-center">
                <span className="-rotate-90 text-5xl md:text-7xl font-bold tracking-tighter text-white">
                  linker's db
                </span>
              </div>
            </div>

            {/* Center: Vertical Line - Hidden on mobile */}
            <div className="hidden md:block w-px h-64 bg-white/20 mx-5"></div>

            {/* Right: Hero Text and Buttons */}
            <div className="flex-1 px-4 md:px-0 max-w-3xl mx-auto text-center md:text-left">
              <h1 className="text-3xl md:text-6xl font-bold tracking-tighter leading-tight text-center text-white mb-4">
                Welcome to Linker's DB
              </h1>
              <h2 className="text-xl md:text-3xl text-center font-semibold text-white/90 mb-6">
                Your Links, Your Way, Shared with the World
              </h2>
              <p className="mt-4 text-lg md:text-xl text-white/70 text-center leading-relaxed">
                The <span className="bg-primary text-white px-2 py-1 rounded font-bold">most powerful</span> link management platform for professionals, researchers, and content creators.
                Save, organize, and access your digital resources with unmatched efficiency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
                <Button
                  onClick={() => setShowAuthForm(true)}
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-base font-medium shadow-lg shadow-primary/20 transition-all hover:shadow-primary/30 hover:scale-105"
                >
                  Start For Free
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with improved responsiveness */}
      <section className="py-16 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-zinc-950"></div>
        <div className="container relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Why Choose Linker's DB?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            <div className="group bg-black/50 p-6 md:p-8 rounded-lg border border-primary/10 hover:border-primary/20 transition-all hover:transform hover:scale-105 backdrop-blur-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Save Smarter</h3>
              <p className="text-white/70">Store unlimited links with custom notes for quick reference.</p>
            </div>

            <div className="group bg-black/50 p-6 md:p-8 rounded-lg border border-primary/10 hover:border-primary/20 transition-all hover:transform hover:scale-105 backdrop-blur-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Organize Effortlessly</h3>
              <p className="text-white/70">Group your links into collections or categories for easy access.</p>
            </div>

            <div className="group bg-black/50 p-6 md:p-8 rounded-lg border border-primary/10 hover:border-primary/20 transition-all hover:transform hover:scale-105 backdrop-blur-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Seamless Sharing</h3>
              <p className="text-white/70">Share collections with friends or your team in just a few clicks.</p>
            </div>

            <div className="group bg-black/50 p-6 md:p-8 rounded-lg border border-primary/10 hover:border-primary/20 transition-all hover:transform hover:scale-105 backdrop-blur-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-primary">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Multi-Platform Access</h3>
              <p className="text-white/70">Use our app on any device with real-time synchronization.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Auth Dialog */}
      <Dialog open={showAuthForm} onOpenChange={setShowAuthForm}>
        <DialogContent className="sm:max-w-md bg-black border-zinc-800">
          <AuthForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}
