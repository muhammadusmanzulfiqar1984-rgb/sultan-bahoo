import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Play, Pause, Search, Sparkles, Languages } from "lucide-react";
import { cn } from "../lib/utils";
import { SacredAtmosphere } from "../components/SacredAtmosphere";
import { ScrollProgressOrnament } from "../components/ScrollProgressOrnament";

const ABYAAT = [
  {
    id: "1",
    punjabi: "Alif Allah chambe di booti, murshid mann vich laai Hoo.",
    urdu: "اللہ تعالیٰ کی معرفت کا چنبیلی کا پودا مرشد کامل نے میرے دل میں لگایا۔",
    english: "My master has planted in my heart the jasmine of Allah's Infinite Name.",
    theme: "Initial Ascent",
    translation: "Inside me the Name of God has taken root, blooming like jasmine."
  },
  {
    id: "2",
    punjabi: "Dil darya samundron dhoonge, kaun dilaan di jaane Hoo.",
    urdu: "دل دریا سمندروں سے بھی گہرا ہے، دلوں کے بھید کون جان سکتا ہے۔",
    english: "The heart is deeper than the ocean, who can fathom its depths?",
    theme: "Interiority",
    translation: "Infinite are the depths of the human heart, where the Divine resides."
  },
  {
    id: "3",
    punjabi: "Faqr darya jal kahnere, kakh na rahenda sukka Hoo.",
    urdu: "فقر کا دریا ایسا ہے کہ جو اسمیں ڈوبتا ہے وہ دنیا کے غموں سے آزاد ہو جاتا ہے۔",
    english: "The river of Faqr is overflowing; nothing remains dry in its path.",
    theme: "Faqr",
    translation: "Faqr is a torrent that washes away the ego and leaves only the Beloved."
  }
];

