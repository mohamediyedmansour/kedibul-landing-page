# Kedibul Landing Page — Design Spec

## Creative concept

**“A living map of Istanbul’s unofficial residents.”** Kedibul should feel less like a pet accessory store and more like a small, beautifully edited city archive: warm paper, Bosphorus-dark panels, Iznik red, and the rhythm of ferry timetables, neighborhood signs, and hand-painted shop lettering. The page moves from one intimate encounter (a collar and a scan) into a larger civic story (a map of cats, caretakers, clinics, and streets). Every interaction should make the idea tangible: a tag swings like it is worn, a scan reveals a real-feeling profile, color becomes a choice with meaning, and the map turns a city into a community.

## Research notes and reference decisions

### Supplied references

| Reference | Borrow | Deliberately avoid |
|---|---|---|
| [Aesop](https://www.aesop.com/) | Quiet editorial composition, generous paper-colored space, close-up material photography, restrained typography, and retail copy that feels considered. | Luxury skincare language, excessive whitespace without a clear action, and cookie/location interruptions in the primary story. |
| [Cereal](https://cerealmag.com/) | Magazine-like pacing, travel/editorial sensibility, and a feeling that each section is a collected observation rather than a feature checklist. | A purely art-directed magazine that makes the product hard to understand. |
| [Fantasy](https://fantasy.co/) | Strong art direction, oversized type, and interaction-led transitions. | Abstract agency spectacle that obscures Kedibul’s practical utility. |
| [Stripe](https://stripe.com/) | Clear product explanation, confident technical details, and conversion points that stay visible without shouting. | Generic SaaS gradients, dashboard-first storytelling, and corporate blue as the dominant identity. |
| [Apple](https://www.apple.com/) | Product-stage composition, one strong message at a time, controlled reveal, and extremely clear responsive hierarchy. | Long product-launch pacing, sterile monochrome, and copy that promises more than the service can currently prove. |
| [Godly / Recent](https://godly.website/) | Dense visual reference gathering, motion-forward examples, and the permission to make a landing page feel like a designed object. The Godly URL redirected to Recent during research. | Trend-chasing effects, autoplay media as the main content, and interactions that do not improve comprehension. |
| [Siteinspire](https://www.siteinspire.com/) | Simple curation UI, strong headline-to-grid hierarchy, rounded control language, and visual breathing room on mobile. | A gallery-like homepage where every card competes equally for attention. |

Some supplied URLs were intermittently blocked by the browser environment (`ERR_FAILED` for Cereal, Fantasy, Stripe, and parts of Apple); those references were supplemented with their known public visual language and the accessible Apple, Aesop, Siteinspire, Recent, and Landingfolio states. No `/references` directory exists in the current repository, so there were no local screenshots to audit.

### Three additional examples worth borrowing from

1. **[The Pudding](https://pudding.cool/)** — editorial data storytelling. Borrow the idea of turning a statistic into a sequence of small discoveries: the Istanbul map should explain itself as the visitor moves, not arrive as a static infographic.
2. **[Patagonia Worn Wear](https://wornwear.patagonia.com/)** — values-led storytelling. Borrow the honest, human, documentary tone and the sense that the service exists because a community already cares. Avoid copying its catalogue-heavy navigation.
3. **[Resn](https://resn.co.nz/)** — scroll-driven art direction. Borrow the willingness to make the scroll feel physical and theatrical, but keep Kedibul’s motion low-amplitude, accessible, and tied to meaning.

## Visual system

### Palette

```css
:root {
  --bosphorus-night: #0B1417;
  --night-surface: #132226;
  --paper: #F3ECDD;
  --paper-deep: #E8DDCB;
  --iznik-red: #D2442F;
  --tram-yellow: #F5B700;
  --sage: #7FB39A;
  --ink-muted: #9BA9A6;
  --line-dark: rgba(243, 236, 221, 0.16);
  --line-light: rgba(11, 20, 23, 0.16);
}
```

Usage rules:

- Alternate `--bosphorus-night` and `--paper` as the dominant section backgrounds. Never use a third neutral background for a full section.
- Use `--night-surface` for cards, phone frames, map plates, and elevated dark UI.
- Use `--iznik-red` for the collar, primary CTA, active language state, and the most important editorial emphasis. It should be visible but never become a page-wide wash.
- Use `--tram-yellow` for active controls, scan feedback, map pulse centers, and the yellow collar. It is an action signal, not a second primary brand color.
- Use `--sage` for care, verified information, clinic/support states, and the green collar.
- `--paper` is the only light text color on dark. `--bosphorus-night` is the only default text color on paper.
- Add one fixed grain layer over the whole page at approximately 6% opacity with `mix-blend-mode: soft-light`; disable it for users who request reduced transparency.

### Typography

- **Display:** Fraunces (fallback: Instrument Serif, Georgia, serif), high contrast, tight tracking (`-0.045em`). Use for all hero and section headlines.
- **Body:** Inter (fallback: Geist, Arial, sans-serif), open counters and neutral texture. Use for paragraphs, labels, controls, and data.
- Display scale:

```css
--type-display: clamp(3.5rem, 9vw, 9rem);
--type-section: clamp(2.75rem, 6vw, 6rem);
--type-title: clamp(1.75rem, 3.2vw, 3.25rem);
--type-body-lg: clamp(1.1rem, 1.8vw, 1.5rem);
--type-body: clamp(0.98rem, 1.2vw, 1.1rem);
--type-label: 0.72rem;
```

Labels are uppercase, `letter-spacing: 0.16em`, and use the relevant accent color. Do not use all-caps for paragraph copy.

### Spacing, radius, and shadow tokens

```css
:root {
  --space-1: 0.5rem;
  --space-2: 0.75rem;
  --space-3: 1rem;
  --space-4: 1.5rem;
  --space-5: 2rem;
  --space-6: 3rem;
  --space-7: 5rem;
  --space-8: 8rem;
  --radius-sm: 0.5rem;
  --radius-md: 1rem;
  --radius-lg: 1.75rem;
  --radius-pill: 999px;
  --shadow-soft: 0 1.5rem 4rem rgba(11, 20, 23, 0.14);
  --shadow-dark: 0 1.5rem 4rem rgba(0, 0, 0, 0.28);
}
```

Use an 8px base rhythm. On desktop, constrain text to readable measure (`48rem` maximum) and use a `max-width: 90rem` page rail. On mobile, use 1.25rem side padding and never allow a section or card to create horizontal overflow. Cards use `--radius-md`; hero media and phone frames use `--radius-lg`; buttons and filters use `--radius-pill`.

### Motion

- Default duration: `500ms`; micro interactions: `180ms`; scan/profile reveal: `800ms`.
- Default easing: `cubic-bezier(0.22, 1, 0.36, 1)`; exit easing: `cubic-bezier(0.4, 0, 1, 1)`.
- Hero collar rotation and tag swing are tied to scroll progress and capped at a subtle range (`-5deg` to `5deg`).
- Scan line runs once when the phone enters the viewport; the profile card follows with a single upward reveal.
- Collar selector crossfades the accent color and uses a small image scale/translate response on hover or tap.
- Map pins pulse gently and counters animate once when the map section enters the viewport.
- Section content may fade/translate up by no more than 24px on entry. No perpetual animation except the low-amplitude map pulse.
- Every motion path must have a `prefers-reduced-motion: reduce` alternative: no scroll-linked transforms, no scan sweep, no counter tween, and no looping pulse. Content remains visible immediately.

## Section-by-section layout and copy

The English copy below is the source of truth for the first implementation. The Turkish copy should be authored in the same component data and switched by the EN/TR control; it must never be a partial translation or leave mixed-language UI visible.

### 1. Navigation

- Wordmark: `kedibul.`
- Links: `The idea`, `Collars`, `The map`, `Stories`
- Language toggle: `EN / TR`
- CTA: `Open the app`

### 2. Hero — “A city that knows its cats”

- Label: `ISTANBUL / COMMUNITY CAT CARE`
- Headline: `A city that knows its cats.`
- Body: `A Kedibul tag turns a passing encounter into useful care: scan a collar, meet the cat, and leave the right note for the next neighbor.`
- Primary CTA: `Get a collar`
- Secondary CTA: `See how it works`
- Small caption: `Built for the streets, ferries, and side roads of Istanbul.`
- Visual: red collar and QR tag on an Iznik-red panel; tag has the scroll-linked swing.

### 3. Scan demo — “One scan, the whole neighborhood”

- Label: `THE MOMENT OF CONTACT`
- Headline: `One scan. The whole neighborhood, in the loop.`
- Body: `No app download. No guesswork. A standard phone camera opens a living profile made from the people who see the cat every day.`
- Phone profile copy:
  - Name: `Misket`
  - Neighborhood: `Karaköy, Mumhane Street`
  - Temperament: `Friendly, observant`
  - Feeding note: `Likes wet food after the ferry rush. Fresh water by the blue door.`
  - Status: `Last checked by a neighbor · 2 hours ago`
- Button: `Open Misket’s profile`

### 4. Collar selector — “Pick a signal”

- Label: `FOUR WAYS TO BE SEEN`
- Headline: `Pick the signal that fits the street.`
- Intro: `Every color carries a small piece of information. Choose a QR collar, or add an AirTag holder for an extra layer of reassurance.`
- Green card: `Green / Friendly / “Say hello.”`
- Yellow card: `Yellow / Caution / “Give me a little space.”`
- Red card: `Red / Do not approach / “Watch from a distance.”`
- Gold card: `AirTag / Track + scan / “Two ways to find the way home.”`
- Price line on each card: `Price: TBA`
- CTA: `Choose this collar`

### 5. Istanbul map and stats — “A city of small guardians”

- Label: `THE KEDIBUL NETWORK`
- Headline: `Care travels by neighborhood.`
- Body: `From a tea garden in Kadıköy to the last tram in Beyoğlu, the people who notice a cat are already part of its safety net.`
- Map caption: `Illustrative district map — live coverage launches with the Kedibul community.`
- Stats:
  - `39` / `Istanbul districts`
  - `TBA` / `Registered cats`
  - `TBA` / `Community updates`
  - `TBA` / `Partner clinics`
- Source note: `Verified figures will be published here as the network opens.`

### 6. Cat stories — “Read the street”

- Label: `FROM THE PROFILE`
- Headline: `Every collar carries a local legend.`
- Intro: `A useful profile is practical first — and still leaves room for the story only a neighborhood could tell.`
- Story 1: `Misket / Karaköy / The ferry watcher / Friendly, observant`
- Story 2: `Toby / Taksim / Guardian of the metro / Friendly, always on time`
- Story 3: `Zeytin / Moda / The quiet regular / Cautious, loves sardines`
- Card footer: `Scan a collar to add a note`

### 7. Founders — “Made with the people who notice”

- Label: `WHY WE BUILT IT`
- Headline: `The best cat database is a city full of witnesses.`
- Body: `Kedibul began with a simple question: what if the small things Istanbul already knows about its cats could be useful to everyone who stops to help?`
- Founder card 1: `Iyed / Co-founder / Product, field research, and the first neighborhood profiles.`
- Founder card 2: `Wassam / Co-founder / Design, technology, and making the useful parts feel human.`
- Note: `Founder bios are short launch copy and should be replaced with approved biographies before publication.`

### 8. Footer

- Headline: `Leave the street a little more informed.`
- Body: `Bring a collar to a cat you know, or scan one you meet.`
- CTA: `Open the app`
- Links: `Instagram`, `Contact`, `Privacy`, `Terms`
- Locale: `Istanbul, Türkiye`
- Legal line: `Kedibul is a community information service, not a substitute for veterinary care or emergency help.`

## The four interactive “wow” moments

1. **The collar moves with the city.** The hero collar sits on a saturated color panel. As the user scrolls, the collar rotates a few degrees and the tag swings on its own transform origin, making the object feel worn rather than pasted into a hero.
2. **The scan becomes a handoff.** A CSS phone frame contains a deliberately readable QR pattern. When the phone enters the viewport, a Tram Yellow scan line sweeps across it once; the profile card then slides up with Misket’s name, neighborhood, temperament, and feeding note.
3. **Color becomes information.** Four large collar cards are both a selector and a legend. Hovering or tapping a card crossfades the section accent, changes the background wash and active marker, and keeps the selected collar visible without relying on color alone.
4. **Istanbul lights up by district.** A stylized SVG map uses a small set of recognizable district shapes and pulsing pins. Counters animate up when the section enters view, while the supporting caption makes clear which figures are illustrative or still TBA.

## Responsive acceptance criteria

- Mobile-first layout tested at 390px with no horizontal scrolling, clipped text, or equal-height cards that hide content.
- Desktop layout tested at 1440px with a centered page rail, readable line lengths, and no phone-width column.
- Navigation collapses to a compact control row at mobile widths; no more than four visible links at any breakpoint.
- The EN/TR toggle updates all visible navigation, headings, labels, buttons, card copy, stats labels, and footer copy.
- All images have meaningful alt text. Interactive cards are keyboard reachable and expose selected state.
- Reduced-motion mode keeps all content visible and removes scroll-linked and looping animation.

