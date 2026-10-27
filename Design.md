# Design

Mood only, from the published Minimal UI theme behind https://mui.com/store/previews/minimal-dashboard/. Mood means colour, type, radius, shadow, and density. It does not mean the dashboard layout.

Intent: dense, precise, operational. A working list, not a marketing page.

## Extracted theme

Source of every value below: the live Minimal UI theme CSS variables read from https://minimals.cc/ (the page the MUI Store preview embeds), plus https://docs.minimals.cc/colors/ and https://docs.minimals.cc/v5/typography/. No screenshot was used. No hex is invented.

- background: #FFFFFF (`palette.background.default`). Sunken/neutral surface #F4F6F8 (`palette.background.neutral`)
- paper: #FFFFFF (`palette.background.paper`)
- text primary: #1C252E (`palette.text.primary`, equals `grey.800`)
- text secondary: #637381 (`palette.text.secondary`, equals `grey.600`)
- primary: #00A76F (`palette.primary.main`). Ramp: lighter #C8FAD6, light #5BE49B, dark #007867, darker #004B50, contrastText #FFFFFF
- divider: rgba(145, 158, 171, 0.20)
- input fill: #FFFFFF. The OutlinedInput itself is transparent; `background.paper` #FFFFFF reads through it. The 1px border below is what defines the control edge
- font family: Public Sans, sans-serif. Headings h1–h3 use Barlow in the source theme; h4–h6, body, button, and caption use Public Sans
- body size: 14px
- caption floor: 12px
- weight body: 400
- weight headings: 600
- weight display: 700
- line-height body: 1.5
- line-height headings: 1.25
- radius: 8px (`shape.borderRadius`). See the radius note below
- border: 1px solid rgba(145, 158, 171, 0.20) — the same value as divider
- shadow: 0 0 2px 0 rgba(145, 158, 171, 0.20), 0 12px 24px -4px rgba(145, 158, 171, 0.12) (`customShadows.card`)
- density: spacing base 8px; table row height 56px; table cell padding 16px; control height 56px for a medium outlined input
- hover: rgba(145, 158, 171, 0.08) (`action.hover`)
- focus: rgba(145, 158, 171, 0.24) (`action.focus`)
- selected: rgba(145, 158, 171, 0.16) (`action.selected`)
- disabled: text rgba(145, 158, 171, 0.80) (`action.disabled`); background rgba(145, 158, 171, 0.24) (`action.disabledBackground`); disabled text colour #919EAB (`text.disabled`)
- success: #22C55E (lighter #D3FCD2, light #77ED8B, dark #118D57, darker #065E49)
- warning: #FFAB00 (lighter #FFF5CC, light #FFD666, dark #B76E00, darker #7A4100, contrastText #1C252E)
- error: #FF5630 (lighter #FFE9D5, light #FFAC82, dark #B71D18, darker #7A0916)
- info: #00B8D9 (lighter #CAFDF5, light #61F3F3, dark #006C9C, darker #003768)

**Radius note.** The theme carries one token, `shape.borderRadius: 8`. The source theme then overrides Card/Paper to 16px, which is 2× that token. Our one radius is the 8px token. Where a container wants the larger corner, it is `shape.borderRadius * 2`, never a third value and never a raw pixel.

**Grey ramp**, for neutrals only: 100 #F9FAFB, 200 #F4F6F8, 300 #DFE3E8, 400 #C4CDD5, 500 #919EAB, 600 #637381, 700 #454F5B, 800 #1C252E, 900 #141A21.

Every "not visible" case is absent: each token above was read from the live theme. Material UI default blue #1976d2 does not appear anywhere in the extracted theme and is not used. Roboto appears only as a fallback inside the font stack, after Public Sans and the system fonts; it is not the chosen family.

If a state colour is not visible, write "not visible" and derive that state by changing emphasis of an extracted colour (opacity or overlay). Do not introduce a new hue.

Light UI only, unless the screenshots show a dark UI. Do not invent a dark theme.

## Stack for visuals

- @mui/material and @mui/icons-material, used as-is.
- Styling is a MUI theme (createTheme, ThemeProvider, CssBaseline) and component props / sx that read from that theme.
- Emotion is only the engine MUI already uses.
- Do not install Tailwind. Do not install shadcn/ui. Do not install a paid Minimal template, kit, or theme package. Do not copy that template's source.
- Do not add @mui/x-data-grid. Use Table from @mui/material.
- Do not paste a theme from a generator site. Do not leave the default MUI palette in place.

