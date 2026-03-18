import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { SkipLink } from "@/components/ui/SkipLink";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sacred Intelligence Collection",
    template: "%s | Sacred Intelligence Collection",
  },
  description:
    "Books, guided meditations, and digital resources for your Sacred, Self-ish, and Shared journeys.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable}`}
    >
      <body>
        <MotionProvider>
          <SkipLink />
          <Header />
          <main id="main-content" className="pb-[72px] lg:pb-0">{children}</main>
          <Footer />
          <BottomNav />
        </MotionProvider>
      </body>
    </html>
  );
}
