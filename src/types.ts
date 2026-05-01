// ─── Core Domain Types ───────────────────────────────────────────────────────

export type FlowLevel = 'none' | 'spotting' | 'light' | 'medium' | 'heavy' | 'very_heavy'

export type MoodTag =
  | 'calm' | 'happy' | 'energetic' | 'focused'
  | 'irritable' | 'anxious' | 'sad' | 'exhausted' | 'sensitive'

export type SymptomTag =
  | 'cramps' | 'bloating' | 'headache' | 'breast_tenderness'
  | 'back_pain' | 'nausea' | 'fatigue' | 'acne' | 'cravings'
  | 'insomnia' | 'hot_flashes' | 'discharge'

export type CyclePhase = 'menstrual' | 'follicular' | 'ovulation' | 'luteal'

export interface DailyLog {
  date: string // ISO date string YYYY-MM-DD
  cycleDay: number
  flow: FlowLevel
  moods: MoodTag[]
  symptoms: SymptomTag[]
  notes: string
  intimacy: boolean
  temperature?: number // basal body temp in °C
}

export interface CycleRecord {
  id: string
  startDate: string
  endDate?: string
  length?: number
  periodLength?: number
  logs: DailyLog[]
}

export interface InsightCard {
  id: string
  title: string
  body: string
  type: 'pattern' | 'tip' | 'prediction' | 'celebration'
  icon: string
}

export interface PartnerShareSettings {
  enabled: boolean
  partnerName: string
  partnerEmail: string
  shareLevel: 'phase_only' | 'phase_and_mood' | 'detailed'
  notifyOnCycleStart: boolean
  notifyOnSymptoms: boolean
}

export type Screen =
  | 'onboarding'
  | 'home'
  | 'checkin'
  | 'calendar'
  | 'insights'
  | 'partner'
  | 'profile'
