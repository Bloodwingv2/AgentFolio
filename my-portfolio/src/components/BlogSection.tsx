import React, { useState, useCallback } from 'react';
import BlogList from './BlogList';
import BlogContent from './BlogContent';
import { blogPosts } from '../data/blogData';

interface BlogSectionProps {
  onClose: () => void;
}

const BlogSection: React.FC<BlogSectionProps> = ({ onClose }) => {
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  const currentBlogIndex = selectedBlogId
    ? blogPosts.findIndex(post => post.id === selectedBlogId)
    : -1;

  const handleSelectBlog = useCallback((blogId: string) => {
    setSelectedBlogId(blogId);
  }, []);

  const handleNavigate = useCallback((direction: 'prev' | 'next') => {
    if (currentBlogIndex === -1) return;

    let newIndex: number;
    if (direction === 'prev') {
      newIndex = currentBlogIndex === 0 ? blogPosts.length - 1 : currentBlogIndex - 1;
    } else {
      newIndex = currentBlogIndex === blogPosts.length - 1 ? 0 : currentBlogIndex + 1;
    }

    setSelectedBlogId(blogPosts[newIndex].id);
  }, [currentBlogIndex]);

  const handleBack = useCallback(() => {
    setSelectedBlogId(null);
  }, []);

  if (selectedBlogId) {
    return (
      <BlogContent
        blogId={selectedBlogId}
        onBack={handleBack}
        onNavigate={handleNavigate}
        hasNext={currentBlogIndex < blogPosts.length - 1}
        hasPrev={currentBlogIndex > 0}
      />
    );
  }

  return (
    <BlogList onSelectBlog={handleSelectBlog} />
  );
};

export default BlogSection;
