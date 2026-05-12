import { useEffect, useRef, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

type Tone = "gold" | "crimson" | "twilight";

interface SacredAtmosphereProps {
  /** Color tonality of the atmosphere */
  tone?: Tone;
  /** Show the giant mihrab arch silhouette */
  mihrab?: boolean;
  /** Show the rotating sacred geometry seal */
  geometry?: boolean;
  /** Number of drifting gold embers */
  embers?: number;
  /** Show the burning oil-lamp (chiragh) anchored at bottom */
  chiragh?: boolean;
  /** Position of the chiragh: center, left, or right */
  chiraghSide?: "center" | "left" | "right";
}

/**
 * SacredAtmosphere — a fixed, full-viewport cinematic background layer for
 * sub-pages. Composes:
 *   • aurora wash (radial color drifts)
 *   • mouse-tracked gold orb
 *   • parallax mihrab arch silhouette
 *   • rotating SVG sacred-geometry seal (8-pointed star tessellation)
 *   • slow diagonal light rays
 *   • drifting gold embers
 *   • top/bottom vignette + film grain
 *
 * It is purely decorative (`pointer-events-none`) and sits behind page content.
 */
export function SacredAtmosphere({
  tone = "gold",
  mihrab = true,
  geometry = true,
  embers = 12,
  chiragh = true,
  chiraghSide = "center",
}: SacredAtmosphereProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  // Skip heavy effects on mobile / low-power devices
  const [enabled, setEnabled] = useState(true);
  useEffect(() => {
    const mql = window.matchMedia("(max-width: 768px), (prefers-reduced-motion: reduce)");
    setEnabled(!mql.matches);
    const onChange = () => setEnabled(!mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  // Mouse-tracked aurora orb
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.35);
  const sx = useSpring(mx, { stiffness: 40, damping: 18, mass: 1 });
  const sy = useSpring(my, { stiffness: 40, damping: 18, mass: 1 });
  const orbX = useTransform(sx, (v) => `${v * 100}%`);
  const orbY = useTransform(sy, (v) => `${v * 100}%`);

  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    let nx = 0.5, ny = 0.35;
    const handle = (e: MouseEvent) => {
      nx = e.clientX / window.innerWidth;
      ny = e.clientY / window.innerHeight;
      if (!frame) {
        frame = requestAnimationFrame(() => {
          mx.set(nx);
          my.set(ny);
          frame = 0;
        });
      }
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handle);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [mx, my, enabled]);

  // Parallax for mihrab arch on scroll — rAF throttled
  useEffect(() => {
    if (!enabled) return;
    const el = wrapRef.current;
    if (!el) return;
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--scroll-y", `${window.scrollY}px`);
        frame = 0;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled]);

  // Pre-compute ember properties so they don't shuffle on each render
  const emberSeeds = useMemo(
    () =>
      Array.from({ length: embers }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        duration: 18 + Math.random() * 22,
        delay: -Math.random() * 30,
        drift: (Math.random() - 0.5) * 80,
        opacity: 0.3 + Math.random() * 0.5,
        warm: Math.random() > 0.65, // some are crimson, most are gold
      })),
    [embers]
  );

  const palette = TONE_PALETTE[tone];

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      style={{
        // Used by the mihrab parallax translate
        ["--scroll-y" as never]: "0px",
      }}
    >
      {/* Base aurora wash — plain divs (CSS animation only, no JS engine cost) */}
      <div
        className="absolute -top-1/3 -left-1/4 h-[80vh] w-[80vh] rounded-full blur-[80px] animate-aurora will-change-transform"
        style={{ background: palette.auroraA }}
      />
      <div
        className="absolute -bottom-1/3 -right-1/4 h-[70vh] w-[70vh] rounded-full blur-[80px] animate-aurora will-change-transform"
        style={{ background: palette.auroraB, animationDelay: "-12s" }}
      />

      {/* Mouse-tracked gold orb — desktop only */}
      {enabled && (
        <motion.div
          className="absolute h-[40vh] w-[40vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px] will-change-transform"
          style={{
            left: orbX,
            top: orbY,
            background: palette.cursorOrb,
          }}
        />
      )}

      {/* Mihrab arch silhouette — parallax background "shrine" */}
      {mihrab && (
        <div
          className="absolute left-1/2 top-[8vh] -translate-x-1/2 animate-mihrab will-change-transform"
          style={{
            transform: `translate(-50%, calc(8vh - var(--scroll-y) * 0.18))`,
          }}
        >
          <MihrabArch />
        </div>
      )}

      {/* Single rotating sacred-geometry seal (was two — too expensive) */}
      {geometry && enabled && (
        <div
          className="absolute left-1/2 top-1/2 h-[100vh] w-[100vh] -translate-x-1/2 -translate-y-1/2 animate-sacred-spin opacity-[0.07] will-change-transform"
        >
          <SacredSeal />
        </div>
      )}

      {/* Diagonal light rays — desktop only, smaller blur */}
      {enabled && (
        <>
          <div
            className="absolute -top-[10%] left-0 h-[140%] w-[60%] animate-ray-sweep will-change-transform"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(240,223,176,0.06) 40%, rgba(255,235,180,0.10) 50%, rgba(240,223,176,0.06) 60%, transparent 100%)",
              filter: "blur(4px)",
              mixBlendMode: "screen",
            }}
          />
          <div
            className="absolute -top-[10%] left-[25%] h-[140%] w-[40%] animate-ray-sweep-2 will-change-transform"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(232,125,60,0.05) 50%, transparent 100%)",
              filter: "blur(6px)",
              mixBlendMode: "screen",
            }}
          />
        </>
      )}

      {/* Drifting gold embers */}
      {emberSeeds.map((e) => (
        <span
          key={e.id}
          className="absolute bottom-0 rounded-full"
          style={{
            left: `${e.left}%`,
            width: `${e.size}px`,
            height: `${e.size}px`,
            background: e.warm
              ? "radial-gradient(circle, rgba(255,180,90,0.95) 0%, rgba(232,125,60,0.5) 40%, transparent 70%)"
              : "radial-gradient(circle, rgba(245,233,194,1) 0%, rgba(212,190,134,0.55) 40%, transparent 70%)",
            boxShadow: e.warm
              ? "0 0 8px rgba(232,125,60,0.6)"
              : "0 0 8px rgba(240,223,176,0.55)",
            animation: `ember-rise ${e.duration}s linear infinite`,
            animationDelay: `${e.delay}s`,
            ["--ember-drift" as never]: `${e.drift}px`,
            ["--ember-opacity" as never]: `${e.opacity}`,
          }}
        />
      ))}

      {/* Chiragh — burning oil lamp anchored at the bottom of the page */}
      {chiragh && <Chiragh side={chiraghSide} />}

      {/* Top + bottom vignette */}
      <div
        className="absolute inset-x-0 top-0 h-[35vh]"
        style={{
          background:
            "linear-gradient(to bottom, rgba(16,12,8,0.85) 0%, rgba(16,12,8,0.4) 50%, transparent 100%)",
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-[30vh]"
        style={{
          background:
            "linear-gradient(to top, rgba(16,12,8,0.85) 0%, rgba(16,12,8,0.4) 50%, transparent 100%)",
        }}
      />

      {/* Subtle film grain via SVG noise */}
      <div
        className="absolute inset-0 opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.9'/></svg>\")",
          backgroundSize: "180px 180px",
        }}
      />
    </div>
  );
}

