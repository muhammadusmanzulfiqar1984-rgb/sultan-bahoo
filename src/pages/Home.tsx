import { motion } from "motion/react";
import { Hero } from "../components/Hero";
import { Heart, BookOpen, Users, ShieldCheck, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <div className="bg-sacred-black selection:bg-gold-antique selection:text-sacred-black">
      <Hero />

      {/* The Threshold - Philosophy Reveal */}
      <section className="py-40 px-6 overflow-hidden relative">
        {/* Shrine backdrop */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-0 pointer-events-none"
        >
          <img
            src="/shrine.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-[0.15]"
            style={{ filter: "brightness(0.95) contrast(1.1) saturate(0.9) sepia(0.18)" }}
          />
          {/* Vignette + edge fades so it blends with the dark page */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(16,12,8,0.35) 0%, rgba(16,12,8,0.85) 75%, #100c08 100%)",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-sacred-black to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-sacred-black to-transparent" />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-sacred-red/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-32 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[80px] group">
              <video
                src="/allah-ho.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
                className="w-full h-full object-cover brightness-90 group-hover:scale-110 transition-transform duration-[3s]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sacred-black via-transparent to-transparent" />
              <div className="absolute bottom-12 left-12">
                <span className="font-nastaliq text-gold-antique text-5xl mb-1 block leading-none" dir="rtl">عشق</span>
                <span className="text-gold-antique/80 font-serif italic text-xl mb-2 block">Ishq</span>
                <span className="text-ivory/40 uppercase text-[10px] tracking-[0.4em]">The Fire of Love</span>
              </div>
            </div>
            {/* Architectural motif overlay */}
            <div className="absolute -top-12 -right-12 w-48 h-48 border border-white/5 rounded-full flex items-center justify-center animate-pulse-slow">
              <div className="w-40 h-40 border border-gold-antique/10 rounded-full" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, delay: 0.2 }}
          >
            <span className="text-gold-antique uppercase text-[10px] tracking-[0.6em] font-bold mb-6 block">جوہرِ راہ · The Essence of Path</span>
            <h2 className="font-nastaliq text-5xl md:text-7xl mb-4 text-ivory leading-[1.4]" dir="rtl">
              فنا فِی المحبوب
            </h2>
            <h3 className="text-2xl md:text-3xl font-serif italic gold-gradient mb-10">Annihilation into the Beloved</h3>
            <div className="space-y-6 text-ivory/60 leading-[2] text-lg font-nastaliq" dir="rtl">
              <p>
                ”راہِ فقر میں داخل ہونا اپنے آپ کو ذاتِ مطلق میں گم کر دینا ہے۔ یہ ذہن کا مذہب نہیں، بلکہ دل کا سفر ہے ابدی سرچشمے کی طرف۔“
              </p>
              <p>
                حضرت سلطان باہُو (رحمۃ اللہ علیہ) فرماتے ہیں کہ اصل دولت ہاتھوں میں نہیں، بلکہ اُس دل میں ہے جو ”ھُو“ کے مسلسل ذکر سے روشن ہو۔
              </p>
            </div>
            <div className="mt-16">
              <Link to="/about" className="inline-flex items-center space-x-6 text-ivory group overflow-hidden">
                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-gold-antique transition-all duration-500">
                  <div className="w-0 h-0 group-hover:w-2 group-hover:h-2 bg-gold-antique rounded-full transition-all" />
                </div>
                <span className="flex flex-col leading-none">
                  <span className="font-nastaliq text-base" dir="rtl">سلطان العارفین کو جانیے</span>
                  <span className="uppercase text-[9px] tracking-[0.4em] mt-1 opacity-70">Discover the Sage</span>
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Divine Echoes - Kalam Experience */}
      <section className="relative py-40 bg-white/[0.01] border-y border-white/[0.03] overflow-hidden">
        {/* Faded shrine watermark + giant ھُو calligraphy */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <img
            src="/shrine.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-[0.08]"
            style={{ filter: "brightness(1.1) contrast(1.05) saturate(0.85) sepia(0.2)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(16,12,8,0.25) 0%, rgba(16,12,8,0.85) 80%, #100c08 100%)",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-sacred-black to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-sacred-black to-transparent" />
          {/* Giant Nastaliq watermark on the left */}
          <span
            className="font-nastaliq absolute -left-8 top-1/2 -translate-y-1/2 leading-none gold-shimmer-text select-none"
            style={{
              fontSize: "clamp(14rem, 26vw, 28rem)",
              opacity: 0.06,
              direction: "rtl",
              filter: "blur(0.5px)",
            }}
          >
            کلام
          </span>
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
            <div className="max-w-2xl">
              <span className="text-gold-antique uppercase text-[10px] tracking-[0.6em] mb-4 block">آوازِ روح · The Voice of Soul</span>
              <h2 className="font-nastaliq text-5xl md:text-7xl text-ivory leading-[1.4]" dir="rtl">دروازۂ کلام</h2>
              <h3 className="text-2xl md:text-3xl font-serif italic gold-gradient mt-2">Portal of Kalam</h3>
            </div>
            <Link to="/kalam" className="px-10 py-4 glass rounded-full hover:border-gold-antique transition-all shadow-xl text-center">
              <span className="font-nastaliq text-base block leading-none" dir="rtl">آرکائیو دیکھیں</span>
              <span className="text-[9px] uppercase tracking-[0.4em] mt-1 block opacity-70">Explore Archive</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {[
              { 
                text: "Dil darya samundron dhoonge, kaun dilaan di jaane Hoo.", 
                translation: "The heart is deeper than the ocean, who can fathom its depths?",
                bg: "https://images.unsplash.com/photo-1512632578888-169bbbc64f33?auto=format&fit=crop&q=80&w=1000"
              },
              { 
                text: "Alif Allah chambe di booti, murshid mann vich laai Hoo.", 
                translation: "The jasmine of God's Name has been planted in my soul.",
                bg: "https://images.unsplash.com/photo-1542640244-7e672d6cef21?auto=format&fit=crop&q=80&w=1000"
              }
            ].map((kalam, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -15 }}
                className="relative p-16 rounded-[60px] overflow-hidden border border-white/5 cursor-pointer group"
              >
                <div className="absolute inset-0 z-0">
                  <img src={kalam.bg} className="w-full h-full object-cover opacity-20 grayscale group-hover:scale-110 transition-transform duration-[2s]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-sacred-black via-sacred-black/60 to-transparent" />
                </div>
                
                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-full glass flex items-center justify-center mb-10 group-hover:border-gold-antique/50 transition-colors">
                    <PlayCircle size={32} className="text-gold-antique" />
                  </div>
                  <p className="text-3xl md:text-4xl font-serif italic mb-8 leading-relaxed text-ivory/90 group-hover:text-gold-antique transition-colors">"{kalam.text}"</p>
                  <div className="h-[1px] w-12 bg-gold-antique/20 mb-8 group-hover:w-24 transition-all duration-700" />
                  <p className="text-sm text-ivory/30 italic uppercase tracking-[0.2em] font-light max-w-sm">{kalam.translation}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Sacred Archive - Library */}
      <section className="py-40 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/pinstriped-suit.png')] opacity-20 pointer-events-none" />

        {/* Drifting gold dust motes */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${(i * 137) % 100}%`,
                bottom: `-${10 + (i * 7) % 30}%`,
                width: `${2 + (i % 3)}px`,
                height: `${2 + (i % 3)}px`,
                background:
                  "radial-gradient(circle, rgba(240,223,176,0.7) 0%, rgba(212,190,134,0.3) 50%, transparent 100%)",
                boxShadow: "0 0 5px rgba(240,223,176,0.45)",
                animation: `dust-rise ${22 + (i % 8) * 2}s linear ${(i * 0.7) % 6}s infinite`,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center mb-32">
          <span className="text-gold-antique uppercase text-[10px] tracking-[0.6em] mb-6 block">میراثِ محفوظ · Legacy Preserved</span>
          <h2 className="font-nastaliq text-6xl md:text-8xl mb-4 gold-gradient leading-[1.4]" dir="rtl">قدیمی کتب خانہ</h2>
          <h3 className="text-3xl md:text-4xl font-serif italic gold-gradient mb-10">Archives of Antiquity</h3>
          <p className="font-nastaliq text-ivory/60 max-w-2xl mx-auto leading-[2] text-base" dir="rtl">
            ایک مکمل ڈیجیٹل آستانہ جو ۱۴۰ سے زائد کتبِ تصوف، کیمیائے قلب اور راہِ بازگشت کو محفوظ رکھتا ہے۔
          </p>
          <p className="text-ivory/30 max-w-xl mx-auto font-light italic font-serif mt-3 text-sm">
            A digital sanctum preserving 140+ manuscripts on the science of Sufism.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-16 max-w-6xl mx-auto">
          {[
            { title: "Ain-ul-Faqr", urdu: "عین الفقر", tag: "The Masterpiece", urduTag: "شاہکار", icon: "👁️", image: "/ain-ul-faqr.jpg" },
            { title: "Risala Roohi", urdu: "رسالہ روحی شریف", tag: "Celestial Soul", urduTag: "روحِ آسمانی", icon: "✨", image: "/Rasala%20roohi.png" },
            { title: "Kaleed-ul-Tauheed", urdu: "کلید التوحید", tag: "Key to Oneness", urduTag: "کلیدِ توحید", icon: "🗝️", image: "/Kaleed%20ul%20Tauheed.png" }
          ].map((book, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group cursor-pointer flex flex-col items-center"
            >
              {book.image ? (
                /* === Real book cover — flat, natural, with subtle spine & page edge === */
                <div className="relative w-[88%] aspect-[3/4.3]">
                  {/* Soft floor shadow */}
                  <div
                    className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-[80%] h-6 rounded-[50%] blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-700"
                    style={{
                      background:
                        "radial-gradient(ellipse, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 70%)",
                    }}
                  />

                  {/* Page edge peeking on the right */}
                  <div
                    className="absolute top-[1%] -right-[3px] h-[98%] w-[6px] rounded-r-sm"
                    style={{
                      background:
                        "repeating-linear-gradient(90deg, #d8c79a 0px, #ede0b8 1px, #b8a472 2px)",
                      boxShadow: "1px 0 3px rgba(0,0,0,0.5)",
                    }}
                  />
                  {/* Page edge peeking at bottom */}
                  <div
                    className="absolute -bottom-[3px] left-[1%] w-[98%] h-[5px] rounded-b-sm"
                    style={{
                      background:
                        "repeating-linear-gradient(180deg, #d8c79a 0px, #ede0b8 1px, #b8a472 2px)",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.5)",
                    }}
                  />

                  {/* The cover */}
                  <div
                    className="relative w-full h-full overflow-hidden rounded-[3px] transition-transform duration-[1200ms] ease-out group-hover:scale-[1.025]"
                    style={{
                      boxShadow:
                        "0 35px 70px -25px rgba(0,0,0,0.9), 0 18px 30px -12px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(217,200,154,0.12)",
                    }}
                  >
                    <img
                      src={book.image}
                      alt={book.title}
                      loading="lazy"
                      className="block w-full h-full object-cover"
                      style={{ filter: "brightness(1.15) contrast(1.05) saturate(1.04)" }}
                    />
                    {/* Inner spine shadow on the left binding */}
                    <div
                      className="absolute inset-y-0 left-0 w-[10%] pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(90deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.12) 60%, transparent 100%)",
                      }}
                    />
                    {/* Subtle top sheen */}
                    <div
                      className="absolute inset-x-0 top-0 h-[40%] pointer-events-none opacity-40"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255,240,210,0.10), transparent)",
                      }}
                    />
                    {/* Hover gold sheen sweep */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(115deg, transparent 38%, rgba(255,240,200,0.16) 50%, transparent 62%)",
                        animation: "shimmer-sweep 9s ease-in-out infinite",
                      }}
                    />
                  </div>
                </div>
              ) : (
                /* === Placeholder card for other books === */
                <div className="relative w-[88%] aspect-[3/4.3] glass rounded-[3px] p-10 flex flex-col justify-between interactive-card overflow-hidden">
                  <span className="text-[9px] uppercase tracking-[0.3em] text-gold-antique self-start px-4 py-1.5 border border-gold-antique/20 rounded-full bg-gold-antique/5">
                    {book.tag}
                  </span>
                  <span className="text-2xl grayscale opacity-30 group-hover:grayscale-0 group-hover:opacity-100 transition-all self-end">
                    {book.icon}
                  </span>
                </div>
              )}

              {/* Caption beneath the book */}
              <div className="mt-10 text-center">
                <div className="font-nastaliq text-[13px] text-ivory/50 mb-1" dir="rtl">
                  {book.urduTag}
                </div>
                <div className="text-[9px] uppercase tracking-[0.5em] text-ivory/25 mb-3 font-light">
                  {book.tag}
                </div>
                <h3 className="font-nastaliq text-2xl gold-gradient leading-tight" dir="rtl">
                  {book.urdu}
                </h3>
                <h4
                  className="font-serif italic text-base md:text-lg text-ivory/60 mt-1"
                  style={{ fontWeight: 300, letterSpacing: "0.04em" }}
                >
                  {book.title}
                </h4>
                <div className="mt-5 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="w-8 h-px bg-gold-antique/40" />
                  <span className="font-nastaliq text-[12px] text-gold-antique/80" dir="rtl">
                    کتاب کھولیں
                  </span>
                  <div className="w-8 h-px bg-gold-antique/40" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Faqr in Service - Foundation */}
      <section className="py-40 px-6 max-w-7xl mx-auto border-t border-white/[0.03]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div>
            <span className="text-sacred-red uppercase text-[10px] tracking-[0.6em] font-bold mb-6 block">تجلّی · The Manifestation</span>
            <h2 className="font-nastaliq text-5xl md:text-7xl mb-3 text-ivory leading-[1.4]" dir="rtl">فقر بصورتِ خدمت</h2>
            <h3 className="text-2xl md:text-3xl font-serif italic mb-10 text-ivory/80">Faqr in Service</h3>
            <p className="font-nastaliq text-ivory/60 text-lg leading-[2] mb-12" dir="rtl">
              ”خدمتِ خلق کے بغیر روحانی ترقی کھوکھلی ہے۔ ہماری انسانیت کی خدمت ہاتھوں کی نماز ہے۔“
            </p>
            
            <div className="grid grid-cols-2 gap-12">
              {[
                { label: "Education", urdu: "تعلیم", icon: <BookOpen size={20} />, val: "12k+" },
                { label: "Nourishment", urdu: "غذائے روح", icon: <Heart size={20} />, val: "1M+" }
              ].map((p, i) => (
                <div key={i} className="group">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="text-gold-antique/30 group-hover:text-gold-antique transition-colors">{p.icon}</div>
                    <div className="text-3xl font-serif text-ivory">{p.val}</div>
                  </div>
                  <div className="font-nastaliq text-[13px] text-ivory/50 group-hover:text-ivory/70 transition-colors" dir="rtl">{p.urdu}</div>
                  <div className="text-[9px] uppercase tracking-[0.4em] text-ivory/20 group-hover:text-ivory/40 transition-colors mt-0.5">{p.label}</div>
                </div>
              ))}
            </div>
            
            <div className="mt-16">
              <Link to="/projects" className="text-gold-antique hover:text-ivory transition-colors flex items-center space-x-6">
                <span className="flex flex-col leading-none">
                  <span className="font-nastaliq text-base" dir="rtl">عالمی خدمات دیکھیں</span>
                  <span className="text-[9px] uppercase tracking-[0.5em] mt-1 opacity-70">View Global Impact</span>
                </span>
                <div className="w-16 h-[1px] bg-gold-antique/20" />
              </Link>
            </div>
          </div>
          
          <div className="relative">
             <div className="aspect-video glass rounded-[50px] overflow-hidden border border-sacred-red/10 group cursor-pointer">
                <video
                  src="/shrine.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  aria-hidden="true"
                  className="w-full h-full object-cover brightness-95 contrast-105 group-hover:scale-105 transition-transform duration-[2s]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sacred-black/60 via-transparent to-transparent pointer-events-none" />
             </div>
             {/* Decorative geometry */}
             <div className="absolute -bottom-10 -left-10 w-40 h-40 border border-sacred-red/10 rounded-[30%] rotate-45 pointer-events-none" />
             <div className="absolute -top-10 -right-10 w-60 h-60 border border-gold-antique/5 rounded-full pointer-events-none" />
          </div>
        </div>
      </section>

      {/* The Seeker's Interaction - AI Prompt */}
      <section className="relative py-40 px-6 overflow-hidden">
        {/* Shrine video backdrop */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <video
            src="/shrine.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="absolute inset-0 w-full h-full object-cover opacity-[0.32]"
            style={{ filter: "brightness(1.0) contrast(1.05) saturate(0.9) sepia(0.18)" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(16,12,8,0.20) 0%, rgba(16,12,8,0.65) 75%, rgba(16,12,8,0.9) 100%)",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-sacred-black to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-sacred-black to-transparent" />
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto rounded-[60px] p-16 md:p-32 text-center overflow-hidden relative bg-sacred-black/15 backdrop-blur-[2px] border border-gold-antique/10 ring-1 ring-white/5"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sacred-red/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gold-antique/5 blur-[100px] pointer-events-none" />
          
          <span className="text-gold-antique uppercase text-[10px] tracking-[0.8em] mb-10 block font-bold">صدا · The Oracle</span>
          <h2 className="font-nastaliq text-6xl md:text-8xl mb-4 text-ivory leading-[1.4]" dir="rtl">طالبِ حق؟</h2>
          <h3 className="text-3xl md:text-4xl font-serif italic gold-gradient mb-12">Seeker of Truth?</h3>
          <p className="font-nastaliq text-xl text-ivory/65 mb-4 leading-[2] max-w-2xl mx-auto" dir="rtl">
            ”دل سمندر سے بھی گہرا ہے۔۔۔ ۴۰۰ سال کی حکمت سے روشن ہمارے روحانی رہنما کے ساتھ اُس کے راز کھولیے۔“
          </p>
          <p className="text-base text-ivory/35 mb-16 font-serif italic max-w-xl mx-auto">
            Uncover the heart's secrets with our spiritual guide informed by 400 years of wisdom.
          </p>
          <button 
             onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
             className="px-16 py-6 bg-gold-antique text-sacred-black rounded-full hover:bg-ivory transition-all shadow-[0_0_50px_rgba(180,162,105,0.3)] hover:scale-105 active:scale-95"
          >
            <span className="font-nastaliq text-lg block leading-none" dir="rtl">باہُو AI سے بات کریں</span>
            <span className="font-bold uppercase tracking-[0.4em] text-[10px] mt-1 block">Invoke Bahu AI</span>
          </button>
        </motion.div>
      </section>

      {/* Final Call - Support — cinematic backdrop */}
      <section className="relative py-48 px-6 border-t border-white/[0.03] text-center overflow-hidden">
        {/* Layer 1: faded shrine photo */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
          <img
            src="/shrine.jpg"
            alt=""
            className="absolute inset-0 w-full h-full object-cover opacity-[0.32]"
            style={{ filter: "brightness(1.1) contrast(1.05) saturate(0.95) sepia(0.18)" }}
          />
          {/* Soft vignette + edge fades */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(16,12,8,0.15) 0%, rgba(16,12,8,0.55) 78%, rgba(16,12,8,0.85) 100%)",
            }}
          />
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-sacred-black to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-sacred-black to-transparent" />
        </div>

        {/* Layer 2: giant ھُو watermark calligraphy on the right */}
        <div
          aria-hidden="true"
          className="absolute -right-12 md:-right-20 top-1/2 -translate-y-1/2 pointer-events-none select-none"
        >
          <span
            className="font-nastaliq block leading-none gold-shimmer-text"
            style={{
              fontSize: "clamp(18rem, 32vw, 36rem)",
              opacity: 0.18,
              direction: "rtl",
              filter: "blur(0.5px)",
            }}
          >
            ھُو
          </span>
        </div>

        {/* Layer 3: drifting gold dust particles */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
          {Array.from({ length: 24 }).map((_, i) => (
            <span
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${(i * 137) % 100}%`,
                bottom: `-${10 + (i * 7) % 30}%`,
                width: `${2 + (i % 4)}px`,
                height: `${2 + (i % 4)}px`,
                background:
                  "radial-gradient(circle, rgba(240,223,176,0.85) 0%, rgba(212,190,134,0.4) 50%, transparent 100%)",
                boxShadow: "0 0 6px rgba(240,223,176,0.5)",
                animation: `dust-rise ${18 + (i % 8) * 2}s linear ${(i * 0.7) % 6}s infinite`,
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-nastaliq text-4xl md:text-6xl mb-3 text-ivory leading-[1.4]" dir="rtl">حلقۂ رحمت</h2>
          <h3 className="text-xl md:text-2xl font-serif italic gold-gradient mb-8">Circle of Mercy</h3>
          <p className="font-nastaliq text-ivory/65 mb-2 text-lg leading-[2]" dir="rtl">”جو پیاسوں کی خدمت کرتا ہے، وہ سمندر پا لیتا ہے۔“</p>
          <p className="text-ivory/35 mb-12 italic font-serif text-sm">"One who serves the thirsty, finds the ocean."</p>
          <Link to="/donate" className="inline-flex flex-col items-center text-sacred-red hover:text-gold-antique transition-colors border-b border-sacred-red/20 pb-2">
            <span className="font-nastaliq text-lg leading-none" dir="rtl">مشن کا ساتھ دیں</span>
            <span className="text-[9px] uppercase tracking-[0.6em] font-bold mt-1 opacity-80">Support the Mission</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
