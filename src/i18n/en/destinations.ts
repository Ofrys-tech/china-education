export const destinations = {
  breadcrumb: "Destinations",
  meta: {
    title: "Study destinations — China, Russia, Malaysia",
    description:
      "China is ADLAS STUDY's active destination. Russia and Malaysia are being prepared and will open only with verified programs, costs and visa routes.",
  },
  hero: {
    eyebrow: "Destinations · 2027",
    titleLines: ["One active route.", "No decorative flags."],
    lead: "China is where we work today. Russia and Malaysia are marked as upcoming until we can support them with verified universities, fees and visa guidance.",
    aside:
      "A destination is not a poster. It is a language, a city, a budget and a legal route. We open a country only when every part is ready.",
    link: "Plan your China route",
  },
  china: {
    index: "01 / China",
    eyebrow: "Active destination",
    titleLines: ["Why China", "makes sense now."],
    lead: "China offers a rare combination: globally connected universities, a growing number of English-taught programs and a language that changes your career options.",
    reasons: [
      {
        title: "A wide academic map",
        text: "From language years and applied vocational routes to research master's and PhD programs, the system has an entry point for different profiles.",
      },
      {
        title: "Two languages of study",
        text: "English-taught degrees are growing in business, engineering, computer science and medicine; Chinese-taught routes offer the widest choice.",
      },
      {
        title: "Costs that can be planned",
        text: "Tuition and living costs vary enormously by city and university. With a real budget, China can be more predictable than Western alternatives.",
      },
      {
        title: "Scholarships with rules",
        text: "CSC, provincial, municipal and university awards are competitive, but the criteria are published. We assess eligibility before you apply.",
      },
    ],
    cities: {
      label: "Study cities in our directory",
      items: [
        "Beijing",
        "Shanghai",
        "Hangzhou",
        "Nanjing",
        "Guangzhou",
        "Wuhan",
        "Xiamen",
        "Shenyang",
        "Changsha",
        "Nanning",
        "Yangzhou",
      ],
    },
    timeline: {
      label: "A realistic application year",
      rows: [
        ["September–December", "Profile, language plan, budget and university shortlist"],
        ["December–March", "Scholarship applications and early deadlines"],
        ["January–April", "Main applications, documents and interviews"],
        ["April–June", "Offers, deposits and JW202 preparation"],
        ["June–August", "Visa, housing, insurance and flights"],
        ["September", "Registration and orientation"],
      ],
      note: "Dates are indicative and depend on the university and scholarship. We confirm every deadline for your intake.",
    },
  },
  upcoming: {
    index: "02 / Next",
    eyebrow: "Opening later",
    titleLines: ["We would rather", "wait than guess."],
    aside:
      "Russia and Malaysia are part of the long-term plan. They will appear as bookable destinations only after we verify the universities, costs and legal route.",
    cards: [
      {
        country: "Russia",
        status: "Upcoming",
        text: "Preparing verified university routes, language requirements and scholarship information. No applications are open yet.",
      },
      {
        country: "Malaysia",
        status: "Upcoming",
        text: "Reviewing English-taught programs, campus options and costs. No applications are open yet.",
      },
    ],
    cta: "Ask about future destinations",
  },
  cta: {
    title: "China is open. Let's see if it fits you.",
    text: "A free conversation about your profile, budget and timeline — with a real shortlist, not a brochure.",
    primary: "Start with China",
    secondary: "Browse universities",
  },
} as const;