/* ----------------------------------------------------------------
   SVG ornaments
   ---------------------------------------------------------------- */

function MihrabArch() {
  return (
    <svg
      width="900"
      height="1200"
      viewBox="0 0 900 1200"
      className="max-w-[90vw] opacity-[0.18]"
    >
      <defs>
        <linearGradient id="mihrab-stroke" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f0dfb0" stopOpacity="0.0" />
          <stop offset="25%" stopColor="#d4be86" stopOpacity="0.85" />
          <stop offset="60%" stopColor="#b09a68" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#6b0f1a" stopOpacity="0.0" />
        </linearGradient>
        <radialGradient id="mihrab-glow" cx="50%" cy="35%" r="50%">
          <stop offset="0%" stopColor="rgba(240,223,176,0.18)" />
          <stop offset="100%" stopColor="rgba(240,223,176,0)" />
        </radialGradient>
      </defs>
      {/* inner glow */}
      <ellipse cx="450" cy="450" rx="320" ry="380" fill="url(#mihrab-glow)" />
      {/* outer ogee arch */}
      <path
        d="M 80 1200
           L 80 540
           C 80 280, 260 60, 450 60
           C 640 60, 820 280, 820 540
           L 820 1200 Z"
        fill="none"
        stroke="url(#mihrab-stroke)"
        strokeWidth="1.2"
      />
      {/* nested arch */}
      <path
        d="M 160 1200
           L 160 560
           C 160 340, 300 160, 450 160
           C 600 160, 740 340, 740 560
           L 740 1200 Z"
        fill="none"
        stroke="url(#mihrab-stroke)"
        strokeWidth="0.8"
        opacity="0.6"
      />
      {/* keystone star */}
      <g transform="translate(450,310)" opacity="0.55">
        <EightPoint r={28} stroke="#d4be86" strokeWidth={0.8} />
      </g>
    </svg>
  );
}

