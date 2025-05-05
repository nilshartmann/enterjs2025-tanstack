import { HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import NavBar from "@/components/NavBar.tsx";
import { showQueryDevTools } from "@/demo-config.ts";

export default function SsrRootComponent() {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        <header>
          <NavBar />
        </header>
        <Outlet />
        {showQueryDevTools && <ReactQueryDevtools />}
        <Scripts />
      </body>
    </html>
  );
}
