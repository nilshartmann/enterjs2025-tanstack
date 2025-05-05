# EnterJS 2025

Dieses Repository enthält den Source-Code für meinen Talk auf der EnterJs ["Moderne React-Anwendungen mit TanStack"](https://nilshartmann.net/t/moderne-react-anwendungen-mit-tan-stack-enter-js).

- Achtung! Die Verzeichnisstruktur, der CSS-Code etc. entsprechen nicht Best Practices. Bitte nicht übernehmen 😉.

# Ausführen der Beispiel-Anwendung

### Backend
- Für die Data-Fetching-Beispiele wird ein kleines Backend benötigt, das im Verzeichnis `backend` liegt
  - Dort: `pnpm install` und `pnpm start` ausführen (läuft dann auf http://localhost:7100)

### Frontend / Fullstack

- Verzeichnis: `tanstack`
- Dort die Packages mit `pnpm install` installieren
- Enthält sowohl die SPA- als auch die Fullstack-Version der Anwendung
- Je nach Stand der Anwendung muss die App mit `pnpm spa:dev` oder `pnpm ssr:dev` gestartet werden
  - Der initiale Stand auf dem `main`-Branch enthält die SPA-Variante
  - Der "fertige" Stand nach dem Live-Coding sollte - so der Plan - die fertige SSR-Variante enthalten 🙏

# Kontakt

Bei Fragen oder Problemen, kannst du dich gerne bei mir melden. Hier findest du meine Kontaktdaten: https://nilshartmann.net/kontakt
