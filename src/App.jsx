import { useState } from 'react'
// Import your new SplashScreen component
import SplashScreen from './components/SplashScreen'

function App() {
  // This controls whether the splash screen is visible or not
  // true = show splash, false = show the real app
  const [showSplash, setShowSplash] = useState(true)

  return (
    <>
      {/* Show splash screen until onFinish is called */}
      {showSplash && (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      )}

      {/* This is a placeholder — the Lead will replace this with real routing */}
      {!showSplash && (
        <div style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
          <h1>✅ Splash screen done! App loads here.</h1>
        </div>
      )}
    </>
  )
}

export default App