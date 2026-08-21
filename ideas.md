# Lumora Recreation — Ground-Truth Design Specification

This project reproduces the supplied reference site at https://pure-lumora-flow.base44.app/ rather than inventing a new direction. Fidelity to the reference overrides generic design defaults.

## Reference Spec

The experience is an editorial, monochrome-to-copper studio landing page for Lumora, an independent design and engineering studio. The page opens with a full-viewport hero on a pale gray portrait image, a quiet black header, oversized black headline on the left, a floating translucent project card on the right, and a large translucent LUMORA watermark anchored near the bottom. The page continues as a long-form single page with a white About section, a four-tile create band, selected work list, services list, metrics, dark CTA, footer, and an off-canvas project form.

## Visual Language

- **Design movement:** Contemporary Swiss editorial minimalism with art-direction photography and restrained digital utility.
- **Core principles:** Quiet precision; asymmetrical composition; monochrome surfaces with one warm copper accent; typography-led hierarchy; motion that is subtle, directional, and fast.
- **Color philosophy:** Use near-black ink (#0a0a0a), warm white (#ffffff), pale stone surfaces (#f1f0ee), cool gray hero values, and a single copper accent (#b15f2c / #cf8047). Copper is reserved for the spark mark, rating stars, active states, and the primary CTA so it reads as an ownable signal rather than decoration.
- **Layout paradigm:** Full-bleed editorial sections with oversized type, 12-column desktop composition, left-aligned reading columns, right-aligned utility cards, and generous vertical pacing. Avoid a generic centered marketing grid.
- **Signature elements:** Copper four-point spark mark; rounded translucent utility card; oversized translucent LUMORA watermark; pill-shaped controls with compact uppercase labels; thin hairline dividers.
- **Interaction philosophy:** Every control feels like a physical object: quick hover lift, slight scale on press, underlines or opacity changes on navigation, and off-canvas panels for focused tasks. Keyboard focus remains visible.
- **Animation:** Short entrance reveal for loader, header, hero copy, and cards; use transform and opacity only; hero image has a slow, barely perceptible scale drift; menu and contact drawer slide from the right; respect reduced motion.
- **Typography system:** Onest for all UI and editorial copy, using 400/500/600/700. Large hero type is 600 with tight tracking and ~0.98 line-height. Supporting labels are 11–13px uppercase with letter spacing. Avoid Inter and avoid decorative display fonts so the recreation matches the reference.
- **Brand essence:** An independent studio for ambitious teams that want bold digital products shipped with quiet precision. Personality: exacting, warm, composed.
- **Brand voice:** Headlines are concise and confident; CTAs are direct and human; microcopy is calm and useful. Example lines: “Bold ideas, shipped with quiet precision.” and “Tell us what you’re building.”
- **Wordmark & logo:** The wordmark is a compact “Lumora” lockup preceded by a copper spark; the standalone mark is a four-point asymmetric spark with no text.
- **Signature brand color:** Warm copper #b15f2c.

## Content Inventory

Navigation: Lumora, Home, Work, Services, Studio, Careers, Contact, Menu, Let's Talk.
Hero: Independent Studio; Bold ideas, shipped with quiet precision; 200+ brands shipped; Conversion design / Crafted to convert.; Trusted by; Kaido, Northpeak, Vellum, Orbit, Brightline, Cobalt, Mesa; Working since 2014; Remote-first, worldwide; Scroll to explore.
About: The Studio; A distributed team building across every time zone.; We partner with ambitious teams to ship digital products, brand systems, and the strategy that holds them together.; Find us online; About Us.
Portfolio: Aster Labs, Nova Finance, Helio Studio, Pulse Health, with the reference descriptions and year/category labels.
Services: Software Development, Product Design, Quality Assurance, Consulting.
Metrics: 200+ Projects delivered; 98% Client retention; 12 Years of craft; 24+ Team members.
CTA: Have a project in mind? Let's get to work.; Start a project.
Footer: company, services, social, legal links, and copyright.

## Implementation Reminder

The recreation should keep the reference's visual rhythm and wording, while making buttons and links functional: smooth-scroll section navigation, hero carousel controls, menu overlay, contact drawer with a client-side success state, and responsive mobile layout.