## What not to copy

- No sidebar.
- No KPI cards.
- No charts.
- No logo.
- No dashboard shell, no app bar full of dashboard links, no settings, no profile.
- Do not open with a big-number-and-label hero. Lead with the shopping list.
- The visible page title is "Shopping list".

## Palette

- At most three chromatic colours in play.
- Primary appears once per screen, on the main action.
- Neutrals for background, paper, text, and divider come from the extracted theme.
- Success, warning, error, and info appear only when that state is on screen.
- Colour signals state only. Never use colour as decoration.
- Default fill, hover, and selected must look different from each other.
- One tint must not do three jobs.

## Typography

- MUI type scale only.
- Body default 14px. Floor 12px, captions only.
- Weights: 400 body, 600 headings, 700 display.
- Never weight 300. Never set fontWeightLight.
- Line-height 1.5 for body, 1.25 for headings.
- Sentence case, except labels locked by the build prompt.
- The font is the extracted family. Do not pick a font on your own.

## Spacing, radius, border, shadow

- Spacing: the MUI theme.spacing scale only. No raw pixel padding or gaps.
- One radius, one border, and one shadow, from the extracted theme, on every container.
- No --v-* frame variables. There is no dashboard frame. All colour, type, radius, shadow, and density live in the one MUI theme.

## Watermark

- One grey semi-transparent note, position fixed, bottom-right.
- It must not cover Add Item, the filter, Save, Delete, or Cancel.
- Use a theme text colour and opacity, not a new hue.
- Heading: Open product question
- Bullets, in this order: Add pattern; Sign in page; Whether an empty list opens the form; Whether a status change keeps the row in the current filter; Load error retry; Button labels; Accessibility; Purchased control; Empty-list wording; No-match wording; Delete confirmation wording.

## NEVER BREAK

1. Use @mui/material and @mui/icons-material as-is. Never build a custom version of a component the library already has.
2. Tokens only. No hardcoded colour, size, spacing, or radius in sx, style, or CSS. Values come from the theme.
3. MUI theme spacing scale and typography variants only. Never arbitrary values (fontSize: 15, p: '13px', borderRadius: '7px').
4. Never font weight 300. Never below 12px.
5. Colour signals state only. Never decoration.
6. Every control gets a visible border and all five states: default, hover, focus, selected, disabled. Every screen gets empty, loading, and error.
7. Every page, block, panel, and modal gets a visible title.
8. If the logo SVG was not attached, STOP and ask. Never invent one.
   OVERRIDE: No logo file is attached, and this prototype must not have one. Do not stop to ask. Do not invent an SVG. Do not place a logo in a header, sidebar, footer, or on the watermark. The watermark is the open-product-question note, not a logo.

## Scope rules that affect the visuals

- One end-to-end flow only. No auth, login, signup, profile, or settings screens. No empty placeholder pages.
  OVERRIDE: The build steps put six flows on the one shopping-list page. Keep the ban on auth, login, signup, profile, settings, and placeholder pages. There is no sign-in screen.
- One-click demo data — a single button populates realistic test data.
  OVERRIDE: The build steps start empty. No demo-fill button. No Reset button.
- One wow moment — one impressive interactive feature.
  OVERRIDE: Do not add a wow feature.
- Provenance — every AI output shows its source.
  OVERRIDE: Do not add an AI provenance panel.
- Placeholder data is fine. Placeholder copy is not. No lorem, no "Item name here", no sample dates.

## Component usage

- Check @mui/material before writing anything custom.
- Configure existing variants and props. Do not rebuild or restyle a component from scratch.
- Never fork a component to change its look. Change the theme token.
- Use the component's own slots for labels, headers, and icons. Do not add a custom layer beside a component to recreate content it already supports.
- If the built-in result looks wrong, configure it differently. Do not bypass it.
- Prefer a library component over freeform composition for anything assembled from parts.

Controls (input, select, filter, number input):
- Default state: a solid fill plus a visible light border. Both are required. A control without a border is not a control.
- The border must be visible against the surface. Never rely on fill alone to define the edges.
- The guideline names the default fill as white #FFF.
  OVERRIDE: Use the extracted input fill. Do not hardcode #FFF unless that hex was extracted from the screenshot. The visible border stays required.
  The extracted input fill is #FFFFFF, read from `palette.background.paper` in the live Minimal theme. The extracted border is 1px solid rgba(145, 158, 171, 0.20).
