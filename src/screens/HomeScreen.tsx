import { ChevronRight, Droplets, Zap, AlertCircle, Users } from 'lucide-react'
import type { Screen } from '../types'
import {
  currentCycleDay,
  daysUntilNextPeriod,
  nextPeriodDate,
  mockInsights,
} from '../mockData'

interface Props {
  onNavigate: (s: Screen) => void
}

function PhaseArc({ day, total = 28 }: { day: number; total?: number }) {
  const pct = day / total
  const r = 52
  const cx = 64
  const cy = 64
  const circumference = 2 * Math.PI * r
  const dash = circumference * pct

  return (
    <svg width="128" height="128" viewBox="0 0 128 128">
      {/* Track */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke="#3d3028"
        strokeWidth="8"
      />
      {/* Progress */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke="url(#arcGrad)"
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${circumference}`}
        transform={`rotate(-90 ${cx} ${cy})`}
      />
      <defs>
        <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#e87040" />
          <stop offset="100%" stopColor="#c95228" />
        </linearGradient>
      </defs>
      {/* Day label */}
      <text x={cx} y={cy - 6} textAnchor="middle" fill="#f0e8de" fontSize="24" fontWeight="700" fontFamily="Inter, sans-serif">
        {day}
      </text>
      <text x={cx} y={cy + 12} textAnchor="middle" fill="#7a6a5a" fontSize="11" fontFamily="Inter, sans-serif">
        cycle day
      </text>
    </svg>
  )
}

function CyclePhaseLabel({ day }: { day: number }) {
  if (day <= 5) return <span className="text-rust-400">Menstrual</span>
  if (day <= 13) return <span className="text-amber-400">Follicular</span>
  if (day <= 15) return <span className="text-sage-400">Ovulation</span>
  return <span className="text-sienna-400">Luteal</span>
}

export default function HomeScreen({ onNavigate }: Props) {
  const topInsight = mockInsights[0]
  const greeting = (() => {
    const h = 19 // mock hour
    if (h < 12) return 'Good morning'
    if (h < 17) return 'Good afternoon'
    return 'Good evening'
  })()

  return (
    <div className="max-w-lg mx-auto px-4 pt-10 pb-4 space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="text-warm-muted text-sm">{greeting}</p>
          <h1 className="text-display text-2xl font-semibold text-warm-text">Amara</h1>
        </div>
        <button
          onClick={() => onNavigate('profile')}
          className="w-10 h-10 rounded-full gradient-rust flex items-center justify-center shadow-md"
        >
          <span className="text-white text-sm font-semibold">A</span>
        </button>
      </div>

      {/* Main cycle card */}
      <div className="bg-warm-card border border-warm-border rounded-3xl p-5 card-glow">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-warm-muted text-xs uppercase tracking-wider font-medium mb-1">Current phase</p>
            <p className="text-lg font-semibold">
              <CyclePhaseLabel day={currentCycleDay} />
            </p>
          </div>
          <PhaseArc day={currentCycleDay} />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-warm-bg rounded-2xl p-3">
            <p className="text-warm-muted text-xs mb-1">Next period</p>
            <p className="text-warm-text font-semibold text-sm">
              {new Date(nextPeriodDate).toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' })}
            </p>
            <p className="text-rust-400 text-xs mt-0.5">in {daysUntilNextPeriod} days</p>
          </div>
          <div className="bg-warm-bg rounded-2xl p-3">
            <p className="text-warm-muted text-xs mb-1">Fertile window</p>
            <p className="text-warm-text font-semibold text-sm">May 7 – 12</p>
            <p className="text-sage-400 text-xs mt-0.5">in 6 days</p>
          </div>
        </div>
      </div>

      {/* Quick log CTA */}
      <button
        onClick={() => onNavigate('checkin')}
        className="w-full bg-warm-card border border-rust-800/50 rounded-2xl p-4 flex items-center gap-3 active:scale-[0.98] transition-transform"
      >
        <div className="w-10 h-10 gradient-rust rounded-xl flex items-center justify-center flex-shrink-0">
          <Droplets size={18} className="text-white" />
        </div>
        <div className="flex-1 text-left">
          <p className="text-warm-text font-medium text-sm">Log today</p>
          <p className="text-warm-muted text-xs mt-0.5">How are you feeling today?</p>
        </div>
        <ChevronRight size={16} className="text-warm-muted" />
      </button>

      {/* Symptom summary */}
      <div className="bg-warm-card border border-warm-border rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle size={14} className="text-amber-400" />
          <p className="text-sm font-medium text-warm-text">Yesterday's snapshot</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {['😊 Happy', '⚡ Energetic', '✅ No symptoms'].map(tag => (
            <span key={tag} className="chip chip-unselected text-xs">{tag}</span>
          ))}
        </div>
      </div>

      {/* Energy indicator */}
      <div className="bg-warm-card border border-warm-border rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Zap size={14} className="text-amber-400" />
          <p className="text-sm font-medium text-warm-text">Energy forecast</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex-1 h-2 bg-warm-bg rounded-full overflow-hidden">
            <div className="h-full w-[78%] gradient-warm rounded-full" />
          </div>
          <span className="text-amber-400 font-semibold text-sm">High</span>
        </div>
        <p className="text-warm-muted text-xs mt-2">Days 6–13 are typically your peak energy window.</p>
      </div>

      {/* Insight card */}
      <div className="bg-warm-card border border-warm-border rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <span className="text-2xl">{topInsight.icon}</span>
          <div className="flex-1">
            <p className="text-warm-text font-medium text-sm">{topInsight.title}</p>
            <p className="text-warm-muted text-xs mt-1 leading-relaxed">{topInsight.body}</p>
          </div>
        </div>
        <button
          onClick={() => onNavigate('insights')}
          className="mt-3 text-rust-400 text-xs font-medium flex items-center gap-1"
        >
          See all insights <ChevronRight size={12} />
        </button>
      </div>

      {/* Shared support nudge */}
      <button
        onClick={() => onNavigate('partner')}
        className="w-full bg-warm-card border border-warm-border rounded-2xl p-4 flex items-center gap-3 active:scale-[0.98] transition-transform"
      >
        <div className="w-10 h-10 bg-sage-900/60 border border-sage-700/40 rounded-xl flex items-center justify-center">
          <Users size={18} className="text-sage-400" />
        </div>
        <div className="flex-1 text-left">
          <p className="text-warm-text font-medium text-sm">Shared support</p>
          <p className="text-warm-muted text-xs mt-0.5">Liam can see your current phase</p>
        </div>
        <div className="w-2 h-2 rounded-full bg-sage-400" />
      </button>
    </div>
  )
}
