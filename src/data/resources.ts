// Every entry was opened and checked on VERIFIED_ON. Re-check before each demo or release.
// Therapy for Black Men was left out because its site showed "deployment paused" on 2026-10-22.
export const VERIFIED_ON = "2026-10-22";

export type Action = { label: string; href: string; primary?: boolean };

export type Resource = {
  name: string;
  detail: string;
  actions: Action[];
};

export const CRISIS: Resource[] = [
  {
    name: "988 Suicide & Crisis Lifeline",
    detail: "Free, confidential, 24/7. For any kind of emotional crisis, not only suicide.",
    actions: [
      { label: "Call 988", href: "tel:988", primary: true },
      { label: "Text 988", href: "sms:988" },
      { label: "Chat online", href: "https://chat.988lifeline.org/" },
    ],
  },
  {
    name: "Crisis Text Line",
    detail: "Text HOME to 741741 to reach a trained volunteer. Free and 24/7.",
    actions: [{ label: "Text HOME to 741741", href: "sms:741741?&body=HOME" }],
  },
  {
    name: "Immediate danger",
    detail: "If you or someone else is in danger right now, call 911.",
    actions: [{ label: "Call 911", href: "tel:911" }],
  },
];

export const DIRECTORIES: Resource[] = [
  {
    name: "Therapy for Black Girls",
    detail: "A directory of culturally responsive therapists for Black women and girls.",
    actions: [{ label: "Find a therapist", href: "https://providers.therapyforblackgirls.com/" }],
  },
  {
    name: "BEAM Black Virtual Wellness Directory",
    detail: "Black therapists and wellness practitioners, many offering virtual sessions.",
    actions: [{ label: "Browse the directory", href: "https://wellness.beam.community/" }],
  },
  {
    name: "Black Men Heal",
    detail: "Free therapy sessions for men of color, matched with culturally responsive clinicians.",
    actions: [{ label: "Apply for free sessions", href: "https://blackmenheal.org/" }],
  },
  {
    name: "Inclusive Therapists",
    detail: "Culturally responsive therapists, with a filter for sliding-scale and low-cost care.",
    actions: [{ label: "Search therapists", href: "https://www.inclusivetherapists.com/" }],
  },
];
