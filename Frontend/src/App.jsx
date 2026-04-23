import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import AnalysisPage from './pages/AnalysisPage'
import './index.css'

function App() {
  const [selectedEmail, setSelectedEmail] = useState(null)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage onCheckEmail={() => setSelectedEmail(null)} />} />
        <Route path="/analyze" element={<AnalysisPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App