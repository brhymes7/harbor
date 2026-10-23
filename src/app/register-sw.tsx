"use client";

import { useEffect } from "react";
import { ROUTES } from "@/lib/routes";

const WARMED = "harbor-offline-warmed";

// Fetch every page once, plus the scripts and styles each one references. The worker caches whatever
// passes through it, so after this the resets keep working with no signal.
async function warmOfflineCache() {
  const assets = new Set<string>();
  for (const route of ROUTES) {
    const html = await fetch(route).then((response) => response.text());
    for (const match of html.matchAll(/\/_next\/static\/[^"'\s)\\]+/g)) assets.add(match[0]);
  }
  await Promise.all([...assets].map((asset) => fetch(asset).catch(() => undefined)));
}

export function RegisterServiceWorker() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    // Dev chunk URLs aren't content-hashed, so the cache-first worker would serve stale code after edits.
    if (process.env.NODE_ENV !== "production") {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => registration.unregister());
      });
      return;
    }
    navigator.serviceWorker
      .register("/sw.js")
      .then(() => navigator.serviceWorker.ready)
      .then(() => {
        // Once per session, so a new release gets cached the next time the app opens.
        if (sessionStorage.getItem(WARMED)) return;
        const idle = window.requestIdleCallback ?? ((callback: () => void) => window.setTimeout(callback, 1500));
        idle(() => {
          warmOfflineCache()
            .then(() => sessionStorage.setItem(WARMED, "1"))
            .catch(() => {
              // Offline or interrupted: try again on the next visit.
            });
        });
      })
      .catch(() => {
        // Installability degrades gracefully to a regular web app if this fails.
      });
  }, []);

  return null;
}
