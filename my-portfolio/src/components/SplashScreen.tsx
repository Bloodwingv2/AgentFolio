import React, { useEffect, useState } from 'react';
import agentfolioLogo from '../assets/05-pill-tag-hero.svg';

interface SplashScreenProps {
    onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
    const [visible, setVisible] = useState(false);
    const [exiting, setExiting] = useState(false);

    useEffect(() => {
        if (window.innerWidth < 768) {
            onComplete();
            return;
        }

        const rafId = requestAnimationFrame(() => setVisible(true));
        const exitTimer = setTimeout(() => setExiting(true), 1500);
        const doneTimer = setTimeout(onComplete, 1950);

        return () => {
            cancelAnimationFrame(rafId);
            clearTimeout(exitTimer);
            clearTimeout(doneTimer);
        };
    }, [onComplete]);

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#080808]"
            style={{
                opacity: exiting ? 0 : 1,
                transition: 'opacity 0.4s ease-in-out',
                pointerEvents: 'none',
            }}
        >
            <div
                className="flex flex-col items-center gap-5"
                style={{
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'translateY(0)' : 'translateY(10px)',
                    transition: 'opacity 0.45s ease-out, transform 0.45s ease-out',
                }}
            >
                {/* Logo */}
                <img src={agentfolioLogo} alt="AgentFolio" className="h-14 sm:h-16 md:h-20 w-auto" />

                {/* Divider */}
                <div className="w-10 h-px bg-[#252525]" />

                {/* Subtitle */}
                <p className="text-[11px] sm:text-xs tracking-[0.45em] text-[#3a3a3a] font-mono uppercase">
                    Agentic Portfolio
                </p>
            </div>
        </div>
    );
};

export default SplashScreen;
