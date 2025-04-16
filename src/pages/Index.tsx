import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AuthForm } from "@/components/auth/auth-form";
import { Logo } from "@/components/logo";
import { Helmet } from "react-helmet"; // Added for SEO
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

  {/* SVG Outline Background */}
  <div className="absolute inset-0 z-0 pointer-events-none">
    <img
      src={img}
      alt="Background Outline"
      className="h-full object-cover opacity-5"
    />
  </div>

  {/* Main Content Container */}
  <div className="container mx-auto z-10 font-poppins">
    <div className="flex flex-row items-center justify-between">
      
      {/* Left: Vertical Logo */}
      <div className="flex-1 flex justify-center">
        <div className="hidden md:flex flex-col items-center">
          <span className="-rotate-90 text-7xl font-bold tracking-tighter text-white">
            linker's db
          </span>
        </div>
      </div>

      {/* Center: Vertical Line */}
      <div className="w-px h-64 bg-white/20 mx-5"></div>

      {/* Right: Hero Text and Buttons */}
      <div className="flex-1 mx-40 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight text-center text-white">
          Welcome to Linker's DB
        </h1>
        <h2 className="mt-2 text-2xl md:text-3xl text-center font-semibold text-white/90">
          Your Links, Your Way, Shared with the World
        </h2>
        <p className="mt-6 text-xl text-white/70 max-w-2xl text-center leading-relaxed">
          The <span className="bg-yellow-600 text-white font-bold">most powerful</span> link management platform for professionals, researchers, and content creators.
          Save, organize, and access your digital resources with unmatched efficiency.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
          <Button
            onClick={() => setShowAuthForm(true)}
            className="bg-white text-black hover:bg-white/90 px-8 py-6 text-base font-medium shadow-lg shadow-white/10 transition-all hover:shadow-white/20"
          >
            Start For Free
          </Button>
        </div>
      </div>

    </div>
  </div>
