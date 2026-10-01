import { useEffect, useRef, useState } from "react";

export function HeroMedia() {
  const video = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);
  const [intro, setIntro] = useState(true);
  useEffect(() => {
    const v = video.current;
    if (!v) { setIntro(false); return; }
    const started = performance.now();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    let finished = false;
    let transition: ReturnType<typeof setTimeout>;
    let frame: number | undefined;
    const reveal = () => {
      if (finished) return;
      finished = true;
      transition = setTimeout(() => {
        setIntro(false);
        document.body.style.overflow = previousOverflow;
      }, Math.max(0, 1800 - (performance.now() - started)));
    };
    const check = () => {
      if (finished || v.readyState < 3) return;
      if (v.requestVideoFrameCallback) frame = v.requestVideoFrameCallback(reveal);
      else reveal();
    };
    const fallback = setTimeout(reveal, 6500);
    v.addEventListener("playing", check);
    v.addEventListener("canplay", check);
    v.addEventListener("error", reveal);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) reveal();
    else { v.play().then(check).catch(reveal); check(); }
    return () => {
      clearTimeout(fallback); clearTimeout(transition);
      if (frame !== undefined) v.cancelVideoFrameCallback(frame);
      v.removeEventListener("playing", check);
      v.removeEventListener("canplay", check);
      v.removeEventListener("error", reveal);
      document.body.style.overflow = previousOverflow;
    };
  }, []);
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
    <div className={`emak-intro ${intro ? "" : "out"}`} role="status" aria-label="EMAK yükleniyor" aria-hidden={!intro}>
      <img src="/media/emak-logo.png" alt="EMAK" />
      <div className="line" />
    </div>
    <div className="absolute inset-0 bg-ink">
      <img src="/emak-hero-cinematic-poster.jpg" alt="EMAK Elektrik açılış görseli" className="hero-media" fetchPriority="high" />
      <video ref={video} className={`hero-media hero-video ${ready ? "is-ready" : ""}`}
        src="/emak-hero-cinematic.mp4" poster="/emak-hero-cinematic-poster.jpg" autoPlay muted loop playsInline preload="auto"
        aria-label="EMAK Elektrik açılış videosu" onPlaying={() => setReady(true)} onPause={() => setPaused(true)}
        onPlay={() => setPaused(false)} onError={() => setReady(false)} />
    </div>
    <button type="button" className="hero-video-control" onClick={toggle}
      aria-label={paused ? "Açılış videosunu oynat" : "Açılış videosunu duraklat"}>
      <span aria-hidden="true">{paused ? "Oynat" : "Duraklat"}</span>
    </button>
  </>;
}
