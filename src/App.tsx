import { useState } from 'react'
import type { Screen } from './types'
import OnboardingScreen from './screens/OnboardingScreen'
import HomeScreen from './screens/HomeScreen'
import CheckinScreen from './screens/CheckinScreen'
import CalendarScreen from './screens/CalendarScreen'
import InsightsScreen from './screens/InsightsScreen'
import PartnerScreen from './screens/PartnerScreen'
import ProfileScreen from './screens/ProfileScreen'
import BottomNav from './components/BottomNav'

export default function App() {
  const [screen, setScreen] = useState<Screen>('onboarding')

  if (screen === 'onboarding') {
    return <OnboardingScreen onComplete={() => setScreen('home')} />
  }

  const tabScreens: Screen[] = ['home', 'checkin', 'calendar', 'insights', 'profile']

  return (
    <div className="min-h-screen bg-gg-pale-blush flex flex-col">
      <div className="flex-1 overflow-y-auto pb-20">
        {screen === 'home' && <HomeScreen onNavigate={setScreen} />}
        {screen === 'checkin' && <CheckinScreen onNavigate={setScreen} />}
        {screen === 'calendar' && <CalendarScreen onNavigate={setScreen} />}
        {screen === 'insights' && <InsightsScreen onNavigate={setScreen} />}
        {screen === 'partner' && <PartnerScreen onNavigate={setScreen} />}
        {screen === 'profile' && <ProfileScreen onNavigate={setScreen} />}
      </div>
      <BottomNav
        current={tabScreens.includes(screen) ? screen : 'home'}
        onNavigate={setScreen}
      />
    </div>
  )
}
