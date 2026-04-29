import { useState, useRef, useEffect } from "react";
import { useI18n } from "@/i18n/LanguageProvider";
import { LANG_META, type Lang } from "@/i18n/translations";
import { Globe, Check } from "lucide-react";

export function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t("lang.label")}
        className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur transition hover:border-primary/50 hover:text-foreground"
      >
        <Globe className="h-3.5 w-3.5" />
        <span>{LANG_META[lang].native}</span>
      </button>
      {open && (
        <div className="absolute end-0 top-full z-50 mt-2 w-44 overflow-hidden rounded-xl border border-border bg-popover shadow-luxe animate-fade-in">
          {(Object.keys(LANG_META) as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => { setLang(l); setOpen(false); }}
              className="flex w-full items-center justify-between px-4 py-2.5 text-sm text-popover-foreground/90 transition hover:bg-secondary"
            >
              <span>{LANG_META[l].label}</span>
              {lang === l && <Check className="h-4 w-4 text-primary" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}