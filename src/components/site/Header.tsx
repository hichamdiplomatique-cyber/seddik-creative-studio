import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { useI18n } from "@/i18n/LanguageProvider";

export function Header() {
  const { t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const links: { to: string; key: string }[] = [
    { to: "/", key: "nav.home" },
    { to: "/about", key: "nav.about" },
    { to: "/courses", key: "nav.courses" },
    { to: "/gallery", key: "nav.gallery" },
    { to: "/pricing", key: "nav.pricing" },
    { to: "/faq", key: "nav.faq" },
    { to: "/contact", key: "nav.contact" },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        scrolled || mobileOpen
          ? "border-b border-border/60 bg-background/80 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container-luxe flex h-16 items-center justify-between md:h-20">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-sienna text-[11px] font-display font-semibold tracking-wider text-primary-foreground shadow-soft">
            SM
          </span>
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="font-display text-[15px] font-semibold tracking-tight text-foreground">
              Atelier Pro
            </span>
            <span className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Seddik Mekkaoui
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-foreground after:scale-x-100" }}
              className="relative text-sm text-muted-foreground transition hover:text-foreground after:absolute after:-bottom-1.5 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-gradient-sienna after:transition-transform"
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <LanguageSwitcher />
          <Link
            to="/contact"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background transition hover:bg-primary"
          >
            {t("cta.book")}
          </Link>
          <button
            className="lg:hidden grid h-10 w-10 place-items-center rounded-full border border-border/70 text-foreground"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden border-t border-border/60 bg-background/95 backdrop-blur-xl animate-fade-in">
          <nav className="container-luxe flex flex-col py-4">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                activeProps={{ className: "text-foreground" }}
                className="border-b border-border/40 py-3 text-base text-muted-foreground"
              >
                {t(l.key)}
              </Link>
            ))}
            <Link
              to="/contact"
              className="mt-4 inline-flex items-center justify-center rounded-full bg-foreground px-4 py-3 text-sm font-medium text-background"
            >
              {t("cta.book")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}