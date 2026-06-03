import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Importing all our pages — each one is a separate "screen" of the app
import Landing from './pages/Landing'
import Home from './pages/Home'
import Results from './pages/Results'
import PharmacyMap from './pages/PharmacyMap'

export default function App() {
  return (
    // BrowserRouter enables URL-based navigation throughout the app
    <BrowserRouter>
      <Routes>
        {/* Each Route maps a URL path to a page component */}
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/map" element={<PharmacyMap />} />
      </Routes>
    </BrowserRouter>
  )
}