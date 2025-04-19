import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { AuthForm } from "@/components/auth/auth-form";
import { Logo } from "@/components/logo";
import { Helmet } from "react-helmet";
import img from "../undraw_dev-productivity_5wps_outline.svg";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { X, Twitter, Facebook, Instagram, Linkedin, Mail } from "lucide-react";

export default function Index() {
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

  const handleAuthFormOpen = () => {
    setShowAuthForm(true);
    setShowWarning(true);
    setTimeout(() => setShowWarning(false), 10000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-poppins">
      <Helmet>
        <title>Linker's DB - Organize Your Digital World With Precision</title>
        <meta name="description" content="The most powerful link management platform for professionals, researchers, and content creators. Save, organize, and access your digital resources with unmatched efficiency." />
        <meta name="keywords" content="link management, bookmark organizer, URL database, digital resources, content organization, link sharing, knowledge management, digital library" />
        <meta property="og:title" content="Linker's DB - Your Links, Your Way, Shared with the World" />
        <meta property="og:description" content="Save, organize, and access your digital resources with unmatched efficiency." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Linker's DB Team" />
        <link rel="canonical" href="https://linkersdb.com" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Helmet>

      {showWarning && (
        <div className="fixed top-4 left-4 right-4 z-50 animate-in fade-in slide-in-from-top">
          <Alert className="bg-black border border-white/20">
            <AlertDescription className="text-white/80 text-sm">
              Linkers DB does not hold any responsibility for the content, accuracy, or appropriateness of the links stored within the platform. Users are solely responsible for the links they upload and share. Some links may lead to content that is spam, inappropriate, or unsafe. By using Linkers DB, you acknowledge and agree that we are not liable for any issues, damages, or consequences arising from the use of these links. We strongly advise users to exercise caution and discretion when interacting with any links shared through the platform.
            </AlertDescription>
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-2 top-2 text-white/60 hover:text-white"
              onClick={() => setShowWarning(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </Alert>
        </div>
      )}

      <section className="flex min-h-screen items-center justify-center px-4 relative overflow-hidden bg-black" id="hero">
        <div className="absolute inset-0 bg-black z-0"></div>
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            src={img}
            alt="Background Outline"
            className="h-full w-full object-bottom opacity-[0.03] transform scale-125 md:scale-110"
          />
        </div>
        <div className="container mx-auto z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="hidden md:flex flex-1 justify-center">
              <div className="flex flex-col items-center">
                <span className="-rotate-90 text-5xl md:text-7xl font-bold tracking-tighter text-white hover:text-white transition-colors">
                  linker's db
                </span>
              </div>
            </div>
            <div className="hidden md:block w-px h-64 bg-white/10 -ml-4"></div>
            <div className="flex-1 px-4 md:px-0 max-w-3xl mx-auto text-center md:text-left">
              <h1 className="text-3xl md:text-6xl font-bold tracking-tighter leading-tight text-center text-white mb-4 hover:text-white transition-colors">
                Welcome to Linker's DB
              </h1>
              <h2 className="text-xl md:text-3xl text-center font-semibold text-white/90 mb-6">
                Your Links, Your Way, Shared with the World
              </h2>
              <p className="mt-4 text-lg md:text-xl text-white/70 text-center leading-relaxed">
                The <span className="bg-yellow-400 text-black px-2 py-1 rounded font-bold">most powerful</span> link management platform for professionals, researchers, and content creators.
                Save, organize, and access your digital resources with unmatched efficiency.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-8 justify-center">
                <Button
                  onClick={handleAuthFormOpen}
                  className="bg-black text-white border-2 border-white px-8 py-6 text-base font-medium shadow-lg hover:bg-white hover:text-black transition-colors"
                >
                  Start For Free
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-32 bg-black relative overflow-hidden" id="features">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-zinc-950"></div>
        <div className="container relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">Why Choose Linker's DB?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
            <div className="group bg-black/50 p-6 md:p-8 rounded-lg border border-white/10 hover:border-white/20 transition-all hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Save Smarter</h3>
              <p className="text-white/70">Store unlimited links with custom notes for quick reference.</p>
            </div>

            <div className="group bg-black/50 p-6 md:p-8 rounded-lg border border-white/10 hover:border-white/20 transition-all hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Organize Effortlessly</h3>
              <p className="text-white/70">Group your links into collections or categories for easy access.</p>
            </div>

            <div className="group bg-black/50 p-6 md:p-8 rounded-lg border border-white/10 hover:border-white/20 transition-all hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Seamless Sharing</h3>
              <p className="text-white/70">Share collections with friends or your team in just a few clicks.</p>
            </div>

            <div className="group bg-black/50 p-6 md:p-8 rounded-lg border border-white/10 hover:border-white/20 transition-all hover:shadow-[0_0_50px_rgba(255,255,255,0.3)]">
              <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Multi-Platform Access</h3>
              <p className="text-white/70">Use our app on any device with real-time synchronization.</p>
            </div>
          </div>
        </div>
      </section>

      {/* New SEO-friendly Use Cases Section */}
      <section className="py-16 md:py-24 bg-zinc-950 relative" id="use-cases">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">Perfect For Every Professional</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-black/40 p-8 rounded-lg border border-white/10 hover:border-white/20 transition-all">
              <h3 className="text-2xl font-semibold mb-4 text-white">Digital Researchers</h3>
              <p className="text-white/70 mb-4">Create comprehensive research collections with categorized links, annotations, and searchable tags. Never lose track of valuable resources again.</p>
              <ul className="text-white/70 list-disc list-inside space-y-2">
                <li>Academic research organization</li>
                <li>Citation management</li>
                <li>Source verification</li>
              </ul>
            </div>
            
            <div className="bg-black/40 p-8 rounded-lg border border-white/10 hover:border-white/20 transition-all">
              <h3 className="text-2xl font-semibold mb-4 text-white">Content Creators</h3>
              <p className="text-white/70 mb-4">Maintain libraries of inspiration, references, and resources. Organize by project, theme, or medium for instant creative access.</p>
              <ul className="text-white/70 list-disc list-inside space-y-2">
                <li>Visual inspiration boards</li>
                <li>Article reference libraries</li>
                <li>Resource collections</li>
              </ul>
            </div>
            
            <div className="bg-black/40 p-8 rounded-lg border border-white/10 hover:border-white/20 transition-all">
              <h3 className="text-2xl font-semibold mb-4 text-white">Business Teams</h3>
              <p className="text-white/70 mb-4">Foster collaboration with shared knowledge bases. Create team libraries of important resources, documentation, and industry insights.</p>
              <ul className="text-white/70 list-disc list-inside space-y-2">
                <li>Industry research hubs</li>
                <li>Competitive analysis</li>
                <li>Team knowledge sharing</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* New SEO-friendly Testimonials Section */}
      <section className="py-16 md:py-24 bg-black relative" id="testimonials">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-black/50 p-8 rounded-lg border border-white/10 hover:border-white/20 transition-all">
              <p className="text-white/80 italic mb-6">"Linker's DB has transformed how I manage my research. The ability to organize links by project and add custom notes has saved me countless hours."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/10 rounded-full mr-4"></div>
                <div>
                  <p className="text-white font-medium">Sarah K.</p>
                  <p className="text-white/60 text-sm">PhD Researcher</p>
                </div>
              </div>
            </div>
            
            <div className="bg-black/50 p-8 rounded-lg border border-white/10 hover:border-white/20 transition-all">
              <p className="text-white/80 italic mb-6">"As a content creator, I'm constantly collecting inspiration. Linker's DB lets me organize everything by project and access it from anywhere."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/10 rounded-full mr-4"></div>
                <div>
                  <p className="text-white font-medium">Michael T.</p>
                  <p className="text-white/60 text-sm">Digital Designer</p>
                </div>
              </div>
            </div>
            
            <div className="bg-black/50 p-8 rounded-lg border border-white/10 hover:border-white/20 transition-all">
              <p className="text-white/80 italic mb-6">"Our marketing team uses Linker's DB to build shared resource libraries. The collaboration features have improved our workflow significantly."</p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-white/10 rounded-full mr-4"></div>
                <div>
                  <p className="text-white font-medium">Jessica M.</p>
                  <p className="text-white/60 text-sm">Marketing Director</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New SEO-friendly FAQ Section */}
      <section className="py-16 md:py-24 bg-zinc-950 relative" id="faq">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-white">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div className="bg-black/40 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-2">Is Linker's DB free to use?</h3>
              <p className="text-white/70">Yes, Linker's DB offers a free plan with core features. Premium plans are available for users who need advanced organization, unlimited collections, and enhanced collaboration tools.</p>
            </div>
            
            <div className="bg-black/40 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-2">Can I access my links across different devices?</h3>
              <p className="text-white/70">Absolutely! Linker's DB synchronizes across all your devices in real-time. Access your links from your desktop, tablet, or mobile device with our responsive web app and native applications.</p>
            </div>
            
            <div className="bg-black/40 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-2">How secure are my saved links?</h3>
              <p className="text-white/70">Your data security is our priority. All links and collections are protected with enterprise-grade encryption. You control the privacy settings for each collection, deciding what's private and what's shared.</p>
            </div>
            
            <div className="bg-black/40 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-2">Can I collaborate with my team?</h3>
              <p className="text-white/70">Yes! Linker's DB makes team collaboration seamless. Share collections with specific team members, set permission levels, and work together on shared resources effortlessly.</p>
            </div>
            
            <div className="bg-black/40 p-6 rounded-lg border border-white/10">
              <h3 className="text-xl font-semibold text-white mb-2">Is there a browser extension available?</h3>
              <p className="text-white/70">Yes, our browser extension allows you to save links with a single click while browsing. It's available for Chrome, Firefox, Safari, and Edge browsers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* New SEO-friendly CTA Section */}
      <section className="py-16 md:py-24 bg-black relative" id="get-started">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Transform Your Link Management?</h2>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">Join thousands of professionals who have upgraded their digital organization with Linker's DB. Start for free today and experience the difference.</p>
          
          <Button
            onClick={handleAuthFormOpen}
            className="bg-white text-black px-8 py-6 text-lg font-medium shadow-lg hover:bg-white/90 transition-colors"
          >
            Create Your Free Account
          </Button>
          
          <p className="mt-6 text-white/50">No credit card required. Free plan available forever.</p>
        </div>
      </section>

      {/* New Footer Section */}
      <footer className="bg-zinc-950 pt-16 pb-8" id="footer">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h3 className="text-white text-xl font-semibold mb-4">Linker's DB</h3>
              <p className="text-white/60 mb-6">Your links, your way, shared with the world. The ultimate platform for organizing and sharing digital resources.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-white/60 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-white/60 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-white/60 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-white/60 hover:text-white transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2 text-white/60">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Browser Extension</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mobile App</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">User Guides</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#faq" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support Center</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/50 text-sm mb-4 md:mb-0">© 2025 Linker's DB. All rights reserved.</p>
            
            <div className="flex space-x-4">
              <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-white/50 text-sm hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      <Dialog open={showAuthForm} onOpenChange={setShowAuthForm}>
        <DialogContent className="sm:max-w-md bg-black border border-white/20">
          <AuthForm />
        </DialogContent>
      </Dialog>
    </div>
  );
}