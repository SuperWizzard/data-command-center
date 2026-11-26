import {
  BrainCircuit,
  Users,
  Workflow,
  Database,
  Gamepad2,
  Server,
  Code2,
  Network,
} from "lucide-react";

export const disciplines = [
  {
    name: "Artificial Intelligence",
    color: "#a78bfa",
    icon: BrainCircuit,
    slug: "knowledge-hub",
    short: "AI",
    description: "Making operational knowledge easier to find and validate.",
  },
  {
    name: "Workforce Management",
    color: "#38bdf8",
    icon: Users,
    slug: "wfm-migration",
    short: "WFM",
    description: "Connecting demand, capacity and the people behind the plan.",
  },
  {
    name: "Automation",
    color: "#fbbf24",
    icon: Workflow,
    slug: "workforce-automation",
    short: "AUTO",
    description: "Turning recurring decisions into dependable workflows.",
  },
  {
    name: "Data Engineering",
    color: "#34d399",
    icon: Database,
    slug: "wfm-migration",
    short: "DATA",
    description: "Tracing operational records from source to decision.",
  },
  {
    name: "Game Systems",
    color: "#fb7185",
    icon: Gamepad2,
    slug: "exoria",
    short: "GAME",
    description: "Designing rules for a connected virtual economy.",
  },
  {
    name: "Infrastructure",
    color: "#fb923c",
    icon: Server,
    slug: "infrastructure",
    short: "INFRA",
    description: "Keeping services observable and recoverable.",
  },
  {
    name: "Software Development",
    color: "#818cf8",
    icon: Code2,
    slug: "digital-ecosystem",
    short: "DEV",
    description: "Building interfaces around real operational needs.",
  },
  {
    name: "Leadership",
    color: "#2dd4bf",
    icon: Network,
    slug: "workforce-automation",
    short: "LEAD",
    description: "Developing people across planning and real-time operations.",
  },
];

const collections = [
  [
    "Knowledge architecture|Retrieval accuracy and response validation|Document versioning and project isolation|Knowledge certification|Intelligent operational analysis|Dynamic Excel ingestion|Intelligent email classification concept|Personal portfolio assistant",
    "How can a team find a reliable answer across changing documents?",
    "Compare a known answer with its source and record where context is missing.",
    "Document review · Excel",
  ],
  [
    "Capacity and scheduling engine|Forecast accuracy|Real-time performance monitoring|Employee adherence|Workforce leave intelligence|Annual leave balances and quotas|Absenteeism reporting|Overtime management|Employee project allocation|Backlog recovery and capacity planning",
    "Where does available capacity diverge from the operational plan?",
    "Compare demand, coverage and exceptions over the same planning interval.",
    "NICE IEX · Excel",
  ],
  [
    "Automated performance reporting|Power Automate HTML email reporting|Payroll reporting workflows|Billable hours extraction|Excel and Power Query automation",
    "Which recurring report steps can be checked before distribution?",
    "Separate input validation, transformation and delivery so exceptions can be reviewed.",
    "Power Automate · Excel · Power Query",
  ],
  [
    "Historical roster extraction|Management unit assignment analysis|PostgreSQL extraction from NICE IEX|Time-off rules and entitlement reporting|API reporting and transformation",
    "Do records retain the same meaning across two systems?",
    "Map fields and compare totals at the reporting grain before using an extract.",
    "PostgreSQL · NICE IEX · SQL",
  ],
  [
    "Virtual economy engineering|Trading and transaction integrity|Reward systems|Anti-duplication mechanisms|Battle Pass reward architecture|Game event automation|Player progression|Equipment systems|Rank and reward synchronisation|Database logging and auditing|Game server troubleshooting|Telemetry and monitoring",
    "How does one change affect persistent player state?",
    "Trace an event from the player action to its recorded outcome and review dependencies.",
    "Microsoft SQL Server",
  ],
  [
    "Dedicated server migration|Windows Server administration|Microsoft SQL Server deployment|Hyper-V|Veeam backup and recovery|Network and DNS troubleshooting|Cloudflare integration|Firewall management|Security incident investigation|Disaster recovery and continuity",
    "Which dependencies must be available to restore a service?",
    "Map service dependencies and review recovery order against a representative scenario.",
    "Windows Server · Veeam · Cloudflare",
  ],
  [
    "Employee absence and emergency leave portal|Day-level sickness authorisation|Medical certificate validation rules|Leave entitlement calculations|Azure Smile healthcare booking and clinic management|Portfolio and interactive analytical applications",
    "How should a business rule appear in a usable application?",
    "Map user roles and review representative workflows using synthetic records.",
    "Business applications",
  ],
  [
    "Leading four planners and thirteen real-time colleagues|Previous team of seventeen|Workforce operations in a 27-country environment|Global workforce standardisation|Recruitment and technical assessments|Candidate evaluation and career development|Cross-training and skill optimisation|Operational risk identification|Injixo/Peopleware to NICE IEX migration",
    "How can teams make consistent decisions across different operating conditions?",
    "Map responsibilities and identify where a shared definition or handover is needed.",
    "Workforce planning",
  ],
];
// Only entries explicitly supported by the existing case studies receive experience labels.
const documented = new Set([
  "Personal portfolio assistant",
  "PostgreSQL extraction from NICE IEX",
  "Virtual economy engineering",
  "Reward systems",
  "Game event automation",
  "Player progression",
  "Database logging and auditing",
  "Telemetry and monitoring",
  "Dedicated server migration",
  "Windows Server administration",
  "Hyper-V",
  "Veeam backup and recovery",
  "Network and DNS troubleshooting",
  "Cloudflare integration",
  "Firewall management",
  "Security incident investigation",
  "Portfolio and interactive analytical applications",
  "Leading four planners and thirteen real-time colleagues",
  "Previous team of seventeen",
  "Recruitment and technical assessments",
  "Injixo/Peopleware to NICE IEX migration",
]);
export const entries = collections.flatMap(
  ([titles, problem, approach, tools], group) =>
    titles.split("|").map((title) => ({
      title,
      group,
      problem,
      approach,
      tools,
      id: title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      status: documented.has(title)
        ? "Documented experience"
        : title.includes("concept")
          ? "Concept"
          : "Scope to verify",
    })),
);
