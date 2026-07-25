# Walking with Wieland

Eine mobile Web-App, die zum Spazierengehen einlädt. Achtsamkeitsübungen sind
der „versteckte Wirkstoff" – verpackt als kleines Spiel mit **Wieland**, einem
schüchternen Wiesel. Du machst einen kurzen Check-In, startest einen Spaziergang,
und über die Strecke verteilt tauchen kleine Übungen auf. Für jede abgeschlossene
Übung sammelt Wieland einen Schatz in seiner Höhle.

Die App läuft ausschließlich im Browser – **kein Framework, kein Backend, keine
App-Store-Pflicht**. Sie ist für das Handy ausgelegt und als PWA installierbar.

---

## Schnellstart

1. Den Ordner auf einen Webserver mit **HTTPS** legen (GPS braucht HTTPS).
2. `index.html` im Handy-Browser öffnen.
3. Optional über „Zum Home-Bildschirm" installieren.

> **Nur ausprobieren?** Lokale `file://`-Öffnung funktioniert für Übungen und
> Sammlung. GPS, angeleitete Strecken und Offline-Cache sind dann deaktiviert –
> nutze stattdessen den **Testmodus** (Einstellungen → Testmodus).

---

## App-Ablauf

### 1 · Startseite
Zeigt Wieland, den Wochenfortschritt (7-Tage-Balken) und eine Sprechblase mit
einem motivierenden Satz. Über die untere Navigationsleiste sind alle Seiten
erreichbar.

### 2 · Check-In (4 Schritte)
Vor jedem Spaziergang durchläufst du vier kurze Schritte:

| Schritt | Frage | Rückmeldung |
|---------|-------|-------------|
| 1 · Energie | Wie viel Energie hast du? | Icon (5 Stufen) + geschätzte Gehzeit |
| 2 · Stress | Wie gestresst bist du? | Icon (5 Stufen) |
| 3 · Stimmung | Wie bist du heute gelaunt? | Wieland-Emotion (5 Stufen) |
| 4 · Route | Geführte Strecke? | Schalter + Startpunkt-Wahl |

Die Energiestufe bestimmt die Länge der generierten Route (ca. 1,25–7,5 km).

### 3 · Spaziergang
Über die Strecke verteilt erscheinen Übungen. Es gibt **sechs Übungstypen**:

| Typ | Beschreibung |
|-----|-------------|
| `simple` | Kurze Anweisung, „Geschafft"-Knopf |
| `breath` | Atem-Kreis pulsiert (Einatmen / Ausatmen) |
| `timer` | Zeitübung, optional blind schätzen |
| `counter` | Tipp-Zähler mit oder ohne Ziel |
| `photo` | Foto aufnehmen (1 oder mehrere) |
| `guesscount` | Erst schätzen, dann zählen |
| `tour` | Mehrstufige 5-4-3-2-1-Sammelübung (Spezialübung) |

Ein Vorlese-Knopf (🎙) liest jede Übung per Text-to-Speech vor – ideal wenn
das Handy in der Tasche bleibt. Ein Audio-Signal ertönt bei Wegpunkten und beim
Starten einer Übung.

**Freier Spaziergang:** Wieland sitzt, Übungen erscheinen alle ~40 Meter.

**Geführte Strecke:** Ein Kompass-Pfeil führt von Wegpunkt zu Wegpunkt. Eine
zuschaltbare Mini-Karte (und ein Vollbild-Panel) zeigen die Route auf
OpenStreetMap.

### 4 · Statistik
Wochenraster der letzten Wochen. Tap auf einen Tag öffnet ein Detail-Panel mit
Spaziergangs-Infos und – bei geführten Touren – einer interaktiven Karte der
gelaufenen Strecke.

### 5 · Wielands Höhle
Schatztruhe mit den gesammelten Trophäen (eine pro Übungswelt) und einer
Fotoleine für bis zu 5 Polaroid-Fotos aus abgeschlossenen Foto-Übungen.

---

## Die 5 Übungswelten

Jede Welt hat einen eigenen Themenschwerpunkt. Die Übungsauswahl folgt einem
emotionalen Spannungsbogen: je nach Energie, Stress und Stimmung wird der Mix
gewichtet. Jede Welt zeigt eine eigene Wieland-Animation.

| Welt | Name | Fokus |
|------|------|-------|
| 1 | Wielands Spürnase | Sinne schärfen, entdecken |
| 2 | Wielands Ruhe | Atemübungen, Entschleunigen |
| 3 | Wielands Zeitgefühl | Zeit schätzen, im Moment bleiben |
| 4 | Wielands Schatzkiste | Zählen, finden, sammeln |
| 5 | Wielands Entdeckerblick | Fotos, Perspektivwechsel |
| ✦ | Spezialübung | 5-4-3-2-1-Grounding (selten) |

---

## Angeleitete Strecken (optional)

