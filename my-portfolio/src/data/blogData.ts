export interface BlogAuthor {
  name: string;
  title?: string;
}

// ─── Content block types ────────────────────────────────────────────────────
// Add new posts by pushing a BlogPost object to the `blogPosts` array below.
// Each post's `content` array is made up of the block types listed here.
export type BlogContent =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 1 | 2 | 3; text: string }
  | { type: 'image'; url: string; alt: string; caption?: string }
  | { type: 'code'; language: string; content: string }
  | { type: 'quote'; text: string; author?: string }
  | { type: 'list'; items: string[]; ordered?: boolean }
  | { type: 'callout'; variant: 'info' | 'tip' | 'warning' | 'note'; title?: string; text: string }
  | { type: 'divider' };

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  tags?: string[];
  author?: BlogAuthor;
  content: BlogContent[];
}

export const blogPosts: BlogPost[] = [
  {
    id: 'qhack-tenderflow',
    title: 'Building TenderFlow at Q-Hack',
    excerpt: 'How our team built an AI-powered RFP automation platform in 24 hours — slashing tender costs from €25k to ~€100 in tokens.',
    date: '2026-05-03',
    readTime: '5 min read',
    category: 'Hackathon',
    tags: ['langgraph', 'ai-agents', 'llm', 'hackathon'],
    author: { name: 'Mirang Bhandari', title: 'Software Engineer' },
    content: [
      {
        type: 'paragraph',
        text: 'Q-Hack was a challenge set by ISTAR.AI — a competitive, invite-only hackathon where teams were screened before even getting in the door. The brief: build something that meaningfully applies AI to a real business problem. We picked one of the most overlooked pain points in the enterprise world — government tender responses.'
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Problem'
      },
      {
        type: 'paragraph',
        text: 'Responding to a government RFP (Request for Proposal) is brutal. A single tender can take weeks of work from multiple consultants, lawyers, and domain experts. The going rate? €20,000 to €30,000 per submission — and that\'s before you\'ve won a single contract. Most of that cost is just writing: rephrasing past proposals, assembling team CVs, reformatting methodology docs.'
      },
      {
        type: 'callout',
        variant: 'info',
        title: 'The Opportunity',
        text: 'If 80% of tender writing is retrieving and reformatting existing content, an LLM with a good knowledge base can do that draft in minutes — not weeks.'
      },
      {
        type: 'heading',
        level: 2,
        text: 'What We Built'
      },
      {
        type: 'paragraph',
        text: 'TenderFlow is an AI agent that takes a raw RFP document and produces a structured, high-quality draft response — in under 24 hours. It pulls from an organisation\'s internal knowledge base (past tenders, CVs, methodology docs) using vector search, drafts each section with Claude, scores the output across seven quality dimensions, and then hands control back to a human reviewer before anything goes out the door.'
      },
      {
        type: 'list',
        items: [
          'Automated RFP analysis — extracts requirements and compliance checklists',
          'pgvector-powered knowledge base retrieval over internal documents',
          'Multi-section drafting with source traceability',
          'Quality scoring across track record, methodology, team, compliance, and pricing',
          'Human-in-the-loop review with up to 3 iteration rounds',
          'DOCX export ready for submission'
        ]
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Stack'
      },
      {
        type: 'paragraph',
        text: 'The core of TenderFlow is a six-node LangGraph workflow. LangGraph let us model the tender process as an explicit state machine — each node does one job, the graph handles routing, and PostgreSQL checkpointing means the workflow survives restarts.'
      },
      {
        type: 'code',
        language: 'python',
        content: `# Simplified LangGraph workflow
from langgraph.graph import StateGraph

workflow = StateGraph(TenderState)

workflow.add_node("analyse_tender",  analyse_tender)
workflow.add_node("retrieve_context", retrieve_context)
workflow.add_node("draft_sections",  draft_sections)
workflow.add_node("human_review",    human_review)   # HITL interrupt
workflow.add_node("polish",          polish_sections)
workflow.add_node("export",          export_docx)

# graph pauses at human_review — resumes via API after edits
workflow.add_edge("draft_sections", "human_review")
workflow.add_edge("human_review",   "polish")`
      },
      {
        type: 'paragraph',
        text: 'We routed different LLM calls to different Claude models based on complexity. Opus handled the heavy analysis work — extracting requirements, building compliance checklists, scoring. Sonnet handled section drafting. Haiku processed simple, structured documents like company profiles where speed mattered more than depth.'
      },
      {
        type: 'callout',
        variant: 'tip',
        title: 'Model Routing',
        text: 'Not every LLM call needs your best model. Routing by task type — not just prompt complexity — cuts latency and cost significantly without hurting output quality.'
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Human-in-the-Loop Part'
      },
      {
        type: 'paragraph',
        text: 'Full automation was never the goal. Tenders are legal documents — you need a human to sign off. LangGraph\'s interrupt_before mechanism let us pause the workflow mid-execution, surface the draft in a split-pane review UI alongside the original RFP, and then resume exactly where it left off after the reviewer made edits. The state was persisted in Supabase the whole time, so nothing was lost between sessions.'
      },
      {
        type: 'quote',
        text: 'Automating 80% of the work and making the remaining 20% fast and focused is a better product than trying to automate 100%.',
        author: 'Mirang Bhandari'
      },
      {
        type: 'heading',
        level: 2,
        text: 'The Numbers'
      },
      {
        type: 'paragraph',
        text: 'A typical tender submission costs €20k–€30k in consultant time. TenderFlow brings that down to roughly €100 in API tokens — with a human reviewer still in the loop for quality and compliance. That\'s not a marginal improvement; it\'s a different order of magnitude.'
      },
      {
        type: 'divider'
      },
      {
        type: 'heading',
        level: 2,
        text: 'Beyond the Build'
      },
      {
        type: 'paragraph',
        text: 'We pitched TenderFlow to an investor panel at the end of the hackathon. The conversations that followed were as valuable as the build itself — talking with Y Combinator-backed founders about time-to-market, token economics, and what "profitability in the AI era" actually means when your infrastructure cost is measured in API calls.'
      },
      {
        type: 'paragraph',
        text: 'The thing I took away from Q-Hack: the best AI products right now aren\'t about replacing humans — they\'re about removing the tedious parts of a job so the expert can focus on the 20% that actually requires their judgement. That\'s what TenderFlow does, and it\'s a pattern worth building on.'
      }
    ]
  }
];

export const getBlogById = (id: string): BlogPost | undefined =>
  blogPosts.find(post => post.id === id);

export const getCategories = (): string[] =>
  [...new Set(blogPosts.map(post => post.category))];
