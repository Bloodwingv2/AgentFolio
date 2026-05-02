# Blog System Guide

This blog system is designed to be easy to edit and maintain. All blog content is stored in a single file that you can easily modify.

## Quick Start

### Adding a New Blog Post

1. Open [src/data/blogData.ts](../data/blogData.ts)
2. Add a new object to the `blogPosts` array following this structure:

```typescript
{
  id: 'unique-id-slug',
  title: 'Your Blog Title',
  excerpt: 'A short summary of your blog post (2-3 sentences)',
  date: '2026-05-02',
  readTime: '5 min read',
  category: 'Category Name',
  image: 'https://image-url-here.com/image.jpg',
  content: [
    // Content blocks go here (see Content Blocks section)
  ]
}
```

## Content Blocks

The `content` array uses a flexible block system. You can mix and match these blocks:

### 1. Paragraph
```typescript
{ type: 'paragraph', text: 'Your paragraph text here.' }
```

### 2. Heading
```typescript
{ type: 'heading', level: 1, text: 'Main Heading' }
{ type: 'heading', level: 2, text: 'Subheading' }
{ type: 'heading', level: 3, text: 'Sub-subheading' }
```

### 3. Image
```typescript
{
  type: 'image',
  url: 'https://image-url.com/image.jpg',
  alt: 'Description for accessibility',
  caption: 'Optional image caption'
}
```

### 4. Code Block
```typescript
{
  type: 'code',
  language: 'javascript', // or 'python', 'typescript', etc.
  content: `function hello() {
  console.log('Hello, World!');
}`
}
```

### 5. Quote
```typescript
{
  type: 'quote',
  text: 'The quote text',
  author: 'Author Name (optional)'
}
```

### 6. List
```typescript
// Unordered list
{ type: 'list', items: ['Item 1', 'Item 2', 'Item 3'] }

// Ordered list
{ type: 'list', items: ['First', 'Second', 'Third'], ordered: true }
```

### 7. Divider
```typescript
{ type: 'divider' }
```

## Complete Example

```typescript
{
  id: 'learning-react',
  title: 'My Journey Learning React',
  excerpt: 'How I learned React and the key concepts that helped me master it.',
  date: '2026-05-02',
  readTime: '7 min read',
  category: 'Web Development',
  image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&h=600&fit=crop',
  content: [
    {
      type: 'paragraph',
      text: 'React has been a game-changer in my development journey. Here\'s what I learned.'
    },
    {
      type: 'heading',
      level: 2,
      text: 'Getting Started'
    },
    {
      type: 'paragraph',
      text: 'The first thing I did was understand components and JSX.'
    },
    {
      type: 'code',
      language: 'javascript',
      content: `import React from 'react';

const App = () => {
  return <h1>Hello, React!</h1>;
};

export default App;`
    },
    {
      type: 'list',
      items: ['Components', 'Props', 'State', 'Hooks'],
      ordered: true
    },
    {
      type: 'quote',
      text: 'React makes building UIs fun and intuitive.',
      author: 'Me'
    }
  ]
}
```

## Styling Notes

- **Font**: Blog uses the same "Orbitron" display font as your skills section for headings
- **Color scheme**: Dark theme matching your portfolio
- **Images**: Automatically responsive and styled with borders
- **Responsive**: Automatically scales for mobile and desktop

## Tips for Writing Great Blog Posts

1. **Start with a strong excerpt** - This appears in the blog list
2. **Use images** - A featured image on top helps with visual appeal
3. **Break up content** - Use headings, lists, and quotes to make content scannable
4. **Code examples** - Include practical code when discussing technical topics
5. **Read time** - Estimate based on: ~200 words per minute for paragraphs

## Navigation Features

- **Blog List**: Shows all posts with featured images, categories, and read time
- **Blog Content**: Display individual posts with navigation arrows to cycle through other blogs
- **Back Button**: Easy way to return to the blog list
- **Responsive Design**: Works seamlessly on mobile and desktop

## Categories

You can create any category you want. Common ones include:
- Web Development
- AI/ML
- Career
- Tutorials
- Reflections
- Project Retrospectives

## Image URLs

For best results, use:
- **Featured images**: 1200x600px or similar aspect ratio
- **Inline images**: Can be any size, will be responsive
- **Source**: Unsplash, Pexels, your own hosted images, or any CORS-enabled CDN

## FAQ

**Q: How do I change the order of blogs?**
A: Move the blog object up or down in the `blogPosts` array. The first one appears first.

**Q: Can I update an existing post?**
A: Yes! Just modify the object in the array. The changes will appear immediately.

**Q: How do I unpublish a blog?**
A: Comment out or remove the object from the `blogPosts` array.

**Q: Can I add custom HTML/Markdown?**
A: Currently, the system uses typed blocks. Keep content in these blocks for consistency.

---

Happy blogging! 📝
