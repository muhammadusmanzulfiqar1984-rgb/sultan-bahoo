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
            <span className="text-gold-antique font-serif text-2xl relative z-10">H</span>
          </div>
          <div className="hidden sm:block">
            <h1 className="text-xl font-serif leading-none tracking-[0.2em] text-ivory group-hover:text-gold-antique transition-colors">BAHOO</h1>
            <p className="font-nastaliq text-[11px] text-gold-antique/70 mt-1" dir="rtl">حضرت سلطان باہوّ فاونڈیشن</p>
            <p className="text-[8px] uppercase font-sans tracking-[0.4em] text-gold-antique/40 mt-0.5">Sacred Universal Wisdom</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-12">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "relative flex flex-col items-center leading-none transition-all hover:text-gold-antique py-2",
                location.pathname === link.path ? "text-gold-antique" : "text-ivory/55"
              )}
            >
              <span className="font-nastaliq text-[15px]" dir="rtl">{link.urdu}</span>
              <span className="text-[8px] uppercase tracking-[0.4em] mt-1 opacity-70">{link.name}</span>
              {location.pathname === link.path && (
                <motion.div 
                  layoutId="nav-line"
                  className="absolute -bottom-0.5 left-0 w-full h-[1px] bg-gold-antique shadow-[0_0_10px_rgba(180,162,105,0.5)]"
                />
              )}
            </Link>
          ))}
          
          <div className="flex items-center space-x-8 pl-8 border-l border-white/5">
            <Link
              to="/donate"
              className="flex flex-col items-center leading-none text-sacred-red hover:text-gold-antique transition-colors"
            >
              <span className="font-nastaliq text-[15px]" dir="rtl">عطیہ</span>
              <span className="text-[8px] uppercase tracking-[0.4em] mt-1 opacity-80">Support</span>
            </Link>
            <button className="text-ivory/30 hover:text-gold-antique transition-colors">
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
