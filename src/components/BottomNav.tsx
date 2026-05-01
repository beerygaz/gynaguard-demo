import type { Screen } from '../types'
import { Home, CalendarDays, Sparkles, ClipboardList, User } from 'lucide-react'

interface Props {
  current: Screen
  onNavigate: (s: Screen) => void
}

const tabs = [
  { id: 'home' as Screen, label: 'Home', Icon: Home },
  { id: 'checkin' as Screen, label: 'Log', Icon: ClipboardList },
  { id: 'calendar' as Screen, label: 'Cycle', Icon: CalendarDays },
  { id: 'insights' as Screen, label: 'Insights', Icon: Sparkles },
  { id: 'profile' as Screen, label: 'You', Icon: User },
]

export default function BottomNav({ current, onNavigate }: Props) {
  return (
    <nav className="fixed bottom-0 inset-x-0 glass border-t border-warm-border safe-bottom z-50">
      <div className="max-w-lg mx-auto flex items-stretch">
        {tabs.map(({ id, label, Icon }) => {
          const active = current === id
          return (
            <button
              key={id}
              onClick={() => onNavigate(id)}
              className={`flex-1 flex flex-col items-center justify-center gap-1 py-3 transition-all ${
                active ? 'tab-active' : 'tab-inactive'
              }`}
            >
              <Icon size={20} strokeWidth={active ? 2 : 1.5} />
              <span className="text-[10px] font-medium tracking-wide">{label}</span>
              {active && (
                <span className="absolute bottom-0 w-6 h-0.5 rounded-full bg-rust-500 translate-y-0" />
              )}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
