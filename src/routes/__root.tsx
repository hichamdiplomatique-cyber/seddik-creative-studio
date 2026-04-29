import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { LanguageProvider } from "@/i18n/LanguageProvider";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Atelier Pro by Seddik Mekkaoui — Premium Art Academy in Tangier" },
      { name: "description", content: "Premium European-style art academy in Tangier, Morocco. Painting, drawing, sculpture and fine art photography for students worldwide." },
      { name: "author", content: "Atelier Pro by Seddik Mekkaoui" },
      { name: "theme-color", content: "#6b3a2a" },
      { property: "og:title", content: "Atelier Pro by Seddik Mekkaoui — Premium Art Academy in Tangier" },
      { property: "og:description", content: "Premium European-style art academy in Tangier, Morocco. Painting, drawing, sculpture and fine art photography for students worldwide." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@Lovable" },
      { name: "twitter:title", content: "Atelier Pro by Seddik Mekkaoui — Premium Art Academy in Tangier" },
      { name: "twitter:description", content: "Premium European-style art academy in Tangier, Morocco. Painting, drawing, sculpture and fine art photography for students worldwide." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/94b6e1fa-9884-43bd-9d4c-0edba6e7f997/id-preview-f2c965af--5db91637-e66d-4c73-933c-9e14c85a03af.lovable.app-1777473864281.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/94b6e1fa-9884-43bd-9d4c-0edba6e7f997/id-preview-f2c965af--5db91637-e66d-4c73-933c-9e14c85a03af.lovable.app-1777473864281.png" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <LanguageProvider>
      <Outlet />
    </LanguageProvider>
  );
}
