export const scholarships = {
  breadcrumb: "Scholarships",
  meta: {
    title: "Scholarships in China — CSC, provincial and university funding",
    description:
      "How Chinese scholarships work: CSC, provincial, municipal, university and institutional awards, benefits, eligibility and realistic application timelines. No guaranteed funding.",
  },
  hero: {
    eyebrow: "Funding · China",
    titleLines: ["Money follows", "preparation."],
    lead: "Scholarships are competitive, but they are not random. The right award depends on your nationality, level, university and how early you prepare.",
    aside:
      "ADLAS does not sell scholarships and cannot guarantee funding. We assess eligibility, build the strongest file and tell you when an award is out of reach.",
    link: "Check your eligibility",
  },
  intro: {
    index: "01 / Reality",
    eyebrow: "Before you apply",
    titleLines: ["A scholarship is", "a separate application."],
    lead: "A university offer and a scholarship are two different decisions. Strong grades help, but so do the choice of university, the quality of your study plan and meeting a deadline that is often months earlier than admission.",
    points: [
      "Most awards are competitive and limited by quota.",
      "Requirements differ by scheme, province and university.",
      "A scholarship can cover tuition only, or tuition plus housing and stipend.",
      "Receiving an offer does not automatically mean receiving funding.",
    ],
  },
  categories: {
    index: "02 / Schemes",
    eyebrow: "The five families",
    titleLines: ["Where the money", "actually comes from."],
    aside:
      "Names and benefits change each year. We confirm the current call, eligibility and deadline with the official source before you apply.",
    items: [
      {
        name: "Chinese Government Scholarship (CSC)",
        level: "National",
        text: "The best-known route, administered through the China Scholarship Council and selected universities. Usually covers tuition, accommodation and a monthly stipend.",
        benefits: ["Tuition", "Accommodation", "Stipend", "Insurance"],
      },
      {
        name: "Provincial government scholarships",
        level: "Province",
        text: "Regional schemes with quotas for international students. Often linked to specific provinces and universities, with their own deadlines.",
        benefits: ["Tuition", "Partial living support"],
      },
      {
        name: "Municipal government scholarships",
        level: "City",
        text: "City-level awards, common in major study destinations. Conditions and benefits vary widely by municipality.",
        benefits: ["Tuition", "Occasional stipend"],
      },
      {
        name: "University scholarships",
        level: "Institution",
        text: "Tuition waivers, partial grants and merit awards offered directly by universities to strengthen their international cohort.",
        benefits: ["Tuition waiver", "Partial grant"],
      },
      {
        name: "Institutional and programme awards",
        level: "Faculty",
        text: "Faculty, department or partner funding for specific programs. Usually narrow, documented and highly competitive.",
        benefits: ["Program-specific support"],
      },
      {
        name: "Other verified opportunities",
        level: "Variable",
        text: "Only schemes we can confirm through an official call. If we cannot verify it, we do not present it as an option.",
        benefits: ["Case by case"],
      },
    ],
  },
  benefits: {
    index: "03 / What is covered",
    eyebrow: "Benefits",
    titleLines: ["Read the benefit", "before the headline."],
    aside:
      "“Full scholarship” is not a universal definition. Ask what is covered, for how many years and what you still pay.",
    items: [
      {
        title: "Tuition",
        text: "Full or partial coverage, sometimes excluding certain program fees.",
      },
      {
        title: "Accommodation",
        text: "A dormitory place or a housing allowance; private flats are usually not covered.",
      },
      {
        title: "Monthly stipend",
        text: "Paid at a rate set by the scheme, level and year — not a salary.",
      },
      {
        title: "Medical insurance",
        text: "Often included; check the coverage and the hospital network.",
      },
      {
        title: "Other benefits",
        text: "Registration fees, language courses or research support in some schemes.",
      },
    ],
    note: "Benefits are confirmed against the current official call. A previous year's package is not a promise for this year.",
  },
  eligibility: {
    index: "04 / Eligibility",
    eyebrow: "The honest checklist",
    titleLines: ["What actually", "gets checked."],
    aside: "Every scheme is different, but these are the questions that decide most applications.",
    items: [
      "Nationality and age limits for the specific scheme",
      "Highest completed qualification and academic record",
      "Language level: HSK for Chinese-taught, English evidence for English-taught",
      "University or province eligibility and quota",
      "Study plan, references and research fit",
      "Health, insurance and legal requirements",
      "Deadline and completeness of the file",
    ],
  },
  process: {
    index: "05 / Process",
    eyebrow: "How we work",
    titleLines: ["Assess. Prepare.", "Submit. Wait."],
    steps: [
      {
        title: "Eligibility review",
        text: "We compare your profile with current calls and say clearly which schemes are realistic, which are ambitious and which are not worth the fee.",
      },
      {
        title: "University strategy",
        text: "Some scholarships require a university nomination. We choose institutions where your profile and the funding route align.",
      },
      {
        title: "Documents and study plan",
        text: "References, motivation letter, research plan and translations are prepared to the scheme's criteria — not recycled from another application.",
      },
      {
        title: "Submission and follow-up",
        text: "We track the portal, the university and the scholarship body, and tell you what to do if the status does not move.",
      },
    ],
  },
  myths: {
    index: "06 / Boundaries",
    eyebrow: "What we will not say",
    titleLines: ["No guarantees.", "No lottery tickets."],
    items: [
      "“Guaranteed scholarship” — no consultant controls the committee.",
      "“Everyone gets funding” — most awards are competitive and limited.",
      "“This university always accepts” — requirements change by intake.",
      "“Pay now, decide later” — a deposit is a commitment, not a reservation.",
    ],
    note: "If an offer sounds too easy, ask who makes the decision and what happens if it is negative. We answer that before you pay.",
  },
  cta: {
    title: "Want to know which funding route fits you?",
    text: "Start with an eligibility conversation. We will tell you what is realistic before you spend time on an application.",
    primary: "Check my eligibility",
    secondary: "See the process",
  },
} as const;
