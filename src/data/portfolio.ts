// Public, reviewed facts shared by the website and the proposed assistant update.
export const profile = {
  name: "Sobhe Mosaad",
  location: "Malta",
  role: "Workforce Coordinator",
  headline: "I turn complexity into solutions.",
  identity:
    "Workforce Management · Data Intelligence · Technology · Leadership",
  intro:
    "I'm Sobhe Mosaad, a workforce management professional, technology builder and problem solver based in Malta.",
  philosophy:
    "I believe effective leadership is about creating clarity, enabling people to succeed, encouraging ownership and building an environment where continuous improvement becomes part of everyday work.",
  email: "sobhemosaad@gmail.com",
  linkedin: "https://www.linkedin.com/in/sobhe-mosaad/",
  resume: "/Sobhe_Mosaad_Resume.pdf",
  education:
    "Bachelor of Commerce — Helwan University · Accounting Major · Class of 2022",
};

export const chapters = [
  {
    title: "Where it all began",
    place: "Egypt · Helwan University",
    text: "Accounting taught me to look beneath the numbers. Graduating in 2022 with a Bachelor of Commerce gave me a foundation in analytical thinking, financial structures and how organisations work.",
    focus: "Understanding the business",
  },
  {
    title: "Discovering the power of data",
    place: "Egypt · talabat, part of Delivery Hero",
    text: "Workforce planning opened the door to operational analytics, forecasting and automation. BigQuery, Python, API integrations and performance dashboards became tools for answering practical questions. This chapter also included managing a team of 17 members.",
    focus: "Turning information into decisions",
  },
  {
    title: "A new country, a new challenge",
    place: "Malta · Centrecom",
    text: "Joining Centrecom brought a new professional environment and new operational requirements. Working across teams and systems expanded my workforce management experience and strengthened my adaptability.",
    focus: "Learning across environments",
  },
  {
    title: "From analysing to leading",
    place: "Workforce Coordinator",
    text: "Today I combine analytical expertise with leadership of 4 Workforce Planners and 13 Real-Time Management team members. Forecasting, capacity, scheduling and adherence sit alongside stakeholder collaboration, recruitment assessments and team development.",
    focus: "Creating clarity for people",
  },
  {
    title: "From using systems to building them",
    place: "Operations × engineering",
    text: "When a process reaches its limits, I explore what could work better: databases, SQL, APIs, automated workflows, business applications and infrastructure. The Injixo/Peopleware to NICE IEX migration brought together workflow mapping, PostgreSQL extraction, integration and data validation.",
    focus: "Connecting business needs with systems",
  },
  {
    title: "Building what comes next",
    place: "An ongoing journey",
    text: "My current focus brings together operational experience, leadership, artificial intelligence and technology. Intelligent knowledge systems and workforce automation are part of a journey that is still unfolding.",
    focus: "Curiosity as a direction",
  },
];

export const methodology = [
  [
    "Understand",
    "Start with the actual business problem: who is affected, what decision is needed and what a useful result looks like.",
  ],
  [
    "Analyse",
    "Explore relevant data, challenge assumptions and separate symptoms from root causes.",
  ],
  [
    "Design",
    "Map a practical solution around people, workflows, constraints and the systems already in place.",
  ],
  [
    "Build",
    "Turn the design into a model, workflow, integration or application that can be used and maintained.",
  ],
  [
    "Validate",
    "Check the result against source data and operational needs. Test edge cases and listen to the people using it.",
  ],
  [
    "Improve",
    "Refine the solution as requirements evolve. Look for the next repetitive task, unclear process or avoidable limitation.",
  ],
];

