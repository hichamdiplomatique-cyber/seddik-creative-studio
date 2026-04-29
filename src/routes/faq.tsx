import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { useI18n } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Atelier Pro by Seddik Mekkaoui" },
      { name: "description", content: "Answers about courses, pricing, certificates and in-person sessions in Tangier." },
      { property: "og:title", content: "FAQ — Atelier Pro" },
      { property: "og:description", content: "Common questions about Atelier Pro." },
    ],
  }),
  component: FaqPage,
});

const FAQS = [
  { q: "Do I need previous experience?", a: "No. Our Foundations program is built for absolute beginners, while advanced students can join Mastery and 1:1 mentorship." },
  { q: "Are the courses online or in person?", a: "Both. Study online from anywhere, or join us at our studio in Tangier for intensive workshops." },
  { q: "In which languages are lessons taught?", a: "English, French, Spanish and Arabic — switch from the top right of any page." },
  { q: "Do I receive a certificate?", a: "Yes. Atelier and Maestro plan students receive a signed certificate upon completing each program." },
  { q: "What materials do I need?", a: "Each course includes a downloadable materials list with simple, professional-grade recommendations." },
  { q: "Can I cancel my subscription?", a: "Yes, anytime — you keep access until the end of your billing cycle." },
];

function FaqPage() {
  const { t } = useI18n();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <SiteShell>
      <PageHero eyebrow={t("nav.faq")} title="Questions, gracefully answered." />
      <section className="container-luxe py-20 md:py-24">
        <div className="mx-auto max-w-3xl divide-y divide-border rounded-3xl border border-border bg-card shadow-soft">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button className="flex w-full items-center justify-between gap-6 px-7 py-6 text-start" onClick={() => setOpen(isOpen ? null : i)}>
                  <span className="font-display text-lg font-medium tracking-tight text-foreground">{f.q}</span>
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-secondary text-foreground">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </span>
                </button>
                <div className={`grid overflow-hidden px-7 transition-all duration-500 ${isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"}`}>
                  <div className="min-h-0 text-muted-foreground">{f.a}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </SiteShell>
  );
}