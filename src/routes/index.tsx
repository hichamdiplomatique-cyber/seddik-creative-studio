import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Brush, Camera, Palette, PenTool, Scissors, Sparkles, Star } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { useI18n } from "@/i18n/LanguageProvider";
import heroPainting from "@/assets/hero-painting.jpg";
import heroPhoto from "@/assets/hero-photography.jpg";
import heroStudents from "@/assets/hero-students.jpg";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Atelier Pro by Seddik Mekkaoui — Premium Art Academy" },
      { name: "description", content: "Transforming passion into timeless art. A premium European-style art academy in Tangier, Morocco — for students worldwide." },
      { property: "og:title", content: "Atelier Pro by Seddik Mekkaoui" },
      { property: "og:description", content: "Premium art academy in Tangier — painting, drawing, sculpture, photography." },
    ],
  }),
  component: HomePage,
});

const SLIDES = [
  { src: heroPainting, kind: "Painting" },
  { src: heroStudents, kind: "Atelier" },
  { src: heroPhoto, kind: "Photography" },
];

function HomePage() {
  const { t } = useI18n();
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const i = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 6000);
    return () => clearInterval(i);
  }, []);

  const disciplines = [
    { icon: Palette, key: "discipline.painting" },
    { icon: PenTool, key: "discipline.drawing" },
    { icon: Camera, key: "discipline.photography" },
    { icon: Scissors, key: "discipline.sculpture" },
    { icon: Brush, key: "discipline.watercolor" },
    { icon: Sparkles, key: "discipline.portrait" },
  ];

  return (
    <SiteShell>
      {/* HERO */}
      <section className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ${
              slide === i ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={s.src}
              alt={s.kind}
              className={`h-full w-full object-cover ${slide === i ? "animate-ken" : ""}`}
              fetchPriority={i === 0 ? "high" : "low"}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.18_0.03_35/0.55)] via-[oklch(0.18_0.03_35/0.35)] to-[oklch(0.18_0.03_35/0.85)]" />
        <div className="absolute inset-0 grain" />

        <div className="container-luxe relative z-10 flex h-full flex-col justify-end pb-20 text-[oklch(0.97_0.02_75)]">
          <div className="reveal flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] text-white/80">
            <span className="h-px w-10 bg-white/60" />
            {t("hero.eyebrow")}
          </div>
          <h1 className="reveal mt-5 max-w-4xl font-display text-[44px] font-semibold leading-[1.02] tracking-tight md:text-7xl">
            {t("hero.title")}
          </h1>
          <p className="reveal-slow mt-6 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
            {t("hero.sub")}
          </p>
          <div className="reveal-slow mt-9 flex flex-wrap items-center gap-3">
            <Link
              to="/courses"
              className="group inline-flex items-center gap-2 rounded-full bg-[oklch(0.97_0.02_75)] px-6 py-3 text-sm font-medium text-[oklch(0.18_0.03_35)] transition hover:gap-3"
            >
              {t("cta.discover")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/10"
            >
              {t("cta.book")}
            </Link>
          </div>

          {/* Slide indicators */}
          <div className="mt-12 flex items-center gap-3">
            {SLIDES.map((s, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                className="group flex items-center gap-2"
                aria-label={`Slide ${i + 1}`}
              >
                <span className={`h-px transition-all ${slide === i ? "w-12 bg-white" : "w-6 bg-white/40"}`} />
                <span className={`text-[10px] uppercase tracking-[0.22em] transition ${slide === i ? "text-white" : "text-white/50"}`}>
                  {s.kind}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="border-b border-border/60 bg-secondary/40">
        <div className="container-luxe grid grid-cols-2 gap-8 py-12 md:grid-cols-4 md:py-16">
          {[
            { v: "25+", k: "stats.years" },
            { v: "1,200+", k: "stats.students" },
            { v: "30+", k: "stats.countries" },
            { v: "6", k: "stats.disciplines" },
          ].map((s) => (
            <div key={s.k}>
              <div className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                <span className="text-gradient-sienna">{s.v}</span>
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{t(s.k)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="container-luxe py-24 md:py-32">
        <div className="grid gap-16 md:grid-cols-12 md:gap-20">
          <div className="md:col-span-5">
            <div className="eyebrow">{t("section.philosophy.eyebrow")}</div>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              {t("section.philosophy.title")}
            </h2>
          </div>
          <div className="md:col-span-7 md:pt-6">
            <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
              {t("section.philosophy.body")}
            </p>
            <div className="mt-10 grid gap-6 sm:grid-cols-3">
              {["European tradition", "Live mentorship", "Lifetime access"].map((label) => (
                <div key={label} className="rounded-2xl border border-border/70 bg-card p-5 shadow-soft">
                  <Star className="h-4 w-4 text-primary" />
                  <div className="mt-3 text-sm font-medium text-foreground">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DISCIPLINES */}
      <section className="border-y border-border/60 bg-gradient-warm">
        <div className="container-luxe py-24 md:py-32">
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <div className="eyebrow">{t("section.disciplines.eyebrow")}</div>
              <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
                {t("section.disciplines.title")}
              </h2>
            </div>
            <Link to="/courses" className="group inline-flex items-center gap-2 text-sm font-medium text-foreground">
              {t("cta.discover")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
            </Link>
          </div>

          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {disciplines.map(({ icon: Icon, key }) => (
              <div
                key={key}
                className="group flex flex-col gap-4 bg-card p-8 transition hover:bg-secondary/60"
              >
                <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-sienna text-primary-foreground transition group-hover:scale-105">
                  <Icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="font-display text-xl font-semibold text-foreground">{t(key)}</div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Online & in-person · all levels
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COURSES TEASER */}
      <section className="container-luxe py-24 md:py-32">
        <div className="grid gap-16 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-4">
            <div className="eyebrow">{t("section.courses.eyebrow")}</div>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              {t("section.courses.title")}
            </h2>
            <p className="mt-5 text-muted-foreground">{t("section.courses.body")}</p>
            <Link to="/courses" className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm text-background hover:bg-primary">
              {t("cta.discover")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
          <div className="md:col-span-8">
            <div className="grid gap-5 sm:grid-cols-2">
              {[
                { title: "Foundations of Drawing", level: "Beginner", weeks: "8 weeks" },
                { title: "Oil Painting Mastery", level: "Intermediate", weeks: "12 weeks" },
                { title: "Portrait & Figure", level: "Advanced", weeks: "16 weeks" },
                { title: "Fine Art Photography", level: "All levels", weeks: "10 weeks" },
              ].map((c, i) => (
                <div key={i} className="group relative flex flex-col gap-4 rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-luxe">
                  <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                    <span>{c.level}</span>
                    <span>{c.weeks}</span>
                  </div>
                  <div className="font-display text-xl font-semibold tracking-tight text-foreground">
                    {c.title}
                  </div>
                  <div className="hairline" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">From €390</span>
                    <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1 rtl:rotate-180" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="border-t border-border/60 bg-secondary/30">
        <div className="container-luxe py-24 md:py-32">
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="eyebrow">{t("section.gallery.eyebrow")}</div>
              <h2 className="mt-4 max-w-xl font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
                {t("section.gallery.title")}
              </h2>
            </div>
            <Link to="/gallery" className="group hidden sm:inline-flex items-center gap-2 text-sm font-medium text-foreground">
              {t("nav.gallery")} <ArrowRight className="h-4 w-4 rtl:rotate-180 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-5">
            {[g1, g2, g3, g4, g5, g6].map((src, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden rounded-2xl bg-card shadow-soft ${
                  i === 0 || i === 4 ? "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" : "aspect-[3/4]"
                }`}
              >
                <img
                  src={src}
                  alt={`Work ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[oklch(0.18_0.03_35/0.6)] to-transparent opacity-0 transition group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="container-luxe py-24 md:py-32">
        <div className="eyebrow">{t("section.testimonials.eyebrow")}</div>
        <h2 className="mt-4 max-w-2xl font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
          {t("section.testimonials.title")}
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { q: "The most patient and demanding teacher I've ever had. My drawing changed forever.", a: "Léa M.", c: "Paris, France" },
            { q: "Online lessons that feel like a real atelier. Worth every minute.", a: "Daniel R.", c: "Madrid, Spain" },
            { q: "I came as a hobbyist and left with a portfolio I'm proud to show.", a: "Yasmine A.", c: "Tangier, Morocco" },
          ].map((t, i) => (
            <figure key={i} className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-7 shadow-soft">
              <div className="flex gap-1 text-primary">
                {Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-3.5 w-3.5 fill-current" />)}
              </div>
              <blockquote className="font-display text-lg leading-snug tracking-tight text-foreground">
                “{t.q}”
              </blockquote>
              <figcaption className="text-sm">
                <div className="font-medium text-foreground">{t.a}</div>
                <div className="text-muted-foreground">{t.c}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container-luxe pb-24">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-sienna px-8 py-16 text-primary-foreground md:px-16 md:py-24">
          <div className="relative z-10 max-w-2xl">
            <h2 className="font-display text-3xl font-semibold leading-tight tracking-tight md:text-5xl">
              {t("section.cta.title")}
            </h2>
            <p className="mt-5 text-base text-primary-foreground/85 md:text-lg">
              {t("section.cta.body")}
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-[oklch(0.97_0.02_75)] px-6 py-3 text-sm font-medium text-[oklch(0.18_0.03_35)] transition hover:gap-3"
            >
              {t("cta.book")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
          <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-10 h-80 w-80 rounded-full bg-[oklch(0.18_0.03_35/0.3)] blur-3xl" />
        </div>
      </section>
    </SiteShell>
  );
}