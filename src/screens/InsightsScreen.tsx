import type { Screen } from '../types'
import { mockInsights } from '../mockData'

interface Props {
  onNavigate: (s: Screen) => void
}

const typeConfig = {
  pattern: { bg: 'bg-rust-900/40', border: 'border-rust-700/40', label: 'Pattern', badge: 'bg-rust-800/60 text-rust-300' },
  tip: { bg: 'bg-amber-900/30', border: 'border-amber-700/40', label: 'Tip', badge: 'bg-amber-800/60 text-amber-300' },
  prediction: { bg: 'bg-sage-900/40', border: 'border-sage-700/40', label: 'Prediction', badge: 'bg-sage-800/60 text-sage-300' },
  celebration: { bg: 'bg-sienna-900/30', border: 'border-sienna-700/40', label: '✨ Great', badge: 'bg-sienna-800/60 text-sienna-300' },
}

export default function InsightsScreen({ onNavigate: _nav }: Props) {
  return (
    <div className="max-w-lg mx-auto px-4 pt-10 pb-4 space-y-5">
      {/* Header */}
      <div>
        <p className="text-warm-muted text-xs uppercase tracking-wider font-medium">Based on your data</p>
        <h1 className="text-display text-2xl font-semibold text-warm-text mt-1">Insights</h1>
      </div>

      {/* Summary bar */}
      <div className="bg-warm-card border border-warm-border rounded-2xl p-4">
        <p className="text-xs text-warm-muted uppercase tracking-wider font-medium mb-3">Mood over this cycle</p>
        <div className="flex items-end gap-1 h-16">
          {[
            { day: 1, mood: 0.2 },
            { day: 2, mood: 0.1 },
            { day: 3, mood: 0.3 },
            { day: 4, mood: 0.5 },
            { day: 5, mood: 0.6 },
            { day: 6, mood: 0.85 },
            { day: 7, mood: 0.9 },
            { day: 8, mood: 0.95, today: true },
          ].map(d => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
              <div
                className={`w-full rounded-t-sm ${d.today ? 'gradient-rust' : 'bg-warm-border'}`}
                style={{ height: `${d.mood * 100}%` }}
              />
              <span className={`text-[9px] ${d.today ? 'text-rust-400' : 'text-warm-muted'}`}>
                {d.day}
              </span>
            </div>
          ))}
        </div>
        <p className="text-warm-muted text-xs mt-2">Day 1–8 · ↑ mood trending up</p>
      </div>

      {/* Symptom frequency */}
      <div className="bg-warm-card border border-warm-border rounded-2xl p-4">
        <p className="text-xs text-warm-muted uppercase tracking-wider font-medium mb-4">Symptom frequency (last 4 cycles)</p>
        <div className="space-y-3">
          {[
            { label: 'Cramps', pct: 95, color: 'bg-rust-500' },
            { label: 'Fatigue', pct: 80, color: 'bg-amber-500' },
            { label: 'Bloating', pct: 72, color: 'bg-sienna-400' },
            { label: 'Headache', pct: 55, color: 'bg-rust-400' },
            { label: 'Back pain', pct: 48, color: 'bg-amber-600' },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-3">
              <span className="text-warm-muted text-xs w-28 flex-shrink-0">{s.label}</span>
              <div className="flex-1 h-2 bg-warm-bg rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${s.color}`}
                  style={{ width: `${s.pct}%` }}
                />
              </div>
              <span className="text-warm-muted text-xs w-8 text-right">{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Insight cards */}
      <div className="space-y-3">
        <p className="text-xs text-warm-muted uppercase tracking-wider font-medium">Pattern notes</p>
        {mockInsights.map(insight => {
          const cfg = typeConfig[insight.type]
          return (
            <div
              key={insight.id}
              className={`${cfg.bg} border ${cfg.border} rounded-2xl p-4`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0 mt-0.5">{insight.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="text-warm-text font-medium text-sm">{insight.title}</p>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${cfg.badge}`}>
                      {cfg.label}
                    </span>
                  </div>
                  <p className="text-warm-muted text-xs leading-relaxed">{insight.body}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
