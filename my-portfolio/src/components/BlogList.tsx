import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { blogPosts } from '../data/blogData';
import { Calendar, Clock, Tag } from 'lucide-react';

interface BlogListProps {
  onSelectBlog: (blogId: string) => void;
}

const BlogList: React.FC<BlogListProps> = ({ onSelectBlog }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.from(".blog-card", {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: "power3.out"
    });
  }, { scope: containerRef, dependencies: [] });

  return (
    <div ref={containerRef} className="w-full h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-4 sm:px-6 py-5 sm:py-6 border-b border-[#141414] shrink-0">
        <h2 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Blog
        </h2>
        <p className="text-sm text-[#686868] mt-2">
          Thoughts on technology, development, and more
        </p>
      </div>

      {/* Blog Posts Grid */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 sm:py-6">
        <div className="grid gap-4 sm:gap-5 max-w-2xl mx-auto">
          {blogPosts.map((post) => (
            <button
              key={post.id}
              onClick={() => onSelectBlog(post.id)}
              className="blog-card group flex flex-col bg-[#0c0c0c] border border-[#181818] hover:border-[#282828] rounded-xl overflow-hidden transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5 active:scale-[0.98]"
            >
              {/* Image */}
              {post.image && (
                <div className="relative h-40 sm:h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              )}

              {/* Content */}
              <div className="flex-1 p-4 sm:p-5 flex flex-col gap-3">
                {/* Category & Meta */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-1 bg-blue-900/30 border border-blue-500/30 rounded-full text-xs font-semibold text-blue-400">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3 text-[#545454] text-xs ml-auto">
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      {new Date(post.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      {post.readTime}
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display text-base sm:text-lg font-bold text-white leading-tight group-hover:text-blue-300 transition-colors">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-[#868686] leading-relaxed line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Read More */}
                <div className="pt-2">
                  <span className="text-xs font-medium text-blue-400 group-hover:text-blue-300 transition-colors">
                    Read Article →
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogList;
