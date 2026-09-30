import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

import { Masonry } from "@/components/prompts-chat/masonry";
import { HeroMedia } from "@/components/HeroMedia";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "EMAK Elektrik — Elektrik Projelendirme, Taahhüt ve Uygulama" },
      {
        name: "description",
        content:
          "EMAK Elektrik; yapı projelerinde elektrik projelendirme, taahhüt ve saha uygulamasını tek elden yürütür.",
      },
      { property: "og:title", content: "EMAK Elektrik — 1996'dan beri elektrikte çözüm ortağınız" },
      {
        property: "og:description",
        content: "Elektrik projelendirme, taahhüt ve uygulama. Bodrum’da elektrik mühendisliği ve saha uygulamaları.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  { href: "#hizmetler", label: "Hizmetler" },
  { href: "#projeler", label: "Projeler" },
  { href: "#hakkimizda", label: "Hakkımızda" },
  { href: "#iletisim", label: "İletişim" },
];

const SERVICES = [
  {
    no: "01",
    title: "Elektrik projelendirme",
    text: "Kuvvetli ve zayıf akım uygulama projeleri, yük hesapları, gerilim düşümü ve kısa devre analizleri; ilgili kurum onay süreçlerinin takibi.",
  },
  {
    no: "02",
    title: "Elektrik taahhüt ve saha uygulaması",
    text: "Kablo taşıma sistemleri, tesisat, sonlandırma ve devreye alma. Şantiye programına bağlı iş planı, ekip ve malzeme yönetimi.",
  },
  {
    no: "03",
    title: "Enerji dağıtımı ve panolar",
    text: "Trafo ve OG/AG dağıtım altyapısı, ana ve tali dağıtım panoları, jeneratör ve kesintisiz güç sistemlerinin entegrasyonu.",
  },
  {
    no: "04",
    title: "Mimari aydınlatma",
    text: "Cephe, peyzaj ve iç mekân aydınlatmasının mimari tasarımla uyumlu uygulanması; armatür yerleşimi, kontrol ve senaryo ayarları.",
  },
  {
    no: "05",
    title: "Zayıf akım ve otomasyon",
    text: "Yangın algılama, güvenlik ve kamera, yapısal kablolama, bina otomasyonu ve enerji izleme sistemlerinin kurulumu.",
  },
];

const STEPS = [
  {
    title: "Proje incelemesi",
    text: "Mimari ve statik projeler, şartnameler ve keşif üzerinden kapsamı, riskleri ve maliyeti netleştiririz.",
  },
  {
    title: "Uygulama koordinasyonu",
    text: "Diğer disiplinlerle eşgüdüm içinde sahada çalışır, iş programını ve kaliteyi düzenli raporlarız.",
  },
  {
    title: "Teslim",
    text: "Testler, ölçümler ve devreye alma sonrası as-built dokümantasyonla yapıyı eksiksiz teslim ederiz.",
  },
];

const PROJECTS = ["MANDARIN ORIENTAL C1", "HEBIL BLUE", "THE ONE BODRUM", "VIDA LOCA", "VADİ BODRUM", "ROS HEBİL", "CELESTE BELLA", "REEF PANAROMA", "REEF JOY", "LAVA VELENA", "BREKKIE", "CAMEL BEACH SALT BODRUM", "WEST GÜMÜŞLÜK", "DENPA", "D PLAJ", "YEDİTEPE EVLERİ", "OPUS GÜMÜŞLÜK"];
const PROJECT_PHOTOS: Record<string, string[]> = {
  "BREKKIE": Array.from({ length: 10 }, (_, i) => `/media/brekkie-${i + 1}.jpg`),
  "OPUS GÜMÜŞLÜK": Array.from({ length: 2 }, (_, i) => `/media/opus-gumusluk-${i + 1}.jpg`),
  "YEDİTEPE EVLERİ": Array.from({ length: 4 }, (_, i) => `/media/yeditepe-evleri-${i + 1}.jpg`),
  "D PLAJ": Array.from({ length: 4 }, (_, i) => `/media/d-plaj-${i + 1}.jpg`),
  "DENPA": ["/media/denpa-1.jpg"],
  "CELESTE BELLA": Array.from({ length: 6 }, (_, i) => `/media/celeste-bella-${i + 1}.jpg`),
  "WEST GÜMÜŞLÜK": Array.from({ length: 7 }, (_, i) => `/media/west-gumusluk-${i + 1}.jpg`),
  "CAMEL BEACH SALT BODRUM": Array.from({ length: 5 }, (_, i) => `/media/camel-beach-salt-${i + 1}.jpg`),
  "REEF JOY": Array.from({ length: 3 }, (_, i) => `/media/reef-joy-${i + 1}.jpg`),
  "VIDA LOCA": Array.from({ length: 10 }, (_, i) => `/media/vida-loca-${i + 1}.jpg`),
  "THE ONE BODRUM": Array.from({ length: 6 }, (_, i) => `/media/the-one-${i + 1}.jpg`),
  "MANDARIN ORIENTAL C1": Array.from({ length: 8 }, (_, i) => `/media/mandarin-${i + 1}.jpg`),
  "HEBIL BLUE": Array.from({ length: 16 }, (_, i) => `/media/hebil-blue-${i + 1}.jpg`),
};

