import { useEffect } from "react";

/**
 * Bahoo cursor — a flowing trail of "ھُو" glyphs following the mouse,
 * each one cycling through gold → crimson → blood-red → gold,
 * with one glyph offset from the next so the tail shows a moving gradient.
 *
 * Implemented as direct DOM manipulation in a single useEffect — no React
 * re-renders per frame. Runs on every page (mounted in App.tsx).
 */
export function CursorTrail() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // On touch devices we'll trail the *finger* instead of skipping entirely.
    const isTouch =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    const COUNT = 12;
    const SIZES = [34, 30, 27, 24, 22, 20, 18, 17, 16, 15, 14, 13];

    // Smooth color interpolation across a gold→red→gold palette.
    const palette = [
      [240, 223, 176], // champagne
      [232, 201, 122], // warm gold
      [212, 174, 100], // antique gold
      [232, 125,  50], // amber
      [240,  80,  30], // ember orange
      [194,  50,  25], // burnt red
      [138,  15,  26], // crimson
      [194,  50,  25], // burnt red
      [232, 125,  50], // amber
      [232, 201, 122], // warm gold
    ];
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const colorAt = (t: number) => {
      const segs = palette.length;
      const scaled = ((t % 1) + 1) % 1 * segs;
      const i = Math.floor(scaled);
      const f = scaled - i;
      const a = palette[i];
      const b = palette[(i + 1) % segs];
      const r = Math.round(lerp(a[0], b[0], f));
      const g = Math.round(lerp(a[1], b[1], f));
      const bl = Math.round(lerp(a[2], b[2], f));
      return `rgb(${r}, ${g}, ${bl})`;
    };

    type Glyph = { el: HTMLDivElement; x: number; y: number };
    const glyphs: Glyph[] = [];

    for (let i = 0; i < COUNT; i++) {
      const el = document.createElement("div");
      el.textContent = "ھُو";
      el.setAttribute("dir", "rtl");
      el.setAttribute("aria-hidden", "true");
      el.style.position = "fixed";
      el.style.top = "0";
      el.style.left = "0";
      el.style.pointerEvents = "none";
      el.style.userSelect = "none";
      el.style.zIndex = "999999";
      el.style.fontFamily =
        '"Noto Nastaliq Urdu", "Scheherazade New", "Amiri", serif';
      el.style.fontSize = `${SIZES[i]}px`;
      el.style.fontWeight = "400";
      el.style.lineHeight = "1";
      el.style.willChange = "transform, color";
      el.style.transform = "translate3d(-9999px,-9999px,0)";
      el.style.opacity = String(1 - i * 0.055);
      document.body.appendChild(el);
      glyphs.push({ el, x: -9999, y: -9999 });
    }

    let mx = -9999;
    let my = -9999;
    let touchActive = false;
    let fadeStart = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0] || e.changedTouches[0];
      if (!t) return;
      mx = t.clientX;
      my = t.clientY;
      touchActive = true;
      fadeStart = performance.now();
    };
    const onTouchEnd = () => {
      // Keep tail visible briefly then fade — start the fade timer
      fadeStart = performance.now();
      touchActive = false;
    };

    if (isTouch) {
      window.addEventListener("touchstart", onTouch, { passive: true });
      window.addEventListener("touchmove", onTouch, { passive: true });
      window.addEventListener("touchend", onTouchEnd, { passive: true });
    } else {
      window.addEventListener("mousemove", onMove, { passive: true });
    }

    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const cycleSeconds = 5;

      // On touch devices fade glyphs out 0.6s after finger lifts
      let fade = 1;
      if (isTouch && !touchActive && fadeStart > 0) {
        const sinceLift = (now - fadeStart) / 1000;
        fade = Math.max(0, 1 - sinceLift / 0.6);
      }

      let prevX = mx;
      let prevY = my;
      for (let i = 0; i < glyphs.length; i++) {
        const g = glyphs[i];
        const ease = 0.28 - i * 0.012;
        g.x += (prevX - g.x) * ease;
        g.y += (prevY - g.y) * ease;

        const t = elapsed / cycleSeconds + i * 0.07;
        const color = colorAt(t);
        g.el.style.color = color;
        g.el.style.textShadow = `0 0 ${10 + (12 - i)}px ${color}, 0 0 ${20 + (12 - i) * 2}px ${color}`;
        g.el.style.transform = `translate3d(${g.x - 10}px, ${g.y - 16}px, 0)`;
        g.el.style.opacity = String((1 - i * 0.055) * fade);

        prevX = g.x;
        prevY = g.y;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("touchend", onTouchEnd);
      glyphs.forEach((g) => g.el.remove());
    };
  }, []);

  return null;
}
