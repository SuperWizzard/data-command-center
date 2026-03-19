// Regional Scheduling & Workforce Performance Case Study Data

export const DAYS_OF_WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
export const DAY_DATES = ["19-Aug", "20-Aug", "21-Aug", "22-Aug", "23-Aug", "24-Aug", "25-Aug"];

// Hourly ticket volume per day (inbound + outbound combined)
export const hourlyVolume: Record<string, number[]> = {
  "19-Aug": [100,81,51,41,38,21,2,41,81,161,172,177,271,264,228,191,172,165,191,242,282,332,191,111],
  "20-Aug": [81,51,48,41,21,19,2,41,141,139,131,191,301,310,242,191,188,200,221,261,301,282,221,111],
  "21-Aug": [81,71,51,41,21,21,21,51,100,141,161,201,301,312,252,191,172,212,252,312,372,342,221,111],
  "22-Aug": [111,71,51,41,21,21,21,41,100,141,161,221,301,342,267,191,161,172,191,282,342,312,221,131],
  "23-Aug": [81,71,51,41,41,21,21,41,100,141,161,201,301,312,242,172,172,172,201,282,342,402,221,131],
  "24-Aug": [81,71,51,41,41,41,21,41,71,111,161,191,252,252,252,201,191,242,242,301,342,372,201,131],
  "25-Aug": [100,81,51,51,41,41,21,41,71,100,131,161,242,257,271,242,172,201,257,312,442,453,282,141],
};

// Current schedule (agents per hour per day)
export const currentSchedule: Record<string, number[]> = {
  "19-Aug": [6,4,4,2,2,2,2,3,4,8,9,13,13,13,16,19,19,16,15,13,13,13,10,6],
  "20-Aug": [5,4,4,2,2,2,4,5,6,8,10,14,14,14,13,16,17,17,15,13,13,13,12,8],
  "21-Aug": [6,4,4,2,2,2,4,5,6,12,13,16,16,16,19,22,24,20,19,18,18,18,13,9],
  "22-Aug": [6,4,4,2,2,2,4,5,6,10,11,14,14,14,15,18,20,18,17,16,16,16,13,9],
  "23-Aug": [6,4,4,2,2,2,4,5,6,8,9,13,13,13,15,19,26,30,29,27,27,27,23,18],
  "24-Aug": [10,4,4,2,2,2,4,5,6,8,8,12,12,12,20,24,30,31,31,29,29,29,19,14],
  "25-Aug": [7,4,4,2,2,2,4,5,6,9,10,14,14,14,20,24,29,29,28,26,26,26,19,14],
};

// Proposed schedule (optimized)
export const proposedSchedule: Record<string, number[]> = {
  "19-Aug": [7,5,3,2,3,2,2,3,6,12,13,13,20,20,17,14,13,12,14,18,21,25,14,8],
  "20-Aug": [5,4,4,2,2,2,2,3,10,10,10,14,22,23,18,14,14,15,16,19,22,21,16,8],
  "21-Aug": [6,5,4,2,2,2,2,4,7,10,12,15,22,23,19,14,13,16,19,23,28,25,16,8],
  "22-Aug": [8,5,4,2,2,2,2,3,7,10,12,16,22,25,20,14,12,13,14,21,25,23,16,10],
  "23-Aug": [6,5,4,2,3,2,2,3,7,10,12,15,22,23,18,13,13,13,15,21,25,30,16,10],
  "24-Aug": [6,5,4,3,3,3,2,3,5,8,12,14,19,19,19,15,14,18,18,22,25,28,15,10],
  "25-Aug": [7,6,4,4,3,3,2,3,5,7,10,12,18,19,20,18,13,15,19,23,33,33,21,10],
};

