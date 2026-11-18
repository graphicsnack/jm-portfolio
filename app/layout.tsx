import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Juan Mondragon | Product Design Portfolio",
  description:
    "Product design case studies by Juan Mondragon, from sales and recruiting tools at LinkedIn to CampGlint, an iOS camping app.",
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
