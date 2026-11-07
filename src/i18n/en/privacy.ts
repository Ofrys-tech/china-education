export const privacy = {
  breadcrumb: "Privacy",
  meta: {
    title: "Privacy policy",
    description:
      "How ChinaPath collects, uses and stores personal data submitted through the application form.",
  },
  hero: {
    eyebrow: "Legal",
    titleLines: ["Privacy", "policy."],
    lead: "The short version: what we collect, why we need it and how to have it deleted.",
    updatedLabel: "Last updated",
    updated: "7 November 2026",
  },
  sections: [
    {
      title: "1. Who processes your data",
      paragraphs: [
        "The data controller is ChinaPath (华路), an independent admissions consultancy for studying in China. You can reach us through the application form on this site or at the email address published in the footer.",
      ],
    },
    {
      title: "2. What we collect",
      paragraphs: ["Through the application form we receive the data you choose to provide:"],
      list: [
        "your name;",
        "contact method and handle: Telegram, WhatsApp, phone or email;",
        "the program, field and start year you are interested in;",
        "a short message about you, if you fill it in;",
        "your consent to data processing;",
        "technical details: the page you submitted from, referral source and UTM tags.",
      ],
      after: [
        "We do not ask for passport numbers, bank card details or medical information through this form. If documents are needed for an application, they are shared separately through an agreed secure channel.",
      ],
    },
    {
      title: "3. Why we need it",
      paragraphs: ["We use your data to:"],
      list: [
        "respond to your request and arrange a consultation;",
        "assess your profile and match programs and universities;",
        "prepare a budget and an admissions plan;",
        "communicate with you about your request;",
        "meet legal requirements where they apply.",
      ],
      after: [
        "We do not sell your data, pass it to advertising networks or use it for newsletters you didn't agree to.",
      ],
    },
    {
      title: "4. Legal basis",
      paragraphs: [
        "Processing is based on your consent, given by ticking the relevant box in the form. You can withdraw consent at any time by contacting us through the form or by email. Withdrawal does not affect the lawfulness of processing before that moment.",
      ],
    },
    {
      title: "5. Who receives it",
      paragraphs: [
        "Technical providers help us run the site and receive applications: GitHub Pages for hosting and a form-handling service (for example Formspree or a similar processor configured for the site). They receive only the data needed to deliver the application and act under their own privacy policies.",
        "If analytics is enabled, it runs without advertising cookies and receives anonymised events. You can block it with an ad blocker; the site will still work.",
      ],
    },
    {
      title: "6. How long we keep it",
      paragraphs: [
        "Applications are kept for no longer than 24 months after the last contact unless a working relationship begins. If we sign a contract, retention is governed by that contract and applicable law. After the retention period, data is deleted or anonymised.",
      ],
    },
    {
      title: "7. Cookies and local storage",
      paragraphs: [
        "We do not use marketing cookies. Your browser may store the referral source (UTM tags) in sessionStorage so an application can be attributed to a channel. That data stays in your browser until you submit the form and is cleared when the tab closes.",
      ],
    },
    {
      title: "8. Your rights",
      contactAfter: true,
      paragraphs: ["You can:"],
      list: [
        "request access to your data;",
        "correct inaccurate data;",
        "delete data where there is no legal basis to keep it;",
        "withdraw consent to processing;",
        "ask how your data is processed.",
      ],
    },
    {
      title: "9. Security",
      paragraphs: [
        "Access to applications is limited to the people working on your profile. We use HTTPS, avoid collecting unnecessary data and do not forward applications through open channels without need. No method of transmission over the internet can be absolutely secure.",
      ],
    },
    {
      title: "10. Changes to this policy",
      paragraphs: [
        "We may update this policy when our processes or legal requirements change. The current version is always on this page; the update date is shown at the top. Material changes affecting data we already hold will be communicated where possible.",
      ],
    },
  ],
  contact: {
    before: "To exercise these rights, use the",
    linkLabel: "application form",
    between: "or email us at",
    emailFallback: "the address published on this site.",
  },
  finalNote:
    "This document describes our current practice and does not replace individual legal advice for your jurisdiction.",
} as const;
