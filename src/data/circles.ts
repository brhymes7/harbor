// Demo circles. Every post is fictional, written to show the tone a facilitated circle aims for.
export type Post = { id: string; author: string; ago: string; body: string };

export type Circle = {
  id: string;
  name: string;
  about: string;
  members: number;
  facilitator: string;
  norms: string[];
  posts: Post[];
};

export const REACTIONS = [
  { id: "hear", label: "I hear you" },
  { id: "same", label: "Same here" },
  { id: "strength", label: "Sending strength" },
] as const;

export type ReactionId = (typeof REACTIONS)[number]["id"];

export const CIRCLES: Circle[] = [
  {
    id: "only-one",
    name: "Only One in the Room",
    about: "For people who are often the only Black person at work, and tired of explaining it.",
    members: 9,
    facilitator: "Dana, peer facilitator",
    norms: ["No advice unless someone asks for it.", "What's shared here stays here."],
    posts: [
      {
        id: "oo-1",
        author: "Marcus",
        ago: "2h",
        body: "Got called \"articulate\" in a client meeting again. Smiled through it, then sat in my car for twenty minutes after. Just needed to say it somewhere it doesn't need explaining.",
      },
      {
        id: "oo-2",
        author: "Nia",
        ago: "5h",
        body: "Did the physiological sigh in the bathroom before my review. It didn't fix anything, but I walked in with my shoulders down. Small win.",
      },
      {
        id: "oo-3",
        author: "Dana · facilitator",
        ago: "1d",
        body: "Reminder for this week: you don't owe anyone a teaching moment. Choosing not to correct someone is a valid way to protect your energy.",
      },
    ],
  },
  {
    id: "black-moms-rest",
    name: "Black Moms Rest",
    about: "Pregnant, postpartum, or deep in it. A place to be heard about care, bodies, and being believed.",
    members: 11,
    facilitator: "Simone, doula and peer facilitator",
    norms: ["Your experience is valid without a diagnosis.", "Share resources, not judgment."],
    posts: [
      {
        id: "bm-1",
        author: "Keisha",
        ago: "1h",
        body: "Told my OB about the headaches three times before anyone took my blood pressure seriously. I'm okay now, but I'm still angry that I had to push that hard.",
      },
      {
        id: "bm-2",
        author: "Simone · facilitator",
        ago: "3h",
        body: "Keisha, you advocated for yourself and it mattered. If anyone wants it, I can share a one-page \"what to say at appointments\" sheet a few of us put together.",
      },
      {
        id: "bm-3",
        author: "Ari",
        ago: "1d",
        body: "Four weeks postpartum. Didn't sleep, didn't shower, did check in here. Counting it.",
      },
    ],
  },
  {
    id: "night-shift",
    name: "Night Shift Nurses",
    about: "Black nurses and care workers holding everyone else's crisis on top of their own.",
    members: 7,
    facilitator: "Andre, RN and peer facilitator",
    norms: ["No patient details, ever.", "Rest is part of the job."],
    posts: [
      {
        id: "ns-1",
        author: "Tasha",
        ago: "4h",
        body: "A family asked for \"a different nurse\" tonight. Charge nurse backed me up, which helped. Still carrying it into the drive home.",
      },
      {
        id: "ns-2",
        author: "Andre · facilitator",
        ago: "6h",
        body: "Good to hear your charge had your back. Drive-home ritual idea from last week: phone on Do Not Disturb, one song, windows down. Anyone else have one?",
      },
      {
        id: "ns-3",
        author: "Joy",
        ago: "1d",
        body: "Mine is the 4-7-8 in the parking garage before I start the car. Four rounds and I'm a person again.",
      },
    ],
  },
];

export function getCircle(id: string): Circle | undefined {
  return CIRCLES.find((circle) => circle.id === id);
}
