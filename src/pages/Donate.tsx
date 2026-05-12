import { useState } from "react";
import { motion } from "motion/react";
import { CreditCard, Landmark, Smartphone, Heart, ShieldCheck } from "lucide-react";
import { cn } from "../lib/utils";
import { SacredAtmosphere } from "../components/SacredAtmosphere";
import { ScrollProgressOrnament } from "../components/ScrollProgressOrnament";

export function Donate() {
  const [amount, setAmount] = useState<string>("1000");
  const [method, setMethod] = useState<string>("easypaisa");

  const presets = ["500", "1000", "5000", "10000", "50000"];

  return (
    <div className="pt-40 pb-24 px-6 bg-sacred-black min-h-screen relative">
      <SacredAtmosphere tone="gold" embers={22} />
      <ScrollProgressOrnament
        glyph="کرم"
        sections={[
          { urdu: "تعاون", label: "Contribution" },
          { urdu: "تقسیم", label: "Distribution" },
          { urdu: "میراث", label: "Legacy" },
        ]}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-32 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-sacred-red/5 rounded-full blur-[60px] -z-10" />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>
            <span className="text-sacred-red uppercase text-[10px] tracking-[0.8em] mb-8 block font-bold">عملِ کرم · Act of Grace</span>
            <h1 className="font-nastaliq text-6xl md:text-[7rem] mb-4 gold-gradient leading-[1.3]" dir="rtl">حلقۂ رحمت</h1>
            <h2 className="text-3xl md:text-5xl font-serif text-ivory italic gold-gradient leading-none mb-12">The Circle of Mercy</h2>
            <p className="font-nastaliq text-ivory/60 max-w-2xl mx-auto text-lg leading-[2]" dir="rtl">
              ”دولت یہ نہیں کہ آپ کے پاس کتنی ہے، بلکہ یہ ہے کہ آپ نے کتنی پاک کی۔ رحمت کے سمندر میں شامل ہوں۔“
            </p>
            <p className="text-ivory/30 max-w-xl mx-auto text-base font-light italic font-serif mt-3">
              "Wealth is not how much you have, but how much you have purified through giving."
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start max-w-6xl mx-auto">
          {/* Donation Form */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="glass rounded-[60px] p-12 md:p-20 border-white/5 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sacred-red/5 to-transparent opacity-50 transition-opacity group-hover:opacity-100" />
            
            <div className="relative z-10">
              <h2 className="font-nastaliq text-4xl text-ivory mb-1" dir="rtl">اپنا تعاون پیش کیجیے</h2>
              <h3 className="text-2xl font-serif italic text-ivory/70 mb-12">Offer Your Contribution</h3>
              
              <div className="mb-12">
                <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-gold-antique/60 mb-1 block">رقم منتخب کریں (PKR) · Select Amount</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                  {presets.map((p) => (
                    <button
                      key={p}
                      onClick={() => setAmount(p)}
                      className={cn(
                        "py-5 rounded-2xl border text-[10px] font-bold tracking-widest transition-all duration-500",
                        amount === p 
                          ? "bg-gold-antique text-sacred-black border-gold-antique shadow-[0_0_30px_rgba(180,162,105,0.3)] scale-105" 
                          : "bg-white/5 border-white/10 text-ivory/40 hover:border-gold-antique/30"
                      )}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative mb-12 group/input">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gold-antique/40 group-focus-within/input:text-gold-antique transition-colors font-serif">PKR</span>
                <input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-sacred-black/40 border border-white/5 rounded-3xl py-6 px-20 text-2xl font-serif focus:outline-none focus:border-gold-antique/50 transition-all text-ivory"
                  placeholder="حسبِ خواہش · Custom"
                />
              </div>

              <div className="mb-12">
                <label className="text-[9px] uppercase tracking-[0.4em] font-bold text-gold-antique/60 mb-6 block">ادائیگی کا ذریعہ · Transmission Gateway</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { id: "easypaisa", name: "EasyPaisa", urdu: "ایزی پیسہ", icon: <Smartphone size={20} /> },
                    { id: "jazzcash", name: "JazzCash", urdu: "جاز کیش", icon: <Smartphone size={20} /> },
                    { id: "bank", name: "Bank Transfer", urdu: "بینک منتقلی", icon: <Landmark size={20} /> },
                  ].map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setMethod(m.id)}
                      className={cn(
                        "p-8 rounded-[32px] border transition-all flex flex-col items-center gap-3 group/btn",
                        method === m.id 
                          ? "border-gold-antique bg-gold-antique/5 text-ivory" 
                          : "border-white/5 bg-white/5 text-ivory/20 hover:border-white/20"
                      )}
                    >
                      <div className={cn(
                        "transition-all duration-500",
                        method === m.id ? "text-gold-antique scale-110" : "text-ivory/20"
                      )}>{m.icon}</div>
                      <span className="font-nastaliq text-base leading-none" dir="rtl">{m.urdu}</span>
                      <span className="text-[8px] uppercase tracking-[0.2em] font-bold opacity-70">{m.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <button className="w-full py-7 bg-sacred-red text-ivory rounded-full shadow-[0_0_50px_rgba(139,0,0,0.3)] hover:bg-gold-antique hover:text-sacred-black transition-all group overflow-hidden relative">
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 flex items-center justify-center gap-4">
                   <Heart size={16} fill="currentColor" />
                   <span className="flex flex-col leading-none">
                     <span className="font-nastaliq text-lg" dir="rtl">نبضِ رحمت آغاز کیجیے</span>
                     <span className="font-bold uppercase tracking-[0.4em] text-[10px] mt-1 opacity-80">Initialize Pulse of Mercy</span>
                   </span>
                </span>
              </button>

              <div className="mt-12 flex items-center justify-center space-x-4 text-[8px] uppercase tracking-[0.4em] text-ivory/20">
                <ShieldCheck size={14} />
                <span>محفوظ گیٹ وے · Encrypted Divine Gateway</span>
              </div>
            </div>
          </motion.div>

          {/* Context & Breakdown */}
          <div className="space-y-24 lg:pt-20">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-16"
            >
              <div>
                <h3 className="font-nastaliq text-4xl mb-1 text-gold-antique" dir="rtl">۱۰۰٪ پالیسی</h3>
                <h4 className="text-2xl font-serif italic text-gold-antique/80 mb-8">100% Grace Policy</h4>
                <p className="font-nastaliq text-ivory/55 leading-[2] text-base mb-3" dir="rtl">
                  ایچ ایس بی ایف ۱۰۰٪ عطیہ پالیسی پر کام کرتی ہے۔ آپ کا ہر قطرہ براہِ راست میدان تک پہنچتا ہے۔ انتظامی اخراجات الگ خیراتی فنڈ سے پورے ہوتے ہیں۔
                </p>
                <p className="text-ivory/30 leading-relaxed font-light italic font-serif text-sm">
                  Every drop you contribute reaches the field directly.
                </p>
              </div>

              <div className="space-y-8">
                <h4 className="text-[10px] uppercase tracking-[0.4em] font-bold text-ivory/40">تقسیمِ نور · Distribution of Light</h4>
                {[
                  { label: "Humanitarian Aid", urdu: "انسانی خدمت", value: 70 },
                  { label: "Spiritual Preservation", urdu: "روحانی حفاظت", value: 15 },
                  { label: "Knowledge Centers", urdu: "علم کے مراکز", value: 15 },
                ].map((item, i) => (
                  <div key={i} className="group">
                    <div className="flex justify-between items-end mb-4 text-ivory/40 group-hover:text-ivory/70 transition-colors">
                      <span className="flex flex-col leading-none">
                        <span className="font-nastaliq text-base" dir="rtl">{item.urdu}</span>
                        <span className="text-[8px] uppercase tracking-[0.4em] mt-1 opacity-70">{item.label}</span>
                      </span>
                      <span className="font-serif italic text-lg">{item.value}%</span>
                    </div>
                    <div className="h-[2px] bg-white/5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 2, delay: i * 0.2 }}
                        className="h-full bg-gold-antique/40 group-hover:bg-gold-antique transition-all" 
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-12 glass rounded-[60px] border-emerald-deep/10 bg-sacred-black/40 relative overflow-hidden group">
                 <div className="absolute inset-0 bg-emerald-deep/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
                 <h4 className="font-nastaliq text-3xl mb-1 text-ivory" dir="rtl">صدقۂ جاریہ</h4>
                 <h5 className="text-xl font-serif italic text-ivory/70 mb-6">Sadaqah Jariyah</h5>
                 <p className="font-nastaliq text-ivory/55 text-base leading-[2] mb-3" dir="rtl">
                   ”جب اللہ کا بندہ رحمت کا پل تعمیر کرتا ہے، اس کی گونج اس دنیا کے پردے سے آگے بھی جاری رہتی ہے۔“
                 </p>
                 <p className="text-ivory/30 text-sm leading-relaxed italic font-light mb-8">
                   "When a servant of God creates a bridge of mercy, its resonance continues beyond this world."
                 </p>
                 <div className="flex items-center space-x-4">
                    <div className="w-8 h-[1px] bg-gold-antique/30" />
                    <span className="text-[9px] uppercase tracking-[0.4em] text-gold-antique/60 font-bold">میراثِ ابدی · Eternal Legacy</span>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
