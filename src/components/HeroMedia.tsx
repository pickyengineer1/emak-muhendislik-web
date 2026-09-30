import { useEffect, useRef, useState } from "react";

export function HeroMedia() {
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      if (preference.matches) { video.current?.pause(); setPaused(true); }
    };
    apply(); preference.addEventListener("change", apply);
    return () => preference.removeEventListener("change", apply);
  }, []);
  async function toggle() {
    if (!video.current) return;
    if (video.current.paused) {
      try { await video.current.play(); setPaused(false); } catch { setPaused(true); }
    } else { video.current.pause(); setPaused(true); }
  }
  return <>
    <div className="absolute inset-0 bg-ink">
      <img src="/emak-hero-cinematic-poster.jpg" alt="EMAK Elektrik açılış görseli" className="hero-media" fetchPriority="high" />
      <video ref={video} className={`hero-media hero-video ${ready ? "is-ready" : ""}`}
        src="/emak-hero-cinematic.mp4" poster="/emak-hero-cinematic-poster.jpg" autoPlay muted loop playsInline preload="metadata"
        aria-label="EMAK Elektrik açılış videosu" onPlaying={() => setReady(true)} onPause={() => setPaused(true)}
        onPlay={() => setPaused(false)} onError={() => setReady(false)} />
    </div>
    <button type="button" className="hero-video-control" onClick={toggle}
      aria-label={paused ? "Açılış videosunu oynat" : "Açılış videosunu duraklat"}>
      <span aria-hidden="true">{paused ? "Oynat" : "Duraklat"}</span>
    </button>
  </>;
}
