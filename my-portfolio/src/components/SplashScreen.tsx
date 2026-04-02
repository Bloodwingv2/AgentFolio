import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { BrainCircuit } from 'lucide-react';

interface SplashScreenProps {
    onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (window.innerWidth < 768) {
            onComplete();
            return;
        }

        gsap.set(contentRef.current, { opacity: 0, y: 10 });

        gsap.timeline()
            .to(contentRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: 'power2.out',
            })
            .to(containerRef.current, {
                opacity: 0,
                duration: 0.5,
                ease: 'power2.inOut',
                delay: 1.1,
                onComplete,
            });
    }, [onComplete]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#080808]"
        >
            <div ref={contentRef} className="flex flex-col items-center gap-5">

                {/* Icon */}
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl border border-[#222] bg-[#0f0f0f]">
                    <BrainCircuit className="w-7 h-7 text-white" strokeWidth={1.5} />
                </div>

                {/* Name */}
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-display">
                    AgentFolio
                </h1>

                {/* Divider */}
                <div className="w-8 h-px bg-[#252525]" />

                {/* Subtitle */}
                <p className="text-[11px] text-[#3a3a3a] tracking-[0.45em] font-mono uppercase">
                    Agentic Portfolio
                </p>

            </div>
        </div>
    );
};

export default SplashScreen;
