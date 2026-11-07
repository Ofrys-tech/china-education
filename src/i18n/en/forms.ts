import type { LeadErrorCode } from "@/lib/leads/schema";

/** Form-only copy. Imported by the client island and the Astro form. */
export const forms = {
  labels: {
    name: "Full name",
    contactMethod: "Contact method",
    contact: "Contact",
    degree: "Program",
    direction: "Field of study",
    intake: "Start date",
    message: "A little about you",
    honeypot: "Website",
    choose: "Select",
  },
  placeholders: {
    name: "Anna Lee",
    contactFallback: "Choose a contact method",
    contactHint: "Handle, phone or email — whichever suits you.",
    message:
      "What you already have: education, GPA, HSK/IELTS, budget, preferred cities. The more honest, the better the match.",
  },
  consent: {
    before:
      "I agree to the processing of my personal data and to being contacted via the channel above.",
    link: "Privacy policy",
    after: ".",
    error: "Consent is required",
  },
  errors: {
    name_short: "Enter your name (at least 2 characters)",
    name_long: "That name is too long",
    contact_method: "Choose a contact method",
    contact_short: "Enter a contact",
    contact_long: "That contact is too long",
    contact_email: "Check the email address",
    contact_phone: "Check the phone number",
    contact_telegram: "Telegram handle: 4+ characters, letters, numbers and _",
    degree: "Choose a program",
    direction: "Choose a field of study",
    intake: "Choose a start year",
    message_long: "Keep the message under 1,000 characters",
    consent: "Consent is required",
  } satisfies Record<LeadErrorCode, string>,
  status: {
    invalid: "Please check the highlighted fields.",
    sending: "Sending your application…",
    sent: "Application received.",
    timeout: "The server didn't respond in time. Try again or contact us directly.",
    failed: "We couldn't send your application. Try again or contact us directly.",
    emailOpen: "Opening your email app. If it doesn't open, email us directly.",
    telegramOnly: "The form isn't connected yet. Message us on Telegram.",
    unavailable: "The form is temporarily unavailable. Please try again later.",
    direct: "Message us directly: ",
    or: " or ",
  },
  submit: {
    idle: "Send application",
    busy: "Sending…",
  },
  success: {
    eyebrow: "Application received",
    title: "Thank you! We're already looking at your profile.",
    text: "Your advisor will get back to you via the channel you chose within one business day. If you want to add details, just reply or send another message.",
    reset: "Send another application",
  },
  footerNote:
    "The first consultation is free. We reply within one business day — no spam, no cold calls.",
  noscript: "JavaScript is required to submit the form. Email us directly:",
  noscriptNoContact: "Enable JavaScript or come back later.",
} as const;
