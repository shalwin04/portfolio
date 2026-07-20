import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

// Editorial serif font for large display text
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Elegant serif for accent text
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Shalwin Sanju | AI Engineer",
  description:
    "AI Engineer building agents that ship. Creator of AegisOps, Agentic CI/CD, and more.",
  keywords: [
    "AI Engineer",
    "Machine Learning",
    "Agents",
    "LLM",
    "Full Stack",
    "React",
    "Next.js",
    "Python",
  ],
  authors: [{ name: "Shalwin Sanju" }],
  openGraph: {
    title: "Shalwin Sanju | AI Engineer",
    description: "AI Engineer building agents that ship.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} ${playfair.variable} ${cormorant.variable}`}
    >
      <body className="min-h-screen bg-void text-white antialiased">
        {children}
      </body>
    </html>
  );
}
