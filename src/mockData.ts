import type {
  CycleRecord,
  DailyLog,
  InsightCard,
  PartnerShareSettings,
} from './types'

// ─── Current date anchor (mock: today = cycle day 8) ─────────────────────────
export const TODAY = '2026-05-01'

// ─── Cycle history ────────────────────────────────────────────────────────────
export const mockCycles: CycleRecord[] = [
  {
    id: 'c1',
    startDate: '2026-01-05',
    endDate: '2026-01-10',
    length: 28,
    periodLength: 5,
    logs: [],
  },
  {
    id: 'c2',
    startDate: '2026-02-02',
    endDate: '2026-02-07',
    length: 29,
    periodLength: 5,
    logs: [],
  },
  {
    id: 'c3',
    startDate: '2026-03-03',
    endDate: '2026-03-08',
    length: 28,
    periodLength: 5,
    logs: [],
  },
  {
    id: 'c4',
    startDate: '2026-03-31',
    endDate: '2026-04-05',
    length: 28,
    periodLength: 5,
    logs: [],
  },
  // Current cycle — started Apr 24
  {
    id: 'c5',
    startDate: '2026-04-24',
    length: 28,
    periodLength: 5,
    logs: [
      {
        date: '2026-04-24',
        cycleDay: 1,
        flow: 'medium',
        moods: ['irritable', 'exhausted'],
        symptoms: ['cramps', 'bloating', 'back_pain'],
        notes: 'Rough start, cramps worse than usual.',
        intimacy: false,
        temperature: 36.2,
      },
      {
        date: '2026-04-25',
        cycleDay: 2,
        flow: 'heavy',
        moods: ['exhausted', 'sad'],
        symptoms: ['cramps', 'fatigue', 'headache'],
        notes: 'Heavy day, stayed home.',
        intimacy: false,
        temperature: 36.1,
      },
      {
        date: '2026-04-26',
        cycleDay: 3,
        flow: 'medium',
        moods: ['sad', 'anxious'],
        symptoms: ['cramps', 'fatigue'],
        notes: '',
        intimacy: false,
        temperature: 36.3,
      },
      {
        date: '2026-04-27',
        cycleDay: 4,
        flow: 'light',
        moods: ['calm'],
        symptoms: ['fatigue'],
        notes: 'Feeling better.',
        intimacy: false,
        temperature: 36.4,
      },
      {
        date: '2026-04-28',
        cycleDay: 5,
        flow: 'spotting',
        moods: ['calm', 'energetic'],
        symptoms: [],
        notes: 'Almost done.',
        intimacy: false,
        temperature: 36.5,
      },
      {
        date: '2026-04-29',
        cycleDay: 6,
        flow: 'none',
        moods: ['energetic', 'happy'],
        symptoms: [],
        notes: 'Energy back!',
        intimacy: false,
        temperature: 36.6,
      },
      {
        date: '2026-04-30',
        cycleDay: 7,
        flow: 'none',
        moods: ['happy', 'focused'],
        symptoms: [],
        notes: 'Good day.',
        intimacy: false,
        temperature: 36.5,
      },
    ],
  },
]

export const currentCycle = mockCycles[mockCycles.length - 1]
export const currentCycleDay = 8
export const nextPeriodDate = '2026-05-22'
export const daysUntilNextPeriod = 21
export const avgCycleLength = 28
export const avgPeriodLength = 5

// ─── Today's partial log (pre-filled for demo) ───────────────────────────────
export const todayLog: Partial<DailyLog> = {
  date: TODAY,
  cycleDay: 8,
  flow: 'none',
  moods: ['energetic'],
  symptoms: [],
  notes: '',
}

// ─── Insights ─────────────────────────────────────────────────────────────────
export const mockInsights: InsightCard[] = [
  {
    id: 'i1',
    title: 'Consistent cycle length',
    body: 'Your last 4 cycles averaged 28 days — remarkably consistent. This makes predictions more reliable.',
    type: 'celebration',
    icon: '🎯',
  },
  {
    id: 'i2',
    title: 'Cramps peak on day 2',
    body: 'In 3 of your last 4 cycles, cramps were most intense on day 2. Consider preparing with heat or your usual relief routine the night before.',
    type: 'pattern',
    icon: '📊',
  },
  {
    id: 'i3',
    title: 'Energy window: days 6–13',
    body: "You've logged 'energetic' and 'focused' most often between days 6 and 13. This is your productive sweet spot.",
    type: 'pattern',
    icon: '⚡',
  },
  {
    id: 'i4',
    title: 'Ovulation window approaching',
    body: 'Based on your cycle length, your fertile window is likely May 7–12. Basal temperature may rise slightly.',
    type: 'prediction',
    icon: '🌿',
  },
  {
    id: 'i5',
    title: 'Mood dip before period',
    body: "You've logged 'irritable' or 'anxious' on days 25–27 in your last 3 cycles — possible PMS pattern. Noting this can help you plan.",
    type: 'tip',
    icon: '💡',
  },
  {
    id: 'i6',
    title: 'Hydration reminder',
    body: 'On days you logged headaches, temperature readings were slightly higher. Staying hydrated during your period can ease this.',
    type: 'tip',
    icon: '💧',
  },
]

// ─── Partner share settings ───────────────────────────────────────────────────
export const mockPartnerSettings: PartnerShareSettings = {
  enabled: true,
  partnerName: 'Liam',
  partnerEmail: 'liam@example.com',
  shareLevel: 'phase_and_mood',
  notifyOnCycleStart: true,
  notifyOnSymptoms: false,
}

// ─── Calendar helper: generate days for a month ───────────────────────────────
export function getDaysInMonth(year: number, month: number): Date[] {
  const days: Date[] = []
  const date = new Date(year, month, 1)
  while (date.getMonth() === month) {
    days.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }
  return days
}

export function getCycleDayType(dateStr: string): 'period' | 'fertile' | 'ovulation' | 'today' | 'future' | 'past' | null {
  const date = new Date(dateStr)
  const today = new Date(TODAY)

  if (dateStr === TODAY) return 'today'
  if (date > today) {
    // Check predicted period: May 22 - 27
    const predictedStart = new Date('2026-05-22')
    const predictedEnd = new Date('2026-05-27')
    if (date >= predictedStart && date <= predictedEnd) return 'period'
    // Fertile window May 7–12
    const fertileStart = new Date('2026-05-07')
    const fertileEnd = new Date('2026-05-12')
    if (date >= fertileStart && date <= fertileEnd) return 'fertile'
    if (dateStr === '2026-05-10') return 'ovulation'
    return 'future'
  }

  // Past: check cycle logs
  for (const cycle of mockCycles) {
    if (cycle.endDate) {
      const cs = new Date(cycle.startDate)
      const ce = new Date(cycle.endDate)
      if (date >= cs && date <= ce) return 'period'
    }
    if (!cycle.endDate && cycle.startDate === '2026-04-24') {
      // Current cycle period Apr 24–28
      const cs = new Date('2026-04-24')
      const ce = new Date('2026-04-28')
      if (date >= cs && date <= ce) return 'period'
    }
  }
  return 'past'
}