Im Check-In lässt sich „Strecke generieren" einschalten. Dann wird über die
OpenRouteService-API ein Rundweg berechnet. Dafür sind zwei Dinge in den
**Einstellungen** nötig:

1. **Heimat-Standort** – per GPS holen oder manuell eingeben.
2. **ORS API-Schlüssel** – kostenlos unter <https://openrouteservice.org>
   (Konto anlegen → Token erstellen → in die Einstellungen einfügen).

Ohne Schlüssel oder Standort läuft ein **freier Spaziergang** ganz normal weiter.
Die App zeigt beim Start einen Hinweis und startet ohne Karte.

---

## Als PWA installieren

- **iPhone (Safari):** Teilen → „Zum Home-Bildschirm"
- **Android (Chrome):** Menü → „App installieren"

Danach startet Wieland wie eine native App im Vollbild ohne Browser-Chrome.
Der Service Worker cacht alle App-Dateien für die Offline-Nutzung (Karten-Kacheln
und ORS brauchen weiterhin Internet). Auf iOS 16.4+ werden Push-Benachrichtigungen
auch auf der Apple Watch angezeigt.

---

## Fortschritt & Datenspeicherung

Spaziergänge, Schätze und Achievements werden **lokal** gespeichert:
- **localStorage** – Einstellungen, Wochenfortschritt, Übungshistorie
- **IndexedDB** – Fotos aus Foto-Übungen

Es werden keine Daten an einen Server übertragen. Alles lässt sich unter
**Einstellungen → Fortschritt zurücksetzen** löschen.

---

## Einstellungen

| Option | Funktion |
|--------|----------|
| Heimat-Standort | GPS-Fix speichern oder manuell eingeben |
| ORS API-Schlüssel | Für geführte Routen |
| Wochenziel | Anzahl Spaziergänge pro Woche (Standard: 4) |
| Testmodus | Übungen alle 20 s ohne Bewegung auslösen |
| Debug-Modus | Übungs-Auswahl in der Browser-Konsole protokollieren |
| Auf neueste Version aktualisieren | Service-Worker-Cache leeren |
| Fortschritt zurücksetzen | Alle lokalen Daten löschen |

---

## Projektstruktur

```
walking-with-wieland/
├── index.html          Startseite
├── checkin.html        4-Schritt-Check-In
├── walk.html           Spaziergang (Übungen + Karte)
├── stats.html          Statistik & Wochenraster
├── collection.html     Wielands Höhle (Schätze & Fotos)
├── settings.html       Einstellungen
├── manifest.json       PWA-Manifest
├── sw.js               Service Worker (App-Shell-Cache)
├── css/
│   └── style.css       Gesamtes Design (CSS-Variablen-Palette)
├── js/
│   ├── exercises.js    Übungskatalog + Weltendaten (Daten)
│   ├── trophies.js     Trophäen als SVG (eine pro Welt)
│   ├── app.js          WW-Namespace: Persistenz, Helfer, Icons, Navigation
│   ├── route.js        Übungsauswahl & emotionaler Spannungsbogen
│   ├── photoStore.js   Foto-Speicher (IndexedDB)
│   ├── camera.js       Kamera-UI
│   ├── home.js         Startseite
│   ├── checkin.js      Check-In-Flow
│   ├── walk.js         Spaziergang-Ablauf, Navigation, Übungsdarstellung
│   ├── stats.js        Statistik-Ansicht
│   ├── collection.js   Höhle & Foto-Galerie
│   └── settings.js     Einstellungen
└── assets/
    ├── Energie/        5 Energie-Icons (Lvl 1–5)
    ├── Stress/         5 Stress-Icons (Lvl 1–5)
    ├── Emotionen/      5 Wieland-Stimmungs-Icons
    ├── Icons/          Navigations-Icons (SVG)
    ├── font/           PlaypenSans Arabic (Regular + Bold)
    ├── wieland-laufen.apng       Startseite & freier Spaziergang
    ├── Wieland Spuernase.apng    Welt 1
    ├── Wieland Timer.apng        Welt 3
    ├── Wieland Schaetze.apng     Welt 4
    ├── Wieland Entdeckerblick.apng  Welt 5
    └── …                         Hintergrund, Icons, Audio, Trophäen
```

---

## Technische Hinweise

- **GPS & Kompass** lassen sich nur auf einem echten Gerät sinnvoll testen.
  Die Auslösedistanz der Übungen (40 m) und die Wegpunkt-Toleranz sind gut
  vorbelegt, aber am Gerät im Freien am besten final zu justieren.
- **Farben & Schrift** sind als CSS-Variablen am Anfang von `css/style.css`
  gebündelt und zentral änderbar.
- **iOS PWA:** Die App verwendet `location.replace()` für alle internen
  Navigationen, um den Browser-Back-Button und die URL-Leiste im Standalone-Modus
  zu unterdrücken.
