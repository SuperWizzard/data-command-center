// ERP System Upgrade & Operational Efficiency Case Study Data

// Problems encountered
export const problemsEncountered = {
  procurement: [
    "Lack of a structured process; items received and invoiced without proper tracking",
    "Storekeepers rely on email updates, causing errors and communication inefficiencies",
    "Discrepancies between ordered and received items are not recorded",
  ],
  promotions: [
    "Promotions managed manually by creating new item codes",
    "No effective system to automatically stop expired promotions, leading to potential errors",
    "Manual stock transfers for promotions increase complexity and workload",
  ],
};

// Procurement process steps
export type ProcessStep = {
  step: number;
  title: string;
  description: string;
  status: "automated" | "manual" | "hybrid";
};

export const procurementProcess: ProcessStep[] = [
  { step: 1, title: "Create Purchase Order", description: "The procurement team enters item details, quantities, supplier information, and expected delivery dates into the ERP.", status: "automated" },
  { step: 2, title: "Approval Routing", description: "The system routes the PO for approval/confirmation to management with full line item visibility.", status: "automated" },
  { step: 3, title: "Notify Storekeeper", description: "Once approved, the ERP system automatically notifies the storekeeper about incoming items with expected dates.", status: "automated" },
  { step: 4, title: "Goods Receipt", description: "When items arrive, the storekeeper logs received quantities into the ERP, matching them to the PO.", status: "hybrid" },
  { step: 5, title: "Handle Discrepancies", description: "Any differences between the PO and received goods are flagged for resolution in the ERP.", status: "hybrid" },
  { step: 6, title: "Invoice Matching & Finalize", description: "The system matches the PO, received goods, and invoice, then forwards for payment processing.", status: "automated" },
];

// Order status pipeline
export const orderPipeline = [
  { stage: "Registered", description: "PO created and confirmed internally with line item details" },
  { stage: "In Process", description: "Arrival dates confirmed with supplier" },
  { stage: "Received", description: "Arrival overview process notifies storekeeper" },
  { stage: "Inspected", description: "Quality inspection identifies defects and returns" },
  { stage: "Invoiced", description: "Payment settled based on RFQ terms" },
];

// ERP Capabilities
export const erpCapabilities = {
  native: [
    { feature: "Discounts & Campaigns", description: "Setup line discounts, invoice discounts, and campaign pricing with start/end dates", supported: true },
    { feature: "Simple Promotions", description: "Basic price adjustments — percentage or flat-rate discounts on products", supported: true },
    { feature: "Time-Driven Promotions", description: "Partially managed using start/end dates within sales price settings", supported: "partial" as const },
  ],
  limitations: [
    { feature: "Multi-Buy Promotions", description: "Complex offers like 'Buy 1 Get 1 Free' are not directly supported", gap: "Critical" },
    { feature: "Bundling Functionality", description: "Advanced bundling or dynamic inventory adjustments for promotions not available", gap: "High" },
    { feature: "Auto-Expiry Management", description: "Promotions require manual oversight to deactivate after expiry", gap: "Medium" },
  ],
  solution: {
    name: "Third-Party Retail Extension",
    benefits: [
      "Automated start and end dates for promotions",
      "Multi-buy offers (e.g., Buy X, Get Y Free)",
      "Bundling and inventory management for promotional stock",
      "Quick implementation with ongoing updates",
      "Reduces the need for custom development",
      "Designed for seamless ERP integration via marketplace",
    ],
  },
};

// Promotion testing
export const promotionTest = {
  scenario: "Buy 2 Get 1 Free",
  testCases: [
    { purchased: 1, freeItems: 0, totalCharged: 1, description: "Single item — no promotion triggered" },
    { purchased: 2, freeItems: 1, totalCharged: 2, description: "Two items — 1 free item added automatically" },
    { purchased: 4, freeItems: 2, totalCharged: 4, description: "Four items — 2 free items added automatically" },
    { purchased: 6, freeItems: 3, totalCharged: 6, description: "Six items — 3 free items added automatically" },
  ],
  assumptions: [
    "Add-on or configuration supports multi-buy offers",
    "Users accurately apply promotional rules to qualifying products",
  ],
  expectedResults: [
    "Free items correctly added based on promotion logic",
    "Total order pricing reflects the correct discount",
  ],
  stakeholders: [
    { role: "Inventory Management", responsibility: "Ensure stock adjustments are accurate for free items" },
    { role: "Sales & Marketing", responsibility: "Confirm the promotion works as intended" },
    { role: "Finance Team", responsibility: "Validate promotional pricing impacts revenue calculations correctly" },
    { role: "IT Team", responsibility: "Ensure proper system functioning, add-ons, and integrations" },
    { role: "Business Analysts", responsibility: "Gather requirements and ensure business needs are met" },
  ],
};

// Change management approach
export const changeManagement = [
  {
    phase: "Define Objectives & Scope",
    description: "Clearly outline transition goals (efficiency, scalability) and affected areas (procurement, sales). Ensure alignment with business goals.",
    icon: "🎯",
  },
  {
    phase: "Engage Stakeholders Early",
    description: "Involve key departments (Operations, IT, Sales, Finance) early to gather feedback. Communicate benefits of the change to all teams.",
    icon: "🤝",
  },
  {
    phase: "Develop Change Strategy",
    description: "Use multiple communication channels, role-based training workshops, and establish support focal points for future assistance.",
    icon: "📋",
  },
  {
    phase: "Pilot Testing & Rollout",
    description: "Start with a small test group to identify issues, followed by phased implementation. Reduces risk and allows adjustments.",
    icon: "🧪",
  },
  {
    phase: "Data Migration & Validation",
    description: "Clean and validate data before migration. Conduct tests to verify accuracy of data transfer with no post-transition issues.",
    icon: "🔄",
  },
];

// Impact metrics for visualization
export const erpImpactData = [
  { metric: "Procurement Accuracy", before: 45, after: 92 },
  { metric: "Promotion Errors", before: 72, after: 12 },
  { metric: "Manual Processes", before: 80, after: 25 },
  { metric: "Storekeeper Visibility", before: 30, after: 95 },
  { metric: "Discrepancy Tracking", before: 20, after: 88 },
];

export const automationBreakdown = [
  { name: "Fully Automated", value: 3 },
  { name: "Hybrid (Human + System)", value: 2 },
  { name: "Manual Override", value: 1 },
];
