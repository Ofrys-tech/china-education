export const notFound = {
  meta: {
    title: "Page not found",
    description: "This page doesn't exist. Return home or book a consultation.",
  },
  code: "404",
  title: "This page went to study abroad.",
  text: "The link may be out of date. Start from the homepage or go straight to the application.",
  home: "Back home",
  apply: "Apply now",
} as const;

export const styleguide = {
  breadcrumb: "Design system",
  meta: {
    title: "Design system",
    description: "Internal reference for ChinaPath design tokens, typography and components.",
  },
  hero: {
    eyebrow: "Internal tool",
    titleLines: ["Design", "system."],
    lead: "Palette, typography and base components. Change tokens in src/styles/tokens.css and every page follows.",
    aside:
      "This page is not indexed. Use it to discuss redesigns and test new components before they reach the site.",
    home: "Back home",
  },
  colors: {
    index: "01 / Colour",
    title: "Palette",
    aside: "Warm paper, ink and seal red.",
  },
  type: {
    index: "02 / Typography",
    title: "Prata + Golos Text",
    aside: "Serif for the voice, sans for the interface.",
    samples: [
      {
        label: "Display hero",
        className: "display display--hero",
        sample: "China, without the guesswork",
      },
      { label: "Display L", className: "display display--l", sample: "A clear route" },
      { label: "Display M", className: "display display--m", sample: "Not just the top 10" },
      {
        label: "Lead",
        className: "lead",
        sample: "We match your profile, budget and ambitions with the right program.",
      },
    ],
  },
  components: {
    index: "03 / Components",
    title: "Buttons & labels",
    aside: "Check every state in the browser, not only in code.",
    buttons: ["Primary", "Ghost", "Light"],
    tags: ["Language year", "Bachelor's", "Scholarships"],
    fieldsLabel: "Form fields",
    nameLabel: "Name",
    namePlaceholder: "Anna Lee",
    selectLabel: "Field of study",
    selectOptions: ["Business, economics, finance", "Engineering"],
    statusesLabel: "Statuses",
    statuses: [
      { state: "success", text: "Application received. We'll reply within one business day." },
      { state: "error", text: "Please check the highlighted fields." },
      { state: "info", text: "Sending your application…" },
    ],
  },
} as const;
