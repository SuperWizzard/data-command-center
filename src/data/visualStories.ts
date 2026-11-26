type Step = [label: string, explanation: string];
export const lifecycle: Step[] = [
  [
    "Forecasting",
    "Estimate interval demand using historical volume and handling time.",
  ],
  [
    "Capacity planning",
    "Check whether available hours can cover workload after shrinkage.",
  ],
  ["Scheduling", "Translate required coverage into shifts and skills."],
  [
    "Real-time management",
    "Monitor intraday variance, adherence and staffing gaps.",
  ],
  [
    "Reporting",
    "Reconcile demand, staffing and service performance against the plan.",
  ],
  [
    "Optimisation",
    "Feed recurring variances into forecasting and schedule design.",
  ],
];
export const stories: Record<string, Step[]> = {
  "knowledge-hub": [
    ["Ingest", "Capture a document and its project identifier."],
    ["Process", "Extract headings and split text into passages."],
    ["Version", "Retain provenance and identify the current revision."],
    ["Isolate", "Keep project material in its own knowledge scope."],
    ["Authorise", "Apply project permissions before context can be retrieved."],
    ["Retrieve", "Match the question to eligible passages."],
    ["Select context", "Prefer relevant passages from the active version."],
    ["Apply response rules", "Answer from evidence and flag missing context."],
    ["Generate", "Compose an answer with a source reference."],
    [
      "Validate",
      "Compare the answer with the cited passage and expected response.",
    ],
  ],
  "workforce-automation": [
    ["Sources", "Excel, SQL, APIs and operational inputs."],
    [
      "Validation",
      "Check dates, coverage and missing fields before processing.",
    ],
    [
      "Transformation",
      "Power Query and SQL shape data at the reporting grain.",
    ],
    [
      "Business rules",
      "Apply reporting definitions consistently across periods.",
    ],
    ["Reporting", "Build a Power BI view or an HTML summary."],
    [
      "Distribution",
      "Power Automate or Apps Script sends approved outputs. PowerApps can provide a structured input interface.",
    ],
  ],
  "wfm-migration": [
    [
      "Injixo / Peopleware",
      "Inventory existing reports, workflows and business definitions.",
    ],
    [
      "PostgreSQL extraction",
      "Contribute extracts at the grain needed for validation.",
    ],
    [
      "Transformation",
      "Map source identifiers, time fields and definitions to the target model.",
    ],
    [
      "NICE IEX",
      "Compare target workflows and reporting outputs against the source.",
    ],
    [
      "Validation",
      "Review representative records and totals with operational stakeholders.",
    ],
    [
      "Continuity",
      "Reconcile reporting and handover requirements while workflows transition.",
    ],
  ],
  exoria: [
    [
      "Player activity",
      "Trades, progression and scheduled events affect persistent state.",
    ],
    [
      "Backend rules",
      "Evaluate event eligibility, inventory and economy constraints.",
    ],
    [
      "Transaction validation",
      "Check whether a state change is valid and consistent.",
    ],
    [
      "Rewards & progression",
      "Apply the eligible reward and update the associated progression.",
    ],
    ["SQL storage", "Record state and a corresponding audit history."],
    [
      "Monitoring",
      "Use aggregate activity and logs to investigate inconsistencies and economy balance.",
    ],
  ],
  infrastructure: [
    [
      "Existing environment",
      "Inventory application services, Windows Server, Hyper-V and SQL Server dependencies.",
    ],
    ["Backup", "Use Veeam recovery points and review restore readiness."],
    [
      "Migrate",
      "Prepare the destination dedicated server and its service dependencies.",
    ],
    [
      "Restore",
      "Recover representative applications and databases in dependency order.",
    ],
    [
      "Validate",
      "Check service health, DNS, Cloudflare routing and firewall policy.",
    ],
    [
      "Recover",
      "Monitor restored workloads and keep rollback criteria available.",
    ],
  ],
  "digital-ecosystem": [
    [
      "Public content",
      "Central portfolio data drives chapters and case studies.",
    ],
    [
      "Explore",
      "The orbital explorer and catalogue connect disciplines with project routes.",
    ],
    [
      "Analyse",
      "Interactive dashboards let visitors examine public or illustrative examples.",
    ],
    [
      "Ask",
      "The portfolio assistant uses public catalogue context to guide follow-up questions.",
    ],
  ],
};
export const chapterFlows: Step[][] = [
  [
    ["Transactions", "Organise individual records into consistent categories."],
    ["Financial analysis", "Compare patterns and explain changes."],
    ["Business decision", "Turn the analysis into a recommendation."],
  ],
  lifecycle.slice(0, 3),
  [
    ["Egypt", "Workforce analytics and team experience at talabat."],
    ["Malta", "Adapted reporting practices to a new operating environment."],
    [
      "Centrecom",
      "Connected planning and real-time disciplines in a new context.",
    ],
  ],
  lifecycle,
  stories["wfm-migration"],
  stories["knowledge-hub"].filter((_, i) => [0, 3, 5, 9].includes(i)),
];
