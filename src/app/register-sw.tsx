"use client";

import { useEffect } from "react";

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
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Installability degrades gracefully to a regular web app if this fails.
    });
  }, []);

  return null;
}
