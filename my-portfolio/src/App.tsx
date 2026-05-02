import { useState } from 'react';
import Layout from './components/Layout';
import ChatInterface from './components/ChatInterface';
import SplashScreen from './components/SplashScreen';
import WarpBackground from './components/WarpBackground';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  const [loading, setLoading] = useState(true);
  const [hasStarted, setHasStarted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isBlogOpen, setIsBlogOpen] = useState(false);

  return (
    <div className="min-h-[100dvh] bg-black text-white selection:bg-white selection:text-black relative" style={{ zIndex: 1 }}>
      <WarpBackground active={!loading && !hasStarted} />
      {loading ? (
        <SplashScreen onComplete={() => setLoading(false)} />
      ) : (
        <Layout 
          onHomeClick={() => { setHasStarted(false); setIsBlogOpen(false); }} 
          onMenuClick={() => setIsSidebarOpen(true)}
          onBlogClick={() => setIsBlogOpen(!isBlogOpen)}
        >
          <ChatInterface
            hasStarted={hasStarted}
            onStart={() => setHasStarted(true)}
            activePrompt={null}
            onPromptHandled={() => { }}
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            isBlogOpen={isBlogOpen}
            setIsBlogOpen={setIsBlogOpen}
          />
        </Layout>
      )}
      <Analytics />
      <SpeedInsights />
    </div>
  );
}

export default App;
