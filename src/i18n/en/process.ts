export const process = {
  breadcrumb: "How it works",
  meta: {
    title: "How applying to study in China works — ADLAS STUDY",
    description:
      "The ADLAS student journey: consultation, university strategy, documents, applications, scholarship, offer, visa and arrival. Timelines, checklists and honest limits.",
  },
  hero: {
    eyebrow: "Process · 2027 intake",
    titleLines: ["A clear route.", "A known owner."],
    lead: "Five stages from the first conversation to your first day on campus. Every stage has an outcome, a deadline and one advisor who owns it.",
    aside:
      "Start 8–12 months before September. Scholarship routes close earlier, often between December and March. A late start narrows the options — it does not make them impossible.",
    link: "Check my timeline",
  },
  steps: [
    {
      title: "Understand you",
      when: "30–45 minutes",
      text: "We discuss your background, grades, language, budget, family expectations and timeline. This is where we say honestly whether the plan is realistic.",
      items: ["Academic profile", "Language level", "Budget", "Destination and city"],
    },
    {
      title: "Build the strategy",
      when: "3–7 days",
      text: "We prepare 3–5 program options across different universities: ambitious, realistic and safer. Each comes with requirements, costs, deadlines and scholarship odds.",
      items: ["Program shortlist", "First-year budget", "Deadline calendar", "Scholarship routes"],
    },
    {
      title: "Prepare the file",
      when: "2–6 weeks",
      text: "We assemble and check the application package: translations, legalisation, references, motivation letters and portfolios. You provide official originals; we own completeness.",
      items: [
        "Certificates & transcripts",
        "Translations",
        "References & essays",
        "Portfolio or study plan",
      ],
    },
    {
      title: "Apply and follow up",
      when: "December–April",
      text: "We submit applications, pay fees where required, prepare interviews and entrance exams, and handle university correspondence. Statuses are tracked in one place.",
      items: ["Online applications", "Fees & deposits", "Interviews", "Admissions replies"],
    },
    {
      title: "Offer and arrival",
      when: "May–September",
      text: "After the offer: compare conditions, pay the deposit, obtain JW202, apply for the visa, arrange housing and insurance, and prepare for registration.",
      items: ["Offer comparison", "JW202 & visa", "Housing & insurance", "Arrival & orientation"],
    },
  ],
  documents: {
    index: "01 / Documents",
    eyebrow: "Checklist",
    titleLines: ["What you will", "actually need."],
    aside:
      "The list changes by university, but these documents appear in almost every application. You obtain the official originals; we check completeness, translation and submission.",
    headers: ["Document", "When", "Prepared by", "Notes"],
    rows: [
      ["Passport", "Before applying", "Student", "Valid for at least 18 months from travel."],
      [
        "School or degree certificate",
        "Before applying",
        "Student",
        "Original plus translation; legalisation where required.",
      ],
      [
        "Academic transcript",
        "Before applying",
        "Student",
        "Needed for most bachelor's, master's and PhD routes.",
      ],
      ["Translations", "Before applying", "ADLAS", "Checked against each university's rules."],
      ["References", "3–6 months", "Student + ADLAS", "Two academic or professional letters."],
      [
        "Motivation letter",
        "3–6 months",
        "ADLAS",
        "Built from your facts; never copied from a template.",
      ],
      [
        "Language certificate",
        "3–6 months",
        "Student",
        "HSK, IELTS or TOEFL as required by the program.",
      ],
      [
        "Portfolio / study plan",
        "3–6 months",
        "Student + ADLAS",
        "For design, architecture, art and research degrees.",
      ],
    ],
    note: "Legalisation, notarisation and document validity depend on the university and the issuing country. We verify the official rules for your intake.",
  },
  calendar: {
    index: "02 / Calendar",
    eyebrow: "2027 intake",
    titleLines: ["The application year,", "month by month."],
    aside:
      "An indicative calendar for a September 2027 start. Exact dates depend on the university; scholarships and some programs close earlier.",
    headers: ["Period", "What happens", "Outcome"],
    rows: [
      ["September–December", "Profile, language plan, budget and shortlist", "Strategy & budget"],
      [
        "December–March",
        "CSC, provincial and early university deadlines",
        "Scholarship applications",
      ],
      ["January–April", "Main round: documents, essays and submissions", "Packages submitted"],
      ["March–June", "Interviews, exams and university decisions", "Offers & deposits"],
      ["June–August", "JW202, visa, housing, insurance and flights", "Ready to move"],
      ["September", "Campus registration and orientation", "Classes start"],
    ],
    note: "Less than six months before September is not a verdict, but the choice will be narrower. We will assess realistic options on a call.",
  },
  mistakes: {
    index: "03 / Risks",
    eyebrow: "Common mistakes",
    titleLines: ["Where applications", "usually break."],
    aside:
      "These four mistakes appear most often. Our process is designed so they do not become your story.",
    items: [
      {
        title: "One university only",
        text: "One rejection should not cost a year. Apply to several options with different risk levels.",
      },
      {
        title: "Starting in June",
        text: "Late applications can work, but scholarships and popular programs are usually closed. Start early.",
      },
      {
        title: "Ignoring the language",
        text: "An English-taught label does not always mean every course is in English. Check the curriculum.",
      },
      {
        title: "Budgeting only tuition",
        text: "Housing, insurance, flights, deposits and daily life are part of the real number.",
      },
    ],
  },
  cta: {
    title: "Ready to see your own timeline?",
    text: "A free conversation gives you a realistic calendar, a budget and the documents to start collecting.",
    primary: "Book a consultation",
    secondary: "Read the FAQ",
  },
} as const;
