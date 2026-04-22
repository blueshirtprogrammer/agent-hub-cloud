import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FOUNDRYOS Launcher",
  description: "One-click autonomous company installer and marketplace."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
