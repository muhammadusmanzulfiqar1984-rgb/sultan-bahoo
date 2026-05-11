import { motion } from "motion/react";

export function About() {
  const timeline = [
    { year: "1630", urdu: "آنگہ، پنجاب میں ظہور۔ ایک روح جو رازِ ”ھُو“ آشکار کرنے آئی۔", event: "Manifestation in Anga, Punjab. A soul born to reveal the secrets of Hoo." },
    { year: "1650", urdu: "شدید مراقبے کا دور۔ جنگل کی تنہائی میں حضوریٔ ذات میں مکمل گم۔", event: "The era of intense meditation. Total absorption in the Divine presence." },
    { year: "1670", urdu: "تصنیفاتِ مقدّس کا زمانہ۔ نورِ فقر میں ۱۴۰ سے زائد رسالے قلمبند ہوئے۔", event: "The period of sacred authorship. Over 140 scrolls penned in the light of Faqr." },
    { year: "1691", urdu: "وصالِ حق۔ ایک ایسی میراث چھوڑ گئے جو صدیوں سے گونج رہی ہے۔", event: "The transition to the eternal realm, leaving a legacy that resonates through centuries." }
  ];

  return (
    <div className="pt-40 pb-24 px-6 bg-sacred-black min-h-screen relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sacred-red/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gold-antique/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <header className="mb-32 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.5 }}>
            <span className="text-sacred-red uppercase text-[10px] tracking-[0.8em] mb-8 block font-bold">عظیم تجلّی · The Great Manifestation</span>
            <h1 className="font-nastaliq text-7xl md:text-[9rem] mb-4 gold-gradient leading-[1.3]" dir="rtl">سلطان العارفین</h1>
            <h2 className="text-4xl md:text-6xl font-serif italic gold-gradient leading-[0.9] mb-12">Sultan-ul-Arifeen</h2>
            <p className="font-nastaliq text-ivory/60 max-w-3xl mx-auto text-xl leading-[2]" dir="rtl">
              ”حضرت سلطان باہُو (رحمہ اللہ) محض ایک صوفی نہیں تھے؛ وہ صدیوں پہلے نورِ الٰہی کے معمار تھے۔“
            </p>
            <p className="text-ivory/30 max-w-2xl mx-auto text-base font-light italic font-serif leading-relaxed mt-3">
              "Not merely a mystic — the architect of divine love centuries before the world knew light."
            </p>
          </motion.div>
        </header>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center mb-64">
           <motion.div
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="space-y-12"
           >
              <div className="flex items-center space-x-6">
                 <div className="w-12 h-[1px] bg-gold-antique/30" />
                 <span className="text-gold-antique uppercase text-[10px] tracking-[0.4em] font-bold">جوہر · The Essence</span>
              </div>
              <p className="font-nastaliq text-3xl md:text-5xl text-ivory leading-[1.7]" dir="rtl">
                ایک زندگی جو ”<span className="text-sacred-red">ھُو</span>“ کے سمندر میں خودی کی فنا سے عبارت ہے۔
              </p>
              <p className="text-xl md:text-2xl font-serif italic text-ivory/50 leading-tight">
                A life defined by the annihilation of self in the ocean of <span className="text-sacred-red">Hoo</span>.
              </p>
              <div className="space-y-6 text-ivory/55 font-nastaliq text-lg leading-[2] pr-12 border-r border-sacred-red/20" dir="rtl">
                <p>اعوان کے شریف خاندان میں پیدا ہوئے؛ ان کا نام ہی ایک پیشین گوئی تھا۔ ”باہُو“ — وہ جو اللہ کے ساتھ ہے۔</p>
                <p>ان کی تعلیمات ذکرِ ھُو، راہِ فقر اور مرشد کامل کے گرد گردش کرتی ہیں۔</p>
              </div>
              <div className="space-y-4 text-ivory/30 font-serif italic text-base leading-relaxed pl-12 border-l border-sacred-red/10">
                <p>Born into the noble Awan family, his name was a prophecy — 'Bahu', one who exists with Allah.</p>
                <p>His teachings center on Zikr-e-Hoo, the path of Faqr and the Murshid Kamil.</p>
              </div>
           </motion.div>

           <motion.div
             initial={{ opacity: 0, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             className="relative group focus-within:outline-none"
           >
              <div className="aspect-[4/5] rounded-[80px] overflow-hidden border border-white/5 relative group-hover:border-gold-antique/20 transition-all duration-1000">
                <img 
                  src="https://images.unsplash.com/photo-1519817650390-64a93db51149?auto=format&fit=crop&q=80&w=1000" 
                  className="w-full h-full object-cover grayscale brightness-50 group-hover:scale-110 transition-transform duration-[4s]"
                  alt="Sacred Architecture"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sacred-black via-transparent to-transparent opacity-60" />
              </div>
              <div className="absolute -bottom-12 -right-12 text-[15rem] leading-none text-gold-antique/5 font-serif select-none">هو</div>
           </motion.div>
        </section>

        {/* Cinematic Timeline */}
        <section className="mb-64">
           <div className="text-center mb-32">
             <span className="text-ivory/20 uppercase text-[9px] tracking-[0.8em] mb-4 block">سفرِ آسمانی · Celestial Journey</span>
             <h2 className="font-nastaliq text-5xl md:text-6xl gold-gradient leading-[1.4]" dir="rtl">نقوشِ نور</h2>
             <h3 className="text-2xl md:text-3xl font-serif italic gold-gradient mt-2">Footprints of Light</h3>
           </div>

           <div className="relative max-w-5xl mx-auto">
              <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-gold-antique/20 to-transparent -translate-x-1/2 hidden md:block" />
              
              <div className="space-y-40">
                {timeline.map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={cn(
                      "flex flex-col md:flex-row items-center justify-between gap-12 text-center md:text-left",
                      i % 2 === 0 ? "md:flex-row-reverse md:text-right" : ""
                    )}
                  >
                    <div className="md:w-1/2">
                       <span className="text-7xl md:text-9xl font-serif text-gold-antique/20 group-hover:text-gold-antique/40 transition-colors leading-none">{item.year}</span>
                    </div>
                    <div className="md:w-1/2 group">
                       <div className="glass p-12 rounded-[50px] border-white/5 group-hover:border-gold-antique/20 transition-all duration-700">
                          <p className="font-nastaliq text-lg text-ivory/65 leading-[2] group-hover:text-ivory transition-colors mb-3" dir="rtl">”{item.urdu}“</p>
                          <p className="text-sm text-ivory/30 italic font-serif leading-relaxed">"{item.event}"</p>
                       </div>
                    </div>
                  </motion.div>
                ))}
              </div>
           </div>
        </section>

        {/* Sacred Lineage */}
        <section className="py-40 relative">
          <div className="absolute inset-0 bg-sacred-red/[0.02] blur-[100px] pointer-events-none" />
          <div className="text-center relative z-10">
            <h2 className="font-nastaliq text-5xl md:text-6xl gold-gradient leading-[1.4]" dir="rtl">سلسلۂ زرّیں</h2>
            <h3 className="text-2xl md:text-3xl font-serif italic gold-gradient mt-2 mb-12">The Golden Chain</h3>
            <p className="font-nastaliq text-ivory/55 max-w-2xl mx-auto mb-2 text-lg leading-[2]" dir="rtl">
               سلسلۂ سروری قادری — ایک نوری منتقلی جو دل سے دل تک، آقاﷺ کے سینے سے سلطان العارفین تک پہنچی۔
            </p>
            <p className="text-ivory/30 max-w-2xl mx-auto mb-24 text-base font-light italic font-serif">
               The Sarwari Qadri lineage — a direct transmission from the heart of the Prophet (PBUH) to Sultan-ul-Arifeen.
            </p>
            
            <div className="inline-flex flex-col items-center space-y-12">
               {[
                 "Hazrat Muhammad (PBUH)",
                 "Hazrat Ali (RA)",
                 "Hazrat Shaikh Abdul Qadir Gilani (RA)",
                 "Hazrat Sultan Bahu (RA)"
               ].map((name, i, arr) => (
                 <React.Fragment key={name}>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.2 }}
                      className={cn(
                        "text-2xl md:text-4xl font-serif italic transition-all duration-1000",
                        i === arr.length - 1 ? "text-gold-antique text-5xl md:text-7xl drop-shadow-[0_0_20px_rgba(180,162,105,0.4)]" : "text-ivory/40"
                      )}
                    >
                      {name}
                    </motion.div>
                    {i < arr.length - 1 && (
                      <div className="w-[1px] h-12 bg-gradient-to-b from-gold-antique/20 to-transparent" />
                    )}
                 </React.Fragment>
               ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