// Service level data per hour (proposed schedule)
export const serviceLevelData: Record<string, number[]> = {
  "19-Aug": [82,90,85,83,88,81,86,83,90,83,85,92,86,93,91,90,85,91,90,90,88,89,90,83],
  "20-Aug": [90,85,90,83,81,84,86,83,90,92,89,90,80,85,90,90,80,81,85,83,80,88,85,83],
  "21-Aug": [90,88,85,83,81,81,81,85,82,90,83,92,80,83,92,90,85,82,92,83,87,91,85,83],
  "22-Aug": [83,88,85,83,81,81,81,83,82,90,83,85,80,91,90,90,83,85,90,88,91,83,85,89],
  "23-Aug": [90,88,85,83,83,81,81,83,82,90,83,92,80,83,90,85,85,85,92,88,91,82,85,89],
  "24-Aug": [90,88,85,83,83,83,81,83,88,83,83,90,92,92,92,92,90,90,90,80,91,87,92,89],
  "25-Aug": [82,90,85,85,83,83,81,83,88,82,89,83,90,87,86,90,85,92,87,83,80,83,88,90],
};

// Occupancy data per hour (proposed schedule)
export const occupancyData: Record<string, number[]> = {
  "19-Aug": [78,70,65,63,58,53,17,63,70,83,83,81,87,85,84,82,83,80,82,85,87,88,82,78],
  "20-Aug": [70,65,61,63,53,50,17,63,78,77,78,82,90,89,85,82,85,86,86,88,90,87,86,78],
  "21-Aug": [70,69,65,63,53,53,53,65,78,78,83,82,90,89,85,82,83,86,85,89,90,88,86,78],
  "22-Aug": [78,69,65,63,53,53,53,63,78,78,83,86,90,88,86,82,83,83,82,87,88,89,86,78],
  "23-Aug": [70,69,65,63,63,53,53,63,78,78,83,82,90,89,85,83,83,83,82,87,88,91,86,78],
  "24-Aug": [70,69,65,63,63,63,53,63,69,78,83,82,85,85,85,82,82,85,85,90,88,90,82,78],
  "25-Aug": [78,70,65,65,63,63,53,63,69,78,78,83,85,86,87,85,83,82,86,89,92,92,87,78],
};

// Weekly aggregate metrics
export const weeklyMetrics = {
  totalVolume: 27248,
  totalInbound: 25230,
  totalOutbound: 2018,
  outboundPercent: 8,
  avgDailyVolume: 3893,
  netFTERequired: 46.6,
  grossFTERequired: 66.6,
  avgServiceLevel: 86,
  avgOccupancy: 83,
  shrinkage: 30,
  slaTarget: 80,
  serviceTime: 60,
  seniorAHT: 3.8,
  newAgentAHT: 6.0,
  blendedAHT: 4.5,
  occupancyTarget: 85,
};

// Country performance data (Q2)
export type CountryData = {
  country: string;
  code: string;
  totalAgents: number;
  avgHandleTime: number;
  forecastVolume: number;
  actualVolume: number;
  forecastAccuracy: number;
  serviceLevelPct: number;
  overallOccupancy: number;
  absenteeism: number;
  avgOvertimeHours: number;
  sscVolumePct: number;
  osVolumePct: number;
  localVolumePct: number;
  sscOccupancy: number;
  localOccupancy: number;
};

