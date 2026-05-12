/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Home } from "./pages/Home";
import { AmbientAudio } from "./components/AmbientAudio";
import { CursorTrail } from "./components/CursorTrail";
import { AnimatePresence } from "motion/react";

// Lazy-load every non-home route so initial JS bundle is small.
const Library = lazy(() => import("./pages/Library").then(m => ({ default: m.Library })));
const Kalam = lazy(() => import("./pages/Kalam").then(m => ({ default: m.Kalam })));
const About = lazy(() => import("./pages/About").then(m => ({ default: m.About })));
const Projects = lazy(() => import("./pages/Projects").then(m => ({ default: m.Projects })));
const Donate = lazy(() => import("./pages/Donate").then(m => ({ default: m.Donate })));
const FontTrial = lazy(() => import("./pages/FontTrial").then(m => ({ default: m.FontTrial })));
// ChatBot pulls @google/genai (~450 kB) — defer until user opens it.
const ChatBot = lazy(() => import("./components/ChatBot").then(m => ({ default: m.ChatBot })));

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-sacred-black font-sans text-ivory overflow-x-hidden selection:bg-gold-antique selection:text-sacred-black">
        <Navbar />
        <main>
          <AnimatePresence mode="wait">
            <Suspense fallback={<div className="min-h-screen" />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/library" element={<Library />} />
                <Route path="/kalam" element={<Kalam />} />
                <Route path="/about" element={<About />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/donate" element={<Donate />} />
                <Route path="/fonts" element={<FontTrial />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </main>
        <Suspense fallback={null}>
          <ChatBot />
        </Suspense>
        <AmbientAudio />
        <CursorTrail />
        <Footer />
      </div>
    </Router>
  );
}

