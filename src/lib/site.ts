import type { Metadata } from 'next';
export const site = {
    name: 'Parth Pipaliya',
    url: 'https://parthpipaliya.com',
    email: 'parthpipaliya1712@gmail.com',
    phone: '+917383274687',
    linkedin: 'https://www.linkedin.com/in/parthpipaliya/',
    github: 'https://github.com/Pipaliya1712',
};
export function pageMetadata(title: string, description: string, path: string): Metadata {
    return {
        title, description, alternates: { canonical: path },
        openGraph: { title: `${title} | ${site.name}`, description, url: path, type: 'website', images: ['/opengraph-image'] },
        twitter: { card: 'summary_large_image', title, description, images: ['/opengraph-image'] },
    };
}
export const services = [
    {
        slug: 'ai-engineering', number: '01', title: 'AI engineering', short: 'Useful intelligence. Built into your business.',
        description: 'Turn your documents, data, and workflows into tools your team can actually use. From a focused proof of concept to an integrated AI application.',
        icon: 'ai', deliverables: ['Document search and RAG applications', 'Conversational analytics and natural-language SQL', 'OCR and document processing pipelines', 'Evaluation, retrieval, and human review workflows'],
        fit: 'Your team spends too much time finding information, interpreting documents, or repeating manual tasks.',
        approach: 'Start with a representative dataset and a clearly defined task. Test retrieval quality and failure cases before connecting the application to a wider workflow.',
    },
    {
        slug: 'web-development', number: '02', title: 'Web & application development', short: 'A considered interface. A dependable foundation.',
        description: 'Build a business website, customer portal, or internal application with equal attention to the experience people see and the systems behind it.',
        icon: 'web', deliverables: ['React and Next.js websites and applications', 'Node.js and Python API development', 'Database design and third-party integrations', 'Responsive interfaces and technical SEO'],
        fit: 'You need a new product, a more capable website, or a practical way to replace a spreadsheet-based process.',
        approach: 'Map the core user journey, agree on the first useful release, and build in reviewable increments. Include accessibility, performance, and handover in the delivery plan.',
    },
    {
        slug: 'systems-integration', number: '03', title: 'Systems & workflow integration', short: 'Connect the tools. Remove the busywork.',
        description: 'Help existing systems work together through well-defined APIs, data pipelines, and automation, without adding unnecessary complexity.',
        icon: 'systems', deliverables: ['API and business system integrations', 'Backend services and workflow automation', 'Structured and unstructured data pipelines', 'Caching, logging, and operational visibility'],
        fit: 'Your tools hold the right data, but people still copy it between systems or assemble reports by hand.',
        approach: 'Understand the source systems and data boundaries first. Define ownership, error handling, and recovery so the integration remains understandable after launch.',
    },
    {
        slug: 'technical-consulting', number: '04', title: 'Technical consulting', short: 'Make the next technical decision with clarity.',
        description: 'An independent engineering perspective on your product idea, architecture, or AI opportunity, with practical recommendations you can act on.',
        icon: 'consulting', deliverables: ['Product and technical discovery', 'AI feasibility and implementation planning', 'Architecture and stack recommendations', 'Prioritised delivery plans and technical reviews'],
        fit: 'You have a business problem or product idea, but need clarity on scope, feasibility, and the right starting point.',
        approach: 'Review the goal, constraints, and current setup. Compare realistic options and leave you with a written recommendation, risks, and a proposed next step.',
    },
];
export const projects = [
    {
        slug: 'mybot-genie', title: 'Document knowledge assistant', category: 'Knowledge systems', type: 'AI engineering', visual: 'knowledge',
        summary: 'Making business knowledge easier to find through a multi-tenant, document-grounded assistant.',
        context: 'Business information often sits across PDFs, scanned documents, and internal knowledge sources. A useful assistant needs to retrieve that information while keeping separate organisations’ content apart.',
        contribution: 'Work on a multi-tenant AI chatbot with OCR-based document ingestion, embeddings, Milvus retrieval, multilingual interactions, and embeddable chat widgets.',
        decisions: ['Treat document ingestion and retrieval as separate stages.', 'Use OCR to make scanned content searchable.', 'Support an embeddable interface for access within existing websites.', 'Keep tenant boundaries central to the application design.'],
        stack: ['Python', 'OCR', 'Milvus', 'LLMs', 'Next.js'],
        takeaway: 'A knowledge assistant is a retrieval and information-design problem as much as a conversation interface.',
    },
    {
        slug: 'sap-copilot', title: 'Natural-language analytics', category: 'Business intelligence', type: 'Systems integration', visual: 'analytics',
        summary: 'Exploring business data through natural-language questions and structured analytics.',
        context: 'Business teams need answers from structured data without turning every question into a custom reporting request. Natural-language querying adds a more approachable entry point.',
        contribution: 'Work on natural-language-to-SQL workflows using VannaAI, semantic retrieval with Qdrant and Milvus, Redis caching, and automated data visualisations.',
        decisions: ['Use schema context to guide query generation.', 'Separate data retrieval from the presentation of results.', 'Use caching where repeated queries make it appropriate.', 'Treat generated SQL as something to validate, rather than trust by default.'],
        stack: ['VannaAI', 'Qdrant', 'Milvus', 'Redis', 'SQL'],
        takeaway: 'The interface can feel conversational while the underlying data access stays structured and deliberate.',
    },
    {
        slug: 'code-assistant', title: 'AI-powered code assistant', category: 'Developer tools', type: 'AI engineering', visual: 'code',
        summary: 'Connecting natural-language questions to relevant code context and developer workflows.',
        context: 'Understanding an unfamiliar codebase requires finding the right files and the relationships between them. General-purpose answers are less useful when they lack repository context.',
        contribution: 'A code-assistance project using FastAPI, Next.js, vector search, and a RAG pipeline with semantic chunking. The project also explored natural-language Git operations.',
        decisions: ['Chunk source material around meaningful context.', 'Retrieve relevant code before generating an answer.', 'Keep the application interface separate from retrieval services.', 'Make consequential repository actions explicit to the user.'],
        stack: ['FastAPI', 'Next.js', 'Qdrant', 'Milvus', 'RAG'],
        takeaway: 'Developer assistance becomes more useful when answers are grounded in the code people are actually working with.',
    },
    {
        slug: 'resume-reader', title: 'Resume Reader AI', category: 'Document workflows', type: 'Application development', visual: 'documents',
        summary: 'Turning unstructured resumes into information that is easier to review and compare.',
        context: 'Resume information arrives in inconsistent layouts and file formats. Reviewing it becomes repetitive when essential details must be extracted by hand.',
        contribution: 'An AI-assisted resume parsing application with PDF processing, structured information extraction, and ATS compatibility feedback.',
        decisions: ['Separate document extraction from interpretation.', 'Present extracted information in a consistent structure.', 'Keep the original document available for human review.', 'Describe compatibility feedback as guidance rather than a hiring decision.'],
        stack: ['Python', 'NLP', 'PDF processing', 'React', 'Node.js'],
        takeaway: 'Document automation should make review easier while leaving consequential decisions with a person.',
    },
];
export const processSteps = [
    { title: 'Understand the problem', text: 'Discuss your goals, users, existing systems, and constraints. Agree on what a useful outcome looks like.' },
    { title: 'Make a clear plan', text: 'Define scope, technical approach, deliverables, and review points before implementation begins.' },
    { title: 'Build with visibility', text: 'Review working increments, discuss trade-offs, and adjust early while changes are still inexpensive.' },
    { title: 'Launch with a handover', text: 'Test the agreed workflows, document the setup, and discuss maintenance and support before handover.' },
];
export const articles = [
    {
        slug: 'before-you-build-an-ai-assistant', category: 'AI engineering', title: 'Before you build an AI assistant, define a useful answer.',
        excerpt: 'A practical starting point for teams considering an assistant for their documents or internal knowledge.', readTime: '4 min read',
        sections: [
            { heading: 'Start with the questions people already ask', text: 'Collect a small set of real questions from the people who will use the assistant. Include straightforward requests, questions that need several sources, and questions the system should decline to answer. This gives the project a concrete target before anyone chooses a model or vector database.' },
            { heading: 'Check whether your source material can support an answer', text: 'A language model cannot repair missing or contradictory business information. Review the documents for ownership, freshness, permissions, and readable structure. Scanned PDFs may need OCR. Older versions may need to be excluded. These details often shape the usefulness of the final experience more than the chat interface.' },
            { heading: 'Decide how to handle uncertainty', text: 'A grounded assistant should be able to say that it does not have enough information. Agree on when to show sources, when to ask a clarifying question, and when to direct someone to a person. A confident answer that the evidence cannot support is a product failure.' },
            { heading: 'Evaluate a small workflow before expanding', text: 'Test the initial question set against representative documents. Review answer relevance, source quality, latency, and the cost of a typical conversation. Only expand the scope after the first workflow is useful. The goal is a dependable tool for a specific task, with a clear path for improving it.' },
        ],
    },
    {
        slug: 'planning-a-business-website', category: 'Product & delivery', title: 'Your business website needs a brief before it needs a design.',
        excerpt: 'The decisions that make a website project easier to scope, build, and maintain.', readTime: '3 min read',
        sections: [
            { heading: 'Choose the primary action', text: 'A business website should make its next step obvious. That might be starting a project enquiry, requesting a demo, or finding the right service. Pick the action that matters most and build the page structure around helping a visitor decide whether to take it.' },
            { heading: 'Gather evidence before writing claims', text: 'Collect real project details, relevant experience, approved images, and contact information. If a client name or result cannot be shared, explain the type of work and your contribution without inventing a substitute. Specific, modest descriptions are easier for a prospective client to evaluate than broad promises.' },
            { heading: 'Treat content as part of the build', text: 'A service page should explain the problem, who the service fits, what the engagement could include, and how to start. An about page should make the person behind the work visible. These are design inputs, not copy to squeeze into a finished template.' },
            { heading: 'Plan the handover', text: 'Decide who will update the content, where enquiries will go, and who owns the domain and hosting. Include accessible forms, page metadata, mobile behaviour, and a sensible maintenance plan in the scope. A launch is a transition into ongoing use.' },
        ],
    },
    {
        slug: 'integrations-that-remain-maintainable', category: 'Systems integration', title: 'A useful integration also needs a plan for when it fails.',
        excerpt: 'Data ownership, retries, and visibility deserve a place in the first technical discussion.', readTime: '3 min read',
        sections: [
            { heading: 'Name the source of truth', text: 'When two systems share information, decide which one owns each field. Without that agreement, a simple synchronisation can turn into competing updates. Document the direction of each data flow and what should happen when values disagree.' },
            { heading: 'Expect imperfect conditions', text: 'External services become unavailable, rate limits are reached, and requests time out. Plan bounded retries and make repeated operations safe where possible. For workflows that cannot complete immediately, give the team a visible way to identify and resolve incomplete work.' },
            { heading: 'Keep a useful operational record', text: 'Log enough information to trace a failed operation without copying sensitive business data into every log line. A correlation identifier, event type, timestamp, and clear failure reason can make investigation more manageable. Decide who should receive an alert and what action they can take.' },
            { heading: 'Make ownership explicit', text: 'An integration needs someone responsible for credentials, changes to third-party APIs, and recovery after a failure. Include that responsibility in the handover. A technically successful connection is only useful if a team can continue operating it.' },
        ],
    },
];
