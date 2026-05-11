import { useEffect, useRef } from "react";

/**
 * Bahoo cursor — a flock of "ھُو" glyphs that trail the pointer with
 * easing. Colors cycle gold → crimson → blood-red → champagne, mirroring the
 * heartbeat zikr at the top of the hero. Pure DOM/RAF, no React re-renders.
 */
export function CursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip on touch devices — no native cursor to trail.
    const isTouch =
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0);
    if (isTouch) return;

    const container = containerRef.current;
    if (!container) return;

    const COUNT = 10;                // number of trailing glyphs
    const EASE = 0.20;               // chase speed (higher = snappier)
    const COLORS = [
      "#f0dfb0",  // champagne (lead)
      "#e8c97a",
      "#d4be86",
      "#c2461d",
      "#8a0f1a",
      "#6b0f1a",
      "#d4be86",
    ];

    type Node = { el: HTMLSpanElement; x: number; y: number };
    const nodes: Node[] = [];

    for (let i = 0; i < COUNT; i++) {
      const el = document.createElement("span");
      el.textContent = "ھُو";
      el.dir = "rtl";
      el.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        font-family: "Noto Nastaliq Urdu", serif;
        font-size: ${28 - i * 2}px;
        line-height: 1;
        color: ${COLORS[i % COLORS.length]};
        text-shadow:
          0 0 ${14 - i}px ${COLORS[i % COLORS.length]},
          0 0 ${28 - i * 2}px ${COLORS[i % COLORS.length]};
        opacity: ${1 - i * 0.07};
        pointer-events: none;
        will-change: transform, color;
        transform: translate3d(-200px,-200px,0);
        z-index: 99999;
        user-select: none;
        font-weight: 400;
      `;
      container.appendChild(el);
      nodes.push({ el, x: -200, y: -200 });
    }

    let mouseX = -100;
    let mouseY = -100;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    /**
     * Smoothly interpolate between palette stops (champagne → amber → crimson → gold)
     * over a 6-second cycle — same rhythm as the hero zikr-color animation.
     */
    const palette = [
      [240, 223, 176], // champagne
      [232, 201, 122], // warm gold
      [212, 174, 100], // antique gold
      [194, 70, 29],   // amber red
      [138, 15, 26],   // crimson
      [194, 70, 29],   // amber red
      [232, 201, 122], // warm gold
    ];
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const colorAt = (t: number): string => {
      const seg = palette.length;
      const scaled = (t % 1) * seg;
      const i = Math.floor(scaled);
      const f = scaled - i;
      const a = palette[i];
      const b = palette[(i + 1) % seg];
      const r = Math.round(lerp(a[0], b[0], f));
      const g = Math.round(lerp(a[1], b[1], f));
      const bl = Math.round(lerp(a[2], b[2], f));
      return `rgb(${r}, ${g}, ${bl})`;
    };

    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = (now - start) / 1000; // seconds
      const cycle = 6; // seconds per full color cycle (same as hero zikr-color)

      // Lead node chases the actual cursor; each subsequent chases the one ahead.
      let prevX = mouseX;
      let prevY = mouseY;
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += (prevX - n.x) * EASE;
        n.y += (prevY - n.y) * EASE;

        // Each glyph offset slightly in the cycle so the tail shows a gradient of colors
        const t = (elapsed / cycle + i * 0.08) % 1;
        const color = colorAt(t);
        n.el.style.color = color;
        n.el.style.textShadow = `0 0 ${12 - i}px ${color}, 0 0 ${22 - i * 2}px ${color}`;
        n.el.style.transform = `translate3d(${n.x - 8}px, ${n.y - 12}px, 0)`;

        prevX = n.x;
        prevY = n.y;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      nodes.forEach((n) => n.el.remove());
    };
  }, []);

  return <div ref={containerRef} aria-hidden="true" />;
}
