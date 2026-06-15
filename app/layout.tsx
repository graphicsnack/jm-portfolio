import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Juan Mondragon | Product Design Portfolio",
  description:
    "Senior product design portfolio covering LinkedIn systems, AI workflows, GTM planning tools, and founder-led product work.",
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
