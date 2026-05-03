import { useState } from 'react'
import React from 'react'
import { Check, ChevronLeft } from 'lucide-react'
import type { Screen, FlowLevel, MoodTag, SymptomTag } from '../types'
import { currentCycleDay } from '../mockData'

interface Props {
  onNavigate: (s: Screen) => void
}

type Step = 'flow' | 'mood' | 'symptoms' | 'notes' | 'done'

const flowOptions: { value: FlowLevel; label: string; dot: string }[] = [
  { value: 'none', label: 'None', dot: 'bg-gg-grey' },
  { value: 'spotting', label: 'Spotting', dot: 'bg-gg-pink-mid' },
  { value: 'light', label: 'Light', dot: 'bg-gg-pink' },
  { value: 'medium', label: 'Medium', dot: 'bg-gg-pink' },
  { value: 'heavy', label: 'Heavy', dot: 'bg-gg-pink-dark' },
  { value: 'very_heavy', label: 'Very heavy', dot: 'bg-gg-pink-dark' },
]

const moodOptions: { value: MoodTag; emoji: string; label: string }[] = [
  { value: 'calm', emoji: '😌', label: 'Calm' },
  { value: 'happy', emoji: '😊', label: 'Happy' },
  { value: 'energetic', emoji: '⚡', label: 'Energetic' },
  { value: 'focused', emoji: '🎯', label: 'Focused' },
  { value: 'irritable', emoji: '😤', label: 'Irritable' },
  { value: 'anxious', emoji: '😰', label: 'Anxious' },
  { value: 'sad', emoji: '😢', label: 'Sad' },
  { value: 'exhausted', emoji: '😴', label: 'Exhausted' },
  { value: 'sensitive', emoji: '💙', label: 'Sensitive' },
]

const symptomOptions: { value: SymptomTag; label: string }[] = [
  { value: 'cramps', label: 'Cramps' },
  { value: 'bloating', label: 'Bloating' },
  { value: 'headache', label: 'Headache' },
  { value: 'breast_tenderness', label: 'Breast tenderness' },
  { value: 'back_pain', label: 'Back pain' },
  { value: 'nausea', label: 'Nausea' },
  { value: 'fatigue', label: 'Fatigue' },
  { value: 'acne', label: 'Acne' },
  { value: 'cravings', label: 'Cravings' },
  { value: 'insomnia', label: 'Insomnia' },
  { value: 'hot_flashes', label: 'Hot flashes' },
  { value: 'discharge', label: 'Discharge' },
]

const steps: Step[] = ['flow', 'mood', 'symptoms', 'notes', 'done']

