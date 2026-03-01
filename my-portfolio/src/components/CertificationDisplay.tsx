import React, { useState } from 'react';
import { ExternalLink } from 'lucide-react';
import type { Certification } from '../data/portfolioData';

interface CertificationDisplayProps {
    certifications: Certification[];
}

const CertificationCard: React.FC<{ cert: Certification }> = ({ cert }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className="group">
            <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-4 sm:p-5 hover:bg-gray-900/60 hover:border-gray-700 transition-all duration-300">
                <div className="flex items-start gap-4">
                    {/* Icon Box */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg p-2 shrink-0 flex items-center justify-center overflow-hidden">
                        <img
                            src={cert.icon}
                            alt={`${cert.name} logo`}
                            className="w-full h-full object-contain"
                        />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-2 mb-2">
                            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-blue-400 transition-colors leading-tight">
                                {cert.name}
                            </h3>
                            <span className="text-[10px] sm:text-xs font-mono text-gray-400 bg-gray-800/50 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded self-start shrink-0">
                                {cert.date}
                            </span>
                        </div>

                        <p className="text-xs sm:text-sm text-blue-300 mb-2 font-medium">
                            {cert.issuer}
                        </p>

                        {/* Collapsible Text Area */}
                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-48 opacity-100 mb-4' : 'max-h-0 opacity-0 mb-0'}`}>
                            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                                {cert.description}
                            </p>
                        </div>

                        <div className="flex items-center gap-4 mt-2">
                            <button
                                onClick={() => setIsExpanded(!isExpanded)}
                                className="text-xs font-semibold text-blue-400 hover:text-blue-300 transition-colors py-1 px-2 rounded-md hover:bg-blue-400/10 -ml-2 select-none"
                            >
                                {isExpanded ? 'Hide details' : 'Show details'}
                            </button>

                            {cert.link && (
                                <a
                                    href={cert.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs font-medium text-gray-400 hover:text-white transition-colors hover:underline ml-auto"
                                >
                                    View Credential <ExternalLink size={12} className="shrink-0" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CertificationDisplay: React.FC<CertificationDisplayProps> = ({ certifications }) => {

    return (
        <div className="flex flex-col gap-4 sm:gap-6 w-full max-w-3xl mx-auto">
            {certifications.map((cert) => (
                <CertificationCard key={cert.id} cert={cert} />
            ))}
        </div>
    );
};

export default CertificationDisplay;
