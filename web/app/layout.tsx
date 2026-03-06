import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learny",
  description: "AI learning agent for Filecoin"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
