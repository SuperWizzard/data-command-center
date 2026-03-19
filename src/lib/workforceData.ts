// Senior Workforce Management Case Study Data

// STAR Technique: Crisis Response Framework
export const crisisResponse = {
  situation: "Political situation in a region with the announcement of a curfew from 8 PM to 4 AM, directly impacting workforce operations, delivery logistics, and restaurant partner availability.",
  tasks: [
    "Ensure safety and compliance with the curfew regulations",
    "Develop a plan to adjust activities and routines during the curfew hours",
  ],
  actions: [
    {
      step: "Information Gathering",
      detail: "Research and gather information about the specific curfew regulations and any exceptions. Identify the reasons behind the curfew and potential consequences for non-compliance.",
    },
    {
      step: "Stakeholder Communication",
      detail: "Communicate the curfew information with all stakeholders. Discuss and plan how daily routines and activities will be adjusted to comply with the curfew.",
    },
    {
      step: "Essential Planning",
      detail: "Plan the entire headcount to be working from home during the curfew hours. Inform BPO partners with the changes to ensure implementation.",
    },
    {
      step: "Emergency Preparedness",
      detail: "Establish a communication plan in case of emergencies during the curfew. Ensure that emergency hours are readily available to be injected once needed.",
    },
    {
      step: "Compliance Measures",
      detail: "Understand the specific rules and regulations of the curfew. Plan actions to ensure strict compliance with the curfew hours to avoid any legal issues.",
    },
  ],
  results: [
    "Increased awareness and understanding of the curfew regulations",
    "Smooth adjustment of daily routines to accommodate the curfew",
    "Enhanced emergency preparedness in case of unforeseen circumstances",
    "Full compliance with curfew regulations, avoiding any legal repercussions",
    "Proactive measures, communication, and compliance framework established",
  ],
};

// BPO Contingency Planning — Escalation Matrix
export type EscalationLevel = {
  level: number;
  label: string;
  condition: string;
  actions: string[];
  impact: "Low" | "Medium" | "High" | "Critical";
};

export const escalationMatrix: EscalationLevel[] = [
  {
    level: 1,
    label: "Minor Gap",
    condition: "Impact is slightly small — minor staffing shortfall",
    actions: [
      "Support queues from In-House employees if available",
      "Monitor queue metrics in real-time",
    ],
    impact: "Low",
  },
  {
    level: 2,
    label: "Moderate Gap",
    condition: "In-house support not available or insufficient",
    actions: [
      "Send overtime plan based on missing FTEs in major intervals",
      "Cover gaps during peak hours first",
      "Track overtime budget impact",
    ],
    impact: "Medium",
  },
  {
    level: 3,
    label: "Significant Gap",
    condition: "Impact is large — cannot be maintained with overtime alone",
    actions: [
      "Reach out to another vendor and assign the same Skill/Queue",
      "Run 2 vendors in parallel to absorb the negative impact",
      "Add overtime hours alongside vendor support",
      "Leverage In-House support if available",
    ],
    impact: "High",
  },
  {
    level: 4,
    label: "Full Escalation",
    condition: "Sustained operational disruption across multiple intervals",
    actions: [
      "Clear communication to prevent repeat occurrence",
      "Receive confirmation from BPO to apply the changes",
      "Prepare backup plan for the next day",
      "Post-incident review and process improvement",
    ],
    impact: "Critical",
  },
];

// Forecasting Methods Comparison
export type ForecastMethod = {
  name: string;
  category: "Qualitative" | "Quantitative";
  description: string;
  bestFor: string;
  dataRequirement: "Low" | "Medium" | "High";
  accuracy: number; // relative score 1-100
  complexity: number; // 1-100
};

