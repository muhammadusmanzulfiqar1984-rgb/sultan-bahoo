import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";

interface ScrollProgressOrnamentProps {
  /** Calligraphic glyph at the rail's head (Arabic letter, default ھُو). */
  glyph?: string;
  /** Optional discrete section labels rendered down the rail. */
  sections?: Array<{ label: string; urdu?: string }>;
  /** Side of the viewport to anchor to. */
  side?: "left" | "right";
}

/**
 * ScrollProgressOrnament — an illuminated calligraphic rail anchored to the
 * viewport edge. Shows scroll progress as a glowing fill traveling down a
 * hairline, with sacred dot markers and a floating Arabic glyph.
 *
 * Hidden on mobile (md+ only).
 */
export function ScrollProgressOrnament({
  glyph = "ھُو",
  sections,
  side = "right",
}: ScrollProgressOrnamentProps) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.6,
  });
  const fillHeight = useTransform(progress, (v) => `${v * 100}%`);
  const glyphY = useTransform(progress, (v) => `${v * 100}%`);
  const glyphRotate = useTransform(progress, [0, 1], [0, 360]);

  const [percent, setPercent] = useState(0);
  useEffect(() => {
    return progress.on("change", (v) => setPercent(Math.round(v * 100)));
  }, [progress]);

  const anchor = side === "right" ? "right-6" : "left-6";

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed top-1/2 ${anchor} z-30 hidden -translate-y-1/2 md:block`}
    >
      <div className="relative flex h-[60vh] w-10 flex-col items-center">
        {/* Top crown ornament */}
        <CrownOrnament />

        {/* The rail */}
        <div className="relative my-3 flex-1 w-[2px]">
          {/* Hairline track */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gold-antique/15 to-transparent" />
          {/* Animated fill */}
          <motion.div
            className="absolute inset-x-0 top-0 origin-top animate-rail-shimmer"
            style={{
              height: fillHeight,
              background:
                "linear-gradient(to bottom, rgba(240,223,176,0.95), rgba(232,125,60,0.85) 60%, rgba(139,15,26,0.7))",
              boxShadow:
                "0 0 12px rgba(240,223,176,0.55), 0 0 28px rgba(212,190,134,0.35)",
            }}
          />

          {/* Section dot markers */}
          {sections?.map((s, i) => {
            const top = `${((i + 1) / (sections.length + 1)) * 100}%`;
            return (
              <div
                key={i}
                className="absolute -translate-y-1/2"
                style={{ top, left: side === "right" ? "auto" : "100%", right: side === "right" ? "100%" : "auto" }}
              >
                <div className={`flex items-center gap-3 ${side === "right" ? "flex-row-reverse" : ""}`}>
                  <span className="block h-1.5 w-1.5 rounded-full bg-gold-antique/50 shadow-[0_0_8px_rgba(212,190,134,0.7)]" />
                  <div className={`whitespace-nowrap leading-none ${side === "right" ? "text-right" : "text-left"}`}>
                    {s.urdu && (
                      <span
                        className="font-nastaliq block text-[11px] text-gold-antique/70"
                        dir="rtl"
                      >
                        {s.urdu}
                      </span>
                    )}
                    <span className="mt-0.5 block text-[8px] font-bold uppercase tracking-[0.4em] text-ivory/30">
                      {s.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Floating glyph travelling with progress */}
          <motion.div
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ top: glyphY }}
          >
            <motion.div
              className="font-nastaliq text-2xl text-gold-antique"
              style={{
                rotate: glyphRotate,
                textShadow:
                  "0 0 10px rgba(240,223,176,0.95), 0 0 24px rgba(212,190,134,0.55)",
              }}
            >
              {glyph}
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom percent readout */}
        <div className="mt-2 flex flex-col items-center leading-none">
          <span className="font-serif text-xs italic text-gold-antique/70 tabular-nums">
            {percent.toString().padStart(2, "0")}
          </span>
          <span className="mt-1 text-[7px] font-bold uppercase tracking-[0.4em] text-ivory/25">
            ٪
          </span>
        </div>
      </div>
    </div>
  );
}

function CrownOrnament() {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      className="text-gold-antique animate-ornament-pulse"
    >
      <g fill="none" stroke="currentColor" strokeWidth="0.8">
        {/* 8-pointed star */}
        <rect x="6" y="6" width="16" height="16" />
        <rect
          x="6"
          y="6"
          width="16"
          height="16"
          transform="rotate(45 14 14)"
        />
        <circle cx="14" cy="14" r="3" />
        <circle cx="14" cy="14" r="0.8" fill="currentColor" />
      </g>
    </svg>
  );
}
