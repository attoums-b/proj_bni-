import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/css/satoshi.css";
import "@/css/bni-styles.css";

// Configuration de la police Inter via Next.js
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BNI Réservations",
  description: "Système de gestion des réservations de salles",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <body className="font-sans">{children}</body>
    </html>
  );
}