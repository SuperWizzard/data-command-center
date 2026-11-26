import type { Diagram, Node } from "@/components/TechnicalDiagram";

function pipeline(
  title: string,
  boundary: string,
  stages: [string[], Node["kind"]?][],
  labels: string[] = [],
): Diagram {
  const columns = Math.min(stages.length, 3);
  return {
    title,
    boundary,
    nodes: stages.map(([lines, kind], i) => ({
      x: 100 + 220 * (i < columns ? i : 2 - (i - columns)),
      y: i < columns ? 78 : 200,
      lines,
      kind,
    })),
    edges: stages
      .slice(1)
      .map((_, i) => ({ from: i, to: i + 1, label: labels[i] })),
  };
}
export const diagrams: Record<string, Diagram> = {
  "knowledge-hub": pipeline(
    "Document to grounded answer",
    "Conceptual project boundary",
    [
      [["Document ingestion"]],
      [["Process and version"]],
      [["Project knowledge", "store"], "database"],
      [["Retrieve permitted", "passages"]],
      [["Validate context"]],
      [["Generate response"]],
    ],
    ["document", "active version", "access filter", "passages", "evidence"],
  ),
  "workforce-automation": pipeline(
    "Automated reporting process",
    "Illustrative workflow",
    [
      [["Source systems"], "database"],
      [["Extract and validate"]],
      [["Transform and", "apply rules"]],
      [["Generate report"]],
      [["Review output"]],
      [["Distribute report"], "success"],
    ],
    ["extract", "valid rows", "metrics", "draft", "approved"],
  ),
  "wfm-migration": pipeline(
    "Source-to-target migration",
    "Illustrative view of migration activities",
    [
      [["Injixo / Peopleware"], "database"],
      [["PostgreSQL extraction"]],
      [["Map fields and rules"]],
      [["NICE IEX"], "database"],
      [["Compare records", "and reports"]],
      [["Operational handover"], "success"],
    ],
    ["source data", "extract", "mapped data", "target results", "checked"],
  ),
  infrastructure: pipeline(
    "Migration, restoration and validation",
    "Generic recovery environment",
    [
      [["Application and", "SQL Server"], "database"],
      [["Veeam backup"], "database"],
      [["Restore on target"]],
      [["Verify connectivity", "and DNS"]],
      [["Check application", "and database"]],
      [["Monitor workload"], "success"],
    ],
    ["services", "recovery point", "restored system", "reachable", "verified"],
  ),
  workforce: pipeline(
    "Workforce management lifecycle",
    "Operational planning and performance",
    [
      [["Forecast demand"]],
      [["Plan capacity"]],
      [["Build schedules"]],
      [["Monitor real time"]],
      [["Report variance"]],
      [["Adjust the plan"]],
    ],
    ["volume", "staffing", "coverage", "actuals", "feedback"],
  ),
  lineage: pipeline(
    "Cross-system SQL data lineage",
    "Synthetic reporting environment",
    [
      [["Operational stores"], "database"],
      [["Connect and extract"]],
      [["Join and filter"]],
      [["Transform fields"]],
      [["Reconcile totals"]],
      [["Publish report"], "success"],
    ],
    ["records", "source rows", "matched rows", "measures", "checked"],
  ),
  troubleshooting: pipeline(
    "Trace an unexpected report total",
    "Synthetic root-cause investigation",
    [
      [["Reproduce variance"]],
      [["Compare source totals"]],
      [["Check join keys"]],
      [["Inspect date overlaps"]],
      [["Isolate extra matches"]],
      [["Validate correction"], "success"],
    ],
    ["report", "baseline", "candidate rows", "date matches", "retest"],
  ),
};
export const organisation: Diagram = {
  title: "Workforce team and operational partners",
  caption:
    "Current team responsibilities. Operations and stakeholder collaboration sits alongside the reporting structure.",
  nodes: [
    { x: 320, y: 55, lines: ["Sobhe Mosaad", "Workforce Coordinator"] },
    { x: 160, y: 155, lines: ["4 Workforce Planners"] },
    { x: 480, y: 155, lines: ["13 Real-Time", "Management members"] },
    { x: 320, y: 260, lines: ["Operations and", "stakeholders"] },
    { x: 320, y: 362, lines: ["Business performance"], kind: "success" },
  ],
  edges: [
    { from: 0, to: 1 },
    { from: 0, to: 2 },
    { from: 1, to: 3, label: "plan" },
    { from: 2, to: 3, label: "intraday actions" },
    { from: 3, to: 4, label: "service results" },
  ],
};
export const erd: Diagram = {
  title: "Workforce relational model",
  caption:
    "Synthetic schema. PK identifies a row. FK links to a parent table. The fork marks the many side.",
  nodes: [
    { x: 180, y: 65, kind: "entity", lines: ["Employee", "PK employee_id"] },
    { x: 475, y: 65, kind: "entity", lines: ["Time-off group", "PK group_id"] },
    {
      x: 95,
      y: 185,
      kind: "entity",
      lines: ["Roster interval", "PK interval_id", "FK employee_id"],
    },
    {
      x: 326,
      y: 185,
      kind: "entity",
      lines: ["Assignment", "PK assignment_id", "FK employee_id, group_id"],
    },
    {
      x: 557,
      y: 185,
      kind: "entity",
      lines: ["Rule version", "PK rule_id", "FK group_id"],
    },
  ],
  edges: [
    { from: 0, to: 2, relation: true, label: "1 : many" },
    { from: 0, to: 3, relation: true, targetOffset: -24, lane: 118 },
    { from: 1, to: 3, relation: true, targetOffset: 24, lane: 133 },
    { from: 1, to: 4, relation: true, label: "1 : many" },
  ],
};
export const transaction: Diagram = {
  title: "Transaction validation, commit and rollback",
  caption:
    "Conceptual workflow for a generic business request. Enforce a unique request reference and retain an audit outcome.",
  nodes: [
    { x: 325, y: 45, lines: ["Receive request"] },
    { x: 325, y: 132, lines: ["Valid and", "unique?"], kind: "decision" },
    { x: 550, y: 132, lines: ["Reject and log reason"], kind: "exception" },
    { x: 325, y: 226, lines: ["Apply scoped update"] },
    { x: 325, y: 320, lines: ["Verification", "passes?"], kind: "decision" },
    { x: 105, y: 320, lines: ["Commit"], kind: "success" },
    { x: 550, y: 320, lines: ["Roll back"], kind: "exception" },
    { x: 325, y: 435, lines: ["Audit outcome"], kind: "database" },
  ],
  edges: [
    { from: 0, to: 1 },
    { from: 1, to: 2, label: "No" },
    { from: 1, to: 3, label: "Yes" },
    { from: 3, to: 4 },
    { from: 4, to: 5, label: "Yes" },
    { from: 4, to: 6, label: "No" },
    { from: 5, to: 7 },
    { from: 6, to: 7 },
  ],
};
export const leave = pipeline(
  "Effective-date leave workflow",
  "Synthetic entitlement review",
  [
    [["Select roster date"]],
    [["Find valid assignment"]],
    [["Resolve time-off group"]],
    [["Find rule version"]],
    [["Reconcile entitlement"]],
    [["Flag unmatched rows"], "exception"],
  ],
  ["as-of date", "group key", "rule scope", "rule period", "exceptions"],
);

export const history = pipeline(
  "Historical assignment validity",
  "Synthetic record history",
  [
    [["Support", "Jan–Mar"]],
    [["Billing", "Apr–Jun"]],
    [["Planning", "Jul onward"]],
  ],
  ["Apr 1 transfer", "Jul 1 transfer"],
);
