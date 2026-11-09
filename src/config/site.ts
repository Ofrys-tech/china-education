/**
 * Single source of truth for brand, navigation, contact details and intake.
 * Contact details are the client's official channels — do not invent extras.
 */
export const siteConfig = {
  name: "ADLAS",
  fullName: "ADLAS STUDY",
  tagline: "Education Without Borders",
  community: "One World. One Family. One ADLAS.",
  description:
    "ADLAS STUDY is an international education platform connecting students with universities, scholarships and opportunities — starting with China and built for the world.",
  locale: "en_US",
  lang: "en",
  intake: "2027",
  yearFounded: 2026,
  nav: [
    { label: "Destinations", href: "/destinations/" },
    { label: "Universities", href: "/universities/" },
    { label: "Programs", href: "/programs/" },
    { label: "Scholarships", href: "/scholarships/" },
    { label: "Experience", href: "/experience/" },
    { label: "About", href: "/about/" },
    { label: "Contact", href: "/contact/" },
  ],
  contacts: {
    whatsapp: "https://wa.me/8618448601096",
    whatsappLabel: "+86 184 4860 1096",
    email: "adlasagency01@gmail.com",
    instagram: "https://instagram.com/adlas.study",
    instagramLabel: "@adlas.study",
    channel: "https://whatsapp.com/channel/0029Vb9FmvqJZg3zZ7MpbG17",
    channelLabel: "WhatsApp channel",
  },
  analytics: {
    src: import.meta.env.PUBLIC_ANALYTICS_SRC ?? "",
    domain: import.meta.env.PUBLIC_ANALYTICS_DOMAIN ?? "",
  },
} as const;
