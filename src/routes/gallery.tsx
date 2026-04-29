import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { PageHero } from "@/components/site/PageHero";
import { useI18n } from "@/i18n/LanguageProvider";
import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Atelier Pro by Seddik Mekkaoui" },
      { name: "description", content: "Selected works from the Atelier Pro studio: paintings, drawings, sculpture and fine art photography." },
      { property: "og:title", content: "Gallery — Atelier Pro" },
      { property: "og:description", content: "Selected works from Atelier Pro." },
    ],
  }),
  component: GalleryPage,
});

const ITEMS = [
  { src: g1, title: "Sienna Study", medium: "Oil on canvas" },
  { src: g2, title: "Portrait of Hope", medium: "Charcoal on paper" },
  { src: g3, title: "Tangier Coastline", medium: "Watercolor" },
  { src: g4, title: "The Artisan", medium: "Photography" },
  { src: g5, title: "Bust in Clay", medium: "Sculpture" },
  { src: g6, title: "Pomegranates", medium: "Oil on linen" },
  { src: g3, title: "Mediterranean Light", medium: "Watercolor" },
  { src: g1, title: "Brushwork I", medium: "Oil study" },
];

function GalleryPage() {
  const { t } = useI18n();
  return (
    <SiteShell>
      <PageHero eyebrow={t("section.gallery.eyebrow")} title={t("section.gallery.title")} />
      <section className="container-luxe py-20 md:py-24">
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
          {ITEMS.map((it, i) => (
            <figure key={i} className="group relative overflow-hidden rounded-2xl bg-card shadow-soft">
              <img src={it.src} alt={it.title} loading="lazy" className="w-full transition-transform duration-700 group-hover:scale-[1.05]" />
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-[oklch(0.18_0.03_35/0.7)] to-transparent p-5 text-white opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                <div className="font-display text-base font-semibold">{it.title}</div>
                <div className="text-xs text-white/80">{it.medium}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </SiteShell>
  );
}