export const countryData: CountryData[] = [
  { country: "Germany", code: "DEU", totalAgents: 50, avgHandleTime: 5, forecastVolume: 4000, actualVolume: 4500, forecastAccuracy: 113, serviceLevelPct: 80, overallOccupancy: 65, absenteeism: 8, avgOvertimeHours: 5, sscVolumePct: 10, osVolumePct: 35, localVolumePct: 55, sscOccupancy: 80, localOccupancy: 40 },
  { country: "Poland", code: "POL", totalAgents: 30, avgHandleTime: 6, forecastVolume: 3000, actualVolume: 3200, forecastAccuracy: 107, serviceLevelPct: 78, overallOccupancy: 70, absenteeism: 7, avgOvertimeHours: 6, sscVolumePct: 80, osVolumePct: 10, localVolumePct: 10, sscOccupancy: 72, localOccupancy: 36 },
  { country: "Sweden", code: "SWE", totalAgents: 40, avgHandleTime: 5, forecastVolume: 3500, actualVolume: 3000, forecastAccuracy: 86, serviceLevelPct: 85, overallOccupancy: 85, absenteeism: 5, avgOvertimeHours: 3, sscVolumePct: 8, osVolumePct: 20, localVolumePct: 72, sscOccupancy: 123, localOccupancy: 62 },
  { country: "Norway", code: "NOR", totalAgents: 35, avgHandleTime: 4, forecastVolume: 2500, actualVolume: 2600, forecastAccuracy: 104, serviceLevelPct: 83, overallOccupancy: 78, absenteeism: 4, avgOvertimeHours: 2, sscVolumePct: 22, osVolumePct: 15, localVolumePct: 63, sscOccupancy: 108, localOccupancy: 54 },
  { country: "Greece", code: "GRC", totalAgents: 25, avgHandleTime: 7, forecastVolume: 2000, actualVolume: 1800, forecastAccuracy: 90, serviceLevelPct: 87, overallOccupancy: 60, absenteeism: 10, avgOvertimeHours: 7, sscVolumePct: 85, osVolumePct: 0, localVolumePct: 15, sscOccupancy: 65, localOccupancy: 32 },
  { country: "Austria", code: "AUT", totalAgents: 45, avgHandleTime: 6, forecastVolume: 3800, actualVolume: 4000, forecastAccuracy: 105, serviceLevelPct: 82, overallOccupancy: 68, absenteeism: 6, avgOvertimeHours: 4, sscVolumePct: 18, osVolumePct: 20, localVolumePct: 62, sscOccupancy: 87, localOccupancy: 44 },
];

// Recommendations for Q2
export const recommendations = [
  {
    goal: "Optimize Occupancy",
    approach: "Shift more standardized volume to SSC",
    reasoning: "SSC has capacity and cost advantages and is underutilized in many countries.",
  },
  {
    goal: "Maintain or Improve SL",
    approach: "Retain local teams for complex or language-specific calls",
    reasoning: "Local teams can handle complex queries requiring cultural or language expertise.",
  },
  {
    goal: "Balance Workloads & Enhance FA%",
    approach: "Merge similar skill queues into SSC",
    reasoning: "Economies of scale reduce idle time and improve forecasting accuracy.",
  },
  {
    goal: "Reduce Absenteeism & Overtime",
    approach: "Improve scheduling with better forecast accuracy and volume merging",
    reasoning: "Reduces agent burnout and improves satisfaction.",
  },
];

// Helper: get average hourly volume across the week
export function getAvgHourlyVolume(): { hour: string; volume: number }[] {
  const days = Object.values(hourlyVolume);
  return Array.from({ length: 24 }, (_, h) => ({
    hour: `${h.toString().padStart(2, "0")}:00`,
    volume: Math.round(days.reduce((sum, d) => sum + d[h], 0) / days.length),
  }));
}

// Helper: get daily totals
export function getDailyTotals() {
  return DAY_DATES.map((date, i) => ({
    day: DAYS_OF_WEEK[i],
    date,
    volume: hourlyVolume[date].reduce((a, b) => a + b, 0),
    currentStaff: currentSchedule[date].reduce((a, b) => a + b, 0),
    proposedStaff: proposedSchedule[date].reduce((a, b) => a + b, 0),
  }));
}

// Helper: get hourly comparison for a specific day
export function getHourlyComparison(date: string) {
  return Array.from({ length: 24 }, (_, h) => ({
    hour: `${h.toString().padStart(2, "0")}:00`,
    volume: hourlyVolume[date][h],
    current: currentSchedule[date][h],
    proposed: proposedSchedule[date][h],
    sl: serviceLevelData[date][h],
    occupancy: occupancyData[date][h],
  }));
}
