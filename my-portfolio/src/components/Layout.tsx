import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { Github, Linkedin, Twitter, ExternalLink, Menu } from 'lucide-react';
import agentfolioLogo from '../assets/Agentfolio_Logo.png';

interface LayoutProps {
    children: React.ReactNode;
    onHomeClick?: () => void;
    onMenuClick?: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onHomeClick, onMenuClick }) => {
    return (
        <div className="flex flex-col h-[100dvh] w-full max-w-4xl mx-auto px-3 sm:px-5 font-sans">
            <header className="flex justify-between items-center py-3 sm:py-4 border-b border-[#141414] mb-2 sm:mb-4 z-20 relative shrink-0">
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Mobile menu button */}
                    <button
                        onClick={onMenuClick}
                        className="sm:hidden p-1.5 -ml-1 text-[#505050] hover:text-white transition-colors rounded-lg hover:bg-[#141414]"
                        aria-label="Open Menu"
                    >
                        <Menu size={19} />
                    </button>

                    {/* Logo */}
                    <div
                        className="flex items-center gap-2.5 cursor-pointer group"
                        onClick={onHomeClick}
                        title="Back to Home"
                    >
                        <div
                            className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl border border-[#222] group-hover:border-[#333] transition-colors"
                            style={{
                                backgroundImage: `url(${agentfolioLogo})`,
                                backgroundSize: '178%',
                                backgroundPosition: 'center',
                            }}
                        />
                        <h1 className="text-base sm:text-[17px] font-bold font-display tracking-tight leading-none">
                            <span className="text-white group-hover:text-blue-300 transition-colors duration-200">AgentFolio</span>
                        </h1>
                    </div>
                </div>

                {/* Social links */}
                <div className="flex items-center gap-1">
                    {portfolioData.socials.map((social) => {
                        const Icon = social.name.includes('GitHub') ? Github :
                            social.name.includes('LinkedIn') ? Linkedin :
                                social.name.includes('Twitter') ? Twitter : ExternalLink;
                        return (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-[#525252] hover:text-white hover:bg-[#141414] rounded-lg transition-all duration-150"
                                title={social.name}
                            >
                                <Icon size={16} />
                            </a>
                        );
                    })}
                </div>
            </header>

            <main className="flex-1 overflow-hidden flex flex-col relative">
                {children}
            </main>
        </div>
    );
};

export default Layout;
