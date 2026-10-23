import { CIRCLES } from "../data/circles";
import { TOOLS } from "../data/tools";

// Every page in the app. The service worker warms these after first load so resets work offline.
export const ROUTES: string[] = [
  "/",
  "/check-in",
  "/tools",
  ...TOOLS.map((tool) => `/tools/${tool.id}`),
  "/circles",
  ...CIRCLES.map((circle) => `/circles/${circle.id}`),
  "/support",
  "/trust",
];