function Projects() {
  const [selected, setSelected] = useState("HEBIL BLUE");
  const [photo, setPhoto] = useState<number | null>(null);
  const photos = PROJECT_PHOTOS[selected] ?? [];
  function selectProject(name: string) {
    setSelected(name);
    setPhoto(null);
    requestAnimationFrame(() => {
      document.getElementById("project-gallery")?.scrollIntoView({
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
        block: "start",
      });
    });
  }
  return (
    <section id="projeler" className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
      <p className="eyebrow text-metal">Yaptığımız işler</p>
      <h2 className="mt-5 text-4xl md:text-6xl">Yarımadaya bıraktığımız iz.</h2>
      <div className="project-index" aria-label="Projeler">
        {PROJECTS.map((name, i) => <button key={name} type="button" data-project={name} aria-pressed={selected === name}
          onClick={() => selectProject(name)} className="project-choice">
          <span className="project-number" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          <span className="project-name">{name}</span>
          <span className="project-indicator" aria-hidden="true" />
        </button>)}
      </div>
      <div id="project-gallery" className="mt-12 border-t border-border pt-8">
        <h3 className="text-3xl md:text-4xl">{selected}</h3>
        {photos.length > 0 ? <Masonry key={selected} gap={20} className="mt-8" columnCount={{ default: 1, md: 2, lg: 3 }}>
          {photos.map((src,i) => <button key={src} type="button" onClick={() => setPhoto(i)}
            aria-label={`${selected} fotoğraf ${i+1}, büyüt`} className="group block w-full overflow-hidden bg-card">
            <img src={src} alt={`${selected} projesinden görünüm ${i+1}`} loading="lazy" decoding="async" className="w-full transition-transform duration-700 group-hover:scale-105" />
          </button>)}
        </Masonry> : <p className="mt-6 text-muted-foreground">Bu projenin fotoğrafları henüz eklenmedi.</p>}
      </div>
      <Dialog open={photo !== null} onOpenChange={open => { if (!open) setPhoto(null); }}>
        <DialogContent className="max-w-[95vw] border-border bg-background p-5 md:max-w-6xl">
          <DialogTitle className="pr-8">{selected}</DialogTitle>
          <DialogDescription>Proje fotoğrafları — {photo === null ? 1 : photo + 1} / {photos.length}</DialogDescription>
          {photo !== null && <img src={photos[photo]} alt={`${selected} projesinden görünüm ${photo+1}`} className="max-h-[70svh] w-full object-contain" />}
          <div className="flex justify-between gap-4">
            <button className="border border-border px-5 py-3" onClick={() => setPhoto(i => ((i ?? 0) + photos.length - 1) % photos.length)}>Önceki</button>
            <button className="border border-border px-5 py-3" onClick={() => setPhoto(i => ((i ?? 0) + 1) % photos.length)}>Sonraki</button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}

function LightingSwitch() {
  const [light, setLight] = useState(false);
  useEffect(() => { document.documentElement.dataset["lighting"] = light ? "light" : "dark"; }, [light]);
  return <div className="bronze-lighting"><span className="bronze-pipe" aria-hidden="true" />
    <button type="button" className="bronze-switch" role="switch" aria-checked={light}
      aria-label="Beyaz görünüm" title={light ? "Antrasit görünüme geç" : "Beyaz görünüme geç"}
      onClick={() => setLight(v => !v)} onKeyDown={e => { if (e.key === "ArrowUp" || e.key === "ArrowDown") { e.preventDefault(); setLight(e.key === "ArrowUp"); } }}>
      <span className="switch-case" aria-hidden="true"><span className="switch-toggle" /></span>
    </button>
  </div>;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const solid = scrolled || open;
  return (
    <header
      id="site-header"
      data-solid={solid}
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid ? "border-b border-border/70 bg-background/95 text-foreground" : "bg-transparent text-white"
      }`}
    >
      <div className="header-inner mx-auto grid h-20 max-w-7xl grid-cols-[1fr_auto_1fr] items-center px-5 md:h-24 md:px-10">
        <nav className="hidden gap-8 md:flex">
          {NAV.slice(0, 2).map((n) => (
            <a key={n.href} href={n.href} className="nav-link eyebrow opacity-85 transition-opacity hover:opacity-100">
              {n.label}
            </a>
          ))}
        </nav>
        <span className="md:hidden" />
        <a href="#top" aria-label="EMAK Elektrik ana sayfa" className="block justify-self-center">
          <img
            src="/media/emak-logo.png"
            alt="EMAK Elektrik, Makina, Tesis San. Ltd. Şti."
            className="brand-logo h-14 w-36 object-contain md:h-20 md:w-48"
            width={389}
            height={144}
          />
        </a>
        <nav className="hidden justify-end gap-8 md:flex">
          {NAV.slice(2).map((n) => (
            <a key={n.href} href={n.href} className="nav-link eyebrow opacity-85 transition-opacity hover:opacity-100">
              {n.label}
            </a>
          ))}
        </nav>
        <button
          className="eyebrow justify-self-end md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-label="Menü"
        >
          {open ? "Kapat" : "Menü"}
        </button>
      </div>
      {open && (
        <nav className="border-t border-border bg-background px-5 pb-6 md:hidden">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block border-b border-border/60 py-4 font-display text-2xl"
            >
              {n.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="hero-shell relative h-[100svh] min-h-[560px] overflow-hidden bg-ink text-ink-foreground">
      <LightingSwitch />
      <HeroMedia />
      <div className="hero-veil pointer-events-none absolute inset-0" />
      <div className="hero-content relative mx-auto flex h-full max-w-7xl flex-col justify-end px-5 pb-28 md:px-10 md:pb-28">
        <p className="hero-intro eyebrow">EMAK · Elektrik mühendisliği</p>
        <h1 className="hero-title mt-5">
          <span>1996’dan beri</span>
          <span>elektrikte çözüm ortağınız.</span>
        </h1>
        <a href="#projeler" className="hero-project-link mt-8 self-start">
          Yaptığımız işler
        </a>
      </div>
      <a
        href="#hakkimizda"
        aria-label="Aşağı kaydır"
        className="absolute bottom-6 left-5 flex flex-col items-center gap-2 text-ink-foreground/70 md:left-10"
      >
        <span className="scroll-cue block h-10 w-px bg-ink-foreground/70" />
      </a>
    </section>
  );
}

function Index() {
  useReveal();
  return (
    <div className="bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <section className="company-intro" aria-label="EMAK Elektrik, misyon ve vizyon"><div className="company-intro-grid"><article><h2>Emak Elektrik</h2><p>Emak Elektrik-Makina Mühendislik Proje Taahhüt Ltd. Şti. 1996’da Mustafa N. Hatipoğlu tarafından kurulmuştur. Emak; Bodrum ve civar bölgelerde proje, AG-OG, iç tesisat ve altyapı uygulamalarında hizmet vermektedir.</p></article><article><h2>Misyonumuz</h2><p>Sektörümüzdeki 32 yıllık bilgi birikimimizi sizlerle paylaşmak ve Bodrum yarımadasının altyapı gelişimine tecrübemizle katkı sağlamaktır. Emak Elektrik olarak misyonumuz; doğaya saygılı, güvenilir, kaliteli hizmet vererek müşterilerimizi tatmin etmektir.</p></article><article><h2>Vizyonumuz</h2><p>Yarımada ve çevresinde yapılmakta olan mühendislik ve uygulama hizmetlerini her zaman bir adım öteye taşımaktır. Dürüst ve düzenli iş yapmayı kendimize vazife edinmiş bir firmayız. Bundan dolayı her yaptığımız tesis referansımızdır.</p></article></div></section>

        {/* Giriş */}
        <section id="hakkimizda" className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
          <div className="company-history"><p className="eyebrow text-metal">Hakkımızda</p><div><h2>Mühendislikten uygulamaya.</h2><div className="company-history-copy"><p>Emak Elektrik şirketimizin kurucu üyesi ve müdürü olan Mustafa N. Hatipoğlu, 1985 yılından beri şirketimizin çalışma alanları olarak belirtilen konularda hizmet vermiş ve ihtisas sahibi olmuştur. 1985-86 yıllarında turizm alanlarında ülkemizin atağa kalkması ile birlikte şirket müdürümüz, o yıllarda ortağı ve genel müdürü olduğu şirketin, turizm ile ilgili birçok vasıflı tesisin (yıldızlı oteller, tatil köyleri, alışveriş merkezleri gibi) enerji iletimi ve dağıtımı sistemlerinin yapımında görev almasını sağlamıştır. Söz konusu şirkette 1996 yılına kadar aynı görev ile hizmet vermiş, 1996 yılında ortakların ayrılma kararları neticesi görevini tamamlayarak EMAK ELEKTRİK-MAKİNA TESİS MÜHENDİSLİK TİCARET VE SANAYİ LTD. ŞTİ.’yi kurmuştur. Şirketimiz hâlen deneyimli kadrosu ile Muğla ve Bodrum bölgelerinde faaliyetini yoğun bir şekilde sürdürmektedir.</p></div></div></div>
          <div id="kadromuz" className="mt-20 grid gap-10 border-t border-border pt-12 md:grid-cols-12">
            <p className="eyebrow text-metal md:col-span-3">Kadromuz</p>
            <div className="md:col-span-9">
              <h3 className="text-3xl md:text-4xl">Projelerin arkasındaki ekip.</h3>
              <ul className="mt-8 grid gap-x-10 sm:grid-cols-2">
                {[
                  { name: "KAAN HATİPOĞLU", title: "Elektrik-Elektronik Mühendisi" },
                  { name: "NURİ TANSEL KAĞNICI", title: "Makina Mühendisi" },
                  { name: "RIDVAN SAVCI", title: "Saha Şefi" },
                  { name: "DOĞA BARTU ACAR", title: "Elektrik-Elektronik Mühendisi" },
                  { name: "YİĞİT BERKAY BACAKSIZ", title: "Elektrik-Elektronik Mühendisi" },
                ].map(person => (
                  <li key={person.name} className="border-b border-border py-5">
                    <p className="text-base tracking-wide md:text-lg">{person.name}</p>
                    <p className="mt-2 text-sm text-muted-foreground">{person.title}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Hizmetler */}
        <section id="hizmetler" className="bg-card py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <div className="grid gap-6 md:grid-cols-12">
              <p className="eyebrow text-metal md:col-span-3">Hizmetler</p>
              <h2 className="reveal text-4xl md:col-span-9 md:text-6xl">Uzmanlık alanlarımız</h2>
            </div>
            <ul className="mt-16 border-t border-border">
              {SERVICES.map((s) => (
                <li
                  key={s.no}
                  className="reveal grid gap-4 border-b border-border py-10 md:grid-cols-12 md:py-12"
                >
                  <span className="font-display text-xl text-metal md:col-span-3">{s.no}</span>
                  <h3 className="text-3xl md:col-span-4 md:text-4xl">{s.title}</h3>
                  <p className="leading-relaxed text-muted-foreground md:col-span-5">{s.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Projects />

        {/* Yaklaşım */}
        <section className="bg-ink py-20 text-ink-foreground md:py-24">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <div className="grid gap-6 md:grid-cols-12">
              <p className="eyebrow text-metal md:col-span-3">Çalışma yaklaşımı</p>
              <h2 className="reveal text-4xl md:col-span-9 md:text-6xl">Üç adımda net bir süreç</h2>
            </div>
            <ol className="mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
              {STEPS.map((s, i) => (
                <li key={s.title} className="reveal border-t border-ink-foreground/25 pt-8">
                  <span className="font-display text-5xl text-metal">{i + 1}</span>
                  <h3 className="mt-6 text-3xl">{s.title}</h3>
                  <p className="mt-4 leading-relaxed text-ink-foreground/70">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* İletişim */}
        <section id="iletisim" className="mx-auto max-w-7xl px-5 py-20 md:px-10 md:py-28">
          <div className="grid gap-12 md:grid-cols-12">
            <p className="eyebrow text-metal md:col-span-3">İletişim</p>
            <div className="md:col-span-9">
              <h2 className="reveal text-4xl leading-tight md:text-7xl">Bodrum’da, sahadayız.</h2>
              <dl className="mt-12 grid gap-10 border-t border-border pt-10 sm:grid-cols-2">
                <div><dt className="eyebrow text-muted-foreground">E-posta</dt><dd className="mt-3 text-lg"><a href="mailto:emak.ltd@gmail.com" className="underline underline-offset-8">emak.ltd@gmail.com</a></dd></div>
                <div><dt className="eyebrow text-muted-foreground">Adres</dt><dd className="mt-3 text-lg leading-relaxed">Ortakent/Yahşi Mahallesi Atatürk Cad. No:8/4<br />Bodrum/Muğla</dd></div>
              </dl>
            </div>
          </div>
        </section>
        <section className="company-archive" aria-labelledby="archive-title"><div className="company-archive-inner"><p className="eyebrow text-metal">EMAK arşivinden</p><h2 id="archive-title">İlk dükkânımız.</h2><figure><img src="/media/emak-ilk-dukkan.jpg" alt="EMAK Elektrik’in kuruluş dönemindeki ilk dükkânı" width="1599" height="1057" loading="lazy" decoding="async" /><figcaption>EMAK Elektrik’in ilk dükkânı — kuruluş yıllarından.</figcaption></figure></div></section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-8 text-xs text-muted-foreground md:flex-row md:justify-between md:px-10">
          <span>© {new Date().getFullYear()} EMAK Elektrik, Makina, Tesis San. Ltd. Şti.</span>
          <span>Bodrum · 1996</span>
        </div>
      </footer>
    </div>
  );
}
