import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Globe, Heart } from "lucide-react";
import { cn } from "../lib/utils";

const navLinks = [
  { name: "Journey", urdu: "سفر", path: "/" },
  { name: "About", urdu: "تعارف", path: "/about" },
  { name: "Library", urdu: "کتب خانہ", path: "/library" },
  { name: "Kalam", urdu: "کلام", path: "/kalam" },
  { name: "Projects", urdu: "خدمات", path: "/projects" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500 px-6 py-4",
        isScrolled ? "bg-sacred-black/80 backdrop-blur-lg border-b border-white/10" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-4 group">
          <div className="w-12 h-12 rounded-full border border-gold-antique/30 flex items-center justify-center bg-sacred-red/10 group-hover:scale-110 group-hover:border-gold-antique transition-all duration-700 relative">
            <div className="absolute inset-0 rounded-full bg-gold-antique/10 animate-pulse-slow" />
            <span className="font-serif text-2xl relative z-10 animate-zikr-color">H</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-serif leading-none tracking-[0.2em] text-ivory group-hover:text-gold-antique transition-colors">BAHOO</h1>
            <p className="font-nastaliq text-[11px] text-gold-antique/70 mt-1" dir="rtl">حضرت سلطان باہوّ فاونڈیشن</p>
            <p className="text-[8px] uppercase font-sans tracking-[0.4em] text-gold-antique/40 mt-0.5">Sacred Universal Wisdom</p>
          </div>
        </Link>

        {/* Desktop Menu — Apple-style sliding hover pill */}
        <div
          className="hidden md:flex items-center gap-2 relative"
          onMouseLeave={() => setHoverIdx(null)}
        >
          {navLinks.map((link, i) => (
            <Link
              key={link.path}
              to={link.path}
              onMouseEnter={() => setHoverIdx(i)}
              className={cn(
                "relative flex flex-col items-center leading-none transition-colors duration-300 px-5 py-3 rounded-full",
                location.pathname === link.path ? "animate-zikr-color" : "text-ivory/55 hover:text-ivory"
              )}
            >
              {/* Apple-style hover pill — shared layout slides between links */}
              {hoverIdx === i && (
                <motion.span
                  layoutId="nav-hover-pill"
                  className="absolute inset-0 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md -z-0"
                  transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.8 }}
                />
              )}
              <span className="font-nastaliq text-[15px] relative z-10" dir="rtl">{link.urdu}</span>
              <span className="text-[8px] uppercase tracking-[0.4em] mt-1 opacity-70 relative z-10">{link.name}</span>
              {location.pathname === link.path && (
                <motion.div 
                  layoutId="nav-line"
                  className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-8 h-[1.5px] bg-gold-antique shadow-[0_0_10px_rgba(180,162,105,0.5)] rounded-full"
                />
              )}
            </Link>
          ))}
          
          <div className="flex items-center gap-4 pl-6 ml-2 border-l border-white/5">
            <Link
              to="/donate"
              onMouseEnter={() => setHoverIdx(-1)}
              className="relative flex flex-col items-center leading-none animate-zikr-color transition-colors duration-300 px-5 py-3 rounded-full hover:text-gold-antique"
            >
              {hoverIdx === -1 && (
                <motion.span
                  layoutId="nav-hover-pill"
                  className="absolute inset-0 rounded-full bg-sacred-red/15 border border-sacred-red/30 backdrop-blur-md -z-0"
                  transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.8 }}
                />
              )}
              <span className="font-nastaliq text-[15px] relative z-10" dir="rtl">عطیہ</span>
              <span className="text-[8px] uppercase tracking-[0.4em] mt-1 opacity-80 relative z-10">Support</span>
            </Link>
            <button className="text-ivory/30 hover:text-gold-antique transition-colors p-2">
              <Globe size={16} />
            </button>
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-ivory"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-sacred-black/95 backdrop-blur-xl border-b border-white/10 p-8 md:hidden"
          >
            <div className="flex flex-col space-y-6 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex flex-col items-center text-ivory hover:text-gold-antique"
                >
                  <span className="font-nastaliq text-2xl leading-none" dir="rtl">{link.urdu}</span>
                  <span className="text-[10px] uppercase tracking-[0.4em] mt-1 opacity-70">{link.name}</span>
                </Link>
              ))}
              <Link
                to="/donate"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full text-center bg-gold-antique text-sacred-black py-4 rounded-xl"
              >
                <span className="font-nastaliq text-xl block leading-none" dir="rtl">عطیہ دیجئے</span>
                <span className="text-[10px] uppercase tracking-[0.4em] mt-1 block">Donate Now</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
