import React, { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Briefcase, Calendar, Building2 } from 'lucide-react';
import type { Experience } from '../data/portfolioData';

interface ExperienceTimelineProps {
    experiences: Experience[];
}

const ExperienceCard: React.FC<{ exp: Experience }> = ({ exp }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const bullets = exp.description.split('\n').map(p => p.trim()).filter(Boolean);
    const hasMore = bullets.length > 2;
    const displayedBullets = isExpanded ? bullets : bullets.slice(0, 2);

    return (
        <div className="relative pl-6 group">
            {/* ... */}
            <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-5 hover:bg-gray-900/60 hover:border-gray-700 transition-colors backdrop-blur-sm">

                {/* Header: Logo + Title */}
                <div className="flex items-start gap-4 mb-4">
                    {/* Logo */}
                    <div className="w-12 h-12 rounded-lg bg-white p-1 flex items-center justify-center shrink-0 border border-gray-700 overflow-hidden">
                        {exp.logo ? (
                            <img
                                src={exp.logo}
                                alt={`${exp.company} logo`}
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                    (e.target as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                }}
                            />
                        ) : null}
                        <Building2 className={`text-gray-600 ${exp.logo ? 'hidden' : ''}`} size={24} />
                    </div>

                    {/* Title Info */}
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-2">
                            {exp.role}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-gray-400 mt-1">
                            <span className="flex items-center gap-1 font-medium text-gray-300">
                                <Briefcase size={14} />
                                {exp.company}
                            </span>
                            <span className="w-1 h-1 bg-gray-600 rounded-full" />
                            <span className="flex items-center gap-1 font-mono text-xs">
                                <Calendar size={12} />
                                {exp.period}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Description - Bullet Points */}
                <div className="space-y-2">
                    {displayedBullets.map((point, idx) => (
                        <div key={idx} className="flex gap-2.5 items-start text-gray-400 text-sm leading-relaxed">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-500/50 shrink-0" />
                            <span>{point}</span>
                        </div>
                    ))}
                </div>

                {hasMore && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-4 text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 py-1 px-2 rounded-md hover:bg-blue-400/10 -ml-2"
                    >
                        {isExpanded ? 'Show less' : `Show ${bullets.length - 2} more...`}
                    </button>
                )}

            </div>

            {/* Timeline Dot positioned relative to the card container */}
            <div className="absolute -left-[29px] top-2 bg-black border-2 border-gray-700 rounded-full w-4 h-4 group-hover:border-blue-500 group-hover:scale-125 transition-all duration-300 z-10" />
        </div>
    );
};

const ExperienceTimeline: React.FC<ExperienceTimelineProps> = ({ experiences }) => {
    const listRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const items = listRef.current?.children;
        if (items) {
            gsap.from(items, {
                opacity: 0,
                x: -20,
                stagger: 0.15,
                duration: 0.6,
                ease: 'power2.out'
            });
        }
    }, { scope: listRef });

    return (
        <div ref={listRef} className="w-full max-w-2xl mx-auto space-y-8 pl-4 border-l-2 border-gray-800 relative">
            {experiences.map((exp) => (
                <ExperienceCard key={exp.id} exp={exp} />
            ))}
        </div>
    );
};

export default ExperienceTimeline;
