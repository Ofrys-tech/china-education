export const privacy = {
  breadcrumb: "Privacy",
  meta: {
    title: "Privacy policy — ADLAS STUDY",
    description:
      "How ADLAS STUDY collects, uses and stores personal data submitted through the student inquiry form and official contact channels.",
  },
  hero: {
    eyebrow: "Legal",
    titleLines: ["Privacy", "policy."],
    lead: "The short version: what we collect, why we need it, who receives it and how to have it deleted.",
    updatedLabel: "Last updated",
    updated: "9 November 2026",
  },
  sections: [
    {
      title: "1. Who processes your data",
      paragraphs: [
        "The data controller is ADLAS STUDY, an independent international education consultancy. You can reach us through the student inquiry form on this site, by email at adlasagency01@gmail.com or on WhatsApp at +86 184 4860 1096.",
      ],
    },
    {
      title: "2. What we collect",
      paragraphs: ["Through the inquiry form we receive the data you choose to provide:"],
      list: [
        "your name;",
        "contact method and handle: WhatsApp, email, phone or Instagram;",
        "nationality and highest completed qualification;",
        "the program, field, destination, budget and start year you are interested in;",
        "a short message about you, if you fill it in;",
        "your consent to data processing;",
        "technical details: the page you submitted from, referral source and UTM tags.",
      ],
      after: [
        "We do not ask for passport numbers, bank card details, passwords or medical information through this form. If documents are needed for an application, they are shared separately through an agreed secure channel after you become a client.",
      ],
    },
    {
      title: "3. Why we need it",
      paragraphs: ["We use your data to:"],
      list: [
        "respond to your request and arrange a conversation;",
        "assess your profile and identify realistic programs and universities;",
        "prepare a budget and an admissions plan;",
        "communicate with you about your inquiry;",
        "meet legal and accounting requirements where they apply.",
      ],
      after: [
        "We do not sell your data, pass it to advertising networks or add you to a newsletter you did not agree to receive.",
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
        "Technical providers help us run the site and receive inquiries: GitHub Pages for hosting and a form-handling service (for example Formspree or a similar processor configured for the site). They receive only the data needed to deliver the inquiry and act under their own privacy policies.",
        "When you become a client, universities and scholarship bodies receive the application documents required by their process. We share only what is necessary and explain what will be shared before submission.",
      ],
    },
    {
      title: "6. International transfers",
      paragraphs: [
        "ADLAS serves students internationally, so your data may be processed outside your country of residence. Where required, we rely on appropriate safeguards and keep transfers limited to the service providers needed to answer your inquiry.",
      ],
    },
    {
      title: "7. How long we keep it",
      paragraphs: [
        "Inquiries that do not become applications are kept for up to 24 months, then deleted or anonymized. Client files are kept for the period required by the service, accounting rules and any legal obligation, then deleted. You can request earlier deletion at any time.",
      ],
    },
    {
      title: "8. Your rights",
      paragraphs: [
        "You may request access to your data, correction, deletion, restriction of processing, a portable copy or withdrawal of consent. Send the request from the contact details you used, or by email, and we will respond within a reasonable period and no later than required by applicable law.",
      ],
    },
    {
      title: "9. Cookies and analytics",
      paragraphs: [
        "The site does not set advertising cookies or run third-party trackers by default. If privacy-friendly analytics is enabled, it is configured without advertising profiles. The form stores UTM parameters in your browser session only to attribute the inquiry; personal data is not written to that storage.",
      ],
    },
    {
      title: "10. Security and changes",
      paragraphs: [
        "We use reputable hosting and form providers, restrict access to inquiry data and avoid collecting sensitive documents through the public form. No online transmission is completely secure, so please do not send passports, payment details or passwords through the website form.",
        "We may update this policy when the service or the law changes. The date at the top shows the current version. Material changes will be announced on this page.",
      ],
    },
  ],
} as const;