export function Kalam() {
  const [activeVerse, setActiveVerse] = useState(ABYAAT[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState<"punjabi" | "urdu" | "english">("punjabi");

  return (
    <div className="min-h-screen pt-40 pb-24 px-6 bg-sacred-black flex flex-col items-center relative overflow-hidden">
      <SacredAtmosphere tone="crimson" embers={28} />
      <ScrollProgressOrnament
        glyph="ھُو"
        sections={[
          { urdu: "دیباچہ", label: "Prelude" },
          { urdu: "ابیات", label: "Verses" },
          { urdu: "تلاوت", label: "Recitation" },
        ]}
      />
      {/* Background Particles & Light */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-sacred-red/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gold-antique/5 rounded-full blur-[120px]" />
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
            animate={{ y: [null, "-30px", "30px"], opacity: [0, 0.3, 0] }}
            transition={{ duration: 5 + Math.random() * 5, repeat: Infinity, delay: Math.random() * 5 }}
            className="absolute w-1 h-1 bg-gold-antique/40 rounded-full blur-[1px]"
          />
        ))}
      </div>

      <div className="max-w-7xl w-full z-10">
        <header className="mb-32 text-center relative">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>
            <span className="text-gold-antique uppercase text-[10px] tracking-[0.8em] mb-8 block font-bold">گونجِ الٰہی · Divine Echoes</span>
            <h1 className="font-nastaliq text-6xl md:text-[8rem] mb-4 gold-gradient leading-[1.3]" dir="rtl">ابیاتِ باہُو</h1>
            <h2 className="text-3xl md:text-5xl font-serif italic gold-gradient leading-[0.9] mb-12">The Abyaat-e-Bahoo</h2>
            <p className="font-nastaliq text-ivory/60 max-w-2xl mx-auto text-lg leading-[2]" dir="rtl">
              ”دل ایک ایسی پناہ گاہ ہے جہاں ہر سانس میں رازِ ھُو گونجتا ہے۔“
            </p>
            <p className="text-ivory/30 max-w-xl mx-auto text-base font-light italic font-serif mt-3">
              "The heart is a sanctuary where the secret of Hoo resonates through every breath."
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          {/* Side Navigation - Illuminated Scroll Index */}
          <div className="lg:col-span-4 space-y-8 max-h-[70vh] overflow-y-auto pr-6 scrollbar-hide">
            {ABYAAT.map((verse) => (
              <motion.button
                key={verse.id}
                whileHover={{ x: 10 }}
                onClick={() => setActiveVerse(verse)}
                className={cn(
                  "w-full text-left p-12 rounded-[50px] border transition-all duration-700 relative overflow-hidden group",
                  activeVerse.id === verse.id 
                    ? "bg-white/[0.03] border-gold-antique/40 shadow-[0_0_50px_rgba(180,162,105,0.1)]" 
                    : "bg-white/[0.01] border-white/5 text-ivory/40 hover:border-gold-antique/20"
                )}
              >
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[9px] uppercase tracking-[0.4em] text-gold-antique/50">رسالہ {verse.id} · Scroll {verse.id}</span>
                  {activeVerse.id === verse.id && <Sparkles size={12} className="text-gold-antique animate-pulse" />}
                </div>
                <h3 className="font-serif italic text-2xl mb-4 leading-relaxed group-hover:text-gold-antique transition-colors">{verse.punjabi}</h3>
                <div className="flex items-center space-x-4 opacity-40 group-hover:opacity-100 transition-opacity">
                  <div className="w-8 h-[1px] bg-gold-antique/30" />
                  <span className="text-[9px] uppercase tracking-[0.2em]">{verse.theme}</span>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Experience Portal */}
          <div className="lg:col-span-8 sticky top-40">
            <motion.div 
               layoutId="experience-box"
               className="glass rounded-[80px] p-16 md:p-32 border-gold-antique/10 bg-sacred-black/40 relative overflow-hidden group"
            >
              {/* Decorative Arch */}
              <div className="absolute inset-0 border-[20px] border-white/[0.01] pointer-events-none rounded-[inherit]" />
              
              <div className="absolute top-12 left-1/2 -translate-x-1/2 flex items-center space-x-6 glass rounded-full p-2 border-white/10 z-20">
                {(["punjabi", "urdu", "english"] as const).map((m) => {
                  const labels: Record<string, string> = { punjabi: "پنجابی", urdu: "اردو", english: "انگریزی" };
                  return (
                  <button
                    key={m}
                    onClick={() => setMode(m)}
                    className={cn(
                      "px-6 py-2 rounded-full transition-all flex flex-col items-center leading-none",
                      mode === m ? "bg-gold-antique text-sacred-black" : "text-ivory/30 hover:text-ivory/60"
                    )}
                  >
                    <span className="font-nastaliq text-base" dir="rtl">{labels[m]}</span>
                    <span className="text-[8px] uppercase tracking-[0.3em] mt-0.5 opacity-70">{m}</span>
                  </button>
                )})}
              </div>

              <div className="min-h-[400px] flex flex-col items-center justify-center text-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeVerse.id + mode}
                    initial={{ opacity: 0, scale: 0.98, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 1.02, y: -20 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="max-w-3xl"
                  >
                    <h2 className={cn(
                      "text-4xl md:text-7xl font-serif italic mb-16 leading-relaxed gold-gradient drop-shadow-[0_0_20px_rgba(180,162,105,0.2)]",
                      mode === "urdu" ? "leading-loose font-medium" : ""
                    )}>
                      "{activeVerse[mode]}"
                    </h2>
                    
                    {mode !== "english" && (
                      <p className="text-ivory/40 text-xl md:text-2xl font-light italic font-serif leading-relaxed max-w-2xl mx-auto">
                        "{activeVerse.english}"
                      </p>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-20 flex items-center justify-between border-t border-white/5 pt-12">
                <div className="flex items-center space-x-8 group/player cursor-pointer" onClick={() => setIsPlaying(!isPlaying)}>
                  <div className="w-20 h-20 rounded-full glass flex items-center justify-center border-gold-antique/20 group-hover/player:border-gold-antique transition-all duration-700 relative overflow-hidden">
                    <div className={cn(
                      "absolute inset-0 bg-gold-antique/5 transition-opacity",
                      isPlaying ? "opacity-100" : "opacity-0"
                    )} />
                    {isPlaying ? <Pause fill="currentColor" className="relative z-10 text-gold-antique" /> : <Play fill="currentColor" className="ml-1 relative z-10 text-gold-antique" />}
                  </div>
                  <div>
                    <p className="font-nastaliq text-sm text-gold-antique mb-0.5" dir="rtl">آسمانی تلاوت</p>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-gold-antique/70 font-bold mb-1">Celestial Recitation</p>
                    <p className="text-xs text-ivory/20 group-hover/player:text-ivory/40 transition-colors">حضرت سلطان احمد علی (رحمہ اللہ)</p>
                  </div>
                </div>

                <div className="flex space-x-10 mt-4 md:mt-0">
                   <button className="text-ivory/20 hover:text-gold-antique transition-colors"><Languages size={24} /></button>
                   <button className="text-ivory/20 hover:text-gold-antique transition-colors"><Search size={24} /></button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