function SacredSeal({ inner = false }: { inner?: boolean }) {
  // Tessellation of 8-pointed stars on a hex-ish grid (reduced for perf)
  const points: Array<[number, number]> = [];
  const cols = inner ? 3 : 4;
  const rows = inner ? 3 : 4;
  const step = 200;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * step + (r % 2 === 0 ? 0 : step / 2);
      const y = r * (step * 0.866);
      points.push([x, y]);
    }
  }
  const w = (cols + 0.5) * step;
  const h = rows * step * 0.866;
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="h-full w-full"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id={inner ? "seal-i" : "seal-o"} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d4be86" />
          <stop offset="100%" stopColor="#6b0f1a" />
        </linearGradient>
      </defs>
      {points.map(([x, y], i) => (
        <g key={i} transform={`translate(${x},${y})`}>
          <EightPoint
            r={inner ? 38 : 56}
            stroke={`url(#${inner ? "seal-i" : "seal-o"})`}
            strokeWidth={0.9}
          />
        </g>
      ))}
    </svg>
  );
}

function EightPoint({
  r,
  stroke,
  strokeWidth = 1,
}: {
  r: number;
  stroke: string;
  strokeWidth?: number;
}) {
  // 8-pointed star = two overlapping squares rotated 45°
  const half = r;
  const square = `
    M ${-half} ${-half} L ${half} ${-half}
    L ${half} ${half}   L ${-half} ${half} Z
  `;
  return (
    <g fill="none" stroke={stroke} strokeWidth={strokeWidth}>
      <path d={square} />
      <path d={square} transform="rotate(45)" />
      <circle r={r * 0.42} />
    </g>
  );
}

/* ----------------------------------------------------------------
   Chiragh — burning oil lamp anchored at the bottom of the viewport.
   A traditional clay diya (دیا) silhouette with a flickering flame
   and a wide, slowly-breathing warm light pool. Soothes "too dark"
   pages with organic, candle-like motion.
   ---------------------------------------------------------------- */
