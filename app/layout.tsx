import type { Metadata } from "next";
import { ViewTransition } from "react";
import { JetBrains_Mono, Newsreader, Sintony } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";
import { SHOW_XANTYR } from "@/lib/flags";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["italic", "normal"],
});

const sintony = Sintony({
  variable: "--font-sintony",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: SHOW_XANTYR ? "Dev Seth · AI architect, CTO of Xantyr" : "Dev Seth · Chief AI Architect",
  description: SHOW_XANTYR
    ? "7 years building AI that enterprises actually trust. Now building Xantyr."
    : "7 years building private models and production AI systems for global clients in defence, government, healthcare, retail and real estate.",
  metadataBase: new URL("https://www.devseth.in"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${newsreader.variable} ${sintony.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text">
        <Header />
        {/* Cross-page navigations tagged nav-forward / nav-back fade and rise; untyped ones
            (initial load, in-page anchors) don't animate. Named shared elements morph regardless. */}
        <ViewTransition
          update={{ "nav-forward": "page", "nav-back": "page", default: "none" }}
          default="none"
        >
          <main className="flex-1">{children}</main>
        </ViewTransition>
        <RevealObserver />
        <Footer />
      </body>
    </html>
  );
}