export default function CheckinScreen({ onNavigate }: Props) {
  const [step, setStep] = useState<Step>('flow')
  const [flow, setFlow] = useState<FlowLevel>('none')
  const [moods, setMoods] = useState<MoodTag[]>([])
  const [symptoms, setSymptoms] = useState<SymptomTag[]>([])
  const [notes, setNotes] = useState('')
  const [intimacy, setIntimacy] = useState(false)

  const stepIdx = steps.indexOf(step)

  const toggleMood = (m: MoodTag) =>
    setMoods(prev => prev.includes(m) ? prev.filter(x => x !== m) : [...prev, m])

  const toggleSymptom = (s: SymptomTag) =>
    setSymptoms(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])

  const next = () => {
    const nextIdx = stepIdx + 1
    if (nextIdx < steps.length) setStep(steps[nextIdx])
  }
  const back = () => {
    if (stepIdx > 0) setStep(steps[stepIdx - 1])
    else onNavigate('home')
  }

  if (step === 'done') {
    return (
      <div className="max-w-lg mx-auto px-4 pt-20 pb-8 flex flex-col items-center text-center gap-6">
        <div className="w-20 h-20 gradient-gg-pink rounded-full flex items-center justify-center shadow-xl">
          <Check size={36} className="text-white" />
        </div>
        <div>
          <h2 className="text-display text-2xl font-semibold text-gray-800">All logged!</h2>
          <p className="text-gg-grey mt-2">Day {currentCycleDay} captured. See you tomorrow.</p>
        </div>
        <div className="w-full bg-white border border-gg-blush rounded-2xl p-4 text-left space-y-2">
          <p className="text-xs text-gg-grey uppercase tracking-wider font-medium mb-3">Today's summary</p>
          <SummaryRow label="Flow" value={flow.replace('_', ' ')} />
          <SummaryRow label="Mood" value={moods.length ? moods.join(', ') : 'Not logged'} />
          <SummaryRow label="Symptoms" value={symptoms.length ? symptoms.join(', ') : 'None'} />
          {notes && <SummaryRow label="Note" value={notes} />}
        </div>
        <button onClick={() => onNavigate('home')} className="btn-primary w-full">
          Back to home
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-lg mx-auto px-4 pt-10 pb-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={back} className="w-9 h-9 rounded-full bg-white border border-gg-blush flex items-center justify-center">
          <ChevronLeft size={18} className="text-gg-grey" />
        </button>
        <div className="flex-1">
          <p className="text-gg-grey text-xs">Daily check-in · Day {currentCycleDay}</p>
          <div className="flex gap-1 mt-1.5">
            {steps.slice(0, -1).map((s, i) => (
              <div
                key={s}
                className={`h-1 flex-1 rounded-full transition-all ${
                  i <= stepIdx ? 'bg-gg-pink' : 'bg-gg-blush'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Steps */}
      {step === 'flow' && (
        <StepWrapper title="How's your flow today?" onNext={next}>
          <div className="space-y-2">
            {flowOptions.map(o => (
              <button
                key={o.value}
                onClick={() => setFlow(o.value)}
                className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl border transition-all ${
                  flow === o.value
                    ? 'border-gg-pink bg-gg-pink/10'
                    : 'border-gg-blush bg-white'
                }`}
              >
                <span className={`w-3 h-3 rounded-full flex-shrink-0 ${o.dot}`} />
                <span className={`font-medium ${flow === o.value ? 'text-gg-pink' : 'text-gray-800'}`}>
                  {o.label}
                </span>
                {flow === o.value && (
                  <Check size={14} className="text-gg-pink ml-auto" />
                )}
              </button>
            ))}
          </div>
        </StepWrapper>
      )}

      {step === 'mood' && (
        <StepWrapper title="How are you feeling?" subtitle="Select all that apply" onNext={next}>
          <div className="grid grid-cols-3 gap-2">
            {moodOptions.map(m => (
              <button
                key={m.value}
                onClick={() => toggleMood(m.value)}
                className={`flex flex-col items-center gap-2 py-3 px-2 rounded-2xl border transition-all ${
                  moods.includes(m.value)
                    ? 'border-gg-pink bg-gg-pink/10'
                    : 'border-gg-blush bg-white'
                }`}
              >
                <span className="text-2xl">{m.emoji}</span>
                <span className={`text-xs font-medium ${moods.includes(m.value) ? 'text-gg-pink' : 'text-gg-grey'}`}>
                  {m.label}
                </span>
              </button>
            ))}
          </div>
        </StepWrapper>
      )}

      {step === 'symptoms' && (
        <StepWrapper title="Any symptoms?" subtitle="Select all that apply — or skip if none" onNext={next}>
          <div className="flex flex-wrap gap-2">
            {symptomOptions.map(s => (
              <button
                key={s.value}
                onClick={() => toggleSymptom(s.value)}
                className={`chip transition-all ${
                  symptoms.includes(s.value) ? 'chip-selected' : 'chip-unselected'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          {/* Intimacy */}
          <div className="mt-5 border-t border-gg-blush pt-5">
            <p className="text-gg-grey text-xs uppercase tracking-wider font-medium mb-3">Also log</p>
            <button
              onClick={() => setIntimacy(v => !v)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-2xl border transition-all ${
                intimacy ? 'border-gg-pink bg-gg-pink/10' : 'border-gg-blush bg-white'
              }`}
            >
              <span className="text-base">🤍</span>
              <span className={`font-medium text-sm ${intimacy ? 'text-gg-pink' : 'text-gray-800'}`}>Intimacy</span>
              {intimacy && <Check size={14} className="text-gg-pink ml-auto" />}
            </button>
          </div>
        </StepWrapper>
      )}

      {step === 'notes' && (
        <StepWrapper title="Anything else?" subtitle="Optional — a private note for today" onNext={next} nextLabel="Save log">
          <textarea
            className="input-field resize-none h-36"
            placeholder="How was today really? Anything you want to remember..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />
          <p className="text-gg-grey text-xs mt-2">Only you can see this.</p>
        </StepWrapper>
      )}
    </div>
  )
}

function StepWrapper({
  title,
  subtitle,
  children,
  onNext,
  nextLabel = 'Continue',
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
  onNext: () => void
  nextLabel?: string
}) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-display text-2xl font-semibold text-gray-800">{title}</h2>
        {subtitle && <p className="text-gg-grey text-sm mt-1">{subtitle}</p>}
      </div>
      {children}
      <button onClick={onNext} className="btn-primary w-full mt-4">
        {nextLabel}
      </button>
    </div>
  )
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gg-grey capitalize">{label}</span>
      <span className="text-gray-800 text-right max-w-[60%] capitalize">{value}</span>
    </div>
  )
}
