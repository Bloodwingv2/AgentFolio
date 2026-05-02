import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { getBlogById } from '../data/blogData';
import { ChevronLeft, ChevronRight, Calendar, Clock } from 'lucide-react';

interface BlogContentProps {
  blogId: string;
  onBack: () => void;
  onNavigate: (direction: 'prev' | 'next') => void;
  hasNext: boolean;
  hasPrev: boolean;
}

const BlogContent: React.FC<BlogContentProps> = ({
  blogId,
  onBack,
  onNavigate,
  hasNext,
  hasPrev
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const post = getBlogById(blogId);

  useGSAP(() => {
    gsap.from(contentRef.current, {
      opacity: 0,
      y: 20,
      duration: 0.5,
      ease: "power3.out"
    });
  }, { scope: containerRef, dependencies: [blogId] });

  if (!post) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-[#686868]">Blog post not found</p>
      </div>
    );
  }

  const renderContent = () => {
    return post.content.map((block, idx) => {
      switch (block.type) {
        case 'paragraph':
          return (
            <p key={idx} className="text-sm sm:text-[15px] text-[#c0c0c0] leading-relaxed">
              {block.text}
            </p>
          );

        case 'heading':
          const headingSizes = {
            1: 'text-2xl sm:text-3xl',
            2: 'text-xl sm:text-2xl',
            3: 'text-lg sm:text-xl'
          };
          const Heading = `h${block.level}` as keyof JSX.IntrinsicElements;
          return React.createElement(
            Heading,
            {
              key: idx,
              className: `${headingSizes[block.level]} font-display font-bold text-white mt-6 sm:mt-7 mb-4 tracking-tight`
            },
            block.text
          );

        case 'image':
          return (
            <figure key={idx} className="my-6 sm:my-8">
              <img
                src={block.url}
                alt={block.alt}
                className="w-full rounded-lg border border-[#1f1f1f] object-cover"
              />
              {block.caption && (
                <figcaption className="text-xs sm:text-sm text-[#686868] text-center mt-2 italic">
                  {block.caption}
                </figcaption>
              )}
            </figure>
          );

        case 'code':
          return (
            <pre key={idx} className="bg-[#0f0f0f] border border-[#1f1f1f] rounded-lg p-4 overflow-x-auto my-4 sm:my-5">
              <code className={`text-xs sm:text-sm font-mono text-[#a0a0a0]`}>
                {block.content}
              </code>
            </pre>
          );

        case 'quote':
          return (
            <blockquote
              key={idx}
              className="border-l-4 border-blue-500 pl-4 py-2 my-6 sm:my-7 italic text-sm sm:text-[15px] text-[#a0a0a0] bg-[#0a0a0a] rounded-r-lg"
            >
              <p>{block.text}</p>
              {block.author && (
                <footer className="text-xs text-[#686868] mt-2 font-normal not-italic">
                  — {block.author}
                </footer>
              )}
            </blockquote>
          );

        case 'list':
          const ListTag = block.ordered ? 'ol' : 'ul';
          return (
            <ListTag
              key={idx}
              className={`my-4 sm:my-5 ${block.ordered ? 'list-decimal' : 'list-disc'} list-inside space-y-2`}
            >
              {block.items.map((item, itemIdx) => (
                <li key={itemIdx} className="text-sm sm:text-[15px] text-[#c0c0c0] leading-relaxed">
                  {item}
                </li>
              ))}
            </ListTag>
          );

        case 'divider':
          return (
            <hr
              key={idx}
              className="my-6 sm:my-8 border-[#1f1f1f]"
            />
          );

        default:
          return null;
      }
    });
  };

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col overflow-hidden bg-black">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-[#141414] shrink-0 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-3 py-1.5 text-sm text-[#686868] hover:text-white bg-[#0f0f0f] hover:bg-[#151515] border border-[#1f1f1f] rounded-lg transition-all"
        >
          <ChevronLeft size={16} />
          Back
        </button>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('prev')}
            disabled={!hasPrev}
            className="p-1.5 text-[#686868] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed bg-[#0f0f0f] hover:bg-[#151515] border border-[#1f1f1f] rounded-lg transition-all"
            title="Previous blog"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() => onNavigate('next')}
            disabled={!hasNext}
            className="p-1.5 text-[#686868] hover:text-white disabled:opacity-30 disabled:cursor-not-allowed bg-[#0f0f0f] hover:bg-[#151515] border border-[#1f1f1f] rounded-lg transition-all"
            title="Next blog"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} className="flex-1 overflow-y-auto">
        <article className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-3 mb-5 sm:mb-6">
            <span className="px-2.5 py-1 bg-blue-900/30 border border-blue-500/30 rounded-full text-xs font-semibold text-blue-400">
              {post.category}
            </span>
            <div className="flex items-center gap-4 text-xs text-[#686868]">
              <div className="flex items-center gap-1">
                <Calendar size={13} />
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
              <div className="flex items-center gap-1">
                <Clock size={13} />
                {post.readTime}
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight tracking-tight">
            {post.title}
          </h1>

          {/* Featured Image */}
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full rounded-xl border border-[#1f1f1f] mb-8 sm:mb-10 object-cover max-h-96"
            />
          )}

          {/* Body Content */}
          <div className="prose prose-invert max-w-none space-y-4 sm:space-y-5 text-[#c0c0c0]">
            {renderContent()}
          </div>

          {/* Footer */}
          <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-[#1f1f1f]">
            <p className="text-xs sm:text-sm text-[#686868]">
              Published on {new Date(post.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric'
              })}
            </p>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogContent;
