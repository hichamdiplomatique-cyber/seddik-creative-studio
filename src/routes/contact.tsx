import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail, Phone, MapPin, Send, Check } from "lucide-react";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { useI18n } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Atelier Pro by Seddik Mekkaoui" },
      { name: "description", content: "Reach Atelier Pro in Tangier. Book a free consultation or visit the studio." },
      { property: "og:title", content: "Contact — Atelier Pro" },
      { property: "og:description", content: "Get in touch with Atelier Pro." },
    ],
  }),
  component: ContactPage,
});

function Field({ label, name, type = "text", required, placeholder }: { label: string; name: string; type?: string; required?: boolean; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-xs uppercase tracking-[0.22em] text-muted-foreground">{label}</label>
      <input id={name} name={name} type={type} required={required} placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
    </div>
  );
}

function ContactPage() {
  const { t } = useI18n();
  const [sent, setSent] = useState(false);
  const items: { icon: typeof MapPin; label: string; value: string; href?: string }[] = [
    { icon: MapPin, label: "Studio", value: "Tangier, Morocco" },
    { icon: Phone, label: "Phone / WhatsApp", value: "+212 661 540 833", href: "tel:+212661540833" },
    { icon: Mail, label: "Email", value: "hello@artsseddikmekkaoui.com", href: "mailto:hello@artsseddikmekkaoui.com" },
  ];
  return (
    <SiteShell>
      <PageHero eyebrow={t("nav.contact")} title="We'd love to hear from you." sub="Tell us about your goals — we usually reply within one working day." />
      <section className="container-luxe py-20 md:py-24">
        <div className="grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5 space-y-6">
            {items.map((c) => (
              <div key={c.label} className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5 shadow-soft">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-sienna text-primary-foreground">
                  <c.icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-xs uppercase tracking-[0.22em] text-muted-foreground">{c.label}</div>
                  {c.href ? <a href={c.href} className="text-base font-medium text-foreground hover:text-primary">{c.value}</a> : <div className="text-base font-medium text-foreground">{c.value}</div>}
                </div>
              </div>
            ))}
          </div>
          <div className="md:col-span-7">
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="rounded-3xl border border-border bg-card p-7 shadow-soft md:p-10">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" />
                <Field label="Interest" name="interest" placeholder="Painting, photography…" />
              </div>
              <div className="mt-5">
                <label className="mb-2 block text-xs uppercase tracking-[0.22em] text-muted-foreground">Message</label>
                <textarea rows={5} required className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" />
              </div>
              <button type="submit" disabled={sent} className="mt-6 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:bg-primary disabled:opacity-60">
                {sent ? (<><Check className="h-4 w-4" /> Sent — we'll be in touch</>) : (<>Send message <Send className="h-4 w-4 rtl:rotate-180" /></>)}
              </button>
            </form>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}