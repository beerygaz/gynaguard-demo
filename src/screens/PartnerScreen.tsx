import { useState } from 'react'
import { ChevronLeft, Shield, Users, Bell, Eye, ChevronRight } from 'lucide-react'
import type { Screen } from '../types'
import { mockPartnerSettings } from '../mockData'

interface Props {
  onNavigate: (s: Screen) => void
}

export default function PartnerScreen({ onNavigate }: Props) {
  const [enabled, setEnabled] = useState(mockPartnerSettings.enabled)
  const [shareLevel, setShareLevel] = useState(mockPartnerSettings.shareLevel)
  const [notifyCycleStart, setNotifyCycleStart] = useState(mockPartnerSettings.notifyOnCycleStart)
  const [notifySymptoms, setNotifySymptoms] = useState(mockPartnerSettings.notifyOnSymptoms)
  const [showPreview, setShowPreview] = useState(false)

  return (
    <div className="max-w-lg mx-auto px-4 pt-10 pb-4 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <button onClick={() => onNavigate('home')} className="w-9 h-9 rounded-full bg-white border border-gg-blush flex items-center justify-center">
          <ChevronLeft size={18} className="text-gg-grey" />
        </button>
        <div>
          <p className="text-gg-grey text-xs uppercase tracking-wider font-medium">Optional feature</p>
          <h1 className="text-display text-xl font-semibold text-gray-800">Shared support</h1>
        </div>
      </div>

      {/* Privacy framing */}
      <div className="bg-gg-teal/10 border border-gg-teal/30 rounded-2xl p-4 flex gap-3">
        <Shield size={18} className="text-gg-teal flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-gg-teal font-medium text-sm">Your privacy, your terms</p>
          <p className="text-gg-grey text-xs mt-1 leading-relaxed">
            Shared support is designed to help your partner understand and support you — not to surveil. You control exactly what they can see, and you can turn it off at any time.
          </p>
        </div>
      </div>

      {/* Main toggle */}
      <div className="bg-white border border-gg-blush rounded-2xl p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gg-teal/10 rounded-xl flex items-center justify-center">
            <Users size={18} className="text-gg-teal" />
          </div>
          <div>
            <p className="text-gray-800 font-medium text-sm">Enable shared support</p>
            <p className="text-gg-grey text-xs">Sharing with {mockPartnerSettings.partnerName}</p>
          </div>
        </div>
        <Toggle value={enabled} onChange={setEnabled} />
      </div>

      {enabled && (
        <>
          {/* Share level */}
          <div className="bg-white border border-gg-blush rounded-2xl p-4 space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Eye size={14} className="text-gg-grey" />
              <p className="text-sm font-medium text-gray-800">What they can see</p>
            </div>
            {([
              {
                value: 'phase_only',
                label: 'Phase only',
                desc: 'Just your current cycle phase — e.g. "Luteal"',
              },
              {
                value: 'phase_and_mood',
                label: 'Phase + mood',
                desc: 'Phase and a general mood indicator — e.g. "Feeling tired"',
              },
              {
                value: 'detailed',
                label: 'Detailed view',
                desc: 'Phase, mood tags, and logged symptoms (not notes)',
              },
            ] as const).map(opt => (
              <button
                key={opt.value}
                onClick={() => setShareLevel(opt.value)}
                className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                  shareLevel === opt.value
                    ? 'border-gg-teal bg-gg-teal/10'
                    : 'border-gg-blush bg-gg-pale-blush'
                }`}
              >
                <p className={`font-medium text-sm ${shareLevel === opt.value ? 'text-gg-teal' : 'text-gray-800'}`}>
                  {opt.label}
                </p>
                <p className="text-gg-grey text-xs mt-0.5">{opt.desc}</p>
              </button>
            ))}
          </div>

          {/* Notifications */}
          <div className="bg-white border border-gg-blush rounded-2xl p-4 space-y-4">
            <div className="flex items-center gap-2 mb-1">
              <Bell size={14} className="text-gg-grey" />
              <p className="text-sm font-medium text-gray-800">Notify partner when</p>
            </div>
            <ToggleRow
              label="Cycle starts"
              desc="Sends a gentle heads-up at the start of your period"
              value={notifyCycleStart}
              onChange={setNotifyCycleStart}
            />
            <ToggleRow
              label="Significant symptoms"
              desc="Notifies them when you log pain or high-intensity symptoms"
              value={notifySymptoms}
              onChange={setNotifySymptoms}
            />
          </div>

          {/* Partner view preview */}
          <button
            onClick={() => setShowPreview(v => !v)}
            className="w-full bg-white border border-gg-blush rounded-2xl p-4 flex items-center justify-between"
          >
            <p className="text-gray-800 text-sm font-medium">Preview what {mockPartnerSettings.partnerName} sees</p>
            <ChevronRight size={16} className={`text-gg-grey transition-transform ${showPreview ? 'rotate-90' : ''}`} />
          </button>

          {showPreview && (
            <PartnerViewPreview shareLevel={shareLevel} partnerName={mockPartnerSettings.partnerName} />
          )}

          <button
            onClick={() => onNavigate('home')}
            className="btn-secondary w-full text-center text-gg-grey text-sm"
          >
            Remove access
          </button>
        </>
      )}

      {!enabled && (
        <div className="text-center py-8 space-y-2">
          <p className="text-gg-grey text-sm">Shared support is off.</p>
          <p className="text-gg-grey text-xs leading-relaxed">
            Turn it on to let someone you trust see a summary of your cycle phase and wellbeing.
          </p>
        </div>
      )}
    </div>
  )
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-12 h-6 rounded-full transition-colors ${value ? 'bg-gg-teal' : 'bg-gg-blush'}`}
    >
      <span
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${
          value ? 'translate-x-6' : 'translate-x-0.5'
        }`}
      />
    </button>
  )
}

function ToggleRow({
  label,
  desc,
  value,
  onChange,
}: {
  label: string
  desc: string
  value: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex-1">
        <p className="text-gray-800 text-sm font-medium">{label}</p>
        <p className="text-gg-grey text-xs mt-0.5">{desc}</p>
      </div>
      <Toggle value={value} onChange={onChange} />
    </div>
  )
}

function PartnerViewPreview({
  shareLevel,
  partnerName,
}: {
  shareLevel: 'phase_only' | 'phase_and_mood' | 'detailed'
  partnerName: string
}) {
  return (
    <div className="border-2 border-dashed border-gg-blush rounded-2xl p-4 space-y-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] text-gg-grey uppercase tracking-wider font-medium">
          {partnerName}'s view — preview only
        </span>
      </div>

      {/* Mock partner-facing card */}
      <div className="bg-gg-pale-blush rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 gradient-gg-pink rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-bold">A</span>
          </div>
          <div>
            <p className="text-gray-800 font-semibold text-sm">Amara</p>
            <p className="text-gg-grey text-xs">Shared cycle summary</p>
          </div>
        </div>

        <div className="border-t border-gg-blush pt-3 space-y-2">
          <InfoRow label="Cycle phase" value="Follicular" />
          <InfoRow label="Day" value="Day 8 of ~28" />
          {(shareLevel === 'phase_and_mood' || shareLevel === 'detailed') && (
            <InfoRow label="General vibe" value="⚡ Energetic today" />
          )}
          {shareLevel === 'detailed' && (
            <InfoRow label="Symptoms" value="None logged" />
          )}
        </div>

        <div className="bg-gg-teal/10 border border-gg-teal/20 rounded-xl p-3">
          <p className="text-gg-teal text-xs leading-relaxed">
            💚 Amara is in her follicular phase — energy and mood tend to be good this week.
          </p>
        </div>

        <p className="text-gg-grey text-[10px] text-center">
          Private notes are never shared. Amara controls this view.
        </p>
      </div>
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-sm">
      <span className="text-gg-grey">{label}</span>
      <span className="text-gray-800 font-medium">{value}</span>
    </div>
  )
}
