import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Juan Mondragon | Side Projects",
  description: "Side projects by Juan Mondragon, including CampGlint for campsite planning and GraphicSnack for design feedback.",
  icons: {
    icon: "/brand/jm-favicon.png",
    shortcut: "/brand/jm-favicon.png",
    apple: "/brand/jm-favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
