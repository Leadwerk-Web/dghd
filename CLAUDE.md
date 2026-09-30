# dghd – Website-Relaunch (Prototyp)

Statischer HTML/CSS/JS-Prototyp für den Relaunch von www.dghd.de (Deutsche Gesellschaft für Hochschuldidaktik e.V.). Kein Build-Schritt, keine Abhängigkeiten, kein Framework – Dateien direkt im Browser öffnen. Sprache der Inhalte: Deutsch (Sie-Form).

## Seiten

- `index.html` – aktuelle Startseite („Gemeinsam gute Lehre gestalten“). Kompaktes Markup (eine Zeile pro Section). Lädt `css/main.css?v=N` und `js/main.js?v=N`.
- `startseite-v2.html` – neue Startseite auf Basis der Sitemap V2. Markenfarben Bordeaux #a7253a (Headlines, Buttons, Links), Violett #2e1f52 (Icons, Hover, Zahlen, Linien, Typo-Highlights), Gold #e8c02c (Marker, Tags, Pfeile, Termine). Hintergründe: Weiß, helles Grau (Neumorphism) und Violett für wichtige Abschnitte (Glassmorphism); Bereiche als Bento-Grid; Schrift durchgehend Encode Sans Semi Expanded (Headlines Regular 400 in Violett; hervorgehobene Wörter `.hl`/`.accent` fett 700, ohne Farb-/Markerfläche; Rot nur für Buttons/Links). Hero (100dvh): großer goldener Rahmen `.hf--a`, von dem nur die untere Ecke oben in den Hero ragt (lange Kante läuft schräg nach rechts oben hinaus), dazu blasse Rahmen `.hf--b/c`, alle langsam unabhängig bewegt; unten ein durchlaufendes Themenband `.topics` (Marquee, pausiert bei Hover/Fokus). Zielgruppen als nummerierte Liste (`.path`, 01–04 = Marker im Bild) unter der Headline, verknüpft mit Stationen (`.pin`, Positionen in % der Bildfläche) in der Illustration, automatischer Wechsel; Klick öffnet den passenden Tab in `#fuer-sie`. Navigation links: auf dem Desktop (ab 981 px) ist die Seitenleiste `.sidebar` dauerhaft aufgeklappt und zeigt nur die erste Ebene (6 Bereiche, dazu Suche, Zielgruppen-Filter, Login, „Mitglied werden“); die Fächer öffnen per Klick und schließen per Klick daneben, Link-Klick oder Escape. Die schmale Leiste `.rail` ist noch im Markup, aber ausgeblendet (`--rail` = `--sb`). Desktop ohne Kopfleiste: oben in der Seitenleiste nur die Bildmarke `favicon_dghd.svg` (`.sidebar__mark`, volles Logo und × dort ausgeblendet), volles Logo oben links im Hero (`.hero__top`); die Kopfleiste `.topbar` mit Menü-Knopf gibt es nur unter 981 px nach dem Prototyp https://leadwerk-web.github.io/dghd-relaunch/navigation-prototyp.html (Suche, Zielgruppen-Filter „Zeigen für“ über `data-zg` L/F/P/M, bis 3 Unterpunkte klappen darunter auf, ab 4 als Fächer-Spalte `.sn-sub--fan` mit `--lvl`; unter 981 px fast bildschirmbreit, Fächer klappen untereinander auf). Das Nav-HTML (107 Einträge) wurde per Skript aus den Sitemap-V2-Daten erzeugt – bei Änderungen die Struktur konsistent halten. Eigene Dateien `css/startseite-v2.css` + `js/startseite-v2.js` (unabhängig von `main.css`). Illustrationen als `.webp` in `Assets/illustrations/` (`ideen-teilen` = freigestellte Editorial-Spot-Illustration). Hero-Bühne: `wege-landschaft-basis` (Original ohne die Stationsobjekte, Lücken gefüllt, Hintergrund transparent) + freigestellte Objekte in `Assets/illustrations/stationen/` (`forschung`, `lehre`, `weiterbildung`, `leitung`, `austausch` → Station 5, verknüpft mit der Karte „15 Arbeitsgruppen · 7 Netzwerke“), per `.cut` mit `--l/--t/--w` in % von 1269 × 833 px passgenau darübergelegt; bei Hover vergrößern sie sich (`.is-active`), das übrige Bild bleibt unverändert. Original bleibt als `wege-landschaft.webp/.png` erhalten.
- `startseite-v3.html` – Weiterentwicklung von `startseite-v2.html` (Kopie vom 30.09.2026) mit eigenen Dateien `css/startseite-v3.css` + `js/startseite-v3.js`; Logo-Links zeigen auf sich selbst. Abschnitt 2 `#fuer-sie` ist hier die Pinnwand-Alternative aus dem Artefakt „dghd Designelemente“ (Moderationskarten `.pb-card` mit Pinnnadel `.pb-pin`, Punktraster `.dots`), aber weiter auf Violett statt Weiß; keine Tabs mehr. Karten-IDs `fuer-forschende/-lehrende/-professionals/-leitung`; Klick auf eine Zielgruppe im Hero scrollt dorthin und markiert die Karte (`.is-picked`). Im Abschnitt Veranstaltungen ist die Terminliste rechts (`.dates`) flach: keine Kacheln/Schatten, nur Trennlinien; goldene Datumsfelder bleiben. Navigation in v3: Seitenleiste auch auf dem Desktop standardmäßig geschlossen; sichtbar ist die schmale Leiste `.rail` (`--rail` 76 px, Menü-Knopf + Bereichs-Icons öffnen die Seitenleiste als Schublade mit Scrim und ×; Escape schließt erst Fächer, dann Schublade). Damit die Leiste als Navigation erkennbar ist: Menü-Knopf mit sichtbarer Beschriftung „Menü“ (`.rail__caption`) und Reiter `.nav-tab` (fixed, mittig am rechten Rand der Leiste, senkrecht „Menü“, `data-sidebar-toggle`), der nach dem Laden 3× golden pulsiert (`tab-pulse`) und sich bei offener Navigation zurückzieht (`body.has-menu`). Die frühere Sprechblase wurde auf Wunsch entfernt. Typo-Test in v3: Headlines (h1–h3, Such-Label) in Literata (`--serif`), Fließtext und Bedienelemente in Noto Sans (`--sans`) statt Encode Sans Semi Expanded; Laufweite der Headlines dafür gelockert (−.01 bis −.025em statt −.03 bis −.05em).
- `sitemap.html` – Sitemap V2 (Stand 23.09.2026); `sitemap-v1.html` = Vorversion.
- `editorial.html` – alternative Startseite mit Spot-Illustrationen (`Assets/illustrations/`), BEM-Klassen, mehrstufiger App-Navigation und JSON-LD. Lädt `css/main.css` + `css/editorial.css`.

