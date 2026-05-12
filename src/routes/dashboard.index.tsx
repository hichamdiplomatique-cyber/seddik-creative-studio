import { createFileRoute, Link } from "@tanstack/react-router";
import { useAuth } from "@/auth/AuthProvider";
import { useI18n } from "@/i18n/LanguageProvider";
import { BookOpen, GraduationCap, ShieldCheck, Sparkles } from "lucide-react";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardHome,
});

function DashboardHome() {
  const { roles, profile } = useAuth();
  const { t } = useI18n();

  const cards = [
    { title: t("dash.card.courses"), desc: t("dash.card.courses.desc"), to: "/dashboard/courses", icon: BookOpen, show: roles.includes("student") || roles.length === 0 },
    { title: t("dash.card.teach"), desc: t("dash.card.teach.desc"), to: "/dashboard/teach", icon: GraduationCap, show: roles.includes("teacher") },
    { title: t("dash.card.admin"), desc: t("dash.card.admin.desc"), to: "/dashboard/admin", icon: ShieldCheck, show: roles.includes("admin") },
  ].filter((c) => c.show);

  return (
    <div className="space-y-8">
      <section className="rounded-2xl border border-border bg-gradient-sienna p-8 text-primary-foreground shadow-soft">
        <Sparkles className="h-5 w-5 opacity-80" />
        <h2 className="mt-3 font-display text-2xl md:text-3xl">{t("dash.hero.title")}</h2>
        <p className="mt-2 max-w-xl text-sm opacity-90">{t("dash.hero.body")}</p>
        {profile?.bio ? null : (
          <Link to="/dashboard/settings" className="mt-5 inline-flex rounded-full bg-background/15 px-4 py-2 text-xs uppercase tracking-[0.2em] backdrop-blur hover:bg-background/25">
            {t("dash.completeprofile")}
          </Link>
        )}
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link key={c.to} to={c.to} className="group rounded-xl border border-border bg-background p-6 transition hover:-translate-y-0.5 hover:shadow-soft">
              <Icon className="h-6 w-6 text-primary" />
              <h3 className="mt-4 font-display text-lg">{c.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.desc}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}