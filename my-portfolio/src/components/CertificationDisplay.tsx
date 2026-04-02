import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import type { Certification } from '../data/portfolioData';

interface CertificationDisplayProps {
    certifications: Certification[];
}

const CertificationCard: React.FC<{ cert: Certification }> = ({ cert }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="bg-[#0d0d0d] border border-[#191919] rounded-2xl p-4 sm:p-5 hover:bg-[#111] hover:border-[#222] transition-all duration-200 group">
            <div className="flex items-start gap-3 sm:gap-4">

                {/* Logo */}
                <div className="w-10 h-10 sm:w-11 sm:h-11 bg-white rounded-xl flex items-center justify-center shrink-0 overflow-hidden">
                    <img
                        src={cert.icon}
                        alt={`${cert.issuer} logo`}
                        className="w-7 h-7 object-contain"
                    />
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3 mb-2">
                        <h3 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors duration-200 leading-snug">
                            {cert.name}
                        </h3>
                        <span className="font-mono text-[10px] text-[#555] bg-[#0a0a0a] border border-[#1d1d1d] px-2 py-0.5 rounded-md self-start shrink-0 whitespace-nowrap">
                            {cert.date}
                        </span>
                    </div>

                    <p className="text-xs text-blue-400/70 font-medium mb-3">
                        {cert.issuer}
                    </p>

                    {/* Expandable description */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-48 opacity-100 mb-3' : 'max-h-0 opacity-0 mb-0'}`}>
                        <p className="text-xs text-[#787878] leading-relaxed">
                            {cert.description}
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsExpanded(!isExpanded)}
                            className="flex items-center gap-1.5 text-[11px] font-mono text-[#505050] hover:text-blue-400/80 transition-colors py-1 px-2 rounded-lg hover:bg-[#141414] -ml-2"
                        >
                            <svg
                                className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                            </svg>
                            {isExpanded ? 'Show less' : 'Details'}
                        </button>

                        {cert.link && (
                            <a
                                href={cert.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#505050] hover:text-white transition-colors ml-auto"
                            >
                                View Credential
                                <ExternalLink size={11} className="shrink-0" />
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const CertificationDisplay: React.FC<CertificationDisplayProps> = ({ certifications }) => {
    return (
        <div className="flex flex-col gap-3 sm:gap-4 w-full max-w-3xl mx-auto">
            {certifications.map((cert) => (
                <CertificationCard key={cert.id} cert={cert} />
            ))}
        </div>
    );
};

export default CertificationDisplay;
