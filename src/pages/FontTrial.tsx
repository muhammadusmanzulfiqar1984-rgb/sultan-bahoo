import { useState, useMemo } from "react";
import { motion } from "motion/react";

/* ----------------------------------------------------------------
   Font option catalogue
   Each option lists Google Fonts to load + the CSS family stacks for
   English display, English body, and Urdu/Arabic Nastaliq.
   Pick one and we'll apply it site-wide.
   ---------------------------------------------------------------- */

type FontOption = {
  id: string;
  name: string;
  vibe: string;
  google: string; // Google Fonts CSS2 query (without the base URL)
  display: string;
  body: string;
  nastaliq: string;
  displayWeight?: number;
  bodyWeight?: number;
};

const OPTIONS: FontOption[] = [
  {
    id: "current",
    name: "Current — Fraunces × Inter Tight × Noto Nastaliq",
    vibe: "Cinematic editorial · variable serif · warm",
    google:
      "Fraunces:ital,opsz,wght@0,9..144,200..700;1,9..144,200..700&family=Inter+Tight:wght@200..700&family=Noto+Nastaliq+Urdu:wght@400",
    display: '"Fraunces", serif',
    body: '"Inter Tight", system-ui, sans-serif',
    nastaliq: '"Noto Nastaliq Urdu", serif',
  },
  {
    id: "cormorant",
    name: "Cormorant Garamond × Manrope × Jameel Noori",
    vibe: "Classical Renaissance · slender · scholarly",
    google:
      "Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Manrope:wght@200..800&family=Noto+Nastaliq+Urdu:wght@400",
    display: '"Cormorant Garamond", serif',
    body: '"Manrope", system-ui, sans-serif',
    nastaliq: '"Noto Nastaliq Urdu", serif',
    displayWeight: 400,
    bodyWeight: 300,
  },
  {
    id: "playfair",
    name: "Playfair Display × Outfit × Gulzar",
    vibe: "High contrast luxury · magazine cover",
    google:
      "Playfair+Display:ital,wght@0,400..900;1,400..900&family=Outfit:wght@100..900&family=Gulzar&family=Noto+Nastaliq+Urdu:wght@400",
    display: '"Playfair Display", serif',
    body: '"Outfit", system-ui, sans-serif',
    nastaliq: '"Gulzar", "Noto Nastaliq Urdu", serif',
    displayWeight: 500,
  },
  {
    id: "ibarra",
    name: "Ibarra Real Nova × DM Sans × Aref Ruqaa",
    vibe: "Spanish Old-Style · poetic · grounded",
    google:
      "Ibarra+Real+Nova:ital,wght@0,400..700;1,400..700&family=DM+Sans:opsz,wght@9..40,200..900&family=Aref+Ruqaa:wght@400;700&family=Noto+Nastaliq+Urdu:wght@400",
    display: '"Ibarra Real Nova", serif',
    body: '"DM Sans", system-ui, sans-serif',
    nastaliq: '"Aref Ruqaa", "Noto Nastaliq Urdu", serif',
  },
  {
    id: "spectral",
    name: "Spectral × Sora × Scheherazade New",
    vibe: "Long-form readable · soft humanist",
    google:
      "Spectral:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=Sora:wght@100..800&family=Scheherazade+New:wght@400;700&family=Noto+Nastaliq+Urdu:wght@400",
    display: '"Spectral", serif',
    body: '"Sora", system-ui, sans-serif',
    nastaliq: '"Scheherazade New", "Noto Nastaliq Urdu", serif',
  },
  {
    id: "marcellus",
    name: "Marcellus × Jost × Mirza",
    vibe: "Roman inscription · monumental · spaced",
    google:
      "Marcellus&family=Jost:ital,wght@0,100..900;1,100..900&family=Mirza:wght@400;500;600;700&family=Noto+Nastaliq+Urdu:wght@400",
    display: '"Marcellus", serif',
    body: '"Jost", system-ui, sans-serif',
    nastaliq: '"Mirza", "Noto Nastaliq Urdu", serif',
  },
  {
    id: "cinzel",
    name: "Cinzel × Cormorant × Reem Kufi",
    vibe: "Sacred capitals · cathedral · ceremonial",
    google:
      "Cinzel:wght@400..900&family=Cormorant:ital,wght@0,300..700;1,300..700&family=Reem+Kufi:wght@400..700&family=Noto+Nastaliq+Urdu:wght@400",
    display: '"Cinzel", serif',
    body: '"Cormorant", serif',
    nastaliq: '"Reem Kufi", "Noto Nastaliq Urdu", serif',
    displayWeight: 500,
  },
  {
    id: "ebgaramond",
    name: "EB Garamond × Inter × Amiri",
    vibe: "Liturgical manuscript · timeless · warm",
    google:
      "EB+Garamond:ital,wght@0,400..800;1,400..800&family=Inter:wght@100..900&family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Noto+Nastaliq+Urdu:wght@400",
    display: '"EB Garamond", serif',
    body: '"Inter", system-ui, sans-serif',
    nastaliq: '"Amiri", "Noto Nastaliq Urdu", serif',
  },

  /* ---------- New direction: modern, distinctive, off-the-beaten-path ---------- */

  {
    id: "tenor",
    name: "Tenor Sans × Albert Sans × Markazi Text",
    vibe: "Whispered modernism · airy capitals · serene",
    google:
      "Tenor+Sans&family=Albert+Sans:ital,wght@0,100..900;1,100..900&family=Markazi+Text:wght@400..700&family=Noto+Nastaliq+Urdu:wght@400",
    display: '"Tenor Sans", sans-serif',
    body: '"Albert Sans", system-ui, sans-serif',
    nastaliq: '"Markazi Text", "Noto Nastaliq Urdu", serif',
  },
  {
    id: "italiana",
    name: "Italiana × Cormorant Infant × Lateef",
    vibe: "Vogue couture · ultra-thin display · romantic",
    google:
      "Italiana&family=Cormorant+Infant:ital,wght@0,300..700;1,300..700&family=Lateef:wght@200..800&family=Noto+Nastaliq+Urdu:wght@400",
    display: '"Italiana", serif',
    body: '"Cormorant Infant", serif',
    nastaliq: '"Lateef", "Noto Nastaliq Urdu", serif',
  },
  {
    id: "syne",
    name: "Syne × Space Grotesk × Vibes",
    vibe: "Brutalist contemporary · sculptural · bold",
    google:
      "Syne:wght@400..800&family=Space+Grotesk:wght@300..700&family=Vibes&family=Noto+Nastaliq+Urdu:wght@400",
    display: '"Syne", sans-serif',
    body: '"Space Grotesk", system-ui, sans-serif',
    nastaliq: '"Vibes", "Noto Nastaliq Urdu", cursive',
    displayWeight: 600,
  },
  {
    id: "bodoni",
    name: "Bodoni Moda × Public Sans × Harmattan",
    vibe: "Editorial fashion · razor contrast · regal",
    google:
      "Bodoni+Moda:ital,opsz,wght@0,6..96,400..900;1,6..96,400..900&family=Public+Sans:ital,wght@0,100..900;1,100..900&family=Harmattan:wght@400;500;600;700&family=Noto+Nastaliq+Urdu:wght@400",
    display: '"Bodoni Moda", serif',
    body: '"Public Sans", system-ui, sans-serif',
    nastaliq: '"Harmattan", "Noto Nastaliq Urdu", serif',
  },
  {
    id: "newsreader",
    name: "Newsreader × Geist × Lalezar",
    vibe: "Modern editorial serif · soft variable · grounded",
    google:
      "Newsreader:ital,opsz,wght@0,6..72,200..800;1,6..72,200..800&family=Geist:wght@100..900&family=Lalezar&family=Noto+Nastaliq+Urdu:wght@400",
    display: '"Newsreader", serif',
    body: '"Geist", system-ui, sans-serif',
    nastaliq: '"Lalezar", "Noto Nastaliq Urdu", serif',
  },
  {
    id: "trajan",
    name: "Cormorant Unicase × Cardo × El Messiri",
    vibe: "Roman epigraphy meets Arabic kufi · monumental",
    google:
      "Cormorant+Unicase:wght@300..700&family=Cardo:ital,wght@0,400;0,700;1,400&family=El+Messiri:wght@400..700&family=Noto+Nastaliq+Urdu:wght@400",
    display: '"Cormorant Unicase", serif',
    body: '"Cardo", serif',
    nastaliq: '"El Messiri", "Noto Nastaliq Urdu", serif',
    displayWeight: 500,
  },
  {
    id: "instrument",
    name: "Instrument Serif × Geist Mono × Gulzar",
    vibe: "Stencil-modern · technical poetry · stark",
    google:
      "Instrument+Serif:ital@0;1&family=Geist+Mono:wght@100..900&family=Gulzar&family=Noto+Nastaliq+Urdu:wght@400",
    display: '"Instrument Serif", serif',
    body: '"Geist Mono", ui-monospace, monospace',
    nastaliq: '"Gulzar", "Noto Nastaliq Urdu", serif',
  },
  {
    id: "yeseva",
    name: "Yeseva One × Manrope × Reem Kufi Ink",
    vibe: "Curvaceous display · velvet headlines · ornate",
    google:
      "Yeseva+One&family=Manrope:wght@200..800&family=Reem+Kufi+Ink&family=Noto+Nastaliq+Urdu:wght@400",
    display: '"Yeseva One", serif',
    body: '"Manrope", system-ui, sans-serif',
    nastaliq: '"Reem Kufi Ink", "Noto Nastaliq Urdu", serif',
  },

  /* ---------- SLIM & SMART — refined hairline Urdu pairings ---------- */

  {
    id: "slim-noto",
    name: "Cormorant Garamond × Inter × Noto Naskh Arabic 100",
    vibe: "Hairline naskh · razor-thin · jewellery-box elegant",
    google:
      "Cormorant+Garamond:ital,wght@0,300;1,300&family=Inter:wght@100..400&family=Noto+Naskh+Arabic:wght@400..700",
    display: '"Cormorant Garamond", serif',
    body: '"Inter", system-ui, sans-serif',
    nastaliq: '"Noto Naskh Arabic", serif',
    displayWeight: 300,
    bodyWeight: 200,
  },
  {
    id: "slim-jameel",
    name: "Italiana × Albert Sans × Noto Sans Arabic ExtraLight",
    vibe: "Couture sans-Arabic · ultra-thin · runway",
    google:
      "Italiana&family=Albert+Sans:wght@100..400&family=Noto+Sans+Arabic:wght@100..400",
    display: '"Italiana", serif',
    body: '"Albert Sans", system-ui, sans-serif',
    nastaliq: '"Noto Sans Arabic", system-ui, sans-serif',
    bodyWeight: 200,
  },
  {
    id: "slim-amiri",
    name: "Tenor Sans × Cormorant Infant × Amiri 400 italic",
    vibe: "Whispered Quranic naskh · airy · prayerful",
    google:
      "Tenor+Sans&family=Cormorant+Infant:ital,wght@0,300;1,300&family=Amiri:ital,wght@1,400",
    display: '"Tenor Sans", sans-serif',
    body: '"Cormorant Infant", serif',
    nastaliq: '"Amiri", serif',
  },
  {
    id: "slim-mada",
    name: "Newsreader Light × Geist Light × Mada 200",
    vibe: "Modern Arabic geometric · slim variable · clean",
    google:
      "Newsreader:opsz,wght@6..72,200..400&family=Geist:wght@100..400&family=Mada:wght@200..400",
    display: '"Newsreader", serif',
    body: '"Geist", system-ui, sans-serif',
    nastaliq: '"Mada", system-ui, sans-serif',
    displayWeight: 200,
    bodyWeight: 200,
  },
  {
    id: "slim-jost",
    name: "Cormorant SC × Jost Light × IBM Plex Sans Arabic 100",
    vibe: "Small-caps Latin × hairline Arabic plex · tech-luxe",
    google:
      "Cormorant+SC:wght@300..500&family=Jost:wght@100..400&family=IBM+Plex+Sans+Arabic:wght@100..400",
    display: '"Cormorant SC", serif',
    body: '"Jost", system-ui, sans-serif',
    nastaliq: '"IBM Plex Sans Arabic", system-ui, sans-serif',
    displayWeight: 300,
    bodyWeight: 200,
  },
  {
    id: "slim-readex",
    name: "Marcellus × Albert Sans × Readex Pro 200",
    vibe: "Slim Latin caps × variable thin Readex Arabic",
    google:
      "Marcellus&family=Albert+Sans:wght@100..400&family=Readex+Pro:wght@160..400",
    display: '"Marcellus", serif',
    body: '"Albert Sans", system-ui, sans-serif',
    nastaliq: '"Readex Pro", system-ui, sans-serif',
    bodyWeight: 200,
  },
  {
    id: "slim-changa",
    name: "Bodoni Moda × Public Sans Thin × Changa 200",
    vibe: "Razor-contrast Latin × variable thin Changa Arabic",
    google:
      "Bodoni+Moda:opsz,wght@6..96,400&family=Public+Sans:wght@100..400&family=Changa:wght@200..400",
    display: '"Bodoni Moda", serif',
    body: '"Public Sans", system-ui, sans-serif',
    nastaliq: '"Changa", system-ui, sans-serif',
    bodyWeight: 200,
  },

  /* ---------- APPLE-INSPIRED — SF Pro / SF Arabic feel ---------- */

  {
    id: "apple-system",
    name: "Apple System (SF Pro / SF Arabic — native)",
    vibe: "Pure Apple · uses your device's actual SF Pro & SF Arabic",
    google: "Inter:wght@100..900", // fallback only
    display:
      '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif',
    body:
      '-apple-system, BlinkMacSystemFont, "SF Pro Text", system-ui, sans-serif',
    nastaliq:
      '"SF Arabic", "SF Arabic Rounded", -apple-system, "Geeza Pro", system-ui, sans-serif',
    displayWeight: 300,
    bodyWeight: 300,
  },
  {
    id: "apple-inter",
    name: "Inter × Inter × IBM Plex Sans Arabic (closest cross-platform SF)",
    vibe: "SF Pro look-alike · works everywhere · neutral · modern",
    google:
      "Inter:wght@100..900&family=IBM+Plex+Sans+Arabic:wght@100..700",
    display: '"Inter", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
    nastaliq: '"IBM Plex Sans Arabic", system-ui, sans-serif',
    displayWeight: 300,
    bodyWeight: 300,
  },
  {
    id: "apple-vazir",
    name: "Inter Tight × Inter × Vazirmatn (SF Arabic dupe)",
    vibe: "Vazirmatn is the closest free clone of SF Arabic",
    google:
      "Inter+Tight:wght@100..900&family=Inter:wght@100..900&family=Vazirmatn:wght@100..900",
    display: '"Inter Tight", system-ui, sans-serif',
    body: '"Inter", system-ui, sans-serif',
    nastaliq: '"Vazirmatn", system-ui, sans-serif',
    displayWeight: 300,
    bodyWeight: 300,
  },
  {
    id: "apple-geist",
    name: "Geist × Geist × Noto Sans Arabic (Vercel's SF-style)",
    vibe: "Geist is Vercel's SF Pro alternative · pristine · technical",
    google:
      "Geist:wght@100..900&family=Noto+Sans+Arabic:wght@100..900",
    display: '"Geist", system-ui, sans-serif',
    body: '"Geist", system-ui, sans-serif',
    nastaliq: '"Noto Sans Arabic", system-ui, sans-serif',
    displayWeight: 300,
    bodyWeight: 300,
  },
];

