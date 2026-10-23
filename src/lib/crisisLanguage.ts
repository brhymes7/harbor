/*
  A deliberately broad, local-only screen of what someone is about to post in a circle. A match never
  blocks the post; it puts 988 in front of the person first. It is a safety net, not detection:
  a real launch needs trained moderators reviewing circles, not just a word list.
*/
const PATTERNS: RegExp[] = [
  /\bkill(ing)? my ?self\b/,
  /\bsuicid(e|al)\b/,
  /\bend (it all|my life|things)\b/,
  /\bwant(ed)? to die\b/,
  /\b(don'?t|do not) want to (be here|live|wake up)\b/,
  /\bno (reason|point) (to|in) (live|living|going on)\b/,
  /\bhurt(ing)? my ?self\b/,
  /\bself[- ]harm\b/,
  /\bbetter off without me\b/,
];

export function mentionsCrisis(text: string): boolean {
  const normalized = text.toLowerCase().replace(/[’‘]/g, "'");
  return PATTERNS.some((pattern) => pattern.test(normalized));
}
