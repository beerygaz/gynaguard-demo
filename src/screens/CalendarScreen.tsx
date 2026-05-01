import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import type { Screen } from '../types'
import { getDaysInMonth, getCycleDayType, TODAY } from '../mockData'

interface Props {
  onNavigate: (s: Screen) => void
}

const DAYS_OF_WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

export default function CalendarScreen({ onNavigate: _onNavigate }: Props) {
  const [year, setYear] = useState(2026)
  const [month, setMonth] = useState(4) // May (0-indexed)

  const days = getDaysInMonth(year, month)
  const firstDow = new Date(year, month, 1).getDay()

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
  }

  const monthLabel = new Date(year, month, 1).toLocaleDateString('en-ZA', { month: 'long', year: 'numeric' })

  return (
    <div className="max-w-lg mx-auto px-4 pt-10 pb-4 space-y-5">
      {/* Header */}
      <div>
        <p className="text-warm-muted text-xs uppercase tracking-wider font-medium">Cycle calendar</p>
        <h1 className="text-display text-2xl font-semibold text-warm-text mt-1">Your history</h1>
      </div>

      {/* Month nav */}
      <div className="bg-warm-card border border-warm-border rounded-2xl p-4">
        <div className="flex items-center justify-between mb-4">
          <button onClick={prevMonth} className="w-8 h-8 rounded-full bg-warm-bg flex items-center justify-center">
            <ChevronLeft size={16} className="text-warm-muted" />
          </button>
          <span className="text-warm-text font-semibold">{monthLabel}</span>
          <button onClick={nextMonth} className="w-8 h-8 rounded-full bg-warm-bg flex items-center justify-center">
            <ChevronRight size={16} className="text-warm-muted" />
          </button>
        </div>

        {/* DOW row */}
        <div className="grid grid-cols-7 mb-2">
          {DAYS_OF_WEEK.map(d => (
            <div key={d} className="text-center text-warm-muted text-xs font-medium py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Days grid */}
        <div className="grid grid-cols-7 gap-y-1">
          {/* Empty cells */}
          {Array.from({ length: firstDow }).map((_, i) => (
            <div key={`empty-${i}`} />
          ))}
          {days.map(date => {
            const dateStr = date.toISOString().split('T')[0]
            const type = getCycleDayType(dateStr)
            const isToday = dateStr === TODAY
            const isPeriod = type === 'period'
            const isFertile = type === 'fertile'
            const isOvulation = type === 'ovulation'

            return (
              <div
                key={dateStr}
                className="relative flex flex-col items-center justify-center aspect-square"
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                    isToday
                      ? 'gradient-rust text-white shadow-md'
                      : isPeriod
                      ? 'bg-rust-900/60 text-rust-300'
                      : isFertile
                      ? 'bg-sage-900/60 text-sage-300'
                      : isOvulation
                      ? 'bg-amber-900/60 text-amber-300'
                      : 'text-warm-muted hover:text-warm-text'
                  }`}
                >
                  {date.getDate()}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="bg-warm-card border border-warm-border rounded-2xl p-4">
        <p className="text-xs text-warm-muted uppercase tracking-wider font-medium mb-3">Legend</p>
        <div className="space-y-2">
          {[
            { dot: 'bg-rust-500', label: 'Period' },
            { dot: 'bg-sage-400', label: 'Fertile window' },
            { dot: 'bg-amber-400', label: 'Estimated ovulation' },
            { dot: 'gradient-rust', label: 'Today' },
          ].map(item => (
            <div key={item.label} className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${item.dot}`} />
              <span className="text-warm-muted text-sm">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Cycle stats */}
      <div className="bg-warm-card border border-warm-border rounded-2xl p-4">
        <p className="text-xs text-warm-muted uppercase tracking-wider font-medium mb-4">Cycle stats</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Avg length', value: '28', unit: 'days' },
            { label: 'Avg period', value: '5', unit: 'days' },
            { label: 'Cycles tracked', value: '5', unit: 'total' },
          ].map(s => (
            <div key={s.label} className="bg-warm-bg rounded-xl p-3 text-center">
              <p className="text-xl font-bold text-warm-text">{s.value}</p>
              <p className="text-warm-muted text-[10px] mt-0.5">{s.unit}</p>
              <p className="text-warm-muted text-[10px]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
