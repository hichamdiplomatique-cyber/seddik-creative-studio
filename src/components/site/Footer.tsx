import { Link } from "@tanstack/react-router";
import { useI18n } from "@/i18n/LanguageProvider";
import { Instagram, Facebook, Youtube, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="relative mt-24 border-t border-border/60 bg-secondary/40">
      <div className="container-luxe grid gap-12 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-sienna font-display text-xs font-semibold text-primary-foreground">
              SM
            </span>
            <div className="leading-tight">
              <div className="font-display text-base font-semibold">Atelier Pro</div>
              <div className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                by Seddik Mekkaoui
              </div>
            </div>
          </div>
          <p className="mt-5 max-w-md text-sm text-muted-foreground">{t("footer.tagline")}</p>
          <div className="mt-6 flex gap-3">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <a key={i} href="#" className="grid h-10 w-10 place-items-center rounded-full border border-border text-muted-foreground transition hover:border-primary hover:text-primary" aria-label="social">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <div className="eyebrow mb-4">{t("footer.nav")}</div>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/about" className="text-muted-foreground transition hover:text-foreground">{t("nav.about")}</Link></li>
            <li><Link to="/courses" className="text-muted-foreground transition hover:text-foreground">{t("nav.courses")}</Link></li>
            <li><Link to="/gallery" className="text-muted-foreground transition hover:text-foreground">{t("nav.gallery")}</Link></li>
            <li><Link to="/pricing" className="text-muted-foreground transition hover:text-foreground">{t("nav.pricing")}</Link></li>
            <li><Link to="/faq" className="text-muted-foreground transition hover:text-foreground">{t("nav.faq")}</Link></li>
            <li><Link to="/contact" className="text-muted-foreground transition hover:text-foreground">{t("nav.contact")}</Link></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow mb-4">{t("footer.contact")}</div>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2.5"><MapPin className="mt-0.5 h-4 w-4 text-primary" /><span>Tangier, Morocco</span></li>
            <li className="flex items-start gap-2.5"><Phone className="mt-0.5 h-4 w-4 text-primary" /><a href="tel:+212661540833" className="hover:text-foreground">+212 661 540 833</a></li>
            <li className="flex items-start gap-2.5"><Mail className="mt-0.5 h-4 w-4 text-primary" /><a href="mailto:hello@artsseddikmekkaoui.com" className="hover:text-foreground">hello@artsseddikmekkaoui.com</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="container-luxe flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
          <span>© {new Date().getFullYear()} Atelier Pro by Seddik Mekkaoui — {t("footer.rights")}</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-foreground">{t("footer.privacy")}</a>
            <a href="#" className="hover:text-foreground">{t("footer.terms")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}