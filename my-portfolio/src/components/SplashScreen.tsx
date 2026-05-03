import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import heroIcon from '../assets/05-pill-tag-hero.svg';

interface SplashScreenProps {
    onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
    const rootRef    = useRef<HTMLDivElement>(null);
    const iconRef    = useRef<HTMLDivElement>(null);
    const wordRef    = useRef<HTMLSpanElement>(null);
    const subRef     = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (window.innerWidth < 768) { onComplete(); return; }

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl
                .fromTo(iconRef.current,
                    { opacity: 0, scale: 0.78, y: 10 },
                    { opacity: 1, scale: 1,    y: 0,  duration: 0.5 })
                .fromTo(wordRef.current,
                    { opacity: 0, x: -16, filter: 'blur(6px)' },
                    { opacity: 1, x: 0,   filter: 'blur(0px)', duration: 0.42 },
                    '-=0.28')
                .fromTo(subRef.current,
                    { opacity: 0, y: 8 },
                    { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' },
                    '-=0.1')
                // hold
                .to({}, { duration: 0.75 })
                // exit — whole screen fades fast
                .to(rootRef.current, {
                    opacity: 0,
                    duration: 0.28,
                    ease: 'power2.in',
                    onComplete,
                });
        }, rootRef);

        return () => ctx.revert();
    }, [onComplete]);

    return (
        <div
            ref={rootRef}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#080808]"
            style={{ pointerEvents: 'none' }}
        >
            <div className="flex flex-col items-center gap-6">

                {/* Icon + wordmark */}
                <div className="flex items-center gap-5">

                    {/* Icon with ambient teal glow */}
                    <div ref={iconRef} className="relative opacity-0">
                        <div className="absolute inset-0 rounded-2xl bg-[#00c8c8]/15 blur-2xl scale-125 pointer-events-none" />
                        <img
                            src={heroIcon}
                            alt="AF"
                            className="relative h-14 sm:h-16 md:h-[72px] w-auto"
                        />
                    </div>

                    {/* Wordmark */}
                    <span
                        ref={wordRef}
                        className="text-[42px] sm:text-5xl md:text-6xl font-bold text-white font-sans tracking-tight leading-none opacity-0"
                    >
                        AgentFolio
                    </span>
                </div>

                {/* Subtitle with flanking lines */}
                <div ref={subRef} className="flex items-center gap-3 opacity-0">
                    <div className="w-8 h-px bg-[#242424]" />
                    <p className="text-[11px] sm:text-[12px] text-[#383838] font-sans font-medium tracking-[0.28em] uppercase">
                        An Agentic Portfolio
                    </p>
                    <div className="w-8 h-px bg-[#242424]" />
                </div>

            </div>
        </div>
    );
};

export default SplashScreen;