export type Project = {
  slug: string;
  title: string;
  type: string;
  status: string;
  summary: string;
  challenge: string;
  importance: string;
  approach: string;
  built: string;
  tech: string[];
  outcome: string;
  lessons: string;
  flow: string[];
};
export const projects: Project[] = [
  {
    slug: "knowledge-hub",
    title: "AI-Powered Knowledge Hub",
    type: "Ongoing development",
    status: "In development",
    summary:
      "Making fragmented business knowledge accessible, structured and useful.",
    challenge:
      "Operational knowledge is scattered across documents and project-specific sources. Finding an answer is only useful when it is accurate and relevant to the question.",
    importance:
      "People need consistent guidance without losing the context that makes an answer trustworthy.",
    approach:
      "Investigate retrieval and response problems, design improvements, test solutions and develop the platform through AI-assisted software development.",
    built:
      "The platform includes or is being developed around project knowledge bases, document management, context-aware question answering, custom response rules and Q&A, administration, workforce analysis, duty rosters, task monitoring and knowledge certification. These are areas of ongoing development, not a claim that every feature is complete.",
    tech: [
      "Artificial Intelligence",
      "Knowledge Engineering",
      "RAG concepts",
      "AI-Assisted Software Development",
    ],
    outcome:
      "Current objective: reliable access to business knowledge with useful operational support and appropriate security boundaries.",
    lessons:
      "Document quality, retrieval relevance, hallucinations and response consistency require explicit investigation and validation. A confident answer is not evidence of a correct answer.",
    flow: [
      "Project documents",
      "Structured knowledge",
      "Context retrieval",
      "Answer + validation",
    ],
  },
  {
    slug: "workforce-automation",
    title: "Workforce Intelligence & Automation",
    type: "Professional operational work",
    status: "Practical operational experience",
    summary:
      "Connecting planning decisions with dependable data and less repetitive work.",
    challenge:
      "Reporting, staffing and scheduling depend on data from multiple sources, often with repetitive manual steps.",
    importance:
      "Operational decisions need timely, understandable information and models that reflect the realities of a workforce.",
    approach:
      "Map the workflow, validate inputs, model demand and capacity, automate repeatable steps and make outputs understandable to stakeholders.",
    built:
      "Experience spans automated reporting, staffing models, forecast accuracy, absenteeism, scheduling optimisation, adherence, overtime, leave management, dashboards and data validation.",
    tech: [
      "Excel",
      "VBA",
      "Power Query",
      "Power BI",
      "Power Automate",
      "PowerApps",
      "SQL",
      "Google Apps Script",
      "REST APIs",
    ],
    outcome:
      "The work supports planning and operational decision-making. No unverified efficiency or financial impact figures are presented.",
    lessons:
      "Automation needs clear ownership, dependable inputs and a process people understand. Technical correctness and operational usefulness must be checked together.",
    flow: [
      "Operational sources",
      "Validate + model",
      "Automate workflow",
      "Decision support",
    ],
  },
  {
    slug: "wfm-migration",
    title: "Workforce Management System Migration",
    type: "Professional operational work",
    status: "Migration experience",
    summary:
      "Bridging business requirements and technical detail, from Peopleware to NICE IEX.",
    challenge:
      "Moving from Injixo/Peopleware to NICE IEX requires alignment between existing workflows, source data and the new platform.",
    importance:
      "Workforce planning and reporting must remain useful while systems and data structures change.",
    approach:
      "Understand workflows and reporting requirements, plan migration steps, extract and transform data, then validate cross-platform alignment.",
    built:
      "Contributed technical and operational understanding across PostgreSQL extraction, migration planning, data transformation, validation, integration and process optimisation.",
    tech: [
      "NICE IEX",
      "Injixo/Peopleware",
      "PostgreSQL",
      "SQL",
      "Data validation",
    ],
    outcome:
      "The focus was operational continuity and alignment with business requirements. Exact delivery dates and quantified results have not been supplied.",
    lessons:
      "A migration is more than transferring records. Reporting definitions, workflow assumptions and validation rules need shared understanding.",
    flow: [
      "Existing workflows",
      "Extract + transform",
      "Cross-platform validation",
      "Operational continuity",
    ],
  },
  {
    slug: "exoria",
    title: "eXoria",
    type: "Independent technology project",
    status: "Independent project experience",
    summary:
      "A live-service gaming ecosystem, built around systems thinking and technical responsibility.",
    challenge:
      "An MMORPG ecosystem connects player progression, a virtual economy, backend logic and live server operations.",
    importance:
      "Changes in one system can affect balance, transactions and reliability elsewhere. Data integrity and recoverability matter.",
    approach:
      "Investigate bugs, reason about dependencies, design database and business logic, and monitor the behaviour of the wider system.",
    built:
      "Practical work involving database architecture, progression, rewards, transaction logging, event automation, economy balancing, performance optimisation, monitoring and recovery.",
    tech: [
      "Microsoft SQL Server",
      "Database architecture",
      "Backend logic",
      "Server management",
    ],
    outcome:
      "Independent experience operating and improving an interconnected digital ecosystem. Private infrastructure and exploitable implementation details are intentionally excluded.",
    lessons:
      "Live-service operations develop structured troubleshooting, systems thinking and responsibility for data and recovery.",
    flow: [
      "Player actions",
      "Backend rules",
      "Transactional data",
      "Monitor + recover",
    ],
  },
  {
    slug: "infrastructure",
    title: "Infrastructure & Systems Engineering",
    type: "Practical project experience",
    status: "Hands-on systems experience",
    summary:
      "Keeping the systems behind the experience reliable and recoverable.",
    challenge:
      "Applications depend on databases, servers, networking and recovery processes that need to work together.",
    importance:
      "Reliability includes knowing how to recover, investigate an incident and keep essential services available.",
    approach:
      "Use structured troubleshooting, examine dependencies, plan migrations and consider backups and recovery alongside everyday operations.",
    built:
      "Practical experience with dedicated infrastructure, Windows Server, SQL Server, Hyper-V, Veeam, server migration, backups, network troubleshooting, DNS, Cloudflare, firewalls and incident investigation.",
    tech: [
      "Windows Server",
      "Hyper-V",
      "Veeam",
      "Cloudflare",
      "DNS",
      "Backup and Recovery",
      "Database Administration",
    ],
    outcome:
      "A practical focus on system reliability, business continuity and recovery planning. No private server addresses or sensitive configurations are disclosed.",
    lessons:
      "Recovery is part of the design. A structured investigation is more useful than changing several variables without understanding the failure.",
    flow: [
      "Services + dependencies",
      "Monitor",
      "Investigate",
      "Recover + improve",
    ],
  },
  {
    slug: "digital-ecosystem",
    title: "Personal Digital Ecosystem",
    type: "Independent portfolio project",
    status: "Continuously evolving",
    summary:
      "This portfolio: a meeting point for story, analytical work and conversational exploration.",
    challenge:
      "A professional story needs to show how leadership, analytics and building systems connect, while keeping interactive work discoverable.",
    importance:
      "Visitors should be able to understand the person behind the work, explore examples and ask specific questions.",
    approach:
      "Use maintainable public content, reusable components, responsive layouts and AI-assisted software development while preserving existing integrations.",
    built:
      "A React and TypeScript portfolio with interactive analytical projects, a Supabase integration, visitor analytics and an AI conversational experience.",
    tech: [
      "React",
      "TypeScript",
      "Supabase",
      "Lovable",
      "OpenAI Codex",
      "Responsive design",
    ],
    outcome:
      "An evolving portfolio. Frontend improvements and separately reviewed backend changes have distinct deployment steps.",
    lessons:
      "Content accuracy, accessibility, privacy and maintainability belong in the design from the beginning.",
    flow: [
      "Public portfolio facts",
      "Story + case studies",
      "Interactive exploration",
      "Conversation",
    ],
  },
];

