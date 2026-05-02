export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  content: BlogContent[];
  image?: string;
}

export type BlogContent = 
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 1 | 2 | 3; text: string }
  | { type: 'image'; url: string; alt: string; caption?: string }
  | { type: 'code'; language: string; content: string }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'divider' };

export const blogPosts: BlogPost[] = [
  {
    id: 'my-journey-ai',
    title: 'My Journey into AI and Machine Learning',
    excerpt: 'Exploring how I started my journey in artificial intelligence, the challenges I faced, and lessons learned along the way.',
    date: '2026-05-02',
    readTime: '8 min read',
    category: 'AI/ML',
    image: 'https://images.unsplash.com/photo-1677442d019cecf8d215b20d5b914a10?w=1200&h=600&fit=crop',
    content: [
      {
        type: 'paragraph',
        text: 'When I first started my career, I was fascinated by the possibilities of artificial intelligence. The idea that machines could learn, adapt, and solve complex problems seemed almost magical. Little did I know that this curiosity would shape my entire professional journey.'
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Beginning'
      },
      {
        type: 'paragraph',
        text: 'My interest in AI started during my university days when I took my first machine learning course. The combination of mathematics, programming, and problem-solving resonated with me immediately. I spent countless hours experimenting with different algorithms, datasets, and techniques.'
      },
      {
        type: 'paragraph',
        text: 'The first project I worked on was building a simple neural network to classify handwritten digits. While it might sound basic now, it was groundbreaking for me at that time. Seeing the model correctly predict digits from test data gave me an incredible sense of accomplishment and motivated me to dive deeper.'
      },
      {
        type: 'heading',
        level: 2,
        text: 'Overcoming Challenges'
      },
      {
        type: 'paragraph',
        text: 'The path to mastering AI was not straightforward. I encountered numerous challenges:'
      },
      {
        type: 'list',
        items: [
          'Understanding complex mathematical concepts behind algorithms',
          'Working with large, messy datasets and preprocessing them effectively',
          'Hyperparameter tuning and model optimization',
          'Balancing theory with practical implementation',
          'Staying updated with rapid advancements in the field'
        ]
      },
      {
        type: 'paragraph',
        text: 'Each challenge taught me valuable lessons. I learned that debugging machine learning models is fundamentally different from traditional software debugging. You need to think about data distribution, feature importance, and model assumptions.'
      },
      {
        type: 'heading',
        level: 2,
        text: 'Key Learnings'
      },
      {
        type: 'quote',
        text: 'The best part about AI is that it forces you to think differently about problems. You cannot just write code and hope it works; you need to understand the underlying mathematics and the data.',
        author: 'Lessons from Experience'
      },
      {
        type: 'paragraph',
        text: 'Through my journey, I learned that:'
      },
      {
        type: 'list',
        items: [
          'Data quality is more important than model complexity',
          'Understanding your data comes before building models',
          'Iteration and experimentation are key to success',
          'Communication of results is as important as the results themselves',
          'The field evolves rapidly, so continuous learning is essential'
        ],
        ordered: true
      },
      {
        type: 'heading',
        level: 2,
        text: 'Looking Forward'
      },
      {
        type: 'paragraph',
        text: 'As I continue my journey in AI, I\'m excited about the possibilities ahead. From natural language processing to computer vision, from reinforcement learning to generative models, there\'s always something new to explore. My goal is to contribute to making AI more accessible and beneficial for everyone.'
      },
      {
        type: 'paragraph',
        text: 'If you\'re interested in AI and machine learning, my advice would be: start building. Don\'t get caught up in learning every algorithm first. Pick a problem, get some data, and start experimenting. The learning will come naturally through practice.'
      }
    ]
  },
  {
    id: 'full-stack-insights',
    title: 'Full Stack Development: From Frontend to Backend',
    excerpt: 'My insights on building complete applications, handling both client-side and server-side challenges.',
    date: '2026-04-28',
    readTime: '6 min read',
    category: 'Web Development',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=1200&h=600&fit=crop',
    content: [
      {
        type: 'paragraph',
        text: 'Full stack development is about understanding the complete picture of how web applications work. It\'s not just about knowing JavaScript or Python; it\'s about understanding architecture, databases, APIs, and user experience.'
      },
      {
        type: 'heading',
        level: 2,
        text: 'What Does Full Stack Mean?'
      },
      {
        type: 'paragraph',
        text: 'Full stack development encompasses everything from the user interface that users interact with to the databases that store data. As a full stack developer, you need to understand:'
      },
      {
        type: 'list',
        items: [
          'Frontend technologies (HTML, CSS, JavaScript frameworks)',
          'Backend frameworks and APIs',
          'Database design and optimization',
          'DevOps and deployment',
          'Security best practices'
        ]
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Frontend Perspective'
      },
      {
        type: 'paragraph',
        text: 'Modern frontend development has evolved significantly. With frameworks like React, Vue, and Angular, building interactive user interfaces has become more structured and maintainable.'
      },
      {
        type: 'paragraph',
        text: 'When developing frontends, I always keep these principles in mind: performance matters, accessibility is not optional, and user experience is paramount. Every decision you make affects how users interact with your application.'
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Backend Reality'
      },
      {
        type: 'paragraph',
        text: 'While the frontend delights users, the backend ensures reliability. Backend development is about handling scalability, security, and data integrity. You need to think about database queries, caching strategies, and API design.'
      },
      {
        type: 'divider'
      },
      {
        type: 'paragraph',
        text: 'Building full stack applications is rewarding because you see the direct impact of your work from end to end. You understand why certain architectural decisions are made and can optimize accordingly.'
      }
    ]
  }
];

// Helper function to get blog post by ID
export const getBlogById = (id: string): BlogPost | undefined => {
  return blogPosts.find(post => post.id === id);
};

// Helper function to get all categories
export const getCategories = (): string[] => {
  return [...new Set(blogPosts.map(post => post.category))];
};
