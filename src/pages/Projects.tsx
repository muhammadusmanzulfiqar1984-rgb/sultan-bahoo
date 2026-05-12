import { motion } from "motion/react";
import { GraduationCap, HeartPulse, Refrigerator, Sprout, Soup, Waves, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { SacredAtmosphere } from "../components/SacredAtmosphere";
import { ScrollProgressOrnament } from "../components/ScrollProgressOrnament";

const PROJECTS = [
  {
    title: "Education & Literacy",
    urdu: "تعلیم و خواندگی",
    description: "Building modern schools and traditional madrasas to provide holistic education to the underprivileged.",
    urduDesc: "محروم طبقات کو جامع تعلیم دینے کے لیے جدید اسکول اور روایتی مدارس کا قیام۔",
    icon: <GraduationCap size={40} />,
    color: "bg-blue-900/20",
    stats: "15 Schools",
    urduStats: "۱۵ اسکول"
  },
  {
    title: "Healthcare Units",
    urdu: "صحت کے مراکز",
    description: "Establishing mobile clinics and local dispensaries in remote areas of Punjab and Sindh.",
    urduDesc: "پنجاب و سندھ کے دور دراز علاقوں میں موبائل کلینک اور دیسی شفاخانے۔",
    icon: <HeartPulse size={40} />,
    color: "bg-rose-900/20",
    stats: "20,000 Patients",
    urduStats: "۲۰،۰۰۰ مریض"
  },
  {
    title: "Food Distribution",
    urdu: "تقسیمِ غذا",
    description: "The 'Langar-e-Hoo' initiative provides monthly ration packs and daily hot meals.",
    urduDesc: "”لنگرِ ھُو“ کے تحت ماہانہ راشن اور روزانہ گرم کھانا فراہم کیا جاتا ہے۔",
    icon: <Soup size={40} />,
    color: "bg-orange-900/20",
    stats: "1M Meals",
    urduStats: "۱۰ لاکھ کھانے"
  },
  {
    title: "Clean Water",
    urdu: "صافی پانی",
    description: "Installing solar-powered water filtration plants and wells in drought-prone regions.",
    urduDesc: "خشک سالی والے علاقوں میں شمسی توانائی سے چلنے والے صفائی پلانٹ اور کنویں۔",
    icon: <Waves size={40} />,
    color: "bg-cyan-900/20",
    stats: "100+ Wells",
    urduStats: "۱۰۰+ کنویں"
  },
  {
    title: "Disaster Response",
    urdu: "آفات سے امداد",
    description: "Rapid aid and long-term reconstruction support for flood and earthquake victims.",
    urduDesc: "سیلاب اور زلزلہ متاثرین کے لیے فوری امداد اور دیرپا بحالی۔",
    icon: <ShieldCheckIcon />,
    color: "bg-emerald-900/20",
    stats: "5000+ Families",
    urduStats: "۵۰۰۰+ خاندان"
  }
];

function ShieldCheckIcon() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

export function Projects() {
  return (
    <div className="pt-40 pb-20 px-6 bg-sacred-black min-h-screen relative">
      <SacredAtmosphere tone="crimson" embers={24} />
      <ScrollProgressOrnament
        glyph="خدمت"
        sections={[
          { urdu: "تجلّی", label: "Manifestation" },
          { urdu: "خدمات", label: "Initiatives" },
          { urdu: "حلقہ", label: "Circle" },
        ]}
      />
      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-32 text-center relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-sacred-red/5 rounded-full blur-[60px] -z-10" />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5 }}>
            <span className="text-sacred-red uppercase text-[10px] tracking-[0.8em] mb-8 block font-bold">تجلّی · The Manifestation</span>
            <h1 className="font-nastaliq text-6xl md:text-[7rem] mb-4 gold-gradient leading-[1.3]" dir="rtl">فقر بصورتِ خدمت</h1>
            <h2 className="text-3xl md:text-5xl font-serif text-ivory italic gold-gradient leading-none mb-12">Faqr in Service</h2>
            <p className="font-nastaliq text-ivory/60 max-w-2xl mx-auto text-lg leading-[2]" dir="rtl">
              ”جو پیاسوں کی خدمت کرتا ہے، وہ سمندر پا لیتا ہے۔ ہماری خدمات ہمارے باطنی عشق کی بیرونی صدا ہیں۔“
            </p>
            <p className="text-ivory/30 max-w-xl mx-auto text-base font-light italic font-serif mt-3">
              "One who serves the thirsty, finds the ocean."
            </p>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {PROJECTS.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group grid-runner glass rounded-[60px] p-12 hover:border-sacred-red/30 transition-all interactive-card relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 border border-white/5 rounded-full group-hover:scale-150 transition-transform duration-[2s]" />
              
              <div className="relative z-10">
                <div className={`w-16 h-16 ${project.color} rounded-[20px] flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-700 ring-1 ring-white/10`}>
                  <div className="text-gold-antique">{project.icon}</div>
                </div>
                
                <h3 className="font-nastaliq text-3xl text-ivory mb-1 group-hover:text-gold-antique transition-colors leading-[1.4]" dir="rtl">{project.urdu}</h3>
                <h4 className="text-xl font-serif italic text-ivory/70 mb-6">{project.title}</h4>
                <p className="font-nastaliq text-ivory/55 text-sm leading-[1.9] mb-2" dir="rtl">{project.urduDesc}</p>
                <p className="text-ivory/30 text-xs leading-relaxed mb-10 font-light italic font-serif">{project.description}</p>
                
                <div className="flex items-center justify-between pt-10 border-t border-white/5">
                  <div className="flex flex-col leading-none">
                    <span className="font-nastaliq text-gold-antique text-xl" dir="rtl">{project.urduStats}</span>
                    <span className="text-gold-antique/70 font-serif italic text-sm mt-0.5">{project.stats}</span>
                  </div>
                  <Link
                    to="/donate"
                    className="flex flex-col items-end group/btn"
                  >
                    <span className="font-nastaliq text-[12px] text-ivory/40 group-hover/btn:text-sacred-red transition-colors mb-0.5" dir="rtl">عطیہ دیں</span>
                    <span className="text-[8px] uppercase tracking-[0.3em] font-bold text-ivory/20 group-hover/btn:text-sacred-red transition-colors mb-2">Offer Support</span>
                    <div className="w-12 h-12 rounded-full border border-sacred-red/20 flex items-center justify-center group-hover/btn:border-sacred-red group-hover/btn:bg-sacred-red/5 transition-all">
                       <Heart size={16} className="text-sacred-red" />
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Unified Global Prompt */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group relative glass rounded-[60px] p-12 border-sacred-red/20 flex flex-col justify-center text-center overflow-hidden"
          >
            <div className="absolute inset-0 bg-sacred-red/5 opacity-40 animate-pulse-slow" />
            <div className="relative z-10">
              <span className="text-gold-antique uppercase text-[9px] tracking-[0.6em] mb-8 block font-bold italic">ہم آہنگی · Collective Harmony</span>
              <h3 className="font-nastaliq text-4xl mb-1 text-ivory" dir="rtl">حلقۂ رحمت</h3>
              <h4 className="text-2xl font-serif italic text-ivory/70 mb-6">Circle of Mercy</h4>
              <p className="font-nastaliq text-sm text-ivory/50 mb-2 max-w-xs mx-auto leading-[2]" dir="rtl">”رحمت کے سمندر میں شامل ہوں۔ آپ کی شراکت اس مادی دنیا میں صدائے ھُو کو زندہ رکھتی ہے۔“</p>
              <p className="text-xs font-light text-ivory/25 mb-10 italic max-w-xs mx-auto">"Join the ocean of compassion."</p>
              <Link to="/donate" className="inline-block px-12 py-5 bg-sacred-red text-ivory/90 rounded-full hover:bg-gold-antique hover:text-sacred-black transition-all shadow-2xl">
                <span className="font-nastaliq text-base block leading-none" dir="rtl">ستون بن جائیں</span>
                <span className="font-bold uppercase tracking-[0.4em] text-[9px] mt-1 block">Become a Pillar</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
