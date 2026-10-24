import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { TabBar } from "@/components/TabBar";
import { RegisterServiceWorker } from "./register-sw";
import "./globals.css";

const serif = Fraunces({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-serif",
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const description =
  "For Black professionals after a microaggression or a hard day at work: name what happened, take a short reset, and choose your next step. Private, on your phone.";

export const metadata: Metadata = {
  metadataBase: new URL("https://harbor-reset.netlify.app"),
  title: { default: "Harbor: a reset for what just happened", template: "%s | Harbor" },
  description,
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Harbor",
  },
  openGraph: {
    title: "Harbor: a reset for what just happened",
    description,
    siteName: "Harbor",
    type: "website",
    locale: "en_US",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f2ec" },
    { media: "(prefers-color-scheme: dark)", color: "#15110e" },
  ],
  colorScheme: "light dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <main className="shell">{children}</main>
        <TabBar />
        <RegisterServiceWorker />
      </body>
    </html>
  );
}
