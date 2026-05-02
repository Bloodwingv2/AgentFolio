import { useState, useRef, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import Layout from './components/Layout';
import ChatInterface from './components/ChatInterface';
import SplashScreen from './components/SplashScreen';
import WarpBackground from './components/WarpBackground';
import BlogSection from './components/BlogSection';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  const [loading, setLoading] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);
  const blogRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  // GSAP drives the enter — CSS class only sets the initial hidden state
  useEffect(() => {
    if (!isBlogOpen || !blogRef.current) return;
    gsap.to(blogRef.current, {
      opacity: 1, scale: 1,
      duration: 0.32, ease: 'power2.out',
      overwrite: true,
    });
  }, [isBlogOpen]);

  const handleBlogClose = useCallback(() => {
    if (!blogRef.current) { setIsBlogOpen(false); return; }
    // Blog dissolves out — GSAP has full ownership, no CSS animation conflict
    gsap.to(blogRef.current, {
      opacity: 0, scale: 0.98,
      duration: 0.28, ease: 'power2.in',
      overwrite: true,
      onComplete: () => setIsBlogOpen(false),
    });
    // Homepage mirrors the same dissolve in simultaneously
    if (mainRef.current) {
      gsap.fromTo(mainRef.current,
        { opacity: 0.75, scale: 0.99 },
        { opacity: 1, scale: 1, duration: 0.35, ease: 'power2.out', clearProps: 'opacity,transform' }
      );
    }
  }, []);

  return (
    <div className="min-h-[100dvh] bg-black text-white selection:bg-white selection:text-black relative" style={{ zIndex: 1 }}>
      <div ref={mainRef}>
        <WarpBackground active={!loading && !hasStarted} />
        {loading ? (
          <SplashScreen onComplete={() => setLoading(false)} />
        ) : (
          <Layout
            onHomeClick={() => { setHasStarted(false); if (isBlogOpen) handleBlogClose(); }}
            onMenuClick={() => setIsSidebarOpen(true)}
            onBlogClick={() => setIsBlogOpen(true)}
          >
            <ChatInterface
              hasStarted={hasStarted}
              onStart={() => setHasStarted(true)}
              activePrompt={null}
              onPromptHandled={() => { }}
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </Layout>
        )}
      </div>

      {isBlogOpen && (
        <div ref={blogRef} className="blog-page-enter fixed inset-0 z-[100] overflow-hidden bg-[#f6f6f6]">
          <BlogSection onClose={handleBlogClose} />
        </div>
      )}

      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default App;