function Chiragh({ side = "center" }: { side?: "center" | "left" | "right" }) {
  const horizontal =
    side === "left" ? "left-[12%]" : side === "right" ? "right-[12%]" : "left-1/2 -translate-x-1/2";

  return (
    <div className={`absolute bottom-0 ${horizontal} w-0`}>
      {/* Massive warm light pool — illuminates the entire lower half */}
      <div
        className="absolute bottom-0 left-1/2 h-[100vh] w-[140vw] -translate-x-1/2 animate-chiragh-pool"
        style={{
          background:
            "radial-gradient(ellipse 60% 100% at 50% 100%, rgba(255,170,80,0.22) 0%, rgba(232,125,60,0.14) 18%, rgba(180,80,40,0.08) 38%, rgba(107,15,26,0.04) 60%, transparent 80%)",
          mixBlendMode: "screen",
          filter: "blur(20px)",
        }}
      />

      {/* Inner halo right around the wick — brighter, faster breathing */}
      <div
        className="absolute bottom-[110px] left-1/2 h-[60vh] w-[60vh] -translate-x-1/2 animate-flame-glow"
        style={{
          background:
            "radial-gradient(circle, rgba(255,210,140,0.55) 0%, rgba(255,160,70,0.30) 18%, rgba(232,125,60,0.14) 40%, transparent 70%)",
          mixBlendMode: "screen",
          filter: "blur(30px)",
        }}
      />

      {/* The lamp + flame SVG */}
      <svg
        width="220"
        height="200"
        viewBox="0 0 220 200"
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{ overflow: "visible" }}
      >
        <defs>
          <linearGradient id="lamp-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3a2a16" />
            <stop offset="55%" stopColor="#1c140a" />
            <stop offset="100%" stopColor="#0a0604" />
          </linearGradient>
          <linearGradient id="lamp-rim" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#b89b5e" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#6e5530" stopOpacity="0.4" />
          </linearGradient>
          <radialGradient id="flame-grad" cx="50%" cy="80%" r="60%">
            <stop offset="0%" stopColor="#fff8e1" />
            <stop offset="20%" stopColor="#ffd98a" />
            <stop offset="50%" stopColor="#ff9a3c" />
            <stop offset="80%" stopColor="#c2461d" />
            <stop offset="100%" stopColor="#6b0f1a" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="flame-core" cx="50%" cy="85%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="40%" stopColor="#fff2c8" />
            <stop offset="100%" stopColor="#ffaa55" stopOpacity="0" />
          </radialGradient>
          <filter id="flame-blur">
            <feGaussianBlur stdDeviation="1.4" />
          </filter>
        </defs>

        {/* Drip tray base */}
        <ellipse cx="110" cy="195" rx="95" ry="6" fill="rgba(0,0,0,0.55)" />

        {/* Lamp body — traditional diya teardrop silhouette */}
        <path
          d="M 40 178
             Q 30 168 32 158
             Q 35 142 60 138
             L 95 138
             Q 110 110 130 138
             L 165 138
             Q 188 142 188 158
             Q 188 172 178 180
             Q 160 192 110 193
             Q 60 192 40 178 Z"
          fill="url(#lamp-body)"
        />
        {/* Rim highlight */}
        <path
          d="M 40 178
             Q 30 168 32 158
             Q 35 142 60 138
             L 95 138
             Q 110 110 130 138
             L 165 138
             Q 188 142 188 158"
          fill="none"
          stroke="url(#lamp-rim)"
          strokeWidth="1.2"
        />
        {/* Tiny gold reflection on the spout */}
        <path
          d="M 100 130 Q 110 118 120 130"
          fill="none"
          stroke="#d6bd86"
          strokeWidth="0.8"
          opacity="0.6"
        />

        {/* Wick (small dark sliver under the flame) */}
        <rect x="108" y="118" width="4" height="14" fill="#2a1a0a" />

        {/* Outer flame body — flickers */}
        <g className="animate-flame-flicker" style={{ transformBox: "fill-box" }}>
          <path
            d="M 110 122
               C 96 100, 96 78, 110 50
               C 124 78, 124 100, 110 122 Z"
            fill="url(#flame-grad)"
            filter="url(#flame-blur)"
          />
          {/* Bright inner core */}
          <path
            d="M 110 122
               C 102 108, 102 92, 110 72
               C 118 92, 118 108, 110 122 Z"
            fill="url(#flame-core)"
          />
          {/* Hot white center */}
          <ellipse cx="110" cy="112" rx="3" ry="9" fill="#fffceb" opacity="0.95" />
        </g>
      </svg>

      {/* Page-wide warm tint that breathes with the flame */}
      <div
        className="fixed inset-0 animate-warm-tint"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(255,150,70,0.06) 0%, transparent 60%)",
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

const TONE_PALETTE: Record<
  Tone,
  { auroraA: string; auroraB: string; cursorOrb: string }
> = {
  gold: {
    auroraA:
      "radial-gradient(circle at 30% 30%, rgba(212,190,134,0.18), transparent 60%)",
    auroraB:
      "radial-gradient(circle at 70% 70%, rgba(107,15,26,0.22), transparent 60%)",
    cursorOrb:
      "radial-gradient(circle, rgba(240,223,176,0.18) 0%, rgba(212,190,134,0.06) 40%, transparent 70%)",
  },
  crimson: {
    auroraA:
      "radial-gradient(circle at 25% 35%, rgba(139,15,26,0.28), transparent 60%)",
    auroraB:
      "radial-gradient(circle at 75% 65%, rgba(212,190,134,0.14), transparent 60%)",
    cursorOrb:
      "radial-gradient(circle, rgba(232,125,60,0.16) 0%, rgba(139,15,26,0.08) 40%, transparent 70%)",
  },
  twilight: {
    auroraA:
      "radial-gradient(circle at 20% 30%, rgba(60,40,90,0.22), transparent 60%)",
    auroraB:
      "radial-gradient(circle at 80% 70%, rgba(212,190,134,0.12), transparent 60%)",
    cursorOrb:
      "radial-gradient(circle, rgba(180,162,200,0.14) 0%, rgba(60,40,90,0.06) 40%, transparent 70%)",
  },
};
