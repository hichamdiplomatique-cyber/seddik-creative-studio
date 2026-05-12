import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/auth/AuthProvider";
import { SiteShell } from "@/components/site/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useI18n } from "@/i18n/LanguageProvider";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your account — Atelier Pro" },
      { name: "description", content: "Join Atelier Pro and start your art journey." },
    ],
  }),
  component: SignupPage,
});

const schema = z.object({
  fullName: z.string().trim().min(2).max(80),
  email: z.string().email(),
  password: z.string().min(8).max(72),
});

function SignupPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { t, lang } = useI18n();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user) navigate({ to: "/dashboard" });
  }, [user, loading, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse({ fullName, email, password });
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setBusy(true);
    const { error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/dashboard`,
        data: { full_name: parsed.data.fullName, preferred_language: lang },
      },
    });
    setBusy(false);
    if (error) return toast.error(error.message);
    toast.success(t("auth.check.email"));
    navigate({ to: "/login" });
  };

  const onGoogle = async () => {
    const result = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/dashboard" });
    if (result.error) return toast.error("Google sign-in failed");
    if (!result.redirected) navigate({ to: "/dashboard" });
  };

  return (
    <SiteShell>
      <section className="container-luxe py-32">
        <div className="mx-auto max-w-md">
          <h1 className="font-display text-4xl text-foreground">{t("auth.signup.title")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t("auth.signup.sub")}</p>

          <button
            type="button"
            onClick={onGoogle}
            className="mt-8 flex w-full items-center justify-center gap-3 rounded-md border border-border bg-background px-4 py-3 text-sm font-medium hover:bg-muted/40 transition"
          >
            <svg className="h-4 w-4" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.1 29.3 35 24 35c-6.1 0-11-4.9-11-11s4.9-11 11-11c2.8 0 5.4 1.1 7.3 2.8l5.7-5.7C33.5 6.5 29 4.6 24 4.6 13.2 4.6 4.6 13.2 4.6 24S13.2 43.4 24 43.4 43.4 34.8 43.4 24c0-1.2-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 19 13 24 13c2.8 0 5.4 1.1 7.3 2.8l5.7-5.7C33.5 6.5 29 4.6 24 4.6 16.4 4.6 9.8 8.9 6.3 14.7z"/><path fill="#4CAF50" d="M24 43.4c5 0 9.5-1.9 12.9-5l-6-4.9c-2 1.4-4.4 2.3-6.9 2.3-5.3 0-9.7-3.4-11.3-8.1l-6.5 5C9.6 38.9 16.3 43.4 24 43.4z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.4 5.7l6 4.9C40.9 35.4 43.4 30.1 43.4 24c0-1.2-.1-2.4-.4-3.5z"/></svg>
            {t("auth.continue.google")}
          </button>

          <div className="my-6 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-px flex-1 bg-border" /> {t("auth.or")} <span className="h-px flex-1 bg-border" />
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">{t("auth.fullname")}</Label>
              <Input id="name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">{t("auth.email")}</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">{t("auth.password")}</Label>
              <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="w-full" disabled={busy}>
              {busy ? "…" : t("auth.create")}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {t("auth.haveaccount")} <Link to="/login" className="text-foreground underline">{t("auth.signin")}</Link>
          </p>
        </div>
      </section>
    </SiteShell>
  );
}