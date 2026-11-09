export const accommodation = {
  breadcrumb: "Accommodation",
  meta: {
    title: "Student accommodation in China — dorms, flats and campus life",
    description:
      "University dormitories, shared rooms, single rooms and private apartments in China: what is usually included, how costs work and what to confirm before accepting an offer.",
  },
  hero: {
    eyebrow: "Student life · China",
    titleLines: ["Your room is", "part of the plan."],
    lead: "Accommodation changes your budget, your commute and your first year. We confirm what is actually available at each university before you commit.",
    aside:
      "There is no single “China dormitory”. Campus housing differs by city, university and even by building. Photographs and prices must come from the institution.",
    link: "Ask about housing",
  },
  rooms: {
    index: "01 / Options",
    eyebrow: "Room types",
    titleLines: ["Four common", "starting points."],
    aside:
      "Most students begin with campus housing and move later. The right choice depends on budget, privacy and how long you plan to stay.",
    items: [
      {
        name: "University dormitory",
        text: "On-campus, usually shared or single rooms with basic furniture. The simplest route for the first year and the easiest to arrange before arrival.",
        tag: "Campus",
      },
      {
        name: "Shared apartment",
        text: "More independence and often better value outside the campus gates. Requires a lease, deposit and a local bank or payment plan.",
        tag: "City",
      },
      {
        name: "Single studio",
        text: "Privacy and space for one person. A higher monthly budget, but a shorter commute and fewer shared-house complications.",
        tag: "Private",
      },
      {
        name: "Private apartment",
        text: "For couples, families or students staying beyond one academic year. Confirm the landlord's registration and the residence-permit address.",
        tag: "Long stay",
      },
    ],
  },
  facilities: {
    index: "02 / Campus",
    eyebrow: "What campuses usually offer",
    titleLines: ["More than", "a bed."],
    aside:
      "Facilities vary, but these are the spaces international students use most. We confirm access rules for each campus.",
    items: [
      "Study desks and wardrobes",
      "Private or shared bathrooms",
      "Dining halls and campus canteens",
      "Libraries and quiet study rooms",
      "Sports halls and outdoor facilities",
      "International student offices and communities",
      "Laundry, internet and building security",
      "Campus clinics and nearby hospitals",
    ],
    note: "Not every campus has every facility. Ask for the current international student handbook before you choose housing.",
  },
  costs: {
    index: "03 / Budget",
    eyebrow: "How costs work",
    titleLines: ["Housing is", "a separate line."],
    aside:
      "Tuition rarely includes accommodation. Scholarships may cover a dormitory place or a housing allowance, but the benefit must be read carefully.",
    points: [
      "Campus dormitory: usually billed per semester or year.",
      "Private housing: rent, deposit, utilities and agency fees.",
      "Insurance and residence registration may add costs.",
      "City and campus location change the total more than the room type.",
      "A scholarship may cover housing, but not all scholarships do.",
    ],
    note: "We do not publish invented prices. Current housing costs are confirmed with the university or landlord for your intake.",
  },
  support: {
    index: "04 / Support",
    eyebrow: "How ADLAS helps",
    titleLines: ["Before you sign", "anything."],
    aside:
      "A cheap room can become expensive if the lease, deposit or residence registration is wrong. We read the details before you commit.",
    items: [
      {
        title: "Compare options",
        text: "Campus versus private, commute versus budget, short stay versus long lease — with the trade-offs written down.",
      },
      {
        title: "Check the paperwork",
        text: "We explain the lease, deposit, registration and what the university requires for the residence permit address.",
      },
      {
        title: "Plan arrival",
        text: "Airport pickup, temporary accommodation, SIM card and the first campus visit are arranged before departure.",
      },
    ],
  },
  cta: {
    title: "Need a housing plan before you accept?",
    text: "Tell us the city and budget. We will show what is realistic and what to confirm with the university.",
    primary: "Ask about accommodation",
    secondary: "See student life",
  },
} as const;
