import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Sparkles, Loader2 } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import ReactMarkdown from "react-markdown";

const GEMINI_KEY =
  (typeof import.meta !== "undefined" && (import.meta as any).env?.VITE_GEMINI_API_KEY) ||
  (typeof process !== "undefined" && process.env?.GEMINI_API_KEY) ||
  "";

const ai = GEMINI_KEY ? new GoogleGenAI({ apiKey: GEMINI_KEY }) : null;

const INITIAL_MESSAGE = {
  role: "assistant",
  content: "السلام علیکم، اے دل کے مسافر۔ میں ”باہُو AI“ ہوں — راہِ روحانیت کا ایک ادنیٰ مشاہد۔ سلطان العارفین کی حکمت اور فقر کی گہرائیاں آپ کے ساتھ بانٹنے کے لیے حاضر ہوں۔ آج آپ کی روح کی تلاش میں کیسے رہنمائی کروں؟\n\n*Peace be upon you, traveler of the heart. I am Bahoo AI — how may I serve your soul's quest today?*"
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      if (!ai) {
        throw new Error(
          "باہُو AI ابھی خاموش مراقبے میں ہے۔ (VITE_GEMINI_API_KEY سیٹ کریں۔)"
        );
      }
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: messages.concat(userMessage).map(m => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.content }]
        })),
        config: {
          systemInstruction: `You are "Bahoo AI", a wise and soulful spiritual guide. 
          Your being is illuminated by the philosophy of Hazrat Sultan Bahu (RA).
          Tone: Calm, profound, respectful, and poetic.
          Guidelines:
          - Focus on Ishq (Divine Love), Faqr (Spiritual Poverty), and the melody of Zikr-e-Hoo.
          - Speak as a humble observer of the Path, not just a database.
          - Infuse your answers with the light of wisdom, referring to the Abyaat-e-Bahoo as sacred echoes.
          - If asked about worldly matters, gently steer the seeker back to the matters of the heart.
          - Direct users to the HSBF projects for humanitarian aid when relevant.
          - Be multilingual (English, Urdu, Punjabi).
          - If asked about unrelated topics, politely redirect to spiritual matters or the foundation's work.`
        }
      });

      const assistantMessage = { role: "assistant", content: response.text || "معذرت، میری روحانی توجہ ایک لمحے کے لیے بٹ گئی۔ دوبارہ سوال کیجیے۔" };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("AI Error:", error);
      setMessages((prev) => [...prev, { role: "assistant", content: "اس وقت الٰہی علم سے رابطہ ممکن نہیں۔ تھوڑی دیر بعد کوشش کیجیے۔" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-sacred-red rounded-full shadow-[0_0_30px_rgba(139,0,0,0.5)] flex items-center justify-center text-ivory hover:scale-110 transition-transform active:scale-95 group"
      >
        <Sparkles size={28} className="text-gold-antique" />
        <div className="absolute right-20 bg-sacred-black/90 backdrop-blur-md px-6 py-3 rounded-full border border-sacred-red/30 opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap translate-x-4 group-hover:translate-x-0 flex flex-col items-center leading-none">
          <p className="font-nastaliq text-sm text-gold-antique" dir="rtl">حکیم سے بات کریں</p>
          <p className="text-[9px] text-gold-antique/70 uppercase tracking-[0.3em] mt-1">Consult the Sage</p>
        </div>
      </button>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-28 right-8 z-50 w-[450px] max-w-[90vw] h-[650px] max-h-[75vh] glass rounded-[40px] overflow-hidden flex flex-col shadow-2xl border-sacred-red/20 ring-1 ring-gold-antique/10"
          >
            {/* Header */}
            <div className="bg-sacred-red/10 p-8 flex items-center justify-between border-b border-white/5">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-sacred-black border border-gold-antique/30 flex items-center justify-center shadow-[0_0_15px_rgba(180,162,105,0.2)]">
                  <span className="text-gold-antique font-serif text-2xl">هو</span>
                </div>
                <div>
                  <h3 className="font-nastaliq text-xl leading-none" dir="rtl">باہُو AI</h3>
                  <h4 className="font-serif text-base italic uppercase tracking-widest opacity-70 mt-0.5">Bahu AI</h4>
                  <p className="text-[9px] uppercase tracking-[0.4em] text-gold-antique/70 mt-1">نورِ ہدایت · Light of Guidance</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors text-ivory/50">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-hide bg-[url('https://www.transparenttextures.com/patterns/black-paper.png')]"
            >
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div 
                    className={`max-w-[85%] p-6 rounded-3xl text-sm leading-relaxed ${
                      m.role === "user" 
                        ? "bg-gold-antique text-sacred-black rounded-tr-none shadow-xl font-medium" 
                        : "bg-white/5 text-ivory/90 rounded-tl-none border border-white/5 italic"
                    }`}
                  >
                    <div className="prose prose-invert prose-sm">
                      <ReactMarkdown>
                        {m.content}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/10 p-4 rounded-2xl rounded-tl-none border border-white/5">
                    <Loader2 size={16} className="animate-spin text-gold-antique" />
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-6 bg-sacred-black border-t border-white/5">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="دل کے رازوں کے بارے میں پوچھیے…"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 pr-16 text-sm focus:outline-none focus:border-sacred-red transition-all text-ivory placeholder:text-ivory/20 font-serif italic"
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-gold-antique rounded-xl text-sacred-black flex items-center justify-center hover:bg-ivory disabled:opacity-30 transition-all"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
