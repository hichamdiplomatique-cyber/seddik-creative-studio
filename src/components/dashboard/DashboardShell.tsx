import { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { useAuth, AppRole } from "@/auth/AuthProvider";
import { useI18n } from "@/i18n/LanguageProvider";
import { LayoutDashboard, GraduationCap, Users, BookOpen, Settings, LogOut, ShieldCheck } from "lucide-react";
import { LanguageSwitcher } from "@/components/site/LanguageSwitcher";
import { toast } from "sonner";

type Item = { to: string; key: string; icon: typeof LayoutDashboard; roles?: AppRole[] };

const items: Item[] = [
  { to: "/dashboard", key: "dash.home", icon: LayoutDashboard },
  { to: "/dashboard/courses", key: "dash.mycourses", icon: BookOpen, roles: ["student"] },
  { to: "/dashboard/teach", key: "dash.teach", icon: GraduationCap, roles: ["teacher"] },
  { to: "/dashboard/admin", key: "dash.admin", icon: ShieldCheck, roles: ["admin"] },
  { to: "/dashboard/users", key: "dash.users", icon: Users, roles: ["admin"] },
  { to: "/dashboard/settings", key: "dash.settings", icon: Settings },
];

export function DashboardShell({ children }: { children: ReactNode }) {
  const { profile, roles, signOut, hasRole } = useAuth();
  const { t } = useI18n();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const visible = items.filter((i) => !i.roles || i.roles.some((r) => hasRole(r)));

  return (
    <div className="flex min-h-screen w-full bg-muted/20">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-background md:flex">
        <div className="flex h-16 items-center gap-2.5 border-b border-border px-5">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-sienna text-[10px] font-display font-semibold text-primary-foreground">SM</span>
          <span className="font-display text-sm font-semibold">Atelier Pro</span>
        </div>
        <nav className="flex-1 px-3 py-4">
          {visible.map((it) => {
            const active = pathname === it.to;
            const Icon = it.icon;
            return (
              <Link
                key={it.to}
                to={it.to}
                className={`mb-1 flex items-center gap-3 rounded-md px-3 py-2 text-sm transition ${
                  active ? "bg-foreground text-background" : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {t(it.key)}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border p-3">
          <button
            onClick={async () => {
              await signOut();
              toast.success("Signed out");
              navigate({ to: "/" });
            }}
            className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted/50 hover:text-foreground"
          >
            <LogOut className="h-4 w-4" /> {t("dash.signout")}
          </button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border bg-background/80 px-6 backdrop-blur">
          <div>
            <h1 className="font-display text-lg">{t("dash.welcome")}, {profile?.full_name ?? "Artist"}</h1>
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{roles.join(" · ") || "student"}</p>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <Link to="/" className="text-xs text-muted-foreground hover:text-foreground">{t("dash.backsite")}</Link>
          </div>
        </header>
        <main className="flex-1 p-6 md:p-10">{children}</main>
      </div>
    </div>
  );
}