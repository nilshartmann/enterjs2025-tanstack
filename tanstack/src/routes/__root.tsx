import {
  createRootRouteWithContext,
  redirect,
  retainSearchParams,
} from "@tanstack/react-router";
// import "../globals.css";
import globalsCss from "../globals.css?url";
import type { QueryClient } from "@tanstack/react-query";
import SpaRootComponent from "@/components/layout/SpaRootComponent.tsx";
import SsrRootComponent from "@/components/layout/SsrRootComponent.tsx";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  search: {
    middlewares: [retainSearchParams(true)],
  },

  loader: ({ location }) => {
    if (location.pathname === "/") {
      throw redirect({ to: "/cards" });
    }
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "GreetingCards TanStack Demo",
      },
    ],
    scripts: [
      {
        src: "/hover-link.js",
      },
    ],
    links: [
      { href: globalsCss, rel: "stylesheet" },
      { href: "/fonts/google-fonts.css", rel: "stylesheet" },
      { href: "/fonts/google-fonts.css", rel: "stylesheet" },
      { href: "/fontawesome/css/fontawesome.css", rel: "stylesheet" },
      { href: "/fontawesome/css/brands.css", rel: "stylesheet" },
      { href: "/fontawesome/css/regular.css", rel: "stylesheet" },
      { href: "/fontawesome/css/solid.css", rel: "stylesheet" },
    ],
  }),

  component: SsrRootComponent,
});