export const demonstrations = [
  {
    path: "/bikeshare",
    title: "Urban Mobility Analytics",
    detail:
      "Explore city bikeshare patterns through interactive filters and visual analysis.",
    tools: "Python · Excel",
  },
  {
    path: "/scheduling",
    title: "Capacity & Scheduling Engine",
    detail:
      "Investigate staffing scenarios, demand and Erlang-based capacity models.",
    tools: "Excel · Workforce modelling",
  },
  {
    path: "/workforce",
    title: "Strategic Workforce Framework",
    detail:
      "Explore forecasting methods, crisis response and resource allocation.",
    tools: "Planning · Operational strategy",
  },
  {
    path: "/erp-analysis",
    title: "ERP Upgrade & Process Design",
    detail:
      "Examine procurement workflows, promotion testing and change management.",
    tools: "Business analysis · Process design",
  },
];

export const capabilities = [
  {
    title: "Data & Analytics",
    context: "Professional expertise",
    project: "workforce-automation",
    items: [
      "SQL",
      "Microsoft SQL Server",
      "PostgreSQL",
      "BigQuery",
      "Python",
      "Excel",
      "Power Query",
      "Power BI",
      "Data Modelling",
    ],
  },
  {
    title: "Workforce & Operations",
    context: "Professional expertise",
    project: "wfm-migration",
    items: [
      "NICE IEX",
      "Injixo/Peopleware",
      "Salesforce",
      "Avaya",
      "Forecasting",
      "Capacity Planning",
      "Workforce Scheduling",
      "Performance Management",
    ],
  },
  {
    title: "Automation & Integration",
    context: "Professional and practical project experience",
    project: "workforce-automation",
    items: [
      "Power Automate",
      "PowerApps",
      "Google Apps Script",
      "VBA",
      "JavaScript",
      "REST APIs",
    ],
  },
  {
    title: "AI & Application Development",
    context: "Practical project experience · ongoing learning",
    project: "knowledge-hub",
    items: [
      "Artificial Intelligence",
      "Knowledge Engineering",
      "Retrieval-Augmented Generation concepts",
      "Prompt Engineering",
      "AI-Assisted Software Development",
      "React",
      "TypeScript",
      "Supabase",
      "Lovable",
      "OpenAI Codex",
    ],
  },
  {
    title: "Infrastructure",
    context: "Practical project experience",
    project: "infrastructure",
    items: [
      "Windows Server",
      "Hyper-V",
      "Veeam",
      "Cloudflare",
      "DNS",
      "Backup and Recovery",
      "Database Administration",
    ],
  },
];

