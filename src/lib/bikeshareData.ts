// Simulated bikeshare data modeled after real US Bikeshare patterns
// Cities: Chicago, New York City, Washington

export type Trip = {
  startTime: Date;
  endTime: Date;
  duration: number; // seconds
  startStation: string;
  endStation: string;
  userType: "Subscriber" | "Customer";
  gender?: "Male" | "Female";
  birthYear?: number;
};

const chicagoStations = [
  "Lake Shore Dr & Monroe St", "Michigan Ave & Oak St", "Clark St & Elm St",
  "Dearborn St & Monroe St", "Canal St & Adams St", "Clinton St & Washington Blvd",
  "Wabash Ave & Grand Ave", "State St & Harrison St", "Wells St & Concord Ln",
  "Sheffield Ave & Fullerton Ave", "Halsted St & Maxwell St", "Racine Ave & Belmont Ave",
];

const nycStations = [
  "Central Park S & 6 Ave", "Broadway & W 60 St", "W 21 St & 6 Ave",
  "E 17 St & Broadway", "Lafayette St & E 8 St", "University Pl & E 14 St",
  "8 Ave & W 31 St", "Pershing Square North", "West St & Chambers St",
  "Allen St & Rivington St", "Columbus Ave & W 72 St", "E 47 St & Park Ave",
];

const washingtonStations = [
  "Lincoln Memorial", "Jefferson Dr & 14th St SW", "Columbus Circle / Union Station",
  "15th & P St NW", "Massachusetts Ave & Dupont Circle NW", "14th & V St NW",
  "Georgetown Harbor / 30th St NW", "New Hampshire Ave & T St NW",
  "Constitution Ave & 2nd St NW/DOL", "M St & New Jersey Ave SE",
  "Eastern Market Metro / Pennsylvania Ave & 7th St SE", "17th & Corcoran St NW",
];

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807 + 0) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function generateTrips(
  stations: string[],
  count: number,
  seed: number,
  hasGender: boolean
): Trip[] {
  const rand = seededRandom(seed);
  const trips: Trip[] = [];

  for (let i = 0; i < count; i++) {
    const month = Math.floor(rand() * 6); // Jan–June
    const day = Math.floor(rand() * 28) + 1;
    const hour = Math.floor(rand() * 24);
    const minute = Math.floor(rand() * 60);
    const startTime = new Date(2017, month, day, hour, minute);
    const duration = Math.floor(rand() * 3600) + 120; // 2min to ~62min
    const endTime = new Date(startTime.getTime() + duration * 1000);
    const startStation = stations[Math.floor(rand() * stations.length)];
    let endStation = stations[Math.floor(rand() * stations.length)];
    if (endStation === startStation) {
      endStation = stations[(stations.indexOf(startStation) + 1) % stations.length];
    }
    const isSubscriber = rand() > 0.35;

    const trip: Trip = {
      startTime,
      endTime,
      duration,
      startStation,
      endStation,
      userType: isSubscriber ? "Subscriber" : "Customer",
    };

    if (hasGender) {
      trip.gender = rand() > 0.35 ? "Male" : "Female";
      trip.birthYear = Math.floor(rand() * 50) + 1955;
    }

    trips.push(trip);
  }

  return trips;
}

const allData: Record<string, Trip[]> = {
  chicago: generateTrips(chicagoStations, 1200, 42, true),
  "new york city": generateTrips(nycStations, 1500, 84, true),
  washington: generateTrips(washingtonStations, 1000, 126, false),
};

