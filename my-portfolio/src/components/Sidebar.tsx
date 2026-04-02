import React from 'react';
import { X, Trash2, Terminal, ChevronRight } from 'lucide-react';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    onClear: () => void;
    onCommandSelect: (cmd: string) => void;
    isDisabled?: boolean;
}

const secretCommands = [
    { cmd: 'help', desc: 'System manual' },
    { cmd: 'clear', desc: 'Clear terminal' },
    { cmd: 'matrix', desc: 'Enter simulation' },
];

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose, onClear, onCommandSelect, isDisabled = false }) => {
    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={onClose}
            />

            {/* Panel */}
            <div
                className={`fixed top-0 left-0 h-full w-72 sm:w-80 bg-[#090909] border-r border-[#161616] z-50 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex flex-col h-full p-5">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-7">
                        <h2 className="text-[15px] font-bold text-white flex items-center gap-2 font-display tracking-wide">
                            <Terminal size={16} className="text-[#505050]" />
                            <span>System Control</span>
                        </h2>
                        <button
                            onClick={onClose}
                            className="p-1.5 hover:bg-[#141414] rounded-lg text-[#484848] hover:text-white transition-colors"
                        >
                            <X size={17} />
                        </button>
                    </div>

                    {/* Commands */}
                    <div className="flex-1 overflow-y-auto">
                        <h3 className="text-[10px] font-semibold text-[#383838] uppercase tracking-[0.15em] mb-3 px-1 font-mono">
                            Secret Commands
                        </h3>
                        <div className="space-y-0.5">
                            {secretCommands.map((item, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => {
                                        if (!isDisabled) {
                                            onCommandSelect(item.cmd);
                                            onClose();
                                        }
                                    }}
                                    disabled={isDisabled}
                                    className={`w-full text-left group p-2.5 rounded-xl transition-all ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'hover:bg-[#141414]'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-6 h-6 flex items-center justify-center rounded-lg border transition-colors ${
                                            isDisabled
                                                ? 'bg-[#111] border-[#1a1a1a] text-[#383838]'
                                                : 'bg-[#111] border-[#1e1e1e] text-[#505050] group-hover:border-[#2a2a2a] group-hover:text-[#909090]'
                                        }`}>
                                            <ChevronRight size={12} />
                                        </div>
                                        <div>
                                            <code className={`text-sm font-medium font-mono block ${isDisabled ? 'text-[#444]' : 'text-[#c0c0c0]'}`}>
                                                {item.cmd}
                                            </code>
                                            <p className={`text-xs ${isDisabled ? 'text-[#333]' : 'text-[#484848]'}`}>
                                                {item.desc}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="pt-5 border-t border-[#141414] mt-auto">
                        <button
                            onClick={() => {
                                if (!isDisabled) {
                                    onClear();
                                    onClose();
                                }
                            }}
                            disabled={isDisabled}
                            className={`w-full py-2.5 px-4 flex items-center justify-center gap-2 rounded-xl transition-colors border text-sm font-medium ${
                                isDisabled
                                    ? 'bg-red-500/5 text-red-500/30 border-red-500/8 cursor-not-allowed'
                                    : 'bg-red-500/8 hover:bg-red-500/15 text-red-500/70 hover:text-red-400 border-red-500/15 hover:border-red-500/30'
                            }`}
                        >
                            <Trash2 size={15} />
                            <span>Clear Chat History</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