export const forecastMethods: ForecastMethod[] = [
  {
    name: "Expert Judgment",
    category: "Qualitative",
    description: "Relies on expert judgment, opinions, and subjective evaluation",
    bestFor: "When historical data is limited or unreliable",
    dataRequirement: "Low",
    accuracy: 45,
    complexity: 20,
  },
  {
    name: "Delphi Method",
    category: "Qualitative",
    description: "Obtains consensus from a group of experts through structured surveys and feedback",
    bestFor: "When expert opinions are critical and structured approach is needed",
    dataRequirement: "Low",
    accuracy: 55,
    complexity: 40,
  },
  {
    name: "Moving Averages",
    category: "Quantitative",
    description: "Calculates the average of recent data points to smooth out fluctuations and identify trends",
    bestFor: "Reducing impact of random variation and highlighting underlying trends",
    dataRequirement: "Medium",
    accuracy: 60,
    complexity: 25,
  },
  {
    name: "Exponential Smoothing",
    category: "Quantitative",
    description: "Gives more weight to recent data while assigning decreasing weights to older data points",
    bestFor: "When recent data is more relevant and quick response to changes is needed",
    dataRequirement: "Medium",
    accuracy: 72,
    complexity: 45,
  },
  {
    name: "Time Series Analysis",
    category: "Quantitative",
    description: "Analyzes historical data to identify patterns and trends over time",
    bestFor: "When significant historical data exists and past trends are expected to continue",
    dataRequirement: "High",
    accuracy: 78,
    complexity: 65,
  },
  {
    name: "Seasonal Adjustment",
    category: "Quantitative",
    description: "Accounts for regular, repeating patterns or seasons in data",
    bestFor: "When clear predictable seasonal trends exist and adjustments are essential",
    dataRequirement: "High",
    accuracy: 82,
    complexity: 55,
  },
  {
    name: "Causal Modeling",
    category: "Quantitative",
    description: "Examines cause-and-effect relationships between variables to predict future values",
    bestFor: "When there is clear understanding of relationships between influencing factors",
    dataRequirement: "High",
    accuracy: 85,
    complexity: 80,
  },
];

// Resource Allocation System Goals
export const resourceAllocationGoals = {
  objective: "Improve team productivity and efficiency by optimizing resource allocation",
  approach: [
    "Evaluate current resource allocation methods and identify bottlenecks",
    "Research and implement a modern scheduling system that factors in individual team members' skills, workload preferences, and project requirements",
    "Develop a training program to ensure the team is proficient in utilizing the new system",
    "Regularly analyze and adjust the system based on feedback and performance metrics",
  ],
  basisForSelection: [
    { factor: "Team Feedback", detail: "Gathering feedback from the current team about pain points in the existing scheduling process" },
    { factor: "Industry Best Practices", detail: "Researching and understanding the latest trends and best practices in project scheduling and resource allocation" },
    { factor: "Technology Advancements", detail: "Taking advantage of new technologies or tools that can enhance scheduling capabilities" },
    { factor: "Organizational Objectives", detail: "Aligning the goal with broader organizational objectives, such as increased productivity and employee satisfaction" },
  ],
  goals: [
    { title: "Implement Advanced Resource Allocation", detail: "Enhance scheduling by incorporating individual team members' skills and preferences, resulting in optimized project delivery" },
    { title: "Boost Team Proficiency", detail: "Develop and deliver training programs to ensure the team is adept at utilizing the new system, fostering continuous improvement" },
    { title: "Regular Evaluation & Optimization", detail: "Establish a feedback loop to regularly evaluate and optimize the scheduling system based on performance metrics and team input" },
  ],
  vision: "Create a dynamic and adaptive work environment where scheduling is not just a routine but a strategic advantage, optimizing resources and fostering efficiency and collaboration.",
  mission: "To implement an Advanced Resource Allocation System that empowers the team, maximizes productivity, and aligns with the company's growth objectives.",
};

// Simulated impact metrics for resource allocation
export const impactMetrics = {
  before: {
    schedulingEfficiency: 62,
    resourceUtilization: 58,
    teamSatisfaction: 55,
    deliveryOnTime: 70,
    overtimeHours: 12,
    skillsMatchRate: 45,
  },
  after: {
    schedulingEfficiency: 88,
    resourceUtilization: 82,
    teamSatisfaction: 78,
    deliveryOnTime: 91,
    overtimeHours: 5,
    skillsMatchRate: 85,
  },
};