export const currentWork = [
  {
    title: "Intelligent knowledge systems",
    detail:
      "Exploring retrieval quality, contextual accuracy and consistent answers.",
    project: "knowledge-hub",
  },
  {
    title: "AI-powered business applications",
    detail: "Bringing operational context into practical, useful applications.",
    project: "knowledge-hub",
  },
  {
    title: "Workforce automation",
    detail: "Connecting reliable data with repeatable operational workflows.",
    project: "workforce-automation",
  },
  {
    title: "Operational leadership",
    detail:
      "Creating clarity, supporting development and encouraging ownership.",
    project: "",
  },
  {
    title: "Technical infrastructure",
    detail:
      "Strengthening reliability, recovery planning and systems understanding.",
    project: "infrastructure",
  },
  {
    title: "Continuous professional development",
    detail: "Learning through investigation, building, feedback and iteration.",
    project: "digital-ecosystem",
  },
];
export const starterQuestions = [
  "Tell me about Sobhe's professional journey.",
  "What teams has he managed?",
  "What has he built using AI?",
  "What is his leadership experience?",
  "How does he approach complex operational problems?",
  "What experience does he have with SQL and automation?",
  "What makes him suitable for senior operational roles?",
  "Show me his most interesting projects.",
];
export function openPortfolioChat(question = "") {
  window.dispatchEvent(new CustomEvent("portfolio:chat", { detail: question }));
}

export const certifications = [
  {
    title: "Data Analysis Nano Degree",
    org: "Udacity",
    url: "https://s3-us-west-2.amazonaws.com/udacity-printer/production/certificates/2a3ac4a9-f7cf-455f-a438-8520fedd4ba4.pdf",
  },
  {
    title: "Data Challenger Track",
    org: "Udacity",
    url: "https://s3-us-west-2.amazonaws.com/udacity-printer/production/certificates/8277317a-7c5d-4955-ad3e-f454321aab82.pdf",
  },
  {
    title: "Understanding Data Visualization",
    org: "DataCamp",
    url: "https://www.datacamp.com/statement-of-accomplishment/course/bae3db506d1df1cafaa39c0034af628f940bce01?raw=1",
  },
  {
    title: "Intermediate SQL",
    org: "DataCamp",
    url: "https://www.datacamp.com/statement-of-accomplishment/course/bf326c4747784867fc86f99a493f383fa273bd40?raw=1",
  },
  {
    title: "Introduction to Data Science in Python",
    org: "DataCamp",
    url: "https://www.datacamp.com/statement-of-accomplishment/course/d69e5002011e2121c3e990db9ac6404d657def96?raw=1",
  },
];