/* Sample content reused across all previews so comparison is honest */
const SAMPLE = {
  eyebrow: "عظیم تجلّی · The Great Manifestation",
  urduTitle: "سلطان العارفین",
  enTitle: "Sultan-ul-Arifeen",
  urduSub: "ھُو — وہ جو اللہ کے ساتھ ہے",
  enSub: "Hoo — the one who exists with Allah",
  urduBody:
    "حضرت سلطان باہُو (رحمہ اللہ) محض ایک صوفی نہیں تھے؛ وہ صدیوں پہلے نورِ الٰہی کے معمار تھے۔ ان کی تعلیمات ذکرِ ھُو، راہِ فقر اور مرشد کامل کے گرد گردش کرتی ہیں۔",
  enBody:
    "Not merely a mystic — the architect of divine love centuries before the world knew light. His teachings centre on Zikr-e-Hoo, the path of Faqr and the Murshid Kamil.",
  numeric: "1630 — 1691  ·  +92 (42) HSBF-Hoo  ·  140+ Manuscripts",
  cta: "Become a Pillar · ستون بن جائیں",
};

export function FontTrial() {
  const [selectedId, setSelectedId] = useState<string>("current");

  // Inject all Google Fonts links once, in parallel
  const googleHref = useMemo(() => {
    const families = OPTIONS.map((o) => o.google).join("&family=");
    return `https://fonts.googleapis.com/css2?family=${families}&display=swap`;
  }, []);

  return (
    <div className="relative min-h-screen bg-sacred-black pt-32 pb-24 px-6 text-ivory">
      {/* Load every candidate family in one go */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      <link rel="stylesheet" href={googleHref} />

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="mb-16 text-center">
          <span className="text-gold-antique uppercase text-[10px] tracking-[0.8em] font-bold block mb-6">
            تجربۂ خط · Typography Trial
          </span>
          <h1 className="font-nastaliq text-5xl md:text-7xl mb-2 leading-[1.3]" dir="rtl">
            خطوط کا انتخاب
          </h1>
          <h2 className="text-2xl md:text-4xl font-serif italic mb-6">Choose a Font Voice</h2>
          <p className="text-ivory/55 max-w-2xl mx-auto text-base font-light italic font-serif">
            Eight curated combinations of English display, English body and Urdu Nastaliq.
            Click a card on the left to preview it on the right with real site content.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Selector */}
          <aside className="lg:col-span-4 space-y-4 lg:sticky lg:top-32 lg:self-start lg:max-h-[80vh] lg:overflow-y-auto pr-2 scrollbar-hide">
            {OPTIONS.map((opt) => {
              const active = opt.id === selectedId;
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedId(opt.id)}
                  className={`group relative w-full text-left p-6 rounded-3xl border transition-all duration-500 overflow-hidden ${
                    active
                      ? "border-gold-antique/60 bg-white/[0.04] shadow-[0_0_40px_rgba(180,162,105,0.15)]"
                      : "border-white/5 bg-white/[0.015] hover:border-gold-antique/25"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <span className="text-[8px] uppercase tracking-[0.4em] font-bold text-gold-antique/70">
                      Option · {opt.id.toUpperCase()}
                    </span>
                    {active && (
                      <span className="text-[8px] uppercase tracking-[0.4em] font-bold text-gold-antique">
                        ● Active
                      </span>
                    )}
                  </div>

                  {/* Show the option's NAME rendered in its OWN display family */}
                  <div
                    className="text-xl leading-tight mb-2"
                    style={{
                      fontFamily: opt.display,
                      fontWeight: opt.displayWeight ?? 400,
                      color: active ? "#f0e0b0" : "#c9b378",
                    }}
                  >
                    {opt.name}
                  </div>

                  <div
                    className="text-xs"
                    style={{
                      fontFamily: opt.body,
                      fontWeight: opt.bodyWeight ?? 300,
                      color: "#8a7a4d",
                    }}
                  >
                    {opt.vibe}
                  </div>

                  {/* Tiny inline glyph trio */}
                  <div className="mt-4 flex items-baseline gap-4 border-t border-white/5 pt-3">
                    <span
                      style={{ fontFamily: opt.display, fontSize: 22, color: "#d4be86" }}
                    >
                      Aa
                    </span>
                    <span
                      style={{ fontFamily: opt.body, fontSize: 16, color: "#b09a68" }}
                    >
                      abc 123
                    </span>
                    <span
                      style={{ fontFamily: opt.nastaliq, fontSize: 22, color: "#d4be86" }}
                      dir="rtl"
                    >
                      ھُو
                    </span>
                  </div>
                </button>
              );
            })}
          </aside>

          {/* Live preview */}
          <section className="lg:col-span-8">
            {OPTIONS.filter((o) => o.id === selectedId).map((opt) => (
              <PreviewPanel key={opt.id} option={opt} />
            ))}

            {/* All options at-a-glance comparison */}
            <div className="mt-20">
              <h3 className="text-xs uppercase tracking-[0.5em] font-bold text-gold-antique/70 mb-8">
                Side-by-side title comparison
              </h3>
              <div className="space-y-2">
                {OPTIONS.map((opt) => (
                  <div
                    key={opt.id}
                    className="flex items-center justify-between gap-6 py-4 border-b border-white/5"
                  >
                    <span className="text-[9px] uppercase tracking-[0.4em] font-bold text-ivory/30 shrink-0 w-24">
                      {opt.id}
                    </span>
                    <span
                      className="text-3xl flex-1 truncate"
                      style={{
                        fontFamily: opt.display,
                        fontWeight: opt.displayWeight ?? 400,
                        color: "#d4be86",
                      }}
                    >
                      {SAMPLE.enTitle}
                    </span>
                    <span
                      className="text-3xl text-right shrink-0"
                      style={{ fontFamily: opt.nastaliq, color: "#d4be86" }}
                      dir="rtl"
                    >
                      {SAMPLE.urduTitle}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function PreviewPanel({ option: opt }: { option: FontOption }) {
  return (
    <motion.div
      key={opt.id}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="glass rounded-[40px] p-10 md:p-14 border-white/5"
    >
      <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
        <div>
          <div className="text-[9px] uppercase tracking-[0.5em] font-bold text-gold-antique/70">
            Now previewing
          </div>
          <div
            className="text-2xl mt-1"
            style={{ fontFamily: opt.display, color: "#f0e0b0" }}
          >
            {opt.name}
          </div>
        </div>
      </div>

      {/* Eyebrow */}
      <div
        className="text-[10px] uppercase tracking-[0.6em] font-bold mb-8"
        style={{ fontFamily: opt.body, color: "#b09a68" }}
      >
        {SAMPLE.eyebrow}
      </div>

      {/* Urdu display title */}
      <h2
        className="text-6xl md:text-8xl mb-1 leading-[1.25]"
        dir="rtl"
        style={{ fontFamily: opt.nastaliq, color: "#f0e0b0", fontWeight: 300 }}
      >
        {SAMPLE.urduTitle}
      </h2>
      <div
        className="text-[8px] uppercase tracking-[0.5em] font-bold mb-6 text-gold-antique/40"
        style={{ fontFamily: opt.body }}
      >
        ↑ {opt.nastaliq.split(",")[0].replace(/"/g, "")}
      </div>

      {/* English display title */}
      <h3
        className="text-4xl md:text-6xl mb-10 italic"
        style={{
          fontFamily: opt.display,
          fontWeight: opt.displayWeight ?? 400,
          color: "#d4be86",
        }}
      >
        {SAMPLE.enTitle}
      </h3>

      {/* Sub-titles */}
      <p
        className="text-2xl md:text-3xl mb-2 leading-[1.8]"
        dir="rtl"
        style={{ fontFamily: opt.nastaliq, color: "#c9b378" }}
      >
        {SAMPLE.urduSub}
      </p>
      <p
        className="text-lg md:text-xl mb-10 italic"
        style={{ fontFamily: opt.display, color: "#b09a68" }}
      >
        {SAMPLE.enSub}
      </p>

      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold-antique/20 to-transparent my-10" />

      {/* Body Urdu */}
      <p
        className="text-lg leading-[2.1] mb-6"
        dir="rtl"
        style={{ fontFamily: opt.nastaliq, color: "#c9b378" }}
      >
        {SAMPLE.urduBody}
      </p>

      {/* Body English */}
      <p
        className="text-base leading-[1.8] mb-10"
        style={{
          fontFamily: opt.body,
          fontWeight: opt.bodyWeight ?? 300,
          color: "#8a7a4d",
        }}
      >
        {SAMPLE.enBody}
      </p>

      {/* Numerics + button */}
      <div
        className="text-sm mb-8 tracking-wider"
        style={{
          fontFamily: opt.body,
          fontFeatureSettings: '"tnum"',
          color: "#b09a68",
        }}
      >
        {SAMPLE.numeric}
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        <button
          className="px-10 py-4 bg-sacred-red text-ivory rounded-full hover:bg-gold-antique hover:text-sacred-black transition-all"
          style={{
            fontFamily: opt.body,
            fontWeight: 600,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontSize: "10px",
          }}
        >
          {SAMPLE.cta}
        </button>

        {/* Glyph specimen */}
        <div className="flex items-baseline gap-6 ml-4">
          <span
            style={{
              fontFamily: opt.display,
              fontWeight: opt.displayWeight ?? 400,
              fontSize: 48,
              color: "#d4be86",
            }}
          >
            Hoo
          </span>
          <span
            style={{ fontFamily: opt.nastaliq, fontSize: 48, color: "#d4be86" }}
            dir="rtl"
          >
            ھُو
          </span>
        </div>
      </div>
    </motion.div>
  );
}
