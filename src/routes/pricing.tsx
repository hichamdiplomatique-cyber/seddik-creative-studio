import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { useI18n } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — Atelier Pro by Seddik Mekkaoui" },
      { name: "description", content: "Simple, transparent pricing for online and in-person courses at Atelier Pro." },
      { property: "og:title", content: "Pricing — Atelier Pro" },
      { property: "og:description", content: "Transparent monthly plans and à-la-carte courses." },
    ],
  }),
  component: PricingPage,
});

const TIERS = [
  { name: "Discover", price: "€39", period: "/ month", desc: "Self-paced library access. Perfect to start.", feats: ["Full video library", "Weekly Q&A", "Community access"], cta: "Start" },
  { name: "Atelier", price: "€129", period: "/ month", desc: "Live mentorship + monthly portfolio review.", feats: ["Everything in Discover", "Live group classes", "Monthly 1:1 review", "Certificate"], featured: true, cta: "Most popular" },
  { name: "Maestro", price: "€390", period: "/ month", desc: "Private mentorship with master Mekkaoui.", feats: ["Weekly 1:1 lessons", "Personal curriculum", "Priority studio access", "Exhibition support"], cta: "Apply" },
];

function PricingPage() {
  const { t } = useI18n();
  return (
    <SiteShell>
      <PageHero eyebrow={t("nav.pricing")} title="Simple plans, master-level teaching." sub="Cancel anytime. À-la-carte courses also available." />
      <section className="container-luxe py-20 md:py-24">
        <div className="grid gap-6 md:grid-cols-3">
          {TIERS.map((tier) => (
            <div key={tier.name} className={`relative flex flex-col gap-6 rounded-3xl border p-8 ${tier.featured ? "border-transparent bg-gradient-sienna text-primary-foreground shadow-luxe" : "border-border bg-card text-foreground shadow-soft"}`}>
              {tier.featured && <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-foreground px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-background">Featured</div>}
              <div>
                <div className={`eyebrow ${tier.featured ? "text-primary-foreground/80" : ""}`}>{tier.name}</div>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className="font-display text-5xl font-semibold tracking-tight">{tier.price}</span>
                  <span className={tier.featured ? "text-primary-foreground/80" : "text-muted-foreground"}>{tier.period}</span>
                </div>
                <p className={`mt-3 text-sm ${tier.featured ? "text-primary-foreground/85" : "text-muted-foreground"}`}>{tier.desc}</p>
              </div>
              <ul className="space-y-3 text-sm">
                {tier.feats.map((f) => (
                  <li key={f} className="flex items-start gap-2"><Check className={`mt-0.5 h-4 w-4 ${tier.featured ? "text-primary-foreground" : "text-primary"}`} /><span>{f}</span></li>
                ))}
              </ul>
              <Link to="/contact" className={`mt-auto inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition ${tier.featured ? "bg-[oklch(0.97_0.02_75)] text-[oklch(0.18_0.03_35)] hover:opacity-90" : "bg-foreground text-background hover:bg-primary"}`}>{tier.cta}</Link>
            </div>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}