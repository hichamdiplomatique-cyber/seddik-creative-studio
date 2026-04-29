export function PageHero({ eyebrow, title, sub }: { eyebrow?: string; title: string; sub?: string }) {
  return (
    <section className="relative overflow-hidden border-b border-border/50 bg-gradient-warm pt-16 md:pt-20">
      <div className="container-luxe py-20 md:py-28">
        {eyebrow && <div className="eyebrow reveal">{eyebrow}</div>}
        <h1 className="reveal mt-4 max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          {title}
        </h1>
        {sub && (
          <p className="reveal-slow mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            {sub}
          </p>
        )}
      </div>
      <div className="pointer-events-none absolute -right-32 top-0 h-[420px] w-[420px] rounded-full bg-gradient-sienna opacity-20 blur-3xl" />
    </section>
  );
}