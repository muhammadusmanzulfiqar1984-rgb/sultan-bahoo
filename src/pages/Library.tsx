import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Download, Book as BookIcon, Filter, ExternalLink } from "lucide-react";
import { Book } from "../types";
import { SacredAtmosphere } from "../components/SacredAtmosphere";
import { ScrollProgressOrnament } from "../components/ScrollProgressOrnament";

const BOOKS: Book[] = [
  {
    id: "1",
    title: "Risala Roohi Sharif",
    description: "The celestial message of the Soul, unveiling deep spiritual secrets.",
    language: "Urdu",
    pdfUrl: "#",
    coverImage: "/Rasala%20roohi.png"
  },
  {
    id: "2",
    title: "Ain-ul-Faqr",
    description: "The masterpiece on the path of Sufism and the reality of Faqr.",
    language: "Urdu",
    pdfUrl: "#",
    coverImage: "/ain-ul-faqr.jpg"
  },
  {
    id: "3",
    title: "Kaleed-ul-Tauheed",
    description: "The Key to Divine Oneness and the stages of spiritual ascent.",
    language: "Urdu",
    pdfUrl: "#",
    coverImage: "/Kaleed%20ul%20Tauheed.png"
  },
  {
    id: "4",
    title: "Mahak-ul-Faqr",
    description: "Criteria of Faqr and the spiritual status of a seeker.",
    language: "Punjabi",
    pdfUrl: "#",
    coverImage: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&q=80&w=400"
  },
  {
    id: "5",
    title: "Noor-ul-Huda",
    description: "The Light of Guidance for those wandering in search of Truth.",
    language: "English",
    pdfUrl: "#",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400"
  }
];

export function Library() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("All");

  const filteredBooks = BOOKS.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase()) || 
                         book.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === "All" || book.language === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen pt-40 pb-24 px-6 bg-sacred-black relative">
      <SacredAtmosphere tone="gold" />
      <ScrollProgressOrnament
        glyph="کِتاب"
        sections={[
          { urdu: "تلاش", label: "Search" },
          { urdu: "نسخے", label: "Manuscripts" },
          { urdu: "حاصل کریں", label: "Obtain" },
        ]}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-32 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gold-antique/5 rounded-full blur-[120px] -z-10" />
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5 }}
          >
            <span className="text-gold-antique uppercase text-[10px] tracking-[0.8em] mb-8 block font-bold">میراثِ مقدّس · Sacred Legacy</span>
            <h1 className="font-nastaliq text-6xl md:text-[7rem] mb-4 gold-gradient leading-[1.3]" dir="rtl">قدیم حکمت کے خزانے</h1>
            <h2 className="text-3xl md:text-5xl font-serif italic gold-gradient leading-none mb-12">Archives of Ancient Wisdom</h2>
            <p className="font-nastaliq text-ivory/60 max-w-2xl mx-auto text-lg leading-[2]" dir="rtl">
              ”علم بِغیرِ عشق صرف ایک بھاری بوجھ ہے۔ ۱۴۰ سے زائد قلمی نسخے دریافت کیجیے جو روح کی راہ روشن کرتے ہیں۔“
            </p>
            <p className="text-ivory/30 max-w-xl mx-auto text-base font-light italic font-serif mt-3">
              "Knowledge without Ishq is but a heavy burden. Explore 140+ manuscripts that illuminate the path of the soul."
            </p>
          </motion.div>
        </header>

        {/* Controls with cinematic glass effect */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-24 glass p-4 rounded-[40px] border-white/5">
          <div className="relative w-full md:w-[450px]">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gold-antique/40" size={20} />
            <input 
              type="text" 
              placeholder="کتاب یا قلمی نسخہ تلاش کریں…"
              className="w-full bg-sacred-black/40 border border-white/5 rounded-full py-5 px-16 text-sm focus:outline-none focus:border-gold-antique/50 transition-all placeholder:text-ivory/20"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-4 p-1.5 bg-sacred-black/40 rounded-full border border-white/5 overflow-x-auto scrollbar-hide">
            {[
              { v: "All", urdu: "سب" },
              { v: "English", urdu: "انگریزی" },
              { v: "Urdu", urdu: "اردو" },
              { v: "Punjabi", urdu: "پنجابی" }
            ].map((lang) => (
              <button
                key={lang.v}
                onClick={() => setFilter(lang.v)}
                className={`px-8 py-3 rounded-full transition-all shadow-xl flex flex-col items-center leading-none ${
                  filter === lang.v ? "bg-gold-antique text-sacred-black" : "text-ivory/30 hover:text-ivory/60"
                }`}
              >
                <span className="font-nastaliq text-base" dir="rtl">{lang.urdu}</span>
                <span className="text-[8px] uppercase tracking-[0.3em] mt-0.5 opacity-70">{lang.v}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Book Grid - Cinematic Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
          <AnimatePresence mode="popLayout">
            {filteredBooks.map((book, i) => (
              <motion.div
                key={book.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                className="group relative grid-runner glass rounded-[60px] overflow-hidden border border-white/5 transition-all duration-1000 interactive-card"
              >
                <div className="aspect-[3/4.5] overflow-hidden relative">
                  <img src={book.coverImage} alt={book.title} className="w-full h-full object-cover grayscale brightness-[0.4] group-hover:grayscale-0 group-hover:brightness-75 group-hover:scale-110 transition-all duration-[3s]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-sacred-black via-sacred-black/40 to-transparent" />
                  <div className="absolute top-8 right-8">
                    <span className="bg-sacred-red/10 backdrop-blur-3xl px-6 py-2 rounded-full text-[9px] uppercase tracking-[0.4em] font-bold border border-sacred-red/30 shadow-2xl">
                      {book.language}
                    </span>
                  </div>
                </div>
                
                <div className="p-12 -mt-20 relative z-10">
                  <div className="w-12 h-[1px] bg-gold-antique/30 mb-8 group-hover:w-24 transition-all duration-1000" />
                  <h3 className="text-4xl font-serif text-ivory mb-6 group-hover:text-gold-antique transition-colors leading-[1]">{book.title}</h3>
                  <p className="text-sm text-ivory/40 mb-10 line-clamp-3 italic font-light font-serif">{book.description}</p>
                  
                  <div className="flex items-center justify-between pt-10 border-t border-white/5">
                    <button className="flex items-center space-x-4 text-gold-antique group/btn overflow-hidden">
                      <div className="w-10 h-10 rounded-full border border-gold-antique/20 flex items-center justify-center group-hover/btn:bg-gold-antique group-hover/btn:text-sacred-black transition-all duration-700">
                         <Download size={16} />
                      </div>
                      <span className="text-[9px] uppercase tracking-[0.4em] font-bold translate-x-[-10px] group-hover/btn:translate-x-0 opacity-0 group-hover/btn:opacity-100 transition-all duration-700">حاصل کریں · Obtain</span>
                    </button>
                    <button className="text-ivory/20 hover:text-gold-antique transition-all hover:rotate-12">
                      <ExternalLink size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {filteredBooks.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-60"
          >
            <BookIcon size={80} className="mx-auto text-ivory/5 mb-10 animate-pulse-slow" />
            <p className="font-nastaliq text-ivory/40 text-lg mb-2" dir="rtl">آپ کے سوال کا کوئی نسخہ نہیں ملا</p>
            <p className="text-ivory/20 uppercase tracking-[0.4em] text-xs font-bold">The scribe has found no matches.</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
