import { useState } from 'react'
import { ChevronRight, Shield, Heart, Eye, Leaf } from 'lucide-react'

interface Props {
  onComplete: () => void
}

const slides = [
  {
    icon: <Leaf className="text-rust-400" size={48} />,
    title: 'Your cycle,\nyour story.',
    subtitle: 'Track, understand, and own your body\'s natural rhythms — with clarity and care.',
    accent: 'from-rust-900/60 to-warm-bg',
  },
  {
    icon: <Heart className="text-amber-400" size={48} />,
    title: 'Daily check-ins\nthat matter.',
    subtitle: 'Log symptoms, flow, mood, and notes in seconds. Gynaguard learns your patterns over time.',
    accent: 'from-sienna-900/60 to-warm-bg',
  },
  {
    icon: <Eye className="text-rust-400" size={48} />,
    title: 'Insights,\nnot guesses.',
    subtitle: 'Spot trends in your cycle, energy, and mood. Understand your body before it speaks up.',
    accent: 'from-rust-900/60 to-warm-bg',
  },
  {
    icon: <Shield className="text-sage-400" size={48} />,
    title: 'Private by\ndesign.',
    subtitle: 'Your data stays on your terms. Share only what you choose, only with who you trust.',
    accent: 'from-sage-900/60 to-warm-bg',
    isLast: true,
  },
]

export default function OnboardingScreen({ onComplete }: Props) {
  const [step, setStep] = useState(0)
  const slide = slides[step]

  const next = () => {
    if (step < slides.length - 1) setStep(s => s + 1)
    else onComplete()
  }

  return (
    <div className="min-h-screen bg-warm-bg flex flex-col items-center justify-between px-6 pt-16 pb-12 max-w-sm mx-auto">
      {/* Logo */}
      <div className="flex flex-col items-center gap-2">
        <div className="w-12 h-12 gradient-rust rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-display text-white text-xl font-bold">G</span>
        </div>
        <span className="text-warm-muted text-xs tracking-widest uppercase font-medium">Gynaguard</span>
      </div>

      {/* Slide content */}
      <div
        key={step}
        className="flex flex-col items-center text-center gap-6 animate-[fadeUp_0.4s_ease_both]"
        style={{ animation: 'fadeUp 0.4s ease both' }}
      >
        <div className="w-24 h-24 rounded-full bg-warm-card border border-warm-border flex items-center justify-center card-glow">
          {slide.icon}
        </div>
        <div className="space-y-3">
          <h1 className="text-display text-3xl font-semibold text-warm-text leading-tight whitespace-pre-line">
            {slide.title}
          </h1>
          <p className="text-warm-muted text-base leading-relaxed">
            {slide.subtitle}
          </p>
        </div>
      </div>

      {/* Bottom controls */}
      <div className="w-full space-y-6">
        {/* Dots */}
        <div className="flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`rounded-full transition-all ${
                i === step
                  ? 'w-6 h-2 bg-rust-500'
                  : 'w-2 h-2 bg-warm-border'
              }`}
            />
          ))}
        </div>

        <button onClick={next} className="btn-primary w-full flex items-center justify-center gap-2">
          {step < slides.length - 1 ? (
            <>Continue <ChevronRight size={18} /></>
          ) : (
            <>Get started <ChevronRight size={18} /></>
          )}
        </button>

        {step === 0 && (
          <button
            onClick={onComplete}
            className="w-full text-center text-warm-muted text-sm py-2"
          >
            I already have an account
          </button>
        )}
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
