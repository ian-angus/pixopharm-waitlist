import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import Academy from '@/pages/Academy'
import Curriculum from '@/pages/Curriculum'
import Labs from '@/pages/Labs'
import Consulting from '@/pages/Consulting'
import About from '@/pages/About'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/academy" element={<Academy />} />
        <Route path="/curriculum" element={<Curriculum />} />
        <Route path="/labs" element={<Labs />} />
        <Route path="/consulting" element={<Consulting />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}