Links zeigen auf die bestehende Live-Seite `https://www.dghd.de/...`; noch nicht zugeordnete Ziele sind `href="#"`.

## CSS

- `css/main.css` ist nur ein Import-Hub: `tokens.css` → `base.css` → `redesign.css`.
- `css/redesign.css` – gesamtes Styling von `index.html` (minifiziert, eigene Variablen `--red`, `--gold`, `--violet`, `--ink`, `--line`, `--shell`).
- `css/tokens.css` – Design-Tokens (`--color-primary` #b7394a, `--color-secondary` #2e1f52, `--color-accent` #e6c32b, Typo-/Spacing-Skala). Schrift: Raleway (Google Fonts).
- `css/nav.css`, `css/components.css`, `css/home.css` – Stylesheets der früheren Version (BEM, z. B. `app-nav`, `btn`, `*__grid`). Werden aktuell von keinem `main.css`-Import geladen, aber von `editorial.html` benötigt.
- Nach CSS/JS-Änderungen die Cache-Busting-Parameter (`?v=N`) in `index.html` bzw. `main.css` hochzählen.

## JS

`js/main.js` (Vanilla, IIFE): Menü-Toggle (`[data-menu-toggle]`/`[data-menu-panel]`), Such-Dialog (`[data-search-dialog]`, `<dialog>`), Scroll-Reveal für `.reveal` (respektiert `prefers-reduced-motion`), kompakter Header (`[data-header]` → `.is-compact`).

## Assets

`Assets/` (großes A – Pfade case-sensitiv schreiben, Zielserver ist ggf. Linux): Bildmarke `dghd2026_bildmarke.svg`, Favicons, `illustrations/`, `photos/`.

## hub/ – Spiegel des Nextcloud-Hubs (nicht bearbeiten)

`hub/` wird per `scripts/sync-hub.ps1` (rclone `sync`, täglich über `sync-hub-scheduled.ps1`, Logs in `scripts/logs/`) vom dghd-Nextcloud gespiegelt. Lokale Änderungen dort werden beim nächsten Sync überschrieben/gelöscht. Nur lesen:

- `hub/Design/` – Bildmarken-Konzept (Moderationskarten, Forschung × Anwendung, Überlagerung im Multiplizieren-Modus = „Third Space“), Farben, Logo-Animations-Prototypen (v2 bevorzugt).
- `hub/Navigation/IST_dghd_Menuestruktur.xlsx` – IST-Hauptmenü und Footer der Live-Seite mit URLs; `dghd-Menue-Prototyp.html`; Zielgruppen-Entwurf (.docx).
- `hub/Kategorien + Tags/` – Taxonomie-Entwurf: 5 Hauptkategorien (Aus der Fachgesellschaft, Forschung & Diskurs, Anwendung & Praxis, Veranstaltungen & Termine, Publikationen & Ressourcen) + funktionale Tags Format / Zielgruppe / Herkunft. Organe (Vorstand, Kommissionen, AGs) werden über Autor:innen-Accounts abgebildet, nicht über Kategorien.
- `hub/Wordpress Export/` – WXR-Export der Live-Seite (~24 MB; Posts, Pages, Events, Stellenangebote, Institutionen, Newsletter). Für Analysen per Skript auswerten, nicht komplett einlesen.

## Sicherheit

`scripts/rclone-dghd-hub.conf` enthält Zugangsdaten für den Hub. Diese Datei sowie `hub/` (personenbezogene Daten im WP-Export) nie veröffentlichen oder committen.