</section>



      <section id="features" className="py-24 md:py-32 bg-white/[0.02] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-950 to-black z-0"></div>
        <div className="container relative z-10">
          <h2 className="text-4xl font-bold text-center mb-20">Why Choose Linker's DB?</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="group bg-black p-8 rounded-lg border border-white/10 hover:border-white/20 transition-all hover:transform hover:scale-105 shadow-xl shadow-blue-900/5 hover:shadow-blue-900/10">
              <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mb-4 shadow-inner shadow-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Save Smarter</h3>
              <p className="text-zinc-400">Store unlimited links with custom notes for quick reference.</p>
            </div>

            <div className="group bg-black p-8 rounded-lg border border-white/10 hover:border-white/20 transition-all hover:transform hover:scale-105 shadow-xl shadow-blue-900/5 hover:shadow-blue-900/10">
              <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mb-4 shadow-inner shadow-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Organize Effortlessly</h3>
              <p className="text-zinc-400">Group your links into playlists or categories for easy access.</p>
            </div>

            <div className="group bg-black p-8 rounded-lg border border-white/10 hover:border-white/20 transition-all hover:transform hover:scale-105 shadow-xl shadow-blue-900/5 hover:shadow-blue-900/10">
              <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mb-4 shadow-inner shadow-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Seamless Sharing</h3>
              <p className="text-zinc-400">Share collections with friends, colleagues, or your team in just a few clicks.</p>
            </div>

            <div className="group bg-black p-8 rounded-lg border border-white/10 hover:border-white/20 transition-all hover:transform hover:scale-105 shadow-xl shadow-blue-900/5 hover:shadow-blue-900/10">
              <div className="w-12 h-12 bg-zinc-900 rounded-full flex items-center justify-center mb-4 shadow-inner shadow-white/5">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Multi-Platform Access</h3>
              <p className="text-zinc-400">Use our app on the web, mobile, or as a Chrome extension.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Who Can Use Section with improved design */}
      <section id="about" className="py-16 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tl from-zinc-950 to-black"></div>

        {/* Decorative glow */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-900/5 rounded-full blur-3xl"></div>

        <div className="container relative z-10">
          <h2 className="text-4xl font-bold text-center mb-16">Who Can Use Linker's DB?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black p-8 rounded-lg border border-zinc-800 shadow-lg shadow-blue-900/5 hover:shadow-blue-900/10 hover:border-zinc-700 transition-all transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center mr-3 shadow-inner shadow-white/5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                  </svg>
                </span>
                Students
              </h3>
              <p className="text-zinc-400">Managing research links and online resources with ease. Keep all your study materials organized in one place.</p>
            </div>

            <div className="bg-black p-8 rounded-lg border border-zinc-800 shadow-lg shadow-blue-900/5 hover:shadow-blue-900/10 hover:border-zinc-700 transition-all transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center mr-3 shadow-inner shadow-white/5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z" />
                  </svg>
                </span>
                Professionals
              </h3>
              <p className="text-zinc-400">Organizing tools, resources, and reports for quick access. Improve your workflow and productivity.</p>
            </div>

            <div className="bg-black p-8 rounded-lg border border-zinc-800 shadow-lg shadow-blue-900/5 hover:shadow-blue-900/10 hover:border-zinc-700 transition-all transform hover:-translate-y-1">
              <h3 className="text-xl font-semibold mb-4 flex items-center">
                <span className="w-8 h-8 bg-zinc-900 rounded-full flex items-center justify-center mr-3 shadow-inner shadow-white/5">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
                  </svg>
                </span>
                Content Creators
              </h3>
              <p className="text-zinc-400">Saving ideas, inspirations, and references in one convenient location. Never lose track of your creativity.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section with improved design */}
      <section className="py-16 md:py-32 bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 to-black/80"></div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-blue-900/5 to-transparent"></div>

        <div className="container relative z-10">
          <h2 className="text-4xl font-bold text-center mb-16">Key Features</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black p-8 rounded-lg border border-zinc-800 flex flex-col items-center text-center shadow-xl shadow-blue-900/5 hover:shadow-blue-900/10 hover:border-zinc-700 transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-blue-900/10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Real-time Sync</h3>
              <p className="text-zinc-400">Access your links from any device with real-time Firebase integration.</p>
            </div>

            <div className="bg-black p-8 rounded-lg border border-zinc-800 flex flex-col items-center text-center shadow-xl shadow-blue-900/5 hover:shadow-blue-900/10 hover:border-zinc-700 transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-blue-900/10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Intuitive UI</h3>
              <p className="text-zinc-400">Smooth user experience built with React and modern design principles.</p>
            </div>

            <div className="bg-black p-8 rounded-lg border border-zinc-800 flex flex-col items-center text-center shadow-xl shadow-blue-900/5 hover:shadow-blue-900/10 hover:border-zinc-700 transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-blue-900/10">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Offline Mode</h3>
              <p className="text-zinc-400">Continue accessing your links even without an internet connection.</p>
            </div>
          </div>
        </div>
      </section>
      {/* CTA Section with improved design */}
      <section id="pricing" className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-zinc-950"></div>

        {/* Decorative glow */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/2 h-32 bg-blue-900/10 blur-3xl"></div>

        <div className="container flex flex-col items-center text-center relative z-10">
          <h2 className="text-4xl font-bold mb-6">Start Saving Today!</h2>
          <p className="text-zinc-400 max-w-2xl mb-12">
            Don't lose track of important links anymore. Join Linker's DB now and transform
            the way you manage URLs!
          </p>
          <Button
            onClick={() => setShowAuthForm(true)}
            className="bg-white text-black hover:bg-zinc-200 px-10 py-6 text-base font-medium shadow-xl shadow-white/10 hover:shadow-white/20 transition-all transform hover:-translate-y-1"
          >
            Create Free Account
          </Button>

          <div className="mt-12 grid md:grid-cols-3 gap-6 w-full max-w-3xl">
            <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800 shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Free Plan</h3>
              <p className="text-3xl font-bold mb-4">$0<span className="text-sm text-zinc-400">/month</span></p>
              <ul className="text-zinc-400 text-sm space-y-2">
                <li>500 links</li>
                <li>Basic organization</li>
                <li>Mobile access</li>
              </ul>
            </div>

            <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800 shadow-lg relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-white text-black text-xs font-bold py-1 px-3 rounded-full">
                POPULAR
              </div>
              <h3 className="text-lg font-semibold mb-2">Pro Plan</h3>
              <p className="text-3xl font-bold mb-4">$9<span className="text-sm text-zinc-400">/month</span></p>
              <ul className="text-zinc-400 text-sm space-y-2">
                <li>Unlimited links</li>
                <li>Advanced categories</li>
                <li>Team sharing</li>
                <li>Browser extension</li>
              </ul>
            </div>

            <div className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800 shadow-lg">
              <h3 className="text-lg font-semibold mb-2">Team Plan</h3>
              <p className="text-3xl font-bold mb-4">$19<span className="text-sm text-zinc-400">/month</span></p>
              <ul className="text-zinc-400 text-sm space-y-2">
                <li>Unlimited everything</li>
                <li>Team collaboration</li>
                <li>Analytics</li>
                <li>API access</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 py-10 border-t border-zinc-800">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Logo className="h-6 w-auto" />
              <p className="text-zinc-500 text-sm mt-2">© 2025 Linker's DB. All rights reserved.</p>
            </div>
            <div className="flex gap-6">
              <a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm">Privacy</a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm">Terms</a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm">Contact</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Auth Dialog */}
      <Dialog open={showAuthForm} onOpenChange={setShowAuthForm}>
        <DialogContent className="sm:max-w-md bg-black border-zinc-800">
          <AuthForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}