export const CITIES = ["chicago", "new york city", "washington"] as const;
export const MONTHS = ["all", "january", "february", "march", "april", "may", "june"] as const;
export const DAYS = ["all", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;

export type City = (typeof CITIES)[number];

export function getFilteredData(city: City, month: string, day: string): Trip[] {
  let data = allData[city];

  if (month !== "all") {
    const monthIndex = MONTHS.indexOf(month as any) - 1;
    data = data.filter((t) => t.startTime.getMonth() === monthIndex);
  }

  if (day !== "all") {
    const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    const dayIndex = dayNames.indexOf(day);
    data = data.filter((t) => t.startTime.getDay() === dayIndex);
  }

  return data;
}

export function computeTimeStats(data: Trip[]) {
  if (!data.length) return null;

  // Most common month
  const monthCounts: Record<number, number> = {};
  const hourCounts: Record<number, number> = {};
  const dayCounts: Record<number, number> = {};

  data.forEach((t) => {
    const m = t.startTime.getMonth();
    monthCounts[m] = (monthCounts[m] || 0) + 1;
    const h = t.startTime.getHours();
    hourCounts[h] = (hourCounts[h] || 0) + 1;
    const d = t.startTime.getDay();
    dayCounts[d] = (dayCounts[d] || 0) + 1;
  });

  const monthNames = ["January", "February", "March", "April", "May", "June"];
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const topMonth = Object.entries(monthCounts).sort((a, b) => b[1] - a[1])[0];
  const topDay = Object.entries(dayCounts).sort((a, b) => b[1] - a[1])[0];
  const topHour = Object.entries(hourCounts).sort((a, b) => b[1] - a[1])[0];

  return {
    popularMonth: monthNames[Number(topMonth[0])],
    popularMonthCount: topMonth[1],
    popularDay: dayNames[Number(topDay[0])],
    popularDayCount: topDay[1],
    popularHour: Number(topHour[0]),
    popularHourCount: topHour[1],
    hourDistribution: Object.entries(hourCounts)
      .map(([h, c]) => ({ hour: Number(h), count: c }))
      .sort((a, b) => a.hour - b.hour),
  };
}

export function computeStationStats(data: Trip[]) {
  if (!data.length) return null;

  const startCounts: Record<string, number> = {};
  const endCounts: Record<string, number> = {};
  const comboCounts: Record<string, number> = {};

  data.forEach((t) => {
    startCounts[t.startStation] = (startCounts[t.startStation] || 0) + 1;
    endCounts[t.endStation] = (endCounts[t.endStation] || 0) + 1;
    const combo = `${t.startStation} → ${t.endStation}`;
    comboCounts[combo] = (comboCounts[combo] || 0) + 1;
  });

  const topStart = Object.entries(startCounts).sort((a, b) => b[1] - a[1])[0];
  const topEnd = Object.entries(endCounts).sort((a, b) => b[1] - a[1])[0];
  const topCombo = Object.entries(comboCounts).sort((a, b) => b[1] - a[1])[0];

  return {
    popularStartStation: topStart[0],
    popularStartCount: topStart[1],
    popularEndStation: topEnd[0],
    popularEndCount: topEnd[1],
    popularTrip: topCombo[0],
    popularTripCount: topCombo[1],
  };
}

export function computeDurationStats(data: Trip[]) {
  if (!data.length) return null;

  const totalSeconds = data.reduce((s, t) => s + t.duration, 0);
  const durations = data.map((t) => t.duration).sort((a, b) => a - b);

  return {
    totalDuration: totalSeconds,
    meanDuration: totalSeconds / data.length,
    medianDuration: durations[Math.floor(durations.length / 2)],
    minDuration: durations[0],
    maxDuration: durations[durations.length - 1],
  };
}

export function computeUserStats(data: Trip[]) {
  if (!data.length) return null;

  const subscribers = data.filter((t) => t.userType === "Subscriber").length;
  const customers = data.length - subscribers;

  const genderData = data.filter((t) => t.gender);
  const males = genderData.filter((t) => t.gender === "Male").length;
  const females = genderData.length - males;

  const birthYears = data.filter((t) => t.birthYear).map((t) => t.birthYear!);
  const earliestYear = birthYears.length ? Math.min(...birthYears) : null;
  const latestYear = birthYears.length ? Math.max(...birthYears) : null;
  const avgYear = birthYears.length ? Math.round(birthYears.reduce((a, b) => a + b, 0) / birthYears.length) : null;

  return {
    subscribers,
    customers,
    males,
    females,
    hasGender: genderData.length > 0,
    earliestBirthYear: earliestYear,
    latestBirthYear: latestYear,
    avgBirthYear: avgYear,
  };
}

export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  if (h > 0) return `${h}h ${m}m ${s}s`;
  return `${m}m ${s}s`;
}
