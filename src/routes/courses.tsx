import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, Users } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { useI18n } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses — Atelier Pro by Seddik Mekkaoui" },
      { name: "description", content: "Online and in-person art courses: drawing, oil painting, portrait, sculpture and fine art photography." },
      { property: "og:title", content: "Courses — Atelier Pro" },
      { property: "og:description", content: "Curated programs in painting, drawing, sculpture and photography." },
    ],
  }),
  component: CoursesPage,
});

const COURSES = [
  { title: "Foundations of Drawing", level: "Beginner", weeks: "8 weeks", students: "1:8", price: "€390", desc: "Line, value, perspective and proportion — the bedrock of every artist." },
  { title: "Oil Painting Mastery", level: "Intermediate", weeks: "12 weeks", students: "1:6", price: "€690", desc: "Glazing, alla prima, color theory — paint with confidence and depth." },
  { title: "Portrait & Figure", level: "Advanced", weeks: "16 weeks", students: "1:4", price: "€1,290", desc: "From skull to skin: classical portrait and figure construction." },
  { title: "Watercolor Atelier", level: "All levels", weeks: "6 weeks", students: "1:10", price: "€290", desc: "Light, water, restraint — the most poetic of mediums." },
  { title: "Sculpture Studio", level: "Intermediate", weeks: "10 weeks", students: "1:6", price: "€790", desc: "Clay modeling and form — the third dimension of seeing." },
  { title: "Fine Art Photography", level: "All levels", weeks: "10 weeks", students: "1:8", price: "€590", desc: "Composition, light, narrative — photography as a fine art." },
];

function CoursesPage() {
  const { t } = useI18n();
  return (
    <SiteShell>
      <PageHero eyebrow={t("section.courses.eyebrow")} title={t("section.courses.title")} sub={t("section.courses.body")} />
      <section className="container-luxe py-20 md:py-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {COURSES.map((c) => (
            <article key={c.title} className="group flex flex-col gap-5 rounded-2xl border border-border bg-card p-7 transition hover:-translate-y-1 hover:shadow-luxe">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                <span>{c.level}</span>
                <span className="text-primary">{c.price}</span>
              </div>
              <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">{c.title}</h3>
              <p className="text-sm text-muted-foreground">{c.desc}</p>
              <div className="hairline" />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{c.weeks}</span>
                <span className="inline-flex items-center gap-1.5"><Users className="h-3.5 w-3.5" />{c.students}</span>
              </div>
              <Link to="/contact" className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                Enroll <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1 rtl:rotate-180" />
              </Link>
            </article>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}