- Tint is hover and focus only. A tinted default state reads as disabled.
- Disabled is visually distinct from default: muted text and a muted border, not only a fill change.
- Selects follow the input rule. A borderless select reads as static text.

Buttons:
- A grey outline belongs to controls, never to buttons. Outlined buttons use the interactive colour.
- Full-width only inside dialogs.
- Primary: once per screen, on the main action, never destructive. Secondary may repeat. Destructive always confirms and is never the default.
- Label by what it does. The build steps lock the label strings. Do not rename them.
- The extracted button treatment is weight 700, radius 8px, and no shadow.

Tables and lists:
- Use a Table, or an aligned grid that shares the one theme radius. Never invented chip-cards.
- Truncate at the end of the name. Never truncate through the start of the name.
- If a filter shows counts, the counts must reconcile with the rows. Do not show a count that was not computed from the items.
- The extracted table density is a 56px row, 16px cell padding, and a head cell on #F4F6F8 in #637381 at weight 600.

Modals:
- Visible title, close control top-right.
- Short forms belong in a dialog, not embedded in the page.

Icons, from @mui/icons-material only:
- Right arrow means send. Up arrow means upload. Do not swap them.
- Down chevron means expand in place. Right chevron means navigate away.
- No oversized decorative bullets.
- This page does not send, upload, or navigate away. Do not add those icons for decoration.

## States

Every interactive component: default, hover, focus, selected, disabled.
Every screen: empty, loading, error.

- Empty states invite the next action. Never a dead end.
- Errors say what happened and what to do next, in the sentences from the build steps.
- Anything already complete loses its active control.
  OVERRIDE: A Purchased item keeps its checkbox so the shopper can return it to To Buy. Purchased still looks different from To Buy.
- Loading is a MUI Skeleton only. No invented loading sentence.

## Layout and hierarchy

- One obvious primary action per screen. On the page that is Add Item. Inside the add/edit dialog that is Save. In the delete dialog the safe default is Cancel.
- Navigation order follows convention: completed goes last.
  OVERRIDE: There is no left nav and no dashboard home. Do not add one. The filter order is All, then To Buy, then Purchased.
- One deliberate bold move; everything else quiet and precise. The bold move is the primary button in the extracted primary colour #00A76F.
- Every summarised item links to its source record.
  OVERRIDE: There is no separate source record. The row is the item. Do not add a detail page or a source link.

## Do

- Use a library component before writing a custom one.
- Give every control a visible border and all five states.
- Keep one radius across every container.
- Give every block, panel, and modal a title.
- Use the MUI theme spacing scale and type variants.
- Keep one primary action per screen.
- Write the real copy from the build steps.
- The guideline also says: show the source of every AI output.
  OVERRIDE: Do not add an AI provenance panel.

## Don't

- Don't put a grey outline on a button.
- Don't leave a select or input borderless.
- Don't tint a default state. It reads as disabled.
- Don't use colour as decoration.
- Don't use weight 300 or go below 12px.
- Don't open with four identical KPI cards.
- Don't leave placeholder text or wrong dates.
- Don't invent a logo.
  OVERRIDE: Do not stop and ask. Do not invent a logo. Build without one.

## Banned patterns

- Purple/cyan gradients.
- Glassmorphism.
- Gradient text on metrics.
- Four identical icon-and-number KPI cards.
- Cards nested in cards.
- Bounce or elastic easing.
- Animation-heavy component libraries.
- Gradients on the frame or on a call to action. Solid fills only.
- A default font chosen automatically. The font is the extracted family.
- Material UI default blue #1976d2 and Roboto, unless they are the extracted values.

## Visual self-check

- [ ] Extracted theme values are filled. "not visible" is used where the screenshot does not show a token.
- [ ] Library components only. No custom rebuilds of Button, TextField, Dialog, Checkbox, Table, Skeleton, or Alert.
- [ ] Theme tokens and the MUI spacing / type scale only. No hardcoded or arbitrary values.
- [ ] Every input and select has a visible border in its default state.
- [ ] No control's default state could be mistaken for disabled.
- [ ] All five component states exist. Empty, loading (skeleton only), and error exist.
- [ ] Every page, block, panel, and modal has a title. One primary action per screen.
- [ ] Banned-patterns list clean.
- [ ] No logo anywhere.
- [ ] No sidebar, KPI cards, charts, or --v-* frame.
- [ ] Watermark is fixed bottom-right, does not cover the primary actions, and lists the eleven bullets.
