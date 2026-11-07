export const process = {
  breadcrumb: "How it works",
  meta: {
    title: "How to apply to China",
    description:
      "The step-by-step admissions process for China: diagnostic, strategy, documents, submission, offer and visa. Timelines, document checklist and common mistakes.",
  },
  hero: {
    eyebrow: "Process · 2027 intake",
    titleLines: ["Admissions,", "run like a project."],
    lead: "Five stages, clear outcomes and one advisor. Below is the whole logic, including the uncomfortable parts: timelines, risks and what doesn't depend on us.",
    aside:
      "Start 8–12 months before September. For CSC scholarships, earlier: deadlines often fall between December and February.",
    link: "Check my timeline",
  },
  steps: [
    {
      title: "Diagnostic",
      when: "30–60 minutes",
      text: "We unpack the goal, academic profile, language, budget and timeline. This is also where we say honestly if the chosen scenario is unrealistic.",
      items: ["Goal and deadline", "Grades and language", "Family budget", "City constraints"],
    },
    {
      title: "Strategy",
      when: "3–7 days",
      text: "We build 3–5 programs in three categories: ambitious, realistic and safety. With deadlines, costs and scholarship odds.",
      items: ["Program shortlist", "First-year budget", "Deadline calendar", "Language plan"],
    },
    {
      title: "Documents",
      when: "2–6 weeks",
      text: "We assemble and check the package: translations, legalisation, references, essays and portfolios. You obtain official documents from your institutions; we run the process.",
      items: [
        "High school / degree certificate",
        "Transcript",
        "Translations & apostille",
        "Essays & references",
      ],
    },
    {
      title: "Applications",
      when: "December–April",
      text: "We submit applications, pay fees, prepare for interviews and entrance exams. All university correspondence is on us; statuses live in one tracker.",
      items: ["Online applications", "Fees & deposits", "Interviews", "Admissions replies"],
    },
    {
      title: "Offer & arrival",
      when: "May–September",
      text: "After the offer: deposit, JW202, visa, housing, insurance and a pre-departure briefing. We help with your first days on campus instead of disappearing after admission.",
      items: ["Offer & deposit", "JW202 & visa", "Housing & insurance", "Arrival & orientation"],
    },
  ],
  documents: {
    index: "01 / Documents",
    eyebrow: "Checklist",
    titleLines: ["What you'll actually", "need."],
    aside:
      "The list changes by university, but these documents are almost always required. You obtain the official originals; we own completeness, translation and submission.",
    headers: ["Document", "When", "Prepared by", "Notes"],
    rows: [
      ["Passport", "Before applying", "Student", "Valid for at least 18 months from travel."],
      [
        "High school / degree certificate",
        "Before applying",
        "Student",
        "Original + translation; apostille/legalisation where required.",
      ],
      [
        "Academic transcript",
        "Before applying",
        "Student",
        "For master's and some bachelor's programs.",
      ],
      [
        "Translations",
        "Before applying",
        "ChinaPath",
        "We check completeness and each university's rules.",
      ],
      [
        "References",
        "3–6 months",
        "Student + ChinaPath",
        "Two letters from teachers or employers.",
      ],
      ["Motivation letter", "3–6 months", "ChinaPath", "We gather the facts, edit and check."],
      [
        "Language certificate",
        "3–6 months",
        "Student",
        "HSK/IELTS/TOEFL as required by the program.",
      ],
      [
        "Portfolio",
        "3–6 months",
        "Student + ChinaPath",
        "For design, architecture, art and some IT programs.",
      ],
    ],
    note: "Legalisation, notarisation and document validity depend on the university and the issuing country. We verify the official rules for the intake year.",
  },
  calendar: {
    index: "02 / Calendar",
    eyebrow: "2027 intake",
    titleLines: ["The application year,", "month by month."],
    aside:
      "An indicative calendar for a September 2027 start. Exact dates depend on the university: scholarships and some programs close earlier.",
    headers: ["Period", "What happens", "Outcome"],
    rows: [
      [
        "November–January",
        "Diagnostic, language, budget, program and university shortlist",
        "Strategy & budget",
      ],
      [
        "December–February",
        "CSC/provincial scholarships, early deadlines",
        "Scholarship applications",
      ],
      ["January–April", "Main round: documents, essays, submissions", "Packages submitted"],
      ["March–June", "Interviews, exams, university decisions", "Offers & deposits"],
      ["June–August", "JW202, visa, housing, insurance, flights", "Ready to move"],
      ["September", "Campus registration and orientation", "Classes start"],
    ],
    note: "Less than six months before September isn't a verdict, but the choice will be narrower. We'll assess realistic options on a call.",
  },
  mistakes: {
    index: "03 / Risks",
    eyebrow: "Common mistakes",
    titleLines: ["Where it usually", "breaks."],
    aside:
      "These four mistakes come up most often. We design the process so they don't become your story.",
    items: [
      {
        title: "One university only",
        text: "One rejection shouldn't cost a year. Always several options with different risk levels.",
      },
      {
        title: "Starting in June",
        text: "Documents, translations and scholarships take time. A late start narrows the choice and raises the cost.",
      },
      {
        title: "Believing in a 'guarantee'",
        text: "The university decides. Any guaranteed admission is marketing, not a legal reality.",
      },
      {
        title: "Unverified recognition",
        text: "For medicine, law and engineering we check your country's regulator before applying, not after graduation.",
      },
    ],
  },
  cta: {
    title: "Shall we check your timeline and odds?",
    text: "A free consultation: 30 minutes, an honest assessment and next steps. No obligation.",
    primary: "Book a call",
    secondary: "Frequently asked questions",
  },
} as const;
