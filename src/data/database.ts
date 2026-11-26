export const databaseCases = [
  {
    id: "historical",
    title: "Historical workforce extraction",
    status: "Professional experience",
    problem:
      "A historical roster can belong to a different team than the employee's current assignment.",
    approach:
      "Connect roster intervals, assignments and activities by synthetic employee key. Match the reporting instant against an inclusive start and exclusive end. Preserve unmatched rows for review.",
    validation:
      "Check one assignment per interval, hand-check boundary dates and reconcile activity totals.",
  },
  {
    id: "entitlement",
    title: "Leave and entitlement intelligence",
    status: "Technical investigation",
    problem:
      "Current time-off group rules may have no valid row for a historical roster date.",
    approach:
      "Trace assignment → group → rule → entitlement at the reporting date. A proposed fallback uses the most recent eligible historical rule and flags the result for review. Exclude future rules.",
    validation:
      "Test missing rules, overlaps and transfers. Escalate unresolved or ambiguous matches.",
  },
  {
    id: "troubleshooting",
    title: "Operational database troubleshooting",
    status: "Technical investigation",
    problem: "A synthetic report returned two rows for one roster interval.",
    approach:
      "Count records before and after each join. The worked example shows two overlapping assignment rows multiplying one interval. The proposed correction flags overlaps before aggregation.",
    validation:
      "Reconcile totals against the source, check missing rows with a left join and review filters, deterministic ordering and indexes using the query plan.",
  },
  {
    id: "audit",
    title: "Transaction integrity and audit architecture",
    status: "Independent project experience",
    problem: "A repeated business request can alter the same record twice.",
    approach:
      "Validate the request and enforce a unique reference. Apply changes together, reconcile the expected quantity and record accepted or rejected outcomes with a reason.",
    validation:
      "Test duplicate, invalid and interrupted requests. Compare the final record with the audit history.",
  },
  {
    id: "updates",
    title: "Transaction-safe database updates",
    status: "Illustrative procedure",
    problem: "A scoped correction should affect only the intended records.",
    approach:
      "Review a recovery point, preview affected keys and expected counts, then perform the change inside a transaction. Verify values before commit and roll back on discrepancy.",
    validation:
      "Reconcile before-and-after values and confirm unrelated records stayed the same.",
  },
  {
    id: "integration",
    title: "Cross-database systems integration",
    status: "Professional experience",
    problem:
      "Applications and operational reports can use different schema conventions and identifiers.",
    approach:
      "Verify connectivity and permissions, map identifiers and types, standardise time fields and connect validated output to reporting or application workflows.",
    validation:
      "Check missing keys, counts and totals across systems. After migration or restoration, confirm application connectivity and representative reads.",
  },
  {
    id: "migration",
    title: "Injixo / Peopleware to NICE IEX",
    status: "Migration contribution",
    problem:
      "Planning and reporting both need continuity when workforce platforms change.",
    approach:
      "Contributed to workflow alignment, PostgreSQL extraction, transformation and cross-system validation.",
    validation:
      "Compare representative records and reporting definitions on both sides before operational handover.",
  },
];
export const databaseSummary =
  "Sobhe’s database engineering portfolio covers SQL Server/T-SQL, PostgreSQL and BigQuery. It explains relational architecture, historical workforce extraction, leave rule investigations, reporting reconciliation, transaction integrity and auditing, cross-database integration and database recovery. Examples use synthetic data; the historical entitlement fallback is proposed. The dedicated page is /data-engineering.";
