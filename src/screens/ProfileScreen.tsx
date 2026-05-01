import React, { useState } from 'react'
import { Shield, Bell, Download, Trash2, ChevronRight, Lock } from 'lucide-react'
import type { Screen } from '../types'

interface Props {
  onNavigate: (s: Screen) => void
}

export default function ProfileScreen({ onNavigate }: Props) {
  const [notifications, setNotifications] = useState(true)
  const [biometric, setBiometric] = useState(true)
  const [screenshotBlock, setScreenshotBlock] = useState(false)

  return (
    <div className="max-w-lg mx-auto px-4 pt-10 pb-4 space-y-5">
      {/* Header */}
      <div>
        <p className="text-warm-muted text-xs uppercase tracking-wider font-medium">Account</p>
        <h1 className="text-display text-2xl font-semibold text-warm-text mt-1">Profile</h1>
      </div>

      {/* Avatar */}
      <div className="flex items-center gap-4 bg-warm-card border border-warm-border rounded-2xl p-4">
        <div className="w-14 h-14 gradient-rust rounded-full flex items-center justify-center shadow-md">
          <span className="text-white text-xl font-bold text-display">A</span>
        </div>
        <div className="flex-1">
          <p className="text-warm-text font-semibold">Amara</p>
          <p className="text-warm-muted text-sm">amara@example.com</p>
        </div>
        <button className="text-warm-muted">
          <ChevronRight size={16} />
        </button>
      </div>

      {/* Cycle settings */}
      <Section title="Cycle settings">
        <InfoRow label="Average cycle length" value="28 days" />
        <InfoRow label="Average period length" value="5 days" />
        <InfoRow label="Tracking since" value="Jan 2026" />
        <button className="flex items-center justify-between w-full py-2">
          <span className="text-rust-400 text-sm font-medium">Edit cycle details</span>
          <ChevronRight size={14} className="text-warm-muted" />
        </button>
      </Section>

      {/* Privacy controls */}
      <Section title="Privacy" icon={<Shield size={14} className="text-sage-400" />}>
        <ToggleRow
          label="App lock (biometric)"
          desc="Require Face ID or fingerprint to open"
          value={biometric}
          onChange={setBiometric}
        />
        <ToggleRow
          label="Block screenshots"
          desc="Prevent screen capture within the app"
          value={screenshotBlock}
          onChange={setScreenshotBlock}
        />
        <button
          onClick={() => onNavigate('partner')}
          className="flex items-center justify-between w-full py-2 border-t border-warm-border mt-2 pt-4"
        >
          <div className="flex items-center gap-2">
            <Lock size={14} className="text-warm-muted" />
            <span className="text-warm-text text-sm">Shared support settings</span>
          </div>
          <ChevronRight size={14} className="text-warm-muted" />
        </button>
      </Section>

      {/* Notifications */}
      <Section title="Notifications" icon={<Bell size={14} className="text-amber-400" />}>
        <ToggleRow
          label="Period reminders"
          desc="Get notified 2 days before your period is due"
          value={notifications}
          onChange={setNotifications}
        />
        <ToggleRow
          label="Daily check-in reminder"
          desc="Morning nudge to log your day"
          value={true}
          onChange={() => {}}
        />
      </Section>

      {/* Data */}
      <Section title="Your data">
        <button className="flex items-center gap-3 w-full py-2">
          <Download size={14} className="text-warm-muted" />
          <span className="text-warm-text text-sm">Export my data</span>
        </button>
        <p className="text-warm-muted text-xs leading-relaxed">
          Download all your logged data as a CSV — your data is yours, always.
        </p>
        <button className="flex items-center gap-3 w-full py-2 mt-2">
          <Trash2 size={14} className="text-rust-500" />
          <span className="text-rust-400 text-sm font-medium">Delete my account</span>
        </button>
      </Section>

      {/* Version */}
      <p className="text-center text-warm-muted text-xs pb-2">
        Gyanguard v0.1 · Private beta · gyna.apps.highpeak.co.za
      </p>
    </div>
  )
}

function Section({
  title,
  icon,
  children,
}: {
  title: string
  icon?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="bg-warm-card border border-warm-border rounded-2xl p-4 space-y-3">
      <div className="flex items-center gap-2">
        {icon}
        <p className="text-xs text-warm-muted uppercase tracking-wider font-medium">{title}</p>
      </div>
      {children}
    </div>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-warm-muted text-sm">{label}</span>
      <span className="text-warm-text text-sm font-medium">{value}</span>
    </div>
  )
}

function Toggle({ value, onChange }: { value: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`relative w-12 h-6 rounded-full transition-colors flex-shrink-0 ${value ? 'bg-rust-600' : 'bg-warm-border'}`}
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
    <div className="flex items-start justify-between gap-4 py-1">
      <div className="flex-1">
        <p className="text-warm-text text-sm font-medium">{label}</p>
        <p className="text-warm-muted text-xs mt-0.5">{desc}</p>
      </div>
      <Toggle value={value} onChange={onChange} />
    </div>
  )
}
