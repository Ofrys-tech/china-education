export const experience = {
  breadcrumb: "Experience",
  meta: {
    title: "Student experience and admission results — ADLAS STUDY",
    description:
      "The ADLAS international student community and anonymized admission outcomes from Chinese universities. Demonstration stories are clearly labelled; private documents are never published.",
  },
  hero: {
    eyebrow: "Community · Results",
    titleLines: ["One world.", "One family.", "One ADLAS."],
    lead: "Students from North Africa, the Arab world, sub-Saharan Africa, Europe and Asia choosing a future in China. Different passports, one shared decision.",
    aside:
      "We publish stories only with written permission. Until then, demonstration profiles are clearly labelled — never presented as real clients.",
    link: "Talk to an advisor",
  },
  community: {
    index: "01 / Community",
    eyebrow: "Who we work with",
    titleLines: ["A passport is", "not a personality."],
    aside:
      "ADLAS is built for students from many countries and backgrounds. The list below reflects the markets we serve, not a limit on who can apply.",
    countries: [
      "Morocco",
      "Algeria",
      "Tunisia",
      "Libya",
      "Egypt",
      "Saudi Arabia",
      "Sudan",
      "Jordan",
      "Nigeria",
      "Ghana",
      "Senegal",
      "Côte d'Ivoire",
      "Mali",
      "Tanzania",
      "Europe",
      "Asia",
    ],
    statement:
      "One World. One Family. One ADLAS. Respect for language, culture and religion is not a slogan — it is the condition for working together.",
  },
  stories: {
    index: "02 / Student voices",
    eyebrow: "Illustrative profiles",
    titleLines: ["What the journey", "can feel like."],
    aside:
      "These profiles are written to illustrate common situations. They are not real testimonials and do not describe real ADLAS clients.",
    demoLabel: "Illustrative — not a real testimonial",
    items: [
      {
        country: "Morocco",
        quote:
          "I had a list of famous universities and no idea what I could afford. The first conversation replaced the list with a plan.",
        meta: "Engineering · Bachelor's · China",
      },
      {
        country: "Nigeria",
        quote:
          "The translations and deadlines were the part I could not manage alone. Someone checked every document before it was submitted.",
        meta: "Computer science · Master's · China",
      },
      {
        country: "Saudi Arabia",
        quote:
          "My HSK was not ready for a Chinese-taught degree. The language year gave me a route instead of another rejection.",
        meta: "Chinese language year · China",
      },
    ],
    note: "ADLAS never invents customer reviews. Real stories will replace these examples only after written permission and identity checks.",
  },
  results: {
    index: "03 / Admission results",
    eyebrow: "Anonymized outcomes",
    titleLines: ["The letter", "is the proof."],
    aside:
      "Recent admission files, stripped of names, passport numbers, application numbers, QR codes, addresses, dates of birth and signatures. Program details are shown only where confirmed.",
    cards: [
      {
        university: "Shenyang Urban Construction University",
        short: "SYUCU",
        city: "Shenyang",
        program: "Chinese Language Course",
        level: "Language year",
        language: "Chinese",
        period: "2026–2027",
        funding: "New Student Scholarship — ¥8,500 / year",
        outcome: "Admission notice",
        tuition: "¥10,000 / year",
      },
      {
        university: "Jilin University",
        short: "JLU",
        city: "Changchun",
        program: "Computer Science & Technology",
        level: "Bachelor's",
        language: "English",
        period: "2026–2030",
        funding: "Pre-admission",
        outcome: "Letter of pre-admission",
        tuition: "RMB 24,000 / year",
      },
      {
        university: "Changsha University of Science and Technology",
        short: "CSUST",
        city: "Changsha",
        program: "Transportation Engineering",
        level: "Bachelor's",
        language: "English",
        period: "2026–2030",
        funding: "Conditional scholarship",
        outcome: "Admission notice",
        tuition: "Tuition & accommodation waived*",
      },
      {
        university: "South China University of Technology",
        short: "SCUT",
        city: "Guangzhou",
        program: "Computer Science & Technology",
        level: "Bachelor's",
        language: "English",
        period: "2026–2030",
        funding: "Self-sponsored",
        outcome: "Admission letter",
        tuition: "Self-funded",
      },
    ],
    note: "Anonymized examples from submitted admission documents. A university name is not a partnership claim, and past outcomes do not guarantee future admission.",
    footnote:
      "*Conditional scholarship subject to annual review; single and double room options may carry accommodation fees. Confirm the current terms with the university.",
    redactedLabel: "Personal data removed",
    documentsLabel: "Source document",
  },
  diversity: {
    index: "04 / Respect",
    eyebrow: "How we treat people",
    titleLines: ["No one is", "a category."],
    aside:
      "We work with students of different nationalities, languages and religions. The same standards apply to everyone: honest advice, clear costs and no pressure.",
    points: [
      "Advice in English, with Arabic, French and Spanish support as the team grows",
      "No country quotas disguised as “preferences”",
      "No religious or political questions unrelated to the application",
      "Confidential handling of documents and personal data",
    ],
  },
  cta: {
    title: "Your story starts with a conversation.",
    text: "Tell us where you are and what you want to study. We will tell you honestly what is possible.",
    primary: "Start your application",
    secondary: "See how it works",
  },
} as const;
