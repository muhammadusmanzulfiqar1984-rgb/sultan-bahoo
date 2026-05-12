import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-sacred-black pt-32 pb-16 px-6 relative overflow-hidden">
      {/* Footer Ambient Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-sacred-red/5 rounded-full blur-[80px] -z-10" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-24 mb-32">
          <div className="md:col-span-6">
            <Link to="/" className="flex items-start space-x-6 mb-12 group">
              <div className="w-16 h-16 rounded-full border border-gold-antique/20 flex items-center justify-center bg-white/[0.02] group-hover:border-gold-antique transition-all duration-700 shrink-0">
                <span className="text-gold-antique font-serif text-3xl">H</span>
              </div>
              <div>
                <h1 className="font-nastaliq text-3xl text-ivory group-hover:text-gold-antique transition-colors leading-tight" dir="rtl">حضرت سلطان باہُو فاؤنڈیشن</h1>
                <h2 className="text-xl font-serif italic text-ivory/60 mt-1">Hazrat Sultan Bahu Foundation</h2>
              </div>
            </Link>
            <p className="font-nastaliq text-ivory/55 max-w-md mb-3 text-lg leading-[2]" dir="rtl">
              ”سلطان العارفین کے نورِ مقدّس کو محفوظ رکھنا اور اسے خدمت کے ہاتھوں سے ظاہر کرنا۔“
            </p>
            <p className="text-ivory/30 max-w-md mb-12 text-base font-light italic font-serif leading-relaxed">
              "Preserving the sacred light of Sultan-ul-Arifeen and manifesting its warmth through service."
            </p>
            <div className="flex space-x-8">
              {[Instagram, Facebook, Youtube, Mail].map((Icon, i) => (
                <a key={i} href="#" className="text-ivory/20 hover:text-gold-antique transition-all hover:scale-110">
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-gold-antique uppercase text-[10px] tracking-[0.6em] font-bold mb-12 block italic">خزینہ · The Vault</h4>
            <ul className="space-y-5 text-ivory/50">
              {[
                { to: "/about", urdu: "سوانحِ حیات", en: "Biography" },
                { to: "/library", urdu: "مقدّس کتب", en: "Sacred Books" },
                { to: "/kalam", urdu: "ابیاتِ آسمانی", en: "Celestial Abyat" },
                { to: "/projects", urdu: "خدماتِ فقر", en: "Faqr Missions" },
                { to: "/donate", urdu: "حلقۂ رحمت", en: "Circle of Mercy" }
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-ivory transition-colors flex flex-col leading-none">
                    <span className="font-nastaliq text-base" dir="rtl">{l.urdu}</span>
                    <span className="text-[9px] uppercase tracking-[0.4em] mt-1 opacity-70">{l.en}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h4 className="text-gold-antique uppercase text-[10px] tracking-[0.6em] font-bold mb-12 block italic">دہلیز · Threshold</h4>
            <ul className="space-y-8 text-ivory/40">
              <li className="flex flex-col space-y-2">
                <span className="text-[9px] text-gold-antique/40 uppercase tracking-[0.3em]">مقامِ حضور · Physical Presence</span>
                <span className="font-nastaliq text-lg" dir="rtl">لاہور، پنجاب</span>
                <span className="font-numeric text-sm opacity-70">Lahore, Punjab</span>
              </li>
              <li className="flex flex-col space-y-2">
                <span className="text-[9px] text-gold-antique/40 uppercase tracking-[0.3em]">آوازی رابطہ · Voice Transmission</span>
                <span className="font-numeric text-base">+92 (42) HSBF-Hoo</span>
              </li>
              <li className="flex flex-col space-y-2">
                 <span className="text-[9px] text-gold-antique/40 uppercase tracking-[0.3em]">ڈیجیٹل گونج · Digital Echo</span>
                 <span className="font-numeric text-base">connect@hsbf.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] text-ivory/30 gap-6">
          <div className="text-center md:text-left">
            <p className="font-nastaliq text-base text-ivory/45" dir="rtl">© ۲۰۲۶ حضرت سلطان باہُو فاؤنڈیشن • بہ فضلِ الٰہی</p>
            <p className="text-[9px] uppercase tracking-[0.6em] mt-1 font-bold opacity-70">© 2026 Hazrat Sultan Bahu Foundation • Manifested by Divine Grace</p>
          </div>
          <div className="flex space-x-10">
            <a href="#" className="hover:text-gold-antique transition-colors flex flex-col items-center leading-none">
              <span className="font-nastaliq text-sm" dir="rtl">رازداری</span>
              <span className="text-[8px] uppercase tracking-[0.5em] mt-1 opacity-70">Privacy</span>
            </a>
            <a href="#" className="hover:text-gold-antique transition-colors flex flex-col items-center leading-none">
              <span className="font-nastaliq text-sm" dir="rtl">شفافیت</span>
              <span className="text-[8px] uppercase tracking-[0.5em] mt-1 opacity-70">Transparency</span>
            </a>
            <a href="#" className="hover:text-gold-antique transition-colors flex flex-col items-center leading-none">
              <span className="font-nastaliq text-sm" dir="rtl">شرائط</span>
              <span className="text-[8px] uppercase tracking-[0.5em] mt-1 opacity-70">Legacy Terms</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
