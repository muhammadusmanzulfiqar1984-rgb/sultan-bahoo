import { motion, useScroll, useTransform } from "motion/react";
import { useMemo } from "react";

/**
 * Cinematic sacred sanctuary hero.
 * Apple-minimal × Sufi shrine × luxury editorial.
 */
export function Hero() {
  const { scrollY } = useScroll();
  const yShrine = useTransform(scrollY, [0, 800], [0, 140]);
  const yMist = useTransform(scrollY, [0, 800], [0, 60]);
  const opacityText = useTransform(scrollY, [0, 400], [1, 0]);

  const embers = useMemo(
    () =>
      Array.from({ length: 28 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: Math.random() * 1.6 + 0.6,
        delay: Math.random() * 18,
        duration: 18 + Math.random() * 22,
        drift: (Math.random() - 0.5) * 80,
        opacity: 0.25 + Math.random() * 0.45,
      })),
    []
  );

  return (
    <section className="relative h-screen min-h-[760px] w-full overflow-hidden bg-sacred-black text-ivory">
      {/* ── Deep base gradient (matte black → charcoal) ───────────────── */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% 65%, #3a2a18 0%, #1f1812 40%, #100c08 80%, #0a0806 100%)",
        }}
      />

      {/* ── Subtle crimson ground bloom ───────────────────────────────── */}
      <div
        className="absolute inset-x-0 bottom-0 h-[60%] z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 95%, rgba(107,15,26,0.32) 0%, rgba(107,15,26,0.12) 40%, transparent 75%)",
        }}
      />

      {/* ── Atmospheric haze layers ───────────────────────────────────── */}
      <motion.div
        style={{ y: yMist }}
        className="absolute inset-0 z-[2] pointer-events-none"
      >
        <div
          className="absolute inset-0 animate-haze mix-blend-screen"
          style={{
            background:
              "radial-gradient(ellipse 90% 55% at 50% 72%, rgba(217,200,154,0.22), rgba(180,162,105,0.06) 45%, transparent 75%)",
          }}
        />
        <div
          className="absolute inset-0 animate-haze mix-blend-screen opacity-70"
          style={{
            animationDelay: "-8s",
            background:
              "radial-gradient(ellipse 60% 35% at 38% 82%, rgba(217,200,154,0.10), transparent 70%)",
          }}
        />
      </motion.div>

      {/* ── Single divine light shaft (restrained) ────────────────────── */}
      <div className="absolute inset-0 z-[3] pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0.15 }}
          animate={{ opacity: [0.18, 0.32, 0.22, 0.32, 0.18] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] left-1/2 w-[620px] h-[140%]"
          style={{
            background:
              "linear-gradient(180deg, rgba(217,200,154,0.45) 0%, rgba(217,200,154,0.15) 40%, transparent 80%)",
            transform: "translateX(-50%) rotate(6deg)",
            filter: "blur(60px)",
          }}
        />
      </div>

      {/* ── Cinematic video backdrop (real shrine footage) ────────────── */}
      <motion.div
        style={{ y: yShrine }}
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-[4] pointer-events-none"
      >
        <video
          src="/hero-loop.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: "brightness(0.55) contrast(1.05) saturate(0.9) sepia(0.18)",
          }}
        />
        {/* Dark cinematic overlay to dim the footage further */}
        <div
          className="absolute inset-0 bg-sacred-black/45"
          aria-hidden="true"
        />
        {/* Warm gold tint over the footage */}
        <div
          className="absolute inset-0 mix-blend-soft-light opacity-70"
          style={{
            background:
              "linear-gradient(180deg, rgba(201,179,120,0.18) 0%, rgba(107,15,26,0.10) 60%, rgba(0,0,0,0.45) 100%)",
          }}
        />
        {/* Bottom fade so text reads */}
        <div
          className="absolute inset-x-0 bottom-0 h-[55%]"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(16,12,8,0.55) 55%, rgba(16,12,8,0.92) 100%)",
          }}
        />
        {/* Top fade */}
        <div
          className="absolute inset-x-0 top-0 h-[35%]"
          style={{
            background:
              "linear-gradient(180deg, rgba(16,12,8,0.7) 0%, transparent 100%)",
          }}
        />
      </motion.div>

      {/* ── (Removed SVG shrine silhouette — replaced by video) ───────── */}
      <div style={{ display: "none" }}>
        <ShrineSilhouette />
      </div>

      {/* ── Floating embers / dust particles ──────────────────────────── */}
      <div className="absolute inset-0 z-[5] pointer-events-none overflow-hidden">
        {embers.map((e) => (
          <span
            key={e.id}
            className="absolute bottom-0 rounded-full bg-gold-champagne"
            style={{
              left: `${e.left}%`,
              width: `${e.size}px`,
              height: `${e.size}px`,
              filter: "blur(0.6px)",
              boxShadow: "0 0 6px rgba(217,200,154,0.6)",
              animation: `ember-rise ${e.duration}s linear ${e.delay}s infinite`,
              // @ts-expect-error custom CSS vars
              "--ember-drift": `${e.drift}px`,
              "--ember-opacity": e.opacity,
            }}
          />
        ))}
      </div>

      {/* ── Vignette (soft) ───────────────────────────────────────────── */}
      <div
        className="absolute inset-0 z-[6] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 50% 55%, transparent 60%, rgba(0,0,0,0.25) 88%, rgba(0,0,0,0.6) 100%)",
        }}
      />
      {/* Subtle film grain */}
      <div
        className="absolute inset-0 z-[7] pointer-events-none opacity-[0.06] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.5 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")",
        }}
      />

      {/* ── Content (minimal, asymmetrical balance) ───────────────────── */}
      <motion.div
        style={{ opacity: opacityText }}
        className="relative z-20 h-full w-full flex flex-col"
      >
        {/* Top kicker: Urdu calligraphy — cinematic heartbeat zikr */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.4, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute top-[9%] left-1/2 -translate-x-1/2 text-center"
        >
          {/* Radial halo behind text that pulses like a heart */}
          <div className="relative inline-block">
            <span
              aria-hidden="true"
              className="absolute inset-0 -m-12 rounded-full blur-3xl pointer-events-none animate-zikr-halo"
            />
            <div
              className="font-nastaliq relative text-[clamp(2rem,4vw,3.2rem)] leading-none animate-zikr-pulse animate-zikr-color"
              style={{
                letterSpacing: "0.02em",
                direction: "rtl",
              }}
              aria-label="Allah Hoo"
            >
              اَللہ ھُو
            </div>
          </div>
          <div
            className="font-nastaliq mt-4 text-[clamp(0.75rem,1vw,0.9rem)] tracking-wide"
            style={{ color: "rgba(217,200,154,0.5)", direction: "rtl" }}
          >
            سلطان باہُو
          </div>
        </motion.div>

        {/* Centered main typographic block */}
        <div className="relative z-20 m-auto px-6 w-full">
          <div className="mx-auto max-w-5xl text-center">
            {/* Hairline divider */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 2.6, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
              className="mx-auto h-px w-32 hairline mb-8 origin-center"
            />

            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.9em" }}
              animate={{ opacity: 1, letterSpacing: "0.55em" }}
              transition={{ duration: 3, delay: 2.4 }}
              className="font-sans text-[10px] sm:text-[11px] uppercase mb-6"
              style={{ color: "rgba(217,200,154,0.65)", fontWeight: 300 }}
            >
              سلطان العارفین · Sultan-ul-Arifeen
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.4, delay: 2.6, ease: [0.16, 1, 0.3, 1] }}
              className="font-nastaliq text-[clamp(1.8rem,4.4vw,4rem)] leading-[1.55]"
              style={{ letterSpacing: "0", color: "#f5efe2", direction: "rtl" }}
            >
              <span className="block">حضرت سلطان باہوّ</span>
              <span className="block mt-3 gold-shimmer-text" style={{ direction: "rtl" }}>
                فاونڈیشن
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.4, delay: 3, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-extralight italic text-[clamp(0.85rem,1.3vw,1.2rem)] mt-5"
              style={{ color: "rgba(245,239,226,0.5)", letterSpacing: "0.04em" }}
            >
              Hazrat Sultan Bahu Foundation
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 3, delay: 3.4 }}
              className="mt-8 font-nastaliq text-[clamp(0.9rem,1.2vw,1.1rem)] max-w-2xl mx-auto"
              style={{ color: "rgba(245,239,226,0.65)", direction: "rtl", lineHeight: 2 }}
            >
              عشق، علم اور فقر کے ذریعے خدمتِ خلق
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 3, delay: 3.6 }}
              className="mt-2 font-serif italic text-[clamp(0.8rem,1vw,0.95rem)] font-light max-w-xl mx-auto"
              style={{ color: "rgba(245,239,226,0.4)", letterSpacing: "0.04em" }}
            >
              Serving humanity through divine love, knowledge &amp; faqr.
            </motion.p>
          </div>
        </div>

        {/* ── Signature seal (bottom-left, asymmetrical) ──────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.4, delay: 3.6 }}
          className="absolute left-6 sm:left-10 bottom-8 z-20 hidden sm:flex items-center gap-4"
        >
          <SignatureSeal />
          <div className="flex flex-col">
            <span className="font-nastaliq text-[12px] text-ivory/60 leading-none" dir="rtl">حرم</span>
            <span className="font-sans text-[8px] tracking-[0.5em] uppercase text-ivory/40 mt-0.5">
              Sanctum
            </span>
            <span className="font-serif italic text-[11px] text-ivory/35 mt-1">
              MMXXVI
            </span>
          </div>
        </motion.div>

        {/* ── Bottom-right meta (silent confidence) ───────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 4 }}
          className="absolute right-6 sm:right-10 bottom-8 z-20 hidden sm:flex flex-col items-end"
        >
          <span className="font-nastaliq text-[12px] text-ivory/55 leading-none" dir="rtl">نیچے</span>
          <span className="font-sans text-[8px] tracking-[0.5em] uppercase text-ivory/40 mt-0.5">
            Scroll
          </span>
          <div className="mt-3 h-16 w-px bg-gradient-to-b from-gold-antique/50 via-gold-antique/15 to-transparent overflow-hidden relative">
            <motion.div
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent via-gold-champagne to-transparent"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Custom shrine silhouette — central dome, two minarets, low arches.   */
/*  Drawn as pure SVG so it stays crisp, themable, and dependency-free.  */
/* ────────────────────────────────────────────────────────────────────── */
function ShrineSilhouette() {
  return (
    <svg
      viewBox="0 0 1600 700"
      preserveAspectRatio="xMidYEnd slice"
      className="w-full h-[44vh] min-h-[300px] max-h-[460px] shrine-glow-inner"
      aria-hidden="true"
    >
      <defs>
        {/* Inner shrine glow (warm gold) */}
        <radialGradient id="innerGlow" cx="50%" cy="55%" r="55%">
          <stop offset="0%" stopColor="#f5e9c2" stopOpacity="0.85" />
          <stop offset="30%" stopColor="#d9c89a" stopOpacity="0.4" />
          <stop offset="70%" stopColor="#8a5a1a" stopOpacity="0.12" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        {/* Silhouette fill (slightly warm so it reads against black) */}
        <linearGradient id="shrineFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1f1810" />
          <stop offset="55%" stopColor="#15100a" />
          <stop offset="100%" stopColor="#080604" />
        </linearGradient>
        {/* Dome rim highlight */}
        <linearGradient id="rimGold" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d9c89a" stopOpacity="0.0" />
          <stop offset="50%" stopColor="#d9c89a" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#b4a269" stopOpacity="0.0" />
        </linearGradient>
        {/* Arch glow */}
        <radialGradient id="archGlow" cx="50%" cy="80%" r="50%">
          <stop offset="0%" stopColor="#f5e9c2" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#b4a269" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Soft halo behind central dome */}
      <ellipse cx="800" cy="360" rx="520" ry="320" fill="url(#innerGlow)" />

      {/* Distant outer minarets (depth) */}
      <g fill="#0e0b07" opacity="0.95">
        <rect x="120" y="430" width="32" height="270" />
        <path d="M120 430 q16 -60 32 0 z" />
        <circle cx="136" cy="412" r="14" />

        <rect x="1448" y="430" width="32" height="270" />
        <path d="M1448 430 q16 -60 32 0 z" />
        <circle cx="1464" cy="412" r="14" />
      </g>

      {/* Side wings / lower walls */}
      <path
        d="M0 700 L0 560 L260 560 L260 520 L520 520 L520 560 L1080 560 L1080 520 L1340 520 L1340 560 L1600 560 L1600 700 Z"
        fill="url(#shrineFill)"
      />

      {/* Twin flanking minarets */}
      <g fill="url(#shrineFill)">
        <rect x="370" y="240" width="44" height="320" />
        <path d="M370 240 q22 -90 44 0 z" />
        <circle cx="392" cy="218" r="20" />
        <rect x="386" y="178" width="12" height="40" />

        <rect x="1186" y="240" width="44" height="320" />
        <path d="M1186 240 q22 -90 44 0 z" />
        <circle cx="1208" cy="218" r="20" />
        <rect x="1202" y="178" width="12" height="40" />
      </g>

      {/* Central main structure */}
      <path
        d="M560 560 L560 360 L640 360 L640 320 L960 320 L960 360 L1040 360 L1040 560 Z"
        fill="url(#shrineFill)"
      />

      {/* Central dome */}
      <path
        d="M620 320 Q620 160 800 140 Q980 160 980 320 Z"
        fill="url(#shrineFill)"
      />
      {/* Dome rim highlight */}
      <path
        d="M620 320 Q620 160 800 140 Q980 160 980 320"
        fill="none"
        stroke="url(#rimGold)"
        strokeWidth="1.2"
        opacity="0.9"
      />

      {/* Finial */}
      <g>
        <line x1="800" y1="140" x2="800" y2="80" stroke="#b4a269" strokeWidth="1.5" opacity="0.7" />
        <circle cx="800" cy="74" r="5" fill="#d9c89a" opacity="0.85" />
        <circle cx="800" cy="74" r="14" fill="#d9c89a" opacity="0.12" />
      </g>

      {/* Central glowing arch (the sanctum) */}
      <path
        d="M740 560 L740 440 Q740 380 800 380 Q860 380 860 440 L860 560 Z"
        fill="url(#archGlow)"
        opacity="0.9"
      />
      {/* Arch outline */}
      <path
        d="M740 560 L740 440 Q740 380 800 380 Q860 380 860 440 L860 560"
        fill="none"
        stroke="#d9c89a"
        strokeOpacity="0.35"
        strokeWidth="1"
      />

      {/* Side arch glints (small lit windows) */}
      <g fill="#d9c89a" opacity="0.35">
        <rect x="392" y="430" width="4" height="22" rx="2" />
        <rect x="1208" y="430" width="4" height="22" rx="2" />
        <rect x="600" y="470" width="3" height="18" rx="1.5" opacity="0.5" />
        <rect x="998" y="470" width="3" height="18" rx="1.5" opacity="0.5" />
      </g>

      {/* Ground reflection fade */}
      <rect x="0" y="640" width="1600" height="60" fill="#000" opacity="0.6" />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────────────── */
/*  Signature seal — crimson disc with calligraphic mark.                 */
/* ────────────────────────────────────────────────────────────────────── */
function SignatureSeal() {
  return (
    <div className="relative w-12 h-12">
      {/* Outer rotating ring */}
      <svg
        viewBox="0 0 100 100"
        className="absolute inset-0 animate-seal"
        aria-hidden="true"
      >
        <circle
          cx="50"
          cy="50"
          r="46"
          fill="none"
          stroke="rgba(217,200,154,0.35)"
          strokeWidth="0.4"
          strokeDasharray="2 4"
        />
      </svg>
      {/* Crimson seal */}
      <div
        className="absolute inset-1 rounded-full flex items-center justify-center"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #8a1424 0%, #6b0f1a 55%, #3a0810 100%)",
          boxShadow:
            "inset 0 0 8px rgba(0,0,0,0.6), 0 0 14px rgba(107,15,26,0.45)",
        }}
      >
        <span
          className="font-nastaliq text-gold-champagne text-[15px] leading-none"
          style={{ direction: "rtl", textShadow: "0 0 4px rgba(0,0,0,0.6)" }}
        >
          ھُو
        </span>
      </div>
    </div>
  );
}

