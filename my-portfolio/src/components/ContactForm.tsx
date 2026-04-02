import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Send, AlertCircle, CheckCircle, ExternalLink } from 'lucide-react';

const ContactForm: React.FC = () => {
    const form = useRef<HTMLFormElement>(null);
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [formData, setFormData] = useState({
        user_name: '',
        user_email: '',
        message: '',
        website: '' // Honeypot field
    });
    const startTime = useRef(Date.now());

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const sendEmail = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.website) {
            setStatus('success');
            return;
        }

        if (Date.now() - startTime.current < 2000) {
            setStatus('error');
            setErrorMessage("Please take a moment before sending.");
            return;
        }

        if (!formData.user_name || !formData.user_email || !formData.message) {
            setStatus('error');
            setErrorMessage("Please fill in all fields.");
            return;
        }

        setStatus('sending');

        try {
            await emailjs.sendForm(
                import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_id',
                import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_id',
                form.current!,
                import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'public_key'
            );
            setStatus('success');
        } catch (error: any) {
            console.error('EmailJS Error:', error);
            setStatus('error');
            setErrorMessage("Could not send your message. Please try the alternate form below.");
        }
    };

    if (status === 'success') {
        return (
            <div className="bg-[#0d0d0d] border border-green-500/15 rounded-2xl p-6 text-center w-full max-w-md">
                <div className="w-10 h-10 rounded-xl border border-green-500/20 bg-green-500/5 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={18} className="text-green-400" />
                </div>
                <h3 className="text-sm font-bold text-white font-display tracking-wider mb-1">Message Sent</h3>
                <p className="text-xs text-[#585858]">I'll get back to you soon.</p>
            </div>
        );
    }

    const inputClass = `w-full bg-[#080808] border border-[#1e1e1e] rounded-xl px-3 py-2.5 text-sm text-[#e0e0e0] placeholder:text-[#363636] focus:border-blue-500/30 focus:ring-1 focus:ring-blue-500/8 outline-none transition-all disabled:opacity-40 disabled:cursor-not-allowed`;

    return (
        <div className="bg-[#0d0d0d] border border-[#191919] rounded-2xl p-5 w-full max-w-md">

            {/* Header */}
            <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-xl border border-[#222] bg-[#111] flex items-center justify-center shrink-0">
                    <Mail size={14} className="text-[#585858]" />
                </div>
                <div>
                    <h3 className="text-[13px] font-display tracking-wider text-white">Get In Touch</h3>
                    <p className="text-[11px] text-[#484848] font-mono mt-0.5">Usually replies within 24h</p>
                </div>
            </div>

            <form ref={form} onSubmit={sendEmail} className="space-y-2.5">
                {/* Honeypot */}
                <div className="hidden">
                    <input
                        type="text"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        tabIndex={-1}
                        autoComplete="off"
                    />
                </div>

                <input
                    type="text"
                    name="user_name"
                    placeholder="Your name"
                    value={formData.user_name}
                    onChange={handleChange}
                    className={inputClass}
                    disabled={status === 'sending'}
                />

                <input
                    type="email"
                    name="user_email"
                    placeholder="your@email.com"
                    value={formData.user_email}
                    onChange={handleChange}
                    className={inputClass}
                    disabled={status === 'sending'}
                />

                <textarea
                    name="message"
                    placeholder="What's on your mind?"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                    disabled={status === 'sending'}
                />

                {status === 'error' && (
                    <div className="flex items-start gap-2.5 bg-red-500/5 border border-red-500/15 rounded-xl p-3 text-xs">
                        <AlertCircle size={13} className="mt-0.5 shrink-0 text-red-400/80" />
                        <div className="flex-1">
                            <p className="text-red-400/80 mb-2">{errorMessage}</p>
                            <a
                                href="https://mirang.framer.ai/form-submit"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-[11px] text-[#686868] hover:text-white border border-[#242424] hover:border-[#333] px-2.5 py-1 rounded-lg transition-all"
                            >
                                Try alternate form
                                <ExternalLink size={10} />
                            </a>
                        </div>
                    </div>
                )}

                <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed text-white font-semibold text-sm py-2.5 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-1"
                >
                    {status === 'sending' ? (
                        <>
                            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            <Send size={13} />
                            Send Message
                        </>
                    )}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
