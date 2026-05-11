import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Ambient sacred audio — embeds a YouTube source via the IFrame API so the
 * track is streamed (not downloaded). Starts muted (browser autoplay policy);
 * user taps the corner glyph to invite sound in.
 */
const VIDEO_ID = "PQnMecMz1mU";
const DEFAULT_VOLUME = 20; // 0-100, kept very low for ambience

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
    __ytApiLoading?: boolean;
  }
}

function loadYouTubeAPI(): Promise<void> {
  return new Promise((resolve) => {
    if (window.YT && window.YT.Player) return resolve();
    if (window.__ytApiLoading) {
      const id = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(id);
          resolve();
        }
      }, 80);
      return;
    }
    window.__ytApiLoading = true;
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    document.head.appendChild(tag);
  });
}

export function AmbientAudio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    let cancelled = false;
    loadYouTubeAPI().then(() => {
      if (cancelled || !containerRef.current) return;
      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          controls: 0,
          loop: 1,
          playlist: VIDEO_ID,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          iv_load_policy: 3,
        },
        events: {
          onReady: (e: any) => {
            try {
              e.target.mute();
              e.target.setVolume(DEFAULT_VOLUME);
              e.target.playVideo();
            } catch {}
            setReady(true);
          },
          onStateChange: (e: any) => {
            // Loop fallback in case `loop` param doesn't trigger
            if (e.data === window.YT.PlayerState.ENDED) {
              try {
                e.target.seekTo(0);
                e.target.playVideo();
              } catch {}
            }
          },
        },
      });
    });
    return () => {
      cancelled = true;
      try {
        playerRef.current?.destroy?.();
      } catch {}
    };
  }, []);

  // Auto-unmute on the very first user gesture anywhere on the page.
  useEffect(() => {
    if (!ready) return;
    const events = ["pointerdown", "keydown", "touchstart", "wheel", "scroll"];
    const unlock = () => {
      const p = playerRef.current;
      if (!p) return;
      try {
        p.unMute();
        p.setVolume(DEFAULT_VOLUME);
        p.playVideo();
        setMuted(false);
      } catch {}
      events.forEach((ev) =>
        window.removeEventListener(ev, unlock, { capture: true } as any)
      );
    };
    events.forEach((ev) =>
      window.addEventListener(ev, unlock, { capture: true, once: false, passive: true } as any)
    );
    return () => {
      events.forEach((ev) =>
        window.removeEventListener(ev, unlock, { capture: true } as any)
      );
    };
  }, [ready]);

  const toggle = () => {
    const p = playerRef.current;
    if (!p) return;
    try {
      if (muted) {
        p.unMute();
        p.setVolume(DEFAULT_VOLUME);
        p.playVideo();
        setMuted(false);
      } else {
        p.mute();
        setMuted(true);
      }
    } catch {}
  };

  return (
    <>
      {/* Hidden YouTube player (audio source only) — kept on-screen at 1px
          so browsers don't suspend it as an offscreen iframe. */}
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          width: 2,
          height: 2,
          left: 0,
          bottom: 0,
          opacity: 0.001,
          pointerEvents: "none",
          zIndex: -1,
          overflow: "hidden",
        }}
      >
        <div ref={containerRef} style={{ width: 320, height: 180 }} />
      </div>

      {/* Floating ambient toggle — Apple-minimal */}
      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        onClick={toggle}
        aria-label={muted ? "Enable ambient sound" : "Mute ambient sound"}
        className="group fixed z-[80] bottom-6 right-6 sm:bottom-8 sm:right-8 flex items-center gap-3 px-4 py-2.5 rounded-full backdrop-blur-xl border border-white/10 hover:border-gold-antique/40 transition-all duration-700"
        style={{
          background:
            "linear-gradient(135deg, rgba(20,16,10,0.55), rgba(8,6,4,0.55))",
          boxShadow:
            "0 8px 30px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(217,200,154,0.05)",
        }}
      >
        <span className="relative flex items-center justify-center w-5 h-5">
          <AnimatePresence mode="wait" initial={false}>
            {muted ? (
              <motion.span
                key="off"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.35 }}
                className="absolute"
              >
                <VolumeX size={16} className="text-ivory/55 group-hover:text-gold-champagne transition-colors" />
              </motion.span>
            ) : (
              <motion.span
                key="on"
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.35 }}
                className="absolute"
              >
                <Volume2 size={16} className="text-gold-champagne" />
              </motion.span>
            )}
          </AnimatePresence>
          {!muted && (
            <span className="absolute inset-0 rounded-full animate-ping bg-gold-antique/20" />
          )}
        </span>
        <span
          className="font-sans text-[9px] uppercase tracking-[0.4em] text-ivory/50 group-hover:text-ivory/80 transition-colors"
          style={{ fontWeight: 300 }}
        >
          {muted ? "Sound" : "Hoo"}
        </span>
      </motion.button>
    </>
  );
}
