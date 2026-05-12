import { useEffect, useRef, useMemo } from "react";
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
  embers = 22,
}: SacredAtmosphereProps) {
  const wrapRef = useRef<HTMLDivElement>(null);

  // Mouse-tracked aurora orb
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.35);
  const sx = useSpring(mx, { stiffness: 40, damping: 18, mass: 1 });
  const sy = useSpring(my, { stiffness: 40, damping: 18, mass: 1 });
  const orbX = useTransform(sx, (v) => `${v * 100}%`);
  const orbY = useTransform(sy, (v) => `${v * 100}%`);

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      mx.set(e.clientX / window.innerWidth);
      my.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", handle, { passive: true });
    return () => window.removeEventListener("mousemove", handle);
  }, [mx, my]);

  // Parallax for mihrab arch on scroll
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onScroll = () => {
      const y = window.scrollY;
      el.style.setProperty("--scroll-y", `${y}px`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
      {/* Base aurora wash — two enormous color blobs drifting */}
      <motion.div
        className="absolute -top-1/3 -left-1/4 h-[140vh] w-[140vh] rounded-full blur-[160px] animate-aurora"
        style={{ background: palette.auroraA }}
      />
      <motion.div
        className="absolute -bottom-1/3 -right-1/4 h-[120vh] w-[120vh] rounded-full blur-[180px] animate-aurora"
        style={{ background: palette.auroraB, animationDelay: "-12s" }}
      />

      {/* Mouse-tracked gold orb — feels alive, follows cursor with spring */}
      <motion.div
        className="absolute h-[55vh] w-[55vh] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{
          left: orbX,
          top: orbY,
          background: palette.cursorOrb,
        }}
      />

      {/* Mihrab arch silhouette — parallax background "shrine" */}
      {mihrab && (
        <div
          className="absolute left-1/2 top-[8vh] -translate-x-1/2 animate-mihrab"
          style={{
            transform: `translate(-50%, calc(8vh - var(--scroll-y) * 0.18))`,
          }}
        >
          <MihrabArch />
        </div>
      )}

      {/* Rotating sacred-geometry seal — large faint tessellation */}
      {geometry && (
        <>
          <div
            className="absolute left-1/2 top-1/2 h-[180vh] w-[180vh] -translate-x-1/2 -translate-y-1/2 animate-sacred-spin opacity-[0.08]"
            style={{
              transform: `translate(-50%, calc(-50% + var(--scroll-y) * 0.04px))`,
            }}
          >
            <SacredSeal />
          </div>
          <div className="absolute left-1/2 top-1/2 h-[110vh] w-[110vh] -translate-x-1/2 -translate-y-1/2 animate-sacred-spin-rev opacity-[0.06]">
            <SacredSeal inner />
          </div>
        </>
      )}

      {/* Diagonal light rays — sweep slowly across the viewport */}
      <div
        className="absolute -top-[10%] left-0 h-[140%] w-[60%] animate-ray-sweep"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(240,223,176,0.06) 40%, rgba(255,235,180,0.10) 50%, rgba(240,223,176,0.06) 60%, transparent 100%)",
          filter: "blur(8px)",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="absolute -top-[10%] left-[25%] h-[140%] w-[40%] animate-ray-sweep-2"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(232,125,60,0.05) 50%, transparent 100%)",
          filter: "blur(12px)",
          mixBlendMode: "screen",
        }}
      />

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
  // Tessellation of 8-pointed stars on a hex-ish grid
  const points: Array<[number, number]> = [];
  const cols = inner ? 5 : 7;
  const rows = inner ? 5 : 7;
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
