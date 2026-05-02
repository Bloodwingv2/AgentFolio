import { useState, useRef, useCallback } from 'react';
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

  const handleBlogClose = useCallback(() => {
    if (!blogRef.current) { setIsBlogOpen(false); return; }
    gsap.to(blogRef.current, {
      opacity: 0, scale: 0.98,
      duration: 0.2, ease: 'power2.in',
      onComplete: () => setIsBlogOpen(false),
    });
  }, []);

  return (
    <div className="min-h-[100dvh] bg-black text-white selection:bg-white selection:text-black relative" style={{ zIndex: 1 }}>
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

      {isBlogOpen && (
        <div ref={blogRef} className="blog-page-enter fixed inset-0 z-50 overflow-hidden bg-[#f6f6f6]">
          <BlogSection onClose={handleBlogClose} />
        </div>
      )}

      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default App;
