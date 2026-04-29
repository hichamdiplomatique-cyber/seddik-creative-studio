import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { useI18n } from "@/i18n/LanguageProvider";
import founder from "@/assets/founder.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Atelier Pro by Seddik Mekkaoui" },
      { name: "description", content: "Discover the story, philosophy and master behind Atelier Pro — a premium European-style art academy in Tangier." },
      { property: "og:title", content: "About — Atelier Pro" },
      { property: "og:description", content: "The story and philosophy of Atelier Pro by Seddik Mekkaoui." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t } = useI18n();
  return (
    <SiteShell>
      <PageHero
        eyebrow={t("nav.about")}
        title="A master atelier rooted in Tangier, open to the world."
        sub="Founded by Seddik Mekkaoui, Atelier Pro brings together the rigor of European art academies and the warm, contemplative light of Morocco."
      />

      <section className="container-luxe py-20 md:py-28">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <div className="overflow-hidden rounded-3xl shadow-luxe">
              <img src={founder} alt="Seddik Mekkaoui" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </div>
          <div className="md:col-span-7">
            <div className="eyebrow">The Founder</div>
            <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-tight md:text-4xl">
              Seddik Mekkaoui — a life devoted to teaching the craft of seeing.
            </h2>
            <div className="mt-6 space-y-5 text-muted-foreground md:text-lg">
              <p>
                Trained in the European master tradition, Seddik has spent over twenty-five
                years guiding students from absolute beginners to exhibited professionals.
                His teaching distills classical drawing and painting methods into a clear,
                patient progression — without losing the soul of personal expression.
              </p>
              <p>
                Atelier Pro is the home of that practice: a serene studio in Tangier and a
                live online academy welcoming students from more than thirty countries.
              </p>
            </div>
            <Link to="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm text-background hover:bg-primary">
              {t("cta.book")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-border/60 bg-gradient-warm">
        <div className="container-luxe grid gap-10 py-20 md:grid-cols-3 md:py-28">
          {[
            { t: "Patient observation", d: "We slow down so the eye can truly learn — line, value, color, form." },
            { t: "Personal voice", d: "Technique exists to serve the artist's vision, never to replace it." },
            { t: "International atelier", d: "A diverse community where every student is mentored as an individual." },
          ].map((v) => (
            <div key={v.t} className="rounded-2xl border border-border bg-card p-7 shadow-soft">
              <div className="font-display text-xl font-semibold tracking-tight">{v.t}</div>
              <p className="mt-3 text-sm text-muted-foreground">{v.d}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}