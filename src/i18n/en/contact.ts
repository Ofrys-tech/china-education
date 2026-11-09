export const contact = {
  breadcrumb: "Contact",
  meta: {
    title: "Contact ADLAS STUDY — WhatsApp, email and Instagram",
    description:
      "Talk to ADLAS STUDY about studying in China. Official WhatsApp, email, Instagram and WhatsApp channel. Online consultancy, no walk-in office.",
  },
  hero: {
    eyebrow: "Contact · ADLAS STUDY",
    titleLines: ["A real person", "answers."],
    lead: "Questions about universities, scholarships, budgets or documents? Message us on WhatsApp or send the form. We reply within one business day.",
    aside:
      "ADLAS operates online and serves students internationally. We do not have a public walk-in office — please do not travel to an address that is not published here.",
    link: "Start the conversation",
  },
  channels: {
    index: "01 / Channels",
    eyebrow: "Official contacts",
    titleLines: ["Use the official", "channels."],
    aside:
      "These are the only official ADLAS contacts. If someone claims to represent ADLAS from another number or account, verify it with us first.",
    items: [
      {
        label: "WhatsApp",
        value: "+86 184 4860 1096",
        href: "https://wa.me/8618448601096",
        note: "Fastest route for a first question. Voice notes are welcome.",
        icon: "whatsapp",
      },
      {
        label: "Email",
        value: "adlasagency01@gmail.com",
        href: "mailto:adlasagency01@gmail.com",
        note: "Best for documents, detailed questions and formal requests.",
        icon: "mail",
      },
      {
        label: "Instagram",
        value: "@adlas.study",
        href: "https://instagram.com/adlas.study",
        note: "Updates, student life and behind-the-scenes guidance.",
        icon: "instagram",
      },
      {
        label: "WhatsApp channel",
        value: "ADLAS STUDY channel",
        href: "https://whatsapp.com/channel/0029Vb9FmvqJZg3zZ7MpbG17",
        note: "Announcements and intake updates without a group chat.",
        icon: "channel",
      },
    ],
    note: "We do not ask for payment through social media, and we never request your password or a verification code.",
  },
  form: {
    index: "02 / Message",
    eyebrow: "Student inquiry",
    titleLines: ["Tell us what", "you need."],
    aside:
      "The more context you give, the more useful the first answer. There is no obligation and no cost for the first conversation.",
    label: "Student inquiry",
    title: "Start with your situation.",
    intro:
      "Fields marked with an asterisk are required. Do not send passport scans or payment details through this form.",
  },
  response: {
    label: "What happens next",
    items: [
      {
        title: "We read your message",
        text: "A real advisor reviews your profile and questions — usually within one business day.",
      },
      {
        title: "We reply on your channel",
        text: "WhatsApp, email or Instagram, whichever you choose. No cold calls.",
      },
      {
        title: "We propose a next step",
        text: "A short call, a document checklist or a realistic shortlist. You decide whether to continue.",
      },
    ],
  },
  noOffice: {
    label: "No walk-in office",
    title: "Online by design.",
    text: "ADLAS STUDY is an online international consultancy. We do not publish an office address because we do not have a permanent public office. Meetings happen by appointment on WhatsApp, email or video call.",
  },
  cta: {
    title: "Prefer to write first?",
    text: "Send a message with your nationality, current qualification and the program you are considering. We will take it from there.",
    primary: "Message on WhatsApp",
    secondary: "Send the form",
  },
} as const;
