import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Code, Cpu, Globe, Wrench } from 'lucide-react';

export interface SkillCategory {
    title: string;
    icon: string;
    skills: string[];
}

interface SkillsDisplayProps {
    skills: SkillCategory[];
}

const SkillsDisplay: React.FC<SkillsDisplayProps> = React.memo(({ skills }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        gsap.from(".skill-section", {
            y: 18,
            opacity: 0,
            duration: 0.45,
            stagger: 0.08,
            ease: "power2.out"
        });
    }, { scope: containerRef, dependencies: [] });

    const getIcon = (name: string) => {
        switch (name) {
            case 'code': return <Code size={16} />;
            case 'cpu': return <Cpu size={16} />;
            case 'globe': return <Globe size={16} />;
            case 'tool': return <Wrench size={16} />;
            default: return <Code size={16} />;
        }
    };

    return (
        <div ref={containerRef} className="flex flex-col gap-5 sm:gap-7 w-full">
            {skills.map((category, idx) => (
                <div key={idx} className="skill-section">
                    <div className="flex items-center gap-2 sm:gap-2.5 mb-3 sm:mb-4">
                        <span className="p-1.5 bg-[#111] rounded-lg text-blue-500/60 border border-[#1e1e1e]">
                            {getIcon(category.icon)}
                        </span>
                        <h4 className="font-display text-[12px] sm:text-[13px] tracking-wider text-[#b8b8b8]">
                            {category.title}
                        </h4>
                    </div>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {category.skills.map((skill, sIdx) => (
                            <span
                                key={sIdx}
                                className="px-3 py-1 sm:px-3.5 sm:py-1.5 bg-[#0d0d0d] border border-[#1e1e1e] rounded-full text-xs sm:text-[13px] font-medium text-[#787878] hover:border-blue-500/30 hover:text-[#d0d0d0] hover:bg-[#111] transition-all duration-150 cursor-default"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
});

export default SkillsDisplay;
