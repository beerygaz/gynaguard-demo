import type { Screen } from '../types'
import { mockInsights } from '../mockData'

interface Props {
  onNavigate: (s: Screen) => void
}

const typeConfig = {
  pattern:     { bg: 'bg-gg-pink/10',     border: 'border-gg-pink/20',     label: 'Pattern',    badge: 'bg-gg-pink/20 text-gg-pink-dark' },
  tip:         { bg: 'bg-gg-teal/10',     border: 'border-gg-teal/20',     label: 'Tip',        badge: 'bg-gg-teal/20 text-gg-teal' },
  prediction:  { bg: 'bg-gg-teal/10',     border: 'border-gg-teal/20',     label: 'Prediction', badge: 'bg-gg-teal/20 text-gg-teal' },
  celebration: { bg: 'bg-gg-pink-mid/10', border: 'border-gg-pink-mid/20', label: '✨ Great',    badge: 'bg-gg-pink-mid/20 text-gg-pink-dark' },
}

export default function InsightsScreen({ onNavigate: _nav }: Props) {
  return (
    <div className="max-w-lg mx-auto px-4 pt-10 pb-4 space-y-5">
      {/* Header */}
      <div>
        <p className="text-gg-grey text-xs uppercase tracking-wider font-medium">Based on your data</p>
        <h1 className="text-display text-2xl font-semibold text-gray-800 mt-1">Insights</h1>
      </div>

      {/* Summary bar */}
      <div className="bg-white border border-gg-blush rounded-2xl p-4">
        <p className="text-xs text-gg-grey uppercase tracking-wider font-medium mb-3">Mood over this cycle</p>
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
                className={`w-full rounded-t-sm ${d.today ? 'gradient-gg-pink' : 'bg-gg-blush'}`}
                style={{ height: `${d.mood * 100}%` }}
              />
              <span className={`text-[9px] ${d.today ? 'text-gg-pink' : 'text-gg-grey'}`}>
                {d.day}
              </span>
            </div>
          ))}
        </div>
        <p className="text-gg-grey text-xs mt-2">Day 1–8 · ↑ mood trending up</p>
      </div>

      {/* Symptom frequency */}
      <div className="bg-white border border-gg-blush rounded-2xl p-4">
        <p className="text-xs text-gg-grey uppercase tracking-wider font-medium mb-4">Symptom frequency (last 4 cycles)</p>
        <div className="space-y-3">
          {[
            { label: 'Cramps',    pct: 95, color: 'bg-gg-pink' },
            { label: 'Fatigue',   pct: 80, color: 'bg-gg-teal' },
            { label: 'Bloating',  pct: 72, color: 'bg-gg-pink-mid' },
            { label: 'Headache',  pct: 55, color: 'bg-gg-pink' },
            { label: 'Back pain', pct: 48, color: 'bg-gg-teal' },
          ].map(s => (
            <div key={s.label} className="flex items-center gap-3">
              <span className="text-gg-grey text-xs w-28 flex-shrink-0">{s.label}</span>
              <div className="flex-1 h-2 bg-gg-pale-blush rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${s.color}`}
                  style={{ width: `${s.pct}%` }}
                />
              </div>
              <span className="text-gg-grey text-xs w-8 text-right">{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Insight cards */}
      <div className="space-y-3">
        <p className="text-xs text-gg-grey uppercase tracking-wider font-medium">Pattern notes</p>
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
                    <p className="text-gray-800 font-medium text-sm">{insight.title}</p>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${cfg.badge}`}>
                      {cfg.label}
                    </span>
                  </div>
                  <p className="text-gg-grey text-xs leading-relaxed">{insight.body}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
