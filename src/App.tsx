/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { Library } from "./pages/Library";
import { Kalam } from "./pages/Kalam";
import { About } from "./pages/About";
import { Projects } from "./pages/Projects";
import { Donate } from "./pages/Donate";
import { ChatBot } from "./components/ChatBot";
import { AmbientAudio } from "./components/AmbientAudio";
import { CursorTrail } from "./components/CursorTrail";
import { AnimatePresence } from "motion/react";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-sacred-black font-sans text-ivory overflow-x-hidden selection:bg-gold-antique selection:text-sacred-black">
        <Navbar />
        <main>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/library" element={<Library />} />
              <Route path="/kalam" element={<Kalam />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/donate" element={<Donate />} />
            </Routes>
          </AnimatePresence>
        </main>
        <ChatBot />
        <AmbientAudio />
        <CursorTrail />
        <Footer />
      </div>
    </Router>
  );
}

